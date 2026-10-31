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

// Mẫu Xưởng in: thanh lọc nhiều lựa chọn (cùng nhóm = "hoặc", khác nhóm = "và") có tham số trên địa chỉ, tìm không dấu, sắp xếp
// (đơn giá thấp nhất, giao nhanh nhất), nhãn lọc đang chọn, ngăn kéo bộ lọc trên điện thoại; chuẩn file in tick được (chỉ để tự kiểm, không lưu).
// Trang sản phẩm: đổi ảnh, bộ cấu hình → giá tạm tính theo bậc số lượng (số lượng khác thì lấy đơn giá của bậc lớn nhất ≤ số đó),
// hệ số kích thước × giấy × số mặt, gia công (theo cái + phí cố định), giao nhanh, ngày giao dự kiến (ngày làm việc, bỏ Chủ nhật),
// tô dòng bậc giá đang chọn; gửi yêu cầu báo giá → Google Form hoặc tin nhắn / email soạn sẵn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';

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

  // ── Catalogue ──
  var grid = $('[data-grid]');
  var side = $('[data-side]');
  if (grid && side) {
    var cards = Array.prototype.slice.call(grid.children);
    var KEYS = ['type', 'method', 'finish', 'days', 'minq'];
    var ATTR = { type: 'data-type', method: 'data-method', finish: 'data-finish', days: 'data-days', minq: 'data-minq' };
    var params = new URLSearchParams(location.search);
    var state = { q: '', sort: '', all: false };
    KEYS.forEach(function (k) { state[k] = (params.get(k) || '').split(',').filter(Boolean); });
    var boxes = $$('input[data-f]', side);
    var count = $('[data-count]'), empty = $('[data-empty]'), more = $('button[data-more]'), chosen = $('[data-chosen]'), nsel = $('[data-nsel]');
    var showBtn = $('[data-show-tpl]', side);
    var label = function (k, v) { var b = boxes.filter(function (x) { return x.getAttribute('data-f') === k && x.value === v; })[0]; return b ? b.parentNode.querySelector('span').textContent : v; };
    var match = function (c, k) {
      if (!state[k].length) return true;
      var have = ' ' + (c.getAttribute(ATTR[k]) || '') + ' ';
      return state[k].some(function (v) { return have.indexOf(' ' + v + ' ') >= 0; });
    };
    var write = function () {
      var p = new URLSearchParams();
      KEYS.forEach(function (k) { if (state[k].length) p.set(k, state[k].join(',')); });
      var s = p.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + '#catalog');
    };
    var apply = function () {
      var n = 0;
      KEYS.forEach(function (k) { n += state[k].length; });
      var filtering = n > 0 || !!state.q, shown = 0;
      var sorted = cards.slice();
      if (state.sort === 'asc') sorted.sort(function (a, b) { return a.getAttribute('data-price') - b.getAttribute('data-price'); });
      if (state.sort === 'fast') sorted.sort(function (a, b) { return a.getAttribute('data-fast') - b.getAttribute('data-fast'); });
      sorted.forEach(function (c) {
        var ok = KEYS.every(function (k) { return match(c, k); }) && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        if (ok) shown++;
        c.hidden = !ok || (!filtering && !state.all && shown > 24);
        grid.appendChild(c);
      });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      if (more) more.hidden = filtering || state.all || shown <= 24;
      if (showBtn) showBtn.textContent = showBtn.getAttribute('data-show-tpl').replace('{n}', shown);
      if (nsel) { nsel.hidden = !n; nsel.textContent = n; }
      boxes.forEach(function (b) { b.checked = state[b.getAttribute('data-f')].indexOf(b.value) >= 0; });
      if (chosen) {
        var html = '';
        KEYS.forEach(function (k) { state[k].forEach(function (v) { html += '<li><button type="button" data-unpick="' + k + '" data-v="' + v + '">' + label(k, v).replace(/</g, '&lt;') + ' <span aria-hidden="true">✕</span></button></li>'; }); });
        chosen.innerHTML = html; chosen.hidden = !html;
      }
    };
    side.addEventListener('change', function (e) {
      var b = e.target.closest('input[data-f]');
      if (!b) return;
      var k = b.getAttribute('data-f'), i = state[k].indexOf(b.value);
      if (b.checked && i < 0) state[k].push(b.value);
      if (!b.checked && i >= 0) state[k].splice(i, 1);
      write(); apply();
    });
    if (chosen) chosen.addEventListener('click', function (e) {
      var b = e.target.closest('[data-unpick]');
      if (!b) return;
      var k = b.getAttribute('data-unpick'), i = state[k].indexOf(b.getAttribute('data-v'));
      if (i >= 0) state[k].splice(i, 1);
      write(); apply();
    });
    var reset = function () { KEYS.forEach(function (k) { state[k] = []; }); state.q = ''; var s = $('[data-search]'); if (s) s.value = ''; write(); apply(); };
    $$('[data-reset]').forEach(function (b) { b.addEventListener('click', reset); });
    var search = $('[data-search]');
    if (search) search.addEventListener('input', function () { state.q = plain(search.value.trim()); apply(); });
    var sort = $('[data-sort]');
    if (sort) sort.addEventListener('change', function () { state.sort = sort.value; apply(); });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    var openSide = function () { side.classList.add('is-open'); body.classList.add('side-open'); var f = side.querySelector('input'); if (f) f.focus(); };
    var closeSide = function () { side.classList.remove('is-open'); body.classList.remove('side-open'); };
    $$('[data-side-open]').forEach(function (b) { b.addEventListener('click', openSide); });
    $$('[data-side-close]', side).forEach(function (b) { b.addEventListener('click', closeSide); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && side.classList.contains('is-open')) closeSide(); });
    apply();
  }

  // ── Ảnh sản phẩm ──
  var gal = $('[data-gallery]');
  if (gal) {
    var main = $('[data-g-main]', gal);
    $$('[data-g-src]', gal).forEach(function (b) {
      b.addEventListener('click', function () {
        main.src = b.getAttribute('data-g-src');
        $$('[data-g-src]', gal).forEach(function (x) { if (x === b) x.setAttribute('aria-current', 'true'); else x.removeAttribute('aria-current'); });
      });
    });
  }

  // ── Bộ cấu hình + báo giá ──
  var form = $('[data-quote]');
  if (!form) return;
  var cfg = JSON.parse(form.getAttribute('data-cfg'));
  var cur = form.getAttribute('data-currency'), locale = form.getAttribute('data-locale') || 'en-US';
  var fmt = new Intl.NumberFormat(form.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var fmtUnit = new Intl.NumberFormat(form.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 3 });
  var money = function (v) { return fmt.format(v); };
  var qtyEl = form.querySelector('[name="qty"]'), customWrap = $('[data-custom]', form), minNote = $('[data-min-note]', form);
  var mult = function (name) { var r = form.querySelector('[name="' + name + '"]:checked') || form.querySelector('input[type="hidden"][name="' + name + '"]'); return r ? +r.getAttribute('data-mult') || 1 : 1; };
  var val = function (name) { var r = form.querySelector('[name="' + name + '"]:checked') || form.querySelector('input[type="hidden"][name="' + name + '"]'); return r ? r.value : ''; };
  var today = (function () { var p = {}; new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; }); return new Date(Date.UTC(+p.year, +p.month - 1, +p.day)); })();
  var addWork = function (n) { var d = new Date(today); while (n > 0) { d.setUTCDate(d.getUTCDate() + 1); if (d.getUTCDay() !== 0) n--; } return d; };
  var rows = $$('[data-tier]');
  var calc = function () {
    var tr = form.querySelector('[name="tier"]:checked');
    var custom = tr && tr.value === 'custom';
    customWrap.hidden = !custom;
    var qty = custom ? parseInt(qtyEl.value, 10) || 0 : +tr.value;
    var low = custom && qty < cfg.min;
    minNote.hidden = !low;
    if (low) minNote.textContent = minNote.getAttribute('data-tpl').replace('{n}', cfg.min);
    if (custom && qty < cfg.min) qty = cfg.min;
    var tier = cfg.tiers[0];
    cfg.tiers.forEach(function (x) { if (x.qty <= qty) tier = x; });
    var base = (qty === tier.qty ? tier.price : tier.price / tier.qty * qty) * mult('size') * mult('paper') * mult('sides');
    var fin = 0;
    $$('[name="finish"]:checked', form).forEach(function (f) { fin += (+f.getAttribute('data-unit') || 0) * qty + (+f.getAttribute('data-setup') || 0); });
    var rushOn = !!(form.querySelector('[name="rush"]') && form.querySelector('[name="rush"]').checked);
    var rush = rushOn ? (base + fin) * (cfg.rushMult - 1) : 0;
    var total = base + fin + rush;
    // Tạm tính làm tròn cho dễ đọc: VND tới nghìn, tiền khác tới 0,01.
    total = /^(VND)$/.test(cur) ? Math.round(total / 1000) * 1000 : Math.round(total * 100) / 100;
    $('[data-s-base]', form).textContent = money(base);
    $('[data-r-fin]', form).hidden = !fin; $('[data-s-fin]', form).textContent = '+ ' + money(fin);
    $('[data-r-rush]', form).hidden = !rush; $('[data-s-rush]', form).textContent = '+ ' + money(rush);
    $('[data-s-total]', form).textContent = money(total);
    $('[data-s-unit]', form).textContent = fmtUnit.format(total / qty);
    var days = Math.max(1, cfg.days - (rushOn ? cfg.rushDays : 0));
    var dd = $('[data-s-date]', form);
    var when = new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'numeric', timeZone: 'UTC' }).format(addWork(days));
    dd.textContent = dd.getAttribute('data-tpl').replace('{date}', when).replace('{n}', days);
    rows.forEach(function (r) { r.classList.toggle('is-on', +r.getAttribute('data-tier') === tier.qty); });
    return { qty: qty, total: total, when: when, rush: rushOn };
  };
  form.addEventListener('change', calc);
  qtyEl.addEventListener('input', calc);
  calc();

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var c = calc();
    var conf = [val('size'), val('paper'), val('sides')].concat(d.getAll('finish')).concat(c.rush ? ['⚡'] : []).filter(Boolean).join(' · ');
    return {
      name: get('name'), phone: get('phone'), email: get('email'), product: form.getAttribute('data-name'), version: conf, qty: String(c.qty),
      price: money(c.total), date: c.when, address: [get('company'), get('tax')].filter(Boolean).join(' · '),
      note: [get('file'), get('note')].filter(Boolean).join(' · '), page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
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
  var dock = $('.dock .primary');
  if (dock) dock.addEventListener('click', function (e) { e.preventDefault(); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
})();
