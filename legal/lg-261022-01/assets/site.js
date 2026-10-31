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

// Mẫu Văn phòng luật sư: "Chuẩn bị hồ sơ" — chọn lĩnh vực → danh sách giấy tờ có ô tick, đếm đã có bao nhiêu, nút "Đặt lịch với danh sách này"
// chọn lĩnh vực trong form và ghi giấy tờ đã có / còn thiếu vào ô tóm tắt; thẻ lĩnh vực có link "Hồ sơ cần chuẩn bị" và "Đặt lịch tư vấn";
// form chọn hình thức + thời lượng → hiện phí tư vấn ngay; album "Xem thêm" + xem ảnh lớn;
// form → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp.
// Không có JavaScript thì trang vẫn hiện đủ lĩnh vực, mọi danh sách giấy tờ, bảng phí và nút liên hệ.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

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

  var o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
  var todayISO = o.year + '-' + o.month + '-' + o.day;

  var form = $('form[data-book]');
  var areaSel = form && form.querySelector('[name="product"]');
  var pickArea = function (id) {
    if (!areaSel) return;
    Array.prototype.forEach.call(areaSel.options, function (op) { if (op.getAttribute('data-area') === id) areaSel.value = op.value; });
  };

  // ── Chuẩn bị hồ sơ ──
  var pick = $('[data-docs-pick]');
  var count = $('[data-docs-count]');
  var bar = $('[data-docs-bar]');
  var cur = function () { return pick ? $('[data-docs="' + pick.value + '"]') : null; };
  var meter = function () {
    var l = cur();
    if (!l || !count) return;
    var all = $$('input[type="checkbox"]', l), have = all.filter(function (x) { return x.checked; }).length;
    count.textContent = count.getAttribute('data-tpl').replace('{n}', have).replace('{total}', all.length);
    if (bar) bar.style.width = (all.length ? Math.round(have / all.length * 100) : 0) + '%';
  };
  var showDocs = function (id) {
    if (!pick) return;
    if (id) pick.value = id;
    $$('[data-docs]').forEach(function (l) { l.hidden = l.getAttribute('data-docs') !== pick.value; });
    meter();
  };
  if (pick) {
    pick.addEventListener('change', function () { showDocs(); });
    $('#docs').addEventListener('change', function (e) { if (e.target.type === 'checkbox') meter(); });
    showDocs();
  }

  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-docs-for]');
    if (d) { showDocs(d.getAttribute('data-docs-for')); return; }
    var a = e.target.closest('[data-area-book]');
    if (a) { pickArea(a.getAttribute('data-area-book')); return; }
    var b = e.target.closest('[data-docs-book]');
    if (b && form) {
      var l = cur();
      if (!l) return;
      pickArea(l.getAttribute('data-docs'));
      var all = $$('input[type="checkbox"]', l);
      var have = all.filter(function (x) { return x.checked; }).map(function (x) { return x.value; });
      var miss = all.filter(function (x) { return !x.checked; }).map(function (x) { return x.value; });
      var lines = [];
      if (have.length) lines.push(b.getAttribute('data-have') + ': ' + have.join('; '));
      if (miss.length) lines.push(b.getAttribute('data-missing') + ': ' + miss.join('; '));
      var note = form.querySelector('[name="note"]');
      if (note && lines.length) {
        var keep = note.value.split('\n').filter(function (x) { return x.indexOf(b.getAttribute('data-have') + ':') !== 0 && x.indexOf(b.getAttribute('data-missing') + ':') !== 0; }).join('\n').trim();
        note.value = lines.join('\n') + (keep ? '\n' + keep : '');
      }
    }
  });

  // ── Album: "Xem thêm" + xem ảnh lớn ──
  var album = $('[data-album]');
  if (album) {
    var tiles = $$('.ph', album);
    var more = $('[data-album-more]');
    var leftEl = more && $('[data-left]', more);
    var shown = 8;
    var applyAlbum = function () {
      tiles.forEach(function (t, i) { t.classList.add('more'); t.classList.toggle('show', i < shown); });
      if (more) { more.parentNode.hidden = tiles.length <= shown; if (leftEl) leftEl.textContent = '(' + (tiles.length - shown) + ')'; }
    };
    if (more) more.addEventListener('click', function () { shown += 12; applyAlbum(); });
    applyAlbum();
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = $('[data-lb-img]', lb), cnt = $('[data-lb-count]', lb);
      var at = 0;
      var open = function (i) { at = (i + tiles.length) % tiles.length; img.src = tiles[at].getAttribute('href'); cnt.textContent = (at + 1) + ' / ' + tiles.length; };
      album.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); open(tiles.indexOf(a)); lb.showModal(); });
      $('[data-lb-prev]', lb).addEventListener('click', function () { open(at - 1); });
      $('[data-lb-next]', lb).addEventListener('click', function () { open(at + 1); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(at + 1); if (e.key === 'ArrowLeft') open(at - 1); });
      var x0 = null;
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(at + (dx < 0 ? 1 : -1)); x0 = null; });
    }
  }

  // ── Form đặt lịch tư vấn ──
  if (!form) return;
  var fee = $('[data-fee]', form);
  var syncFee = function () { var r = form.querySelector('[name="pack"]:checked'); if (fee && r) fee.textContent = r.getAttribute('data-price'); };
  form.addEventListener('change', function (e) { if (e.target.name === 'pack') syncFee(); });
  syncFee();
  var fields = $('.book-fields', form);
  var box = $('[data-done]', form);
  var err = $('[data-err]', form);
  var btn = $('[data-submit]', form);
  var day = form.querySelector('[name="day"]');
  if (day) { day.min = todayISO; if (!day.value) day.value = todayISO; }
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) {
    var el = form.querySelector('[name="' + name + '"]');
    var s = el && (el.closest('.field') ? $('span', el.closest('.field')) : el.closest('fieldset') && $('legend', el.closest('fieldset')));
    return s ? s.textContent.replace(/\s*\*$/, '').trim() : name;
  };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var r = form.querySelector('[name="pack"]:checked');
    return {
      name: get('name'), phone: get('phone'), email: get('email'), product: get('product'),
      size: [get('mode'), get('pack')].filter(Boolean).join(' · '), price: r ? r.getAttribute('data-price') : '',
      date: [get('day'), get('time')].filter(Boolean).join(' '), note: get('note'),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (x) {
    var rows = [['product', x.product], ['mode', x.size], ['day', x.date], ['name', x.name], ['phone', x.phone], ['email', x.email], ['note', x.note]];
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
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg'), $('[data-msg]', box));
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { box.hidden = true; fields.hidden = false; });
})();
