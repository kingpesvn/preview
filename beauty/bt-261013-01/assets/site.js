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

// Mẫu Salon tóc & barber: bảng giá có ô chọn → thanh tổng (số dịch vụ, tổng phút, tạm tính) → chép vào form đặt lịch;
// biến thể cùng dịch vụ (tóc ngắn / dài) chỉ chọn một; nút "Đặt với …" chọn sẵn thợ; album lọc nhóm, "Xem thêm",
// xem ảnh lớn + "Muốn kiểu này" (ghi mã kiểu vào ghi chú); form → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp.
// Không có JavaScript thì trang vẫn là bảng giá + nút liên hệ đầy đủ.
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

  // Ngày hôm nay theo múi giờ tiệm (không dùng toISOString: lệch ngày theo UTC).
  var o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
  var todayISO = o.year + '-' + o.month + '-' + o.day;

  var mf = JSON.parse(body.getAttribute('data-money') || '{}');
  var money = function (n) {
    try { return new Intl.NumberFormat(mf.locale, { style: 'currency', currency: mf.currency, maximumFractionDigits: mf.max }).format(n); } catch (e) { return String(n); }
  };

  var form = $('form[data-book]');
  var goForm = function () { if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  // ── Bảng giá có ô chọn ──
  var picks = $$('.pick');
  var cart = $('[data-cart]');
  var tpl = $('[data-cart-tpl]');
  var picked = function () { return picks.filter(function (x) { return x.checked; }); };
  var summary = function () {
    var list = picked();
    var total = 0, min = 0;
    list.forEach(function (x) { total += +x.getAttribute('data-price'); min += +x.getAttribute('data-min'); });
    return { list: list, names: list.map(function (x) { return x.value; }), total: total, min: min };
  };
  var syncForm = function () {
    if (!form) return;
    var s = summary();
    var box = $('[data-picked]', form), sel = form.querySelector('[name="product"]');
    form.querySelector('[name="price"]').value = s.list.length ? money(s.total) : '';
    if (s.list.length) {
      $('[data-picked-list]', box).textContent = s.names.join(' + ') + ' · ' + money(s.total);
      box.hidden = false; sel.closest('.field').hidden = true;
    } else { box.hidden = true; sel.closest('.field').hidden = false; }
  };
  var update = function () {
    var s = summary();
    if (cart) {
      cart.hidden = !s.list.length;
      $('[data-cart-n]', cart).textContent = tpl.getAttribute('data-n').replace('{n}', s.list.length);
      $('[data-cart-min]', cart).textContent = s.min ? tpl.getAttribute('data-min').replace('{n}', s.min) : '';
      $('[data-cart-total]', cart).textContent = money(s.total);
    }
    syncForm();
  };
  picks.forEach(function (x) {
    x.addEventListener('change', function () {
      // Cùng một dịch vụ (tóc ngắn / tóc dài…) chỉ chọn một mức.
      if (x.checked) picks.forEach(function (y) { if (y !== x && y.getAttribute('data-group') === x.getAttribute('data-group')) y.checked = false; });
      x.closest('.svc').classList.toggle('on', x.checked);
      picks.forEach(function (y) { y.closest('.svc').classList.toggle('on', y.checked); });
      update();
    });
  });
  var clear = function () { picks.forEach(function (x) { x.checked = false; x.closest('.svc').classList.remove('on'); }); update(); };
  var cc = $('[data-cart-clear]'); if (cc) cc.addEventListener('click', clear);
  var go = $('[data-cart-go]'); if (go) go.addEventListener('click', function (e) { e.preventDefault(); syncForm(); goForm(); });

  // ── Album: lọc nhóm + "Xem thêm" + xem ảnh lớn + "Muốn kiểu này" ──
  var album = $('[data-album]');
  if (album) {
    var tiles = $$('.ph', album);
    var more = $('[data-album-more]');
    var leftEl = more && $('[data-left]', more);
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
    $$('.chip[data-tag]').forEach(function (b) {
      b.addEventListener('click', function () {
        tag = b.getAttribute('data-tag'); shown = 12;
        $$('.chip[data-tag]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        apply();
      });
    });
    if (more) more.addEventListener('click', function () { shown += 24; apply(); });
    tiles.forEach(function (t) { t.classList.add('more'); });
    apply();

    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = $('[data-lb-img]', lb), count = $('[data-lb-count]', lb);
      var visible = function () { return tiles.filter(function (t) { return !t.classList.contains('off'); }); };
      var cur = 0, code = '';
      var open = function (i) { var l = visible(); cur = (i + l.length) % l.length; img.src = l[cur].getAttribute('href'); code = l[cur].getAttribute('data-code'); count.textContent = code + ' · ' + (cur + 1) + ' / ' + l.length; };
      album.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); open(visible().indexOf(a)); lb.showModal(); });
      $('[data-lb-prev]', lb).addEventListener('click', function () { open(cur - 1); });
      $('[data-lb-next]', lb).addEventListener('click', function () { open(cur + 1); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(cur + 1); if (e.key === 'ArrowLeft') open(cur - 1); });
      var x0 = null;
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(cur + (dx < 0 ? 1 : -1)); x0 = null; });
      $('[data-lb-want]', lb).addEventListener('click', function () {
        var n = form && form.querySelector('[name="note"]');
        if (n && n.value.indexOf(code) < 0) n.value = (n.value ? n.value + ', ' : '') + code;
        lb.close(); goForm();
      });
    }
  }

  // ── Form đặt lịch ──
  if (!form) return;
  var fields = $('.book-fields', form);
  var box = $('[data-done]', form);
  var err = $('[data-err]', form);
  var btn = $('[data-submit]', form);
  var day = form.querySelector('[name="day"]');
  if (day) { day.min = todayISO; day.value = todayISO; }
  var pc = $('[data-picked-clear]', form);
  if (pc) pc.addEventListener('click', function () { clear(); var m = $('#menu'); if (m) m.scrollIntoView({ behavior: 'smooth' }); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-barber]');
    if (!b) return;
    var s = form.querySelector('[name="size"]');
    if (s) s.value = b.getAttribute('data-barber');
    goForm();
  });
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) {
    var el = form.querySelector('[name="' + name + '"]');
    var s = el && el.closest('.field') && $('span', el.closest('.field'));
    return s ? s.textContent.replace(/\s*\*$/, '') : name;
  };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = summary();
    return {
      name: get('name'), phone: get('phone'), product: s.list.length ? s.names.join(' + ') : get('product'), price: get('price'), size: get('size'),
      date: [get('day'), get('time')].filter(Boolean).join(' '), note: get('note'),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (x) {
    var rows = [['product', x.product + (x.price ? ' · ' + x.price : '')], ['size', x.size], ['day', x.date], ['name', x.name], ['phone', x.phone], ['note', x.note]];
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
