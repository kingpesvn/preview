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

// Mẫu Dịch vụ kế toán thuế (kiểu app): tab theo #hash (Trang chủ · Phí dịch vụ · Lịch hạn nộp · Liên hệ), giữ vị trí cuộn mỗi tab;
// bảng tính phí: loại hình → gói × số hóa đơn + nhân viên + dịch vụ thêm, trả trước cả năm được giảm; lịch hạn nộp: tính ngày tới gần nhất
// theo múi giờ của văn phòng, sắp xếp, đếm ngày còn lại, lọc theo loại hình, tải file lịch .ics (lặp lại hằng tháng / hằng năm, nhắc trước 3 ngày);
// giấy tờ gửi hằng tháng tick được (lưu localStorage, có try/catch) + in; form tư vấn gửi Google Form hoặc tin nhắn soạn sẵn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var cur = body.getAttribute('data-currency') || 'USD';
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

  // ── Tab ──
  var views = $$('[data-view]');
  var ids = views.map(function (v) { return v.id; });
  var scrolls = {};
  var current = null;
  var show = function (id, anchor) {
    if (ids.indexOf(id) < 0) id = ids[0];
    if (current && current !== id) scrolls[current] = window.scrollY;
    views.forEach(function (v) { v.hidden = v.id !== id; });
    $$('[data-tab]').forEach(function (a) { if (a.getAttribute('data-tab') === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var changed = current !== id;
    current = id;
    if (anchor) { var el = document.getElementById(anchor); if (el) { el.scrollIntoView(); return; } }
    if (changed) window.scrollTo(0, scrolls[id] || 0);
  };
  var route = function () {
    var h = location.hash.slice(1);
    if (ids.indexOf(h) >= 0) { show(h); return; }
    var el = h && document.getElementById(h);
    var v = el && el.closest('[data-view]');
    show(v ? v.id : ids[0], v ? h : null);
  };
  window.addEventListener('hashchange', route);
  route();

  // ── Phí dịch vụ ──
  var est = $('[data-est]');
  var chosen = { type: '', pkg: '', vol: '', staff: 0, add: [], pre: false, month: 0, year: 0 };
  var setType = function (id) {
    $$('[data-type]').forEach(function (b) { if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', String(b.getAttribute('data-type') === id)); });
    var first = null;
    $$('.pkg').forEach(function (li) { var ok = li.getAttribute('data-for') === id; li.hidden = !ok; if (ok && !first) first = li; });
    var cur = $('[name="pkg"]:checked');
    if ((!cur || cur.getAttribute('data-for') !== id) && first) $('input', first).checked = true;
    var r = $('[name="version"][data-type="' + id + '"]'); if (r) r.checked = true;
    chosen.type = id;
    var rail = $('.rail--pkg'); if (rail) rail.scrollLeft = 0;
    calc();
  };
  var calc = function () {
    if (!est) return;
    var p = $('[name="pkg"]:checked');
    var v = $('[name="vol"]:checked', est);
    var mult = v ? +v.getAttribute('data-mult') : 1;
    var st = est.querySelector('[name="staff"]');
    var staff = st ? Math.max(0, parseInt(st.value, 10) || 0) : 0;
    var base = p ? Math.round(+p.getAttribute('data-price') * mult) : 0;
    var adds = $$('[name="addon"]:checked', est);
    var addM = adds.filter(function (x) { return x.getAttribute('data-per') === 'month'; }).reduce(function (s, x) { return s + +x.getAttribute('data-price'); }, 0);
    var once = adds.filter(function (x) { return x.getAttribute('data-per') !== 'month'; }).reduce(function (s, x) { return s + +x.getAttribute('data-price'); }, 0);
    var month = base + staff * (+est.getAttribute('data-per-emp') || 0) + addM;
    var pre = !!(est.querySelector('[name="prepay"]') || {}).checked;
    var pct = +est.getAttribute('data-pre-pct') || 0;
    var save = pre ? Math.round(month * 12 * pct / 100) : 0;
    var year = month * 12 - save + once;
    chosen = { type: chosen.type, pkg: p ? p.getAttribute('data-name') : '', vol: v ? v.value : '', staff: staff, add: adds.map(function (x) { return x.value; }), pre: pre, month: month, year: year };
    $('[data-e-pkg]', est).textContent = p ? p.getAttribute('data-name') : '—';
    $('[data-e-month]', est).textContent = p ? money(month) : '—';
    $('[data-e-once-row]', est).hidden = !once; $('[data-e-once]', est).textContent = money(once);
    $('[data-e-save-row]', est).hidden = !save; $('[data-e-save]', est).textContent = '−' + money(save);
    $('[data-e-year]', est).textContent = p ? money(year) : '—';
    var box = $('[data-chosen]');
    if (box) { box.textContent = [chosen.pkg, chosen.vol, p ? money(month) : ''].filter(Boolean).join(' · '); box.hidden = !p; }
  };
  $$('[data-step]').forEach(function (s) {
    var input = $('input', s);
    $$('button', s).forEach(function (b) {
      b.addEventListener('click', function () { var v = (parseInt(input.value, 10) || 0) + +b.getAttribute('data-d'); input.value = Math.min(+input.max, Math.max(+input.min, v)); calc(); });
    });
  });
  $$('[name="pkg"]').forEach(function (r) { r.addEventListener('change', calc); });
  if (est) { est.addEventListener('change', calc); est.addEventListener('input', calc); }
  $$('button[data-type]').forEach(function (b) { b.addEventListener('click', function () { setType(b.getAttribute('data-type')); }); });
  $$('[data-go-type]').forEach(function (a) { a.addEventListener('click', function () { setType(a.getAttribute('data-go-type')); scrolls.fees = 0; }); });
  var firstType = $('button[data-type]');
  if (firstType) setType(firstType.getAttribute('data-type')); else calc();

  // ── Lịch hạn nộp ──
  var dl = $('[data-dl]');
  if (dl) {
    var tz = dl.getAttribute('data-tz');
    var locale = dl.getAttribute('data-locale') || 'en';
    var now = new Date();
    var y, m, d;
    try {
      var parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
      var get = function (k) { return +parts.filter(function (p) { return p.type === k; })[0].value; };
      y = get('year'); m = get('month'); d = get('day');
    } catch (e) { y = now.getFullYear(); m = now.getMonth() + 1; d = now.getDate(); }
    var today = Date.UTC(y, m - 1, d);
    var dim = function (yy, mm) { return new Date(Date.UTC(yy, mm, 0)).getUTCDate(); };
    var next = function (months, day) {
      for (var k = 0; k < 14; k++) {
        var mm = ((m - 1 + k) % 12) + 1, yy = y + Math.floor((m - 1 + k) / 12);
        if (months.length && months.indexOf(mm) < 0) continue;
        var dd = day === 'last' ? dim(yy, mm) : Math.min(+day, dim(yy, mm));
        var t = Date.UTC(yy, mm - 1, dd);
        if (t >= today) return t;
      }
      return null;
    };
    var fDate = new Intl.DateTimeFormat(locale, { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });
    var fMon = new Intl.DateTimeFormat(locale, { timeZone: 'UTC', month: 'short' });
    var items = $$('.dl-item', dl).map(function (li) {
      var months = (li.getAttribute('data-months') || '').split(',').filter(Boolean).map(Number);
      var t = next(months, li.getAttribute('data-day'));
      var n = t == null ? null : Math.round((t - today) / 864e5);
      li._t = t; li._n = n; li._months = months;
      if (t != null) {
        var dt = new Date(t);
        $('[data-dd]', li).textContent = dt.getUTCDate();
        $('[data-dm]', li).textContent = fMon.format(dt);
        li.setAttribute('title', fDate.format(dt));
        var left = $('[data-left-n]', li);
        left.textContent = n === 0 ? dl.getAttribute('data-today') : dl.getAttribute('data-left').replace('{n}', n);
        li.classList.toggle('soon', n <= 7);
      }
      return li;
    });
    items.sort(function (a, b) { return (a._t || 9e15) - (b._t || 9e15); }).forEach(function (li) { dl.appendChild(li); });
    var filt = 'all';
    var applyD = function () {
      items.forEach(function (li) { var f = ' ' + li.getAttribute('data-for') + ' '; li.hidden = !(filt === 'all' || !li.getAttribute('data-for') || f.indexOf(' ' + filt + ' ') >= 0); });
      $$('[data-dtype]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-dtype') === filt)); });
    };
    $$('[data-dtype]').forEach(function (b) { b.addEventListener('click', function () { filt = b.getAttribute('data-dtype'); applyD(); }); });
    applyD();
    var nx = $('[data-next]');
    var first = items.filter(function (li) { return li._t != null; })[0];
    if (nx && first) {
      $('[data-next-title]', nx).textContent = $('.dl-body b', first).textContent;
      $('[data-next-when]', nx).textContent = fDate.format(new Date(first._t)) + ' · ' + $('[data-left-n]', first).textContent;
      nx.classList.toggle('soon', first._n <= 7);
      nx.hidden = false;
    }
    var ics = $('[data-ics]');
    if (ics) ics.addEventListener('click', function () {
      var pad = function (x) { return (x < 10 ? '0' : '') + x; };
      var esc = function (s) { return String(s).replace(/[\\;,]/g, function (c) { return '\\' + c; }).replace(/\n/g, '\\n'); };
      var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
      var out = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kingpes//Tax deadlines//EN', 'CALSCALE:GREGORIAN'];
      items.filter(function (li) { return !li.hidden && li._t != null; }).forEach(function (li, i) {
        var dt = new Date(li._t), day = li.getAttribute('data-day'), ms = li._months;
        var shortest = ms.length ? Math.min.apply(null, ms.map(function (mm) { return dim(2027, mm); })) : 28;
        var bmd = day === 'last' || +day > shortest ? '-1' : day;
        var rule = ms.length ? 'FREQ=YEARLY;BYMONTH=' + ms.join(',') + ';BYMONTHDAY=' + bmd : 'FREQ=MONTHLY;BYMONTHDAY=' + bmd;
        var ds = dt.getUTCFullYear() + pad(dt.getUTCMonth() + 1) + pad(dt.getUTCDate());
        out.push('BEGIN:VEVENT', 'UID:kp-tax-' + i + '-' + ds + '@kingpes', 'DTSTAMP:' + stamp, 'DTSTART;VALUE=DATE:' + ds, 'RRULE:' + rule,
          'SUMMARY:' + esc($('.dl-body b', li).textContent), 'DESCRIPTION:' + esc(dl.getAttribute('data-name')),
          'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc($('.dl-body b', li).textContent), 'TRIGGER:-P3D', 'END:VALARM', 'END:VEVENT');
      });
      out.push('END:VCALENDAR');
      try {
        var blob = new Blob([out.join('\r\n')], { type: 'text/calendar' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = 'tax-deadlines.ics';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
      } catch (e) { /* trình duyệt chặn tải file */ }
    });
  }

  // ── Giấy tờ ──
  var docs = $('[data-docs]');
  if (docs) {
    var key = body.getAttribute('data-store') + '-docs';
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { saved = []; }
    var boxes = $$('input[type="checkbox"]', docs), count = $('[data-docs-count]');
    var paint = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      if (count) count.textContent = count.getAttribute('data-tpl').replace('{a}', n).replace('{b}', boxes.length);
    };
    boxes.forEach(function (b) {
      b.checked = saved.indexOf(+b.getAttribute('data-i')) >= 0;
      b.addEventListener('change', function () {
        var list = boxes.filter(function (x) { return x.checked; }).map(function (x) { return +x.getAttribute('data-i'); });
        try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) { /* trình duyệt chặn lưu: vẫn tick được */ }
        paint();
      });
    });
    paint();
    var pr = $('[data-print]');
    if (pr) pr.addEventListener('click', function () { window.print(); });
  }

  // ── Yêu cầu tư vấn ──
  var form = $('[data-req]');
  if (!form) return;
  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    calc();
    return {
      name: get('name'), phone: get('phone'), email: get('email'), product: chosen.pkg, version: get('version'),
      size: chosen.vol, qty: String(chosen.staff || ''),
      note: [get('when'), chosen.add.length ? '+ ' + chosen.add.join(', ') : '', chosen.pre ? est.getAttribute('data-pre-label') : '', get('note')].filter(Boolean).join(' · '),
      price: chosen.month ? money(chosen.month) : '', page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
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
