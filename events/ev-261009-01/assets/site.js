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

// Mẫu Thiệp cưới: đếm ngược tới lễ chính, album "Xem thêm" + xem ảnh lớn, xác nhận tham dự → Google Form
// của cô dâu chú rể (nếu có) hoặc tin nhắn soạn sẵn, nút chép số tài khoản mừng cưới.
// Không có JavaScript thì trang vẫn hiện đủ: ngày giờ, địa điểm, toàn bộ album, số tài khoản.
(function () {
  var body = document.body;

  // Gửi tin nhắn soạn sẵn: WhatsApp/email nhận nội dung; Zalo, gọi điện thì sao chép để khách dán.
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

  // ── Đếm ngược ──
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.getAttribute('data-countdown')).getTime();
    var cells = {};
    ['days', 'hours', 'minutes', 'seconds'].forEach(function (k) { cells[k] = cd.querySelector('[data-cd="' + k + '"]'); });
    var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
    var tick = function () {
      var s = Math.floor((target - Date.now()) / 1000);
      if (s <= 0) {
        // Đã tới ngày cưới (trong 1 ngày đầu) hoặc đã qua.
        cd.classList.add('cd-done');
        cd.textContent = cd.getAttribute(s > -86400 ? 'data-today' : 'data-after');
        clearInterval(timer);
        return;
      }
      cells.days.textContent = Math.floor(s / 86400);
      cells.hours.textContent = pad(Math.floor(s % 86400 / 3600));
      cells.minutes.textContent = pad(Math.floor(s % 3600 / 60));
      cells.seconds.textContent = pad(s % 60);
    };
    var timer = setInterval(tick, 1000);
    tick();
  }

  // ── Album: mỗi lần bấm "Xem thêm" mở 24 ảnh ──
  var album = document.querySelector('[data-album]');
  var moreBtn = document.querySelector('[data-album-more]');
  if (album && moreBtn) {
    var left = moreBtn.querySelector('[data-left]');
    moreBtn.addEventListener('click', function () {
      var rest = album.querySelectorAll('.more:not(.show)');
      for (var i = 0; i < rest.length && i < 24; i++) rest[i].classList.add('show');
      var n = rest.length - 24;
      if (n <= 0) moreBtn.hidden = true;
      else if (left) left.textContent = '(' + n + ')';
    });
  }

  // ── Xem ảnh lớn (thẻ <dialog>; trình duyệt cũ thì mở ảnh như liên kết thường) ──
  var lb = document.querySelector('[data-lightbox]');
  if (album && lb && lb.showModal) {
    var links = album.querySelectorAll('[data-lb]');
    var img = lb.querySelector('[data-lb-img]'), count = lb.querySelector('[data-lb-count]');
    var at = 0, total = links.length;
    var open = function (i) {
      at = (i + total) % total;
      img.src = links[at].getAttribute('href');
      img.alt = links[at].querySelector('img').alt;
      count.textContent = (at + 1) + ' / ' + total;
    };
    album.addEventListener('click', function (e) {
      var a = e.target.closest('[data-lb]');
      if (!a) return;
      e.preventDefault();
      open(+a.getAttribute('data-i'));
      lb.showModal();
    });
    lb.querySelector('[data-lb-prev]').addEventListener('click', function () { open(at - 1); });
    lb.querySelector('[data-lb-next]').addEventListener('click', function () { open(at + 1); });
    lb.querySelector('[data-lb-close]').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(at + 1); if (e.key === 'ArrowLeft') open(at - 1); });
    var x0 = null; // vuốt trái/phải để đổi ảnh
    img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(at + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  // ── Xác nhận tham dự ──
  var form = document.querySelector('form[data-rsvp]');
  if (form) {
    var fields = form.querySelector('.rsvp-fields');
    var box = form.querySelector('[data-done]');
    var err = form.querySelector('[data-err]');
    var btn = form.querySelector('[data-submit]');
    var gform = form.getAttribute('data-gform');
    var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
    var t0 = Date.now();
    var label = function (name) {
      var el = form.querySelector('[name="' + name + '"]');
      var wrap = el && el.closest('.field');
      var s = wrap && wrap.querySelector('span, legend');
      return s ? s.textContent.replace(/\s*\*$/, '') : name;
    };
    var read = function () {
      var d = new FormData(form);
      var get = function (k) { return (d.get(k) || '').toString().trim(); };
      var att = form.querySelector('input[name="attend"]:checked');
      return {
        name: get('name'), phone: get('phone'), qty: get('qty') || '1', size: get('size'), date: get('date'), note: get('note'),
        product: att ? att.parentNode.querySelector('[data-label]').textContent : '', yes: !att || att.value === 'yes',
        page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
      };
    };
    // Tin nhắn: câu chào + từng dòng "Nhãn: giá trị" theo ngôn ngữ của trang.
    var text = function (o) {
      var rows = [['name', o.name], ['phone', o.phone], ['attend', o.product]];
      if (o.yes) rows.push(['qty', o.qty], ['size', o.size], ['date', o.date]);
      rows.push(['note', o.note]);
      return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return label(r[0]) + ': ' + r[1]; })).join('\n');
    };
    var valid = function (o) {
      var ok = true;
      ['name', 'phone'].forEach(function (k) {
        var el = form.querySelector('[name="' + k + '"]');
        var bad = k === 'phone' ? o.phone.replace(/\D/g, '').length < 8 : !o.name;
        el.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad) ok = false;
      });
      err.hidden = ok;
      if (!ok) form.querySelector('[aria-invalid="true"]').focus();
      return ok;
    };
    // Không đến: ẩn số người / khách nhà nào / lễ tham dự.
    form.addEventListener('change', function (e) {
      if (e.target.name !== 'attend') return;
      var no = e.target.value === 'no';
      ['qty', 'size', 'date'].forEach(function (k) {
        var el = form.querySelector('[name="' + k + '"]');
        if (el) el.closest('.field').hidden = no;
      });
    });
    var done = function (msg) {
      var gl = box.querySelector('[data-gift-link]');
      if (gl) gl.hidden = read().yes;
      fields.hidden = true;
      box.hidden = false;
      box.focus();
      box.querySelectorAll('button[data-channel]').forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var o = read();
      if (o.website || Date.now() - t0 < 2500) return; // ô bẫy bot / gửi quá nhanh
      if (!valid(o)) return;
      var msg = text(o);
      if (!gform) { done(msg); return; } // chưa gắn Google Form: bước cuối gửi qua Zalo/gọi/WhatsApp
      // Gửi thẳng vào Google Form (Google không trả lời lại cho trang khác → no-cors).
      var data = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], o.yes || ['qty', 'size', 'date'].indexOf(k) < 0 ? (o[k] || '') : ''); });
      btn.disabled = true;
      var old = btn.innerHTML;
      btn.textContent = btn.getAttribute('data-sending');
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(function () { done(msg); }, function () {
        btn.disabled = false;
        btn.innerHTML = old;
        // Mạng lỗi: mở tin nhắn soạn sẵn để không mất xác nhận.
        var ch = (body.getAttribute('data-wa') && 'whatsapp') || 'email';
        send(ch, '', msg, null);
      });
    });
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-channel]');
      if (!b) return;
      send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg'), box.querySelector('[data-msg]'));
    });
    var edit = form.querySelector('[data-edit]');
    if (edit) edit.addEventListener('click', function () { box.hidden = true; fields.hidden = false; });
  }

  // ── Mừng cưới: chép số tài khoản ──
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () {
        var old = b.textContent;
        b.textContent = b.getAttribute('data-copied');
        setTimeout(function () { b.textContent = old; }, 1600);
      });
    });
  });
})();
