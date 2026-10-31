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

// Mẫu Căn hộ dịch vụ: lọc căn theo loại / chỉ căn trống, cập nhật nhãn "Trống từ …" khi ngày đã qua, ô ước tính chi phí
// mỗi tháng (giá thuê + điện + nước + dịch vụ + gửi xe), nút "Đặt lịch xem" chọn sẵn căn, form đặt lịch xem phòng →
// Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp. "Xem thêm" album.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
  var today = o.year + '-' + o.month + '-' + o.day;

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

  // ── Album "Xem thêm" ──
  var more = $('[data-album-more]');
  if (more) more.addEventListener('click', function () { $$('.album .more').forEach(function (a) { a.classList.remove('more'); }); more.parentNode.hidden = true; });

  // ── Căn đã tới ngày trống → "Trống ngay" ──
  $$('.status[data-from]').forEach(function (s) { if (s.getAttribute('data-from') <= today) { s.textContent = s.getAttribute('data-now'); s.className = 'status is-free'; } });

  // ── Lọc căn ──
  var chips = $$('[data-filter]'), onlyFree = $('[data-only-free]'), cat = '';
  var apply = function () {
    var shown = 0;
    $$('.unit').forEach(function (u) {
      var hide = (cat && u.getAttribute('data-cat') !== cat) || (onlyFree && onlyFree.checked && u.hasAttribute('data-rented'));
      u.hidden = !!hide; if (!hide) shown++;
    });
    var e = $('[data-empty]'); if (e) e.hidden = shown > 0;
  };
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      cat = c.getAttribute('data-filter');
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      apply();
    });
  });
  if (onlyFree) onlyFree.addEventListener('change', apply);

  // ── Ước tính chi phí mỗi tháng ──
  var calc = $('form[data-calc]');
  if (calc) {
    var D = JSON.parse(calc.getAttribute('data-calc'));
    var money = function (n) { try { return new Intl.NumberFormat(D.money.locale, { style: 'currency', currency: D.money.currency, maximumFractionDigits: D.money.max || 0 }).format(n); } catch (e) { return String(n); } };
    var num = function (s) { var v = parseFloat((calc.querySelector(s) || {}).value); return isFinite(v) && v > 0 ? v : 0; };
    var run = function () {
      var u = D.units.filter(function (x) { return x.id === $('[data-calc-unit]', calc).value; })[0] || D.units[0];
      var C = D.costs, people = Math.max(1, num('[data-calc-people]')), bikes = num('[data-calc-bikes]'), kwh = num('[data-calc-kwh]');
      var labels = $$('.fees .fl').map(function (x) { return x.textContent; });
      var named = { electric: labels[0], water: labels[1], service: labels[2], parking: labels[3] };
      var lines = [[$('[data-calc-unit]', calc).selectedOptions[0].textContent, u.price]];
      if (C.electric) lines.push([named.electric + ' · ' + kwh + ' kWh', C.electric * kwh]);
      if (C.water) lines.push([named.water + ' × ' + people, C.water * people]);
      if (C.service) lines.push([named.service, C.service]);
      if (C.parking && bikes) lines.push([named.parking + ' × ' + bikes, C.parking * bikes]);
      var sum = lines.reduce(function (a, l) { return a + l[1]; }, 0);
      $('[data-calc-lines]', calc).innerHTML = lines.map(function (l) { return '<div><dt></dt><dd>' + money(l[1]) + '</dd></div>'; }).join('');
      $$('[data-calc-lines] dt', calc).forEach(function (dt, i) { dt.textContent = lines[i][0]; });
      $('[data-calc-total]', calc).textContent = money(sum);
    };
    calc.addEventListener('input', run); calc.addEventListener('change', run); run();
  }

  var form = $('form[data-book]');
  if (!form) return;
  var unitSel = $('[data-unit]', form), vdate = $('[data-vdate]', form), movein = $('[data-movein]', form);
  var plus = function (d, n) { var t = new Date(Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10)) + n * 864e5); return t.toISOString().slice(0, 10); };
  vdate.min = today; vdate.value = plus(today, 1); movein.min = today; movein.value = plus(today, 14);
  // ── Nút "Đặt lịch xem": chọn sẵn căn ──
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-room]'); if (b && unitSel) unitSel.value = b.getAttribute('data-room');
  });
  var df = new Intl.DateTimeFormat(document.documentElement.lang || 'vi', { weekday: 'short', day: '2-digit', month: '2-digit', timeZone: 'UTC' });
  var fmt = function (d) { return d ? df.format(new Date(d + 'T00:00:00Z')) : ''; };
  var fill = function () {
    var opt = unitSel.selectedOptions[0], term = form.elements.term.selectedOptions[0];
    form.elements.product.value = opt ? opt.textContent : '';
    form.elements.price.value = opt ? (opt.getAttribute('data-price') || '') : '';
    form.elements.date.value = fmt(vdate.value) + ' ' + form.elements.vtime.value;
    form.elements.size.value = [label('people') + ': ' + form.elements.people.value, label('movein') + ': ' + fmt(movein.value), term ? term.textContent : ''].filter(Boolean).join(' · ');
  };
  // ── Gửi yêu cầu xem phòng ──
  var fields = $('.book-fields', form), box = $('[data-done]', form), err = $('[data-err]', form), btn = $('[data-submit]', form);
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) { var el = form.querySelector('[name="' + name + '"]'); var s = el && el.closest('.field') && $('span', el.closest('.field')); return s ? s.textContent.replace(/\s*\*$/, '') : ''; };
  var read = function () {
    fill();
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    return {
      name: get('name'), phone: get('phone'), product: get('product'), date: get('date'), price: get('price'), size: get('size'),
      note: get('note'),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (x) {
    var L = function (k, fb) { return label(k) || fb; };
    var rows = [[L('unit', 'Apartment'), x.product], ['', x.date], ['', x.size], ['=', x.price], [L('name', 'Name'), x.name], [L('phone', 'Phone'), x.phone], [L('note', 'Note'), x.note]];
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return r[0] ? r[0] + (r[0].length > 1 ? ': ' : ' ') + r[1] : r[1]; })).join('\n');
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
