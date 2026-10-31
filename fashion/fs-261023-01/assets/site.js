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

// Mẫu Cửa hàng giày dép: lọc danh mục / dành cho / bộ sưu tập / size / mức giá, tìm không dấu, sắp xếp, "Xem thêm";
// "Tìm size": nhập chiều dài bàn chân (cm) → size EU, US, UK, BR, tô dòng trong bảng; lưu size vào máy (localStorage) để
// lưới sản phẩm lọc nhanh và trang sản phẩm chọn sẵn size; trang sản phẩm: thư viện ảnh, màu, size, form đặt hàng → Google Form hoặc tin nhắn.
// Không có JavaScript thì trang vẫn hiện đủ sản phẩm, bảng size, giá và nút liên hệ.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };
  var KEY = (body.getAttribute('data-store') || 'kp-shoe') + '-size';
  var load = function () { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } };
  var save = function (v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* trình duyệt chặn lưu: bỏ qua */ } };

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

  // ── Bảng size: đọc từ bảng trong trang (dữ liệu nằm sẵn trong HTML) ──
  var readChart = function (kind) {
    var tb = $('table[data-chart="' + kind + '"]');
    if (!tb) return null;
    var ths = $$('thead th', tb);
    var cols = ths.map(function (th) { return th.textContent.trim(); });
    var keys = ths.map(function (th) { return th.getAttribute('data-col'); });
    var mine = ths.map(function (th) { return th.classList.contains('mine'); }).indexOf(true);
    var rows = $$('tbody tr', tb).map(function (tr) { return { tr: tr, eu: tr.getAttribute('data-eu'), cm: parseFloat(tr.getAttribute('data-cm')), cells: $$('th,td', tr).map(function (x) { return x.textContent.trim(); }) }; });
    return { tb: tb, cols: cols, keys: keys, mine: mine, rows: rows };
  };
  var mySize = load();

  // ── Lưới sản phẩm ──
  var grid = $('[data-grid]');
  var bar = $('[data-toolbar]');
  if (grid && bar) {
    var cards = Array.prototype.slice.call(grid.children);
    var params = new URLSearchParams(location.search);
    var state = { type: params.get('type') || '', use: params.get('use') || '', edit: params.get('edit') || '', sz: '', band: '', q: '', sort: '', all: false };
    var count = $('[data-count]');
    var empty = $('[data-empty]');
    var more = $('[data-more]');
    var sel = function (k) { return bar.querySelector('[data-' + k + ']'); };
    var has = function (c, attr, v) { return !v || (' ' + c.getAttribute(attr) + ' ').indexOf(' ' + v + ' ') >= 0; };
    var inBand = function (c) {
      if (!state.band) return true;
      var r = state.band.split('-'), p = +c.getAttribute('data-price');
      return p >= +r[0] && (r[1] === '' || p < +r[1]);
    };
    var apply = function () {
      var filtering = state.type || state.use || state.edit || state.sz || state.band || state.q;
      var shown = 0;
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
      sorted.forEach(function (c) {
        var ok = (!state.type || c.getAttribute('data-type') === state.type) && has(c, 'data-use', state.use) && has(c, 'data-edit', state.edit)
          && has(c, 'data-sz', state.sz) && inBand(c) && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        if (ok) shown++;
        c.hidden = !ok || (!filtering && !state.all && shown > 24);
        grid.appendChild(c);
      });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      if (more) more.hidden = !!filtering || state.all || shown <= 24;
      $$('[data-type]', bar).forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-type') === state.type); });
      [['use', 'use'], ['edit', 'edit'], ['szf', 'sz']].forEach(function (x) { var el = sel(x[0]); if (el) el.value = state[x[1]]; });
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-type]');
      if (!b) return;
      state.type = b.getAttribute('data-type');
      apply();
    });
    sel('search').addEventListener('input', function (e) { state.q = plain(e.target.value.trim()); apply(); });
    sel('sort').addEventListener('change', function (e) { state.sort = e.target.value; apply(); });
    [['use', 'use'], ['edit', 'edit'], ['szf', 'sz'], ['band', 'band']].forEach(function (x) {
      var el = sel(x[0]);
      if (el) el.addEventListener('change', function (e) { state[x[1]] = e.target.value; apply(); });
    });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-filter-link]');
      if (!a) return;
      e.preventDefault();
      var k = a.getAttribute('data-filter-link'), v = a.getAttribute('data-value');
      state.type = k === 'type' ? v : '';
      state.use = k === 'use' ? v : '';
      state.edit = k === 'edit' ? v : '';
      history.replaceState(null, '', '?' + k + '=' + v + '#shop');
      apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    // Size đã lưu: dòng nhắc + nút lọc theo size của tôi.
    var mine = $('[data-mysize]');
    var showMine = function () {
      if (!mine || !mySize) return;
      var tx = $('[data-mysize-text]', mine);
      tx.textContent = tx.getAttribute('data-tpl').replace('{size}', mySize.label);
      mine.hidden = false;
    };
    if (mine) $('[data-mysize-filter]', mine).addEventListener('click', function () { if (mySize) { state.sz = String(mySize.eu); apply(); } });
    showMine();
    body.addEventListener('kp-size', function () { mySize = load(); showMine(); });
    apply();
  }

  // ── Tìm size theo chiều dài bàn chân ──
  var finder = $('[data-finder]');
  if (finder) {
    var out = $('[data-result]', finder);
    var saveBtn = $('[data-save]', finder);
    var found = null;
    var run = function () {
      var fit = (finder.querySelector('[name="fit"]:checked') || {}).value || 'men';
      var cm = parseFloat(String(finder.querySelector('[name="cm"]').value).replace(',', '.'));
      $$('tr.hit').forEach(function (tr) { tr.classList.remove('hit'); });
      found = null;
      if (saveBtn) saveBtn.hidden = true;
      if (!cm) return;
      var ch = readChart(fit === 'kids' ? 'kids' : 'adult');
      if (!ch) return;
      // Chọn size nhỏ nhất có chiều dài ≥ bàn chân (chừa chỗ cho ngón chân).
      var row = ch.rows.filter(function (r) { return r.cm >= cm; })[0];
      if (!row) { out.textContent = out.getAttribute('data-none'); return; }
      var parts = ch.cols.map(function (c, i) { return c + ' ' + row.cells[i]; }).filter(function (_, i) { return ch.cols[i] !== ch.cols[0]; });
      // Cột của hệ size khu vực này; khu vực dùng size Mỹ mà chọn "Nữ" thì lấy cột US nữ.
      var mi = ch.mine;
      if (mi >= 0 && ch.keys[mi] === 'usM' && fit === 'women') mi = ch.keys.indexOf('usW');
      var cell = mi >= 0 ? row.cells[mi] : '';
      var label = cell && cell !== '–' ? ch.cols[mi] + ' ' + cell : 'EU ' + row.eu;
      var between = row.cm - cm >= 0.5 ? ' ' + out.getAttribute('data-between') : '';
      out.textContent = out.getAttribute('data-tpl').replace('{size}', label).replace('{all}', parts.join(' · ')) + between;
      row.tr.classList.add('hit');
      found = { eu: row.eu, label: label, fit: fit === 'kids' ? 'kids' : 'adult' };
      if (saveBtn) saveBtn.hidden = false;
    };
    finder.addEventListener('input', run);
    finder.addEventListener('change', run);
    finder.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    if (saveBtn) saveBtn.addEventListener('click', function () {
      if (!found) return;
      save(found);
      saveBtn.disabled = true;
      body.dispatchEvent(new Event('kp-size'));
      setTimeout(function () { saveBtn.disabled = false; }, 1200);
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
      thumbs.forEach(function (a, k) { if (k === i) { a.setAttribute('aria-current', 'true'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } else a.removeAttribute('aria-current'); }); };
    var go = function (i) { i = Math.max(0, Math.min(n - 1, i)); track.scrollTo({ left: i * track.clientWidth }); show(i); };
    var t0;
    track.addEventListener('scroll', function () { clearTimeout(t0); t0 = setTimeout(function () { var i = Math.round(track.scrollLeft / track.clientWidth); if (i !== cur) show(i); }, 60); });
    gal.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { go(cur + +b.getAttribute('data-step')); }); });
    thumbs.forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); go(+a.getAttribute('data-go')); }); });
    track.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
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
      lb.addEventListener('close', function () { go(at); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(at + 1); if (e.key === 'ArrowLeft') open(at - 1); });
      var x0 = null;
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(at + (dx < 0 ? 1 : -1)); x0 = null; });
    }
  }

  // ── Trang sản phẩm: màu, size; chọn sẵn size đã lưu; form đặt hàng ──
  var pdp = $('[data-product]');
  if (!pdp) return;
  var pickInput = function (name) { return pdp.querySelector('input[name="' + name + '"]:checked'); };
  var sizeField = $('[data-size-field]', pdp);
  var sizeMsg = $('[data-size-msg]', pdp);
  var setLabel = function (n, v) { var lab = $('[data-v="' + n + '"]', pdp); if (lab) lab.textContent = v; };
  pdp.addEventListener('change', function (e) {
    var n = e.target.name;
    if (n === 'color') setLabel('color', e.target.value);
    if (n === 'size') { setLabel('size', e.target.getAttribute('data-label')); if (sizeMsg) sizeMsg.hidden = true; }
  });
  // Size đã lưu ở "Tìm size": chọn sẵn nếu cùng nhóm (người lớn / trẻ em) và còn hàng.
  if (mySize && sizeField) {
    var kids = pdp.getAttribute('data-fit') === 'kids';
    if ((mySize.fit === 'kids') === kids) {
      var r = pdp.querySelector('input[name="size"][value="' + mySize.eu + '"]:not(:disabled)');
      var mm = $('[data-mine-msg]', pdp);
      if (r) { r.checked = true; setLabel('size', r.getAttribute('data-label')); }
      if (mm) { mm.textContent = mm.getAttribute('data-tpl').replace('{size}', mySize.label); mm.hidden = false; }
    }
  }
  var form = pdp.querySelector('form[data-compose]');
  var err = form.querySelector('[data-err]');
  var channel = null;
  form.querySelectorAll('button[data-channel]').forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = pickInput('size'), c = pickInput('color');
    var sz = s ? s.getAttribute('data-label') + (s.getAttribute('data-label').indexOf('EU') === 0 ? '' : ' (EU ' + s.value + ')') : '';
    return {
      intent: get('intent'), name: get('name'), phone: get('phone'), qty: get('qty') || '1', address: get('address'), note: get('note'),
      product: pdp.getAttribute('data-name'), price: pdp.getAttribute('data-price'), color: c ? c.value : '', size: sz,
      page: location.href.split('#')[0], market: pdp.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return pdp.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function (o) {
    var ok = true;
    if (sizeField && !o.size) { if (sizeMsg) sizeMsg.hidden = false; sizeField.scrollIntoView({ behavior: 'smooth', block: 'center' }); return false; }
    ['name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      var bad = k === 'phone' ? o.phone.replace(/\D/g, '').length < 8 : !o.name;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) ok = false;
    });
    err.hidden = ok;
    if (!ok) form.querySelector('[aria-invalid="true"]').focus();
    return ok;
  };
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0f = Date.now();
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var o = order();
    if (o.website || Date.now() - t0f < 2500) return;
    if (!valid(o)) return;
    var msg = text(o);
    var box = form.querySelector('[data-done]');
    var done = function () {
      form.querySelector('.order-fields').hidden = true;
      box.hidden = false;
      box.focus();
      box.querySelectorAll('button[data-channel]').forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    if (!channel) {
      if (!gform) { done(); return; }
      var data = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], k === 'note' && o.intent ? o.intent + (o.note ? ' · ' + o.note : '') : (o[k] || '')); });
      var btn = form.querySelector('[data-order-submit]');
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, function () {
        btn.disabled = false;
        var first = box.querySelector('button[data-channel]');
        if (first) send(first.getAttribute('data-channel'), first.getAttribute('data-href'), msg, form.querySelector('.form-msg'), o.product);
      });
      return;
    }
    var b = channel;
    channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, form.querySelector('.form-msg'), o.product);
  });
  var edit = form.querySelector('[data-edit]');
  if (edit) edit.addEventListener('click', function () { form.querySelector('[data-done]').hidden = true; form.querySelector('.order-fields').hidden = false; });
  var dock = $('.dock .primary');
  if (dock) dock.addEventListener('click', function (e) { e.preventDefault(); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
})();
