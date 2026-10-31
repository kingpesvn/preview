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

// Mẫu Trung tâm tiếng Anh: lọc khóa học theo nhóm; bài kiểm tra trình độ từng câu → trình độ + khóa gợi ý;
// lịch khai giảng ẩn lớp đã qua ngày (theo múi giờ trung tâm); nút "Học thử khóa này" / "Giữ chỗ" điền sẵn form;
// album lọc nhóm, "Xem thêm", xem ảnh lớn; form học thử → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp.
// Không có JavaScript thì trang vẫn hiện đủ khóa học, câu hỏi, lịch khai giảng, ảnh và nút liên hệ.
(function () {
  var body = document.body;

  function send(channel, href, text, msg) {
    if (channel === 'whatsapp') href = 'https://wa.me/' + body.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
    if (channel === 'email') href = 'mailto:' + body.getAttribute('data-email') + '?subject=' + encodeURIComponent(text.split('\n')[0]) + '&body=' + encodeURIComponent(text);
    var open = function () { window.open(href, channel === 'phone' || channel === 'email' ? '_self' : '_blank', 'noopener'); };
    if (channel === 'whatsapp' || channel === 'email') { open(); return; }
    var show = function (s) { if (msg) { msg.textContent = s; msg.hidden = false; } open(); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { show(body.getAttribute('data-copied')); }, function () { show(text); });
    } else show(text);
  }

  // Ngày hôm nay theo múi giờ trung tâm (không dùng toISOString: lệch ngày theo UTC).
  var tz = body.getAttribute('data-tz') || undefined;
  var o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
  var todayISO = o.year + '-' + o.month + '-' + o.day;

  var form = document.querySelector('form[data-book]');
  var sel = form && form.querySelector('[name="product"]');
  var pickCourse = function (id) {
    if (!sel || !id) return;
    var op = sel.querySelector('option[data-id="' + id + '"]');
    if (op) sel.value = op.value;
  };
  var goForm = function () { if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  // ── Khóa học: lọc theo nhóm ──
  document.querySelectorAll('.chip[data-cat]').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = b.getAttribute('data-cat');
      document.querySelectorAll('.chip[data-cat]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      document.querySelectorAll('.course[data-c]').forEach(function (el) { el.hidden = !!c && el.getAttribute('data-c') !== c; });
      var grid = document.querySelector('.courses'); if (grid) grid.classList.toggle('is-filtered', !!c);
    });
  });

  // ── Lịch khai giảng: ẩn lớp đã khai giảng ──
  var list = document.querySelector('[data-intakes]');
  if (list) {
    var left = 0;
    list.querySelectorAll('.intake').forEach(function (li) {
      var past = li.getAttribute('data-date') < todayISO;
      li.hidden = past;
      if (!past) left++;
    });
    if (!left) { list.hidden = true; document.querySelector('[data-intakes-empty]').hidden = false; }
    var up = Array.prototype.filter.call(list.querySelectorAll('.intake'), function (li) { return !li.hidden; });
    var moreWrap = document.querySelector('[data-intakes-morewrap]');
    if (moreWrap && up.length > 8) {
      up.slice(8).forEach(function (li) { li.classList.add('later'); });
      moreWrap.hidden = false;
      moreWrap.querySelector('button').addEventListener('click', function () { up.forEach(function (li) { li.classList.remove('later'); }); moreWrap.hidden = true; });
    }
  }

  // ── Kiểm tra trình độ ──
  var quiz = document.querySelector('form[data-quiz]');
  var quizText = '';
  if (quiz) {
    var qs = Array.prototype.slice.call(quiz.querySelectorAll('.qz'));
    var levels = JSON.parse(quiz.getAttribute('data-levels') || '[]');
    var start = quiz.querySelector('.quiz-start');
    var nav = quiz.querySelector('.quiz-nav');
    var bar = quiz.querySelector('[data-q-bar]');
    var next = quiz.querySelector('[data-q-next]');
    var back = quiz.querySelector('[data-q-back]');
    var res = quiz.querySelector('[data-q-result]');
    var at = 0, suggested = '';
    quiz.classList.add('js');
    var answered = function (i) { return !!qs[i].querySelector('input:checked'); };
    var show = function (i) {
      at = i;
      qs.forEach(function (f, k) { f.hidden = k !== i; });
      bar.style.width = (i / qs.length * 100) + '%';
      back.style.visibility = i ? 'visible' : 'hidden';
      next.textContent = i === qs.length - 1 ? next.getAttribute('data-last') : next.getAttribute('data-label');
      next.disabled = !answered(i);
    };
    var reset = function () {
      quiz.reset(); res.hidden = true; nav.hidden = true; start.hidden = false;
      qs.forEach(function (f) { f.hidden = true; }); bar.style.width = '0';
    };
    var finish = function () {
      var score = qs.filter(function (f) { var c = f.querySelector('input:checked'); return c && c.value === f.getAttribute('data-a'); }).length;
      var lv = null;
      levels.forEach(function (l) { if (score >= l.min) lv = l; });
      qs.forEach(function (f) { f.hidden = true; });
      nav.hidden = true; bar.style.width = '100%';
      res.querySelector('[data-q-level]').textContent = lv ? lv.level : '';
      res.querySelector('[data-q-name]').textContent = lv && lv.name ? lv.name : '';
      var sc = res.querySelector('[data-q-score]');
      sc.textContent = sc.getAttribute('data-tpl').replace('{n}', score).replace('{total}', qs.length);
      var cs = res.querySelector('[data-q-course]');
      suggested = lv && lv.course ? lv.course : '';
      cs.hidden = !suggested;
      if (suggested) cs.textContent = cs.getAttribute('data-tpl').replace('{course}', lv.courseName);
      quizText = score + '/' + qs.length + (lv ? ' (' + lv.level + (lv.name ? ' – ' + lv.name : '') + ')' : '');
      res.hidden = false; res.focus();
    };
    quiz.querySelector('[data-q-start]').addEventListener('click', function () { start.hidden = true; nav.hidden = false; show(0); qs[0].querySelector('input').focus(); });
    quiz.addEventListener('change', function () { next.disabled = !answered(at); });
    next.addEventListener('click', function () { if (!answered(at)) return; if (at < qs.length - 1) show(at + 1); else finish(); });
    back.addEventListener('click', function () { if (at > 0) show(at - 1); });
    quiz.querySelector('[data-q-again]').addEventListener('click', reset);
    quiz.querySelector('[data-q-book]').addEventListener('click', function () {
      pickCourse(suggested);
      var h = form && form.querySelector('[name="quiz"]');
      if (h) h.value = quizText;
      goForm();
    });
    reset();
  }

  // ── Album: lọc nhóm + "Xem thêm" (mỗi lần 24) + xem ảnh lớn ──
  var album = document.querySelector('[data-album]');
  if (album) {
    var tiles = Array.prototype.slice.call(album.querySelectorAll('.ph'));
    var more = document.querySelector('[data-album-more]');
    var leftEl = more && more.querySelector('[data-left]');
    var tag = '', shown = 12;
    var apply = function () {
      var n = 0;
      tiles.forEach(function (t) {
        var ok = !tag || t.getAttribute('data-t') === tag;
        t.classList.toggle('off', !ok);
        if (ok) { n++; t.classList.toggle('show', n <= shown); }
      });
      if (more) { more.parentNode.hidden = n <= shown; if (leftEl) leftEl.textContent = '(' + (n - shown) + ')'; }
    };
    document.querySelectorAll('.chip[data-tag]').forEach(function (b) {
      b.addEventListener('click', function () {
        tag = b.getAttribute('data-tag'); shown = 12;
        document.querySelectorAll('.chip[data-tag]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        apply();
      });
    });
    if (more) more.addEventListener('click', function () { shown += 24; apply(); });
    tiles.forEach(function (t) { t.classList.add('more'); });
    apply();

    var lb = document.querySelector('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = lb.querySelector('[data-lb-img]'), count = lb.querySelector('[data-lb-count]');
      var visible = function () { return tiles.filter(function (t) { return !t.classList.contains('off'); }); };
      var cur = 0;
      var open = function (i) { var l = visible(); cur = (i + l.length) % l.length; img.src = l[cur].getAttribute('href'); count.textContent = (cur + 1) + ' / ' + l.length; };
      album.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); open(visible().indexOf(a)); lb.showModal(); });
      lb.querySelector('[data-lb-prev]').addEventListener('click', function () { open(cur - 1); });
      lb.querySelector('[data-lb-next]').addEventListener('click', function () { open(cur + 1); });
      lb.querySelector('[data-lb-close]').addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(cur + 1); if (e.key === 'ArrowLeft') open(cur - 1); });
      var x0 = null;
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(cur + (dx < 0 ? 1 : -1)); x0 = null; });
    }
  }

  // ── Form học thử ──
  if (!form) return;
  var fields = form.querySelector('.book-fields');
  var box = form.querySelector('[data-done]');
  var err = form.querySelector('[data-err]');
  var btn = form.querySelector('[data-submit]');
  var day = form.querySelector('[name="day"]');
  if (day) day.min = todayISO;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pick],[data-intake]');
    if (!b) return;
    if (b.hasAttribute('data-pick')) pickCourse(b.getAttribute('data-pick'));
    else {
      pickCourse(b.getAttribute('data-intake'));
      var n = form.querySelector('[name="note"]');
      var line = b.closest('.intake').querySelector('.in-date small').textContent + ': ' + b.closest('.intake').querySelector('.in-date b').textContent;
      if (n && n.value.indexOf(line) < 0) n.value = (n.value ? n.value + '\n' : '') + line;
    }
    goForm();
  });
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) {
    var el = form.querySelector('[name="' + name + '"]');
    if (el && el.getAttribute('data-label')) return el.getAttribute('data-label');
    var s = el && el.closest('.field') && el.closest('.field').querySelector('span');
    return s ? s.textContent.replace(/\s*\*$/, '') : name;
  };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var quizRes = get('quiz');
    return {
      name: get('name'), phone: get('phone'), product: get('product'), size: get('size'), date: [get('day'), get('time')].filter(Boolean).join(' '),
      note: [get('note'), quizRes ? label('quiz') + ': ' + quizRes : ''].filter(Boolean).join('\n'), quiz: quizRes,
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (x) {
    var rows = [['product', x.product], ['size', x.size], ['day', x.date], ['name', x.name], ['phone', x.phone], ['note', x.note]];
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return label(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8]].forEach(function (y) {
      var el = form.querySelector('[name="' + y[0] + '"]');
      el.setAttribute('aria-invalid', y[1] ? 'true' : 'false');
      if (y[1]) ok = false;
    });
    err.hidden = ok;
    if (!ok) form.querySelector('[aria-invalid="true"]').focus();
    return ok;
  };
  var done = function (msg) {
    fields.hidden = true; box.hidden = false; box.focus();
    box.querySelectorAll('button[data-channel]').forEach(function (x) { x.setAttribute('data-msg', msg); });
  };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var x = read();
    if (x.website || Date.now() - t0 < 2500) return;
    if (!valid(x)) return;
    var msg = text(x);
    if (!gform) { done(msg); return; }
    var data = new URLSearchParams();
    Object.keys(gmap).forEach(function (k) { data.append(gmap[k], x[k] || ''); });
    btn.disabled = true;
    var old = btn.innerHTML;
    btn.textContent = btn.getAttribute('data-sending');
    fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(function () { done(msg); }, function () {
      btn.disabled = false; btn.innerHTML = old;
      send((body.getAttribute('data-wa') && 'whatsapp') || 'email', '', msg, null);
    });
  });
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-channel]');
    if (!b) return;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg'), box.querySelector('[data-msg]'));
  });
  var edit = form.querySelector('[data-edit]');
  if (edit) edit.addEventListener('click', function () { box.hidden = true; fields.hidden = false; });
})();
