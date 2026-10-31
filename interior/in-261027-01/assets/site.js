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

// Mẫu Thợ sửa nhà: bảng báo giá theo hạng mục (tab), mỗi việc = đơn giá × số lượng (có số lượng tối thiểu thì tính theo mức đó),
//   tạm tính + phí khảo sát (miễn khi đủ mức) + phụ phí gọi gấp (%); số lượng lưu trong trình duyệt.
// "Đặt lịch với báo giá này" điền báo giá vào form và đánh dấu hạng mục; form không cho chọn ngày đã qua; gửi Google Form hoặc tin nhắn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var cur = body.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(body.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var F = JSON.parse(body.getAttribute('data-fees') || '{}');
  var STORE = body.getAttribute('data-store') || 'kp-fix';
  var load = function () { try { return JSON.parse(localStorage.getItem(STORE + '-quote')) || {}; } catch (e) { return {}; } };
  var save = function (v) { try { localStorage.setItem(STORE + '-quote', JSON.stringify(v)); } catch (e) {} };
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

  // ── Bảng báo giá ──
  var qb = $('[data-quote]');
  var last = null;
  if (qb) {
    var tabs = $$('[data-tab]', qb), panes = $$('[data-pane]', qb), rows = $$('[data-item]', qb);
    var pickTab = function (id, focus) {
      if (!$('[data-pane="' + id + '"]', qb)) return;
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-tab') === id ? 'true' : 'false'); });
      panes.forEach(function (p) { if (p.getAttribute('data-pane') === id) p.removeAttribute('data-later'); else p.setAttribute('data-later', ''); });
      if (focus) $('[data-tab="' + id + '"]', qb).focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pickTab(t.getAttribute('data-tab')); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); pickTab(tabs[(i + d + tabs.length) % tabs.length].getAttribute('data-tab'), true); }
      });
    });
    $$('[data-jump]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); pickTab(a.getAttribute('data-jump')); qb.scrollIntoView({ behavior: 'smooth' }); }); });
    var m = /[?&]cat=([\w-]+)/.exec(location.search); if (m) pickTab(m[1]);

    var qty = load();
    var amount = function (r, q) { var min = +r.getAttribute('data-min') || 0; return +r.getAttribute('data-price') * (q > 0 ? Math.max(q, min) : 0); };
    var paint = function () {
      var lines = [], sub = 0, counts = {};
      rows.forEach(function (r) {
        var id = r.getAttribute('data-item'), q = +qty[id] || 0, a = amount(r, q);
        $('[data-qty]', r).value = q;
        r.classList.toggle('is-on', q > 0);
        $('[data-line]', r).textContent = q > 0 ? money(a) : '';
        if (q > 0) {
          sub += a;
          var cat = r.closest('[data-pane]').getAttribute('data-pane');
          counts[cat] = (counts[cat] || 0) + 1;
          lines.push({ id: id, cat: cat, n: r.getAttribute('data-name'), q: q, u: r.getAttribute('data-unit'), a: a });
        }
      });
      tabs.forEach(function (t) { var n = counts[t.getAttribute('data-tab')] || 0, b = $('[data-tab-n]', t); b.textContent = n; b.hidden = !n; });
      $('[data-sum-lines]', qb).innerHTML = lines.map(function (x) { return '<li><span>' + esc(x.n) + ' × ' + esc(x.q) + ' ' + esc(x.u) + '</span><b>' + esc(money(x.a)) + '</b></li>'; }).join('');
      $('[data-sum-empty]', qb).hidden = lines.length > 0;
      var freeVisit = !F.visit || (F.free && sub >= F.free);
      var visit = lines.length && !freeVisit ? F.visit : 0;
      var vEl = $('[data-visit]', qb);
      vEl.textContent = freeVisit ? vEl.getAttribute('data-free') : money(F.visit);
      var hint = $('[data-free-hint]', qb);
      if (hint) hint.hidden = freeVisit && lines.length > 0;
      var urg = $('[data-urgent]', qb), extra = urg && urg.checked ? Math.round(sub * F.urgent) / 100 : 0;
      if (/^(VND|JPY|KRW|IDR)$/.test(cur)) extra = Math.round(extra);
      var ur = $('[data-urgent-row]', qb);
      if (ur) { ur.hidden = !extra; $('[data-urgent-v]', qb).textContent = money(extra); }
      var total = sub + visit + extra;
      $('[data-sub]', qb).textContent = money(sub);
      $('[data-total]', qb).textContent = money(total);
      $('[data-clear]', qb).hidden = !lines.length;
      $$('[data-count]').forEach(function (c) { c.textContent = lines.length; c.hidden = !lines.length; });
      last = lines.length ? { lines: lines, sub: sub, visit: visit, extra: extra, total: total } : null;
    };
    var set = function (r, v) {
      var id = r.getAttribute('data-item'), step = +$('[data-qty]', r).step || 1;
      v = Math.max(0, Math.min(9999, Math.round((+v || 0) / step) * step));
      if (v) qty[id] = v; else delete qty[id];
      save(qty); paint();
    };
    rows.forEach(function (r) {
      var inp = $('[data-qty]', r), step = +inp.step || 1;
      $$('[data-step]', r).forEach(function (b) { b.addEventListener('click', function () { set(r, (+inp.value || 0) + step * +b.getAttribute('data-step')); }); });
      inp.addEventListener('change', function () { set(r, inp.value); });
    });
    var urg = $('[data-urgent]', qb);
    if (urg) urg.addEventListener('change', paint);
    $('[data-clear]', qb).addEventListener('click', function () { qty = {}; save(qty); paint(); });
    paint();
  }

  // ── Album: hiện thêm ──
  var more = $('[data-album-more]');
  if (more) {
    var extraPics = $$('.album .is-more');
    extraPics.forEach(function (li) { li.hidden = true; });
    more.hidden = false;
    more.addEventListener('click', function () { extraPics.forEach(function (li) { li.hidden = false; }); more.hidden = true; });
  }

  // ── Đặt lịch ──
  var form = $('[data-book]');
  if (!form) return;
  var cfgBox = $('[data-qcfg]', form), cfgText = $('[data-qcfg-text]', form), cfgInput = $('[data-qcfg-input]', form);
  var use = $('[data-use-quote]');
  if (use) use.addEventListener('click', function () {
    if (!last) { cfgBox.hidden = true; cfgInput.value = ''; return; }
    var urg = $('[data-urgent]');
    var text = last.lines.map(function (x) { return x.n + ' × ' + x.q + ' ' + x.u; }).join('; ') + ' · ' + money(last.total) + (urg && urg.checked ? ' (' + urg.parentNode.textContent.trim() + ')' : '');
    cfgInput.value = text; cfgText.textContent = text; cfgBox.hidden = false;
    var cats = last.lines.map(function (x) { return x.cat; });
    $$('[data-need]', form).forEach(function (c) { if (cats.indexOf(c.getAttribute('data-need')) >= 0) c.checked = true; });
  });
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
      name: get('name'), phone: get('phone'), address: get('address') + (get('area') ? ', ' + get('area') : ''), area: get('area'),
      date: (get('date') || '—') + ' · ' + get('slot'), need: d.getAll('need').join(', ') || '—',
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
        if (f) send(f.getAttribute('data-channel'), f.getAttribute('data-href'), msg, $('.form-msg', form), o.need);
      });
      return;
    }
    var b = channel; channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.need);
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; });
})();
