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

// Mẫu Thợ may đo: thanh lọc nhiều lựa chọn (cùng nhóm = "hoặc", khác nhóm = "và"; đọc / ghi ?type=…&cut=… trên địa chỉ), tìm không dấu,
// sắp xếp, nhãn lọc đang chọn, "Xem thêm"; ngăn kéo lọc trên điện thoại; chọn dịp mặc → lời khuyên + lọc mẫu hợp.
// Trang mẫu: ảnh vuốt + phóng to, màu vải, chọn vải (cộng tiền vào giá), cách lấy số đo, số lượng, "Thêm vào đơn may"; đơn may nhiều món lưu theo khu vực
// (localStorage, có try/catch), phí giao + thanh miễn phí giao + tiền cọc, gửi Google Form hoặc tin nhắn. Đặt lịch đo may: giờ trống theo giờ mở cửa, không chọn giờ đã qua.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var STORE = body.getAttribute('data-store') || 'kp-tailor';
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

  // ── Cửa hàng: lọc, tìm, sắp xếp ──
  var grid = $('[data-grid]');
  var side = $('[data-side]');
  if (grid && side) {
    var cards = Array.prototype.slice.call(grid.children);
    var KEYS = ['type', 'cut', 'occasion', 'material', 'for', 'band'];
    var ATTR = { type: 'data-type', cut: 'data-cut', occasion: 'data-occasion', material: 'data-material', for: 'data-for', band: 'data-band' };
    var params = new URLSearchParams(location.search);
    var state = { q: '', sort: '', all: false };
    KEYS.forEach(function (k) { state[k] = (params.get(k) || '').split(',').filter(Boolean); });
    var boxes = $$('input[data-f]', side);
    var count = $('[data-count]'), empty = $('[data-empty]'), more = $('button[data-more]'), chosen = $('[data-chosen]'), nsel = $('[data-nsel]');
    var showBtn = $('[data-show-tpl]', side);
    var label = function (k, v) { var b = boxes.filter(function (x) { return x.getAttribute('data-f') === k && x.value === v; })[0]; return b ? b.parentNode.querySelector('span').textContent : v; };
    var match = function (c, k) {
      var sel = state[k];
      if (!sel.length) return true;
      var have = (' ' + (c.getAttribute(ATTR[k]) || '') + ' ');
      return sel.some(function (v) { return have.indexOf(' ' + v + ' ') >= 0; });
    };
    var write = function () {
      var p = new URLSearchParams();
      KEYS.forEach(function (k) { if (state[k].length) p.set(k, state[k].join(',')); });
      var s = p.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + '#shop');
    };
    var apply = function () {
      var n = 0;
      KEYS.forEach(function (k) { n += state[k].length; });
      var filtering = n > 0 || !!state.q;
      var shown = 0;
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
      sorted.forEach(function (c) {
        var ok = KEYS.every(function (k) { return match(c, k); }) && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        if (ok) shown++;
        c.hidden = !ok || (!filtering && !state.all && shown > 24);
        grid.appendChild(c);
      });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      if (more) more.hidden = filtering || state.all || shown <= 24;
      if (showBtn) showBtn.textContent = showBtn.getAttribute('data-show-tpl').replace('{n}', shown);
      if (nsel) { nsel.hidden = !n; nsel.textContent = n; }
      boxes.forEach(function (b) { b.checked = state[b.getAttribute('data-f')].indexOf(b.value) >= 0; });
      if (chosen) {
        var html = '';
        KEYS.forEach(function (k) { state[k].forEach(function (v) { html += '<li><button type="button" data-unpick="' + k + '" data-v="' + v + '">' + label(k, v).replace(/</g, '&lt;') + ' <span aria-hidden="true">✕</span></button></li>'; }); });
        chosen.innerHTML = html;
        chosen.hidden = !html;
      }
    };
    side.addEventListener('change', function (e) {
      var b = e.target.closest('input[data-f]');
      if (!b) return;
      var k = b.getAttribute('data-f'), i = state[k].indexOf(b.value);
      if (b.checked && i < 0) state[k].push(b.value);
      if (!b.checked && i >= 0) state[k].splice(i, 1);
      write(); apply();
    });
    if (chosen) chosen.addEventListener('click', function (e) {
      var b = e.target.closest('[data-unpick]');
      if (!b) return;
      var k = b.getAttribute('data-unpick'), i = state[k].indexOf(b.getAttribute('data-v'));
      if (i >= 0) state[k].splice(i, 1);
      write(); apply();
    });
    var reset = function () { KEYS.forEach(function (k) { state[k] = []; }); state.q = ''; var s = $('[data-search]'); if (s) s.value = ''; write(); apply(); };
    $$('[data-reset]').forEach(function (b) { b.addEventListener('click', reset); });
    var search = $('[data-search]');
    if (search) search.addEventListener('input', function () { state.q = plain(search.value.trim()); apply(); });
    var sort = $('[data-sort]');
    if (sort) sort.addEventListener('change', function () { state.sort = sort.value; apply(); });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    // Lối tắt (đầu trang, thẻ vùng trồng): lọc đúng một giá trị rồi cuộn tới cửa hàng.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-jump]');
      if (!a) return;
      e.preventDefault();
      KEYS.forEach(function (k) { state[k] = []; });
      state[a.getAttribute('data-jump')] = [a.getAttribute('data-value')];
      write(); apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    // Ngăn kéo bộ lọc trên điện thoại.
    var openSide = function () { side.classList.add('is-open'); body.classList.add('side-open'); var f = side.querySelector('input'); if (f) f.focus(); };
    var closeSide = function () { side.classList.remove('is-open'); body.classList.remove('side-open'); };
    $$('[data-side-open]').forEach(function (b) { b.addEventListener('click', openSide); });
    $$('[data-side-close]', side).forEach(function (b) { b.addEventListener('click', closeSide); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && side.classList.contains('is-open')) closeSide(); });

    // Dịp mặc: bấm để xem lời khuyên; "Xem mẫu hợp" lọc bộ sưu tập theo dịp.
    $$('[data-occ-pick]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-occ-pick');
        $$('[data-occ-pick]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        $$('[data-occ-tip]').forEach(function (x) { x.hidden = x.getAttribute('data-occ-tip') !== id; });
      });
    });
    $$('[data-occ-go]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        KEYS.forEach(function (k) { state[k] = []; });
        state.occasion = [a.getAttribute('data-occ-go')];
        write(); apply();
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
      });
    });
    apply();
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
  var depPct = +dlg.getAttribute('data-deposit') || 0;
  var totals = function () {
    var sub = items.reduce(function (s, x) { return s + x.price * x.qty; }, 0);
    var ship = !items.length ? 0 : free != null && sub >= free ? 0 : fee;
    return { sub: sub, ship: ship, total: sub + ship, dep: Math.round(sub * depPct / 100), qty: items.reduce(function (s, x) { return s + x.qty; }, 0) };
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
    var depEl = $('[data-s-dep]', dlg);
    if (depEl) depEl.textContent = money(tt.dep);
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

  // ── Trang mẫu: màu vải, vải (cộng tiền), cách lấy số đo, số lượng, thêm vào đơn may ──
  var pdp = $('[data-product]');
  if (pdp) {
    var base = +pdp.getAttribute('data-price'), totalEl = $('[data-pdp-total]', pdp);
    var picked = function (n) { return pdp.querySelector('input[name="' + n + '"]:checked'); };
    var unit = function () { var l = picked('fabric'); return base + (l ? +l.getAttribute('data-add') || 0 : 0); };
    var showTotal = function () { totalEl.textContent = money(unit()); };
    pdp.addEventListener('change', function (e) {
      if (e.target.name === 'color') { var lab = $('[data-v="color"]', pdp); if (lab) lab.textContent = e.target.value; }
      if (e.target.name === 'fabric') showTotal();
    });
    var q = $('[data-qty] input', pdp);
    $$('[data-qty] button', pdp).forEach(function (b) { b.addEventListener('click', function () { q.value = Math.max(1, Math.min(10, (+q.value || 1) + +b.getAttribute('data-d'))); }); });
    $('[data-add-bag]', pdp).addEventListener('click', function () {
      var c = picked('color'), l = picked('fabric'), ms = pdp.querySelector('select[name="measure"]');
      var fabName = l && +l.getAttribute('data-add') ? l.value : '';
      var key = pdp.getAttribute('data-id') + '|' + (c ? c.value : '') + '|' + (l ? l.value : '') + '|' + (ms ? ms.value : '');
      var qty = Math.max(1, Math.min(10, +q.value || 1));
      var ex = items.filter(function (x) { return x.key === key; })[0];
      if (ex) ex.qty = Math.min(20, ex.qty + qty);
      else items.push({ key: key, id: pdp.getAttribute('data-id'), name: pdp.getAttribute('data-name'), price: unit(), img: pdp.getAttribute('data-img'), href: pdp.getAttribute('data-href'), color: c ? c.value : '', size: [fabName, ms ? ms.value : ''].filter(Boolean).join(' · '), qty: qty });
      store();
      $('[data-added]', pdp).hidden = false;
    });
    showTotal();
  }

  // ── Đặt lịch đo may: giờ trống theo giờ mở cửa của ngày đã chọn ──
  var ef = $('[data-exam]');
  if (ef) {
    var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
    var now = function () { var p = {}; new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; }); return { day: p.year + '-' + p.month + '-' + p.day, min: +p.hour * 60 + +p.minute }; };
    var hhmm = function (n) { return ('0' + Math.floor(n / 60)).slice(-2) + ':' + ('0' + (n % 60)).slice(-2); };
    var addDay = function (d, n) { var x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
    var hours = JSON.parse(ef.getAttribute('data-hours') || '[]'), step = +ef.getAttribute('data-step') || 30, lead = +ef.getAttribute('data-lead') || 60, len = +ef.getAttribute('data-len') || 20;
    var dEl = $('[data-date]', ef), tEl = $('[data-time]', ef), tNote = $('[data-time-note]', ef);
    var today = now().day;
    dEl.min = today; dEl.max = addDay(today, 60);
    var slots = function () {
      var wd = new Date(dEl.value + 'T00:00:00Z').getUTCDay(), list = [];
      var spans = hours.filter(function (h) { return h.d.indexOf(wd) >= 0; });
      spans.forEach(function (h) { for (var m = h.o; m + len <= h.c; m += step) if (!(dEl.value === today && m < now().min + lead)) list.push(hhmm(m)); });
      tEl.innerHTML = list.map(function (x) { return '<option>' + x + '</option>'; }).join('');
      tNote.hidden = list.length > 0;
      tNote.textContent = spans.length ? tNote.getAttribute('data-none') : tNote.getAttribute('data-closed');
      return list.length;
    };
    dEl.value = today;
    for (var k2 = 0; k2 < 8 && !slots(); k2++) dEl.value = addDay(today, k2 + 1);
    dEl.addEventListener('change', function () { if (!dEl.value || dEl.value < today) dEl.value = today; slots(); });
    var eErr = $('[data-err]', ef), eChannel = null;
    $$('button[data-channel]', ef).forEach(function (b) { b.addEventListener('click', function () { eChannel = b; }); });
    var eOrder = function () {
      var d = new FormData(ef), get = function (k) { return (d.get(k) || '').toString().trim(); };
      return { name: get('name'), phone: get('phone'), product: get('need'), date: get('date') + ' ' + get('time'), note: get('note'), page: location.href.split('#')[0], market: ef.getAttribute('data-market'), website: get('website') };
    };
    var eText = function (o) { return ef.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
    var eValid = function () {
      var ok = true;
      ['name', 'phone', 'time'].forEach(function (k) {
        var el = ef.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
        var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
        el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
      });
      eErr.hidden = ok;
      if (!ok) ef.querySelector('[aria-invalid="true"]').focus();
      return ok;
    };
    var egform = ef.getAttribute('data-gform'), egmap = egform ? JSON.parse(ef.getAttribute('data-gmap')) : null, et0 = Date.now();
    ef.addEventListener('submit', function (e) {
      e.preventDefault();
      var o = eOrder();
      if (o.website || Date.now() - et0 < 2500) return;
      if (!eChannel && !eValid()) return;
      var msg = eText(o), box = $('[data-done]', ef);
      var done = function () { $('.order-fields', ef).hidden = true; box.hidden = false; box.focus(); $$('button[data-channel]', box).forEach(function (x) { x.setAttribute('data-msg', msg); }); };
      if (!eChannel) {
        if (!egform) { done(); return; }
        var data = new URLSearchParams();
        Object.keys(egmap).forEach(function (k) { data.append(egmap[k], o[k] || ''); });
        fetch(egform, { method: 'POST', mode: 'no-cors', body: data }).then(done, done);
        return;
      }
      var b = eChannel; eChannel = null;
      send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', ef), o.product);
    });
    var eEdit = $('[data-edit]', ef);
    if (eEdit) eEdit.addEventListener('click', function () { $('[data-done]', ef).hidden = true; $('.order-fields', ef).hidden = false; });
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
      intent: get('intent'), name: get('name'), phone: get('phone'), address: get('address'), note: get('note'), date: get('date'),
      product: items.map(function (x) { return x.qty + ' × ' + x.name + (x.size || x.color ? ' (' + [x.color, x.size].filter(Boolean).join(', ') + ')' : ''); }).join('; '),
      qty: String(tt.qty), price: money(tt.total) + (tt.ship ? ' (' + money(tt.sub) + ' + ' + money(tt.ship) + ')' : ''), deposit: tt.dep ? money(tt.dep) : '',
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
