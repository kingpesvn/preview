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

// Mẫu Cửa hàng điện thoại: lọc/sắp xếp/tìm máy, chọn dung lượng + màu, soạn sẵn tin nhắn đặt hàng.
// Không có JavaScript thì trang vẫn hiện đủ máy, giá, nút liên hệ.
(function () {
  var body = document.body;

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

  // ── Lưới sản phẩm: loại, hãng, tìm kiếm, sắp xếp ──
  var grid = document.querySelector('[data-grid]');
  var bar = document.querySelector('[data-toolbar]');
  if (grid && bar) {
    var cards = Array.prototype.slice.call(grid.children);
    var state = { type: new URLSearchParams(location.search).get('type') || '', brands: [], q: '', sort: '' };
    var count = document.querySelector('[data-count]');
    var empty = document.querySelector('[data-empty]');
    var apply = function () {
      var shown = 0;
      cards.forEach(function (c) {
        var ok = (!state.type || c.getAttribute('data-type') === state.type)
          && (!state.brands.length || state.brands.indexOf(c.getAttribute('data-brand')) >= 0)
          && (!state.q || c.getAttribute('data-name').indexOf(state.q) >= 0);
        c.hidden = !ok;
        if (ok) shown++;
      });
      var sorted = cards.slice();
      if (state.sort) sorted.sort(function (a, b) { var d = a.getAttribute('data-price') - b.getAttribute('data-price'); return state.sort === 'asc' ? d : -d; });
      sorted.forEach(function (c) { grid.appendChild(c); });
      if (count) count.textContent = count.getAttribute('data-count').replace('{n}', shown);
      if (empty) empty.hidden = shown > 0;
      bar.querySelectorAll('[data-type]').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-type') === state.type); });
    };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('data-type')) state.type = b.getAttribute('data-type');
      if (b.hasAttribute('data-brand')) {
        var name = b.getAttribute('data-brand'), i = state.brands.indexOf(name);
        if (i >= 0) state.brands.splice(i, 1); else state.brands.push(name);
        b.setAttribute('aria-pressed', i < 0 ? 'true' : 'false');
      }
      apply();
    });
    bar.querySelector('[data-search]').addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); apply(); });
    bar.querySelector('[data-sort]').addEventListener('change', function (e) { state.sort = e.target.value; apply(); });
    // Liên kết "?type=…#shop" trên cùng trang: lọc ngay, không tải lại.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href*="type="]');
      if (!a || a.pathname !== location.pathname) return;
      e.preventDefault();
      state.type = new URL(a.href).searchParams.get('type') || '';
      history.replaceState(null, '', '?type=' + state.type + '#shop');
      apply();
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
    if (state.type) apply();
  }

  // ── Trang chi tiết: dung lượng + màu → giá, trả góp, tin nhắn đặt hàng ──
  var pdp = document.querySelector('[data-product]');
  if (pdp) {
    var variants = JSON.parse(pdp.getAttribute('data-variants'));
    var set = function (k, v) {
      var el = pdp.querySelector('[data-v="' + k + '"]');
      if (!el) return;
      el.textContent = v;
      el.hidden = !v;
    };
    var current = function () {
      var s = pdp.querySelector('input[name="size"]:checked');
      var c = pdp.querySelector('input[name="color"]:checked');
      return { v: variants[s ? +s.value : 0], color: c ? c.value : '', hex: c ? c.getAttribute('data-hex') : '' };
    };
    var update = function () {
      var cur = current();
      ['price', 'list', 'off', 'save', 'inst'].forEach(function (k) { set(k, cur.v[k]); });
      if (cur.color) {
        set('color', cur.color);
        pdp.querySelectorAll('.dev').forEach(function (svg) { svg.style.setProperty('--dev', cur.hex); });
      }
    };
    pdp.addEventListener('change', update);
    var msg = pdp.querySelector('.form-msg');
    document.querySelectorAll('[data-order]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var ch = a.getAttribute('data-channel') || (document.querySelector('.buy [data-order]') || a).getAttribute('data-channel');
        var cur = current();
        var text = pdp.getAttribute('data-text').replace('{product}', pdp.getAttribute('data-name')).replace('{size}', cur.v.size || '').replace('{color}', cur.color).replace('{price}', cur.v.price).replace(/\s+/g, ' ');
        e.preventDefault();
        send(ch, a.getAttribute('href'), text, msg, pdp.getAttribute('data-name'));
      });
    });
  }

  // ── Form thu cũ đổi mới ──
  document.querySelectorAll('form[data-compose]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var text = form.getAttribute('data-message').replace(/\{(\w+)\}/g, function (_, k) { return d.get(k) || ''; });
      send(form.getAttribute('data-channel'), form.getAttribute('data-href'), text, form.querySelector('.form-msg'), d.get('model'));
    });
  });
})();
