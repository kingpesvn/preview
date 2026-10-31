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

// Mẫu Văn phòng dịch thuật: bảng tính báo giá sống (dịch vụ → hiện / ẩn ô theo loại, cặp ngôn ngữ lấy hệ số nhóm cao hơn, loại tài liệu,
// tốc độ + ngày giao dự kiến bỏ qua Chủ nhật theo múi giờ văn phòng, số bộ công chứng), nút đổi chiều ngôn ngữ, nút +/−;
// gửi Google Form hoặc tin nhắn soạn sẵn; nút "Báo giá" nổi ẩn khi bảng báo giá đang trên màn hình.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var todayParts = (function () {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return [+p.year, +p.month - 1, +p.day];
  })();

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

  var form = $('[data-quote]');
  var fab = $('[data-fab]');
  if (fab && form && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { fab.classList.toggle('is-off', es[0].isIntersecting); }, { threshold: 0.15 }).observe(form);
  }
  if (!form) return;
  var S = JSON.parse(form.getAttribute('data-services'));
  var tiers = JSON.parse(form.getAttribute('data-tiers'));
  var notary = +form.getAttribute('data-notary') || 0, ppd = +form.getAttribute('data-ppd') || 10;
  var cur = form.getAttribute('data-currency'), locale = form.getAttribute('data-locale') || 'en-US';
  var fmt = new Intl.NumberFormat(form.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var fromEl = $('[data-from]', form), toEl = $('[data-to]', form), qtyEl = $('[data-qty]', form), copiesEl = $('[data-copies]', form);
  var svc = function () { var r = form.querySelector('[name="service"]:checked'); return S.filter(function (s) { return r && s.id === r.value; })[0] || S[0]; };
  var tierOf = function (sel) { var o = sel.options[sel.selectedIndex]; return o ? +o.getAttribute('data-tier') || 0 : 0; };
  var lastKind = null;

  function addWorkdays(n) {
    var d = new Date(Date.UTC(todayParts[0], todayParts[1], todayParts[2]));
    while (n > 0) { d.setUTCDate(d.getUTCDate() + 1); if (d.getUTCDay() !== 0) n--; }
    if (d.getUTCDay() === 0) d.setUTCDate(d.getUTCDate() + 1);
    return d;
  }

  function sync() {
    var s = svc(), k = s.k;
    $$('[data-only]', form).forEach(function (el) {
      var on = el.getAttribute('data-only').split(' ').indexOf(k) >= 0;
      if (el.hasAttribute('data-copies-wrap')) on = on && k === 'notary' && notary > 0;
      el.hidden = !on;
    });
    if (k !== lastKind) {
      var lab = $('[data-qty-label]', form), hint = $('[data-qty-hint]', form), key = k === 'interpret' ? 'data-hours' : 'data-doc';
      lab.textContent = lab.getAttribute(key); hint.textContent = hint.getAttribute(key);
      if (lastKind !== null && (k === 'interpret') !== (lastKind === 'interpret')) qtyEl.value = Math.max(s.min, k === 'interpret' ? 4 : 5);
      lastKind = k;
    }
  }

  function calc() {
    sync();
    var s = svc(), k = s.k;
    var same = fromEl.value === toEl.value;
    $('[data-same]', form).hidden = !same;
    var tier = Math.max(tierOf(fromEl), tierOf(toEl)) || 1;
    var mult = +tiers[tier] || 1;
    var qty = Math.max(1, parseInt(qtyEl.value, 10) || 1);
    var billed = Math.max(qty, s.min);
    var unit = Math.round(s.p * mult);
    var base = unit * billed;
    var fieldR = k !== 'interpret' ? form.querySelector('[name="field"]:checked') : null;
    var fm = fieldR ? +fieldR.getAttribute('data-mult') || 1 : 1;
    var field = Math.round(base * (fm - 1));
    var spR = k !== 'interpret' ? form.querySelector('[name="speed"]:checked') : null;
    var sm = spR ? +spR.getAttribute('data-mult') || 1 : 1;
    var speed = Math.round((base + field) * (sm - 1));
    var copies = k === 'notary' ? Math.max(1, parseInt(copiesEl && copiesEl.value, 10) || 1) : 0;
    var nt = notary * copies;
    var total = same ? 0 : base + field + speed + nt;
    $('[data-l-base]', form).textContent = billed + ' ' + s.u + ' × ' + money(unit);
    $('[data-v-base]', form).textContent = money(base);
    var row = function (name, show, l, v) { var r = $('[data-r-' + name + ']', form); r.hidden = !show; if (show) { $('[data-l-' + name + ']', form).textContent = l; $('[data-v-' + name + ']', form).textContent = '+ ' + money(v); } };
    row('field', field > 0, fieldR && fieldR.value, field);
    row('speed', speed > 0, spR && spR.value, speed);
    var nl = $('[data-l-notary]', form);
    row('notary', nt > 0, nl.getAttribute('data-tpl').replace('{n}', copies), nt);
    $('[data-total]', form).textContent = same ? '—' : money(total);
    var minEl = $('[data-min]', form);
    minEl.hidden = qty >= s.min; minEl.textContent = minEl.getAttribute('data-tpl').replace('{n}', s.min).replace('{unit}', s.u);
    var eta = $('[data-eta]', form), etaText = '';
    if (spR) {
      var off = (+spR.getAttribute('data-days') || 0) + Math.max(0, Math.ceil(qty / (ppd * (+spR.getAttribute('data-rate') || 1))) - 1);
      etaText = off === 0 ? eta.getAttribute('data-today') : eta.getAttribute('data-tpl').replace('{date}', new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'numeric', timeZone: 'UTC' }).format(addWorkdays(off)));
    }
    eta.textContent = etaText;
    $('[data-eta-wrap]', form).hidden = !etaText;
    return { s: s, qty: qty, total: total, field: fieldR ? fieldR.value : '', speed: spR ? spR.value : '', eta: etaText, copies: copies };
  }

  form.addEventListener('change', calc);
  form.addEventListener('input', function (e) { if (e.target === qtyEl || e.target === copiesEl) calc(); });
  $$('[data-step]', form).forEach(function (b) { b.addEventListener('click', function () { qtyEl.value = Math.max(1, (parseInt(qtyEl.value, 10) || 0) + +b.getAttribute('data-step')); calc(); }); });
  $$('[data-cstep]', form).forEach(function (b) { b.addEventListener('click', function () { copiesEl.value = Math.max(1, (parseInt(copiesEl.value, 10) || 0) + +b.getAttribute('data-cstep')); calc(); }); });
  $('[data-swap]', form).addEventListener('click', function () { var a = fromEl.value; fromEl.value = toEl.value; toEl.value = a; calc(); });
  $$('[data-pick-service]').forEach(function (a) { a.addEventListener('click', function () { var r = form.querySelector('[name="service"][value="' + a.getAttribute('data-pick-service') + '"]'); if (r) { r.checked = true; calc(); } }); });
  var ev = $('[data-event]', form);
  if (ev) ev.min = todayParts[0] + '-' + String(todayParts[1] + 1).padStart(2, '0') + '-' + String(todayParts[2]).padStart(2, '0');
  calc();

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var c = calc();
    var r = form.querySelector('[name="service"]:checked');
    var pair = fromEl.options[fromEl.selectedIndex].text + ' → ' + toEl.options[toEl.selectedIndex].text;
    return {
      name: get('name'), phone: get('phone'), email: get('email'), product: r ? r.getAttribute('data-label') : '', version: pair,
      size: c.qty + ' ' + c.s.u + (c.field ? ' · ' + c.field : ''), color: c.speed, qty: c.copies ? String(c.copies) : '',
      date: c.s.k === 'interpret' ? get('event') : c.eta, note: get('note'), price: c.total ? money(c.total) : '',
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
    if (fromEl.value === toEl.value) { toEl.setAttribute('aria-invalid', 'true'); ok = false; } else toEl.setAttribute('aria-invalid', 'false');
    err.hidden = ok;
    if (!ok) form.querySelector('[aria-invalid="true"]').focus();
    return ok;
  };
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var o = order();
    if (o.website || Date.now() - t0 < 2500) return;
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
      var data = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], o[k] || ''); });
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, function () {
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
