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

// Mẫu Quán ramen: lọc thực đơn (loại món, nước dùng, chế độ ăn, cay, tìm không dấu, sắp xếp giá), ô số lượng + cỡ trên thẻ, "Thêm vào đơn" → danh sách
// lưu trong localStorage; đầu trang: ước tính thời gian xếp hàng theo thứ + giờ (site.busy × hệ số cuối tuần), giờ vắng gần nhất, cột biểu đồ;
// phần Đơn mang về: sửa số lượng, xóa, combo tự giảm (mỗi bộ đủ mì + món phụ + đồ uống), cảnh báo món có chất khách cần tránh;
// form gửi Google Form hoặc tin nhắn. Tab nước dùng, album. Không JS thì trang vẫn đủ nội dung. Thử: ?today=YYYY-MM-DD&hour=HH.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var fold = function (s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); };
  var form = $('[data-book-form]');
  var cur = form ? form.getAttribute('data-currency') : 'VND';
  var lang = (form && form.getAttribute('data-lang')) || 'en';
  var money = function (n) { n = Math.round(n * 100) / 100; return new Intl.NumberFormat(lang, { style: 'currency', currency: cur, maximumFractionDigits: n % 1 ? 2 : 0, minimumFractionDigits: n % 1 ? 2 : 0 }).format(n); };
  var dataEl = $('#kp-items');
  var ITEMS = dataEl ? JSON.parse(dataEl.textContent) : [];
  var find = function (id) { return ITEMS.filter(function (x) { return x.id === id; })[0]; };

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

  // ── Báo giá (lưu trong trình duyệt) ──
  var KEY = body.getAttribute('data-store') || 'kp-dive';
  var quote = [];
  try { quote = JSON.parse(localStorage.getItem(KEY) || '[]').filter(function (x) { return find(x.id); }); } catch (e) { quote = []; }
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(quote)); } catch (e) { /* trình duyệt chặn lưu: vẫn dùng được trong trang */ } };
  var add = function (id, v, q) {
    var it = find(id); if (!it) return;
    q = Math.max(it.min || 1, Math.round(+q || 0));
    var row = quote.filter(function (x) { return x.id === id && x.v === v; })[0];
    if (row) row.q = q; else quote.push({ id: id, v: v, q: q });
    save(); renderQuote();
  };

  // ── Bộ lọc ──
  var grid = $('[data-grid]');
  if (grid) {
    var cards = $$('.card', grid);
    var ff = $('[data-filter-form]');
    var countEl = $('[data-res-count]'), empty = $('[data-empty]'), fcount = $('[data-fcount]'), sortEl = $('[data-sort]');
    var filters = $('[data-filters]');
    if (filters && window.matchMedia('(max-width: 900px)').matches) filters.open = false;
    var apply = function () {
      var d = new FormData(ff);
      var want = { cat: d.getAll('cat'), unit: d.getAll('unit'), fit: d.getAll('fit') };
      var rec = d.get('rec'), q = fold(d.get('q')).trim();
      var n = 0;
      cards.forEach(function (c) {
        var ok = (!want.cat.length || want.cat.indexOf(c.getAttribute('data-cat')) >= 0)
          && (!want.unit.length || want.unit.indexOf(c.getAttribute('data-unit')) >= 0)
          && (!want.fit.length || want.fit.some(function (f) { return (' ' + c.getAttribute('data-fit') + ' ').indexOf(' ' + f + ' ') >= 0; }))
          && (!rec || c.getAttribute('data-rec') === '1')
          && (!q || fold(c.getAttribute('data-name')).indexOf(q) >= 0);
        c.hidden = !ok; if (ok) n++;
      });
      var s = sortEl.value;
      cards.slice().sort(function (a, b) { return s === 'asc' ? a.getAttribute('data-from') - b.getAttribute('data-from') : s === 'desc' ? b.getAttribute('data-from') - a.getAttribute('data-from') : a.getAttribute('data-i') - b.getAttribute('data-i'); })
        .forEach(function (c) { grid.appendChild(c); });
      countEl.textContent = countEl.getAttribute('data-tpl').replace('{n}', n);
      empty.hidden = n > 0;
      var active = want.cat.length + want.unit.length + want.fit.length + (rec ? 1 : 0) + (q ? 1 : 0);
      fcount.hidden = !active; fcount.textContent = active;
    };
    ff.addEventListener('input', apply);
    ff.addEventListener('change', apply);
    ff.addEventListener('reset', function () { setTimeout(apply, 0); });
    sortEl.addEventListener('change', apply);
    // Link ?type=<danh mục> để chia sẻ một nhóm dịch vụ.
    var pre = new URLSearchParams(location.search).get('type');
    if (pre) $$('input[name="cat"]', ff).forEach(function (i) { if (i.value === pre) i.checked = true; });
    apply();

    // Thẻ: lựa chọn, số lượng, thêm vào báo giá.
    $$('.buy-row', grid).forEach(function (row) {
      var id = row.getAttribute('data-item'), it = find(id), qty = $('[data-qty]', row), sel = $('[data-var]', row), out = $('[data-price-out]', row);
      var stepBy = 1;
      var tpl = out.getAttribute('data-tpl');
      if (sel) sel.addEventListener('change', function () { out.textContent = tpl.replace('{price}', money(it.v[+sel.value].p)); });
      $$('[data-step]', row).forEach(function (b) {
        b.addEventListener('click', function () { qty.value = Math.max(it.min || 1, (+qty.value || 0) + stepBy * +b.getAttribute('data-step')); });
      });
      var us = qty.nextElementSibling;
      var plural = function () { if (us && us.hasAttribute('data-u1')) us.textContent = us.getAttribute(+qty.value === 1 ? 'data-u1' : 'data-un'); };
      qty.addEventListener('change', function () { qty.value = Math.max(it.min || 1, Math.round(+qty.value || 0)); plural(); });
      row.addEventListener('click', function (e) { if (e.target.closest('[data-step]')) plural(); });
      var btn = $('[data-add]', row), lab = $('[data-add-label]', row), orig = lab.textContent;
      btn.addEventListener('click', function () {
        add(id, sel ? +sel.value : 0, qty.value);
        lab.textContent = lab.getAttribute('data-added');
        btn.classList.add('is-added');
        setTimeout(function () { lab.textContent = orig; btn.classList.remove('is-added'); }, 1800);
      });
    });
  }

  // ── Ước tính thời gian xếp hàng ──
  var wf = $('[data-wait]');
  var todayISO = (function () {
    var q = /[?&]today=(\d{4}-\d{2}-\d{2})/.exec(location.search); if (q) return q[1];
    var o = {}; new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { o[x.type] = x.value; });
    return o.year + '-' + o.month + '-' + o.day;
  })();
  if (wf) {
    var WL = JSON.parse(wf.getAttribute('data-l')), BUSY = JSON.parse(wf.getAttribute('data-busy')), WK = +wf.getAttribute('data-weekend') || 1;
    var wd = $('[data-w-day]', wf), wh = $('[data-w-hour]', wf);
    var HRS = Object.keys(BUSY).sort();
    // Phút chờ: số của ngày thường, thứ 7 và CN nhân hệ số; làm tròn 5 phút.
    var mins = function (d, h) { var m = +BUSY[h] || 0; if (d === 0 || d === 6) m *= WK; return Math.round(m / 5) * 5; };
    wd.value = String(new Date(todayISO + 'T12:00:00Z').getUTCDay());
    var hq = /[?&]hour=(\d{1,2})/.exec(location.search);
    var nowH = hq ? ('0' + hq[1]).slice(-2) : new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hourCycle: 'h23' }).format(new Date());
    if (HRS.indexOf(nowH) >= 0) wh.value = nowH;
    var wrun = function () {
      var d = +wd.value, h = wh.value, m = mins(d, h);
      $('[data-w-out]', wf).textContent = m <= 5 ? WL.none : WL.wait.replace('{n}', m);
      // Giờ vắng nhất trong ngày đó (ưu tiên giờ gần giờ đã chọn).
      var best = null;
      HRS.forEach(function (x) { if (x === h) return; var v = mins(d, x); if (v < m && (!best || v < best.v || (v === best.v && Math.abs(+x - +h) < Math.abs(+best.h - +h)))) best = { h: x, v: v }; });
      $('[data-w-calm]', wf).textContent = !best ? '' : (best.v <= 5 ? WL.calmFree : WL.calm).replace('{h}', best.h + ':00').replace('{n}', best.v);
      var max = Math.max.apply(null, HRS.map(function (x) { return mins(d, x); })) || 1;
      $$('[data-w-bars] i', wf).forEach(function (i) { var x = i.getAttribute('data-h'); i.firstChild.style.height = Math.max(6, Math.round(mins(d, x) / max * 100)) + '%'; i.className = x === h ? 'on' : ''; });
      wf.className = 'quick ' + (m <= 5 ? 'is-ok' : m >= 25 ? 'is-wait' : '');
    };
    wf.addEventListener('change', wrun); wrun();
  }

  // ── Phần Báo giá ──
  var list = $('[data-q-items]'), qEmpty = $('[data-q-empty]');
  var COMBO = form ? +form.getAttribute('data-combo') || 0 : 0;
  var totals = function () {
    var sub = 0, cnt = { main: 0, side: 0, drink: 0 };
    quote.forEach(function (x) { var it = find(x.id); sub += it.v[x.v].p * x.q; if (cnt[it.role] != null) cnt[it.role] += x.q; });
    // Combo: mỗi bộ đủ 1 món chính + 1 món phụ + 1 đồ uống được trừ COMBO.
    var sets = COMBO ? Math.min(cnt.main, cnt.side, cnt.drink) : 0;
    var miss = cnt.main > sets ? ['side', 'drink'].filter(function (r) { return cnt[r] <= sets; }) : [];
    var peak = 0;
    var disc = sets * COMBO;
    var after = sub + peak - disc;
    var min = form ? +form.getAttribute('data-min-order') || 0 : 0;
    var minFee = quote.length && min > after ? min - after : 0;
    return { sub: sub, peak: peak, disc: disc, minFee: minFee, total: after + minFee, sets: sets, miss: miss };
  };
  var renderQuote = function () {
    if (!list) return;
    list.innerHTML = quote.map(function (x, i) {
      var it = find(x.id), v = it.v[x.v];
      return '<li><div><b>' + esc(it.name) + '</b>' + (it.v.length > 1 ? '<small>' + esc(v.label) + '</small>' : '') + '<small>' + money(v.p) + ' / ' + esc(it.u) + '</small></div>'
        + '<label class="q-qty"><input type="number" inputmode="numeric" min="' + (it.min || 1) + '" value="' + x.q + '" data-q-i="' + i + '" aria-label="' + esc(it.u) + '"><span>' + esc(x.q == 1 ? it.u : it.un) + '</span></label>'
        + '<b class="q-line">' + money(v.p * x.q) + '</b><button type="button" class="q-x" data-q-del="' + i + '" aria-label="×">✕</button></li>';
    }).join('');
    qEmpty.hidden = quote.length > 0;
    var s = totals();
    $('[data-sum-sub]').textContent = money(s.sub);
    $('[data-sum-off-row]').hidden = !s.disc; $('[data-sum-off]').textContent = '−' + money(s.disc);
    $('[data-sum-min-row]').hidden = !s.minFee; $('[data-sum-min]').textContent = '+' + money(s.minFee);
    $('[data-sum-total]').textContent = money(s.total);
    var ph = $('[data-pack-hint]');
    if (ph) { var RN = JSON.parse(ph.getAttribute('data-roles') || '{}'); ph.textContent = s.miss.length ? ph.getAttribute('data-tpl').replace('{list}', s.miss.map(function (r) { return RN[r] || r; }).join(' + ')).replace('{p}', money(COMBO)) : ''; ph.hidden = !s.miss.length; }
    certCheck();
    var n = quote.length;
    $$('[data-count]').forEach(function (c) { c.hidden = !n; c.textContent = n; });
  };
  // Khách tick chất cần tránh → cảnh báo các món trong đơn có chất đó.
  function certCheck() {
    var w = $('[data-cert-warn]'); if (!w || !form) return;
    var av = $$('[name="avoid"]:checked', form).map(function (c) { return c.value; });
    var bad = quote.map(function (x) { return find(x.id); }).filter(function (it) { return it.al.some(function (a) { return av.indexOf(a) >= 0; }); }).map(function (it) { return it.name; });
    w.hidden = !bad.length; if (bad.length) w.textContent = w.getAttribute('data-tpl').replace('{list}', bad.join(', '));
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  if (list) {
    list.addEventListener('change', function (e) {
      var i = e.target.getAttribute('data-q-i'); if (i == null) return;
      var x = quote[+i], it = find(x.id);
      x.q = Math.max(it.min || 1, Math.round(+e.target.value || 0)); save(); renderQuote();
    });
    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-q-del]'); if (!b) return;
      quote.splice(+b.getAttribute('data-q-del'), 1); save(); renderQuote();
    });
    if (form) form.addEventListener('change', function (e) { if (e.target.name === 'avoid') certCheck(); });
    renderQuote();
  }

  // ── Dọn gì trong từng phòng ──
  var rooms = $('[data-rooms]');
  if (rooms) {
    var tabs = $$('[data-room]', rooms), panels = $$('[data-panel]', rooms);
    var show = function (i) {
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach(function (p, k) { p.hidden = k !== i; });
    };
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { show(k); });
      t.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = (k + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; show(n); tabs[n].focus(); } });
    });
    show(0);
  }

  // ── Album ──
  var albumEl = $('[data-album]');
  if (albumEl) {
    var more = $('[data-album-more]');
    var extra = $$('.is-more', albumEl);
    extra.forEach(function (li) { li.hidden = true; });
    if (more) { more.hidden = false; more.addEventListener('click', function () { extra.forEach(function (li) { li.hidden = false; }); more.hidden = true; }); }
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var links = $$('a[data-zoom]', albumEl), img = $('[data-lb-img]', lb), at = 0;
      var open = function (i) { at = (i + links.length) % links.length; img.src = links[at].getAttribute('href'); };
      albumEl.addEventListener('click', function (e) { var a = e.target.closest('a[data-zoom]'); if (!a) return; e.preventDefault(); open(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { open(at + +b.getAttribute('data-lb-step')); }); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(at + 1); if (e.key === 'ArrowLeft') open(at - 1); });
    }
  }

  // ── Đặt lịch ──
  if (!form) return;
  var p = {};
  if (/[?&]today=/.test(location.search)) { var tt = todayISO.split('-'); p = { year: tt[0], month: tt[1], day: tt[2] }; } else new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  var iso = function (y, m, d) { return new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10); };
  var lead = +form.getAttribute('data-lead') || 0;
  var dateEl = $('[data-date]', form);
  dateEl.min = iso(+p.year, +p.month, +p.day + lead);
  dateEl.max = iso(+p.year, +p.month + 3, +p.day);
  if (!dateEl.value) dateEl.value = dateEl.min;
  // Lấy món trong hôm nay: ẩn giờ đã qua (cần ít nhất 20 phút để nấu); không còn giờ nào thì chuyển sang ngày mai.
  var slotEl = form.querySelector('[name="slot"]');
  var nowMin = (function () { var hq = /[?&]hour=(\d{1,2})/.exec(location.search); if (hq) return +hq[1] * 60; var o = {}; new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).forEach(function (x) { o[x.type] = x.value; }); return +o.hour * 60 + +o.minute; })();
  var slotsFit = function () {
    if (!slotEl) return;
    var today = dateEl.value === dateEl.min && !lead, firstOk = null;
    Array.prototype.forEach.call(slotEl.options, function (o) { var m = o.value.split(':'); var past = today && +m[0] * 60 + +m[1] < nowMin + 20; o.disabled = past; o.hidden = past; if (!past && firstOk == null) firstOk = o.value; });
    if (firstOk == null && today) { dateEl.value = iso(+p.year, +p.month, +p.day + 1); slotsFit(); return; }
    if (slotEl.options[slotEl.selectedIndex].disabled && firstOk) slotEl.value = firstOk;
  };
  form.addEventListener('change', function (e) { if (e.target === dateEl) { if (dateEl.value < dateEl.min) dateEl.value = dateEl.min; slotsFit(); } });
  slotsFit();

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = totals();
    return {
      name: get('name'), phone: get('phone'), address: '',
      product: quote.map(function (x) { var it = find(x.id), v = it.v[x.v]; return it.name + (it.v.length > 1 ? ' (' + v.label + ')' : '') + ' ' + x.q + ' ' + (x.q == 1 ? it.u : it.un); }).join('; '),
      qty: String(quote.length), version: s.sets ? form.getAttribute('data-combo-label') + ' ' + s.sets + ' × −' + money(COMBO) : '',
      size: [get('last'), $$('[name="avoid"]:checked', form).map(function (c) { return c.parentNode.textContent.trim(); }).join(', ')].filter(Boolean).join(' · '), date: [get('date'), get('slot')].filter(Boolean).join(' '),
      note: [d.getAll('extra').join(', '), get('note')].filter(Boolean).join(' · '), price: money(s.total),
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'date'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      var v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 7 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) ok = false;
    });
    err.textContent = err.getAttribute('data-req-msg');
    if (ok && !quote.length) { ok = false; err.textContent = err.getAttribute('data-empty-msg'); err.hidden = false; return false; }
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
      box.hidden = false;
      box.focus();
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
    var b = channel;
    channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.product);
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; });
})();
