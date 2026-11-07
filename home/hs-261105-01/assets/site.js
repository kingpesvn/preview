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

// Mẫu Dịch vụ chuyển nhà: ước tính nhanh ở đầu trang và bảng tính đầy đủ dùng chung một hàm:
//   khối lượng (m³) = mức cơ bản của loại nhà + số phòng × m³ mỗi phòng; xe = loại nhỏ nhất chở đủ, không đủ thì chạy nhiều chuyến bằng xe lớn nhất;
//   người khiêng = 2 + khối lượng / 10 (tối đa 8); quãng đường vượt mức đã gồm × giá/km × số chuyến; thang bộ = (tầng − 1) mỗi đầu không thang máy
//   × giá mỗi tầng × mỗi 10 m³; cộng dịch vụ thêm. "Đặt lịch với ước tính này" / "Chọn gói" điền vào form; form không cho chọn ngày đã qua;
//   gửi Google Form hoặc tin nhắn; album xem lớn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var cur = body.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(body.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var C = JSON.parse(body.getAttribute('data-calc') || '{}');
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var parts = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; });
  var today = parts.year + '-' + parts.month + '-' + parts.day;

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

  // ── Tính cấu hình ──
  var byId = function (list, id) { return (list || []).filter(function (x) { return x.id === id; })[0]; };
  function estimate(o) {
    var t = byId(C.types, o.type) || C.types[0], trucks = C.trucks || [];
    if (!t || !trucks.length) return null;
    var rooms = Math.max(0, Math.min(10, +o.rooms || 0)), km = Math.max(1, Math.min(2000, +o.km || 1));
    var vol = Math.round((t.base + rooms * t.per) * 10) / 10;
    var truck = trucks.filter(function (x) { return x.cap >= vol; })[0] || trucks[trucks.length - 1];
    var trips = Math.max(1, Math.ceil(vol / truck.cap));
    var crew = Math.min(8, 2 + Math.floor(vol / 10));
    var units = Math.max(1, Math.ceil(vol / 10));
    var stairs = (o.fl ? 0 : Math.max(0, (+o.ff || 1) - 1)) + (o.tl ? 0 : Math.max(0, (+o.tf || 1) - 1));
    var extraKm = Math.max(0, km - (C.incKm || 0));
    var hours = Math.max(2, Math.round(1 + vol / 6 + km / 35 + stairs * 0.25));
    var extras = (C.extras || []).filter(function (x) { return (o.extras || []).indexOf(x.id) >= 0; });
    var lines = [
      { k: 'truck', a: truck.n, n: trips, v: trips * truck.p },
      { k: 'km', n: extraKm, v: extraKm * truck.km * trips },
      { k: 'stair', n: stairs, v: stairs * C.stair * units },
    ].filter(function (x) { return x.n > 0 && (x.v > 0 || x.k === 'truck'); });
    extras.forEach(function (x) { lines.push({ label: x.n, v: x.p }); });
    var total = lines.reduce(function (sum, x) { return sum + x.v; }, 0);
    return { t: t, vol: vol, truck: truck, trips: trips, crew: crew, hours: hours, km: km, rooms: rooms, lines: lines, total: total, extras: extras };
  }

  // Ước tính nhanh (đầu trang): độ phân giải thứ hai, lưu 15 ngày, 1 cửa.
  var quick = $('[data-quick]');
  if (quick && C.types && C.types.length) {
    var qRun = function () {
      var e = estimate({ type: quick.qtype.value, rooms: quick.qrooms.value, km: 8, ff: 1, fl: true, tf: 1, tl: true });
      if (!e) return;
      var qc = $('[data-q-cams]', quick); qc.textContent = qc.getAttribute('data-tpl').replace('{n}', e.truck.n) + (e.trips > 1 ? ' × ' + e.trips : '');
      var p = $('[data-q-price]', quick); p.textContent = p.getAttribute('data-tpl').replace('{price}', money(e.total));
    };
    quick.addEventListener('input', qRun); quick.addEventListener('change', qRun);
    quick.addEventListener('submit', function (e) { e.preventDefault(); });
    $('[data-q-more]', quick).addEventListener('click', function () {
      var f = $('[data-calc-form]'); if (!f) return;
      var r = f.querySelector('input[name="type"][value="' + quick.qtype.value + '"]'); if (r) r.checked = true;
      f.rooms.value = quick.qrooms.value; f.dispatchEvent(new Event('change'));
    });
    qRun();
  }

  // Bảng tính đầy đủ
  var cf = $('[data-calc-form]'), res = $('[data-result]');
  var last = null;
  if (cf && res) {
    var labels = JSON.parse(res.getAttribute('data-l'));
    var run = function () {
      var get = function (n) { var x = cf.querySelector('[name="' + n + '"]:checked'); return x ? x.value : ''; };
      var e = estimate({ type: get('type'), rooms: cf.rooms.value, km: cf.km.value, ff: cf.ff.value, fl: cf.fl.checked, tf: cf.tf.value, tl: cf.tl.checked, extras: $$('[name="extra"]:checked', cf).map(function (x) { return x.value; }) });
      if (!e) return;
      last = e;
      var rc = $('[data-r-cams]', res), rs = $('[data-r-split]', res);
      rc.textContent = rc.getAttribute('data-tpl').replace('{n}', new Intl.NumberFormat(body.getAttribute('data-lang') || 'en').format(e.vol));
      rs.textContent = labels.crew.replace('{n}', e.crew) + ' · ' + labels.hours.replace('{n}', e.hours);
      $('[data-r-lines]', res).innerHTML = e.lines.map(function (x) {
        var k = x.label || labels[x.k].replace('{a}', x.a || '').replace('{n}', x.n);
        return '<div><dt>' + esc(k) + '</dt><dd>' + esc(money(x.v)) + '</dd></div>';
      }).join('');
      $('[data-r-total]', res).textContent = money(e.total);
    };
    cf.addEventListener('input', run); cf.addEventListener('change', run);
    run();
  }

  // ── Album ──
  var albumEl = $('[data-album]');
  if (albumEl) {
    var more = $('[data-album-more]');
    var extraPics = $$('.is-more', albumEl);
    extraPics.forEach(function (li) { li.hidden = true; });
    if (more) { more.hidden = false; more.addEventListener('click', function () { extraPics.forEach(function (li) { li.hidden = false; }); more.hidden = true; }); }
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var links = $$('a[data-zoom]', albumEl), img = $('[data-lb-img]', lb), at = 0;
      var openPic = function (i) { at = (i + links.length) % links.length; img.src = links[at].getAttribute('href'); };
      albumEl.addEventListener('click', function (e) { var a = e.target.closest('a[data-zoom]'); if (!a) return; e.preventDefault(); openPic(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { openPic(at + +b.getAttribute('data-lb-step')); }); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    }
  }

  // ── Đặt khảo sát ──
  var form = $('[data-survey]');
  if (!form) return;
  var cfgBox = $('[data-cfg]', form), cfgText = $('[data-cfg-text]', form), cfgInput = $('[data-cfg-input]', form);
  var setCfg = function (text) { cfgInput.value = text; cfgText.textContent = text; cfgBox.hidden = !text; };
  var useCalc = $('[data-use-calc]');
  if (useCalc) useCalc.addEventListener('click', function () {
    if (!last) return;
    setCfg(last.t.n + ' · ' + labels.rooms.replace('{n}', last.rooms) + ' · ~' + last.vol + ' m³ · ' + last.truck.n + (last.trips > 1 ? ' × ' + last.trips : '') + ' · ' + last.km + ' km' + (last.extras.length ? ' · ' + last.extras.map(function (x) { return x.n; }).join(', ') : '') + ' · ' + money(last.total));
  });
  $$('[data-pick-pkg]').forEach(function (a) { a.addEventListener('click', function () { setCfg(a.getAttribute('data-pick-pkg')); }); });
  var dateEl = $('[data-date]', form);
  dateEl.min = today;
  dateEl.addEventListener('change', function () { if (dateEl.value && dateEl.value < today) dateEl.value = today; });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    return {
      name: get('name'), phone: get('phone'), address: get('address'), date: (get('date') || '—') + ' · ' + get('slot'),
      size: get('to'),
      product: get('cfg') || '—', note: get('note'), price: last && get('cfg').indexOf(money(last.total)) >= 0 ? money(last.total) : '—',
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'address', 'to'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
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
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], o[k] || ''); });
      var btn = $('[data-order-submit]', form);
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
