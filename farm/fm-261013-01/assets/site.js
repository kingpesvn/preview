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

// Mẫu Nông sản sạch: lọc danh mục + tìm không dấu + "Xem thêm"; chọn quy cách (500 g / 1 kg) đổi giá; nút "+" cho vào giỏ;
// giỏ lưu trên máy khách (localStorage, lỗi thì chỉ giữ trong trang); ngăn kéo giỏ: tăng/giảm/xóa, tạm tính, phí giao,
// thanh "còn … để miễn phí giao"; ngày giao gần nhất theo site.delivery (đặt trước giờ chốt hôm trước) theo múi giờ shop;
// "Đang vào mùa" giữ món có tháng hiện tại; form đặt hàng → Google Form (nếu có) hoặc tin nhắn soạn sẵn qua Zalo / gọi / WhatsApp.
(function () {
  var body = document.body;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var cfg = JSON.parse(body.getAttribute('data-cfg') || '{}');
  var money = function (n) {
    try { return new Intl.NumberFormat(cfg.locale, { style: 'currency', currency: cfg.currency, maximumFractionDigits: cfg.max }).format(n); } catch (e) { return String(n); }
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

  // ── Ngày giờ theo múi giờ shop (không dùng toISOString: lệch ngày theo UTC) ──
  var tz = body.getAttribute('data-tz') || undefined;
  var parts = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
  var today = new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day, 12));
  var nowHM = parts.hour + ':' + parts.minute;
  var month = +parts.month;
  var addDays = function (d, n) { var x = new Date(d.getTime()); x.setUTCDate(x.getUTCDate() + n); return x; };
  var dayLabel = function (d) {
    try { return new Intl.DateTimeFormat(cfg.locale, { weekday: 'long', day: 'numeric', month: 'numeric', timeZone: 'UTC' }).format(d); } catch (e) { return d.toUTCString().slice(0, 11); }
  };
  // Ngày giao hợp lệ: đúng thứ giao, và giờ chốt (hôm trước ngày giao) chưa qua.
  var shipDays = [];
  if ((cfg.days || []).length) {
    for (var k = 1; k <= 21 && shipDays.length < 3; k++) {
      var d = addDays(today, k);
      if (cfg.days.indexOf(d.getUTCDay()) < 0) continue;
      if (k === 1 && nowHM >= (cfg.cutoff || '20:00')) continue;
      shipDays.push(d);
    }
  }
  if (shipDays.length) {
    $$('[data-next-ship]').forEach(function (el) {
      el.querySelector('span').textContent = (el.getAttribute('data-tpl') || '{day}').replace('{day}', dayLabel(shipDays[0]));
      el.hidden = false;
    });
  }

  // ── Đang vào mùa ──
  var inSeason = function (el) { var m = (el.getAttribute('data-months') || '').split(',').filter(Boolean).map(Number); return m.indexOf(month) >= 0; };
  var season = $('[data-season]');
  if (season) {
    var minis = $$('.mini', season), keep = 0;
    minis.forEach(function (el) { var ok = inSeason(el); el.hidden = !ok; if (ok) keep++; });
    season.hidden = !keep;
    var mEl = $('[data-month]', season);
    if (mEl) try { mEl.textContent = new Intl.DateTimeFormat(cfg.locale, { month: 'long', timeZone: 'UTC' }).format(today); } catch (e) { /* bỏ qua */ }
  }
  $$('.card[data-months]').forEach(function (el) { if (inSeason(el)) $('.tag--season', el).hidden = false; });

  // ── Lọc danh mục + tìm kiếm + "Xem thêm" ──
  var grid = $('[data-grid]');
  if (grid) {
    var cards = $$('.card', grid);
    var moreBtn = $('[data-more]'), leftEl = moreBtn && $('[data-left]', moreBtn);
    var state = { cat: '', q: '', shown: 24 };
    var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim(); };
    var apply = function () {
      var n = 0, q = norm(state.q);
      cards.forEach(function (c) {
        var ok = (!state.cat || c.getAttribute('data-c') === state.cat) && (!q || c.getAttribute('data-q').indexOf(q) >= 0);
        c.classList.toggle('off', !ok);
        if (ok) { n++; c.classList.toggle('show', n <= state.shown); }
      });
      $('[data-empty]').hidden = n > 0;
      if (moreBtn) { moreBtn.parentNode.hidden = n <= state.shown; if (leftEl) leftEl.textContent = '(' + (n - state.shown) + ')'; }
    };
    var setCat = function (id) {
      state.cat = id; state.shown = 24;
      $$('.chip[data-cat]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === id)); });
      apply();
    };
    $$('.chip[data-cat]').forEach(function (b) { b.addEventListener('click', function () { setCat(b.getAttribute('data-cat')); }); });
    $$('[data-go-cat]').forEach(function (a) { a.addEventListener('click', function () { setCat(a.getAttribute('data-go-cat')); }); });
    var search = $('[data-search]');
    if (search) search.addEventListener('input', function () { state.q = search.value; state.shown = 24; apply(); });
    if (moreBtn) moreBtn.addEventListener('click', function () { state.shown += 24; apply(); });
    cards.forEach(function (c) { c.classList.add('more'); });
    apply();
    // Chọn quy cách → đổi giá và quy cách cho nút "+".
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.var'); if (!b) return;
      var card = b.closest('.card'), id = $('.add', card).getAttribute('data-add'), vi = +b.getAttribute('data-vi');
      var p = byId[id]; if (!p) return;
      $$('.var', card).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $('[data-price]', card).textContent = money(p.v[vi].p);
      $('[data-unit]', card).textContent = '/ ' + p.v[vi].l;
      $('.add', card).setAttribute('data-v', vi);
    });
  }

  // ── Giỏ hàng ──
  var products = [];
  try { products = JSON.parse(($('#kp-products') || {}).textContent || '[]'); } catch (e) { products = []; }
  var byId = {}; products.forEach(function (p) { byId[p.id] = p; });
  var store = { get: function () { try { return JSON.parse(localStorage.getItem(cfg.key) || '[]'); } catch (e) { return null; } }, set: function (v) { try { localStorage.setItem(cfg.key, JSON.stringify(v)); } catch (e) { /* trình xem trước, chế độ riêng tư */ } } };
  var items = (store.get() || []).filter(function (it) { return byId[it.id] && byId[it.id].v[it.v]; });
  var drawer = $('[data-cart]');
  var linesEl = $('[data-lines]'), toast = $('[data-toast]'), tplAdded = $('[data-tpl-added]');
  var totals = function () {
    var sub = 0, n = 0;
    items.forEach(function (it) { sub += byId[it.id].v[it.v].p * it.q; n += it.q; });
    var ship = !n ? 0 : cfg.freeFrom && sub >= cfg.freeFrom ? 0 : cfg.fee || 0;
    return { sub: sub, n: n, ship: ship, total: sub + ship };
  };
  var render = function () {
    var s = totals();
    $$('[data-count]').forEach(function (b) { b.textContent = s.n; b.hidden = !s.n; });
    if (!drawer) return;
    linesEl.innerHTML = '';
    items.forEach(function (it, i) {
      var p = byId[it.id], v = p.v[it.v];
      var li = document.createElement('li');
      li.className = 'line';
      li.innerHTML = '<img alt="" width="64" height="64"><div class="ln"><b></b><small></small></div><div class="qty"><button type="button" data-dec aria-label="−">−</button><span></span><button type="button" data-inc aria-label="+">+</button></div><b class="lp"></b><button type="button" class="rm" data-rm aria-label="✕">✕</button>';
      li.querySelector('img').src = p.image || '';
      li.querySelector('.ln b').textContent = p.name;
      li.querySelector('.ln small').textContent = v.l + ' · ' + money(v.p);
      li.querySelector('.qty span').textContent = it.q;
      li.querySelector('.lp').textContent = money(v.p * it.q);
      li.setAttribute('data-i', i);
      linesEl.appendChild(li);
    });
    $('[data-cart-empty]', drawer).hidden = !!items.length;
    $('[data-sum]', drawer).hidden = !items.length;
    $('[data-order]', drawer).hidden = !items.length;
    $('[data-subtotal]', drawer).textContent = money(s.sub);
    var shipEl = $('[data-ship]', drawer);
    shipEl.textContent = s.ship ? money(s.ship) : shipEl.getAttribute('data-free-label');
    $('[data-total]', drawer).textContent = money(s.total);
    var free = $('[data-free]', drawer);
    if (cfg.freeFrom && items.length) {
      var txt = $('[data-free-text]', free), left = cfg.freeFrom - s.sub;
      txt.textContent = left > 0 ? txt.getAttribute('data-tpl').replace('{amount}', money(left)) : txt.getAttribute('data-done');
      $('[data-free-bar]', free).style.width = Math.min(100, s.sub / cfg.freeFrom * 100) + '%';
      free.classList.toggle('ok', left <= 0);
      free.hidden = false;
    } else free.hidden = true;
  };
  var save = function () { store.set(items); render(); };
  var flash = function (name) {
    if (!toast) return;
    toast.textContent = (tplAdded ? tplAdded.innerHTML : '{name}').replace('{name}', name).replace(/&amp;/g, '&');
    toast.hidden = false; clearTimeout(flash.t); flash.t = setTimeout(function () { toast.hidden = true; }, 1800);
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (b) {
      var id = b.getAttribute('data-add'), v = +b.getAttribute('data-v') || 0;
      if (!byId[id]) return;
      var it = items.filter(function (x) { return x.id === id && x.v === v; })[0];
      if (it) it.q++; else items.push({ id: id, v: v, q: 1 });
      save(); flash(byId[id].name + ' · ' + byId[id].v[v].l);
      b.classList.add('pop'); setTimeout(function () { b.classList.remove('pop'); }, 400);
      return;
    }
    if (e.target.closest('[data-cart-open]') && drawer && drawer.showModal) { render(); drawer.showModal(); return; }
    if (e.target.closest('[data-cart-close]') && drawer) { drawer.close(); return; }
    var line = e.target.closest('.line');
    if (line) {
      var i = +line.getAttribute('data-i');
      if (e.target.closest('[data-inc]')) items[i].q++;
      else if (e.target.closest('[data-dec]')) { items[i].q--; if (items[i].q < 1) items.splice(i, 1); }
      else if (e.target.closest('[data-rm]')) items.splice(i, 1);
      else return;
      save();
    }
  });
  if (drawer) drawer.addEventListener('click', function (e) { if (e.target === drawer) drawer.close(); });
  render();

  // ── Form đặt hàng ──
  var form = $('form[data-order]');
  if (form) {
    var sel = $('[data-ship-days]', form);
    if (sel && shipDays.length) {
      sel.innerHTML = '';
      shipDays.forEach(function (d) { var o = document.createElement('option'); o.textContent = sel.getAttribute('data-tpl').replace('{day}', dayLabel(d)); sel.appendChild(o); });
    }
    var fields = $('.order-fields', form), box = $('[data-done]', form), err = $('[data-err]', form), btn = $('[data-submit]', form);
    var gform = form.getAttribute('data-gform');
    var gmap = gform ? JSON.parse(form.getAttribute('data-gmap')) : null;
    var t0 = Date.now();
    var label = function (name) { var el = form.querySelector('[name="' + name + '"]'); var s = el && el.closest('.field') && $('span', el.closest('.field')); return s ? s.textContent.replace(/\s*\*$/, '') : name; };
    var read = function () {
      var d = new FormData(form), s = totals();
      var get = function (k) { return (d.get(k) || '').toString().trim(); };
      return {
        name: get('name'), phone: get('phone'), address: get('address'), date: get('date'), note: get('note'), website: get('website'),
        product: items.map(function (it) { var p = byId[it.id], v = p.v[it.v]; return p.name + ' (' + v.l + ') × ' + it.q; }).join('; '),
        qty: String(s.n), price: money(s.total), page: location.href.split('#')[0], market: body.getAttribute('data-market'),
      };
    };
    var text = function (x) {
      var s = totals();
      var lines = items.map(function (it) { var p = byId[it.id], v = p.v[it.v]; return '- ' + p.name + ' (' + v.l + ') × ' + it.q + ' = ' + money(v.p * it.q); });
      var head = [form.getAttribute('data-order-text')].concat(lines, [$('[data-total]').previousElementSibling.textContent + ': ' + money(s.total) + (s.ship ? '' : ' (' + $('[data-ship]').getAttribute('data-free-label') + ')')]);
      return head.concat([['name', x.name], ['phone', x.phone], ['address', x.address], ['date', x.date], ['note', x.note]].filter(function (r) { return r[1]; }).map(function (r) { return label(r[0]) + ': ' + r[1]; })).join('\n');
    };
    var valid = function (x) {
      var ok = true;
      [['name', !x.name], ['phone', x.phone.replace(/\D/g, '').length < 8], ['address', x.address.length < 5]].forEach(function (y) {
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
      if (gform) { items = []; save(); }
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var x = read();
      if (x.website || Date.now() - t0 < 2500 || !items.length) return;
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
  }

  // ── Album: "Xem thêm" + xem ảnh lớn ──
  var album = $('[data-album]');
  if (album) {
    var am = $('[data-album-more]');
    if (am) am.addEventListener('click', function () { $$('.ph.more', album).forEach(function (a) { a.classList.remove('more'); }); am.parentNode.hidden = true; });
    var lb = $('[data-lightbox]');
    if (lb && lb.showModal) {
      var tiles = $$('.ph', album), img = $('[data-lb-img]', lb), cur = 0;
      var open = function (i) { cur = (i + tiles.length) % tiles.length; img.src = tiles[cur].getAttribute('href'); };
      album.addEventListener('click', function (e) { var a = e.target.closest('.ph'); if (!a) return; e.preventDefault(); open(tiles.indexOf(a)); lb.showModal(); });
      $('[data-lb-prev]', lb).addEventListener('click', function () { open(cur - 1); });
      $('[data-lb-next]', lb).addEventListener('click', function () { open(cur + 1); });
      $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
      lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
      lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') open(cur + 1); if (e.key === 'ArrowLeft') open(cur - 1); });
    }
  }
})();
