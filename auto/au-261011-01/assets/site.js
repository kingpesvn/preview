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

// Mẫu Garage sửa xe: chip loại xe cho bảng giá (điện thoại chỉ hiện cột đang chọn; chọn cũng điền sẵn loại xe vào form);
// nhập số km → mốc bảo dưỡng kế tiếp + việc cần làm, nút đặt lịch điền sẵn ghi chú; nút "Đặt lịch" ở thẻ dịch vụ chọn sẵn dịch vụ;
// album lọc nhóm, "Xem thêm", xem ảnh lớn; form đặt lịch → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp.
// Không có JavaScript thì trang vẫn hiện đủ bảng giá (mọi loại xe), chu kỳ bảo dưỡng, ảnh và nút liên hệ.
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

  var form = document.querySelector('form[data-book]');
  var carSel = form && form.querySelector('[name="size"]');
  var noteEl = form && form.querySelector('[name="note"]');
  var productSel = form && form.querySelector('[name="product"]');
  var goForm = function () { if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  // ── Bảng giá: chọn loại xe ──
  var prices = document.querySelector('[data-prices]');
  var carChips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-car]'));
  var pickCar = function (id) {
    carChips.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-car') === id)); });
    if (prices) prices.querySelectorAll('.c[data-car]').forEach(function (c) { c.classList.toggle('sel', c.getAttribute('data-car') === id); });
    if (carSel) { var o = carSel.querySelector('option[data-car="' + id + '"]'); if (o) carSel.value = o.value; }
  };
  carChips.forEach(function (b) { b.addEventListener('click', function () { pickCar(b.getAttribute('data-car')); }); });
  if (carChips.length && prices) prices.classList.add('js-cars');
  if (carChips.length) pickCar(carChips[0].getAttribute('data-car'));

  // ── Lịch bảo dưỡng theo km ──
  var km = document.querySelector('form[data-km]');
  if (km) {
    var rules = JSON.parse(km.getAttribute('data-rules'));
    var unit = km.getAttribute('data-unit');
    var nf = new Intl.NumberFormat(body.getAttribute('data-locale') || undefined);
    var out = km.querySelector('[data-km-out]'), nextEl = km.querySelector('[data-km-next]'), items = km.querySelector('[data-km-items]');
    var input = km.querySelector('input[name="km"]');
    var marks = Array.prototype.slice.call(document.querySelectorAll('.mt-list li[data-every]'));
    var due = '';
    input.addEventListener('input', function () {
      var v = input.value.replace(/\D/g, '').slice(0, 7);
      input.value = v ? nf.format(+v) : '';
    });
    km.addEventListener('submit', function (e) {
      e.preventDefault();
      var raw = input.value.replace(/\D/g, '');
      if (!raw) { input.focus(); return; }
      var cur = +raw;
      // Mốc kế tiếp = bội số gần nhất phía trên số km hiện tại của từng chu kỳ; lấy mốc nhỏ nhất và mọi việc trùng mốc đó.
      var next = Infinity;
      rules.forEach(function (r) { next = Math.min(next, (Math.floor(cur / r.km) + 1) * r.km); });
      var hit = rules.filter(function (r) { return next % r.km === 0; });
      nextEl.innerHTML = '';
      var b = document.createElement('b'); b.textContent = km.getAttribute('data-next').replace('{n}', nf.format(next)).replace('{unit}', unit);
      var s = document.createElement('span'); s.textContent = km.getAttribute('data-left').replace('{n}', nf.format(next - cur)).replace('{unit}', unit);
      nextEl.appendChild(b); nextEl.appendChild(s);
      items.innerHTML = '';
      hit.forEach(function (r) { var li = document.createElement('li'); li.textContent = r.items; items.appendChild(li); });
      marks.forEach(function (li) { li.classList.toggle('hit', hit.some(function (r) { return String(r.km) === li.getAttribute('data-every'); })); });
      due = km.getAttribute('data-book-note').replace('{n}', nf.format(next)).replace('{unit}', unit);
      out.hidden = false;
    });
    km.querySelector('[data-km-book]').addEventListener('click', function () {
      if (productSel) {
        var o = productSel.querySelector('option[data-id="maintenance"]') || productSel.querySelector('option[data-id]');
        if (o) productSel.value = o.value;
      }
      if (noteEl && due && noteEl.value.indexOf(due) < 0) noteEl.value = due + (noteEl.value ? '. ' + noteEl.value : '');
      goForm();
    });
  }

  // ── Album: lọc nhóm + "Xem thêm" (mỗi lần 24) + xem ảnh lớn ──
  var album = document.querySelector('[data-album]');
  if (album) {
    var tiles = Array.prototype.slice.call(album.querySelectorAll('.ph'));
    var more = document.querySelector('[data-album-more]');
    var left = more && more.querySelector('[data-left]');
    var tag = '', shown = 12;
    var apply = function () {
      var n = 0;
      tiles.forEach(function (t) {
        var ok = !tag || t.getAttribute('data-t') === tag;
        t.classList.toggle('off', !ok);
        if (ok) { n++; t.classList.toggle('show', n <= shown); }
      });
      if (more) { more.parentNode.hidden = n <= shown; if (left) left.textContent = '(' + (n - shown) + ')'; }
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
      var list = function () { return tiles.filter(function (t) { return !t.classList.contains('off'); }); };
      var at = 0;
      var open = function (i) { var l = list(); at = (i + l.length) % l.length; img.src = l[at].getAttribute('href'); count.textContent = (at + 1) + ' / ' + l.length; };
      album.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); open(list().indexOf(a)); lb.showModal(); });
      lb.querySelector('[data-lb-prev]').addEventListener('click', function () { open(at - 1); });
      lb.querySelector('[data-lb-next]').addEventListener('click', function () { open(at + 1); });
      lb.querySelector('[data-lb-close]').addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(at + 1); if (e.key === 'ArrowLeft') open(at - 1); });
      var x0 = null;
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(at + (dx < 0 ? 1 : -1)); x0 = null; });
    }
  }

  // ── Form đặt lịch ──
  if (!form) return;
  var fields = form.querySelector('.book-fields');
  var box = form.querySelector('[data-done]');
  var err = form.querySelector('[data-err]');
  var btn = form.querySelector('[data-submit]');
  var day = form.querySelector('[name="day"]');
  // Ngày hôm nay theo múi giờ garage (không dùng toISOString: lệch ngày theo UTC).
  var o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
  if (day) day.min = o.year + '-' + o.month + '-' + o.day;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pick]');
    if (!b) return;
    var op = productSel.querySelector('option[data-id="' + b.getAttribute('data-pick') + '"]');
    if (op) productSel.value = op.value;
    goForm();
  });
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) {
    var el = form.querySelector('[name="' + name + '"]');
    var s = el && el.closest('.field') && el.closest('.field').querySelector('span');
    return s ? s.textContent.replace(/\s*\*$/, '') : name;
  };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    return {
      name: get('name'), phone: get('phone'), product: get('product'), size: get('size'), version: get('version'),
      date: [get('day'), get('time')].filter(Boolean).join(' '), note: get('note'),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (x) {
    var rows = [['product', x.product], ['size', x.size], ['version', x.version], ['day', x.date], ['name', x.name], ['phone', x.phone], ['note', x.note]];
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return label(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8]].forEach(function (r) {
      var el = form.querySelector('[name="' + r[0] + '"]');
      el.setAttribute('aria-invalid', r[1] ? 'true' : 'false');
      if (r[1]) ok = false;
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
