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

// Mẫu Võ thuật, boxing: ô "Lớp hôm nay" theo giờ của võ đường (lớp sắp tới / đang diễn ra, hết lớp thì hiện ngày mai);
// lịch tuần chọn ngày (mặc định hôm nay), lọc bộ môn + cấp; "Học thử" ở lịch / bộ môn / gói học điền sẵn form;
// form học thử: buổi học thật trong 14 ngày tới theo bộ môn (và cấp nếu chọn), dưới 16 tuổi hiện ô phụ huynh,
// gửi Google Form hoặc tin nhắn soạn sẵn; album "Xem thêm" + xem ảnh lớn. Không JS thì trang vẫn hiện đủ lịch và nút liên hệ.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var shopNow = function () {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), min: +p.hour * 60 + +p.minute };
  };
  var toMin = function (s) { var a = String(s).split(':'); return +a[0] * 60 + +a[1]; };
  var SCHED = [];
  try { SCHED = JSON.parse(($('#kp-sched') || {}).textContent || '[]'); } catch (e) { SCHED = []; }
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

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

  var now = shopNow();

  // ── Ô "Lớp hôm nay" ──
  var today = $('[data-today]');
  if (today && SCHED.length) {
    var list = $('[data-today-list]', today), head = $('[data-today-h]', today);
    var pick = function (wd, after) {
      return SCHED.filter(function (s) { return s.d.indexOf(wd) >= 0 && toMin(s.t) + s.m > after; }).sort(function (a, b) { return toMin(a.t) - toMin(b.t); }).slice(0, 4);
    };
    var items = pick(now.wd, now.min), label = null;
    if (!items.length) { items = pick((now.wd + 1) % 7, -1); label = today.getAttribute('data-tomorrow'); }
    if (label) head.textContent = label;
    list.innerHTML = items.length ? items.map(function (s) {
      var live = !label && toMin(s.t) <= now.min;
      return '<li' + (live ? ' class="is-live"' : '') + '><b>' + esc(s.t) + '</b><span>' + esc(s.n) + '</span><small>' + (live ? esc(today.getAttribute('data-now')) : esc(s.l)) + '</small></li>';
    }).join('') : '<li class="muted">' + esc(today.getAttribute('data-none')) + '</li>';
  }

  // ── Lịch tuần ──
  var week = $('.week');
  if (week) {
    var st = { day: now.wd, disc: '', level: '' };
    var levelSel = $('[data-level]');
    var empty = $('[data-sched-empty]');
    var paint = function () {
      $$('[data-day]').forEach(function (b) { var on = +b.getAttribute('data-day') === st.day; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.classList.toggle('is-on', on); });
      var shown = 0;
      $$('[data-day-panel]', week).forEach(function (p) {
        var on = +p.getAttribute('data-day-panel') === st.day;
        p.hidden = !on;
        if (!on) return;
        $$('.cls', p).forEach(function (li) {
          var ok = (!st.disc || li.getAttribute('data-disc') === st.disc) && (!st.level || !li.getAttribute('data-level') || li.getAttribute('data-level') === st.level);
          li.hidden = !ok; if (ok) shown++;
        });
      });
      $$('.chips [data-disc]').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-disc') === st.disc); });
      if (empty) empty.hidden = shown > 0 || !(st.disc || st.level);
    };
    $$('[data-day]').forEach(function (b) { b.addEventListener('click', function () { st.day = +b.getAttribute('data-day'); paint(); }); });
    $$('.chips [data-disc]').forEach(function (b) { b.addEventListener('click', function () { st.disc = b.getAttribute('data-disc'); paint(); }); });
    if (levelSel) levelSel.addEventListener('change', function () { st.level = levelSel.value; paint(); });
    $$('[data-pick-disc]').forEach(function (a) { a.addEventListener('click', function () { st.disc = a.getAttribute('data-pick-disc'); paint(); }); });
    paint();
  }

  // ── Album ──
  var albumEl = $('[data-album]');
  if (albumEl) {
    var moreBtn = $('[data-album-more]');
    var extra = $$('.is-more', albumEl);
    extra.forEach(function (li) { li.hidden = true; });
    if (moreBtn) { moreBtn.hidden = false; moreBtn.addEventListener('click', function () { extra.forEach(function (li) { li.hidden = false; }); moreBtn.hidden = true; }); }
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

  // ── Form học thử ──
  var form = $('[data-book]');
  if (!form) return;
  var discSel = $('[data-disc-sel]', form), lvSel = $('[data-level-sel]', form), sess = $('[data-session]', form), noSess = $('[data-no-session]', form);
  var DAYS = JSON.parse(form.getAttribute('data-days') || '[]');
  var hint = sess.options[0] ? sess.options[0].textContent : '';
  var fmtDate = function (dt) { return ('0' + dt.getUTCDate()).slice(-2) + '/' + ('0' + (dt.getUTCMonth() + 1)).slice(-2); };
  var sessions = function () {
    // Chưa tập bao giờ → lớp "mọi cấp" và lớp của cấp đầu tiên.
    var lv = lvSel.value || (lvSel.options[1] ? lvSel.options[1].value : '');
    var out = [];
    for (var k = 0; k < 14; k++) {
      var dt = new Date(Date.UTC(now.y, now.m - 1, now.d + k)), wd = dt.getUTCDay();
      SCHED.filter(function (s) { return s.c === discSel.value && s.d.indexOf(wd) >= 0 && (!s.lv || s.lv === lv) && !(k === 0 && toMin(s.t) < now.min + 60); })
        .sort(function (a, b) { return toMin(a.t) - toMin(b.t); })
        .forEach(function (s) { out.push((DAYS[wd] || '') + ' ' + fmtDate(dt) + ' · ' + s.t + ' · ' + s.n + ' (' + s.l + ')' + (s.k ? ' · ' + s.k : '')); });
    }
    return out;
  };
  var fill = function () {
    var keep = sess.value, list = sessions();
    sess.innerHTML = '<option value="">' + esc(hint) + '</option>' + list.map(function (x) { return '<option' + (x === keep ? ' selected' : '') + '>' + esc(x) + '</option>'; }).join('');
    if (!sess.value && list.length) sess.selectedIndex = 1;
    noSess.hidden = list.length > 0;
  };
  discSel.addEventListener('change', fill);
  lvSel.addEventListener('change', fill);
  fill();
  var setDisc = function (d, lv) { if (d) discSel.value = d; if (lv != null) lvSel.value = lv; fill(); };
  $$('[data-book-class]').forEach(function (a) { a.addEventListener('click', function () { setDisc(a.getAttribute('data-book-class'), a.getAttribute('data-book-level')); }); });
  var planNote = null;
  $$('[data-plan]').forEach(function (a) { a.addEventListener('click', function () { planNote = a.getAttribute('data-plan'); }); });

  var age = $('[data-age]', form), parent = $('[data-parent]', form);
  var kid = function () { var v = parseInt(age.value, 10); return v > 0 && v < 16; };
  age.addEventListener('input', function () { parent.hidden = !kid(); });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    return {
      name: get('name'), phone: get('phone'), product: discSel.options[discSel.selectedIndex].text, version: lvSel.options[lvSel.selectedIndex].text,
      date: get('date'), size: get('size') || '—', parent: kid() ? get('parent') : '', goal: get('goal'), note: get('note'), plan: planNote || '',
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) {
    var x = Object.assign({}, o, { note: [o.goal, o.note, o.plan, o.parent ? '👪 ' + o.parent : ''].filter(Boolean).join(' · ') });
    return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return x[k] || '…'; }).replace(/\s+/g, ' ');
  };
  var valid = function () {
    var ok = true;
    var check = function (el, bad) { el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false; };
    check(form.querySelector('[name="name"]'), !form.querySelector('[name="name"]').value.trim());
    check(form.querySelector('[name="phone"]'), form.querySelector('[name="phone"]').value.replace(/\D/g, '').length < 8);
    check(sess, !sess.value);
    if (kid()) check(form.querySelector('[name="parent"]'), !form.querySelector('[name="parent"]').value.trim());
    var cons = form.querySelector('[name="consent"]');
    check(cons, !cons.checked);
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
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], k === 'note' ? [o.goal, o.note, o.plan, o.parent ? 'Phụ huynh: ' + o.parent : ''].filter(Boolean).join(' · ') : (o[k] || '')); });
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
