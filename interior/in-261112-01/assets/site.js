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

// Mẫu Thiết kế sân vườn: công trình lọc theo loại + "Xem thêm" + hộp xem (kéo so sánh trước/sau, ảnh thêm);
// ô lập ngân sách vườn (diện tích × gói, tỉ lệ sân lát / cỏ, tưới, đèn, tiểu cảnh nước → khoảng giá) điền sẵn vào phiếu tư vấn;
// cây trồng lọc theo nắng + chỉ cây ít nước; mùa hiện tại + "Đang nhận lịch thi công …" theo múi giờ của studio (?today=YYYY-MM-DD để thử);
// phiếu tư vấn → Google Form (nếu có) hoặc tin nhắn soạn sẵn. Không JS: vẫn đủ công trình, bảng giá, cây, mùa, form.
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

  // Hôm nay theo múi giờ của studio; ?today=2027-01-15 để thử.
  var today = (function () {
    var q = /[?&]today=(\d{4})-(\d{2})-(\d{2})/.exec(location.search);
    if (q) return { y: +q[1], m: +q[2] };
    var o = {};
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, year: 'numeric', month: '2-digit' }).formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
    } catch (e) { var d = new Date(); o = { year: d.getFullYear(), month: d.getMonth() + 1 }; }
    return { y: +o.year, m: +o.month };
  })();

  var form = $('form[data-book]');
  var setField = function (name, v) {
    var el = form && form.querySelector('[name="' + name + '"]'); if (!el) return;
    if (el.tagName === 'SELECT') { Array.prototype.forEach.call(el.options, function (op) { if (op.value === v || op.text === v) el.value = op.value; }); } else el.value = v;
  };

  // ── Công trình ──
  var grid = $('[data-projs]');
  if (grid) {
    var cards = $$('.proj', grid), more = $('[data-proj-more]'), type = '', shown = 6;
    var apply = function () {
      var n = 0;
      cards.forEach(function (c) {
        var ok = !type || c.getAttribute('data-t') === type;
        c.classList.toggle('off', !ok);
        if (ok) { n++; c.classList.toggle('show', n <= shown); c.classList.toggle('proj--wide', (n - 1) % 3 === 0); }
      });
      if (more) more.parentNode.hidden = n <= shown;
    };
    $$('.chip[data-type]').forEach(function (b) {
      b.addEventListener('click', function () {
        type = b.getAttribute('data-type'); shown = 6;
        $$('.chip[data-type]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        apply();
      });
    });
    if (more) more.addEventListener('click', function () { shown += 6; apply(); });
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

  // ── Lập ngân sách vườn ──
  var plan = $('[data-plan]'), last = null;
  if (plan) {
    var P = JSON.parse(plan.getAttribute('data-plan'));
    var area = $('[data-plan-area]', plan), patio = $('[data-plan-patio]', plan), lawn = $('[data-plan-lawn]', plan), fix = $('[data-plan-fixtures]', plan);
    var sum = $('[data-plan-sum]', plan), lines = $('[data-plan-lines]', plan);
    var round = function (n) { var s = Math.pow(10, Math.max(0, String(Math.round(n)).length - 2)); return Math.round(n / s) * s; };
    var calc = function () {
      var tier = +(($('input[name="plan-tier"]:checked', plan) || {}).value || 0);
      var a = parseFloat(String(area.value).replace(',', '.'));
      var pp = +patio.value, pl = +lawn.value;
      if (pp + pl > 100) { pl = 100 - pp; lawn.value = pl; }
      $('[data-plan-patio-out]', plan).textContent = pp + '%';
      $('[data-plan-lawn-out]', plan).textContent = pl + '%';
      var on = function (k) { var c = $('[data-plan-add="' + k + '"]', plan); return c && c.checked; };
      fix.disabled = !on('lighting');
      if (!(a > 0)) { sum.textContent = '—'; lines.innerHTML = ''; last = null; return; }
      var price = function (k) { var l = P[k]; return l[Math.min(tier, l.length - 1)]; };
      var rows = [
        ['patio', a * pp / 100 * price('patio')],
        ['planting', a * (100 - pp - pl) / 100 * price('planting')],
        ['lawn', a * pl / 100 * price('lawn')],
      ];
      if (on('irrigation')) rows.push(['irrigation', a * (100 - pp) / 100 * price('irrigation')]);
      if (on('lighting')) rows.push(['lighting', Math.max(1, +fix.value || 0) * price('lighting')]);
      if (on('water')) rows.push(['water', price('water')]);
      rows = rows.filter(function (r) { return r[1] > 0; });
      var total = rows.reduce(function (s, r) { return s + r[1]; }, 0);
      var lo = round(total * (1 - P.spread / 100)), hi = round(total * (1 + P.spread / 100));
      sum.textContent = money(lo) + ' – ' + money(hi);
      lines.innerHTML = '';
      rows.forEach(function (r) {
        var li = document.createElement('li'), n = document.createElement('span'), v = document.createElement('b');
        n.textContent = P.names[r[0]]; v.textContent = money(round(r[1])); li.appendChild(n); li.appendChild(v); lines.appendChild(li);
      });
      var tierName = (($('input[name="plan-tier"]:checked', plan) || {}).nextElementSibling || {}).textContent || '';
      last = { area: a, unit: area.getAttribute('data-unit'), tier: tierName, range: sum.textContent };
    };
    plan.addEventListener('input', calc);
    plan.addEventListener('change', calc);
    calc();
    $('[data-plan-book]', plan).addEventListener('click', function (e) {
      var b = e.currentTarget;
      if (!form || !last) return;
      setField('area', last.area);
      var chip = $('[data-est-chip]', form), hid = form.querySelector('[name="estimate"]');
      var txt = b.getAttribute('data-tpl').replace('{tier}', last.tier).replace('{area}', last.area + ' ' + last.unit).replace('{range}', last.range);
      hid.value = txt; chip.textContent = txt; chip.hidden = false;
    });
  }

  // ── Cây trồng ──
  var pl = $('[data-plants]');
  if (pl) {
    var sun = '', dry = $('[data-dry]'), empty = $('[data-plants-empty]');
    var filt = function () {
      var n = 0;
      $$('.plant', pl).forEach(function (c) {
        var ok = (!sun || c.getAttribute('data-sun') === sun) && (!dry.checked || c.getAttribute('data-water') === 'low');
        c.hidden = !ok; if (ok) n++;
      });
      empty.hidden = n > 0;
    };
    $$('.chip[data-sun]').forEach(function (b) {
      b.addEventListener('click', function () {
        sun = b.getAttribute('data-sun');
        $$('.chip[data-sun]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        filt();
      });
    });
    dry.addEventListener('change', function () { dry.parentNode.classList.toggle('on', dry.checked); filt(); });
  }

  // ── Mùa: tô mùa hiện tại, tìm mùa thi công kế tiếp ──
  var ss = $('[data-seasons]');
  if (ss) {
    var S = JSON.parse(ss.getAttribute('data-seasons')), items = $$('.season', ss);
    var cur = -1;
    S.forEach(function (s, i) { if (s.m.indexOf(today.m) >= 0) cur = i; });
    if (cur >= 0) items[cur].classList.add('is-now');
    // Mùa thi công kế tiếp chưa bắt đầu: duyệt 12 tháng tới.
    var nb = $('[data-now-booking]');
    if (nb && cur >= 0) {
      for (var k = 1; k <= 12; k++) {
        var mm = (today.m - 1 + k) % 12 + 1, yy = today.y + Math.floor((today.m - 1 + k) / 12);
        var idx = -1;
        S.forEach(function (s, i) { if (s.m[0] === mm) idx = i; });
        if (idx >= 0 && S[idx].i) {
          $('span', nb).textContent = nb.getAttribute('data-tpl').replace('{season}', S[idx].n).replace('{year}', yy);
          nb.hidden = false;
          var w = form && form.querySelector('[data-when]');
          if (w && w.options[0]) w.options[0].text = S[idx].n + ' ' + yy;
          break;
        }
      }
    }
  }

  // ── Phiếu tư vấn ──
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
    var ar = get('area') ? get('area') + ' ' + unit : '';
    return {
      name: get('name'), phone: get('phone'), product: get('product'), size: ar,
      price: [get('budget'), get('estimate')].filter(Boolean).join(' · '),
      date: get('day'), address: get('address'), note: [get('style'), get('note')].filter(Boolean).join(' · '),
      page: location.href.split('#')[0], market: body.getAttribute('data-market'), website: get('website'),
      _area: ar, _budget: get('budget'), _est: get('estimate'), _style: get('style'), _note: get('note'),
    };
  };
  var text = function (x) {
    var rows = [['product', x.product], ['area', x._area], ['budget', x._budget], ['estimate', x._est], ['style', x._style], ['day', x.date], ['address', x.address], ['name', x.name], ['phone', x.phone], ['note', x._note]];
    return [form.getAttribute('data-order-text')].concat(rows.filter(function (r) { return r[1]; }).map(function (r) { return r[0] === 'estimate' ? '≈ ' + r[1] : label(r[0]) + ': ' + r[1]; })).join('\n');
  };
  var valid = function (x) {
    var ok = true;
    [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 7]].forEach(function (y) {
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
