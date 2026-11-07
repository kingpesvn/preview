var $e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t=(a="")=>String(a).replace(/[&<>"']/g,e=>$e[e]);function E(a,e,n="vi"){var o,r,s;return a==null?"":typeof a!="object"?String(a):(s=(r=(o=a[e])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?s:""}var be={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},G=a=>{var e;return(e=be[a])!=null?e:"en-US"};function O(a,e="1"){if(e==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(e)||1;return Math.max(n,Math.round(a/n)*n)}function F(a,e){var o,r;if(e.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[e.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:O(a.basePrice*e.rate,e.rounding)}var xe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function X(a,e){let n={style:"currency",currency:e.currency};return xe.has(e.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(G(e.lang),n).format(a)}function Q(a="/"){let e=a.endsWith("/")?a:`${a}/`;return(n="")=>e+String(n).replace(/^\//,"")}var H=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,L=(a,e)=>{let n=H(e);return n==null?e:a(n)},C=(a="")=>String(a).replace(/\D/g,"");function R(a,e,n=""){switch(a){case"phone":return`tel:${C(e.phone)}`;case"zalo":return`https://zalo.me/${C(e.zalo||e.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(e.messenger)}`;case"whatsapp":return`https://wa.me/${C(e.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(e.kakao)}/chat`;case"email":return`mailto:${e.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var q=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`;var ke={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(a,e=20,n="")=>{var o;return`<svg class="i" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=ke[a])!=null?o:""}</svg>`},B=[1,2,3,4,5,6,0],we=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function ae(a,e){let n=a.map(r=>B.indexOf(r)).sort((r,s)=>r-s);return n.every((r,s)=>s===0||r===n[s-1]+1)&&n.length>2?`${e[B[n[0]]]} \u2013 ${e[B[n.at(-1)]]}`:n.map(r=>e[B[r]]).join(", ")}var ne=a=>a.map(e=>({"@type":"OpeningHoursSpecification",dayOfWeek:e.days.map(n=>we[n]),opens:e.open,closes:e.close}));function oe(a){var n,o;return(o=(n=new Intl.NumberFormat(G(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var A=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',re=a=>`<div class="suggest" id="market-suggest" data-suggest="${t(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${t(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${t(a.market.dismiss)}">\xD7</button>
</div>`,se=(a,e)=>{var n;return`<p class="status" data-open-status data-hours='${t(JSON.stringify(a.hours))}' data-tz="${t((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${t(e.visit.open)}" data-closed="${t(e.visit.closed)}" hidden></p>`},ee={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Me=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,De=a=>{var e;try{let n=new URL(String((e=a.googleReview)!=null?e:"").trim());return n.protocol==="https:"&&Me.test(n.hostname)?n.href:""}catch{return""}},ie=(a,e,n,o="btn btn--line")=>{var i;let r=De(a);if(!r)return"";let s=typeof e.reviews=="object"&&((i=e.reviews)==null?void 0:i.google)||ee[n]||ee.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${t(r)}" target="_blank" rel="noopener">${m("star",16)} ${t(s)}</a></p>`},V={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ce={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},le=a=>{var e;return((e=a.reviews)!=null?e:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function pe(a,e){var s,i,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((c=ce[e])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${t(a.date)}">${t(r)}</time>`}function Se(a,e){var i,c;let n=a.filter(l=>l.rating>=1&&l.rating<=5);if(n.length<2)return"";let o=n.reduce((l,d)=>l+Number(d.rating),0)/n.length,r=(i=V[e])!=null?i:V.en,s=new Intl.NumberFormat((c=ce[e])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${t(r.count.replace("{n}",String(a.length)))}</span></p>`}function de(a,e,n,o){var i;if(!a.length)return"";let r=(i=V[e])!=null?i:V.en,s=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${t(c==="prev"?r.prev:r.next)}">${m("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Se(a,e)}<div class="rv" data-rv data-rv-more="${t(r.more)}" data-rv-less="${t(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${ze}`}var ze=`<style>
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
upd()}})()<\/script>`,te={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function he(a){var o;let e=(o=te[a])!=null?o:te.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${t(e.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${t(e.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${m("share",15)} ${t(e.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${m("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${m("link",15)} <span>${t(e.copy)}</span></button>
    </div>`}var ue=(a,e,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${t(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${t(e.footer.madeWith)}</a>`;function me({site:a,markets:e,url:n,abs:o}){var i;let r=(i=e.find(c=>c.default))!=null?i:e[0],s=e.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
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
`}var Pe="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap";function fe(a,e){return a.products.map(n=>({...n,variants:n.variants.map(o=>({...o,price:F(o,e),list:Ne(o,e)})).filter(o=>o.price!=null)})).filter(n=>n.variants.length>0).map(n=>({...n,from:n.variants.reduce((o,r)=>r.price<o.price?r:o)}))}function Ne(a,e){var o,r,s;if(!a.listPrice)return null;if(e.default)return a.listPrice>a.basePrice?a.listPrice:null;if(((s=(r=(o=a.prices)==null?void 0:o[e.id])==null?void 0:r.mode)!=null?s:"auto")!=="auto")return null;let n=O(a.listPrice*e.rate,e.rounding);return n>F(a,e)?n:null}function st({site:a,catalog:e,i18n:n,template:o,basePath:r="/",siteUrl:s=a.domain}){var g,h,$,f,D;let i=Q(r),c=v=>new URL(i(v),s).href,l=e.markets,d=(v,k)=>`${k.id}/${E(v.slug,k.lang)}/`,y=[];for(let v of l){let k=v.lang,S=(h=(g=n[k])!=null?g:n.en)!=null?h:n.vi,z=x=>E(x,k,"en"),P=fe(e,v),w=(f=($=a.orderChannels)==null?void 0:$[v.id])!=null?f:["phone"],N=x=>X(x,v),j=(D=a.installmentMonths)!=null?D:12,b={site:a,catalog:e,market:v,markets:l,lang:k,t:S,L:z,url:i,abs:c,channels:w,money:N,monthly:x=>N(Number.isInteger(x)&&x>=1e4?Math.ceil(x/j/1e3)*1e3:Math.ceil(x/j*100)/100),months:j,devices:P,productPath:d,template:o};y.push({path:`${v.id}/index.html`,html:ge(b,{kind:"home"})});for(let x of P)y.push({path:`${d(x,v)}index.html`,html:ge(b,{kind:"product",product:x})})}return y.push({path:"index.html",html:me({site:a,markets:l,url:i,abs:c})}),y}function ge(a,e){var b,x,W,_,K,J,Z;let{site:n,market:o,markets:r,lang:s,t:i,L:c,url:l,abs:d,catalog:y,productPath:g,channels:h}=a,$=e.kind==="home",f=e.product,D=$?`${o.id}/`:g(f,o),v=$?`${n.name} \xB7 ${c(n.tagline)}`:`${f.name} ${f.variants.map(u=>u.size).join(", ")} \xB7 ${n.name}`,k=$?c(n.intro):`${c(f.summary)} ${i.installment.replace("{price}",a.monthly(f.from.price)).replace("{n}",a.months)}.`,S=r.map(u=>$?{m:u,href:`${u.id}/`}:fe({products:[y.products.find(T=>T.id===f.id)]},u).length?{m:u,href:g(f,u)}:null).filter(Boolean),z=u=>{var T,Y;return(Y=(T=S.find(ye=>ye.m.id===u.id))==null?void 0:T.href)!=null?Y:`${u.id}/`},P=(b=r.find(u=>u.default))!=null?b:r[0],w=(x=n.theme)!=null?x:{},N=["primary","ink","bg","surface","soft","accent"].filter(u=>w[u]).map(u=>`--${u}:${w[u]}`).join(";"),j=r.map(u=>({id:u.id,lang:u.lang,country:u.country,currency:u.currency,href:l(z(u))})),p=h[0];return`<!doctype html>
<html lang="${t(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t(v)}</title>
<meta name="description" content="${t(k)}">
<link rel="canonical" href="${d(D)}">
${S.map(({m:u,href:T})=>`<link rel="alternate" hreflang="${t(u.lang)}-${t(u.country)}" href="${d(T)}">`).join(`
`)}
${S.some(u=>u.m.id===P.id)?`<link rel="alternate" hreflang="x-default" href="${d(z(P))}">`:""}
<meta property="og:type" content="${$?"website":"product"}">
<meta property="og:title" content="${t(v)}">
<meta property="og:description" content="${t(k)}">
<meta property="og:url" content="${d(D)}">
<meta property="og:site_name" content="${t(n.name)}">
<meta property="og:image" content="${t(d((W=H(!$&&f.image||n.heroImage||`photos/${(f==null?void 0:f.category)==="tablet"?"tablets":"phones"}.webp`))!=null?W:n.heroImage))}">
<meta name="theme-color" content="${t((_=w.ink)!=null?_:"#0B1220")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Pe}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${N}}</style>
${$?q(Ie(a))+((K=n.faq)!=null&&K.length?q(Ue(a)):""):q(We(a,f))+q(_e(a,f))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${t(o.id)}" data-markets='${t(JSON.stringify(j))}' data-copied="${t(i.copied)}" data-wa="${t(C((J=n.contact.whatsapp)!=null?J:""))}" data-email="${t((Z=n.contact.email)!=null?Z:"")}">
<a class="skip" href="#main">${t(i.skip)}</a>
${re(i)}
${n.announcement?`<p class="announce">${t(c(n.announcement))}</p>`:""}
${je(a,z)}
<main id="main">
${$?[Re,qe,Ee,Be,Ve,Fe,Ae,Ge].map(u=>u(a)).join(`
`):Oe(a,f)}
</main>
${He(a)}
<nav class="dock" aria-label="${t(i.nav.order)}">
  <a href="${t(R(p,n.contact))}" ${A(p)} ${$?"":"data-order"}>${m(p,20)}<span>${t($?i.via[p]:i.product.orderVia.replace("{channel}",i.via[p]))}</span></a>
</nav>
</body>
</html>
`}function je({site:a,market:e,markets:n,t:o,url:r,channels:s},i){let c=r(`${e.id}/`),l=[[`${c}?type=phone#shop`,o.nav.phones],[`${c}?type=tablet#shop`,o.nav.tablets],[`${c}#tradein`,o.nav.tradein],[`${c}#stores`,o.nav.stores]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${c}">
      ${a.logo?`<img src="${t(L(r,a.logo))}" alt="" width="34" height="34">`:'<span class="brand-mark" aria-hidden="true"><i></i></span>'}
      <span>${t(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${l.map(([d,y])=>`<a href="${d}">${t(y)}</a>`).join("")}</nav>
    <div class="bar-end">
      <details class="market">
        <summary aria-label="${t(o.market.label)}">${m("globe",18)}<span>${t(e.id.toUpperCase())}<span class="cur"> \xB7 ${t(oe(e))}</span></span></summary>
        <ul>${n.map(d=>`<li><a href="${r(i(d))}" hreflang="${t(d.lang)}"${d.id===e.id?' aria-current="true"':""}>${t(d.country)} \xB7 ${t(d.currency)}</a></li>`).join("")}</ul>
      </details>
      <a class="btn btn--primary hide-sm" href="${t(R(s[0],a.contact))}" ${A(s[0])}>${m(s[0],18)} ${t(o.nav.order)}</a>
      <details class="mnav">
        <summary aria-label="${t(o.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${l.map(([d,y])=>`<a href="${d}">${t(y)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}var Ce=0;function M(a,e,n){return`<circle cx="${a}" cy="${e}" r="${n+3}" fill="#000" opacity=".18"/><circle cx="${a}" cy="${e}" r="${n}" fill="#101114"/><circle cx="${a}" cy="${e}" r="${n*.55}" fill="#1c2638"/><circle cx="${a-n*.3}" cy="${e-n*.3}" r="${n*.18}" fill="#fff" opacity=".55"/>`}function Te(a,e){if(e)return a==="square"?`<rect x="18" y="18" width="58" height="58" rx="16" fill="#000" opacity=".12"/>${M(36,36,9)}${M(58,58,9)}`:M(30,30,10);switch(a){case"pro":return`<rect x="14" y="14" width="104" height="104" rx="30" fill="#000" opacity=".13"/>${M(42,42,17)}${M(42,90,17)}${M(90,66,17)}<circle cx="92" cy="32" r="6" fill="#f3e7c4" opacity=".9"/>`;case"dual":return`<rect x="16" y="16" width="56" height="106" rx="28" fill="#000" opacity=".13"/>${M(44,44,18)}${M(44,94,18)}<circle cx="86" cy="30" r="5" fill="#f3e7c4" opacity=".9"/>`;case"column":return`${M(40,40,15)}${M(40,82,15)}${M(40,124,15)}<circle cx="74" cy="40" r="5" fill="#f3e7c4" opacity=".9"/>`;case"square":return`<rect x="14" y="14" width="96" height="96" rx="22" fill="#000" opacity=".13"/>${M(40,40,15)}${M(84,40,15)}${M(40,84,15)}<circle cx="84" cy="84" r="6" fill="#f3e7c4" opacity=".9"/>`;default:return M(40,40,16)}}function Le(a,e,{size:n="lg"}={}){var D,v;let o=`d${++Ce}`,r=((D=a.device)==null?void 0:D.shape)==="tablet",[s,i,c]=r?[250,350,22]:[180,370,34],l=s+(r?130:110),d=i+34,y=`<linearGradient id="${o}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>`,g=`<linearGradient id="${o}w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--dev)"/><stop offset=".55" stop-color="#1b2140"/><stop offset="1" stop-color="#0a0d18"/></linearGradient>`,h=r?12:9,$=`<g transform="translate(0 34)">
    <rect width="${s}" height="${i}" rx="${c}" fill="#0c0d10"/>
    <rect x="${h}" y="${h}" width="${s-h*2}" height="${i-h*2}" rx="${c-h+2}" fill="url(#${o}w)"/>
    ${r?`<circle cx="${s/2}" cy="${h/2+1}" r="2.2" fill="#2a2d33"/>`:`<rect x="${s/2-28}" y="${h+10}" width="56" height="16" rx="8" fill="#050506"/>`}
    <text x="${h+16}" y="${r?84:86}" fill="#fff" font-family="system-ui, sans-serif" font-weight="300" font-size="${r?40:36}">9:41</text>
    <rect width="${s}" height="${i}" rx="${c}" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  </g>`,f=`<g transform="translate(${l-s} 0)">
    <rect width="${s}" height="${i}" rx="${c}" style="fill:var(--dev)"/>
    <rect width="${s}" height="${i}" rx="${c}" fill="url(#${o}g)"/>
    ${Te((v=a.device)==null?void 0:v.camera,r)}
    <rect x="1" y="1" width="${s-2}" height="${i-2}" rx="${c-1}" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="2"/>
  </g>`;return`<svg class="dev dev--${n}${r?" dev--tab":""}" viewBox="0 0 ${l} ${d}" style="--dev:${t(e)}" role="img" aria-label="${t(a.name)}"><defs>${y}${g}</defs>${$}${f}</svg>`}var U=(a,e,n,o)=>{var r,s,i;return a.image?`<img sizes="auto, (max-width: 640px) 50vw, 280px" class="dev-img" src="${t(L(e,a.image))}" alt="${t(a.name)}" loading="lazy">`:Le(a,(i=(s=(r=a.colors)==null?void 0:r[0])==null?void 0:s.hex)!=null?i:"#C9CCD3",o)},I=a=>a.list?Math.round((1-a.price/a.list)*100):0;function Re(a){var $,f,D,v,k,S,z,P;let{site:e,devices:n,t:o,L:r,url:s,money:i,monthly:c,months:l,productPath:d,market:y}=a,g=(f=($=n.find(w=>{var N;return w.id===((N=e.hero)==null?void 0:N.product)}))!=null?$:n.find(w=>w.featured))!=null?f:n[0];if(!g)return"";let h=s(d(g,y));return`<section class="hero" style="--glow:${t((k=(v=(D=g.colors)==null?void 0:D[0])==null?void 0:v.hex)!=null?k:"#2F5BFF")}">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${g.badge?`<span class="chip chip--glow">${t(r(g.badge))}</span>`:""}
      <h1>${t(r((S=e.hero)==null?void 0:S.title)||g.name)}</h1>
      <p class="lead">${t(r((z=e.hero)==null?void 0:z.text)||r(g.summary))}</p>
      <p class="hero-price"><span>${t(o.hero.from)}</span> <strong>${t(i(g.from.price))}</strong>${g.from.list?` <s>${t(i(g.from.list))}</s>`:""}</p>
      <p class="hero-inst">${m("card",18)} ${t(o.installment.replace("{price}",c(g.from.price)).replace("{n}",l))}</p>
      <div class="actions">
        <a class="btn btn--light btn--lg" href="${h}">${t(o.hero.buy)} ${m("arrow",18)}</a>
        <a class="btn btn--outline-light btn--lg" href="#shop">${t(o.hero.all)}</a>
      </div>
    </div>
    <a class="hero-art" href="${h}" tabindex="-1" aria-hidden="true">${U(g,s,r,{size:"xl"})}</a>
  </div>
  ${((P=g.colors)==null?void 0:P.length)>1?`<ul class="hero-colors wrap" aria-hidden="true">${g.colors.map(w=>`<li style="--c:${t(w.hex)}">${t(r(w.name))}</li>`).join("")}</ul>`:""}
</section>`}function qe({site:a,L:e}){var n;return(n=a.perks)!=null&&n.length?`<section class="perks-sec"><ul class="wrap perks">${a.perks.map(o=>{var r;return`<li>
    <span class="perk-i">${m((r=o.icon)!=null?r:"check",24)}</span>
    <span><strong>${t(e(o.title))}</strong><small>${t(e(o.text))}</small></span>
  </li>`}).join("")}</ul></section>`:""}function Ee({site:a,L:e,url:n}){var o;return(o=a.banners)!=null&&o.length?`<section class="section section--tight"><div class="wrap banners">${a.banners.map(r=>{var s;return`<a class="banner" href="?type=${t((s=r.filter)!=null?s:"")}#shop">
    <img sizes="auto, (max-width: 640px) 100vw, 580px" src="${t(L(n,r.image))}" alt="" width="1000" height="760" loading="lazy">
    <span class="banner-copy"><strong>${t(e(r.title))}</strong><small>${t(e(r.text))}</small><span class="banner-go">${m("arrow",18)}</span></span>
  </a>`}).join("")}</div></section>`:""}function ve(a,e){var g;let{t:n,L:o,url:r,money:s,monthly:i,productPath:c,market:l}=a,d=e.from,y=I(d);return`<li class="card" data-type="${t(e.category)}" data-brand="${t(e.brand)}" data-price="${d.price}" data-name="${t(`${e.brand} ${e.name}`.toLowerCase())}">
  <a class="card-link" href="${r(c(e,l))}">
    <div class="card-art">${U(e,r,o,{size:"sm"})}
      <div class="card-tags">${y?`<span class="chip chip--sale">-${y}%</span>`:""}${e.badge?`<span class="chip">${t(o(e.badge))}</span>`:""}</div>
    </div>
    <p class="card-brand">${t(e.brand)}</p>
    <h3>${t(e.name)}</h3>
    ${e.variants.length>1||d.size?`<p class="card-sizes">${e.variants.map(h=>`<span>${t(h.size)}</span>`).join("")}</p>`:""}
    <p class="card-price"><strong>${t(s(d.price))}</strong>${d.list?`<s>${t(s(d.list))}</s>`:""}</p>
    <p class="card-foot"><span class="inst">${t(n.installmentShort.replace("{price}",i(d.price)))}</span>${(g=e.colors)!=null&&g.length?`<span class="dots" aria-hidden="true">${e.colors.map(h=>`<i style="background:${t(h.hex)}"></i>`).join("")}</span>`:""}</p>
    ${e.stock==="soon"?`<p class="soon">${t(n.stock.soon)}</p>`:""}
  </a>
</li>`}function Be(a){let{devices:e,catalog:n,t:o,L:r}=a,s=n.categories.filter(c=>e.some(l=>l.category===c.id)),i=[...new Set(e.map(c=>c.brand))];return`<section class="section" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="shop-head">
      <h2 id="shop-title" class="h2">${t(o.shop.title)}</h2>
      <p class="muted" data-count="${t(o.shop.count)}">${t(o.shop.count.replace("{n}",e.length))}</p>
    </div>
    <div class="toolbar" data-toolbar>
      <div class="chips" role="group" aria-label="${t(o.shop.all)}">
        <button type="button" class="pill is-on" data-type="">${t(o.shop.all)}</button>
        ${s.map(c=>`<button type="button" class="pill" data-type="${t(c.id)}">${t(r(c.name))}</button>`).join("")}
      </div>
      <div class="chips" role="group" aria-label="${t(o.shop.brand)}">
        ${i.map(c=>`<button type="button" class="pill pill--ghost" data-brand="${t(c)}" aria-pressed="false">${t(c)}</button>`).join("")}
      </div>
      <label class="search">${m("search",18)}<input type="search" placeholder="${t(o.search)}" aria-label="${t(o.search)}" data-search></label>
      <label class="sort"><span class="sr">${t(o.shop.sort)}</span><select data-sort>
        <option value="">${t(o.shop.sortPop)}</option><option value="asc">${t(o.shop.sortLow)}</option><option value="desc">${t(o.shop.sortHigh)}</option>
      </select></label>
    </div>
    <ul class="grid" data-grid>${e.map(c=>ve(a,c)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${t(o.shop.empty)}</p>
  </div>
</section>`}function Ve({site:a,t:e,L:n,url:o,devices:r,channels:s}){let i=a.tradein;if(!i)return"";let c=e.tradein,l=s[0];return`<section class="section section--dark" id="tradein" aria-labelledby="ti-title">
  <div class="wrap tradein">
    <div class="ti-copy">
      <h2 id="ti-title" class="h2">${t(n(i.title))}</h2>
      <p class="lead">${t(n(i.text))}</p>
      ${i.image?`<img sizes="auto, (max-width: 640px) 100vw, 580px" class="ti-img" src="${t(L(o,i.image))}" alt="" width="1000" height="760" loading="lazy">`:""}
    </div>
    <form class="form" data-compose data-channel="${t(l)}" data-href="${t(R(l,a.contact))}" data-message="${t(c.message)}">
      <label>${t(c.model)}<input name="model" placeholder="${t(c.modelHint)}" required></label>
      <fieldset><legend>${t(c.condition)}</legend>
        ${c.conditions.map((d,y)=>`<label class="radio"><input type="radio" name="condition" value="${t(d)}"${y===0?" checked":""}><span>${t(d)}</span></label>`).join("")}
      </fieldset>
      <label>${t(c.want)}<select name="want"><option>${t(c.any)}</option>${r.map(d=>`<option>${t(d.name)}</option>`).join("")}</select></label>
      <div class="row">
        <label>${t(c.name)}<input name="name" autocomplete="name" required></label>
        <label>${t(c.phone)}<input name="phone" type="tel" autocomplete="tel" required></label>
      </div>
      <button class="btn btn--primary btn--lg" type="submit">${m(l,18)} ${t(c.submit)}</button>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Ae({site:a,t:e,L:n}){var o;return(o=a.faq)!=null&&o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${t(e.faq)}</h2>
    <div class="qa">${a.faq.map((r,s)=>`<details${s===0?" open":""}><summary>${t(n(r.q))}${m("chevron",18)}</summary><p>${t(n(r.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ge({site:a,t:e,L:n}){var i,c;let o=(i=a.branches)!=null&&i.length?a.branches:[{name:a.name,address:a.contact.address,phone:a.contact.phone}],r=encodeURIComponent((c=a.contact.mapQuery)!=null?c:n(o[0].address)),s=l=>l.length===7?e.visit.everyDay:ae(l,e.days);return`<section class="section section--soft" id="stores" aria-labelledby="stores-title">
  <div class="wrap stores">
    <div>
      <h2 id="stores-title" class="h2">${t(e.visit.title)}</h2>
      ${se(a,e)}
      <ul class="branches">${o.map(l=>{let d=encodeURIComponent(n(l.address));return`<li>
        <strong>${t(n(l.name))}</strong>
        <span>${m("pin",16)} ${t(n(l.address))}</span>
        ${l.phone?`<a href="tel:${C(l.phone)}">${m("phone",16)} ${t(l.phone)}</a>`:""}
        <a class="link" href="https://www.google.com/maps/dir/?api=1&amp;destination=${d}" target="_blank" rel="noopener">${t(e.visit.directions)} ${m("arrow",14)}</a>
      </li>`}).join("")}</ul>
      <p class="hours-line">${m("clock",18)} <span>${t(e.visit.hours)}:</span> ${a.hours.map(l=>`${t(s(l.days))} ${t(l.open)} \u2013 ${t(l.close)}`).join(" \xB7 ")}</p>
    </div>
    <div class="map"><iframe title="${t(n(o[0].name))}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Oe(a,e){var S,z,P,w,N,j;let{site:n,t:o,L:r,url:s,money:i,monthly:c,months:l,market:d,devices:y,channels:g}=a,h=e.from,$=(S=e.colors)==null?void 0:S[0],f=e.variants.map(p=>({size:p.size,price:i(p.price),list:p.list?i(p.list):"",off:I(p)?`-${I(p)}%`:"",save:p.list?o.product.save.replace("{price}",i(p.list-p.price)):"",inst:o.installment.replace("{price}",c(p.price)).replace("{n}",l)})),D=y.filter(p=>p.id!==e.id&&p.category===e.category).slice(0,4),v=a.catalog.categories.find(p=>p.id===e.category),k=s(`${d.id}/`);return`<div class="wrap crumbs"><a href="${k}">${t(o.nav.home)}</a>${m("chevron",14)}<a href="${k}?type=${t(e.category)}#shop">${t(r(v==null?void 0:v.name))}</a>${m("chevron",14)}<span aria-current="page">${t(e.name)}</span></div>
<section class="wrap pdp" data-product data-name="${t(e.name)}" data-variants='${t(JSON.stringify(f))}' data-text="${t(o.orderText)}">
  <div class="pdp-art">
    <div class="pdp-stage">${U(e,s,r,{size:"xl"})}</div>
    ${e.stock==="soon"?`<span class="chip chip--warn">${t(o.stock.soon)}</span>`:""}
  </div>
  <div class="pdp-info">
    <p class="card-brand">${t(e.brand)}${e.badge?` <span class="chip">${t(r(e.badge))}</span>`:""}</p>
    <h1 class="pdp-title">${t(e.name)}</h1>
    <p class="muted">${t(r(e.summary))}</p>
    <div class="pdp-price">
      <strong data-v="price">${t(i(h.price))}</strong>
      <s data-v="list"${h.list?"":" hidden"}>${h.list?t(i(h.list)):""}</s>
      <span class="chip chip--sale" data-v="off"${h.list?"":" hidden"}>${t(f[e.variants.indexOf(h)].off)}</span>
    </div>
    <p class="save" data-v="save"${h.list?"":" hidden"}>${t(f[e.variants.indexOf(h)].save)}</p>
    <p class="pdp-inst">${m("card",18)} <span data-v="inst">${t(f[e.variants.indexOf(h)].inst)}</span></p>
    ${e.variants.length?`<fieldset class="opts"><legend>${t(o.product.storage)}</legend><div class="opt-row">
      ${e.variants.map((p,b)=>`<label class="opt"><input type="radio" name="size" value="${b}"${p===h?" checked":""}><span><b>${t(p.size)}</b><small>${t(i(p.price))}</small></span></label>`).join("")}
    </div></fieldset>`:""}
    ${(z=e.colors)!=null&&z.length?`<fieldset class="opts"><legend>${t(o.product.color)}: <span data-v="color">${t(r($.name))}</span></legend><div class="opt-row">
      ${e.colors.map((p,b)=>`<label class="swatch" title="${t(r(p.name))}"><input type="radio" name="color" value="${t(r(p.name))}" data-hex="${t(p.hex)}"${b===0?" checked":""}><span style="background:${t(p.hex)}"></span><span class="sr">${t(r(p.name))}</span></label>`).join("")}
    </div></fieldset>`:""}
    <p class="stock stock--${t((P=e.stock)!=null?P:"in")}">${m(e.stock==="soon"?"clock":"check",18)} ${t(o.stock[(w=e.stock)!=null?w:"in"])}</p>
    <div class="buy">
      ${g.map((p,b)=>`<a class="btn ${b?"btn--ghost":"btn--primary"} btn--lg" href="${t(R(p,n.contact))}" ${A(p)} data-order data-channel="${t(p)}">${m(p,18)} ${t(b?o.via[p]:o.product.orderVia.replace("{channel}",o.via[p]))}</a>`).join("")}
    </div>
    <p class="form-msg" role="status" hidden></p>
    ${(N=n.perks)!=null&&N.length?`<ul class="mini-perks">${n.perks.map(p=>{var b;return`<li>${m((b=p.icon)!=null?b:"check",18)} ${t(r(p.title))}</li>`}).join("")}</ul>`:""}
    <p class="note muted">${t(o.product.note)}</p>
    ${he(a.market.lang)}
  </div>
</section>
${(j=e.specs)!=null&&j.length?`<section class="section section--tight"><div class="wrap specs">
  <h2 class="h3">${t(o.product.specs)}</h2>
  <table><tbody>${e.specs.map(([p,b])=>{var x;return`<tr><th scope="row">${t((x=o.specs[p])!=null?x:p)}</th><td>${t(r(b))}</td></tr>`}).join("")}</tbody></table>
</div></section>`:""}
${D.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${t(o.product.related)}</h2>
  <ul class="grid grid--related">${D.map(p=>ve(a,p)).join("")}</ul>
</div></section>`:""}`}function Fe({site:a,t:e,L:n,lang:o}){let r=ie(a,e,o,"btn"),s=le(a);return a.showReviews===!1||!s.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${t(e.reviews.title)}</h2>
    ${de(s,o,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${t(i.rating)}/5">${Array.from({length:5},(c,l)=>`<span class="${l<i.rating?"on":""}">${m("star",16)}</span>`).join("")}</p>
      <blockquote>${t(n(i.text))}</blockquote>
      <figcaption>${t(i.name)}${i.bought?`<small>${t(n(i.bought))}</small>`:""}${pe(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function He({site:a,t:e,L:n,market:o}){let r=a.contact;return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${t(a.name)}</p><p class="muted">${t(n(a.tagline))}</p></div>
    <div><p class="foot-h">${t(e.footer.contact)}</p><ul>
      ${r.phone?`<li>${t(e.footer.hotline)}: <a href="tel:${C(r.phone)}">${t(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${t(r.email)}">${t(r.email)}</a></li>`:""}
      <li>${t(n(r.address))}</li></ul></div>
    ${a.social?`<div><p class="foot-h">${t(e.footer.follow)}</p><ul>${Object.entries(a.social).filter(([,s])=>s).map(([s,i])=>`<li><a href="${t(i)}" target="_blank" rel="noopener">${t(s==="tiktok"?"TikTok":s==="youtube"?"YouTube":s[0].toUpperCase()+s.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${t(a.name)} \xB7 ${t(e.footer.trademark)}</span>${ue(a,e,o.lang)}</div>
</footer>`}function Ie({site:a,market:e,L:n,abs:o}){var s;let r=(s=a.branches)!=null?s:[];return{"@context":"https://schema.org","@type":"ElectronicsStore",name:a.name,url:o(`${e.id}/`),description:n(a.intro),telephone:a.contact.phone,email:a.contact.email,address:{"@type":"PostalAddress",streetAddress:n(a.contact.address)},currenciesAccepted:e.currency,openingHoursSpecification:ne(a.hours),...r.length>1?{department:r.map(i=>({"@type":"ElectronicsStore",name:n(i.name),telephone:i.phone,address:{"@type":"PostalAddress",streetAddress:n(i.address)}}))}:{}}}var Ue=({site:a,L:e})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.map(n=>({"@type":"Question",name:e(n.q),acceptedAnswer:{"@type":"Answer",text:e(n.a)}}))});function We({site:a,market:e,L:n,abs:o,productPath:r},s){var c;let i=s.stock==="soon"?"https://schema.org/PreOrder":"https://schema.org/InStock";return{"@context":"https://schema.org","@type":"Product",name:s.name,description:n(s.summary),brand:{"@type":"Brand",name:s.brand},...(c=s.colors)!=null&&c.length?{color:s.colors.map(l=>n(l.name)).join(", ")}:{},url:o(r(s,e)),offers:s.variants.map(l=>({"@type":"Offer",name:`${s.name} ${l.size}`,price:l.price,priceCurrency:e.currency,availability:i,itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:a.name}}))}}function _e({catalog:a,market:e,L:n,abs:o,productPath:r},s){let i=a.categories.find(c=>c.id===s.category);return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:o(`${e.id}/`)},{"@type":"ListItem",position:2,name:n(i==null?void 0:i.name),item:o(`${e.id}/?type=${s.category}`)},{"@type":"ListItem",position:3,name:s.name,item:o(r(s,e))}]}}export{st as renderSite};
