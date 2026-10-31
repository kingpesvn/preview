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

// Mẫu Homestay: nút "Chọn phòng" điền vào form, tính số đêm + tạm tính (đêm thứ Sáu, thứ Bảy dùng giá cuối tuần),
// lọc album theo nhóm, "Xem thêm", xem ảnh lớn, form đặt phòng → Google Form hoặc tin nhắn soạn sẵn.
// Không có JavaScript thì trang vẫn hiện đủ phòng, giá, ảnh và nút liên hệ.
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

  // ── Form đặt phòng ──
  var form = document.querySelector('form[data-book]');
  if (!form) return;
  var fields = form.querySelector('.book-fields');
  var box = form.querySelector('[data-done]');
  var err = form.querySelector('[data-err]');
  var btn = form.querySelector('[data-submit]');
  var sel = form.querySelector('[name="product"]');
  var din = form.querySelector('[name="in"]'), dout = form.querySelector('[name="out"]');
  var out = form.querySelector('[data-total]');
  var fmt = new Intl.NumberFormat(out.getAttribute('data-lang'), { style: 'currency', currency: out.getAttribute('data-cur'), maximumFractionDigits: +out.getAttribute('data-dec') });
  var iso = function (d) { return d.toISOString().slice(0, 10); };
  var today = new Date(); today.setHours(12);
  din.min = iso(today);
  var parse = function (s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12); };
  // Tạm tính: mỗi đêm thứ Sáu (5) và thứ Bảy (6) dùng giá cuối tuần.
  var calc = function () {
    if (!din.value || !dout.value) return null;
    var a = parse(din.value), b = parse(dout.value);
    var nights = Math.round((b - a) / 864e5);
    if (nights < 1) return null;
    var o = sel.options[sel.selectedIndex], wd = +o.getAttribute('data-wd'), we = +o.getAttribute('data-we'), sum = 0;
    for (var i = 0; i < nights; i++) { var d = new Date(a.getTime() + i * 864e5).getDay(); sum += d === 5 || d === 6 ? we : wd; }
    return { nights: nights, text: fmt.format(sum) + ' · ' + out.getAttribute(nights === 1 ? 'data-night1' : 'data-nights').replace('{n}', nights) };
  };
  var update = function () {
    if (din.value) { var next = new Date(parse(din.value).getTime() + 864e5); dout.min = iso(next); if (!dout.value || dout.value <= din.value) dout.value = iso(next); }
    var c = calc(); out.textContent = c ? c.text : '–';
  };
  [sel, din, dout].forEach(function (el) { el.addEventListener('change', update); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pick]');
    if (!b) return;
    var o = sel.querySelector('option[data-id="' + b.getAttribute('data-pick') + '"]');
    if (o) { sel.value = o.value; update(); }
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    var c = calc();
    return {
      name: get('name'), phone: get('phone'), product: get('product'), qty: get('qty') || '1',
      date: (get('in') && get('out')) ? get('in') + ' → ' + get('out') : '', price: c ? c.text : '', note: get('note'),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) {
    var rows = [['product', o.product], ['in', o.date], ['qty', o.qty], ['total', o.price], ['name', o.name], ['phone', o.phone], ['note', o.note]];
    var lab = function (k) { return k === 'total' ? out.closest('.field').querySelector('span').textContent : label(k); };
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return lab(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (o) {
    var ok = true;
    [['name', !o.name], ['phone', o.phone.replace(/\D/g, '').length < 8], ['in', !o.date]].forEach(function (x) {
      var el = form.querySelector('[name="' + x[0] + '"]');
      el.setAttribute('aria-invalid', x[1] ? 'true' : 'false');
      if (x[1]) ok = false;
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
    var o = read();
    if (o.website || Date.now() - t0 < 2500) return;
    if (!valid(o)) return;
    var msg = text(o);
    if (!gform) { done(msg); return; }
    var data = new URLSearchParams();
    Object.keys(gmap).forEach(function (k) { data.append(gmap[k], o[k] || ''); });
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
