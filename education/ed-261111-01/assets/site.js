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

// Mẫu Trường mầm non: ô "Giờ này các bé đang…" theo giờ của trường (mục lịch gần nhất đã bắt đầu, trước giờ mở / sau giờ về / cuối tuần có câu riêng);
// ô "Hôm nay bé ăn gì" theo thứ (Chủ nhật → thực đơn thứ Hai); dòng thời gian tô mục đang diễn ra; thực đơn tuần chọn thứ (mặc định hôm nay);
// "Bé vào lớp nào?": ngày sinh → tuổi vào năm học tới (site.ageBy 'year': năm khai giảng − năm sinh; 'date': tuổi tròn tới ngày cutoff) → tô lớp hợp;
// tạm tính tháng đầu = học phí + tiền ăn × số ngày học + các khoản một lần; form tham quan: buổi thật trong 14 ngày tới (site.tours), ngày sinh tự chọn lớp.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var cur = body.getAttribute('data-currency') || 'VND';
  var loc = body.getAttribute('data-locale') || 'vi';
  var fmt = new Intl.NumberFormat(loc === 'vi' ? 'vi-VN' : loc, { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var shopNow = function () {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), min: +p.hour * 60 + +p.minute };
  };
  var toMin = function (s) { var a = String(s).split(':'); return +a[0] * 60 + +a[1]; };
  var D = { r: [], m: [], c: [], tour: { d: [], h: [] } };
  try { D = JSON.parse(($('#kp-school') || {}).textContent || '{}'); } catch (e) { /* giữ mặc định */ }
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var now = shopNow();
  // Thử với ngày giờ khác: ?now=YYYY-MM-DDTHH:MM (giờ của trường).
  var q = /[?&]now=(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/.exec(location.search);
  if (q) { var dt0 = new Date(Date.UTC(+q[1], +q[2] - 1, +q[3])); now = { y: +q[1], m: +q[2], d: +q[3], wd: dt0.getUTCDay(), min: +q[4] * 60 + +q[5] }; }
  var school = now.wd >= 1 && now.wd <= (D.m.some(function (m) { return m.d === 6; }) ? 6 : 5);

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

  // ── "Giờ này các bé đang…" + dòng thời gian ──
  var R = D.r || [];
  var at = -1;
  if (school && R.length) R.forEach(function (x, i) { if (toMin(x[0]) <= now.min) at = i; });
  var last = R.length ? toMin(R[R.length - 1][0]) + 60 : 0;
  var nowBox = $('[data-now]');
  if (nowBox && R.length) {
    var tEl = $('[data-now-time]', nowBox), wEl = $('[data-now-what]', nowBox), nEl = $('[data-now-next]', nowBox);
    if (!school) { tEl.textContent = R[0][0]; wEl.textContent = nowBox.getAttribute('data-off'); }
    else if (at < 0) { tEl.textContent = R[0][0]; wEl.textContent = nowBox.getAttribute('data-before'); nEl.textContent = R[0][1]; }
    else if (now.min >= last) { tEl.textContent = R[R.length - 1][0]; wEl.textContent = nowBox.getAttribute('data-after'); }
    else { tEl.textContent = R[at][0]; wEl.textContent = R[at][1]; nEl.textContent = R[at + 1] ? '→ ' + R[at + 1][0] + ' · ' + R[at + 1][1] : ''; nowBox.classList.add('is-live'); }
  }
  var tl = $('[data-timeline]');
  if (tl && school && at >= 0 && now.min < last) { var li = $$('li', tl)[at]; if (li) li.classList.add('is-now'); }

  // ── Thực đơn hôm nay + tuần ──
  var menuDay = function () { var d = now.wd; if (!D.m.some(function (m) { return m.d === d; })) d = D.m[0] ? D.m[0].d : 1; return d; };
  var meal = $('[data-meal]');
  if (meal && D.m.length) {
    var md = menuDay(), m = D.m.filter(function (x) { return x.d === md; })[0];
    if (!school) $('[data-meal-h]', meal).textContent = meal.getAttribute('data-weekend');
    var bs = $$('[data-meal-list] b', meal);
    if (m && bs.length === 3) { bs[0].textContent = m.b; bs[1].textContent = m.l; bs[2].textContent = m.s; }
  }
  var tabs = $$('[data-mday]');
  if (tabs.length) {
    var show = function (d) {
      tabs.forEach(function (b) { var on = +b.getAttribute('data-mday') === d; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.classList.toggle('is-on', on); });
      $$('[data-mday-panel]').forEach(function (p) { p.hidden = +p.getAttribute('data-mday-panel') !== d; });
    };
    tabs.forEach(function (b) { b.addEventListener('click', function () { show(+b.getAttribute('data-mday')); }); });
    show(menuDay());
  }

  // ── Bé vào lớp nào? ──
  // Năm học tới: nếu hôm nay đã qua ngày khai giảng năm nay thì là năm học đang diễn ra.
  var ys = String(D.ys || '09-05').split('-');
  // Năm học có ngày khai giảng trong năm nay (đang học hoặc sắp khai giảng) — cả hai trường hợp bé đều xếp lớp theo năm nay.
  var startY = now.y;
  var ageOf = function (v) {
    var a = /^(\d{4})-(\d\d)-(\d\d)$/.exec(v || ''); if (!a) return null;
    if (D.by === 'year') return startY - +a[1];
    var co = String(D.co || '01-01').split('-');
    var age = startY - +a[1]; if (+a[2] > +co[0] || (+a[2] === +co[0] && +a[3] > +co[1])) age--;
    return age;
  };
  var classFor = function (age) { return D.c.filter(function (c) { return age >= c.a && age < c.b; })[0] || null; };
  var finder = $('[data-finder]');
  if (finder) {
    finder.hidden = false;
    var inp = $('[data-birth]', finder), out = $('[data-finder-out]', finder);
    inp.addEventListener('input', function () {
      var age = ageOf(inp.value), c = age == null ? null : classFor(age);
      $$('[data-class]').forEach(function (li) { li.classList.toggle('is-fit', !!c && li.getAttribute('data-class') === c.id); li.classList.toggle('is-dim', !!c && li.getAttribute('data-class') !== c.id); });
      if (age == null) return;
      var minA = Math.min.apply(null, D.c.map(function (x) { return x.a; }));
      out.textContent = c ? finder.getAttribute('data-out').replace('{age}', age).replace('{year}', startY).replace('{next}', startY + 1).replace('{class}', c.n)
        : finder.getAttribute(age < minA ? 'data-young' : 'data-none').replace('{age}', age);
      var sel = $('[data-class-sel]'); if (c && sel) sel.value = c.id;
      var bb = $('[data-book-birth]'); if (bb && !bb.value) bb.value = inp.value;
    });
  }

  // ── Tạm tính tháng đầu ──
  var calc = $('[data-calc]');
  if (calc) {
    var cs = $('[data-calc-class]', calc), cm = $('[data-calc-meal]', calc);
    var mealDay = +calc.getAttribute('data-meal') || 0, days = +calc.getAttribute('data-days') || 22, once = +calc.getAttribute('data-once') || 0;
    var paintCalc = function () {
      var tu = +cs.value || 0, me = cm.checked ? mealDay * days : 0;
      $('[data-c-tu]', calc).textContent = money(tu);
      var mEl = $('[data-c-meal]', calc); if (mEl) mEl.textContent = money(me);
      $('[data-c-total]', calc).textContent = money(tu + me + once);
    };
    cs.addEventListener('change', paintCalc); cm.addEventListener('change', paintCalc); paintCalc();
  }

  // ── Album ──
  var albumEl = $('[data-album]');
  if (albumEl) {
    var moreBtn = $('[data-album-more]');
    var extra = $$('.is-more', albumEl);
    extra.forEach(function (x) { x.hidden = true; });
    if (moreBtn) { moreBtn.hidden = false; moreBtn.addEventListener('click', function () { extra.forEach(function (x) { x.hidden = false; }); moreBtn.hidden = true; }); }
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var links = $$('a[data-zoom]', albumEl), img = $('[data-lb-img]', lb), cur2 = 0;
      var open = function (i) { cur2 = (i + links.length) % links.length; img.src = links[cur2].getAttribute('href'); };
      albumEl.addEventListener('click', function (e) { var a = e.target.closest('a[data-zoom]'); if (!a) return; e.preventDefault(); open(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { open(cur2 + +b.getAttribute('data-lb-step')); }); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    }
  }

  // ── Form tham quan ──
  var form = $('[data-book]');
  if (!form) return;
  var sess = $('[data-session]', form), noSess = $('[data-no-session]', form), clsSel = $('[data-class-sel]', form), birth = $('[data-book-birth]', form);
  var DAYS = JSON.parse(form.getAttribute('data-days') || '[]');
  var hint = sess.options[0] ? sess.options[0].textContent : '';
  var list = [];
  for (var k = 1; k <= 14; k++) {
    var dt = new Date(Date.UTC(now.y, now.m - 1, now.d + k)), wd = dt.getUTCDay();
    if ((D.tour.d || []).indexOf(wd) < 0) continue;
    (D.tour.h || []).forEach(function (h) { list.push((DAYS[wd] || '') + ' ' + ('0' + dt.getUTCDate()).slice(-2) + '/' + ('0' + (dt.getUTCMonth() + 1)).slice(-2) + ' · ' + h); });
  }
  sess.innerHTML = '<option value="">' + esc(hint) + '</option>' + list.map(function (x) { return '<option>' + esc(x) + '</option>'; }).join('');
  noSess.hidden = list.length > 0;
  birth.addEventListener('input', function () { var a = ageOf(birth.value), c = a == null ? null : classFor(a); if (c) clsSel.value = c.id; });
  $$('[data-pick-class]').forEach(function (a) { a.addEventListener('click', function () { clsSel.value = a.getAttribute('data-pick-class'); }); });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var bd = get('size').split('-').reverse().join('/');
    return {
      name: get('name'), phone: get('phone'), product: clsSel.value ? clsSel.options[clsSel.selectedIndex].text : '—', date: get('date'),
      size: bd, child: get('child'), note: [get('child'), get('note')].filter(Boolean).join(' · '),
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    var check = function (el, bad) { el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false; };
    ['name', 'child', 'size'].forEach(function (n) { var el = form.querySelector('[name="' + n + '"]'); check(el, !el.value.trim()); });
    check(form.querySelector('[name="phone"]'), form.querySelector('[name="phone"]').value.replace(/\D/g, '').length < 8);
    check(sess, !sess.value);
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
