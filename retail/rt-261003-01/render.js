var $e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>$e[t]);function G(a,t,n="vi"){var o,r,i;return a==null?"":typeof a!="object"?String(a):(i=(r=(o=a[t])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?i:""}var xe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},_=a=>{var t;return(t=xe[a])!=null?t:"en-US"};function ke(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function K(a,t){var o,r;if(t.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ke(a.basePrice*t.rate,t.rounding)}var we=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function X(a,t){let n={style:"currency",currency:t.currency};return we.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(_(t.lang),n).format(a)}function Q(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var A=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,j=(a,t)=>{let n=A(t);return n==null?t:a(n)},E=(a="")=>String(a).replace(/\D/g,"");function O(a,t,n=""){switch(a){case"phone":return`tel:${E(t.phone)}`;case"zalo":return`https://zalo.me/${E(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${E(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var F=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`;var Me={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(a,t=20,n="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=Me[a])!=null?o:""}</svg>`},H=[1,2,3,4,5,6,0],De=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function ae(a,t){let n=a.map(r=>H.indexOf(r)).sort((r,i)=>r-i);return n.every((r,i)=>i===0||r===n[i-1]+1)&&n.length>2?`${t[H[n[0]]]} \u2013 ${t[H[n.at(-1)]]}`:n.map(r=>t[H[r]]).join(", ")}var ne=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>De[n]),opens:t.open,closes:t.close}));function oe(a){var n,o;return(o=(n=new Intl.NumberFormat(_(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var W=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',re=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,se=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},ee={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Se=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ze=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&Se.test(n.hostname)?n.href:""}catch{return""}},ie=(a,t,n,o="btn btn--line")=>{var s;let r=ze(a);if(!r)return"";let i=typeof t.reviews=="object"&&((s=t.reviews)==null?void 0:s.google)||ee[n]||ee.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${m("star",16)} ${e(i)}</a></p>`},U={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ce={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},le=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function pe(a,t){var i,s,l;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((s=n[3])!=null?s:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((l=ce[t])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function Pe(a,t){var s,l;let n=a.filter(p=>p.rating>=1&&p.rating<=5);if(n.length<2)return"";let o=n.reduce((p,d)=>p+Number(d.rating),0)/n.length,r=(s=U[t])!=null?s:U.en,i=new Intl.NumberFormat((l=ce[t])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function de(a,t,n,o){var s;if(!a.length)return"";let r=(s=U[t])!=null?s:U.en,i=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${m("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Pe(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${je}`}var je=`<style>
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
upd()}})()<\/script>`,te={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function he(a){var o;let t=(o=te[a])!=null?o:te.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${m("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${m("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${m("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var ue=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function me({site:a,markets:t,url:n,abs:o}){var s;let r=(s=t.find(l=>l.default))!=null?s:t[0],i=t.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${t.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${o(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(i)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${t.map(l=>`<a href="${n(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Ne="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",fe=24;function ve(a,t){return a.products.map(n=>({...n,variants:n.variants.map(o=>({...o,price:K(o,t)})).filter(o=>o.price!=null)})).filter(n=>n.variants.length>0).map(n=>({...n,from:Math.min(...n.variants.map(o=>o.price))}))}function Ce(a){let t=a.filter(i=>i.badge),n=a.filter(i=>!t.includes(i)),o=[...new Set(n.map(i=>i.category))].map(i=>n.filter(s=>s.category===i)),r=[...t];for(let i=0;r.length<a.length;i++)for(let s of o)s[i]&&r.push(s[i]);return r}var Te=a=>String(a).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function Le(a){let t=10**Math.floor(Math.log10(a));return[1,2,2.5,5,10].map(n=>n*t).reduce((n,o)=>Math.abs(o-a)<Math.abs(n-a)?o:n)}function Re(a){let t=a.map(o=>o.from).sort((o,r)=>o-r),n=[...new Set([.2,.4,.6,.8].map(o=>Le(t[Math.floor(o*(t.length-1))])))];return n.map((o,r)=>[r?n[r-1]:0,o]).concat([[n[n.length-1],1/0]])}function ht({site:a,catalog:t,i18n:n,template:o,basePath:r="/",siteUrl:i=a.domain}){var u,y,M,v,$;let s=Q(r),l=b=>new URL(s(b),i).href,p=t.markets,d=(b,k)=>`${k.id}/${G(b.slug,k.lang,"en")}/`,h=[];for(let b of p){let k=b.lang,x=(y=(u=n[k])!=null?u:n.en)!=null?y:n.vi,w=c=>G(c,k,"en"),S=ve(t,b),z=(v=(M=a.orderChannels)==null?void 0:M[b.id])!=null?v:["phone"],D=c=>X(c,b),P=($=a.installmentMonths)!=null?$:12,N=c=>D(Number.isInteger(c)&&c>=1e5?Math.ceil(c/P/1e3)*1e3:Math.ceil(c/P*100)/100),T=(c,g)=>{var C,R;return w((R=(C=c==null?void 0:c.find(I=>I.id===g))==null?void 0:C.name)!=null?R:g)},q=c=>t.categories.find(g=>g.id===c.category),L={site:a,catalog:t,market:b,markets:p,lang:k,t:x,L:w,url:s,abs:l,channels:z,money:D,monthly:N,months:P,canSplit:c=>{var g;return P>1&&((g=q(c))==null?void 0:g.installment)!==!1},items:S,productPath:d,template:o,name:T,cat:q};h.push({path:`${b.id}/index.html`,html:ge(L,{kind:"home"})});for(let c of S)h.push({path:`${d(c,b)}index.html`,html:ge(L,{kind:"product",product:c})})}return h.push({path:"index.html",html:me({site:a,markets:p,url:s,abs:l})}),h}function ge(a,t){var B,L,c,g,C,R,I,J,Z;let{site:n,market:o,markets:r,lang:i,t:s,L:l,url:p,abs:d,catalog:h,productPath:u,channels:y,money:M}=a,v=t.kind==="home",$=t.product,b=v?`${o.id}/`:u($,o),k=v?`${n.name} \xB7 ${l(n.tagline)}`:`${l($.name)} \xB7 ${n.name}`,x=v?l(n.intro):`${l($.description)} ${s.from} ${M($.from)}.`,w=r.map(f=>v?{m:f,href:`${f.id}/`}:ve({products:[h.products.find(V=>V.id===$.id)]},f).length?{m:f,href:u($,f)}:null).filter(Boolean),S=f=>{var V,Y;return(Y=(V=w.find(be=>be.m.id===f.id))==null?void 0:V.href)!=null?Y:`${f.id}/`},z=(B=r.find(f=>f.default))!=null?B:r[0],D=(L=n.theme)!=null?L:{},P=["primary","ink","bg","surface","soft","accent"].filter(f=>D[f]).map(f=>`--${f}:${D[f]}`).join(";"),N=r.map(f=>({id:f.id,lang:f.lang,country:f.country,currency:f.currency,href:p(S(f))})),T=y[0],q=d(A(v?(C=(c=n.heroImages)==null?void 0:c[0])!=null?C:(g=a.items[0])==null?void 0:g.image:$.image));return`<!doctype html>
<html lang="${e(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(k)}</title>
<meta name="description" content="${e(x)}">
<link rel="canonical" href="${d(b)}">
${w.map(({m:f,href:V})=>`<link rel="alternate" hreflang="${e(f.lang)}-${e(f.country)}" href="${d(V)}">`).join(`
`)}
${w.some(f=>f.m.id===z.id)?`<link rel="alternate" hreflang="x-default" href="${d(S(z))}">`:""}
<meta property="og:type" content="${v?"website":"product"}">
<meta property="og:title" content="${e(k)}">
<meta property="og:description" content="${e(x)}">
<meta property="og:url" content="${d(b)}">
<meta property="og:image" content="${e(q)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((R=D.ink)!=null?R:"#14201A")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ne}">
<link rel="stylesheet" href="${p("assets/style.css")}">
<style>:root{${P}}</style>
${v?F(Ze(a))+((I=n.faq)!=null&&I.length?F(Ye(a)):""):F(Xe(a,$))+F(Qe(a,$))}
<script src="${p("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(o.id)}" data-markets='${e(JSON.stringify(N))}' data-copied="${e(s.copied)}" data-wa="${e(E((J=n.contact.whatsapp)!=null?J:""))}" data-email="${e((Z=n.contact.email)!=null?Z:"")}">
<a class="skip" href="#main">${e(s.skip)}</a>
${re(s)}
${n.announcement?`<p class="announce">${e(l(n.announcement))}</p>`:""}
${Ee(a,v)}
<main id="main">
${v?[qe,Be,Ve,Ae,Oe,Fe,Ie,Ge,He,We].map(f=>f(a)).join(`
`):_e(a,$)}
</main>
${Je(a)}
<nav class="dock" aria-label="${e(s.nav.order)}">
  ${v?`<a href="#shop">${m("search",20)}<span>${e(s.nav.shop)}</span></a>`:`<a href="${p(`${o.id}/`)}#shop">${m("search",20)}<span>${e(s.nav.shop)}</span></a>`}
  <a class="primary" href="${e(v?O(T,n.contact):"#order")}" ${v?W(T):""}>${m(v?T:"bike",20)}<span>${e(v?s.nav.order:s.nav.buy)}</span></a>
</nav>
</body>
</html>
`}function Ee({site:a,market:t,markets:n,t:o,url:r},i){let s=i?"":r(`${t.id}/`),l=[[`${s}#types`,o.nav.types],[`${s}#shop`,o.nav.shop],[`${s}#service`,o.nav.service],[`${s}#visit`,o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(j(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${m("bike",22)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${l.map(([p,d])=>`<a href="${p}">${e(d)}</a>`).join("")}</nav>
    <div class="bar-end">
      <details class="market">
        <summary aria-label="${e(o.market.label)}">${m("globe",18)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(oe(t))}</span></span></summary>
        <ul>${n.map(p=>`<li><a href="${r(`${p.id}/`)}" hreflang="${e(p.lang)}"${p.id===t.id?' aria-current="true"':""}>${e(p.country)} \xB7 ${e(p.currency)}</a></li>`).join("")}</ul>
      </details>
      ${a.contact.phone?`<a class="btn btn--primary hide-sm" href="tel:${E(a.contact.phone)}">${m("phone",18)} ${e(a.contact.phone)}</a>`:""}
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${l.map(([p,d])=>`<a href="${p}">${e(d)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function qe(a){var M,v,$,b,k;let{site:t,t:n,L:o,url:r,items:i,catalog:s,money:l,productPath:p,market:d}=a,h=($=(M=t.heroImages)==null?void 0:M[0])!=null?$:(v=i[0])==null?void 0:v.image,u=(k=(b=i.find(x=>x.id===t.featured))!=null?b:i.find(x=>x.badge))!=null?k:i[0],y=s.categories.filter(x=>i.some(w=>w.category===x.id)).length;return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${t.heroKicker?`<p class="hero-kicker">${m("bolt",16)} ${e(o(t.heroKicker))}</p>`:""}
      <h1>${e(o(t.tagline))}</h1>
      <p class="lead">${e(o(t.intro))}</p>
      <div class="actions">
        <a class="btn btn--accent btn--lg" href="#shop">${e(n.hero.shop)} ${m("arrow",18)}</a>
        ${t.contact.phone?`<a class="btn btn--glass btn--lg" href="tel:${E(t.contact.phone)}">${m("phone",18)} ${e(n.hero.call)}</a>`:""}
      </div>
      <dl class="stats">
        <div><dt>${e(n.hero.items)}</dt><dd>${i.length}</dd></div>
        <div><dt>${e(n.hero.kinds)}</dt><dd>${y}</dd></div>
        ${a.months>1?`<div><dt>${e(n.hero.split.replace("{n}",a.months))}</dt><dd>0%</dd></div>`:""}
      </dl>
    </div>
    <div class="hero-media">
      ${h?`<img src="${e(j(r,h))}" alt="" width="1200" height="825" fetchpriority="high">`:""}
      ${u?`<a class="hero-feat" href="${r(p(u,d))}">
        <img sizes="auto, 120px" src="${e(j(r,u.image))}" alt="" width="1024" height="768" loading="lazy">
        <span><small>${e(u.badge?o(u.badge):n.hero.featured)}</small><b>${e(o(u.name))}</b><em>${e(n.from)} ${e(l(u.from))}</em></span>
        ${m("arrow",18)}
      </a>`:""}
    </div>
  </div>
</section>`}function Be({site:a,L:t}){var n;return(n=a.perks)!=null&&n.length?`<section class="perks" aria-label="${e(a.name)}">
  <ul class="wrap perk-list">${a.perks.map(o=>{var r;return`<li>${m((r=o.icon)!=null?r:"check",22)}<div><b>${e(t(o.title))}</b>${o.text?`<span>${e(t(o.text))}</span>`:""}</div></li>`}).join("")}</ul>
</section>`:""}function Ve({catalog:a,items:t,t:n,L:o,url:r}){var l;let i=a.categories.map(p=>({...p,n:t.filter(d=>d.category===p.id).length})).filter(p=>p.n),s=((l=a.uses)!=null?l:[]).map(p=>({...p,n:t.filter(d=>{var h;return(h=d.uses)==null?void 0:h.includes(p.id)}).length})).filter(p=>p.n);return i.length?`<section class="section" id="types" aria-labelledby="types-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="types-title" class="h2">${e(n.types.title)}</h2><p class="muted">${e(n.types.lead)}</p></div>
    <ul class="types">${i.map(p=>{var h,u;let d=(u=p.image)!=null?u:(h=t.find(y=>y.category===p.id))==null?void 0:h.image;return`<li><a href="?type=${e(p.id)}#shop" data-filter-link="type" data-value="${e(p.id)}">
      ${d?`<img sizes="auto, (max-width: 640px) 50vw, 280px" src="${e(j(r,d))}" alt="" width="1024" height="768" loading="lazy">`:""}
      <span class="type-name">${e(o(p.name))}</span><span class="type-n">${e(n.types.count.replace("{n}",p.n))}</span>
    </a></li>`}).join("")}</ul>
    ${s.length?`<div class="uses"><p>${e(n.types.byUse)}</p><ul>${s.map(p=>`<li><a class="pill" href="?use=${e(p.id)}#shop" data-filter-link="use" data-value="${e(p.id)}">${e(o(p.name))} <small>${p.n}</small></a></li>`).join("")}</ul></div>`:""}
  </div>
</section>`:""}function ye(a,t,n=0){var $,b,k,x,w,S,z,D,P;let{t:o,L:r,url:i,money:s,monthly:l,canSplit:p,productPath:d,market:h,catalog:u,name:y,cat:M}=a,v=[r(t.name),($=t.name)==null?void 0:$.vi,(b=t.name)==null?void 0:b.en,r((k=M(t))==null?void 0:k.name),(w=(x=M(t))==null?void 0:x.name)==null?void 0:w.vi,...((S=t.uses)!=null?S:[]).map(N=>y(u.uses,N)),r(t.key)].filter(Boolean).join(" ");return`<li class="card${n>=fe?" is-more":""}" data-type="${e(t.category)}" data-use="${e(((z=t.uses)!=null?z:[]).join(" "))}" data-price="${t.from}" data-name="${e(Te(v))}">
  <a class="card-link" href="${i(d(t,h))}">
    <div class="card-img"><img sizes="auto, (max-width: 640px) 50vw, 280px" src="${e(j(i,t.image))}" alt="${e(r(t.name))}" width="1024" height="768" loading="lazy">${t.badge?`<span class="tag">${e(r(t.badge))}</span>`:""}${t.range?`<span class="range-chip">${m("bolt",14)} ${t.range} km</span>`:""}</div>
    <p class="card-cat">${e(r((D=M(t))==null?void 0:D.name))}</p>
    <h3>${e(r(t.name))}</h3>
    ${t.key?`<p class="card-key">${e(r(t.key))}</p>`:""}
    <p class="card-foot">
      <span class="card-price"><small>${e(t.variants.length>1?o.from:"")}</small> ${e(s(t.from))}</span>
      ${(P=t.colors)!=null&&P.length?`<span class="dots" aria-hidden="true">${t.colors.map(N=>`<i style="background:${e(N.hex)}"></i>`).join("")}</span>`:""}
    </p>
    ${p(t)?`<p class="card-inst">${e(o.installmentShort.replace("{price}",l(t.from)))}</p>`:""}
  </a>
</li>`}function Ae(a){var h;let{items:t,catalog:n,t:o,L:r,money:i}=a,s=n.categories.filter(u=>t.some(y=>y.category===u.id)),l=((h=n.uses)!=null?h:[]).filter(u=>t.some(y=>{var M;return(M=y.uses)==null?void 0:M.includes(u.id)})),p=t.length>4?Re(t):[],d=([u,y])=>u?y===1/0?o.shop.over.replace("{a}",i(u)):`${i(u)} \u2013 ${i(y)}`:o.shop.under.replace("{b}",i(y));return`<section class="section section--soft" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="shop-head">
      <h2 id="shop-title" class="h2">${e(o.shop.title)}</h2>
      <p class="muted" data-count="${e(o.shop.count)}">${e(o.shop.count.replace("{n}",t.length))}</p>
    </div>
    <div class="toolbar" data-toolbar>
      <div class="chips" role="group" aria-label="${e(o.shop.all)}">
        <button type="button" class="pill is-on" data-type="">${e(o.shop.all)}</button>
        ${s.map(u=>`<button type="button" class="pill" data-type="${e(u.id)}">${e(r(u.name))}</button>`).join("")}
      </div>
      <div class="filters">
        <label class="search">${m("search",18)}<input type="search" placeholder="${e(o.search)}" aria-label="${e(o.search)}" data-search></label>
        <label class="select"><span class="sr">${e(o.shop.use)}</span><select data-use><option value="">${e(o.shop.anyUse)}</option>${l.map(u=>`<option value="${e(u.id)}">${e(r(u.name))}</option>`).join("")}</select></label>
        <label class="select"><span class="sr">${e(o.shop.price)}</span><select data-band><option value="">${e(o.shop.anyPrice)}</option>${p.map(u=>`<option value="${u[0]}-${u[1]===1/0?"":u[1]}">${e(d(u))}</option>`).join("")}</select></label>
        <label class="select"><span class="sr">${e(o.shop.sort)}</span><select data-sort>
          <option value="">${e(o.shop.sortPop)}</option><option value="asc">${e(o.shop.sortLow)}</option><option value="desc">${e(o.shop.sortHigh)}</option>
        </select></label>
      </div>
    </div>
    <ul class="grid" data-grid>${Ce(t).map((u,y)=>ye(a,u,y)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${e(o.shop.empty)}</p>
    ${t.length>fe?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(o.shop.more)}</button></div>`:""}
  </div>
</section>`}function Oe({items:a,t,L:n,url:o,productPath:r,market:i,money:s}){let l=a.filter(d=>d.range).sort((d,h)=>h.range-d.range).slice(0,8);if(l.length<3)return"";let p=l[0].range;return`<section class="section range" aria-labelledby="range-title">
  <div class="wrap range-grid">
    <div>
      <p class="kicker">${m("bolt",16)} ${e(t.range.kicker)}</p>
      <h2 id="range-title" class="h2">${e(t.range.title)}</h2>
      <p class="lead">${e(t.range.lead)}</p>
      <p class="muted small">${e(t.range.note)}</p>
    </div>
    <ol class="bars">${l.map(d=>`<li><a href="${o(r(d,i))}">
      <span class="bar-name">${e(n(d.name))}<small>${e(s(d.from))}</small></span>
      <span class="bar-track"><span class="bar-fill" style="--w:${Math.round(d.range/p*100)}%"></span></span>
      <b class="bar-km">${d.range} km</b>
    </a></li>`).join("")}</ol>
  </div>
</section>`}function Fe({site:a,t,L:n,market:o,money:r}){var i;return(i=a.services)!=null&&i.length?`<section class="section section--soft" id="service" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="svc-title" class="h2">${e(t.service.title)}</h2>${a.serviceIntro?`<p class="muted">${e(n(a.serviceIntro))}</p>`:""}</div>
    <ul class="svc">${a.services.map(s=>{var p;let l=s.basePrice===0?0:s.basePrice!=null?K(s,o):null;return`<li>${m((p=s.icon)!=null?p:"wrench",24)}<h3>${e(n(s.title))}</h3><p class="muted">${e(n(s.text))}</p>${l!=null?`<p class="svc-price">${l===0?e(t.service.free):`${e(t.from)} <b>${e(r(l))}</b>`}</p>`:""}</li>`}).join("")}</ul>
  </div>
</section>`:""}function Ie({site:a,L:t,url:n}){let o=a.story;return o?`<section class="section" aria-labelledby="story-title">
  <div class="wrap story">
    ${o.image?`<figure class="story-img"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${e(j(n,o.image))}" alt="" width="1024" height="658" loading="lazy"></figure>`:""}
    <div><h2 id="story-title" class="h2">${e(t(o.title))}</h2>${o.body?`<p class="lead">${e(t(o.body))}</p>`:""}</div>
  </div>
</section>`:""}function Ge({site:a,t,L:n,lang:o}){let r=ie(a,t,o,"btn btn--line"),i=le(a);return a.showReviews===!1||!i.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2>
    ${de(i,o,"reviews",s=>`<figure class="review">
      <p class="stars" aria-label="${e(s.rating)}/5">${Array.from({length:5},(l,p)=>`<span class="${p<s.rating?"on":""}">${m("star",16)}</span>`).join("")}</p>
      <blockquote>${e(n(s.text))}</blockquote>
      <figcaption>${e(s.name)}${s.bought?`<small>${e(n(s.bought))}</small>`:""}${pe(s,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function He({site:a,t,L:n}){var o;return(o=a.faq)!=null&&o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${a.faq.map((r,i)=>`<details${i===0?" open":""}><summary>${e(n(r.q))}</summary><p>${e(n(r.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ue(a,t){let n=new Map;for(let o of a){let r=[...o.days].sort().join(",");n.has(r)||n.set(r,{days:o.days,slots:[]}),n.get(r).slots.push(`${o.open} \u2013 ${o.close}`)}return[...n.values()].map(o=>{var r;return{label:o.days.length===7?(r=t.visit.everyDay)!=null?r:t.days.join(", "):ae(o.days,t.days),slots:o.slots.join(", ")}})}function We({site:a,t,L:n,channels:o}){var i;let r=encodeURIComponent((i=a.contact.mapQuery)!=null?i:n(a.contact.address));return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div>
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${se(a,t)}
      <h3 class="h4">${m("clock",18)} ${e(t.visit.hours)}</h3>
      <table class="hours"><tbody>${Ue(a.hours,t).map(s=>`<tr><th scope="row">${e(s.label)}</th><td>${e(s.slots)}</td></tr>`).join("")}</tbody></table>
      <h3 class="h4">${m("pin",18)} ${e(t.visit.address)}</h3>
      <p>${e(n(a.contact.address))}</p>
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${e(t.visit.directions)} ${m("arrow",16)}</a>
        ${o.map(s=>`<a class="btn btn--line" href="${e(O(s,a.contact))}" ${W(s)}>${m(s,18)} ${e(t.via[s])}</a>`).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.address)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function _e(a,t){var N,T,q,B,L;let{site:n,t:o,L:r,url:i,money:s,monthly:l,months:p,canSplit:d,market:h,items:u,channels:y,catalog:M,name:v,cat:$}=a,b=d(t),k=t.variants.map(c=>({size:r(c.size)||"",price:s(c.price),inst:b?o.installment.replace("{price}",l(c.price)).replace("{n}",p):""})),x=t.variants.reduce((c,g)=>g.price<c.price?g:c),w=$(t),S=[...u.filter(c=>c.id!==t.id&&c.category===t.category),...u.filter(c=>{var g;return c.id!==t.id&&c.category!==t.category&&((g=c.uses)==null?void 0:g.some(C=>{var R;return(R=t.uses)==null?void 0:R.includes(C)}))})].slice(0,8),z=i(`${h.id}/`),D=o.orderText.replace("{product}",r(t.name)).replace("{version}",r(x.size)||"").replace("{price}",s(x.price)).replace(/\{\w+\}/g,"\u2026"),P=c=>typeof c=="object"?r(c):String(c);return`<div class="wrap crumbs"><a href="${z}">${e(o.nav.home)}</a>${m("chevron",14)}<a href="${z}?type=${e(t.category)}#shop">${e(r(w==null?void 0:w.name))}</a>${m("chevron",14)}<span aria-current="page">${e(r(t.name))}</span></div>
<section class="wrap pdp" data-product data-name="${e(r(t.name))}" data-sizes='${e(JSON.stringify(k))}' data-text="${e(o.orderText)}">
  ${Ke(a,t)}
  <div class="pdp-info">
    <p class="kicker">${e(r(w==null?void 0:w.name))}</p>
    <h1 class="pdp-title">${e(r(t.name))}</h1>
    <p class="pdp-price"><strong data-v="price">${e(s(x.price))}</strong></p>
    ${b?`<p class="pdp-inst">${m("card",18)} <span data-v="inst">${e(k[t.variants.indexOf(x)].inst)}</span></p>`:""}
    <p class="lead">${e(r(t.description))}</p>
    ${t.variants.length>1?`<fieldset class="opts"><legend>${e(o.product.version)}</legend><div class="opt-row">
      ${t.variants.map((c,g)=>`<label class="opt"><input type="radio" name="size" value="${g}"${c===x?" checked":""}><span><b>${e(r(c.size))}</b><small>${e(s(c.price))}</small></span></label>`).join("")}
    </div></fieldset>`:""}
    ${(N=t.colors)!=null&&N.length?`<fieldset class="opts"><legend>${e(o.product.color)}: <span data-v="color">${e(r(t.colors[0].name))}</span></legend><div class="swatches">
      ${t.colors.map((c,g)=>`<label class="sw" title="${e(r(c.name))}"><input type="radio" name="color" value="${e(r(c.name))}"${g?"":" checked"}><span style="background:${e(c.hex)}"></span><b class="sr">${e(r(c.name))}</b></label>`).join("")}
    </div></fieldset>`:""}
    ${(T=t.frames)!=null&&T.length?`<fieldset class="opts"><legend>${e(o.product.frame)}</legend><div class="opt-row">
      ${t.frames.map((c,g)=>`<label class="opt opt--sm"><input type="radio" name="frame" value="${e(r(c))}"${g===Math.floor((t.frames.length-1)/2)?" checked":""}><span><b>${e(r(c))}</b></span></label>`).join("")}
    </div></fieldset>`:""}
    ${(q=t.uses)!=null&&q.length?`<p class="use-tags">${t.uses.map(c=>`<a href="${z}?use=${e(c)}#shop">${e(v(M.uses,c))}</a>`).join("")}</p>`:""}
    ${(B=n.promises)!=null&&B.length?`<ul class="promises">${n.promises.map(c=>{var g;return`<li>${m((g=c.icon)!=null?g:"check",18)} ${e(r(c.text))}</li>`}).join("")}</ul>`:""}
    <form class="order" id="order" data-compose>
      <h2 class="h4">${m("bike",20)} ${e(o.product.orderTitle)}</h2>
      <div class="intents" role="radiogroup" aria-label="${e(o.product.orderTitle)}">${o.product.intents.map((c,g)=>`<label class="intent"><input type="radio" name="intent" value="${e(c)}"${g?"":" checked"}><span>${e(c)}</span></label>`).join("")}</div>
      <div class="fields">
        <label><span>${e(o.product.name)}</span><input name="name" autocomplete="name"></label>
        <label><span>${e(o.product.phone)}</span><input name="phone" type="tel" autocomplete="tel"></label>
        <label><span>${e(o.product.date)}</span><input type="date" name="date"></label>
        <label><span>${e(o.product.address)}</span><input name="address" autocomplete="street-address"></label>
        <label class="wide"><span>${e(o.product.note)}</span><textarea name="note" rows="2" placeholder="${e(o.product.noteHint)}"></textarea></label>
      </div>
      <div class="buy">${y.map((c,g)=>`<button type="submit" class="btn ${g?"btn--line":"btn--primary"} btn--lg" data-channel="${e(c)}" data-href="${e(O(c,n.contact,D))}">${m(c,18)} ${e(c==="phone"?o.product.call:o.product.send.replace("{channel}",o.via[c]))}</button>`).join("")}</div>
      <noscript><p>${y.map(c=>`<a href="${e(O(c,n.contact,D))}" ${W(c)}>${e(o.via[c])}</a>`).join(" \xB7 ")}</p></noscript>
      <p class="form-msg" role="status" hidden></p>
      <p class="muted small">${m("check",16)} ${e(o.product.reply)}</p>
    </form>
    ${he(a.market.lang)}
  </div>
</section>
${(L=t.specs)!=null&&L.length?`<section class="section section--tight"><div class="wrap specs">
  <h2 class="h3">${e(o.product.specs)}</h2>
  <table><tbody>${t.specs.map(([c,g])=>{var C;return`<tr><th scope="row">${e((C=o.specs[c])!=null?C:c)}</th><td>${e(P(g))}</td></tr>`}).join("")}</tbody></table>
</div></section>`:""}
${S.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${e(o.product.related)}</h2>
  <ul class="grid grid--related">${S.map(c=>ye(a,c)).join("")}</ul>
</div></section>`:""}`}function Ke({t:a,L:t,url:n},o){var p;let r=[o.image,...(p=o.images)!=null?p:[]],i=a.gallery,s=t(o.name),l=o.badge?`<span class="tag">${e(t(o.badge))}</span>`:"";return r.length===1?`<figure class="pdp-img"><img src="${e(j(n,o.image))}" alt="${e(s)}" width="1024" height="768" fetchpriority="high">${l}</figure>`:`<figure class="pdp-img gallery" data-gallery data-label="${e(i.photo)}">
    <div class="g-stage">
      <ul class="g-track" tabindex="0" aria-label="${e(i.label)}">${r.map((d,h)=>`<li id="g-${h+1}"><a href="${e(j(n,d))}" data-zoom="${h}" aria-label="${e(i.zoom)}: ${e(i.photo.replace("{i}",h+1).replace("{n}",r.length))}"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${e(j(n,d))}" alt="${e(h?`${s} \u2013 ${i.photo.replace("{i}",h+1).replace("{n}",r.length)}`:s)}" width="1024" height="768"${h?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
      ${l}
      <button type="button" class="g-nav g-prev" data-step="-1" aria-label="${e(i.prev)}">${m("chevron",22)}</button>
      <button type="button" class="g-nav g-next" data-step="1" aria-label="${e(i.next)}">${m("chevron",22)}</button>
      <span class="g-count" aria-hidden="true"><b data-g-i>1</b> / ${r.length}</span>
    </div>
    <ul class="g-thumbs">${r.map((d,h)=>`<li><a href="#g-${h+1}" data-go="${h}"${h?"":' aria-current="true"'} aria-label="${e(i.photo.replace("{i}",h+1).replace("{n}",r.length))}"><img sizes="auto, 120px" src="${e(j(n,d))}" alt="" width="1024" height="768" loading="lazy"></a></li>`).join("")}</ul>
  </figure>
  <dialog class="lightbox" data-lightbox aria-label="${e(s)}">
    <img src="" alt="${e(s)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(i.close)}">\u2715</button>
    <button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(i.prev)}">${m("chevron",26)}</button>
    <button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(i.next)}">${m("chevron",26)}</button>
    <span class="g-count"><b data-lb-i>1</b> / ${r.length}</span>
  </dialog>`}function Je({site:a,t,L:n,market:o}){let r=a.contact;return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${E(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      <li>${e(n(r.address))}</li></ul></div>
    ${a.social?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${Object.entries(a.social).filter(([,i])=>i).map(([i,s])=>`<li><a href="${e(s)}" target="_blank" rel="noopener">${e(i==="tiktok"?"TikTok":i==="youtube"?"YouTube":i[0].toUpperCase()+i.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${ue(a,t,o.lang)}</div>
</footer>`}function Ze({site:a,market:t,L:n,abs:o,items:r}){var i,s,l;return{"@context":"https://schema.org","@type":"BikeStore",name:a.name,url:o(`${t.id}/`),image:o(A((l=(i=a.heroImages)==null?void 0:i[0])!=null?l:(s=r[0])==null?void 0:s.image)),description:n(a.intro),telephone:a.contact.phone,email:a.contact.email,address:{"@type":"PostalAddress",streetAddress:n(a.contact.address)},currenciesAccepted:t.currency,openingHoursSpecification:ne(a.hours)}}var Ye=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});function Xe({site:a,market:t,L:n,abs:o,productPath:r,cat:i},s){var l,p,d;return{"@context":"https://schema.org","@type":"Product",name:n(s.name),description:n(s.description),image:[s.image,...(l=s.images)!=null?l:[]].map(h=>o(A(h))),url:o(r(s,t)),category:n((p=i(s))==null?void 0:p.name),...(d=s.colors)!=null&&d.length?{color:s.colors.map(h=>n(h.name)).join(", ")}:{},offers:s.variants.map(h=>({"@type":"Offer",name:[n(s.name),n(h.size)].filter(Boolean).join(" \u2013 "),price:h.price,priceCurrency:t.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:a.name}}))}}function Qe({market:a,L:t,abs:n,productPath:o,t:r,cat:i},s){var l;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:n(`${a.id}/`)},{"@type":"ListItem",position:2,name:t((l=i(s))==null?void 0:l.name),item:n(`${a.id}/?type=${s.category}`)},{"@type":"ListItem",position:3,name:t(s.name),item:n(o(s,a))}]}}export{ht as renderSite};
