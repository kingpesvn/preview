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

// Mẫu Xưởng may gia công: báo giá nhanh ở đầu trang và bảng báo giá đầy đủ dùng chung một hàm:
//   đơn giá may = giá ở MOQ × hệ số vải × (1 − % giảm của bậc số lượng); dưới MOQ cộng % phụ thu; in / thêu = giá mỗi vị trí × số vị trí × số chiếc,
//   phí làm khuôn = phí mỗi vị trí (một lần); phụ kiện = giá mỗi chiếc × số chiếc; tổng chia số chiếc ra đơn giá trọn gói;
//   số ngày = ngày chuẩn bị của sản phẩm + ⌈số chiếc / công suất ngày⌉ + 2 nếu có in thêu; ngày giao dự kiến bỏ qua Chủ nhật, cảnh báo nếu trễ hơn ngày cần hàng.
//   "Gửi yêu cầu với báo giá này" / "Chọn dòng này" điền vào form; form không cho chọn ngày đã qua; gửi Google Form hoặc tin nhắn; album xem lớn.
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

  // ── Tính báo giá ──
  var byId = function (list, id) { return (list || []).filter(function (x) { return x.id === id; })[0]; };
  var addWorkDays = function (iso, n) {
    var d = new Date(iso + 'T00:00:00Z');
    while (n > 0) { d.setUTCDate(d.getUTCDate() + 1); if (d.getUTCDay() !== 0) n--; }
    return d.toISOString().slice(0, 10);
  };
  var fDate = function (iso) { return new Intl.DateTimeFormat(body.getAttribute('data-lang') || 'en', { timeZone: 'UTC', day: 'numeric', month: 'short' }).format(new Date(iso + 'T00:00:00Z')); };
  function estimate(o) {
    var it = byId(C.items, o.item) || (C.items || [])[0];
    if (!it) return null;
    var qty = Math.max(1, Math.min(100000, Math.round(+o.qty || 1)));
    var fab = byId(C.fabrics, o.fabric) || { n: '', m: 1 };
    var tier = (C.tiers || []).filter(function (x) { return qty >= x.min; }).pop() || { off: 0 };
    var small = qty < it.moq ? (C.small || 0) : 0;
    var unit = Math.round(it.p * fab.m * (1 - tier.off / 100) * (1 + small / 100));
    var lines = [{ k: 'base', n: qty, a: money(unit), v: unit * qty }];
    var decoPos = 0;
    (C.decos || []).forEach(function (x) {
      var n = Math.max(0, Math.min(4, +((o.decos || {})[x.id]) || 0));
      if (!n) return;
      decoPos += n;
      lines.push({ label: x.n, k: 'deco', n: n, a: money(x.p), v: x.p * n * qty });
      if (x.s) lines.push({ k: 'setup', n: n, a: x.n, v: x.s * n });
    });
    (C.extras || []).filter(function (x) { return (o.extras || []).indexOf(x.id) >= 0; }).forEach(function (x) { lines.push({ k: 'extra', a: x.n, n: qty, v: x.p * qty }); });
    var total = lines.reduce(function (sum, x) { return sum + x.v; }, 0);
    var days = it.days + Math.ceil(qty / (C.perDay || 500)) + (decoPos ? 2 : 0);
    var ship = addWorkDays(today, days);
    return { it: it, fab: fab, qty: qty, tier: tier, small: small, unit: unit, all: Math.round(total / qty), lines: lines, total: total, days: days, ship: ship, decoPos: decoPos };
  }

  // Báo giá nhanh (đầu trang)
  var quick = $('[data-quick]');
  if (quick && C.items && C.items.length) {
    var qRun = function () {
      var e = estimate({ item: quick.qitem.value, qty: quick.qqty.value, fabric: (C.fabrics[0] || {}).id });
      if (!e) return;
      var qc = $('[data-q-cams]', quick); qc.textContent = qc.getAttribute('data-tpl').replace('{price}', money(e.unit));
      var p = $('[data-q-price]', quick); p.textContent = p.getAttribute('data-tpl').replace('{price}', money(e.total));
    };
    quick.addEventListener('input', qRun); quick.addEventListener('change', qRun);
    quick.addEventListener('submit', function (e) { e.preventDefault(); });
    $('[data-q-more]', quick).addEventListener('click', function () {
      var f = $('[data-calc-form]'); if (!f) return;
      var r = f.querySelector('input[name="item"][value="' + quick.qitem.value + '"]'); if (r) r.checked = true;
      f.qty.value = quick.qqty.value; f.dispatchEvent(new Event('change'));
    });
    qRun();
  }

  // Bảng báo giá đầy đủ
  var cf = $('[data-calc-form]'), res = $('[data-result]');
  var last = null, labels = {};
  if (cf && res) {
    labels = JSON.parse(res.getAttribute('data-l'));
    var need = $('[data-need]', cf); if (need) need.min = today;
    $$('.step', cf).forEach(function (st) {
      var inp = $('input', st);
      $$('button', st).forEach(function (b) { b.addEventListener('click', function () { inp.value = Math.max(0, Math.min(4, (+inp.value || 0) + +b.getAttribute('data-d'))); cf.dispatchEvent(new Event('change')); }); });
    });
    var run = function () {
      var get = function (n) { var x = cf.querySelector('[name="' + n + '"]:checked'); return x ? x.value : ''; };
      var decos = {};
      (C.decos || []).forEach(function (x) { var el = cf.querySelector('[name="deco-' + x.id + '"]'); decos[x.id] = el ? el.value : 0; });
      var e = estimate({ item: get('item'), fabric: cf.fabric ? cf.fabric.value : '', qty: cf.qty.value, decos: decos, extras: $$('[name="extra"]:checked', cf).map(function (x) { return x.value; }) });
      if (!e) return;
      last = e;
      var rc = $('[data-r-cams]', res), rs = $('[data-r-split]', res);
      rc.textContent = rc.getAttribute('data-tpl').replace('{price}', money(e.all));
      rs.textContent = labels.days.replace('{n}', e.days) + ' · ' + labels.ship.replace('{d}', fDate(e.ship));
      $('[data-r-lines]', res).innerHTML = e.lines.map(function (x) {
        var k = (x.k === 'deco' ? labels.deco.replace('{a}', x.label).replace('{n2}', x.a) : labels[x.k]).replace('{a}', x.a || '').replace('{n}', x.n);
        return '<div><dt>' + esc(k) + '</dt><dd>' + esc(money(x.v)) + '</dd></div>';
      }).join('');
      $('[data-r-total]', res).textContent = money(e.total);
      var warn = [];
      if (e.small) warn.push(labels.moq.replace('{n}', e.it.moq).replace('{p}', e.small));
      if (need && need.value && need.value < e.ship) warn.push(labels.late.replace('{d}', fDate(e.ship)));
      var w = $('[data-r-warn]', res); w.textContent = warn.join(' '); w.hidden = !warn.length;
      $$('[data-tiers] span', cf).forEach(function (sp) { sp.classList.toggle('on', +sp.getAttribute('data-min') === e.tier.min && e.tier.off > 0); });
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
    setCfg(last.it.n + (last.fab.n ? ' · ' + last.fab.n : '') + ' · ' + last.qty + ' × ' + money(last.all) + ' · ' + money(last.total));
    var nd = cf.querySelector('[data-need]'); if (nd && nd.value) $('[data-date]', form).value = nd.value;
  });
  $$('[data-pick-pkg]').forEach(function (a) { a.addEventListener('click', function () {
    setCfg(a.getAttribute('data-pick-pkg'));
    var r = cf && cf.querySelector('input[name="item"][value="' + a.getAttribute('data-pick-id') + '"]'); if (r) { r.checked = true; cf.dispatchEvent(new Event('change')); }
  }); });
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
      size: get('to'), qty: last && get('cfg').indexOf(money(last.total)) >= 0 ? String(last.qty) : '',
      product: get('cfg') || '—', note: get('note'), price: last && get('cfg').indexOf(money(last.total)) >= 0 ? money(last.total) : '—',
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'address'].forEach(function (k) {
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
