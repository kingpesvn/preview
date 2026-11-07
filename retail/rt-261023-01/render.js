var Me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(o="")=>String(o).replace(/[&<>"']/g,t=>Me[t]);function J(o,t,n="vi"){var a,r,s;return o==null?"":typeof o!="object"?String(o):(s=(r=(a=o[t])!=null?a:o[n])!=null?r:Object.values(o)[0])!=null?s:""}var De={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},Q=o=>{var t;return(t=De[o])!=null?t:"en-US"};function Se(o,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(o)-.01);let n=Number(t)||1;return Math.max(n,Math.round(o/n)*n)}function Z(o,t){var a,r;if(t.default)return o.basePrice;let n=(r=(a=o.prices)==null?void 0:a[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:Se(o.basePrice*t.rate,t.rounding)}var ze=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function ee(o,t){let n={style:"currency",currency:t.currency};return ze.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(Q(t.lang),n).format(o)}function te(o="/"){let t=o.endsWith("/")?o:`${o}/`;return(n="")=>t+String(n).replace(/^\//,"")}var U=(o="")=>o.startsWith("uploads/")?o:/^([a-z]+:|\/)/i.test(o)?null:`assets/${o}`,N=(o,t)=>{let n=U(t);return n==null?t:o(n)},A=(o="")=>String(o).replace(/\D/g,"");function I(o,t,n=""){switch(o){case"phone":return`tel:${A(t.phone)}`;case"zalo":return`https://zalo.me/${A(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${A(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var W=o=>`<script type="application/ld+json">${JSON.stringify(o).replace(/</g,"\\u003c")}<\/script>`,Pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function ae(o){if(!o||typeof o!="string")return null;let t;try{t=new URL(o.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let a={};for(let[r,s]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();Pe.includes(i)&&(a[i]=r)}return Object.keys(a).length?a.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:a}:{error:"no-phone"}:{error:"no-fields"}}var F={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Ne={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(o,t=20,n="")=>{var a;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(a=Ne[o])!=null?a:""}</svg>`},Y=[1,2,3,4,5,6,0],je=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function re(o,t){let n=o.map(r=>Y.indexOf(r)).sort((r,s)=>r-s);return n.every((r,s)=>s===0||r===n[s-1]+1)&&n.length>2?`${t[Y[n[0]]]} \u2013 ${t[Y[n.at(-1)]]}`:n.map(r=>t[Y[r]]).join(", ")}var se=o=>o.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>je[n]),opens:t.open,closes:t.close}));function ie(o){var n,a;return(a=(n=new Intl.NumberFormat(Q(o.lang),{style:"currency",currency:o.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?a:o.currency}var _=o=>o==="phone"||o==="email"?"":'target="_blank" rel="noopener"',ce=o=>`<div class="suggest" id="market-suggest" data-suggest="${e(o.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(o.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(o.market.dismiss)}">\xD7</button>
</div>`,le=(o,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(o.hours))}' data-tz="${e((n=o.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},ne={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Ce=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Te=o=>{var t;try{let n=new URL(String((t=o.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&Ce.test(n.hostname)?n.href:""}catch{return""}},pe=(o,t,n,a="btn btn--line")=>{var i;let r=Te(o);if(!r)return"";let s=typeof t.reviews=="object"&&((i=t.reviews)==null?void 0:i.google)||ne[n]||ne.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${a}" href="${e(r)}" target="_blank" rel="noopener">${u("star",16)} ${e(s)}</a></p>`},X={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},de={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},he=o=>{var t;return((t=o.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ue(o,t){var s,i,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=o==null?void 0:o.date)!=null?s:"").trim());if(!n)return"";let a=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(a.getTime()))return"";let r=new Intl.DateTimeFormat((c=de[t])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(a);return`<time class="rv-date" datetime="${e(o.date)}">${e(r)}</time>`}function Le(o,t){var i,c;let n=o.filter(l=>l.rating>=1&&l.rating<=5);if(n.length<2)return"";let a=n.reduce((l,m)=>l+Number(m.rating),0)/n.length,r=(i=X[t])!=null?i:X.en,s=new Intl.NumberFormat((c=de[t])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(a);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(o.length)))}</span></p>`}function me(o,t,n,a){var i;if(!o.length)return"";let r=(i=X[t])!=null?i:X.en,s=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?r.prev:r.next)}">${u("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Le(o,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${o.map(a).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${qe}`}var qe=`<style>
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
upd()}})()<\/script>`,oe={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function ge(o){var a;let t=(a=oe[o])!=null?a:oe.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${u("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${u("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${u("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var fe=(o,t,n)=>o.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function ve({site:o,markets:t,url:n,abs:a}){var i;let r=(i=t.find(c=>c.default))!=null?i:t[0],s=t.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(o.name)}</title>
<link rel="canonical" href="${a(`${r.id}/`)}">
${t.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${a(`${c.id}/`)}">`).join(`
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
<body><p>${t.map(c=>`<a href="${n(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Re="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ye=24;function xe(o,t){var n;return((n=o.products)!=null?n:[]).map(a=>{var r;return{...a,variants:((r=a.variants)!=null?r:[]).map(s=>({...s,price:Z(s,t)})).filter(s=>s.price!=null)}}).filter(a=>a.variants.length>0).map(a=>{let r=Math.min(...a.variants.map(i=>i.price)),s=a.was?Z({basePrice:a.was,prices:a.wasPrices},t):null;return{...a,from:r,was:s&&s>r?s:null}})}function Ee(o){let t=o.filter(s=>s.badge),n=o.filter(s=>!t.includes(s)),a=[...new Set(n.map(s=>s.category))].map(s=>n.filter(i=>i.category===s)),r=[...t];for(let s=0;r.length<o.length;s++)for(let i of a)i[s]&&r.push(i[s]);return r}var Fe=o=>String(o).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function Be(o){let t=10**Math.floor(Math.log10(o));return[1,2,2.5,5,10].map(n=>n*t).reduce((n,a)=>Math.abs(a-o)<Math.abs(n-o)?a:n)}function Ve(o){let t=o.map(a=>a.from).sort((a,r)=>a-r),n=[...new Set([.25,.5,.75].map(a=>Be(t[Math.floor(a*(t.length-1))])))];return n.map((a,r)=>[r?n[r-1]:0,a]).concat([[n[n.length-1],1/0]])}function be(o,t,n){var a;return(t==null?void 0:t[n.id])!=null?t[n.id]:o==null||o===""?null:n.default?Number(o):Math.round(Number(o)*((a=n.rate)!=null?a:1)*100)/100}var Ae=(o,t)=>{var n;return((n=o.wraps)!=null?n:[]).filter(a=>a==null?void 0:a.id).map(a=>({...a,price:a.price?Z({basePrice:a.price,prices:a.prices},t):0})).filter(a=>a.price!=null)};function Oe(o,t){var a,r,s;let n=(a=o.delivery)!=null?a:{};return{...n,fee:(r=be(n.fee,n.feeManual,t))!=null?r:0,freeFrom:be(n.freeFrom,n.freeFromManual,t),slots:((s=n.slots)!=null?s:[]).filter(Boolean)}}function bt({site:o,catalog:t,i18n:n,template:a,basePath:r="/",siteUrl:s=o.domain}){var g,$,f,b;let i=te(r),c=d=>new URL(i(d),s).href,l=t.markets,m=(d,y)=>`${y.id}/${J(d.slug,y.lang,"en")}/`,h=ae(o.orderForm),v=h&&!h.error?h:null,w=[];for(let d of l){let y=d.lang,M=($=(g=n[y])!=null?g:n.en)!=null?$:n.vi,S=D=>J(D,y,"en"),z=xe(t,d),L=(b=(f=o.orderChannels)==null?void 0:f[d.id])!=null?b:["phone"],q=D=>ee(D,d),C=(D,T)=>{var p,k;return S((k=(p=D==null?void 0:D.find(P=>P.id===T))==null?void 0:p.name)!=null?k:T)},j=D=>{var T;return((T=t.categories)!=null?T:[]).find(p=>p.id===D.category)},O=z.length>4?Ve(z):[],H=Ae(o,d),B=Oe(o,d),R={site:o,catalog:t,market:d,markets:l,lang:y,t:M,L:S,url:i,abs:c,channels:L,money:q,items:z,productPath:m,template:a,name:C,cat:j,gform:v,bands:O,wraps:H,delivery:B};w.push({path:`${d.id}/index.html`,html:$e(R,{kind:"home"})});for(let D of z)w.push({path:`${m(D,d)}index.html`,html:$e(R,{kind:"product",product:D})})}return w.push({path:"index.html",html:ve({site:o,markets:l,url:i,abs:c})}),w}function $e(o,t){var B,R,D,T,p,k,P,E,G;let{site:n,market:a,markets:r,lang:s,t:i,L:c,url:l,abs:m,catalog:h,productPath:v,channels:w}=o,g=t.kind==="home",$=t.product,f=g?`${a.id}/`:v($,a),b=g?`${n.name} \xB7 ${c(n.tagline)}`:`${c($.name)} \xB7 ${n.name}`,d=g?c(n.intro):`${c($.description)} ${o.money($.from)}.`,y=r.map(x=>{var V;return g?{m:x,href:`${x.id}/`}:xe({products:[((V=h.products)!=null?V:[]).find(K=>K.id===$.id)]},x).length?{m:x,href:v($,x)}:null}).filter(Boolean),M=x=>{var V,K;return(K=(V=y.find(we=>we.m.id===x.id))==null?void 0:V.href)!=null?K:`${x.id}/`},S=(B=r.find(x=>x.default))!=null?B:r[0],z=(R=n.theme)!=null?R:{},L=["primary","ink","bg","surface","soft","accent"].filter(x=>z[x]).map(x=>`--${x}:${z[x]}`).join(";"),q=r.map(x=>({id:x.id,lang:x.lang,country:x.country,currency:x.currency,href:l(M(x))})),C=w[0],j=(D=n.contact)!=null?D:{},O=n.heroImage||((T=o.items[0])==null?void 0:T.image),H=m(U(g?O:$.image));return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(b)}</title>
<meta name="description" content="${e(d)}">
<link rel="canonical" href="${m(f)}">
${y.map(({m:x,href:V})=>`<link rel="alternate" hreflang="${e(x.lang)}-${e(x.country)}" href="${m(V)}">`).join(`
`)}
${y.some(x=>x.m.id===S.id)?`<link rel="alternate" hreflang="x-default" href="${m(M(S))}">`:""}
<meta property="og:type" content="${g?"website":"product"}">
<meta property="og:title" content="${e(b)}">
<meta property="og:description" content="${e(d)}">
<meta property="og:url" content="${m(f)}">
<meta property="og:image" content="${e(H)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((p=z.bg)!=null?p:"#FFF8F3")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Re}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${L}}</style>
${g?W(at(o))+(((k=n.faq)!=null?k:[]).length?W(nt(o)):""):W(ot(o,$))+W(rt(o,$))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(a.id)}" data-markets='${e(JSON.stringify(q))}' data-copied="${e(i.copied)}" data-wa="${e(A((P=j.whatsapp)!=null?P:""))}" data-email="${e((E=j.email)!=null?E:"")}" data-tz="${e((G=n.timezone)!=null?G:"Asia/Ho_Chi_Minh")}" data-locale="${e(s)}">
<a class="skip" href="#main">${e(i.skip)}</a>
${ce(i)}
${c(n.announcement)?`<p class="announce">${u("heart",15)} ${e(c(n.announcement))}</p>`:""}
${He(o,g)}
<main id="main">
${g?[Ie,Ge,Ue,We,_e,Ke,Je,Ze,Ye,Xe].map(x=>x(o)).join(`
`):Qe(o,$)}
</main>
${tt(o)}
<nav class="dock" aria-label="${e(i.nav.order)}">
  <a href="${g?"":l(`${a.id}/`)}#shop">${u("search",20)}<span>${e(i.nav.shop)}</span></a>
  <a class="primary" href="${e(g?I(C,j):"#order")}" ${g?_(C):""}>${u(g?C:"bag",20)}<span>${e(g?i.nav.order:i.nav.buy)}</span></a>
</nav>
</body>
</html>
`}function He({site:o,market:t,markets:n,t:a,L:r,url:s},i){var h;let c=i?"":s(`${t.id}/`),l=[[`${c}#occasions`,a.nav.occasions],[`${c}#shop`,a.nav.shop],[`${c}#wrap`,a.nav.wrap],[`${c}#delivery`,a.nav.delivery],[`${c}#visit`,a.nav.contact]],m=(h=o.contact)!=null?h:{};return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${t.id}/`)}">
      ${o.logo?`<img src="${e(N(s,o.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("heart",18)}</span>`}
      <span>${e(o.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${l.map(([v,w])=>`<a href="${v}">${e(w)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(a.market.label)}">${u("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(ie(t))}</span></span></summary>
        <ul>${n.map(v=>`<li><a href="${s(`${v.id}/`)}" hreflang="${e(v.lang)}"${v.id===t.id?' aria-current="true"':""}>${e(v.country)} \xB7 ${e(v.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      ${m.phone?`<a class="btn btn--primary btn--sm hide-sm" href="tel:${A(m.phone)}">${u("phone",16)} ${e(m.phone)}</a>`:""}
      <details class="mnav">
        <summary aria-label="${e(a.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${l.map(([v,w])=>`<a href="${v}">${e(w)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Ie(o){var $,f,b;let{site:t,t:n,L:a,url:r,items:s,catalog:i,money:c,bands:l}=o,m=t.heroImage||(($=s[0])==null?void 0:$.image),h=((f=i.recipients)!=null?f:[]).filter(d=>s.some(y=>{var M;return(M=y.recipients)==null?void 0:M.includes(d.id)})),v=((b=i.occasions)!=null?b:[]).filter(d=>s.some(y=>{var M;return(M=y.occasions)==null?void 0:M.includes(d.id)})),w=([d,y])=>d?y===1/0?n.shop.over.replace("{a}",c(d)):`${c(d)} \u2013 ${c(y)}`:n.shop.under.replace("{b}",c(y)),g=(d,y,M,S)=>`<label><span>${e(y)}</span><select name="${d}"><option value="">${e(M)}</option>${S}</select></label>`;return`<section class="hero">
  ${m?`<img class="hero-img" src="${e(N(r,m))}" alt="" width="1600" height="900" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${a(t.heroKicker)?`<p class="kicker">${e(a(t.heroKicker))}</p>`:""}
    <h1>${e(a(t.tagline))}</h1>
    <p class="lead">${e(a(t.intro))}</p>
    <div class="actions">
      <a class="btn btn--primary btn--lg" href="#shop">${e(n.hero.shop)} ${u("arrow",18)}</a>
      <a class="btn btn--light btn--lg" href="#delivery">${u("truck",18)} ${e(n.hero.delivery)}</a>
    </div>
  </div>
  <div class="wrap">
    <form class="finder" action="#shop" method="get" data-finder>
      <p class="finder-h">${u("heart",20)} ${e(n.finder.title)}</p>
      ${h.length?g("for",n.finder.who,n.finder.anyone,h.map(d=>`<option value="${e(d.id)}">${e(a(d.name))}</option>`).join("")):""}
      ${v.length?g("occ",n.finder.occasion,n.finder.anyOcc,v.map(d=>`<option value="${e(d.id)}">${e(a(d.name))}</option>`).join("")):""}
      ${l.length?g("band",n.finder.budget,n.finder.anyBudget,l.map(d=>`<option value="${d[0]}-${d[1]===1/0?"":d[1]}">${e(w(d))}</option>`).join("")):""}
      <button type="submit" class="btn btn--primary btn--lg">${u("search",18)} ${e(n.finder.go)}</button>
    </form>
  </div>
</section>`}function Ge({catalog:o,items:t,t:n,L:a,url:r}){var c;let s=((c=o.occasions)!=null?c:[]).map(l=>({...l,n:t.filter(m=>{var h;return(h=m.occasions)==null?void 0:h.includes(l.id)}).length})).filter(l=>l.n);if(!s.length)return"";let i=new Set;return`<section class="section" id="occasions" aria-labelledby="occ-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.occ.kicker)}</p><h2 id="occ-title" class="h2">${e(n.occ.title)}</h2><p class="lead">${e(n.occ.text)}</p></div>
    <ul class="occ">${s.map(l=>{var h,v,w;let m=(w=l.image)!=null?w:(v=(h=t.find(g=>{var $;return(($=g.occasions)==null?void 0:$.includes(l.id))&&!i.has(g.image)}))!=null?h:t.find(g=>{var $;return($=g.occasions)==null?void 0:$.includes(l.id)}))==null?void 0:v.image;return i.add(m),`<li><a href="?occ=${e(l.id)}#shop" data-filter-link="occ" data-value="${e(l.id)}">
      <span class="occ-img">${m?`<img sizes="${F.card}" src="${e(N(r,m))}" alt="" width="800" height="800" loading="lazy">`:""}</span>
      <span class="occ-name">${e(a(l.name))}</span><span class="occ-c">${e(n.occ.count.replace("{n}",l.n))}</span>
    </a></li>`}).join("")}</ul>
  </div>
</section>`}function ke(o,t,n=0){var $,f,b,d,y,M,S,z,L,q,C;let{t:a,L:r,url:s,money:i,productPath:c,market:l,catalog:m,name:h,cat:v}=o,w=[r(t.name),($=t.name)==null?void 0:$.vi,(f=t.name)==null?void 0:f.en,r((b=v(t))==null?void 0:b.name),(y=(d=v(t))==null?void 0:d.name)==null?void 0:y.vi,...((M=t.recipients)!=null?M:[]).map(j=>h(m.recipients,j)),...((S=t.occasions)!=null?S:[]).map(j=>h(m.occasions,j)),r(t.includes)].filter(Boolean).join(" "),g=(z=t.images)==null?void 0:z[0];return`<li class="card${n>=ye?" is-more":""}" data-type="${e(t.category)}" data-for="${e(((L=t.recipients)!=null?L:[]).join(" "))}" data-occ="${e(((q=t.occasions)!=null?q:[]).join(" "))}" data-price="${t.from}" data-name="${e(Fe(w))}">
  <a class="card-link" href="${s(c(t,l))}">
    <div class="card-img${g?" has-alt":""}">
      <img sizes="${F.card}" src="${e(N(s,t.image))}" alt="${e(r(t.name))}" width="1000" height="1000" loading="lazy">
      ${g?`<img sizes="${F.card}" class="alt" src="${e(N(s,g))}" alt="" width="1000" height="1000" loading="lazy">`:""}
      ${t.was?`<span class="tag tag--sale">-${Math.round((1-t.from/t.was)*100)}%</span>`:r(t.badge)?`<span class="tag">${e(r(t.badge))}</span>`:""}
    </div>
    <p class="card-cat">${e(r((C=v(t))==null?void 0:C.name))}</p>
    <h3>${e(r(t.name))}</h3>
    <p class="card-price">${t.variants.length>1?`<span>${e(a.shop.from)}</span> `:""}<b>${e(i(t.from))}</b>${t.was?` <s>${e(i(t.was))}</s>`:""}</p>
  </a>
</li>`}function Ue(o){var w,g,$;let{items:t,catalog:n,t:a,L:r,money:s,bands:i}=o,c=((w=n.categories)!=null?w:[]).filter(f=>t.some(b=>b.category===f.id)),l=((g=n.recipients)!=null?g:[]).filter(f=>t.some(b=>{var d;return(d=b.recipients)==null?void 0:d.includes(f.id)})),m=(($=n.occasions)!=null?$:[]).filter(f=>t.some(b=>{var d;return(d=b.occasions)==null?void 0:d.includes(f.id)})),h=([f,b])=>f?b===1/0?a.shop.over.replace("{a}",s(f)):`${s(f)} \u2013 ${s(b)}`:a.shop.under.replace("{b}",s(b)),v=(f,b,d,y)=>`<label class="select"><span class="sr">${e(b)}</span><select ${f}><option value="">${e(d)}</option>${y}</select></label>`;return`<section class="section section--soft" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.shop.kicker)}</p><h2 id="shop-title" class="h2">${e(a.shop.title)}</h2>
      <p class="lead" data-count="${e(a.shop.count)}">${e(a.shop.count.replace("{n}",t.length))}</p>
    </div>
    <div class="toolbar" data-toolbar>
      <div class="chips" role="group" aria-label="${e(a.shop.all)}">
        <button type="button" class="pill is-on" data-type="">${e(a.shop.all)}</button>
        ${c.map(f=>`<button type="button" class="pill" data-type="${e(f.id)}">${e(r(f.name))}</button>`).join("")}
      </div>
      <div class="filters">
        <label class="search">${u("search",18)}<input type="search" placeholder="${e(a.search)}" aria-label="${e(a.search)}" data-search></label>
        ${l.length?v("data-for",a.finder.who,a.finder.anyone,l.map(f=>`<option value="${e(f.id)}">${e(r(f.name))}</option>`).join("")):""}
        ${m.length?v("data-occ",a.finder.occasion,a.finder.anyOcc,m.map(f=>`<option value="${e(f.id)}">${e(r(f.name))}</option>`).join("")):""}
        ${i.length?v("data-band",a.finder.budget,a.finder.anyBudget,i.map(f=>`<option value="${f[0]}-${f[1]===1/0?"":f[1]}">${e(h(f))}</option>`).join("")):""}
        <label class="select"><span class="sr">${e(a.shop.sort)}</span><select data-sort>
          <option value="">${e(a.shop.sortPop)}</option><option value="asc">${e(a.shop.sortLow)}</option><option value="desc">${e(a.shop.sortHigh)}</option>
        </select></label>
      </div>
      <p class="picked" data-picked hidden><span data-picked-text></span> <button type="button" class="link" data-reset>${e(a.shop.reset)}</button></p>
    </div>
    <ul class="grid" data-grid>${Ee(t).map((f,b)=>ke(o,f,b)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${e(a.shop.empty)}</p>
    ${t.length>ye?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(a.shop.more)}</button></div>`:""}
  </div>
</section>`}function We({site:o,t,L:n,url:a,wraps:r,money:s}){var i;return r.length?`<section class="section" id="wrap" aria-labelledby="wrap-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.wrap.kicker)}</p><h2 id="wrap-title" class="h2">${e(t.wrap.title)}</h2><p class="lead">${e(t.wrap.text.replace("{n}",(i=o.cardMax)!=null?i:150))}</p></div>
    <ul class="wraps">${r.map(c=>`<li class="wrap-card">
      ${c.image?`<img sizes="${F.card}" src="${e(N(a,c.image))}" alt="" width="800" height="600" loading="lazy">`:`<span class="wrap-ph">${u("heart",28)}</span>`}
      <div><h3>${e(n(c.name))}</h3>${n(c.text)?`<p>${e(n(c.text))}</p>`:""}<b class="wrap-price">${c.price?`+ ${e(s(c.price))}`:e(t.wrap.free)}</b></div>
    </li>`).join("")}</ul>
    <ol class="card-steps">${t.wrap.steps.map((c,l)=>`<li><span>${l+1}</span>${e(c)}</li>`).join("")}</ol>
  </div>
</section>`:""}function _e({site:o,t,L:n,delivery:a,money:r}){if(!a.slots.length&&!a.cutoff&&!n(a.areas))return"";let s=a.fee?r(a.fee):t.delivery.freeShip;return`<section class="section section--ink" id="delivery" aria-labelledby="del-title">
  <div class="wrap del">
    <div>
      <p class="kicker">${e(t.delivery.kicker)}</p>
      <h2 id="del-title" class="h2">${e(t.delivery.title)}</h2>
      <p class="lead">${e(n(a.text)||t.delivery.text)}</p>
      ${a.cutoff?`<p class="cutoff" data-cutoff="${e(a.cutoff)}" data-before="${e(t.delivery.before)}" data-after="${e(t.delivery.after)}">${u("clock",20)} <span>${e(t.delivery.static.replace("{time}",a.cutoff))}</span></p>`:""}
    </div>
    <dl class="del-facts">
      ${a.slots.length?`<div><dt>${u("calendar",18)} ${e(t.delivery.slots)}</dt><dd><ul class="slots">${a.slots.map(i=>`<li>${e(i)}</li>`).join("")}</ul></dd></div>`:""}
      <div><dt>${u("truck",18)} ${e(t.delivery.fee)}</dt><dd>${e(s)}${a.freeFrom?` \xB7 ${e(t.delivery.freeFrom.replace("{a}",r(a.freeFrom)))}`:""}</dd></div>
      ${n(a.areas)?`<div><dt>${u("pin",18)} ${e(t.delivery.areas)}</dt><dd>${e(n(a.areas))}</dd></div>`:""}
      <div><dt>${u("lock",18)} ${e(t.delivery.secretTitle)}</dt><dd>${e(t.delivery.secret)}</dd></div>
    </dl>
  </div>
</section>`}function Ke({site:o,t,L:n,url:a,channels:r}){var c,l;let s=(c=o.corporate)!=null?c:{};if(!n(s.title))return"";let i=r[0];return`<section class="section" aria-labelledby="corp-title">
  <div class="wrap corp">
    ${s.image?`<img sizes="${F.wide}" src="${e(N(a,s.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
    <div>
      <p class="kicker">${e(t.corp.kicker)}</p>
      <h2 id="corp-title" class="h3">${e(n(s.title))}</h2>
      ${n(s.text)?`<p class="lead">${e(n(s.text))}</p>`:""}
      <a class="btn btn--primary" href="${e(I(i,(l=o.contact)!=null?l:{},t.corp.msg))}" ${_(i)}>${u(i,18)} ${e(t.corp.cta)}</a>
    </div>
  </div>
</section>`}function Je({site:o,L:t}){var a;let n=((a=o.perks)!=null?a:[]).filter(r=>t(r==null?void 0:r.title));return n.length?`<section class="perks" aria-label="${e(o.name)}">
  <ul class="wrap perk-list">${n.map(r=>{var s;return`<li>${u((s=r.icon)!=null?s:"check",24)}<div><b>${e(t(r.title))}</b>${t(r.text)?`<span>${e(t(r.text))}</span>`:""}</div></li>`}).join("")}</ul>
</section>`:""}function Ze({site:o,t,L:n,lang:a}){let r=pe(o,t,a,"btn btn--line"),s=he(o);return o.showReviews===!1||!s.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${me(s,a,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(c,l)=>`<span class="${l<i.rating?"on":""}">${u("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(i.text))}</blockquote>
      <figcaption>${e(i.name)}${n(i.bought)?`<small>${e(n(i.bought))}</small>`:""}${ue(i,a)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ye({site:o,t,L:n}){var r;let a=((r=o.faq)!=null?r:[]).filter(s=>n(s==null?void 0:s.q));return a.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${a.map((s,i)=>`<details${i===0?" open":""}><summary>${e(n(s.q))}</summary><p>${e(n(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Xe({site:o,t,L:n,channels:a}){var c,l,m;let r=(c=o.contact)!=null?c:{},s=encodeURIComponent((l=r.mapQuery)!=null?l:n(r.address)),i=h=>h.length===7?t.visit.everyDay:re(h,t.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${le(o,t)}
      ${((m=o.hours)!=null?m:[]).length?`<table class="hours"><tbody>${o.hours.map(h=>`<tr><th scope="row">${e(i(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${u("pin",18)} ${e(n(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(t.visit.directions)} ${u("arrow",16)}</a>
        ${a.map(h=>{var v;return`<a class="btn btn--line" href="${e(I(h,r))}" ${_(h)}>${u(h,18)} ${e((v=t.via[h])!=null?v:h)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Qe(o,t){var O,H,B,R,D,T;let{site:n,t:a,L:r,url:s,money:i,market:c,items:l,channels:m,cat:h,gform:v,wraps:w,delivery:g,catalog:$,name:f}=o,b=h(t),d=[...l.filter(p=>{var k;return p.id!==t.id&&((k=p.occasions)==null?void 0:k.some(P=>{var E;return(E=t.occasions)==null?void 0:E.includes(P)}))}),...l.filter(p=>p.id!==t.id&&p.category===t.category)].filter((p,k,P)=>P.indexOf(p)===k).slice(0,8),y=s(`${c.id}/`),M=a.orderText.replace("{product}",r(t.name)).replace(/\{\w+\}/g,"\u2026"),S=t.variants[0],z=Number(n.cardMax)||150,L=v?` data-gform="${e(v.action)}" data-gmap='${e(JSON.stringify(v.fields))}'`:"",q=p=>m.map((k,P)=>{var E,G;return`<button type="submit" class="btn ${p!=null?p:P?"btn--line":"btn--primary"} btn--lg" data-channel="${e(k)}" data-href="${e(I(k,(E=n.contact)!=null?E:{},M))}">${u(k,18)} ${e(k==="phone"?a.product.call:a.product.send.replace("{channel}",(G=a.via[k])!=null?G:k))}</button>`}).join(""),C=String((O=r(t.includes))!=null?O:"").split(`
`).map(p=>p.trim()).filter(Boolean),j=[...((H=t.recipients)!=null?H:[]).map(p=>f($.recipients,p)),...((B=t.occasions)!=null?B:[]).map(p=>f($.occasions,p))];return`<div class="wrap crumbs"><a href="${y}">${e(a.nav.home)}</a>${u("chevron",14)}<a href="${y}?type=${e(t.category)}#shop">${e(r(b==null?void 0:b.name))}</a>${u("chevron",14)}<span aria-current="page">${e(r(t.name))}</span></div>
<section class="wrap pdp" data-product data-name="${e(r(t.name))}" data-text="${e(a.orderText)}" data-market="${e(`${c.id.toUpperCase()} \xB7 ${c.currency}`)}"
  data-fee="${g.fee}" data-free="${(R=g.freeFrom)!=null?R:""}" data-cutoff="${e((D=g.cutoff)!=null?D:"")}" data-currency="${e(c.currency)}" data-lang="${e(c.lang)}">
  ${et(o,t)}
  <div class="pdp-info">
    <p class="kicker">${e(r(b==null?void 0:b.name))}</p>
    <h1 class="pdp-title">${e(r(t.name))}</h1>
    <p class="pdp-price"><strong data-unit>${e(i(S.price))}</strong>${t.was?` <s>${e(i(t.was))}</s> <span class="tag tag--sale tag--inline">-${Math.round((1-t.from/t.was)*100)}%</span>`:""}</p>
    <p class="lead">${e(r(t.description))}</p>
    ${j.length?`<ul class="tags">${j.map(p=>`<li>${e(p)}</li>`).join("")}</ul>`:""}
    ${C.length?`<div class="inside"><h2 class="h4">${u("bag",18)} ${e(a.product.inside)}</h2><ul>${C.map(p=>`<li>${u("check",16)} ${e(p)}</li>`).join("")}</ul></div>`:""}
    <form class="order" id="order" data-compose${L} novalidate>
      <div class="order-fields">
        ${t.variants.length>1?`<fieldset class="opts"><legend>${e(a.product.option)}</legend><div class="vars">
          ${t.variants.map((p,k)=>`<label class="var"><input type="radio" name="variant" value="${e(r(p.label))}" data-price="${p.price}" data-money="${e(i(p.price))}"${k?"":" checked"}><span>${e(r(p.label))}<b>${e(i(p.price))}</b></span></label>`).join("")}
        </div></fieldset>`:`<input type="hidden" name="variant" value="" data-price="${S.price}">`}
        ${w.length?`<fieldset class="opts"><legend>${u("heart",16)} ${e(a.product.wrap)}</legend><div class="wrap-pick">
          <label class="wp"><input type="radio" name="wrap" value="" data-price="0" checked><i class="wp-ph" aria-hidden="true">${u("bag",26)}</i><span><b>${e(a.product.noWrap)}</b><small>${e(a.wrap.free)}</small></span></label>
          ${w.map(p=>`<label class="wp"><input type="radio" name="wrap" value="${e(r(p.name))}" data-price="${p.price}">${p.image?`<img src="${e(N(s,p.image))}" alt="" width="96" height="72" loading="lazy">`:""}<span><b>${e(r(p.name))}</b><small>${p.price?`+ ${e(i(p.price))}`:e(a.wrap.free)}</small></span></label>`).join("")}
        </div></fieldset>`:""}
        <fieldset class="opts card-box"><legend>${u("doc",16)} ${e(a.product.card)}</legend>
          <label class="wide"><span class="sr">${e(a.product.card)}</span><textarea name="message" rows="3" maxlength="${z}" placeholder="${e(a.product.cardHint)}" data-count-max="${z}"></textarea></label>
          <p class="card-meta"><label class="check"><input type="checkbox" name="secret" value="1"> ${e(a.product.secret)}</label><span class="muted small" data-chars>0 / ${z}</span></p>
        </fieldset>
        <fieldset class="opts"><legend>${u("calendar",16)} ${e(a.product.when)}</legend>
          <div class="fields">
            <label><span>${e(a.product.date)} *</span><input name="date" type="date" required data-date></label>
            <label><span>${e(a.product.slot)}</span><select name="slot" data-slot>${g.slots.map(p=>`<option>${e(p)}</option>`).join("")}<option value="">${e(a.product.anySlot)}</option></select></label>
          </div>
          <p class="muted small" data-date-note data-today="${e(a.product.today)}" data-tomorrow="${e(a.product.tomorrow)}" hidden></p>
        </fieldset>
        <fieldset class="opts"><legend>${u("pin",16)} ${e(a.product.to)}</legend>
          <div class="fields">
            <label><span>${e(a.product.toName)} *</span><input name="toName" required></label>
            <label><span>${e(a.product.toPhone)}</span><input name="toPhone" type="tel" inputmode="tel"></label>
            <label class="wide"><span>${e(a.product.address)} *</span><input name="address" autocomplete="street-address" required></label>
          </div>
        </fieldset>
        <fieldset class="opts"><legend>${u("users",16)} ${e(a.product.from)}</legend>
          <div class="fields">
            <label><span>${e(a.product.name)} *</span><input name="name" autocomplete="name" required></label>
            <label><span>${e(a.product.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required></label>
            <label><span>${e(a.product.qty)}</span><input name="qty" type="number" min="1" max="50" value="1" inputmode="numeric"></label>
            <label><span>${e(a.product.note)}</span><input name="note" placeholder="${e(a.product.noteHint)}"></label>
            <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          </div>
        </fieldset>
        <dl class="sum" data-sum>
          <div><dt>${e(a.product.gift)}</dt><dd data-s-gift>${e(i(S.price))}</dd></div>
          <div><dt>${e(a.product.wrap)}</dt><dd data-s-wrap>${e(a.wrap.free)}</dd></div>
          <div><dt>${e(a.delivery.fee)}</dt><dd data-s-ship>${g.fee?e(i(g.fee)):e(a.delivery.freeShip)}</dd></div>
          <div class="sum-total"><dt>${e(a.product.total)}</dt><dd data-s-total>${e(i(S.price+(g.freeFrom&&S.price>=g.freeFrom?0:g.fee)))}</dd></div>
          ${g.freeFrom?`<p class="sum-hint" data-free-hint data-tpl="${e(a.product.freeHint)}" data-ok="${e(a.product.freeOk)}"></p>`:""}
        </dl>
        <p class="form-err" data-err hidden>${e(a.product.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--primary btn--lg btn--full" data-order-submit>${u("bag",18)} <span>${e(a.product.order)}</span></button></div>
        <noscript><p>${m.map(p=>{var k,P;return`<a href="${e(I(p,(k=n.contact)!=null?k:{},M))}" ${_(p)}>${e((P=a.via[p])!=null?P:p)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${v?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${u(v?"check":"arrow",22)} ${e(v?a.product.done:a.product.stepTitle)}</p>
        <p>${e(v?a.product.doneText:a.product.stepText)}</p>
        <div class="buy">${q(v?"btn--line":void 0)}</div>
        ${v?"":`<button type="button" class="link back" data-edit>${e(a.product.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
      ${((T=n.promises)!=null?T:[]).length?`<ul class="promises">${n.promises.map(p=>{var k;return`<li>${u((k=p.icon)!=null?k:"check",18)} ${e(r(p.text))}</li>`}).join("")}</ul>`:""}
    </form>
    ${ge(c.lang)}
  </div>
</section>
${d.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${e(a.product.related)}</h2>
  <ul class="grid grid--related">${d.map(p=>ke(o,p)).join("")}</ul>
</div></section>`:""}`}function et({t:o,L:t,url:n},a){var l;let r=[a.image,...(l=a.images)!=null?l:[]],s=o.gallery,i=t(a.name),c=t(a.badge)?`<span class="tag">${e(t(a.badge))}</span>`:"";return r.length===1?`<figure class="pdp-img"><img src="${e(N(n,a.image))}" alt="${e(i)}" width="1000" height="1000" fetchpriority="high">${c}</figure>`:`<figure class="pdp-img gallery" data-gallery>
    <div class="g-stage">
      <ul class="g-track" tabindex="0" aria-label="${e(s.label)}">${r.map((m,h)=>`<li id="g-${h+1}"><a href="${e(N(n,m))}" data-zoom="${h}" aria-label="${e(s.zoom)}: ${e(s.photo.replace("{i}",h+1).replace("{n}",r.length))}"><img sizes="${F.wide}" src="${e(N(n,m))}" alt="${e(h?`${i} \u2013 ${s.photo.replace("{i}",h+1).replace("{n}",r.length)}`:i)}" width="1000" height="1000"${h?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
      ${c}
      <button type="button" class="g-nav g-prev" data-step="-1" aria-label="${e(s.prev)}">${u("chevron",22)}</button>
      <button type="button" class="g-nav g-next" data-step="1" aria-label="${e(s.next)}">${u("chevron",22)}</button>
      <span class="g-count" aria-hidden="true"><b data-g-i>1</b> / ${r.length}</span>
    </div>
    <ul class="g-thumbs">${r.map((m,h)=>`<li><a href="#g-${h+1}" data-go="${h}"${h?"":' aria-current="true"'} aria-label="${e(s.photo.replace("{i}",h+1).replace("{n}",r.length))}"><img sizes="${F.thumb}" src="${e(N(n,m))}" alt="" width="1000" height="1000" loading="lazy"></a></li>`).join("")}</ul>
  </figure>
  <dialog class="lightbox" data-lightbox aria-label="${e(i)}">
    <img src="" alt="${e(i)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(s.close)}">\u2715</button>
    <button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(s.prev)}">${u("chevron",26)}</button>
    <button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(s.next)}">${u("chevron",26)}</button>
    <span class="g-count"><b data-lb-i>1</b> / ${r.length}</span>
  </dialog>`}function tt({site:o,t,L:n,market:a}){var i,c;let r=(i=o.contact)!=null?i:{},s=Object.entries((c=o.social)!=null?c:{}).filter(([,l])=>l);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(o.name)}</p><p class="muted">${e(n(o.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${A(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${s.map(([l,m])=>`<li><a href="${e(m)}" target="_blank" rel="noopener">${e(l==="tiktok"?"TikTok":l==="youtube"?"YouTube":l[0].toUpperCase()+l.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${o.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(o.name)}</span>${fe(o,t,a.lang)}</div>
</footer>`}function at({site:o,market:t,L:n,abs:a,items:r}){var i,c,l;let s=(i=o.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"Store",name:o.name,url:a(`${t.id}/`),image:a(U(o.heroImage||((c=r[0])==null?void 0:c.image))),description:n(o.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:n(s.address)},currenciesAccepted:t.currency,openingHoursSpecification:se((l=o.hours)!=null?l:[])}}var nt=({site:o,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:o.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});function ot({site:o,market:t,L:n,abs:a,productPath:r,cat:s},i){var c,l;return{"@context":"https://schema.org","@type":"Product",name:n(i.name),description:n(i.description),image:[i.image,...(c=i.images)!=null?c:[]].map(m=>a(U(m))),url:a(r(i,t)),category:n((l=s(i))==null?void 0:l.name),offers:{"@type":"Offer",price:i.variants[0].price,priceCurrency:t.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:o.name}}}}function rt({market:o,L:t,abs:n,productPath:a,t:r,cat:s},i){var c;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:n(`${o.id}/`)},{"@type":"ListItem",position:2,name:t((c=s(i))==null?void 0:c.name),item:n(`${o.id}/?type=${i.category}`)},{"@type":"ListItem",position:3,name:t(i.name),item:n(a(i,o))}]}}export{bt as renderSite};
