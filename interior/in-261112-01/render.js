var ie={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>ie[t]);function O(a,t,n="vi"){var o,r,s;return a==null?"":typeof a!="object"?String(a):(s=(r=(o=a[t])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?s:""}var le={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},M=a=>{var t;return(t=le[a])!=null?t:"en-US"};function C(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function V(a,t){var o,r;if(t.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:C(a.basePrice*t.rate,t.rounding)}function G(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var ce=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,S=(a,t)=>{let n=ce(t);return n==null?t:a(n)},j=(a="")=>String(a).replace(/\D/g,"");function B(a,t,n=""){switch(a){case"phone":return`tel:${j(t.phone)}`;case"zalo":return`https://zalo.me/${j(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${j(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var H=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function I(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,s]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();pe.includes(i)&&(o[i]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var T={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var de={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},g=(a,t=20,n="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=de[a])!=null?o:""}</svg>`},R=[1,2,3,4,5,6,0],he=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function W(a,t){let n=a.map(r=>R.indexOf(r)).sort((r,s)=>r-s);return n.every((r,s)=>s===0||r===n[s-1]+1)&&n.length>2?`${t[R[n[0]]]} \u2013 ${t[R[n.at(-1)]]}`:n.map(r=>t[R[r]]).join(", ")}var _=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>he[n]),opens:t.open,closes:t.close}));function K(a){var n,o;return(o=(n=new Intl.NumberFormat(M(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var J=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',Z=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,Y=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},U={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ue=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,me=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&ue.test(n.hostname)?n.href:""}catch{return""}},X=(a,t,n,o="btn btn--line")=>{var i;let r=me(a);if(!r)return"";let s=typeof t.reviews=="object"&&((i=t.reviews)==null?void 0:i.google)||U[n]||U.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${g("star",16)} ${e(s)}</a></p>`},E={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},Q={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ee=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ae(a,t){var s,i,l;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((l=Q[t])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function ge(a,t){var i,l;let n=a.filter(d=>d.rating>=1&&d.rating<=5);if(n.length<2)return"";let o=n.reduce((d,p)=>d+Number(p.rating),0)/n.length,r=(i=E[t])!=null?i:E.en,s=new Intl.NumberFormat((l=Q[t])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${g("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function te(a,t,n,o){var i;if(!a.length)return"";let r=(i=E[t])!=null?i:E.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${g("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ge(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
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
upd()}})()<\/script>`;var ne=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function oe({site:a,markets:t,url:n,abs:o}){var i;let r=(i=t.find(l=>l.default))!=null?i:t[0],s=t.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
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
`}var ve="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap",re=6,A=10.7639,be=[1e4,25e3,5e4,1e5],F=a=>a.area==="m2";function ye(a,t,n){var s,i,l;let o=t.perArea&&F(n)?A:1,r=(s=a.prices)==null?void 0:s[n.id];return!n.default&&(r!=null&&r.mode)?r.mode==="hidden"?null:V(a,n):n.default&&o===1?a.basePrice:C(a.basePrice*(n.default?1:(i=n.rate)!=null?i:1)*o,(l=n.rounding)!=null?l:"1")}function $e(a,t){var n;return((n=a.products)!=null?n:[]).map(o=>{var r;return{...o,variants:((r=o.variants)!=null?r:[]).map(s=>({...s,price:ye(s,o,t)})).filter(s=>s.price!=null)}}).filter(o=>o.variants.length>0)}function Ze({site:a,catalog:t,i18n:n,template:o,basePath:r="/",siteUrl:s=a.domain}){let i=G(r),l=h=>new URL(i(h),s).href,d=t.markets,p=I(a.bookingForm),u=p&&!p.error?p:null,b=d.map(h=>{var D,z,N,y;let c=h.lang,m=(z=(D=n[c])!=null?D:n.en)!=null?z:n.vi,w=P=>O(P,c,"en"),$=$e(t,h),f=(y=(N=a.bookingChannels)==null?void 0:N[h.id])!=null?y:["phone"],k=P=>new Intl.NumberFormat(M(c),{style:"currency",currency:h.currency,maximumFractionDigits:Number.isInteger(P)?0:2}).format(P),v=m.units[F(h)?"m2":"ft2"],x={site:a,catalog:t,market:h,markets:d,lang:c,t:m,L:w,url:i,abs:l,services:$,channels:f,money:k,template:o,gform:u,areaUnit:v};return{path:`${h.id}/index.html`,html:ke(x)}});return b.push({path:"index.html",html:oe({site:a,markets:d,url:i,abs:l})}),b}var L=(a,t)=>a.heroImage?S(t,a.heroImage):t("assets/photos/hero.webp");function ke(a){var $,f,k,v,x,D,z,N;let{site:t,market:n,markets:o,lang:r,t:s,L:i,url:l,abs:d}=a,p=`${t.name} \xB7 ${i(t.tagline)}`,u=($=t.theme)!=null?$:{},b=["primary","ink","bg","surface","soft","accent"].filter(y=>u[y]).map(y=>`--${y}:${u[y]}`).join(";"),h=(f=o.find(y=>y.default))!=null?f:o[0],c=o.map(y=>({id:y.id,lang:y.lang,country:y.country,currency:y.currency,href:l(`${y.id}/`)})),m=(k=t.contact)!=null?k:{},w=new Intl.NumberFormat(M(r),{style:"currency",currency:n.currency,maximumFractionDigits:0}).resolvedOptions();return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(p)}</title>
<meta name="description" content="${e(i(t.intro))}">
<link rel="canonical" href="${d(`${n.id}/`)}">
${o.map(y=>`<link rel="alternate" hreflang="${e(y.lang)}-${e(y.country)}" href="${d(`${y.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${h.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(p)}">
<meta property="og:description" content="${e(i(t.intro))}">
<meta property="og:url" content="${d(`${n.id}/`)}">
<meta property="og:site_name" content="${e(t.name)}">
<meta property="og:image" content="${e(new URL(L(t,l),d("")).href)}">
<meta name="theme-color" content="${e((v=u.bg)!=null?v:"#0F1512")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ve}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${b}}</style>
<noscript><style>.proj.more{display:block}.proj-more,.chips,.plan,.now-booking{display:none}</style></noscript>
${H(Oe(a))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(c))}' data-tz="${e((x=t.timezone)!=null?x:"")}" data-wa="${e(j(m.whatsapp))}" data-email="${e((D=m.email)!=null?D:"")}" data-copied="${e(s.booking.copied)}" data-money='${e(JSON.stringify({locale:M(r),currency:n.currency,max:(z=w.maximumFractionDigits)!=null?z:0}))}'>
<a class="skip" href="#main">${e(s.skip)}</a>
${Z(s)}
${xe(a)}
<main id="main">
${we(a)}
${De(a)}
${Se(a)}
${je(a)}
${Ne(a)}
${Pe(a)}
${Ce(a)}
${Te(a)}
${Re(a)}
${Ee(a)}
${qe(a)}
</main>
${Fe(a)}
<nav class="dock" aria-label="${e(s.nav.book)}">
  <a href="${e(B(a.channels[0],m))}" ${J(a.channels[0])}>${g(a.channels[0],20)}<span>${e((N=s.via[a.channels[0]])!=null?N:"")}</span></a>
  <a class="primary" href="#booking">${g("leaf",20)}<span>${e(s.nav.book)}</span></a>
</nav>
</body>
</html>
`}function xe({site:a,market:t,markets:n,t:o,url:r}){let s=[["#projects",o.nav.projects],["#pricing",o.nav.pricing],["#plants",o.nav.plants],["#seasons",o.nav.seasons],["#visit",o.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(S(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${g("leaf",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([i,l])=>`<a href="${i}">${e(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${g("globe",18)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(K(t))}</span></span></summary>
        <ul>${n.map(i=>`<li><a href="${r(`${i.id}/`)}" hreflang="${e(i.lang)}"${i.id===t.id?' aria-current="true"':""}>${e(i.country)} \xB7 ${e(i.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-md" href="#booking">${e(o.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${g("menu",22)}</summary>
        <nav aria-label="Menu">${[...s,["#booking",o.nav.book]].map(([i,l])=>`<a href="${i}">${e(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function we({site:a,t,L:n,url:o}){var s;let r=((s=a.stats)!=null?s:[]).filter(i=>n(i==null?void 0:i.value));return`<section class="hero">
  <img class="hero-bg" src="${e(L(a,o))}" alt="${e(n(a.tagline))}" width="1920" height="1200" fetchpriority="high">
  <div class="wrap hero-copy">
    ${n(a.place)?`<p class="eyebrow">${e(n(a.place))}</p>`:""}
    <h1>${e(n(a.tagline))}</h1>
    ${n(a.intro)?`<p class="lead">${e(n(a.intro))}</p>`:""}
    <p class="now-booking" data-now-booking data-tpl="${e(t.seasons.nowBooking)}" hidden>${g("calendar",16)} <span></span></p>
    <div class="actions">
      <a class="btn btn--primary btn--lg" href="#booking">${g("leaf",18)} ${e(t.hero.book)}</a>
      <a class="btn btn--line btn--lg" href="#planner">${e(t.hero.plan)}</a>
    </div>
  </div>
  ${r.length?`<div class="wrap"><ul class="stats">${r.map(i=>`<li><b>${e(n(i.value))}</b><span>${e(n(i.label))}</span></li>`).join("")}</ul></div>`:""}
</section>`}var se=(a,t,n)=>{var o,r,s;return(s=t((r=((o=a.projectTypes)!=null?o:[]).find(i=>i.id===n))==null?void 0:r.name))!=null?s:""},Me=(a,t,n,o)=>{let r=new Intl.NumberFormat(M(o));return F(t)?`${r.format(Math.round(a/A))} ${n.units.m2}`:`${r.format(a)} ${n.units.ft2}`};function De({site:a,t,L:n,url:o,lang:r,market:s}){var d,p;let i=((d=a.projects)!=null?d:[]).filter(u=>u==null?void 0:u.image);if(!i.length)return"";let l=((p=a.projectTypes)!=null?p:[]).filter(u=>i.some(b=>b.type===u.id));return`<section class="section" id="projects" aria-labelledby="proj-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(t.projects.kicker)}</p><h2 id="proj-title" class="h2">${e(t.projects.title)}</h2><p class="muted">${e(t.projects.text)}</p></div>
    ${l.length>1?`<div class="chips" role="group" aria-label="${e(t.projects.filter)}"><button type="button" class="chip" data-type="" aria-pressed="true">${e(t.projects.all)}</button>${l.map(u=>`<button type="button" class="chip" data-type="${e(u.id)}" aria-pressed="false">${e(n(u.name))}</button>`).join("")}</div>`:""}
    <div class="projs" data-projs>${i.map((u,b)=>{var m,w;let h=[u.image,...((m=u.images)!=null?m:[]).filter(Boolean)].map($=>S(o,$)),c=[u.areaFt?Me(u.areaFt,s,t,r):"",n(u.place),u.weeks?t.projects.weeks.replace("{n}",u.weeks):""].filter(Boolean);return`<article class="proj${b>=re?" more":""}${b%3===0?" proj--wide":""}" data-t="${e((w=u.type)!=null?w:"")}">
      <a class="proj-ph" href="${e(h[0])}" data-open="${b}" aria-label="${e(t.projects.view)}: ${e(n(u.title))}">
        <img sizes="${T.wide}" src="${e(h[0])}" alt="${e(n(u.title))}" width="1200" height="800" loading="lazy">
        ${u.before?`<span class="tag-ba">${e(t.projects.beforeAfter)}</span>`:""}
        ${h.length>1?`<span class="tag-n">${g("camera",14)} ${h.length+(u.before?1:0)}</span>`:""}
      </a>
      <div class="proj-body">
        ${se(a,n,u.type)?`<p class="proj-type">${e(se(a,n,u.type))}</p>`:""}
        <h3>${e(n(u.title))}</h3>
        ${c.length?`<p class="facts">${c.map($=>`<span>${e($)}</span>`).join("")}</p>`:""}
        ${n(u.text)?`<p class="muted">${e(n(u.text))}</p>`:""}
      </div>
      <script type="application/json" data-proj>${JSON.stringify({title:n(u.title),text:n(u.text),facts:c,before:u.before?S(o,u.before):"",images:h}).replace(/</g,"\\u003c")}<\/script>
    </article>`}).join("")}</div>
    ${i.length>re?`<p class="center"><button type="button" class="btn btn--line proj-more" data-proj-more>${e(t.projects.more)}</button></p>`:""}
  </div>
  <dialog class="pv" data-pv aria-labelledby="pv-title">
    <div class="pv-box">
      <button type="button" class="pv-x" data-pv-close aria-label="${e(t.projects.close)}">\u2715</button>
      <div class="pv-media">
        <div class="ba" data-ba hidden>
          <img data-ba-after alt="${e(t.projects.after)}">
          <div class="ba-before"><img data-ba-before alt="${e(t.projects.before)}"></div><span class="ba-line"></span>
          <span class="ba-l">${e(t.projects.before)}</span><span class="ba-r">${e(t.projects.after)}</span>
          <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="${e(t.projects.compare)}" data-ba-range>
        </div>
        <img class="pv-img" data-pv-img alt="">
        <div class="pv-thumbs" data-pv-thumbs></div>
      </div>
      <div class="pv-info"><h3 id="pv-title" data-pv-title></h3><p class="facts" data-pv-facts></p><p class="muted" data-pv-text></p>
        <a class="btn btn--primary" href="#booking" data-pv-book>${e(t.projects.similar)}</a></div>
    </div>
  </dialog>
</section>`}var q=(a,t)=>a.perArea?t.areaUnit:a.monthly?t.t.pricing.month:t.L(a.unit);function Se(a){var b;let{catalog:t,services:n,t:o,L:r,url:s,money:i,market:l}=a;if(!n.length)return"";let d=((b=t.categories)!=null?b:[]).filter(h=>n.some(c=>c.category===h.id)),p=(h,c)=>q(h,a)?o.pricing.per.replace("{price}",i(c)).replace("{unit}",q(h,a)):i(c),u=h=>`<article class="price${h.featured?" price--hot":""}">
      ${h.image?`<img sizes="${T.card}" src="${e(S(s,h.image))}" alt="${e(r(h.name))}" width="800" height="600" loading="lazy">`:""}
      <div class="price-body">
        ${h.featured?`<span class="hot">${e(o.pricing.popular)}</span>`:""}
        <h3>${e(r(h.name))}</h3>
        ${r(h.description)?`<p class="muted">${e(r(h.description))}</p>`:""}
        <table class="ptable"><tbody>${h.variants.map(c=>`<tr><th scope="row">${e(r(c.label))}</th><td>${e(p(h,c.price))}</td></tr>`).join("")}</tbody></table>
        <a class="link" href="#booking" data-pick="${e(r(h.name))}">${e(o.pricing.ask)} ${g("arrow",16)}</a>
      </div>
    </article>`;return`<section class="section section--soft" id="pricing" aria-labelledby="price-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(o.pricing.kicker)}</p><h2 id="price-title" class="h2">${e(o.pricing.title)}</h2><p class="muted">${e(o.pricing.text)}</p>
      ${l.currency==="USD"?`<p class="small muted">${e(o.pricing.tax)}</p>`:""}</div>
    ${d.map(h=>`<div class="pgroup"><h3 class="pgroup-h">${e(r(h.name))}</h3><div class="prices">${n.filter(c=>c.category===h.id).map(u).join("")}</div></div>`).join("")}
  </div>
</section>`}function je(a){var w,$,f,k;let{site:t,services:n,t:o,L:r,market:s,areaUnit:i}=a,l=(w=t.planner)!=null?w:{},d=v=>n.find(x=>x.id===v),p=["patio","planting","lawn","irrigation","lighting","water"].map(v=>[v,d(l[v])]);if(p.some(([,v])=>!v))return"";let u=d(l.planting).variants.map(v=>r(v.label)),h={...Object.fromEntries(p.map(([v,x])=>[v,x.variants.map(D=>D.price)])),spread:($=l.spread)!=null?$:15,names:Object.fromEntries(p.map(([v,x])=>[v,r(x.name)]))},c=F(s)?Math.round(((f=l.defaultFt)!=null?f:1200)/A/10)*10:(k=l.defaultFt)!=null?k:1200,m=o.planner;return`<section class="section" id="planner" aria-labelledby="plan-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(m.kicker)}</p><h2 id="plan-title" class="h2">${e(m.title)}</h2><p class="muted">${e(m.text)}</p></div>
    <div class="plan card" data-plan='${e(JSON.stringify(h))}'>
      <div class="plan-form">
        <label class="field"><span>${e(m.area.replace("{unit}",i))}</span><input type="number" inputmode="decimal" min="10" max="200000" value="${c}" data-plan-area data-unit="${e(i)}"></label>
        <fieldset class="field seg"><legend>${e(m.tier)}</legend><div class="seg-row">${u.map((v,x)=>`<label><input type="radio" name="plan-tier" value="${x}"${x===1?" checked":""}><span>${e(v)}</span></label>`).join("")}</div></fieldset>
        <label class="field"><span>${e(m.patio)} <output data-plan-patio-out>30%</output></span><input type="range" min="0" max="70" step="5" value="30" data-plan-patio></label>
        <label class="field"><span>${e(m.lawn)} <output data-plan-lawn-out>20%</output></span><input type="range" min="0" max="70" step="5" value="20" data-plan-lawn></label>
        <div class="plan-adds">
          <label class="tick"><input type="checkbox" data-plan-add="irrigation" checked><span>${e(r(d(l.irrigation).name))}</span></label>
          <label class="tick"><input type="checkbox" data-plan-add="water"><span>${e(r(d(l.water).name))}</span></label>
          <label class="tick tick--n"><input type="checkbox" data-plan-add="lighting" checked><span>${e(r(d(l.lighting).name))}</span>
            <input type="number" min="1" max="60" value="8" aria-label="${e(m.fixtures)}" data-plan-fixtures><small>${e(m.fixtures)}</small></label>
        </div>
      </div>
      <div class="plan-out">
        <p class="muted">${e(m.result)}</p>
        <p class="plan-sum" data-plan-sum aria-live="polite">\u2014</p>
        <ul class="plan-lines" data-plan-lines></ul>
        <p class="small muted">${e(m.note)}</p>
        <a class="btn btn--primary" href="#booking" data-plan-book data-tpl="${e(m.chip)}">${g("leaf",18)} ${e(m.book)}</a>
      </div>
    </div>
  </div>
</section>`}var ze=["full","part","shade"];function Ne({site:a,t,L:n,url:o,market:r,lang:s}){var h;let i=((h=a.plants)!=null?h:[]).filter(c=>n(c==null?void 0:c.name));if(!i.length)return"";let l=r.temp==="C",d=new Intl.NumberFormat(M(s),{maximumFractionDigits:1}),p=c=>(l?`${d.format(Math.round((c-32)*5/9))} \xB0C`:`${d.format(c)} \xB0F`).replace("-","\u2212"),u=([c,m])=>l?`${d.format(c)}\u2013${d.format(m)} cm`:`${d.format(Math.round(c/15.24)/2)}\u2013${d.format(Math.round(m/15.24)/2)} ft`,b=c=>{var m;return(m={low:1,med:2,high:3}[c])!=null?m:2};return`<section class="section section--deep" id="plants" aria-labelledby="plants-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(t.plants.kicker)}</p><h2 id="plants-title" class="h2">${e(t.plants.title)}</h2><p class="muted">${e(t.plants.text)}</p></div>
    <div class="chips" role="group" aria-label="${e(t.plants.filter)}">
      <button type="button" class="chip" data-sun="" aria-pressed="true">${e(t.plants.all)}</button>
      ${ze.map(c=>`<button type="button" class="chip" data-sun="${c}" aria-pressed="false">${g("sun",15)} ${e(t.plants.sun[c])}</button>`).join("")}
      <label class="chip chip--tick"><input type="checkbox" data-dry> ${g("drop",15)} ${e(t.plants.dry)}</label>
    </div>
    <div class="plants" data-plants>${i.map(c=>{var m;return`<article class="plant" data-sun="${e(c.sun)}" data-water="${e(c.watering)}">
      ${c.image?`<img sizes="${T.card}" src="${e(S(o,c.image))}" alt="${e(n(c.name))}" width="600" height="750" loading="lazy">`:""}
      <div class="plant-body">
        <h3>${e(n(c.name))}</h3>${c.latin?`<p class="latin">${e(c.latin)}</p>`:""}
        <ul class="ptags">
          <li title="${e(t.plants.sunLabel)}">${g("sun",14)} ${e((m=t.plants.sun[c.sun])!=null?m:"")}</li>
          <li title="${e(t.plants.water)}">${g("drop",14)} ${e(t.plants.waters[b(c.watering)-1])}</li>
          ${c.hardyF!=null?`<li>${g("thermo",14)} ${e(t.plants.hardy.replace("{t}",p(c.hardyF)))}</li>`:""}
          ${c.heightCm?`<li>${g("ruler",14)} ${e(u(c.heightCm))}</li>`:""}
        </ul>
        ${n(c.season)?`<p class="small muted">${e(n(c.season))}</p>`:""}
      </div>
    </article>`}).join("")}</div>
    <p class="muted empty" data-plants-empty hidden>${e(t.plants.none)}</p>
  </div>
</section>`}function Pe({site:a,t,L:n}){var r;let o=((r=a.seasons)!=null?r:[]).filter(s=>n(s==null?void 0:s.title));return o.length?`<section class="section" id="seasons" aria-labelledby="season-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(t.seasons.kicker)}</p><h2 id="season-title" class="h2">${e(t.seasons.title)}</h2><p class="muted">${e(t.seasons.text)}</p></div>
    <ol class="seasons" data-seasons='${e(JSON.stringify(o.map(s=>({m:s.months,i:!!s.installs,n:n(s.title)}))))}'>${o.map(s=>`<li class="season">
      <p class="season-m">${e(n(s.range))}</p>
      <h3>${e(n(s.title))}</h3>
      <p class="muted">${e(n(s.text))}</p>
      ${s.installs?`<span class="season-tag">${g("leaf",13)} ${e(t.seasons.install)}</span>`:""}
      <span class="season-now">${e(t.seasons.now)}</span>
    </li>`).join("")}</ol>
  </div>
</section>`:""}function Ce({site:a,t,L:n}){var r;let o=((r=a.steps)!=null?r:[]).filter(s=>n(s==null?void 0:s.title));return o.length?`<section class="section section--soft" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(t.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(t.steps.title)}</h2></div>
    <ol class="steps">${o.map((s,i)=>`<li><span class="step-n">${String(i+1).padStart(2,"0")}</span><div><strong>${e(n(s.title))}</strong>${n(s.time)?`<span class="step-t">${g("clock",14)} ${e(n(s.time))}</span>`:""}${n(s.text)?`<p class="muted">${e(n(s.text))}</p>`:""}</div></li>`).join("")}</ol>
  </div>
</section>`:""}function Te({site:a,t,L:n,lang:o}){let r=X(a,t,o,"btn btn--line"),s=ee(a);return a.showReviews===!1||!s.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(t.reviews)}</h2>
    ${te(s,o,"quotes",i=>`<figure class="quote">
      ${i.rating?`<div class="stars" aria-label="${i.rating}/5">${Array.from({length:5},(l,d)=>`<span class="${d<i.rating?"on":""}">${g("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(n(i.text))}</blockquote>
      <figcaption><strong>${e(i.name)}</strong>${i.bought?` \xB7 ${e(n(i.bought))}`:""}${ae(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Re({site:a,services:t,t:n,L:o,channels:r,gform:s,market:i,money:l,areaUnit:d}){var $;let p=n.booking,u=($=a.contact)!=null?$:{},b=s?` data-gform="${e(s.action)}" data-gmap='${e(JSON.stringify(s.fields))}'`:"",h=r.map((f,k)=>{var v;return`<button type="button" class="btn ${k===0?"btn--primary":"btn--line"}" data-channel="${e(f)}" data-href="${e(B(f,u,""))}">${g(f,18)} ${e((v=n.via[f])!=null?v:f)}</button>`}).join(""),c=f=>{var v;let k=f*(i.default?1:(v=i.rate)!=null?v:1);return C(k,String(Math.max(1,10**(String(Math.round(k)).length-1)/2)))},m=be.map(c),w=[p.budgetUnder.replace("{n}",l(m[0])),...m.slice(0,-1).map((f,k)=>`${l(f)} \u2013 ${l(m[k+1])}`),p.budgetOver.replace("{n}",l(m.at(-1))),p.notSure];return`<section class="section section--soft" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="book-copy">
      <p class="kicker">${e(p.kicker)}</p>
      <h2 id="book-title" class="h2">${e(p.heading)}</h2>
      <p class="lead">${e(p.text)}</p>
      <ul class="book-list">${p.points.map(f=>`<li>${g("check",18)} ${e(f)}</li>`).join("")}</ul>
    </div>
    <form class="card form" data-book novalidate${b} data-order-text="${e(p.message)}">
      <div class="book-fields">
        <h3 class="form-h">${e(p.title)}</h3>
        <label class="field"><span>${e(p.service)}</span><select name="product">
          <option value="${e(p.notSure)}">${e(p.notSure)}</option>
          ${t.map(f=>`<option>${e(o(f.name))}</option>`).join("")}
        </select></label>
        <div class="row2">
          <label class="field"><span>${e(p.area.replace("{unit}",d))}</span><input name="area" type="number" inputmode="decimal" min="1" max="200000" data-unit="${e(d)}"></label>
          <label class="field"><span>${e(p.budget)}</span><select name="budget">${w.map(f=>`<option>${e(f)}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(p.style)}</span><select name="style">${p.styles.map(f=>`<option>${e(f)}</option>`).join("")}</select></label>
          <label class="field"><span>${e(p.when)}</span><select name="day" data-when>${p.whens.map(f=>`<option>${e(f)}</option>`).join("")}</select></label>
        </div>
        <label class="field"><span>${e(p.address)}</span><input name="address" maxlength="160" autocomplete="street-address" placeholder="${e(p.addressHint)}"></label>
        <div class="row2">
          <label class="field"><span>${e(p.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(p.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(p.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${e(p.noteHint)}"></textarea></label>
        <input type="hidden" name="estimate">
        <p class="est-chip" data-est-chip hidden></p>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(p.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${e(p.sending)}">${g("leaf",18)} ${e(p.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${g(s?"check":"arrow",22)} ${e(s?p.done:p.stepTitle)}</p>
        <p>${e(s?p.doneText:p.stepText)}</p>
        ${s?"":`<div class="buy">${h}</div><button type="button" class="link" data-edit>${e(p.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function Ee({site:a,t,L:n}){var i,l,d;let o=(i=a.contact)!=null?i:{},r=encodeURIComponent((l=o.mapQuery)!=null?l:n(o.address)),s=p=>p.length===7?t.everyDay:W(p,t.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${Y(a,t)}
      ${((d=a.hours)!=null?d:[]).length?`<table class="hours"><tbody>${a.hours.map(p=>`<tr><th scope="row">${e(s(p.days))}</th><td>${e(p.open)} \u2013 ${e(p.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(o.address)?`<p class="addr">${g("pin",18)} ${e(n(o.address))}</p>`:""}
      ${n(a.areas)?`<p class="addr">${g("route",18)} <span><strong>${e(t.visit.areas)}</strong> ${e(n(a.areas))}</span></p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${e(t.visit.directions)} ${g("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function qe({site:a,t,L:n}){var r;let o=((r=a.faq)!=null?r:[]).filter(s=>n(s==null?void 0:s.q));return o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div class="qa">${o.map((s,i)=>`<details${i===0?" open":""}><summary>${e(n(s.q))}</summary><p>${e(n(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Fe({site:a,t,L:n,market:o}){var i,l;let r=(i=a.contact)!=null?i:{},s=Object.entries((l=a.social)!=null?l:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p>${n(a.license)?`<p class="small muted">${e(n(a.license))}</p>`:""}</div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li><a href="tel:${j(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${s.map(([d,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${ne(a,t,o.lang)}</div>
</footer>`}function Oe(a){var p,u,b;let{site:t,market:n,L:o,abs:r,url:s,services:i,catalog:l}=a,d=(p=t.contact)!=null?p:{};return{"@context":"https://schema.org","@type":"HomeAndConstructionBusiness",name:t.name,url:r(`${n.id}/`),description:o(t.intro),image:new URL(L(t,s),r("")).href,telephone:d.phone,email:d.email,address:{"@type":"PostalAddress",streetAddress:o(d.address)},areaServed:o(t.areas)||void 0,openingHoursSpecification:_((u=t.hours)!=null?u:[]),currenciesAccepted:n.currency,hasOfferCatalog:{"@type":"OfferCatalog",name:t.name,itemListElement:((b=l.categories)!=null?b:[]).filter(h=>i.some(c=>c.category===h.id)).map(h=>({"@type":"OfferCatalog",name:o(h.name),itemListElement:i.filter(c=>c.category===h.id).flatMap(c=>c.variants.map(m=>({"@type":"Offer",name:`${o(c.name)}${o(m.label)?` (${o(m.label)})`:""}`,priceSpecification:{"@type":"UnitPriceSpecification",price:m.price,priceCurrency:n.currency,...q(c,a)?{unitText:q(c,a)}:{}},itemOffered:{"@type":"Service",name:o(c.name),description:o(c.description)||o(c.name)}})))}))}}}export{Ze as renderSite};
