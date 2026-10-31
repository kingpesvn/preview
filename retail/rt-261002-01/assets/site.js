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

// Mẫu Tiệm hoa tươi: lọc loại / dịp / loại hoa, tìm không dấu, sắp xếp giá, "Xem thêm"; trang mẫu hoa: chọn cỡ → giá,
// form giao hoa soạn sẵn tin nhắn. Không có JavaScript thì trang vẫn hiện đủ mẫu hoa, giá và nút liên hệ.
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

  // ── Lưới mẫu hoa ──
  var grid = document.querySelector('[data-grid]');
  var bar = document.querySelector('[data-toolbar]');
  if (grid && bar) {
    var cards = Array.prototype.slice.call(grid.children);
    var params = new URLSearchParams(location.search);
    var state = { type: params.get('type') || '', occ: params.get('occ') || '', fl: '', q: '', sort: '', all: false };
    var count = document.querySelector('[data-count]');
    var empty = document.querySelector('[data-empty]');
    var more = document.querySelector('[data-more]');
    var occSel = bar.querySelector('[data-occ]');
    var flSel = bar.querySelector('[data-fl]');
    var has = function (c, attr, v) { return !v || (' ' + c.getAttribute(attr) + ' ').indexOf(' ' + v + ' ') >= 0; };
    var apply = function () {
      var filtering = state.type || state.occ || state.fl || state.q;
      var shown = 0;
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
      sorted.forEach(function (c) {
        var ok = (!state.type || c.getAttribute('data-type') === state.type) && has(c, 'data-occ', state.occ) && has(c, 'data-fl', state.fl)
          && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        if (ok) shown++;
        // Chưa lọc: chỉ hiện 24 mẫu đầu, bấm "Xem thêm" để hiện hết.
        c.hidden = !ok || (!filtering && !state.all && shown > 24);
        grid.appendChild(c);
      });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      if (more) more.hidden = !!filtering || state.all || shown <= 24;
      bar.querySelectorAll('[data-type]').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-type') === state.type); });
      if (occSel) occSel.value = state.occ;
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-type]');
      if (!b) return;
      state.type = b.getAttribute('data-type');
      apply();
    });
    bar.querySelector('[data-search]').addEventListener('input', function (e) { state.q = plain(e.target.value.trim()); apply(); });
    bar.querySelector('[data-sort]').addEventListener('change', function (e) { state.sort = e.target.value; apply(); });
    if (occSel) occSel.addEventListener('change', function (e) { state.occ = e.target.value; apply(); });
    if (flSel) flSel.addEventListener('change', function (e) { state.fl = e.target.value; apply(); });
    if (more) more.addEventListener('click', function () { state.all = true; apply(); });
    // Ô "Dịp tặng" trên cùng trang: lọc ngay, không tải lại.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-occ-link]');
      if (!a) return;
      e.preventDefault();
      state.occ = a.getAttribute('data-occ-link');
      state.type = '';
      history.replaceState(null, '', '?occ=' + state.occ + '#shop');
      apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    apply();
  }

  // ── Trang mẫu hoa: cỡ → giá; form giao hoa → tin nhắn ──
  var pdp = document.querySelector('[data-product]');
  if (pdp) {
    var sizes = JSON.parse(pdp.getAttribute('data-sizes'));
    var price = pdp.querySelector('[data-v="price"]');
    var current = function () { var s = pdp.querySelector('input[name="size"]:checked'); return sizes[s ? +s.value : 0]; };
    pdp.addEventListener('change', function (e) { if (e.target.name === 'size') price.textContent = current().price; });
    var form = pdp.querySelector('form[data-compose]');
    var date = form.querySelector('input[name="date"]');
    var now = new Date(); // ngày theo giờ máy khách (toISOString là giờ quốc tế, có thể lùi một ngày)
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    date.min = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    if (!date.value) date.value = date.min;
    var channel = null;
    form.querySelectorAll('button[data-channel]').forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = channel || form.querySelector('button[data-channel]');
      var d = new FormData(form);
      var cur = current();
      var text = pdp.getAttribute('data-text')
        .replace('{product}', pdp.getAttribute('data-name')).replace('{size}', cur.size).replace('{price}', cur.price)
        .replace(/\{(\w+)\}/g, function (_, k) { return (d.get(k) || '…').toString().trim() || '…'; })
        .replace(/\s+/g, ' ');
      send(b.getAttribute('data-channel'), b.getAttribute('data-href'), text, form.querySelector('.form-msg'), pdp.getAttribute('data-name'));
    });
    // Nút "Đặt hoa" ở thanh dưới: cuộn tới form.
    var dock = document.querySelector('.dock .primary');
    if (dock) dock.addEventListener('click', function (e) { e.preventDefault(); form.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }
})();
