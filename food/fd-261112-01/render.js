var De={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(o="")=>String(o).replace(/[&<>"']/g,t=>De[t]);function Y(o,t,a="vi"){var n,r,s;return o==null?"":typeof o!="object"?String(o):(s=(r=(n=o[t])!=null?n:o[a])!=null?r:Object.values(o)[0])!=null?s:""}var Se={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},ee=o=>{var t;return(t=Se[o])!=null?t:"en-US"};function ze(o,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(o)-.01);let a=Number(t)||1;return Math.max(a,Math.round(o/a)*a)}function U(o,t){var n,r;if(t.default)return o.basePrice;let a=(r=(n=o.prices)==null?void 0:n[t.id])!=null?r:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:ze(o.basePrice*t.rate,t.rounding)}var Ne=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function te(o,t){let a={style:"currency",currency:t.currency};return Ne.has(t.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(ee(t.lang),a).format(o)}function ae(o="/"){let t=o.endsWith("/")?o:`${o}/`;return(a="")=>t+String(a).replace(/^\//,"")}var _=(o="")=>o.startsWith("uploads/")?o:/^([a-z]+:|\/)/i.test(o)?null:`assets/${o}`,j=(o,t)=>{let a=_(t);return a==null?t:o(a)},G=(o="")=>String(o).replace(/\D/g,"");function H(o,t,a=""){switch(o){case"phone":return`tel:${G(t.phone)}`;case"zalo":return`https://zalo.me/${G(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${G(t.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var K=o=>`<script type="application/ld+json">${JSON.stringify(o).replace(/</g,"\\u003c")}<\/script>`,Pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function ne(o){if(!o||typeof o!="string")return null;let t;try{t=new URL(o.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let a=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let n={};for(let[r,s]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();Pe.includes(i)&&(n[i]=r)}return Object.keys(n).length?n.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:n}:{error:"no-phone"}:{error:"no-fields"}}var I={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var je={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},h=(o,t=20,a="")=>{var n;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(n=je[o])!=null?n:""}</svg>`},Q=[1,2,3,4,5,6,0],Te=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function se(o,t){let a=o.map(r=>Q.indexOf(r)).sort((r,s)=>r-s);return a.every((r,s)=>s===0||r===a[s-1]+1)&&a.length>2?`${t[Q[a[0]]]} \u2013 ${t[Q[a.at(-1)]]}`:a.map(r=>t[Q[r]]).join(", ")}var ie=o=>o.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(a=>Te[a]),opens:t.open,closes:t.close}));function le(o){var a,n;return(n=(a=new Intl.NumberFormat(ee(o.lang),{style:"currency",currency:o.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:a.value)!=null?n:o.currency}var J=o=>o==="phone"||o==="email"?"":'target="_blank" rel="noopener"',ce=o=>`<div class="suggest" id="market-suggest" data-suggest="${e(o.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(o.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(o.market.dismiss)}">\xD7</button>
</div>`,de=(o,t)=>{var a;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(o.hours))}' data-tz="${e((a=o.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},oe={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Ce=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,qe=o=>{var t;try{let a=new URL(String((t=o.googleReview)!=null?t:"").trim());return a.protocol==="https:"&&Ce.test(a.hostname)?a.href:""}catch{return""}},pe=(o,t,a,n="btn btn--line")=>{var i;let r=qe(o);if(!r)return"";let s=typeof t.reviews=="object"&&((i=t.reviews)==null?void 0:i.google)||oe[a]||oe.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${n}" href="${e(r)}" target="_blank" rel="noopener">${h("star",16)} ${e(s)}</a></p>`},X={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},he={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ue=o=>{var t;return((t=o.reviews)!=null?t:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function me(o,t){var s,i,l;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=o==null?void 0:o.date)!=null?s:"").trim());if(!a)return"";let n=new Date(Date.UTC(+a[1],+a[2]-1,+((i=a[3])!=null?i:1)));if(Number.isNaN(n.getTime()))return"";let r=new Intl.DateTimeFormat((l=he[t])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(n);return`<time class="rv-date" datetime="${e(o.date)}">${e(r)}</time>`}function Re(o,t){var i,l;let a=o.filter(d=>d.rating>=1&&d.rating<=5);if(a.length<2)return"";let n=a.reduce((d,u)=>d+Number(u.rating),0)/a.length,r=(i=X[t])!=null?i:X.en,s=new Intl.NumberFormat((l=he[t])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(n);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${h("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(o.length)))}</span></p>`}function ge(o,t,a,n){var i;if(!o.length)return"";let r=(i=X[t])!=null?i:X.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${h("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Re(o,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${a} rv-track" tabindex="0">${o.map(n).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${Fe}`}var Fe=`<style>
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
upd()}})()<\/script>`,re={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function fe(o){var n;let t=(n=re[o])!=null?n:re.en,a="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${a}">${h("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${a}">${h("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${a}">${h("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var be=(o,t,a)=>o.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function $e({site:o,markets:t,url:a,abs:n}){var i;let r=(i=t.find(l=>l.default))!=null?i:t[0],s=t.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(o.name)}</title>
<link rel="canonical" href="${n(`${r.id}/`)}">
${t.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${n(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(s)}, root = ${JSON.stringify(a(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${t.map(l=>`<a href="${a(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Ee="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",xe=24,Be=["vegan","lowsugar"];function ke(o,t){var a;return((a=o.products)!=null?a:[]).map(n=>{var r;return{...n,variants:((r=n.variants)!=null?r:[]).map(s=>({...s,price:U(s,t)})).filter(s=>s.price!=null)}}).filter(n=>n.variants.length>0).map(n=>{let r=Math.min(...n.variants.map(i=>i.price)),s=n.was?U({basePrice:n.was,prices:n.wasPrices},t):null;return{...n,from:r,was:s&&s>r?s:null}})}function Le(o){let t=o.filter(s=>s.badge),a=o.filter(s=>!t.includes(s)),n=[...new Set(a.map(s=>s.category))].map(s=>a.filter(i=>i.category===s)),r=[...t];for(let s=0;r.length<o.length;s++)for(let i of n)i[s]&&r.push(i[s]);return r}var Ae=o=>String(o).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function ve(o,t,a){var n;return(t==null?void 0:t[a.id])!=null?t[a.id]:o==null||o===""?null:a.default?Number(o):Math.round(Number(o)*((n=a.rate)!=null?n:1)*100)/100}var Ve=(o,t)=>{var a;return((a=o.giftBoxes)!=null?a:[]).filter(n=>n==null?void 0:n.id).map(n=>({...n,price:n.price?U({basePrice:n.price,prices:n.prices},t):0})).filter(n=>n.price!=null)},Oe=(o,t)=>{var a,n;return((n=(a=o.builder)==null?void 0:a.boxes)!=null?n:[]).filter(r=>(r==null?void 0:r.id)&&Number(r.slots)>0).map(r=>{var s,i;return{...r,slots:Number(r.slots),price:(i=U({basePrice:(s=r.basePrice)!=null?s:0,prices:r.prices},t))!=null?i:0}})};function Ge(o,t){var n,r;let a=(n=o.delivery)!=null?n:{};return{...a,fee:(r=ve(a.fee,a.feeManual,t))!=null?r:0,freeFrom:ve(a.freeFrom,a.freeFromManual,t)}}function He(o,t){var r,s,i;let a=(r=o.bulk)!=null?r:{},n=((s=a.tiers)!=null?s:[]).map(l=>({min:Number(l.min)||0,pct:Number(l.pct)||0})).filter(l=>l.min>1&&l.pct>0).sort((l,d)=>l.min-d.min);return{...a,tiers:n,logoFee:a.logoFee&&(i=U({basePrice:a.logoFee,prices:a.logoPrices},t))!=null?i:0,logoMin:Number(a.logoMin)||0}}function Ie(o,t){let a=o.map(l=>l.from).sort((l,d)=>l-d);if(a.length<6)return[];let n=t.currency==="VND"?5e4:t.currency==="JPY"||t.currency==="KRW"?500:5,r=l=>Math.max(n,Math.round(l/n)*n),s=r(a[Math.floor(a.length/3)]),i=r(a[Math.floor(a.length*2/3)]);return i>s?[[0,s],[s,i],[i,1/0]]:[]}function Mt({site:o,catalog:t,i18n:a,template:n,basePath:r="/",siteUrl:s=o.domain}){var y,c,w,f;let i=ae(r),l=g=>new URL(i(g),s).href,d=t.markets,u=(g,x)=>`${x.id}/${Y(g.slug,x.lang,"en")}/`,m=ne(o.orderForm),v=m&&!m.error?m:null,b=[];for(let g of d){let x=g.lang,S=(c=(y=a[x])!=null?y:a.en)!=null?c:a.vi,z=D=>Y(D,x,"en"),M=ke(t,g),T=(f=(w=o.orderChannels)==null?void 0:w[g.id])!=null?f:["phone"],C=D=>te(D,g),q=(D,p)=>{var k,P;return z((P=(k=D==null?void 0:D.find($=>$.id===p))==null?void 0:k.name)!=null?P:p)},R=D=>{var p;return((p=t.categories)!=null?p:[]).find(k=>k.id===D.category)},V=D=>{var p;return((p=t.fillings)!=null?p:[]).find(k=>k.id===D.filling)},O=Ve(o,g),F=Oe(o,g),E=Ge(o,g),B=He(o,g),L=Ie(M,g),N={site:o,catalog:t,market:g,markets:d,lang:x,t:S,L:z,url:i,abs:l,channels:T,money:C,items:M,productPath:u,template:n,name:q,cat:R,filling:V,gform:v,boxes:O,builder:F,delivery:E,bulk:B,bands:L};b.push({path:`${g.id}/index.html`,html:ye(N,{kind:"home"})});for(let D of M)b.push({path:`${u(D,g)}index.html`,html:ye(N,{kind:"product",product:D})})}return b.push({path:"index.html",html:$e({site:o,markets:d,url:i,abs:l})}),b}function Ue({site:o,t}){var r,s;let a=(r=o.festival)!=null?r:{},n=Object.values((s=a.dates)!=null?s:{}).filter(i=>/^\d{4}-\d{2}-\d{2}$/.test(i)).sort();return n.length?` data-fest='${e(JSON.stringify(n))}' data-open="${Number(a.openDays)||45}" data-last="${Number(a.lastDays)||0}"`:""}function ye(o,t){var F,E,B,L,N,D,p,k,P;let{site:a,market:n,markets:r,lang:s,t:i,L:l,url:d,abs:u,catalog:m,productPath:v,channels:b}=o,y=t.kind==="home",c=t.product,w=y?`${n.id}/`:v(c,n),f=y?`${a.name} \xB7 ${l(a.tagline)}`:`${l(c.name)} \xB7 ${a.name}`,g=y?l(a.intro):`${l(c.description)} ${o.money(c.from)}.`,x=r.map($=>{var A;return y?{m:$,href:`${$.id}/`}:ke({products:[((A=m.products)!=null?A:[]).find(Z=>Z.id===c.id)]},$).length?{m:$,href:v(c,$)}:null}).filter(Boolean),S=$=>{var A,Z;return(Z=(A=x.find(Me=>Me.m.id===$.id))==null?void 0:A.href)!=null?Z:`${$.id}/`},z=(F=r.find($=>$.default))!=null?F:r[0],M=(E=a.theme)!=null?E:{},T=["primary","ink","bg","surface","soft","accent"].filter($=>M[$]).map($=>`--${$}:${M[$]}`).join(";"),C=r.map($=>({id:$.id,lang:$.lang,country:$.country,currency:$.currency,href:d(S($))})),q=b[0],R=(B=a.contact)!=null?B:{},V=a.heroImage||((L=o.items[0])==null?void 0:L.image),O=u(_(y?V:c.image));return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(f)}</title>
<meta name="description" content="${e(g)}">
<link rel="canonical" href="${u(w)}">
${x.map(({m:$,href:A})=>`<link rel="alternate" hreflang="${e($.lang)}-${e($.country)}" href="${u(A)}">`).join(`
`)}
${x.some($=>$.m.id===z.id)?`<link rel="alternate" hreflang="x-default" href="${u(S(z))}">`:""}
<meta property="og:type" content="${y?"website":"product"}">
<meta property="og:title" content="${e(f)}">
<meta property="og:description" content="${e(g)}">
<meta property="og:url" content="${u(w)}">
<meta property="og:image" content="${e(O)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta name="theme-color" content="${e((N=M.primary)!=null?N:"#7A1F1F")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ee}">
<link rel="stylesheet" href="${d("assets/style.css")}">
<style>:root{${T}}</style>
${y?K(lt(o))+(((D=a.faq)!=null?D:[]).length?K(ct(o)):""):K(dt(o,c))+K(pt(o,c))}
<script src="${d("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(C))}' data-copied="${e(i.copied)}" data-wa="${e(G((p=R.whatsapp)!=null?p:""))}" data-email="${e((k=R.email)!=null?k:"")}" data-tz="${e((P=a.timezone)!=null?P:"Asia/Ho_Chi_Minh")}" data-locale="${e(s)}"${Ue(o)}>
<a class="skip" href="#main">${e(i.skip)}</a>
${ce(i)}
${l(a.announcement)?`<p class="announce">${h("gift",15)} ${e(l(a.announcement))}</p>`:""}
${We(o,y)}
<main id="main">
${y?[_e,Ke,Je,Ze,Ye,Qe,Xe,et,tt,at,nt,ot].map($=>$(o)).join(`
`):rt(o,c)}
</main>
${it(o)}
<nav class="dock" aria-label="${e(i.nav.order)}">
  <a href="${y?"":d(`${n.id}/`)}#shop">${h("search",20)}<span>${e(i.nav.shop)}</span></a>
  <a class="primary" href="${e(y?H(q,R):"#order")}" ${y?J(q):""}>${h(y?q:"bag",20)}<span>${e(y?i.nav.order:i.nav.buy)}</span></a>
</nav>
</body>
</html>
`}function We({site:o,market:t,markets:a,t:n,url:r,builder:s},i){var m;let l=i?"":r(`${t.id}/`),d=[[`${l}#shop`,n.nav.shop],[`${l}#fillings`,n.nav.fillings],...s.length?[[`${l}#build`,n.nav.build]]:[],[`${l}#corporate`,n.nav.corporate],[`${l}#visit`,n.nav.contact]],u=(m=o.contact)!=null?m:{};return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${o.logo?`<img src="${e(j(r,o.logo))}" alt="" width="40" height="40">`:'<span class="brand-mark" aria-hidden="true"></span>'}
      <span>${e(o.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${d.map(([v,b])=>`<a href="${v}">${e(b)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${a.length>1?`<details class="market">
        <summary aria-label="${e(n.market.label)}">${h("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(le(t))}</span></span></summary>
        <ul>${a.map(v=>`<li><a href="${r(`${v.id}/`)}" hreflang="${e(v.lang)}"${v.id===t.id?' aria-current="true"':""}>${e(v.country)} \xB7 ${e(v.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      ${u.phone?`<a class="btn btn--primary btn--sm hide-sm" href="tel:${G(u.phone)}">${h("phone",16)} ${e(u.phone)}</a>`:""}
      <details class="mnav">
        <summary aria-label="${e(n.nav.openMenu)}">${h("menu",22)}</summary>
        <nav aria-label="Menu">${d.map(([v,b])=>`<a href="${v}">${e(b)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function _e(o){var u,m,v;let{site:t,t:a,L:n,url:r,items:s,catalog:i}=o,l=[t.heroImage,...(u=t.heroImages)!=null?u:[]].filter(Boolean).slice(0,2),d=((m=i.categories)!=null?m:[]).filter(b=>s.some(y=>y.category===b.id));return`<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${n(t.heroKicker)?`<p class="kicker">${e(n(t.heroKicker))}</p>`:""}
      <h1>${e(n(t.tagline))}</h1>
      <p class="lead">${e(n(t.intro))}</p>
      ${(v=t.festival)!=null&&v.dates?`<p class="moonbar" data-moonbar data-days="${e(a.fest.days)}" data-today="${e(a.fest.today)}" data-soon="${e(a.fest.soon)}" data-off="${e(a.fest.off)}" data-by="${e(a.fest.by)}" hidden>${h("calendar",18)} <span data-moon-text></span></p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#shop">${e(a.hero.shop)} ${h("arrow",18)}</a>
        <a class="btn btn--line btn--lg" href="#corporate">${h("briefcase",18)} ${e(a.hero.corporate)}</a>
      </div>
    </div>
    ${l.length?`<div class="hero-pics">${l.map((b,y)=>`<img src="${e(j(r,b))}" alt="" width="1000" height="1000"${y?' loading="lazy"':' fetchpriority="high"'}>`).join("")}</div>`:""}
  </div>
  ${d.length?`<div class="wrap"><ul class="jump">${d.map(b=>`<li><a href="?type=${e(b.id)}#shop" data-jump="type" data-value="${e(b.id)}">${h(b.set?"gift":"star",16)} ${e(n(b.name))}</a></li>`).join("")}</ul></div>`:""}
</section>`}function we(o,t,a=0){var x,S,z,M,T,C,q,R,V,O,F,E,B,L;let{t:n,L:r,url:s,money:i,productPath:l,market:d,name:u,cat:m,filling:v,bands:b,catalog:y}=o,c=v(t),w=[r(t.name),(x=t.name)==null?void 0:x.vi,(S=t.name)==null?void 0:S.en,r((z=m(t))==null?void 0:z.name),(T=(M=m(t))==null?void 0:M.name)==null?void 0:T.vi,r(c==null?void 0:c.name),(C=c==null?void 0:c.name)==null?void 0:C.vi].filter(Boolean).join(" "),f=b.findIndex(([N,D])=>t.from>=N&&t.from<D),g=[t.weight?`${t.weight} g`:"",t.yolks?n.shop.yolkN.replace("{n}",t.yolks):"",...((q=t.diet)!=null?q:[]).map(N=>n.diet[N])].filter(Boolean);return`<li class="card${a>=xe?" is-more":""}" data-type="${e(t.category)}" data-filling="${e((R=t.filling)!=null?R:"")}" data-yolks="${W(y,t)?"":(V=t.yolks)!=null?V:0}" data-diet="${e(((O=t.diet)!=null?O:[]).join(" "))}" data-band="${f}" data-price="${t.from}" data-name="${e(Ae(w))}">
  <a class="card-link" href="${s(l(t,d))}">
    <div class="card-img">
      <img sizes="${I.card}" src="${e(j(s,t.image))}" alt="${e(r(t.name))}" width="1000" height="1000" loading="lazy">
      ${t.was?`<span class="tag tag--sale">-${Math.round((1-t.from/t.was)*100)}%</span>`:r(t.badge)?`<span class="tag">${e(r(t.badge))}</span>`:""}
      ${((F=t.diet)!=null?F:[]).includes("vegan")?`<span class="gift-dot" title="${e(n.diet.vegan)}">${h("leaf",14)}</span>`:""}
    </div>
    <p class="card-cat">${e(r((E=m(t))==null?void 0:E.name))}${c?` \xB7 ${e(r(c.name))}`:""}</p>
    <h3>${e(r(t.name))}</h3>
    ${g.length?`<p class="card-taste">${e(g.join(" \xB7 "))}</p>`:""}
    <p class="card-price">${t.variants.length>1?`<span>${e(n.shop.from)}</span> `:""}<b>${e(i(t.from))}</b>${t.variants.length>1?` <span>/ ${e((L=r((B=t.variants.find(N=>N.price===t.from))==null?void 0:B.label))!=null?L:"")}</span>`:""}${t.was?` <s>${e(i(t.was))}</s>`:""}</p>
  </a>
</li>`}function Ke(o){var c,w;let{items:t,catalog:a,t:n,L:r,money:s,bands:i}=o,l=(f,g)=>t.filter(x=>{var S;return!(f==="yolks"&&W(a,x))&&[].concat((S=x[f])!=null?S:f==="yolks"?0:[]).map(String).includes(String(g))}).length,d=(f,g,x,S)=>{let z=S.map(M=>({...M,n:l(g,M.id)})).filter(M=>M.n);return z.length<2?"":`<fieldset class="fgroup" data-group="${f}"><legend>${e(x)}</legend>${z.map(M=>`<label class="fopt"><input type="checkbox" value="${e(M.id)}" data-f="${f}"> <span>${e(r(M.name))}</span><small>${M.n}</small></label>`).join("")}</fieldset>`},u=[0,1,2].map(f=>({id:f,name:n.shop.yolks[f]})),m=Be.map(f=>({id:f,name:n.diet[f]})),v=i.map(([f,g],x)=>({id:x,name:g===1/0?n.shop.over.replace("{a}",s(f)):f===0?n.shop.under.replace("{b}",s(g)):`${s(f)} \u2013 ${s(g)}`})),b=v.length?`<fieldset class="fgroup" data-group="band"><legend>${e(n.shop.price)}</legend>${v.map(f=>`<label class="fopt"><input type="checkbox" value="${f.id}" data-f="band"> <span>${e(f.name)}</span><small>${t.filter(g=>g.from>=i[f.id][0]&&g.from<i[f.id][1]).length}</small></label>`).join("")}</fieldset>`:"",y=t.filter(f=>!W(a,f));return`<section class="section shop-sec" id="shop" aria-labelledby="shop-title">
  <div class="wrap shop">
    <aside class="side" id="filters" data-side aria-label="${e(n.shop.filters)}">
      <div class="side-head"><p class="side-title">${h("filter",18)} ${e(n.shop.filters)}</p><button type="button" class="side-x" data-side-close aria-label="${e(n.shop.close)}">\u2715</button></div>
      ${d("type","category",n.shop.type,(c=a.categories)!=null?c:[])}
      ${d("filling","filling",n.shop.filling,(w=a.fillings)!=null?w:[])}
      ${y.some(f=>f.yolks)?d("yolks","yolks",n.shop.yolk,u):""}
      ${d("diet","diet",n.shop.diet,m)}
      ${b}
      <div class="side-foot"><button type="button" class="link" data-reset>${e(n.shop.reset)}</button><button type="button" class="btn btn--primary" data-side-close data-show-tpl="${e(n.shop.show)}">${e(n.shop.show.replace("{n}",t.length))}</button></div>
    </aside>
    <div class="shop-main">
      <div class="shop-head">
        <h2 id="shop-title" class="h2">${e(n.shop.title)}</h2>
        <p class="muted" data-count="${e(n.shop.count)}">${e(n.shop.count.replace("{n}",t.length))}</p>
      </div>
      <div class="toolbar">
        <button type="button" class="btn btn--line filter-btn" data-side-open aria-controls="filters">${h("filter",18)} ${e(n.shop.filters)} <b data-nsel hidden></b></button>
        <label class="search">${h("search",18)}<input type="search" placeholder="${e(n.search)}" aria-label="${e(n.search)}" data-search></label>
        <label class="select"><span>${e(n.shop.sort)}</span><select data-sort>
          <option value="">${e(n.shop.sortPop)}</option><option value="asc">${e(n.shop.sortLow)}</option><option value="desc">${e(n.shop.sortHigh)}</option>
        </select></label>
      </div>
      <ul class="chosen" data-chosen hidden></ul>
      <ul class="grid" data-grid>${Le(t).map((f,g)=>we(o,f,g)).join("")}</ul>
      <p class="empty muted" data-empty hidden>${e(n.shop.empty)} <button type="button" class="link" data-reset>${e(n.shop.reset)}</button></p>
      ${t.length>xe?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(n.shop.more)}</button></div>`:""}
    </div>
  </div>
</section>`}var W=(o,t)=>{var a,n;return!!((n=((a=o.categories)!=null?a:[]).find(r=>r.id===t.category))!=null&&n.set)};function Je({catalog:o,items:t,t:a,L:n,url:r}){var i;let s=((i=o.fillings)!=null?i:[]).map(l=>({...l,n:t.filter(d=>d.filling===l.id).length})).filter(l=>l.n);return s.length?`<section class="section section--soft" id="fillings" aria-labelledby="fi-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.fillings.kicker)}</p><h2 id="fi-title" class="h2">${e(a.fillings.title)}</h2><p class="lead">${e(a.fillings.text)}</p></div>
    <ul class="orig">${s.filter(l=>l.image).map(l=>`<li><a href="?filling=${e(l.id)}#shop" data-jump="filling" data-value="${e(l.id)}">
      ${l.image?`<span class="orig-img"><img sizes="${I.card}" src="${e(j(r,l.image))}" alt="" width="900" height="675" loading="lazy"></span>`:""}
      <span class="orig-body">
        <b>${e(n(l.name))}</b>
        ${n(l.text)?`<span class="orig-text">${e(n(l.text))}</span>`:""}
        <span class="orig-n">${e(a.fillings.count.replace("{n}",l.n))} ${h("arrow",14)}</span>
      </span>
    </a></li>`).join("")}</ul>
    ${s.some(l=>!l.image)?`<ul class="jump jump--fill">${s.filter(l=>!l.image).map(l=>`<li><a href="?filling=${e(l.id)}#shop" data-jump="filling" data-value="${e(l.id)}">${e(n(l.name))} <small>${e(a.fillings.count.replace("{n}",l.n))}</small></a></li>`).join("")}</ul>`:""}
  </div>
</section>`:""}function Ze(o){let{site:t,t:a,L:n,url:r,items:s,money:i,builder:l,channels:d,gform:u,catalog:m}=o,v=s.filter(c=>!W(m,c)&&c.pick!==!1&&c.variants.length);if(!l.length||v.length<2)return"";let b=a.build.orderText.replace(/\{\w+\}/g,"\u2026"),y=u?` data-gform="${e(u.action)}" data-gmap='${e(JSON.stringify(u.fields))}'`:"";return`<section class="section" id="build" aria-labelledby="bu-title">
  <div class="wrap build">
    <div class="sec-head sec-head--left"><p class="kicker">${e(a.build.kicker)}</p><h2 id="bu-title" class="h2">${e(a.build.title)}</h2><p class="lead">${e(a.build.text)}</p></div>
    <form class="bx" data-builder data-text="${e(a.build.orderText)}" data-full="${e(a.build.full)}" data-left="${e(a.build.left)}" data-ready="${e(a.build.ready)}" data-currency="${e(o.market.currency)}" data-lang="${e(o.market.lang)}" data-market="${e(`${o.market.id.toUpperCase()} \xB7 ${o.market.currency}`)}"${y} novalidate>
      <fieldset class="bx-sizes"><legend>${e(a.build.size)}</legend>
        ${l.map((c,w)=>`<label class="bx-size"><input type="radio" name="box" value="${e(n(c.name))}" data-slots="${c.slots}" data-price="${c.price}"${w?"":" checked"}>
          ${c.image?`<img src="${e(j(r,c.image))}" alt="" width="96" height="72" loading="lazy">`:""}
          <span><b>${e(n(c.name))}</b><small>${e(a.build.slots.replace("{n}",c.slots))} \xB7 ${c.price?e(i(c.price)):e(a.gifts.free)}</small></span></label>`).join("")}
      </fieldset>
      <div class="bx-tray" aria-hidden="true" data-tray></div>
      <p class="bx-status" data-status aria-live="polite"></p>
      <ul class="bx-list">${v.map(c=>`<li data-cake="${e(c.id)}" data-price="${c.variants[0].price}" data-name="${e(n(c.name))}">
        <img src="${e(j(r,c.image))}" alt="" width="64" height="64" loading="lazy">
        <span class="bx-t"><b>${e(n(c.name))}</b><small>${e([c.weight?`${c.weight} g`:"",i(c.variants[0].price)].filter(Boolean).join(" \xB7 "))}</small></span>
        <span class="qty"><button type="button" data-dec aria-label="${e(a.build.less)} ${e(n(c.name))}">${h("minus",16)}</button><output data-n>0</output><button type="button" data-inc aria-label="${e(a.build.more)} ${e(n(c.name))}">${h("plus",16)}</button></span>
      </li>`).join("")}</ul>
      <div class="bx-foot">
        <dl class="sum"><div><dt>${e(a.build.box)}</dt><dd data-b-box></dd></div><div><dt>${e(a.build.cakes)}</dt><dd data-b-cakes>${e(i(0))}</dd></div><div class="sum-total"><dt>${e(a.product.total)}</dt><dd data-b-total></dd></div></dl>
        <div class="fields fields--bx" data-b-fields hidden>
          <label><span>${e(a.product.name)} *</span><input name="name" autocomplete="name"></label>
          <label><span>${e(a.product.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel"></label>
          <label><span>${e(a.product.date)} *</span><input name="date" type="date" data-date></label>
          <label><span>${e(a.product.qty)}</span><input name="qty" type="number" min="1" max="500" value="1" inputmode="numeric"></label>
          <label class="wide"><span>${e(a.product.address)} *</span><input name="address" autocomplete="street-address"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <p class="form-err" data-err hidden>${e(a.product.required)}</p>
        <button type="submit" class="btn btn--primary btn--lg btn--full" data-b-go disabled>${h("gift",18)} <span>${e(a.build.order)}</span></button>
        <div class="done" data-done hidden tabindex="-1">
          <p class="done-title">${h(u?"check":"arrow",22)} ${e(u?a.product.done:a.product.stepTitle)}</p>
          <p>${e(u?a.product.doneText:a.product.stepText)}</p>
          <div class="buy">${d.map((c,w)=>{var f,g;return`<button type="submit" class="btn ${w||u?"btn--line":"btn--primary"}" data-channel="${e(c)}" data-href="${e(H(c,(f=t.contact)!=null?f:{},b))}">${h(c,18)} ${e(c==="phone"?a.product.call:a.product.send.replace("{channel}",(g=a.via[c])!=null?g:c))}</button>`}).join("")}</div>
        </div>
        <p class="form-msg" role="status" hidden></p>
      </div>
    </form>
  </div>
</section>`}function Ye({site:o,t,L:a}){var r;let n=((r=o.storageGuide)!=null?r:[]).filter(s=>a(s==null?void 0:s.name));return n.length?`<section class="section section--soft" id="storage" aria-labelledby="st-title">
  <div class="wrap brew">
    <div class="sec-head sec-head--left"><p class="kicker">${e(t.storage.kicker)}</p><h2 id="st-title" class="h2">${e(t.storage.title)}</h2><p class="lead">${e(t.storage.text)}</p></div>
    <div class="table-wrap"><table class="brew-table">
      <thead><tr><th scope="col">${e(t.storage.cake)}</th><th scope="col">${h("calendar",16)} ${e(t.storage.shelf)}</th><th scope="col">${h("thermo",16)} ${e(t.storage.keep)}</th><th scope="col">${h("star",16)} ${e(t.storage.best)}</th></tr></thead>
      <tbody>${n.map(s=>{var i,l,d;return`<tr><th scope="row">${e(a(s.name))}</th><td>${e((i=a(s.shelf))!=null?i:"")}</td><td>${e((l=a(s.keep))!=null?l:"")}</td><td>${e((d=a(s.best))!=null?d:"")}</td></tr>`}).join("")}</tbody>
    </table></div>
  </div>
</section>`:""}function Qe({site:o,t,L:a,url:n,bulk:r,money:s,channels:i}){var d;if(!a(r.title)&&!r.tiers.length)return"";let l=i[0];return`<section class="section section--ink" id="corporate" aria-labelledby="co-title">
  <div class="wrap corp">
    ${r.image?`<img sizes="${I.wide}" src="${e(j(n,r.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
    <div>
      <p class="kicker">${e(t.corp.kicker)}</p>
      <h2 id="co-title" class="h2">${e(a(r.title)||t.corp.title)}</h2>
      ${a(r.text)?`<p class="lead">${e(a(r.text))}</p>`:""}
      ${r.tiers.length?`<ol class="tiers">${r.tiers.map(u=>`<li><b>-${u.pct}%</b><span>${e(t.corp.from.replace("{n}",u.min))}</span></li>`).join("")}</ol>`:""}
      ${r.logoFee?`<p class="muted">${h("printer",16)} ${e(t.corp.logo.replace("{fee}",s(r.logoFee)).replace("{n}",r.logoMin||1))}</p>`:""}
      <a class="btn btn--accent" href="${e(H(l,(d=o.contact)!=null?d:{},t.corp.msg))}" ${J(l)}>${h(l,18)} ${e(t.corp.cta)}</a>
    </div>
  </div>
</section>`}function Xe({t:o,L:t,url:a,boxes:n,money:r}){return n.length?`<section class="section" id="gifts" aria-labelledby="gift-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(o.gifts.kicker)}</p><h2 id="gift-title" class="h2">${e(o.gifts.title)}</h2><p class="lead">${e(o.gifts.text)}</p></div>
    <ul class="boxes">${n.map(s=>`<li>
      ${s.image?`<img sizes="${I.card}" src="${e(j(a,s.image))}" alt="" width="900" height="675" loading="lazy">`:`<i class="box-ph" aria-hidden="true">${h("gift",40)}</i>`}
      <div><h3>${e(t(s.name))}</h3>${t(s.text)?`<p>${e(t(s.text))}</p>`:""}<b>${s.price?`+ ${e(r(s.price))}`:e(o.gifts.free)}</b>${Number(s.holds)>1?` <small class="muted">${e(o.gifts.holds.replace("{n}",s.holds))}</small>`:""}</div>
    </li>`).join("")}</ul>
  </div>
</section>`:""}function et({t:o,L:t,delivery:a,money:n}){if(!a.cutoff&&!t(a.areas)&&!t(a.text))return"";let r=a.fee?n(a.fee):o.delivery.freeShip;return`<section class="section section--soft" id="delivery" aria-labelledby="del-title">
  <div class="wrap del">
    <div>
      <p class="kicker">${e(o.delivery.kicker)}</p>
      <h2 id="del-title" class="h3">${e(o.delivery.title)}</h2>
      <p class="lead">${e(t(a.text)||o.delivery.text)}</p>
    </div>
    <dl class="del-facts">
      ${a.cutoff?`<div><dt>${h("clock",18)} ${e(o.delivery.cutoff)}</dt><dd data-cutoff="${e(a.cutoff)}" data-before="${e(o.delivery.before)}" data-after="${e(o.delivery.after)}">${e(o.delivery.static.replace("{time}",a.cutoff))}</dd></div>`:""}
      <div><dt>${h("truck",18)} ${e(o.delivery.fee)}</dt><dd>${e(r)}${a.freeFrom?` \xB7 ${e(o.delivery.freeFrom.replace("{a}",n(a.freeFrom)))}`:""}</dd></div>
      ${t(a.areas)?`<div><dt>${h("pin",18)} ${e(o.delivery.areas)}</dt><dd>${e(t(a.areas))}</dd></div>`:""}
    </dl>
  </div>
</section>`}function tt({site:o,L:t}){var n;let a=((n=o.perks)!=null?n:[]).filter(r=>t(r==null?void 0:r.title));return a.length?`<section class="perks" aria-label="${e(o.name)}">
  <ul class="wrap perk-list">${a.map(r=>{var s;return`<li>${h((s=r.icon)!=null?s:"check",24)}<div><b>${e(t(r.title))}</b>${t(r.text)?`<span>${e(t(r.text))}</span>`:""}</div></li>`}).join("")}</ul>
</section>`:""}function at({site:o,t,L:a,lang:n}){let r=pe(o,t,n,"btn btn--line"),s=ue(o);return o.showReviews===!1||!s.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${ge(s,n,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(l,d)=>`<span class="${d<i.rating?"on":""}">${h("star",15)}</span>`).join("")}</p>
      <blockquote>${e(a(i.text))}</blockquote>
      <figcaption>${e(i.name)}${a(i.bought)?`<small>${e(a(i.bought))}</small>`:""}${me(i,n)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function nt({site:o,t,L:a}){var r;let n=((r=o.faq)!=null?r:[]).filter(s=>a(s==null?void 0:s.q));return n.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${n.map((s,i)=>`<details${i===0?" open":""}><summary>${e(a(s.q))}</summary><p>${e(a(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function ot({site:o,t,L:a,channels:n}){var l,d,u;let r=(l=o.contact)!=null?l:{},s=encodeURIComponent((d=r.mapQuery)!=null?d:a(r.address)),i=m=>m.length===7?t.visit.everyDay:se(m,t.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${a(o.visitText)?`<p class="lead">${e(a(o.visitText))}</p>`:""}
      ${de(o,t)}
      ${((u=o.hours)!=null?u:[]).length?`<table class="hours"><tbody>${o.hours.map(m=>`<tr><th scope="row">${e(i(m.days))}</th><td>${e(m.open)} \u2013 ${e(m.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${a(r.address)?`<p class="addr">${h("pin",18)} ${e(a(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(t.visit.directions)} ${h("arrow",16)}</a>
        ${n.map(m=>{var v;return`<a class="btn btn--line" href="${e(H(m,r))}" ${J(m)}>${h(m,18)} ${e((v=t.via[m])!=null?v:m)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function rt(o,t){var F,E,B,L,N,D;let{site:a,t:n,L:r,url:s,money:i,market:l,items:d,channels:u,cat:m,filling:v,gform:b,boxes:y,delivery:c,bulk:w,catalog:f}=o,g=m(t),x=v(t),S=[...d.filter(p=>p.id!==t.id&&p.filling&&p.filling===t.filling),...d.filter(p=>p.id!==t.id&&p.category===t.category),...d.filter(p=>p.id!==t.id&&W(f,p))].filter((p,k,P)=>P.indexOf(p)===k).slice(0,8),z=s(`${l.id}/`),M=n.orderText.replace("{product}",r(t.name)).replace(/\{\w+\}/g,"\u2026"),T=t.variants[0],C=Number(a.cardMax)||150,q=b?` data-gform="${e(b.action)}" data-gmap='${e(JSON.stringify(b.fields))}'`:"",R=p=>u.map((k,P)=>{var $,A;return`<button type="submit" class="btn ${p!=null?p:P?"btn--line":"btn--primary"} btn--lg" data-channel="${e(k)}" data-href="${e(H(k,($=a.contact)!=null?$:{},M))}">${h(k,18)} ${e(k==="phone"?n.product.call:n.product.send.replace("{channel}",(A=n.via[k])!=null?A:k))}</button>`}).join(""),V=[["star",n.product.filling,x?r(x.name):""],["scale",n.product.weight,t.weight?`${t.weight} g`:""],["drop",n.product.yolks,W(f,t)?"":n.shop.yolks[(F=t.yolks)!=null?F:0]],["calendar",n.product.shelf,t.shelf?n.product.days.replace("{n}",t.shelf):""],["thermo",n.product.storage,t.storage?n.storageOf[t.storage]:""],["leaf",n.product.diet,((E=t.diet)!=null?E:[]).map(p=>n.diet[p]).join(", ")]],O=((B=t.allergens)!=null?B:[]).map(p=>n.allergens[p]).filter(Boolean);return`<div class="wrap crumbs"><a href="${z}">${e(n.nav.home)}</a>${h("chevron",14)}<a href="${z}?type=${e(t.category)}#shop">${e(r(g==null?void 0:g.name))}</a>${h("chevron",14)}<span aria-current="page">${e(r(t.name))}</span></div>
<section class="wrap pdp" data-product data-name="${e(r(t.name))}" data-text="${e(n.orderText)}" data-market="${e(`${l.id.toUpperCase()} \xB7 ${l.currency}`)}"
  data-fee="${c.fee}" data-free="${(L=c.freeFrom)!=null?L:""}" data-cutoff="${e((N=c.cutoff)!=null?N:"")}" data-currency="${e(l.currency)}" data-lang="${e(l.lang)}"
  data-tiers='${e(JSON.stringify(w.tiers))}' data-logo="${w.logoFee}" data-logo-min="${w.logoMin}" data-tier-tpl="${e(n.product.tier)}" data-next-tpl="${e(n.product.nextTier)}" data-logo-tpl="${e(n.product.logoMin)}">
  ${st(o,t)}
  <div class="pdp-info">
    <p class="kicker">${e(r(g==null?void 0:g.name))}${x?` \xB7 ${e(r(x.name))}`:""}</p>
    <h1 class="pdp-title">${e(r(t.name))}</h1>
    <p class="pdp-price"><strong data-unit>${e(i(T.price))}</strong>${t.variants.length>1?` <span class="muted" data-unit-label>/ ${e(r(T.label))}</span>`:""}${t.was?` <s>${e(i(t.was))}</s>`:""}</p>
    <p class="lead">${e(r(t.description))}</p>
    ${r(t.contains)?`<div class="inside"><p class="h4">${h("box",18)} ${e(n.product.contains)}</p><p>${e(r(t.contains))}</p></div>`:""}
    ${V.some(p=>p[2])?`<dl class="facts">${V.filter(p=>p[2]).map(([p,k,P])=>`<div>${h(p,18)}<dt>${e(k)}</dt><dd>${e(P)}</dd></div>`).join("")}</dl>`:""}
    ${O.length?`<p class="allergen">${h("shield",16)} <b>${e(n.product.allergens)}</b> ${e(O.join(", "))}</p>`:""}
    ${x&&r(x.text)?`<div class="inside"><p class="h4">${h("star",18)} ${e(n.product.story)}</p><p>${e(r(x.text))}</p></div>`:""}
    <p class="moonbar moonbar--sm" data-moonbar data-days="${e(n.fest.days)}" data-today="${e(n.fest.today)}" data-soon="${e(n.fest.soon)}" data-off="${e(n.fest.off)}" data-by="${e(n.fest.by)}" hidden>${h("calendar",16)} <span data-moon-text></span></p>
    <form class="order" id="order" data-compose${q} novalidate>
      <div class="order-fields">
        ${t.variants.length>1?`<fieldset class="opts"><legend>${e(n.product.size)}</legend><div class="vars">
          ${t.variants.map((p,k)=>`<label class="var"><input type="radio" name="variant" value="${e(r(p.label))}" data-price="${p.price}" data-money="${e(i(p.price))}" data-label="/ ${e(r(p.label))}"${k?"":" checked"}><span>${e(r(p.label))}<b>${e(i(p.price))}</b></span></label>`).join("")}
        </div></fieldset>`:`<input type="hidden" name="variant" value="" data-price="${T.price}">`}
        ${y.length&&t.giftable!==!1?`<fieldset class="opts"><legend>${h("gift",16)} ${e(n.product.box)}</legend><div class="wrap-pick">
          <label class="wp"><input type="radio" name="wrap" value="" data-price="0" checked><i class="wp-ph" aria-hidden="true">${h("box",26)}</i><span><b>${e(n.product.noBox)}</b><small>${e(n.gifts.free)}</small></span></label>
          ${y.map(p=>`<label class="wp"><input type="radio" name="wrap" value="${e(r(p.name))}" data-price="${p.price}" data-holds="${Number(p.holds)||1}">${p.image?`<img src="${e(j(s,p.image))}" alt="" width="96" height="72" loading="lazy">`:""}<span><b>${e(r(p.name))}</b><small>${p.price?`+ ${e(i(p.price))}`:e(n.gifts.free)}${Number(p.holds)>1?` \xB7 ${e(n.gifts.holds.replace("{n}",p.holds))}`:""}</small></span></label>`).join("")}
        </div></fieldset>
        <fieldset class="opts card-box"><legend>${h("doc",16)} ${e(n.product.card)}</legend>
          <label class="wide"><span class="sr">${e(n.product.card)}</span><textarea name="message" rows="3" maxlength="${C}" placeholder="${e(n.product.cardHint)}" data-count-max="${C}"></textarea></label>
          <p class="card-meta"><span class="muted small">${e(n.product.cardNote)}</span><span class="muted small" data-chars>0 / ${C}</span></p>
        </fieldset>`:'<input type="hidden" name="wrap" value="" data-price="0">'}
        <fieldset class="opts"><legend>${h("truck",16)} ${e(n.product.ship)}</legend>
          <div class="fields">
            <label><span>${e(n.product.date)} *</span><input name="date" type="date" required data-date></label>
            <label><span>${e(n.product.qty)}</span><input name="qty" type="number" min="1" max="999" value="1" inputmode="numeric"></label>
            ${w.logoFee?`<label class="wide check"><input type="checkbox" name="logo" value="1"> <span>${h("printer",16)} ${e(n.product.logo.replace("{fee}",i(w.logoFee)))}</span></label>`:""}
            <label><span>${e(n.product.name)} *</span><input name="name" autocomplete="name" required></label>
            <label><span>${e(n.product.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required></label>
            <label class="wide"><span>${e(n.product.address)} *</span><input name="address" autocomplete="street-address" required></label>
            <label class="wide"><span>${e(n.product.note)}</span><input name="note" placeholder="${e(n.product.noteHint)}"></label>
            <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          </div>
          <p class="muted small" data-date-note data-today="${e(n.product.today)}" data-tomorrow="${e(n.product.tomorrow)}" hidden></p>
          ${w.tiers.length?`<p class="tier-note" data-tier-note>${e(n.product.nextTier.replace("{n}",w.tiers[0].min).replace("{pct}",w.tiers[0].pct))}</p>`:""}
          <p class="form-err" data-logo-err hidden></p>
        </fieldset>
        <dl class="sum" data-sum>
          <div><dt>${e(n.product.item)}</dt><dd data-s-gift>${e(i(T.price))}</dd></div>
          <div><dt>${e(n.product.box)}</dt><dd data-s-wrap>${e(n.gifts.free)}</dd></div>
          <div data-s-disc-row hidden><dt>${e(n.product.discount)}</dt><dd data-s-disc></dd></div>
          <div data-s-logo-row hidden><dt>${e(n.product.logoRow)}</dt><dd data-s-logo></dd></div>
          <div><dt>${e(n.delivery.fee)}</dt><dd data-s-ship>${c.fee?e(i(c.fee)):e(n.delivery.freeShip)}</dd></div>
          <div class="sum-total"><dt>${e(n.product.total)}</dt><dd data-s-total>${e(i(T.price+(c.freeFrom&&T.price>=c.freeFrom?0:c.fee)))}</dd></div>
          ${c.freeFrom?`<p class="sum-hint" data-free-hint data-tpl="${e(n.product.freeHint)}" data-ok="${e(n.product.freeOk)}"></p>`:""}
        </dl>
        <p class="form-err" data-err hidden>${e(n.product.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--primary btn--lg btn--full" data-order-submit>${h("bag",18)} <span>${e(n.product.order)}</span></button></div>
        <noscript><p>${u.map(p=>{var k,P;return`<a href="${e(H(p,(k=a.contact)!=null?k:{},M))}" ${J(p)}>${e((P=n.via[p])!=null?P:p)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${b?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${h(b?"check":"arrow",22)} ${e(b?n.product.done:n.product.stepTitle)}</p>
        <p>${e(b?n.product.doneText:n.product.stepText)}</p>
        <div class="buy">${R(b?"btn--line":void 0)}</div>
        ${b?"":`<button type="button" class="link back" data-edit>${e(n.product.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
      ${((D=a.promises)!=null?D:[]).length?`<ul class="promises">${a.promises.map(p=>{var k;return`<li>${h((k=p.icon)!=null?k:"check",18)} ${e(r(p.text))}</li>`}).join("")}</ul>`:""}
    </form>
    ${fe(l.lang)}
  </div>
</section>
${S.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${e(n.product.related)}</h2>
  <ul class="grid grid--related">${S.map(p=>we(o,p)).join("")}</ul>
</div></section>`:""}`}function st({t:o,L:t,url:a},n){var d;let r=[n.image,...(d=n.images)!=null?d:[]],s=o.gallery,i=t(n.name),l=t(n.badge)?`<span class="tag">${e(t(n.badge))}</span>`:"";return r.length===1?`<figure class="pdp-img"><img src="${e(j(a,n.image))}" alt="${e(i)}" width="1000" height="1000" fetchpriority="high">${l}</figure>`:`<figure class="pdp-img gallery" data-gallery>
    <div class="g-stage">
      <ul class="g-track" tabindex="0" aria-label="${e(s.label)}">${r.map((u,m)=>`<li id="g-${m+1}"><a href="${e(j(a,u))}" data-zoom="${m}" aria-label="${e(s.zoom)}: ${e(s.photo.replace("{i}",m+1).replace("{n}",r.length))}"><img sizes="${I.wide}" src="${e(j(a,u))}" alt="${e(m?`${i} \u2013 ${s.photo.replace("{i}",m+1).replace("{n}",r.length)}`:i)}" width="1000" height="1000"${m?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
      ${l}
      <button type="button" class="g-nav g-prev" data-step="-1" aria-label="${e(s.prev)}">${h("chevron",22)}</button>
      <button type="button" class="g-nav g-next" data-step="1" aria-label="${e(s.next)}">${h("chevron",22)}</button>
      <span class="g-count" aria-hidden="true"><b data-g-i>1</b> / ${r.length}</span>
    </div>
    <ul class="g-thumbs">${r.map((u,m)=>`<li><a href="#g-${m+1}" data-go="${m}"${m?"":' aria-current="true"'} aria-label="${e(s.photo.replace("{i}",m+1).replace("{n}",r.length))}"><img sizes="${I.thumb}" src="${e(j(a,u))}" alt="" width="1000" height="1000" loading="lazy"></a></li>`).join("")}</ul>
  </figure>
  <dialog class="lightbox" data-lightbox aria-label="${e(i)}">
    <img src="" alt="${e(i)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(s.close)}">\u2715</button>
    <button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(s.prev)}">${h("chevron",26)}</button>
    <button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(s.next)}">${h("chevron",26)}</button>
    <span class="g-count"><b data-lb-i>1</b> / ${r.length}</span>
  </dialog>`}function it({site:o,t,L:a,market:n}){var i,l;let r=(i=o.contact)!=null?i:{},s=Object.entries((l=o.social)!=null?l:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(o.name)}</p><p class="muted">${e(a(o.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${G(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${a(r.address)?`<li>${e(a(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${s.map(([d,u])=>`<li><a href="${e(u)}" target="_blank" rel="noopener">${e(d==="tiktok"?"TikTok":d==="youtube"?"YouTube":d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${o.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(o.name)}</span>${be(o,t,n.lang)}</div>
</footer>`}function lt({site:o,market:t,L:a,abs:n,items:r}){var i,l,d;let s=(i=o.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"Bakery",name:o.name,url:n(`${t.id}/`),image:n(_(o.heroImage||((l=r[0])==null?void 0:l.image))),description:a(o.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:a(s.address)},currenciesAccepted:t.currency,openingHoursSpecification:ie((d=o.hours)!=null?d:[])}}var ct=({site:o,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:o.faq.filter(a=>t(a==null?void 0:a.q)).map(a=>({"@type":"Question",name:t(a.q),acceptedAnswer:{"@type":"Answer",text:t(a.a)}}))});function dt({site:o,market:t,L:a,abs:n,productPath:r,cat:s},i){var l,d;return{"@context":"https://schema.org","@type":"Product",name:a(i.name),description:a(i.description),image:[i.image,...(l=i.images)!=null?l:[]].map(u=>n(_(u))),url:n(r(i,t)),category:a((d=s(i))==null?void 0:d.name),weight:i.weight?{"@type":"QuantitativeValue",value:i.weight,unitCode:"GRM"}:void 0,offers:{"@type":"Offer",price:i.variants[0].price,priceCurrency:t.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:o.name}}}}function pt({market:o,L:t,abs:a,productPath:n,t:r,cat:s},i){var l;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:a(`${o.id}/`)},{"@type":"ListItem",position:2,name:t((l=s(i))==null?void 0:l.name),item:a(`${o.id}/?type=${i.category}`)},{"@type":"ListItem",position:3,name:t(i.name),item:a(n(i,o))}]}}export{Mt as renderSite};
