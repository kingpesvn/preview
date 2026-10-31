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

// Mẫu Ngũ kim, dụng cụ: tra mã (gợi ý tức thì theo mã hàng, tên, quy cách — không phân biệt dấu), lọc lưới (danh mục, tìm, còn hàng, sắp giá,
// ?type= / ?q=, "Xem thêm"), thư viện ảnh trang sản phẩm, chọn quy cách → giá, bậc giá theo số lượng, thành tiền, gợi ý "mua thêm n để giảm x%",
// giỏ báo giá dùng chung mọi trang (localStorage, bọc try/catch), phí giao, gửi Google Form hoặc tin nhắn soạn sẵn. Không có JS trang vẫn đủ nội dung.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fold = function (s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); };
  var cur = body.getAttribute('data-currency') || 'VND';
  var fmt = new Intl.NumberFormat(body.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (n) { return fmt.format(Math.round(n * 100) / 100); };
  var ITEMS = [];
  try { ITEMS = JSON.parse($('#kp-items').textContent); } catch (e) { ITEMS = []; }
  var find = function (id) { return ITEMS.filter(function (x) { return x.id === id; })[0]; };
  // Giá một đơn vị sau bậc giảm theo số lượng.
  var tierOff = function (it, q) { var off = 0; (it.t || []).forEach(function (x) { if (q >= x[0]) off = x[1]; }); return off; };
  var unitPrice = function (it, v, q) { return Math.round(it.v[v].p * (100 - tierOff(it, q))) / 100; };

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

  // ── Tra mã: gợi ý tức thì ──
  var lk = $('[data-lookup]');
  if (lk) {
    var inp = $('[data-lookup-input]', lk), list = $('[data-lookup-list]', lk);
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var run = function () {
      var q = fold(inp.value).trim();
      if (q.length < 2) { list.hidden = true; return; }
      var hits = [];
      ITEMS.forEach(function (it) {
        it.v.forEach(function (v, i) {
          var hay = fold(it.n + ' ' + v.s + ' ' + v.l);
          if (q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; })) hits.push({ it: it, v: v, i: i });
        });
      });
      list.innerHTML = hits.slice(0, 8).map(function (h) {
        return '<li><a href="' + h.it.href + '?v=' + h.i + '"><img src="' + h.it.img + '" alt="" width="44" height="44"><span><b>' + esc(h.it.n) + (h.v.l ? ' · ' + esc(h.v.l) : '') + '</b><small class="mono">' + esc(h.v.s) + '</small></span><em>' + money(h.v.p) + '</em></a></li>';
      }).join('') || '<li class="none">—</li>';
      list.hidden = false;
    };
    inp.addEventListener('input', run);
    inp.addEventListener('focus', run);
    document.addEventListener('click', function (e) { if (!lk.contains(e.target)) list.hidden = true; });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') list.hidden = true;
      if (e.key === 'ArrowDown') { var a = list.querySelector('a'); if (a) { e.preventDefault(); a.focus(); } }
    });
    list.addEventListener('keydown', function (e) {
      var links = $$('a', list), i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' && links[i + 1]) { e.preventDefault(); links[i + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); (links[i - 1] || inp).focus(); }
    });
  }

  // ── Lọc lưới ──
  var grid = $('[data-grid]');
  if (grid) {
    var cards = $$('.card', grid);
    var state = { type: '', q: '', stock: false, sort: '', all: false };
    var params = new URLSearchParams(location.search);
    state.type = params.get('type') || '';
    state.q = params.get('q') || '';
    var search = $('[data-search]'), stockEl = $('[data-instock]'), sortEl = $('[data-sort]'), more = $('[data-more]'), empty = $('[data-empty]'), countEl = $('[data-count-text]');
    if (search) search.value = state.q;
    if (lk && state.q) $('[data-lookup-input]', lk).value = state.q;
    var apply = function () {
      var q = fold(state.q).trim().split(/\s+/).filter(Boolean), n = 0;
      cards.forEach(function (c) {
        var ok = (!state.type || c.getAttribute('data-type') === state.type) && (!state.stock || c.getAttribute('data-stock') === 'in')
          && q.every(function (w) { return c.getAttribute('data-name').indexOf(w) >= 0; });
        c.classList.toggle('is-out', !ok);
        if (ok) n++;
      });
      var shown = cards.filter(function (c) { return !c.classList.contains('is-out'); });
      if (state.sort) shown.sort(function (a, b) { return (state.sort === 'asc' ? 1 : -1) * (a.getAttribute('data-price') - b.getAttribute('data-price')); });
      shown.forEach(function (c) { grid.appendChild(c); });
      cards.filter(function (c) { return c.classList.contains('is-out'); }).forEach(function (c) { grid.appendChild(c); });
      var filtered = state.type || q.length || state.stock;
      shown.forEach(function (c, i) { c.hidden = !state.all && !filtered && i >= 24; });
      cards.forEach(function (c) { if (c.classList.contains('is-out')) c.hidden = true; });
      if (more) more.hidden = state.all || filtered || shown.length <= 24;
      empty.hidden = n > 0;
      if (countEl) countEl.textContent = countEl.getAttribute('data-count-text').replace('{n}', n);
      $$('.pill[data-type]').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-type') === state.type); });
    };
    $$('.pill[data-type]').forEach(function (b) { b.addEventListener('click', function () { state.type = b.getAttribute('data-type'); apply(); }); });
    $$('[data-cat-link]').forEach(function (a) { a.addEventListener('click', function () { state.type = a.getAttribute('data-cat-link'); apply(); }); });
    if (search) search.addEventListener('input', function () { state.q = search.value; apply(); });
    if (stockEl) stockEl.addEventListener('change', function () { state.stock = stockEl.checked; apply(); });
    if (sortEl) sortEl.addEventListener('change', function () { state.sort = sortEl.value; apply(); });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    if (lk) lk.addEventListener('submit', function (e) { e.preventDefault(); state.q = $('[data-lookup-input]', lk).value; if (search) search.value = state.q; state.type = ''; apply(); $('#shop').scrollIntoView({ behavior: 'smooth' }); $('[data-lookup-list]', lk).hidden = true; });
    apply();
  }

  // ── Thư viện ảnh ──
  var gal = $('[data-gallery]');
  if (gal) {
    var track = gal.querySelector('.g-track');
    var slides = track.children;
    var gn = slides.length, gi = 0;
    var thumbs = gal.querySelectorAll('[data-go]');
    var num = gal.querySelector('[data-g-i]');
    var prev = gal.querySelector('.g-prev'), next = gal.querySelector('.g-next');
    var gshow = function (i) { gi = i; num.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === gn - 1;
      Array.prototype.forEach.call(thumbs, function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); };
    var go = function (i) { i = Math.max(0, Math.min(gn - 1, i)); track.scrollTo({ left: i * track.clientWidth }); gshow(i); };
    var t0;
    track.addEventListener('scroll', function () { clearTimeout(t0); t0 = setTimeout(function () { var i = Math.round(track.scrollLeft / track.clientWidth); if (i !== gi) gshow(i); }, 60); });
    $$('[data-step]', gal).forEach(function (b) { b.addEventListener('click', function () { go(gi + +b.getAttribute('data-step')); }); });
    Array.prototype.forEach.call(thumbs, function (a) { a.addEventListener('click', function (e) { e.preventDefault(); go(+a.getAttribute('data-go')); }); });
    gshow(0);
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = lb.querySelector('[data-lb-img]'), lbNum = lb.querySelector('[data-lb-i]');
      var srcs = Array.prototype.map.call(slides, function (li) { return li.querySelector('a').getAttribute('href'); });
      var at = 0;
      var open = function (i) { at = (i + gn) % gn; img.src = srcs[at]; lbNum.textContent = at + 1; };
      track.addEventListener('click', function (e) { var a = e.target.closest('[data-zoom]'); if (!a) return; e.preventDefault(); open(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { open(at + +b.getAttribute('data-lb-step')); }); });
      lb.querySelector('[data-lb-close]').addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('close', function () { go(at); });
    }
  }

  // ── Giỏ báo giá ──
  var KEY = body.getAttribute('data-store') || 'kp-hw';
  var quote = [];
  try { quote = JSON.parse(localStorage.getItem(KEY) || '[]').filter(function (x) { var it = find(x.id); return it && it.v[x.v]; }); } catch (e) { quote = []; }
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(quote)); } catch (e) { /* trình duyệt chặn lưu */ } };
  var dlg = $('[data-quote]');
  var list2 = $('[data-q-items]'), qEmpty = $('[data-q-empty]');
  var shipEl = $('[data-q-ship]');
  var deliver = function () { var r = $('[name="how"]:checked'); return r && r.hasAttribute('data-deliver'); };
  var totals = function () {
    var sub = 0, full = 0;
    quote.forEach(function (x) { var it = find(x.id); sub += unitPrice(it, x.v, x.q) * x.q; full += it.v[x.v].p * x.q; });
    var fee = +shipEl.getAttribute('data-fee') || 0, free = shipEl.getAttribute('data-free') ? +shipEl.getAttribute('data-free') : null;
    var ship = !deliver() || !quote.length ? 0 : free != null && sub >= free ? 0 : fee;
    return { sub: sub, save: full - sub, ship: ship, total: sub + ship };
  };
  var escH = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var render = function () {
    if (!list2) return;
    list2.innerHTML = quote.map(function (x, i) {
      var it = find(x.id), v = it.v[x.v], off = tierOff(it, x.q);
      return '<li><img src="' + it.img + '" alt="" width="56" height="56"><div><a href="' + it.href + '"><b>' + escH(it.n) + '</b></a><small>' + escH([v.l, v.s].filter(Boolean).join(' · ')) + '</small>'
        + '<small>' + money(unitPrice(it, x.v, x.q)) + (it.u ? ' / ' + escH(it.u) : '') + (off ? ' <em>−' + off + '%</em>' : '') + '</small></div>'
        + '<input type="number" min="1" value="' + x.q + '" inputmode="numeric" data-q-i="' + i + '" aria-label="' + escH(it.n) + '">'
        + '<b class="q-line">' + money(unitPrice(it, x.v, x.q) * x.q) + '</b><button type="button" class="q-x" data-q-del="' + i + '" aria-label="×">✕</button></li>';
    }).join('');
    qEmpty.hidden = quote.length > 0;
    var s = totals();
    $('[data-q-sub]').textContent = money(s.sub);
    $('[data-q-save-row]').hidden = !(s.save > 0.009); $('[data-q-save]').textContent = '−' + money(s.save);
    shipEl.textContent = !deliver() ? '—' : s.ship ? money(s.ship) : shipEl.getAttribute('data-free-label');
    $('[data-q-total]').textContent = money(s.total);
    $$('[data-count]').forEach(function (c) { c.hidden = !quote.length; c.textContent = quote.length; });
  };
  var add = function (id, v, q) {
    q = Math.max(1, Math.round(+q || 1));
    var row = quote.filter(function (x) { return x.id === id && x.v === v; })[0];
    if (row) row.q += q; else quote.push({ id: id, v: v, q: q });
    save(); render();
  };
  if (dlg) {
    $$('[data-open-quote]').forEach(function (b) { b.addEventListener('click', function () { render(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }); });
    $('[data-close-quote]', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    list2.addEventListener('change', function (e) { var i = e.target.getAttribute('data-q-i'); if (i == null) return; quote[+i].q = Math.max(1, Math.round(+e.target.value || 1)); save(); render(); });
    list2.addEventListener('click', function (e) { var b = e.target.closest('[data-q-del]'); if (!b) return; quote.splice(+b.getAttribute('data-q-del'), 1); save(); render(); });
    $$('[name="how"]').forEach(function (r) { r.addEventListener('change', function () { $('[data-addr]').hidden = !deliver(); render(); }); });
    render();
  }

  // ── Trang sản phẩm: quy cách, bậc giá, số lượng ──
  var box = $('[data-buybox]');
  if (box) {
    var it = find($('[data-product]').getAttribute('data-product'));
    var qty = $('[data-qty]', box), line = $('[data-line]', box), nextEl = $('[data-next]', box), unitEl = $('[data-unit-price]');
    var vIdx = function () { var r = box.querySelector('[name="v"]:checked') || box.querySelector('[name="v"]'); return +r.value || 0; };
    var pre = new URLSearchParams(location.search).get('v');
    if (pre != null) { var r0 = box.querySelector('[name="v"][value="' + pre + '"]'); if (r0) r0.checked = true; }
    var calc = function () {
      var v = vIdx(), q = Math.max(1, Math.round(+qty.value || 1)), off = tierOff(it, q);
      unitEl.textContent = money(it.v[v].p);
      $$('[data-tier-price]', box).forEach(function (b) { b.textContent = money(Math.round(it.v[v].p * (100 - +b.getAttribute('data-tier-price'))) / 100); });
      $$('[data-ptiers] li', box).forEach(function (li) { var m = +li.getAttribute('data-min'); var nx = (it.t || []).filter(function (x) { return x[0] > m; })[0]; li.classList.toggle('is-on', q >= m && (!nx || q < nx[0])); });
      line.textContent = money(unitPrice(it, v, q) * q);
      var nx = (it.t || []).filter(function (x) { return x[0] > q; })[0];
      nextEl.hidden = !nx;
      if (nx) nextEl.textContent = nextEl.getAttribute('data-tpl').replace('{n}', nx[0] - q).replace('{off}', nx[1]);
    };
    $$('[data-step]', box).forEach(function (b) { b.addEventListener('click', function () { qty.value = Math.max(1, (+qty.value || 1) + +b.getAttribute('data-step')); calc(); }); });
    box.addEventListener('input', calc);
    box.addEventListener('change', calc);
    calc();
    var addBtn = $('[data-add]', box), lab = $('[data-add-label]', box), orig = lab.textContent;
    addBtn.addEventListener('click', function () {
      add(it.id, vIdx(), qty.value);
      lab.textContent = lab.getAttribute('data-added');
      setTimeout(function () { lab.textContent = orig; }, 1800);
    });
  }

  // ── Gửi báo giá ──
  var form = $('[data-quote-form]');
  if (!form) return;
  var dateEl = $('[data-date]', form);
  if (dateEl) { var p = {}; new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; }); dateEl.min = p.year + '-' + p.month + '-' + p.day; }
  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = totals();
    return {
      name: get('name'), phone: get('phone'), address: deliver() ? get('address') : get('how'), date: get('date'),
      product: quote.map(function (x) { var it = find(x.id), v = it.v[x.v]; return it.n + (v.l ? ' ' + v.l : '') + (v.s ? ' [' + v.s + ']' : '') + ' × ' + x.q + (it.u ? ' ' + it.u : '') + ' = ' + money(unitPrice(it, x.v, x.q) * x.q); }).join('; '),
      qty: String(quote.reduce(function (a, x) { return a + x.q; }, 0)), size: get('company'),
      note: [get('invoice') ? form.querySelector('[name="invoice"]').parentNode.textContent.trim() : '', get('note')].filter(Boolean).join(' · '),
      price: money(s.total) + (s.ship ? ' (' + money(s.ship) + ')' : ''), page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true, need = ['name', 'phone'].concat(deliver() ? ['address'] : []);
    need.forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
    err.textContent = err.getAttribute('data-req');
    if (ok && !quote.length) { err.textContent = err.getAttribute('data-none'); ok = false; err.hidden = false; return false; }
    err.hidden = ok;
    if (!ok) form.querySelector('[aria-invalid="true"]').focus();
    return ok;
  };
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0s = Date.now();
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var o = order();
    if (o.website || Date.now() - t0s < 2500) return;
    if (!channel && !valid()) return;
    var msg = text(o);
    var boxDone = $('[data-done]', form);
    var done = function () {
      $('.order-fields', form).hidden = true;
      boxDone.hidden = false; boxDone.focus();
      $$('button[data-channel]', boxDone).forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    if (!channel) {
      if (!gform) { done(); return; }
      var data = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], o[k] || ''); });
      var btn = $('[data-order-submit]', form);
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, function () {
        btn.disabled = false;
        var f = boxDone.querySelector('button[data-channel]');
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
