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

// Mẫu Trường dạy lái xe: lịch khai giảng và lịch thi tự ẩn ngày đã qua (theo múi giờ của trường), lọc theo hạng; dải "Khai giảng gần nhất";
// nút "Đăng ký hạng này" / "Giữ chỗ" chọn sẵn hạng và khóa trong form; form: gói theo hạng, khóa khai giảng của hạng (đã đủ thì khóa lại),
// giờ chạy thêm, năm sinh → nhắc tuổi tối thiểu; học phí + giờ thêm + lệ phí thi tạm tính; gửi Google Form hoặc tin nhắn soạn sẵn; album xem lớn.
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

  // ── Lịch khai giảng, lịch thi ──
  var rows = $$('.row[data-date]');
  rows.forEach(function (r) { if (r.getAttribute('data-date') < today) { r.classList.add('is-past'); r.hidden = true; } });
  var intakeList = $('[data-intakes]'), emptyMsg = $('[data-intakes-empty]');
  var filterCls = function (id) {
    rows.forEach(function (r) {
      if (r.classList.contains('is-past')) return;
      r.hidden = !!id && (' ' + r.getAttribute('data-cls') + ' ').indexOf(' ' + id + ' ') < 0;
    });
    $$('.chip[data-cls]').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-cls') === id); });
    if (intakeList && emptyMsg) emptyMsg.hidden = $$('.row', intakeList).some(function (r) { return !r.hidden; });
  };
  $$('.chip[data-cls]').forEach(function (b) { b.addEventListener('click', function () { filterCls(b.getAttribute('data-cls')); }); });
  filterCls('');
  var next = $('[data-next]');
  if (next) {
    var first = $$('.next-in', next).filter(function (a) { return a.getAttribute('data-date') >= today; })[0];
    if (first) { first.hidden = false; next.hidden = false; }
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

  // ── Đăng ký học ──
  var form = $('[data-book-form]');
  if (!form) return;
  var classes = JSON.parse(form.getAttribute('data-cls'));
  var intakes = JSON.parse(form.getAttribute('data-intakes') || '[]');
  var sel = $('[data-cls-sel]', form), vars = $('[data-vars]', form), inSel = $('[data-intake-sel]', form);
  var extraEl = $('[data-extra]', form), extraWrap = $('[data-extra-wrap]', form), birth = $('[data-birth]', form), ageWarn = $('[data-age-warn]', form);
  var brk = $('[data-break]', form), total = $('[data-total]', form);
  var find = function () { return classes.filter(function (c) { return c.id === sel.value; })[0] || classes[0]; };
  var vIdx = function () { var r = form.querySelector('[name="pkg"]:checked'), c = find(); for (var i = 0; i < c.v.length; i++) if (r && c.v[i].l === r.value) return i; return 0; };
  var renderVars = function () {
    var c = find();
    vars.innerHTML = c.v.map(function (v, i) { return '<label class="opt"><input type="radio" name="pkg" value="' + esc(v.l) + '"' + (i ? '' : ' checked') + '><span>' + esc(v.l) + ' · ' + esc(money(v.p)) + '</span></label>'; }).join('');
    extraWrap.hidden = !c.x;
    if (!c.x) extraEl.value = 0;
  };
  var renderIntakes = function (want) {
    var c = find(), keep = want || inSel.value;
    var list = intakes.filter(function (x) { return x.c === c.id && x.d >= today; });
    var tpl = form.getAttribute('data-fmt-tpl'), full = form.getAttribute('data-full');
    inSel.innerHTML = inSel.options[0].outerHTML + list.map(function (x) {
      return '<option value="' + x.d + '"' + (x.full ? ' disabled' : '') + (x.d === keep && !x.full ? ' selected' : '') + '>' + esc(tpl.replace('{date}', dfmt(x.d))) + (x.full ? ' · ' + esc(full) : '') + '</option>';
    }).join('');
    if (!inSel.value) { var firstOpen = list.filter(function (x) { return !x.full; })[0]; if (firstOpen) inSel.value = firstOpen.d; }
  };
  var checkAge = function () {
    var c = find(), y = +birth.value, age = y ? (+today.slice(0, 4)) - y : 0;
    var bad = c.age && y > 1900 && age < c.age;
    ageWarn.hidden = !bad;
    if (bad) ageWarn.textContent = ageWarn.getAttribute('data-tpl').replace('{n}', c.age);
  };
  var quote = function () {
    var c = find(), v = c.v[vIdx()], h = Math.max(0, Math.min(40, +extraEl.value || 0)), x = c.x ? h * c.x : 0, e = c.e || 0;
    return { c: c, v: v, h: h, x: x, e: e, sum: v.p + x + e };
  };
  var calc = function () {
    var q = quote();
    var row = function (k, val) { return '<div><dt>' + esc(k) + '</dt><dd>' + esc(money(val)) + '</dd></div>'; };
    brk.innerHTML = row(brk.getAttribute('data-fee') + ' · ' + q.v.l, q.v.p) + (q.x ? row(brk.getAttribute('data-extra-l').replace('{n}', q.h), q.x) : '') + (q.e ? row(brk.getAttribute('data-exam'), q.e) : '');
    total.textContent = money(q.sum);
  };
  var pick = function (id, date) {
    if (!id) return;
    sel.value = id; if (sel.value !== id) return;
    renderVars(); renderIntakes(date || ''); checkAge(); calc();
  };
  $$('[data-pick]').forEach(function (a) { a.addEventListener('click', function () { pick(a.getAttribute('data-pick'), a.getAttribute('data-intake')); }); });
  sel.addEventListener('change', function () { renderVars(); renderIntakes(''); checkAge(); calc(); });
  form.addEventListener('input', function (e) { if (e.target === birth) checkAge(); if (e.target === extraEl) calc(); });
  form.addEventListener('change', function () { calc(); });
  renderVars(); renderIntakes(''); calc();

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var q = quote(), tsel = form.querySelector('[name="time"]');
    return {
      name: get('name'), phone: get('phone'), product: q.c.n, version: q.v.l, date: get('intake') ? dfmt(get('intake')) : '—',
      size: tsel.options[tsel.selectedIndex].text, qty: String(q.h), birth: get('birth') || '—', note: get('note'), price: money(q.sum),
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
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], k === 'note' ? [o.birth !== '—' ? o.birth : '', o.note].filter(Boolean).join(' · ') : (o[k] || '')); });
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
