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

// Mẫu Quán trà sữa: lọc nhóm món; hộp tự chọn ly (size, đường, đá, topping tối đa N, số lượng, ghi chú) → giá tự cộng → giỏ;
// món không tự chọn (bánh) thêm thẳng; giỏ lưu trên máy khách (localStorage, lỗi thì chỉ giữ trong trang), tăng/giảm/xóa;
// đặt hàng: giao tận nơi / tới lấy (ẩn địa chỉ), giờ nhận theo khung 15 phút trong giờ mở cửa (theo site.timezone);
// gửi Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp; album xem ảnh lớn.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var cfg = JSON.parse(body.getAttribute('data-cfg') || '{}');
  var money = function (n) { try { return new Intl.NumberFormat(cfg.locale, { style: 'currency', currency: cfg.currency, maximumFractionDigits: cfg.max }).format(n); } catch (e) { return String(n); } };
  var data = { items: [], toppings: [], sugar: [], ice: [] };
  try { data = JSON.parse(($('#kp-menu') || {}).textContent || '{}'); } catch (e) { /* bỏ qua */ }
  var byId = {}; (data.items || []).forEach(function (x) { byId[x.id] = x; });
  var topById = {}; (data.toppings || []).forEach(function (x) { topById[x.id] = x; });
  var lab = $('[data-tpl-labels]');
  var L = function (k) { return lab ? lab.getAttribute('data-' + k) : k; };

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

  // ── Lọc nhóm món ──
  $$('.chip[data-cat]').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = b.getAttribute('data-cat');
      $$('.chip[data-cat]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $$('.menu-group').forEach(function (g) { g.hidden = !!c && g.getAttribute('data-group') !== c; });
    });
  });

  // ── Giỏ hàng ──
  var store = {
    get: function () { try { return JSON.parse(localStorage.getItem(cfg.key) || '[]'); } catch (e) { return []; } },
    set: function (v) { try { localStorage.setItem(cfg.key, JSON.stringify(v)); } catch (e) { /* xem trước, riêng tư */ } },
  };
  var lines = (store.get() || []).filter(function (l) { return byId[l.id] && byId[l.id].v[l.v]; });
  var unit = function (l) { var p = byId[l.id].v[l.v].p; (l.tops || []).forEach(function (id) { if (topById[id]) p += topById[id].p; }); return p; };
  var desc = function (l) {
    var it = byId[l.id], parts = [];
    if (it.v.length > 1 || it.v[l.v].l) parts.push(it.v[l.v].l);
    if (l.sugar != null) parts.push(L('sugar') + ' ' + l.sugar + '%');
    if (l.ice) parts.push(L('ice') + ' ' + l.ice);
    var tops = (l.tops || []).map(function (id) { return topById[id] && topById[id].name; }).filter(Boolean);
    if (tops.length) parts.push('+ ' + tops.join(', '));
    if (l.note) parts.push('"' + l.note + '"');
    return parts.filter(Boolean).join(' · ');
  };
  var key = function (l) { return [l.id, l.v, l.sugar, l.ice, (l.tops || []).slice().sort().join('+'), l.note || ''].join('|'); };
  var drawer = $('[data-cart]'), toast = $('[data-toast]'), tplAdded = $('[data-tpl-added]');
  var total = function () { var s = 0, n = 0; lines.forEach(function (l) { s += unit(l) * l.q; n += l.q; }); return { sum: s, n: n }; };
  var render = function () {
    var t = total();
    $$('[data-count]').forEach(function (b) { b.textContent = t.n; b.hidden = !t.n; });
    if (!drawer) return;
    var ul = $('[data-lines]', drawer); ul.innerHTML = '';
    lines.forEach(function (l, i) {
      var it = byId[l.id];
      var li = document.createElement('li');
      li.className = 'line'; li.setAttribute('data-i', i);
      li.innerHTML = '<img alt="" width="56" height="56"><div class="ln"><b></b><small></small></div><div class="qty"><button type="button" data-dec aria-label="−">−</button><span></span><button type="button" data-inc aria-label="+">+</button></div><b class="lp"></b><button type="button" class="rm" data-rm aria-label="✕">✕</button>';
      if (it.image) li.querySelector('img').src = it.image; else li.querySelector('img').remove();
      li.querySelector('.ln b').textContent = it.name;
      li.querySelector('.ln small').textContent = desc(l);
      li.querySelector('.qty span').textContent = l.q;
      li.querySelector('.lp').textContent = money(unit(l) * l.q);
      ul.appendChild(li);
    });
    $('[data-cart-empty]', drawer).hidden = !!lines.length;
    $('[data-sum]', drawer).hidden = !lines.length;
    $('[data-order]', drawer).hidden = !lines.length;
    $('[data-total]', drawer).textContent = money(t.sum);
  };
  var save = function () { store.set(lines); render(); };
  var push = function (l) {
    var k = key(l), same = lines.filter(function (x) { return key(x) === k; })[0];
    if (same) same.q += l.q; else lines.push(l);
    save();
    if (toast) {
      toast.textContent = (tplAdded ? tplAdded.innerHTML : '{name}').replace('{name}', byId[l.id].name).replace(/&amp;/g, '&');
      toast.hidden = false; clearTimeout(push.t); push.t = setTimeout(function () { toast.hidden = true; }, 1800);
    }
  };

  // ── Hộp tự chọn ly ──
  var sheet = $('[data-builder]');
  var cur = null;
  var pills = function (box, list, name, label, checked) {
    var wrap = $('.pills', box); wrap.innerHTML = '';
    list.forEach(function (x, i) {
      var l = document.createElement('label'); l.className = 'pill';
      l.innerHTML = '<input type="radio"><span></span>';
      var inp = l.querySelector('input'); inp.name = name; inp.value = i; inp.checked = i === checked;
      l.querySelector('span').textContent = label(x);
      wrap.appendChild(l);
    });
    box.hidden = !list.length;
  };
  var bTotal = function () {
    if (!cur) return;
    var f = $('[data-bform]');
    var v = +((f.querySelector('[name="bsize"]:checked') || {}).value || 0);
    var tops = $$('[name="btop"]:checked', f).map(function (x) { return x.value; });
    var l = { id: cur.id, v: v, tops: tops };
    $('[data-btotal]').textContent = money(unit(l) * (+$('[data-bqty]').textContent));
    var max = cfg.maxTop || 3;
    $$('[name="btop"]', f).forEach(function (x) { x.disabled = !x.checked && tops.length >= max; });
  };
  var openBuilder = function (id) {
    var it = byId[id]; if (!it || !sheet || !sheet.showModal) return;
    cur = it;
    var f = $('[data-bform]'); f.reset();
    var img = $('[data-bimg]'); if (it.image) { img.src = it.image; img.hidden = false; } else img.hidden = true;
    $('[data-bname]').textContent = it.name;
    $('[data-bbase]').textContent = it.v.map(function (v) { return (v.l ? v.l + ' ' : '') + money(v.p); }).join(' · ');
    pills($('[data-bsizes]'), it.v, 'bsize', function (v) { return (v.l || '') + ' · ' + money(v.p); }, 0);
    if (it.v.length < 2) $('[data-bsizes]').hidden = true;
    var sugar = data.sugar || []; pills($('[data-bsugar]'), sugar, 'bsugar', function (x) { return x + '%'; }, 0);
    var ice = data.ice || []; pills($('[data-bice]'), ice, 'bice', function (x) { return x; }, 0);
    var tp = $('.tops-pick', $('[data-btops]')); tp.innerHTML = '';
    (data.toppings || []).forEach(function (x) {
      var l = document.createElement('label'); l.className = 'tp';
      l.innerHTML = '<input type="checkbox" name="btop"><span></span><b></b>';
      l.querySelector('input').value = x.id; l.querySelector('span').textContent = x.name; l.querySelector('b').textContent = '+' + money(x.p);
      tp.appendChild(l);
    });
    $('[data-btops]').hidden = !(data.toppings || []).length;
    var mx = $('[data-bmax]'); mx.textContent = mx.getAttribute('data-tpl').replace('{n}', cfg.maxTop || 3);
    $('[data-bqty]').textContent = '1';
    bTotal();
    sheet.showModal();
  };
  if (sheet) {
    sheet.addEventListener('change', bTotal);
    $('[data-bclose]').addEventListener('click', function () { sheet.close(); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.close(); });
    $('[data-binc]').addEventListener('click', function () { var q = $('[data-bqty]'); q.textContent = Math.min(20, +q.textContent + 1); bTotal(); });
    $('[data-bdec]').addEventListener('click', function () { var q = $('[data-bqty]'); q.textContent = Math.max(1, +q.textContent - 1); bTotal(); });
    $('[data-badd]').addEventListener('click', function () {
      var f = $('[data-bform]');
      var g = function (n) { var x = f.querySelector('[name="' + n + '"]:checked'); return x ? +x.value : null; };
      var s = g('bsugar'), ic = g('bice');
      push({
        id: cur.id, v: g('bsize') || 0, q: +$('[data-bqty]').textContent,
        sugar: s == null ? null : (data.sugar || [])[s], ice: ic == null ? '' : (data.ice || [])[ic],
        tops: $$('[name="btop"]:checked', f).map(function (x) { return x.value; }), note: (f.querySelector('[name="bnote"]').value || '').trim(),
      });
      sheet.close();
    });
  }

  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o && !o.closest('form')) { openBuilder(o.getAttribute('data-open')); return; }
    var a = e.target.closest('[data-add]');
    if (a) { push({ id: a.getAttribute('data-add'), v: 0, q: 1, tops: [] }); return; }
    if (e.target.closest('[data-cart-open]') && drawer && drawer.showModal) { render(); drawer.showModal(); return; }
    if (e.target.closest('[data-cart-close]') && drawer) { drawer.close(); return; }
    var line = e.target.closest('.line');
    if (line) {
      var i = +line.getAttribute('data-i');
      if (e.target.closest('[data-inc]')) lines[i].q++;
      else if (e.target.closest('[data-dec]')) { lines[i].q--; if (lines[i].q < 1) lines.splice(i, 1); }
      else if (e.target.closest('[data-rm]')) lines.splice(i, 1);
      else return;
      save();
    }
  });
  if (drawer) drawer.addEventListener('click', function (e) { if (e.target === drawer) drawer.close(); });
  render();

  // ── Form đặt hàng ──
  var form = $('form[data-order]');
  if (form) {
    // Giờ nhận: khung 15 phút từ bây giờ + 20 phút đến giờ đóng cửa (theo múi giờ quán).
    var parts = {};
    new Intl.DateTimeFormat('en-US', { timeZone: body.getAttribute('data-tz') || undefined, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var now = +parts.hour * 60 + +parts.minute;
    var hm = function (s) { var x = s.split(':'); return +x[0] * 60 + +x[1]; };
    var open = hm(form.getAttribute('data-open') || '09:00'), close = hm(form.getAttribute('data-close') || '22:00');
    var sel = $('[data-times]', form);
    for (var m = Math.max(open, Math.ceil((now + 20) / 15) * 15); m <= close - 15; m += 15) {
      var op = document.createElement('option'); op.textContent = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); sel.appendChild(op);
    }
    var addr = $('[data-addr]', form);
    var howSync = function () { var d = form.querySelector('[name="how"]:checked').value === 'delivery'; addr.hidden = !d; };
    $$('[name="how"]', form).forEach(function (r) { r.addEventListener('change', howSync); });
    howSync();
    var fields = $('.order-fields', form), box = $('[data-done]', form), err = $('[data-err]', form), btn = $('[data-submit]', form);
    var gform = form.getAttribute('data-gform');
    var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
    var t0 = Date.now();
    var label = function (name) { var el = form.querySelector('[name="' + name + '"]'); var s = el && el.closest('.field') && $('span', el.closest('.field')); return s ? s.textContent.replace(/\s*\*$/, '') : name; };
    var read = function () {
      var d = new FormData(form), t = total();
      var get = function (k) { return (d.get(k) || '').toString().trim(); };
      var how = get('how') === 'delivery';
      return {
        name: get('name'), phone: get('phone'), address: how ? get('address') : L('pickup'), date: get('time'), note: get('note'), website: get('website'), how: how,
        product: lines.map(function (l) { return byId[l.id].name + ' (' + desc(l) + ') × ' + l.q; }).join('; '),
        qty: String(t.n), price: money(t.sum), page: location.href.split('#')[0], market: body.getAttribute('data-market'),
      };
    };
    var text = function (x) {
      var t = total();
      var rows = lines.map(function (l) { return '- ' + byId[l.id].name + (desc(l) ? ' (' + desc(l) + ')' : '') + ' × ' + l.q + ' = ' + money(unit(l) * l.q); });
      return [form.getAttribute('data-order-text')].concat(rows, [L('total') + ': ' + money(t.sum), L('how') + ': ' + (x.how ? L('delivery') : L('pickup'))],
        [['name', x.name], ['phone', x.phone], ['address', x.how ? x.address : ''], ['time', x.date], ['note', x.note]].filter(function (r) { return r[1]; }).map(function (r) { return label(r[0]) + ': ' + r[1]; })).join('\n');
    };
    var valid = function (x) {
      var ok = true;
      [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8], ['address', x.how && x.address.length < 5]].forEach(function (y) {
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
      if (gform) { lines = []; save(); }
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var x = read();
      if (x.website || Date.now() - t0 < 2500 || !lines.length) return;
      if (!valid(x)) return;
      var msg = text(x);
      if (!gform) { done(msg); return; }
      var body2 = new URLSearchParams();
      Object.keys(gmap).forEach(function (k) { body2.append(gmap[k], x[k] || ''); });
      btn.disabled = true;
      var old = btn.innerHTML;
      btn.textContent = btn.getAttribute('data-sending');
      fetch(gform, { method: 'POST', mode: 'no-cors', body: body2 }).then(function () { done(msg); }, function () {
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
  }

  // ── Album ──
  var album = $('[data-album]');
  if (album) {
    var am = $('[data-album-more]');
    if (am) am.addEventListener('click', function () { $$('.ph.more', album).forEach(function (a) { a.classList.remove('more'); }); am.parentNode.hidden = true; });
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var tiles = $$('.ph', album), img = $('[data-lb-img]', lb), at = 0;
      var show = function (i) { at = (i + tiles.length) % tiles.length; img.src = tiles[at].getAttribute('href'); };
      album.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); show(tiles.indexOf(a)); lb.showModal(); });
      $('[data-lb-prev]', lb).addEventListener('click', function () { show(at - 1); });
      $('[data-lb-next]', lb).addEventListener('click', function () { show(at + 1); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    }
  }
})();
