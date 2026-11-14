var Te={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,a=>Te[a]);function ee(n,a,o="vi"){var t,r,s;return n==null?"":typeof n!="object"?String(n):(s=(r=(t=n[a])!=null?t:n[o])!=null?r:Object.values(n)[0])!=null?s:""}var qe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},J=n=>{var a;return(a=qe[n])!=null?a:"en-US"};function Le(n,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(n)-.01);let o=Number(a)||1;return Math.max(o,Math.round(n/o)*o)}function ae(n,a){var t,r;if(a.default)return n.basePrice;let o=(r=(t=n.prices)==null?void 0:t[a.id])!=null?r:{mode:"auto"};return o.mode==="hidden"?null:o.mode==="manual"?o.amount:Le(n.basePrice*a.rate,a.rounding)}var Re=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function ce(n,a){let o={style:"currency",currency:a.currency};return Re.has(a.currency)&&(o.maximumFractionDigits=0),new Intl.NumberFormat(J(a.lang),o).format(n)}function de(n="/"){let a=n.endsWith("/")?n:`${n}/`;return(o="")=>a+String(o).replace(/^\//,"")}var Z=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,C=(n,a)=>{let o=Z(a);return o==null?a:n(o)},G=(n="")=>String(n).replace(/\D/g,"");function H(n,a,o=""){switch(n){case"phone":return`tel:${G(a.phone)}`;case"zalo":return`https://zalo.me/${G(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${G(a.whatsapp)}${o?`?text=${encodeURIComponent(o)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${o?`?subject=${encodeURIComponent(o)}`:""}`;default:return"#"}}var Y=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,Ee=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function pe(n){if(!n||typeof n!="string")return null;let a;try{a=new URL(n.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let o=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!o)return{error:"not-google"};let t={};for(let[r,s]of a.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();Ee.includes(i)&&(t[i]=r)}return Object.keys(t).length?t.phone?{action:`https://docs.google.com/forms/d/e/${o[1]}/formResponse`,fields:t}:{error:"no-phone"}:{error:"no-fields"}}var O={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Ae={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},$=(n,a=20,o="")=>{var t;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${o}>${(t=Ae[n])!=null?t:""}</svg>`},te=[1,2,3,4,5,6,0],Be=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function me(n,a){let o=n.map(r=>te.indexOf(r)).sort((r,s)=>r-s);return o.every((r,s)=>s===0||r===o[s-1]+1)&&o.length>2?`${a[te[o[0]]]} \u2013 ${a[te[o.at(-1)]]}`:o.map(r=>a[te[r]]).join(", ")}var ge=n=>n.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(o=>Be[o]),opens:a.open,closes:a.close}));function fe(n){var o,t;return(t=(o=new Intl.NumberFormat(J(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:o.value)!=null?t:n.currency}var oe=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',ve=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,$e=(n,a)=>{var o;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((o=n.timezone)!=null?o:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},he={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Oe=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Fe=n=>{var a;try{let o=new URL(String((a=n.googleReview)!=null?a:"").trim());return o.protocol==="https:"&&Oe.test(o.hostname)?o.href:""}catch{return""}},be=(n,a,o,t="btn btn--line")=>{var i;let r=Fe(n);if(!r)return"";let s=typeof a.reviews=="object"&&((i=a.reviews)==null?void 0:i.google)||he[o]||he.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${t}" href="${e(r)}" target="_blank" rel="noopener">${$("star",16)} ${e(s)}</a></p>`},ne={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ye={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},xe=n=>{var a;return((a=n.reviews)!=null?a:[]).filter(o=>o&&(o.name||o.text)&&!(typeof o.text=="object"&&o.text&&!Object.values(o.text).some(Boolean)&&!o.name))};function ke(n,a){var s,i,l;let o=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=n==null?void 0:n.date)!=null?s:"").trim());if(!o)return"";let t=new Date(Date.UTC(+o[1],+o[2]-1,+((i=o[3])!=null?i:1)));if(Number.isNaN(t.getTime()))return"";let r=new Intl.DateTimeFormat((l=ye[a])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(t);return`<time class="rv-date" datetime="${e(n.date)}">${e(r)}</time>`}function Ve(n,a){var i,l;let o=n.filter(d=>d.rating>=1&&d.rating<=5);if(o.length<2)return"";let t=o.reduce((d,c)=>d+Number(c.rating),0)/o.length,r=(i=ne[a])!=null?i:ne.en,s=new Intl.NumberFormat((l=ye[a])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(t);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${$("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(n.length)))}</span></p>`}function we(n,a,o,t){var i;if(!n.length)return"";let r=(i=ne[a])!=null?i:ne.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${$("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Ve(n,a)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${o} rv-track" tabindex="0">${n.map(t).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${Ie}`}var Ie=`<style>
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
upd()}})()<\/script>`,ue={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function Me(n){var t;let a=(t=ue[n])!=null?t:ue.en,o="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(a.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(a.label)}</span>
      <button type="button" data-share-native hidden style="${o}">${$("share",15)} ${e(a.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${o}">${$("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${o}">${$("link",15)} <span>${e(a.copy)}</span></button>
    </div>`}var Se=(n,a,o)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(o==="vi"||o==="ja"?o:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function De({site:n,markets:a,url:o,abs:t}){var i;let r=(i=a.find(l=>l.default))!=null?i:a[0],s=a.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${t(`${r.id}/`)}">
${a.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${t(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(s)}, root = ${JSON.stringify(o(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(l=>`<a href="${o(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Ge="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap",Ne=24,He=n=>{var a;return(a=n.units)!=null?a:["US","LR","MM"].includes(n.country)?"in":"cm"};function Q(n,a){return a==="in"?Math.round(n/2.54*2)/2:Math.round(n)}var re=(n,a)=>new Intl.NumberFormat(a==="en"?"en-US":a,{maximumFractionDigits:1}).format(n);function Pe(n,a){var o;return((o=n.products)!=null?o:[]).map(t=>{var r;return{...t,variants:((r=t.variants)!=null?r:[]).map(s=>({...s,price:ae(s,a)})).filter(s=>s.price!=null)}}).filter(t=>t.variants.length>0).map(t=>{let r=Math.min(...t.variants.map(i=>i.price)),s=t.was?ae({basePrice:t.was,prices:t.wasPrices},a):null;return{...t,from:r,was:s&&s>r?s:null}})}function We(n){let a=n.filter(s=>s.badge),o=n.filter(s=>!a.includes(s)),t=[...new Set(o.map(s=>s.category))].map(s=>o.filter(i=>i.category===s)),r=[...a];for(let s=0;r.length<n.length;s++)for(let i of t)i[s]&&r.push(i[s]);return r}var Ue=n=>String(n).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function _e(n){let a=10**Math.floor(Math.log10(n));return[1,2,2.5,5,10].map(o=>o*a).reduce((o,t)=>Math.abs(t-n)<Math.abs(o-n)?t:o)}function Ke(n){let a=n.map(t=>t.from).sort((t,r)=>t-r),o=[...new Set([.25,.5,.75].map(t=>_e(a[Math.floor(t*(a.length-1))])))];return o.map((t,r)=>[r?o[r-1]:0,t]).concat([[o[o.length-1],1/0]])}function za({site:n,catalog:a,i18n:o,template:t,basePath:r="/",siteUrl:s=n.domain}){var g,f,v,x,M;let i=de(r),l=w=>new URL(i(w),s).href,d=a.markets,c=(w,S)=>`${S.id}/${ee(w.slug,S.lang,"en")}/`,p=pe(n.orderForm),u=p&&!p.error?p:null,h=[];for(let w of d){let S=w.lang,L=(f=(g=o[S])!=null?g:o.en)!=null?f:o.vi,R=y=>ee(y,S,"en"),D=Pe(a,w),z=(x=(v=n.orderChannels)==null?void 0:v[w.id])!=null?x:["phone"],E=y=>Number.isInteger(y)?new Intl.NumberFormat(J(S),{style:"currency",currency:w.currency,maximumFractionDigits:0}).format(y):ce(y,w),N=y=>{var P;return y&&(P=ae({basePrice:y},w))!=null?P:0},W=(y,P)=>{var B,b;return R((b=(B=y==null?void 0:y.find(q=>q.id===P))==null?void 0:B.name)!=null?b:P)},U=y=>{var P;return((P=a.categories)!=null?P:[]).find(B=>B.id===y.category)},T=He(w),A=(M=L.units[T])!=null?M:T,F={site:n,catalog:a,market:w,markets:d,lang:S,t:L,L:R,url:i,abs:l,channels:z,money:E,conv:N,items:D,productPath:c,template:t,name:W,cat:U,gform:u,units:T,u:A,dim:y=>`${re(Q(y,T),S)} ${A}`,dims:y=>(y==null?void 0:y.length)===3?`${re(Q(y[0],T),S)} \xD7 ${re(Q(y[1],T),S)} \xD7 ${re(Q(y[2],T),S)} ${A}`:""};h.push({path:`${w.id}/index.html`,html:ze(F,{kind:"home"})});for(let y of D)h.push({path:`${c(y,w)}index.html`,html:ze(F,{kind:"product",product:y})})}return h.push({path:"index.html",html:De({site:n,markets:d,url:i,abs:l})}),h}function ze(n,a){var T,A,V,_,F,y,P,B;let{site:o,market:t,markets:r,lang:s,t:i,L:l,url:d,abs:c,catalog:p,productPath:u,channels:h}=n,g=a.kind==="home",f=a.product,v=g?`${t.id}/`:u(f,t),x=g?`${o.name} \xB7 ${l(o.tagline)}`:`${l(f.name)} \xB7 ${o.name}`,M=g?l(o.intro):`${l(f.description)} ${n.money(f.from)}.`,w=r.map(b=>{var q;return g?{m:b,href:`${b.id}/`}:Pe({products:[((q=p.products)!=null?q:[]).find(I=>I.id===f.id)]},b).length?{m:b,href:u(f,b)}:null}).filter(Boolean),S=b=>{var q,I;return(I=(q=w.find(X=>X.m.id===b.id))==null?void 0:q.href)!=null?I:`${b.id}/`},L=(T=r.find(b=>b.default))!=null?T:r[0],R=(A=o.theme)!=null?A:{},D=["primary","ink","bg","surface","soft","accent"].filter(b=>R[b]).map(b=>`--${b}:${R[b]}`).join(";"),z=r.map(b=>({id:b.id,lang:b.lang,country:b.country,currency:b.currency,href:d(S(b))})),E=h[0],N=(V=o.contact)!=null?V:{},W=o.heroImage||((_=n.items[0])==null?void 0:_.image),U=c(Z(g?W:f.image));return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(x)}</title>
<meta name="description" content="${e(M)}">
<link rel="canonical" href="${c(v)}">
${w.map(({m:b,href:q})=>`<link rel="alternate" hreflang="${e(b.lang)}-${e(b.country)}" href="${c(q)}">`).join(`
`)}
${w.some(b=>b.m.id===L.id)?`<link rel="alternate" hreflang="x-default" href="${c(S(L))}">`:""}
<meta property="og:type" content="${g?"website":"product"}">
<meta property="og:title" content="${e(x)}">
<meta property="og:description" content="${e(M)}">
<meta property="og:url" content="${c(v)}">
<meta property="og:image" content="${e(U)}">
<meta property="og:site_name" content="${e(o.name)}">
<meta name="theme-color" content="${e((F=R.bg)!=null?F:"#F2EEE7")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ge}">
<link rel="stylesheet" href="${d("assets/style.css")}">
<style>:root{${D}}</style>
${g?Y(pa(n))+(((y=o.faq)!=null?y:[]).length?Y(ha(n)):""):Y(ua(n,f))+Y(ma(n,f))}
<script src="${d("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(z))}' data-copied="${e(i.copied)}" data-wa="${e(G((P=N.whatsapp)!=null?P:""))}" data-email="${e((B=N.email)!=null?B:"")}" data-units="${e(n.units)}" data-lang="${e(s)}">
<a class="skip" href="#main">${e(i.skip)}</a>
${ve(i)}
${l(o.announcement)?`<p class="announce">${e(l(o.announcement))}</p>`:""}
${Je(n,g)}
<main id="main">
${g?[Ze,Ye,Qe,ea,aa,ta,na,oa,ra,sa,ia].map(b=>b(n)).join(`
`):la(n,f)}
</main>
${da(n)}
<nav class="dock" aria-label="${e(i.nav.order)}">
  <a href="${g?"":d(`${t.id}/`)}#shop">${$("search",20)}<span>${e(i.nav.shop)}</span></a>
  <a class="primary" href="${e(g?H(E,N):"#order")}" ${g?oe(E):""}>${$(g?E:"bag",20)}<span>${e(g?i.nav.order:i.nav.buy)}</span></a>
</nav>
</body>
</html>
`}function Je({site:n,market:a,markets:o,t,L:r,url:s},i){var p;let l=i?"":s(`${a.id}/`),d=[[`${l}#cats`,t.nav.cats],[`${l}#rooms`,t.nav.rooms],[`${l}#shop`,t.nav.shop],[`${l}#fit`,t.nav.fit],[`${l}#delivery`,t.nav.delivery],[`${l}#visit`,t.nav.contact]],c=(p=n.contact)!=null?p:{};return`<header class="header">
  <div class="wrap mast">
    <a class="brand" href="${s(`${a.id}/`)}">
      ${n.logo?`<img src="${e(C(s,n.logo))}" alt="" width="44" height="44">`:""}
      <span>${e(n.name)}</span>
    </a>
    ${r(n.issue)?`<p class="issue">${e(r(n.issue))}</p>`:""}
  </div>
  <div class="navbar">
    <div class="wrap bar">
      <nav class="nav" aria-label="Menu">${d.map(([u,h],g)=>`<a href="${u}"><span class="n">${String(g+1).padStart(2,"0")}</span>${e(h)}</a>`).join("")}</nav>
      <div class="bar-end">
        ${o.length>1?`<details class="market">
          <summary aria-label="${e(t.market.label)}">${$("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(fe(a))}</span></span></summary>
          <ul>${o.map(u=>`<li><a href="${s(`${u.id}/`)}" hreflang="${e(u.lang)}"${u.id===a.id?' aria-current="true"':""}>${e(u.country)} \xB7 ${e(u.currency)}</a></li>`).join("")}</ul>
        </details>`:""}
        ${c.phone?`<a class="btn btn--primary btn--sm hide-sm" href="tel:${G(c.phone)}">${$("phone",16)} ${e(c.phone)}</a>`:""}
        <details class="mnav">
          <summary aria-label="${e(t.nav.openMenu)}">${$("menu",22)}</summary>
          <nav aria-label="Menu">${d.map(([u,h])=>`<a href="${u}">${e(h)}</a>`).join("")}</nav>
        </details>
      </div>
    </div>
  </div>
</header>`}function Ze({site:n,t:a,L:o,url:t,items:r}){var d,c;let s=n.heroImage||((d=r[0])==null?void 0:d.image),i=n.heroImage2||((c=r[1])==null?void 0:c.image),l=[["#rooms",a.nav.rooms],["#shop",a.nav.shop],["#fit",a.nav.fit],["#swatches",a.nav.swatches]];return`<section class="spread">
  <div class="wrap spread-grid">
    <figure class="spread-main">${s?`<img src="${e(C(t,s))}" alt="" width="1000" height="1250" fetchpriority="high">`:""}${o(n.heroCaption)?`<figcaption>${e(o(n.heroCaption))}</figcaption>`:""}</figure>
    <div class="spread-copy">
      ${o(n.heroKicker)?`<p class="kicker">${e(o(n.heroKicker))}</p>`:""}
      <h1>${e(o(n.tagline))}</h1>
      <p class="lead">${e(o(n.intro))}</p>
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#shop">${e(a.hero.shop)} ${$("arrow",18)}</a>
        <a class="btn btn--line btn--lg" href="#fit">${$("ruler",18)} ${e(a.hero.fit)}</a>
      </div>
      <div class="spread-foot">
        ${i?`<img sizes="${O.card}" src="${e(C(t,i))}" alt="" width="600" height="600" loading="lazy">`:""}
        <nav class="toc" aria-label="${e(a.hero.toc)}"><p class="toc-h">${e(a.hero.toc)}</p><ol>${l.map(([p,u],h)=>`<li><a href="${p}"><span>${String(h+1).padStart(2,"0")}</span>${e(u)}</a></li>`).join("")}</ol></nav>
      </div>
    </div>
  </div>
</section>`}function Ye({catalog:n,items:a,t:o,L:t,url:r}){var l,d;let s=((l=n.categories)!=null?l:[]).map(c=>({...c,n:a.filter(p=>p.category===c.id).length})).filter(c=>c.n),i=((d=n.rooms)!=null?d:[]).map(c=>({...c,n:a.filter(p=>{var u;return(u=p.rooms)==null?void 0:u.includes(c.id)}).length})).filter(c=>c.n);return s.length?`<section class="section" id="cats" aria-labelledby="cats-title">
  <div class="wrap">
    <div class="sec-head"><p class="sec-n">01</p><h2 id="cats-title" class="h2">${e(o.cats.title)}</h2>
      ${i.length?`<ul class="for">${i.map(c=>`<li><a class="pill" href="?room=${e(c.id)}#shop" data-filter-link="room" data-value="${e(c.id)}">${e(t(c.name))}</a></li>`).join("")}</ul>`:""}
    </div>
    <ul class="cats">${s.map((c,p)=>{var h,g,f;let u=(g=c.image)!=null?g:(h=a.find(v=>v.category===c.id))==null?void 0:h.image;return`<li><a href="?type=${e(c.id)}#shop" data-filter-link="type" data-value="${e(c.id)}">
      <span class="cat-img">${u?`<img sizes="${O.card}" src="${e(C(r,u))}" alt="" width="800" height="1000" loading="lazy">`:""}</span>
      <span class="cat-n">${String(p+1).padStart(2,"0")}</span><span class="cat-name">${e(t(c.name))}</span><span class="cat-c">${e((c.n===1&&(f=o.cats.one)!=null?f:o.cats.count).replace("{n}",c.n))}</span>
    </a></li>`}).join("")}</ul>
  </div>
</section>`:""}function Qe(n){var p,u;let{catalog:a,items:o,t,L:r,url:s,site:i,money:l}=n,d=(p=i.bundle)!=null?p:{},c=((u=a.sets)!=null?u:[]).map(h=>({...h,ps:o.filter(g=>{var f;return(f=g.sets)==null?void 0:f.includes(h.id)})})).filter(h=>r(h.name)&&h.ps.length);return c.length?`<section class="section section--soft" id="rooms" aria-labelledby="rooms-title">
  <div class="wrap">
    <div class="sec-head"><p class="sec-n">02</p><h2 id="rooms-title" class="h2">${e(t.rooms.title)}</h2>
      <p class="muted">${e(d.pct&&d.min?t.rooms.bundle.replace("{n}",d.min).replace("{pct}",d.pct):t.rooms.text)}</p></div>
    ${c.map((h,g)=>{let f=h.ps.reduce((x,M)=>x+M.from,0),v=d.pct&&d.min&&h.ps.length>=d.min;return`<article class="edit${g%2?" edit--flip":""}">
      <figure class="edit-ph">${h.image?`<img sizes="${O.wide}" src="${e(C(s,h.image))}" alt="" width="1000" height="1200" loading="lazy">`:""}<span class="edit-no">${String(g+1).padStart(2,"0")}</span></figure>
      <div class="edit-body">
        <p class="kicker">${e(t.rooms.kicker)}</p>
        <h3>${e(r(h.name))}</h3>
        ${r(h.text)?`<p class="edit-text">${e(r(h.text))}</p>`:""}
        <ul class="mini">${h.ps.slice(0,4).map(x=>Xe(n,x)).join("")}</ul>
        <p class="set-total">${e(t.rooms.total.replace("{n}",h.ps.length))} <s data-was>${v?e(l(f)):""}</s> <b>${e(l(v?Math.round(f*(100-d.pct)/100):f))}</b>${v?` <span class="tag tag--inline">-${e(d.pct)}%</span>`:""}</p>
        <a class="link" href="?set=${e(h.id)}#shop" data-filter-link="set" data-value="${e(h.id)}">${e(t.rooms.all)} ${$("arrow",16)}</a>
      </div>
    </article>`}).join("")}
  </div>
</section>`:""}function Xe({L:n,url:a,money:o,productPath:t,market:r},s){return`<li><a href="${a(t(s,r))}"><img sizes="${O.thumb}" src="${e(C(a,s.image))}" alt="" width="400" height="400" loading="lazy"><span>${e(n(s.name))}</span><b>${e(o(s.from))}</b></a></li>`}var je=(n,a)=>a.leadWeeks?n.lead.made.replace("{n}",a.leadWeeks):n.lead.stock;function Ce(n,a,o=0){var v,x,M,w,S,L,R,D,z,E;let{t,L:r,url:s,money:i,productPath:l,market:d,catalog:c,name:p,cat:u,dims:h}=n,g=[r(a.name),(v=a.name)==null?void 0:v.en,r((x=u(a))==null?void 0:x.name),...((M=a.rooms)!=null?M:[]).map(N=>p(c.rooms,N)),...((w=a.sets)!=null?w:[]).map(N=>p(c.sets,N)),...((S=a.colors)!=null?S:[]).map(N=>r(N.name)),r(a.material)].filter(Boolean).join(" "),f=(L=a.images)==null?void 0:L[0];return`<li class="card${o>=Ne?" is-more":""}" data-type="${e(a.category)}" data-room="${e(((R=a.rooms)!=null?R:[]).join(" "))}" data-set="${e(((D=a.sets)!=null?D:[]).join(" "))}" data-stock="${a.leadWeeks?"made":"stock"}" data-price="${a.from}" data-name="${e(Ue(g))}">
  <a class="card-link" href="${s(l(a,d))}">
    <div class="card-img${f?" has-alt":""}">
      <img sizes="${O.card}" src="${e(C(s,a.image))}" alt="${e(r(a.name))}" width="1000" height="1000" loading="lazy">
      ${f?`<img sizes="${O.card}" class="alt" src="${e(C(s,f))}" alt="" width="1000" height="1000" loading="lazy">`:""}
      ${a.was?`<span class="tag tag--sale">-${Math.round((1-a.from/a.was)*100)}%</span>`:r(a.badge)?`<span class="tag">${e(r(a.badge))}</span>`:""}
    </div>
    <p class="card-cat">${e(r((z=u(a))==null?void 0:z.name))}</p>
    <h3>${e(r(a.name))}</h3>
    <p class="card-dims">${e(h(a.variants[0].dims))}</p>
    <p class="card-price"><b>${e((a.variants.length>1?t.shop.from:"{price}").replace("{price}",i(a.from)))}</b>${a.was?` <s>${e(i(a.was))}</s>`:""}</p>
    <p class="card-lead${a.leadWeeks?"":" is-stock"}">${e(je(t,a))}</p>
    ${((E=a.colors)==null?void 0:E.length)>1?`<p class="dots" aria-hidden="true">${a.colors.map(N=>`<i style="background:${e(N.hex)}"></i>`).join("")}</p>`:""}
  </a>
</li>`}function ea(n){var h,g,f;let{items:a,catalog:o,t,L:r,money:s}=n,i=((h=o.categories)!=null?h:[]).filter(v=>a.some(x=>x.category===v.id)),l=((g=o.rooms)!=null?g:[]).filter(v=>a.some(x=>{var M;return(M=x.rooms)==null?void 0:M.includes(v.id)})),d=((f=o.sets)!=null?f:[]).filter(v=>a.some(x=>{var M;return(M=x.sets)==null?void 0:M.includes(v.id)})),c=a.length>4?Ke(a):[],p=([v,x])=>v?x===1/0?t.shop.over.replace("{a}",s(v)):`${s(v)} \u2013 ${s(x)}`:t.shop.under.replace("{b}",s(x)),u=(v,x,M,w)=>`<label class="select"><span class="sr">${e(x)}</span><select ${v}><option value="">${e(M)}</option>${w}</select></label>`;return`<section class="section" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="sec-head"><p class="sec-n">03</p><h2 id="shop-title" class="h2">${e(t.shop.title)}</h2>
      <p class="muted" data-count="${e(t.shop.count)}">${e(t.shop.count.replace("{n}",a.length))}</p>
    </div>
    <div class="toolbar" data-toolbar>
      <div class="chips" role="group" aria-label="${e(t.shop.all)}">
        <button type="button" class="pill is-on" data-type="">${e(t.shop.all)}</button>
        ${i.map(v=>`<button type="button" class="pill" data-type="${e(v.id)}">${e(r(v.name))}</button>`).join("")}
      </div>
      <div class="filters">
        <label class="search">${$("search",18)}<input type="search" placeholder="${e(t.search)}" aria-label="${e(t.search)}" data-search></label>
        ${l.length?u("data-room",t.shop.room,t.shop.anyRoom,l.map(v=>`<option value="${e(v.id)}">${e(r(v.name))}</option>`).join("")):""}
        ${d.length?u("data-set",t.shop.set,t.shop.anySet,d.map(v=>`<option value="${e(v.id)}">${e(r(v.name))}</option>`).join("")):""}
        ${c.length?u("data-band",t.shop.price,t.shop.anyPrice,c.map(v=>`<option value="${v[0]}-${v[1]===1/0?"":v[1]}">${e(p(v))}</option>`).join("")):""}
        <label class="select"><span class="sr">${e(t.shop.sort)}</span><select data-sort>
          <option value="">${e(t.shop.sortPop)}</option><option value="asc">${e(t.shop.sortLow)}</option><option value="desc">${e(t.shop.sortHigh)}</option>
        </select></label>
        <label class="check"><input type="checkbox" data-stockonly> <span>${e(t.shop.stockOnly)}</span></label>
      </div>
    </div>
    <ul class="grid" data-grid>${We(a).map((v,x)=>Ce(n,v,x)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${e(t.shop.empty)}</p>
    ${a.length>Ne?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(t.shop.more)}</button></div>`:""}
  </div>
</section>`}function aa(n){let{items:a,t:o,L:t,site:r,units:s,u:i,dims:l}=n,d=a.filter(h=>h.variants.some(g=>{var f;return((f=g.dims)==null?void 0:f.length)===3}));if(!d.length)return"";let c=o.fit,p=s==="in"?["96","40","32","80"]:["240","100","80","200"],u=s==="in"?2:5;return`<section class="section section--ink" id="fit" aria-labelledby="fit-title">
  <div class="wrap">
    <div class="sec-head"><p class="sec-n">04</p><h2 id="fit-title" class="h2">${e(c.title)}</h2><p class="lead">${e(t(r.fitIntro)||c.text)}</p></div>
    <div class="finder">
      <ol class="how">${c.steps.map((h,g)=>`<li><span>${g+1}</span>${e(h)}</li>`).join("")}</ol>
      <form class="finder-form" data-fit data-gap="${u}" data-units="${e(s)}" data-u="${e(i)}" data-ok="${e(c.ok)}" data-tight="${e(c.tight)}" data-no="${e(c.no)}" data-door-ok="${e(c.doorOk)}" data-door-no="${e(c.doorNo)}" data-need="${e(c.need)}" novalidate>
        <label class="wide"><span>${e(c.piece)}</span><select name="piece">${d.map(h=>h.variants.filter(g=>{var f;return((f=g.dims)==null?void 0:f.length)===3}).map(g=>`<option value="${e(h.id)}" data-dims="${e(g.dims.join(","))}">${e(t(h.name))}${h.variants.length>1?` \u2013 ${e(t(g.label))}`:""} (${e(l(g.dims))})</option>`).join("")).join("")}</select></label>
        <fieldset><legend>${e(c.space)}</legend>
          <label><span>${e(c.width)}</span><input type="number" name="sw" min="1" step="0.5" inputmode="decimal" placeholder="${p[0]}"><b>${e(i)}</b></label>
          <label><span>${e(c.depth)}</span><input type="number" name="sd" min="1" step="0.5" inputmode="decimal" placeholder="${p[1]}"><b>${e(i)}</b></label>
        </fieldset>
        <fieldset><legend>${e(c.door)}</legend>
          <label><span>${e(c.width)}</span><input type="number" name="dw" min="1" step="0.5" inputmode="decimal" placeholder="${p[2]}"><b>${e(i)}</b></label>
          <label><span>${e(c.height)}</span><input type="number" name="dh" min="1" step="0.5" inputmode="decimal" placeholder="${p[3]}"><b>${e(i)}</b></label>
        </fieldset>
        <output class="result" data-result aria-live="polite">${e(c.hint)}</output>
      </form>
    </div>
    <p class="muted small fit-note">${e(c.note.replace("{gap}",`${u} ${i}`))}</p>
  </div>
</section>`}function ta(n){var c,p;let{site:a,t:o,L:t,money:r,conv:s}=n,i=(c=a.delivery)!=null?c:{},l=((p=i.options)!=null?p:[]).filter(u=>t(u.name));if(!l.length)return"";let d=s(i.freeOver);return`<section class="section" id="delivery" aria-labelledby="del-title">
  <div class="wrap">
    <div class="sec-head"><p class="sec-n">05</p><h2 id="del-title" class="h2">${e(o.delivery.title)}</h2><p class="muted">${e(t(i.intro)||o.delivery.text)}</p></div>
    <ul class="ways">${l.map((u,h)=>`<li class="way">
      <p class="way-n">${String(h+1).padStart(2,"0")}</p>
      <h3>${e(t(u.name))}</h3>
      <p class="way-price">${u.price?e(r(s(u.price))):e(o.delivery.free)}${u.price&&d&&u.freeOver!==!1?`<small>${e(o.delivery.freeOver.replace("{price}",r(d)))}</small>`:""}</p>
      ${t(u.text)?`<p>${e(t(u.text))}</p>`:""}
    </li>`).join("")}</ul>
    <dl class="extras">
      ${i.assembly?`<div><dt>${$("check",18)} ${e(o.delivery.assembly)}</dt><dd>${e(o.delivery.perItem.replace("{price}",r(s(i.assembly))))}</dd></div>`:""}
      ${i.haulAway?`<div><dt>${$("refresh",18)} ${e(o.delivery.haul)}</dt><dd>${e(o.delivery.perItem.replace("{price}",r(s(i.haulAway))))}</dd></div>`:""}
      ${t(i.area)?`<div><dt>${$("pin",18)} ${e(o.delivery.area)}</dt><dd>${e(t(i.area))}</dd></div>`:""}
    </dl>
    ${t(a.taxNote)?`<p class="muted small">${e(t(a.taxNote))}</p>`:""}
  </div>
</section>`}function na(n){var p,u,h,g;let{site:a,t:o,L:t,url:r,channels:s}=n,i=((p=a.fabrics)!=null?p:[]).filter(f=>t(f.name));if(!i.length)return"";let l=(u=a.swatchMax)!=null?u:5,d=o.swatch,c=(h=s.find(f=>f==="email"||f==="whatsapp"))!=null?h:s[0];return`<section class="section section--soft" id="swatches" aria-labelledby="sw-title">
  <div class="wrap swatch-wrap">
    <div class="sec-head"><p class="sec-n">06</p><h2 id="sw-title" class="h2">${e(d.title)}</h2><p class="muted">${e(d.text.replace("{n}",l))}</p></div>
    <form class="swatch-form" data-swatches data-max="${l}" data-channel="${e(c)}" data-href="${e(H(c,(g=a.contact)!=null?g:{},""))}" data-text="${e(d.message)}" data-left="${e(d.left)}" novalidate>
      <ul class="fabrics">${i.map(f=>{var v;return`<li><label class="fabric">
        <input type="checkbox" name="fabric" value="${e(t(f.name))}">
        <span class="fab-sw"${f.image?"":` style="background:${e((v=f.hex)!=null?v:"#ccc")}"`}>${f.image?`<img sizes="${O.thumb}" src="${e(C(r,f.image))}" alt="" width="300" height="300" loading="lazy">`:""}</span>
        <span class="fab-name">${e(t(f.name))}</span>${t(f.note)?`<small>${e(t(f.note))}</small>`:""}
      </label></li>`}).join("")}</ul>
      <p class="muted small" data-left-text>${e(d.left.replace("{n}",l))}</p>
      <div class="fields">
        <label><span>${e(o.product.name)} *</span><input name="name" autocomplete="name" required></label>
        <label class="wide"><span>${e(d.address)} *</span><input name="address" autocomplete="street-address" required></label>
      </div>
      <p class="form-err" data-err hidden>${e(d.required)}</p>
      <button type="submit" class="btn btn--primary btn--lg">${$(c,18)} ${e(d.send)}</button>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function oa({site:n,L:a}){var t;let o=((t=n.perks)!=null?t:[]).filter(r=>a(r==null?void 0:r.title));return o.length?`<section class="perks" aria-label="${e(n.name)}">
  <ul class="wrap perk-list">${o.map(r=>{var s;return`<li>${$((s=r.icon)!=null?s:"check",22)}<div><b>${e(a(r.title))}</b>${a(r.text)?`<span>${e(a(r.text))}</span>`:""}</div></li>`}).join("")}</ul>
</section>`:""}function ra({site:n,t:a,L:o,lang:t}){let r=be(n,a,t,"btn btn--line"),s=xe(n);return n.showReviews===!1||!s.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2></div>
    ${we(s,t,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(l,d)=>`<span class="${d<i.rating?"on":""}">${$("star",15)}</span>`).join("")}</p>
      <blockquote>${e(o(i.text))}</blockquote>
      <figcaption>${e(i.name)}${o(i.bought)?`<small>${e(o(i.bought))}</small>`:""}${ke(i,t)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function sa({site:n,t:a,L:o}){var r;let t=((r=n.faq)!=null?r:[]).filter(s=>o(s==null?void 0:s.q));return t.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div>${t.map((s,i)=>`<details${i===0?" open":""}><summary>${e(o(s.q))}</summary><p>${e(o(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function ia({site:n,t:a,L:o,channels:t}){var l,d,c;let r=(l=n.contact)!=null?l:{},s=encodeURIComponent((d=r.mapQuery)!=null?d:o(r.address)),i=p=>p.length===7?a.visit.everyDay:me(p,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${o(n.showroomNote)?`<p class="lead">${e(o(n.showroomNote))}</p>`:""}
      ${$e(n,a)}
      ${((c=n.hours)!=null?c:[]).length?`<table class="hours"><tbody>${n.hours.map(p=>`<tr><th scope="row">${e(i(p.days))}</th><td>${e(p.open)} \u2013 ${e(p.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${o(r.address)?`<p class="addr">${$("pin",18)} ${e(o(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(a.visit.directions)} ${$("arrow",16)}</a>
        ${t.map(p=>{var u;return`<a class="btn btn--line" href="${e(H(p,r))}" ${oe(p)}>${$(p,18)} ${e((u=a.via[p])!=null?u:p)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function la(n,a){var F,y,P,B,b,q,I,X,se,ie;let{site:o,t,L:r,url:s,money:i,conv:l,market:d,items:c,channels:p,cat:u,gform:h,units:g,u:f,dims:v,catalog:x}=n,M=u(a),w=[...c.filter(m=>{var k;return m.id!==a.id&&((k=m.sets)==null?void 0:k.some(j=>{var K;return(K=a.sets)==null?void 0:K.includes(j)}))}),...c.filter(m=>m.id!==a.id&&m.category===a.category)].filter((m,k,j)=>j.indexOf(m)===k).slice(0,8),S=s(`${d.id}/`),L=t.orderText.replace("{product}",r(a.name)).replace(/\{\w+\}/g,"\u2026"),R=m=>typeof m=="object"?r(m):String(m),D=a.variants[0],z=(F=o.delivery)!=null?F:{},E=((y=z.options)!=null?y:[]).filter(m=>r(m.name)),N=l(z.freeOver),W=h?` data-gform="${e(h.action)}" data-gmap='${e(JSON.stringify(h.fields))}'`:"",U=m=>p.map((k,j)=>{var K,le;return`<button type="submit" class="btn ${m!=null?m:j?"btn--line":"btn--primary"} btn--lg" data-channel="${e(k)}" data-href="${e(H(k,(K=o.contact)!=null?K:{},L))}">${$(k,18)} ${e(k==="phone"?t.product.call:t.product.send.replace("{channel}",(le=t.via[k])!=null?le:k))}</button>`}).join(""),T=[...r(a.material)?[["material",a.material]]:[],...(P=a.specs)!=null?P:[]],A=((B=x.sets)!=null?B:[]).find(m=>{var k;return(k=a.sets)==null?void 0:k.includes(m.id)}),V=(b=o.bundle)!=null?b:{},_=g==="in"?2:5;return`<div class="wrap crumbs"><a href="${S}">${e(t.nav.home)}</a>${$("chevron",14)}<a href="${S}?type=${e(a.category)}#shop">${e(r(M==null?void 0:M.name))}</a>${$("chevron",14)}<span aria-current="page">${e(r(a.name))}</span></div>
<section class="wrap pdp" data-product data-id="${e(a.id)}" data-name="${e(r(a.name))}" data-text="${e(t.orderText)}" data-market="${e(`${d.id.toUpperCase()} \xB7 ${d.currency}`)}" data-cur="${e(d.currency)}" data-locale="${e(d.lang)}" data-free="${N}" data-assembly="${a.assembly===!1?0:l(z.assembly)}" data-haul="${l(z.haulAway)}">
  ${ca(n,a)}
  <div class="pdp-info">
    <p class="kicker">${e(r(M==null?void 0:M.name))}${((q=a.rooms)!=null?q:[]).length?` \xB7 ${e(((I=a.rooms)!=null?I:[]).map(m=>n.name(x.rooms,m)).join(", "))}`:""}</p>
    <h1 class="pdp-title">${e(r(a.name))}</h1>
    <p class="pdp-price"><strong data-price-text>${e(i(D.price))}</strong>${a.was?` <s>${e(i(a.was))}</s> <span class="tag tag--sale tag--inline">-${Math.round((1-a.from/a.was)*100)}%</span>`:""}</p>
    <p class="lead-time${a.leadWeeks?"":" is-stock"}">${$("truck",18)} ${e(je(t,a))}</p>
    <p class="lead">${e(r(a.description))}</p>
    ${a.variants.length>1?`<fieldset class="opts"><legend>${e(t.product.size)}: <span data-v="size">${e(r(D.label))}</span></legend><div class="sizes">
      ${a.variants.map((m,k)=>{var j;return`<label class="sz"><input type="radio" name="size" value="${e(r(m.label))}" data-price="${m.price}" data-label="${e(i(m.price))}" data-dims="${e(((j=m.dims)!=null?j:[]).join(","))}" data-dims-text="${e(v(m.dims))}"${k?"":" checked"}><span>${e(r(m.label))}<small>${e(i(m.price))}</small></span></label>`}).join("")}
    </div></fieldset>`:`<input type="hidden" name="size" value="" data-price="${D.price}" data-dims="${e(((X=D.dims)!=null?X:[]).join(","))}">`}
    ${(se=a.colors)!=null&&se.length?`<fieldset class="opts"><legend>${e(t.product.color)}: <span data-v="color">${e(r(a.colors[0].name))}</span></legend><div class="swatches">
      ${a.colors.map((m,k)=>`<label class="sw" title="${e(r(m.name))}"><input type="radio" name="color" value="${e(r(m.name))}"${k?"":" checked"}><span style="background:${e(m.hex)}"></span><b class="sr">${e(r(m.name))}</b></label>`).join("")}
    </div></fieldset>`:""}
    ${((ie=D.dims)==null?void 0:ie.length)===3?`<div class="dimbox">
      <p class="dim-row">${$("ruler",18)} <b>${e(t.product.dims)}</b> <span data-dims-text>${e(v(D.dims))}</span></p>
      <p class="muted small">${e(t.product.dimsKey)}</p>
      <details class="doorcheck" data-door data-gap="${_}" data-units="${e(g)}" data-ok="${e(t.fit.doorOk)}" data-no="${e(t.fit.doorNo)}"><summary>${e(t.product.doorQ)}</summary>
        <div class="door-fields"><label><span>${e(t.fit.width)}</span><input type="number" name="dw" min="1" step="0.5" inputmode="decimal"><b>${e(f)}</b></label>
        <label><span>${e(t.fit.height)}</span><input type="number" name="dh" min="1" step="0.5" inputmode="decimal"><b>${e(f)}</b></label></div>
        <output class="result" data-door-result aria-live="polite"></output>
      </details>
    </div>`:""}
    ${A&&V.pct?`<p class="bundle-note">${$("heart",16)} ${e(t.product.bundle.replace("{set}",r(A.name)).replace("{n}",V.min).replace("{pct}",V.pct))} <a class="link" href="${S}?set=${e(A.id)}#shop">${e(t.rooms.all)}</a></p>`:""}
    <form class="order" id="order" data-compose${W} novalidate>
      <h2 class="h4">${$("bag",20)} ${e(t.product.orderTitle)}</h2>
      <div class="order-fields">
        ${E.length?`<fieldset class="ship"><legend>${e(t.delivery.how)}</legend>${E.map((m,k)=>`<label class="ship-opt"><input type="radio" name="ship" value="${e(r(m.name))}" data-cost="${l(m.price)}" data-free="${m.freeOver===!1?0:1}"${k?"":" checked"}><span>${e(r(m.name))}<small>${m.price?e(i(l(m.price))):e(t.delivery.free)}</small></span></label>`).join("")}
          ${a.assembly!==!1&&z.assembly?`<label class="check"><input type="checkbox" name="assembly" value="1"> <span>${e(t.delivery.assembly)} (+${e(i(l(z.assembly)))} / ${e(t.delivery.item)})</span></label>`:""}
          ${z.haulAway?`<label class="check"><input type="checkbox" name="haul" value="1"> <span>${e(t.delivery.haul)} (+${e(i(l(z.haulAway)))} / ${e(t.delivery.item)})</span></label>`:""}
        </fieldset>`:""}
        <div class="fields">
          <label><span>${e(t.product.name)} *</span><input name="name" autocomplete="name" required></label>
          <label><span>${e(t.product.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required></label>
          <label><span>${e(t.product.qty)}</span><input name="qty" type="number" min="1" max="20" value="1" inputmode="numeric"></label>
          <label><span>${e(t.product.address)}</span><input name="address" autocomplete="street-address"></label>
          <label class="wide"><span>${e(t.product.note)}</span><textarea name="note" rows="2" placeholder="${e(t.product.noteHint)}"></textarea></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <dl class="est" data-est data-free-text="${e(t.delivery.free)}">
          <div><dt>${e(t.est.items)}</dt><dd data-e="items">${e(i(D.price))}</dd></div>
          <div><dt>${e(t.est.delivery)}</dt><dd data-e="ship">\u2013</dd></div>
          <div data-e-row="extra" hidden><dt>${e(t.est.extras)}</dt><dd data-e="extra"></dd></div>
          <div class="est-total"><dt>${e(t.est.total)}</dt><dd data-e="total">${e(i(D.price))}</dd></div>
        </dl>
        ${r(o.taxNote)?`<p class="muted small">${e(r(o.taxNote))}</p>`:""}
        <p class="form-err" data-err hidden>${e(t.product.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--primary btn--lg btn--full" data-order-submit>${$("bag",18)} <span>${e(t.product.order)}</span></button></div>
        <p class="muted small">${$("check",16)} ${e(t.product.gformNote)}</p>
        <noscript><p>${p.map(m=>{var k,j;return`<a href="${e(H(m,(k=o.contact)!=null?k:{},L))}" ${oe(m)}>${e((j=t.via[m])!=null?j:m)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${h?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${$(h?"check":"arrow",22)} ${e(h?t.product.done:t.product.stepTitle)}</p>
        <p>${e(h?t.product.doneText:t.product.stepText)}</p>
        <div class="buy">${U(h?"btn--line":void 0)}</div>
        ${h?"":`<button type="button" class="link back" data-edit>${e(t.product.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
      <p class="muted small">${e(r(o.returns)||t.product.reply)}</p>
    </form>
    ${Me(d.lang)}
  </div>
</section>
${T.length||D.dims?`<section class="section section--tight"><div class="wrap specs">
  <h2 class="h3">${e(t.product.specs)}</h2>
  <table><tbody>${a.variants.filter(m=>{var k;return((k=m.dims)==null?void 0:k.length)===3}).map(m=>`<tr><th scope="row">${e(t.product.dims)}${a.variants.length>1?` \xB7 ${e(r(m.label))}`:""}</th><td>${e(v(m.dims))}</td></tr>`).join("")}
  ${T.map(([m,k])=>{var j;return`<tr><th scope="row">${e((j=t.specs[m])!=null?j:m)}</th><td>${e(R(k))}</td></tr>`}).join("")}</tbody></table>
</div></section>`:""}
${w.length?`<section class="section section--soft"><div class="wrap">
  <h2 class="h3">${e(A?t.product.completeRoom:t.product.related)}</h2>
  <ul class="grid grid--related">${w.map(m=>Ce(n,m)).join("")}</ul>
</div></section>`:""}`}function ca({t:n,L:a,url:o},t){var d;let r=[t.image,...(d=t.images)!=null?d:[]],s=n.gallery,i=a(t.name),l=a(t.badge)?`<span class="tag">${e(a(t.badge))}</span>`:"";return r.length===1?`<figure class="pdp-img"><img src="${e(C(o,t.image))}" alt="${e(i)}" width="1000" height="1000" fetchpriority="high">${l}</figure>`:`<figure class="pdp-img gallery" data-gallery>
    <div class="g-stage">
      <ul class="g-track" tabindex="0" aria-label="${e(s.label)}">${r.map((c,p)=>`<li id="g-${p+1}"><a href="${e(C(o,c))}" data-zoom="${p}" aria-label="${e(s.zoom)}: ${e(s.photo.replace("{i}",p+1).replace("{n}",r.length))}"><img sizes="${O.wide}" src="${e(C(o,c))}" alt="${e(p?`${i} \u2013 ${s.photo.replace("{i}",p+1).replace("{n}",r.length)}`:i)}" width="1000" height="1000"${p?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
      ${l}
      <button type="button" class="g-nav g-prev" data-step="-1" aria-label="${e(s.prev)}">${$("chevron",22)}</button>
      <button type="button" class="g-nav g-next" data-step="1" aria-label="${e(s.next)}">${$("chevron",22)}</button>
      <span class="g-count" aria-hidden="true"><b data-g-i>1</b> / ${r.length}</span>
    </div>
    <ul class="g-thumbs">${r.map((c,p)=>`<li><a href="#g-${p+1}" data-go="${p}"${p?"":' aria-current="true"'} aria-label="${e(s.photo.replace("{i}",p+1).replace("{n}",r.length))}"><img sizes="${O.thumb}" src="${e(C(o,c))}" alt="" width="1000" height="1000" loading="lazy"></a></li>`).join("")}</ul>
  </figure>
  <dialog class="lightbox" data-lightbox aria-label="${e(i)}">
    <img src="" alt="${e(i)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(s.close)}">\u2715</button>
    <button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(s.prev)}">${$("chevron",26)}</button>
    <button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(s.next)}">${$("chevron",26)}</button>
    <span class="g-count"><b data-lb-i>1</b> / ${r.length}</span>
  </dialog>`}function da({site:n,t:a,L:o,market:t}){var i,l;let r=(i=n.contact)!=null?i:{},s=Object.entries((l=n.social)!=null?l:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(o(n.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(a.footer.hotline)}: <a href="tel:${G(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${o(r.address)?`<li>${e(o(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${s.map(([d,c])=>`<li><a href="${e(c)}" target="_blank" rel="noopener">${e(d==="tiktok"?"TikTok":d==="youtube"?"YouTube":d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${Se(n,a,t.lang)}</div>
</footer>`}function pa({site:n,market:a,L:o,abs:t,items:r}){var i,l,d;let s=(i=n.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"FurnitureStore",name:n.name,url:t(`${a.id}/`),image:t(Z(n.heroImage||((l=r[0])==null?void 0:l.image))),description:o(n.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:o(s.address)},currenciesAccepted:a.currency,openingHoursSpecification:ge((d=n.hours)!=null?d:[])}}var ha=({site:n,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(o=>a(o==null?void 0:o.q)).map(o=>({"@type":"Question",name:a(o.q),acceptedAnswer:{"@type":"Answer",text:a(o.a)}}))});function ua({site:n,market:a,L:o,abs:t,productPath:r,cat:s,units:i},l){var p,u,h;let d=l.variants[0].dims,c=g=>({"@type":"QuantitativeValue",value:Q(g,i),unitCode:i==="in"?"INH":"CMT"});return{"@context":"https://schema.org","@type":"Product",name:o(l.name),description:o(l.description),image:[l.image,...(p=l.images)!=null?p:[]].map(g=>t(Z(g))),url:t(r(l,a)),category:o((u=s(l))==null?void 0:u.name),...o(l.material)?{material:o(l.material)}:{},...(h=l.colors)!=null&&h.length?{color:l.colors.map(g=>o(g.name)).join(", ")}:{},...(d==null?void 0:d.length)===3?{width:c(d[0]),depth:c(d[1]),height:c(d[2])}:{},offers:{"@type":"Offer",price:l.variants[0].price,priceCurrency:a.currency,availability:l.leadWeeks?"https://schema.org/PreOrder":"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:n.name}}}}function ma({market:n,L:a,abs:o,productPath:t,t:r,cat:s},i){var l;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:o(`${n.id}/`)},{"@type":"ListItem",position:2,name:a((l=s(i))==null?void 0:l.name),item:o(`${n.id}/?type=${i.category}`)},{"@type":"ListItem",position:3,name:a(i.name),item:o(t(i,n))}]}}export{Q as len,za as renderSite,He as unitsOf};
