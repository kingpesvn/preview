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

// Mẫu Văn phòng bất động sản: ô tìm nhà ở đầu trang → chép điều kiện xuống thanh lọc và kéo tới danh sách; lọc theo mua/thuê, loại,
// khu vực, giá tối đa (mốc giá đổi theo mua hay thuê), số phòng ngủ; sắp xếp theo giá; "Xem thêm"; bấm "Xem chi tiết" mở hộp có
// album ảnh của căn; "Đặt lịch xem căn này" điền căn vào form, "Tính trả góp" điền giá vào ô ước tính; ô trả góp tính trả đều mỗi tháng
// và tháng đầu theo dư nợ giảm dần; form 2 chế độ (xem nhà / ký gửi) → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp.
// Không có JavaScript thì trang vẫn hiện mọi căn kèm chi tiết (mở bằng "Xem chi tiết") và nút liên hệ.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var locale = body.getAttribute('data-locale') || undefined;
  var currency = body.getAttribute('data-currency') || 'VND';
  var money = new Intl.NumberFormat(locale, { style: 'currency', currency: currency, maximumFractionDigits: 0 });
  var group = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

  function send(channel, href, text, msg) {
    if (channel === 'whatsapp') href = 'https://wa.me/' + body.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
    if (channel === 'email') href = 'mailto:' + body.getAttribute('data-email') + '?subject=' + encodeURIComponent(text.split('\n')[0]) + '&body=' + encodeURIComponent(text);
    var open = function () { window.open(href, channel === 'phone' || channel === 'email' ? '_self' : '_blank', 'noopener'); };
    if (channel === 'whatsapp' || channel === 'email') { open(); return; }
    var show = function (s) { if (msg) { msg.textContent = s; msg.hidden = false; } open(); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { show(body.getAttribute('data-copied')); }, function () { show(text); });
    } else show(text);
  }

  var o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
  var todayISO = o.year + '-' + o.month + '-' + o.day;

  // Mốc "giá tối đa" chỉ hiện của đúng loại giao dịch; chưa chọn mua/thuê thì khóa ô giá.
  var syncBudget = function (form, deal) {
    var sel = form.querySelector('[name="budget"]');
    if (!sel) return;
    Array.prototype.forEach.call(sel.options, function (op) {
      var d = op.getAttribute('data-deal');
      var ok = !d || d === deal;
      op.hidden = !ok; op.disabled = !ok;
      if (!ok && op.selected) sel.value = '';
    });
    sel.disabled = !deal;
  };

  // ── Danh sách + lọc ──
  var list = $('[data-list]');
  var filter = $('[data-filter]');
  var cards = list ? $$('.lst', list) : [];
  var shown = 9;
  var moreBtn = $('[data-more]');
  var countEl = $('[data-count]');
  var reset = $('[data-reset]');
  var empty = $('[data-empty]');
  var val = function (n) { var el = filter && filter.querySelector('[name="' + n + '"]'); return el ? el.value : ''; };
  var applyList = function () {
    if (!list) return;
    var deal = val('deal'), type = val('type'), dist = val('district'), budget = +val('budget') || 0, beds = +val('beds') || 0, sort = val('sort');
    var sorted = cards.slice().sort(function (a, b) {
      var sa = a.hasAttribute('data-sold') ? 1 : 0, sb = b.hasAttribute('data-sold') ? 1 : 0;
      if (sa !== sb) return sa - sb;
      if (sort === 'low') return a.getAttribute('data-price') - b.getAttribute('data-price');
      if (sort === 'high') return b.getAttribute('data-price') - a.getAttribute('data-price');
      return a.getAttribute('data-i') - b.getAttribute('data-i');
    });
    var n = 0;
    var cur = $$('.lst', list);
    if (sorted.some(function (c, i) { return cur[i] !== c; })) sorted.forEach(function (c) { list.appendChild(c); });
    sorted.forEach(function (c) {
      var ok = (!deal || c.getAttribute('data-deal') === deal) && (!type || c.getAttribute('data-type') === type) &&
        (!dist || c.getAttribute('data-district') === dist) && (!beds || +c.getAttribute('data-beds') >= beds) &&
        (!budget || +c.getAttribute('data-price') <= budget);
      c.classList.toggle('off', !ok);
      c.classList.add('more');
      if (ok) { n++; c.classList.toggle('show', n <= shown); }
    });
    if (countEl) countEl.textContent = countEl.getAttribute('data-tpl').replace('{n}', n);
    if (reset) reset.hidden = !(deal || type || dist || budget || beds);
    if (empty) empty.hidden = n > 0;
    if (moreBtn) moreBtn.parentNode.hidden = n <= shown;
  };
  if (filter) {
    syncBudget(filter, val('deal'));
    filter.addEventListener('change', function (e) {
      if (e.target.name === 'deal') syncBudget(filter, e.target.value);
      shown = 9; applyList();
    });
    filter.addEventListener('submit', function (e) { e.preventDefault(); });
  }
  if (reset) reset.addEventListener('click', function () { filter.reset(); syncBudget(filter, ''); shown = 9; applyList(); });
  if (moreBtn) moreBtn.addEventListener('click', function () { shown += 9; applyList(); });
  applyList();

  // ── Ô tìm nhà ở đầu trang ──
  var search = $('[data-search]');
  if (search) {
    var sdeal = function () { var r = search.querySelector('[name="deal"]:checked'); return r ? r.value : ''; };
    syncBudget(search, sdeal());
    $$('[name="deal"]', search).forEach(function (r) { r.addEventListener('change', function () { syncBudget(search, sdeal()); }); });
    search.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!filter) return;
      var set = function (n, v) { var el = filter.querySelector('[name="' + n + '"]'); if (el) el.value = v; };
      set('deal', sdeal());
      syncBudget(filter, sdeal());
      ['type', 'district', 'budget', 'beds'].forEach(function (n) { var el = search.querySelector('[name="' + n + '"]'); set(n, el ? el.value : ''); });
      shown = 9; applyList();
      $('#listings').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ── Ô ước tính trả góp ──
  var calc = $('[data-loan]');
  var loanNow = null;
  var compute = function () {
    if (!calc) return;
    var priceEl = calc.querySelector('[name="price"]');
    var price = +(priceEl.value.replace(/\D/g, '')) || 0;
    var ratio = +calc.querySelector('[name="ratio"]').value || 0;
    var years = +calc.querySelector('[name="years"]').value || 1;
    var rate = parseFloat(calc.querySelector('[name="rate"]').value.replace(',', '.')) || 0;
    var out = function (k, v) { var el = $('[data-out="' + k + '"]', calc); if (el) el.textContent = v; };
    out('ratio', ratio + '%');
    var yEl = $('[data-out="years"]', calc); if (yEl) yEl.textContent = yEl.getAttribute('data-tpl').replace('{n}', years);
    var loan = price * ratio / 100, n = years * 12, r = rate / 100 / 12;
    var monthly = r ? loan * r / (1 - Math.pow(1 + r, -n)) : loan / n;
    var first = loan / n + loan * r;
    var set = function (k, v) { var el = $('[data-r="' + k + '"]'); if (el) el.textContent = price ? money.format(Math.round(v)) : '—'; };
    set('monthly', monthly); set('first', first); set('loan', loan); set('down', price - loan); set('interest', monthly * n - loan);
    loanNow = { price: price, ratio: ratio, years: years, rate: rate, monthly: monthly };
  };
  if (calc) {
    var priceEl = calc.querySelector('[name="price"]');
    var fmtPrice = function () { var v = +(priceEl.value.replace(/\D/g, '')); priceEl.value = v ? group.format(v) : ''; };
    fmtPrice();
    calc.addEventListener('input', compute);
    priceEl.addEventListener('blur', fmtPrice);
    calc.addEventListener('submit', function (e) { e.preventDefault(); });
    compute();
  }

  // ── Form: chế độ xem nhà / ký gửi ──
  var form = $('form[data-book]');
  var setMode = function (m) {
    if (!form) return;
    var r = form.querySelector('[name="mode"][value="' + m + '"]');
    if (r) r.checked = true;
    $$('[data-mode]', form).forEach(function (x) { x.hidden = x.getAttribute('data-mode') !== m; });
  };
  var pickHome = function (id) {
    if (!form) return;
    setMode('view');
    var sel = form.querySelector('[name="product"]');
    Array.prototype.forEach.call(sel.options, function (op) { if (op.getAttribute('data-id') === id) sel.value = op.value; });
  };
  var addNote = function (line) {
    var note = form && form.querySelector('[name="note"]');
    if (note && note.value.indexOf(line) < 0) note.value = line + (note.value ? '\n' + note.value : '');
  };
  var toLoan = function (price) {
    if (!calc) return;
    calc.querySelector('[name="price"]').value = group.format(+price);
    compute();
    $('#loan').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-book-home]');
    if (a) { pickHome(a.getAttribute('data-book-home')); closeDlg(); return; }
    var l = e.target.closest('[data-loan-price]');
    if (l) { e.preventDefault(); closeDlg(); toLoan(l.getAttribute('data-loan-price')); return; }
    var m = e.target.closest('[data-mode-link]');
    if (m) { setMode(m.getAttribute('data-mode-link')); return; }
    var ask = e.target.closest('[data-loan-ask]');
    if (ask && loanNow && loanNow.price) {
      setMode('view');
      var yt = $('[data-out="years"]', calc);
      addNote(ask.textContent.trim() + ': ' + money.format(loanNow.price) + ' · ' + loanNow.ratio + '% · ' + (yt ? yt.textContent : loanNow.years) + ' · ' + loanNow.rate + '%');
    }
  });

  // ── Hộp chi tiết căn + album ảnh ──
  var dlg = $('[data-dialog]');
  var closeDlg = function () { if (dlg && dlg.open) dlg.close(); };
  if (dlg && dlg.showModal && list) {
    var dImg = $('[data-dlg-img]', dlg), dBody = $('[data-dlg-body]', dlg), dN = $('[data-gal-n]', dlg);
    var imgs = [], cur = 0;
    var show = function (i) {
      if (!imgs.length) return;
      cur = (i + imgs.length) % imgs.length;
      dImg.src = imgs[cur];
      dN.textContent = (cur + 1) + ' / ' + imgs.length;
    };
    list.addEventListener('click', function (e) {
      var s = e.target.closest('.lst-more > summary') || (e.target.closest('.lst-img') && e.target.closest('.lst'));
      if (!s) return;
      e.preventDefault();
      var c = e.target.closest('.lst');
      imgs = JSON.parse(c.getAttribute('data-images') || '[]');
      dBody.innerHTML = '';
      dBody.appendChild($('.lst-detail', c).cloneNode(true));
      $$('.gal-btn', dlg).forEach(function (b) { b.hidden = imgs.length < 2; });
      dImg.alt = $('h3', c).textContent;
      show(0);
      dlg.showModal();
      dlg.scrollTop = 0;
    });
    $('[data-gal-prev]', dlg).addEventListener('click', function () { show(cur - 1); });
    $('[data-gal-next]', dlg).addEventListener('click', function () { show(cur + 1); });
    $('[data-dlg-close]', dlg).addEventListener('click', closeDlg);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDlg(); });
    dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
    var x0 = null;
    dImg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    dImg.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  // ── Gửi form ──
  if (!form) return;
  $$('[name="mode"]', form).forEach(function (r) { r.addEventListener('change', function () { setMode(r.value); }); });
  setMode('view');
  var fields = $('.book-fields', form);
  var box = $('[data-done]', form);
  var err = $('[data-err]', form);
  var btn = $('[data-submit]', form);
  var day = form.querySelector('[name="day"]');
  if (day) { day.min = todayISO; if (!day.value) day.value = todayISO; }
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) {
    var el = form.querySelector('[name="' + name + '"]');
    var s = el && el.closest('.field') && $('span', el.closest('.field'));
    return s ? s.textContent.replace(/\s*\*$/, '').trim() : name;
  };
  var mode = function () { var r = form.querySelector('[name="mode"]:checked'); return r ? r.value : 'view'; };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var cs = mode() === 'consign';
    return {
      mode: mode(), name: get('name'), phone: get('phone'),
      product: cs ? [get('want'), get('kind')].filter(Boolean).join(' · ') : get('product'),
      date: cs ? '' : [get('day'), get('time')].filter(Boolean).join(' '),
      size: cs && get('area') ? get('area') + ' m²' : '', price: cs ? get('ask') : '', address: cs ? get('address') : '',
      note: get('note'), page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (x) {
    var cs = x.mode === 'consign';
    var rows = cs ? [['want', x.product], ['address', x.address], ['area', x.size], ['ask', x.price]] : [['product', x.product], ['day', x.date]];
    rows = rows.concat([['name', x.name], ['phone', x.phone], ['note', x.note]]);
    return [form.getAttribute(cs ? 'data-consign-text' : 'data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return label(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8]].forEach(function (y) {
      var el = form.querySelector('[name="' + y[0] + '"]');
      el.setAttribute('aria-invalid', y[1] ? 'true' : 'false');
      if (y[1]) ok = false;
    });
    err.hidden = ok;
    if (!ok) $('[aria-invalid="true"]', form).focus();
    return ok;
  };
  var done = function (msg) {
    fields.hidden = true; box.hidden = false; box.focus();
    $$('button[data-channel]', box).forEach(function (x) { x.setAttribute('data-msg', msg); });
  };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var x = read();
    if (x.website || Date.now() - t0 < 2500) return;
    if (!valid(x)) return;
    var msg = text(x);
    if (!gform) { done(msg); return; }
    if (x.mode === 'consign') x.product = form.getAttribute('data-consign-tag') + ': ' + x.product;
    var data = new URLSearchParams();
    Object.keys(gmap).forEach(function (k) { data.append(gmap[k], x[k] || ''); });
    btn.disabled = true;
    var old = btn.innerHTML;
    btn.textContent = btn.getAttribute('data-sending');
    fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(function () { done(msg); }, function () {
      btn.disabled = false; btn.innerHTML = old;
      send((body.getAttribute('data-wa') && 'whatsapp') || 'email', '', msg, null);
    });
  });
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-channel]');
    if (!b) return;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg'), $('[data-msg]', box));
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { box.hidden = true; fields.hidden = false; });
})();
