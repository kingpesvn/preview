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

// Mẫu Studio ảnh: bộ ảnh lọc theo nhóm + "Xem thêm" + xem lớn; lịch trống theo tháng (ngày đã có lịch, thứ nghỉ, chỉ nhận đặt trước
// tối thiểu site.bookAhead ngày, hiện site.monthsShown tháng) — bấm ngày trống điền vào form; nút "Chọn gói này" chọn sẵn gói;
// form đặt lịch → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp. Không JS: vẫn đủ ảnh, gói, form.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var locale = body.getAttribute('data-locale') || undefined;

  function send(channel, href, text, msg) {
    if (channel === 'whatsapp') href = 'https://wa.me/' + body.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
    if (channel === 'email') href = 'mailto:' + body.getAttribute('data-email') + '?subject=' + encodeURIComponent(text.split('\n')[0]) + '&body=' + encodeURIComponent(text);
    var open = function () { window.open(href, channel === 'phone' || channel === 'email' ? '_self' : '_blank', 'noopener'); };
    if (channel === 'whatsapp' || channel === 'email') { open(); return; }
    var show = function (s) { if (msg) { msg.textContent = s; msg.hidden = false; } open(); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { show(body.getAttribute('data-copied')); }, function () { show(text); });
    } else show(text);
  }

  // Hôm nay theo múi giờ studio (không dùng toISOString: lệch ngày theo UTC).
  var o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
  var today = new Date(Date.UTC(+o.year, +o.month - 1, +o.day));
  var iso = function (d) { return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0'); };
  var form = $('form[data-book]');
  var dayInput = form && $('[data-day]', form);
  var note = form && $('[data-day-note]', form);

  // ── Bộ ảnh ── (14 ảnh/lượt: mỗi 7 ảnh có 2 ảnh cao → lấp kín 3 hàng × 3 cột)
  var grid = $('[data-works]');
  if (grid) {
    var tiles = $$('.ph', grid), more = $('[data-works-more]'), tag = '', shown = 14;
    var apply = function () {
      var n = 0;
      tiles.forEach(function (t) {
        var ok = !tag || t.getAttribute('data-t') === tag;
        t.classList.toggle('off', !ok);
        if (ok) { n++; t.classList.toggle('show', n <= shown); t.classList.toggle('tall', (n - 1) % 7 === 0 || (n - 1) % 7 === 4); }
      });
      if (more) more.parentNode.hidden = n <= shown;
    };
    $$('.chip[data-tag]').forEach(function (b) {
      b.addEventListener('click', function () {
        tag = b.getAttribute('data-tag'); shown = 14;
        $$('.chip[data-tag]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        apply();
      });
    });
    if (more) more.addEventListener('click', function () { shown += 14; apply(); });
    tiles.forEach(function (t) { t.classList.add('more'); });
    apply();
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = $('[data-lb-img]', lb), count = $('[data-lb-count]', lb), cur = 0;
      var vis = function () { return tiles.filter(function (t) { return !t.classList.contains('off'); }); };
      var open = function (i) { var l = vis(); cur = (i + l.length) % l.length; img.src = l[cur].getAttribute('href'); count.textContent = (cur + 1) + ' / ' + l.length; };
      grid.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); open(vis().indexOf(a)); lb.showModal(); });
      $('[data-lb-prev]', lb).addEventListener('click', function () { open(cur - 1); });
      $('[data-lb-next]', lb).addEventListener('click', function () { open(cur + 1); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(cur + 1); if (e.key === 'ArrowLeft') open(cur - 1); });
    }
  }

  // ── Lịch trống ──
  var cal = $('[data-cal]');
  var busy = {}, closed = [], first = null, last = null;
  var status = function (d) {
    if (d < first || d > last) return 'out';
    if (busy[iso(d)]) return 'busy';
    if (closed.indexOf(d.getUTCDay()) >= 0) return 'closed';
    return 'free';
  };
  if (cal) {
    var cfg = JSON.parse(cal.getAttribute('data-cal'));
    var week = JSON.parse(cal.getAttribute('data-week'));
    (cfg.booked || []).forEach(function (d) { busy[d] = 1; });
    closed = cfg.closed || [];
    first = new Date(today.getTime()); first.setUTCDate(first.getUTCDate() + (cfg.ahead || 0));
    last = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + (cfg.months || 4), 0));
    var view = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1));
    var gridEl = $('[data-cal-grid]', cal), title = $('[data-cal-title]', cal);
    var prev = $('[data-cal-prev]', cal), next = $('[data-cal-next]', cal);
    var order = [1, 2, 3, 4, 5, 6, 0];
    var draw = function () {
      title.textContent = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(view);
      gridEl.innerHTML = '';
      order.forEach(function (d) { var h = document.createElement('span'); h.className = 'wd'; h.textContent = week[d]; gridEl.appendChild(h); });
      var lead = (view.getUTCDay() + 6) % 7;
      for (var i = 0; i < lead; i++) gridEl.appendChild(document.createElement('span'));
      var days = new Date(Date.UTC(view.getUTCFullYear(), view.getUTCMonth() + 1, 0)).getUTCDate();
      for (var n = 1; n <= days; n++) {
        var d = new Date(Date.UTC(view.getUTCFullYear(), view.getUTCMonth(), n));
        var st = status(d), b = document.createElement('button');
        b.type = 'button'; b.textContent = n; b.className = 'day day--' + st; b.setAttribute('data-date', iso(d));
        if (st !== 'free') b.disabled = true;
        if (dayInput && dayInput.value === iso(d)) b.classList.add('sel');
        gridEl.appendChild(b);
      }
      prev.disabled = view <= new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1));
      next.disabled = new Date(Date.UTC(view.getUTCFullYear(), view.getUTCMonth() + 1, 1)) > last;
    };
    prev.addEventListener('click', function () { view.setUTCMonth(view.getUTCMonth() - 1); draw(); });
    next.addEventListener('click', function () { view.setUTCMonth(view.getUTCMonth() + 1); draw(); });
    gridEl.addEventListener('click', function (e) {
      var b = e.target.closest('.day--free'); if (!b || !dayInput) return;
      dayInput.value = b.getAttribute('data-date');
      checkDay(); draw();
      if (window.matchMedia('(max-width: 1000px)').matches) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    if (dayInput) { dayInput.min = iso(first); dayInput.max = iso(last); }
    draw();
  }
  function checkDay() {
    if (!note || !dayInput || !first) return;
    var v = dayInput.value;
    if (!v) { note.hidden = true; return; }
    var p = v.split('-'), d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    var st = status(d);
    note.hidden = st === 'free';
    note.textContent = note.getAttribute('data-busy');
  }
  if (dayInput) dayInput.addEventListener('change', checkDay);

  // ── Form đặt lịch ──
  if (!form) return;
  var fields = $('.book-fields', form), box = $('[data-done]', form), err = $('[data-err]', form), btn = $('[data-submit]', form);
  var sel = form.querySelector('[name="product"]');
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pick]'); if (!b) return;
    var v = b.getAttribute('data-pick');
    Array.prototype.forEach.call(sel.options, function (op) { if (op.value === v) sel.value = v; });
  });
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) { var el = form.querySelector('[name="' + name + '"]'); var s = el && el.closest('.field') && $('span', el.closest('.field')); return s ? s.textContent.replace(/\s*\*$/, '') : name; };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    return {
      name: get('name'), phone: get('phone'), product: get('product'), date: [get('day'), get('slot')].filter(Boolean).join(' · '), address: get('address'), note: get('note'),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (x) {
    var rows = [['product', x.product], ['day', x.date], ['address', x.address], ['name', x.name], ['phone', x.phone], ['note', x.note]];
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return label(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8]].forEach(function (y) {
      var el = form.querySelector('[name="' + y[0] + '"]');
      el.setAttribute('aria-invalid', y[1] ? 'true' : 'false');
      if (y[1]) ok = false;
    });
    err.hidden = ok;
    if (!ok) $('[aria-invalid="true"]', form).focus();
    return ok;
  };
  var done = function (msg) {
    fields.hidden = true; box.hidden = false; box.focus();
    $$('button[data-channel]', box).forEach(function (x) { x.setAttribute('data-msg', msg); });
  };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var x = read();
    if (x.website || Date.now() - t0 < 2500) return;
    if (!valid(x)) return;
    var msg = text(x);
    if (!gform) { done(msg); return; }
    var data = new URLSearchParams();
    Object.keys(gmap).forEach(function (k) { data.append(gmap[k], x[k] || ''); });
    btn.disabled = true;
    var old = btn.innerHTML;
    btn.textContent = btn.getAttribute('data-sending');
    fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(function () { done(msg); }, function () {
      btn.disabled = false; btn.innerHTML = old;
      send((body.getAttribute('data-wa') && 'whatsapp') || 'email', '', msg, null);
    });
  });
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-channel]');
    if (!b) return;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg'), $('[data-msg]', box));
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { box.hidden = true; fields.hidden = false; });
})();
