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

// Mẫu Wedding planner: ảnh bên trái đổi theo phần đang đọc; bảng ngân sách (tổng + số khách → hạng mục, chi phí mỗi khách,
// cảnh báo dưới mức tối thiểu, phí planner từng gói = max(tối thiểu, % ngân sách)); đếm ngược theo ngày cưới (còn bao nhiêu tuần,
// mốc việc quá hạn / làm ngay / để sau, cảnh báo gói cần nhiều tháng chuẩn bị; theo múi giờ văn phòng, ?today= để thử);
// địa điểm lọc theo vùng + vừa số khách, xem lớn; phiếu hỏi → Google Form (nếu có) hoặc tin nhắn soạn sẵn.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var mo = JSON.parse(body.getAttribute('data-money') || '{}');
  var money = function (n) {
    try { return new Intl.NumberFormat(mo.locale, { style: 'currency', currency: mo.currency, maximumFractionDigits: Number.isInteger(n) ? 0 : 2 }).format(n); } catch (e) { return String(n); }
  };
  var form = $('form[data-book]');

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

  // ── Ảnh bên trái theo phần đang đọc ──
  var imgs = $$('[data-side-img]');
  if (imgs.length > 1 && 'IntersectionObserver' in window) {
    var setSide = function (k) {
      var has = imgs.some(function (i) { return i.getAttribute('data-side-img') === k; });
      if (!has) return;
      imgs.forEach(function (i) { i.classList.toggle('on', i.getAttribute('data-side-img') === k); });
    };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) setSide(e.target.getAttribute('data-side')); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-side]').forEach(function (s) { io.observe(s); });
  }

  // ── Đám cưới: lọc + xem lớn ──
  var grid = $('[data-stories]');
  if (grid) {
    var cards = $$('.story', grid), more = $('[data-stories-more]'), tag = '', shown = 4, need = 0;
    var fit = $('[data-vn-fit]'), none = $('[data-vn-none]');
    var apply = function () {
      var n = 0;
      cards.forEach(function (c) {
        var ok = (!tag || c.getAttribute('data-t') === tag) && (!need || +c.getAttribute('data-cap') >= need);
        c.classList.toggle('off', !ok);
        if (ok) { n++; c.classList.toggle('show', n <= shown); }
      });
      if (more) more.parentNode.hidden = n <= shown;
      if (none) none.hidden = n > 0;
      if (fit) { fit.hidden = !need; fit.textContent = fit.getAttribute('data-tpl').replace('{n}', need); }
    };
    window.__vnNeed = function (g) { need = g; shown = 4; apply(); };
    $$('.chip[data-tag]').forEach(function (b) {
      b.addEventListener('click', function () {
        tag = b.getAttribute('data-tag'); shown = 4;
        $$('.chip[data-tag]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        apply();
      });
    });
    if (more) more.addEventListener('click', function () { shown += 4; apply(); });
    cards.forEach(function (c) { c.classList.add('more'); });
    apply();
    var lb = $('[data-lb]');
    if (lb && lb.showModal) {
      var cur = null, k = 0, img = $('[data-lb-img]', lb);
      var show = function (i) { k = (i + cur.images.length) % cur.images.length; img.src = cur.images[k]; img.alt = cur.title; $('[data-lb-count]', lb).textContent = (k + 1) + ' / ' + cur.images.length; };
      grid.addEventListener('click', function (e) {
        var a = e.target.closest('[data-open]'); if (!a) return;
        e.preventDefault();
        cur = JSON.parse($('[data-story]', a.closest('.story')).textContent);
        $('[data-lb-title]', lb).textContent = cur.title;
        $('[data-lb-facts]', lb).textContent = cur.facts.join(' · ');
        show(0); lb.showModal();
      });
      $('[data-lb-prev]', lb).addEventListener('click', function () { show(k - 1); });
      $('[data-lb-next]', lb).addEventListener('click', function () { show(k + 1); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(k + 1); if (e.key === 'ArrowLeft') show(k - 1); });
    }
  }

  // ── Hôm nay theo múi giờ studio ──
  var today = (function () {
    var q = /[?&]today=(\d{4}-\d{2}-\d{2})/.exec(location.search);
    if (q) return q[1];
    var o = {};
    try { new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; }); }
    catch (e) { var d = new Date(); o = { year: d.getFullYear(), month: String(d.getMonth() + 1).padStart(2, '0'), day: String(d.getDate()).padStart(2, '0') }; }
    return o.year + '-' + o.month + '-' + o.day;
  })();
  var toUTC = function (s) { var p = s.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); };
  var addDays = function (s, n) { var d = toUTC(s); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

  var fmtDate = function (s) { try { return new Intl.DateTimeFormat(body.getAttribute('data-locale'), { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(toUTC(s)); } catch (e) { return s; } };
  // Lùi n tháng từ ngày cưới (giữ ngày, kẹp cuối tháng).
  var minusMonths = function (s, n) {
    var d = toUTC(s), y = d.getUTCFullYear(), m = d.getUTCMonth() - n, day = d.getUTCDate();
    var last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    return new Date(Date.UTC(y, m, Math.min(day, last))).toISOString().slice(0, 10);
  };
  var daysBetween = function (a, b) { return Math.round((toUTC(b) - toUTC(a)) / 864e5); };

  // ── Bảng ngân sách ──
  var bgLast = null;
  var bg = $('[data-budget]');
  if (bg) {
    var BG = JSON.parse(bg.getAttribute('data-budget')), BL = JSON.parse(bg.getAttribute('data-l'));
    var tIn = $('[data-bg-total]', bg), gIn = $('[data-bg-guests]', bg);
    var calcB = function () {
      var total = Math.max(0, +tIn.value || 0), g = Math.max(1, +gIn.value || 1);
      $('[data-bg-guests-out]', bg).textContent = g;
      var per = total / g;
      $('[data-bg-per]', bg).textContent = money(Math.round(per));
      var note = $('[data-bg-note]', bg);
      // Dưới mức tối thiểu mỗi khách: gợi ý giảm khách hoặc tăng ngân sách (số khách tối đa với ngân sách này).
      if (BG.min && per < BG.min) { note.textContent = BL.low.replace('{min}', money(BG.min)).replace('{n}', Math.floor(total / BG.min)); note.className = 'bg-note small warn'; }
      else { note.textContent = BL.ok; note.className = 'bg-note small'; }
      BG.split.forEach(function (x) {
        var li = $('[data-id="' + x.id + '"]', bg);
        if (li) $('[data-bg-v]', li).textContent = money(Math.round(total * x.p / 100));
      });
      var fees = $('[data-bg-fees]', bg); fees.innerHTML = '';
      BG.sv.forEach(function (s) {
        var fee = s.pct ? Math.max(s.min, Math.round(total * s.pct / 100)) : s.min;
        var li = document.createElement('li');
        li.innerHTML = '<span></span><b></b>';
        li.firstChild.textContent = s.n; li.lastChild.textContent = money(fee);
        fees.appendChild(li);
      });
      bgLast = { total: total, guests: g, text: BL.chip.replace('{total}', money(total)).replace('{n}', g).replace('{per}', money(Math.round(per))) };
      if (window.__vnNeed) window.__vnNeed(g);
    };
    bg.addEventListener('input', calcB);
    calcB();
    $('[data-bg-send]', bg).addEventListener('click', function () {
      if (!form || !bgLast) return;
      form.querySelector('[name="budget"]').value = money(bgLast.total);
      form.querySelector('[name="guests"]').value = bgLast.guests;
      form.querySelector('[name="estimate"]').value = bgLast.text;
      var chip = $('[data-est-chip]', form); chip.textContent = bgLast.text; chip.hidden = false;
    });
  }

  // ── Đếm ngược kế hoạch ──
  var ct = $('[data-count]');
  if (ct) {
    var CT = JSON.parse(ct.getAttribute('data-count')), CL = JSON.parse(ct.getAttribute('data-l'));
    var dIn = $('[data-ct-date]', ct), items = $$('[data-ct-list] > li', ct);
    dIn.min = addDays(today, 1);
    var runC = function () {
      var w = dIn.value, left = $('[data-ct-left]', ct), warn = $('[data-ct-warn]', ct);
      ct.classList.toggle('on', !!w);
      if (!w) return;
      var days = daysBetween(today, w);
      if (days <= 0) { left.textContent = CL.past; warn.hidden = true; items.forEach(function (li) { li.className = ''; $('[data-st]', li).textContent = ''; }); return; }
      left.textContent = CL.left.replace('{w}', Math.floor(days / 7)).replace('{d}', days);
      // Mốc đã qua hạn → "làm ngay"; mốc đầu tiên chưa tới hạn → "tiếp theo"; còn lại "để sau".
      var nextDone = false;
      CT.ms.forEach(function (m, i) {
        var due = minusMonths(w, m.m), li = items[i], st = $('[data-st]', li);
        if (due <= today) { li.className = 'late'; st.textContent = CL.late; }
        else if (!nextDone) { nextDone = true; li.className = 'now'; st.textContent = CL.now.replace('{date}', fmtDate(due)); }
        else { li.className = 'later'; st.textContent = CL.by.replace('{date}', fmtDate(due)); }
      });
      var months = days / 30.44;
      var rush = CT.sv.filter(function (s) { return months < s.m; }).map(function (s) { return s.n; });
      warn.hidden = !rush.length;
      if (rush.length) warn.textContent = CL.rush.replace('{list}', rush.join(', '));
      if (form) { var fd = form.querySelector('[data-day]'); if (fd && !fd.value) fd.value = w; }
    };
    dIn.addEventListener('change', runC);
    runC();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-choose]'); if (!a || !form) return;
    var sel = form.querySelector('[name="product"]');
    Array.prototype.forEach.call(sel.options, function (o) { if (o.text === a.getAttribute('data-choose')) sel.value = o.value; });
  });

  // ── Phiếu hỏi lịch ──
  if (!form) return;
  var fields = $('.book-fields', form), box = $('[data-done]', form), err = $('[data-err]', form), btn = $('[data-submit]', form);
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) { var el = form.querySelector('[name="' + name + '"]'); var s = el && el.closest('.field') && $('span', el.closest('.field')); return s ? s.textContent.replace(/\s*\*$/, '') : name; };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    return {
      name: get('name'), phone: [get('phone'), get('email')].filter(Boolean).join(' · '), product: get('product'), date: get('day'),
      address: [get('venue'), get('where')].filter(Boolean).join(' · '), qty: get('guests'), price: [get('budget'), get('estimate')].filter(Boolean).join(' · '), note: [get('note'), get('how')].filter(Boolean).join(' · '),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
      _email: get('email'), _phone: get('phone'), _note: get('note'), _how: get('how'), _budget: get('budget'), _where: get('where'), _est: get('estimate'),
    };
  };
  var text = function (x) {
    var rows = [['name', x.name], ['day', x.date], ['where', x._where], ['venue', x.address.split(' · ')[0] === x._where ? '' : x.address.split(' · ')[0]], ['guests', x.qty], ['budget', x._budget], ['product', x.product], ['estimate', x._est], ['email', x._email], ['phone', x._phone], ['note', x._note], ['how', x._how]];
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return r[0] === 'estimate' ? '≈ ' + r[1] : label(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x._email)]].forEach(function (y) {
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
