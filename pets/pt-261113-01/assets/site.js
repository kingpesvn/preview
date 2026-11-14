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

// Mẫu Huấn luyện chó: thanh đầu trang trong suốt trên ảnh, đổi nền khi cuộn; ngày khai giảng (ẩn ngày đã qua, hiện tối đa 3 ngày,
// báo số chỗ còn / hết chỗ, bấm để đưa lớp + ngày vào form); trắc nghiệm 3 câu → gợi ý lớp; gói kèm riêng (giá mỗi buổi, tiết kiệm,
// phí đi lại × số buổi); form đăng ký: lớp nhóm tính theo số chó, kèm riêng tính theo gói + phí đi lại, dịch vụ thêm → tạm tính,
// bắt buộc tên chó và cam kết tiêm phòng; gửi Google Form hoặc tin nhắn soạn sẵn; album. Thử: ?today=YYYY-MM-DD.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var tz = body.getAttribute('data-tz') || 'America/Chicago';
  var parts = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; });
  var today = parts.year + '-' + parts.month + '-' + parts.day;
  var qs = new URLSearchParams(location.search);
  if (/^\d{4}-\d{2}-\d{2}$/.test(qs.get('today') || '')) today = qs.get('today');
  var loc = body.getAttribute('data-locale') || 'en-US';
  var addDays = function (iso, n) { return new Date(Date.parse(iso + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10); };
  var dText = function (iso) { return new Intl.DateTimeFormat(loc, { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(iso + 'T00:00:00Z')); };

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

  // ── Thanh đầu trang ──
  var head = $('[data-header]');
  var onScroll = function () { if (head) head.classList.toggle('is-solid', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Ngày khai giảng: ẩn ngày đã qua, hiện tối đa 3 ngày, báo số chỗ ──
  var LS = JSON.parse((($('#lessons') || body).getAttribute('data-l')) || '{}');
  $$('[data-starts]').forEach(function (box) {
    var shown = 0;
    $$('li', box).forEach(function (li) {
      var d = li.getAttribute('data-date');
      if (d.charAt(0) === '+') { d = addDays(today, +d.slice(1)); li.setAttribute('data-date', d); }
      var spots = +li.getAttribute('data-spots');
      if (d < today || shown >= 3) { li.hidden = true; return; }
      shown++;
      $('[data-start-date]', li).textContent = dText(d);
      $('[data-start-spots]', li).textContent = spots > 1 ? LS.spots.replace('{n}', spots) : spots === 1 ? LS.one : LS.full;
      if (!spots) { $('button', li).disabled = true; li.classList.add('is-full'); }
    });
    if (!shown) { var p = document.createElement('p'); p.className = 'muted small'; p.textContent = box.getAttribute('data-none'); box.appendChild(p); $('ul', box).hidden = true; }
  });

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

  // ── Đăng ký lớp / gói kèm riêng ──
  var form = $('[data-book]');
  if (!form) return;
  var D = JSON.parse(form.getAttribute('data-items'));
  var cur = form.getAttribute('data-currency');
  var money = function (v) { v = Math.round((v || 0) * 100) / 100; return new Intl.NumberFormat(loc, { style: 'currency', currency: cur, maximumFractionDigits: v % 1 ? 2 : 0, minimumFractionDigits: v % 1 ? 2 : 0 }).format(v); };
  var sel = $('[data-item]', form), vars = $('[data-variants]', form), varField = $('[data-var-field]', form);
  var ppl = form.people, maxNote = $('[data-max-note]', form), vacc = $('[data-vacc]', form), zoneEl = $('[data-zone]', form);
  var dateEl = $('[data-date]', form);
  dateEl.min = today;
  if (!dateEl.value) {
    var tm = new Date(Date.parse(today + 'T00:00:00Z') + 864e5).toISOString().slice(0, 10);
    dateEl.value = tm;
  }
  var item = function () { return D.filter(function (x) { return x.id === sel.value; })[0] || D[0]; };
  var renderVars = function () {
    var it = item();
    vars.innerHTML = it.v.map(function (v, i) { return '<label class="opt"><input type="radio" name="version" value="' + esc(v.l || '—') + '" data-price="' + v.p + '" data-s="' + (v.s || 1) + '"' + (i ? '' : ' checked') + '><span>' + (v.l ? esc(v.l) + ' · ' : '') + esc(v.m) + '</span></label>'; }).join('');
    varField.hidden = it.v.length < 2;
    var lesson = it.k === 'lesson';
    $$('[data-lesson-only]', form).forEach(function (el) { el.hidden = !lesson; });
    $$('[data-private-only]', form).forEach(function (el) { el.hidden = lesson; });
  };
  var calc = function () {
    var it = item();
    var v = form.querySelector('[name="version"]:checked');
    var price = v ? +v.getAttribute('data-price') : (it.v[0] ? it.v[0].p : 0);
    var lesson = it.k === 'lesson';
    // Lớp nhóm: giá × số chó. Kèm riêng: giá gói + phí đi lại mỗi buổi × số buổi của gói.
    var n = lesson ? Math.max(1, parseInt(ppl.value, 10) || 1) : 1;
    var base = price * n;
    var zo = !lesson && zoneEl ? zoneEl.options[zoneEl.selectedIndex] : null;
    var travel = zo ? +zo.getAttribute('data-price') * (v ? +v.getAttribute('data-s') || 1 : 1) : 0;
    var add = $$('[name="addon"]:checked', form).reduce(function (s, x) { return s + +x.getAttribute('data-price') * (x.getAttribute('data-per') === '1' ? n : 1); }, 0);
    var line = $('[data-s-line]', form);
    line.textContent = line.getAttribute('data-tpl').replace('{n}', n).replace('{p}', money(price));
    $('[data-s-base]', form).textContent = money(base);
    $('[data-s-add-row]', form).hidden = !add; $('[data-s-add]', form).textContent = '+ ' + money(add);
    $('[data-s-travel-row]', form).hidden = !travel; $('[data-s-travel]', form).textContent = '+ ' + money(travel);
    $('[data-s-total]', form).textContent = money(base + add + travel);
    var over = lesson && it.max && n > it.max;
    maxNote.hidden = !over;
    if (over) maxNote.textContent = maxNote.getAttribute('data-tpl').replace('{n}', it.max);
    return { n: n, total: base + add + travel, zone: zo && travel ? zo.text : '' };
  };
  $$('[data-step] button', form).forEach(function (b) {
    b.addEventListener('click', function () { ppl.value = Math.min(+ppl.max, Math.max(+ppl.min, (parseInt(ppl.value, 10) || 1) + +b.getAttribute('data-d'))); calc(); });
  });
  sel.addEventListener('change', function () { renderVars(); calc(); });
  form.addEventListener('change', calc);
  form.addEventListener('input', calc);
  renderVars(); calc();
  var pickItem = function (id, vi, zone) {
    sel.value = id; renderVars();
    if (vi != null) { var r = form.querySelectorAll('[name="version"]')[vi]; if (r) r.checked = true; }
    if (zone && zoneEl) zoneEl.value = zone;
    calc();
  };
  $$('[data-pick]').forEach(function (a) { a.addEventListener('click', function () { pickItem(a.getAttribute('data-pick')); }); });
  $$('[data-start]').forEach(function (b) {
    b.addEventListener('click', function () { pickItem(b.getAttribute('data-start')); dateEl.value = b.closest('li').getAttribute('data-date'); location.hash = 'book'; });
  });

  // ── Trắc nghiệm: luật đầu tiên khớp cả ba câu trả lời ──
  var qz = $('[data-quiz]');
  if (qz) {
    var rules = JSON.parse(qz.getAttribute('data-quiz')), names = JSON.parse(qz.getAttribute('data-names'));
    var qb = $('[data-quiz-book]', qz), picked = null;
    var ans = function (k) { var e = qz.querySelector('[name="' + k + '"]:checked'); return e ? e.value : ''; };
    qz.addEventListener('change', function () {
      var a = ans('age'), g = ans('goal'), m = ans('mode');
      if (!a || !g || !m) return;
      var r = rules.filter(function (x) { return (!x.a || x.a === a) && (!x.g || x.g === g) && (!x.m || x.m === m); })[0];
      if (!r) return;
      picked = r.p;
      $('[data-quiz-name]', qz).textContent = names[r.p]; $('[data-quiz-why]', qz).textContent = r.w; qb.hidden = false;
      $('[data-quiz-out]', qz).classList.add('is-set');
    });
    qb.addEventListener('click', function () { if (picked) pickItem(picked); });
  }

  // ── Gói kèm riêng ──
  var pv = $('[data-private]');
  if (pv) {
    var P = JSON.parse(pv.getAttribute('data-private'));
    var pz = $('[data-pv-zone]', pv);
    var pcalc = function () {
      var c = pv.querySelector('[name="pv-pack"]:checked'), i = c ? +c.value : 0, v = P.v[i];
      var single = P.v.filter(function (x) { return x.s === 1; })[0];
      var z = P.z.filter(function (x) { return pz && x.id === pz.value; })[0] || { p: 0 };
      var travel = z.p * v.s, save = single ? single.p * v.s - v.p : 0;
      $('[data-pv-each]', pv).textContent = money(v.p / v.s);
      $('[data-pv-save-row]', pv).hidden = !(save > 0); $('[data-pv-save]', pv).textContent = money(save);
      $('[data-pv-travel-row]', pv).hidden = !travel; $('[data-pv-travel]', pv).textContent = '+ ' + money(travel);
      $('[data-pv-total]', pv).textContent = money(v.p + travel);
      return { i: i, z: pz ? pz.value : '' };
    };
    pv.addEventListener('change', pcalc); pcalc();
    $('[data-pv-book]', pv).addEventListener('click', function () { var x = pcalc(); pickItem(P.id, x.i, x.z); });
  }

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var s = calc();
    var extras = d.getAll('addon');
    return {
      name: get('name'), phone: get('phone'), product: sel.options[sel.selectedIndex].text, version: get('version'),
      date: get('date'), time: get('time'), size: String(s.n),
      color: [get('dog'), get('breed'), get('level'), vacc && vacc.checked ? '✓ vaccines' : ''].filter(Boolean).join(' · '),
      note: [s.zone, extras.length ? '+ ' + extras.join(', ') : '', get('note')].filter(Boolean).join(' · '),
      price: money(s.total), page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = true;
    ['date', 'dog', 'name', 'phone'].forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]'), v = (el.value || '').trim();
      var bad = k === 'phone' ? v.replace(/\D/g, '').length < 7 : k === 'date' ? !v || v < today : !v;
      el.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false;
    });
    err.textContent = err.getAttribute('data-req-msg');
    if (ok && vacc && !vacc.checked) { err.textContent = err.getAttribute('data-vacc-msg'); vacc.focus(); err.hidden = false; return false; }
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
