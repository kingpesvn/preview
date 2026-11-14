var se={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t=(a="")=>String(a).replace(/[&<>"']/g,n=>se[n]);function B(a,n,e="vi"){var o,r,s;return a==null?"":typeof a!="object"?String(a):(s=(r=(o=a[n])!=null?o:a[e])!=null?r:Object.values(a)[0])!=null?s:""}var ie={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},V=a=>{var n;return(n=ie[a])!=null?n:"en-US"};function le(a,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(a)-.01);let e=Number(n)||1;return Math.max(e,Math.round(a/e)*e)}function I(a,n){var o,r;if(n.default)return a.basePrice;let e=(r=(o=a.prices)==null?void 0:o[n.id])!=null?r:{mode:"auto"};return e.mode==="hidden"?null:e.mode==="manual"?e.amount:le(a.basePrice*n.rate,n.rounding)}var ce=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function U(a,n){let e={style:"currency",currency:n.currency};return ce.has(n.currency)&&(e.maximumFractionDigits=0),new Intl.NumberFormat(V(n.lang),e).format(a)}function W(a="/"){let n=a.endsWith("/")?a:`${a}/`;return(e="")=>n+String(e).replace(/^\//,"")}var C=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,z=(a,n)=>{let e=C(n);return e==null?n:a(e)},x=(a="")=>String(a).replace(/\D/g,"");function T(a,n,e=""){switch(a){case"phone":return`tel:${x(n.phone)}`;case"zalo":return`https://zalo.me/${x(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${x(n.whatsapp)}${e?`?text=${encodeURIComponent(e)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${e?`?subject=${encodeURIComponent(e)}`:""}`;default:return"#"}}var F=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function _(a){if(!a||typeof a!="string")return null;let n;try{n=new URL(a.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let e=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!e)return{error:"not-google"};let o={};for(let[r,s]of n.searchParams){if(!/^entry\.\d+$/.test(r))continue;let c=s.trim().replace(/^\{|\}$/g,"").toLowerCase();pe.includes(c)&&(o[c]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${e[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var O={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var de={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},g=(a,n=20,e="")=>{var o;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${e}>${(o=de[a])!=null?o:""}</svg>`},R=[1,2,3,4,5,6,0],he=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function J(a,n){let e=a.map(r=>R.indexOf(r)).sort((r,s)=>r-s);return e.every((r,s)=>s===0||r===e[s-1]+1)&&e.length>2?`${n[R[e[0]]]} \u2013 ${n[R[e.at(-1)]]}`:e.map(r=>n[R[r]]).join(", ")}var Z=a=>a.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(e=>he[e]),opens:n.open,closes:n.close}));function Y(a){var e,o;return(o=(e=new Intl.NumberFormat(V(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:e.value)!=null?o:a.currency}var G=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',X=a=>`<div class="suggest" id="market-suggest" data-suggest="${t(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${t(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${t(a.market.dismiss)}">\xD7</button>
</div>`,H=(a,n)=>{var e;return`<p class="status" data-open-status data-hours='${t(JSON.stringify(a.hours))}' data-tz="${t((e=a.timezone)!=null?e:"Asia/Ho_Chi_Minh")}" data-open="${t(n.visit.open)}" data-closed="${t(n.visit.closed)}" hidden></p>`},K={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ue=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,me=a=>{var n;try{let e=new URL(String((n=a.googleReview)!=null?n:"").trim());return e.protocol==="https:"&&ue.test(e.hostname)?e.href:""}catch{return""}},Q=(a,n,e,o="btn btn--line")=>{var c;let r=me(a);if(!r)return"";let s=typeof n.reviews=="object"&&((c=n.reviews)==null?void 0:c.google)||K[e]||K.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${t(r)}" target="_blank" rel="noopener">${g("star",16)} ${t(s)}</a></p>`},E={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ee={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},te=a=>{var n;return((n=a.reviews)!=null?n:[]).filter(e=>e&&(e.name||e.text)&&!(typeof e.text=="object"&&e.text&&!Object.values(e.text).some(Boolean)&&!e.name))};function ae(a,n){var s,c,i;let e=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!e)return"";let o=new Date(Date.UTC(+e[1],+e[2]-1,+((c=e[3])!=null?c:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((i=ee[n])!=null?i:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${t(a.date)}">${t(r)}</time>`}function ge(a,n){var c,i;let e=a.filter(p=>p.rating>=1&&p.rating<=5);if(e.length<2)return"";let o=e.reduce((p,d)=>p+Number(d.rating),0)/e.length,r=(c=E[n])!=null?c:E.en,s=new Intl.NumberFormat((i=ee[n])!=null?i:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${g("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${t(r.count.replace("{n}",String(a.length)))}</span></p>`}function ne(a,n,e,o){var c;if(!a.length)return"";let r=(c=E[n])!=null?c:E.en,s=i=>`<button type="button" class="rv-btn" data-rv-${i} aria-label="${t(i==="prev"?r.prev:r.next)}">${g("arrow",18,i==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ge(a,n)}<div class="rv" data-rv data-rv-more="${t(r.more)}" data-rv-less="${t(r.less)}">
      <div class="${e} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${fe}`}var fe=`<style>
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
upd()}})()<\/script>`;var oe=(a,n,e)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${t(e==="vi"||e==="ja"?e:"en")}/?ref=badge" rel="nofollow" target="_blank">${t(n.footer.madeWith)}</a>`;function re({site:a,markets:n,url:e,abs:o}){var c;let r=(c=n.find(i=>i.default))!=null?c:n[0],s=n.map(i=>({id:i.id,lang:i.lang,country:i.country}));return`<!doctype html>
<html lang="${t(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${n.map(i=>`<link rel="alternate" hreflang="${t(i.lang)}-${t(i.country)}" href="${o(`${i.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(s)}, root = ${JSON.stringify(e(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${n.map(i=>`<a href="${e(`${i.id}/`)}">${t(i.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ve="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;600&display=swap";function Ie({site:a,catalog:n,i18n:e,template:o,basePath:r="/",siteUrl:s=a.domain}){let c=W(r),i=l=>new URL(c(l),s).href,p=n.markets,d=_(a.bookingForm),m=d&&!d.error?d:null,f=p.map(l=>{var w,M,D,S,q;let u=l.lang,v=(M=(w=e[u])!=null?w:e.en)!=null?M:e.vi,$=y=>B(y,u,"en"),L=((D=n.products)!=null?D:[]).map(y=>{var k;let N=((k=y.variants)!=null?k:[]).map(b=>({...b,price:I(b,l)})),h=N.filter(b=>b.price!=null);return{...y,variants:N,from:h.length?Math.min(...h.map(b=>b.price)):null}}).filter(y=>y.from!=null),P=(q=(S=a.bookingChannels)==null?void 0:S[l.id])!=null?q:["phone"],j={site:a,catalog:n,market:l,markets:p,lang:u,t:v,L:$,url:c,abs:i,repairs:L,channels:P,money:y=>U(y,l),template:o,gform:m};return{path:`${l.id}/index.html`,html:be(j)}});return f.push({path:"index.html",html:re({site:a,markets:p,url:c,abs:i})}),f}function be(a){var P,A,j,w,M,D,S,q,y,N;let{site:n,market:e,markets:o,lang:r,t:s,L:c,url:i,abs:p,repairs:d}=a,m=`${n.name} \xB7 ${c(n.tagline)}`,f=(P=n.theme)!=null?P:{},l=["primary","ink","bg","surface","soft","accent"].filter(h=>f[h]).map(h=>`--${h}:${f[h]}`).join(";"),u=(A=o.find(h=>h.default))!=null?A:o[0],v=o.map(h=>({id:h.id,lang:h.lang,country:h.country,currency:h.currency,href:i(`${h.id}/`)})),$=(j=n.contact)!=null?j:{},L={r:d.map(h=>({id:h.id,n:c(h.name),m:Number(h.minutes)||0,w:Number(h.warrantyDays)||0,g:h.grades!==!1,p:h.variants.map(k=>k.price)})),b:((w=n.brands)!=null?w:[]).filter(h=>h==null?void 0:h.id).map(h=>{var k;return{id:h.id,n:c(h.name),m:((k=h.models)!=null?k:[]).filter(b=>c(b==null?void 0:b.name)).map(b=>[c(b.name),Number(b.tier)||1])}}),g:((M=n.grades)!=null?M:[]).filter(h=>h==null?void 0:h.id).map(h=>({id:h.id,n:c(h.name),pct:Number(h.pct)||0}))};return`<!doctype html>
<html lang="${t(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t(m)}</title>
<meta name="description" content="${t(c(n.intro))}">
<link rel="canonical" href="${p(`${e.id}/`)}">
${o.map(h=>`<link rel="alternate" hreflang="${t(h.lang)}-${t(h.country)}" href="${p(`${h.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${u.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${t(m)}">
<meta property="og:description" content="${t(c(n.intro))}">
<meta property="og:url" content="${p(`${e.id}/`)}">
<meta property="og:site_name" content="${t(n.name)}">
<meta property="og:image" content="${t(p(C(n.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${t((D=f.bg)!=null?D:"#F3F5F7")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ve}">
<link rel="stylesheet" href="${i("assets/style.css")}">
<style>:root{${l}}</style>
${F(Pe(a))}${((S=n.faq)!=null?S:[]).length?F(je(a)):""}
<script src="${i("assets/site.js")}" defer><\/script>
</head>
<body data-market="${t(e.id)}" data-markets='${t(JSON.stringify(v))}' data-wa="${t(x((q=$.whatsapp)!=null?q:""))}" data-email="${t((y=$.email)!=null?y:"")}" data-copied="${t(s.copied)}" data-currency="${t(e.currency)}" data-lang="${t(r)}" data-tz="${t((N=n.timezone)!=null?N:"America/Chicago")}">
<script type="application/json" id="fix-data">${JSON.stringify(L).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${t(s.skip)}</a>
${X(s)}
${ye(a)}
<main id="main">
  ${$e(a)}
  ${ke(a)}
  ${xe(a)}
  ${we(a)}
  ${De(a)}
  ${Se(a)}
  ${qe(a)}
  ${Ne(a)}
</main>
${ze(a)}
<a class="fab" href="#book" aria-label="${t(s.nav.book)}">${g("calendar",22)}</a>
</body>
</html>
`}function ye({site:a,market:n,markets:e,t:o,url:r}){var c;let s=(c=a.contact)!=null?c:{};return`<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${r(`${n.id}/`)}">
      ${a.logo?`<img src="${t(z(r,a.logo))}" alt="" width="32" height="32">`:'<span class="brand-dot" aria-hidden="true"></span>'}
      <span>${t(a.name)}</span>
    </a>
    <nav class="nav" aria-label="${t(o.nav.label)}">
      <a href="#quote">${t(o.nav.quote)}</a>
      <a href="#services">${t(o.nav.services)}</a>
      <a href="#book">${t(o.nav.book)}</a>
      <a href="#visit">${t(o.nav.visit)}</a>
    </nav>
    ${s.phone?`<a class="call" href="tel:${x(s.phone)}">${g("phone",16)}<span>${t(s.phone)}</span></a>`:""}
    ${e.length>1?`<details class="market">
      <summary aria-label="${t(o.market.label)}">${g("globe",16)}<span>${t(n.id.toUpperCase())}</span></summary>
      <ul>${e.map(i=>`<li><a href="${r(`${i.id}/`)}" hreflang="${t(i.lang)}"${i.id===n.id?' aria-current="true"':""}>${t(i.country)} \xB7 ${t(i.currency)} ${t(Y(i))}</a></li>`).join("")}</ul>
    </details>`:""}
  </div>
</header>`}function $e(a){var c;let{site:n,t:e,L:o,url:r}=a,s=((c=n.stats)!=null?c:[]).filter(i=>(i==null?void 0:i.value)&&o(i.label));return`<section class="hero wrap" aria-labelledby="h-title">
  <div class="hero-copy">
    ${o(n.heroKicker)?`<p class="kicker">${t(o(n.heroKicker))}</p>`:""}
    <h1 id="h-title">${t(o(n.tagline))}</h1>
    ${o(n.intro)?`<p class="lead">${t(o(n.intro))}</p>`:""}
    <p class="actions"><a class="btn btn--accent" href="#quote">${t(e.hero.quote)} ${g("arrow",16)}</a><a class="btn btn--line" href="#book">${t(e.hero.book)}</a></p>
    <div class="hero-open">${H(n,e)}</div>
  </div>
  <figure class="hero-img"><img src="${t(z(r,n.heroImage||"photos/h-hero.webp"))}" alt="" width="1200" height="1500" fetchpriority="high"></figure>
  ${s.length?`<dl class="stats">${s.map(i=>`<div><dt>${t(i.value)}</dt><dd>${t(o(i.label))}</dd></div>`).join("")}</dl>`:""}
</section>`}function ke(a){var i,p,d,m,f;let{site:n,t:e,L:o,repairs:r,money:s}=a,c=((i=n.tiers)!=null?i:[]).filter(l=>o(l==null?void 0:l.name));return!r.length||!((p=n.brands)!=null?p:[]).length?"":`<section class="sec sec--quote" id="quote" aria-labelledby="q-title">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">01</p><h2 id="q-title" class="h2">${t(e.quote.title)}</h2><p class="muted">${t(e.quote.text)}</p></div>
    <div class="quote" data-quote data-mins="${t(e.quote.mins)}" data-hours="${t(e.quote.hours)}" data-days="${t(e.quote.days)}" data-wdays="${t(e.quote.wdays)}" data-pick="${t(e.quote.pickAll)}">
      <div class="q-steps">
        <label class="q-field"><span class="q-n">A</span><span class="q-l">${t(e.quote.brand)}</span>
          <select data-q-brand><option value="">${t(e.quote.choose)}</option>${((d=n.brands)!=null?d:[]).filter(l=>l==null?void 0:l.id).map(l=>`<option value="${t(l.id)}">${t(o(l.name))}</option>`).join("")}</select></label>
        <label class="q-field"><span class="q-n">B</span><span class="q-l">${t(e.quote.model)}</span>
          <select data-q-model disabled><option value="">${t(e.quote.choose)}</option></select></label>
        <fieldset class="q-field q-wide"><legend><span class="q-n">C</span><span class="q-l">${t(e.quote.repair)}</span></legend>
          <div class="q-chips">${r.map(l=>`<label class="q-chip"><input type="radio" name="q-repair" value="${t(l.id)}"><span>${t(o(l.name))}</span></label>`).join("")}</div></fieldset>
        ${((m=n.grades)!=null?m:[]).length?`<fieldset class="q-field q-wide" data-q-grades><legend><span class="q-n">D</span><span class="q-l">${t(e.quote.grade)}</span></legend>
          <div class="q-grades">${n.grades.filter(l=>l==null?void 0:l.id).map((l,u)=>`<label class="q-grade"><input type="radio" name="q-grade" value="${t(l.id)}"${u?"":" checked"}><span><b>${t(o(l.name))}${l.pct?` <small>+${Number(l.pct)}%</small>`:""}</b>${o(l.text)?`<small>${t(o(l.text))}</small>`:""}</span></label>`).join("")}</div></fieldset>`:""}
      </div>
      <aside class="q-card" aria-live="polite">
        <p class="q-device" data-q-device>${t(e.quote.pickAll)}</p>
        <p class="q-price"><span data-q-price>\u2014</span></p>
        <dl class="q-facts">
          <div><dt>${g("clock",16)} ${t(e.quote.time)}</dt><dd data-q-time>\u2014</dd></div>
          <div><dt>${g("shield",16)} ${t(e.quote.warranty)}</dt><dd data-q-warranty>\u2014</dd></div>
        </dl>
        ${o(n.taxNote)?`<p class="q-note">${t(o(n.taxNote))}</p>`:""}
        <a class="btn btn--accent btn--full" href="#book" data-q-book aria-disabled="true">${t(e.quote.book)} ${g("arrow",16)}</a>
      </aside>
    </div>
    ${c.length?`<details class="q-table"><summary>${t(e.quote.table)}</summary><div class="tbl"><table>
      <thead><tr><th scope="col">${t(e.quote.repair)}</th>${c.map(l=>`<th scope="col">${t(o(l.name))}</th>`).join("")}</tr></thead>
      <tbody>${r.map(l=>`<tr><th scope="row">${t(o(l.name))}</th>${c.map((u,v)=>{var $;return`<td>${(($=l.variants[v])==null?void 0:$.price)!=null?t(s(l.variants[v].price)):"\u2014"}</td>`}).join("")}</tr>`).join("")}</tbody>
    </table></div><p class="muted small">${t(e.quote.tiers)} ${((f=n.brands)!=null?f:[]).map(l=>{var u;return((u=l.models)!=null?u:[]).filter(v=>Number(v.tier)===c.length).map(v=>o(v.name))[0]}).filter(Boolean).slice(0,3).join(", ")}\u2026</p></details>`:""}
  </div>
</section>`}function xe({site:a,t:n,L:e,repairs:o}){var i;let r=new Set(o.map(p=>p.id)),s=((i=a.symptoms)!=null?i:[]).filter(p=>{var d;return(p==null?void 0:p.id)&&e(p.name)&&((d=p.repairs)!=null?d:[]).some(m=>r.has(m))});if(!s.length)return"";let c=p=>{var d;return e((d=o.find(m=>m.id===p))==null?void 0:d.name)};return`<section class="sec" id="symptoms" aria-labelledby="s-title">
  <div class="wrap sym">
    <div class="sec-head"><p class="eyebrow">02</p><h2 id="s-title" class="h2">${t(n.symptoms.title)}</h2><p class="muted">${t(n.symptoms.text)}</p></div>
    <ul class="sym-list">${s.map(p=>`<li><details>
      <summary>${t(e(p.name))}</summary>
      <div class="sym-body">${e(p.tip)?`<p>${t(e(p.tip))}</p>`:""}
        <p class="sym-go">${t(n.symptoms.likely)} ${p.repairs.filter(d=>r.has(d)).map(d=>`<a href="#quote" data-pick-repair="${t(d)}">${t(c(d))}</a>`).join(" \xB7 ")}</p></div>
    </details></li>`).join("")}</ul>
  </div>
</section>`}function we({t:a,L:n,url:e,repairs:o,money:r}){return`<section class="sec" id="services" aria-labelledby="sv-title">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">03</p><h2 id="sv-title" class="h2">${t(a.services.title)}</h2></div>
    <ul class="rows">${o.map(s=>`<li class="prod">
      <div class="p-img">${s.image?`<img sizes="${O.thumb}" src="${t(z(e,s.image))}" alt="" width="1200" height="900" loading="lazy">`:""}</div>
      <div><h3>${t(n(s.name))}</h3>${n(s.description)?`<p class="desc muted">${t(n(s.description))}</p>`:""}
        <p class="mono">${g("clock",14)} ${t(Me(s.minutes,a))}${s.warrantyDays?` \xB7 ${g("shield",14)} ${t(a.services.warranty.replace("{n}",s.warrantyDays))}`:""}</p></div>
      <div class="p-buy"><span class="from">${t(a.services.from)}</span><span class="price">${t(r(s.from))}</span><a class="addbtn" href="#quote" data-pick-repair="${t(s.id)}">${t(a.services.quote)}</a></div>
    </li>`).join("")}</ul>
  </div>
</section>`}var Me=(a,n)=>(a=Number(a)||0,a?a>=2880?n.quote.days.replace("{n}",Math.round(a/1440)):a>=90?n.quote.hours.replace("{n}",Math.round(a/30)/2):n.quote.mins.replace("{n}",a):"\u2014");function De({site:a,t:n,L:e,url:o}){var c,i,p;let r=((c=a.steps)!=null?c:[]).filter(d=>e(d==null?void 0:d.title));if(!r.length)return"";let s=(i=r.find(d=>d.image))==null?void 0:i.image;return`<section class="sec" id="how" aria-labelledby="hw-title">
  <div class="wrap how">
    <div>
      <div class="sec-head"><p class="eyebrow">04</p><h2 id="hw-title" class="h2">${t(n.how.title)}</h2></div>
      <ol class="how-list">${r.map((d,m)=>`<li><span class="h-n">${String(m+1).padStart(2,"0")}</span><div><h3>${t(e(d.title))}</h3>${e(d.text)?`<p class="muted">${t(e(d.text))}</p>`:""}</div></li>`).join("")}</ol>
      ${((p=a.promises)!=null?p:[]).length?`<ul class="perks">${a.promises.filter(d=>e(d==null?void 0:d.text)).map(d=>{var m;return`<li>${g((m=d.icon)!=null?m:"check",18)} ${t(e(d.text))}</li>`}).join("")}</ul>`:""}
    </div>
    ${s?`<figure class="how-img"><img sizes="${O.wide}" src="${t(z(o,s))}" alt="" width="1200" height="900" loading="lazy"></figure>`:""}
  </div>
</section>`}function Se(a){var m,f,l;let{site:n,t:e,L:o,channels:r,gform:s}=a,c=(m=n.contact)!=null?m:{},i=(f=n.booking)!=null?f:{},p=e.book.text.replace(/\{\w+\}/g,"\u2026"),d=s?` data-gform="${t(s.action)}" data-gmap='${t(JSON.stringify(s.fields))}'`:"";return`<section class="sec sec--book" id="book" aria-labelledby="bk-title">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">05</p><h2 id="bk-title" class="h2">${t(e.book.title)}</h2><p class="muted">${t(e.book.lead)}</p></div>
    <form class="order" data-book data-text="${t(e.book.text)}" data-hours='${t(JSON.stringify((l=n.hours)!=null?l:[]))}' data-slot="${Number(i.slotMinutes)||30}" data-lead="${Number(i.leadMinutes)||30}" data-ndays="${Number(i.days)||7}" data-today="${t(e.book.today)}" data-tomorrow="${t(e.book.tomorrow)}" data-closed="${t(e.book.closed)}" data-walk="${t(e.book.walkLabel)}" data-market="${t(`${a.market.id.toUpperCase()} \xB7 ${a.market.currency}`)}"${d} novalidate>
      <div class="order-fields">
        <div>
          <fieldset class="field"><legend>${t(e.book.how)}</legend>
            <div class="seg"><label><input type="radio" name="mode" value="slot" checked><span>${t(e.book.slot)}</span></label><label><input type="radio" name="mode" value="walk"><span>${t(e.book.walk)}</span></label></div>
          </fieldset>
          <div data-slots-box>
            <fieldset class="field"><legend>${t(e.book.day)}</legend><div class="days" data-days></div></fieldset>
            <fieldset class="field"><legend>${t(e.book.time)}</legend><div class="times" data-times><p class="muted small">${t(e.book.noJs)}</p></div></fieldset>
          </div>
          <p class="walk-note muted" data-walk-note hidden>${g("pin",16)} ${t(e.book.walkText)}</p>
          <div class="picked" data-picked><p class="mono">${t(e.book.device)}</p><p data-picked-text>${t(e.book.noDevice)}</p><a class="link" href="#quote">${t(e.book.change)}</a></div>
        </div>
        <div>
          <label class="field"><span>${t(e.book.name)} *</span><input name="name" autocomplete="name" required></label>
          <label class="field"><span>${t(e.book.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required></label>
          <label class="field"><span>${t(e.book.note)}</span><textarea name="note" rows="3" placeholder="${t(e.book.noteHint)}"></textarea></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          <input type="hidden" name="date"><input type="hidden" name="time">
          <p class="form-err" data-err hidden>${t(e.book.required)}</p>
          <button type="submit" class="btn btn--accent btn--full" data-submit>${g("calendar",18)} ${t(e.book.submit)}</button>
          <p class="muted small privacy">${g("lock",14)} ${t(e.book.privacy)}</p>
        </div>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${g(s?"check":"arrow",22)} ${t(s?e.book.done:e.book.stepTitle)}</p>
        <p class="muted">${t(s?e.book.doneText:e.book.stepText)}</p>
        <div class="buy">${r.map((u,v)=>{var $;return`<button type="submit" class="btn ${v||s?"btn--line":"btn--accent"}" data-channel="${t(u)}" data-href="${t(T(u,c,p))}">${g(u,18)} ${t(u==="phone"?e.book.call:e.book.send.replace("{channel}",($=e.via[u])!=null?$:u))}</button>`}).join("")}</div>
      </div>
      <p class="form-msg" role="status" hidden></p>
      <noscript><p>${r.map(u=>{var v;return`<a href="${t(T(u,c,p))}" ${G(u)}>${t((v=e.via[u])!=null?v:u)}</a>`}).join(" \xB7 ")}</p></noscript>
    </form>
  </div>
</section>`}function qe({site:a,t:n,L:e,lang:o}){let r=Q(a,n,o,"btn btn--line"),s=te(a);return a.showReviews===!1||!s.length&&!r?"":`<section class="sec" aria-labelledby="rv-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rv-title" class="h2">${t(n.reviews.title)}</h2></div>
    ${ne(s,o,"reviews",c=>`<figure class="review">
      <p class="stars" aria-label="${t(c.rating)}/5">${Array.from({length:5},(i,p)=>`<span class="${p<c.rating?"on":""}">${g("star",15)}</span>`).join("")}</p>
      <blockquote>${t(e(c.text))}</blockquote>
      <figcaption>${t(c.name)}${e(c.bought)?`<small>${t(e(c.bought))}</small>`:""}${ae(c,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ne({site:a,t:n,L:e,channels:o}){var p,d,m,f;let r=(p=a.contact)!=null?p:{},s=encodeURIComponent((d=r.mapQuery)!=null?d:e(r.address)),c=l=>l.length===7?n.visit.everyDay:J(l,n.days),i=((m=a.faq)!=null?m:[]).filter(l=>e(l==null?void 0:l.q));return`<section class="sec" id="visit" aria-labelledby="vs-title">
  <div class="wrap">
    <div class="visit">
      <div>
        <h2 id="vs-title" class="h2">${t(n.visit.title)}</h2>
        ${e(r.address)?`<p class="addr">${t(e(r.address))}</p>`:""}
        ${H(a,n)}
        ${((f=a.hours)!=null?f:[]).length?`<table class="hours"><tbody>${a.hours.map(l=>`<tr><th scope="row">${t(c(l.days))}</th><td>${t(l.open)} \u2013 ${t(l.close)}</td></tr>`).join("")}</tbody></table>`:""}
        <p class="actions"><a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${t(n.visit.directions)} ${g("arrow",16)}</a>
        ${o.map(l=>{var u;return`<a class="btn btn--line" href="${t(T(l,r))}" ${G(l)}>${g(l,18)} ${t((u=n.via[l])!=null?u:l)}</a>`}).join("")}</p>
      </div>
      <div class="map"><iframe title="${t(n.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
    ${i.length?`<div class="faq"><h2 class="h3">${t(n.faq.title)}</h2>${i.map((l,u)=>`<details${u?"":" open"}><summary>${t(e(l.q))}</summary><p>${t(e(l.a))}</p></details>`).join("")}</div>`:""}
  </div>
</section>`}function ze({site:a,t:n,L:e,market:o}){var c,i;let r=(c=a.contact)!=null?c:{},s=Object.entries((i=a.social)!=null?i:{}).filter(([,p])=>p);return`<footer class="footer">
  <div class="wrap">
    <p class="foot-name">${t(a.name)}</p>
    <p>${[r.phone?`<a href="tel:${x(r.phone)}">${t(r.phone)}</a>`:"",r.email?`<a href="mailto:${t(r.email)}">${t(r.email)}</a>`:"",...s.map(([p,d])=>`<a href="${t(d)}" target="_blank" rel="noopener">${t(p==="tiktok"?"TikTok":p==="youtube"?"YouTube":p[0].toUpperCase()+p.slice(1))}</a>`)].filter(Boolean).join(" \xB7 ")}</p>
    ${e(a.disclaimer)?`<p class="disclaimer">${t(e(a.disclaimer))}</p>`:""}
    <div class="foot-bottom"><span>\xA9 ${new Date().getFullYear()} ${t(a.name)}</span>${oe(a,n,o.lang)}</div>
  </div>
</footer>`}function Pe({site:a,market:n,L:e,abs:o,repairs:r}){var c,i;let s=(c=a.contact)!=null?c:{};return{"@context":"https://schema.org","@type":"ElectronicsStore",name:a.name,url:o(`${n.id}/`),image:o(C(a.heroImage||"photos/h-hero.webp")),description:e(a.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:e(s.address)},currenciesAccepted:n.currency,openingHoursSpecification:Z((i=a.hours)!=null?i:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:"Repairs",itemListElement:r.map(p=>({"@type":"Offer",itemOffered:{"@type":"Service",name:e(p.name)},price:p.from,priceCurrency:n.currency}))}}}var je=({site:a,L:n})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(e=>n(e==null?void 0:e.q)).map(e=>({"@type":"Question",name:n(e.q),acceptedAnswer:{"@type":"Answer",text:n(e.a)}}))});export{Ie as renderSite};
