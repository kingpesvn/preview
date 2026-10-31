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

// Mẫu Công ty tour: lọc tour theo vùng; hộp lịch trình từng tour (dialog); ẩn ngày khởi hành đã qua (theo múi giờ của công ty),
// tính lại "khởi hành gần nhất" trên thẻ; lịch khởi hành lọc theo tháng + vùng (ô tìm nhanh ở đầu trang); danh sách hành lý tick được
// (lưu localStorage, có try/catch) + nút in; form đặt tour: ngày theo tour (hết chỗ / đã qua bị khóa), người lớn / trẻ em, phòng đơn,
// dịch vụ thêm (theo người hoặc theo đơn) → tạm tính + tiền cọc, gửi Google Form hoặc tin nhắn soạn sẵn; album "Xem thêm" + xem ảnh lớn.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || 'Asia/Ho_Chi_Minh';
  var lang = document.documentElement.lang || 'en';
  var today = (function () {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return p.year + '-' + p.month + '-' + p.day;
  })();
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var fmtDate = function (d, o) { try { return new Intl.DateTimeFormat(lang, Object.assign({ timeZone: 'UTC' }, o)).format(new Date(d + 'T00:00:00Z')); } catch (e) { return d; } };
  var short = { weekday: 'short', day: 'numeric', month: 'short' };

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

  // ── Ngày đã qua: ẩn trong hộp lịch trình + bảng, tính lại khởi hành gần nhất ──
  $$('.dates li[data-date]').forEach(function (li) { if (li.getAttribute('data-date') < today) li.hidden = true; });
  var form = $('[data-book]');
  var T = form ? JSON.parse(form.getAttribute('data-tours')) : [];
  var tourOf = function (id) { return T.filter(function (x) { return x.id === id; })[0] || T[0]; };
  $$('.tour[data-tour]').forEach(function (li) {
    var t = tourOf(li.getAttribute('data-tour')), p = $('[data-next]', li);
    if (!t || !p) return;
    var next = t.d.filter(function (d) { return d.date >= today && d.left > 0; })[0];
    $('span', p).textContent = next ? p.getAttribute('data-tpl').replace('{d}', fmtDate(next.date, short)).replace('{n}', next.left) : p.getAttribute('data-none');
  });

  // ── Lọc theo vùng (chip) ──
  var region = '', month = '';
  var chipsR = $('[data-regions]');
  var paintTours = function () {
    $$('.tour[data-region]').forEach(function (li) { li.hidden = !!region && li.getAttribute('data-region') !== region; });
    if (chipsR) $$('[data-region]', chipsR).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-region') === region)); });
  };
  if (chipsR) chipsR.addEventListener('click', function (e) { var b = e.target.closest('[data-region]'); if (!b) return; region = b.getAttribute('data-region'); paintTours(); paintDeps(); });

  // ── Lịch khởi hành: tháng ──
  var rows = $$('.deps tbody tr');
  var months = [];
  rows.forEach(function (r) { var m = r.getAttribute('data-date').slice(0, 7); if (r.getAttribute('data-date') >= today && months.indexOf(m) < 0) months.push(m); });
  var mName = function (m) { var s = fmtDate(m + '-01', { month: 'long', year: 'numeric' }); return s.charAt(0).toUpperCase() + s.slice(1); };
  var chipsM = $('[data-month-chips]');
  if (chipsM && months.length > 1) {
    chipsM.innerHTML = '<button type="button" class="chip" aria-pressed="true" data-month="">' + esc(chipsM.getAttribute('data-all')) + '</button>' + months.map(function (m) { return '<button type="button" class="chip" aria-pressed="false" data-month="' + m + '">' + esc(mName(m)) + '</button>'; }).join('');
    chipsM.hidden = false;
    chipsM.addEventListener('click', function (e) { var b = e.target.closest('[data-month]'); if (!b) return; month = b.getAttribute('data-month'); paintDeps(); });
  }
  var sel = $('[data-months]');
  if (sel) sel.innerHTML += months.map(function (m) { return '<option value="' + m + '">' + esc(mName(m)) + '</option>'; }).join('');
  var none = $('[data-dep-none]'), depMore = $('[data-dep-more]'), expanded = false, LIMIT = 8;
  if (depMore) depMore.addEventListener('click', function () { expanded = true; paintDeps(); });
  function paintDeps() {
    var n = 0, cut = !expanded && !month;
    rows.forEach(function (r) {
      var d = r.getAttribute('data-date');
      var hide = d < today || (month && d.slice(0, 7) !== month) || (region && r.getAttribute('data-region') !== region);
      if (!hide) n++;
      r.hidden = hide || (cut && n > LIMIT);
    });
    if (depMore) depMore.hidden = !(cut && n > LIMIT);
    if (none) none.hidden = n > 0;
    if (chipsM) $$('[data-month]', chipsM).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-month') === month)); });
  }
  paintDeps();
  var finder = $('[data-finder]');
  if (finder) finder.addEventListener('submit', function (e) {
    e.preventDefault();
    region = finder.region.value; month = finder.month.value;
    paintTours(); paintDeps();
    var target = $('#departures');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });

  // ── Hộp lịch trình ──
  $$('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = document.getElementById('tour-' + b.getAttribute('data-open'));
      if (d && d.showModal) d.showModal();
    });
  });
  $$('dialog.sheet').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
  });

  // ── Hành lý ──
  var pack = $('[data-packing]');
  if (pack) {
    var key = body.getAttribute('data-store') + '-pack';
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { saved = []; }
    var boxes = $$('input[type="checkbox"]', pack), count = $('[data-pack-count]');
    var paint = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      if (count) count.textContent = count.getAttribute('data-tpl').replace('{a}', n).replace('{b}', boxes.length);
    };
    boxes.forEach(function (b) {
      b.checked = saved.indexOf(+b.getAttribute('data-i')) >= 0;
      b.addEventListener('change', function () {
        var list = boxes.filter(function (x) { return x.checked; }).map(function (x) { return +x.getAttribute('data-i'); });
        try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) { /* trình duyệt chặn lưu: vẫn tick được */ }
        paint();
      });
    });
    paint();
    var pr = $('[data-print]');
    if (pr) pr.addEventListener('click', function () { window.print(); });
  }

  // ── Album ──
  var albumEl = $('[data-album]');
  if (albumEl) {
    var moreBtn = $('[data-album-more]');
    var extra = $$('.is-more', albumEl);
    extra.forEach(function (li) { li.hidden = true; });
    if (moreBtn) { moreBtn.hidden = false; moreBtn.addEventListener('click', function () { extra.forEach(function (li) { li.hidden = false; }); moreBtn.hidden = true; }); }
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var links = $$('a[data-zoom]', albumEl), img = $('[data-lb-img]', lb), at = 0;
      var open = function (i) { at = (i + links.length) % links.length; img.src = links[at].getAttribute('href'); };
      albumEl.addEventListener('click', function (e) { var a = e.target.closest('a[data-zoom]'); if (!a) return; e.preventDefault(); open(+a.getAttribute('data-zoom')); lb.showModal(); });
      $$('[data-lb-step]', lb).forEach(function (b) { b.addEventListener('click', function () { open(at + +b.getAttribute('data-lb-step')); }); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    }
  }

  // ── Đặt tour ──
  if (!form) return;
  var child = +form.getAttribute('data-child') || 0, dep = +form.getAttribute('data-dep') || 0;
  var cur = form.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(form.getAttribute('data-lang') || 'en', { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var money = function (v) { return fmt.format(v); };
  var round = function (v) { return /^(VND|JPY|KRW|IDR)$/.test(cur) ? Math.round(v) : Math.round(v * 100) / 100; };
  var tourSel = $('[data-tour-sel]', form), dateSel = $('[data-date-sel]', form), dateNote = $('[data-date-note]', form), seatNote = $('[data-seat-note]', form);
  var adEl = form.adults, chEl = form.children, single = $('[data-single]', form), singleRow = $('[data-single-row]', form);
  var renderDates = function (pickDate) {
    var t = tourOf(tourSel.value);
    var open = t.d.filter(function (d) { return d.date >= today; });
    dateSel.innerHTML = open.map(function (d) {
      var label = fmtDate(d.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + (d.left > 0 ? form.getAttribute('data-left').replace('{n}', d.left) : form.getAttribute('data-full'));
      return '<option value="' + d.date + '"' + (d.left > 0 ? '' : ' disabled') + '>' + esc(label) + '</option>';
    }).join('');
    var first = open.filter(function (d) { return d.left > 0; })[0];
    if (pickDate && open.some(function (d) { return d.date === pickDate && d.left > 0; })) dateSel.value = pickDate;
    else if (first) dateSel.value = first.date;
    dateNote.hidden = !!first;
    singleRow.hidden = !(t.s > 0 && t.n > 0);
    if (singleRow.hidden) single.checked = false;
    $('[data-single-price]', form).textContent = t.s ? '+ ' + money(t.s) : '';
  };
  var calc = function () {
    var t = tourOf(tourSel.value);
    var a = Math.max(1, parseInt(adEl.value, 10) || 1), c = Math.max(0, parseInt(chEl.value, 10) || 0);
    var ad = t.p * a, ch = round(t.p * child / 100) * c, si = single.checked ? t.s : 0;
    var add = $$('[name="addon"]:checked', form).reduce(function (s, x) { return s + +x.getAttribute('data-price') * (x.getAttribute('data-per') === '1' ? a + c : 1); }, 0);
    var total = ad + ch + si + add;
    var adL = $('[data-s-ad-l]', form), chL = $('[data-s-ch-l]', form);
    adL.textContent = adL.getAttribute('data-tpl').replace('{n}', a).replace('{p}', money(t.p));
    $('[data-s-ad]', form).textContent = money(ad);
    $('[data-s-ch-row]', form).hidden = !c;
    chL.textContent = chL.getAttribute('data-tpl').replace('{n}', c).replace('{p}', money(round(t.p * child / 100)));
    $('[data-s-ch]', form).textContent = money(ch);
    $('[data-s-si-row]', form).hidden = !si; $('[data-s-si]', form).textContent = money(si);
    $('[data-s-add-row]', form).hidden = !add; $('[data-s-add]', form).textContent = '+ ' + money(add);
    $('[data-s-total]', form).textContent = money(total);
    var d = $('[data-s-dep]', form);
    if (d) d.textContent = money(round(total * dep / 100));
    var dd = t.d.filter(function (x) { return x.date === dateSel.value; })[0];
    var over = dd && dd.left < 99 && a + c > dd.left;
    seatNote.hidden = !over;
    if (over) seatNote.textContent = seatNote.getAttribute('data-tpl').replace('{n}', dd.left);
    return { a: a, c: c, total: total, dep: round(total * dep / 100) };
  };
  $$('[data-step]', form).forEach(function (s) {
    var input = $('input', s);
    $$('button', s).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = (parseInt(input.value, 10) || 0) + +b.getAttribute('data-d');
        input.value = Math.min(+input.max, Math.max(+input.min, v)); calc();
      });
    });
  });
  tourSel.addEventListener('change', function () { renderDates(); calc(); });
  form.addEventListener('change', calc);
  form.addEventListener('input', calc);
  renderDates(); calc();
  $$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () {
      tourSel.value = a.getAttribute('data-pick'); renderDates(a.getAttribute('data-pick-date')); calc();
      var d = a.closest('dialog'); if (d) d.close();
    });
  });

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = calc();
    var extras = d.getAll('addon');
    var noteText = [extras.length ? '+ ' + extras.join(', ') : '', get('note')].filter(Boolean).join(' · ');
    return {
      name: get('name'), phone: get('phone'), email: get('email'), product: tourSel.options[tourSel.selectedIndex].text,
      version: dateSel.value ? fmtDate(dateSel.value, { day: 'numeric', month: 'numeric', year: 'numeric' }) : '',
      size: s.a + ' + ' + s.c, color: single.checked ? '✓' : '—', note: noteText,
      price: money(s.total) + (dep ? ' · ' + dep + '%: ' + money(s.dep) : ''), page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
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
    var noDate = !dateSel.value;
    dateSel.setAttribute('aria-invalid', noDate ? 'true' : 'false'); if (noDate) ok = false;
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
      var btn = $('[data-submit]', form);
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
