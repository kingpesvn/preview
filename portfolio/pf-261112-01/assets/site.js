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

// Mẫu DJ (kiểu E): lọc bản mix theo dòng nhạc; lịch trống 3 tháng (ngày đã nhận show gạch, ngày đã qua mờ, bấm ngày trống → điền form);
// dải đầu trang: số ngày còn trống tháng này + show sắp tới; show đã qua tự ẩn (theo múi giờ của DJ; ?today=YYYY-MM-DD để thử);
// báo giá: giá gói + (giờ − giờ gói) × giá giờ thêm + âm thanh theo số khách (gói nhỏ nhất có upTo ≥ số khách) + dịch vụ thêm
//   + phí đi lại ((km − km miễn phí) × giá mỗi km) → tạm tính, tiền cọc theo %; ngày đã nhận show thì cảnh báo, chặn gửi.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var D = { p: [], s: [], a: [], tr: {}, booked: [] };
  try { D = JSON.parse(($('#dj-data') || {}).textContent || '{}'); } catch (e) { /* giữ mặc định */ }
  var lang = body.getAttribute('data-lang') || 'en', cur = body.getAttribute('data-currency') || 'USD';
  var fmt = new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : lang, { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var pad = function (n) { return ('0' + n).slice(-2); };
  var iso = function (y, m, d) { return y + '-' + pad(m) + '-' + pad(d); };
  // Hôm nay theo múi giờ của DJ.
  var parts = {};
  try { new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz'), year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = +p.value; }); } catch (e) { var n0 = new Date(); parts = { year: n0.getFullYear(), month: n0.getMonth() + 1, day: n0.getDate() }; }
  var q = /[?&]today=(\d{4})-(\d\d)-(\d\d)/.exec(location.search);
  var today = q ? iso(+q[1], +q[2], +q[3]) : iso(parts.year, parts.month, parts.day);
  var ty = +today.slice(0, 4), tm = +today.slice(5, 7);
  var booked = {};
  (D.booked || []).forEach(function (d) { booked[d] = 1; });
  var form = $('[data-order]');
  var dateIn = form && $('[data-date]', form);

  // ── Lọc bản mix ──
  var chips = $$('[data-genre]');
  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.getAttribute('data-genre');
      chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $$('.mix').forEach(function (li) { li.hidden = !!g && (' ' + li.getAttribute('data-genres') + ' ').indexOf(' ' + g + ' ') < 0; });
    });
  });

  // ── Show sắp tới ──
  var gigs = $('[data-gigs]'), nextGig = null;
  if (gigs) {
    var shown = 0;
    $$('li', gigs).forEach(function (li) {
      var past = li.getAttribute('data-date') < today;
      li.hidden = past;
      if (!past) { shown++; if (!nextGig) nextGig = li; }
    });
    var ng = $('[data-no-gigs]'); if (ng) ng.hidden = shown > 0;
  }

  // ── Lịch trống ──
  var cal = $('[data-cal]');
  var freeThisMonth = 0;
  if (cal) {
    var wd = JSON.parse(cal.getAttribute('data-wd') || '[]');
    var box = $('[data-cal-months]', cal);
    var order = [1, 2, 3, 4, 5, 6, 0];
    for (var k = 0; k < 3; k++) {
      var y = ty + Math.floor((tm - 1 + k) / 12), m = (tm - 1 + k) % 12 + 1;
      var first = new Date(Date.UTC(y, m - 1, 1)), days = new Date(Date.UTC(y, m, 0)).getUTCDate();
      var title = first.toLocaleDateString(lang === 'vi' ? 'vi-VN' : lang, { month: 'long', year: 'numeric', timeZone: 'UTC' });
      var html = '<div class="month"><p class="m-title">' + title + '</p><div class="m-grid">' + order.map(function (d) { return '<span class="m-wd">' + (wd[d] || '') + '</span>'; }).join('');
      var lead = (first.getUTCDay() + 6) % 7;
      for (var i = 0; i < lead; i++) html += '<span></span>';
      for (var d = 1; d <= days; d++) {
        var key = iso(y, m, d), past = key < today, taken = !!booked[key];
        if (k === 0 && !past && !taken) freeThisMonth++;
        html += past ? '<span class="day is-past">' + d + '</span>'
          : taken ? '<span class="day is-taken" title="' + cal.getAttribute('data-taken') + '">' + d + '</span>'
            : '<button type="button" class="day is-free" data-day="' + key + '" aria-label="' + key + ' · ' + cal.getAttribute('data-free') + '">' + d + '</button>';
      }
      box.insertAdjacentHTML('beforeend', html + '</div></div>');
    }
    cal.hidden = false;
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-day]'); if (!b || !dateIn) return;
      $$('.day.is-on', box).forEach(function (x) { x.classList.remove('is-on'); });
      b.classList.add('is-on');
      dateIn.value = b.getAttribute('data-day');
      dateIn.dispatchEvent(new Event('input', { bubbles: true }));
      $('#book').scrollIntoView({ behavior: 'smooth' });
    });
  }
  var strip = $('[data-strip]');
  if (strip && cal) {
    $('[data-strip-free]', strip).textContent = String(freeThisMonth);
    if (nextGig) $('[data-strip-next]', strip).textContent = $('.gig-d', nextGig).textContent + ' · ' + $('.gig-t b', nextGig).textContent;
    strip.hidden = false;
  }

  // ── Báo giá ──
  if (!form) return;
  var byId = {};
  (D.p || []).forEach(function (p) { byId[p.id] = p; });
  var hoursIn = $('[data-hours]', form), guestsIn = $('[data-guests]', form), kmIn = $('[data-km]', form), warn = $('[data-date-warn]', form);
  if (dateIn) dateIn.min = today;
  var pack = function () { var r = form.querySelector('[name="product"]:checked'); return r ? byId[r.value] : D.p[0]; };
  var totals = {};
  var paint = function (e) {
    var p = pack(); if (!p) return;
    if (e && e.target && e.target.name === 'product' || !hoursIn.value) hoursIn.value = p.h;
    var h = Math.max(p.h, parseInt(hoursIn.value, 10) || p.h), extraH = h - p.h;
    var g = parseInt(guestsIn.value, 10) || 0;
    var snd = (D.s || []).filter(function (s) { return !s.u || g <= s.u; })[0] || D.s[D.s.length - 1];
    var adds = $$('[name="addon"]:checked', form).map(function (c) { return (D.a || []).filter(function (a) { return a.id === c.value; })[0]; }).filter(Boolean);
    var km = Math.max(0, (parseInt(kmIn.value, 10) || 0) - (D.tr.freeKm || 0));
    totals = { pack: p.pr, extra: extraH * p.x, sound: snd ? snd.pr : 0, add: adds.reduce(function (s, a) { return s + a.pr; }, 0), travel: km * (D.tr.perKm || 0) };
    totals.total = totals.pack + totals.extra + totals.sound + totals.add + totals.travel;
    totals.h = h; totals.snd = snd; totals.adds = adds;
    $('[data-q-pack-l]', form).textContent = p.n;
    $('[data-q-pack]', form).textContent = money(p.pr);
    $('[data-q-extra-row]', form).hidden = !extraH;
    $('[data-q-extra-l]', form).textContent = '+' + extraH + 'h';
    $('[data-q-extra]', form).textContent = money(totals.extra);
    var sl = $('[data-q-sound-l]', form); if (sl && snd) { sl.textContent = snd.n; $('[data-q-sound]', form).textContent = snd.pr ? money(snd.pr) : '0'; }
    $('[data-q-add-row]', form).hidden = !adds.length; $('[data-q-add]', form).textContent = money(totals.add);
    $('[data-q-travel-row]', form).hidden = !totals.travel; $('[data-q-travel]', form).textContent = money(totals.travel);
    $('[data-q-total]', form).textContent = money(totals.total);
    var dep = $('[data-q-dep]', form); if (dep) dep.textContent = dep.getAttribute('data-tpl').replace('{price}', money(Math.round(totals.total * D.dep / 100)));
    warn.hidden = !(dateIn.value && booked[dateIn.value]);
  };
  form.addEventListener('input', paint);
  form.addEventListener('change', paint);
  $$('[data-pick-pack]').forEach(function (a) {
    a.addEventListener('click', function () { var r = form.querySelector('[name="product"][value="' + a.getAttribute('data-pick-pack') + '"]'); if (r) { r.checked = true; hoursIn.value = ''; paint(); } });
  });
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
  var orderObj = function () {
    paint();
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var dt = get('date');
    return {
      name: get('name'), phone: get('phone'), product: pack().n, date: dt ? dt.split('-').reverse().join('/') : '',
      qty: String(totals.h), size: get('size'), address: get('address') + (get('km') ? ' (' + get('km') + ' km)' : ''),
      note: [totals.snd ? totals.snd.n : '', totals.adds.map(function (a) { return a.n; }).join(', '), get('note')].filter(Boolean).join(' · '),
      price: money(totals.total), page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'date', 'address'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : k === 'date' ? !v || !!booked[v] || v < today : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
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
