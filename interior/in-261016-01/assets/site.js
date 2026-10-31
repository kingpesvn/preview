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

// Mẫu Nội thất gỗ: công trình lọc theo loại + "Xem thêm" + hộp xem (kéo so sánh trước/sau, ảnh thêm); ô ước tính chi phí
// (diện tích × đơn giá theo gói) → điền sẵn vào phiếu khảo sát; nút "Hỏi giá" chọn sẵn hạng mục;
// phiếu đặt lịch khảo sát → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp. Không JS: vẫn đủ công trình, giá, form.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var mo = JSON.parse(body.getAttribute('data-money') || '{}');
  var money = function (n) {
    try { return new Intl.NumberFormat(mo.locale, { style: 'currency', currency: mo.currency, maximumFractionDigits: mo.max || 0 }).format(n); } catch (e) { return String(n); }
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

  var form = $('form[data-book]');
  var setField = function (name, v) {
    var el = form && form.querySelector('[name="' + name + '"]'); if (!el) return;
    if (el.tagName === 'SELECT') { Array.prototype.forEach.call(el.options, function (op) { if (op.value === v || op.text === v) el.value = op.value; }); } else el.value = v;
  };

  // ── Công trình ──
  var grid = $('[data-projs]');
  if (grid) {
    var cards = $$('.proj', grid), more = $('[data-proj-more]'), type = '', shown = 9;
    var apply = function () {
      var n = 0;
      cards.forEach(function (c) {
        var ok = !type || c.getAttribute('data-t') === type;
        c.classList.toggle('off', !ok);
        if (ok) { n++; c.classList.toggle('show', n <= shown); }
      });
      if (more) more.parentNode.hidden = n <= shown;
    };
    $$('.chip[data-type]').forEach(function (b) {
      b.addEventListener('click', function () {
        type = b.getAttribute('data-type'); shown = 9;
        $$('.chip[data-type]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        apply();
      });
    });
    if (more) more.addEventListener('click', function () { shown += 9; apply(); });
    cards.forEach(function (c) { c.classList.add('more'); });
    apply();

    var pv = $('[data-pv]');
    if (pv && pv.showModal) {
      var img = $('[data-pv-img]', pv), thumbs = $('[data-pv-thumbs]', pv), ba = $('[data-ba]', pv);
      var range = $('[data-ba-range]', pv), cur = null;
      var setBa = function (v) { ba.style.setProperty('--x', v + '%'); };
      range.addEventListener('input', function () { setBa(range.value); });
      var show = function (i) {
        var list = cur.items;
        list.forEach(function (x, j) { var b = thumbs.children[j]; if (b) b.setAttribute('aria-current', String(j === i)); });
        var it = list[i];
        ba.hidden = it.kind !== 'ba'; img.hidden = it.kind === 'ba';
        if (it.kind === 'ba') { $('[data-ba-after]', pv).src = it.after; $('[data-ba-before]', pv).src = it.before; range.value = 50; setBa(50); }
        else img.src = it.src;
      };
      grid.addEventListener('click', function (e) {
        var a = e.target.closest('[data-open]'); if (!a) return;
        e.preventDefault();
        var d = JSON.parse($('[data-proj]', a.closest('.proj')).textContent);
        var items = [];
        if (d.before) items.push({ kind: 'ba', before: d.before, after: d.images[0] });
        d.images.forEach(function (s) { items.push({ kind: 'img', src: s }); });
        cur = { items: items, title: d.title };
        $('[data-pv-title]', pv).textContent = d.title;
        $('[data-pv-text]', pv).textContent = d.text || '';
        $('[data-pv-facts]', pv).innerHTML = '';
        d.facts.forEach(function (f) { var s = document.createElement('span'); s.textContent = f; $('[data-pv-facts]', pv).appendChild(s); });
        thumbs.innerHTML = '';
        if (items.length > 1) items.forEach(function (it, j) {
          var b = document.createElement('button'); b.type = 'button'; b.className = 'pv-t' + (it.kind === 'ba' ? ' is-ba' : '');
          var im = document.createElement('img'); im.src = it.kind === 'ba' ? it.before : it.src; im.alt = ''; b.appendChild(im);
          b.addEventListener('click', function () { show(j); }); thumbs.appendChild(b);
        });
        show(0);
        pv.showModal();
      });
      $('[data-pv-close]', pv).addEventListener('click', function () { pv.close(); });
      pv.addEventListener('click', function (e) { if (e.target === pv) pv.close(); });
      $('[data-pv-book]', pv).addEventListener('click', function () {
        pv.close();
        if (form && cur) { var n = form.querySelector('[name="note"]'); if (n && n.value.indexOf(cur.title) < 0) n.value = (n.value ? n.value + '\n' : '') + '★ ' + cur.title; }
      });
    }
  }

  // ── "Hỏi giá" chọn sẵn hạng mục ──
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pick]'); if (b) setField('product', b.getAttribute('data-pick'));
  });

  // ── Ước tính chi phí ──
  var est = $('[data-est]');
  var last = null;
  if (est) {
    var data = JSON.parse(est.getAttribute('data-est'));
    var sv = $('[data-est-service]', est), tier = $('[data-est-tier]', est), area = $('[data-est-area]', est), sum = $('[data-est-sum]', est);
    var lab = $('[data-est-area-label]', est);
    var fillTiers = function () {
      var s = data[+sv.value]; var keep = tier.selectedIndex;
      tier.innerHTML = '';
      s.tiers.forEach(function (x, i) { var o = document.createElement('option'); o.value = i; o.textContent = x.label; tier.appendChild(o); });
      tier.selectedIndex = Math.min(Math.max(keep, 0), s.tiers.length - 1);
      lab.textContent = lab.getAttribute('data-tpl').replace('{unit}', s.unit);
    };
    var calc = function () {
      var s = data[+sv.value], x = s.tiers[+tier.value] || s.tiers[0], a = parseFloat(String(area.value).replace(',', '.'));
      if (!(a > 0)) { sum.textContent = '—'; last = null; return; }
      var total = a * x.price;
      sum.textContent = money(total);
      last = { service: s.name, tier: x.label, area: a, unit: s.unit, total: money(total) };
    };
    sv.addEventListener('change', function () { fillTiers(); calc(); });
    tier.addEventListener('change', calc);
    area.addEventListener('input', calc);
    fillTiers(); calc();
    $('[data-est-book]', est).addEventListener('click', function () {
      if (!form || !last) return;
      setField('product', last.service);
      setField('area', last.area);
      var chip = $('[data-est-chip]', form), hid = form.querySelector('[name="estimate"]');
      var txt = last.tier + ' · ' + last.area + ' ' + last.unit + ' ≈ ' + last.total;
      hid.value = txt; chip.textContent = txt; chip.hidden = false;
    });
  }

  // ── Phiếu khảo sát ──
  if (!form) return;
  var fields = $('.book-fields', form), box = $('[data-done]', form), err = $('[data-err]', form), btn = $('[data-submit]', form);
  var gform = form.getAttribute('data-gform');
  var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
  var t0 = Date.now();
  var label = function (name) { var el = form.querySelector('[name="' + name + '"]'); var s = el && el.closest('.field') && $('span', el.closest('.field')); return s ? s.textContent.replace(/\s*\*$/, '') : name; };
  var read = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var unit = form.querySelector('[name="area"]').getAttribute('data-unit');
    return {
      name: get('name'), phone: get('phone'), product: get('product'),
      size: [get('home'), get('area') ? get('area') + ' ' + unit : ''].filter(Boolean).join(' · '),
      price: [get('budget'), get('estimate')].filter(Boolean).join(' · '),
      date: get('day'), address: get('address'), note: get('note'),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
      _home: get('home'), _area: get('area') ? get('area') + ' ' + unit : '', _budget: get('budget'), _est: get('estimate'),
    };
  };
  var text = function (x) {
    var rows = [['product', x.product], ['home', x._home], ['area', x._area], ['budget', x._budget], ['estimate', x._est], ['day', x.date], ['address', x.address], ['name', x.name], ['phone', x.phone], ['note', x.note]];
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return r[0] === 'estimate' ? '≈ ' + r[1] : label(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8]].forEach(function (y) {
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
