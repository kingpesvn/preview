var Se={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,t=>Se[t]);function U(n,t,a="vi"){var o,r,s;return n==null?"":typeof n!="object"?String(n):(s=(r=(o=n[t])!=null?o:n[a])!=null?r:Object.values(n)[0])!=null?s:""}var ze={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},Y=n=>{var t;return(t=ze[n])!=null?t:"en-US"};function Ne(n,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(n)-.01);let a=Number(t)||1;return Math.max(a,Math.round(n/a)*a)}function X(n,t){var o,r;if(t.default)return n.basePrice;let a=(r=(o=n.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:Ne(n.basePrice*t.rate,t.rounding)}var Pe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function te(n,t){let a={style:"currency",currency:t.currency};return Pe.has(t.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(Y(t.lang),a).format(n)}function ae(n="/"){let t=n.endsWith("/")?n:`${n}/`;return(a="")=>t+String(a).replace(/^\//,"")}var F=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,N=(n,t)=>{let a=F(t);return a==null?t:n(a)},T=(n="")=>String(n).replace(/\D/g,"");function W(n,t,a=""){switch(n){case"phone":return`tel:${T(t.phone)}`;case"zalo":return`https://zalo.me/${T(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${T(t.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var A=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,qe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function ne(n){if(!n||typeof n!="string")return null;let t;try{t=new URL(n.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let a=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let o={};for(let[r,s]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();qe.includes(i)&&(o[i]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var V={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var je={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},d=(n,t=20,a="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(o=je[n])!=null?o:""}</svg>`},_=[1,2,3,4,5,6,0],Ce=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function se(n,t){let a=n.map(r=>_.indexOf(r)).sort((r,s)=>r-s);return a.every((r,s)=>s===0||r===a[s-1]+1)&&a.length>2?`${t[_[a[0]]]} \u2013 ${t[_[a.at(-1)]]}`:a.map(r=>t[_[r]]).join(", ")}var ie=n=>n.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(a=>Ce[a]),opens:t.open,closes:t.close}));function le(n){var a,o;return(o=(a=new Intl.NumberFormat(Y(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:a.value)!=null?o:n.currency}var Q=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',ce=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,pe=(n,t)=>{var a;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((a=n.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},oe={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Te=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Le=n=>{var t;try{let a=new URL(String((t=n.googleReview)!=null?t:"").trim());return a.protocol==="https:"&&Te.test(a.hostname)?a.href:""}catch{return""}},de=(n,t,a,o="btn btn--line")=>{var i;let r=Le(n);if(!r)return"";let s=typeof t.reviews=="object"&&((i=t.reviews)==null?void 0:i.google)||oe[a]||oe.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${d("star",16)} ${e(s)}</a></p>`},K={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},he={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ue=n=>{var t;return((t=n.reviews)!=null?t:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function me(n,t){var s,i,c;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=n==null?void 0:n.date)!=null?s:"").trim());if(!a)return"";let o=new Date(Date.UTC(+a[1],+a[2]-1,+((i=a[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((c=he[t])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(n.date)}">${e(r)}</time>`}function Re(n,t){var i,c;let a=n.filter(l=>l.rating>=1&&l.rating<=5);if(a.length<2)return"";let o=a.reduce((l,p)=>l+Number(p.rating),0)/a.length,r=(i=K[t])!=null?i:K.en,s=new Intl.NumberFormat((c=he[t])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${d("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(n.length)))}</span></p>`}function ge(n,t,a,o){var i;if(!n.length)return"";let r=(i=K[t])!=null?i:K.en,s=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?r.prev:r.next)}">${d("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Re(n,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${a} rv-track" tabindex="0">${n.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${Ee}`}var Ee=`<style>
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
upd()}})()<\/script>`,re={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function fe(n){var o;let t=(o=re[n])!=null?o:re.en,a="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${a}">${d("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${a}">${d("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${a}">${d("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var ve=(n,t,a)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function be({site:n,markets:t,url:a,abs:o}){var i;let r=(i=t.find(c=>c.default))!=null?i:t[0],s=t.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${t.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${o(`${c.id}/`)}">`).join(`
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
<body><p>${t.map(c=>`<a href="${a(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Be="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ke=24,Fe=n=>String(n!=null?n:"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function xe(n,t){var a;return((a=n.products)!=null?a:[]).map(o=>{var r;return{...o,variants:((r=o.variants)!=null?r:[]).map(s=>({...s,price:X(s,t)})).filter(s=>s.price!=null)}}).filter(o=>o.variants.length>0).map(o=>{let r=Math.min(...o.variants.map(i=>i.price)),s=o.was?X({basePrice:o.was,prices:o.wasPrices},t):null;return{...o,from:r,was:s&&s>r?s:null}})}function ye(n,t,a){var o;return(t==null?void 0:t[a.id])!=null?t[a.id]:n==null||n===""?null:a.default?Number(n):Math.round(Number(n)*((o=a.rate)!=null?o:1)*100)/100}var we=(n,t)=>{var a,o;return((o=(a=t.tiers)!=null?a:n.tiers)!=null?o:[]).filter(r=>Number(r.min)>1&&Number(r.off)>0).sort((r,s)=>r.min-s.min)};function mt({site:n,catalog:t,i18n:a,template:o,basePath:r="/",siteUrl:s=n.domain}){var m,h,w,k,x,z;let i=ae(r),c=y=>new URL(i(y),s).href,l=t.markets,p=(y,D)=>`${D.id}/${U(y.slug,D.lang,"en")}/`,u=ne(n.orderForm),b=u&&!u.error?u:null,v=[];for(let y of l){let D=y.lang,g=(h=(m=a[D])!=null?m:a.en)!=null?h:a.vi,M=$=>U($,D,"en"),P=xe(t,y),O=(k=(w=n.orderChannels)==null?void 0:w[y.id])!=null?k:["phone"],J=$=>te($,y),Z=$=>{var q;return((q=t.categories)!=null?q:[]).find(S=>S.id===$.category)},j=(x=n.delivery)!=null?x:{},G={fee:(z=ye(j.fee,j.feeManual,y))!=null?z:0,freeFrom:ye(j.freeFrom,j.freeFromManual,y),text:j.text},H=P.map($=>{var q;return{id:$.id,n:M($.name),u:(q=M($.unit))!=null?q:"",href:i(p($,y)),img:N(i,$.image),t:we(n,$).map(S=>[Number(S.min),Number(S.off)]),v:$.variants.map(S=>{var R,E,B;return{l:(R=M(S.label))!=null?R:"",s:(B=(E=S.sku)!=null?E:$.sku)!=null?B:"",p:S.price,o:S.stock==="order"?1:0}})}}),L={site:n,catalog:t,market:y,markets:l,lang:D,t:g,L:M,url:i,abs:c,channels:O,money:J,items:P,productPath:p,template:o,cat:Z,gform:b,delivery:G,data:H};v.push({path:`${y.id}/index.html`,html:$e(L,{kind:"home"})});for(let $ of P)v.push({path:`${p($,y)}index.html`,html:$e(L,{kind:"product",product:$})})}return v.push({path:"index.html",html:be({site:n,markets:l,url:i,abs:c})}),v}function $e(n,t){var G,H,L,$,q,S,R,E,B,ee;let{site:a,market:o,markets:r,lang:s,t:i,L:c,url:l,abs:p,catalog:u,productPath:b,channels:v}=n,m=t.kind==="home",h=t.product,w=m?`${o.id}/`:b(h,o),k=m?`${a.name} \xB7 ${c(a.tagline)}`:`${c(h.name)}${h.sku?` (${h.sku})`:""} \xB7 ${a.name}`,x=m?c(a.intro):`${c(h.description)} ${i.shop.from} ${n.money(h.from)}.`,z=r.map(f=>{var C;return m?{m:f,href:`${f.id}/`}:xe({products:[((C=u.products)!=null?C:[]).find(I=>I.id===h.id)]},f).length?{m:f,href:b(h,f)}:null}).filter(Boolean),y=f=>{var C,I;return(I=(C=z.find(De=>De.m.id===f.id))==null?void 0:C.href)!=null?I:`${f.id}/`},D=(G=r.find(f=>f.default))!=null?G:r[0],g=(H=a.theme)!=null?H:{},M=["primary","ink","bg","surface","soft","accent"].filter(f=>g[f]).map(f=>`--${f}:${g[f]}`).join(";"),P=r.map(f=>({id:f.id,lang:f.lang,country:f.country,currency:f.currency,href:l(y(f))})),O=(L=a.contact)!=null?L:{},J=a.heroImage||(($=n.items[0])==null?void 0:$.image),Z=p(F(m?J:h.image)),j=`kp-hw-${String((q=a.name)!=null?q:"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${o.id}`;return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(k)}</title>
<meta name="description" content="${e(x)}">
<link rel="canonical" href="${p(w)}">
${z.map(({m:f,href:C})=>`<link rel="alternate" hreflang="${e(f.lang)}-${e(f.country)}" href="${p(C)}">`).join(`
`)}
${z.some(f=>f.m.id===D.id)?`<link rel="alternate" hreflang="x-default" href="${p(y(D))}">`:""}
<meta property="og:type" content="${m?"website":"product"}">
<meta property="og:title" content="${e(k)}">
<meta property="og:description" content="${e(x)}">
<meta property="og:url" content="${p(w)}">
<meta property="og:image" content="${e(Z)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta name="theme-color" content="${e((S=g.bg)!=null?S:"#FFFFFF")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Be}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${M}}</style>
${m?A(Xe(n))+(((R=a.faq)!=null?R:[]).length?A(Qe(n)):""):A(et(n,h))+A(tt(n,h))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(o.id)}" data-markets='${e(JSON.stringify(P))}' data-copied="${e(i.copied)}" data-wa="${e(T((E=O.whatsapp)!=null?E:""))}" data-email="${e((B=O.email)!=null?B:"")}" data-tz="${e((ee=a.timezone)!=null?ee:"Asia/Ho_Chi_Minh")}" data-store="${e(j)}" data-currency="${e(o.currency)}" data-lang="${e(s)}">
<script type="application/json" id="kp-items">${JSON.stringify(n.data).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${e(i.skip)}</a>
${ce(i)}
${c(a.announcement)?`<p class="announce">${e(c(a.announcement))}</p>`:""}
${Ae(n,m)}
<main id="main">
${m?[Ve,Oe,Ge,He,Ie,Ue,We,_e].map(f=>f(n)).join(`
`):Ke(n,h)}
</main>
${Ze(n)}
${Ye(n)}
<nav class="dock" aria-label="${e(i.nav.quote)}">
  <a href="${m?"":l(`${o.id}/`)}#shop">${d("search",20)}<span>${e(i.nav.shop)}</span></a>
  <button type="button" class="primary" data-open-quote>${d("doc",20)}<span>${e(i.nav.quote)}</span><b class="count" data-count hidden>0</b></button>
</nav>
</body>
</html>
`}function Ae({site:n,market:t,markets:a,t:o,url:r},s){let i=s?"":r(`${t.id}/`),c=[[`${i}#cats`,o.nav.cats],[`${i}#shop`,o.nav.shop],[`${i}#bulk`,o.nav.bulk],[`${i}#visit`,o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${n.logo?`<img src="${e(N(r,n.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${d("wrench",18)}</span>`}
      <span>${e(n.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${c.map(([l,p])=>`<a href="${l}">${e(p)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${a.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${d("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(le(t))}</span></span></summary>
        <ul>${a.map(l=>`<li><a href="${r(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===t.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <button type="button" class="btn btn--primary btn--sm hide-sm" data-open-quote>${d("doc",16)} ${e(o.nav.quote)} <b class="count" data-count hidden>0</b></button>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${d("menu",22)}</summary>
        <nav aria-label="Menu">${c.map(([l,p])=>`<a href="${l}">${e(p)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Ve(n){var l;let{site:t,t:a,L:o,url:r,items:s}=n,i=((l=t.stats)!=null?l:[]).filter(p=>p==null?void 0:p.value),c=t.heroImage;return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${o(t.heroKicker)?`<p class="kicker">${e(o(t.heroKicker))}</p>`:""}
      <h1>${e(o(t.tagline))}</h1>
      <p class="lead">${e(o(t.intro))}</p>
      <form class="lookup" action="#shop" method="get" role="search" data-lookup>
        <label class="lookup-box">${d("search",22)}<span class="sr">${e(a.lookup.label)}</span>
          <input type="search" name="q" placeholder="${e(a.lookup.placeholder)}" autocomplete="off" data-lookup-input aria-controls="lookup-list">
        </label>
        <button type="submit" class="btn btn--primary btn--lg">${e(a.lookup.go)}</button>
        <ul class="lookup-list" id="lookup-list" data-lookup-list hidden></ul>
      </form>
      <p class="muted small">${e(a.lookup.hint.replace("{n}",s.reduce((p,u)=>p+u.variants.length,0)))}</p>
    </div>
    ${c?`<figure class="hero-pic"><img src="${e(N(r,c))}" alt="" width="900" height="1100" fetchpriority="high"></figure>`:""}
  </div>
  ${i.length?`<ul class="wrap stats">${i.map(p=>`<li><b>${e(o(p.value))}</b><span>${e(o(p.label))}</span></li>`).join("")}</ul>`:""}
</section>`}function Oe({catalog:n,items:t,t:a,L:o,url:r}){var i;let s=((i=n.categories)!=null?i:[]).map(c=>({...c,n:t.filter(l=>l.category===c.id).length})).filter(c=>c.n);return s.length?`<section class="section" id="cats" aria-labelledby="cats-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.cats.kicker)}</p><h2 id="cats-title" class="h2">${e(a.cats.title)}</h2></div>
    <ol class="cats">${s.map((c,l)=>`<li><a href="?type=${e(c.id)}#shop" data-cat-link="${e(c.id)}">
      <span class="n">${String(l+1).padStart(2,"0")}</span>
      <span class="cat-name">${e(o(c.name))}</span>
      <span class="cat-c">${e(a.cats.count.replace("{n}",c.n))}</span>
      ${c.image?`<img sizes="${V.thumb}" src="${e(N(r,c.image))}" alt="" width="240" height="160" loading="lazy">`:"<span></span>"}
    </a></li>`).join("")}</ol>
  </div>
</section>`:""}function Me(n,t,a=0){var v,m,h,w;let{t:o,L:r,url:s,money:i,productPath:c,market:l,cat:p}=n,u=[r(t.name),(v=t.name)==null?void 0:v.vi,(m=t.name)==null?void 0:m.en,r((h=p(t))==null?void 0:h.name),t.sku,...t.variants.map(k=>{var x,z;return`${(x=k.sku)!=null?x:""} ${(z=r(k.label))!=null?z:""}`})].filter(Boolean).join(" "),b=t.variants.every(k=>k.stock==="order");return`<li class="card${a>=ke?" is-more":""}" data-type="${e(t.category)}" data-price="${t.from}" data-stock="${b?"order":"in"}" data-name="${e(Fe(u))}">
  <a class="card-link" href="${s(c(t,l))}">
    <div class="card-img">
      <img sizes="${V.card}" src="${e(N(s,t.image))}" alt="${e(r(t.name))}" width="800" height="800" loading="lazy">
      ${t.was?`<span class="tag tag--sale">-${Math.round((1-t.from/t.was)*100)}%</span>`:r(t.badge)?`<span class="tag">${e(r(t.badge))}</span>`:""}
    </div>
    <p class="card-sku">${e((w=t.sku)!=null?w:"")}${t.variants.length>1?` \xB7 ${e(o.shop.variants.replace("{n}",t.variants.length))}`:""}</p>
    <h3>${e(r(t.name))}</h3>
    <p class="card-price">${t.variants.length>1?`<span>${e(o.shop.from)}</span> `:""}<b>${e(i(t.from))}</b>${r(t.unit)?`<span> / ${e(r(t.unit))}</span>`:""}</p>
    <p class="stock${b?" stock--order":""}">${e(b?o.stock.order:o.stock.in)}</p>
  </a>
</li>`}function Ge(n){var i;let{items:t,catalog:a,t:o,L:r}=n,s=((i=a.categories)!=null?i:[]).filter(c=>t.some(l=>l.category===c.id));return`<section class="section section--soft" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(o.shop.kicker)}</p><h2 id="shop-title" class="h2">${e(o.shop.title)}</h2>
      <p class="lead" data-count-text="${e(o.shop.count)}">${e(o.shop.count.replace("{n}",t.length))}</p></div>
    <div class="toolbar">
      <div class="chips" role="group" aria-label="${e(o.shop.all)}">
        <button type="button" class="pill is-on" data-type="">${e(o.shop.all)}</button>
        ${s.map(c=>`<button type="button" class="pill" data-type="${e(c.id)}">${e(r(c.name))}</button>`).join("")}
      </div>
      <div class="filters">
        <label class="search">${d("search",18)}<input type="search" placeholder="${e(o.lookup.placeholder)}" aria-label="${e(o.lookup.label)}" data-search></label>
        <label class="check"><input type="checkbox" data-instock> ${e(o.shop.inStock)}</label>
        <label class="select"><span class="sr">${e(o.shop.sort)}</span><select data-sort>
          <option value="">${e(o.shop.sortPop)}</option><option value="asc">${e(o.shop.sortLow)}</option><option value="desc">${e(o.shop.sortHigh)}</option>
        </select></label>
      </div>
    </div>
    <ul class="grid" data-grid>${t.map((c,l)=>Me(n,c,l)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${e(o.shop.empty)}</p>
    ${t.length>ke?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(o.shop.more)}</button></div>`:""}
  </div>
</section>`}function He(n){var u,b;let{site:t,t:a,L:o,money:r,items:s,delivery:i}=n,c=((u=t.tiers)!=null?u:[]).filter(v=>Number(v.min)>1&&Number(v.off)>0).sort((v,m)=>v.min-m.min);if(!c.length)return"";let l=(b=s.find(v=>v.badge))!=null?b:s[0],p=l==null?void 0:l.variants[0];return`<section class="section" id="bulk" aria-labelledby="bulk-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.bulk.kicker)}</p><h2 id="bulk-title" class="h2">${e(a.bulk.title)}</h2><p class="lead">${e(a.bulk.text)}</p></div>
    <div class="bulk">
      <table class="tiers">
        <thead><tr><th scope="col">${e(a.bulk.qty)}</th><th scope="col">${e(a.bulk.off)}</th>${p?`<th scope="col">${e(o(l.name))}${o(p.label)?` \xB7 ${e(o(p.label))}`:""}</th>`:""}</tr></thead>
        <tbody>
          <tr><td>1 \u2013 ${c[0].min-1}</td><td>\u2014</td>${p?`<td>${e(r(p.price))}</td>`:""}</tr>
          ${c.map((v,m)=>`<tr><td>${v.min}${c[m+1]?` \u2013 ${c[m+1].min-1}`:"+"}</td><td><b>\u2212${v.off}%</b></td>${p?`<td>${e(r(Math.round(p.price*(100-v.off))/100))}</td>`:""}</tr>`).join("")}
        </tbody>
      </table>
      <ul class="bulk-notes">
        <li>${d("doc",20)} <span>${e(a.bulk.note1)}</span></li>
        <li>${d("truck",20)} <span>${e(o(i.text)||a.bulk.note2)}${i.freeFrom?` ${e(a.bulk.freeFrom.replace("{price}",r(i.freeFrom)))}`:""}</span></li>
        ${t.invoice?`<li>${d("card",20)} <span>${e(a.bulk.note3)}</span></li>`:""}
      </ul>
    </div>
  </div>
</section>`}function Ie({site:n,t,L:a}){var r;let o=((r=n.services)!=null?r:[]).filter(s=>a(s==null?void 0:s.title));return o.length?`<section class="section section--dark" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.services.kicker)}</p><h2 id="svc-title" class="h2">${e(t.services.title)}</h2></div>
    <ul class="svc">${o.map((s,i)=>{var c;return`<li><span class="n">${String(i+1).padStart(2,"0")}</span>${d((c=s.icon)!=null?c:"check",26)}<b>${e(a(s.title))}</b><p>${e(a(s.text))}</p></li>`}).join("")}</ul>
  </div>
</section>`:""}function Ue({site:n,t,L:a,lang:o}){let r=de(n,t,o,"btn btn--line"),s=ue(n);return n.showReviews===!1||!s.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${ge(s,o,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(c,l)=>`<span class="${l<i.rating?"on":""}">${d("star",15)}</span>`).join("")}</p>
      <blockquote>${e(a(i.text))}</blockquote>
      <figcaption>${e(i.name)}${a(i.bought)?`<small>${e(a(i.bought))}</small>`:""}${me(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function We({site:n,t,L:a}){var r;let o=((r=n.faq)!=null?r:[]).filter(s=>a(s==null?void 0:s.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${o.map((s,i)=>`<details${i===0?" open":""}><summary>${e(a(s.q))}</summary><p>${e(a(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function _e({site:n,t,L:a,channels:o}){var c,l,p;let r=(c=n.contact)!=null?c:{},s=encodeURIComponent((l=r.mapQuery)!=null?l:a(r.address)),i=u=>u.length===7?t.visit.everyDay:se(u,t.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${pe(n,t)}
      ${((p=n.hours)!=null?p:[]).length?`<table class="hours"><tbody>${n.hours.map(u=>`<tr><th scope="row">${e(i(u.days))}</th><td>${e(u.open)} \u2013 ${e(u.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${a(r.address)?`<p class="addr">${d("pin",18)} ${e(a(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(t.visit.directions)} ${d("arrow",16)}</a>
        ${o.map(u=>{var b;return`<a class="btn btn--line" href="${e(W(u,r))}" ${Q(u)}>${d(u,18)} ${e((b=t.via[u])!=null?b:u)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ke(n,t){var y,D;let{site:a,t:o,L:r,url:s,money:i,market:c,items:l,cat:p,channels:u}=n,b=p(t),v=s(`${c.id}/`),m=we(a,t),h=t.variants[0],w=l.filter(g=>g.id!==t.id&&g.category===t.category).slice(0,8),k=((y=t.specs)!=null?y:[]).filter(g=>Array.isArray(g)&&g[0]&&g[1]),x=u[0],z=o.product.ask.replace("{product}",`${r(t.name)}${t.sku?` (${t.sku})`:""}`);return`<div class="wrap crumbs"><a href="${v}">${e(o.nav.home)}</a>${d("chevron",14)}<a href="${v}?type=${e(t.category)}#shop">${e(r(b==null?void 0:b.name))}</a>${d("chevron",14)}<span aria-current="page">${e(r(t.name))}</span></div>
<section class="wrap pdp" data-product="${e(t.id)}">
  ${Je(n,t)}
  <div class="pdp-info">
    <p class="kicker">${e(r(b==null?void 0:b.name))}${t.sku?` \xB7 <span class="mono">${e(t.sku)}</span>`:""}</p>
    <h1 class="pdp-title">${e(r(t.name))}</h1>
    <p class="pdp-price"><strong data-unit-price>${e(i(h.price))}</strong>${r(t.unit)?` <span>/ ${e(r(t.unit))}</span>`:""}${t.was?` <s>${e(i(t.was))}</s>`:""}</p>
    <p class="lead">${e(r(t.description))}</p>
    <form class="buybox" data-buybox novalidate>
      ${t.variants.length>1?`<table class="vtable"><caption class="sr">${e(o.product.variants)}</caption>
        <thead><tr><th scope="col"></th><th scope="col">${e(o.product.variant)}</th><th scope="col">${e(o.product.code)}</th><th scope="col">${e(o.product.price)}</th><th scope="col">${e(o.product.stock)}</th></tr></thead>
        <tbody>${t.variants.map((g,M)=>{var P;return`<tr><td><input type="radio" name="v" value="${M}" id="v-${M}"${M?"":" checked"}></td><td><label for="v-${M}">${e(r(g.label))}</label></td><td class="mono">${e((P=g.sku)!=null?P:"")}</td><td>${e(i(g.price))}</td><td class="${g.stock==="order"?"stock--order":"stock--in"}">${e(g.stock==="order"?o.stock.order:o.stock.in)}</td></tr>`}).join("")}</tbody>
      </table>`:`<input type="hidden" name="v" value="0"><p class="one-sku">${h.sku?`${e(o.product.code)}: <span class="mono">${e(h.sku)}</span> \xB7 `:""}<span class="${h.stock==="order"?"stock--order":"stock--in"}">${e(h.stock==="order"?o.stock.order:o.stock.in)}</span></p>`}
      ${m.length?`<div class="ptiers"><p class="h4">${e(o.product.tiers)}</p><ol data-ptiers>
        <li data-min="1" class="is-on"><span>1+</span><b data-tier-price="0">${e(i(h.price))}</b></li>
        ${m.map(g=>`<li data-min="${g.min}"><span>${g.min}+ \xB7 \u2212${g.off}%</span><b data-tier-price="${g.off}">${e(i(Math.round(h.price*(100-g.off))/100))}</b></li>`).join("")}
      </ol></div>`:""}
      <div class="qty-row">
        <label class="qty"><span class="sr">${e(o.product.qty)}</span><button type="button" data-step="-1" aria-label="\u2212">${d("minus",16)}</button><input type="number" name="qty" min="1" value="1" inputmode="numeric" data-qty><button type="button" data-step="1" aria-label="+">${d("plus",16)}</button></label>
        <p class="line"><span>${e(o.product.line)}</span><b data-line>${e(i(h.price))}</b></p>
      </div>
      <p class="muted small" data-next data-tpl="${e(o.product.next)}" hidden></p>
      <div class="buy">
        <button type="button" class="btn btn--primary btn--lg" data-add>${d("plus",18)} <span data-add-label data-added="${e(o.product.added)}">${e(o.product.add)}</span></button>
        <a class="btn btn--line btn--lg" href="${e(W(x,(D=a.contact)!=null?D:{},z))}" ${Q(x)}>${d(x,18)} ${e(o.product.askBtn)}</a>
      </div>
    </form>
    ${k.length?`<div class="specs"><h2 class="h4">${e(o.product.specs)}</h2><dl>${k.map(([g,M])=>`<div><dt>${e(r(g))}</dt><dd>${e(r(M))}</dd></div>`).join("")}</dl></div>`:""}
    ${fe(c.lang)}
  </div>
</section>
${w.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${e(o.product.related)}</h2>
  <ul class="grid grid--related">${w.map(g=>Me(n,g)).join("")}</ul>
</div></section>`:""}`}function Je({t:n,L:t,url:a},o){var c;let r=[o.image,...(c=o.images)!=null?c:[]],s=n.gallery,i=t(o.name);return r.length===1?`<figure class="pdp-img"><img src="${e(N(a,o.image))}" alt="${e(i)}" width="1000" height="1000" fetchpriority="high"></figure>`:`<figure class="pdp-img gallery" data-gallery>
    <div class="g-stage">
      <ul class="g-track" tabindex="0" aria-label="${e(s.label)}">${r.map((l,p)=>`<li id="g-${p+1}"><a href="${e(N(a,l))}" data-zoom="${p}" aria-label="${e(s.zoom)}: ${e(s.photo.replace("{i}",p+1).replace("{n}",r.length))}"><img sizes="${V.wide}" src="${e(N(a,l))}" alt="${e(p?`${i} \u2013 ${s.photo.replace("{i}",p+1).replace("{n}",r.length)}`:i)}" width="1000" height="1000"${p?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
      <button type="button" class="g-nav g-prev" data-step="-1" aria-label="${e(s.prev)}">${d("chevron",22)}</button>
      <button type="button" class="g-nav g-next" data-step="1" aria-label="${e(s.next)}">${d("chevron",22)}</button>
      <span class="g-count" aria-hidden="true"><b data-g-i>1</b> / ${r.length}</span>
    </div>
    <ul class="g-thumbs">${r.map((l,p)=>`<li><a href="#g-${p+1}" data-go="${p}"${p?"":' aria-current="true"'} aria-label="${e(s.photo.replace("{i}",p+1).replace("{n}",r.length))}"><img sizes="${V.thumb}" src="${e(N(a,l))}" alt="" width="1000" height="1000" loading="lazy"></a></li>`).join("")}</ul>
  </figure>
  <dialog class="lightbox" data-lightbox aria-label="${e(i)}">
    <img src="" alt="${e(i)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(s.close)}">\u2715</button>
    <button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(s.prev)}">${d("chevron",26)}</button>
    <button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(s.next)}">${d("chevron",26)}</button>
    <span class="g-count"><b data-lb-i>1</b> / ${r.length}</span>
  </dialog>`}function Ze(n){var v;let{site:t,t:a,money:o,channels:r,gform:s,market:i,delivery:c}=n,l=a.quote,p=a.orderText.replace(/\{\w+\}/g,"\u2026"),u=s?` data-gform="${e(s.action)}" data-gmap='${e(JSON.stringify(s.fields))}'`:"",b=m=>r.map((h,w)=>{var k,x;return`<button type="submit" class="btn ${m!=null?m:w?"btn--line":"btn--primary"} btn--lg" data-channel="${e(h)}" data-href="${e(W(h,(k=t.contact)!=null?k:{},p))}">${d(h,18)} ${e(h==="phone"?l.call:l.send.replace("{channel}",(x=a.via[h])!=null?x:h))}</button>`}).join("");return`<dialog class="drawer" data-quote aria-labelledby="q-title">
  <div class="drawer-in">
    <div class="drawer-head"><h2 id="q-title" class="h3">${d("doc",22)} ${e(l.title)}</h2><button type="button" class="x" data-close-quote aria-label="${e(l.close)}">\u2715</button></div>
    <ul class="q-items" data-q-items></ul>
    <p class="q-empty muted" data-q-empty>${e(l.empty)}</p>
    <dl class="sum">
      <div><dt>${e(l.subtotal)}</dt><dd data-q-sub>${e(o(0))}</dd></div>
      <div data-q-save-row hidden><dt>${e(l.saved)}</dt><dd data-q-save></dd></div>
      <div><dt>${e(l.ship)}</dt><dd data-q-ship data-fee="${c.fee}" data-free="${(v=c.freeFrom)!=null?v:""}" data-free-label="${e(l.free)}">\u2014</dd></div>
      <div class="sum-total"><dt>${e(l.total)}</dt><dd data-q-total>${e(o(0))}</dd></div>
    </dl>
    <form class="order" data-quote-form${u} data-text="${e(a.orderText)}" data-market="${e(`${i.id.toUpperCase()} \xB7 ${i.currency}`)}" novalidate>
      <div class="order-fields">
        <fieldset class="opts"><legend>${e(l.how)}</legend><div class="row">
          <label class="opt"><input type="radio" name="how" value="${e(l.pickup)}" checked><span>${e(l.pickup)}</span></label>
          <label class="opt"><input type="radio" name="how" value="${e(l.deliver)}" data-deliver><span>${e(l.deliver)}</span></label>
        </div></fieldset>
        <div class="fields">
          <label><span>${e(l.name)} *</span><input name="name" autocomplete="name" required></label>
          <label><span>${e(l.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required></label>
          <label><span>${e(l.company)}</span><input name="company" autocomplete="organization"></label>
          <label><span>${e(l.date)}</span><input name="date" type="date" data-date></label>
          <label class="wide" data-addr hidden><span>${e(l.address)} *</span><input name="address" autocomplete="street-address"></label>
          ${t.invoice?`<label class="wide check"><input type="checkbox" name="invoice" value="1"> ${e(l.invoice)}</label>`:""}
          <label class="wide"><span>${e(l.note)}</span><input name="note" placeholder="${e(l.noteHint)}"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <p class="form-err" data-err hidden data-req="${e(l.required)}" data-none="${e(l.needItems)}">${e(l.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--primary btn--lg btn--full" data-order-submit>${d("doc",18)} <span>${e(l.submit)}</span></button></div>
      </div>
      <div class="done${s?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${d(s?"check":"arrow",22)} ${e(s?l.done:l.stepTitle)}</p>
        <p>${e(s?l.doneText:l.stepText)}</p>
        <div class="buy">${b(s?"btn--line":void 0)}</div>
        ${s?"":`<button type="button" class="link back" data-edit>${e(l.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</dialog>`}function Ye({site:n,t,L:a,market:o}){var i,c;let r=(i=n.contact)!=null?i:{},s=Object.entries((c=n.social)!=null?c:{}).filter(([,l])=>l);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(a(n.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${T(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${a(r.address)?`<li>${e(a(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${s.map(([l,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(l==="tiktok"?"TikTok":l==="youtube"?"YouTube":l[0].toUpperCase()+l.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${ve(n,t,o.lang)}</div>
</footer>`}function Xe({site:n,market:t,L:a,abs:o,items:r}){var i,c,l;let s=(i=n.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"HardwareStore",name:n.name,url:o(`${t.id}/`),image:o(F(n.heroImage||((c=r[0])==null?void 0:c.image))),description:a(n.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:a(s.address)},currenciesAccepted:t.currency,openingHoursSpecification:ie((l=n.hours)!=null?l:[])}}var Qe=({site:n,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(a=>t(a==null?void 0:a.q)).map(a=>({"@type":"Question",name:t(a.q),acceptedAnswer:{"@type":"Answer",text:t(a.a)}}))});function et({site:n,market:t,L:a,abs:o,productPath:r,cat:s},i){var c,l;return{"@context":"https://schema.org","@type":"Product",name:a(i.name),sku:i.sku,description:a(i.description),image:[i.image,...(c=i.images)!=null?c:[]].map(p=>o(F(p))),url:o(r(i,t)),category:a((l=s(i))==null?void 0:l.name),offers:i.variants.map(p=>{var u;return{"@type":"Offer",sku:(u=p.sku)!=null?u:i.sku,name:a(p.label)||a(i.name),price:p.price,priceCurrency:t.currency,availability:p.stock==="order"?"https://schema.org/BackOrder":"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:n.name}}})}}function tt({market:n,L:t,abs:a,productPath:o,t:r,cat:s},i){var c;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:a(`${n.id}/`)},{"@type":"ListItem",position:2,name:t((c=s(i))==null?void 0:c.name),item:a(`${n.id}/?type=${i.category}`)},{"@type":"ListItem",position:3,name:t(i.name),item:a(o(i,n))}]}}export{mt as renderSite};
