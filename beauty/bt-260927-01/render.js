var Y={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t=(e="")=>String(e).replace(/[&<>"']/g,a=>Y[a]);function P(e,a,n="vi"){var o,i,s;return e==null?"":typeof e!="object"?String(e):(s=(i=(o=e[a])!=null?o:e[n])!=null?i:Object.values(e)[0])!=null?s:""}var X={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},C=e=>{var a;return(a=X[e])!=null?a:"en-US"};function Q(e,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(e)-.01);let n=Number(a)||1;return Math.max(n,Math.round(e/n)*n)}function R(e,a){var o,i;if(a.default)return e.basePrice;let n=(i=(o=e.prices)==null?void 0:o[a.id])!=null?i:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:Q(e.basePrice*a.rate,a.rounding)}var ee=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function E(e,a){let n={style:"currency",currency:a.currency};return ee.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(C(a.lang),n).format(e)}function q(e="/"){let a=e.endsWith("/")?e:`${e}/`;return(n="")=>a+String(n).replace(/^\//,"")}var j=(e="")=>e.startsWith("uploads/")?e:/^([a-z]+:|\/)/i.test(e)?null:`assets/${e}`,M=(e,a)=>{let n=j(a);return n==null?a:e(n)},$=(e="")=>String(e).replace(/\D/g,"");function D(e,a,n=""){switch(e){case"phone":return`tel:${$(a.phone)}`;case"zalo":return`https://zalo.me/${$(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${$(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var V=e=>`<script type="application/ld+json">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`;var te={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},h=(e,a=20,n="")=>{var o;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=te[e])!=null?o:""}</svg>`},S=[1,2,3,4,5,6,0],ae=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function A(e,a){let n=e.map(i=>S.indexOf(i)).sort((i,s)=>i-s);return n.every((i,s)=>s===0||i===n[s-1]+1)&&n.length>2?`${a[S[n[0]]]} \u2013 ${a[S[n.at(-1)]]}`:n.map(i=>a[S[i]]).join(", ")}var F=e=>e.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>ae[n]),opens:a.open,closes:a.close}));function O(e){var n,o;return(o=(n=new Intl.NumberFormat(C(e.lang),{style:"currency",currency:e.currency}).formatToParts(0).find(i=>i.type==="currency"))==null?void 0:n.value)!=null?o:e.currency}var T=e=>e==="phone"||e==="email"?"":'target="_blank" rel="noopener"',G=e=>`<div class="suggest" id="market-suggest" data-suggest="${t(e.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${t(e.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${t(e.market.dismiss)}">\xD7</button>
</div>`,H=(e,a)=>{var n;return`<p class="status" data-open-status data-hours='${t(JSON.stringify(e.hours))}' data-tz="${t((n=e.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${t(a.visit.open)}" data-closed="${t(a.visit.closed)}" hidden></p>`},B={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ne=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,oe=e=>{var a;try{let n=new URL(String((a=e.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&ne.test(n.hostname)?n.href:""}catch{return""}},I=(e,a,n,o="btn btn--line")=>{var r;let i=oe(e);if(!i)return"";let s=typeof a.reviews=="object"&&((r=a.reviews)==null?void 0:r.google)||B[n]||B.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${t(i)}" target="_blank" rel="noopener">${h("star",16)} ${t(s)}</a></p>`},z={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},U={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},W=e=>{var a;return((a=e.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function _(e,a){var s,r,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=e==null?void 0:e.date)!=null?s:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((r=n[3])!=null?r:1)));if(Number.isNaN(o.getTime()))return"";let i=new Intl.DateTimeFormat((c=U[a])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${t(e.date)}">${t(i)}</time>`}function re(e,a){var r,c;let n=e.filter(l=>l.rating>=1&&l.rating<=5);if(n.length<2)return"";let o=n.reduce((l,g)=>l+Number(g.rating),0)/n.length,i=(r=z[a])!=null?r:z.en,s=new Intl.NumberFormat((c=U[a])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${h("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${t(i.count.replace("{n}",String(e.length)))}</span></p>`}function K(e,a,n,o){var r;if(!e.length)return"";let i=(r=z[a])!=null?r:z.en,s=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${t(c==="prev"?i.prev:i.next)}">${h("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${re(e,a)}<div class="rv" data-rv data-rv-more="${t(i.more)}" data-rv-less="${t(i.less)}">
      <div class="${n} rv-track" tabindex="0">${e.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${ie}`}var ie=`<style>
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
upd()}})()<\/script>`;var J=(e,a,n)=>e.badge===!1?"":`<a class="made" href="https://kingpes.net/${t(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${t(a.footer.madeWith)}</a>`;function Z({site:e,markets:a,url:n,abs:o}){var r;let i=(r=a.find(c=>c.default))!=null?r:a[0],s=a.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${t(i.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(e.name)}</title>
<link rel="canonical" href="${o(`${i.id}/`)}">
${a.map(c=>`<link rel="alternate" hreflang="${t(c.lang)}-${t(c.country)}" href="${o(`${c.id}/`)}">`).join(`
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
<body><p>${a.map(c=>`<a href="${n(`${c.id}/`)}">${t(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var se="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";function ce(e,a){return e.products.map(n=>({...n,variants:n.variants.map(o=>({...o,price:R(o,a)})).filter(o=>o.price!=null)})).filter(n=>n.variants.length>0)}function Le({site:e,catalog:a,i18n:n,template:o,basePath:i="/",siteUrl:s=e.domain}){let r=q(i),c=u=>new URL(r(u),s).href,l=a.markets,g=l.map(u=>{var m,p,w,L;let v=u.lang,x=(p=(m=n[v])!=null?m:n.en)!=null?p:n.vi,k=N=>P(N,v,"en"),f=ce(a,u),b=(L=(w=e.bookingChannels)==null?void 0:w[u.id])!=null?L:["phone"],d={site:e,catalog:a,market:u,markets:l,lang:v,t:x,L:k,url:r,abs:c,services:f,channels:b,money:N=>E(N,u),template:o};return{path:`${u.id}/index.html`,html:le(d)}});return g.push({path:"index.html",html:Z({site:e,markets:l,url:r,abs:c})}),g}function le(e){var f,b,y,d,m;let{site:a,market:n,markets:o,lang:i,t:s,L:r,url:c,abs:l}=e,g=`${a.name} \xB7 ${r(a.tagline)}`,u=(f=a.theme)!=null?f:{},v=["primary","ink","bg","surface","soft","accent"].filter(p=>u[p]).map(p=>`--${p}:${u[p]}`).join(";"),x=(b=o.find(p=>p.default))!=null?b:o[0],k=o.map(p=>({id:p.id,lang:p.lang,country:p.country,currency:p.currency,href:c(`${p.id}/`)}));return`<!doctype html>
<html lang="${t(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t(g)}</title>
<meta name="description" content="${t(r(a.intro))}">
<link rel="canonical" href="${l(`${n.id}/`)}">
${o.map(p=>`<link rel="alternate" hreflang="${t(p.lang)}-${t(p.country)}" href="${l(`${p.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${l(`${x.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${t(g)}">
<meta property="og:description" content="${t(r(a.intro))}">
<meta property="og:url" content="${l(`${n.id}/`)}">
<meta property="og:site_name" content="${t(a.name)}">
<meta property="og:image" content="${t(l((d=j((y=a.heroImage)!=null?y:"photos/hero.webp"))!=null?d:a.heroImage))}">
<meta name="theme-color" content="${t((m=u.bg)!=null?m:"#F2F4EF")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${se}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${v}}</style>
${V($e(e))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${t(n.id)}" data-markets='${t(JSON.stringify(k))}'>
<a class="skip" href="#main">${t(s.skip)}</a>
${G(s)}
${pe(e)}
<main id="main">
${de(e)}
${he(e)}
${ue(e)}
${me(e)}
${ge(e)}
${fe(e)}
${ve(e)}
${be(e)}
</main>
${ye(e)}
<nav class="bookbar" aria-label="${t(s.nav.book)}">
  <a class="primary" href="#booking">${h("calendar",20)}<span>${t(s.nav.book)}</span></a>
  <a href="${t(D(e.channels[0],a.contact))}" ${T(e.channels[0])}>${h(e.channels[0],20)}<span>${t(s.via[e.channels[0]])}</span></a>
</nav>
</body>
</html>
`}function pe({site:e,market:a,markets:n,t:o,url:i}){let s=[["#services",o.nav.services],["#prices",o.nav.prices],["#team",o.nav.team]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${i(`${a.id}/`)}">
      ${e.logo?`<img src="${t(M(i,e.logo))}" alt="" width="36" height="36">`:`<span class="brand-mark" aria-hidden="true">${h("leaf",22)}</span>`}
      <span>${t(e.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([r,c])=>`<a href="${r}">${t(c)}</a>`).join("")}</nav>
    <div class="bar-end">
      <details class="market">
        <summary aria-label="${t(o.market.label)}">${h("globe",18)}<span>${t(a.id.toUpperCase())}<span class="cur"> \xB7 ${t(O(a))}</span></span></summary>
        <ul>${n.map(r=>`<li><a href="${i(`${r.id}/`)}" hreflang="${t(r.lang)}"${r.id===a.id?' aria-current="true"':""}>${t(r.country)} \xB7 ${t(r.currency)}</a></li>`).join("")}</ul>
      </details>
      <a class="btn btn--primary hide-sm" href="#booking">${t(o.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${t(o.nav.openMenu)}">${h("menu",22)}</summary>
        <nav aria-label="Menu">${s.map(([r,c])=>`<a href="${r}">${t(c)}</a>`).join("")}<a href="#booking">${t(o.nav.book)}</a></nav>
      </details>
    </div>
  </div>
</header>`}function de({site:e,t:a,L:n,url:o}){let i=e.hours[0],s=e.heroImage?t(M(o,e.heroImage)):o("assets/photos/hero.webp");return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${t(n(e.place))}</p>
      <h1>${t(n(e.tagline))}</h1>
      <p class="lead">${t(n(e.intro))}</p>
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#booking">${h("calendar",18)} ${t(a.hero.book)}</a>
        <a class="btn btn--ghost btn--lg" href="#prices">${t(a.hero.prices)}</a>
      </div>
      <ul class="facts">
        <li>${h("clock",18)} ${t(a.hero.openDaily)} ${t(i.open)} \u2013 ${t(i.close)}</li>
        <li>${h("pin",18)} ${t(n(e.contact.address))}</li>
      </ul>
    </div>
    <div class="hero-art">
      <div class="arch arch--hero"><img src="${s}" alt="${t(e.name)}" width="880" height="1120" fetchpriority="high"></div>
      <span class="seal" aria-hidden="true">${h("leaf",26)}</span>
    </div>
  </div>
</section>`}function he({services:e,t:a,L:n,url:o,money:i}){let s=e.filter(r=>r.featured).slice(0,4);return s.length?`<section class="section" id="services" aria-labelledby="sig-title">
  <div class="wrap">
    <div class="head center">
      <span class="rule" aria-hidden="true"></span>
      <h2 id="sig-title" class="h2">${t(a.signature.title)}</h2>
    </div>
    <div class="sig">
      ${s.map(r=>{let c=Math.min(...r.variants.map(l=>l.price));return`<article class="sig-card">
        <div class="arch arch--card">${r.image?`<img sizes="auto, (max-width: 640px) 50vw, 280px" src="${t(M(o,r.image))}" alt="" width="780" height="900" loading="lazy">`:""}${r.badge?`<span class="ribbon">${t(n(r.badge))}</span>`:""}</div>
        <h3>${t(n(r.name))}</h3>
        <p class="muted">${t(n(r.description))}</p>
        <p class="sig-foot"><span class="durations">${r.variants.map(l=>`${l.minutes}\u2032`).join(" \xB7 ")}</span><span class="from">${t(a.signature.from).replace("{price}",`<strong>${t(i(c))}</strong>`)}</span></p>
      </article>`}).join("")}
    </div>
  </div>
</section>`:""}function ue({services:e,catalog:a,t:n,L:o,money:i}){let s=a.categories.filter(r=>e.some(c=>c.category===r.id));return`<section class="section section--soft" id="prices" aria-labelledby="price-title">
  <div class="wrap">
    <div class="head center">
      <span class="rule" aria-hidden="true"></span>
      <h2 id="price-title" class="h2">${t(n.prices.title)}</h2>
      <p class="muted">${t(n.prices.note)}</p>
    </div>
    <div class="menu">
      ${s.map(r=>`<div class="menu-cat">
        <h3>${t(o(r.name))}</h3>
        <ul>${e.filter(c=>c.category===r.id).map(c=>`<li class="item">
          <div class="item-head"><span class="item-name">${t(o(c.name))}</span>${c.badge?`<span class="pill">${t(o(c.badge))}</span>`:""}</div>
          <p class="item-desc muted">${t(o(c.description))}</p>
          <dl class="rates">${c.variants.map(l=>`<div><dt>${l.minutes} ${t(n.prices.min)}</dt><dd>${t(i(l.price))}</dd></div>`).join("")}</dl>
        </li>`).join("")}</ul>
      </div>`).join("")}
    </div>
  </div>
</section>`}function me({site:e,t:a,L:n}){var o;return(o=e.benefits)!=null&&o.length?`<section class="section" aria-labelledby="ben-title">
  <div class="wrap">
    <h2 id="ben-title" class="h2 center">${t(a.benefits)}</h2>
    <div class="benefits">${e.benefits.map(i=>{var s;return`<div class="benefit">
      <span class="benefit-i">${h((s=i.icon)!=null?s:"leaf",26)}</span>
      <h3>${t(n(i.title))}</h3>
      <p class="muted">${t(n(i.text))}</p>
    </div>`}).join("")}</div>
  </div>
</section>`:""}function ge({site:e,t:a,L:n}){var i;if(!((i=e.team)!=null&&i.length))return"";let o=s=>s.split(/\s+/).map(r=>r[0]).slice(-2).join("").toUpperCase();return`<section class="section section--soft" id="team" aria-labelledby="team-title">
  <div class="wrap">
    <h2 id="team-title" class="h2 center">${t(a.team.title)}</h2>
    <div class="team">${e.team.map((s,r)=>`<figure class="member">
      <div class="arch arch--portrait tone-${r%3}">${s.photo?`<img sizes="auto, (max-width: 640px) 50vw, 280px" src="${t(s.photo)}" alt="${t(s.name)}" loading="lazy">`:`<span class="initials" aria-hidden="true">${t(o(s.name))}</span>`}</div>
      <figcaption><strong>${t(s.name)}</strong><span>${t(n(s.role))}</span><span class="muted">${t(a.team.years.replace("{n}",s.years))}</span></figcaption>
    </figure>`).join("")}</div>
  </div>
</section>`}function fe({site:e,t:a,L:n,lang:o}){let i=I(e,a,o,"btn btn--ghost"),s=W(e);return e.showReviews===!1||!s.length&&!i?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2 center">${t(a.reviews)}</h2>
    ${K(s,o,"quotes",r=>`<figure class="quote">
      <div class="stars" aria-label="${r.rating}/5">${Array.from({length:5},(c,l)=>`<span class="${l<r.rating?"on":""}">${h("star",16)}</span>`).join("")}</div>
      <blockquote>\u201C${t(n(r.text))}\u201D</blockquote>
      <figcaption>\u2014 ${t(r.name)}${_(r,o)}</figcaption>
    </figure>`)}${i}
  </div>
</section>`}function ve({site:e,t:a,L:n,services:o,channels:i,money:s,market:r,catalog:c}){var b,y;let l=a.booking,g=[],[u,v]=e.hours[0].open.split(":").map(Number),[x]=e.hours[0].close.split(":").map(Number);for(let d=u*60+v;d<=(x-1)*60;d+=30)g.push(`${String(Math.floor(d/60)).padStart(2,"0")}:${String(d%60).padStart(2,"0")}`);let k=c.categories.filter(d=>o.some(m=>m.category===d.id)),f=i[0];return`<section class="section section--deep" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="booking-copy">
      <h2 id="book-title" class="h2">${t(l.title)}</h2>
      <p>${t(l.text)}</p>
      <p class="or">${t(l.or)}</p>
      <div class="actions">${i.map(d=>`<a class="btn btn--light" href="${t(D(d,e.contact))}" ${T(d)}>${h(d,18)} ${t(a.via[d])}</a>`).join("")}</div>
    </div>
    <form class="form" id="booking-form" data-channel="${t(f)}" data-href="${t(D(f,e.contact))}" data-message="${t(l.message)}" data-copied="${t(l.copied)}" data-email="${t((b=e.contact.email)!=null?b:"")}" data-wa="${t($((y=e.contact.whatsapp)!=null?y:""))}">
      <div class="row">
        <label>${t(l.name)}<input name="name" autocomplete="name" required></label>
        <label>${t(l.phone)}<input name="phone" type="tel" autocomplete="tel" required></label>
      </div>
      <label>${t(l.service)}<select name="service" required>
        ${k.map(d=>`<optgroup label="${t(n(d.name))}">${o.filter(m=>m.category===d.id).flatMap(m=>m.variants.map(p=>{let w=`${n(m.name)} \xB7 ${p.minutes} ${a.prices.min} \xB7 ${s(p.price)}`;return`<option value="${t(w)}">${t(w)}</option>`})).join("")}</optgroup>`).join("")}
      </select></label>
      <div class="row">
        <label>${t(l.date)}<input name="date" type="date" required></label>
        <label>${t(l.time)}<select name="time" required>${g.map(d=>`<option>${d}</option>`).join("")}</select></label>
      </div>
      <label>${t(l.note)}<textarea name="note" rows="2"></textarea></label>
      <button class="btn btn--accent btn--lg" type="submit">${h(f,18)} ${t(l.submit)}</button>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function be({site:e,t:a,L:n}){var s;let o=encodeURIComponent((s=e.contact.mapQuery)!=null?s:n(e.contact.address)),i=r=>r.length===7?a.everyDay:A(r,a.days);return`<section class="section" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${t(a.visit.title)}</h2>
      ${H(e,a)}
      <h3 class="h4">${h("clock",18)} ${t(a.visit.hours)}</h3>
      <table class="hours"><tbody>${e.hours.map(r=>`<tr><th scope="row">${t(i(r.days))}</th><td>${t(r.open)} \u2013 ${t(r.close)}</td></tr>`).join("")}</tbody></table>
      <h3 class="h4">${h("pin",18)} ${t(a.visit.address)}</h3>
      <p>${t(n(e.contact.address))}</p>
      <a class="btn btn--ghost" href="https://www.google.com/maps/dir/?api=1&amp;destination=${o}" target="_blank" rel="noopener">${t(a.visit.directions)} ${h("arrow",16)}</a>
    </div>
    <div class="map arch arch--map"><iframe title="${t(a.visit.address)}" src="https://www.google.com/maps?q=${o}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function ye({site:e,t:a,L:n,market:o}){let i=e.contact;return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${t(e.name)}</p><p class="muted">${t(n(e.tagline))}</p></div>
    <div><p class="foot-h">${t(a.footer.contact)}</p><ul>
      ${i.phone?`<li><a href="tel:${$(i.phone)}">${t(i.phone)}</a></li>`:""}
      ${i.email?`<li><a href="mailto:${t(i.email)}">${t(i.email)}</a></li>`:""}
      <li>${t(n(i.address))}</li></ul></div>
    ${e.social?`<div><p class="foot-h">${t(a.footer.follow)}</p><ul>${Object.entries(e.social).filter(([,s])=>s).map(([s,r])=>`<li><a href="${t(r)}" target="_blank" rel="noopener">${t(s[0].toUpperCase()+s.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${e.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${t(e.name)}</span>${J(e,a,o.lang)}</div>
</footer>`}function $e({site:e,market:a,L:n,abs:o,services:i,catalog:s}){return{"@context":"https://schema.org","@type":"DaySpa",name:e.name,url:o(`${a.id}/`),description:n(e.intro),telephone:e.contact.phone,email:e.contact.email,address:{"@type":"PostalAddress",streetAddress:n(e.contact.address)},currenciesAccepted:a.currency,openingHoursSpecification:F(e.hours),hasOfferCatalog:{"@type":"OfferCatalog",name:e.name,itemListElement:s.categories.filter(r=>i.some(c=>c.category===r.id)).map(r=>({"@type":"OfferCatalog",name:n(r.name),itemListElement:i.filter(c=>c.category===r.id).flatMap(c=>c.variants.map(l=>({"@type":"Offer",name:`${n(c.name)} (${l.minutes}\u2032)`,price:l.price,priceCurrency:a.currency,itemOffered:{"@type":"Service",name:n(c.name),description:n(c.description)}})))}))}}}export{Le as renderSite};
