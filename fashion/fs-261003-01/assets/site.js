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

// Mẫu Shop thời trang: lọc danh mục / dành cho / phong cách / size / mức giá, tìm không dấu, sắp xếp, "Xem thêm";
// trang sản phẩm: thư viện ảnh, màu, size, form đặt hàng → Google Form của chủ shop (nếu có) hoặc tin nhắn soạn sẵn.
// Không có JavaScript thì trang vẫn hiện đủ sản phẩm, giá và nút liên hệ.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var plain = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase(); };

  // Gửi tin nhắn soạn sẵn: WhatsApp/email nhận nội dung; Zalo, gọi điện thì sao chép để khách dán.
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

  // ── Lưới sản phẩm ──
  var grid = document.querySelector('[data-grid]');
  var bar = document.querySelector('[data-toolbar]');
  if (grid && bar) {
    var cards = Array.prototype.slice.call(grid.children);
    var params = new URLSearchParams(location.search);
    var state = { type: params.get('type') || '', use: params.get('use') || '', sty: '', sz: '', band: '', q: '', sort: '', all: false };
    var count = document.querySelector('[data-count]');
    var empty = document.querySelector('[data-empty]');
    var more = document.querySelector('[data-more]');
    var sel = function (k) { return bar.querySelector('[data-' + k + ']'); };
    var has = function (c, attr, v) { return !v || (' ' + c.getAttribute(attr) + ' ').indexOf(' ' + v + ' ') >= 0; };
    var inBand = function (c) {
      if (!state.band) return true;
      var r = state.band.split('-'), p = +c.getAttribute('data-price');
      return p >= +r[0] && (r[1] === '' || p < +r[1]);
    };
    var apply = function () {
      var filtering = state.type || state.use || state.sty || state.sz || state.band || state.q;
      var shown = 0;
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
      sorted.forEach(function (c) {
        var ok = (!state.type || c.getAttribute('data-type') === state.type) && has(c, 'data-use', state.use) && has(c, 'data-sty', state.sty)
          && has(c, 'data-sz', state.sz) && inBand(c) && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        if (ok) shown++;
        // Chưa lọc: chỉ hiện 24 sản phẩm đầu, bấm "Xem thêm" để hiện hết.
        c.hidden = !ok || (!filtering && !state.all && shown > 24);
        grid.appendChild(c);
      });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      if (more) more.hidden = !!filtering || state.all || shown <= 24;
      bar.querySelectorAll('[data-type]').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-type') === state.type); });
      if (sel('use')) sel('use').value = state.use;
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-type]');
      if (!b) return;
      state.type = b.getAttribute('data-type');
      apply();
    });
    sel('search').addEventListener('input', function (e) { state.q = plain(e.target.value.trim()); apply(); });
    sel('sort').addEventListener('change', function (e) { state.sort = e.target.value; apply(); });
    [['use', 'use'], ['sty', 'sty'], ['szf', 'sz'], ['band', 'band']].forEach(function (x) {
      var el = sel(x[0]);
      if (el) el.addEventListener('change', function (e) { state[x[1]] = e.target.value; apply(); });
    });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    // Ô danh mục / "Dành cho" trên cùng trang: lọc ngay, không tải lại.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-filter-link]');
      if (!a) return;
      e.preventDefault();
      var k = a.getAttribute('data-filter-link'), v = a.getAttribute('data-value');
      state.type = k === 'type' ? v : '';
      state.use = k === 'use' ? v : '';
      history.replaceState(null, '', '?' + k + '=' + v + '#shop');
      apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    apply();
  }

  // ── Thư viện ảnh: nút trước/sau, ảnh nhỏ, đếm ảnh theo vị trí cuộn; bấm ảnh để xem toàn màn hình ──
  var gal = document.querySelector('[data-gallery]');
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
    // Xem toàn màn hình (thẻ <dialog>; trình duyệt cũ thì mở ảnh như liên kết thường).
    var lb = document.querySelector('[data-lightbox]');
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
      var x0 = null; // vuốt trái/phải để đổi ảnh
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(at + (dx < 0 ? 1 : -1)); x0 = null; });
    }
  }

  // ── Trang sản phẩm: màu, size, phiên bản → giá; form đặt hàng ──
  var pdp = document.querySelector('[data-product]');
  if (pdp) {
    var versions = JSON.parse(pdp.getAttribute('data-sizes'));
    var price = pdp.querySelector('[data-v="price"]');
    var pickVal = function (name) { var x = pdp.querySelector('input[name="' + name + '"]:checked'); return x ? x.value : ''; };
    var version = function () { var v = pickVal('version'); return versions[v ? +v : 0]; };
    var sizeField = pdp.querySelector('[data-size-field]');
    var sizeMsg = pdp.querySelector('[data-size-msg]');
    pdp.addEventListener('change', function (e) {
      var n = e.target.name;
      if (n === 'version') price.textContent = version().price;
      if (n === 'color' || n === 'size') {
        var lab = pdp.querySelector('[data-v="' + n + '"]');
        if (lab) lab.textContent = e.target.value;
        if (n === 'size' && sizeMsg) sizeMsg.hidden = true;
      }
    });
    var form = pdp.querySelector('form[data-compose]');
    var err = form.querySelector('[data-err]');
    var channel = null;
    form.querySelectorAll('button[data-channel]').forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
    // Nội dung đơn: dùng cho tin nhắn và cho Google Form.
    var order = function () {
      var d = new FormData(form), v = version();
      var get = function (k) { return (d.get(k) || '').toString().trim(); };
      return {
        intent: get('intent'), name: get('name'), phone: get('phone'), qty: get('qty') || '1', address: get('address'), note: get('note'),
        product: pdp.getAttribute('data-name'), version: v.size, price: v.price, color: pickVal('color'), size: pickVal('size'),
        page: location.href.split('#')[0], market: pdp.getAttribute('data-market'), website: get('website'),
      };
    };
    var text = function (o) {
      return pdp.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' ');
    };
    // Kiểm tra trước khi gửi: có size (nếu sản phẩm có size), có tên và số điện thoại hợp lệ.
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
    var t0 = Date.now();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var o = order();
      if (o.website || Date.now() - t0 < 2500) return; // ô bẫy bot / gửi quá nhanh
      if (!valid(o)) return;
      var msg = text(o);
      var box = form.querySelector('[data-done]');
      // Hiện bước sau khi gửi; nút chat trong đó mang sẵn nội dung đơn.
      var done = function () {
        form.querySelector('.order-fields').hidden = true;
        box.hidden = false;
        box.focus();
        box.querySelectorAll('button[data-channel]').forEach(function (x) { x.setAttribute('data-msg', msg); });
      };
      if (!channel) {
        if (!gform) { done(); return; } // chưa gắn Google Form: bước cuối gửi đơn qua Zalo/gọi
        // Gửi thẳng vào Google Form của chủ shop (Google không trả lời lại cho trang khác → no-cors).
        var body = new URLSearchParams();
        Object.keys(gmap).forEach(function (k) { body.append(gmap[k], k === 'note' && o.intent ? o.intent + (o.note ? ' · ' + o.note : '') : (o[k] || '')); });
        var btn = form.querySelector('[data-order-submit]');
        btn.disabled = true;
        fetch(gform, { method: 'POST', mode: 'no-cors', body: body }).then(done, function () {
          btn.disabled = false;
          // Mạng lỗi: chuyển sang gửi qua tin nhắn để không mất đơn.
          var first = box.querySelector('button[data-channel]');
          if (first) send(first.getAttribute('data-channel'), first.getAttribute('data-href'), msg, form.querySelector('.form-msg'), o.product);
        });
        return;
      }
      var b = channel || form.querySelector('button[data-channel]');
      channel = null;
      send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, form.querySelector('.form-msg'), o.product);
    });
    var edit = form.querySelector('[data-edit]');
    if (edit) edit.addEventListener('click', function () { form.querySelector('[data-done]').hidden = true; form.querySelector('.order-fields').hidden = false; });
    // Nút "Đặt hàng" ở thanh dưới: cuộn tới form.
    var dock = document.querySelector('.dock .primary');
    if (dock) dock.addEventListener('click', function (e) { e.preventDefault(); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }
})();
