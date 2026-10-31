var Me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>Me[t]);function U(a,t,n="vi"){var o,r,s;return a==null?"":typeof a!="object"?String(a):(s=(r=(o=a[t])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?s:""}var De={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},R=a=>{var t;return(t=De[a])!=null?t:"en-US"};function Se(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function Z(a,t){var o,r;if(t.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:Se(a.basePrice*t.rate,t.rounding)}var qe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function Y(a,t){let n={style:"currency",currency:t.currency};return qe.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(R(t.lang),n).format(a)}function ee(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var F=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,E=(a,t)=>{let n=F(t);return n==null?t:a(n)},V=(a="")=>String(a).replace(/\D/g,"");function W(a,t,n=""){switch(a){case"phone":return`tel:${V(t.phone)}`;case"zalo":return`https://zalo.me/${V(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${V(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var O=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,Pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function te(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,s]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();Pe.includes(i)&&(o[i]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var _={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Ne={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},f=(a,t=20,n="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=Ne[a])!=null?o:""}</svg>`},K=[1,2,3,4,5,6,0],ze=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function oe(a,t){let n=a.map(r=>K.indexOf(r)).sort((r,s)=>r-s);return n.every((r,s)=>s===0||r===n[s-1]+1)&&n.length>2?`${t[K[n[0]]]} \u2013 ${t[K[n.at(-1)]]}`:n.map(r=>t[K[r]]).join(", ")}var re=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>ze[n]),opens:t.open,closes:t.close}));function ie(a){var n,o;return(o=(n=new Intl.NumberFormat(R(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var Q=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',se=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,le=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},ae={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},je=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Ce=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&je.test(n.hostname)?n.href:""}catch{return""}},ce=(a,t,n,o="btn btn--line")=>{var i;let r=Ce(a);if(!r)return"";let s=typeof t.reviews=="object"&&((i=t.reviews)==null?void 0:i.google)||ae[n]||ae.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${f("star",16)} ${e(s)}</a></p>`},J={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},de={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},pe=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function he(a,t){var s,i,l;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((l=de[t])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function Te(a,t){var i,l;let n=a.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let o=n.reduce((c,u)=>c+Number(u.rating),0)/n.length,r=(i=J[t])!=null?i:J.en,s=new Intl.NumberFormat((l=de[t])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${f("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function ue(a,t,n,o){var i;if(!a.length)return"";let r=(i=J[t])!=null?i:J.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${f("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Te(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${Re}`}var Re=`<style>
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
upd()}})()<\/script>`,ne={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function me(a){var o;let t=(o=ne[a])!=null?o:ne.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${f("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${f("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${f("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var ge=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function fe({site:a,markets:t,url:n,abs:o}){var i;let r=(i=t.find(l=>l.default))!=null?i:t[0],s=t.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
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
  var markets = ${JSON.stringify(s)}, root = ${JSON.stringify(n(""))};
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
`}var Ee="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap",ye=24;function be(a,t){var n;return((n=a.products)!=null?n:[]).map(o=>{var c,u;let r=((c=o.tiers)!=null?c:[]).map(p=>({qty:Number(p.qty),price:Z({basePrice:p.price,prices:p.prices},t)})).filter(p=>p.qty>0&&p.price!=null).sort((p,m)=>p.qty-m.qty);if(!r.length)return null;let s=(p,m)=>{var h;return Number(p)&&(h=Z({basePrice:Number(p),prices:m},t))!=null?h:0},i=((u=o.finishes)!=null?u:[]).map(p=>({...p,unitPrice:s(p.unit,p.unitPrices),setupPrice:s(p.setup,p.setupPrices)})),l=p=>p.price/p.qty;return{...o,tiers:r,finishes:i,from:r[0].price,low:l(r[r.length-1]),high:l(r[0])}}).filter(Boolean)}var Le=a=>String(a).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase(),Be=a=>String(a!=null?a:"").split(`
`).map(t=>t.trim()).filter(Boolean),$e=a=>a<=100?"small":a<=500?"mid":"big",ke=a=>a<=1?"d1":a<=3?"d3":"d7";function ut({site:a,catalog:t,i18n:n,template:o,basePath:r="/",siteUrl:s=a.domain}){var v,$,x,k;let i=ee(r),l=b=>new URL(i(b),s).href,c=t.markets,u=(b,M)=>`${M.id}/${U(b.slug,M.lang,"en")}/`,p=te(a.quoteForm),m=p&&!p.error?p:null,h=[];for(let b of c){let M=b.lang,N=($=(v=n[M])!=null?v:n.en)!=null?$:n.vi,z=d=>U(d,M,"en"),q=be(t,b),j=(k=(x=a.quoteChannels)==null?void 0:x[b.id])!=null?k:["email"],P={site:a,catalog:t,market:b,markets:c,lang:M,t:N,L:z,url:i,abs:l,channels:j,money:d=>Y(d,b),unitMoney:d=>d<1&&b.currency!=="VND"?new Intl.NumberFormat(R(M),{style:"currency",currency:b.currency,maximumFractionDigits:3}).format(d):Y(Math.round(d*100)/100,b),items:q,productPath:u,template:o,name:(d,g)=>{var w,D;return z((D=(w=d==null?void 0:d.find(L=>L.id===g))==null?void 0:w.name)!=null?D:g)},cat:d=>{var g;return((g=t.categories)!=null?g:[]).find(w=>w.id===d.category)},gform:m};h.push({path:`${b.id}/index.html`,html:ve(P,{kind:"home"})});for(let d of q)h.push({path:`${u(d,b)}index.html`,html:ve(P,{kind:"product",product:d})})}return h.push({path:"index.html",html:fe({site:a,markets:c,url:i,abs:l})}),h}function ve(a,t){var P,d,g,w,D,L,G,H,X;let{site:n,market:o,markets:r,lang:s,t:i,L:l,url:c,abs:u,catalog:p,productPath:m,channels:h}=a,v=t.kind==="home",$=t.product,x=v?`${o.id}/`:m($,o),k=v?`${n.name} \xB7 ${l(n.tagline)}`:`${l($.name)} \xB7 ${n.name}`,b=v?l(n.intro):`${l($.description)} ${i.card.from.replace("{price}",a.money($.from)).replace("{qty}",$.tiers[0].qty)}.`,M=r.map(y=>{var A;return v?{m:y,href:`${y.id}/`}:be({products:[((A=p.products)!=null?A:[]).find(I=>I.id===$.id)]},y).length?{m:y,href:m($,y)}:null}).filter(Boolean),N=y=>{var A,I;return(I=(A=M.find(we=>we.m.id===y.id))==null?void 0:A.href)!=null?I:`${y.id}/`},z=(P=r.find(y=>y.default))!=null?P:r[0],q=(d=n.theme)!=null?d:{},j=["primary","ink","bg","surface","soft","accent"].filter(y=>q[y]).map(y=>`--${y}:${q[y]}`).join(";"),S=r.map(y=>({id:y.id,lang:y.lang,country:y.country,currency:y.currency,href:c(N(y))})),C=h[0],T=(g=n.contact)!=null?g:{},B=u(F(v?n.heroImage||((w=a.items[0])==null?void 0:w.image):$.image));return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(k)}</title>
<meta name="description" content="${e(b)}">
<link rel="canonical" href="${u(x)}">
${M.map(({m:y,href:A})=>`<link rel="alternate" hreflang="${e(y.lang)}-${e(y.country)}" href="${u(A)}">`).join(`
`)}
${M.some(y=>y.m.id===z.id)?`<link rel="alternate" hreflang="x-default" href="${u(N(z))}">`:""}
<meta property="og:type" content="${v?"website":"product"}">
<meta property="og:title" content="${e(k)}">
<meta property="og:description" content="${e(b)}">
<meta property="og:url" content="${u(x)}">
<meta property="og:image" content="${e(B)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((D=q.bg)!=null?D:"#F3F4F6")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ee}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${j}}</style>
${v?O(Ye(a))+(((L=n.faq)!=null?L:[]).length?O(Qe(a)):""):O(Xe(a,$))+O(et(a,$))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(o.id)}" data-markets='${e(JSON.stringify(S))}' data-copied="${e(i.copied)}" data-wa="${e(V((G=T.whatsapp)!=null?G:""))}" data-email="${e((H=T.email)!=null?H:"")}" data-tz="${e((X=n.timezone)!=null?X:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(i.skip)}</a>
${se(i)}
${Ae(a,v)}
<main id="main">
${v?[Ve,Fe,Oe,Ge,He,Ie,Ue,We,_e].map(y=>y(a)).join(`
`):Ke(a,$)}
</main>
${Ze(a)}
<nav class="dock" aria-label="${e(i.nav.quote)}">
  <a href="${v?"":c(`${o.id}/`)}#catalog">${f("layers",20)}<span>${e(i.nav.products)}</span></a>
  <a class="primary" href="${e(v?W(C,T,i.quote.generic):"#quote")}" ${v?Q(C):""}>${f(v?C:"doc",20)}<span>${e(i.nav.quote)}</span></a>
</nav>
</body>
</html>
`}function Ae({site:a,market:t,markets:n,t:o,url:r},s){var u;let i=s?"":r(`${t.id}/`),l=[[`${i}#catalog`,o.nav.products],[`${i}#capacity`,o.nav.capacity],[`${i}#process`,o.nav.process],[`${i}#files`,o.nav.files],[`${i}#contact`,o.nav.contact]],c=(u=a.contact)!=null?u:{};return`<header class="header">
  <div class="topline"><div class="wrap topline-in">
    ${c.phone?`<a href="tel:${V(c.phone)}">${f("phone",14)} ${e(c.phone)}</a>`:""}
    ${c.email?`<a href="mailto:${e(c.email)}">${f("email",14)} ${e(c.email)}</a>`:""}
    <span class="hide-sm">${f("clock",14)} ${e(o.nav.reply)}</span>
  </div></div>
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(E(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${f("printer",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${l.map(([p,m])=>`<a href="${p}">${e(m)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${f("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(ie(t))}</span></span></summary>
        <ul>${n.map(p=>`<li><a href="${r(`${p.id}/`)}" hreflang="${e(p.lang)}"${p.id===t.id?' aria-current="true"':""}>${e(p.country)} \xB7 ${e(p.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="${i}#catalog">${f("doc",16)} ${e(o.nav.quote)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${f("menu",22)}</summary>
        <nav aria-label="Menu">${l.map(([p,m])=>`<a href="${p}">${e(m)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Ve({site:a,t,L:n,url:o,items:r}){var l,c;let s=((l=a.stats)!=null?l:[]).filter(u=>n(u==null?void 0:u.value)).slice(0,3),i=a.heroImage||((c=r[0])==null?void 0:c.image);return`<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${n(a.heroKicker)?`<p class="kicker">${e(n(a.heroKicker))}</p>`:""}
      <h1>${e(n(a.tagline))}</h1>
      <p class="lead">${e(n(a.intro))}</p>
      <div class="actions">
        <a class="btn btn--accent btn--lg" href="#catalog">${f("doc",18)} ${e(t.hero.quote)}</a>
        <a class="btn btn--line btn--lg" href="#files">${f("check",18)} ${e(t.hero.files)}</a>
      </div>
      ${s.length?`<dl class="stats">${s.map(u=>`<div><dt>${e(n(u.label))}</dt><dd>${e(n(u.value))}</dd></div>`).join("")}</dl>`:""}
    </div>
    ${i?`<figure class="hero-fig"><img src="${e(E(o,i))}" alt="" width="1200" height="900" fetchpriority="high">${n(a.heroBadge)?`<figcaption><span class="dot"></span>${e(n(a.heroBadge))}</figcaption>`:""}</figure>`:""}
  </div>
</section>`}function xe(a,t,n=0){var b,M,N,z,q,j,S,C,T,B,P,d,g;let{t:o,L:r,url:s,money:i,unitMoney:l,productPath:c,market:u,catalog:p,name:m,cat:h}=a,v=[r(t.name),(b=t.name)==null?void 0:b.vi,(M=t.name)==null?void 0:M.en,r((N=h(t))==null?void 0:N.name),(q=(z=h(t))==null?void 0:z.name)==null?void 0:q.vi,m(p.methods,t.method),...((j=t.specs)!=null?j:[]).map(w=>r(w[1]))].filter(Boolean).join(" "),$=((S=t.specs)!=null?S:[]).slice(0,2),x=t.tiers[t.tiers.length-1],k=((C=t.finishes)!=null?C:[]).map(w=>w.id).join(" ");return`<li class="card${n>=ye?" is-more":""}" data-type="${e(t.category)}" data-method="${e((T=t.method)!=null?T:"")}" data-finish="${e(k)}" data-days="${ke((B=t.days)!=null?B:5)}" data-minq="${$e(t.tiers[0].qty)}" data-price="${t.low}" data-fast="${(P=t.days)!=null?P:5}" data-name="${e(Le(v))}">
  <a class="card-link" href="${s(c(t,u))}">
    <div class="card-img">
      <img sizes="${_.card}" src="${e(E(s,t.image))}" alt="${e(r(t.name))}" width="1000" height="750" loading="lazy">
      ${r(t.badge)?`<span class="tag">${e(r(t.badge))}</span>`:""}
      <span class="days">${f("truck",13)} ${e(o.card.days.replace("{n}",(d=t.days)!=null?d:5))}</span>
    </div>
    <div class="card-body">
      <p class="card-cat">${e(r((g=h(t))==null?void 0:g.name))} \xB7 ${e(m(p.methods,t.method))}</p>
      <h3>${e(r(t.name))}</h3>
      ${$.length?`<dl class="mini">${$.map(([w,D])=>`<div><dt>${e(r(w))}</dt><dd>${e(r(D))}</dd></div>`).join("")}</dl>`:""}
      <p class="card-price"><span>${e(o.card.from.replace("{price}","").replace("{qty}",t.tiers[0].qty.toLocaleString(R(u.lang))).trim())}</span> <b>${e(i(t.from))}</b></p>
      <p class="card-unit">${e(o.card.unitAt.replace("{qty}",x.qty.toLocaleString(R(u.lang))).replace("{price}",l(x.price/x.qty)))}</p>
    </div>
  </a>
</li>`}function Fe(a){var c,u,p;let{items:t,catalog:n,t:o,L:r}=a,s=(m,h,v,$)=>{let x=v.map(k=>({...k,n:t.filter(b=>$(b,k.id)).length})).filter(k=>k.n);return x.length<2?"":`<fieldset class="fgroup"><legend>${e(h)}</legend>${x.map(k=>`<label class="fopt"><input type="checkbox" value="${e(k.id)}" data-f="${m}"> <span>${e(typeof k.name=="string"?k.name:r(k.name))}</span><small>${k.n}</small></label>`).join("")}</fieldset>`},i=[["d1",o.filter.d1],["d3",o.filter.d3],["d7",o.filter.d7]].map(([m,h])=>({id:m,name:h})),l=[["small",o.filter.small],["mid",o.filter.mid],["big",o.filter.big]].map(([m,h])=>({id:m,name:h}));return`<section class="section cat-sec" id="catalog" aria-labelledby="cat-title">
  <div class="wrap shop">
    <aside class="side" id="filters" data-side aria-label="${e(o.filter.title)}">
      <div class="side-head"><p class="side-title">${f("filter",18)} ${e(o.filter.title)}</p><button type="button" class="side-x" data-side-close aria-label="${e(o.filter.close)}">\u2715</button></div>
      ${s("type",o.filter.type,(c=n.categories)!=null?c:[],(m,h)=>m.category===h)}
      ${s("method",o.filter.method,(u=n.methods)!=null?u:[],(m,h)=>m.method===h)}
      ${s("finish",o.filter.finish,(p=n.finishes)!=null?p:[],(m,h)=>{var v;return((v=m.finishes)!=null?v:[]).some($=>$.id===h)})}
      ${s("days",o.filter.days,i,(m,h)=>{var v;return ke((v=m.days)!=null?v:5)===h})}
      ${s("minq",o.filter.minq,l,(m,h)=>$e(m.tiers[0].qty)===h)}
      <div class="side-foot"><button type="button" class="link" data-reset>${e(o.filter.reset)}</button><button type="button" class="btn btn--accent" data-side-close data-show-tpl="${e(o.filter.show)}">${e(o.filter.show.replace("{n}",t.length))}</button></div>
      ${r(a.site.customText)?`<div class="side-note">${f("chat",18)}<p>${e(r(a.site.customText))}</p></div>`:""}
    </aside>
    <div class="shop-main">
      <div class="shop-head"><h2 id="cat-title" class="h2">${e(o.catalog.title)}</h2><p class="muted" data-count="${e(o.catalog.count)}">${e(o.catalog.count.replace("{n}",t.length))}</p></div>
      <div class="toolbar">
        <button type="button" class="btn btn--line filter-btn" data-side-open aria-controls="filters">${f("filter",18)} ${e(o.filter.title)} <b data-nsel hidden></b></button>
        <label class="search">${f("search",18)}<input type="search" placeholder="${e(o.catalog.search)}" aria-label="${e(o.catalog.search)}" data-search></label>
        <label class="select"><span>${e(o.catalog.sort)}</span><select data-sort>
          <option value="">${e(o.catalog.sortPop)}</option><option value="asc">${e(o.catalog.sortUnit)}</option><option value="fast">${e(o.catalog.sortFast)}</option>
        </select></label>
      </div>
      <ul class="chosen" data-chosen hidden></ul>
      <ul class="grid" data-grid>${t.map((m,h)=>xe(a,m,h)).join("")}</ul>
      <p class="empty muted" data-empty hidden>${e(o.catalog.empty)} <button type="button" class="link" data-reset>${e(o.filter.reset)}</button></p>
      ${t.length>ye?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(o.catalog.more)}</button></div>`:""}
    </div>
  </div>
</section>`}function Oe({site:a,t,L:n,url:o}){var s;let r=((s=a.machines)!=null?s:[]).filter(i=>n(i==null?void 0:i.name));return r.length?`<section class="section section--ink" id="capacity" aria-labelledby="cap-title">
  <div class="wrap">
    <div class="sec-head sec-head--left"><p class="kicker">${e(t.capacity.kicker)}</p><h2 id="cap-title" class="h2">${e(t.capacity.title)}</h2>${n(a.clients)?`<p class="lead">${e(n(a.clients))}</p>`:""}</div>
    <ul class="machines">${r.map(i=>`<li>
      ${i.image?`<img sizes="${_.card}" src="${e(E(o,i.image))}" alt="" width="900" height="675" loading="lazy">`:""}
      <div><b>${e(n(i.name))}</b>${n(i.spec)?`<code>${e(n(i.spec))}</code>`:""}${n(i.text)?`<p>${e(n(i.text))}</p>`:""}</div>
    </li>`).join("")}</ul>
  </div>
</section>`:""}function Ge({site:a,t,L:n}){var r;let o=((r=a.steps)!=null?r:[]).filter(s=>n(s==null?void 0:s.title));return o.length?`<section class="section" id="process" aria-labelledby="pr-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.process.kicker)}</p><h2 id="pr-title" class="h2">${e(t.process.title)}</h2></div>
    <ol class="steps">${o.map((s,i)=>{var l;return`<li><span class="num">${String(i+1).padStart(2,"0")}</span>${f((l=s.icon)!=null?l:"check",22)}<b>${e(n(s.title))}</b><p>${e(n(s.text))}</p></li>`}).join("")}</ol>
  </div>
</section>`:""}function He({site:a,t,L:n}){let o=Be(n(a.fileRules));return o.length?`<section class="section section--soft" id="files" aria-labelledby="fr-title">
  <div class="wrap files">
    <div class="bleed" aria-hidden="true"><div class="bleed-paper"><div class="bleed-trim"><div class="bleed-safe"><span>${e(t.files.safe)}</span></div></div></div>
      <ul class="bleed-key"><li><i class="k1"></i>${e(t.files.bleed)}</li><li><i class="k2"></i>${e(t.files.trim)}</li><li><i class="k3"></i>${e(t.files.safe)}</li></ul></div>
    <div>
      <p class="kicker">${e(t.files.kicker)}</p>
      <h2 id="fr-title" class="h2">${e(t.files.title)}</h2>
      <p class="lead">${e(t.files.text)}</p>
      <ul class="rules">${o.map(r=>`<li><label><input type="checkbox"> <span>${e(r)}</span></label></li>`).join("")}</ul>
    </div>
  </div>
</section>`:""}function Ie({site:a,t,L:n,url:o}){var s;let r=((s=a.papers)!=null?s:[]).filter(i=>n(i==null?void 0:i.name));return r.length?`<section class="section" id="papers" aria-labelledby="pp-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.papers.kicker)}</p><h2 id="pp-title" class="h2">${e(t.papers.title)}</h2><p class="lead">${e(t.papers.text)}</p></div>
    <ul class="paper">${r.map(i=>{var l;return`<li>${i.image?`<img sizes="${_.card}" src="${e(E(o,i.image))}" alt="" width="900" height="675" loading="lazy">`:""}<div><b>${e(n(i.name))}</b>${i.gsm?`<code>${e(i.gsm)} gsm</code>`:""}<p>${e((l=n(i.text))!=null?l:"")}</p></div></li>`}).join("")}</ul>
  </div>
</section>`:""}function Ue({site:a,t,L:n,lang:o}){let r=ce(a,t,o,"btn btn--line"),s=pe(a);return a.showReviews===!1||!s.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${ue(s,o,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(l,c)=>`<span class="${c<i.rating?"on":""}">${f("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(i.text))}</blockquote>
      <figcaption>${e(i.name)}${n(i.bought)?`<small>${e(n(i.bought))}</small>`:""}${he(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function We({site:a,t,L:n}){var r;let o=((r=a.faq)!=null?r:[]).filter(s=>n(s==null?void 0:s.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${o.map((s,i)=>`<details${i===0?" open":""}><summary>${e(n(s.q))}</summary><p>${e(n(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function _e({site:a,t,L:n,channels:o}){var l,c,u;let r=(l=a.contact)!=null?l:{},s=encodeURIComponent((c=r.mapQuery)!=null?c:n(r.address)),i=p=>p.length===7?t.visit.everyDay:oe(p,t.days);return`<section class="section section--ink" id="contact" aria-labelledby="ct-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="ct-title" class="h2">${e(t.visit.title)}</h2>
      ${n(r.address)?`<p class="addr">${f("pin",18)} ${e(n(r.address))}</p>`:""}
      ${le(a,t)}
      ${((u=a.hours)!=null?u:[]).length?`<table class="hours"><tbody>${a.hours.map(p=>`<tr><th scope="row">${e(i(p.days))}</th><td>${e(p.open)} \u2013 ${e(p.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <div class="actions">
        ${o.map((p,m)=>{var h;return`<a class="btn ${m?"btn--line":"btn--accent"}" href="${e(W(p,r,t.quote.generic))}" ${Q(p)}>${f(p,18)} ${e((h=t.via[p])!=null?h:p)}</a>`}).join("")}
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(t.visit.directions)}</a>
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ke(a,t){var C,T,B,P;let{site:n,t:o,L:r,url:s,money:i,unitMoney:l,market:c,items:u,channels:p,cat:m,gform:h,catalog:v,name:$}=a,x=m(t),k=s(`${c.id}/`),b=[...u.filter(d=>d.id!==t.id&&d.category===t.category),...u.filter(d=>d.id!==t.id&&d.method===t.method)].filter((d,g,w)=>w.indexOf(d)===g).slice(0,4),M=o.quote.text.replace("{product}",r(t.name)).replace(/\{\w+\}/g,"\u2026"),N=(C=n.rush)!=null?C:{},z=h?` data-gform="${e(h.action)}" data-gmap='${e(JSON.stringify(h.fields))}'`:"",q=d=>p.map((g,w)=>{var D,L;return`<button type="submit" class="btn ${d!=null?d:w?"btn--line":"btn--accent"} btn--lg" data-channel="${e(g)}" data-href="${e(W(g,(D=n.contact)!=null?D:{},M))}">${f(g,18)} ${e(g==="phone"?o.quote.call:o.quote.send.replace("{channel}",(L=o.via[g])!=null?L:g))}</button>`}).join(""),j=(d,g,w)=>(g!=null?g:[]).length>1?`<fieldset class="opts"><legend>${e(w)}</legend><div class="seg">${g.map((D,L,G)=>`<label><input type="radio" name="${d}" value="${e(r(D.label))}" data-mult="${Number(D.mult)||1}"${L===Math.max(0,G.findIndex(H=>(Number(H.mult)||1)===1))?" checked":""}><span>${e(r(D.label))}${Number(D.mult)>1?`<small>+${Math.round((D.mult-1)*100)}%</small>`:""}</span></label>`).join("")}</div></fieldset>`:(g!=null?g:[]).length===1?`<input type="hidden" name="${d}" value="${e(r(g[0].label))}" data-mult="${Number(g[0].mult)||1}">`:"",S={tiers:t.tiers,min:Number(t.minQty)||t.tiers[0].qty,days:(T=t.days)!=null?T:5,rushMult:Number(N.mult)||0,rushDays:Number(N.days)||0};return`<div class="wrap crumbs"><a href="${k}">${e(o.nav.home)}</a>${f("chevron",14)}<a href="${k}?type=${e(t.category)}#catalog">${e(r(x==null?void 0:x.name))}</a>${f("chevron",14)}<span aria-current="page">${e(r(t.name))}</span></div>
<section class="wrap pdp">
  <div class="pdp-left">
    ${Je(a,t)}
    ${((B=t.specs)!=null?B:[]).length?`<div class="spec"><h2 class="h4">${f("ruler",18)} ${e(o.product.specs)}</h2><table><tbody>${t.specs.map(([d,g])=>`<tr><th scope="row">${e(r(d))}</th><td>${e(r(g))}</td></tr>`).join("")}<tr><th scope="row">${e(o.filter.method)}</th><td>${e($(v.methods,t.method))}</td></tr></tbody></table></div>`:""}
  </div>
  <div class="pdp-info">
    <p class="kicker">${e(r(x==null?void 0:x.name))}</p>
    <h1 class="pdp-title">${e(r(t.name))}</h1>
    <p class="lead">${e(r(t.description))}</p>
    <div class="tiers"><h2 class="h4">${f("layers",18)} ${e(o.product.tiers)}</h2>
      <table class="tier-table"><thead><tr><th scope="col">${e(o.product.qty)}</th><th scope="col">${e(o.product.total)}</th><th scope="col">${e(o.product.unit)}</th></tr></thead>
      <tbody>${t.tiers.map((d,g)=>`<tr data-tier="${d.qty}"><th scope="row">${d.qty.toLocaleString(R(c.lang))}</th><td>${e(i(d.price))}</td><td>${e(l(d.price/d.qty))}${g?` <small class="save">\u2212${Math.round((1-d.price/d.qty/(t.tiers[0].price/t.tiers[0].qty))*100)}%</small>`:""}</td></tr>`).join("")}</tbody></table>
      ${r(n.vatNote)?`<p class="muted small">${e(r(n.vatNote))}</p>`:""}
    </div>
    <form class="order" id="quote" data-quote${z} data-cfg='${e(JSON.stringify(S))}' data-name="${e(r(t.name))}" data-text="${e(o.quote.text)}" data-market="${e(`${c.id.toUpperCase()} \xB7 ${c.currency}`)}"
      data-currency="${e(c.currency)}" data-lang="${e(c.lang)}" data-locale="${e(R(c.lang))}" novalidate>
      <div class="order-fields">
        <h2 class="h3">${e(o.product.configure)}</h2>
        ${j("size",t.sizes,o.product.size)}
        ${j("paper",t.papers,o.product.paper)}
        ${j("sides",t.sides,o.product.sides)}
        ${((P=t.finishes)!=null?P:[]).length?`<fieldset class="opts"><legend>${e(o.product.finish)}</legend><div class="fins">${t.finishes.map(d=>`<label class="check"><input type="checkbox" name="finish" value="${e(r(d.label))}" data-unit="${d.unitPrice}" data-setup="${d.setupPrice}"> <span>${e(r(d.label))}</span><small>${d.unitPrice?`+ ${e(l(d.unitPrice))} / ${e(o.product.pc)}`:""}${d.setupPrice?` + ${e(i(d.setupPrice))}`:""}</small></label>`).join("")}</div></fieldset>`:""}
        <fieldset class="opts"><legend>${e(o.product.qty)}</legend>
          <div class="seg seg--qty">${t.tiers.map((d,g)=>`<label><input type="radio" name="tier" value="${d.qty}"${g?"":" checked"}><span>${d.qty.toLocaleString(R(c.lang))}</span></label>`).join("")}<label><input type="radio" name="tier" value="custom"><span>${e(o.product.other)}</span></label></div>
          <label class="custom" data-custom hidden><span class="sr">${e(o.product.qty)}</span><input name="qty" type="number" min="${S.min}" step="50" inputmode="numeric" placeholder="${e(o.product.minQty.replace("{n}",S.min))}"></label>
          <p class="hint hint--warn" data-min-note data-tpl="${e(o.product.minQty)}" hidden></p>
        </fieldset>
        ${S.rushMult?`<label class="check rush"><input type="checkbox" name="rush" value="1"> <span>${e(o.product.rush.replace("{n}",Math.round((S.rushMult-1)*100)).replace("{d}",S.rushDays))}</span></label>`:""}
        <dl class="sum">
          <div><dt>${e(o.product.base)}</dt><dd data-s-base>\u2014</dd></div>
          <div data-r-fin hidden><dt>${e(o.product.finish)}</dt><dd data-s-fin></dd></div>
          <div data-r-rush hidden><dt>${e(o.product.rushShort)}</dt><dd data-s-rush></dd></div>
          <div class="sum-total"><dt>${e(o.product.estimate)}</dt><dd data-s-total>\u2014</dd></div>
          <div><dt>${e(o.product.unit)}</dt><dd data-s-unit>\u2014</dd></div>
          <div><dt>${f("truck",15)} ${e(o.product.ready)}</dt><dd data-s-date data-tpl="${e(o.product.readyTpl)}">\u2014</dd></div>
        </dl>
        <div class="fields">
          <label><span>${e(o.quote.company)}</span><input name="company" autocomplete="organization" maxlength="120"></label>
          <label><span>${e(o.quote.tax)}</span><input name="tax" maxlength="30"></label>
          <label><span>${e(o.quote.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label><span>${e(o.quote.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          <label class="wide"><span>${e(o.quote.email)}</span><input name="email" type="email" autocomplete="email" maxlength="120"></label>
          <label class="wide"><span>${e(o.quote.file)}</span><input name="file" type="url" inputmode="url" placeholder="${e(o.quote.fileHint)}" maxlength="400"></label>
          <label class="wide"><span>${e(o.quote.note)}</span><textarea name="note" rows="2" maxlength="500" placeholder="${e(o.quote.noteHint)}"></textarea></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <p class="form-err" data-err hidden>${e(o.quote.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--accent btn--lg btn--full" data-submit>${f("doc",18)} ${e(o.quote.submit)}</button></div>
        <p class="muted small">${f("lock",14)} ${e(o.quote.after)}</p>
      </div>
      <div class="done${h?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${f(h?"check":"arrow",22)} ${e(h?o.quote.done:o.quote.stepTitle)}</p>
        <p>${e(h?o.quote.doneText:o.quote.stepText)}</p>
        <div class="buy">${q(h?"btn--line":void 0)}</div>
        ${h?"":`<button type="button" class="link back" data-edit>${e(o.quote.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
    ${me(c.lang)}
  </div>
</section>
${b.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${e(o.product.related)}</h2>
  <ul class="grid grid--related">${b.map(d=>xe(a,d)).join("")}</ul>
</div></section>`:""}`}function Je({t:a,L:t,url:n},o){var i;let r=[o.image,...(i=o.images)!=null?i:[]],s=t(o.name);return r.length===1?`<figure class="pdp-img"><img src="${e(E(n,o.image))}" alt="${e(s)}" width="1000" height="750" fetchpriority="high"></figure>`:`<figure class="pdp-img gallery" data-gallery>
    <img class="g-main" src="${e(E(n,o.image))}" alt="${e(s)}" width="1000" height="750" fetchpriority="high" data-g-main>
    <ul class="g-thumbs">${r.map((l,c)=>`<li><button type="button" data-g-src="${e(E(n,l))}"${c?"":' aria-current="true"'} aria-label="${e(a.gallery.photo.replace("{i}",c+1).replace("{n}",r.length))}"><img src="${e(E(n,l))}" alt="" width="1000" height="750" loading="lazy"></button></li>`).join("")}</ul>
  </figure>`}function Ze({site:a,t,L:n,market:o}){var i,l;let r=(i=a.contact)!=null?i:{},s=Object.entries((l=a.social)!=null?l:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p>${n(a.legalName)?`<p class="muted small">${e(n(a.legalName))}</p>`:""}</div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${V(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${s.map(([c,u])=>`<li><a href="${e(u)}" target="_blank" rel="noopener">${e(c==="linkedin"?"LinkedIn":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${ge(a,t,o.lang)}</div>
</footer>`}function Ye({site:a,market:t,L:n,abs:o,items:r}){var i,l,c;let s=(i=a.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"LocalBusiness",additionalType:"https://schema.org/ProfessionalService",name:a.name,url:o(`${t.id}/`),image:o(F(a.heroImage||((l=r[0])==null?void 0:l.image))),description:n(a.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:n(s.address)},openingHoursSpecification:re((c=a.hours)!=null?c:[])}}var Qe=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});function Xe({site:a,market:t,L:n,abs:o,productPath:r,cat:s},i){var l,c;return{"@context":"https://schema.org","@type":"Product",name:n(i.name),description:n(i.description),image:[i.image,...(l=i.images)!=null?l:[]].map(u=>o(F(u))),url:o(r(i,t)),category:n((c=s(i))==null?void 0:c.name),offers:{"@type":"AggregateOffer",lowPrice:i.tiers[0].price,highPrice:i.tiers[i.tiers.length-1].price,offerCount:i.tiers.length,priceCurrency:t.currency,seller:{"@type":"Organization",name:a.name}}}}function et({market:a,L:t,abs:n,productPath:o,t:r,cat:s},i){var l;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:n(`${a.id}/`)},{"@type":"ListItem",position:2,name:t((l=s(i))==null?void 0:l.name),item:n(`${a.id}/?type=${i.category}`)},{"@type":"ListItem",position:3,name:t(i.name),item:n(o(i,a))}]}}export{ut as renderSite};
