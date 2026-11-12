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

// Mẫu Sửa điện thoại: báo giá ngay (hãng → đời máy → lỗi → loại linh kiện), "Không biết hỏng gì?" chọn sẵn lỗi trong báo giá,
// đặt lịch theo khung giờ trống (theo giờ mở cửa và múi giờ của tiệm, cần đặt trước leadMinutes) hoặc ghé luôn,
// gửi đơn qua Google Form hoặc tin nhắn soạn sẵn. Thử giờ khác: ?now=YYYY-MM-DDTHH:MM.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var cur = body.getAttribute('data-currency'), lang = body.getAttribute('data-lang') || 'en';
  var whole = /^(VND|JPY|KRW|IDR|INR|MXN|THB)$/.test(cur);
  var fmt = new Intl.NumberFormat(lang, { style: 'currency', currency: cur, maximumFractionDigits: whole ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var tz = body.getAttribute('data-tz') || 'America/Chicago';
  var force = (new URLSearchParams(location.search).get('now') || '').match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  var shopNow = function () {
    if (force) return { y: +force[1], m: +force[2], d: +force[3], min: +force[4] * 60 + +force[5] };
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, min: +p.hour * 60 + +p.minute };
  };
  var data = {}; try { data = JSON.parse($('#fix-data').textContent); } catch (e) { data = { r: [], b: [], g: [] }; }

  function send(channel, href, text, msg, subject) {
    if (channel === 'whatsapp') href = 'https://wa.me/' + body.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
    if (channel === 'email') href = 'mailto:' + body.getAttribute('data-email') + '?subject=' + encodeURIComponent(subject || text) + '&body=' + encodeURIComponent(text);
    var open = function () { window.open(href, channel === 'phone' || channel === 'email' ? '_self' : '_blank', 'noopener'); };
    if (channel === 'whatsapp' || channel === 'email') { open(); return; }
    var show = function (s) { if (msg) { msg.textContent = s; msg.hidden = false; } open(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { show(body.getAttribute('data-copied')); }, function () { show(text); });
    else show(text);
  }

  // ── Báo giá ──
  var q = $('[data-quote]');
  var pick = { device: '', repair: '', grade: '', price: '' };
  var picked = $('[data-picked-text]');
  var fmtMins = function (m) {
    if (!m) return '—';
    if (m >= 2880) return q.getAttribute('data-days').replace('{n}', Math.round(m / 1440));
    if (m >= 90) return q.getAttribute('data-hours').replace('{n}', Math.round(m / 30) / 2);
    return q.getAttribute('data-mins').replace('{n}', m);
  };
  if (q) {
    var brandSel = $('[data-q-brand]', q), modelSel = $('[data-q-model]', q), gradesBox = $('[data-q-grades]', q), bookBtn = $('[data-q-book]', q);
    var brand = function () { return data.b.filter(function (b) { return b.id === brandSel.value; })[0]; };
    brandSel.addEventListener('change', function () {
      var b = brand();
      modelSel.innerHTML = '<option value="">' + modelSel.options[0].textContent + '</option>' + (b ? b.m.map(function (m, i) { return '<option value="' + i + '">' + m[0].replace(/</g, '&lt;') + '</option>'; }).join('') : '');
      modelSel.disabled = !b;
      calc();
    });
    var calc = function () {
      var b = brand(), m = b && modelSel.value !== '' ? b.m[+modelSel.value] : null;
      var rIn = q.querySelector('input[name="q-repair"]:checked');
      var r = rIn ? data.r.filter(function (x) { return x.id === rIn.value; })[0] : null;
      if (gradesBox) gradesBox.hidden = !!(r && !r.g);
      var gIn = q.querySelector('input[name="q-grade"]:checked');
      var g = gIn && (!r || r.g) ? data.g.filter(function (x) { return x.id === gIn.value; })[0] : null;
      var base = r && m ? r.p[Math.min(m[1], r.p.length) - 1] : null;
      var ready = base != null;
      var price = ready ? base * (1 + (g ? g.pct : 0) / 100) : null;
      if (price != null) price = Math.round(price);
      $('[data-q-device]', q).textContent = m ? m[0] + (r ? ' · ' + r.n : '') : q.getAttribute('data-pick');
      $('[data-q-price]', q).textContent = ready ? money(price) : '—';
      $('[data-q-time]', q).textContent = r ? fmtMins(r.m) : '—';
      $('[data-q-warranty]', q).textContent = r && r.w ? q.getAttribute('data-wdays').replace('{n}', r.w) : '—';
      bookBtn.setAttribute('aria-disabled', ready ? 'false' : 'true');
      pick = ready ? { device: m[0], repair: r.n, grade: g ? g.n : '', price: money(price) } : { device: '', repair: '', grade: '', price: '' };
      if (picked) picked.textContent = ready ? [m[0], r.n, g ? g.n : '', money(price)].filter(Boolean).join(' · ') : picked.getAttribute('data-empty') || picked.textContent;
      return ready;
    };
    if (picked) picked.setAttribute('data-empty', picked.textContent);
    modelSel.addEventListener('change', calc);
    q.addEventListener('change', function (e) { if (e.target.name === 'q-repair' || e.target.name === 'q-grade') calc(); });
    bookBtn.addEventListener('click', function (e) { if (bookBtn.getAttribute('aria-disabled') === 'true') { e.preventDefault(); (brandSel.value ? (modelSel.value === '' ? modelSel : q.querySelector('input[name="q-repair"]')) : brandSel).focus(); } });
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-pick-repair]');
      if (!a) return;
      var r = q.querySelector('input[name="q-repair"][value="' + a.getAttribute('data-pick-repair') + '"]');
      if (r) { r.checked = true; calc(); }
    });
    calc();
  }

  // ── Đặt lịch ──
  var form = $('[data-book]');
  if (!form) return;
  var hours = []; try { hours = JSON.parse(form.getAttribute('data-hours') || '[]'); } catch (e) { hours = []; }
  var step = +form.getAttribute('data-slot') || 30, lead = +form.getAttribute('data-lead') || 30, ndays = +form.getAttribute('data-ndays') || 7;
  var toMin = function (s) { var a = String(s || '').split(':'); return +a[0] * 60 + +a[1]; };
  var hhmm = function (m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
  var now = shopNow();
  var dayList = [];
  for (var i = 0; i < 21 && dayList.length < ndays; i++) {
    var dt = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
    var wd = dt.getUTCDay();
    var spans = hours.filter(function (h) { return (h.days || []).indexOf(wd) >= 0; });
    var slots = [];
    spans.forEach(function (h) { for (var t = toMin(h.open); t + step <= toMin(h.close); t += step) if (i > 0 || t >= now.min + lead) slots.push(t); });
    if (spans.length) dayList.push({ iso: dt.toISOString().slice(0, 10), i: i, date: dt, slots: slots });
  }
  var daysBox = $('[data-days]', form), timesBox = $('[data-times]', form);
  var dfmt = new Intl.DateTimeFormat(lang, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
  var chosenDay = null, chosenTime = '';
  daysBox.innerHTML = dayList.map(function (d) {
    var label = d.i === 0 ? form.getAttribute('data-today') : d.i === 1 ? form.getAttribute('data-tomorrow') : dfmt.format(d.date);
    return '<button type="button" class="day" data-day="' + d.iso + '"' + (d.slots.length ? '' : ' disabled') + '><b>' + label + '</b><small>' + (d.i < 2 ? dfmt.format(d.date) : d.slots.length + ' ×') + '</small></button>';
  }).join('');
  var showDay = function (iso) {
    chosenDay = dayList.filter(function (d) { return d.iso === iso; })[0]; chosenTime = '';
    $$('.day', daysBox).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-day') === iso ? 'true' : 'false'); });
    timesBox.innerHTML = chosenDay && chosenDay.slots.length ? chosenDay.slots.map(function (t) { return '<button type="button" class="time" data-time="' + hhmm(t) + '" aria-pressed="false">' + hhmm(t) + '</button>'; }).join('') : '<p class="muted small">' + form.getAttribute('data-closed') + '</p>';
    form.querySelector('[name="date"]').value = iso; form.querySelector('[name="time"]').value = '';
  };
  daysBox.addEventListener('click', function (e) { var b = e.target.closest('[data-day]'); if (b && !b.disabled) showDay(b.getAttribute('data-day')); });
  timesBox.addEventListener('click', function (e) {
    var b = e.target.closest('[data-time]'); if (!b) return;
    chosenTime = b.getAttribute('data-time');
    $$('.time', timesBox).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    form.querySelector('[name="time"]').value = chosenTime;
  });
  var first = dayList.filter(function (d) { return d.slots.length; })[0];
  if (first) showDay(first.iso);
  var mode = function () { return form.querySelector('input[name="mode"]:checked').value; };
  form.addEventListener('change', function (e) {
    if (e.target.name !== 'mode') return;
    $('[data-slots-box]', form).hidden = mode() === 'walk';
    $('[data-walk-note]', form).hidden = mode() !== 'walk';
  });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var gform = form.getAttribute('data-gform'), gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var order = function () {
    var d = new FormData(form), get = function (k) { return (d.get(k) || '').toString().trim(); };
    var walk = mode() === 'walk';
    return {
      name: get('name'), phone: get('phone'), note: get('note') || '—', website: get('website'),
      device: pick.device || '—', repair: pick.repair || '—', grade: pick.grade || '—', price: pick.price || '—',
      product: [pick.device, pick.repair].filter(Boolean).join(' · ') || '—', version: pick.grade || '—',
      date: walk ? form.getAttribute('data-walk') : get('date'), time: walk ? '—' : get('time'), market: form.getAttribute('data-market'), page: location.href.split('#')[0],
    };
  };
  var valid = function () {
    var ok = true;
    ['name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 7 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
    var noTime = mode() === 'slot' && !form.querySelector('[name="time"]').value;
    timesBox.classList.toggle('is-bad', noTime);
    if (noTime) ok = false;
    err.hidden = ok;
    if (!ok) { var f = form.querySelector('[aria-invalid="true"]') || timesBox.querySelector('button') || timesBox; if (f.focus) f.focus(); }
    return ok;
  };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var o = order();
    if (o.website || Date.now() - t0 < 2500) return;
    if (!channel && !valid()) return;
    var msg = form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' ');
    var box = $('[data-done]', form);
    var done = function () {
      $('.order-fields', form).hidden = true; box.hidden = false; box.focus();
      $$('button[data-channel]', box).forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    if (!channel) {
      if (!gform) { done(); return; }
      var body2 = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { body2.append(gmap[k], o[k] || ''); });
      var btn = $('[data-submit]', form); btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: body2 }).then(done, function () {
        btn.disabled = false;
        var f = box.querySelector('button[data-channel]');
        if (f) send(f.getAttribute('data-channel'), f.getAttribute('data-href'), msg, $('.form-msg', form), o.product);
      });
      return;
    }
    var b = channel; channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.product);
  });
})();
