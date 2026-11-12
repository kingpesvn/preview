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

// Mẫu Nơi thờ tự (kiểu E): đổi dương lịch ↔ âm lịch (thuật toán Hồ Ngọc Đức, múi giờ data-lunar-tz: VN 7, lịch Hoa 8);
// dải "Hôm nay"; lịch sinh hoạt tô mục hôm nay (theo thứ hoặc ngày âm); ngày lễ âm lịch → ngày dương sắp tới + "còn n ngày", xếp gần nhất lên đầu;
// form đăng ký: gợi ý 4 ngày rằm / mùng một gần nhất, đổi nhãn ô danh sách theo lễ, đếm số tên; gửi Google Form hoặc tin nhắn soạn sẵn; chép số tài khoản.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var T = {};
  try { T = JSON.parse(($('#lunar-t') || {}).textContent || '{}'); } catch (e) { T = {}; }
  var TZ = +body.getAttribute('data-lunar-tz') || 7;
  var lang = body.getAttribute('data-lang') || 'vi';

  // ── Âm lịch ──
  var INT = Math.floor, PI = Math.PI;
  function jdFromDate(dd, mm, yy) {
    var a = INT((14 - mm) / 12), y = yy + 4800 - a, m = mm + 12 * a - 3;
    var jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    return jd;
  }
  function newMoon(k) {
    var T1 = k / 1236.85, T2 = T1 * T1, T3 = T2 * T1, dr = PI / 180;
    var jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3 + 0.00033 * Math.sin((166.56 + 132.87 * T1 - 0.009173 * T2) * dr);
    var M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    var Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    var F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    var C1 = (0.1734 - 0.000393 * T1) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M) - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr)
      - 0.0004 * Math.sin(dr * 3 * Mpr) + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr)) - 0.0074 * Math.sin(dr * (M - Mpr))
      + 0.0004 * Math.sin(dr * (2 * F + M)) - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr))
      + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    var dt = T1 < -11 ? 0.001 + 0.000839 * T1 + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T1 * T3 : -0.000278 + 0.000265 * T1 + 0.000262 * T2;
    return jd1 + C1 - dt;
  }
  function sunLong(jdn) {
    var T1 = (jdn - 2451545.0) / 36525, T2 = T1 * T1, dr = PI / 180;
    var M = 357.52910 + 35999.05030 * T1 - 0.0001559 * T2 - 0.00000048 * T1 * T2;
    var L0 = 280.46645 + 36000.76983 * T1 + 0.0003032 * T2;
    var DL = (1.914600 - 0.004817 * T1 - 0.000014 * T2) * Math.sin(dr * M) + (0.019993 - 0.000101 * T1) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    var L = (L0 + DL) * dr;
    return L - PI * 2 * INT(L / (PI * 2));
  }
  var sunSeg = function (d) { return INT(sunLong(d - 0.5 - TZ / 24) / PI * 6); };
  var nmDay = function (k) { return INT(newMoon(k) + 0.5 + TZ / 24); };
  function month11(yy) {
    var k = INT((jdFromDate(31, 12, yy) - 2415021) / 29.530588853), nm = nmDay(k);
    return sunSeg(nm) >= 9 ? nmDay(k - 1) : nm;
  }
  function leapOffset(a11) {
    var k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5), last, i = 1, arc = sunSeg(nmDay(k + i));
    do { last = arc; i++; arc = sunSeg(nmDay(k + i)); } while (arc !== last && i < 14);
    return i - 1;
  }
  /** Ngày dương (theo jd) → [ngày, tháng, năm âm, nhuận]. */
  function lunar(jd, yy) {
    var k = INT((jd - 2415021.076998695) / 29.530588853), start = nmDay(k + 1);
    if (start > jd) start = nmDay(k);
    var a11 = month11(yy), b11 = a11, ly;
    if (a11 >= start) { ly = yy; a11 = month11(yy - 1); } else { ly = yy + 1; b11 = month11(yy + 1); }
    var day = jd - start + 1, diff = INT((start - a11) / 29), leap = 0, mon = diff + 11;
    if (b11 - a11 > 365) { var lo = leapOffset(a11); if (diff >= lo) { mon = diff + 10; if (diff === lo) leap = 1; } }
    if (mon > 12) mon -= 12;
    if (mon >= 11 && diff < 4) ly -= 1;
    return [day, mon, ly, leap];
  }
  function jdToDate(jd) {
    var a = jd + 32044, b = INT((4 * a + 3) / 146097), c = a - INT(b * 146097 / 4);
    var d = INT((4 * c + 3) / 1461), e = c - INT(1461 * d / 4), m = INT((5 * e + 2) / 153);
    return [e - INT((153 * m + 2) / 5) + 1, m + 3 - 12 * INT(m / 10), b * 100 + d - 4800 + INT(m / 10)];
  }

  // Hôm nay theo múi giờ của nơi thờ tự; cho phép ?today=YYYY-MM-DD để kiểm tra.
  var q = /[?&]today=(\d{4})-(\d{2})-(\d{2})/.exec(location.search);
  var parts = {};
  try { new Intl.DateTimeFormat('en-CA', { timeZone: body.getAttribute('data-tz'), year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = +p.value; }); } catch (e) { var n = new Date(); parts = { year: n.getFullYear(), month: n.getMonth() + 1, day: n.getDate() }; }
  var today = q ? { year: +q[1], month: +q[2], day: +q[3] } : parts;
  var jd0 = jdFromDate(today.day, today.month, today.year);
  // Bảng 400 ngày tới: mỗi ngày một dòng [jd, ngày âm, tháng âm, nhuận]
  var days = [];
  for (var i = 0; i < 400; i++) { var s = jdToDate(jd0 + i), l = lunar(jd0 + i, s[2]); days.push({ jd: jd0 + i, s: s, d: l[0], m: l[1], y: l[2], leap: l[3] }); }
  var mName = function (m) { return (T.months || [])[m - 1] || String(m); };
  var dm = function (d, m) { return (T.dm || '{d}/{m}').replace('{d}', d).replace('{m}', mName(m)); };
  var yName = function (y) { return T.can && T.chi ? T.can[(y + 6) % 10] + ' ' + T.chi[(y + 8) % 12] : String(y); };
  var solar = function (s, long) { return new Date(Date.UTC(s[2], s[1] - 1, s[0])).toLocaleDateString(lang, long ? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' } : { weekday: 'short', day: 'numeric', month: 'numeric', timeZone: 'UTC' }); };
  var inDays = function (n, el) { return n === 0 ? el.getAttribute('data-today') : n === 1 ? el.getAttribute('data-tomorrow') : el.getAttribute('data-in').replace('{n}', n); };
  var t0 = days[0];
  // Ngày rằm / mùng một sắp tới (không tính hôm nay)
  var special = days.filter(function (x, i) { return i > 0 && (x.d === 1 || x.d === 15) && !x.leap; });

  var td = $('[data-today]');
  if (td) {
    $('[data-today-solar]', td).textContent = solar(t0.s, true);
    $('[data-today-lunar]', td).textContent = (T.full || '{dm} {y}').replace('{dm}', dm(t0.d, t0.m)).replace('{y}', yName(t0.y)) + (t0.leap ? ' (' + (T.leap || 'leap') + ')' : '');
    var nx = special[0];
    if (nx) $('[data-today-next]', td).textContent = (nx.d === 15 ? T.full15 : T.first1).replace('{m}', mName(nx.m)) + ' · ' + solar(nx.s) + ' · ' + (T.inDays || '{n}').replace('{n}', nx.jd - jd0);
    td.hidden = false;
  }

  // Lịch sinh hoạt: tô mục diễn ra hôm nay
  var wd = new Date(Date.UTC(today.year, today.month - 1, today.day)).getUTCDay();
  $$('.sched li').forEach(function (li) {
    var ds = li.getAttribute('data-days').split(' ').filter(Boolean).map(Number);
    var ls = li.getAttribute('data-lunar').split(' ').filter(Boolean).map(Number);
    var on = ls.length ? ls.indexOf(t0.d) >= 0 : !ds.length || ds.indexOf(wd) >= 0;
    li.classList.toggle('is-today', on);
    $('.sc-today', li).hidden = !on;
  });

  // Ngày lễ: ngày dương sắp tới + còn n ngày; xếp theo ngày gần nhất
  var fest = $('[data-fest]');
  if (fest) {
    var items = $$('.fe', fest).map(function (li) {
      var d = +li.getAttribute('data-ld'), m = +li.getAttribute('data-lm');
      var hit = days.filter(function (x) { return x.d === d && x.m === m && !x.leap; })[0];
      if (hit) {
        $('[data-fe-solar]', li).textContent = solar(hit.s, true);
        var n = hit.jd - jd0, e = $('[data-fe-in]', li);
        e.textContent = inDays(n, fest); e.hidden = false;
        li.classList.toggle('is-soon', n <= 30);
      }
      return { li: li, n: hit ? hit.jd - jd0 : 9999 };
    });
    items.sort(function (a, b) { return a.n - b.n; }).forEach(function (x) { fest.appendChild(x.li); });
  }

  // ── Đăng ký ──
  var form = $('[data-order]');
  var dates = $('[data-dates]');
  if (dates && form) {
    special.slice(0, 4).forEach(function (x) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip';
      b.textContent = (x.d === 15 ? T.full15 : T.first1).replace('{m}', mName(x.m)) + ' · ' + solar(x.s);
      b.addEventListener('click', function () {
        form.querySelector('[name="date"]').value = x.s[2] + '-' + ('0' + x.s[1]).slice(-2) + '-' + ('0' + x.s[0]).slice(-2);
        $$('.chip', dates).forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
      });
      b.setAttribute('aria-pressed', 'false');
      dates.appendChild(b);
    });
    dates.hidden = !special.length;
  }
  var copyBtns = $$('[data-copy]');
  copyBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-copy'), lbl = b.textContent;
      var ok = function () { b.textContent = b.getAttribute('data-done-label'); setTimeout(function () { b.textContent = lbl; }, 2000); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(ok, function () {}); else ok();
    });
  });
  if (!form) return;
  var names = form.querySelector('[name="names"]'), nl = $('[data-names-label]', form), cnt = $('[data-names-count]', form), wrap = $('[data-names]', form);
  var need = function () { var r = form.querySelector('[name="product"]:checked'); return r ? r.getAttribute('data-need') : ''; };
  var countNames = function () { return names.value.split('\n').filter(function (s) { return s.trim(); }).length; };
  var paint = function () {
    var n = need() || 'plain';
    nl.textContent = nl.getAttribute('data-' + n);
    names.placeholder = names.getAttribute('data-ph-' + n) || '';
    var k = countNames();
    cnt.textContent = n === 'people' || !k ? '' : cnt.getAttribute('data-tpl').replace('{n}', k);
  };
  form.addEventListener('change', paint);
  names.addEventListener('input', paint);
  paint();

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
  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var nm = get('names').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    var dt = get('date');
    var lun = '';
    if (dt) { var p = dt.split('-').map(Number), j = jdFromDate(p[2], p[1], p[0]), l = lunar(j, p[0]); lun = dm(l[0], l[1]); }
    return {
      name: get('name'), phone: get('phone'), product: get('product'),
      date: dt ? dt.split('-').reverse().join('/') + (lun ? ' (' + lun + ')' : '') : '',
      qty: need() === 'people' ? (nm.join(' ') || '') : String(nm.length || ''),
      note: [need() === 'people' ? '' : nm.join('; '), get('note')].filter(Boolean).join(' · '),
      page: location.href.split('#')[0], website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 8 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
    err.hidden = ok;
    var first = form.querySelector('[aria-invalid="true"]');
    if (!ok && first) first.focus();
    return ok;
  };
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var ts = Date.now();
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var o = order();
    if (o.website || Date.now() - ts < 2500) return;
    if (!channel && !valid()) return;
    var msg = text(o);
    var box = $('[data-done]', form);
    var done = function () {
      $('.order-fields', form).hidden = true;
      box.hidden = false; box.focus();
      $$('button[data-channel]', box).forEach(function (x) { x.setAttribute('data-msg', msg); });
    };
    if (!channel) {
      if (!gform) { done(); return; }
      var dt = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { dt.append(gmap[k], o[k] || ''); });
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: dt }).then(done, function () {
        btn.disabled = false;
        var f = box.querySelector('button[data-channel]');
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
