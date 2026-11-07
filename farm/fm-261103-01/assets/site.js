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

// Mẫu Trang trại tham quan: dải "Tháng này có gì" và cột tháng hiện tại trong lịch mùa vụ (theo múi giờ của trang trại, hàng đang có
// đưa lên đầu); nút "Chọn gói này" chọn sẵn gói trong form; form đặt vé: ngày không được trước hôm nay, ngày nghỉ báo lại;
// người lớn / trẻ em / trẻ nhỏ miễn phí + dịch vụ thêm (theo người hoặc theo đơn) → tạm tính; gửi Google Form hoặc tin nhắn soạn sẵn; album xem lớn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var parts = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; });
  var today = parts.year + '-' + parts.month + '-' + parts.day;
  var month = +parts.month;
  var lang = body.getAttribute('data-lang') || 'en';
  var cur = body.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(lang, { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var dfmt = function (d) { try { return new Intl.DateTimeFormat(lang, { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(d + 'T00:00:00Z')); } catch (e) { return d; } };

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

  // ── Tháng này có gì + lịch mùa vụ ──
  var now = $('[data-now]');
  if (now) { var hit = $('.next-in[data-month="' + month + '"]', now); if (hit) { hit.hidden = false; now.hidden = false; } }
  var cal = $('[data-cal]');
  if (cal) {
    $$('[data-m="' + month + '"]', cal).forEach(function (c) { c.classList.add('now'); });
    var tb = $('tbody', cal);
    $$('tr', tb).filter(function (r) { return (' ' + r.getAttribute('data-months') + ' ').indexOf(' ' + month + ' ') >= 0; }).reverse().forEach(function (r) { r.classList.add('is-now'); tb.insertBefore(r, tb.firstChild); });
  }

  // ── Album ──
  var albumEl = $('[data-album]');
  if (albumEl) {
    var more = $('[data-album-more]');
    var extraPics = $$('.is-more', albumEl);
    extraPics.forEach(function (li) { li.hidden = true; });
    if (more) { more.hidden = false; more.addEventListener('click', function () { extraPics.forEach(function (li) { li.hidden = false; }); more.hidden = true; }); }
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var links = $$('a[data-zoom]', albumEl), img = $('[data-lb-img]', lb), at = 0;
      var openPic = function (i) { at = (i + links.length) % links.length; img.src = links[at].getAttribute('href'); };
      albumEl.addEventListener('click', function (e) { var a = e.target.closest('a[data-zoom]'); if (!a) return; e.preventDefault(); openPic(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { openPic(at + +b.getAttribute('data-lb-step')); }); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    }
  }

  // ── Đặt vé ──
  var form = $('[data-book-form]');
  if (!form) return;
  var pkgs = JSON.parse(form.getAttribute('data-pkgs'));
  var adds = JSON.parse(form.getAttribute('data-adds') || '[]');
  var closed = JSON.parse(form.getAttribute('data-closed') || '[]');
  var sel = $('[data-pkg-sel]', form), dateEl = $('[data-date]', form), warn = $('[data-date-warn]', form);
  var brk = $('[data-break]', form), total = $('[data-total]', form);
  dateEl.min = today;
  var n = function (k) { var el = form.querySelector('[data-n="' + k + '"]'); return el ? Math.max(+el.min || 0, Math.min(60, +el.value || 0)) : 0; };
  var find = function () { return pkgs.filter(function (p) { return p.id === sel.value; })[0] || pkgs[0]; };
  var chosen = function () { return $$('[name="add"]:checked', form).map(function (c) { return adds.filter(function (a) { return a.id === c.value; })[0]; }).filter(Boolean); };
  var quote = function () {
    var p = find(), ad = n('adults'), kd = n('kids'), people = ad + kd;
    var rows = [[brk.getAttribute('data-adult-l').replace('{n}', ad), ad * p.a]];
    if (kd) rows.push([brk.getAttribute('data-kid-l').replace('{n}', kd), kd * p.c]);
    chosen().forEach(function (a) { rows.push([a.n + (a.per === 'booking' ? '' : ' × ' + people), a.per === 'booking' ? a.p : a.p * people]); });
    return { p: p, rows: rows, sum: rows.reduce(function (s, r) { return s + r[1]; }, 0) };
  };
  var calc = function () {
    var q = quote();
    brk.innerHTML = q.rows.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(money(r[1])) + '</dd></div>'; }).join('');
    total.textContent = money(q.sum);
  };
  var checkDate = function () {
    var d = dateEl.value, msg = '';
    if (d && closed.indexOf(new Date(d + 'T00:00:00Z').getUTCDay()) >= 0) msg = form.getAttribute('data-closed-msg').replace('{date}', dfmt(d));
    warn.textContent = msg; warn.hidden = !msg;
    return !msg && !!d && d >= today;
  };
  $$('[data-step]', form).forEach(function (b) {
    b.addEventListener('click', function () { var el = b.parentNode.querySelector('input'); el.value = Math.max(+el.min || 0, Math.min(60, (+el.value || 0) + +b.getAttribute('data-step'))); calc(); });
  });
  $$('[data-pick]').forEach(function (a) { a.addEventListener('click', function () { sel.value = a.getAttribute('data-pick'); calc(); }); });
  dateEl.addEventListener('change', checkDate);
  form.addEventListener('input', calc);
  form.addEventListener('change', calc);
  calc();

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var q = quote(), kids = n('kids'), tots = n('tots');
    return {
      name: get('name'), phone: get('phone'), product: q.p.n, date: get('date') ? dfmt(get('date')) : '—', qty: String(n('adults')),
      size: kids + (tots ? ' + ' + tots : ''), version: chosen().map(function (a) { return a.n; }).join(', ') || '—', note: get('note'), price: money(q.sum),
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'date'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : k === 'date' ? !checkDate() : !v;
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
      var btn = $('[data-order-submit]', form);
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
