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

// Mẫu Phụ kiện cô dâu: bộ sưu tập lọc theo loại / độ dài voan / ngày cưới (ngày nhận = hôm nay + ngày làm + ngày giao; cần nhận trước ngày cưới
// shop.buffer ngày → thẻ báo "kịp, đặt trước ngày …", "chỉ kịp nếu gửi nhanh" hoặc ẩn); ô đầu trang đếm số món kịp theo ngày cưới + loại;
// chọn độ dài voan theo dáng váy + nơi cưới, chiều cao → voan dài khoảng bao nhiêu (inch hoặc cm theo khu vực); bảng tính đơn: ngày làm xong
// (+ ngày khắc chữ), ngày nhận, hạn đặt, giảm theo bộ khi mua từ setMin món giống nhau, miễn phí giao từ freeOver, tổng; "Đặt món này" điền vào form;
// form gửi Google Form hoặc tin nhắn. Thử: ?today=YYYY-MM-DD.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var cur = body.getAttribute('data-currency');
  var loc = body.getAttribute('data-locale') || 'en-US';
  var money = function (v) { v = Math.round((v || 0) * 100) / 100; return new Intl.NumberFormat(loc, { style: 'currency', currency: cur, maximumFractionDigits: v % 1 ? 2 : 0, minimumFractionDigits: v % 1 ? 2 : 0 }).format(v); };
  var RT = JSON.parse(body.getAttribute('data-rent') || '{}');
  var tz = body.getAttribute('data-tz') || 'America/Los_Angeles';
  var parts = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; });
  var today = parts.year + '-' + parts.month + '-' + parts.day;
  var qt = /[?&]today=(\d{4}-\d{2}-\d{2})/.exec(location.search); if (qt) today = qt[1];
  var addDays = function (iso, n) { return new Date(Date.parse(iso + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10); };
  var fmtD = function (iso) { try { return new Intl.DateTimeFormat(loc, { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(iso + 'T00:00:00Z')); } catch (e) { return iso; } };
  var byId = function (id) { return (RT.items || []).filter(function (x) { return x.id === id; })[0]; };
  var SH = RT.ships || [];
  var std = SH[0] || { d: 5, p: 0 };
  var diff = function (a, b) { return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5); };
  // Ngày nhận với cách giao s (+ x ngày làm thêm); hạn đặt = ngày cưới − buffer − ngày giao − ngày làm.
  var arrive = function (it, s, x) { return addDays(today, it.mk + (x || 0) + s.d); };
  var target = function (w) { return addDays(w, -(RT.buffer || 0)); };
  var orderBy = function (it, s, w, x) { return addDays(target(w), -(it.mk + (x || 0) + s.d)); };
  // Cách giao chậm nhất (rẻ nhất, theo thứ tự trong dữ liệu) mà vẫn kịp.
  var fits = function (it, w, x) { for (var i = 0; i < SH.length; i++) if (arrive(it, SH[i], x) <= target(w)) return SH[i]; return null; };

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

  // ── Bộ sưu tập: lọc loại / độ dài voan / ngày cưới ──
  var cards = $$('[data-cards] > li'), fType = '', fSize = $('[data-fsize]'), fDate = $('[data-fdate]');
  var L0 = (function () { var c = $('[data-fcount]'); return c ? c.getAttribute('data-tpl') : '{n}'; })();
  var LL = JSON.parse(($('[data-r-out]') || body).getAttribute('data-l') || '{}');
  var filter = function () {
    var n = 0, d = fDate && fDate.value, sz = fSize ? fSize.value : '';
    cards.forEach(function (li) {
      var it = byId(li.getAttribute('data-id')); if (!it) return;
      var ok = (!fType || li.getAttribute('data-type') === fType) && (!sz || it.sz.indexOf(sz) >= 0);
      var av = $('[data-avail]', li);
      if (d) {
        var s = fits(it, d);
        if (!s) { av.textContent = (LL.avNo || '').replace('{n}', Math.max(1, diff(target(d), arrive(it, SH[SH.length - 1] || std)))); av.className = 'avail small is-busy'; ok = false; }
        else if (s === std) { av.textContent = (LL.avOk || '').replace('{date}', fmtD(orderBy(it, std, d))); av.className = 'avail small is-free'; }
        else { av.textContent = (LL.avExp || '').replace('{ship}', s.n); av.className = 'avail small is-warn'; }
      } else { av.textContent = ''; av.className = 'avail small'; }
      li.hidden = !ok; if (ok) n++;
    });
    var cnt = $('[data-fcount]'); if (cnt) cnt.textContent = d || fType || sz ? L0.replace('{n}', n) : '';
    var none = $('[data-none]'); if (none) none.hidden = n > 0;
    return n;
  };
  var filtersEl = $('[data-filters]');
  if (filtersEl) {
    $$('[data-ft]', filtersEl).forEach(function (b) {
      b.addEventListener('click', function () { fType = b.getAttribute('data-ft'); $$('[data-ft]', filtersEl).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); filter(); });
    });
    if (fSize) fSize.addEventListener('change', filter);
    if (fDate) { fDate.min = addDays(today, 1); fDate.addEventListener('change', filter); }
  }

  // ── Ô đầu trang: số bộ còn trống theo ngày + loại ──
  var quick = $('[data-quick]');
  if (quick) {
    var qd = $('[data-q-date]', quick), qOut = $('[data-q-free]', quick);
    qd.min = addDays(today, 1);
    var qrun = function () {
      if (!qd.value) return;
      var n = 0;
      (RT.items || []).forEach(function (it) {
        if (quick.qtype.value && it.t !== quick.qtype.value) return;
        if (fits(it, qd.value)) n++;
      });
      qOut.textContent = qOut.getAttribute('data-tpl').replace('{n}', n);
    };
    quick.addEventListener('change', qrun); quick.addEventListener('input', qrun);
    quick.addEventListener('submit', function (e) {
      e.preventDefault();
      if (fDate) fDate.value = qd.value;
      var b = $('[data-ft="' + (quick.qtype.value || '') + '"]'); if (b) b.click(); else filter();
      var rd = $('[data-r-date]'); if (rd && qd.value) { rd.value = qd.value; rd.dispatchEvent(new Event('change', { bubbles: true })); }
      location.hash = 'costumes';
    });
  }

  // ── Chọn độ dài voan ──
  var szForm = $('[data-size-form]'), szOut = $('[data-size-out]'), mySize = '';
  if (szForm && szOut) {
    var SL = JSON.parse(szOut.getAttribute('data-l'));
    var vById = function (id) { return (RT.veils || []).filter(function (x) { return x.id === id; })[0]; };
    var srun = function () {
      var big = $('[data-sz-big]', szOut), txt = $('[data-sz-text]', szOut), use = $('[data-sz-use]', szOut);
      $$('[data-sz]', szForm).forEach(function (tr) { tr.classList.remove('on'); });
      var sil = szForm.sil.value, ven = szForm.ven.value;
      if (!sil || !ven) { big.textContent = '—'; txt.textContent = SL.pick; use.hidden = true; mySize = ''; return; }
      var v = vById((RT.guide[sil] || {})[ven]);
      if (!v) { big.textContent = '—'; txt.textContent = SL.off; use.hidden = true; mySize = ''; return; }
      mySize = v.id; big.textContent = v.n;
      var h = +szForm.h.value || (RT.units === 'in' ? 65 : 165);
      txt.textContent = SL.is.replace('{x}', Math.round(h * v.r) + ' ' + RT.units);
      var n = (RT.items || []).filter(function (it) { return it.sz.indexOf(mySize) >= 0; }).length;
      txt.textContent += ' ' + SL.fits.replace('{n}', n);
      $$('[data-sz]', szForm).forEach(function (tr) {
        var x = vById(tr.getAttribute('data-sz')); tr.lastElementChild.textContent = '≈ ' + Math.round(h * x.r) + ' ' + RT.units;
      });
      var tr = $('[data-sz="' + mySize + '"]', szForm); if (tr) tr.classList.add('on');
      use.hidden = !n;
    };
    szForm.addEventListener('input', srun); szForm.addEventListener('change', srun);
    $('[data-sz-use]', szOut).addEventListener('click', function () {
      if (fSize) { fSize.value = mySize; filter(); }
    });
  }

  // ── Bảng tính đơn ──
  var rf = $('[data-rent-form]'), ro = $('[data-r-out]'), last = null;
  if (rf && ro) {
    var RL = LL;
    var rDate = $('[data-r-date]', rf), rLen = $('[data-r-len]', rf), rQty = $('[data-r-qty]', rf);
    rDate.min = addDays(today, 1);
    var fill = function () {
      var it = byId(rf.item.value);
      var keepL = (rf.querySelector('[name="len"]:checked') || {}).value;
      rLen.innerHTML = it.v.map(function (v, i) { return '<label class="chip"><input type="radio" name="len" value="' + i + '"' + ((keepL && +keepL < it.v.length ? +keepL === i : !i) ? ' checked' : '') + '><span>' + esc(v.l) + ' · ' + esc(money(v.p)) + '</span></label>'; }).join('');
      if (!rf.querySelector('[name="len"]:checked')) rf.querySelector('[name="len"]').checked = true;
    };
    var rrun = function () {
      var it = byId(rf.item.value), v = it.v[+(rf.querySelector('[name="len"]:checked') || { value: 0 }).value] || it.v[0];
      var q = Math.max(1, Math.min(20, Math.round(+rQty.value || 1)));
      var sId = (rf.querySelector('[name="how"]:checked') || {}).value;
      var s = SH.filter(function (x) { return x.id === sId; })[0] || std;
      var xd = 0, lines = [], sub = v.p * q;
      lines.push([RL.item.replace('{n}', q).replace('{p}', money(v.p)), v.p * q]);
      // Giảm theo bộ: từ setMin món giống nhau (phù dâu) → −setOff % tiền món.
      var off = q >= RT.setMin && RT.setOff ? Math.round(v.p * q * RT.setOff) / 100 : 0;
      if (off) { lines.push([RL.set.replace('{n}', RT.setMin).replace('{p}', RT.setOff), -off]); sub -= off; }
      var ex = [];
      $$('[name="extra"]:checked', rf).forEach(function (c) { var x = RT.extras.filter(function (e) { return e.id === c.value; })[0]; if (x) { var xp = x.p * q; lines.push([x.n + (q > 1 ? ' ×' + q : ''), xp]); sub += xp; xd = Math.max(xd, x.d); ex.push(x.n); } });
      var free = RT.freeOver && sub >= RT.freeOver;
      var shipP = free ? 0 : s.p;
      if (s.p) lines.push([RL.ship.replace('{s}', s.n), shipP]);
      var total = sub + shipP;
      $('[data-r-lines]', ro).innerHTML = lines.map(function (l) { return '<div><dt>' + esc(l[0]) + '</dt><dd>' + esc(l[1] < 0 ? '−' + money(-l[1]) : l[1] === 0 ? RL.free : money(l[1])) + '</dd></div>'; }).join('');
      $('[data-r-total]', ro).textContent = money(total);
      $('[data-r-note]', ro).textContent = !RT.freeOver ? '' : free ? RL.freeGot : RL.freeNote.replace('{price}', money(RT.freeOver - sub));
      var st = $('[data-r-status]', ro), dl = $('[data-r-dates]', ro), w = rDate.value;
      var ready = addDays(today, it.mk + xd), arr = arrive(it, s, xd);
      dl.innerHTML = '<div><dt>' + esc(RL.ready) + '</dt><dd>' + esc(fmtD(ready)) + '</dd></div><div><dt>' + esc(RL.arrive) + '</dt><dd>' + esc(fmtD(arr)) + '</dd></div>';
      st.className = 'r-status';
      var ok = false;
      if (!w) st.textContent = RL.noDate;
      else if (w <= today) { st.textContent = RL.past; st.className = 'r-status is-busy'; }
      else {
        dl.innerHTML += '<div><dt>' + esc(RL.orderBy) + '</dt><dd>' + esc(fmtD(orderBy(it, s, w, xd))) + '</dd></div>';
        if (arr <= target(w)) { st.textContent = RL.ok.replace('{n}', diff(arr, w)); st.className = 'r-status is-free'; ok = true; }
        else { var f = fits(it, w, xd); st.textContent = RL.late + ' ' + (f ? RL.tryShip.replace('{ship}', f.n) : RL.rush); st.className = 'r-status is-busy'; }
      }
      last = { it: it, v: v, q: q, s: s, ok: ok, date: w, total: total, extras: ex };
    };
    rf.addEventListener('change', function (e) { if (e.target.name === 'item') fill(); rrun(); });
    rf.addEventListener('input', rrun);
    fill(); rrun();
    $$('[data-pick]').forEach(function (a) {
      a.addEventListener('click', function () {
        rf.item.value = a.getAttribute('data-pick'); fill();
        if (fDate && fDate.value && !rDate.value) rDate.value = fDate.value;
        rrun();
      });
    });
    if (fDate) fDate.addEventListener('change', function () { if (!rDate.value) { rDate.value = fDate.value; rrun(); } });
  }

  // ── Album ──
  var albumEl = $('[data-album]');
  if (albumEl) {
    var more = $('[data-album-more]');
    var extraPics = $$('.is-more', albumEl);
    extraPics.forEach(function (li) { li.hidden = true; });
    if (more) { more.hidden = false; more.addEventListener('click', function () { extraPics.forEach(function (li) { li.hidden = false; }); more.hidden = true; }); }
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var links = $$('a[data-zoom]', albumEl), img = $('[data-lb-img]', lb), at = 0;
      var openPic = function (i) { at = (i + links.length) % links.length; img.src = links[at].getAttribute('href'); };
      albumEl.addEventListener('click', function (e) { var a = e.target.closest('a[data-zoom]'); if (!a) return; e.preventDefault(); openPic(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { openPic(at + +b.getAttribute('data-lb-step')); }); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    }
  }

  // ── Đặt khảo sát ──
  var form = $('[data-survey]');
  if (!form) return;
  var cfgBox = $('[data-cfg]', form), cfgText = $('[data-cfg-text]', form), cfgInput = $('[data-cfg-input]', form);
  var setCfg = function (text) { cfgInput.value = text; cfgText.textContent = text; cfgBox.hidden = !text; };
  var useRent = $('[data-use-rent]');
  if (useRent) useRent.addEventListener('click', function () {
    if (!last) return;
    setCfg([last.it.n + ' ×' + last.q, last.v.l, last.s.n, last.extras.join(', '), money(last.total)].filter(Boolean).join(' · '));
    form.ptype.value = last.it.id; if (last.date) form.date.value = last.date;
  });
  var dateEl = $('[data-date]', form);
  dateEl.min = addDays(today, 1);
  dateEl.addEventListener('change', function () { if (dateEl.value && dateEl.value <= today) dateEl.value = addDays(today, 1); });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var ts = form.ptype;
    return {
      name: get('name'), phone: get('phone'), address: get('address'), date: get('date') || '—', qty: last && last.it.id === ts.value ? String(last.q) : '1',
      size: last && last.it.id === ts.value ? [last.v.l, last.s.n].join(', ') : '', product: get('cfg') || (ts.options[ts.selectedIndex] ? ts.options[ts.selectedIndex].text : '—'), note: get('note'),
      price: last && get('cfg').indexOf(money(last.total)) >= 0 ? money(last.total) : '—',
      page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['date', 'name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 7 : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
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
    if (o.website || Date.now() - t0 < 2500) return;
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
    var b = channel; channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.product);
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; });
})();
