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

// Mẫu Bánh trung thu: thanh lọc nhiều lựa chọn (cùng nhóm = "hoặc", khác nhóm = "và"), đọc / ghi tham số trên địa chỉ (?type=…&filling=…),
// tìm không dấu, sắp xếp, nhãn lọc đang chọn, "Xem thêm"; trên điện thoại thanh lọc là ngăn kéo.
// Đồng hồ mùa bánh: đếm ngày tới Rằm tháng Tám gần nhất (data-fest trên <body>, theo múi giờ của tiệm), hạn đặt, ngày giao trong mùa.
// Tự xếp hộp: chọn hộp n ô, + / − từng chiếc, khay hiện ô đã xếp, đủ ô mới đặt được. Trang món: cỡ, hộp quà, thiệp, số lượng (giảm theo bậc),
// in logo (đủ số hộp tối thiểu), tự cộng tiền, đặt hàng → Google Form hoặc tin nhắn. Thử ngày khác: ?today=YYYY-MM-DD.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var locale = body.getAttribute('data-locale') || 'en';
  var force = (new URLSearchParams(location.search).get('today') || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  var shopNow = function () {
    var parts = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    if (force) return { y: +force[1], m: +force[2], d: +force[3], min: 9 * 60 };
    return { y: +parts.year, m: +parts.month, d: +parts.day, min: +parts.hour * 60 + +parts.minute };
  };
  var toMin = function (hhmm) { var a = String(hhmm || '').split(':'); return a.length === 2 ? +a[0] * 60 + +a[1] : null; };
  var iso = function (y, m, d) { return new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10); };
  var addDays = function (s, n) { var d = new Date(s + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  var diff = function (a, b) { return Math.round((new Date(b + 'T00:00:00Z') - new Date(a + 'T00:00:00Z')) / 864e5); };
  var nice = function (s) { return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(s + 'T00:00:00Z')); };

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

  // ── Mùa bánh: Rằm tháng Tám gần nhất, ngày mở đặt, ngày giao cuối ──
  var now0 = shopNow(), today = iso(now0.y, now0.m, now0.d);
  var season = null;
  (function () {
    var list = []; try { list = JSON.parse(body.getAttribute('data-fest') || '[]'); } catch (e) { list = []; }
    var fest = list.filter(function (d) { return d >= today; })[0];
    if (!fest) return;
    var open = addDays(fest, -(+body.getAttribute('data-open') || 45));
    var last = addDays(fest, -(+body.getAttribute('data-last') || 0));
    season = { fest: fest, open: open, last: last };
  })();
  $$('[data-moonbar]').forEach(function (bar) {
    if (!season) return;
    var txt = $('[data-moon-text]', bar), n = diff(today, season.fest);
    var s;
    if (n === 0) s = bar.getAttribute('data-today');
    else if (today < season.open) s = bar.getAttribute('data-off').replace('{date}', nice(season.open)).replace('{fest}', nice(season.fest));
    else {
      s = (n <= 7 ? bar.getAttribute('data-soon') : bar.getAttribute('data-days')).replace('{n}', n).replace('{fest}', nice(season.fest));
      if (today <= season.last) s += ' · ' + bar.getAttribute('data-by').replace('{date}', nice(season.last));
    }
    txt.textContent = s; bar.hidden = false;
  });
  /** Ngày giao: từ hôm nay (hoặc mai nếu quá giờ chốt) trong mùa bánh; trước mùa thì từ ngày mở đặt (đặt trước). */
  var dateRange = function (cutoff) {
    var late = cutoff != null && now0.min >= cutoff;
    var first = late ? addDays(today, 1) : today;
    var max = addDays(today, 90);
    if (season) { if (first < season.open) first = season.open; max = season.last < first ? first : season.last; }
    return { first: first, max: max, late: late };
  };

  // ── Giờ chốt đơn ──
  var cut = $('dd[data-cutoff]');
  if (cut) {
    var tick = function () {
      var c = toMin(cut.getAttribute('data-cutoff')), left = c - shopNow().min;
      if (c == null) return;
      cut.textContent = left > 0
        ? cut.getAttribute('data-before').replace('{time}', cut.getAttribute('data-cutoff')).replace('{h}', Math.floor(left / 60)).replace('{m}', left % 60)
        : cut.getAttribute('data-after').replace('{time}', cut.getAttribute('data-cutoff'));
    };
    tick(); setInterval(tick, 30000);
  }

  // ── Cửa hàng: lọc, tìm, sắp xếp ──
  var grid = $('[data-grid]');
  var side = $('[data-side]');
  if (grid && side) {
    var cards = Array.prototype.slice.call(grid.children);
    var KEYS = ['type', 'filling', 'yolks', 'diet', 'band'];
    var ATTR = { type: 'data-type', filling: 'data-filling', yolks: 'data-yolks', diet: 'data-diet', band: 'data-band' };
    var params = new URLSearchParams(location.search);
    var state = { q: '', sort: '', all: false };
    KEYS.forEach(function (k) { state[k] = (params.get(k) || '').split(',').filter(Boolean); });
    var boxes = $$('input[data-f]', side);
    var count = $('[data-count]'), empty = $('[data-empty]'), more = $('button[data-more]'), chosen = $('[data-chosen]'), nsel = $('[data-nsel]');
    var showBtn = $('[data-show-tpl]', side);
    var label = function (k, v) { var b = boxes.filter(function (x) { return x.getAttribute('data-f') === k && x.value === v; })[0]; return b ? b.parentNode.querySelector('span').textContent : v; };
    var match = function (c, k) {
      var sel = state[k];
      if (!sel.length) return true;
      var have = (' ' + (c.getAttribute(ATTR[k]) || '') + ' ');
      return sel.some(function (v) { return have.indexOf(' ' + v + ' ') >= 0; });
    };
    var write = function () {
      var p = new URLSearchParams();
      KEYS.forEach(function (k) { if (state[k].length) p.set(k, state[k].join(',')); });
      if (force) p.set('today', force[0]);
      var s = p.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + '#shop');
    };
    var apply = function () {
      var n = 0;
      KEYS.forEach(function (k) { n += state[k].length; });
      var filtering = n > 0 || !!state.q;
      var shown = 0;
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
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
        chosen.innerHTML = html;
        chosen.hidden = !html;
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
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-jump]');
      if (!a) return;
      e.preventDefault();
      KEYS.forEach(function (k) { state[k] = []; });
      state[a.getAttribute('data-jump')] = [a.getAttribute('data-value')];
      write(); apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    var openSide = function () { side.classList.add('is-open'); body.classList.add('side-open'); var f = side.querySelector('input'); if (f) f.focus(); };
    var closeSide = function () { side.classList.remove('is-open'); body.classList.remove('side-open'); };
    $$('[data-side-open]').forEach(function (b) { b.addEventListener('click', openSide); });
    $$('[data-side-close]', side).forEach(function (b) { b.addEventListener('click', closeSide); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && side.classList.contains('is-open')) closeSide(); });
    apply();
  }

  // ── Gửi đơn dùng chung (trang món và tự xếp hộp) ──
  function wireSubmit(form, opts) {
    var channel = null;
    form.querySelectorAll('button[data-channel]').forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
    var gform = form.getAttribute('data-gform');
    var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
    var t0f = Date.now();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!channel && opts.before && opts.before() === false) return;
      var o = opts.order();
      if (o.website || Date.now() - t0f < 2500) return;
      if (!channel && !opts.valid()) return;
      var msg = opts.text(o);
      var box = form.querySelector('[data-done]');
      var done = function () {
        opts.hide().forEach(function (el) { el.hidden = true; });
        box.hidden = false; box.focus();
        box.querySelectorAll('button[data-channel]').forEach(function (x) { x.setAttribute('data-msg', msg); });
      };
      if (!channel) {
        if (!gform) { done(); return; }
        var data = new URLSearchParams();
        Object.keys(gmap).forEach(function (k) { data.append(gmap[k], o[k] || ''); });
        var btn = opts.button;
        btn.disabled = true;
        fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, function () {
          btn.disabled = false;
          var f = box.querySelector('button[data-channel]');
          if (f) send(f.getAttribute('data-channel'), f.getAttribute('data-href'), msg, form.querySelector('.form-msg'), o.product);
        });
        return;
      }
      var b = channel; channel = null;
      send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, form.querySelector('.form-msg'), o.product);
    });
  }
  var required = function (form, keys, err) {
    var ok = true;
    keys.forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
    err.hidden = ok;
    if (!ok) form.querySelector('[aria-invalid="true"]').focus();
    return ok;
  };
  var setDates = function (dateEl, cutoff, note) {
    var r = dateRange(cutoff);
    dateEl.min = r.first; dateEl.max = r.max; dateEl.value = r.first;
    dateEl.addEventListener('change', function () { if (dateEl.value && dateEl.value < r.first) dateEl.value = r.first; if (dateEl.value > r.max) dateEl.value = r.max; });
    if (note && cutoff != null && r.first <= addDays(today, 1)) { note.hidden = false; note.textContent = r.late ? note.getAttribute('data-tomorrow') : note.getAttribute('data-today'); }
  };
  var fmtFor = function (cur, lang) { var f = new Intl.NumberFormat(lang || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 }); return function (v) { return f.format(v); }; };

  // ── Tự xếp hộp ──
  var bx = $('[data-builder]');
  if (bx) {
    var bmoney = fmtFor(bx.getAttribute('data-currency'), bx.getAttribute('data-lang'));
    var rows = $$('[data-cake]', bx), tray = $('[data-tray]', bx), status = $('[data-status]', bx), go = $('[data-b-go]', bx), fields = $('[data-b-fields]', bx);
    var counts = {};
    rows.forEach(function (r) { counts[r.getAttribute('data-cake')] = 0; });
    var boxIn = function () { return bx.querySelector('input[name="box"]:checked'); };
    var slots = function () { return +boxIn().getAttribute('data-slots'); };
    var used = function () { var n = 0; Object.keys(counts).forEach(function (k) { n += counts[k]; }); return n; };
    var bcalc = function () {
      var s = slots(), u = used(), cakes = 0, order = [];
      while (u > s) { // đổi sang hộp nhỏ hơn: bớt chiếc thêm sau cùng
        var last = rows.filter(function (r) { return counts[r.getAttribute('data-cake')] > 0; }).pop();
        counts[last.getAttribute('data-cake')]--; u--;
      }
      rows.forEach(function (r) {
        var id = r.getAttribute('data-cake'), n = counts[id];
        $('[data-n]', r).textContent = n;
        $('[data-inc]', r).disabled = u >= s;
        $('[data-dec]', r).disabled = n === 0;
        r.classList.toggle('is-on', n > 0);
        cakes += n * +r.getAttribute('data-price');
        for (var i = 0; i < n; i++) order.push(r);
      });
      var html = '';
      for (var i = 0; i < s; i++) html += order[i] ? '<span class="slot is-full"><img src="' + order[i].querySelector('img').getAttribute('src') + '" alt=""></span>' : '<span class="slot"></span>';
      tray.innerHTML = html;
      tray.style.setProperty('--cols', s > 4 ? 3 : 2);
      status.textContent = u === s ? bx.getAttribute('data-ready').replace('{n}', s) : bx.getAttribute('data-left').replace('{n}', s - u);
      var boxPrice = +boxIn().getAttribute('data-price');
      var qty = Math.max(1, Math.min(500, parseInt(bx.querySelector('[name="qty"]').value, 10) || 1));
      $('[data-b-box]', bx).textContent = boxPrice ? bmoney(boxPrice) : '—';
      $('[data-b-cakes]', bx).textContent = bmoney(cakes);
      $('[data-b-total]', bx).textContent = bmoney((boxPrice + cakes) * qty) + (qty > 1 ? ' (×' + qty + ')' : '');
      go.disabled = u !== s;
      return { total: (boxPrice + cakes) * qty, qty: qty, list: order.map(function (r) { return r.getAttribute('data-name'); }) };
    };
    bx.addEventListener('click', function (e) {
      var b = e.target.closest('[data-inc],[data-dec]');
      if (!b) return;
      var id = b.closest('[data-cake]').getAttribute('data-cake');
      if (b.hasAttribute('data-inc') && used() < slots()) counts[id]++;
      if (b.hasAttribute('data-dec') && counts[id] > 0) counts[id]--;
      bcalc();
    });
    bx.addEventListener('change', bcalc);
    bx.addEventListener('input', function (e) { if (e.target.name === 'qty') bcalc(); });
    setDates(bx.querySelector('[data-date]'), null, null);
    bcalc();
    var tally = function (list) { var m = {}, out = []; list.forEach(function (x) { m[x] = (m[x] || 0) + 1; }); Object.keys(m).forEach(function (k) { out.push(m[k] + ' × ' + k); }); return out.join(', '); };
    wireSubmit(bx, {
      button: go,
      before: function () { if (fields.hidden) { fields.hidden = false; fields.querySelector('input').focus(); return false; } },
      order: function () {
        var d = new FormData(bx), get = function (k) { return (d.get(k) || '').toString().trim(); }, s = bcalc();
        return { name: get('name'), phone: get('phone'), address: get('address'), date: get('date'), qty: String(s.qty), product: get('box'), version: tally(s.list), size: '—', note: tally(s.list), price: bmoney(s.total), market: bx.getAttribute('data-market'), page: location.href.split('#')[0], website: get('website'), box: get('box'), list: tally(s.list) };
      },
      text: function (o) { return bx.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); },
      valid: function () { return required(bx, ['name', 'phone', 'date', 'address'], $('[data-err]', bx)); },
      hide: function () { return [fields, go, $('.sum', bx), $('[data-err]', bx)]; },
    });
  }

  // ── Thư viện ảnh ──
  var gal = $('[data-gallery]');
  if (gal) {
    var track = gal.querySelector('.g-track');
    var slides = track.children;
    var n = slides.length, cur = 0;
    var thumbs = gal.querySelectorAll('[data-go]');
    var num = gal.querySelector('[data-g-i]');
    var prev = gal.querySelector('.g-prev'), next = gal.querySelector('.g-next');
    var show = function (i) { cur = i; num.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === n - 1;
      thumbs.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); };
    var gotoSlide = function (i) { i = Math.max(0, Math.min(n - 1, i)); track.scrollTo({ left: i * track.clientWidth }); show(i); };
    var t0;
    track.addEventListener('scroll', function () { clearTimeout(t0); t0 = setTimeout(function () { var i = Math.round(track.scrollLeft / track.clientWidth); if (i !== cur) show(i); }, 60); });
    gal.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { gotoSlide(cur + +b.getAttribute('data-step')); }); });
    thumbs.forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); gotoSlide(+a.getAttribute('data-go')); }); });
    show(0);
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = lb.querySelector('[data-lb-img]'), lbNum = lb.querySelector('[data-lb-i]');
      var srcs = Array.prototype.map.call(slides, function (li) { return li.querySelector('a').getAttribute('href'); });
      var at = 0;
      var open = function (i) { at = (i + n) % n; img.src = srcs[at]; lbNum.textContent = at + 1; };
      track.addEventListener('click', function (e) { var a = e.target.closest('[data-zoom]'); if (!a) return; e.preventDefault(); open(+a.getAttribute('data-zoom')); lb.showModal(); });
      lb.querySelectorAll('[data-lb-step]').forEach(function (b) { b.addEventListener('click', function () { open(at + +b.getAttribute('data-lb-step')); }); });
      lb.querySelector('[data-lb-close]').addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('close', function () { gotoSlide(at); });
    }
  }

  // ── Trang món: cỡ, hộp quà, thiệp, số lượng (giảm theo bậc), in logo, ngày giao, tổng tiền, đặt hàng ──
  var pdp = $('[data-product]');
  if (!pdp) return;
  var form = pdp.querySelector('form[data-compose]');
  var money = fmtFor(pdp.getAttribute('data-currency'), pdp.getAttribute('data-lang'));
  var fee = +pdp.getAttribute('data-fee') || 0;
  var free = pdp.getAttribute('data-free') ? +pdp.getAttribute('data-free') : null;
  var tiers = []; try { tiers = JSON.parse(pdp.getAttribute('data-tiers') || '[]'); } catch (e) { tiers = []; }
  var logoFee = +pdp.getAttribute('data-logo') || 0, logoMin = +pdp.getAttribute('data-logo-min') || 0;
  var picked1 = function (name) { return form.querySelector('input[name="' + name + '"]:checked') || form.querySelector('input[name="' + name + '"][type="hidden"]'); };
  var freeWord = $('[data-s-wrap]', form).textContent;
  var logoErr = $('[data-logo-err]', form);
  var calc = function () {
    var v = picked1('variant'), w = picked1('wrap');
    var qty = Math.max(1, Math.min(999, parseInt(form.querySelector('[name="qty"]').value, 10) || 1));
    var item = (+(v && v.getAttribute('data-price')) || 0) * qty;
    var holds = +(w && w.getAttribute('data-holds')) || 1;
    var nbox = Math.ceil(qty / holds);
    var wrap = (+(w && w.getAttribute('data-price')) || 0) * nbox;
    var tier = tiers.filter(function (x) { return qty >= x.min; }).pop();
    var nextT = tiers.filter(function (x) { return qty < x.min; })[0];
    var disc = tier ? Math.round((item + wrap) * tier.pct) / 100 : 0;
    var logoBox = form.querySelector('[name="logo"]');
    var logo = logoBox && logoBox.checked ? logoFee * qty : 0;
    var sub = item + wrap - disc + logo;
    var ship = free != null && sub >= free ? 0 : fee;
    var unit = $('[data-unit]', pdp), ul = $('[data-unit-label]', pdp);
    if (unit && v && v.getAttribute('data-money')) unit.textContent = v.getAttribute('data-money');
    if (ul && v && v.getAttribute('data-label')) ul.textContent = v.getAttribute('data-label');
    $('[data-s-gift]', form).textContent = money(item) + (qty > 1 ? ' (×' + qty + ')' : '');
    $('[data-s-wrap]', form).textContent = wrap ? money(wrap) + (nbox > 1 ? ' (×' + nbox + ')' : '') : freeWord;
    $('[data-s-disc-row]', form).hidden = !disc;
    if (disc) $('[data-s-disc]', form).textContent = '−' + money(disc) + ' (' + tier.pct + '%)';
    $('[data-s-logo-row]', form).hidden = !logo;
    if (logo) $('[data-s-logo]', form).textContent = money(logo);
    $('[data-s-ship]', form).textContent = ship ? money(ship) : freeWord;
    $('[data-s-total]', form).textContent = money(sub + ship);
    var tn = $('[data-tier-note]', form);
    if (tn) {
      var s = tier ? pdp.getAttribute('data-tier-tpl').replace('{pct}', tier.pct).replace('{n}', qty) : '';
      if (nextT) s += (s ? ' · ' : '') + pdp.getAttribute('data-next-tpl').replace('{n}', nextT.min).replace('{pct}', nextT.pct).replace('{k}', nextT.min - qty);
      tn.textContent = s; tn.classList.toggle('is-on', !!tier);
    }
    var short = logo && logoMin && qty < logoMin;
    if (logoErr) { logoErr.hidden = !short; if (short) logoErr.textContent = pdp.getAttribute('data-logo-tpl').replace('{n}', logoMin); }
    var hint = $('[data-free-hint]', form);
    if (hint) hint.textContent = ship ? hint.getAttribute('data-tpl').replace('{a}', money(free - sub)) : hint.getAttribute('data-ok');
    return { total: sub + ship, qty: qty, short: short, logo: !!logo, tier: tier };
  };
  form.addEventListener('change', calc);
  form.addEventListener('input', function (e) { if (e.target.name === 'qty') calc(); });
  var msgBox = form.querySelector('[name="message"]'), chars = $('[data-chars]', form);
  if (msgBox && chars) msgBox.addEventListener('input', function () { chars.textContent = msgBox.value.length + ' / ' + msgBox.getAttribute('data-count-max'); });
  setDates(form.querySelector('[data-date]'), toMin(pdp.getAttribute('data-cutoff')), $('[data-date-note]', form));
  calc();

  wireSubmit(form, {
    button: form.querySelector('[data-order-submit]'),
    before: function () { if (calc().short) { logoErr.scrollIntoView({ block: 'center' }); return false; } },
    order: function () {
      var d = new FormData(form), get = function (k) { return (d.get(k) || '').toString().trim(); }, s = calc();
      var extra = [s.logo ? '🏷 logo' : '', s.tier ? '−' + s.tier.pct + '%' : ''].filter(Boolean).join(', ');
      return {
        name: get('name'), phone: get('phone'), qty: String(s.qty), address: get('address'), product: pdp.getAttribute('data-name'),
        version: get('variant') || '—', size: get('wrap') || '—', message: get('message') || '—', date: get('date'),
        note: [get('message') ? '💌 ' + get('message') : '', extra, get('note')].filter(Boolean).join(' · '),
        price: money(s.total), page: location.href.split('#')[0], market: pdp.getAttribute('data-market'), website: get('website'),
      };
    },
    text: function (o) { return pdp.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); },
    valid: function () { return required(form, ['name', 'phone', 'address', 'date'], form.querySelector('[data-err]')); },
    hide: function () { return [form.querySelector('.order-fields')]; },
  });
  var edit = form.querySelector('[data-edit]');
  if (edit) edit.addEventListener('click', function () { form.querySelector('[data-done]').hidden = true; form.querySelector('.order-fields').hidden = false; });
  var dock = $('.dock .primary');
  if (dock) dock.addEventListener('click', function (e) { e.preventDefault(); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
})();
