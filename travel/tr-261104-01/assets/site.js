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

// Mẫu Trường trượt tuyết: dòng ngày trên đầu trang theo múi giờ trường; cột "Lớp hôm nay" tô lớp kế tiếp, gạch lớp đã qua, đếm giờ còn lại;
// "Bạn trượt tới đâu rồi?" tô các lớp hợp trình độ (làm mờ lớp khác), đếm số lớp hợp, chọn sẵn trình độ trong form;
// chip lọc lớp; bảng "Đặt lớp" có nút −/+ (số người) cho từng lớp / đồ thuê, số ngày, tạm tính = giá × người × ngày,
// giảm theo số ngày, nhắc học thêm bao nhiêu ngày để được giảm; ngày bắt đầu sớm nhất theo giờ đặt trước;
// album "Xem thêm" + xem ảnh lớn; form → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua WhatsApp / gọi / email.
// Không có JavaScript thì trang vẫn hiện đủ lớp học, bảng giảm giá và form ghi lớp bằng chữ.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var tz = body.getAttribute('data-tz') || undefined;
  var locale = body.getAttribute('data-locale') || 'en-US';
  var mf = JSON.parse(body.getAttribute('data-money') || '{}');
  var money = function (n) {
    try { return new Intl.NumberFormat(mf.locale || locale, { style: 'currency', currency: mf.currency || 'USD', maximumFractionDigits: mf.max, minimumFractionDigits: mf.max === 0 ? 0 : undefined }).format(n); } catch (e) { return String(n); }
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

  // Giờ, ngày hiện tại ở múi giờ của tiệm (không dùng toISOString: lệch ngày theo UTC).
  var now = function () {
    var o = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
    return { iso: o.year + '-' + o.month + '-' + o.day, min: Number(o.hour) * 60 + Number(o.minute), y: +o.year, m: +o.month, d: +o.day };
  };
  var isoAdd = function (n, days) { var d = new Date(Date.UTC(n.y, n.m - 1, n.d + days)); return d.toISOString().slice(0, 10); };
  var toMin = function (s) { var p = String(s).split(':'); return Number(p[0]) * 60 + Number(p[1] || 0); };

  var dl = $('[data-dateline]');
  if (dl) {
    try { dl.textContent = new Intl.DateTimeFormat(locale, { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()) + ' · ' + dl.textContent; } catch (e) { /* giữ chữ cũ */ }
  }

  // ── Lớp hôm nay ──
  var bakes = $('[data-bakes]');
  if (bakes) {
    var next = $('[data-next]', bakes);
    var rows = $$('[data-bake]', bakes);
    var tick = function () {
      var t = now().min, first = null;
      rows.forEach(function (li) {
        var m = toMin(li.getAttribute('data-bake'));
        li.classList.toggle('past', m <= t - 20);
        li.classList.remove('is-next');
        if (first === null && m > t - 20) first = li;
      });
      if (!next) return;
      if (!first) { next.textContent = next.getAttribute('data-done'); next.hidden = false; return; }
      first.classList.add('is-next');
      var left = toMin(first.getAttribute('data-bake')) - t;
      if (left <= 0) next.textContent = next.getAttribute('data-soon');
      else {
        var h = Math.floor(left / 60), mm = left % 60;
        next.innerHTML = next.getAttribute('data-tpl').replace('{time}', '<b>' + first.getAttribute('data-bake') + '</b>').replace('{left}', (h ? h + 'h ' : '') + mm + "'");
      }
      next.hidden = false;
    };
    tick();
    setInterval(tick, 60000);
  }

  // ── Trình độ: tô lớp hợp ──
  var lvBox = $('[data-levels]');
  if (lvBox) {
    var lvBtns = $$('[data-level]', lvBox);
    var lvItems = $$('[data-lv]');
    var setLevel = function (id) {
      lvBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-level') === id ? 'true' : 'false'); });
      var n = 0;
      lvItems.forEach(function (el) {
        var lv = el.getAttribute('data-lv');
        if (!lv) return;
        var ok = !id || (' ' + lv + ' ').indexOf(' ' + id + ' ') >= 0;
        el.classList.toggle('is-match', !!id && ok);
        el.classList.toggle('is-dim', !!id && !ok);
        if (id && ok && el.classList.contains('dish')) n += 1;
      });
      $$('[data-tip]', lvBox).forEach(function (p) {
        p.hidden = p.getAttribute('data-tip') !== id;
        var c = $('[data-tip-n]', p);
        if (c) c.textContent = c.getAttribute('data-tpl').replace('{n}', n);
      });
      var sel = $('[data-level-sel]');
      if (sel && id) sel.value = id;
    };
    lvBox.addEventListener('click', function (e) {
      if (e.target.closest('[data-level-clear]')) { setLevel(''); return; }
      var b = e.target.closest('[data-level]');
      if (!b) return;
      setLevel(b.getAttribute('aria-pressed') === 'true' ? '' : b.getAttribute('data-level'));
    });
  }

  // ── Lọc lớp ──
  var chips = $('[data-chips]');
  if (chips) chips.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    $$('[data-cat]', chips).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    var c = b.getAttribute('data-cat');
    $$('[data-group]').forEach(function (g) { g.hidden = !!c && g.getAttribute('data-group') !== c; });
  });

  // ── Album ──
  var album = $('[data-album]');
  if (album) {
    var tiles = $$('.ph', album);
    var more = $('[data-album-more]');
    var leftEl = more && $('[data-left]', more);
    var shown = 9;
    var applyAlbum = function () {
      tiles.forEach(function (t, i) { t.classList.add('more'); t.classList.toggle('show', i < shown); });
      if (more) { more.parentNode.hidden = tiles.length <= shown; if (leftEl) leftEl.textContent = '(' + (tiles.length - shown) + ')'; }
    };
    if (more) more.addEventListener('click', function () { shown += 12; applyAlbum(); });
    applyAlbum();
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var img = $('[data-lb-img]', lb), cnt = $('[data-lb-count]', lb);
      var at = 0;
      var open = function (i) { at = (i + tiles.length) % tiles.length; img.src = tiles[at].getAttribute('href'); cnt.textContent = (at + 1) + ' / ' + tiles.length; };
      album.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); open(tiles.indexOf(a)); lb.showModal(); });
      $('[data-lb-prev]', lb).addEventListener('click', function () { open(at - 1); });
      $('[data-lb-next]', lb).addEventListener('click', function () { open(at + 1); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(at + 1); if (e.key === 'ArrowLeft') open(at - 1); });
      var x0 = null;
      img.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      img.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) open(at + (dx < 0 ? 1 : -1)); x0 = null; });
    }
  }

  // ── Đặt lớp ──
  var form = $('form[data-order]');
  if (!form) return;
  var items = JSON.parse(($('[data-items]', form) || {}).textContent || '[]');
  var leadH = Number(form.getAttribute('data-lead')) || 0;
  var daysSel = $('[data-days]', form);
  var tiers = JSON.parse(form.getAttribute('data-tiers') || '[]');
  var qty = {}, pickV = {};
  var linesEl = $('[data-lines]', form);
  var dockN = $('[data-dock-n]');
  items.forEach(function (it) {
    qty[it.id] = 0; pickV[it.id] = 0;
    var li = document.createElement('li');
    li.className = 'line';
    li.setAttribute('data-line', it.id);
    var sel = it.vars.length > 1 ? '<select data-var aria-label="' + it.name.replace(/"/g, '&quot;') + '">' + it.vars.map(function (v) { return '<option value="' + v.i + '">' + (v.label ? v.label + ' · ' : '') + money(v.price) + '</option>'; }).join('') + '</select>' : '';
    li.innerHTML = '<span class="line-name"></span><span class="step"><button type="button" data-d="-1" aria-label="−">−</button><input type="number" inputmode="numeric" min="0" max="999" value="0"><button type="button" data-d="1" aria-label="+">+</button></span>';
    var nm = $('.line-name', li);
    nm.textContent = it.name;
    if (sel) nm.insertAdjacentHTML('beforeend', sel);
    else { var sm = document.createElement('small'); sm.textContent = money(it.vars[0].price); nm.appendChild(sm); }
    $('input', li).setAttribute('aria-label', it.name);
    linesEl.appendChild(li);
  });
  var priceOf = function (it) { var v = it.vars.filter(function (x) { return x.i === pickV[it.id]; })[0] || it.vars[0]; return v; };
  var calc = function () {
    var n = 0, sub = 0, days = Number(daysSel && daysSel.value) || 1;
    items.forEach(function (it) { n += qty[it.id]; sub += qty[it.id] * priceOf(it).price * days; });
    sub = Math.round(sub * 100) / 100;
    var tier = null, nextTier = null;
    tiers.forEach(function (x) { if (days >= x.days) tier = x; else if (!nextTier) nextTier = x; });
    var off = tier && n ? Math.round(sub * tier.off) / 100 : 0;
    if (mf.max === 0) off = Math.round(off);
    return { n: n, days: days, sub: sub, tier: n ? tier : null, nextTier: nextTier, off: off, total: sub - off };
  };
  var count = $('[data-count]', form), subEl = $('[data-sub]', form), offRow = $('[data-off-row]', form), offEl = $('[data-off]', form), offLb = $('[data-off-label]', form);
  var totalEl = $('[data-total]', form), hint = $('[data-hint]', form), empty = $('[data-empty]', form);
  var render = function () {
    var r = calc();
    count.textContent = r.n ? count.getAttribute('data-tpl').replace('{n}', r.n).replace('{d}', r.days) : '';
    subEl.textContent = money(r.sub);
    offRow.hidden = !r.tier;
    if (r.tier) { offLb.textContent = offLb.getAttribute('data-tpl').replace('{n}', r.tier.off); offEl.textContent = '−' + money(r.off); }
    totalEl.textContent = money(r.total);
    empty.hidden = r.n > 0;
    var msg = '';
    if (r.n && r.nextTier) msg = hint.getAttribute('data-tier-tpl').replace('{n}', r.nextTier.days - r.days).replace('{off}', r.nextTier.off);
    hint.textContent = msg; hint.hidden = !msg;
    if (dockN) { dockN.textContent = r.n; dockN.hidden = !r.n; }
    $$('[data-line]', form).forEach(function (li) {
      var id = li.getAttribute('data-line');
      li.classList.toggle('on', qty[id] > 0);
      var inp = $('input', li);
      if (document.activeElement !== inp) inp.value = qty[id];
    });
  };
  var setQty = function (id, n) { qty[id] = Math.max(0, Math.min(999, Math.round(Number(n) || 0))); render(); };
  linesEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-d]');
    if (!b) return;
    var id = b.closest('[data-line]').getAttribute('data-line');
    setQty(id, qty[id] + Number(b.getAttribute('data-d')));
  });
  linesEl.addEventListener('input', function (e) { if (e.target.type === 'number') setQty(e.target.closest('[data-line]').getAttribute('data-line'), e.target.value); });
  linesEl.addEventListener('change', function (e) {
    if (e.target.matches('[data-var]')) { pickV[e.target.closest('[data-line]').getAttribute('data-line')] = Number(e.target.value); render(); }
    if (e.target.type === 'number') render();
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-add]');
    if (!a) return;
    var id = a.getAttribute('data-add');
    if (!(id in qty)) return;
    setQty(id, qty[id] + 1);
    a.classList.add('added');
    setTimeout(function () { a.classList.remove('added'); }, 600);
  });
  if (daysSel) daysSel.addEventListener('change', render);
  render();

  // Ngày bắt đầu sớm nhất: hôm nay nếu còn khung giờ sau giờ đặt trước, không thì ngày mai.
  var day = form.querySelector('[name="day"]');
  var timeSel = form.querySelector('select[name="time"]');
  var n0 = now();
  var syncSlots = function () {
    if (!timeSel) return;
    var today = day && day.value === n0.iso;
    var firstOk = null;
    Array.prototype.forEach.call(timeSel.options, function (op) {
      var ok = !today || toMin(op.value) >= now().min + leadH * 60;
      op.disabled = !ok;
      if (ok && firstOk === null) firstOk = op;
    });
    if (timeSel.selectedOptions[0] && timeSel.selectedOptions[0].disabled && firstOk) timeSel.value = firstOk.value;
  };
  if (day) {
    var lastSlot = timeSel && timeSel.options.length ? toMin(timeSel.options[timeSel.options.length - 1].value) : 24 * 60;
    var startISO = n0.min + leadH * 60 <= lastSlot ? n0.iso : isoAdd(n0, 1);
    day.min = startISO;
    if (!day.value) day.value = startISO;
    day.addEventListener('change', syncSlots);
    syncSlots();
  }

  var fields = $('.order-fields', form);
  var box = $('[data-done]', form);
  var err = $('[data-err]', form);
  var btn = $('[data-submit]', form);
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) {
    var el = form.querySelector('[name="' + name + '"]');
    var s = el && (el.closest('.field') || el.closest('.check'));
    s = s && $('span', s);
    return s ? s.textContent.replace(/\s*\*$/, '').trim() : name;
  };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var r = calc();
    var list = items.filter(function (it) { return qty[it.id] > 0; }).map(function (it) { var v = priceOf(it); return it.name + (v.label ? ' (' + v.label + ')' : '') + ' × ' + qty[it.id]; });
    if (!list.length && get('items')) list = [get('items')];
    var lvSel = form.querySelector('[name="level"]');
    var lvText = lvSel && lvSel.value ? lvSel.selectedOptions[0].textContent : '';
    var daysText = daysSel ? daysSel.selectedOptions[0].textContent : '';
    return {
      name: get('name'), phone: get('phone'), address: get('stay'), product: list.join('; '), qty: String(r.n || ''),
      price: r.n ? money(r.total) : '', date: [get('day'), get('time')].filter(Boolean).join(' '), note: get('note'),
      size: daysText, color: lvText,
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'), _n: r.n,
    };
  };
  var text = function (x) {
    var rows = [['items', x.product], ['qty', x.qty], ['days', x.size], ['total', x.price], ['day', x.date], ['level', x.color], ['name', x.name], ['phone', x.phone], ['stay', x.address], ['note', x.note]];
    var names = JSON.parse(form.getAttribute('data-labels') || '{}');
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return (names[r[0]] || label(r[0])) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8]].forEach(function (y) {
      var el = form.querySelector('[name="' + y[0] + '"]');
      el.setAttribute('aria-invalid', y[1] ? 'true' : 'false');
      if (y[1]) ok = false;
    });
    err.textContent = !x.product ? err.getAttribute('data-pick-err') : err.getAttribute('data-req');
    err.hidden = ok && !!x.product;
    if (!ok) $('[aria-invalid="true"]', form).focus();
    return ok && !!x.product;
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
