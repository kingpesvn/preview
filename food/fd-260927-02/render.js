var X={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},n=(e="")=>String(e).replace(/[&<>"']/g,t=>X[t]);function N(e,t,a="vi"){var o,r,c;return e==null?"":typeof e!="object"?String(e):(c=(r=(o=e[t])!=null?o:e[a])!=null?r:Object.values(e)[0])!=null?c:""}var Q={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},C=e=>{var t;return(t=Q[e])!=null?t:"en-US"};function ee(e,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(e)-.01);let a=Number(t)||1;return Math.max(a,Math.round(e/a)*a)}function L(e,t){var o,r;if(t.default)return e.basePrice;let a=(r=(o=e.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:ee(e.basePrice*t.rate,t.rounding)}var te=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function E(e,t){let a={style:"currency",currency:t.currency};return te.has(t.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(C(t.lang),a).format(e)}function B(e="/"){let t=e.endsWith("/")?e:`${e}/`;return(a="")=>t+String(a).replace(/^\//,"")}var ae=(e="")=>e.startsWith("uploads/")?e:/^([a-z]+:|\/)/i.test(e)?null:`assets/${e}`,$=(e,t)=>{let a=ae(t);return a==null?t:e(a)},x=(e="")=>String(e).replace(/\D/g,"");function k(e,t,a=""){switch(e){case"phone":return`tel:${x(t.phone)}`;case"zalo":return`https://zalo.me/${x(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${x(t.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var V=e=>`<script type="application/ld+json">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`;var ne={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(e,t=20,a="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(o=ne[e])!=null?o:""}</svg>`},S=[1,2,3,4,5,6,0],oe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function A(e,t){let a=e.map(r=>S.indexOf(r)).sort((r,c)=>r-c);return a.every((r,c)=>c===0||r===a[c-1]+1)&&a.length>2?`${t[S[a[0]]]} \u2013 ${t[S[a.at(-1)]]}`:a.map(r=>t[S[r]]).join(", ")}var F=e=>e.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(a=>oe[a]),opens:t.open,closes:t.close}));function G(e){var a,o;return(o=(a=new Intl.NumberFormat(C(e.lang),{style:"currency",currency:e.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:a.value)!=null?o:e.currency}var w=e=>e==="phone"||e==="email"?"":'target="_blank" rel="noopener"',O=e=>`<div class="suggest" id="market-suggest" data-suggest="${n(e.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${n(e.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${n(e.market.dismiss)}">\xD7</button>
</div>`,H=(e,t)=>{var a;return`<p class="status" data-open-status data-hours='${n(JSON.stringify(e.hours))}' data-tz="${n((a=e.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${n(t.visit.open)}" data-closed="${n(t.visit.closed)}" hidden></p>`},q={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},re=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,se=e=>{var t;try{let a=new URL(String((t=e.googleReview)!=null?t:"").trim());return a.protocol==="https:"&&re.test(a.hostname)?a.href:""}catch{return""}},I=(e,t,a,o="btn btn--line")=>{var i;let r=se(e);if(!r)return"";let c=typeof t.reviews=="object"&&((i=t.reviews)==null?void 0:i.google)||q[a]||q.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${n(r)}" target="_blank" rel="noopener">${u("star",16)} ${n(c)}</a></p>`},z={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},U={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},W=e=>{var t;return((t=e.reviews)!=null?t:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function _(e,t){var c,i,s;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((c=e==null?void 0:e.date)!=null?c:"").trim());if(!a)return"";let o=new Date(Date.UTC(+a[1],+a[2]-1,+((i=a[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((s=U[t])!=null?s:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${n(e.date)}">${n(r)}</time>`}function ie(e,t){var i,s;let a=e.filter(l=>l.rating>=1&&l.rating<=5);if(a.length<2)return"";let o=a.reduce((l,d)=>l+Number(d.rating),0)/a.length,r=(i=z[t])!=null?i:z.en,c=new Intl.NumberFormat((s=U[t])!=null?s:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${c}</strong><span>\xB7</span><span>${n(r.count.replace("{n}",String(e.length)))}</span></p>`}function K(e,t,a,o){var i;if(!e.length)return"";let r=(i=z[t])!=null?i:z.en,c=s=>`<button type="button" class="rv-btn" data-rv-${s} aria-label="${n(s==="prev"?r.prev:r.next)}">${u("arrow",18,s==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ie(e,t)}<div class="rv" data-rv data-rv-more="${n(r.more)}" data-rv-less="${n(r.less)}">
      <div class="${a} rv-track" tabindex="0">${e.map(o).join("")}</div>
      <div class="rv-nav" hidden>${c("prev")}${c("next")}</div>
    </div>${ce}`}var ce=`<style>
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
upd()}})()<\/script>`;var J=(e,t,a)=>e.badge===!1?"":`<a class="made" href="https://kingpes.net/${n(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${n(t.footer.madeWith)}</a>`;function Z({site:e,markets:t,url:a,abs:o}){var i;let r=(i=t.find(s=>s.default))!=null?i:t[0],c=t.map(s=>({id:s.id,lang:s.lang,country:s.country}));return`<!doctype html>
<html lang="${n(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${n(e.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${t.map(s=>`<link rel="alternate" hreflang="${n(s.lang)}-${n(s.country)}" href="${o(`${s.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(c)}, root = ${JSON.stringify(a(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${t.map(s=>`<a href="${a(`${s.id}/`)}">${n(s.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var le="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Pacifico&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";function pe(e,t){return e.products.map(a=>({...a,variants:a.variants.map(o=>({...o,price:L(o,t)})).filter(o=>o.price!=null)})).filter(a=>a.variants.length>0)}function Ve({site:e,catalog:t,i18n:a,template:o,basePath:r="/",siteUrl:c=e.domain}){let i=B(r),s=p=>new URL(i(p),c).href,l=t.markets,d=l.map(p=>{var m,j,T,R;let h=p.lang,f=(j=(m=a[h])!=null?m:a.en)!=null?j:a.vi,y=g=>N(g,h,"en"),b=pe(t,p),v=new Set(t.categories.filter(g=>g.retail).map(g=>g.id)),M=(R=(T=e.orderChannels)==null?void 0:T[p.id])!=null?R:["phone"],D={site:e,catalog:t,market:p,markets:l,lang:h,t:f,L:y,url:i,abs:s,channels:M,money:g=>E(g,p),template:o,menu:b.filter(g=>!v.has(g.category)),beans:b.filter(g=>v.has(g.category))};return{path:`${p.id}/index.html`,html:de(D)}});return d.push({path:"index.html",html:Z({site:e,markets:l,url:i,abs:s})}),d}function de(e){var M,P,D;let{site:t,market:a,markets:o,lang:r,t:c,L:i,url:s,abs:l,channels:d}=e,p=`${t.name} \xB7 ${i(t.tagline)}`,h=(M=t.theme)!=null?M:{},f=["primary","ink","bg","surface","soft","accent"].filter(m=>h[m]).map(m=>`--${m}:${h[m]}`).join(";"),y=(P=o.find(m=>m.default))!=null?P:o[0],b=o.map(m=>({id:m.id,lang:m.lang,country:m.country,currency:m.currency,href:s(`${m.id}/`)})),v=d[0];return`<!doctype html>
<html lang="${n(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${n(p)}</title>
<meta name="description" content="${n(i(t.intro))}">
<link rel="canonical" href="${l(`${a.id}/`)}">
${o.map(m=>`<link rel="alternate" hreflang="${n(m.lang)}-${n(m.country)}" href="${l(`${m.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${l(`${y.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${n(p)}">
<meta property="og:description" content="${n(i(t.intro))}">
<meta property="og:url" content="${l(`${a.id}/`)}">
<meta property="og:image" content="${l("assets/photos/hero.webp")}">
<meta property="og:site_name" content="${n(t.name)}">
<meta name="theme-color" content="${n((D=h.bg)!=null?D:"#1B1612")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${le}">
<link rel="stylesheet" href="${s("assets/style.css")}">
<style>:root{${f}}</style>
${V(we(e))}
<script src="${s("assets/site.js")}" defer><\/script>
</head>
<body data-market="${n(a.id)}" data-markets='${n(JSON.stringify(b))}'>
<a class="skip" href="#main">${n(c.skip)}</a>
${O(c)}
${he(e)}
<main id="main">
${ue(e)}
${me(e)}
${ge(e)}
${fe(e)}
${ye(e)}
${be(e)}
${xe(e)}
${$e(e)}
</main>
${ke(e)}
<nav class="dock" aria-label="${n(c.nav.order)}">
  <a href="#menu">${u("cup",20)}<span>${n(c.nav.menu)}</span></a>
  <a class="primary" href="${n(k(v,t.contact))}" ${w(v)}>${u(v,20)}<span>${n(c.via[v])}</span></a>
</nav>
</body>
</html>
`}function he({site:e,market:t,markets:a,t:o,url:r,beans:c,channels:i}){let s=[["#menu",o.nav.menu],["#space",o.nav.space],...c.length?[["#beans",o.nav.beans]]:[],["#visit",o.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${e.logo?`<img src="${n($(r,e.logo))}" alt="" width="36" height="36">`:`<span class="brand-mark" aria-hidden="true">${u("cup",22)}</span>`}
      <span>${n(e.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([l,d])=>`<a href="${l}">${n(d)}</a>`).join("")}</nav>
    <div class="bar-end">
      <details class="market">
        <summary aria-label="${n(o.market.label)}">${u("globe",18)}<span>${n(t.id.toUpperCase())}<span class="cur"> \xB7 ${n(G(t))}</span></span></summary>
        <ul>${a.map(l=>`<li><a href="${r(`${l.id}/`)}" hreflang="${n(l.lang)}"${l.id===t.id?' aria-current="true"':""}>${n(l.country)} \xB7 ${n(l.currency)}</a></li>`).join("")}</ul>
      </details>
      <a class="btn btn--accent hide-sm" href="${n(k(i[0],e.contact))}" ${w(i[0])}>${n(o.nav.order)}</a>
      <details class="mnav">
        <summary aria-label="${n(o.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${s.map(([l,d])=>`<a href="${l}">${n(d)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ue({site:e,t,L:a,url:o}){var s;let r=e.hours.map(l=>l.open).sort()[0],c=e.heroImage?n($(o,e.heroImage)):o("assets/photos/hero.webp"),i=encodeURIComponent((s=e.contact.mapQuery)!=null?s:a(e.contact.address));return`<section class="hero">
  <img class="hero-bg" src="${c}" alt="" width="1600" height="1000" fetchpriority="high">
  <div class="wrap hero-copy">
    ${e.script?`<p class="script">${n(e.script)}</p>`:""}
    <h1><span class="h1-name">${n(e.name)}</span><span class="h1-tag">${n(a(e.tagline))}</span></h1>
    <p class="lead">${n(a(e.intro))}</p>
    <div class="actions">
      <a class="btn btn--accent btn--lg" href="#menu">${u("cup",18)} ${n(t.hero.menu)}</a>
      <a class="btn btn--light btn--lg" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${u("pin",18)} ${n(t.hero.directions)}</a>
    </div>
    <p class="hero-open">${u("clock",18)} ${n(t.hero.openFrom)} ${n(r)} \xB7 ${n(a(e.contact.address))}</p>
  </div>
</section>`}function me({site:e,L:t}){var o;if(!((o=e.highlights)!=null&&o.length))return"";let a=e.highlights.map(r=>`<li>${n(t(r))}</li>`).join("");return`<div class="ticker" aria-label="${n(e.name)}">
  <ul class="ticker-track">${a}</ul>
  <ul class="ticker-track" aria-hidden="true">${a}</ul>
</div>`}var Y=(e,t)=>e.variants.map(a=>a.size?`${a.size} ${t(a.price)}`:t(a.price)).join(" \xB7 ");function ge({menu:e,t,L:a,url:o,money:r}){let c=e.filter(i=>i.featured&&i.image).slice(0,4);return c.length?`<section class="section" aria-labelledby="sig-title">
  <div class="wrap">
    <p class="script script--sm" aria-hidden="true">No.1</p>
    <h2 id="sig-title" class="h2">${n(t.signature)}</h2>
    <div class="sig">
      ${c.map((i,s)=>`<article class="sig-card">
        <div class="sig-img"><img sizes="auto, (max-width: 640px) 50vw, 280px" src="${n($(o,i.image))}" alt="${n(a(i.name))}" width="800" height="800" loading="lazy">${i.tag?`<span class="tag">${n(a(i.tag))}</span>`:""}<span class="sig-no">0${s+1}</span></div>
        <h3>${n(a(i.name))}</h3>
        ${i.description?`<p class="muted">${n(a(i.description))}</p>`:""}
        <p class="sig-price">${n(Y(i,r))}</p>
      </article>`).join("")}
    </div>
  </div>
</section>`:""}function fe(e){let{menu:t,catalog:a,t:o,L:r,money:c}=e,i=a.categories.filter(l=>!l.retail&&t.some(d=>d.category===l.id)),s=l=>[...new Set(l.flatMap(d=>d.variants.map(p=>p.size).filter(Boolean)))];return`<section class="section" id="menu" aria-labelledby="menu-title">
  <div class="wrap">
    <div class="board">
      <h2 id="menu-title" class="board-title">${n(o.menu.title)}</h2>
      <div class="board-grid">
        ${i.map(l=>{let d=t.filter(h=>h.category===l.id),p=s(d);return`<div class="board-cat">
          <h3><span>${n(r(l.name))}</span>${p.length?`<span class="cols" aria-hidden="true">${p.map(h=>`<span>${n(h)}</span>`).join("")}</span>`:""}</h3>
          <ul>${d.map(h=>`<li class="row">
            <div class="row-name"><span>${n(r(h.name))}</span>${h.tag?`<em class="pill">${n(r(h.tag))}</em>`:""}${h.description&&!h.featured?`<small>${n(r(h.description))}</small>`:""}</div>
            <span class="dots" aria-hidden="true"></span>
            <span class="cols">${p.length&&h.variants.every(f=>f.size)?p.map(f=>{let y=h.variants.find(b=>b.size===f);return`<span>${y?`<span class="sr">${n(o.menu.size)} ${n(f)}: </span>${n(c(y.price))}`:"\u2013"}</span>`}).join(""):`<span class="one">${n(c(h.variants[0].price))}</span>`}</span>
          </li>`).join("")}</ul>
        </div>`}).join("")}
      </div>
      <p class="board-note">${n(o.menu.note)}</p>
    </div>
    ${ve(e)}
  </div>
</section>`}function ve({site:e,market:t,t:a}){var r,c;let o=Array.isArray(e.delivery)?e.delivery:(c=(r=e.delivery)==null?void 0:r[t.id])!=null?c:[];return o.length?`<div class="delivery">
  <span>${u("bike",20)} ${n(a.delivery)}</span>
  ${o.map(i=>`<a class="btn btn--light" href="${n(i.url)}" target="_blank" rel="noopener">${n(i.name)} ${u("arrow",16)}</a>`).join("")}
</div>`:""}function ye({site:e,t,L:a,url:o}){var r;return(r=e.gallery)!=null&&r.length?`<section class="section section--soft" id="space" aria-labelledby="space-title">
  <div class="wrap">
    <p class="script script--sm" aria-hidden="true">${n(e.name)}</p>
    <h2 id="space-title" class="h2">${n(t.space)}</h2>
    <div class="mosaic">
      ${e.gallery.slice(0,4).map((c,i)=>`<figure class="tile tile-${i+1}">
        <img sizes="auto, (max-width: 640px) 100vw, 580px" src="${n($(o,c.image))}" alt="${n(a(c.caption))}" loading="lazy">
        ${c.caption?`<figcaption>${n(a(c.caption))}</figcaption>`:""}
      </figure>`).join("")}
    </div>
  </div>
</section>`:""}function be({site:e,beans:t,t:a,L:o,url:r,money:c,channels:i}){var d;let s=e.roast;if(!s&&!t.length)return"";let l=i[0];return`<section class="section" id="beans" aria-labelledby="beans-title">
  <div class="wrap roast">
    <div class="roast-img"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${r("assets/photos/roast.webp")}" alt="" width="1100" height="800" loading="lazy"></div>
    <div class="roast-copy">
      <h2 id="beans-title" class="h2">${n(o(s==null?void 0:s.title)||a.nav.beans)}</h2>
      ${s!=null&&s.body?`<p class="lead">${n(o(s.body))}</p>`:""}
      ${(d=s==null?void 0:s.facts)!=null&&d.length?`<dl class="facts">${s.facts.map(p=>`<div><dt>${n(o(p.value))}</dt><dd>${n(o(p.label))}</dd></div>`).join("")}</dl>`:""}
    </div>
  </div>
  ${t.length?`<div class="wrap bags">
    ${t.map(p=>{var h;return`<article class="bag">
      ${p.image?`<img sizes="auto, (max-width: 640px) 50vw, 280px" src="${n($(r,p.image))}" alt="${n(o(p.name))}" width="800" height="800" loading="lazy">`:""}
      <div class="bag-body">
        <h3>${n(o(p.name))}</h3>
        ${p.description?`<p class="muted">${n(o(p.description))}</p>`:""}
        <p class="bag-price">${n(Y(p,c))}</p>
        <a class="btn btn--accent" href="${n(k(l,e.contact,a.orderText.replace("{product}",`${o(p.name)} ${(h=p.variants[0].size)!=null?h:""}`.trim())))}" ${w(l)}>${u("bag",18)} ${n(a.beans.buy)}</a>
      </div>
    </article>`}).join("")}
    <p class="bags-note muted">${n(a.beans.note)}</p>
  </div>`:""}
</section>`}function $e({site:e,t,L:a,channels:o}){var i;let r=encodeURIComponent((i=e.contact.mapQuery)!=null?i:a(e.contact.address)),c=s=>s.length===7?t.days.join(", "):A(s,t.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${n(t.visit.title)}</h2>
      ${H(e,t)}
      <h3 class="h4">${u("clock",18)} ${n(t.visit.hours)}</h3>
      <table class="hours"><tbody>${e.hours.map(s=>`<tr><th scope="row">${n(c(s.days))}</th><td>${n(s.open)} \u2013 ${n(s.close)}</td></tr>`).join("")}</tbody></table>
      <h3 class="h4">${u("pin",18)} ${n(t.visit.address)}</h3>
      <p>${n(a(e.contact.address))}</p>
      <div class="actions">
        <a class="btn btn--light" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${n(t.visit.directions)} ${u("arrow",16)}</a>
        ${o.map(s=>`<a class="btn btn--ghost" href="${n(k(s,e.contact))}" ${w(s)}>${u(s,18)} ${n(t.via[s])}</a>`).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${n(t.visit.address)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function xe({site:e,t,L:a,lang:o}){let r=I(e,t,o,"btn btn--light"),c=W(e);return e.showReviews===!1||!c.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${n(t.reviews.title)}</h2>
    ${K(c,o,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${n(i.rating)}/5">${Array.from({length:5},(s,l)=>`<span class="${l<i.rating?"on":""}">${u("star",16)}</span>`).join("")}</p>
      <blockquote>${n(a(i.text))}</blockquote>
      <figcaption>${n(i.name)}${i.bought?`<small>${n(a(i.bought))}</small>`:""}${_(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function ke({site:e,t,L:a,market:o}){let r=e.contact;return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${n(e.name)}</p><p class="muted">${n(a(e.tagline))}</p></div>
    <div><p class="foot-h">${n(t.footer.contact)}</p><ul>
      ${r.phone?`<li><a href="tel:${x(r.phone)}">${n(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${n(r.email)}">${n(r.email)}</a></li>`:""}
      <li>${n(a(r.address))}</li></ul></div>
    ${e.social?`<div><p class="foot-h">${n(t.footer.follow)}</p><ul>${Object.entries(e.social).filter(([,c])=>c).map(([c,i])=>`<li><a href="${n(i)}" target="_blank" rel="noopener">${n(c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${e.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${n(e.name)}</span>${J(e,t,o.lang)}</div>
</footer>`}function we({site:e,market:t,L:a,abs:o,menu:r,beans:c,catalog:i}){let s=[...r,...c];return{"@context":"https://schema.org","@type":"CafeOrCoffeeShop",name:e.name,url:o(`${t.id}/`),image:o("assets/photos/hero.webp"),description:a(e.intro),telephone:e.contact.phone,email:e.contact.email,servesCuisine:"Coffee",address:{"@type":"PostalAddress",streetAddress:a(e.contact.address)},currenciesAccepted:t.currency,openingHoursSpecification:F(e.hours),hasMenu:{"@type":"Menu",hasMenuSection:i.categories.filter(l=>s.some(d=>d.category===l.id)).map(l=>({"@type":"MenuSection",name:a(l.name),hasMenuItem:s.filter(d=>d.category===l.id).map(d=>({"@type":"MenuItem",name:a(d.name),...d.description?{description:a(d.description)}:{},offers:d.variants.map(p=>({"@type":"Offer",...p.size?{name:p.size}:{},price:p.price,priceCurrency:t.currency}))}))}))}}}export{Ve as renderSite};
