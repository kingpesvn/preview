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

// Mẫu Vệ sinh nhà cửa: lọc dịch vụ (loại, cách tính giá, loại nhà, định kỳ, tìm không dấu, sắp xếp giá), ô số lượng (m², giờ, cái) + lựa chọn trên thẻ,
// "Thêm vào báo giá" → danh sách lưu trong localStorage; báo giá nhanh theo diện tích ở đầu trang; phần Báo giá: sửa số lượng, xóa, giảm giá dọn định kỳ
// (chỉ trên dịch vụ có thể định kỳ), mức tối thiểu mỗi lần, tổng; form đặt lịch gửi Google Form hoặc tin nhắn soạn sẵn. Tab "dọn gì trong từng phòng", album.
// Không có JavaScript thì trang vẫn đủ nội dung (mọi thẻ hiện, giá mỗi đơn vị, nút nhắn tin).
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var fold = function (s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); };
  var form = $('[data-book-form]');
  var cur = form ? form.getAttribute('data-currency') : 'VND';
  var fmt = new Intl.NumberFormat((form && form.getAttribute('data-lang')) || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (n) { return fmt.format(Math.round(n * 100) / 100); };
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
  var KEY = body.getAttribute('data-store') || 'kp-clean';
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
      var stepBy = it && it.unit === 'area' ? 5 : 1;
      var tpl = out.getAttribute('data-tpl');
      if (sel) sel.addEventListener('change', function () { out.textContent = tpl.replace('{price}', money(it.v[+sel.value].p)); });
      $$('[data-step]', row).forEach(function (b) {
        b.addEventListener('click', function () { qty.value = Math.max(it.min || 1, (+qty.value || 0) + stepBy * +b.getAttribute('data-step')); });
      });
      qty.addEventListener('change', function () { qty.value = Math.max(it.min || 1, Math.round(+qty.value || 0)); });
      var btn = $('[data-add]', row), lab = $('[data-add-label]', row), orig = lab.textContent;
      btn.addEventListener('click', function () {
        add(id, sel ? +sel.value : 0, qty.value);
        lab.textContent = lab.getAttribute('data-added');
        btn.classList.add('is-added');
        setTimeout(function () { lab.textContent = orig; btn.classList.remove('is-added'); }, 1800);
      });
    });
  }

  // ── Báo giá nhanh ở đầu trang ──
  var quick = $('[data-quick]');
  if (quick) {
    var qs = $('[data-q-svc]', quick), qa = $('[data-q-area]', quick), qo = $('[data-q-out]', quick);
    var calcQ = function () {
      var o = qs.options[qs.selectedIndex], a = Math.max(+o.getAttribute('data-min') || 0, +qa.value || 0);
      qo.textContent = money(+o.getAttribute('data-price') * a);
    };
    qs.addEventListener('change', calcQ); qa.addEventListener('input', calcQ); calcQ();
    $('[data-q-add]', quick).addEventListener('click', function () {
      var p = qs.value.split('|');
      add(p[0], +p[1], qa.value);
      var home = $('[data-q-home]', quick), sel = form && form.querySelector('[name="home"]');
      if (home && sel) sel.selectedIndex = home.selectedIndex;
      var target = $('#quote'); if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Phần Báo giá ──
  var list = $('[data-q-items]'), qEmpty = $('[data-q-empty]');
  var totals = function () {
    var off = 0, sub = 0, recSub = 0;
    var f = document.querySelector('[name="freq"]:checked');
    if (f) off = +f.getAttribute('data-off') || 0;
    quote.forEach(function (x) { var it = find(x.id), line = it.v[x.v].p * x.q; sub += line; if (it.rec) recSub += line; });
    var disc = Math.round(recSub * off) / 100;
    var after = sub - disc;
    var min = form ? +form.getAttribute('data-min-order') || 0 : 0;
    var minFee = quote.length && min > after ? min - after : 0;
    return { sub: sub, disc: disc, minFee: minFee, total: after + minFee };
  };
  var renderQuote = function () {
    if (!list) return;
    list.innerHTML = quote.map(function (x, i) {
      var it = find(x.id), v = it.v[x.v];
      return '<li><div><b>' + esc(it.name) + '</b>' + (it.v.length > 1 ? '<small>' + esc(v.label) + '</small>' : '') + '<small>' + money(v.p) + ' / ' + esc(it.u) + '</small></div>'
        + '<label class="q-qty"><input type="number" inputmode="numeric" min="' + (it.min || 1) + '" value="' + x.q + '" data-q-i="' + i + '" aria-label="' + esc(it.u) + '"><span>' + esc(it.u) + '</span></label>'
        + '<b class="q-line">' + money(v.p * x.q) + '</b><button type="button" class="q-x" data-q-del="' + i + '" aria-label="×">✕</button></li>';
    }).join('');
    qEmpty.hidden = quote.length > 0;
    var s = totals();
    $('[data-sum-sub]').textContent = money(s.sub);
    $('[data-sum-off-row]').hidden = !s.disc; $('[data-sum-off]').textContent = '−' + money(s.disc);
    $('[data-sum-min-row]').hidden = !s.minFee; $('[data-sum-min]').textContent = '+' + money(s.minFee);
    $('[data-sum-total]').textContent = money(s.total);
    var n = quote.length;
    $$('[data-count]').forEach(function (c) { c.hidden = !n; c.textContent = n; });
  };
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
    $$('[name="freq"]').forEach(function (r) { r.addEventListener('change', renderQuote); });
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
  new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  var iso = function (y, m, d) { return new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10); };
  var lead = +form.getAttribute('data-lead') || 1;
  var dateEl = $('[data-date]', form);
  dateEl.min = iso(+p.year, +p.month, +p.day + lead);
  dateEl.max = iso(+p.year, +p.month + 3, +p.day);
  if (!dateEl.value) dateEl.value = dateEl.min;
  form.addEventListener('change', function (e) { if (e.target === dateEl && dateEl.value < dateEl.min) dateEl.value = dateEl.min; });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var f = document.querySelector('[name="freq"]:checked');
    var s = totals();
    return {
      name: get('name'), phone: get('phone'), address: get('address'),
      product: quote.map(function (x) { var it = find(x.id), v = it.v[x.v]; return it.name + (it.v.length > 1 ? ' (' + v.label + ')' : '') + ' ' + x.q + ' ' + it.u; }).join('; '),
      qty: String(quote.length), version: f ? f.parentNode.textContent.replace(/\s+/g, ' ').trim() : '',
      size: [get('home'), get('rooms')].filter(Boolean).join(' · '), date: [get('date'), get('slot')].filter(Boolean).join(' '),
      note: [d.getAll('extra').join(', '), get('note')].filter(Boolean).join(' · '), price: money(s.total),
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone', 'address', 'date'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      var v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
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
