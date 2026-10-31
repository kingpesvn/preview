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

// Mẫu Trà & trà cụ: thanh lọc nhiều lựa chọn (cùng nhóm = "hoặc", khác nhóm = "và"), đọc / ghi tham số trên địa chỉ (?type=…&origin=…),
// tìm không dấu, sắp xếp, các lọc đang chọn hiện thành nhãn bỏ được, "Xem thêm"; trên điện thoại thanh lọc là ngăn kéo (nút "Bộ lọc", nút "Xem n món").
// Lối tắt đầu trang và thẻ vùng trồng lọc ngay không tải lại trang. Giờ chốt đơn giao trong ngày (theo múi giờ của shop).
// Trang món: thư viện ảnh, khối lượng (đổi giá hiển thị), hộp quà, thiệp (đếm ký tự), ngày giao sớm nhất, tự cộng tiền, đặt hàng → Google Form hoặc tin nhắn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var shopNow = function () {
    var parts = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    return { y: +parts.year, m: +parts.month, d: +parts.day, min: +parts.hour * 60 + +parts.minute };
  };
  var toMin = function (hhmm) { var a = String(hhmm || '').split(':'); return a.length === 2 ? +a[0] * 60 + +a[1] : null; };
  var iso = function (y, m, d) { return new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10); };

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

  // ── Giờ chốt đơn ──
  var cut = $('dd[data-cutoff]');
  if (cut) {
    var tick = function () {
      var c = toMin(cut.getAttribute('data-cutoff')), left = c - shopNow().min;
      if (c == null) return;
      cut.textContent = left > 0
        ? cut.getAttribute('data-before').replace('{time}', cut.getAttribute('data-cutoff')).replace('{h}', Math.floor(left / 60)).replace('{m}', left % 60)
        : cut.getAttribute('data-after').replace('{time}', cut.getAttribute('data-cutoff'));
    };
    tick(); setInterval(tick, 30000);
  }

  // ── Cửa hàng: lọc, tìm, sắp xếp ──
  var grid = $('[data-grid]');
  var side = $('[data-side]');
  if (grid && side) {
    var cards = Array.prototype.slice.call(grid.children);
    var KEYS = ['type', 'origin', 'taste', 'strength', 'band', 'gift'];
    var ATTR = { type: 'data-type', origin: 'data-origin', taste: 'data-taste', strength: 'data-strength', band: 'data-band', gift: 'data-gift' };
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
      thumbs.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); };
    var go = function (i) { i = Math.max(0, Math.min(n - 1, i)); track.scrollTo({ left: i * track.clientWidth }); show(i); };
    var t0;
    track.addEventListener('scroll', function () { clearTimeout(t0); t0 = setTimeout(function () { var i = Math.round(track.scrollLeft / track.clientWidth); if (i !== cur) show(i); }, 60); });
    gal.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { go(cur + +b.getAttribute('data-step')); }); });
    thumbs.forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); go(+a.getAttribute('data-go')); }); });
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
    }
  }

  // ── Trang món: khối lượng, hộp quà, thiệp, ngày giao, tổng tiền, đặt hàng ──
  var pdp = $('[data-product]');
  if (!pdp) return;
  var form = pdp.querySelector('form[data-compose]');
  var cur$ = pdp.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(pdp.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur$, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur$) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var fee = +pdp.getAttribute('data-fee') || 0;
  var free = pdp.getAttribute('data-free') ? +pdp.getAttribute('data-free') : null;
  var picked1 = function (name) { return form.querySelector('input[name="' + name + '"]:checked') || form.querySelector('input[name="' + name + '"][type="hidden"]'); };
  var freeWord = $('[data-s-wrap]', form).textContent;
  var calc = function () {
    var v = picked1('variant'), w = picked1('wrap');
    var qty = Math.max(1, Math.min(99, parseInt(form.querySelector('[name="qty"]').value, 10) || 1));
    var item = (+(v && v.getAttribute('data-price')) || 0) * qty;
    var wrap = (+(w && w.getAttribute('data-price')) || 0) * qty;
    var sub = item + wrap;
    var ship = free != null && sub >= free ? 0 : fee;
    var unit = $('[data-unit]', pdp), ul = $('[data-unit-label]', pdp);
    if (unit && v && v.getAttribute('data-money')) unit.textContent = v.getAttribute('data-money');
    if (ul && v && v.getAttribute('data-label')) ul.textContent = v.getAttribute('data-label');
    $('[data-s-gift]', form).textContent = money(item) + (qty > 1 ? ' (×' + qty + ')' : '');
    $('[data-s-wrap]', form).textContent = wrap ? money(wrap) : freeWord;
    $('[data-s-ship]', form).textContent = ship ? money(ship) : freeWord;
    $('[data-s-total]', form).textContent = money(sub + ship);
    var hint = $('[data-free-hint]', form);
    if (hint) hint.textContent = ship ? hint.getAttribute('data-tpl').replace('{a}', money(free - sub)) : hint.getAttribute('data-ok');
    return { total: sub + ship, qty: qty };
  };
  form.addEventListener('change', calc);
  form.addEventListener('input', function (e) { if (e.target.name === 'qty') calc(); });
  var msgBox = form.querySelector('[name="message"]'), chars = $('[data-chars]', form);
  if (msgBox && chars) msgBox.addEventListener('input', function () { chars.textContent = msgBox.value.length + ' / ' + msgBox.getAttribute('data-count-max'); });

  var dateEl = form.querySelector('[data-date]'), note = $('[data-date-note]', form);
  var now = shopNow(), cutoff = toMin(pdp.getAttribute('data-cutoff'));
  var late = cutoff != null && now.min >= cutoff;
  var first = late ? iso(now.y, now.m, now.d + 1) : iso(now.y, now.m, now.d);
  dateEl.min = first; dateEl.max = iso(now.y, now.m + 3, now.d); dateEl.value = first;
  dateEl.addEventListener('change', function () { if (dateEl.value && dateEl.value < first) dateEl.value = first; });
  if (note && cutoff != null) { note.hidden = false; note.textContent = late ? note.getAttribute('data-tomorrow') : note.getAttribute('data-today'); }
  calc();

  var err = form.querySelector('[data-err]');
  var channel = null;
  form.querySelectorAll('button[data-channel]').forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = calc();
    return {
      name: get('name'), phone: get('phone'), qty: String(s.qty), address: get('address'), product: pdp.getAttribute('data-name'),
      version: get('variant'), size: get('wrap') || '—', message: get('message') || '—', date: get('date'),
      note: [get('message') ? '💌 ' + get('message') : '', get('note')].filter(Boolean).join(' · '),
      price: money(s.total), page: location.href.split('#')[0], market: pdp.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return pdp.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'address', 'date'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
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
    if (!channel && !valid()) return;
    var msg = text(o);
    var box = form.querySelector('[data-done]');
    var done = function () {
      form.querySelector('.order-fields').hidden = true;
      box.hidden = false; box.focus();
      box.querySelectorAll('button[data-channel]').forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    if (!channel) {
      if (!gform) { done(); return; }
      var data = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], o[k] || ''); });
      var btn = form.querySelector('[data-order-submit]');
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, function () {
        btn.disabled = false;
        var f = box.querySelector('button[data-channel]');
        if (f) send(f.getAttribute('data-channel'), f.getAttribute('data-href'), msg, form.querySelector('.form-msg'), o.product);
      });
      return;
    }
    var b = channel; channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, form.querySelector('.form-msg'), o.product);
  });
  var edit = form.querySelector('[data-edit]');
  if (edit) edit.addEventListener('click', function () { form.querySelector('[data-done]').hidden = true; form.querySelector('.order-fields').hidden = false; });
  var dock = $('.dock .primary');
  if (dock) dock.addEventListener('click', function (e) { e.preventDefault(); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
})();
