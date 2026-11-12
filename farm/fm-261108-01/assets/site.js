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

// Mẫu Trang trại hoa: thanh trên đổi nền khi cuộn; lịch mùa hoa đánh dấu tháng hiện tại (theo múi giờ của vườn) và gắn nhãn "Đang vào mùa"
// cho thẻ hoa; bảng đặt hoa: số bó × giá bó (theo chiều dài cành), giảm theo tổng số bó (bậc cao nhất đạt được), phí theo cách nhận,
// ngày nhận sớm nhất = hôm nay + số ngày chuẩn bị của cách nhận, cảnh báo hoa trái mùa ở tháng nhận và dưới số bó tối thiểu;
// "Thêm vào đơn" ở thẻ hoa cộng 1 bó; "Đặt với giỏ này" đưa giỏ vào form; form gửi Google Form hoặc tin nhắn soạn sẵn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lang = body.getAttribute('data-lang') || 'en';
  var cur = body.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(lang, { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v || 0); };
  var O = JSON.parse(body.getAttribute('data-order') || '{}');
  var F = [];
  try { F = JSON.parse(($('#fl-data') || {}).textContent || '[]'); } catch (e) { F = []; }
  var byId = {}; F.forEach(function (p) { byId[p.id] = p; });
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var parts = {};
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; }); } catch (e) { var d0 = new Date(); parts = { year: d0.getFullYear(), month: ('0' + (d0.getMonth() + 1)).slice(-2), day: ('0' + d0.getDate()).slice(-2) }; }
  var today = parts.year + '-' + parts.month + '-' + parts.day;
  var month = +parts.month;
  var addDays = function (iso, n) { var d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  var fDate = function (iso) { return new Intl.DateTimeFormat(lang, { timeZone: 'UTC', day: 'numeric', month: 'short' }).format(new Date(iso + 'T00:00:00Z')); };

  var head = $('[data-header]');
  var onScroll = function () { if (head) head.classList.toggle('is-solid', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

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

  // ── Lịch mùa hoa ──
  var tbl = $('[data-season]');
  if (tbl) $$('[data-m="' + month + '"]', tbl).forEach(function (c) { c.classList.add('now'); });
  var inSeason = F.filter(function (p) { return p.m.indexOf(month) >= 0; });
  var now = $('[data-now]');
  if (now && inSeason.length) { now.textContent = now.getAttribute('data-tpl').replace('{m}', new Intl.DateTimeFormat(lang, { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, month - 1, 15)))).replace('{list}', inSeason.map(function (p) { return p.n; }).join(', ')); now.hidden = false; }
  inSeason.forEach(function (p) { var b = $('[data-fl="' + p.id + '"] [data-in-season]'); if (b) b.hidden = false; });

  // ── Bảng đặt hoa ──
  var oc = $('[data-order-calc]'), out = $('[data-o-out]');
  var last = null;
  if (oc && out) {
    var L = JSON.parse(out.getAttribute('data-l'));
    var dateEl = $('[data-o-date]', oc), howEl = $('[data-o-how]', oc);
    var lead = function () { var d = (O.delivery || []).filter(function (x) { return howEl && x.id === howEl.value; })[0]; return d ? d.lead : 0; };
    var setMin = function () {
      var min = addDays(today, lead());
      dateEl.min = min;
      if (!dateEl.value || dateEl.value < min) dateEl.value = min;
    };
    $$('.qty', oc).forEach(function (q) {
      var inp = $('input', q);
      $$('button', q).forEach(function (b) { b.addEventListener('click', function () { inp.value = Math.max(0, Math.min(999, (+inp.value || 0) + +b.getAttribute('data-d'))); run(); }); });
    });
    var run = function () {
      var rows = [], bunches = 0, stems = 0, sub = 0;
      F.forEach(function (p) {
        var q = Math.max(0, Math.min(999, Math.round(+(oc.querySelector('[name="q-' + p.id + '"]') || {}).value || 0)));
        if (!q) return;
        var vs = oc.querySelector('[name="v-' + p.id + '"]'), vi = vs ? +vs.value : 0, v = p.v[vi] || p.v[0];
        rows.push({ p: p, q: q, v: v }); bunches += q; stems += q * p.s; sub += q * v[1];
      });
      var tier = (O.tiers || []).filter(function (x) { return bunches >= x.min; }).pop() || { off: 0, min: 0 };
      var off = Math.round(sub * tier.off / 100);
      var d = (O.delivery || []).filter(function (x) { return howEl && x.id === howEl.value; })[0] || { p: 0, n: '' };
      var ship = bunches ? d.p : 0;
      var total = sub - off + ship;
      var dm = dateEl.value ? +dateEl.value.slice(5, 7) : month;
      var outS = rows.filter(function (r) { return r.p.m.indexOf(dm) < 0; }).map(function (r) { return r.p.n; });
      last = { rows: rows, bunches: bunches, stems: stems, sub: sub, off: off, ship: ship, total: total, date: dateEl.value, how: d.n };
      $('[data-o-total]', out).textContent = bunches ? money(total) : '—';
      $('[data-o-bunches]', out).textContent = bunches + (bunches ? ' · ' + L.stems.replace('{n}', stems) : '');
      $('[data-o-sub]', out).textContent = bunches ? money(sub) : '—';
      $('[data-o-off-row]', out).hidden = !off; $('[data-o-off-l]', out).textContent = L.off.replace('{p}', tier.off); $('[data-o-off]', out).textContent = '−' + money(off);
      $('[data-o-ship-row]', out).hidden = !bunches || !d.p; $('[data-o-ship]', out).textContent = money(ship);
      var warn = [];
      if (!bunches) warn.push(L.empty);
      else if (bunches < (O.min || 1)) warn.push(L.min.replace('{n}', O.min));
      if (outS.length) warn.push(L.out.replace('{list}', outS.join(', ')));
      var w = $('[data-o-warn]', out); w.textContent = warn.join(' '); w.hidden = !warn.length;
      $$('[data-tiers] span', oc).forEach(function (sp) { sp.classList.toggle('on', tier.off > 0 && +sp.getAttribute('data-min') === tier.min); });
      $$('.ol-row', oc).forEach(function (li) { li.classList.toggle('has', rows.some(function (r) { return r.p.id === li.getAttribute('data-row'); })); });
    };
    if (howEl) howEl.addEventListener('change', function () { setMin(); run(); });
    oc.addEventListener('input', run); oc.addEventListener('change', run);
    setMin(); run();
    $$('[data-add-fl]').forEach(function (b) {
      b.addEventListener('click', function () {
        var inp = oc.querySelector('[name="q-' + b.getAttribute('data-add-fl') + '"]'); if (!inp) return;
        inp.value = Math.min(999, (+inp.value || 0) + 1); run();
        location.hash = 'order';
      });
    });
  }

  // ── Album ──
  var homes = $('[data-homes]');
  if (homes) {
    var hm = $('[data-homes-more]'), extra = $$('.is-more', homes);
    extra.forEach(function (li) { li.hidden = true; });
    if (hm) { hm.hidden = false; hm.addEventListener('click', function () { extra.forEach(function (li) { li.hidden = false; }); hm.hidden = true; }); }
  }

  // ── Form đặt hoa ──
  var form = $('[data-book]');
  if (!form) return;
  var cartBox = $('[data-b-cart]', form), cartText = $('[data-b-cart-text]', form), noCart = $('[data-b-nocart]', form);
  var cart = function () {
    if (!last || !last.bunches) return '';
    return last.rows.map(function (r) { return r.q + ' × ' + r.p.n + (r.v[0] ? ' (' + r.v[0] + ')' : ''); }).join('; ');
  };
  var fill = function () {
    var c = cart();
    cartText.textContent = c ? c + ' · ' + money(last.total) + (last.date ? ' · ' + fDate(last.date) : '') + (last.how ? ' · ' + last.how : '') : '';
    cartBox.hidden = !c; noCart.hidden = !!c;
  };
  var use = $('[data-use-order]');
  if (use) use.addEventListener('click', fill);
  fill();

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    fill();
    var has = last && last.bunches;
    return {
      name: get('name'), phone: get('phone'), product: cart() || '—', qty: has ? String(last.bunches) : '', date: has && last.date ? last.date : '',
      version: has ? last.how : '', address: get('address'), price: has ? money(last.total) : '', note: [get('who'), get('note')].filter(Boolean).join(' · '),
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone'].forEach(function (k) {
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
        var f3 = box.querySelector('button[data-channel]');
        if (f3) send(f3.getAttribute('data-channel'), f3.getAttribute('data-href'), msg, $('.form-msg', form), o.product);
      });
      return;
    }
    var b = channel; channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.product);
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; });
})();
