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

// Mẫu Mi và phun xăm: chọn dáng mắt → tô sáng kiểu mi hợp + lời khuyên; lọc kiểu theo hiệu ứng; "Đặt kiểu này" điền mã kiểu + dịch vụ vào form;
// form đặt lịch: lựa chọn (lần đầu / dặm lại) theo dịch vụ, giờ trống theo giờ mở cửa của ngày đã chọn (đủ thời lượng dịch vụ trước giờ đóng,
// cách hiện tại ≥ lead phút, hết giờ thì sang ngày kế), tạm tính, gửi Google Form hoặc tin nhắn soạn sẵn; album "Xem thêm" + xem ảnh lớn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var shopNow = function () {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, min: +p.hour * 60 + +p.minute };
  };
  var iso = function (y, m, d) { return new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10); };
  var hhmm = function (n) { return ('0' + Math.floor(n / 60)).slice(-2) + ':' + ('0' + (n % 60)).slice(-2); };

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

  // ── Bộ mẫu mi: dáng mắt + hiệu ứng ──
  var grid = $('[data-styles-grid]');
  if (grid) {
    var st = { shape: '', look: '' }, codes = [];
    var paint = function () {
      $$('.style', grid).forEach(function (li) {
        var fit = st.shape && codes.indexOf(li.getAttribute('data-code')) >= 0;
        li.hidden = !!st.look && li.getAttribute('data-look') !== st.look;
        li.classList.toggle('is-fit', !!fit);
        li.classList.toggle('is-dim', !!st.shape && !fit);
      });
      $$('[data-shape]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-shape') === st.shape ? 'true' : 'false'); });
      $$('[data-shape-tip]').forEach(function (p) { p.hidden = p.getAttribute('data-shape-tip') !== st.shape; });
      $$('[data-look]').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-look') === st.look); });
    };
    $$('[data-shape]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-shape');
        st.shape = st.shape === v ? '' : v;
        codes = st.shape ? b.getAttribute('data-styles').split(' ') : [];
        paint();
      });
    });
    $$('button[data-look]').forEach(function (b) { b.addEventListener('click', function () { st.look = b.getAttribute('data-look'); paint(); }); });
  }

  // ── Album ──
  var albumEl = $('[data-album]');
  if (albumEl) {
    var more = $('[data-album-more]');
    var extra = $$('.is-more', albumEl);
    extra.forEach(function (li) { li.hidden = true; });
    if (more) { more.hidden = false; more.addEventListener('click', function () { extra.forEach(function (li) { li.hidden = false; }); more.hidden = true; }); }
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var links = $$('a[data-zoom]', albumEl), img = $('[data-lb-img]', lb), at = 0;
      var open = function (i) { at = (i + links.length) % links.length; img.src = links[at].getAttribute('href'); };
      albumEl.addEventListener('click', function (e) { var a = e.target.closest('a[data-zoom]'); if (!a) return; e.preventDefault(); open(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { open(at + +b.getAttribute('data-lb-step')); }); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    }
  }

  // ── Đặt lịch ──
  var form = $('[data-book-form]');
  if (!form) return;
  var services = JSON.parse(form.getAttribute('data-svc'));
  var hours = JSON.parse(form.getAttribute('data-hours') || '[]');
  var step = +form.getAttribute('data-step') || 30, lead = +form.getAttribute('data-lead') || 120;
  var sel = $('[data-svc-sel]', form), vars = $('[data-vars]', form), dateEl = $('[data-date]', form), timeEl = $('[data-time]', form), note = $('[data-time-note]', form), total = $('[data-total]', form), styleEl = $('[data-style]', form);
  var find = function () { return services.filter(function (s) { return s.id === sel.value; })[0] || services[0]; };
  var vIdx = function () { var r = form.querySelector('[name="variant"]:checked'); var s = find(); for (var i = 0; i < s.v.length; i++) if (r && s.v[i].l === r.value) return i; return 0; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var renderVars = function () {
    var s = find();
    vars.innerHTML = s.v.map(function (v, i) { return '<label class="opt"><input type="radio" name="variant" value="' + esc(v.l) + '"' + (i ? '' : ' checked') + '><span>' + esc(v.l) + ' · ' + v.money + '</span></label>'; }).join('');
  };
  var now = shopNow();
  var today = iso(now.y, now.m, now.d);
  dateEl.min = today;
  dateEl.max = iso(now.y, now.m + 2, now.d);
  if (!dateEl.value) dateEl.value = today;
  var renderTimes = function () {
    var d = dateEl.value ? new Date(dateEl.value + 'T00:00:00Z') : null;
    var wd = d ? d.getUTCDay() : null;
    var spans = hours.filter(function (h) { return wd == null || h.d.indexOf(wd) >= 0; });
    var len = find().m, keep = timeEl.value, list = [];
    spans.forEach(function (h) { for (var m = h.o; m + len <= h.c; m += step) if (!(dateEl.value === today && m < shopNow().min + lead)) list.push(hhmm(m)); });
    list = list.filter(function (x, i) { return list.indexOf(x) === i; }).sort();
    timeEl.innerHTML = list.map(function (x) { return '<option' + (x === keep ? ' selected' : '') + '>' + x + '</option>'; }).join('');
    note.hidden = list.length > 0;
    note.textContent = !spans.length ? note.getAttribute('data-closed') : note.getAttribute('data-none');
  };
  var calc = function () { var v = find().v[vIdx()]; total.textContent = v.money; };
  sel.addEventListener('change', function () { renderVars(); renderTimes(); calc(); });
  form.addEventListener('change', function (e) { if (e.target.name === 'date') { if (dateEl.value < today) dateEl.value = today; renderTimes(); } calc(); });
  renderVars(); renderTimes(); calc();
  for (var k = 1; k <= 7 && !timeEl.options.length; k++) { dateEl.value = iso(now.y, now.m, now.d + k); renderTimes(); }
  var pickSvc = function (id) { if (!id) return; sel.value = id; if (sel.value !== id) return; renderVars(); renderTimes(); calc(); };
  $$('[data-pick-style]').forEach(function (a) { a.addEventListener('click', function () { styleEl.value = a.getAttribute('data-pick-style'); pickSvc(a.getAttribute('data-service')); }); });
  $$('[data-book]').forEach(function (a) { a.addEventListener('click', function () { styleEl.value = ''; pickSvc(a.getAttribute('data-book')); }); });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = find(), v = s.v[vIdx()];
    return {
      name: get('name'), phone: get('phone'), product: sel.options[sel.selectedIndex].text, version: v.l, size: get('style') || '—', color: get('artist') || '—',
      date: get('date') + ' ' + get('time'), health: d.getAll('health').join(', ') || '—', note: get('note'), price: v.money,
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'date', 'time'].forEach(function (k) {
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
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], k === 'note' ? [o.health !== '—' ? '⚠ ' + o.health : '', o.note].filter(Boolean).join(' · ') : (o[k] || '')); });
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
