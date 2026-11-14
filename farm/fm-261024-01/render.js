var Me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(o="")=>String(o).replace(/[&<>"']/g,a=>Me[a]);function J(o,a,n="vi"){var t,r,s;return o==null?"":typeof o!="object"?String(o):(s=(r=(t=o[a])!=null?t:o[n])!=null?r:Object.values(o)[0])!=null?s:""}var Se={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},Q=o=>{var a;return(a=Se[o])!=null?a:"en-US"};function De(o,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(o)-.01);let n=Number(a)||1;return Math.max(n,Math.round(o/n)*n)}function Z(o,a){var t,r;if(a.default)return o.basePrice;let n=(r=(t=o.prices)==null?void 0:t[a.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:De(o.basePrice*a.rate,a.rounding)}var ze=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function ee(o,a){let n={style:"currency",currency:a.currency};return ze.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(Q(a.lang),n).format(o)}function ae(o="/"){let a=o.endsWith("/")?o:`${o}/`;return(n="")=>a+String(n).replace(/^\//,"")}var U=(o="")=>o.startsWith("uploads/")?o:/^([a-z]+:|\/)/i.test(o)?null:`assets/${o}`,P=(o,a)=>{let n=U(a);return n==null?a:o(n)},O=(o="")=>String(o).replace(/\D/g,"");function H(o,a,n=""){switch(o){case"phone":return`tel:${O(a.phone)}`;case"zalo":return`https://zalo.me/${O(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${O(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var W=o=>`<script type="application/ld+json">${JSON.stringify(o).replace(/</g,"\\u003c")}<\/script>`,Pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function te(o){if(!o||typeof o!="string")return null;let a;try{a=new URL(o.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let t={};for(let[r,s]of a.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();Pe.includes(i)&&(t[i]=r)}return Object.keys(t).length?t.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:t}:{error:"no-phone"}:{error:"no-fields"}}var V={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Ne={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(o,a=20,n="")=>{var t;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(t=Ne[o])!=null?t:""}</svg>`},Y=[1,2,3,4,5,6,0],je=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function re(o,a){let n=o.map(r=>Y.indexOf(r)).sort((r,s)=>r-s);return n.every((r,s)=>s===0||r===n[s-1]+1)&&n.length>2?`${a[Y[n[0]]]} \u2013 ${a[Y[n.at(-1)]]}`:n.map(r=>a[Y[r]]).join(", ")}var se=o=>o.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>je[n]),opens:a.open,closes:a.close}));function ie(o){var n,t;return(t=(n=new Intl.NumberFormat(Q(o.lang),{style:"currency",currency:o.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?t:o.currency}var _=o=>o==="phone"||o==="email"?"":'target="_blank" rel="noopener"',le=o=>`<div class="suggest" id="market-suggest" data-suggest="${e(o.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(o.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(o.market.dismiss)}">\xD7</button>
</div>`,ce=(o,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(o.hours))}' data-tz="${e((n=o.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},ne={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Ce=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Te=o=>{var a;try{let n=new URL(String((a=o.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&Ce.test(n.hostname)?n.href:""}catch{return""}},pe=(o,a,n,t="btn btn--line")=>{var i;let r=Te(o);if(!r)return"";let s=typeof a.reviews=="object"&&((i=a.reviews)==null?void 0:i.google)||ne[n]||ne.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${t}" href="${e(r)}" target="_blank" rel="noopener">${u("star",16)} ${e(s)}</a></p>`},X={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},de={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},he=o=>{var a;return((a=o.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ue(o,a){var s,i,l;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=o==null?void 0:o.date)!=null?s:"").trim());if(!n)return"";let t=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(t.getTime()))return"";let r=new Intl.DateTimeFormat((l=de[a])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(t);return`<time class="rv-date" datetime="${e(o.date)}">${e(r)}</time>`}function qe(o,a){var i,l;let n=o.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let t=n.reduce((c,p)=>c+Number(p.rating),0)/n.length,r=(i=X[a])!=null?i:X.en,s=new Intl.NumberFormat((l=de[a])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(t);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(o.length)))}</span></p>`}function me(o,a,n,t){var i;if(!o.length)return"";let r=(i=X[a])!=null?i:X.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${u("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${qe(o,a)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${o.map(t).join("")}</div>
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
upd()}})()<\/script>`,oe={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function ge(o){var t;let a=(t=oe[o])!=null?t:oe.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(a.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(a.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${u("share",15)} ${e(a.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${u("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${u("link",15)} <span>${e(a.copy)}</span></button>
    </div>`}var fe=(o,a,n)=>o.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function ve({site:o,markets:a,url:n,abs:t}){var i;let r=(i=a.find(l=>l.default))!=null?i:a[0],s=a.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(o.name)}</title>
<link rel="canonical" href="${t(`${r.id}/`)}">
${a.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${t(`${l.id}/`)}">`).join(`
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
<body><p>${a.map(l=>`<a href="${n(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Le="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ye=24;function ke(o,a){var n;return((n=o.products)!=null?n:[]).map(t=>{var r;return{...t,variants:((r=t.variants)!=null?r:[]).map(s=>({...s,price:Z(s,a)})).filter(s=>s.price!=null)}}).filter(t=>t.variants.length>0).map(t=>{let r=Math.min(...t.variants.map(i=>i.price)),s=t.was?Z({basePrice:t.was,prices:t.wasPrices},a):null;return{...t,from:r,was:s&&s>r?s:null}})}function Ee(o){let a=o.filter(s=>s.badge),n=o.filter(s=>!a.includes(s)),t=[...new Set(n.map(s=>s.category))].map(s=>n.filter(i=>i.category===s)),r=[...a];for(let s=0;r.length<o.length;s++)for(let i of t)i[s]&&r.push(i[s]);return r}var Fe=o=>String(o).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function $e(o,a,n){var t;return(a==null?void 0:a[n.id])!=null?a[n.id]:o==null||o===""?null:n.default?Number(o):Math.round(Number(o)*((t=n.rate)!=null?t:1)*100)/100}var Be=(o,a)=>{var n;return((n=o.pots)!=null?n:[]).filter(t=>t==null?void 0:t.id).map(t=>({...t,price:t.price?Z({basePrice:t.price,prices:t.prices},a):0})).filter(t=>t.price!=null)};function Ve(o,a){var t,r,s;let n=(t=o.delivery)!=null?t:{};return{...n,fee:(r=$e(n.fee,n.feeManual,a))!=null?r:0,freeFrom:$e(n.freeFrom,n.freeFromManual,a),slots:((s=n.slots)!=null?s:[]).filter(Boolean)}}function $a({site:o,catalog:a,i18n:n,template:t,basePath:r="/",siteUrl:s=o.domain}){var m,v,k,M;let i=ae(r),l=y=>new URL(i(y),s).href,c=a.markets,p=(y,w)=>`${w.id}/${J(y.slug,w.lang,"en")}/`,h=te(o.orderForm),g=h&&!h.error?h:null,$=[];for(let y of c){let w=y.lang,C=(v=(m=n[w])!=null?m:n.en)!=null?v:n.vi,S=x=>J(x,w,"en"),D=ke(a,y),L=(M=(k=o.orderChannels)==null?void 0:k[y.id])!=null?M:["phone"],E=x=>ee(x,y),N=(x,j)=>{var q,B;return S((B=(q=x==null?void 0:x.find(A=>A.id===j))==null?void 0:q.name)!=null?B:j)},T=x=>{var j;return((j=a.categories)!=null?j:[]).find(q=>q.id===x.category)},I=Be(o,y),G=Ve(o,y),F={site:o,catalog:a,market:y,markets:c,lang:w,t:C,L:S,url:i,abs:l,channels:L,money:E,items:D,productPath:p,template:t,name:N,cat:T,gform:g,pots:I,delivery:G};$.push({path:`${y.id}/index.html`,html:be(F,{kind:"home"})});for(let x of D)$.push({path:`${p(x,y)}index.html`,html:be(F,{kind:"product",product:x})})}return $.push({path:"index.html",html:ve({site:o,markets:c,url:i,abs:l})}),$}function be(o,a){var F,x,j,q,B,A,d,b,z;let{site:n,market:t,markets:r,lang:s,t:i,L:l,url:c,abs:p,catalog:h,productPath:g,channels:$}=o,m=a.kind==="home",v=a.product,k=m?`${t.id}/`:g(v,t),M=m?`${n.name} \xB7 ${l(n.tagline)}`:`${l(v.name)} \xB7 ${n.name}`,y=m?l(n.intro):`${l(v.description)} ${o.money(v.from)}.`,w=r.map(f=>{var R;return m?{m:f,href:`${f.id}/`}:ke({products:[((R=h.products)!=null?R:[]).find(K=>K.id===v.id)]},f).length?{m:f,href:g(v,f)}:null}).filter(Boolean),C=f=>{var R,K;return(K=(R=w.find(we=>we.m.id===f.id))==null?void 0:R.href)!=null?K:`${f.id}/`},S=(F=r.find(f=>f.default))!=null?F:r[0],D=(x=n.theme)!=null?x:{},L=["primary","ink","bg","surface","soft","accent"].filter(f=>D[f]).map(f=>`--${f}:${D[f]}`).join(";"),E=r.map(f=>({id:f.id,lang:f.lang,country:f.country,currency:f.currency,href:c(C(f))})),N=$[0],T=(j=n.contact)!=null?j:{},I=n.heroImage||((q=o.items[0])==null?void 0:q.image),G=p(U(m?I:v.image));return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(M)}</title>
<meta name="description" content="${e(y)}">
<link rel="canonical" href="${p(k)}">
${w.map(({m:f,href:R})=>`<link rel="alternate" hreflang="${e(f.lang)}-${e(f.country)}" href="${p(R)}">`).join(`
`)}
${w.some(f=>f.m.id===S.id)?`<link rel="alternate" hreflang="x-default" href="${p(C(S))}">`:""}
<meta property="og:type" content="${m?"website":"product"}">
<meta property="og:title" content="${e(M)}">
<meta property="og:description" content="${e(y)}">
<meta property="og:url" content="${p(k)}">
<meta property="og:image" content="${e(G)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((B=D.bg)!=null?B:"#FFF8F3")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Le}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${L}}</style>
${m?W(ta(o))+(((A=n.faq)!=null?A:[]).length?W(na(o)):""):W(oa(o,v))+W(ra(o,v))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(E))}' data-copied="${e(i.copied)}" data-wa="${e(O((d=T.whatsapp)!=null?d:""))}" data-email="${e((b=T.email)!=null?b:"")}" data-tz="${e((z=n.timezone)!=null?z:"Asia/Ho_Chi_Minh")}" data-locale="${e(s)}">
<a class="skip" href="#main">${e(i.skip)}</a>
${le(i)}
${l(n.announcement)?`<p class="announce">${u("leaf",15)} ${e(l(n.announcement))}</p>`:""}
${Ae(o,m)}
<main id="main">
${m?[Oe,Ge,Ie,Ue,We,_e,Ke,Je,Ze,Ye,Xe].map(f=>f(o)).join(`
`):Qe(o,v)}
</main>
${aa(o)}
<nav class="dock" aria-label="${e(i.nav.order)}">
  <a href="${m?"":c(`${t.id}/`)}#shop">${u("search",20)}<span>${e(i.nav.shop)}</span></a>
  <a class="primary" href="${e(m?H(N,T):"#order")}" ${m?_(N):""}>${u(m?N:"bag",20)}<span>${e(m?i.nav.order:i.nav.buy)}</span></a>
</nav>
</body>
</html>
`}function Ae({site:o,market:a,markets:n,t,L:r,url:s},i){var h;let l=i?"":s(`${a.id}/`),c=[[`${l}#places`,t.nav.places],[`${l}#shop`,t.nav.shop],[`${l}#care`,t.nav.care],[`${l}#delivery`,t.nav.delivery],[`${l}#visit`,t.nav.contact]],p=(h=o.contact)!=null?h:{};return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${a.id}/`)}">
      ${o.logo?`<img src="${e(P(s,o.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("leaf",18)}</span>`}
      <span>${e(o.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${c.map(([g,$])=>`<a href="${g}">${e($)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(t.market.label)}">${u("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(ie(a))}</span></span></summary>
        <ul>${n.map(g=>`<li><a href="${s(`${g.id}/`)}" hreflang="${e(g.lang)}"${g.id===a.id?' aria-current="true"':""}>${e(g.country)} \xB7 ${e(g.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      ${p.phone?`<a class="btn btn--primary btn--sm hide-sm" href="tel:${O(p.phone)}">${u("phone",16)} ${e(p.phone)}</a>`:""}
      <details class="mnav">
        <summary aria-label="${e(t.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${c.map(([g,$])=>`<a href="${g}">${e($)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Oe(o){var h;let{site:a,t:n,L:t,url:r,items:s,catalog:i}=o,l=a.heroImage||((h=s[0])==null?void 0:h.image),c=(g,$)=>(g!=null?g:[]).filter(m=>s.some(v=>{var k;return[].concat((k=v[$])!=null?k:[]).includes(m.id)})),p=(g,$,m,v)=>v.length?`<label><span>${e($)}</span><select name="${g}"><option value="">${e(m)}</option>${v.map(k=>`<option value="${e(k.id)}">${e(t(k.name))}</option>`).join("")}</select></label>`:"";return`<section class="hero">
  ${l?`<img class="hero-img" src="${e(P(r,l))}" alt="" width="1600" height="900" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${t(a.heroKicker)?`<p class="kicker">${e(t(a.heroKicker))}</p>`:""}
    <h1>${e(t(a.tagline))}</h1>
    <p class="lead">${e(t(a.intro))}</p>
    <div class="actions">
      <a class="btn btn--primary btn--lg" href="#shop">${e(n.hero.shop)} ${u("arrow",18)}</a>
      <a class="btn btn--light btn--lg" href="#delivery">${u("truck",18)} ${e(n.hero.delivery)}</a>
    </div>
  </div>
  <div class="wrap">
    <form class="finder" action="#shop" method="get" data-finder>
      <p class="finder-h">${u("leaf",20)} ${e(n.finder.title)}</p>
      ${p("place",n.finder.place,n.finder.anyPlace,c(i.places,"places"))}
      ${p("light",n.finder.light,n.finder.anyLight,c(i.lights,"light"))}
      ${p("care",n.finder.care,n.finder.anyCare,c(i.cares,"care"))}
      <label class="check finder-pet"><input type="checkbox" name="pet" value="1"> ${u("paw",16)} ${e(n.finder.pet)}</label>
      <button type="submit" class="btn btn--primary btn--lg">${u("search",18)} ${e(n.finder.go)}</button>
    </form>
  </div>
</section>`}function Ge({catalog:o,items:a,t:n,L:t,url:r}){var l;let s=((l=o.places)!=null?l:[]).map(c=>({...c,n:a.filter(p=>{var h;return(h=p.places)==null?void 0:h.includes(c.id)}).length})).filter(c=>c.n);if(!s.length)return"";let i=new Set;return`<section class="section" id="places" aria-labelledby="pl-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.places.kicker)}</p><h2 id="pl-title" class="h2">${e(n.places.title)}</h2><p class="lead">${e(n.places.text)}</p></div>
    <ul class="occ">${s.map(c=>{var h,g,$;let p=($=c.image)!=null?$:(g=(h=a.find(m=>{var v;return((v=m.places)==null?void 0:v.includes(c.id))&&!i.has(m.image)}))!=null?h:a.find(m=>{var v;return(v=m.places)==null?void 0:v.includes(c.id)}))==null?void 0:g.image;return i.add(p),`<li><a href="?place=${e(c.id)}#shop" data-filter-link="place" data-value="${e(c.id)}">
      <span class="occ-img">${p?`<img sizes="${V.card}" src="${e(P(r,p))}" alt="" width="800" height="800" loading="lazy">`:""}</span>
      <span class="occ-name">${e(t(c.name))}</span><span class="occ-c">${e(n.places.count.replace("{n}",c.n))}</span>
    </a></li>`}).join("")}</ul>
  </div>
</section>`}function He({t:o,L:a,name:n,catalog:t},r){var i;let s=((i=r.light)!=null?i:[]).map(l=>n(t.lights,l)).join(" \xB7 ");return`<ul class="care-mini">
    ${s?`<li title="${e(o.care.light)}">${u("sun",15)}<span>${e(s)}</span></li>`:""}
    ${a(r.water)?`<li title="${e(o.care.water)}">${u("drop",15)}<span>${e(a(r.water))}</span></li>`:""}
    ${r.petSafe?`<li class="is-pet" title="${e(o.care.pet)}">${u("paw",15)}<span>${e(o.care.petOk)}</span></li>`:""}
  </ul>`}function xe(o,a,n=0){var v,k,M,y,w,C,S,D,L,E,N;let{t,L:r,url:s,money:i,productPath:l,market:c,catalog:p,name:h,cat:g}=o,$=[r(a.name),(v=a.name)==null?void 0:v.vi,(k=a.name)==null?void 0:k.en,a.latin,r((M=g(a))==null?void 0:M.name),(w=(y=g(a))==null?void 0:y.name)==null?void 0:w.vi,...((C=a.places)!=null?C:[]).map(T=>h(p.places,T))].filter(Boolean).join(" "),m=(S=a.images)==null?void 0:S[0];return`<li class="card${n>=ye?" is-more":""}" data-type="${e(a.category)}" data-place="${e(((D=a.places)!=null?D:[]).join(" "))}" data-light="${e(((L=a.light)!=null?L:[]).join(" "))}" data-care="${e((E=a.care)!=null?E:"")}" data-pet="${a.petSafe?1:0}" data-price="${a.from}" data-name="${e(Fe($))}">
  <a class="card-link" href="${s(l(a,c))}">
    <div class="card-img${m?" has-alt":""}">
      <img sizes="${V.card}" src="${e(P(s,a.image))}" alt="${e(r(a.name))}" width="1000" height="1000" loading="lazy">
      ${m?`<img sizes="${V.card}" class="alt" src="${e(P(s,m))}" alt="" width="1000" height="1000" loading="lazy">`:""}
      ${a.was?`<span class="tag tag--sale">-${Math.round((1-a.from/a.was)*100)}%</span>`:r(a.badge)?`<span class="tag">${e(r(a.badge))}</span>`:""}
    </div>
    <p class="card-cat">${e(r((N=g(a))==null?void 0:N.name))}${a.care?` \xB7 ${e(h(p.cares,a.care))}`:""}</p>
    <h3>${e(r(a.name))}</h3>
    ${a.latin?`<p class="latin">${e(a.latin)}</p>`:""}
    ${He(o,a)}
    <p class="card-price">${a.variants.length>1?`<span>${e(t.shop.from)}</span> `:""}<b>${e(i(a.from))}</b>${a.was?` <s>${e(i(a.was))}</s>`:""}</p>
  </a>
</li>`}function Ie(o){var c;let{items:a,catalog:n,t,L:r}=o,s=((c=n.categories)!=null?c:[]).filter(p=>a.some(h=>h.category===p.id)),i=(p,h)=>(p!=null?p:[]).filter(g=>a.some($=>{var m;return[].concat((m=$[h])!=null?m:[]).includes(g.id)})),l=(p,h,g,$)=>$.length?`<label class="select"><span class="sr">${e(h)}</span><select ${p}><option value="">${e(g)}</option>${$.map(m=>`<option value="${e(m.id)}">${e(r(m.name))}</option>`).join("")}</select></label>`:"";return`<section class="section section--soft" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.shop.kicker)}</p><h2 id="shop-title" class="h2">${e(t.shop.title)}</h2>
      <p class="lead" data-count="${e(t.shop.count)}">${e(t.shop.count.replace("{n}",a.length))}</p>
    </div>
    <div class="toolbar" data-toolbar>
      <div class="chips" role="group" aria-label="${e(t.shop.all)}">
        <button type="button" class="pill is-on" data-type="">${e(t.shop.all)}</button>
        ${s.map(p=>`<button type="button" class="pill" data-type="${e(p.id)}">${e(r(p.name))}</button>`).join("")}
      </div>
      <div class="filters">
        <label class="search">${u("search",18)}<input type="search" placeholder="${e(t.search)}" aria-label="${e(t.search)}" data-search></label>
        ${l("data-place",t.finder.place,t.finder.anyPlace,i(n.places,"places"))}
        ${l("data-light",t.finder.light,t.finder.anyLight,i(n.lights,"light"))}
        ${l("data-care",t.finder.care,t.finder.anyCare,i(n.cares,"care"))}
        <label class="check"><input type="checkbox" data-pet> ${e(t.finder.pet)}</label>
        <label class="select"><span class="sr">${e(t.shop.sort)}</span><select data-sort>
          <option value="">${e(t.shop.sortPop)}</option><option value="asc">${e(t.shop.sortLow)}</option><option value="desc">${e(t.shop.sortHigh)}</option>
        </select></label>
      </div>
      <p class="picked" data-picked hidden><span data-picked-text></span> <button type="button" class="link" data-reset>${e(t.shop.reset)}</button></p>
    </div>
    <ul class="grid" data-grid>${Ee(a).map((p,h)=>xe(o,p,h)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${e(t.shop.empty)}</p>
    ${a.length>ye?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(t.shop.more)}</button></div>`:""}
  </div>
</section>`}function Ue({t:o,L:a,url:n,pots:t,money:r}){return t.length?`<section class="section" id="pots" aria-labelledby="pot-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(o.pots.kicker)}</p><h2 id="pot-title" class="h2">${e(o.pots.title)}</h2><p class="lead">${e(o.pots.text)}</p></div>
    <ul class="wraps">${t.map(s=>`<li class="wrap-card">
      ${s.image?`<img sizes="${V.card}" src="${e(P(n,s.image))}" alt="" width="800" height="600" loading="lazy">`:`<span class="wrap-ph">${u("leaf",28)}</span>`}
      <div><h3>${e(a(s.name))}</h3>${a(s.text)?`<p>${e(a(s.text))}</p>`:""}<b class="wrap-price">${s.price?`+ ${e(r(s.price))}`:e(o.pots.free)}</b></div>
    </li>`).join("")}</ul>
  </div>
</section>`:""}function We({site:o,t:a,L:n}){var r;let t=((r=o.careGuide)!=null?r:[]).filter(s=>n(s==null?void 0:s.title));return t.length?`<section class="section section--soft" id="care" aria-labelledby="care-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.guide.kicker)}</p><h2 id="care-title" class="h2">${e(a.guide.title)}</h2><p class="lead">${e(a.guide.text)}</p></div>
    <ul class="guide">${t.map(s=>{var i;return`<li>${u((i=s.icon)!=null?i:"leaf",26)}<h3>${e(n(s.title))}</h3><p>${e(n(s.text))}</p></li>`}).join("")}</ul>
  </div>
</section>`:""}function _e({site:o,t:a,L:n,delivery:t,money:r}){var l;let s=((l=o.packing)!=null?l:[]).filter(c=>n(c==null?void 0:c.title));if(!t.slots.length&&!t.cutoff&&!n(t.areas)&&!s.length)return"";let i=t.fee?r(t.fee):a.delivery.freeShip;return`<section class="section section--ink" id="delivery" aria-labelledby="del-title">
  <div class="wrap">
    <div class="del">
      <div>
        <p class="kicker">${e(a.delivery.kicker)}</p>
        <h2 id="del-title" class="h2">${e(a.delivery.title)}</h2>
        <p class="lead">${e(n(t.text)||a.delivery.text)}</p>
        ${t.cutoff?`<p class="cutoff" data-cutoff="${e(t.cutoff)}" data-before="${e(a.delivery.before)}" data-after="${e(a.delivery.after)}">${u("clock",20)} <span>${e(a.delivery.static.replace("{time}",t.cutoff))}</span></p>`:""}
      </div>
      <dl class="del-facts">
        ${t.slots.length?`<div><dt>${u("calendar",18)} ${e(a.delivery.slots)}</dt><dd><ul class="slots">${t.slots.map(c=>`<li>${e(c)}</li>`).join("")}</ul></dd></div>`:""}
        <div><dt>${u("truck",18)} ${e(a.delivery.fee)}</dt><dd>${e(i)}${t.freeFrom?` \xB7 ${e(a.delivery.freeFrom.replace("{a}",r(t.freeFrom)))}`:""}</dd></div>
        ${n(t.areas)?`<div><dt>${u("pin",18)} ${e(a.delivery.areas)}</dt><dd>${e(n(t.areas))}</dd></div>`:""}
      </dl>
    </div>
    ${s.length?`<h3 class="pack-h">${e(a.delivery.packTitle)}</h3><ol class="pack">${s.map((c,p)=>`<li><span class="n">${p+1}</span><b>${e(n(c.title))}</b><p>${e(n(c.text))}</p></li>`).join("")}</ol>`:""}
  </div>
</section>`}function Ke({site:o,t:a,L:n,url:t,channels:r}){var l,c;let s=(l=o.corporate)!=null?l:{};if(!n(s.title))return"";let i=r[0];return`<section class="section" aria-labelledby="corp-title">
  <div class="wrap corp">
    ${s.image?`<img sizes="${V.wide}" src="${e(P(t,s.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
    <div>
      <p class="kicker">${e(a.corp.kicker)}</p>
      <h2 id="corp-title" class="h3">${e(n(s.title))}</h2>
      ${n(s.text)?`<p class="lead">${e(n(s.text))}</p>`:""}
      <a class="btn btn--primary" href="${e(H(i,(c=o.contact)!=null?c:{},a.corp.msg))}" ${_(i)}>${u(i,18)} ${e(a.corp.cta)}</a>
    </div>
  </div>
</section>`}function Je({site:o,L:a}){var t;let n=((t=o.perks)!=null?t:[]).filter(r=>a(r==null?void 0:r.title));return n.length?`<section class="perks" aria-label="${e(o.name)}">
  <ul class="wrap perk-list">${n.map(r=>{var s;return`<li>${u((s=r.icon)!=null?s:"check",24)}<div><b>${e(a(r.title))}</b>${a(r.text)?`<span>${e(a(r.text))}</span>`:""}</div></li>`}).join("")}</ul>
</section>`:""}function Ze({site:o,t:a,L:n,lang:t}){let r=pe(o,a,t,"btn btn--line"),s=he(o);return o.showReviews===!1||!s.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2></div>
    ${me(s,t,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(l,c)=>`<span class="${c<i.rating?"on":""}">${u("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(i.text))}</blockquote>
      <figcaption>${e(i.name)}${n(i.bought)?`<small>${e(n(i.bought))}</small>`:""}${ue(i,t)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ye({site:o,t:a,L:n}){var r;let t=((r=o.faq)!=null?r:[]).filter(s=>n(s==null?void 0:s.q));return t.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div>${t.map((s,i)=>`<details${i===0?" open":""}><summary>${e(n(s.q))}</summary><p>${e(n(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Xe({site:o,t:a,L:n,channels:t}){var l,c,p;let r=(l=o.contact)!=null?l:{},s=encodeURIComponent((c=r.mapQuery)!=null?c:n(r.address)),i=h=>h.length===7?a.visit.everyDay:re(h,a.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${ce(o,a)}
      ${((p=o.hours)!=null?p:[]).length?`<table class="hours"><tbody>${o.hours.map(h=>`<tr><th scope="row">${e(i(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${u("pin",18)} ${e(n(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(a.visit.directions)} ${u("arrow",16)}</a>
        ${t.map(h=>{var g;return`<a class="btn btn--line" href="${e(H(h,r))}" ${_(h)}>${u(h,18)} ${e((g=a.via[h])!=null?g:h)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Qe(o,a){var F,x,j,q,B,A;let{site:n,t,L:r,url:s,money:i,market:l,items:c,channels:p,cat:h,gform:g,pots:$,delivery:m,catalog:v,name:k}=o,M=h(a),y=[...c.filter(d=>{var b;return d.id!==a.id&&((b=d.places)==null?void 0:b.some(z=>{var f;return(f=a.places)==null?void 0:f.includes(z)}))&&d.care===a.care}),...c.filter(d=>d.id!==a.id&&d.category===a.category)].filter((d,b,z)=>z.indexOf(d)===b).slice(0,8),w=s(`${l.id}/`),C=t.orderText.replace("{product}",r(a.name)).replace(/\{\w+\}/g,"\u2026"),S=a.variants[0],D=Number(n.cardMax)||150,L=g?` data-gform="${e(g.action)}" data-gmap='${e(JSON.stringify(g.fields))}'`:"",E=d=>p.map((b,z)=>{var f,R;return`<button type="submit" class="btn ${d!=null?d:z?"btn--line":"btn--primary"} btn--lg" data-channel="${e(b)}" data-href="${e(H(b,(f=n.contact)!=null?f:{},C))}">${u(b,18)} ${e(b==="phone"?t.product.call:t.product.send.replace("{channel}",(R=t.via[b])!=null?R:b))}</button>`}).join(""),N=String((F=r(a.tips))!=null?F:"").split(`
`).map(d=>d.trim()).filter(Boolean),T=((x=a.places)!=null?x:[]).map(d=>k(v.places,d)),I=((j=a.light)!=null?j:[]).map(d=>k(v.lights,d)).join(", "),G=[["sun",t.care.light,I],["drop",t.care.water,r(a.water)],["ruler",t.care.height,r(a.height)],["leaf",t.care.level,a.care?k(v.cares,a.care):""],["paw",t.care.pet,a.petSafe===!0?t.care.petOk:a.petSafe===!1?t.care.petNo:""]].filter(d=>d[2]);return`<div class="wrap crumbs"><a href="${w}">${e(t.nav.home)}</a>${u("chevron",14)}<a href="${w}?type=${e(a.category)}#shop">${e(r(M==null?void 0:M.name))}</a>${u("chevron",14)}<span aria-current="page">${e(r(a.name))}</span></div>
<section class="wrap pdp" data-product data-name="${e(r(a.name))}" data-text="${e(t.orderText)}" data-market="${e(`${l.id.toUpperCase()} \xB7 ${l.currency}`)}"
  data-fee="${m.fee}" data-free="${(q=m.freeFrom)!=null?q:""}" data-cutoff="${e((B=m.cutoff)!=null?B:"")}" data-currency="${e(l.currency)}" data-lang="${e(l.lang)}">
  ${ea(o,a)}
  <div class="pdp-info">
    <p class="kicker">${e(r(M==null?void 0:M.name))}</p>
    <h1 class="pdp-title">${e(r(a.name))}</h1>
    ${a.latin?`<p class="latin">${e(a.latin)}</p>`:""}
    <p class="pdp-price"><strong data-unit>${e(i(S.price))}</strong>${a.was?` <s>${e(i(a.was))}</s> <span class="tag tag--sale tag--inline">-${Math.round((1-a.from/a.was)*100)}%</span>`:""}</p>
    <p class="lead">${e(r(a.description))}</p>
    ${T.length?`<ul class="tags">${T.map(d=>`<li>${e(d)}</li>`).join("")}</ul>`:""}
    ${G.length?`<dl class="facts">${G.map(([d,b,z])=>`<div${d==="paw"&&a.petSafe===!1?' class="is-warn"':""}>${u(d,18)}<dt>${e(b)}</dt><dd>${e(z)}</dd></div>`).join("")}</dl>`:""}
    ${N.length?`<div class="inside"><h2 class="h4">${u("leaf",18)} ${e(t.product.tips)}</h2><ul>${N.map(d=>`<li>${u("check",16)} ${e(d)}</li>`).join("")}</ul></div>`:""}
    <form class="order" id="order" data-compose${L} novalidate>
      <div class="order-fields">
        ${a.variants.length>1?`<fieldset class="opts"><legend>${e(t.product.option)}</legend><div class="vars">
          ${a.variants.map((d,b)=>`<label class="var"><input type="radio" name="variant" value="${e(r(d.label))}" data-price="${d.price}" data-money="${e(i(d.price))}"${b?"":" checked"}><span>${e(r(d.label))}<b>${e(i(d.price))}</b></span></label>`).join("")}
        </div></fieldset>`:`<input type="hidden" name="variant" value="" data-price="${S.price}">`}
        ${$.length?`<fieldset class="opts"><legend>${u("leaf",16)} ${e(t.product.pot)}</legend><div class="wrap-pick">
          <label class="wp"><input type="radio" name="wrap" value="" data-price="0" checked><i class="wp-ph" aria-hidden="true">${u("leaf",26)}</i><span><b>${e(t.product.noPot)}</b><small>${e(t.pots.free)}</small></span></label>
          ${$.map(d=>`<label class="wp"><input type="radio" name="wrap" value="${e(r(d.name))}" data-price="${d.price}">${d.image?`<img src="${e(P(s,d.image))}" alt="" width="96" height="72" loading="lazy">`:""}<span><b>${e(r(d.name))}</b><small>${d.price?`+ ${e(i(d.price))}`:e(t.pots.free)}</small></span></label>`).join("")}
        </div></fieldset>`:""}
        <fieldset class="opts card-box"><legend>${u("doc",16)} ${e(t.product.card)}</legend>
          <label class="wide"><span class="sr">${e(t.product.card)}</span><textarea name="message" rows="3" maxlength="${D}" placeholder="${e(t.product.cardHint)}" data-count-max="${D}"></textarea></label>
          <p class="card-meta"><label class="check"><input type="checkbox" name="secret" value="1"> ${e(t.product.secret)}</label><span class="muted small" data-chars>0 / ${D}</span></p>
        </fieldset>
        <fieldset class="opts"><legend>${u("calendar",16)} ${e(t.product.when)}</legend>
          <div class="fields">
            <label><span>${e(t.product.date)} *</span><input name="date" type="date" required data-date></label>
            <label><span>${e(t.product.slot)}</span><select name="slot" data-slot>${m.slots.map(d=>`<option>${e(d)}</option>`).join("")}<option value="">${e(t.product.anySlot)}</option></select></label>
          </div>
          <p class="muted small" data-date-note data-today="${e(t.product.today)}" data-tomorrow="${e(t.product.tomorrow)}" hidden></p>
        </fieldset>
        <fieldset class="opts"><legend>${u("pin",16)} ${e(t.product.to)}</legend>
          <div class="fields">
            <label><span>${e(t.product.toName)} *</span><input name="toName" required></label>
            <label><span>${e(t.product.toPhone)}</span><input name="toPhone" type="tel" inputmode="tel"></label>
            <label class="wide"><span>${e(t.product.address)} *</span><input name="address" autocomplete="street-address" required></label>
          </div>
        </fieldset>
        <fieldset class="opts"><legend>${u("users",16)} ${e(t.product.from)}</legend>
          <div class="fields">
            <label><span>${e(t.product.name)} *</span><input name="name" autocomplete="name" required></label>
            <label><span>${e(t.product.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required></label>
            <label><span>${e(t.product.qty)}</span><input name="qty" type="number" min="1" max="50" value="1" inputmode="numeric"></label>
            <label><span>${e(t.product.note)}</span><input name="note" placeholder="${e(t.product.noteHint)}"></label>
            <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          </div>
        </fieldset>
        <dl class="sum" data-sum>
          <div><dt>${e(t.product.plant)}</dt><dd data-s-gift>${e(i(S.price))}</dd></div>
          <div><dt>${e(t.product.pot)}</dt><dd data-s-wrap>${e(t.pots.free)}</dd></div>
          <div><dt>${e(t.delivery.fee)}</dt><dd data-s-ship>${m.fee?e(i(m.fee)):e(t.delivery.freeShip)}</dd></div>
          <div class="sum-total"><dt>${e(t.product.total)}</dt><dd data-s-total>${e(i(S.price+(m.freeFrom&&S.price>=m.freeFrom?0:m.fee)))}</dd></div>
          ${m.freeFrom?`<p class="sum-hint" data-free-hint data-tpl="${e(t.product.freeHint)}" data-ok="${e(t.product.freeOk)}"></p>`:""}
        </dl>
        <p class="form-err" data-err hidden>${e(t.product.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--primary btn--lg btn--full" data-order-submit>${u("bag",18)} <span>${e(t.product.order)}</span></button></div>
        <noscript><p>${p.map(d=>{var b,z;return`<a href="${e(H(d,(b=n.contact)!=null?b:{},C))}" ${_(d)}>${e((z=t.via[d])!=null?z:d)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${g?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${u(g?"check":"arrow",22)} ${e(g?t.product.done:t.product.stepTitle)}</p>
        <p>${e(g?t.product.doneText:t.product.stepText)}</p>
        <div class="buy">${E(g?"btn--line":void 0)}</div>
        ${g?"":`<button type="button" class="link back" data-edit>${e(t.product.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
      ${((A=n.promises)!=null?A:[]).length?`<ul class="promises">${n.promises.map(d=>{var b;return`<li>${u((b=d.icon)!=null?b:"check",18)} ${e(r(d.text))}</li>`}).join("")}</ul>`:""}
    </form>
    ${ge(l.lang)}
  </div>
</section>
${y.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${e(t.product.related)}</h2>
  <ul class="grid grid--related">${y.map(d=>xe(o,d)).join("")}</ul>
</div></section>`:""}`}function ea({t:o,L:a,url:n},t){var c;let r=[t.image,...(c=t.images)!=null?c:[]],s=o.gallery,i=a(t.name),l=a(t.badge)?`<span class="tag">${e(a(t.badge))}</span>`:"";return r.length===1?`<figure class="pdp-img"><img src="${e(P(n,t.image))}" alt="${e(i)}" width="1000" height="1000" fetchpriority="high">${l}</figure>`:`<figure class="pdp-img gallery" data-gallery>
    <div class="g-stage">
      <ul class="g-track" tabindex="0" aria-label="${e(s.label)}">${r.map((p,h)=>`<li id="g-${h+1}"><a href="${e(P(n,p))}" data-zoom="${h}" aria-label="${e(s.zoom)}: ${e(s.photo.replace("{i}",h+1).replace("{n}",r.length))}"><img sizes="${V.wide}" src="${e(P(n,p))}" alt="${e(h?`${i} \u2013 ${s.photo.replace("{i}",h+1).replace("{n}",r.length)}`:i)}" width="1000" height="1000"${h?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
      ${l}
      <button type="button" class="g-nav g-prev" data-step="-1" aria-label="${e(s.prev)}">${u("chevron",22)}</button>
      <button type="button" class="g-nav g-next" data-step="1" aria-label="${e(s.next)}">${u("chevron",22)}</button>
      <span class="g-count" aria-hidden="true"><b data-g-i>1</b> / ${r.length}</span>
    </div>
    <ul class="g-thumbs">${r.map((p,h)=>`<li><a href="#g-${h+1}" data-go="${h}"${h?"":' aria-current="true"'} aria-label="${e(s.photo.replace("{i}",h+1).replace("{n}",r.length))}"><img sizes="${V.thumb}" src="${e(P(n,p))}" alt="" width="1000" height="1000" loading="lazy"></a></li>`).join("")}</ul>
  </figure>
  <dialog class="lightbox" data-lightbox aria-label="${e(i)}">
    <img src="" alt="${e(i)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(s.close)}">\u2715</button>
    <button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(s.prev)}">${u("chevron",26)}</button>
    <button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(s.next)}">${u("chevron",26)}</button>
    <span class="g-count"><b data-lb-i>1</b> / ${r.length}</span>
  </dialog>`}function aa({site:o,t:a,L:n,market:t}){var i,l;let r=(i=o.contact)!=null?i:{},s=Object.entries((l=o.social)!=null?l:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(o.name)}</p><p class="muted">${e(n(o.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(a.footer.hotline)}: <a href="tel:${O(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${s.map(([c,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${o.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(o.name)}</span>${fe(o,a,t.lang)}</div>
</footer>`}function ta({site:o,market:a,L:n,abs:t,items:r}){var i,l,c;let s=(i=o.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"GardenStore",name:o.name,url:t(`${a.id}/`),image:t(U(o.heroImage||((l=r[0])==null?void 0:l.image))),description:n(o.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:n(s.address)},currenciesAccepted:a.currency,openingHoursSpecification:se((c=o.hours)!=null?c:[])}}var na=({site:o,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:o.faq.filter(n=>a(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:a(n.q),acceptedAnswer:{"@type":"Answer",text:a(n.a)}}))});function oa({site:o,market:a,L:n,abs:t,productPath:r,cat:s},i){var l,c;return{"@context":"https://schema.org","@type":"Product",name:n(i.name),description:n(i.description),image:[i.image,...(l=i.images)!=null?l:[]].map(p=>t(U(p))),url:t(r(i,a)),category:n((c=s(i))==null?void 0:c.name),offers:{"@type":"Offer",price:i.variants[0].price,priceCurrency:a.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:o.name}}}}function ra({market:o,L:a,abs:n,productPath:t,t:r,cat:s},i){var l;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:n(`${o.id}/`)},{"@type":"ListItem",position:2,name:a((l=s(i))==null?void 0:l.name),item:n(`${o.id}/?type=${i.category}`)},{"@type":"ListItem",position:3,name:a(i.name),item:n(t(i,o))}]}}export{$a as renderSite};
