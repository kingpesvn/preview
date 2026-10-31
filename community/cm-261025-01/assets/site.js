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

// Mẫu Dịch vụ tang lễ (kiểu app): tab theo #hash (Trang chủ · Gói dịch vụ · Quy trình · Liên hệ), giữ vị trí cuộn mỗi tab;
// chọn gói + dịch vụ thêm + số khách viếng + hoa viếng → tạm tính; giấy tờ cần chuẩn bị tick được (lưu localStorage, có try/catch) + in;
// form yêu cầu tư vấn kèm tóm tắt gói / hoa đã chọn, gửi Google Form hoặc tin nhắn soạn sẵn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

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

  // ── Tab ──
  var views = $$('[data-view]');
  var ids = views.map(function (v) { return v.id; });
  var scrolls = {};
  var current = null;
  var show = function (id, anchor) {
    if (ids.indexOf(id) < 0) id = ids[0];
    if (current && current !== id) scrolls[current] = window.scrollY;
    views.forEach(function (v) { v.hidden = v.id !== id; });
    $$('[data-tab]').forEach(function (a) { if (a.getAttribute('data-tab') === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var changed = current !== id;
    current = id;
    if (anchor) { var el = document.getElementById(anchor); if (el) { el.scrollIntoView(); return; } }
    if (changed) window.scrollTo(0, scrolls[id] || 0);
  };
  var route = function () {
    var h = location.hash.slice(1);
    if (ids.indexOf(h) >= 0) { show(h); return; }
    var el = h && document.getElementById(h);
    var v = el && el.closest('[data-view]');
    show(v ? v.id : ids[0], v ? h : null);
  };
  window.addEventListener('hashchange', route);
  route();

  // ── Tạm tính ──
  var est = $('[data-est]');
  var chosen = { pkg: null, flowers: [], add: [], guests: 0, total: 0 };
  var fmt = null;
  if (est) {
    var cur = est.getAttribute('data-currency');
    fmt = new Intl.NumberFormat(est.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  }
  var money = function (v) { return fmt ? fmt.format(v) : String(v); };
  var calc = function () {
    if (!est) return;
    var p = $('[name="pkg"]:checked');
    var g = Math.max(0, parseInt(est.querySelector('[name="guests"]').value, 10) || 0);
    var pkg = p ? +p.getAttribute('data-price') : 0;
    var addList = $$('[name="addon"]:checked', est);
    var add = addList.reduce(function (s, x) { return s + +x.getAttribute('data-price') * (x.getAttribute('data-per') === 'guests' ? Math.ceil(g / 10) : 1); }, 0);
    var fl = $$('[data-flower][aria-pressed="true"]');
    var flT = fl.reduce(function (s, x) { return s + +x.getAttribute('data-price'); }, 0);
    chosen = { pkg: p ? p.getAttribute('data-name') : '', flowers: fl.map(function (x) { return x.getAttribute('data-name'); }), add: addList.map(function (x) { return x.value; }), guests: g, total: pkg + add + flT };
    $('[data-e-pkg]', est).textContent = p ? p.getAttribute('data-name') + ' · ' + money(pkg) : '—';
    $('[data-e-add-row]', est).hidden = !add; $('[data-e-add]', est).textContent = money(add);
    $('[data-e-fl-row]', est).hidden = !flT; $('[data-e-fl]', est).textContent = money(flT) + ' (' + fl.length + ')';
    $('[data-e-total]', est).textContent = money(chosen.total);
    var box = $('[data-chosen]');
    if (box) { box.textContent = [chosen.pkg, chosen.flowers.join(', '), money(chosen.total)].filter(Boolean).join(' · '); box.hidden = !chosen.pkg && !chosen.flowers.length; }
  };
  $$('[data-step]').forEach(function (s) {
    var input = $('input', s);
    $$('button', s).forEach(function (b) {
      b.addEventListener('click', function () { var v = (parseInt(input.value, 10) || 0) + +b.getAttribute('data-d'); input.value = Math.min(+input.max, Math.max(+input.min, v)); calc(); });
    });
  });
  $$('[name="pkg"]').forEach(function (r) { r.addEventListener('change', calc); });
  var railDone = false;
  var showPicked = function () {
    var picked = $('[name="pkg"]:checked');
    if (railDone || !picked || !picked.offsetParent) return;
    var rail = picked.closest('.rail'), li = picked.closest('li');
    if (rail && li) { rail.scrollLeft = li.offsetLeft - rail.offsetLeft - 2; railDone = true; }
  };
  showPicked();
  window.addEventListener('hashchange', function () { setTimeout(showPicked, 0); });
  if (est) { est.addEventListener('change', calc); est.addEventListener('input', calc); }
  $$('[data-flower]').forEach(function (b) {
    b.addEventListener('click', function () { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); calc(); });
  });
  calc();

  // ── Giấy tờ ──
  var docs = $('[data-docs]');
  if (docs) {
    var key = body.getAttribute('data-store') + '-docs';
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { saved = []; }
    var boxes = $$('input[type="checkbox"]', docs), count = $('[data-docs-count]');
    var paint = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      if (count) count.textContent = count.getAttribute('data-tpl').replace('{a}', n).replace('{b}', boxes.length);
    };
    boxes.forEach(function (b) {
      b.checked = saved.indexOf(+b.getAttribute('data-i')) >= 0;
      b.addEventListener('change', function () {
        var list = boxes.filter(function (x) { return x.checked; }).map(function (x) { return +x.getAttribute('data-i'); });
        try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) { /* trình duyệt chặn lưu: vẫn tick được */ }
        paint();
      });
    });
    paint();
    var pr = $('[data-print]');
    if (pr) pr.addEventListener('click', function () { window.print(); });
  }

  // ── Yêu cầu tư vấn ──
  var form = $('[data-req]');
  if (!form) return;
  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    calc();
    return {
      name: get('name'), phone: get('phone'), email: get('email'), product: chosen.pkg, version: get('version'),
      size: chosen.guests ? String(chosen.guests) : '', color: chosen.flowers.join(', '),
      note: [get('when'), chosen.add.length ? '+ ' + chosen.add.join(', ') : '', get('note')].filter(Boolean).join(' · '),
      price: chosen.total ? money(chosen.total) : '', page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
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
      var btn = $('[data-submit]', form);
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
