var be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t=(a="")=>String(a).replace(/[&<>"']/g,e=>be[e]);function B(a,e,n="vi"){var o,r,s;return a==null?"":typeof a!="object"?String(a):(s=(r=(o=a[e])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?s:""}var $e={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},G=a=>{var e;return(e=$e[a])!=null?e:"en-US"};function xe(a,e="1"){if(e==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(e)||1;return Math.max(n,Math.round(a/n)*n)}function Z(a,e){var o,r;if(e.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[e.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:xe(a.basePrice*e.rate,e.rounding)}var ke=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function Y(a,e){let n={style:"currency",currency:e.currency};return ke.has(e.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(G(e.lang),n).format(a)}function X(a="/"){let e=a.endsWith("/")?a:`${a}/`;return(n="")=>e+String(n).replace(/^\//,"")}var N=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,S=(a,e)=>{let n=N(e);return n==null?e:a(n)},M=(a="")=>String(a).replace(/\D/g,"");function C(a,e,n=""){switch(a){case"phone":return`tel:${M(e.phone)}`;case"zalo":return`https://zalo.me/${M(e.zalo||e.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(e.messenger)}`;case"whatsapp":return`https://wa.me/${M(e.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(e.kakao)}/chat`;case"email":return`mailto:${e.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var T=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`;var we={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},g=(a,e=20,n="")=>{var o;return`<svg class="i" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=we[a])!=null?o:""}</svg>`},V=[1,2,3,4,5,6,0],Me=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function te(a,e){let n=a.map(r=>V.indexOf(r)).sort((r,s)=>r-s);return n.every((r,s)=>s===0||r===n[s-1]+1)&&n.length>2?`${e[V[n[0]]]} \u2013 ${e[V[n.at(-1)]]}`:n.map(r=>e[V[r]]).join(", ")}var ae=a=>a.map(e=>({"@type":"OpeningHoursSpecification",dayOfWeek:e.days.map(n=>Me[n]),opens:e.open,closes:e.close}));function ne(a){var n,o;return(o=(n=new Intl.NumberFormat(G(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var F=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',oe=a=>`<div class="suggest" id="market-suggest" data-suggest="${t(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${t(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${t(a.market.dismiss)}">\xD7</button>
</div>`,re=(a,e)=>{var n;return`<p class="status" data-open-status data-hours='${t(JSON.stringify(a.hours))}' data-tz="${t((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${t(e.visit.open)}" data-closed="${t(e.visit.closed)}" hidden></p>`},Q={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},De=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Se=a=>{var e;try{let n=new URL(String((e=a.googleReview)!=null?e:"").trim());return n.protocol==="https:"&&De.test(n.hostname)?n.href:""}catch{return""}},se=(a,e,n,o="btn btn--line")=>{var i;let r=Se(a);if(!r)return"";let s=typeof e.reviews=="object"&&((i=e.reviews)==null?void 0:i.google)||Q[n]||Q.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${t(r)}" target="_blank" rel="noopener">${g("star",16)} ${t(s)}</a></p>`},A={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ie={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ce=a=>{var e;return((e=a.reviews)!=null?e:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function le(a,e){var s,i,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((c=ie[e])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${t(a.date)}">${t(r)}</time>`}function ze(a,e){var i,c;let n=a.filter(h=>h.rating>=1&&h.rating<=5);if(n.length<2)return"";let o=n.reduce((h,d)=>h+Number(d.rating),0)/n.length,r=(i=A[e])!=null?i:A.en,s=new Intl.NumberFormat((c=ie[e])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${g("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${t(r.count.replace("{n}",String(a.length)))}</span></p>`}function pe(a,e,n,o){var i;if(!a.length)return"";let r=(i=A[e])!=null?i:A.en,s=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${t(c==="prev"?r.prev:r.next)}">${g("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ze(a,e)}<div class="rv" data-rv data-rv-more="${t(r.more)}" data-rv-less="${t(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${Pe}`}var Pe=`<style>
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
upd()}})()<\/script>`,ee={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function de(a){var o;let e=(o=ee[a])!=null?o:ee.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${t(e.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${t(e.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${g("share",15)} ${t(e.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${g("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${g("link",15)} <span>${t(e.copy)}</span></button>
    </div>`}var he=(a,e,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${t(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${t(e.footer.madeWith)}</a>`;function ue({site:a,markets:e,url:n,abs:o}){var i;let r=(i=e.find(c=>c.default))!=null?i:e[0],s=e.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${t(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${e.map(c=>`<link rel="alternate" hreflang="${t(c.lang)}-${t(c.country)}" href="${o(`${c.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(s)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${e.map(c=>`<a href="${n(`${c.id}/`)}">${t(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Ne="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ge=24;function fe(a,e){return a.products.map(n=>({...n,variants:n.variants.map(o=>({...o,price:Z(o,e)})).filter(o=>o.price!=null)})).filter(n=>n.variants.length>0).map(n=>({...n,from:Math.min(...n.variants.map(o=>o.price))}))}function je(a){let e=a.filter(s=>{var i;return((i=s.badge)==null?void 0:i.en)==="Best seller"}),n=a.filter(s=>!e.includes(s)),o=[...new Set(n.map(s=>s.category))].map(s=>n.filter(i=>i.category===s)),r=[...e];for(let s=0;r.length<a.length;s++)for(let i of o)i[s]&&r.push(i[s]);return r}var Ce=a=>String(a).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function it({site:a,catalog:e,i18n:n,template:o,basePath:r="/",siteUrl:s=a.domain}){var v,y,x,f;let i=X(r),c=u=>new URL(i(u),s).href,h=e.markets,d=(u,b)=>`${b.id}/${B(u.slug,b.lang,"en")}/`,p=[];for(let u of h){let b=u.lang,D=(y=(v=n[b])!=null?v:n.en)!=null?y:n.vi,w=k=>B(k,b,"en"),l=fe(e,u),$=(f=(x=a.orderChannels)==null?void 0:x[u.id])!=null?f:["phone"],R={site:a,catalog:e,market:u,markets:h,lang:b,t:D,L:w,url:i,abs:c,channels:$,money:k=>Y(k,u),items:l,productPath:d,template:o,name:(k,z)=>{var q,j;return w((j=(q=k==null?void 0:k.find(E=>E.id===z))==null?void 0:q.name)!=null?j:z)}};p.push({path:`${u.id}/index.html`,html:me(R,{kind:"home"})});for(let k of l)p.push({path:`${d(k,u)}index.html`,html:me(R,{kind:"product",product:k})})}return p.push({path:"index.html",html:ue({site:a,markets:h,url:i,abs:c})}),p}function me(a,e){var j,E,H,I,U,W,_,K;let{site:n,market:o,markets:r,lang:s,t:i,L:c,url:h,abs:d,catalog:p,productPath:v,channels:y,money:x}=a,f=e.kind==="home",u=e.product,b=f?`${o.id}/`:v(u,o),D=f?`${n.name} \xB7 ${c(n.tagline)}`:`${c(u.name)} \xB7 ${n.name}`,w=f?c(n.intro):`${c(u.description)} ${i.from} ${x(u.from)}.`,l=r.map(m=>f?{m,href:`${m.id}/`}:fe({products:[p.products.find(P=>P.id===u.id)]},m).length?{m,href:v(u,m)}:null).filter(Boolean),$=m=>{var P,J;return(J=(P=l.find(ye=>ye.m.id===m.id))==null?void 0:P.href)!=null?J:`${m.id}/`},O=(j=r.find(m=>m.default))!=null?j:r[0],L=(E=n.theme)!=null?E:{},R=["primary","ink","bg","surface","soft","accent"].filter(m=>L[m]).map(m=>`--${m}:${L[m]}`).join(";"),k=r.map(m=>({id:m.id,lang:m.lang,country:m.country,currency:m.currency,href:h($(m))})),z=y[0],q=d(f?N((I=(H=n.heroImages)==null?void 0:H[0])!=null?I:"photos/flower-market.webp"):N(u.image));return`<!doctype html>
<html lang="${t(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t(D)}</title>
<meta name="description" content="${t(w)}">
<link rel="canonical" href="${d(b)}">
${l.map(({m,href:P})=>`<link rel="alternate" hreflang="${t(m.lang)}-${t(m.country)}" href="${d(P)}">`).join(`
`)}
${l.some(m=>m.m.id===O.id)?`<link rel="alternate" hreflang="x-default" href="${d($(O))}">`:""}
<meta property="og:type" content="${f?"website":"product"}">
<meta property="og:title" content="${t(D)}">
<meta property="og:description" content="${t(w)}">
<meta property="og:url" content="${d(b)}">
<meta property="og:image" content="${t(q)}">
<meta property="og:site_name" content="${t(n.name)}">
<meta name="theme-color" content="${t((U=L.primary)!=null?U:"#B83260")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ne}">
<link rel="stylesheet" href="${h("assets/style.css")}">
<style>:root{${R}}</style>
${f?T(Ue(a))+((W=n.faq)!=null&&W.length?T(We(a)):""):T(_e(a,u))+T(Ke(a,u))}
<script src="${h("assets/site.js")}" defer><\/script>
</head>
<body data-market="${t(o.id)}" data-markets='${t(JSON.stringify(k))}' data-copied="${t(i.copied)}" data-wa="${t(M((_=n.contact.whatsapp)!=null?_:""))}" data-email="${t((K=n.contact.email)!=null?K:"")}">
<a class="skip" href="#main">${t(i.skip)}</a>
${oe(i)}
${n.announcement?`<p class="announce">${t(c(n.announcement))}</p>`:""}
${Te(a,f)}
<main id="main">
${f?[Le,Re,qe,Ee,Be,Ve,Ae,Fe,Ge].map(m=>m(a)).join(`
`):He(a,u)}
</main>
${Ie(a)}
<nav class="dock" aria-label="${t(i.nav.order)}">
  ${f?`<a href="#shop">${g("search",20)}<span>${t(i.nav.shop)}</span></a>`:`<a href="${h(`${o.id}/`)}#shop">${g("search",20)}<span>${t(i.nav.shop)}</span></a>`}
  <a class="primary" href="${t(f?C(z,n.contact):"#order")}" ${f?F(z):""}>${g(z,20)}<span>${t(i.nav.order)}</span></a>
</nav>
</body>
</html>
`}function Te({site:a,market:e,markets:n,t:o,url:r,channels:s},i){let c=i?"":r(`${e.id}/`),h=[[`${c}#shop`,o.nav.shop],[`${c}#occasions`,o.nav.occasions],[`${c}#how`,o.nav.how],[`${c}#visit`,o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${e.id}/`)}">
      ${a.logo?`<img src="${t(S(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${g("leaf",20)}</span>`}
      <span>${t(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${h.map(([d,p])=>`<a href="${d}">${t(p)}</a>`).join("")}</nav>
    <div class="bar-end">
      <details class="market">
        <summary aria-label="${t(o.market.label)}">${g("globe",18)}<span>${t(e.id.toUpperCase())}<span class="cur"> \xB7 ${t(ne(e))}</span></span></summary>
        <ul>${n.map(d=>`<li><a href="${r(`${d.id}/`)}" hreflang="${t(d.lang)}"${d.id===e.id?' aria-current="true"':""}>${t(d.country)} \xB7 ${t(d.currency)}</a></li>`).join("")}</ul>
      </details>
      ${a.contact.phone?`<a class="btn btn--primary hide-sm" href="tel:${M(a.contact.phone)}">${g("phone",18)} ${t(a.contact.phone)}</a>`:""}
      <details class="mnav">
        <summary aria-label="${t(o.nav.openMenu)}">${g("menu",22)}</summary>
        <nav aria-label="Menu">${h.map(([d,p])=>`<a href="${d}">${t(p)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Le({site:a,t:e,L:n,url:o,items:r}){var i;let s=((i=a.heroImages)!=null&&i.length?a.heroImages:r.slice(0,3).map(c=>c.image)).slice(0,3);return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1>${t(n(a.tagline))}</h1>
      <p class="lead">${t(n(a.intro))}</p>
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#shop">${t(e.hero.shop)} ${g("arrow",18)}</a>
        ${a.contact.phone?`<a class="btn btn--line btn--lg" href="tel:${M(a.contact.phone)}">${g("phone",18)} ${t(e.hero.call)}</a>`:""}
      </div>
    </div>
    <div class="collage" aria-hidden="true">
      ${s.map((c,h)=>`<img sizes="auto, (max-width: 640px) 50vw, 280px" class="c${h+1}" src="${t(S(o,c))}" alt="" width="800" height="800"${h?' loading="lazy"':' fetchpriority="high"'}>`).join("")}
    </div>
  </div>
</section>`}function Re({site:a,L:e}){var n;return(n=a.perks)!=null&&n.length?`<section class="perks" aria-label="${t(a.name)}">
  <ul class="wrap perk-list">${a.perks.map(o=>{var r;return`<li>${g((r=o.icon)!=null?r:"check",22)}<div><b>${t(e(o.title))}</b>${o.text?`<span>${t(e(o.text))}</span>`:""}</div></li>`}).join("")}</ul>
</section>`:""}function qe({catalog:a,items:e,t:n,L:o,url:r}){var i;let s=((i=a.occasions)!=null?i:[]).map(c=>({...c,n:e.filter(h=>{var d;return(d=h.occasions)==null?void 0:d.includes(c.id)}).length})).filter(c=>c.n);return s.length?`<section class="section" id="occasions" aria-labelledby="occ-title">
  <div class="wrap">
    <h2 id="occ-title" class="h2">${t(n.occasions.title)}</h2>
    <ul class="occ">${s.map(c=>`<li><a href="?occ=${t(c.id)}#shop" data-occ-link="${t(c.id)}">
      ${c.image?`<img sizes="auto, (max-width: 640px) 50vw, 280px" src="${t(S(r,c.image))}" alt="" width="800" height="800" loading="lazy">`:""}
      <span class="occ-name">${t(o(c.name))}</span><span class="occ-n">${t(n.occasions.count.replace("{n}",c.n))}</span>
    </a></li>`).join("")}</ul>
  </div>
</section>`:""}function ve(a,e,n=0){var y,x;let{t:o,L:r,url:s,money:i,productPath:c,market:h,catalog:d,name:p}=a,v=[r(e.name),(y=e.name)==null?void 0:y.vi,(x=e.name)==null?void 0:x.en,p(d.categories,e.category),...e.flowers.map(f=>p(d.flowers,f)),...e.occasions.map(f=>p(d.occasions,f))].filter(Boolean).join(" ");return`<li class="card${n>=ge?" is-more":""}" data-type="${t(e.category)}" data-occ="${t(e.occasions.join(" "))}" data-fl="${t(e.flowers.join(" "))}" data-price="${e.from}" data-name="${t(Ce(v))}">
  <a class="card-link" href="${s(c(e,h))}">
    <div class="card-img"><img sizes="auto, (max-width: 640px) 50vw, 280px" src="${t(S(s,e.image))}" alt="${t(r(e.name))}" width="800" height="800" loading="lazy">${e.badge?`<span class="tag">${t(r(e.badge))}</span>`:""}</div>
    <h3>${t(r(e.name))}</h3>
    <p class="card-price"><small>${t(o.from)}</small> ${t(i(e.from))}</p>
    ${e.variants.length>1?`<p class="card-sizes">${e.variants.map(f=>`<span>${t(r(f.size))}</span>`).join("")}</p>`:""}
  </a>
</li>`}function Ee(a){var h,d;let{items:e,catalog:n,t:o,L:r}=a,s=n.categories.filter(p=>e.some(v=>v.category===p.id)),i=((h=n.occasions)!=null?h:[]).filter(p=>e.some(v=>{var y;return(y=v.occasions)==null?void 0:y.includes(p.id)})),c=((d=n.flowers)!=null?d:[]).filter(p=>e.some(v=>{var y;return(y=v.flowers)==null?void 0:y.includes(p.id)}));return`<section class="section section--soft" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="shop-head">
      <h2 id="shop-title" class="h2">${t(o.shop.title)}</h2>
      <p class="muted" data-count="${t(o.shop.count)}">${t(o.shop.count.replace("{n}",e.length))}</p>
    </div>
    <div class="toolbar" data-toolbar>
      <div class="chips" role="group" aria-label="${t(o.shop.all)}">
        <button type="button" class="pill is-on" data-type="">${t(o.shop.all)}</button>
        ${s.map(p=>`<button type="button" class="pill" data-type="${t(p.id)}">${t(r(p.name))}</button>`).join("")}
      </div>
      <div class="filters">
        <label class="search">${g("search",18)}<input type="search" placeholder="${t(o.search)}" aria-label="${t(o.search)}" data-search></label>
        <label class="select"><span class="sr">${t(o.shop.occasion)}</span><select data-occ><option value="">${t(o.shop.anyOccasion)}</option>${i.map(p=>`<option value="${t(p.id)}">${t(r(p.name))}</option>`).join("")}</select></label>
        <label class="select"><span class="sr">${t(o.shop.flower)}</span><select data-fl><option value="">${t(o.shop.anyFlower)}</option>${c.map(p=>`<option value="${t(p.id)}">${t(r(p.name))}</option>`).join("")}</select></label>
        <label class="select"><span class="sr">${t(o.shop.sort)}</span><select data-sort>
          <option value="">${t(o.shop.sortPop)}</option><option value="asc">${t(o.shop.sortLow)}</option><option value="desc">${t(o.shop.sortHigh)}</option>
        </select></label>
      </div>
    </div>
    <ul class="grid" data-grid>${je(e).map((p,v)=>ve(a,p,v)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${t(o.shop.empty)}</p>
    ${e.length>ge?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${t(o.shop.more)}</button></div>`:""}
  </div>
</section>`}function Be({site:a,t:e,L:n}){var o;return(o=a.steps)!=null&&o.length?`<section class="section" id="how" aria-labelledby="how-title">
  <div class="wrap">
    <h2 id="how-title" class="h2">${t(e.steps.title)}</h2>
    <ol class="steps">${a.steps.map((r,s)=>`<li><span class="step-n">${s+1}</span><h3>${t(n(r.title))}</h3><p class="muted">${t(n(r.text))}</p></li>`).join("")}</ol>
  </div>
</section>`:""}function Ve({site:a,L:e,url:n}){var r;let o=a.story;return o?`<section class="section section--soft" aria-labelledby="story-title">
  <div class="wrap story">
    <figure class="story-img"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${t(S(n,(r=o.image)!=null?r:"photos/shop-buckets.webp"))}" alt="" width="1400" height="900" loading="lazy"></figure>
    <div><h2 id="story-title" class="h2">${t(e(o.title))}</h2>${o.body?`<p class="lead">${t(e(o.body))}</p>`:""}</div>
  </div>
</section>`:""}function Ae({site:a,t:e,L:n,lang:o}){let r=se(a,e,o,"btn btn--line"),s=ce(a);return a.showReviews===!1||!s.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${t(e.reviews.title)}</h2>
    ${pe(s,o,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${t(i.rating)}/5">${Array.from({length:5},(c,h)=>`<span class="${h<i.rating?"on":""}">${g("star",16)}</span>`).join("")}</p>
      <blockquote>${t(n(i.text))}</blockquote>
      <figcaption>${t(i.name)}${le(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Fe({site:a,t:e,L:n}){var o;return(o=a.faq)!=null&&o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${t(e.faq.title)}</h2>
    <div>${a.faq.map((r,s)=>`<details${s===0?" open":""}><summary>${t(n(r.q))}</summary><p>${t(n(r.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Oe(a,e){let n=new Map;for(let o of a){let r=[...o.days].sort().join(",");n.has(r)||n.set(r,{days:o.days,slots:[]}),n.get(r).slots.push(`${o.open} \u2013 ${o.close}`)}return[...n.values()].map(o=>{var r;return{label:o.days.length===7?(r=e.visit.everyDay)!=null?r:e.days.join(", "):te(o.days,e.days),slots:o.slots.join(", ")}})}function Ge({site:a,t:e,L:n,channels:o}){var s;let r=encodeURIComponent((s=a.contact.mapQuery)!=null?s:n(a.contact.address));return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div>
      <h2 id="visit-title" class="h2">${t(e.visit.title)}</h2>
      ${re(a,e)}
      <h3 class="h4">${g("clock",18)} ${t(e.visit.hours)}</h3>
      <table class="hours"><tbody>${Oe(a.hours,e).map(i=>`<tr><th scope="row">${t(i.label)}</th><td>${t(i.slots)}</td></tr>`).join("")}</tbody></table>
      <h3 class="h4">${g("pin",18)} ${t(e.visit.address)}</h3>
      <p>${t(n(a.contact.address))}</p>
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${t(e.visit.directions)} ${g("arrow",16)}</a>
        ${o.map(i=>`<a class="btn btn--ghost" href="${t(C(i,a.contact))}" ${F(i)}>${g(i,18)} ${t(e.via[i])}</a>`).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${t(e.visit.address)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function He(a,e){var w;let{site:n,t:o,L:r,url:s,money:i,market:c,items:h,channels:d,catalog:p,name:v}=a,y=e.variants.map(l=>({size:r(l.size)||"",price:i(l.price)})),x=e.variants.reduce((l,$)=>$.price<l.price?$:l),f=[...h.filter(l=>l.id!==e.id&&l.category===e.category),...h.filter(l=>l.id!==e.id&&l.category!==e.category&&l.occasions.some($=>e.occasions.includes($)))].slice(0,8),u=p.categories.find(l=>l.id===e.category),b=s(`${c.id}/`),D=o.orderText.replace("{product}",r(e.name)).replace("{size}",r(x.size)||"").replace("{price}",i(x.price)).replace(/\{\w+\}/g,"\u2026");return`<div class="wrap crumbs"><a href="${b}">${t(o.nav.home)}</a>${g("chevron",14)}<a href="${b}?type=${t(e.category)}#shop">${t(r(u==null?void 0:u.name))}</a>${g("chevron",14)}<span aria-current="page">${t(r(e.name))}</span></div>
<section class="wrap pdp" data-product data-name="${t(r(e.name))}" data-sizes='${t(JSON.stringify(y))}' data-text="${t(o.orderText)}">
  <figure class="pdp-img"><img src="${t(S(s,e.image))}" alt="${t(r(e.name))}" width="800" height="800" fetchpriority="high">${e.badge?`<span class="tag">${t(r(e.badge))}</span>`:""}</figure>
  <div class="pdp-info">
    <p class="kicker">${t(r(u==null?void 0:u.name))}</p>
    <h1 class="pdp-title">${t(r(e.name))}</h1>
    <p class="pdp-price"><strong data-v="price">${t(i(x.price))}</strong></p>
    <p class="lead">${t(r(e.description))}</p>
    ${e.variants.length>1?`<fieldset class="opts"><legend>${t(o.product.size)}</legend><div class="opt-row">
      ${e.variants.map((l,$)=>`<label class="opt"><input type="radio" name="size" value="${$}"${l===x?" checked":""}><span><b>${t(r(l.size))}</b><small>${t(i(l.price))}</small></span></label>`).join("")}
    </div></fieldset>`:""}
    <dl class="tags">
      <div><dt>${t(o.product.occasions)}</dt><dd>${e.occasions.map(l=>`<a href="${b}?occ=${t(l)}#shop">${t(v(p.occasions,l))}</a>`).join("")}</dd></div>
      <div><dt>${t(o.product.flowers)}</dt><dd>${e.flowers.map(l=>`<span>${t(v(p.flowers,l))}</span>`).join("")}</dd></div>
    </dl>
    <form class="order" id="order" data-compose>
      <h2 class="h4">${g("truck",18)} ${t(o.product.delivery)}</h2>
      <div class="fields">
        <label><span>${t(o.product.date)}</span><input type="date" name="date" required></label>
        <label><span>${t(o.product.time)}</span><select name="time">${((w=o.product.times)!=null?w:[]).map(l=>`<option>${t(l)}</option>`).join("")}</select></label>
        <label><span>${t(o.product.recipient)}</span><input name="recipient" autocomplete="off"></label>
        <label><span>${t(o.product.phone)}</span><input name="phone" type="tel" autocomplete="off"></label>
        <label class="wide"><span>${t(o.product.address)}</span><input name="address" autocomplete="off"></label>
        <label class="wide"><span>${t(o.product.card)}</span><textarea name="card" rows="2" placeholder="${t(o.product.cardHint)}"></textarea></label>
      </div>
      <div class="buy">${d.map((l,$)=>`<button type="submit" class="btn ${$?"btn--line":"btn--primary"} btn--lg" data-channel="${t(l)}" data-href="${t(C(l,n.contact,D))}">${g(l,18)} ${t(l==="phone"?o.product.call:o.product.send.replace("{channel}",o.via[l]))}</button>`).join("")}</div>
      <noscript><p>${d.map(l=>`<a href="${t(C(l,n.contact,D))}" ${F(l)}>${t(o.via[l])}</a>`).join(" \xB7 ")}</p></noscript>
      <p class="form-msg" role="status" hidden></p>
      <p class="muted small">${g("check",16)} ${t(o.product.note)}</p>
      <p class="muted small">${t(o.product.photo)}</p>
    </form>
    ${de(a.market.lang)}
  </div>
</section>
${f.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${t(o.product.related)}</h2>
  <ul class="grid grid--related">${f.map(l=>ve(a,l)).join("")}</ul>
</div></section>`:""}`}function Ie({site:a,t:e,L:n,market:o}){let r=a.contact;return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${t(a.name)}</p><p class="muted">${t(n(a.tagline))}</p></div>
    <div><p class="foot-h">${t(e.footer.contact)}</p><ul>
      ${r.phone?`<li>${t(e.footer.hotline)}: <a href="tel:${M(r.phone)}">${t(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${t(r.email)}">${t(r.email)}</a></li>`:""}
      <li>${t(n(r.address))}</li></ul></div>
    ${a.social?`<div><p class="foot-h">${t(e.footer.follow)}</p><ul>${Object.entries(a.social).filter(([,s])=>s).map(([s,i])=>`<li><a href="${t(i)}" target="_blank" rel="noopener">${t(s==="tiktok"?"TikTok":s[0].toUpperCase()+s.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${t(a.name)}</span>${he(a,e,o.lang)}</div>
</footer>`}function Ue({site:a,market:e,L:n,abs:o}){var r,s;return{"@context":"https://schema.org","@type":"Florist",name:a.name,url:o(`${e.id}/`),image:o(N((s=(r=a.heroImages)==null?void 0:r[0])!=null?s:"photos/flower-market.webp")),description:n(a.intro),telephone:a.contact.phone,email:a.contact.email,address:{"@type":"PostalAddress",streetAddress:n(a.contact.address)},currenciesAccepted:e.currency,openingHoursSpecification:ae(a.hours)}}var We=({site:a,L:e})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.map(n=>({"@type":"Question",name:e(n.q),acceptedAnswer:{"@type":"Answer",text:e(n.a)}}))});function _e({site:a,market:e,L:n,abs:o,productPath:r},s){return{"@context":"https://schema.org","@type":"Product",name:n(s.name),description:n(s.description),image:o(N(s.image)),url:o(r(s,e)),offers:s.variants.map(i=>({"@type":"Offer",name:[n(s.name),n(i.size)].filter(Boolean).join(" \u2013 "),price:i.price,priceCurrency:e.currency,availability:"https://schema.org/InStock",seller:{"@type":"Organization",name:a.name}}))}}function Ke({catalog:a,market:e,L:n,abs:o,productPath:r,t:s},i){let c=a.categories.find(h=>h.id===i.category);return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:s.nav.home,item:o(`${e.id}/`)},{"@type":"ListItem",position:2,name:n(c==null?void 0:c.name),item:o(`${e.id}/?type=${i.category}`)},{"@type":"ListItem",position:3,name:n(i.name),item:o(r(i,e))}]}}export{it as renderSite};
