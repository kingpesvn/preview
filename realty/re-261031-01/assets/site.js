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

// Mẫu Môi giới vay mua nhà: thanh trên đổi nền khi cuộn; bảng tính khoản vay (lãi ưu đãi rồi thả nổi, gốc đều hoặc trả đều → tháng đầu,
// tháng cao nhất sau ưu đãi, tổng lãi, thanh gốc / lãi, lịch trả theo năm); "bạn vay được bao nhiêu" (thu nhập, nợ khác, tỉ lệ trả nợ
// → khoản vay, giá nhà, nút đưa vào bảng tính); nút "Tính với gói này" điền lãi và thời hạn của gói; form đặt lịch kèm kết quả bảng tính,
// gửi Google Form hoặc tin nhắn soạn sẵn. Cách tính giống schedule() trong render.mjs.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var lang = body.getAttribute('data-lang') || 'en';
  var cur = body.getAttribute('data-currency');
  var fmt = new Intl.NumberFormat(lang, { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 0 });
  var money = function (v) { return fmt.format(Math.round(v || 0)); };
  var pct = function (v) { return new Intl.NumberFormat(lang, { maximumFractionDigits: 2 }).format(v) + '%'; };

  var head = $('[data-header]');
  var onScroll = function () { if (head) head.classList.toggle('is-solid', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

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

  function schedule(o) {
    var n = Math.max(1, Math.round(o.years * 12)), pm = Math.min(n, Math.max(0, Math.round((o.promoYears || 0) * 12)));
    var bal = o.loan, pay = 0, out = [];
    for (var m = 0; m < n; m++) {
      var r = (m < pm ? o.promo : o.rate) / 1200, i = bal * r, p;
      if (o.method === 'annuity') {
        if (m === 0 || m === pm) { var k = n - m; pay = r ? (bal * r) / (1 - Math.pow(1 + r, -k)) : bal / k; }
        p = Math.min(bal, pay - i);
      } else p = Math.min(bal, o.loan / n);
      bal = Math.max(0, bal - p);
      out.push({ p: p, i: i, bal: bal });
    }
    return out;
  }
  var annuityLoan = function (payment, rate, years) { var r = rate / 1200, n = years * 12; return r ? payment * (1 - Math.pow(1 + r, -n)) / r : payment * n; };

  // ── Bảng tính ──
  var calc = $('[data-calc]'), state = null;
  if (calc) {
    var f = $('form', calc);
    var val = function (k) { var el = f.querySelector('[data-in="' + k + '"]' + (k === 'method' ? ':checked' : '')); return el ? el.value : ''; };
    var num = function (k) { var v = parseFloat(String(val(k)).replace(',', '.')); return isNaN(v) ? 0 : v; };
    var out = function (k, v) { var el = $('[data-out="' + k + '"]', calc); if (el) el.textContent = v; };
    var run = function () {
      var price = Math.max(0, num('price')), down = num('down'), years = num('years') || 20;
      var o = { loan: price * (1 - down / 100), years: years, promo: num('promo'), promoYears: Math.min(years, num('promoYears')), rate: num('rate'), method: val('method') || 'principal' };
      var ms = schedule(o), pm = Math.round(o.promoYears * 12);
      var pay = function (m) { return m ? m.p + m.i : 0; };
      var peak = 0; ms.slice(pm).forEach(function (m) { peak = Math.max(peak, pay(m)); });
      var interest = ms.reduce(function (s, m) { return s + m.i; }, 0);
      $('[data-show="price"]', calc).textContent = money(price);
      $('[data-show="own"]', calc).textContent = money(price * down / 100);
      $('[data-down-v]', calc).textContent = pct(down);
      out('loan', money(o.loan)); out('first', money(pay(ms[0]))); out('peak', money(peak)); out('interest', money(interest)); out('total', money(o.loan + interest));
      $('[data-peak-row]', calc).hidden = !pm || pm >= ms.length;
      $('[data-split="p"]', calc).style.width = Math.round(o.loan / (o.loan + interest || 1) * 100) + '%';
      var rows = [];
      for (var y = 0; y * 12 < ms.length; y++) {
        var s = ms.slice(y * 12, y * 12 + 12), sp = 0, si = 0;
        s.forEach(function (m) { sp += m.p; si += m.i; });
        rows.push('<tr><td>' + (y + 1) + '</td><td>' + esc(money(sp)) + '</td><td>' + esc(money(si)) + '</td><td>' + esc(money(s[s.length - 1].bal)) + '</td></tr>');
      }
      $('[data-years]', calc).innerHTML = rows.join('');
      state = { loan: o.loan, years: years, first: pay(ms[0]), rate: o.rate, promo: o.promo, promoYears: o.promoYears, method: o.method };
    };
    f.addEventListener('input', run);
    f.addEventListener('change', run);
    run();
    var setIn = function (k, v) { var el = f.querySelector('[data-in="' + k + '"]'); if (el && v !== '' && v != null) el.value = v; };
    // "Tính với gói này": lãi sau ưu đãi = lãi của gói + 3,5 điểm nếu gói có ưu đãi (chỉ để minh họa, khách sửa được); thời hạn không vượt mức tối đa.
    $$('[data-loan]').forEach(function (b) {
      b.addEventListener('click', function () {
        var r = parseFloat(b.getAttribute('data-rate')), py = +b.getAttribute('data-promo-years') || 0, maxY = +b.getAttribute('data-max-years') || 0, ltv = +b.getAttribute('data-ltv') || 0;
        if (!isNaN(r)) { setIn('promo', r); setIn('promoYears', py); if (!py) setIn('rate', r); else if (num('rate') <= r) setIn('rate', Math.round((r + 3.5) * 10) / 10); }
        if (maxY && num('years') > maxY) setIn('years', [5, 10, 15, 20, 25, 30, 35].filter(function (y) { return y <= maxY; }).pop());
        if (ltv && 100 - num('down') > ltv) setIn('down', Math.ceil((100 - ltv) / 5) * 5);
        var sel = $('[data-b-loan]'); if (sel) sel.value = b.getAttribute('data-loan');
        run();
        calc.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ── Bạn vay được bao nhiêu ──
  var aff = $('[data-afford]');
  if (aff && calc) {
    var dti = +aff.getAttribute('data-dti') || 40, useBtn = $('[data-a-use]', aff), best = null;
    var aOut = function (k, v) { $('[data-a-out="' + k + '"]', aff).textContent = v; };
    var arun = function () {
      var inc = parseFloat($('[data-a="income"]', aff).value) || 0, debts = parseFloat($('[data-a="debts"]', aff).value) || 0;
      var pay = Math.max(0, inc * dti / 100 - debts);
      if (!inc || !pay) { aOut('pay', '—'); aOut('loan', '—'); aOut('home', '—'); useBtn.hidden = true; best = null; return; }
      var f2 = $('form', calc), years = parseFloat(f2.querySelector('[data-in="years"]').value) || 20, rate = Math.max(parseFloat(f2.querySelector('[data-in="rate"]').value) || 0, parseFloat(f2.querySelector('[data-in="promo"]').value) || 0);
      var down = parseFloat(f2.querySelector('[data-in="down"]').value) || 30;
      var loan = annuityLoan(pay, rate, years), home = loan / (1 - down / 100);
      var u = cur === 'VND' ? 1000000 : 100, r = function (v) { return Math.floor(v / u) * u; };
      aOut('pay', money(r(pay))); aOut('loan', money(r(loan))); aOut('home', money(r(home)));
      best = home; useBtn.hidden = false;
    };
    aff.addEventListener('input', arun);
    useBtn.addEventListener('click', function () {
      if (!best) return;
      var el = $('[data-in="price"]', calc), unit = cur === 'VND' ? 10000000 : 1000;
      el.value = Math.floor(best / unit) * unit;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      calc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    arun();
  }

  // ── Nhà khách đã nhận chìa khóa ──
  var homes = $('[data-homes]');
  if (homes) {
    var hm = $('[data-homes-more]'), extra = $$('.is-more', homes);
    extra.forEach(function (li) { li.hidden = true; });
    if (hm) { hm.hidden = false; hm.addEventListener('click', function () { extra.forEach(function (li) { li.hidden = false; }); hm.hidden = true; }); }
  }

  // ── Đặt lịch tư vấn ──
  var form = $('[data-book]');
  if (!form) return;
  var amountEl = $('[data-b-amount]', form), yearsEl = $('[data-b-years]', form), calcBox = $('[data-b-calc]', form), calcText = $('[data-b-calc-text]', form);
  var summary = function () {
    if (!state) return '';
    var y = function (n) { return form.getAttribute('data-yrs').replace('{n}', n); };
    return [money(state.loan), y(state.years), state.promoYears ? pct(state.promo) + ' × ' + y(state.promoYears) + ' → ' + pct(state.rate) : pct(state.rate), money(state.first) + form.getAttribute('data-pm')].join(' · ');
  };
  var fill = function () {
    if (!state) return;
    amountEl.value = money(state.loan); yearsEl.value = String(state.years);
    calcText.textContent = summary(); calcBox.hidden = false;
  };
  var use = $('[data-use-calc]');
  if (use) use.addEventListener('click', fill);
  fill();

  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    var p = form.querySelector('[name="product"]'), w = form.querySelector('[name="when"]');
    return {
      name: get('name'), phone: get('phone'), product: p.options[p.selectedIndex].text, price: get('amount') || '—', size: get('years') || '—', qty: get('income'),
      date: w.options[w.selectedIndex].text, calc: summary() || '—', note: get('note'), page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
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
      Object.keys(gmap).forEach(function (k) { data.append(gmap[k], k === 'note' ? [o.calc !== '—' ? o.calc : '', o.note].filter(Boolean).join(' · ') : (o[k] || '')); });
      var btn = $('[data-order-submit]', form);
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: data }).then(done, function () {
        btn.disabled = false;
        var f3 = box.querySelector('button[data-channel]');
        if (f3) send(f3.getAttribute('data-channel'), f3.getAttribute('data-href'), msg, $('.form-msg', form), o.product);
      });
      return;
    }
    var b = channel; channel = null;
    send(b.getAttribute('data-channel'), b.getAttribute('data-href'), b.getAttribute('data-msg') || msg, $('.form-msg', form), o.product);
  });
  var edit = $('[data-edit]', form);
  if (edit) edit.addEventListener('click', function () { $('[data-done]', form).hidden = true; $('.order-fields', form).hidden = false; });
})();
