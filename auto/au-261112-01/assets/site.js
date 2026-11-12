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

// Mẫu Xe đưa đón sân bay (kiểu E): form đặt xe tính giá ngay.
//   Chiều: đón tại sân bay (bắt buộc số hiệu chuyến bay, giờ = giờ hạ cánh) / ra sân bay (giờ = giờ đón tại nhà).
//   Xe: tự chọn xe nhỏ nhất có ghế ≥ số khách và hành lý ≥ số kiện; xe không đủ bị khóa; khách vẫn chọn xe lớn hơn được.
//   Giá = giá khu vực × loại xe; + phụ thu đêm % nếu giờ trong khoảng [night.from, night.to) (qua nửa đêm);
//   khứ hồi: chuyến về cùng giá (phụ thu đêm theo giờ về), cả hai chiều giảm rt %; dịch vụ thêm theo món hoặc theo chuyến (khứ hồi ×2).
//   Đặt sát giờ hơn site.leadHours (theo múi giờ nhà xe) → cảnh báo, chặn gửi. ?now=YYYY-MM-DDTHH:MM để thử.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var D = { cars: [], zones: [], extras: [] };
  try { D = JSON.parse(($('#ap-data') || {}).textContent || '{}'); } catch (e) { /* giữ mặc định */ }
  var lang = body.getAttribute('data-lang') || 'en', cur = body.getAttribute('data-currency') || 'USD';
  var fmt = new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : lang, { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var step = /^(VND|IDR)$/.test(cur) ? 1000 : /^(JPY|KRW|THB)$/.test(cur) ? 10 : 1;
  var round = function (v) { return Math.round(v / step) * step; };
  var toMin = function (s) { var a = String(s || '').split(':'); return a.length > 1 ? +a[0] * 60 + +a[1] : null; };
  // Bây giờ theo múi giờ nhà xe, tính bằng "phút kể từ 1970" theo đồng hồ địa phương để so với ngày giờ khách nhập.
  var parts = {};
  try { new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz'), year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = +p.value; }); } catch (e) { var n0 = new Date(); parts = { year: n0.getFullYear(), month: n0.getMonth() + 1, day: n0.getDate(), hour: n0.getHours(), minute: n0.getMinutes() }; }
  var q = /[?&]now=(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/.exec(location.search);
  if (q) parts = { year: +q[1], month: +q[2], day: +q[3], hour: +q[4], minute: +q[5] };
  var nowMin = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute) / 60000;
  var pad = function (n) { return ('0' + n).slice(-2); };
  var todayIso = parts.year + '-' + pad(parts.month) + '-' + pad(parts.day);
  var whenMin = function (d, t) { if (!d || !t) return null; var a = d.split('-').map(Number), m = toMin(t); return Date.UTC(a[0], a[1] - 1, a[2]) / 60000 + m; };
  var isNight = function (t) {
    if (!D.night || !D.night.pct) return false;
    var m = toMin(t), a = toMin(D.night.from), b = toMin(D.night.to);
    if (m == null || a == null || b == null) return false;
    return a > b ? m >= a || m < b : m >= a && m < b;
  };

  var form = $('[data-order]');
  if (!form) return;
  var zoneSel = $('[data-zone]', form), pax = $('[data-pax]', form), bags = $('[data-bags]', form), hint = $('[data-car-hint]', form);
  var dateIn = $('[data-date]', form), timeIn = $('[data-time]', form), round$ = $('[data-round]', form), retBox = $('[data-return]', form);
  var rdate = $('[data-rdate]', form), rtime = $('[data-rtime]', form), leadWarn = $('[data-lead-warn]', form);
  var flightF = $('[data-flight-f]', form), addrL = $('[data-addr-l]', form), timeL = $('[data-time-l]', form);
  dateIn.min = todayIso; rdate.min = todayIso;
  var carById = {}; D.cars.forEach(function (c) { carById[c.id] = c; });
  var zoneById = {}; D.zones.forEach(function (z) { zoneById[z.id] = z; });
  var lastAuto = null, totals = {};
  var dir = function () { var r = form.querySelector('[name="dir"]:checked'); return r ? r.value : 'pickup'; };

  var paint = function (e) {
    var z = zoneById[zoneSel.value] || D.zones[0];
    var p = parseInt(pax.value, 10) || 1, b = parseInt(bags.value, 10) || 0;
    var fit = D.cars.filter(function (c) { return c.s >= p && c.b >= b && z.f[c.id] != null; });
    var auto = fit[0] || null;
    // Khóa xe không đủ chỗ; tự chọn xe nhỏ nhất vừa khi số khách / hành lý / khu vực thay đổi.
    $$('[data-car]', form).forEach(function (lab) {
      var c = carById[lab.getAttribute('data-car')], inp = $('input', lab), ok = fit.indexOf(c) >= 0;
      inp.disabled = !ok; lab.classList.toggle('is-off', !ok);
      $('[data-car-price]', lab).textContent = z.f[c.id] != null ? money(z.f[c.id]) : '—';
    });
    var changedSize = e && e.target && (e.target === pax || e.target === bags || e.target === zoneSel);
    var chosen = form.querySelector('[name="product"]:checked');
    if (auto && (!chosen || chosen.disabled || (changedSize && lastAuto && chosen.value === lastAuto))) {
      form.querySelector('[name="product"][value="' + auto.id + '"]').checked = true;
    }
    lastAuto = auto ? auto.id : null;
    chosen = form.querySelector('[name="product"]:checked');
    var car = chosen && !chosen.disabled ? carById[chosen.value] : null;
    hint.textContent = !auto ? hint.getAttribute('data-none') : hint.getAttribute('data-auto').replace('{car}', auto.n);
    // Chiều đi: đổi nhãn địa chỉ, giờ; ô chuyến bay chỉ khi đón tại sân bay.
    var d = dir();
    flightF.hidden = d !== 'pickup';
    addrL.textContent = addrL.getAttribute(d === 'pickup' ? 'data-pick' : 'data-drop') + ' *';
    timeL.textContent = timeL.getAttribute(d === 'pickup' ? 'data-pick' : 'data-drop') + ' *';
    retBox.hidden = !round$.checked;
    // Giá
    var base = car ? z.f[car.id] : 0;
    var night1 = isNight(timeIn.value) ? base * D.night.pct / 100 : 0;
    var leg2 = 0, night2 = 0;
    if (round$.checked) { leg2 = base; night2 = isNight(rtime.value) ? base * D.night.pct / 100 : 0; }
    var legs = round$.checked ? 2 : 1;
    var ex = 0, exNames = [];
    D.extras.forEach(function (x) {
      var el = form.querySelector('[data-extra="' + x.id + '"]'); if (!el) return;
      var n = el.type === 'checkbox' ? (el.checked ? 1 : 0) : Math.max(0, parseInt(el.value, 10) || 0);
      if (!n) return;
      ex += (x.per === 'item' ? n * x.pr : x.pr) * legs;
      exNames.push(x.per === 'item' ? n + '× ' + x.n : x.n);
    });
    var sub = base + night1 + leg2 + night2;
    var disc = round$.checked ? sub * (D.rt || 0) / 100 : 0;
    totals = { car: car, base: base, night: round(night1 + night2), rt: round(leg2 - disc), ex: ex, exNames: exNames };
    totals.total = round(base + night1 + night2 + leg2 - disc) + ex;
    $('[data-q-car-l]', form).textContent = car ? car.n + ' · ' + z.n : '—';
    $('[data-q-car]', form).textContent = car ? money(base) : '—';
    $('[data-q-night-row]', form).hidden = !totals.night; $('[data-q-night]', form).textContent = money(totals.night);
    $('[data-q-rt-row]', form).hidden = !round$.checked; $('[data-q-rt]', form).textContent = money(totals.rt);
    $('[data-q-ex-row]', form).hidden = !ex; $('[data-q-ex]', form).textContent = money(ex);
    $('[data-q-total]', form).textContent = car ? money(totals.total) : '—';
    // Thời gian đặt trước
    var w = whenMin(dateIn.value, timeIn.value), late = w != null && D.lead && w - nowMin < D.lead * 60;
    leadWarn.hidden = !late;
    if (late) leadWarn.textContent = leadWarn.getAttribute('data-tpl').replace('{n}', D.lead);
    totals.late = late;
  };
  form.addEventListener('input', paint);
  form.addEventListener('change', paint);
  paint();

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
  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var dmy = function (s) { return s ? s.split('-').reverse().join('/') : ''; };
  var orderObj = function () {
    paint();
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var ap = form.querySelector('[name="airport"]');
    var pick = dir() === 'pickup';
    return {
      name: get('name'), phone: get('phone'), product: totals.car ? totals.car.n : '',
      version: (pick ? form.getAttribute('data-pick') : form.getAttribute('data-drop')) + (ap ? ' · ' + ap.options[ap.selectedIndex].text : '') + (pick && get('flight') ? ' · ' + get('flight').toUpperCase() : ''),
      date: dmy(get('date')) + ' ' + get('time') + (round$.checked && get('rdate') ? ' · ' + form.getAttribute('data-ret') + ' ' + dmy(get('rdate')) + ' ' + get('rtime') : ''),
      address: zoneSel.options[zoneSel.selectedIndex].text + ' · ' + get('address'), qty: get('qty'), size: get('size'),
      note: [totals.exNames.join(', '), get('note')].filter(Boolean).join(' · '), price: money(totals.total),
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    paint();
    var ok = true;
    var need = ['name', 'phone', 'address', 'date', 'time'];
    if (dir() === 'pickup') need.push('flight');
    if (round$.checked) need.push('rdate', 'rtime');
    need.forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
      if ((k === 'date' || k === 'time') && totals.late) bad = true;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
    if (!totals.car) ok = false;
    err.hidden = ok;
    var first = form.querySelector('[aria-invalid="true"]');
    if (!ok && first) first.focus();
    return ok;
  };
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var ts = Date.now();
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var o = orderObj();
    if (o.website || Date.now() - ts < 2500) return;
    if (!channel && !valid()) return;
    var msg = text(o);
    var box = $('[data-done]', form);
    var done = function () {
      $('.order-fields', form).hidden = true;
      box.hidden = false; box.focus();
      $$('button[data-channel]', box).forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    if (!channel) {
      if (!gform) { done(); return; }
      var dt = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { dt.append(gmap[k], o[k] || ''); });
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: dt }).then(done, function () {
        btn.disabled = false;
        var f = box.querySelector('button[data-channel]');
        if (f) send(f.getAttribute('data-channel'), f.getAttribute('data-href'), msg, $('.form-msg', form), o.product);
      });
      return;
    }
    var b = channel; channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.product);
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; });
})();
