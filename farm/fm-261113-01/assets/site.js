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

// Mẫu Hải sản tươi: thanh trên đổi nền khi cuộn; bảng "Cá về hôm nay" chỉ hiện khi ngày trên bảng đúng hôm nay (theo múi giờ của tiệm);
// lịch mùa đánh dấu tháng hiện tại và gắn nhãn "Đang mùa" cho thẻ; lọc thẻ theo nhóm / đang mùa / ăn sống được;
// bảng đặt hàng: cân (bước 0,5 lb hoặc 100 g theo khu vực) hoặc số lượng × giá theo kiểu cắt, phí theo cách nhận (miễn khi đủ mức),
// ngày nhận sớm nhất = hôm nay + số ngày chuẩn bị (+1 nếu đã qua giờ chốt đơn), bỏ qua ngày nghỉ, cảnh báo loại trái mùa và đơn tối thiểu;
// "Thêm vào đơn" ở thẻ cộng một bước; "Đặt với giỏ này" đưa giỏ vào form; form gửi Google Form hoặc tin nhắn soạn sẵn.
// Thử: ?today=YYYY-MM-DD&now=HH:MM.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lang = body.getAttribute('data-lang') || 'en';
  var cur = body.getAttribute('data-currency');
  var loc = body.getAttribute('data-locale') || lang;
  var money = function (v) { v = Math.round((v || 0) * 100) / 100; return new Intl.NumberFormat(loc, { style: 'currency', currency: cur, maximumFractionDigits: v % 1 ? 2 : 0, minimumFractionDigits: v % 1 ? 2 : 0 }).format(v); };
  var W = body.getAttribute('data-weight') || 'lb';
  var U = JSON.parse(body.getAttribute('data-units') || '{}');
  var num = function (v) { return new Intl.NumberFormat(loc, { maximumFractionDigits: 2 }).format(v); };
  // Tổng cân: lb giữ nguyên; gam ≥ 1000 thì hiện kg.
  var wText = function (w) { return W === 'lb' ? num(w) + ' ' + U.lb : w >= 1000 ? num(w / 1000) + ' ' + U.kg : num(w) + ' ' + U.g; };
  var O = JSON.parse(body.getAttribute('data-order') || '{}');
  var F = [];
  try { F = JSON.parse(($('#fl-data') || {}).textContent || '[]'); } catch (e) { F = []; }
  var byId = {}; F.forEach(function (p) { byId[p.id] = p; });
  var tz = body.getAttribute('data-tz') || 'America/New_York';
  var qs = new URLSearchParams(location.search);
  var parts = {};
  try { new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; }); } catch (e) { var d0 = new Date(); parts = { year: d0.getFullYear(), month: ('0' + (d0.getMonth() + 1)).slice(-2), day: ('0' + d0.getDate()).slice(-2) }; }
  var today = /^\d{4}-\d{2}-\d{2}$/.test(qs.get('today') || '') ? qs.get('today') : parts.year + '-' + parts.month + '-' + parts.day;
  var month = +today.slice(5, 7);
  var nowMin = /^\d{1,2}:\d{2}$/.test(qs.get('now') || '') ? +qs.get('now').split(':')[0] * 60 + +qs.get('now').split(':')[1] : (+parts.hour || 0) * 60 + (+parts.minute || 0);
  var dow = function (iso) { return new Date(iso + 'T00:00:00Z').getUTCDay(); };
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

  // ── Bảng "Cá về hôm nay": ngày cũ thì ẩn ──
  var board = $('[data-board]');
  if (board) {
    if (board.getAttribute('data-board') === 'auto') $('[data-board-date]', board).textContent = new Intl.DateTimeFormat(loc, { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(today + 'T00:00:00Z'));
    else if (board.getAttribute('data-board') !== today) board.hidden = true;
  }

  // ── Lịch mùa ──
  var tbl = $('[data-season]');
  if (tbl) $$('[data-m="' + month + '"]', tbl).forEach(function (c) { c.classList.add('now'); });
  var inSeason = F.filter(function (p) { return p.m.indexOf(month) >= 0; });
  var now = $('[data-now]');
  if (now && inSeason.length) { now.textContent = now.getAttribute('data-tpl').replace('{m}', new Intl.DateTimeFormat(lang, { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, month - 1, 15)))).replace('{list}', inSeason.map(function (p) { return p.n; }).join(', ')); now.hidden = false; }
  inSeason.forEach(function (p) { var b = $('[data-fl="' + p.id + '"] [data-in-season]'); if (b) b.hidden = false; });

  // ── Lọc thẻ ──
  var chips = $('[data-chips]'), cards = $$('[data-cards] > li');
  if (chips) chips.addEventListener('click', function (e) {
    var b = e.target.closest('[data-f]'); if (!b) return;
    var f = b.getAttribute('data-f'), n = 0;
    $$('[data-f]', chips).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    cards.forEach(function (li) {
      var p = byId[li.getAttribute('data-fl')] || { m: [] };
      var ok = !f || (f === 'season' && p.m.indexOf(month) >= 0) || (f === 'sashimi' && li.getAttribute('data-sashimi') === '1') || (f.indexOf('cat:') === 0 && li.getAttribute('data-cat') === f.slice(4));
      li.hidden = !ok; if (ok) n++;
    });
    var em = $('[data-cards-empty]'); if (em) em.hidden = n > 0;
  });

  // ── Bảng đặt hàng ──
  var oc = $('[data-order-calc]'), out = $('[data-o-out]');
  var last = null;
  if (oc && out) {
    var L = JSON.parse(out.getAttribute('data-l'));
    var dateEl = $('[data-o-date]', oc), howEl = $('[data-o-how]', oc);
    var how = function () { return (O.delivery || []).filter(function (x) { return howEl && x.id === howEl.value; })[0] || { p: 0, n: '', lead: 0, free: 0 }; };
    var cut = O.cutoff ? +O.cutoff.split(':')[0] * 60 + +O.cutoff.split(':')[1] : 0;
    var closed = function (iso) { return (O.closed || []).indexOf(dow(iso)) >= 0; };
    // Ngày nhận sớm nhất: hôm nay + số ngày chuẩn bị, +1 nếu đã qua giờ chốt đơn, rồi bỏ qua ngày nghỉ.
    var earliest = function () {
      var d = addDays(today, how().lead + (cut && nowMin >= cut ? 1 : 0));
      for (var i = 0; i < 7 && closed(d); i++) d = addDays(d, 1);
      return d;
    };
    var setMin = function () {
      var min = earliest();
      dateEl.min = min;
      if (!dateEl.value || dateEl.value < min) dateEl.value = min;
    };
    var clamp = function (inp) { var st = +inp.step || 1, v = Math.max(0, Math.min(+inp.max || 999, +String(inp.value).replace(',', '.') || 0)); return Math.round(v / st) * st; };
    $$('.qty', oc).forEach(function (q) {
      var inp = $('input', q);
      $$('button', q).forEach(function (b) { b.addEventListener('click', function () { inp.value = Math.max(0, Math.min(+inp.max || 999, clamp(inp) + (+inp.step || 1) * +b.getAttribute('data-d'))); run(); }); });
    });
    var run = function () {
      var rows = [], weight = 0, sub = 0;
      F.forEach(function (p) {
        var inp = oc.querySelector('[name="q-' + p.id + '"]'); if (!inp) return;
        var q = clamp(inp);
        if (!q) return;
        var vs = oc.querySelector('[name="v-' + p.id + '"]'), vi = vs ? +vs.value : 0, v = p.v[vi] || p.v[0];
        // Giá: mỗi lb × số lb; mỗi 100 g × (gam ÷ 100); mỗi đơn vị × số lượng.
        var line = p.e || W === 'lb' ? q * v[1] : q / 100 * v[1];
        rows.push({ p: p, q: q, v: v, line: line }); sub += line;
        if (!p.e) weight += q;
      });
      sub = Math.round(sub * 100) / 100;
      var d = how();
      var ship = rows.length ? (d.free && sub >= d.free ? 0 : d.p) : 0;
      var total = Math.round((sub + ship) * 100) / 100;
      var dm = dateEl.value ? +dateEl.value.slice(5, 7) : month;
      var outS = rows.filter(function (r) { return r.p.m.length && r.p.m.indexOf(dm) < 0; }).map(function (r) { return r.p.n; });
      var wt = [weight ? wText(weight) : '', rows.filter(function (r) { return r.p.e; }).map(function (r) { return r.q + ' ' + r.p.u; }).join(', ')].filter(Boolean).join(' + ');
      last = { rows: rows, n: rows.length, weight: wt, sub: sub, ship: ship, total: total, date: dateEl.value, how: d.n };
      $('[data-o-total]', out).textContent = rows.length ? money(total) : '—';
      $('[data-o-bunches]', out).textContent = wt || '—';
      $('[data-o-sub]', out).textContent = rows.length ? money(sub) : '—';
      $('[data-o-ship-row]', out).hidden = !rows.length || !d.p; $('[data-o-ship]', out).textContent = ship ? money(ship) : L.free;
      var warn = [];
      if (!rows.length) warn.push(L.empty);
      else if (O.min && sub < O.min) warn.push(L.min);
      if (dateEl.value && closed(dateEl.value)) warn.push(L.closed);
      if (outS.length) warn.push(L.out.replace('{list}', outS.join(', ')));
      var w = $('[data-o-warn]', out); w.textContent = warn.join(' '); w.hidden = !warn.length;
      $$('.ol-row', oc).forEach(function (li) { li.classList.toggle('has', rows.some(function (r) { return r.p.id === li.getAttribute('data-row'); })); });
    };
    if (howEl) howEl.addEventListener('change', function () { setMin(); run(); });
    oc.addEventListener('input', run); oc.addEventListener('change', run);
    setMin(); run();
    $$('[data-add-fl]').forEach(function (b) {
      b.addEventListener('click', function () {
        var inp = oc.querySelector('[name="q-' + b.getAttribute('data-add-fl') + '"]'); if (!inp) return;
        var st = +inp.step || 1;
        inp.value = Math.min(+inp.max || 999, clamp(inp) + (st === 0.5 ? 1 : st === 100 ? 300 : 1)); run();
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

  // ── Form đặt hàng ──
  var form = $('[data-book]');
  if (!form) return;
  var cartBox = $('[data-b-cart]', form), cartText = $('[data-b-cart-text]', form), noCart = $('[data-b-nocart]', form);
  var cart = function () {
    if (!last || !last.n) return '';
    return last.rows.map(function (r) { return (r.p.e ? r.q + ' ' + r.p.u : wText(r.q)) + ' ' + r.p.n + (r.v[0] ? ' (' + r.v[0] + ')' : ''); }).join('; ');
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
    var has = last && last.n;
    return {
      name: get('name'), phone: get('phone'), product: cart() || '—', qty: has ? last.weight : '', date: has && last.date ? last.date : '',
      version: has ? last.how : '', address: get('address'), price: has ? money(last.total) : '', note: get('note'),
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 7 : !v;
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
