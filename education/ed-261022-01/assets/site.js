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

// Mẫu Lớp học nấu ăn: từ lịch cố định hằng tuần (data-list) dựng các buổi học trong vài tuần tới theo múi giờ của lớp,
// buổi có ngày trong `booked` ghi "Hết chỗ"; thẻ "Lớp gần nhất" ở đầu trang; chip lọc loại lớp lọc cả thẻ lớp lẫn lịch;
// nút "Đặt buổi này" / "Đặt lớp này" / "Đặt lớp riêng" điền form; form tự tính tạm tính = giá mỗi người × số người, trừ % khi đi nhóm;
// album lọc nhóm, "Xem thêm", xem ảnh lớn; form → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp.
// Không có JavaScript thì trang vẫn hiện mọi lớp, lịch theo thứ trong tuần và nút liên hệ.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var locale = body.getAttribute('data-locale') || undefined;
  var currency = body.getAttribute('data-currency') || 'VND';

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
  var money = function (n) {
    var o = { style: 'currency', currency: currency };
    if (['VND', 'JPY', 'KRW', 'IDR', 'KHR', 'LAK'].indexOf(currency) >= 0) o.maximumFractionDigits = 0;
    return new Intl.NumberFormat(locale, o).format(n);
  };

  // Hôm nay + giờ hiện tại theo múi giờ của lớp.
  var o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
  var todayISO = o.year + '-' + o.month + '-' + o.day;
  var nowHM = o.hour.replace('24', '00') + ':' + o.minute;
  var addDays = function (iso, n) { var p = iso.split('-').map(Number); return new Date(Date.UTC(p[0], p[1] - 1, p[2] + n)); };
  var fmtDay = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  var fmtLong = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'numeric', timeZone: 'UTC' });
  var fmtMon = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });

  // ── Dựng các buổi học ──
  var sched = $('[data-sched]');
  var sessions = [];
  if (sched) {
    var list = JSON.parse(sched.getAttribute('data-list') || '[]');
    var weeks = +sched.getAttribute('data-weeks') || 4;
    for (var i = 0; i < weeks * 7; i++) {
      var d = addDays(todayISO, i), iso = d.toISOString().slice(0, 10), wd = d.getUTCDay();
      list.forEach(function (w) {
        if (w.days.indexOf(wd) < 0) return;
        var start = String(w.time).slice(0, 5);
        if (iso === todayISO && start <= nowHM) return;
        sessions.push({ course: w.course, name: w.name, type: w.type, iso: iso, date: d, time: w.time, price: w.price, full: (w.booked || []).indexOf(iso) >= 0 });
      });
    }
    sessions.sort(function (a, b) { return (a.iso + a.time).localeCompare(b.iso + b.time); });
    var label = function (s) { return fmtLong.format(s.date) + ' · ' + s.time; };
    sessions.forEach(function (s, k) { s.key = s.iso + ' ' + s.time + ' ' + s.course; s.label = label(s); s.k = k; });
    if (!sessions.length) sched.innerHTML = '<li class="sched-empty">' + sched.getAttribute('data-empty') + '</li>';
    else sched.innerHTML = sessions.map(function (s) {
      return '<li data-type="' + s.type + '" class="' + (s.full ? 'is-full' : '') + '">' +
        '<span class="sd"><b>' + s.date.getUTCDate() + '</b><span>' + fmtMon.format(s.date) + '</span><em>' + fmtDay.format(s.date) + '</em></span>' +
        '<span class="sn"><strong></strong><span class="st">' + s.time + '</span></span>' +
        '<span class="sp">' + s.price + '</span>' +
        (s.full ? '<span class="sfull">' + sched.getAttribute('data-full') + '</span>' : '<button type="button" class="btn btn--sm btn--primary" data-session-k="' + s.k + '">' + sched.getAttribute('data-book') + '</button>') + '</li>';
    }).join('');
    $$('li', sched).forEach(function (li, k) { var st = $('strong', li); if (st && sessions[k]) st.textContent = sessions[k].name; });
    var moreBtn = null, shown = 10;
    var applySched = function () {
      var n = 0;
      $$('li[data-type]', sched).forEach(function (li) {
        var ok = !filter || li.getAttribute('data-type') === filter;
        if (ok) n++;
        li.hidden = !ok || n > shown;
      });
      if (moreBtn) moreBtn.hidden = n <= shown;
    };
    if (sessions.length > 10) {
      moreBtn = document.createElement('button');
      moreBtn.type = 'button'; moreBtn.className = 'btn btn--line sched-more'; moreBtn.textContent = sched.getAttribute('data-more');
      sched.parentNode.insertBefore(moreBtn, sched.nextSibling);
      moreBtn.addEventListener('click', function () { shown += 10; applySched(); });
    }
    var next = sessions.filter(function (s) { return !s.full; })[0];
    var card = $('[data-next]');
    if (next && card) { $('[data-next-name]', card).textContent = next.name; $('[data-next-when]', card).textContent = next.label; card.hidden = false; }
  }

  // ── Lọc loại lớp (thẻ lớp + lịch) ──
  var filter = '';
  var applyFilter = function () {
    $$('.chip[data-type]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-type') === filter)); });
    $$('.ccard[data-type]').forEach(function (c) { c.hidden = !!filter && c.getAttribute('data-type') !== filter; });
    if (sched && sessions.length) applySched();
  };
  $$('.chip[data-type]').forEach(function (b) { b.addEventListener('click', function () { filter = b.getAttribute('data-type'); applyFilter(); }); });
  if (sched && sessions.length) applySched();

  // ── Form đặt chỗ ──
  var form = $('form[data-book]');
  if (form) {
    var cls = form.querySelector('[name="product"]');
    var ses = form.querySelector('[name="session"]');
    var ppl = form.querySelector('[name="people"]');
    var tot = $('[data-total]', form), totV = $('[data-total-v]', form), totD = $('[data-total-d]', form);
    var deal = form.getAttribute('data-deal') ? JSON.parse(form.getAttribute('data-deal')) : null;
    var anyOpt = ses.options[0].cloneNode(true);
    var cur = function () { return cls.selectedOptions[0]; };
    var fillSessions = function (keep) {
      var id = cur().getAttribute('data-id');
      ses.innerHTML = '';
      ses.appendChild(anyOpt.cloneNode(true));
      sessions.filter(function (s) { return s.course === id && !s.full; }).forEach(function (s) {
        var op = document.createElement('option'); op.value = s.label; op.textContent = s.label; op.setAttribute('data-key', s.key); ses.appendChild(op);
      });
      if (keep) Array.prototype.forEach.call(ses.options, function (op) { if (op.getAttribute('data-key') === keep) ses.value = op.value; });
      var max = +cur().getAttribute('data-max') || 10;
      Array.prototype.forEach.call(ppl.options, function (op) { var off = +op.value > max; op.hidden = off; op.disabled = off; });
      if (+ppl.value > max) ppl.value = String(max);
    };
    var total = function () {
      var price = +cur().getAttribute('data-price') || 0, n = +ppl.value || 1, sum = price * n, d = '';
      if (deal && n >= deal.from) { sum = Math.round(sum * (100 - deal.off)) / 100; if (['VND', 'JPY', 'KRW', 'IDR'].indexOf(currency) >= 0) sum = Math.round(sum / 1000) * 1000 || Math.round(sum); d = tot.getAttribute('data-off').replace('{p}', deal.off); }
      totV.textContent = money(sum);
      totD.textContent = tot.getAttribute('data-line').replace('{n}', n).replace('{p}', money(price)) + (d ? ' · ' + d : '');
      return { sum: money(sum), detail: totD.textContent };
    };
    cls.addEventListener('change', function () { fillSessions(); total(); });
    ppl.addEventListener('change', total);
    fillSessions(); total();
    var pickClass = function (id, key) {
      Array.prototype.forEach.call(cls.options, function (op) { if (op.getAttribute('data-id') === id) cls.value = op.value; });
      fillSessions(key); total();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-session-k]');
      if (b) { var s = sessions[+b.getAttribute('data-session-k')]; pickClass(s.course, s.key); return; }
      var p = e.target.closest('[data-pick]');
      if (p) { e.preventDefault(); pickClass(p.getAttribute('data-pick')); return; }
      var pv = e.target.closest('[data-private]');
      if (pv) { var note = form.querySelector('[name="note"]'); var line = pv.getAttribute('data-private'); if (note.value.indexOf(line) < 0) note.value = line + (note.value ? '\n' + note.value : ''); }
    });
  }

  // ── Album: lọc nhóm + "Xem thêm" + xem ảnh lớn ──
  var album = $('[data-album]');
  if (album) {
    var tiles = $$('.ph', album);
    var more = $('[data-album-more]');
    var leftEl = more && $('[data-left]', more);
    var tag = '', shownA = 12;
    var applyAlbum = function () {
      var n = 0;
      tiles.forEach(function (t) {
        var ok = !tag || t.getAttribute('data-t') === tag;
        t.classList.toggle('off', !ok);
        if (ok) { n++; t.classList.toggle('show', n <= shownA); }
      });
      if (more) { more.parentNode.hidden = n <= shownA; if (leftEl) leftEl.textContent = '(' + (n - shownA) + ')'; }
    };
    $$('.chip[data-tag]').forEach(function (b) {
      b.addEventListener('click', function () {
        tag = b.getAttribute('data-tag'); shownA = 12;
        $$('.chip[data-tag]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        applyAlbum();
      });
    });
    if (more) more.addEventListener('click', function () { shownA += 24; applyAlbum(); });
    tiles.forEach(function (t) { t.classList.add('more'); });
    applyAlbum();

    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = $('[data-lb-img]', lb), count = $('[data-lb-count]', lb);
      var visible = function () { return tiles.filter(function (t) { return !t.classList.contains('off'); }); };
      var curI = 0;
      var open = function (i) { var l = visible(); curI = (i + l.length) % l.length; img.src = l[curI].getAttribute('href'); count.textContent = (curI + 1) + ' / ' + l.length; };
      album.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); open(visible().indexOf(a)); lb.showModal(); });
      $('[data-lb-prev]', lb).addEventListener('click', function () { open(curI - 1); });
      $('[data-lb-next]', lb).addEventListener('click', function () { open(curI + 1); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(curI + 1); if (e.key === 'ArrowLeft') open(curI - 1); });
      var x0 = null;
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(curI + (dx < 0 ? 1 : -1)); x0 = null; });
    }
  }

  // ── Gửi form ──
  if (!form) return;
  var fields = $('.book-fields', form);
  var box = $('[data-done]', form);
  var err = $('[data-err]', form);
  var btn = $('[data-submit]', form);
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var lab = function (name) {
    var el = form.querySelector('[name="' + name + '"]');
    var s = el && el.closest('.field') && $('span', el.closest('.field'));
    if (name === 'total') s = $('[data-total] > span', form);
    return s ? s.textContent.replace(/\s*\*$/, '').trim() : name;
  };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var tt = total();
    return {
      name: get('name'), phone: get('phone'), product: get('product'), size: get('people'), date: get('session'),
      total: tt.sum + ' (' + tt.detail + ')', note: get('note'),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (x) {
    var rows = [['product', x.product], ['session', x.date], ['people', x.size], ['total', x.total], ['name', x.name], ['phone', x.phone], ['note', x.note]];
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return lab(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8]].forEach(function (y) {
      var el = form.querySelector('[name="' + y[0] + '"]');
      el.setAttribute('aria-invalid', y[1] ? 'true' : 'false');
      if (y[1]) ok = false;
    });
    err.hidden = ok;
    if (!ok) $('[aria-invalid="true"]', form).focus();
    return ok;
  };
  var done = function (msg) {
    fields.hidden = true; box.hidden = false; box.focus();
    $$('button[data-channel]', box).forEach(function (x) { x.setAttribute('data-msg', msg); });
  };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var x = read();
    if (x.website || Date.now() - t0 < 2500) return;
    if (!valid(x)) return;
    var msg = text(x);
    if (!gform) { done(msg); return; }
    var data = new URLSearchParams();
    var payload = { name: x.name, phone: x.phone, product: x.product, size: x.size, date: x.date, note: [x.note, lab('total') + ': ' + x.total].filter(Boolean).join('\n'), page: x.page, market: x.market };
    Object.keys(gmap).forEach(function (k) { data.append(gmap[k], payload[k] || ''); });
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
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg'), $('[data-msg]', box));
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { box.hidden = true; fields.hidden = false; });
})();
