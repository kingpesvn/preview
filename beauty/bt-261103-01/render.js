var De={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>De[t]);function U(a,t,n="vi"){var r,o,s;return a==null?"":typeof a!="object"?String(a):(s=(o=(r=a[t])!=null?r:a[n])!=null?o:Object.values(a)[0])!=null?s:""}var Se={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},Y=a=>{var t;return(t=Se[a])!=null?t:"en-US"};function ze(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function V(a,t){var r,o;if(t.default)return a.basePrice;let n=(o=(r=a.prices)==null?void 0:r[t.id])!=null?o:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ze(a.basePrice*t.rate,t.rounding)}var Pe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function ee(a,t){let n={style:"currency",currency:t.currency};return Pe.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(Y(t.lang),n).format(a)}function te(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var F=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,B=(a,t)=>{let n=F(t);return n==null?t:a(n)},E=(a="")=>String(a).replace(/\D/g,"");function W(a,t,n=""){switch(a){case"phone":return`tel:${E(t.phone)}`;case"zalo":return`https://zalo.me/${E(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${E(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var _=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,je=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function ae(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let r={};for(let[o,s]of t.searchParams){if(!/^entry\.\d+$/.test(o))continue;let l=s.trim().replace(/^\{|\}$/g,"").toLowerCase();je.includes(l)&&(r[l]=o)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var K={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Ne={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(a,t=20,n="")=>{var r;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(r=Ne[a])!=null?r:""}</svg>`},J=[1,2,3,4,5,6,0],Ce=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function re(a,t){let n=a.map(o=>J.indexOf(o)).sort((o,s)=>o-s);return n.every((o,s)=>s===0||o===n[s-1]+1)&&n.length>2?`${t[J[n[0]]]} \u2013 ${t[J[n.at(-1)]]}`:n.map(o=>t[J[o]]).join(", ")}var ie=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>Ce[n]),opens:t.open,closes:t.close}));function se(a){var n,r;return(r=(n=new Intl.NumberFormat(Y(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(o=>o.type==="currency"))==null?void 0:n.value)!=null?r:a.currency}var X=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',le=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,ce=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},ne={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Te=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Re=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&Te.test(n.hostname)?n.href:""}catch{return""}},de=(a,t,n,r="btn btn--line")=>{var l;let o=Re(a);if(!o)return"";let s=typeof t.reviews=="object"&&((l=t.reviews)==null?void 0:l.google)||ne[n]||ne.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(o)}" target="_blank" rel="noopener">${m("star",16)} ${e(s)}</a></p>`},Z={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},pe={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},he=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ue(a,t){var s,l,i;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!n)return"";let r=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(r.getTime()))return"";let o=new Intl.DateTimeFormat((i=pe[t])!=null?i:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(a.date)}">${e(o)}</time>`}function qe(a,t){var l,i;let n=a.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let r=n.reduce((c,d)=>c+Number(d.rating),0)/n.length,o=(l=Z[t])!=null?l:Z.en,s=new Intl.NumberFormat((i=pe[t])!=null?i:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(o.count.replace("{n}",String(a.length)))}</span></p>`}function me(a,t,n,r){var l;if(!a.length)return"";let o=(l=Z[t])!=null?l:Z.en,s=i=>`<button type="button" class="rv-btn" data-rv-${i} aria-label="${e(i==="prev"?o.prev:o.next)}">${m("arrow",18,i==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${qe(a,t)}<div class="rv" data-rv data-rv-more="${e(o.more)}" data-rv-less="${e(o.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(r).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${Be}`}var Be=`<style>
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
upd()}})()<\/script>`,oe={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function ge(a){var r;let t=(r=oe[a])!=null?r:oe.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${m("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${m("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${m("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var fe=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function be({site:a,markets:t,url:n,abs:r}){var l;let o=(l=t.find(i=>i.default))!=null?l:t[0],s=t.map(i=>({id:i.id,lang:i.lang,country:i.country}));return`<!doctype html>
<html lang="${e(o.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${r(`${o.id}/`)}">
${t.map(i=>`<link rel="alternate" hreflang="${e(i.lang)}-${e(i.country)}" href="${r(`${i.id}/`)}">`).join(`
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
<body><p>${t.map(i=>`<a href="${n(`${i.id}/`)}">${e(i.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Ae="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;800&display=swap",$e=24;function ke(a,t){var n;return((n=a.products)!=null?n:[]).map(r=>{var o;return{...r,variants:((o=r.variants)!=null?o:[]).map(s=>({...s,price:V(s,t)})).filter(s=>s.price!=null)}}).filter(r=>r.variants.length>0).map(r=>{let o=Math.min(...r.variants.map(l=>l.price)),s=r.was?V({basePrice:r.was,prices:r.wasPrices},t):null;return{...r,from:o,was:s&&s>o?s:null}})}var ve={dropper:a=>`<rect x="168" y="110" width="64" height="150" rx="14" fill="${a}"/><rect x="180" y="74" width="40" height="40" rx="6" fill="#2A2522"/><ellipse cx="200" cy="70" rx="16" ry="12" fill="#2A2522"/><rect x="176" y="160" width="48" height="56" rx="4" fill="#fff" opacity=".85"/>`,jar:a=>`<rect x="130" y="150" width="140" height="100" rx="18" fill="${a}"/><rect x="124" y="118" width="152" height="40" rx="10" fill="#2A2522"/><rect x="150" y="182" width="100" height="40" rx="4" fill="#fff" opacity=".85"/>`,tube:a=>`<path d="M160 60h80l-6 170h-68z" fill="${a}"/><rect x="172" y="228" width="56" height="30" rx="6" fill="#2A2522"/><rect x="172" y="100" width="56" height="70" rx="4" fill="#fff" opacity=".85"/>`,pump:a=>`<rect x="155" y="110" width="90" height="150" rx="16" fill="${a}"/><rect x="185" y="80" width="30" height="34" rx="4" fill="#2A2522"/><rect x="185" y="66" width="58" height="16" rx="6" fill="#2A2522"/><rect x="167" y="160" width="66" height="60" rx="4" fill="#fff" opacity=".85"/>`,bottle:a=>`<rect x="160" y="100" width="80" height="160" rx="10" fill="${a}"/><rect x="180" y="62" width="40" height="42" rx="6" fill="#2A2522"/><rect x="172" y="150" width="56" height="64" rx="4" fill="#fff" opacity=".85"/>`,stick:a=>`<rect x="178" y="150" width="44" height="110" rx="6" fill="#2A2522"/><rect x="184" y="112" width="32" height="44" rx="3" fill="#C9A86A"/><path d="M186 112v-34l28-18v52z" fill="${a}"/>`,bar:a=>`<rect x="110" y="140" width="180" height="90" rx="26" fill="${a}"/><rect x="128" y="154" width="144" height="62" rx="18" fill="#fff" opacity=".18"/>`,box:a=>`<rect x="120" y="90" width="160" height="170" rx="6" fill="${a}"/><path d="M120 90l20-26h120l20 26z" fill="#2A2522" opacity=".85"/><rect x="146" y="150" width="108" height="56" rx="4" fill="#fff" opacity=".85"/>`,sheet:a=>`<path d="M110 80h180l-10 180H120z" fill="${a}"/><path d="M110 80h180v24H110z" fill="#2A2522" opacity=".85"/><circle cx="200" cy="170" r="42" fill="#fff" opacity=".85"/>`},Q=(a,t="")=>{var n,r;return`<svg class="pack" viewBox="0 0 400 300" role="img" aria-label="${e(t)}"><ellipse cx="200" cy="268" rx="120" ry="10" fill="#000" opacity=".06"/>${((n=ve[a.pack])!=null?n:ve.bottle)(/^#[0-9a-f]{3,8}$/i.test((r=a.tone)!=null?r:"")?a.tone:"#D8C3B5")}</svg>`},Ee=a=>`data:image/svg+xml,${encodeURIComponent(Q(a).replace(/ role="img" aria-label=""/,' xmlns="http://www.w3.org/2000/svg"'))}`,xe=a=>String(a).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function Le(a){let t=10**Math.floor(Math.log10(a));return[1,2,2.5,5,10].map(n=>n*t).reduce((n,r)=>Math.abs(r-a)<Math.abs(n-a)?r:n)}function Ve(a){let t=a.map(r=>r.from).sort((r,o)=>r-o);if(t.length<5)return[];let n=[...new Set([.33,.66].map(r=>Le(t[Math.floor(r*(t.length-1))])))];return n.map((r,o)=>[o?n[o-1]:0,r]).concat([[n[n.length-1],1/0]])}function mt({site:a,catalog:t,i18n:n,template:r,basePath:o="/",siteUrl:s=a.domain}){var g,u,v,y,D,x,S,j,N,P,T;let l=te(o),i=k=>new URL(l(k),s).href,c=t.markets,d=(k,M)=>`${M.id}/${U(k.slug,M.lang,"en")}/`,h=ae(a.orderForm),b=h&&!h.error?h:null,w=[];for(let k of c){let M=k.lang,p=(u=(g=n[M])!=null?g:n.en)!=null?u:n.vi,$=z=>U(z,M,"en"),C=ke(t,k),A=(y=(v=a.orderChannels)==null?void 0:v[k.id])!=null?y:["phone"],H=z=>ee(z,k),O=(z,f)=>(z!=null?z:[]).find(q=>q.id===f),R=(D=a.shipping)!=null?D:{},G={fee:(j=(S=(x=R.prices)==null?void 0:x[k.id])==null?void 0:S.fee)!=null?j:R.fee!=null?V({basePrice:R.fee},k):0,free:(T=(P=(N=R.prices)==null?void 0:N[k.id])==null?void 0:P.freeFrom)!=null?T:R.freeFrom!=null?V({basePrice:R.freeFrom},k):null},L={site:a,catalog:t,market:k,markets:c,lang:M,t:p,L:$,url:l,abs:i,channels:A,money:H,items:C,productPath:d,template:r,gform:b,byId:O,ship:G,bands:Ve(C)};w.push({path:`${k.id}/index.html`,html:ye(L,{kind:"home"})});for(let z of C)w.push({path:`${d(z,k)}index.html`,html:ye(L,{kind:"product",product:z})})}return w.push({path:"index.html",html:be({site:a,markets:c,url:l,abs:i})}),w}function ye(a,t){var C,A,H,O,R,G,L,z;let{site:n,market:r,markets:o,lang:s,t:l,L:i,url:c,abs:d,catalog:h,productPath:b,gform:w,money:g}=a,u=t.kind==="home",v=t.product,y=u?`${r.id}/`:b(v,r),D=u?`${n.name} \xB7 ${i(n.tagline)}`:`${i(v.name)} \xB7 ${n.name}`,x=u?i(n.intro):`${i(v.description)} ${g(v.from)}.`,S=o.map(f=>{var q;return u?{m:f,href:`${f.id}/`}:ke({products:[((q=h.products)!=null?q:[]).find(I=>I.id===v.id)]},f).length?{m:f,href:b(v,f)}:null}).filter(Boolean),j=f=>{var q,I;return(I=(q=S.find(Me=>Me.m.id===f.id))==null?void 0:q.href)!=null?I:`${f.id}/`},N=(C=o.find(f=>f.default))!=null?C:o[0],P=(A=n.theme)!=null?A:{},T=["primary","ink","bg","surface","soft","accent"].filter(f=>P[f]).map(f=>`--${f}:${P[f]}`).join(";"),k=o.map(f=>({id:f.id,lang:f.lang,country:f.country,currency:f.currency,href:c(j(f))})),M=(H=n.contact)!=null?H:{},p=d(F(u||!v.image?n.heroImage:v.image)),$=w?` data-gform="${e(w.action)}" data-gmap='${e(JSON.stringify(w.fields))}'`:"";return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(D)}</title>
<meta name="description" content="${e(x)}">
<link rel="canonical" href="${d(y)}">
${S.map(({m:f,href:q})=>`<link rel="alternate" hreflang="${e(f.lang)}-${e(f.country)}" href="${d(q)}">`).join(`
`)}
${S.some(f=>f.m.id===N.id)?`<link rel="alternate" hreflang="x-default" href="${d(j(N))}">`:""}
<meta property="og:type" content="${u?"website":"product"}">
<meta property="og:title" content="${e(D)}">
<meta property="og:description" content="${e(x)}">
<meta property="og:url" content="${d(y)}">
<meta property="og:image" content="${e(p)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((O=P.bg)!=null?O:"#F7F5F1")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ae}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${T}}</style>
${u?_(Qe(a))+(((R=n.faq)!=null?R:[]).length?_(et(a)):""):_(tt(a,v))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(r.id)}" data-markets='${e(JSON.stringify(k))}' data-copied="${e(l.copied)}" data-wa="${e(E((G=M.whatsapp)!=null?G:""))}" data-email="${e((L=M.email)!=null?L:"")}" data-store="${e(`kp-beauty-${xe(n.name).replace(/[^a-z0-9]+/g,"")}-${r.id}`)}" data-currency="${e(r.currency)}" data-lang="${e(s)}" data-tz="${e((z=n.timezone)!=null?z:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(l.skip)}</a>
${le(l)}
${i(n.announcement)?`<p class="announce">${e(i(n.announcement))}</p>`:""}
${Fe(a,u)}
<main id="main">
${u?[He,Oe,Ge,Ie,Ue,We,_e,Ke].map(f=>f(a)).join(`
`):Je(a,v)}
</main>
${Xe(a)}
${Ye(a,$)}
<nav class="dock" aria-label="${e(l.bag.title)}">
  <a href="${e(W(a.channels[0],M))}" ${X(a.channels[0])}>${m(a.channels[0],20)}<span>${e(l.nav.ask)}</span></a>
  <button type="button" class="primary" data-bag-open>${m("bag",20)}<span>${e(l.bag.title)}</span><b class="bag-n" data-bag-count hidden>0</b></button>
</nav>
</body>
</html>
`}function Fe({site:a,market:t,markets:n,t:r,url:o},s){let l=s?"":o(`${t.id}/`),i=[[`${l}#shop`,r.nav.shop],[`${l}#skins`,r.nav.skins],[`${l}#origin`,r.nav.origin],[`${l}#visit`,r.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${o(`${t.id}/`)}">
      ${a.logo?`<img src="${e(B(o,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${m("drop",18)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([c,d])=>`<a href="${c}">${e(d)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(r.market.label)}">${m("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(se(t))}</span></span></summary>
        <ul>${n.map(c=>`<li><a href="${o(`${c.id}/`)}" hreflang="${e(c.lang)}"${c.id===t.id?' aria-current="true"':""}>${e(c.country)} \xB7 ${e(c.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <button type="button" class="bagbtn" data-bag-open aria-label="${e(r.bag.title)}">${m("bag",20)}<b class="bag-n" data-bag-count hidden>0</b></button>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${i.map(([c,d])=>`<a href="${c}">${e(d)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function He({site:a,t,L:n,url:r,items:o,catalog:s}){var c;let l=[a.heroImage].filter(Boolean),i=((c=s.categories)!=null?c:[]).filter(d=>o.some(h=>h.category===d.id));return`<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${n(a.heroKicker)?`<p class="kicker">${e(n(a.heroKicker))}</p>`:""}
      <h1>${e(n(a.tagline))}</h1>
      <p class="lead">${e(n(a.intro))}</p>
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#shop">${e(t.hero.shop)} ${m("arrow",18)}</a>
        <a class="btn btn--line btn--lg" href="#skins">${e(t.hero.skins)}</a>
      </div>
    </div>
    ${l.length?`<div class="hero-pics">${l.map((d,h)=>`<img src="${e(B(r,d))}" alt="" width="1000" height="1000"${h?' loading="lazy"':' fetchpriority="high"'}>`).join("")}</div>`:""}
  </div>
  ${i.length?`<div class="wrap"><ul class="jump">${i.map(d=>`<li><a href="?type=${e(d.id)}#shop" data-jump="type" data-value="${e(d.id)}">${e(n(d.name))}</a></li>`).join("")}</ul></div>`:""}
</section>`}function we(a,t,n=0){var u,v,y,D,x,S,j,N,P,T,k,M;let{L:r,url:o,money:s,productPath:l,market:i,catalog:c,byId:d,bands:h}=a,b=[r(t.name),(u=t.name)==null?void 0:u.vi,(v=t.name)==null?void 0:v.en,r((y=d(c.categories,t.category))==null?void 0:y.name),r(t.key),...((D=t.skins)!=null?D:[]).map(p=>{var $;return r(($=d(c.skins,p))==null?void 0:$.name)}),...((x=t.concerns)!=null?x:[]).map(p=>{var $;return r(($=d(c.concerns,p))==null?void 0:$.name)}),...((S=t.colors)!=null?S:[]).map(p=>r(p.name))].filter(Boolean).join(" "),w=h.findIndex(([p,$])=>t.from>=p&&t.from<$),g=(j=t.images)==null?void 0:j[0];return`<li class="card${n>=$e?" is-more":""}" data-type="${e(t.category)}" data-skin="${e(((N=t.skins)!=null?N:[]).join(" "))}" data-concern="${e(((P=t.concerns)!=null?P:[]).join(" "))}" data-band="${w}" data-price="${t.from}" data-name="${e(xe(b))}">
  <a class="card-link" href="${o(l(t,i))}">
    <div class="card-img${g?" has-alt":""}${t.image?"":" is-pack"}" style="--tone:${e(/^#[0-9a-f]{3,8}$/i.test((T=t.tone)!=null?T:"")?t.tone:"#D8C3B5")}">
      ${t.image?`<img sizes="${K.card}" src="${e(B(o,t.image))}" alt="${e(r(t.name))}" width="1000" height="750" loading="lazy">`:Q(t,r(t.name))}
      ${g?`<img sizes="${K.card}" class="alt" src="${e(B(o,g))}" alt="" width="1000" height="750" loading="lazy">`:""}
      ${t.was?`<span class="tag tag--sale">-${Math.round((1-t.from/t.was)*100)}%</span>`:r(t.badge)?`<span class="tag">${e(r(t.badge))}</span>`:""}
    </div>
    <p class="card-cat">${e(r((k=d(c.categories,t.category))==null?void 0:k.name))}${r(t.key)?` \xB7 ${e(r(t.key).split(/,\s+/)[0].trim())}`:""}</p>
    <h3>${e(r(t.name))}</h3>
    <p class="card-price"><b>${e(s(t.from))}</b>${t.was?` <s>${e(s(t.was))}</s>`:""}${r(t.variants[0].label)?`<span class="sz">${e(r(t.variants[0].label))}</span>`:""}</p>
    ${((M=t.colors)==null?void 0:M.length)>1?`<p class="dots" aria-hidden="true">${t.colors.map(p=>`<i style="background:${e(p.hex)}"></i>`).join("")}</p>`:""}
  </a>
</li>`}function Oe(a){var h,b,w;let{items:t,catalog:n,t:r,L:o,money:s,bands:l}=a,i=r.shop,c=(g,u,v,y)=>{let D=v.map(x=>({...x,n:t.filter(S=>y(S).includes(String(x.id))).length})).filter(x=>x.n);return D.length<2?"":`<fieldset class="fgroup" data-group="${g}"><legend>${e(u)}</legend>${D.map(x=>`<label class="fopt"><input type="checkbox" value="${e(x.id)}" data-f="${g}"> <span>${e(typeof x.name=="string"?x.name:o(x.name))}</span><small>${x.n}</small></label>`).join("")}</fieldset>`},d=l.map(([g,u],v)=>({id:String(v),name:u===1/0?i.over.replace("{a}",s(g)):g===0?i.under.replace("{b}",s(u)):`${s(g)} \u2013 ${s(u)}`}));return`<section class="section shop-sec" id="shop" aria-labelledby="shop-title">
  <div class="wrap shop">
    <aside class="side" id="filters" data-side aria-label="${e(i.filters)}">
      <div class="side-head"><p class="side-title">${m("filter",18)} ${e(i.filters)}</p><button type="button" class="side-x" data-side-close aria-label="${e(i.close)}">\u2715</button></div>
      ${c("type",i.type,(h=n.categories)!=null?h:[],g=>[g.category])}
      ${c("skin",i.skin,(b=n.skins)!=null?b:[],g=>{var u;return(u=g.skins)!=null?u:[]})}
      ${c("concern",i.concern,(w=n.concerns)!=null?w:[],g=>{var u;return(u=g.concerns)!=null?u:[]})}
      ${c("band",i.price,d,g=>[String(l.findIndex(([u,v])=>g.from>=u&&g.from<v))])}
      <div class="side-foot"><button type="button" class="link" data-reset>${e(i.reset)}</button><button type="button" class="btn btn--primary" data-side-close data-show-tpl="${e(i.show)}">${e(i.show.replace("{n}",t.length))}</button></div>
    </aside>
    <div class="shop-main">
      <div class="shop-head">
        <h2 id="shop-title" class="h2">${e(i.title)}</h2>
        <p class="muted" data-count="${e(i.count)}">${e(i.count.replace("{n}",t.length))}</p>
      </div>
      <div class="toolbar">
        <button type="button" class="btn btn--line filter-btn" data-side-open aria-controls="filters">${m("filter",18)} ${e(i.filters)} <b data-nsel hidden></b></button>
        <label class="search">${m("search",18)}<input type="search" placeholder="${e(r.search)}" aria-label="${e(r.search)}" data-search></label>
        <label class="select"><span>${e(i.sort)}</span><select data-sort>
          <option value="">${e(i.sortPop)}</option><option value="asc">${e(i.sortLow)}</option><option value="desc">${e(i.sortHigh)}</option>
        </select></label>
      </div>
      <ul class="chosen" data-chosen hidden></ul>
      <ul class="grid" data-grid>${t.map((g,u)=>we(a,g,u)).join("")}</ul>
      <p class="empty muted" data-empty hidden>${e(i.empty)} <button type="button" class="link" data-reset>${e(i.reset)}</button></p>
      ${t.length>$e?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(i.more)}</button></div>`:""}
    </div>
  </div>
</section>`}function Ge({catalog:a,t,L:n,items:r}){var i;let o=((i=a.skins)!=null?i:[]).filter(c=>n(c==null?void 0:c.name));if(!o.length)return"";let s=t.skins,l=c=>{var d;return String((d=n(c))!=null?d:"").split(`
`).map(h=>h.trim()).filter(Boolean)};return`<section class="section section--soft" id="skins" aria-labelledby="skins-title">
  <div class="wrap skins">
    <div class="sec-head"><p class="kicker">${e(s.kicker)}</p><h2 id="skins-title" class="h2">${e(s.title)}</h2><p class="lead">${e(s.text)}</p></div>
    <div class="skin-row" role="group" aria-label="${e(s.title)}">${o.map((c,d)=>`<button type="button" class="skin" data-face-pick="${e(c.id)}" aria-pressed="${d?"false":"true"}">${e(n(c.name))}</button>`).join("")}</div>
    ${o.map((c,d)=>`<div class="skin-tip" data-face-tip="${e(c.id)}"${d?" hidden":""}>
      <p class="skin-text">${e(n(c.text))}</p>
      <div class="routine">
        ${l(c.am).length?`<div><p class="mini">${m("sun",16)} ${e(s.am)}</p><ol>${l(c.am).map(h=>`<li>${e(h)}</li>`).join("")}</ol></div>`:""}
        ${l(c.pm).length?`<div><p class="mini">${m("star",16)} ${e(s.pm)}</p><ol>${l(c.pm).map(h=>`<li>${e(h)}</li>`).join("")}</ol></div>`:""}
      </div>
      <a class="btn btn--primary" href="#shop" data-face-go="${e(c.id)}">${e(s.see.replace("{n}",r.filter(h=>{var b;return((b=h.skins)!=null?b:[]).includes(c.id)}).length))} ${m("arrow",16)}</a>
    </div>`).join("")}
    <p class="small muted">${m("shield",14)} ${e(s.note)}</p>
  </div>
</section>`}function Ie({site:a,t,L:n}){var o;let r=((o=a.origin)!=null?o:[]).filter(s=>n(s==null?void 0:s.title));return r.length?`<section class="section" id="origin" aria-labelledby="origin-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.origin.kicker)}</p><h2 id="origin-title" class="h2">${e(t.origin.title)}</h2></div>
    <ol class="origin">${r.map((s,l)=>{var i;return`<li><span class="n">${String(l+1).padStart(2,"0")}</span>${m((i=s.icon)!=null?i:"check",22)}<h3 class="h4">${e(n(s.title))}</h3><p class="muted">${e(n(s.text))}</p></li>`}).join("")}</ol>
  </div>
</section>`:""}function Ue({site:a,L:t}){var r;let n=((r=a.perks)!=null?r:[]).filter(o=>t(o==null?void 0:o.title));return n.length?`<section class="perks" aria-label="${e(a.name)}"><ul class="wrap perk-list">${n.map(o=>{var s;return`<li>${m((s=o.icon)!=null?s:"check",22)}<div><b>${e(t(o.title))}</b>${t(o.text)?`<span>${e(t(o.text))}</span>`:""}</div></li>`}).join("")}</ul></section>`:""}function We({site:a,t,L:n,lang:r}){let o=de(a,t,r,"btn btn--line"),s=he(a);return a.showReviews===!1||!s.length&&!o?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${me(s,r,"reviews",l=>`<figure class="review">
      <p class="stars" aria-label="${e(l.rating)}/5">${Array.from({length:5},(i,c)=>`<span class="${c<l.rating?"on":""}">${m("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(l.text))}</blockquote>
      <figcaption>${e(l.name)}${n(l.bought)?`<small>${e(n(l.bought))}</small>`:""}${ue(l,r)}</figcaption>
    </figure>`)}${o}
  </div>
</section>`}function _e({site:a,t,L:n}){var o;let r=((o=a.faq)!=null?o:[]).filter(s=>n(s==null?void 0:s.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${r.map((s,l)=>`<details${l===0?" open":""}><summary>${e(n(s.q))}</summary><p>${e(n(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ke({site:a,t,L:n,channels:r}){var i,c,d;let o=(i=a.contact)!=null?i:{},s=encodeURIComponent((c=o.mapQuery)!=null?c:n(o.address)),l=h=>h.length===7?t.visit.everyDay:re(h,t.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${ce(a,t)}
      ${((d=a.hours)!=null?d:[]).length?`<table class="hours"><tbody>${a.hours.map(h=>`<tr><th scope="row">${e(l(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(o.address)?`<p class="addr">${m("pin",18)} ${e(n(o.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(t.visit.directions)} ${m("arrow",16)}</a>
        ${r.map(h=>{var b;return`<a class="btn btn--line" href="${e(W(h,o))}" ${X(h)}>${m(h,18)} ${e((b=t.via[h])!=null?b:h)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Je(a,t){var j,N,P,T,k,M;let{site:n,t:r,L:o,url:s,money:l,market:i,items:c,catalog:d,byId:h}=a,b=h(d.categories,t.category),w=[...c.filter(p=>p.id!==t.id&&p.category===t.category),...c.filter(p=>{var $;return p.id!==t.id&&p.category!==t.category&&(($=p.skins)!=null?$:[]).some(C=>{var A;return((A=t.skins)!=null?A:[]).includes(C)})})].slice(0,8),g=s(`${i.id}/`),u=p=>typeof p=="object"?o(p):String(p),v=t.variants[0],y=r.product,D=[o(t.origin)?["origin",o(t.origin)]:null,t.pao?["pao",y.paoV.replace("{n}",t.pao)]:null,((j=t.skins)!=null?j:[]).length?["skin",t.skins.map(p=>{var $;return o(($=h(d.skins,p))==null?void 0:$.name)}).filter(Boolean).join(", ")]:null,...(N=t.specs)!=null?N:[]].filter(Boolean),x=String((P=o(t.howto))!=null?P:"").split(`
`).map(p=>p.trim()).filter(Boolean),S=String((T=o(t.key))!=null?T:"").split(/,\s+/).map(p=>p.trim()).filter(Boolean);return`<div class="wrap crumbs"><a href="${g}">${e(r.nav.home)}</a>${m("chevron",14)}<a href="${g}?type=${e(t.category)}#shop">${e(o(b==null?void 0:b.name))}</a>${m("chevron",14)}<span aria-current="page">${e(o(t.name))}</span></div>
<section class="wrap pdp-grid">
  ${Ze(a,t)}
  <div class="pdp" data-product data-id="${e(t.id)}" data-name="${e(o(t.name))}" data-price="${v.price}" data-img="${e(t.image?B(s,t.image):Ee(t))}" data-href="${e(s(a.productPath(t,i)))}">
    <p class="kicker">${e(o(b==null?void 0:b.name))}</p>
    <h1 class="pdp-title">${e(o(t.name))}</h1>
    <p class="pdp-price"><strong data-pdp-total>${e(l(v.price))}</strong>${t.was?` <s>${e(l(t.was))}</s>`:""}</p>
    <p class="lead">${e(o(t.description))}</p>
    ${S.length?`<ul class="keys" aria-label="${e(y.key)}">${S.map(p=>`<li>${e(p)}</li>`).join("")}</ul>`:""}
    ${t.variants.length>1?`<fieldset class="opts"><legend>${e(y.size)}</legend><div class="sizes">${t.variants.map((p,$)=>`<label class="sopt"><input type="radio" name="size" value="${e(o(p.label))}" data-price="${p.price}"${$?"":" checked"}><span><b>${e(o(p.label))}</b><em>${e(l(p.price))}</em></span></label>`).join("")}</div></fieldset>`:""}
    ${(k=t.colors)!=null&&k.length?`<fieldset class="opts"><legend>${e(y.color)}: <span data-v="color">${e(o(t.colors[0].name))}</span></legend><div class="swatches">
      ${t.colors.map((p,$)=>`<label class="sw" title="${e(o(p.name))}"><input type="radio" name="color" value="${e(o(p.name))}"${$?"":" checked"}><span style="background:${e(p.hex)}"></span><b class="sr">${e(o(p.name))}</b></label>`).join("")}
    </div></fieldset>`:""}
    <div class="buyrow">
      <div class="qty" data-qty><button type="button" data-d="-1" aria-label="\u2212">${m("minus",16)}</button><input type="number" name="qty" min="1" max="10" value="1" inputmode="numeric" aria-label="${e(y.qty)}"><button type="button" data-d="1" aria-label="+">${m("plus",16)}</button></div>
      <button type="button" class="btn btn--accent btn--lg" data-add-bag>${m("bag",18)} ${e(y.add)}</button>
    </div>
    <p class="added" data-added hidden>${m("check",16)} ${e(y.added)} <button type="button" class="link" data-bag-open>${e(y.viewBag)}</button></p>
    ${((M=n.promises)!=null?M:[]).length?`<ul class="promises">${n.promises.map(p=>{var $;return`<li>${m(($=p.icon)!=null?$:"check",18)} ${e(o(p.text))}</li>`}).join("")}</ul>`:""}
    ${x.length?`<div class="howto"><h2 class="h4">${e(y.howto)}</h2><ol>${x.map(p=>`<li>${e(p)}</li>`).join("")}</ol></div>`:""}
    ${o(t.ingredients)?`<details class="inci"><summary>${e(y.ingredients)}</summary><p>${e(o(t.ingredients))}</p></details>`:""}
    ${D.length?`<div class="specs"><h2 class="h4">${e(y.specs)}</h2><table><tbody>${D.map(([p,$])=>{var C;return`<tr><th scope="row">${e((C=r.specs[p])!=null?C:p)}</th><td>${e(u($))}</td></tr>`}).join("")}</tbody></table></div>`:""}
    <p class="small muted">${m("shield",14)} ${e(o(n.patchNote)||y.patch)}</p>
    ${ge(i.lang)}
  </div>
</section>
${w.length?`<section class="section section--soft"><div class="wrap"><h2 class="h3">${e(y.related)}</h2><ul class="grid grid--related">${w.map(p=>we(a,p)).join("")}</ul></div></section>`:""}`}function Ze({t:a,L:t,url:n},r){var i,c;let o=[r.image,...(i=r.images)!=null?i:[]].filter(Boolean),s=a.gallery,l=t(r.name);return o.length?`<div class="pdp-gallery" data-gallery>
  <ul class="g-track" tabindex="0" aria-label="${e(s.label)}">${o.map((d,h)=>`<li><a href="${e(B(n,d))}" data-zoom="${h}" aria-label="${e(s.zoom)}: ${e(s.photo.replace("{i}",h+1).replace("{n}",o.length))}"><img sizes="${K.wide}" src="${e(B(n,d))}" alt="${e(h?`${l} \u2013 ${s.photo.replace("{i}",h+1).replace("{n}",o.length)}`:l)}" width="1000" height="750"${h?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
  ${o.length>1?`<p class="g-dots" aria-hidden="true">${o.map((d,h)=>`<i${h?"":' class="on"'}></i>`).join("")}</p>`:""}
  <dialog class="lightbox" data-lightbox aria-label="${e(l)}">
    <img src="" alt="${e(l)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(s.close)}">\u2715</button>
    ${o.length>1?`<button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(s.prev)}">${m("chevron",26)}</button><button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(s.next)}">${m("chevron",26)}</button>`:""}
  </dialog>
</div>`:`<div class="pdp-gallery pdp-pack" style="--tone:${e(/^#[0-9a-f]{3,8}$/i.test((c=r.tone)!=null?c:"")?r.tone:"#D8C3B5")}">${Q(r,l)}</div>`}function Ye({site:a,t,L:n,channels:r,ship:o,market:s},l){var b,w;let i=t.bag,c=(b=a.contact)!=null?b:{},d=t.orderText.replace(/\{\w+\}/g,"\u2026"),h=g=>r.map((u,v)=>{var y;return`<button type="submit" class="btn ${g!=null?g:v?"btn--line":"btn--accent"} btn--full" data-channel="${e(u)}" data-href="${e(W(u,c,d))}">${m(u,18)} ${e(u==="phone"?i.call:i.send.replace("{channel}",(y=t.via[u])!=null?y:u))}</button>`}).join("");return`<dialog class="bag" data-bag aria-labelledby="bag-title" data-fee="${o.fee}" data-free="${(w=o.free)!=null?w:""}" data-free-tpl="${e(i.freeLeft)}" data-free-ok="${e(i.freeOk)}">
  <form class="bag-in" data-checkout novalidate${l} data-text="${e(t.orderText)}" data-market="${e(`${s.id.toUpperCase()} \xB7 ${s.currency}`)}">
    <header class="bag-head"><h2 id="bag-title" class="h3">${m("bag",22)} ${e(i.title)}</h2><button type="button" class="bag-x" data-bag-close aria-label="${e(t.gallery.close)}">\u2715</button></header>
    <p class="bag-empty muted" data-bag-empty>${e(i.empty)}</p>
    <ul class="bag-list" data-bag-list data-remove="${e(i.remove)}"></ul>
    <div class="bag-body" data-bag-body hidden>
      <p class="freebar" data-freebar hidden><span data-freebar-text></span><i><b data-freebar-fill></b></i></p>
      <dl class="sum">
        <div><dt>${e(i.subtotal)}</dt><dd data-s-sub>\u2014</dd></div>
        <div><dt>${e(i.shipping)}</dt><dd data-s-ship data-free-label="${e(i.free)}">\u2014</dd></div>
        <div class="sum-total"><dt>${e(i.total)}</dt><dd data-s-total>\u2014</dd></div>
      </dl>
      <div class="order-fields">
        <div class="intents" role="radiogroup" aria-label="${e(i.how)}">${i.intents.map((g,u)=>`<label class="intent"><input type="radio" name="intent" value="${e(g)}"${u?"":" checked"}><span>${e(g)}</span></label>`).join("")}</div>
        <label class="field"><span>${e(i.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(i.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        <label class="field"><span>${e(i.address)}</span><input name="address" autocomplete="street-address" maxlength="200"></label>
        <label class="field"><span>${e(i.note)}</span><input name="note" maxlength="300" placeholder="${e(i.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(i.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-submit>${m("check",18)} ${e(i.submit)}</button>
        <p class="muted small">${e(n(a.returns)||i.reply)}</p>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m("check",22)} ${e(i.doneTitle)}</p>
        <p>${e(i.doneText)}</p>
        <div class="buy">${h()}</div>
        <button type="button" class="link back" data-edit>${e(i.edit)}</button>
      </div>
      <p class="form-msg" role="status" hidden></p>
    </div>
  </form>
</dialog>`}function Xe({site:a,t,L:n,market:r}){var l,i;let o=(l=a.contact)!=null?l:{},s=Object.entries((i=a.social)!=null?i:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${o.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${E(o.phone)}">${e(o.phone)}</a></li>`:""}
      ${o.email?`<li><a href="mailto:${e(o.email)}">${e(o.email)}</a></li>`:""}
      ${n(o.address)?`<li>${e(n(o.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${s.map(([c,d])=>`<li><a href="${e(d)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${fe(a,t,r.lang)}</div>
</footer>`}function Qe({site:a,market:t,L:n,abs:r,items:o}){var l,i,c;let s=(l=a.contact)!=null?l:{};return{"@context":"https://schema.org","@type":"Store",name:a.name,url:r(`${t.id}/`),image:r(F(a.heroImage||((i=o[0])==null?void 0:i.image))),description:n(a.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:n(s.address)},currenciesAccepted:t.currency,openingHoursSpecification:ie((c=a.hours)!=null?c:[])}}var et=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});function tt({site:a,market:t,L:n,abs:r,productPath:o,catalog:s,byId:l},i){var c,d,h;return{"@context":"https://schema.org","@type":"Product",name:n(i.name),description:n(i.description),image:[i.image,...(c=i.images)!=null?c:[]].filter(Boolean).map(b=>r(F(b))),url:r(o(i,t)),category:n((d=l(s.categories,i.category))==null?void 0:d.name),...(h=i.colors)!=null&&h.length?{color:i.colors.map(b=>n(b.name)).join(", ")}:{},...n(i.variants[0].label)?{size:n(i.variants[0].label)}:{},...n(i.ingredients)?{additionalProperty:[{"@type":"PropertyValue",name:"ingredients",value:n(i.ingredients)}]}:{},offers:{"@type":"Offer",price:i.variants[0].price,priceCurrency:t.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:a.name}}}}export{mt as renderSite};
