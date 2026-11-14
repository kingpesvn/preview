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

// Mẫu Quản lý cho thuê nhà: lọc nhà cho thuê (loại, số phòng ngủ, giá tối đa, ngày dọn vào, cho nuôi thú cưng), "Trống từ hôm nay"
// theo múi giờ văn phòng (?today=YYYY-MM-DD để thử); nút "Hẹn xem nhà" chọn sẵn căn trong form; bảng tính phí cho chủ nhà
// (phí quản lý = max(% tiền thuê, phí tối thiểu) × số căn × 12, phí tìm người thuê theo tỉ lệ đổi người thuê, phí gia hạn,
// còn lại cho chủ nhà); báo sửa chữa: chọn "Khẩn cấp" thì hiện số gọi ngay. Các form → Google Form (nếu có) hoặc tin nhắn soạn sẵn.
// Không có JavaScript thì vẫn đọc được đủ nhà cho thuê, gói phí và form.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || undefined;
  var mf = JSON.parse(body.getAttribute('data-money') || '{}');
  var money = function (n) {
    try { return new Intl.NumberFormat(mf.locale || 'en-US', { style: 'currency', currency: mf.currency || 'USD', maximumFractionDigits: n % 1 ? mf.max : 0, minimumFractionDigits: 0 }).format(n); } catch (e) { return String(n); }
  };

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

  // Ngày hôm nay theo múi giờ văn phòng (không dùng toISOString: lệch ngày theo UTC).
  var today = (function () {
    var q = new URLSearchParams(location.search).get('today');
    if (/^\d{4}-\d{2}-\d{2}$/.test(q || '')) return q;
    var o = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
    return o.year + '-' + o.month + '-' + o.day;
  })();

  // ── Nhà cho thuê ──
  var list = $('[data-homes]');
  var fl = $('[data-filters]');
  if (list && fl) {
    var homes = $$('.home', list);
    homes.forEach(function (h) {
      var d = h.getAttribute('data-date');
      if (!d || d <= today) { var w = $('[data-when]', h); w.lastChild.textContent = ' ' + w.getAttribute('data-now'); w.classList.add('is-now'); }
    });
    var st = { type: '', beds: 0, max: 0, pets: false, movein: '' };
    var count = $('[data-count]');
    var empty = $('[data-empty]');
    var apply = function () {
      var n = 0;
      homes.forEach(function (h) {
        var d = h.getAttribute('data-date') || '';
        var ok = (!st.type || h.getAttribute('data-type') === st.type) && +h.getAttribute('data-beds') >= st.beds
          && (!st.max || +h.getAttribute('data-rent') <= st.max) && (!st.pets || h.getAttribute('data-pets') !== 'none')
          && (!st.movein || !d || d <= st.movein);
        h.hidden = !ok;
        if (ok) n++;
      });
      if (count) count.textContent = count.getAttribute('data-tpl').replace('{n}', n);
      if (empty) empty.hidden = n > 0;
      $$('[data-type]', fl).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-type') === st.type)); });
    };
    fl.addEventListener('click', function (e) { var b = e.target.closest('button[data-type]'); if (b) { st.type = b.getAttribute('data-type'); apply(); } });
    $('[data-beds]', fl).addEventListener('change', function (e) { st.beds = +e.target.value; apply(); });
    $('[data-max]', fl).addEventListener('change', function (e) { st.max = +e.target.value; apply(); });
    $('[data-pets]', fl).addEventListener('change', function (e) { st.pets = e.target.checked; apply(); });
    $('[data-movein]', fl).addEventListener('change', function (e) { st.movein = e.target.value; apply(); });
    var avail = $('[data-avail-text]');
    if (avail) {
      var now = homes.filter(function (h) { var d = h.getAttribute('data-date'); return !d || d <= today; }).length;
      var big = $('[data-avail-now]');
      big.textContent = now;
      avail.textContent = avail.getAttribute('data-tpl').replace('{n}', homes.length);
    }
    apply();
  }

  // Ảnh của từng căn: vuốt ngang (không cần JS), nút trước/sau và số thứ tự ảnh.
  $$('[data-strip]').forEach(function (f) {
    var ul = $('.strip', f), n = ul.children.length, num = $('[data-strip-i]', f);
    var prev = $('[data-strip-step="-1"]', f), next = $('[data-strip-step="1"]', f);
    var at = function () { return Math.round(ul.scrollLeft / ul.clientWidth); };
    var upd = function () { var i = at(); num.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === n - 1; };
    f.classList.add('js-strip');
    f.addEventListener('click', function (e) { var b = e.target.closest('[data-strip-step]'); if (b) ul.scrollTo({ left: (at() + +b.getAttribute('data-strip-step')) * ul.clientWidth, behavior: 'smooth' }); });
    var t0; ul.addEventListener('scroll', function () { clearTimeout(t0); t0 = setTimeout(upd, 60); });
    upd();
  });

  // "Hẹn xem nhà" trên thẻ → chọn sẵn căn trong form.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-show]');
    if (a) { var sel = $('form[data-form="showing"] select[name="home"]'); if (sel) sel.value = a.getAttribute('data-show'); }
    var p = e.target.closest('[data-plan]');
    if (p) { var r = $('[data-calc] input[name="plan"][value="' + p.getAttribute('data-plan') + '"]'); if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); } }
  });
  var showForm = $('form[data-form="showing"]');
  if (showForm) {
    var dayIn = showForm.elements.day;
    dayIn.min = today;
  }

  // ── Bảng tính phí cho chủ nhà ──
  var cf = $('[data-calc]');
  if (cf) {
    var plans = JSON.parse($('[data-plans]', cf).textContent);
    var turnover = +cf.getAttribute('data-turnover') || 0;
    var tpl = JSON.parse(cf.getAttribute('data-tpl'));
    var out = function (k, v) { $('[data-r="' + k + '"]', cf).textContent = v; };
    var run = function () {
      var rent = Math.max(0, +cf.elements.rent.value || 0);
      var units = Math.max(1, Math.min(500, parseInt(cf.elements.units.value, 10) || 1));
      var id = (cf.querySelector('input[name="plan"]:checked') || {}).value;
      var p = plans.filter(function (x) { return x.id === id; })[0] || plans[0];
      var perUnit = Math.max(rent * p.pct / 100, p.min);
      var monthly = perUnit * units * 12;
      var leasing = rent * p.lease / 100 * units * turnover;
      var renewals = p.renewal * units * (1 - turnover);
      var yearly = monthly + leasing + renewals;
      var gross = rent * units * 12;
      out('monthly', money(Math.round(monthly)) + (units > 1 || perUnit !== rent * p.pct / 100 ? ' · ' + tpl.per.replace('{price}', money(Math.round(perUnit))) : ''));
      out('leasing', money(Math.round(leasing)));
      out('renewals', money(Math.round(renewals)));
      out('yearly', money(Math.round(yearly)));
      out('net', money(Math.round(gross - yearly)));
      out('eff', gross ? tpl.eff.replace('{pct}', (yearly / gross * 100).toFixed(1)).replace('{gross}', money(gross)) : '');
      cf.setAttribute('data-result', JSON.stringify({ perUnit: perUnit, yearly: Math.round(yearly), net: Math.round(gross - yearly) }));
    };
    cf.addEventListener('input', run);
    cf.addEventListener('change', run);
    cf.addEventListener('submit', function (e) { e.preventDefault(); });
    run();
  }

  // ── Báo sửa chữa: mức khẩn ──
  var rep = $('form[data-form="repair"]');
  if (rep) {
    var emer = $('[data-emer]', rep);
    var urg = function () { var u = rep.querySelector('input[name="urgency"]:checked'); emer.hidden = !u || u.getAttribute('data-u') !== 'emergency'; };
    rep.addEventListener('change', urg);
    urg();
  }

  // ── Gửi form: kiểm tra, soạn tin nhắn từ data-text ({tên trường}), Google Form nếu có, không thì bước "gửi qua kênh" ──
  $$('form[data-form]').forEach(function (form) {
    var err = $('[data-err]', form);
    var t0 = Date.now();
    var gform = form.getAttribute('data-gform');
    var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
    var fields = function () {
      var o = {};
      $$('input, select, textarea', form).forEach(function (el) {
        if (!el.name || el.type === 'radio' && !el.checked) return;
        if (el.type === 'checkbox') { o[el.name] = el.checked ? el.parentNode.textContent.trim() : ''; return; }
        o[el.name] = el.tagName === 'SELECT' && el.selectedOptions[0] ? (el.selectedOptions[0].getAttribute('data-label') || el.selectedOptions[0].textContent.trim()) : el.value.trim();
      });
      return o;
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var o = fields();
      if (o.website || Date.now() - t0 < 2000) return;
      var bad = $$('[required]', form).filter(function (el) {
        var v = el.value.trim();
        var b = el.type === 'tel' ? v.replace(/\D/g, '').length < 7 : !v;
        el.setAttribute('aria-invalid', b ? 'true' : 'false');
        return b;
      });
      err.hidden = !bad.length;
      if (bad.length) { bad[0].focus(); return; }
      var msg = form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '–'; });
      var box = $('[data-done]', form);
      var done = function () {
        $('.order-fields', form).hidden = true;
        box.hidden = false;
        box.focus();
        $$('button[data-channel]', box).forEach(function (b) { b.setAttribute('data-msg', msg); });
      };
      if (!gform) { done(); return; }
      var data = new URLSearchParams();
      var map = { name: o.name, phone: o.phone, product: o.home || o.address, note: msg };
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], map[k] || ''); });
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, done);
    });
    form.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-channel]');
      if (b) { send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || '', $('[data-msg]', form)); return; }
      if (e.target.closest('[data-edit]')) { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; }
    });
  });
})();
