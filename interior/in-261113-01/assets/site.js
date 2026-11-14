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

// Mẫu Nội thất gia đình: lọc loại / phòng / bộ phòng / mức giá / có sẵn, tìm không dấu, sắp xếp, "Xem thêm";
// "Có vừa không?" (chỗ đặt + khung cửa, inch hoặc cm theo khu vực); mẫu vải miễn phí (tối đa N mẫu → tin nhắn soạn sẵn);
// trang sản phẩm: thư viện ảnh, kích thước (đổi giá + số đo), màu, thử khung cửa, cách giao + lắp ráp → tạm tính, form đặt hàng.
// Không có JavaScript thì trang vẫn hiện đủ sản phẩm, kích thước, giá, cách giao và nút liên hệ.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
  var LOC = { en: 'en-US', sv: 'sv-SE', vi: 'vi-VN', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', ja: 'ja-JP', ko: 'ko-KR', zh: 'zh-CN', th: 'th-TH', id: 'id-ID', pt: 'pt-BR', ru: 'ru-RU' };
  var lang = body.getAttribute('data-lang') || 'en';
  var units = body.getAttribute('data-units') || 'cm';
  var num = function (v) { return parseFloat(String(v || '').replace(',', '.')); };
  // Số đo người dùng nhập (inch hoặc cm) → cm; cm → số hiển thị theo đơn vị khu vực.
  var toCm = function (v) { return units === 'in' ? v * 2.54 : v; };
  var show = function (cm) { var n = units === 'in' ? Math.round(cm / 2.54 * 2) / 2 : Math.round(cm); return new Intl.NumberFormat(LOC[lang] || lang, { maximumFractionDigits: 1 }).format(n); };

  function send(channel, href, text, msg, subject) {
    if (channel === 'whatsapp') href = 'https://wa.me/' + body.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
    if (channel === 'email') href = 'mailto:' + body.getAttribute('data-email') + '?subject=' + encodeURIComponent(subject || text) + '&body=' + encodeURIComponent(text);
    var open = function () { window.open(href, channel === 'phone' || channel === 'email' ? '_self' : '_blank', 'noopener'); };
    if (channel === 'whatsapp' || channel === 'email') { open(); return; }
    var done = function (s) { if (msg) { msg.textContent = s; msg.hidden = false; } open(); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(body.getAttribute('data-copied')); }, function () { done(text); });
    } else done(text);
  }

  // ── Lưới sản phẩm ──
  var grid = $('[data-grid]');
  var bar = $('[data-toolbar]');
  if (grid && bar) {
    var cards = Array.prototype.slice.call(grid.children);
    var params = new URLSearchParams(location.search);
    var state = { type: params.get('type') || '', room: params.get('room') || '', set: params.get('set') || '', band: '', q: '', sort: '', stock: false, all: false };
    var count = $('[data-count]');
    var empty = $('[data-empty]');
    var more = $('[data-more]');
    var sel = function (k) { return bar.querySelector('[data-' + k + ']'); };
    var has = function (c, attr, v) { return !v || (' ' + c.getAttribute(attr) + ' ').indexOf(' ' + v + ' ') >= 0; };
    var inBand = function (c) {
      if (!state.band) return true;
      var r = state.band.split('-'), p = +c.getAttribute('data-price');
      return p >= +r[0] && (r[1] === '' || p < +r[1]);
    };
    var apply = function () {
      var filtering = state.type || state.room || state.set || state.band || state.q || state.stock;
      var shown = 0;
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
      sorted.forEach(function (c) {
        var ok = (!state.type || c.getAttribute('data-type') === state.type) && has(c, 'data-room', state.room) && has(c, 'data-set', state.set)
          && (!state.stock || c.getAttribute('data-stock') === 'stock') && inBand(c) && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        if (ok) shown++;
        c.hidden = !ok || (!filtering && !state.all && shown > 24);
        grid.appendChild(c);
      });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      if (more) more.hidden = !!filtering || state.all || shown <= 24;
      $$('[data-type]', bar).forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-type') === state.type); });
      ['room', 'set'].forEach(function (k) { var el = sel(k); if (el) el.value = state[k]; });
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-type]');
      if (!b) return;
      state.type = b.getAttribute('data-type');
      apply();
    });
    sel('search').addEventListener('input', function (e) { state.q = plain(e.target.value.trim()); apply(); });
    sel('sort').addEventListener('change', function (e) { state.sort = e.target.value; apply(); });
    sel('stockonly').addEventListener('change', function (e) { state.stock = e.target.checked; apply(); });
    ['room', 'set', 'band'].forEach(function (k) {
      var el = sel(k);
      if (el) el.addEventListener('change', function (e) { state[k] = e.target.value; apply(); });
    });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-filter-link]');
      if (!a) return;
      e.preventDefault();
      var k = a.getAttribute('data-filter-link'), v = a.getAttribute('data-value');
      state.type = k === 'type' ? v : '';
      state.room = k === 'room' ? v : '';
      state.set = k === 'set' ? v : '';
      history.replaceState(null, '', '?' + k + '=' + v + '#shop');
      apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    apply();
  }

  // Khung cửa: món đi qua được nếu cạnh nhỏ nhất (nghiêng món) + khe hở ≤ bề rộng cửa và cạnh thứ hai ≤ chiều cao cửa.
  function doorCheck(dims, dw, dh, gapCm) {
    var s = dims.slice().sort(function (a, b) { return a - b; });
    var spare = dw - s[0];
    return { ok: spare >= gapCm / 2 && (!dh || s[1] <= dh), spare: spare, side: s[0] };
  }

  // ── "Có vừa không?" ──
  var fitForm = $('[data-fit]');
  if (fitForm) {
    var out = $('[data-result]', fitForm);
    var gap = toCm(num(fitForm.getAttribute('data-gap')));
    var u = fitForm.getAttribute('data-u');
    var runFit = function () {
      var opt = fitForm.elements.piece.selectedOptions[0];
      var d = opt.getAttribute('data-dims').split(',').map(Number);
      var sw = num(fitForm.elements.sw.value), sd = num(fitForm.elements.sd.value), dw = num(fitForm.elements.dw.value), dh = num(fitForm.elements.dh.value);
      var lines = [];
      var cls = '';
      if (sw && sd) {
        var w = toCm(sw) - d[0], dd = toCm(sd) - d[1];
        if (w < 0 || dd < 0) { cls = 'no'; lines.push(fitForm.getAttribute('data-no').replace('{w}', show(Math.max(0, -w)) + ' ' + u).replace('{d}', show(Math.max(0, -dd)) + ' ' + u)); }
        else { var tight = w < gap || dd < gap; cls = tight ? 'tight' : 'ok'; lines.push(fitForm.getAttribute(tight ? 'data-tight' : 'data-ok').replace('{w}', show(w) + ' ' + u).replace('{d}', show(dd) + ' ' + u)); }
      }
      if (dw) {
        var r = doorCheck(d, toCm(dw), dh ? toCm(dh) : 0, gap);
        if (!r.ok) cls = 'no';
        lines.push(fitForm.getAttribute(r.ok ? 'data-door-ok' : 'data-door-no').replace('{x}', show(Math.abs(r.ok ? r.spare : r.side)) + ' ' + u));
      }
      out.textContent = lines.length ? lines.join(' ') : fitForm.getAttribute('data-need');
      out.className = 'result' + (cls ? ' is-' + cls : '');
      fitForm.setAttribute('data-state', cls);
    };
    fitForm.addEventListener('input', runFit);
    fitForm.addEventListener('change', runFit);
    fitForm.addEventListener('submit', function (e) { e.preventDefault(); runFit(); });
  }

  // ── Mẫu vải miễn phí ──
  var sw = $('[data-swatches]');
  if (sw) {
    var max = +sw.getAttribute('data-max') || 5;
    var left = $('[data-left-text]', sw);
    var boxes = $$('input[name="fabric"]', sw);
    var upd = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      boxes.forEach(function (b) { b.disabled = !b.checked && n >= max; });
      left.textContent = sw.getAttribute('data-left').replace('{n}', max - n);
    };
    sw.addEventListener('change', upd);
    sw.addEventListener('submit', function (e) {
      e.preventDefault();
      var picked = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
      var name = sw.elements.name.value.trim(), addr = sw.elements.address.value.trim();
      var bad = !picked.length || !name || !addr;
      $('[data-err]', sw).hidden = !bad;
      if (bad) return;
      var text = sw.getAttribute('data-text').replace('{fabrics}', picked.join(', ')).replace('{name}', name).replace('{address}', addr);
      send(sw.getAttribute('data-channel'), sw.getAttribute('data-href'), text, $('.form-msg', sw), text.split('.')[0]);
    });
    upd();
  }

  // ── Thư viện ảnh ──
  var gal = $('[data-gallery]');
  if (gal) {
    var track = gal.querySelector('.g-track');
    var slides = track.children;
    var n = slides.length, cur = 0;
    var thumbs = gal.querySelectorAll('[data-go]');
    var numEl = gal.querySelector('[data-g-i]');
    var prev = gal.querySelector('.g-prev'), next = gal.querySelector('.g-next');
    var showI = function (i) { cur = i; numEl.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === n - 1;
      thumbs.forEach(function (a, k) { if (k === i) { a.setAttribute('aria-current', 'true'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } else a.removeAttribute('aria-current'); }); };
    var go = function (i) { i = Math.max(0, Math.min(n - 1, i)); track.scrollTo({ left: i * track.clientWidth }); showI(i); };
    var t0;
    track.addEventListener('scroll', function () { clearTimeout(t0); t0 = setTimeout(function () { var i = Math.round(track.scrollLeft / track.clientWidth); if (i !== cur) showI(i); }, 60); });
    gal.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { go(cur + +b.getAttribute('data-step')); }); });
    thumbs.forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); go(+a.getAttribute('data-go')); }); });
    track.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
    showI(0);
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = lb.querySelector('[data-lb-img]'), lbNum = lb.querySelector('[data-lb-i]');
      var srcs = Array.prototype.map.call(slides, function (li) { return li.querySelector('a').getAttribute('href'); });
      var at = 0;
      var open = function (i) { at = (i + n) % n; img.src = srcs[at]; lbNum.textContent = at + 1; };
      track.addEventListener('click', function (e) { var a = e.target.closest('[data-zoom]'); if (!a) return; e.preventDefault(); open(+a.getAttribute('data-zoom')); lb.showModal(); });
      lb.querySelectorAll('[data-lb-step]').forEach(function (b) { b.addEventListener('click', function () { open(at + +b.getAttribute('data-lb-step')); }); });
      lb.querySelector('[data-lb-close]').addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('close', function () { go(at); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(at + 1); if (e.key === 'ArrowLeft') open(at - 1); });
      var x0 = null;
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(at + (dx < 0 ? 1 : -1)); x0 = null; });
    }
  }

  // ── Trang sản phẩm ──
  var pdp = $('[data-product]');
  if (!pdp) return;
  var cur$ = pdp.getAttribute('data-cur');
  var loc = LOC[pdp.getAttribute('data-locale')] || 'en-US';
  var money = function (v) { return new Intl.NumberFormat(loc, { style: 'currency', currency: cur$, maximumFractionDigits: v % 1 ? 2 : 0, minimumFractionDigits: v % 1 ? 2 : 0 }).format(v); };
  var pickInput = function (name) { return pdp.querySelector('input[name="' + name + '"]:checked') || pdp.querySelector('input[type="hidden"][name="' + name + '"]'); };
  var setLabel = function (k, v) { var lab = $('[data-v="' + k + '"]', pdp); if (lab) lab.textContent = v; };
  var form = pdp.querySelector('form[data-compose]');
  var est = $('[data-est]', form);

  // Tạm tính: giá × số lượng + phí giao (miễn phí khi đủ mức đơn) + lắp ráp × số lượng + thu đồ cũ.
  var calc = function () {
    var s = pickInput('size');
    var price = +s.getAttribute('data-price');
    var qty = Math.max(1, Math.min(20, parseInt(form.elements.qty.value, 10) || 1));
    var items = price * qty;
    var ship = form.querySelector('input[name="ship"]:checked');
    var free = +pdp.getAttribute('data-free');
    var shipCost = ship ? +ship.getAttribute('data-cost') : 0;
    if (ship && free && ship.getAttribute('data-free') === '1' && items >= free) shipCost = 0;
    var asm = form.elements.assembly && form.elements.assembly.checked ? +pdp.getAttribute('data-assembly') * qty : 0;
    var haul = form.elements.haul && form.elements.haul.checked ? +pdp.getAttribute('data-haul') * qty : 0;
    var r = { price: price, qty: qty, items: items, ship: shipCost, extra: asm + haul, total: items + shipCost + asm + haul, shipName: ship ? ship.value : '' };
    if (est) {
      $('[data-e="items"]', est).textContent = qty > 1 ? qty + ' × ' + money(price) + ' = ' + money(items) : money(items);
      $('[data-e="ship"]', est).textContent = ship ? (shipCost ? money(shipCost) : est.getAttribute('data-free-text')) + ' · ' + r.shipName : '–';
      $('[data-e-row="extra"]', est).hidden = !r.extra;
      $('[data-e="extra"]', est).textContent = money(r.extra);
      $('[data-e="total"]', est).textContent = money(r.total);
    }
    return r;
  };

  // Thử khung cửa trên trang sản phẩm (theo kích thước đang chọn).
  var door = $('[data-door]', pdp);
  var runDoor = function () {
    if (!door) return;
    var d = pickInput('size').getAttribute('data-dims').split(',').map(Number);
    var dw = num(door.querySelector('[name="dw"]').value), dh = num(door.querySelector('[name="dh"]').value);
    var o = $('[data-door-result]', door);
    if (!dw || d.length < 3) { o.textContent = ''; o.className = 'result'; return; }
    var r = doorCheck(d, toCm(dw), dh ? toCm(dh) : 0, toCm(num(door.getAttribute('data-gap'))));
    var u = door.querySelector('b').textContent;
    o.textContent = door.getAttribute(r.ok ? 'data-ok' : 'data-no').replace('{x}', show(Math.abs(r.ok ? r.spare : r.side)) + ' ' + u);
    o.className = 'result is-' + (r.ok ? 'ok' : 'no');
  };
  if (door) door.addEventListener('input', runDoor);

  pdp.addEventListener('change', function (e) {
    var k = e.target.name;
    if (k === 'color') setLabel('color', e.target.value);
    if (k === 'size') {
      setLabel('size', e.target.value);
      $('[data-price-text]', pdp).textContent = e.target.getAttribute('data-label');
      var dt = $('[data-dims-text]', pdp);
      if (dt) dt.textContent = e.target.getAttribute('data-dims-text');
      runDoor();
    }
    calc();
  });
  form.addEventListener('input', calc);
  calc();

  var err = form.querySelector('[data-err]');
  var channel = null;
  form.querySelectorAll('button[data-channel]').forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = pickInput('size'), c = pickInput('color'), r = calc();
    var extras = [form.elements.assembly && form.elements.assembly.checked ? form.elements.assembly.parentNode.textContent.trim() : '', form.elements.haul && form.elements.haul.checked ? form.elements.haul.parentNode.textContent.trim() : ''].filter(Boolean).join(', ');
    return {
      name: get('name'), phone: get('phone'), qty: String(r.qty), address: get('address'), note: get('note'),
      product: pdp.getAttribute('data-name'), size: s.value, price: money(r.price), color: c ? c.value : '', ship: r.shipName, extras: extras, total: money(r.total),
      page: location.href.split('#')[0], market: pdp.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return pdp.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function (o) {
    var ok = true;
    ['name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      var bad = k === 'phone' ? o.phone.replace(/\D/g, '').length < 7 : !o.name;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) ok = false;
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
    if (!valid(o)) return;
    var msg = text(o);
    var box = form.querySelector('[data-done]');
    var done = function () {
      form.querySelector('.order-fields').hidden = true;
      box.hidden = false;
      box.focus();
      box.querySelectorAll('button[data-channel]').forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    if (!channel) {
      if (!gform) { done(); return; }
      var data = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], k === 'note' ? [o.size, o.color, o.ship, o.extras, o.total, o.note].filter(Boolean).join(' · ') : (o[k] || '')); });
      var btn = form.querySelector('[data-order-submit]');
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, function () {
        btn.disabled = false;
        var first = box.querySelector('button[data-channel]');
        if (first) send(first.getAttribute('data-channel'), first.getAttribute('data-href'), msg, form.querySelector('.form-msg'), o.product);
      });
      return;
    }
    var b = channel;
    channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, form.querySelector('.form-msg'), o.product);
  });
  var edit = form.querySelector('[data-edit]');
  if (edit) edit.addEventListener('click', function () { form.querySelector('[data-done]').hidden = true; form.querySelector('.order-fields').hidden = false; });
  var dock = $('.dock .primary');
  if (dock) dock.addEventListener('click', function (e) { e.preventDefault(); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
})();
