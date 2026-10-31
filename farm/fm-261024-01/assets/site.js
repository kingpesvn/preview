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

// Mẫu Cửa hàng cây cảnh: "Cây hợp chỗ nào?" + lọc danh mục / chỗ đặt / ánh sáng / độ dễ chăm / an toàn thú cưng, tìm không dấu, sắp xếp, "Xem thêm";
// đếm ngược giờ chốt đơn giao trong ngày (theo múi giờ của shop); trang cây: thư viện ảnh, cỡ cây, chọn chậu, thiệp (đếm ký tự),
// ngày giao sớm nhất + khung giờ, tự cộng tiền cây + chậu + phí giao, form đặt hàng → Google Form hoặc tin nhắn soạn sẵn.
// Không có JavaScript thì trang vẫn hiện đủ cây, giá và nút liên hệ.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';

  /** Ngày giờ hiện tại ở múi giờ của shop: { y, m, d, min } (min = số phút từ 0:00). */
  var shopNow = function () {
    var parts = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    return { y: +parts.year, m: +parts.month, d: +parts.day, min: +parts.hour * 60 + +parts.minute };
  };
  var toMin = function (hhmm) { var a = String(hhmm || '').split(':'); return a.length === 2 ? +a[0] * 60 + +a[1] : null; };
  var iso = function (y, m, d) { var x = new Date(Date.UTC(y, m - 1, d)); return x.toISOString().slice(0, 10); };

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

  // ── Giờ chốt đơn giao trong ngày ──
  var cut = $('[data-cutoff]:not([data-product])');
  if (cut) {
    var span = $('span', cut);
    var tick = function () {
      var c = toMin(cut.getAttribute('data-cutoff')), now = shopNow().min;
      if (c == null) return;
      var left = c - now;
      cut.classList.toggle('is-late', left <= 0);
      span.textContent = left > 0
        ? cut.getAttribute('data-before').replace('{time}', cut.getAttribute('data-cutoff')).replace('{h}', Math.floor(left / 60)).replace('{m}', left % 60)
        : cut.getAttribute('data-after').replace('{time}', cut.getAttribute('data-cutoff'));
    };
    tick();
    setInterval(tick, 30000);
  }

  // ── Lưới cây + "Cây hợp chỗ nào?" ──
  var grid = $('[data-grid]');
  var bar = $('[data-toolbar]');
  if (grid && bar) {
    var cards = Array.prototype.slice.call(grid.children);
    var params = new URLSearchParams(location.search);
    var KEYS = ['place', 'light', 'care'];
    var state = { type: params.get('type') || '', place: params.get('place') || '', light: params.get('light') || '', care: params.get('care') || '', pet: params.get('pet') === '1', q: '', sort: '', all: false };
    var count = $('[data-count]');
    var empty = $('[data-empty]');
    var more = $('[data-more]');
    var picked = $('[data-picked]');
    var petBox = bar.querySelector('[data-pet]');
    var sel = function (k) { return bar.querySelector('select[data-' + k + ']'); };
    var has = function (c, attr, v) { return !v || (' ' + c.getAttribute(attr) + ' ').indexOf(' ' + v + ' ') >= 0; };
    var optText = function (k) { var el = sel(k); return el && el.value ? el.options[el.selectedIndex].text : ''; };
    var apply = function () {
      var filtering = state.type || state.place || state.light || state.care || state.pet || state.q;
      var shown = 0;
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
      sorted.forEach(function (c) {
        var ok = (!state.type || c.getAttribute('data-type') === state.type) && has(c, 'data-place', state.place) && has(c, 'data-light', state.light)
          && has(c, 'data-care', state.care) && (!state.pet || c.getAttribute('data-pet') === '1') && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        if (ok) shown++;
        c.hidden = !ok || (!filtering && !state.all && shown > 24);
        grid.appendChild(c);
      });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      if (more) more.hidden = !!filtering || state.all || shown <= 24;
      $$('[data-type]', bar).forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-type') === state.type); });
      KEYS.forEach(function (k) { var el = sel(k); if (el) el.value = state[k]; });
      if (petBox) petBox.checked = state.pet;
      if (picked) {
        var words = KEYS.map(optText).concat(state.pet && petBox ? [petBox.parentNode.textContent.trim()] : []).filter(Boolean);
        picked.hidden = !words.length;
        $('[data-picked-text]', picked).textContent = words.join(' · ');
      }
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-type]');
      if (!b) return;
      state.type = b.getAttribute('data-type');
      apply();
    });
    bar.querySelector('[data-search]').addEventListener('input', function (e) { state.q = plain(e.target.value.trim()); apply(); });
    bar.querySelector('[data-sort]').addEventListener('change', function (e) { state.sort = e.target.value; apply(); });
    KEYS.forEach(function (k) {
      var el = sel(k);
      if (el) el.addEventListener('change', function (e) { state[k] = e.target.value; apply(); });
    });
    if (petBox) petBox.addEventListener('change', function () { state.pet = petBox.checked; apply(); });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    var reset = $('[data-reset]', bar);
    if (reset) reset.addEventListener('click', function () { state.type = state.place = state.light = state.care = state.q = ''; state.pet = false; bar.querySelector('[data-search]').value = ''; history.replaceState(null, '', location.pathname + '#shop'); apply(); });
    var finder = $('[data-finder]');
    if (finder) {
      KEYS.forEach(function (k) { var el = finder.querySelector('[name="' + k + '"]'); if (el) el.value = state[k]; });
      var fp = finder.querySelector('[name="pet"]');
      if (fp) fp.checked = state.pet;
      finder.addEventListener('submit', function (e) {
        e.preventDefault();
        KEYS.forEach(function (k) { var el = finder.querySelector('[name="' + k + '"]'); state[k] = el ? el.value : ''; });
        state.pet = !!(fp && fp.checked);
        state.type = '';
        apply();
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
      });
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-filter-link]');
      if (!a) return;
      e.preventDefault();
      var k = a.getAttribute('data-filter-link'), v = a.getAttribute('data-value');
      state.type = ''; state.light = ''; state.care = ''; state.pet = false;
      state.place = k === 'place' ? v : '';
      history.replaceState(null, '', '?' + k + '=' + v + '#shop');
      apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    apply();
  }

  // ── Thư viện ảnh ──
  var gal = $('[data-gallery]');
  if (gal) {
    var track = gal.querySelector('.g-track');
    var slides = track.children;
    var n = slides.length, cur = 0;
    var thumbs = gal.querySelectorAll('[data-go]');
    var num = gal.querySelector('[data-g-i]');
    var prev = gal.querySelector('.g-prev'), next = gal.querySelector('.g-next');
    var show = function (i) { cur = i; num.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === n - 1;
      thumbs.forEach(function (a, k) { if (k === i) { a.setAttribute('aria-current', 'true'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } else a.removeAttribute('aria-current'); }); };
    var go = function (i) { i = Math.max(0, Math.min(n - 1, i)); track.scrollTo({ left: i * track.clientWidth }); show(i); };
    var t0;
    track.addEventListener('scroll', function () { clearTimeout(t0); t0 = setTimeout(function () { var i = Math.round(track.scrollLeft / track.clientWidth); if (i !== cur) show(i); }, 60); });
    gal.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { go(cur + +b.getAttribute('data-step')); }); });
    thumbs.forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); go(+a.getAttribute('data-go')); }); });
    track.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
    show(0);
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

  // ── Trang cây: cỡ cây, chậu, thiệp, ngày giao, tổng tiền, đặt hàng ──
  var pdp = $('[data-product]');
  if (!pdp) return;
  var form = pdp.querySelector('form[data-compose]');
  var fmt = new Intl.NumberFormat(pdp.getAttribute('data-lang') || 'en', { style: 'currency', currency: pdp.getAttribute('data-currency'), maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(pdp.getAttribute('data-currency')) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var fee = +pdp.getAttribute('data-fee') || 0;
  var free = pdp.getAttribute('data-free') ? +pdp.getAttribute('data-free') : null;
  var picked1 = function (name) { return form.querySelector('input[name="' + name + '"]:checked') || form.querySelector('input[name="' + name + '"][type="hidden"]'); };
  var calc = function () {
    var v = picked1('variant'), w = picked1('wrap');
    var qty = Math.max(1, Math.min(50, parseInt(form.querySelector('[name="qty"]').value, 10) || 1));
    var gift = (+(v && v.getAttribute('data-price')) || 0) * qty;
    var wrap = (+(w && w.getAttribute('data-price')) || 0) * qty;
    var sub = gift + wrap;
    var ship = free != null && sub >= free ? 0 : fee;
    var unit = $('[data-unit]', pdp);
    if (unit && v && v.getAttribute('data-money')) unit.textContent = v.getAttribute('data-money');
    $('[data-s-gift]', form).textContent = money(gift) + (qty > 1 ? ' (×' + qty + ')' : '');
    $('[data-s-wrap]', form).textContent = wrap ? money(wrap) : $('[data-s-wrap]', form).getAttribute('data-free');
    $('[data-s-ship]', form).textContent = ship ? money(ship) : $('[data-s-ship]', form).getAttribute('data-free');
    $('[data-s-total]', form).textContent = money(sub + ship);
    var hint = $('[data-free-hint]', form);
    if (hint) hint.textContent = ship ? hint.getAttribute('data-tpl').replace('{a}', money(free - sub)) : hint.getAttribute('data-ok');
    return { gift: gift, wrap: wrap, ship: ship, total: sub + ship, qty: qty };
  };
  // Chữ "Miễn phí" ban đầu của hai ô gói và phí giao, dùng lại khi tiền = 0.
  ['[data-s-wrap]', '[data-s-ship]'].forEach(function (s) { var el = $(s, form); el.setAttribute('data-free', el.textContent); });
  var shipEl = $('[data-s-ship]', form);
  if (fee) shipEl.setAttribute('data-free', form.querySelector('[data-s-wrap]').getAttribute('data-free'));
  form.addEventListener('change', calc);
  form.addEventListener('input', function (e) { if (e.target.name === 'qty') calc(); });

  // Lời chúc: đếm ký tự.
  var msgBox = form.querySelector('[name="message"]'), chars = $('[data-chars]', form);
  if (msgBox && chars) msgBox.addEventListener('input', function () { chars.textContent = msgBox.value.length + ' / ' + msgBox.getAttribute('data-count-max'); });

  // Ngày giao sớm nhất: hôm nay nếu chưa qua giờ chốt, không thì ngày mai; khung giờ đã qua (cách hiện tại < 2 giờ) bị khóa.
  var dateEl = form.querySelector('[data-date]'), slotEl = form.querySelector('[data-slot]'), note = $('[data-date-note]', form);
  var now = shopNow();
  var cutoff = toMin(pdp.getAttribute('data-cutoff'));
  var today = iso(now.y, now.m, now.d);
  var late = cutoff != null && now.min >= cutoff;
  var first = late ? iso(now.y, now.m, now.d + 1) : today;
  dateEl.min = first;
  dateEl.max = iso(now.y, now.m + 3, now.d);
  dateEl.value = first;
  var slots = function () {
    var isToday = dateEl.value === today;
    var firstFree = null;
    $$('option', slotEl).forEach(function (o) {
      var start = toMin((o.textContent.match(/\d{1,2}:\d{2}/) || [])[0]);
      o.disabled = isToday && start != null && start < now.min + 120;
      if (!o.disabled && firstFree == null && o.value !== '') firstFree = o;
    });
    if (slotEl.selectedOptions[0] && slotEl.selectedOptions[0].disabled) slotEl.value = firstFree ? firstFree.value : '';
    if (note) { note.hidden = false; note.textContent = late ? note.getAttribute('data-tomorrow') : note.getAttribute('data-today'); }
  };
  dateEl.addEventListener('change', function () { if (dateEl.value && dateEl.value < first) dateEl.value = first; slots(); });
  slots();
  calc();

  var err = form.querySelector('[data-err]');
  var channel = null;
  form.querySelectorAll('button[data-channel]').forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = calc();
    var when = [get('date'), get('slot')].filter(Boolean).join(' ');
    var to = [get('toName'), get('toPhone')].filter(Boolean).join(' · ');
    return {
      name: get('name'), phone: get('phone'), qty: String(s.qty), address: get('address') + (to ? ' (' + to + ')' : ''),
      product: pdp.getAttribute('data-name'), version: get('variant'), size: get('wrap') || '—',
      message: get('message') || '—', secret: d.get('secret') ? '✓' : '—', date: when, note: get('note'),
      price: money(s.total), page: location.href.split('#')[0], market: pdp.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return pdp.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function (o) {
    var ok = true;
    ['name', 'phone', 'toName', 'address', 'date'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      var v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
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
      Object.keys(gmap).forEach(function (k) {
        var v = o[k] || '';
        if (k === 'note') v = ['💌 ' + o.message, o.secret === '✓' ? '🤫' : '', o.note].filter(function (x) { return x && x !== '💌 —'; }).join(' · ');
        data.append(gmap[k], v);
      });
      var btn = form.querySelector('[data-order-submit]');
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, function () {
        btn.disabled = false;
        var f = box.querySelector('button[data-channel]');
        if (f) send(f.getAttribute('data-channel'), f.getAttribute('data-href'), msg, form.querySelector('.form-msg'), o.product);
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
