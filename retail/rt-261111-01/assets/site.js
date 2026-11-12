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

// Mẫu Cửa hàng điện máy (kiểu H): ô "Chọn cỡ nào cho vừa?" ở mỗi chương tô sáng máy vừa nhu cầu;
//   điều hòa: BTU cần ≈ diện tích × 600 (× 1,2 nếu phòng nắng / tầng mái) → cỡ nhỏ nhất ≥ nhu cầu đang bán;
//   tủ lạnh: lít ≈ 100 + 70 × số người → máy trong khoảng 85–140%; máy giặt / sấy: kg ≈ 5,5 + 0,9 × số người → máy từ đó tới +3 kg;
//   TV: inch ≈ khoảng cách (m) × 26 (màn 4K) → máy trong khoảng ±10 inch.
// Chip lọc nhóm máy trong chương; đổi phiên bản đổi giá; giỏ hàng lưu localStorage (có try/catch), mỗi máy có phí lắp thì có ô "Lắp đặt";
// trả góp mỗi tháng = tổng / số tháng (từ mức tối thiểu). Không JS thì trang vẫn đủ thông tin và nút liên hệ.
(function () {
  var body = document.body;
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var data = [];
  try { data = JSON.parse(($('#em-data') || {}).textContent || '[]'); } catch (e) { data = []; }
  var byId = {};
  data.forEach(function (p) { byId[p.id] = p; });
  var cur = body.getAttribute('data-currency') || 'USD';
  var lang = body.getAttribute('data-lang') || 'en';
  var fmt = new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : lang, { style: 'currency', currency: cur, maximumFractionDigits: /^(VND|JPY|KRW|IDR)$/.test(cur) ? 0 : 2 });
  var num = new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : lang);
  var money = function (v) { return fmt.format(v); };
  var shipFee = +body.getAttribute('data-ship') || 0;
  var freeFrom = body.getAttribute('data-free') ? +body.getAttribute('data-free') : null;
  var months = +body.getAttribute('data-months') || 0;
  var instFrom = +body.getAttribute('data-inst-from') || 0;

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
  var toastEl = $('[data-toast]'), toastT = null;
  var toast = function (s) { if (!toastEl) return; toastEl.textContent = s; toastEl.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { toastEl.hidden = true; }, 2200); };

  // ── Chọn cỡ cho vừa ──
  var RULES = {
    ac: function (x, sun) { var need = x * 600 * (sun ? 1.2 : 1); return { need: Math.round(need / 100) * 100, pick: 'min' }; },
    fridge: function (x) { var need = 100 + 70 * x; return { need: Math.round(need / 10) * 10, lo: need * 0.85, hi: need * 1.4 }; },
    wash: function (x) { var need = 5.5 + 0.9 * x; return { need: Math.round(need * 2) / 2, lo: need - 0.6, hi: need + 3 }; },
    tv: function (x) { var need = x * 26; return { need: Math.round(need), lo: need - 10, hi: need + 10 }; },
  };
  var SAME = { wash: ['wash', 'dryer'] };
  $$('[data-fit]').forEach(function (box) {
    var kind = box.getAttribute('data-fit'), inp = $('[data-fit-in]', box), sun = $('[data-fit-sun]', box), out = $('[data-fit-out]', box);
    var room = box.closest('.chapter');
    var cats = SAME[kind] || [kind];
    var items = $$('.item', room).filter(function (li) { return cats.indexOf(li.getAttribute('data-c')) >= 0 && +li.getAttribute('data-cap') > 0; });
    box.hidden = false;
    var paint = function () {
      var x = parseFloat(String(inp.value).replace(',', '.'));
      items.forEach(function (li) { li.classList.remove('is-fit', 'is-dim'); });
      if (!(x > 0)) { out.textContent = ''; return; }
      var r = RULES[kind](x, sun && sun.checked);
      var ok;
      if (r.pick === 'min') {
        var caps = items.map(function (li) { return +li.getAttribute('data-cap'); }).sort(function (a, b) { return a - b; });
        var best = caps.filter(function (c) { return c >= r.need; })[0];
        ok = function (c) { return best != null && c === best; };
      } else ok = function (c) { return c >= r.lo && c <= r.hi; };
      var n = 0;
      items.forEach(function (li) { var on = ok(+li.getAttribute('data-cap')); li.classList.toggle('is-fit', on); li.classList.toggle('is-dim', !on); if (on) n++; });
      out.textContent = box.getAttribute('data-out').replace('{x}', num.format(r.need)) + (n ? '' : ' ' + box.getAttribute('data-none'));
    };
    inp.addEventListener('input', paint);
    if (sun) sun.addEventListener('change', paint);
    paint();
  });

  // ── Lọc nhóm máy trong chương ──
  $$('.chapter').forEach(function (room) {
    var chips = $$('[data-room-f]', room);
    chips.forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-room-f');
        chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $$('.item', room).forEach(function (li) { li.hidden = !!v && li.getAttribute('data-c') !== v; });
      });
    });
  });
  // Đổi phiên bản → đổi giá, trả góp.
  $$('.item').forEach(function (li) {
    var p = byId[li.getAttribute('data-id')]; if (!p) return;
    $$('input[type="radio"]', li).forEach(function (r) {
      r.addEventListener('change', function () {
        var v = p.v[+r.value][1];
        $('[data-price]', li).textContent = money(v);
        var s = $('[data-list]', li); if (s) s.hidden = +r.value > 0;
      });
    });
  });

  // ── Giỏ hàng ──
  var key = body.getAttribute('data-store') + '-cart';
  var bag = [];
  try { bag = JSON.parse(localStorage.getItem(key) || '[]').filter(function (x) { return byId[x.id] && byId[x.id].v[x.v]; }); } catch (e) { bag = []; }
  var save = function () { try { localStorage.setItem(key, JSON.stringify(bag)); } catch (e) { /* trình duyệt chặn lưu: giỏ vẫn dùng được tới khi tải lại */ } };
  var list = $('[data-bag]');
  var form = $('[data-order]');
  var totals = { sub: 0, fee: 0, ship: 0, total: 0, n: 0 };
  var paintBag = function () {
    var shipOn = form && $('[name="version"]:checked', form) && $('[name="version"]:checked', form).value === 'ship';
    totals.n = bag.reduce(function (s, x) { return s + x.q; }, 0);
    totals.sub = bag.reduce(function (a, x) { return a + byId[x.id].v[x.v][1] * x.q; }, 0);
    totals.fee = bag.reduce(function (a, x) { return a + (x.i ? byId[x.id].i * x.q : 0); }, 0);
    totals.ship = shipOn && bag.length && !(freeFrom != null && totals.sub >= freeFrom) ? shipFee : 0;
    totals.total = totals.sub + totals.fee + totals.ship;
    $$('[data-bag-count]').forEach(function (b) { b.textContent = totals.n; b.hidden = !totals.n; });
    if (!list) return;
    list.innerHTML = '';
    bag.forEach(function (x, i) {
      var p = byId[x.id], v = p.v[x.v];
      var li = document.createElement('li');
      li.className = 'bag-item';
      li.innerHTML = '<div class="bag-t"><b></b><small></small></div><div class="qty"><button type="button" data-q="-1" aria-label="−">−</button><span></span><button type="button" data-q="1" aria-label="+">+</button></div><p class="bag-p"></p><button type="button" class="bag-x" aria-label="' + list.getAttribute('data-remove') + '">×</button>';
      $('b', li).textContent = p.n;
      $('small', li).textContent = v[0];
      $('.qty span', li).textContent = x.q;
      $('.bag-p', li).textContent = money(v[1] * x.q);
      if (p.i) {
        var lab = document.createElement('label');
        lab.className = 'bag-inst';
        lab.innerHTML = '<input type="checkbox"> <span></span>';
        $('span', lab).textContent = list.getAttribute('data-install').replace('{price}', money(p.i));
        $('input', lab).checked = !!x.i;
        $('input', lab).addEventListener('change', function (e) { x.i = e.target.checked ? 1 : 0; save(); paintBag(); });
        li.appendChild(lab);
      }
      $$('[data-q]', li).forEach(function (b) { b.addEventListener('click', function () { x.q = Math.max(1, Math.min(9, x.q + +b.getAttribute('data-q'))); save(); paintBag(); }); });
      $('.bag-x', li).addEventListener('click', function () { bag.splice(i, 1); save(); paintBag(); });
      list.appendChild(li);
    });
    var empty = $('[data-bag-empty]'); if (empty) empty.hidden = bag.length > 0;
    list.hidden = !bag.length;
    $('[data-b2-sub]').textContent = money(totals.sub);
    $('[data-b2-fee-row]').hidden = !totals.fee; $('[data-b2-fee]').textContent = money(totals.fee);
    $('[data-b2-ship-row]').hidden = !shipOn; $('[data-b2-ship]').textContent = totals.ship ? money(totals.ship) : '0';
    $('[data-b2-total]').textContent = money(totals.total);
    var ins = $('[data-b2-inst]');
    if (ins) { var on = months && totals.sub >= instFrom && totals.sub > 0; ins.hidden = !on; if (on) ins.textContent = ins.getAttribute('data-tpl').replace('{price}', money(Math.ceil(totals.total / months / (totals.total >= 100000 ? 1000 : 1)) * (totals.total >= 100000 ? 1000 : 1))).replace('{n}', months); }
    var addr = $('[data-addr]', form); if (addr) addr.hidden = !shipOn;
  };
  var add = function (id, v) {
    var same = bag.filter(function (x) { return x.id === id && x.v === v; })[0];
    if (same) same.q = Math.min(9, same.q + 1); else bag.push({ id: id, v: v, q: 1, i: byId[id].i ? 1 : 0 });
  };
  $$('[data-add]').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.closest('.item'), r = $('input[type="radio"]:checked', li);
      add(b.getAttribute('data-add'), r ? +r.value : 0);
      save(); paintBag(); toast('✓ ' + byId[b.getAttribute('data-add')].n);
    });
  });
  if (form) form.addEventListener('change', function (e) { if (e.target.name === 'version') paintBag(); });
  paintBag();

  // ── Đặt hàng ──
  if (!form) return;
  var err = $('[data-err]', form);
  var channel = null;
  $$('button[data-channel]', form).forEach(function (b) { b.addEventListener('click', function () { channel = b; }); });
  var order = function () {
    var d = new FormData(form);
    var get = function (k) { return (d.get(k) || '').toString().trim(); };
    paintBag();
    var ship = get('version') === 'ship';
    var tag = form.getAttribute('data-inst-label');
    return {
      name: get('name'), phone: get('phone'), address: ship ? get('address') : '',
      product: bag.map(function (x) { var p = byId[x.id]; return x.q + '× ' + p.n + (p.v[x.v][0] ? ' (' + p.v[x.v][0] + ')' : '') + (x.i ? ' [' + tag + ']' : ''); }).join('; '),
      qty: String(totals.n), version: form.getAttribute(ship ? 'data-ship-label' : 'data-pick-label'),
      note: [totals.fee ? tag + ' +' + money(totals.fee) : '', get('note')].filter(Boolean).join(' · '),
      price: totals.n ? money(totals.total) : '', page: location.href.split('#')[0], market: form.getAttribute('data-market'), website: get('website'),
    };
  };
  var text = function (o) { return form.getAttribute('data-text').replace(/\{(\w+)\}/g, function (_, k) { return o[k] || '…'; }).replace(/\s+/g, ' '); };
  var valid = function () {
    var ok = !!bag.length;
    var need = ['name', 'phone'];
    if ($('[name="version"]:checked', form).value === 'ship') need.push('address');
    need.forEach(function (k) {
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
      var dt = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { dt.append(gmap[k], o[k] || ''); });
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      fetch(gform, { method: 'POST', mode: 'no-cors', body: dt }).then(function () { done(); bag = []; save(); paintBag(); }, function () {
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
