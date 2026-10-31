// Script dùng chung phía trình duyệt cho mọi mẫu: trạng thái "đang mở cửa" và gợi ý đổi khu vực/tiền tệ.
// Trang vẫn đầy đủ nội dung khi không có JavaScript. Build ghép file này với <mẫu>/site.js (nếu có).
(function () {
  // Đang mở cửa hay không, tính theo múi giờ của tiệm.
  var el = document.querySelector('[data-open-status]');
  if (el) {
    try {
      var hours = JSON.parse(el.getAttribute('data-hours'));
      var parts = new Intl.DateTimeFormat('en-US', { timeZone: el.getAttribute('data-tz'), weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var get = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
      var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      var now = get('hour').replace('24', '00') + ':' + get('minute');
      var open = hours.some(function (h) { return h.days.indexOf(day) >= 0 && now >= h.open && now < h.close; });
      el.textContent = el.getAttribute(open ? 'data-open' : 'data-closed');
      el.classList.toggle('is-open', open);
      el.hidden = false;
    } catch (e) { /* bỏ qua: chỉ là thông tin phụ */ }
  }

  // Tạm nghỉ / nghỉ lễ (site.closure, nhúng khi xuất): thanh thông báo từ 7 ngày trước đến hết ngày nghỉ;
  // trong những ngày nghỉ, "Đang mở cửa" đổi thành "Đang tạm nghỉ".
  var cl = document.getElementById('kp-closure');
  if (cl) {
    try {
      var c = JSON.parse(cl.textContent);
      // Ngày hôm nay (YYYY-MM-DD) theo múi giờ của shop; ghép từng phần vì mỗi trình duyệt định dạng ngày khác nhau.
      var dp = new Intl.DateTimeFormat('en-US', { timeZone: c.tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
      var part = function (t) { return (dp.find(function (p) { return p.type === t; }) || {}).value; };
      var today = part('year') + '-' + part('month') + '-' + part('day');
      var start = new Date(c.from + 'T00:00:00Z'); start.setUTCDate(start.getUTCDate() - 7);
      var showFrom = start.toISOString().slice(0, 10);
      if (today >= showFrom && today <= c.to) {
        var during = today >= c.from;
        var bar = document.createElement('div');
        bar.className = 'kp-closure';
        bar.setAttribute('role', 'status');
        bar.style.cssText = 'background:var(--ink,#1b1b1b);color:#fff;text-align:center;padding:10px 16px;font-size:14px;line-height:1.45;position:relative;z-index:60';
        bar.textContent = (during ? c.now : c.soon) + (c.note ? ' ' + c.note : '');
        document.body.insertBefore(bar, document.body.firstChild);
        if (during && el) { el.textContent = c.closed; el.classList.remove('is-open'); el.hidden = false; }
      }
    } catch (e) { /* bỏ qua */ }
  }

  // Nút chia sẻ (shareBar trong ui.mjs): link là địa chỉ trang đang xem.
  // Địa chỉ để chia sẻ: trình chỉnh sửa báo qua <meta name="kp-page-url"> (trang xem trước không có địa chỉ);
  // không thì địa chỉ trang (bỏ ?embed=1 / #…); trang mở từ file trên máy thì dùng canonical nếu có.
  var shareUrl = function () {
    var m = document.querySelector('meta[name="kp-page-url"]');
    if (m && m.content) return m.content;
    if (/^https?:$/.test(location.protocol)) return location.origin + location.pathname;
    var c = document.querySelector('link[rel="canonical"]');
    return c && !/site\.invalid/.test(c.href) ? c.href : location.href;
  };
  document.querySelectorAll('[data-share]').forEach(function (box) {
    var url = shareUrl();
    var title = document.title;
    var nat = box.querySelector('[data-share-native]');
    if (nat && navigator.share) {
      nat.hidden = false;
      nat.addEventListener('click', function () { navigator.share({ title: title, url: url }).catch(function () {}); });
    }
    var fb = box.querySelector('[data-share-fb]');
    if (fb) fb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
    var cp = box.querySelector('[data-share-copy]');
    if (cp) cp.addEventListener('click', function () {
      var done = function () { var s = cp.querySelector('span'); var old = s.textContent; s.textContent = box.getAttribute('data-copied'); setTimeout(function () { s.textContent = old; }, 1600); };
      // Cách cũ (execCommand) khi trình duyệt không có hoặc chặn clipboard (trang http thường, trong khung…)
      var old = function () { var t = document.createElement('textarea'); t.value = url; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(t); t.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} t.remove(); if (ok) done(); else window.prompt('', url); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(done, old);
      else old();
    });
  });

  // Gợi ý khu vực theo ngôn ngữ trình duyệt (không tự chuyển trang).
  var box = document.getElementById('market-suggest');
  var markets = JSON.parse(document.body.getAttribute('data-markets') || '[]');
  var current = document.body.getAttribute('data-market');
  var key = 'market-suggest-dismissed';
  var dismissed = false;
  try { dismissed = localStorage.getItem(key) === '1'; } catch (e) {}
  // ?embed=1: site đang được nhúng (khung xem thử trên landing, ảnh chụp) → không gợi ý.
  var embedded = /[?&]embed=1\b/.test(location.search);
  if (!box || dismissed || embedded || markets.length < 2) return;
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var best = null;
  prefs.some(function (p) {
    var bits = p.split('-');
    return markets.some(function (m) {
      if ((bits[1] && m.country.toLowerCase() === bits[1]) || m.lang === bits[0]) { best = m; return true; }
      return false;
    });
  });
  if (!best || best.id === current) return;
  var fmt = new Intl.NumberFormat(best.lang, { style: 'currency', currency: best.currency }).formatToParts(0).find(function (x) { return x.type === 'currency'; });
  var template = box.getAttribute('data-suggest') || '';
  box.querySelector('[data-text]').textContent = template.replace('{currency}', best.currency + (fmt ? ' (' + fmt.value + ')' : ''));
  box.querySelector('[data-go]').href = best.href;
  box.querySelector('[data-close]').addEventListener('click', function () {
    box.hidden = true;
    try { localStorage.setItem(key, '1'); } catch (e) {}
  });
  box.hidden = false;
})();

// Mẫu Đồ bơi & đồ đi biển: lưới sản phẩm lọc theo bộ sưu tập, dành cho ai, size, màu, mức giá, tìm không dấu, sắp xếp, "Xem thêm";
// tìm size đồ bơi theo vòng ngực + vòng hông và lưu lại (localStorage); trang sản phẩm: ảnh vuốt ngang + chấm vị trí, phóng to,
// màu, size (chọn sẵn size đã lưu), số lượng, "Thêm vào giỏ"; giỏ hàng nhiều món lưu theo khu vực (localStorage, có try/catch),
// phí giao + thanh "còn … để miễn phí giao", gửi Google Form hoặc tin nhắn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var STORE = body.getAttribute('data-store') || 'kp-swim';
  var load = function (k, d) { try { var v = JSON.parse(localStorage.getItem(STORE + k) || 'null'); return v == null ? d : v; } catch (e) { return d; } };
  var save = function (k, v) { try { localStorage.setItem(STORE + k, JSON.stringify(v)); } catch (e) { /* trình duyệt chặn lưu: giỏ chỉ sống trong trang */ } };
  var cur = body.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(body.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };

  function send(channel, href, text, msg, subject) {
    if (channel === 'whatsapp') href = 'https://wa.me/' + body.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
    if (channel === 'email') href = 'mailto:' + body.getAttribute('data-email') + '?subject=' + encodeURIComponent(subject || text) + '&body=' + encodeURIComponent(text);
    var open = function () { window.open(href, channel === 'phone' || channel === 'email' ? '_self' : '_blank', 'noopener'); };
    if (channel === 'whatsapp' || channel === 'email') { open(); return; }
    var show = function (s) { if (msg) { msg.textContent = s; msg.hidden = false; } open(); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { show(body.getAttribute('data-copied')); }, function () { show(text); });
    } else show(text);
  }

  // ── Size đã lưu ──
  var mySize = load('-size', null); // { size: 'M', top: 'S', bottom: 'M' }

  // ── Lưới sản phẩm ──
  var grid = $('[data-grid]');
  var bar = $('[data-toolbar]');
  var state = null;
  if (grid && bar) {
    var cards = Array.prototype.slice.call(grid.children);
    var params = new URLSearchParams(location.search);
    state = { type: params.get('type') || '', fr: '', sz: '', band: '', color: '', q: '', sort: '', all: false };
    var count = $('[data-count]'), empty = $('[data-empty]'), more = $('[data-more]');
    var sel = function (k) { return bar.querySelector('[data-' + k + ']'); };
    var has = function (c, attr, v) { return !v || (' ' + c.getAttribute(attr) + ' ').indexOf(' ' + v + ' ') >= 0; };
    var inBand = function (c) {
      if (!state.band) return true;
      var r = state.band.split('-'), p = +c.getAttribute('data-price');
      return p >= +r[0] && (r[1] === '' || p < +r[1]);
    };
    var apply = function () {
      var filtering = state.type || state.fr || state.sz || state.band || state.color || state.q;
      var shown = 0;
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
      sorted.forEach(function (c) {
        var f = c.getAttribute('data-for');
        var ok = (!state.type || c.getAttribute('data-type') === state.type) && (!state.fr || f === state.fr || (f === 'unisex' && state.fr !== 'kids'))
          && has(c, 'data-sz', state.sz) && has(c, 'data-color', state.color) && inBand(c) && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        if (ok) shown++;
        c.hidden = !ok || (!filtering && !state.all && shown > 24);
        grid.appendChild(c);
      });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      if (more) more.hidden = !!filtering || state.all || shown <= 24;
      $$('button[data-type]', bar).forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-type') === state.type); });
      $$('button.fam', bar).forEach(function (b) { var on = b.getAttribute('data-color') === state.color; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      [['forf', 'fr'], ['szf', 'sz']].forEach(function (x) { var el = sel(x[0]); if (el) el.value = state[x[1]]; });
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-type]');
      if (b) { state.type = b.getAttribute('data-type'); apply(); return; }
      var f = e.target.closest('button.fam');
      if (f) { var v = f.getAttribute('data-color'); state.color = state.color === v ? '' : v; apply(); }
    });
    sel('search').addEventListener('input', function (e) { state.q = plain(e.target.value.trim()); apply(); });
    [['forf', 'fr'], ['szf', 'sz'], ['band', 'band'], ['sort', 'sort']].forEach(function (x) {
      var el = sel(x[0]);
      if (el) el.addEventListener('change', function (e) { state[x[1]] = e.target.value; apply(); });
    });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-filter-link]');
      if (!a) return;
      e.preventDefault();
      state.type = a.getAttribute('data-value');
      history.replaceState(null, '', '?type=' + state.type + '#shop');
      apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    var mine = $('[data-mysize]');
    var showMine = function () {
      if (!mine || !mySize) return;
      var tx = $('[data-mysize-text]', mine);
      tx.textContent = tx.getAttribute('data-tpl').replace('{size}', mySize.top !== mySize.bottom ? mySize.top + ' / ' + mySize.bottom : mySize.size);
      mine.hidden = false;
    };
    if (mine) $('[data-mysize-filter]', mine).addEventListener('click', function () { if (mySize) { state.sz = mySize.size; apply(); } });
    showMine();
    body.addEventListener('kp-size', function () { mySize = load('-size', null); showMine(); });
    apply();
  }

  // ── Tìm size: vòng ngực → size áo, vòng hông → size quần; một mảnh lấy size lớn hơn ──
  var finder = $('[data-finder]');
  if (finder) {
    var out = $('[data-result]', finder), saveBtn = $('[data-save]', finder);
    var found = null;
    var run = function () {
      var num = function (n) { return parseFloat(String(finder.querySelector('[name="' + n + '"]').value).replace(',', '.')); };
      var bu = num('bust'), hi = num('hip');
      $$('tr.hit').forEach(function (tr) { tr.classList.remove('hit'); });
      found = null; saveBtn.hidden = true;
      if (!bu && !hi) return;
      var rows = $$('table[data-chart] tbody tr').filter(function (tr, i, all) { return all.indexOf(tr) === i && tr.closest('#size'); });
      var at = function (k, v) { if (!v) return -1; for (var i = 0; i < rows.length; i++) if (parseFloat(rows[i].getAttribute('data-' + k)) >= v) return i; return rows.length; };
      var bi = at('bust', bu), hj = at('hip', hi);
      if (bi >= rows.length || hj >= rows.length) { out.textContent = out.getAttribute('data-none'); return; }
      if (bi < 0) bi = hj; if (hj < 0) hj = bi;
      var key = function (i) { return rows[i].getAttribute('data-key'); };
      var big = Math.max(bi, hj);
      found = { size: key(big), top: key(bi), bottom: key(hj) };
      out.textContent = bi === hj ? out.getAttribute('data-tpl').replace('{size}', found.size)
        : out.getAttribute('data-between').replace('{top}', found.top).replace('{bottom}', found.bottom).replace('{size}', found.size);
      rows[bi].classList.add('hit'); rows[hj].classList.add('hit');
      saveBtn.hidden = false;
    };
    finder.addEventListener('input', run);
    finder.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    saveBtn.addEventListener('click', function () {
      if (!found) return;
      save('-size', found);
      saveBtn.disabled = true;
      body.dispatchEvent(new Event('kp-size'));
      setTimeout(function () { saveBtn.disabled = false; }, 1200);
    });
  }

  // ── Ảnh trang sản phẩm ──
  var gal = $('[data-gallery]');
  if (gal) {
    var track = gal.querySelector('.g-track'), dots = $$('.g-dots i', gal);
    var links = $$('[data-zoom]', track);
    var t0;
    track.addEventListener('scroll', function () {
      clearTimeout(t0);
      t0 = setTimeout(function () { var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); dots.forEach(function (d, k) { d.classList.toggle('on', k === i); }); }, 60);
    });
    var lb = $('[data-lightbox]', gal);
    if (lb && lb.showModal) {
      var img = $('[data-lb-img]', lb), at = 0;
      var open = function (i) { at = (i + links.length) % links.length; img.src = links[at].getAttribute('href'); };
      track.addEventListener('click', function (e) { var a = e.target.closest('[data-zoom]'); if (!a) return; e.preventDefault(); open(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { open(at + +b.getAttribute('data-lb-step')); }); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    }
  }

  // ── Giỏ hàng ──
  var dlg = $('[data-bag]');
  var items = load('-bag', []);
  if (!Array.isArray(items)) items = [];
  var list = $('[data-bag-list]', dlg), bagBody = $('[data-bag-body]', dlg), emptyMsg = $('[data-bag-empty]', dlg);
  var fee = +dlg.getAttribute('data-fee') || 0, free = dlg.getAttribute('data-free') === '' ? null : +dlg.getAttribute('data-free');
  var totals = function () {
    var sub = items.reduce(function (s, x) { return s + x.price * x.qty; }, 0);
    var ship = !items.length ? 0 : free != null && sub >= free ? 0 : fee;
    return { sub: sub, ship: ship, total: sub + ship, qty: items.reduce(function (s, x) { return s + x.qty; }, 0) };
  };
  var paint = function () {
    var tt = totals();
    $$('[data-bag-count]').forEach(function (b) { b.textContent = tt.qty; b.hidden = !tt.qty; });
    emptyMsg.hidden = items.length > 0; bagBody.hidden = !items.length;
    list.innerHTML = items.map(function (x, i) {
      return '<li><a href="' + esc(x.href) + '"><img src="' + esc(x.img) + '" alt="" width="72" height="72"></a><div class="bi"><a href="' + esc(x.href) + '"><b>' + esc(x.name) + '</b></a>'
        + '<small>' + esc([x.color, x.size].filter(Boolean).join(' · ')) + '</small><span>' + esc(money(x.price)) + '</span></div>'
        + '<div class="bq"><button type="button" data-i="' + i + '" data-d="-1" aria-label="−">−</button><b>' + x.qty + '</b><button type="button" data-i="' + i + '" data-d="1" aria-label="+">+</button></div>'
        + '<button type="button" class="bx" data-rm="' + i + '" aria-label="' + esc(list.getAttribute('data-remove')) + '">✕</button></li>';
    }).join('');
    $('[data-s-sub]', dlg).textContent = money(tt.sub);
    var shipEl = $('[data-s-ship]', dlg);
    shipEl.textContent = tt.ship ? money(tt.ship) : shipEl.getAttribute('data-free-label');
    $('[data-s-total]', dlg).textContent = money(tt.total);
    var fb = $('[data-freebar]', dlg);
    if (free != null && fee) {
      fb.hidden = false;
      var left = free - tt.sub;
      $('[data-freebar-text]', fb).textContent = left > 0 ? dlg.getAttribute('data-free-tpl').replace('{n}', money(left)) : dlg.getAttribute('data-free-ok');
      $('[data-freebar-fill]', fb).style.width = Math.min(100, Math.round(tt.sub / free * 100)) + '%';
    }
  };
  var store = function () { save('-bag', items); paint(); };
  list.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-rm')) items.splice(+b.getAttribute('data-rm'), 1);
    else { var x = items[+b.getAttribute('data-i')]; x.qty = Math.max(1, Math.min(50, x.qty + +b.getAttribute('data-d'))); }
    store();
  });
  var openBag = function () { paint(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); };
  document.addEventListener('click', function (e) { if (e.target.closest('[data-bag-open]')) { e.preventDefault(); openBag(); } });
  $('[data-bag-close]', dlg).addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  window.addEventListener('storage', function (e) { if (e.key === STORE + '-bag') { items = load('-bag', []); paint(); } });
  paint();

  // ── Trang sản phẩm: màu, size, số lượng, thêm vào giỏ ──
  var pdp = $('[data-product]');
  if (pdp) {
    var pickInput = function (n) { return pdp.querySelector('input[name="' + n + '"]:checked'); };
    var sizeField = $('[data-size-field]', pdp), sizeMsg = $('[data-size-msg]', pdp);
    var setLabel = function (n, v) { var l = $('[data-v="' + n + '"]', pdp); if (l) l.textContent = v; };
    pdp.addEventListener('change', function (e) {
      if (e.target.name === 'color') setLabel('color', e.target.value);
      if (e.target.name === 'size') { setLabel('size', e.target.getAttribute('data-label')); if (sizeMsg) sizeMsg.hidden = true; }
    });
    if (mySize && sizeField && pdp.getAttribute('data-letters') === '1') {
      var r = pdp.querySelector('input[name="size"][value="' + mySize.size + '"]:not(:disabled)');
      var mm = $('[data-mine-msg]', pdp);
      if (r) { r.checked = true; setLabel('size', r.getAttribute('data-label')); }
      if (mm) { mm.textContent = mm.getAttribute('data-tpl').replace('{size}', mySize.size); mm.hidden = false; }
    }
    var q = $('[data-qty] input', pdp);
    $$('[data-qty] button', pdp).forEach(function (b) { b.addEventListener('click', function () { q.value = Math.max(1, Math.min(20, (+q.value || 1) + +b.getAttribute('data-d'))); }); });
    $('[data-add]', pdp).addEventListener('click', function () {
      var s = pickInput('size'), c = pickInput('color');
      if (sizeField && !s) { sizeMsg.hidden = false; sizeField.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      var key = pdp.getAttribute('data-id') + '|' + (s ? s.value : '') + '|' + (c ? c.value : '');
      var qty = Math.max(1, Math.min(20, +q.value || 1));
      var ex = items.filter(function (x) { return x.key === key; })[0];
      if (ex) ex.qty = Math.min(50, ex.qty + qty);
      else items.push({ key: key, id: pdp.getAttribute('data-id'), name: pdp.getAttribute('data-name'), price: +pdp.getAttribute('data-price'), img: pdp.getAttribute('data-img'), href: pdp.getAttribute('data-href'), size: s ? s.getAttribute('data-label') : '', color: c ? c.value : '', qty: qty });
      store();
      $('[data-added]', pdp).hidden = false;
    });
  }

  // ── Đặt hàng ──
  var form = $('[data-checkout]');
  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var tt = totals();
    return {
      intent: get('intent'), name: get('name'), phone: get('phone'), address: get('address'), note: get('note'),
      product: items.map(function (x) { return x.qty + ' × ' + x.name + (x.size || x.color ? ' (' + [x.color, x.size].filter(Boolean).join(', ') + ')' : ''); }).join('; '),
      qty: String(tt.qty), price: money(tt.total) + (tt.ship ? ' (' + money(tt.sub) + ' + ' + money(tt.ship) + ')' : ''),
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function (o) {
    var ok = true;
    ['name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      var bad = k === 'phone' ? o.phone.replace(/\D/g, '').length < 8 : !o.name;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
    err.hidden = ok;
    if (!ok) form.querySelector('[aria-invalid="true"]').focus();
    return ok;
  };
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0f = Date.now();
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var o = order();
    if (o.website || Date.now() - t0f < 2500) return;
    if (!channel && !valid(o)) return;
    var msg = text(o);
    var box = $('[data-done]', form);
    var done = function () {
      $('.order-fields', form).hidden = true;
      box.hidden = false; box.focus();
      $$('button[data-channel]', box).forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    if (!channel) {
      if (!gform) { done(); return; }
      var data = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], k === 'note' && o.intent ? o.intent + (o.note ? ' · ' + o.note : '') : (o[k] || '')); });
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(function () { done(); items = []; store(); }, function () {
        btn.disabled = false;
        var f = box.querySelector('button[data-channel]');
        if (f) send(f.getAttribute('data-channel'), f.getAttribute('data-href'), msg, $('.form-msg', form), o.product);
      });
      return;
    }
    var b = channel; channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.product);
  });
  $('[data-edit]', form).addEventListener('click', function () { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; });
})();
