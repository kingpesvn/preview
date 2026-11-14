var Z={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},n=(e="")=>String(e).replace(/[&<>"']/g,a=>Z[a]);function j(e,a,t="vi"){var r,o,i;return e==null?"":typeof e!="object"?String(e):(i=(o=(r=e[a])!=null?r:e[t])!=null?o:Object.values(e)[0])!=null?i:""}var Y={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},C=e=>{var a;return(a=Y[e])!=null?a:"en-US"};function X(e,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(e)-.01);let t=Number(a)||1;return Math.max(t,Math.round(e/t)*t)}function R(e,a){var r,o;if(a.default)return e.basePrice;let t=(o=(r=e.prices)==null?void 0:r[a.id])!=null?o:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:X(e.basePrice*a.rate,a.rounding)}var Q=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function E(e,a){let t={style:"currency",currency:a.currency};return Q.has(a.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(C(a.lang),t).format(e)}function L(e="/"){let a=e.endsWith("/")?e:`${e}/`;return(t="")=>a+String(t).replace(/^\//,"")}var T=(e="")=>e.startsWith("uploads/")?e:/^([a-z]+:|\/)/i.test(e)?null:`assets/${e}`,$=(e,a)=>{let t=T(a);return t==null?a:e(t)},b=(e="")=>String(e).replace(/\D/g,"");function D(e,a,t=""){switch(e){case"phone":return`tel:${b(a.phone)}`;case"zalo":return`https://zalo.me/${b(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${b(a.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var V=e=>`<script type="application/ld+json">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`;var ee={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},p=(e,a=20,t="")=>{var r;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(r=ee[e])!=null?r:""}</svg>`},z=[1,2,3,4,5,6,0],te=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function q(e,a){let t=e.map(o=>z.indexOf(o)).sort((o,i)=>o-i);return t.every((o,i)=>i===0||o===t[i-1]+1)&&t.length>2?`${a[z[t[0]]]} \u2013 ${a[z[t.at(-1)]]}`:t.map(o=>a[z[o]]).join(", ")}var A=e=>e.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(t=>te[t]),opens:a.open,closes:a.close}));function F(e){var t,r;return(r=(t=new Intl.NumberFormat(C(e.lang),{style:"currency",currency:e.currency}).formatToParts(0).find(o=>o.type==="currency"))==null?void 0:t.value)!=null?r:e.currency}var S=e=>e==="phone"||e==="email"?"":'target="_blank" rel="noopener"',G=e=>`<div class="suggest" id="market-suggest" data-suggest="${n(e.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${n(e.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${n(e.market.dismiss)}">\xD7</button>
</div>`,O=(e,a)=>{var t;return`<p class="status" data-open-status data-hours='${n(JSON.stringify(e.hours))}' data-tz="${n((t=e.timezone)!=null?t:"Asia/Ho_Chi_Minh")}" data-open="${n(a.visit.open)}" data-closed="${n(a.visit.closed)}" hidden></p>`},B={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ae=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ne=e=>{var a;try{let t=new URL(String((a=e.googleReview)!=null?a:"").trim());return t.protocol==="https:"&&ae.test(t.hostname)?t.href:""}catch{return""}},H=(e,a,t,r="btn btn--line")=>{var s;let o=ne(e);if(!o)return"";let i=typeof a.reviews=="object"&&((s=a.reviews)==null?void 0:s.google)||B[t]||B.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${n(o)}" target="_blank" rel="noopener">${p("star",16)} ${n(i)}</a></p>`},P={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},I={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},U=e=>{var a;return((a=e.reviews)!=null?a:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function W(e,a){var i,s,c;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=e==null?void 0:e.date)!=null?i:"").trim());if(!t)return"";let r=new Date(Date.UTC(+t[1],+t[2]-1,+((s=t[3])!=null?s:1)));if(Number.isNaN(r.getTime()))return"";let o=new Intl.DateTimeFormat((c=I[a])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${n(e.date)}">${n(o)}</time>`}function oe(e,a){var s,c;let t=e.filter(l=>l.rating>=1&&l.rating<=5);if(t.length<2)return"";let r=t.reduce((l,m)=>l+Number(m.rating),0)/t.length,o=(s=P[a])!=null?s:P.en,i=new Intl.NumberFormat((c=I[a])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${p("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${n(o.count.replace("{n}",String(e.length)))}</span></p>`}function _(e,a,t,r){var s;if(!e.length)return"";let o=(s=P[a])!=null?s:P.en,i=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${n(c==="prev"?o.prev:o.next)}">${p("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${oe(e,a)}<div class="rv" data-rv data-rv-more="${n(o.more)}" data-rv-less="${n(o.less)}">
      <div class="${t} rv-track" tabindex="0">${e.map(r).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${re}`}var re=`<style>
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
upd()}})()<\/script>`;var K=(e,a,t)=>e.badge===!1?"":`<a class="made" href="https://kingpes.net/${n(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${n(a.footer.madeWith)}</a>`;function J({site:e,markets:a,url:t,abs:r}){var s;let o=(s=a.find(c=>c.default))!=null?s:a[0],i=a.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${n(o.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${n(e.name)}</title>
<link rel="canonical" href="${r(`${o.id}/`)}">
${a.map(c=>`<link rel="alternate" hreflang="${n(c.lang)}-${n(c.country)}" href="${r(`${c.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(i)}, root = ${JSON.stringify(t(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(c=>`<a href="${t(`${c.id}/`)}">${n(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var se="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";function ie(e,a){return e.products.map(t=>({...t,variants:t.variants.map(r=>({...r,price:R(r,a)})).filter(r=>r.price!=null)})).filter(t=>t.variants.length>0)}function Ve({site:e,catalog:a,i18n:t,template:r,basePath:o="/",siteUrl:i=e.domain}){let s=L(o),c=h=>new URL(s(h),i).href,l=a.markets,m=l.map(h=>{var k,w,M,u;let g=h.lang,y=(w=(k=t[g])!=null?k:t.en)!=null?w:t.vi,d=N=>j(N,g,"en"),f=(u=(M=e.orderChannels)==null?void 0:M[h.id])!=null?u:["phone"],x={site:e,catalog:a,market:h,markets:l,lang:g,t:y,L:d,url:s,abs:c,channels:f,money:N=>E(N,h),template:r,items:ie(a,h)};return{path:`${h.id}/index.html`,html:ce(x)}});return m.push({path:"index.html",html:J({site:e,markets:l,url:s,abs:c})}),m}function ce(e){var k,w,M;let{site:a,market:t,markets:r,lang:o,t:i,L:s,url:c,abs:l,channels:m}=e,h=`${a.name} \xB7 ${s(a.tagline)}`,g=(k=a.theme)!=null?k:{},y=["primary","ink","bg","surface","soft","accent"].filter(u=>g[u]).map(u=>`--${u}:${g[u]}`).join(";"),d=(w=r.find(u=>u.default))!=null?w:r[0],f=r.map(u=>({id:u.id,lang:u.lang,country:u.country,currency:u.currency,href:c(`${u.id}/`)})),v=m[0],x=a.heroImage?l(T(a.heroImage)):l("assets/photos/hero.webp");return`<!doctype html>
<html lang="${n(o)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${n(h)}</title>
<meta name="description" content="${n(s(a.intro))}">
<link rel="canonical" href="${l(`${t.id}/`)}">
${r.map(u=>`<link rel="alternate" hreflang="${n(u.lang)}-${n(u.country)}" href="${l(`${u.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${l(`${d.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${n(h)}">
<meta property="og:description" content="${n(s(a.intro))}">
<meta property="og:url" content="${l(`${t.id}/`)}">
<meta property="og:image" content="${n(x)}">
<meta property="og:site_name" content="${n(a.name)}">
<meta name="theme-color" content="${n((M=g.primary)!=null?M:"#B42318")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${se}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${y}}</style>
${V(we(e))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${n(t.id)}" data-markets='${n(JSON.stringify(f))}'>
<a class="skip" href="#main">${n(i.skip)}</a>
${G(i)}
${le(e)}
<main id="main">
${pe(e)}
${he(e)}
${ue(e)}
${me(e)}
${fe(e)}
${ve(e)}
${ye(e)}
${be(e)}
${xe(e)}
</main>
${ke(e)}
<nav class="dock" aria-label="${n(i.nav.order)}">
  <a href="#menu">${p("bowl",20)}<span>${n(i.nav.menu)}</span></a>
  <a class="primary" href="${n(D(v,a.contact,i.orderText))}" ${S(v)}>${p(v,20)}<span>${n(i.nav.order)}</span></a>
</nav>
</body>
</html>
`}function le({site:e,market:a,markets:t,t:r,url:o,channels:i}){let s=[["#menu",r.nav.menu],["#story",r.nav.story],["#reserve",r.nav.reserve],["#visit",r.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${o(`${a.id}/`)}">
      ${e.logo?`<img src="${n($(o,e.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${p("bowl",22)}</span>`}
      <span>${n(e.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([c,l])=>`<a href="${c}">${n(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      <details class="market">
        <summary aria-label="${n(r.market.label)}">${p("globe",18)}<span>${n(a.id.toUpperCase())}<span class="cur"> \xB7 ${n(F(a))}</span></span></summary>
        <ul>${t.map(c=>`<li><a href="${o(`${c.id}/`)}" hreflang="${n(c.lang)}"${c.id===a.id?' aria-current="true"':""}>${n(c.country)} \xB7 ${n(c.currency)}</a></li>`).join("")}</ul>
      </details>
      <a class="btn btn--primary hide-sm" href="${n(D(i[0],e.contact,r.orderText))}" ${S(i[0])}>${p(i[0],18)} ${n(r.nav.order)}</a>
      <details class="mnav">
        <summary aria-label="${n(r.nav.openMenu)}">${p("menu",22)}</summary>
        <nav aria-label="Menu">${s.map(([c,l])=>`<a href="${c}">${n(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function pe({site:e,t:a,L:t,url:r,channels:o}){var m;let i=e.hours.map(h=>h.open).sort()[0],s=e.heroImage?n($(r,e.heroImage)):r("assets/photos/hero.webp"),c=encodeURIComponent((m=e.contact.mapQuery)!=null?m:t(e.contact.address)),l=t(e.since);return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${l?`<p class="since">${n(l)}</p>`:""}
      <h1><span class="h1-name">${n(e.name)}</span><span class="h1-tag">${n(t(e.tagline))}</span></h1>
      <p class="lead">${n(t(e.intro))}</p>
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#menu">${p("bowl",18)} ${n(a.hero.menu)}</a>
        <a class="btn btn--line btn--lg" href="#reserve">${p("calendar",18)} ${n(a.hero.reserve)}</a>
      </div>
      <p class="hero-meta">${p("clock",18)} ${n(a.hero.openFrom)} ${n(i)} \xB7 <a href="https://www.google.com/maps/dir/?api=1&amp;destination=${c}" target="_blank" rel="noopener">${p("pin",16)} ${n(t(e.contact.address))}</a></p>
    </div>
    <figure class="hero-img">
      <img src="${s}" alt="${n(t(e.tagline))}" width="1600" height="1000" fetchpriority="high">
      ${l?`<span class="stamp" aria-hidden="true"><span>${n(l)}</span></span>`:""}
    </figure>
  </div>
</section>`}function he({site:e,L:a}){var t;return(t=e.highlights)!=null&&t.length?`<section class="promise" aria-label="${n(e.name)}">
  <ul class="wrap promise-list">${e.highlights.map(r=>`<li>${p("check",18)} ${n(a(r))}</li>`).join("")}</ul>
</section>`:""}var de=(e,a,t)=>e.variants.map(r=>r.size?`${t(r.size)} ${a(r.price)}`:a(r.price)).join(" \xB7 ");function ue({items:e,t:a,L:t,url:r,money:o}){let i=e.filter(s=>s.featured&&s.image).slice(0,4);return i.length?`<section class="section" aria-labelledby="sig-title">
  <div class="wrap">
    <h2 id="sig-title" class="h2">${n(a.signature)}</h2>
    <div class="sig">
      ${i.map(s=>`<article class="sig-card">
        <div class="sig-img"><img sizes="auto, (max-width: 640px) 50vw, 280px" src="${n($(r,s.image))}" alt="${n(t(s.name))}" width="800" height="800" loading="lazy">${s.tag?`<span class="tag">${n(t(s.tag))}</span>`:""}</div>
        <div class="sig-body">
          <h3>${n(t(s.name))}</h3>
          ${s.description?`<p class="muted">${n(t(s.description))}</p>`:""}
          <p class="sig-price">${n(de(s,o,t))}</p>
        </div>
      </article>`).join("")}
    </div>
  </div>
</section>`:""}function me(e){let{items:a,catalog:t,t:r,L:o,url:i,money:s}=e,c=t.categories.filter(m=>a.some(h=>h.category===m.id)),l=m=>[...new Set(m.flatMap(h=>h.variants.map(g=>o(g.size)).filter(Boolean)))];return`<section class="section section--soft" id="menu" aria-labelledby="menu-title">
  <div class="wrap">
    <div class="paper">
      <h2 id="menu-title" class="paper-title"><span>${n(r.menu.title)}</span></h2>
      <div class="paper-grid">
        ${c.map(m=>{let h=a.filter(d=>d.category===m.id),g=l(h),y=g.length>0&&h.every(d=>d.variants.every(f=>f.size));return`<div class="paper-cat">
          <h3><span>${n(o(m.name))}</span>${y?`<span class="cols" aria-hidden="true">${g.map(d=>`<span>${n(d)}</span>`).join("")}</span>`:""}</h3>
          <ul>${h.map(d=>`<li class="row">
            ${d.image&&!d.featured?`<img sizes="auto, 120px" class="row-img" src="${n($(i,d.image))}" alt="" width="64" height="64" loading="lazy">`:""}
            <div class="row-name"><span>${n(o(d.name))}</span>${d.tag?`<em class="pill">${n(o(d.tag))}</em>`:""}${d.description&&!d.featured?`<small>${n(o(d.description))}</small>`:""}</div>
            <span class="dots" aria-hidden="true"></span>
            <span class="cols">${y?g.map(f=>{let v=d.variants.find(x=>o(x.size)===f);return`<span>${v?`<span class="sr">${n(r.menu.size)} ${n(f)}: </span>${n(s(v.price))}`:"\u2013"}</span>`}).join(""):`<span class="one">${n(s(d.variants[0].price))}</span>`}</span>
          </li>`).join("")}</ul>
        </div>`}).join("")}
      </div>
      <p class="paper-note">${n(r.menu.note)}</p>
    </div>
    ${ge(e)}
  </div>
</section>`}function ge({site:e,market:a,t}){var o,i;let r=Array.isArray(e.delivery)?e.delivery:(i=(o=e.delivery)==null?void 0:o[a.id])!=null?i:[];return r.length?`<div class="delivery">
  <span>${p("bike",20)} ${n(t.delivery)}</span>
  ${r.map(s=>`<a class="btn btn--line" href="${n(s.url)}" target="_blank" rel="noopener">${n(s.name)} ${p("arrow",16)}</a>`).join("")}
</div>`:""}function fe({site:e,t:a,L:t,url:r}){var s,c;let o=e.story;if(!o)return"";let i=((s=e.gallery)!=null?s:[]).slice(0,3);return`<section class="section" id="story" aria-labelledby="story-title">
  <div class="wrap story">
    <figure class="story-img"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${r("assets/photos/story.webp")}" alt="" width="900" height="1100" loading="lazy"></figure>
    <div class="story-copy">
      <p class="kicker">${n(a.story.title)}</p>
      <h2 id="story-title" class="h2">${n(t(o.title))}</h2>
      ${o.body?`<p class="lead">${n(t(o.body))}</p>`:""}
      ${(c=o.timeline)!=null&&c.length?`<ol class="timeline">${o.timeline.map(l=>`<li><span class="year">${n(t(l.year))}</span><span>${n(t(l.text))}</span></li>`).join("")}</ol>`:""}
      ${o.signature?`<p class="sign">\u2014 ${n(t(o.signature))}</p>`:""}
    </div>
  </div>
  ${i.length?`<div class="wrap pics">${i.map(l=>`<figure><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${n($(r,l.image))}" alt="${n(t(l.caption))}" width="1000" height="750" loading="lazy">${l.caption?`<figcaption>${n(t(l.caption))}</figcaption>`:""}</figure>`).join("")}</div>`:""}
</section>`}function ve({site:e,t:a,L:t,url:r}){var i;let o=e.broth;return o?`<section class="section broth" aria-labelledby="broth-title">
  <div class="wrap broth-grid">
    <div class="broth-copy">
      <p class="kicker">${n(a.broth.title)}</p>
      <h2 id="broth-title" class="h2">${n(t(o.title))}</h2>
      ${o.body?`<p class="lead">${n(t(o.body))}</p>`:""}
      ${(i=o.facts)!=null&&i.length?`<dl class="facts">${o.facts.map(s=>`<div><dt>${n(t(s.value))}</dt><dd>${n(t(s.label))}</dd></div>`).join("")}</dl>`:""}
    </div>
    <figure class="broth-img"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${r("assets/photos/herbs.webp")}" alt="" width="1100" height="800" loading="lazy"></figure>
  </div>
</section>`:""}function ye({site:e,t:a,L:t,channels:r}){let o=e.reserve;return o?`<section class="section" id="reserve" aria-labelledby="reserve-title">
  <div class="wrap">
    <div class="ticket">
      <div>
        <h2 id="reserve-title" class="h2">${n(t(o.title))}</h2>
        ${o.body?`<p class="lead">${n(t(o.body))}</p>`:""}
        <p class="muted">${n(a.reserve.note)}</p>
      </div>
      <div class="ticket-actions">
        ${e.contact.phone?`<a class="btn btn--primary btn--lg" href="tel:${b(e.contact.phone)}">${p("phone",20)} ${n(a.reserve.call)} \xB7 ${n(e.contact.phone)}</a>`:""}
        ${r.filter(i=>i!=="phone").map(i=>`<a class="btn btn--line btn--lg" href="${n(D(i,e.contact,a.orderText))}" ${S(i)}>${p(i,20)} ${n(a.via[i])}</a>`).join("")}
      </div>
    </div>
  </div>
</section>`:""}function be({site:e,t:a,L:t,lang:r}){let o=H(e,a,r,"btn btn--line"),i=U(e);return e.showReviews===!1||!i.length&&!o?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${n(a.reviews.title)}</h2>
    ${_(i,r,"reviews",s=>`<figure class="review">
      <p class="stars" aria-label="${n(s.rating)}/5">${Array.from({length:5},(c,l)=>`<span class="${l<s.rating?"on":""}">${p("star",16)}</span>`).join("")}</p>
      <blockquote>${n(t(s.text))}</blockquote>
      <figcaption>${n(s.name)}${W(s,r)}</figcaption>
    </figure>`)}${o}
  </div>
</section>`}function $e(e,a){let t=new Map;for(let r of e){let o=[...r.days].sort().join(",");t.has(o)||t.set(o,{days:r.days,slots:[]}),t.get(o).slots.push(`${r.open} \u2013 ${r.close}`)}return[...t.values()].map(r=>{var o;return{label:r.days.length===7?(o=a.visit.everyDay)!=null?o:a.days.join(", "):q(r.days,a.days),slots:r.slots.join(", ")}})}function xe({site:e,t:a,L:t,channels:r}){var i;let o=encodeURIComponent((i=e.contact.mapQuery)!=null?i:t(e.contact.address));return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${n(a.visit.title)}</h2>
      ${O(e,a)}
      <h3 class="h4">${p("clock",18)} ${n(a.visit.hours)}</h3>
      <table class="hours"><tbody>${$e(e.hours,a).map(s=>`<tr><th scope="row">${n(s.label)}</th><td>${n(s.slots)}</td></tr>`).join("")}</tbody></table>
      <h3 class="h4">${p("pin",18)} ${n(a.visit.address)}</h3>
      <p>${n(t(e.contact.address))}</p>
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${o}" target="_blank" rel="noopener">${n(a.visit.directions)} ${p("arrow",16)}</a>
        ${r.map(s=>`<a class="btn btn--ghost" href="${n(D(s,e.contact,a.orderText))}" ${S(s)}>${p(s,18)} ${n(a.via[s])}</a>`).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${n(a.visit.address)}" src="https://www.google.com/maps?q=${o}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function ke({site:e,t:a,L:t,market:r}){let o=e.contact;return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${n(e.name)}</p><p class="muted">${n(t(e.tagline))}</p></div>
    <div><p class="foot-h">${n(a.footer.contact)}</p><ul>
      ${o.phone?`<li><a href="tel:${b(o.phone)}">${n(o.phone)}</a></li>`:""}
      ${o.email?`<li><a href="mailto:${n(o.email)}">${n(o.email)}</a></li>`:""}
      <li>${n(t(o.address))}</li></ul></div>
    ${e.social?`<div><p class="foot-h">${n(a.footer.follow)}</p><ul>${Object.entries(e.social).filter(([,i])=>i).map(([i,s])=>`<li><a href="${n(s)}" target="_blank" rel="noopener">${n(i[0].toUpperCase()+i.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${e.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${n(e.name)}</span>${K(e,a,r.lang)}</div>
</footer>`}function we({site:e,market:a,L:t,abs:r,items:o,catalog:i}){return{"@context":"https://schema.org","@type":"Restaurant",name:e.name,url:r(`${a.id}/`),image:r("assets/photos/hero.webp"),description:t(e.intro),telephone:e.contact.phone,email:e.contact.email,servesCuisine:"Vietnamese",acceptsReservations:!0,address:{"@type":"PostalAddress",streetAddress:t(e.contact.address)},currenciesAccepted:a.currency,openingHoursSpecification:A(e.hours),hasMenu:{"@type":"Menu",hasMenuSection:i.categories.filter(s=>o.some(c=>c.category===s.id)).map(s=>({"@type":"MenuSection",name:t(s.name),hasMenuItem:o.filter(c=>c.category===s.id).map(c=>({"@type":"MenuItem",name:t(c.name),...c.description?{description:t(c.description)}:{},offers:c.variants.map(l=>({"@type":"Offer",...l.size?{name:t(l.size)}:{},price:l.price,priceCurrency:a.currency}))}))}))}}}export{Ve as renderSite};
