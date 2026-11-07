var de={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},a=(n="")=>String(n).replace(/[&<>"']/g,e=>de[e]);function C(n,e,t="vi"){var o,r,c;return n==null?"":typeof n!="object"?String(n):(c=(r=(o=n[e])!=null?o:n[t])!=null?r:Object.values(n)[0])!=null?c:""}var he={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},B=n=>{var e;return(e=he[n])!=null?e:"en-US"};function ue(n,e="1"){if(e==="0.99")return Math.max(.99,Math.ceil(n)-.01);let t=Number(e)||1;return Math.max(t,Math.round(n/t)*t)}function me(n,e){var o,r;if(e.default)return n.basePrice;let t=(r=(o=n.prices)==null?void 0:o[e.id])!=null?r:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:ue(n.basePrice*e.rate,e.rounding)}var ge=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function J(n,e){let t={style:"currency",currency:e.currency};return ge.has(e.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(B(e.lang),t).format(n)}function V(n,e){return n.products.map(t=>({...t,price:me(t,e)})).filter(t=>t.price!=null)}function Z(n="/"){let e=n.endsWith("/")?n:`${n}/`;return(t="")=>e+String(t).replace(/^\//,"")}var j=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,z=(n,e)=>{let t=j(e);return t==null?e:n(t)},S=(n="")=>String(n).replace(/\D/g,"");function k(n,e,t=""){switch(n){case"phone":return`tel:${S(e.phone)}`;case"zalo":return`https://zalo.me/${S(e.zalo||e.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(e.messenger)}`;case"whatsapp":return`https://wa.me/${S(e.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(e.kakao)}/chat`;case"email":return`mailto:${e.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var q=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`;var fe={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},f=(n,e=20,t="")=>{var o;return`<svg class="i" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(o=fe[n])!=null?o:""}</svg>`},L=[1,2,3,4,5,6,0],ve=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Q(n,e){let t=n.map(r=>L.indexOf(r)).sort((r,c)=>r-c);return t.every((r,c)=>c===0||r===t[c-1]+1)&&t.length>2?`${e[L[t[0]]]} \u2013 ${e[L[t.at(-1)]]}`:t.map(r=>e[L[r]]).join(", ")}var ee=n=>n.map(e=>({"@type":"OpeningHoursSpecification",dayOfWeek:e.days.map(t=>ve[t]),opens:e.open,closes:e.close}));function te(n){var t,o;return(o=(t=new Intl.NumberFormat(B(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:t.value)!=null?o:n.currency}var w=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',ae=n=>`<div class="suggest" id="market-suggest" data-suggest="${a(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${a(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${a(n.market.dismiss)}">\xD7</button>
</div>`,ne=(n,e)=>{var t;return`<p class="status" data-open-status data-hours='${a(JSON.stringify(n.hours))}' data-tz="${a((t=n.timezone)!=null?t:"Asia/Ho_Chi_Minh")}" data-open="${a(e.visit.open)}" data-closed="${a(e.visit.closed)}" hidden></p>`},Y={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ye=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,be=n=>{var e;try{let t=new URL(String((e=n.googleReview)!=null?e:"").trim());return t.protocol==="https:"&&ye.test(t.hostname)?t.href:""}catch{return""}},O=(n,e,t,o="btn btn--line")=>{var s;let r=be(n);if(!r)return"";let c=typeof e.reviews=="object"&&((s=e.reviews)==null?void 0:s.google)||Y[t]||Y.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${a(r)}" target="_blank" rel="noopener">${f("star",16)} ${a(c)}</a></p>`},T={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},oe={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},A=n=>{var e;return((e=n.reviews)!=null?e:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function re(n,e){var c,s,i;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((c=n==null?void 0:n.date)!=null?c:"").trim());if(!t)return"";let o=new Date(Date.UTC(+t[1],+t[2]-1,+((s=t[3])!=null?s:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((i=oe[e])!=null?i:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${a(n.date)}">${a(r)}</time>`}function $e(n,e){var s,i;let t=n.filter(d=>d.rating>=1&&d.rating<=5);if(t.length<2)return"";let o=t.reduce((d,m)=>d+Number(m.rating),0)/t.length,r=(s=T[e])!=null?s:T.en,c=new Intl.NumberFormat((i=oe[e])!=null?i:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${f("star",18)}</span><strong>${c}</strong><span>\xB7</span><span>${a(r.count.replace("{n}",String(n.length)))}</span></p>`}function ie(n,e,t,o){var s;if(!n.length)return"";let r=(s=T[e])!=null?s:T.en,c=i=>`<button type="button" class="rv-btn" data-rv-${i} aria-label="${a(i==="prev"?r.prev:r.next)}">${f("arrow",18,i==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${$e(n,e)}<div class="rv" data-rv data-rv-more="${a(r.more)}" data-rv-less="${a(r.less)}">
      <div class="${t} rv-track" tabindex="0">${n.map(o).join("")}</div>
      <div class="rv-nav" hidden>${c("prev")}${c("next")}</div>
    </div>${xe}`}var xe=`<style>
.rv{--rv-gap:20px}
.rv>.rv-track.rv-track{display:grid;grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:calc((100% - 2 * var(--rv-gap)) / 3);gap:var(--rv-gap);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior-x:contain;padding:2px;margin:-2px}
.rv>.rv-track::-webkit-scrollbar{display:none}
.rv>.rv-track>*{scroll-snap-align:start;min-width:0;margin:0}
.rv>.rv-track>*>figcaption{margin-top:auto}
.rv>.rv-track blockquote{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;line-clamp:4;overflow:hidden}
.rv.rv-x>.rv-track.rv-track{align-items:start}
.rv>.rv-track .rv-open blockquote{-webkit-line-clamp:unset;line-clamp:unset;overflow:visible}
.rv-more{align-self:flex-start;padding:0;border:0;background:none;color:inherit;font:inherit;font-size:13px;font-weight:600;text-decoration:underline;cursor:pointer;opacity:.75}
.rv-date{display:block;margin-top:2px;font-size:12px;font-weight:400;opacity:.65}
.rv-nav{display:flex;justify-content:center;gap:12px;margin-top:22px}
.rv-nav[hidden]{display:none}
.rv-btn{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;border:1.5px solid currentColor;background:transparent;color:inherit;cursor:pointer}
.rv-btn:disabled{opacity:.3;cursor:default}
.rv-sum{display:flex;align-items:center;justify-content:flex-start;gap:8px;margin:-8px 0 24px;font-size:15px}
.h2.center~.rv-sum{justify-content:center}
.rv-sum-star{display:inline-flex;color:#E3A72F}.rv-sum-star svg{fill:currentColor}
@media (max-width:960px){.rv>.rv-track.rv-track{grid-auto-columns:calc((100% - var(--rv-gap)) / 2)}}
@media (max-width:640px){.rv{--rv-gap:14px}.rv>.rv-track.rv-track{grid-auto-columns:86%}}
</style><script>(()=>{for(const rv of document.querySelectorAll('[data-rv]')){if(rv.dataset.ready)continue;rv.dataset.ready=1;const t=rv.querySelector('.rv-track'),nav=rv.querySelector('.rv-nav'),p=rv.querySelector('[data-rv-prev]'),n=rv.querySelector('[data-rv-next]');
const step=()=>{const c=t.children[0];return c?c.getBoundingClientRect().width+parseFloat(getComputedStyle(t).columnGap||0):t.clientWidth};
const upd=()=>{const max=t.scrollWidth-t.clientWidth-2;nav.hidden=max<=0;p.disabled=t.scrollLeft<=2;n.disabled=t.scrollLeft>=max};
p.onclick=()=>t.scrollBy({left:-step(),behavior:'smooth'});n.onclick=()=>t.scrollBy({left:step(),behavior:'smooth'});
t.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);
for(const c of t.children){const q=c.querySelector('blockquote');if(!q||q.scrollHeight<=q.clientHeight+2)continue;const b=document.createElement('button');b.type='button';b.className='rv-more';b.textContent=rv.dataset.rvMore;b.setAttribute('aria-expanded','false');b.onclick=()=>{const o=c.classList.toggle('rv-open');rv.classList.toggle('rv-x',!!t.querySelector('.rv-open'));b.textContent=o?rv.dataset.rvLess:rv.dataset.rvMore;b.setAttribute('aria-expanded',String(o))};q.after(b)}
upd()}})()<\/script>`,X={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function se(n){var o;let e=(o=X[n])!=null?o:X.en,t="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${a(e.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${a(e.label)}</span>
      <button type="button" data-share-native hidden style="${t}">${f("share",15)} ${a(e.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${t}">${f("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${t}">${f("link",15)} <span>${a(e.copy)}</span></button>
    </div>`}var ce=(n,e,t)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${a(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${a(e.footer.madeWith)}</a>`;function le({site:n,markets:e,url:t,abs:o}){var s;let r=(s=e.find(i=>i.default))!=null?s:e[0],c=e.map(i=>({id:i.id,lang:i.lang,country:i.country}));return`<!doctype html>
<html lang="${a(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${a(n.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${e.map(i=>`<link rel="alternate" hreflang="${a(i.lang)}-${a(i.country)}" href="${o(`${i.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(c)}, root = ${JSON.stringify(t(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${e.map(i=>`<a href="${t(`${i.id}/`)}">${a(i.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ke="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";function He({site:n,catalog:e,i18n:t,template:o,basePath:r="/",siteUrl:c=n.domain}){var u,l,g;let s=Z(r),i=p=>new URL(s(p),c).href,d=e.markets,m=[],v=(p,y)=>`${y.id}/${C(p.slug,y.lang)}/`;for(let p of d){let y=p.lang,M=(u=t[y])!=null?u:t.vi,P=x=>C(x,y),D=V(e,p),$=(g=(l=n.orderChannels)==null?void 0:l[p.id])!=null?g:["phone"],N={site:n,catalog:e,market:p,markets:d,lang:y,t:M,L:P,url:s,abs:i,channels:$,products:D,productPath:v,price:x=>J(x.price,p),template:o};m.push({path:`${p.id}/index.html`,html:pe(N,{kind:"home"})});for(let x of D)m.push({path:`${v(x,p)}index.html`,html:pe(N,{kind:"product",product:x})})}return m.push({path:"index.html",html:le({site:n,markets:d,url:s,abs:i})}),m}function pe(n,e){var x,H,I,U,W,_,K;let{site:t,market:o,markets:r,lang:c,L:s,url:i,abs:d,catalog:m,productPath:v}=n,u=e.kind==="home",l=e.product,g=u?`${o.id}/`:v(l,o),p=u?`${t.name} \xB7 ${s(t.tagline)}`:`${s(l.name)} \xB7 ${t.name}`,y=s(u?t.intro:l.description),M=r.map(h=>{if(u)return{m:h,href:`${h.id}/`};let b=m.products.find(E=>E.id===l.id);return V({products:[b]},h).length>0?{m:h,href:v(b,h)}:null}).filter(Boolean),P=r.map(h=>{var b,R;return{m:h,href:(R=(b=M.find(E=>E.m.id===h.id))==null?void 0:b.href)!=null?R:`${h.id}/`}}),D=(x=r.find(h=>h.default))!=null?x:r[0],$=(H=t.theme)!=null?H:{},G=Object.entries({primary:$.primary,ink:$.ink,bg:$.bg,surface:$.surface,soft:$.soft,accent:$.accent}).filter(([,h])=>h).map(([h,b])=>`--${h}:${b}`).join(";"),N=P.map(({m:h,href:b})=>({id:h.id,lang:h.lang,country:h.country,currency:h.currency,href:i(b)}));return`<!doctype html>
<html lang="${a(c)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${a(p)}</title>
<meta name="description" content="${a(y)}">
<link rel="canonical" href="${d(g)}">
${M.map(({m:h,href:b})=>`<link rel="alternate" hreflang="${a(h.lang)}-${a(h.country)}" href="${d(b)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(u?`${D.id}/`:(U=(I=M.find(h=>h.m.id===D.id))==null?void 0:I.href)!=null?U:g)}">
<meta property="og:type" content="${u?"website":"product"}">
<meta property="og:title" content="${a(p)}">
<meta property="og:description" content="${a(y)}">
<meta property="og:url" content="${d(g)}">
<meta property="og:site_name" content="${a(t.name)}">
<meta property="og:image" content="${a(d((_=j(u?(W=t.heroImage)!=null?W:"photos/hero.webp":l.image))!=null?_:u?t.heroImage:l.image))}">
<meta name="theme-color" content="${a((K=$.bg)!=null?K:"#FFF7F2")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ke}">
<link rel="stylesheet" href="${i("assets/style.css")}">
<style>:root{${G}}</style>
${u?q(Ne(n)):q(Ce(n,l))}
<script src="${i("assets/site.js")}" defer><\/script>
</head>
<body data-market="${a(o.id)}" data-markets='${a(JSON.stringify(N))}'>
<a class="skip" href="#main">${c==="vi"?"B\u1ECF qua, t\u1EDBi n\u1ED9i dung":"Skip to content"}</a>
${ae(n.t)}
${u&&s(t.announcement)?`<p class="announce">${a(s(t.announcement))}</p>`:""}
${we(n,P)}
<main id="main">
${u?Me(n):Se(n,l)}
</main>
${ze(n)}
${Pe(n,u?"":s(l.name))}
</body>
</html>
`}function we(n,e){var d;let{site:t,market:o,t:r,url:c,channels:s}=n,i=c(`${o.id}/`);return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${i}">
      ${t.logo?`<img src="${a(z(c,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${a((d=t.name.trim()[0])!=null?d:"")}</span>`}
      <span>${a(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">
      <a href="${i}#menu">${a(r.nav.menu)}</a>
      <a href="${i}#story">${a(r.nav.story)}</a>
      <a href="${i}#visit">${a(r.nav.visit)}</a>
    </nav>
    <div class="bar-end">
      ${e.length>1?`<details class="market">
        <summary aria-label="${a(r.market.label)}">${f("globe",18)}<span>${a(o.id.toUpperCase())}<span class="cur"> \xB7 ${a(te(o))}</span></span></summary>
        <ul>${e.map(({m,href:v})=>`<li><a href="${c(v)}" hreflang="${a(m.lang)}"${m.id===o.id?' aria-current="true"':""}>${a(m.country)} \xB7 ${a(m.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-sm" href="${a(k(s[0],t.contact))}" ${w(s[0])}>${a(r.nav.order)}</a>
      <details class="mnav">
        <summary aria-label="${a(r.nav.openMenu)}">${f("menu",22)}</summary>
        <nav aria-label="Menu">
          <a href="${i}#menu">${a(r.nav.menu)}</a>
          <a href="${i}#story">${a(r.nav.story)}</a>
          <a href="${i}#visit">${a(r.nav.visit)}</a>
        </nav>
      </details>
    </div>
  </div>
</header>`}function Me(n){let{site:e,catalog:t,t:o,L:r,lang:c,url:s,products:i,channels:d}=n,m=i.filter(l=>l.featured).slice(0,4),v=e.heroImage?a(z(s,e.heroImage)):s("assets/photos/hero.webp"),u=t.categories.filter(l=>i.some(g=>g.category===l.id));return`
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1>${a(r(e.tagline))}</h1>
      <p class="lead">${a(r(e.intro))}</p>
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#menu">${a(o.hero.cta)} ${f("arrow",18)}</a>
        ${d.map(l=>`<a class="btn btn--ghost btn--lg" href="${a(k(l,e.contact))}" ${w(l)}>${f(l,18)} ${a(o.orderVia[l])}</a>`).join("")}
      </div>
      <ul class="badges">${o.hero.badges.map(l=>`<li>${a(l)}</li>`).join("")}</ul>
    </div>
    <div class="hero-art">
      <div class="blob" aria-hidden="true"></div>
      <img src="${v}" alt="${a(e.name)}" width="1000" height="1000" fetchpriority="high">
    </div>
  </div>
  <div class="scallop" aria-hidden="true"></div>
</section>

${m.length?`<section class="section section--soft" aria-labelledby="best">
  <div class="wrap">
    <h2 id="best" class="h2">${a(o.bestsellers)}</h2>
    <div class="grid grid--4">${m.map(l=>F(n,l)).join("")}</div>
  </div>
</section>`:""}

<section class="section" id="menu" aria-labelledby="menu-title">
  <div class="wrap">
    <div class="head">
      <h2 id="menu-title" class="h2">${a(o.menu.title)}</h2>
      <p class="muted">${a(o.menu.text)}</p>
    </div>
    <nav class="cats" aria-label="${a(o.menu.title)}">${u.map(l=>`<a href="#cat-${a(l.id)}">${a(r(l.name))}</a>`).join("")}</nav>
    ${u.map(l=>`<div class="cat" id="cat-${a(l.id)}">
      <h3 class="h3">${a(r(l.name))}</h3>
      <div class="grid grid--4">${i.filter(g=>g.category===l.id).map(g=>F(n,g)).join("")}</div>
    </div>`).join("")}
  </div>
</section>

${e.story?`<section class="section section--soft" id="story" aria-labelledby="story-title">
  <div class="wrap story">
    <div class="story-art" aria-hidden="true"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${s("assets/photos/story.webp")}" alt="" width="900" height="900" loading="lazy"></div>
    <div class="story-copy">
      <h2 id="story-title" class="h2">${a(r(e.story.title))}</h2>
      <p>${a(r(e.story.body))}</p>
      ${r(e.story.quote)?`<blockquote><p>\u201C${a(r(e.story.quote))}\u201D</p>${e.story.signature?`<cite>${a(e.story.signature)}</cite>`:""}</blockquote>`:""}
    </div>
  </div>
</section>`:""}

<section class="section" aria-labelledby="how-title">
  <div class="wrap">
    <h2 id="how-title" class="h2 center">${a(o.how.title)}</h2>
    <ol class="steps">${o.how.steps.map((l,g)=>`<li><span class="n">${g+1}</span><h3>${a(l.t)}</h3><p class="muted">${a(l.d)}</p></li>`).join("")}</ol>
  </div>
</section>

${e.showReviews!==!1&&(A(e).length||O(e,o,c))?`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${a(o.reviews)}</h2>
    ${ie(A(e),c,"grid grid--3",l=>`<figure class="review">
      <div class="stars" aria-label="${l.rating}/5">${Array.from({length:5},(g,p)=>`<span class="${p<l.rating?"on":""}">${f("star",18)}</span>`).join("")}</div>
      <blockquote>${a(r(l.text))}</blockquote>
      <figcaption>${a(l.name)}${re(l,c)}</figcaption>
    </figure>`)}${O(e,o,c,"btn btn--ghost")}
  </div>
</section>`:""}

${De(n)}`}function F(n,e){let{t,L:o,url:r,market:c,productPath:s,price:i,site:d,channels:m}=n,v=r(s(e,c)),u=t.orderText.replace("{product}",o(e.name));return`<article class="card${e.inStock?"":" is-out"}">
  <a class="card-img" href="${v}" tabindex="-1" aria-hidden="true">
    <img sizes="auto, (max-width: 640px) 50vw, 280px" src="${a(z(r,e.image))}" alt="" width="800" height="800" loading="lazy">
    ${e.badge&&e.inStock?`<span class="tag">${a(o(e.badge))}</span>`:""}
    ${e.inStock?"":`<span class="tag tag--out">${a(t.soldOut)}</span>`}
  </a>
  <div class="card-body">
    <h4 class="card-title"><a href="${v}">${a(o(e.name))}</a></h4>
    <p class="card-desc muted">${a(o(e.description))}</p>
    <div class="card-foot">
      <span class="price">${a(i(e))}</span>
      ${e.inStock?`<a class="btn btn--small btn--primary" href="${a(k(m[0],d.contact,u))}" ${w(m[0])} aria-label="${a(t.order)} ${a(o(e.name))}">${a(t.order)}</a>`:`<span class="btn btn--small btn--disabled" aria-disabled="true">${a(t.soldOut)}</span>`}
    </div>
  </div>
</article>`}function De(n){var s,i;let{site:e,t,L:o}=n,r=`https://www.google.com/maps?q=${encodeURIComponent((s=e.contact.mapQuery)!=null?s:o(e.contact.address))}&output=embed`,c=`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((i=e.contact.mapQuery)!=null?i:o(e.contact.address))}`;return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${a(t.visit.title)}</h2>
      ${ne(e,t)}
      <h3 class="h4">${f("clock",18)} ${a(t.visit.hours)}</h3>
      <table class="hours"><tbody>${e.hours.map(d=>`<tr><th scope="row">${a(Q(d.days,t.days))}</th><td>${a(d.open)} \u2013 ${a(d.close)}</td></tr>`).join("")}</tbody></table>
      <h3 class="h4">${f("pin",18)} ${a(t.visit.address)}</h3>
      <p>${a(o(e.contact.address))}</p>
      <a class="btn btn--ghost" href="${a(c)}" target="_blank" rel="noopener">${a(t.visit.directions)} ${f("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${a(t.visit.address)}" src="${a(r)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Se(n,e){let{t,L:o,url:r,market:c,catalog:s,products:i,site:d,channels:m,price:v}=n,u=s.categories.find(p=>p.id===e.category),l=i.filter(p=>p.id!==e.id&&p.category===e.category).concat(i.filter(p=>p.id!==e.id&&p.category!==e.category)).slice(0,4),g=t.orderText.replace("{product}",o(e.name));return`
<section class="section product">
  <div class="wrap">
    <a class="back" href="${r(`${c.id}/`)}#menu">\u2190 ${a(t.product.back)}</a>
    <div class="product-grid">
      <div class="product-img"><img src="${a(z(r,e.image))}" alt="${a(o(e.name))}" width="800" height="800" fetchpriority="high"></div>
      <div class="product-info">
        ${u?`<p class="eyebrow">${a(o(u.name))}</p>`:""}
        <h1>${a(o(e.name))}</h1>
        <p class="price price--lg">${a(v(e))}</p>
        <p class="lead">${a(o(e.description))}</p>
        ${e.inStock?`<div class="actions">${m.map((p,y)=>`<a class="btn ${y===0?"btn--primary":"btn--ghost"} btn--lg" href="${a(k(p,d.contact,g))}" ${w(p)}>${f(p,18)} ${a(t.orderVia[p])}</a>`).join("")}</div>`:`<p class="tag tag--out tag--inline">${a(t.soldOut)}</p>`}
        ${se(n.market.lang)}
      </div>
    </div>
  </div>
</section>
${l.length?`<section class="section section--soft" aria-labelledby="rel-title">
  <div class="wrap">
    <h2 id="rel-title" class="h2">${a(t.product.related)}</h2>
    <div class="grid grid--4">${l.map(p=>F(n,p)).join("")}</div>
  </div>
</section>`:""}`}function ze(n){let{site:e,t,L:o,market:r}=n,c=e.contact;return`<footer class="footer">
  <div class="wrap foot">
    <div>
      <p class="foot-name">${a(e.name)}</p>
      <p class="muted">${a(o(e.tagline))}</p>
    </div>
    <div>
      <p class="foot-h">${a(t.footer.contact)}</p>
      <ul>
        ${c.phone?`<li><a href="tel:${S(c.phone)}">${a(c.phone)}</a></li>`:""}
        ${c.email?`<li><a href="mailto:${a(c.email)}">${a(c.email)}</a></li>`:""}
        <li>${a(o(c.address))}</li>
      </ul>
    </div>
    ${e.social?`<div>
      <p class="foot-h">${a(t.footer.follow)}</p>
      <ul>${Object.entries(e.social).filter(([,s])=>s).map(([s,i])=>`<li><a href="${a(i)}" target="_blank" rel="noopener">${a(s[0].toUpperCase()+s.slice(1))}</a></li>`).join("")}</ul>
    </div>`:""}
  </div>
  <div class="wrap foot-bottom${e.badge===!1?" is-solo":""}">
    <span>\xA9 ${new Date().getFullYear()} ${a(e.name)}</span>
    ${ce(e,t,r.lang)}
  </div>
</footer>`}function Pe(n,e){let{site:t,t:o,channels:r}=n,c=e?o.orderText.replace("{product}",e):"";return`<nav class="orderbar" aria-label="${a(o.nav.order)}">
  ${r.slice(0,3).map((s,i)=>`<a class="${i===0?"primary":""}" href="${a(k(s,t.contact,c))}" ${w(s)}>${f(s,20)}<span>${a(o.orderVia[s])}</span></a>`).join("")}
</nav>`}function Ne({site:n,market:e,L:t,abs:o,products:r,price:c,productPath:s}){return{"@context":"https://schema.org","@type":"Bakery",name:n.name,url:o(`${e.id}/`),description:t(n.intro),telephone:n.contact.phone,email:n.contact.email,address:{"@type":"PostalAddress",streetAddress:t(n.contact.address)},currenciesAccepted:e.currency,openingHoursSpecification:ee(n.hours),hasMenu:{"@type":"Menu",hasMenuItem:r.map(i=>({"@type":"MenuItem",name:t(i.name),url:o(s(i,e)),offers:{"@type":"Offer",price:i.price,priceCurrency:e.currency,description:c(i)}}))}}}function Ce({site:n,market:e,L:t,abs:o,url:r,productPath:c},s){var i;return{"@context":"https://schema.org","@type":"Product",name:t(s.name),description:t(s.description),image:o((i=j(s.image))!=null?i:s.image),brand:{"@type":"Brand",name:n.name},offers:{"@type":"Offer",url:o(c(s,e)),price:s.price,priceCurrency:e.currency,availability:s.inStock?"https://schema.org/InStock":"https://schema.org/OutOfStock"}}}export{He as renderSite};
