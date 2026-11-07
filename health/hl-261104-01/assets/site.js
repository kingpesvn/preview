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

// Mẫu Vật lý trị liệu: "Bạn đau ở đâu?" tô phác đồ hợp + lời khuyên; lọc phác đồ; album "Xem thêm" + xem ảnh lớn;
// đặt lịch: thời lượng theo phác đồ, giờ trống theo giờ mở cửa và thời lượng (hôm nay bỏ giờ sát hiện tại), thang đau 0–10,
// tại phòng khám / tại nhà (cộng phụ phí), tạm tính; gửi Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / WhatsApp / gọi.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var shopNow = function () {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23' })
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

  // ── Bạn đang mỏi ở đâu? + lọc nhóm liệu trình ──
  var svc = $('[data-svc]');
  var cards = svc ? $$('.svc-card', svc) : [];
  var state = { concern: '', cat: '' };
  var paint = function () {
    cards.forEach(function (c) {
      var okCat = !state.cat || c.getAttribute('data-cat') === state.cat;
      var match = state.concern && (' ' + c.getAttribute('data-concerns') + ' ').indexOf(' ' + state.concern + ' ') >= 0;
      c.hidden = !okCat;
      c.classList.toggle('is-match', !!match);
      c.classList.toggle('is-dim', !!state.concern && !match);
    });
    if (state.concern && svc) cards.sort(function (a, b) { return (b.classList.contains('is-match') ? 1 : 0) - (a.classList.contains('is-match') ? 1 : 0); }).forEach(function (c) { svc.appendChild(c); });
    $$('[data-cat].pill').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-cat') === state.cat); });
    $$('[data-concern]').forEach(function (a) { a.setAttribute('aria-pressed', a.getAttribute('data-concern') === state.concern ? 'true' : 'false'); });
    $$('[data-tip]').forEach(function (p) { p.hidden = p.getAttribute('data-tip') !== state.concern; });
  };
  $$('[data-concern]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var v = a.getAttribute('data-concern');
      state.concern = state.concern === v ? '' : v;
      state.cat = '';
      paint();
    });
  });
  $$('button[data-cat]').forEach(function (b) { b.addEventListener('click', function () { state.cat = b.getAttribute('data-cat'); paint(); }); });

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
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(at + 1); if (e.key === 'ArrowLeft') open(at - 1); });
    }
  }

  // ── Đặt lịch ──
  var form = $('[data-book-form]');
  if (!form) return;
  var services = JSON.parse(form.getAttribute('data-svc'));
  var hours = JSON.parse(form.getAttribute('data-hours') || '[]');
  var step = +form.getAttribute('data-step') || 30, lead = +form.getAttribute('data-lead') || 60;
  var cur = form.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(form.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var sel = form.querySelector('[name="service"]'), durs = $('[data-durs]', form), dateEl = $('[data-date]', form), timeEl = $('[data-time]', form), note = $('[data-time-note]', form), total = $('[data-total]', form);
  var find = function () { var id = sel.value; return services.filter(function (s) { return s.id === id; })[0] || services[0]; };
  var dur = function () { var s = find(), r = form.querySelector('[name="duration"]:checked'); return s.d.filter(function (d) { return r && String(d.m) === r.value; })[0] || s.d[0]; };
  var renderDurs = function () {
    var s = find();
    durs.innerHTML = s.d.map(function (d, i) {
      return '<label class="opt"><input type="radio" name="duration" value="' + d.m + '"' + (i ? '' : ' checked') + '><span>' + d.label + ' · ' + d.money + '</span></label>';
    }).join('');
    var two = form.querySelector('[name="guests"][value="2"]'), one = form.querySelector('[name="guests"][value="1"]');
    if (s.couple && two) two.checked = true; else if (one && !s.couple) one.checked = true;
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
    var len = dur().m, keep = timeEl.value, list = [];
    spans.forEach(function (h) { for (var m = h.o; m + len <= h.c; m += step) if (!(dateEl.value === today && m < shopNow().min + lead)) list.push(hhmm(m)); });
    list = list.filter(function (x, i) { return list.indexOf(x) === i; }).sort();
    timeEl.innerHTML = list.map(function (x) { return '<option' + (x === keep ? ' selected' : '') + '>' + x + '</option>'; }).join('');
    note.hidden = list.length > 0;
    note.textContent = !spans.length ? note.getAttribute('data-closed') : note.getAttribute('data-none');
  };
  var calc = function () {
    var pl = form.querySelector('[name="place"]:checked');
    var fee = pl ? +pl.getAttribute('data-fee') || 0 : 0;
    var p = dur().p + fee;
    total.textContent = fmt.format(p) + (fee ? ' (' + fmt.format(dur().p) + ' + ' + fmt.format(fee) + ')' : '');
    return p;
  };
  var pain = $('[data-pain]', form), painOut = $('[data-pain-out]', form);
  var paintPain = function () { if (pain) painOut.textContent = pain.value; };
  if (pain) { pain.addEventListener('input', paintPain); paintPain(); }
  sel.addEventListener('change', function () { renderDurs(); renderTimes(); calc(); });
  form.addEventListener('change', function (e) { if (e.target.name === 'duration') renderTimes(); if (e.target.name === 'date') { if (dateEl.value < today) dateEl.value = today; renderTimes(); } calc(); });
  renderDurs(); renderTimes(); calc();
  // Hôm nay đã hết giờ (tối muộn hoặc nghỉ) thì chọn sẵn ngày gần nhất còn giờ trống.
  for (var k = 1; k <= 7 && !timeEl.options.length; k++) { dateEl.value = iso(now.y, now.m, now.d + k); renderTimes(); }
  $$('[data-book]').forEach(function (a) {
    a.addEventListener('click', function () { sel.value = a.getAttribute('data-book'); renderDurs(); renderTimes(); calc(); });
  });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var list = function (k) { return d.getAll(k).join(', '); };
    var s = find(), u = dur();
    return {
      name: get('name'), phone: get('phone'), product: s.name, version: u.label, qty: get('place') || '1', date: get('date') + ' ' + get('time'),
      size: [get('therapist'), pain ? pain.getAttribute('aria-label') + ' ' + get('pain') + '/10' : ''].filter(Boolean).join(' · '), color: list('focus') || '—', health: list('health') || '—', note: get('note'),
      price: fmt.format(calc()), page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'date', 'time'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      var v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) ok = false;
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
    if (!valid()) return;
    var msg = text(o);
    var box = $('[data-done]', form);
    var done = function () {
      $('.order-fields', form).hidden = true;
      box.hidden = false;
      box.focus();
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
    var b = channel;
    channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.product);
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; });
})();
