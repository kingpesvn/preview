var he={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,a=>he[a]);function E(n,a,t="vi"){var r,s,i;return n==null?"":typeof n!="object"?String(n):(i=(s=(r=n[a])!=null?r:n[t])!=null?s:Object.values(n)[0])!=null?i:""}var ue={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},M=n=>{var a;return(a=ue[n])!=null?a:"en-US"};function me(n,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(n)-.01);let t=Number(a)||1;return Math.max(t,Math.round(n/t)*t)}function L(n,a){var r,s;if(a.default)return n.basePrice;let t=(s=(r=n.prices)==null?void 0:r[a.id])!=null?s:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:me(n.basePrice*a.rate,a.rounding)}var ge=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function J(n,a){let t={style:"currency",currency:a.currency};return ge.has(a.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(M(a.lang),t).format(n)}function Z(n="/"){let a=n.endsWith("/")?n:`${n}/`;return(t="")=>a+String(t).replace(/^\//,"")}var fe=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,z=(n,a)=>{let t=fe(a);return t==null?a:n(t)},D=(n="")=>String(n).replace(/\D/g,"");function O(n,a,t=""){switch(n){case"phone":return`tel:${D(a.phone)}`;case"zalo":return`https://zalo.me/${D(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${D(a.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var B=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,ve=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function Y(n){if(!n||typeof n!="string")return null;let a;try{a=new URL(n.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let t=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let r={};for(let[s,i]of a.searchParams){if(!/^entry\.\d+$/.test(s))continue;let l=i.trim().replace(/^\{|\}$/g,"").toLowerCase();ve.includes(l)&&(r[l]=s)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var C={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var be={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(n,a=20,t="")=>{var r;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(r=be[n])!=null?r:""}</svg>`},q=[1,2,3,4,5,6,0],ye=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function X(n,a){let t=n.map(s=>q.indexOf(s)).sort((s,i)=>s-i);return t.every((s,i)=>i===0||s===t[i-1]+1)&&t.length>2?`${a[q[t[0]]]} \u2013 ${a[q[t.at(-1)]]}`:t.map(s=>a[q[s]]).join(", ")}var ee=n=>n.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(t=>ye[t]),opens:a.open,closes:a.close}));function ae(n){var t,r;return(r=(t=new Intl.NumberFormat(M(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:t.value)!=null?r:n.currency}var te=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',ne=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,A=(n,a)=>{var t;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((t=n.timezone)!=null?t:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},Q={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},$e=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,xe=n=>{var a;try{let t=new URL(String((a=n.googleReview)!=null?a:"").trim());return t.protocol==="https:"&&$e.test(t.hostname)?t.href:""}catch{return""}},re=(n,a,t,r="btn btn--line")=>{var l;let s=xe(n);if(!s)return"";let i=typeof a.reviews=="object"&&((l=a.reviews)==null?void 0:l.google)||Q[t]||Q.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(s)}" target="_blank" rel="noopener">${u("star",16)} ${e(i)}</a></p>`},R={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},oe={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},se=n=>{var a;return((a=n.reviews)!=null?a:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function ie(n,a){var i,l,o;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=n==null?void 0:n.date)!=null?i:"").trim());if(!t)return"";let r=new Date(Date.UTC(+t[1],+t[2]-1,+((l=t[3])!=null?l:1)));if(Number.isNaN(r.getTime()))return"";let s=new Intl.DateTimeFormat((o=oe[a])!=null?o:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(n.date)}">${e(s)}</time>`}function ke(n,a){var l,o;let t=n.filter(c=>c.rating>=1&&c.rating<=5);if(t.length<2)return"";let r=t.reduce((c,p)=>c+Number(p.rating),0)/t.length,s=(l=R[a])!=null?l:R.en,i=new Intl.NumberFormat((o=oe[a])!=null?o:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(n.length)))}</span></p>`}function le(n,a,t,r){var l;if(!n.length)return"";let s=(l=R[a])!=null?l:R.en,i=o=>`<button type="button" class="rv-btn" data-rv-${o} aria-label="${e(o==="prev"?s.prev:s.next)}">${u("arrow",18,o==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ke(n,a)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${t} rv-track" tabindex="0">${n.map(r).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${we}`}var we=`<style>
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
upd()}})()<\/script>`;var ce=(n,a,t)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function pe({site:n,markets:a,url:t,abs:r}){var l;let s=(l=a.find(o=>o.default))!=null?l:a[0],i=a.map(o=>({id:o.id,lang:o.lang,country:o.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${r(`${s.id}/`)}">
${a.map(o=>`<link rel="alternate" hreflang="${e(o.lang)}-${e(o.country)}" href="${r(`${o.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(i)}, root = ${JSON.stringify(t(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(o=>`<a href="${t(`${o.id}/`)}">${e(o.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Me="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&family=Public+Sans:wght@400;500;600;700&display=swap",De=new Set(["VND","JPY","KRW","IDR","CLP","HUF","TWD"]),de=["apartment","house","townhouse","condo"],Se=10.7639,Ne=n=>{var a;return(a=n.area)!=null?a:n.country==="US"?"ft2":"m2"};function na({site:n,catalog:a,i18n:t,template:r,basePath:s="/",siteUrl:i=n.domain}){let l=Z(s),o=d=>new URL(l(d),i).href,c=a.markets,p=Y(n.orderForm),h=p&&!p.error?p:null,g=c.map(d=>{var I,G,H,U,W,_;let b=d.lang,$=(G=(I=t[b])!=null?I:t.en)!=null?G:t.vi,w=v=>E(v,b,"en"),m=(U=(H=n.orderChannels)==null?void 0:H[d.id])!=null?U:["phone"],x=v=>Number.isInteger(v)?new Intl.NumberFormat(M(b),{style:"currency",currency:d.currency,maximumFractionDigits:0}).format(v):J(v,d),k=v=>{var P;return v&&(P=L({basePrice:v},d))!=null?P:0},f=Ne(d),S=v=>v?`${new Intl.NumberFormat(M(b)).format(f==="m2"?Math.round(v/Se):v)} ${$.units[f]}`:"",N=((W=a.products)!=null?W:[]).map(v=>{var K;let P=((K=v.variants)!=null?K:[]).map(T=>({...T,price:L(T,d)})).filter(T=>T.price!=null);return P.length?{...v,variants:P}:null}).filter(Boolean),j=((_=n.listings)!=null?_:[]).filter(v=>(v==null?void 0:v.id)&&v.rent).map(v=>({...v,price:k(v.rent),dep:k(v.deposit)})),y={site:n,catalog:a,market:d,markets:c,lang:b,t:$,L:w,url:l,abs:o,channels:m,money:x,conv:k,size:S,area:f,plans:N,homes:j,template:r,gform:h};return{path:`${d.id}/index.html`,html:ze(y)}});return g.push({path:"index.html",html:pe({site:n,markets:c,url:l,abs:o})}),g}var F=(n,a)=>n.heroImage?z(a,n.heroImage):a("assets/photos/hero.webp");function ze(n){var m,x,k,f,S,N,j;let{site:a,market:t,markets:r,lang:s,t:i,L:l,url:o,abs:c}=n,p=`${a.name} \xB7 ${l(a.tagline)}`,h=(m=a.theme)!=null?m:{},g=["primary","ink","bg","surface","soft","accent"].filter(y=>h[y]).map(y=>`--${y}:${h[y]}`).join(";"),d=(x=r.find(y=>y.default))!=null?x:r[0],b=r.map(y=>({id:y.id,lang:y.lang,country:y.country,currency:y.currency,href:o(`${y.id}/`)})),$=(k=a.contact)!=null?k:{},w={locale:M(s),currency:t.currency,max:De.has(t.currency)?0:2};return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(p)}</title>
<meta name="description" content="${e(l(a.intro))}">
<link rel="canonical" href="${c(`${t.id}/`)}">
${r.map(y=>`<link rel="alternate" hreflang="${e(y.lang)}-${e(y.country)}" href="${c(`${y.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${d.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(p)}">
<meta property="og:description" content="${e(l(a.intro))}">
<meta property="og:url" content="${c(`${t.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(new URL(F(a,o),c("")).href)}">
<meta name="theme-color" content="${e((f=h.bg)!=null?f:"#F5F3EE")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Me}">
<link rel="stylesheet" href="${o("assets/style.css")}">
<style>:root{${g}}</style>
<noscript><style>.calc-js{display:none}</style></noscript>
${B(Ge(n))}
${((S=a.faq)!=null?S:[]).length?B(He(n)):""}
<script src="${o("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(b))}' data-wa="${e(D($.whatsapp))}" data-email="${e((N=$.email)!=null?N:"")}" data-copied="${e(i.copied)}" data-tz="${e((j=a.timezone)!=null?j:"America/New_York")}" data-locale="${e(M(s))}" data-money='${e(JSON.stringify(w))}'>
<a class="skip" href="#main">${e(i.skip)}</a>
${ne(i)}
${l(a.announcement)?`<p class="announce">${e(l(a.announcement))}</p>`:""}
${Pe(n)}
<main id="main">
${[je,qe,Re,Ee,Le,Oe,Be,Ae,Fe,Ve].map(y=>y(n)).join(`
`)}
</main>
${Ie(n)}
<nav class="dock" aria-label="${e(i.nav.rentals)}">
  <a href="#rentals">${u("search",20)}<span>${e(i.nav.rentals)}</span></a>
  <a class="primary" href="#owners">${u("key",20)}<span>${e(i.nav.owners)}</span></a>
</nav>
</body>
</html>
`}function Pe({site:n,market:a,markets:t,t:r,L:s,url:i}){let l=[["#rentals",r.nav.rentals],["#owners",r.nav.owners],["#calc",r.nav.fees],["#residents",r.nav.residents],["#visit",r.nav.contact]];return`<header class="header">
  <div class="wrap topline">
    <span class="dateline">${e(s(n.place))}</span>
    ${A(n,r)}
    ${t.length>1?`<details class="market">
      <summary aria-label="${e(r.market.label)}">${u("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(ae(a))}</span></span></summary>
      <ul>${t.map(o=>`<li><a href="${i(`${o.id}/`)}" hreflang="${e(o.lang)}"${o.id===a.id?' aria-current="true"':""}>${e(o.country)} \xB7 ${e(o.currency)}</a></li>`).join("")}</ul>
    </details>`:""}
  </div>
  <div class="wrap mast">
    <a class="brand" href="${i(`${a.id}/`)}">
      ${n.logo?`<img src="${e(z(i,n.logo))}" alt="" width="48" height="48">`:""}
      <span>${e(n.name)}</span>
    </a>
    ${n.since?`<span class="since">${e(r.since.replace("{year}",n.since))}</span>`:""}
  </div>
  <div class="navbar">
    <div class="wrap navrow">
      <nav class="nav" aria-label="Menu">${l.map(([o,c])=>`<a href="${o}">${e(c)}</a>`).join("")}</nav>
      <a class="btn btn--primary btn--sm" href="#estimate">${e(r.nav.estimate)}</a>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${[...l,["#estimate",r.nav.estimate]].map(([o,c])=>`<a href="${o}">${e(c)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function je({site:n,t:a,L:t,url:r,homes:s}){var l;let i=((l=n.stats)!=null?l:[]).filter(o=>t(o==null?void 0:o.label)&&t(o==null?void 0:o.value));return`<section class="cover">
  <div class="wrap cover-grid">
    <figure class="cover-ph">
      <img src="${e(F(n,r))}" alt="" width="1400" height="1000" fetchpriority="high">
      <figcaption class="cover-copy">
        <p class="kicker">${e(t(n.heroKicker)||a.hero.kicker)}</p>
        <h1>${e(t(n.tagline))}</h1>
        ${t(n.intro)?`<p class="lead">${e(t(n.intro))}</p>`:""}
        <p class="cover-cta"><a class="btn btn--primary" href="#rentals">${e(a.hero.rent)} ${u("arrow",16)}</a><a class="btn btn--ghost" href="#owners">${e(a.hero.own)}</a></p>
      </figcaption>
    </figure>
    <aside class="side">
      <div class="avail">
        <h2 class="side-h">${u("key",18)} ${e(a.side.available)}</h2>
        <p class="big" data-avail-now>${s.length}</p>
        <p class="muted small" data-avail-text data-tpl="${e(a.side.availText)}">${e(a.side.availText.replace("{n}",s.length))}</p>
        <a class="link" href="#rentals">${e(a.side.see)} ${u("arrow",14)}</a>
      </div>
      ${i.length?`<div class="stats">
        <h2 class="side-h">${u("flag",18)} ${e(a.side.stats)}</h2>
        <dl>${i.map(o=>`<div><dt>${e(t(o.label))}</dt><dd>${e(t(o.value))}</dd></div>`).join("")}</dl>
        ${t(n.statsNote)?`<p class="muted small">${e(t(n.statsNote))}</p>`:""}
      </div>`:""}
    </aside>
  </div>
</section>`}var Te={none:"",cats:"paw",dogs:"paw",both:"paw"};function Ce(n,a,t){var b,$,w,m,x;let{t:r,L:s,url:i,money:l,size:o,lang:c}=n,p=de.includes(a.type)?a.type:"apartment",h=a.available?new Intl.DateTimeFormat(M(c),{month:"short",day:"numeric"}).format(new Date(`${a.available}T12:00:00`)):"",g=[a.image,...(b=a.images)!=null?b:[]].filter(Boolean),d=(($=a.features)!=null?$:[]).map(s).filter(Boolean);return`<li class="home" data-type="${e(p)}" data-beds="${Number(a.beds)||0}" data-rent="${a.price}" data-pets="${e((w=a.pets)!=null?w:"none")}" data-date="${e((m=a.available)!=null?m:"")}" id="home-${e(a.id)}">
  <figure class="home-ph"${g.length>1?" data-strip":""}>
    <ul class="strip">${g.map((k,f)=>`<li><img sizes="${C.card}" src="${e(z(i,k))}" alt="${e(f?`${s(a.title)} \u2013 ${r.rentals.photo.replace("{i}",f+1).replace("{n}",g.length)}`:s(a.title))}" width="900" height="675" loading="${t<3&&!f?"eager":"lazy"}"></li>`).join("")}</ul>
    <span class="tag">${e(r.types[p])}</span>
    ${g.length>1?`<span class="pcount">${u("camera",14)} <b data-strip-i>1</b>/${g.length}</span>
    <button type="button" class="snav snav--prev" data-strip-step="-1" aria-label="${e(r.rentals.prev)}">${u("chevron",18)}</button>
    <button type="button" class="snav snav--next" data-strip-step="1" aria-label="${e(r.rentals.next)}">${u("chevron",18)}</button>`:""}
  </figure>
  <div class="home-body">
    <p class="home-rent"><b>${e(l(a.price))}</b><small>${e(r.rentals.perMonth)}</small></p>
    <h3>${e(s(a.title))}</h3>
    <p class="home-facts">${e(Number(a.beds)?r.rentals.beds.replace("{n}",a.beds):r.rentals.studio)} \xB7 ${e(r.rentals.baths.replace("{n}",(x=a.baths)!=null?x:1))}${a.sqft?` \xB7 ${e(o(a.sqft))}`:""}</p>
    ${s(a.area)?`<p class="home-area">${u("pin",14)} ${e(s(a.area))}</p>`:""}
    <p class="home-meta"><span class="when" data-when data-now="${e(r.rentals.now)}">${u("calendar",14)} ${e(h?r.rentals.from.replace("{date}",h):r.rentals.now)}</span>${a.pets&&a.pets!=="none"?`<span class="pets">${u(Te[a.pets]||"paw",14)} ${e(r.pets[a.pets])}</span>`:`<span class="pets is-no">${e(r.pets.none)}</span>`}</p>
    ${d.length?`<ul class="feats">${d.slice(0,4).map(k=>`<li>${e(k)}</li>`).join("")}</ul>`:""}
    ${a.dep?`<p class="muted small">${e(r.rentals.deposit.replace("{price}",l(a.dep)))}</p>`:""}
    <a class="btn btn--line btn--sm" href="#showing" data-show="${e(a.id)}">${u("calendar",16)} ${e(r.rentals.tour)}</a>
  </div>
</li>`}function qe(n){var g;let{site:a,t,L:r,money:s,homes:i}=n;if(!i.length)return"";let l=de.filter(d=>i.some(b=>{var $;return(($=b.type)!=null?$:"apartment")===d})),o=i.map(d=>d.price).sort((d,b)=>d-b),c=10**Math.floor(Math.log10(o[o.length-1]||1))/4,p=[...new Set([.34,.67,1].map(d=>Math.ceil(o[Math.min(o.length-1,Math.floor(d*(o.length-1)))]/c)*c))],h=((g=a.requirements)!=null?g:[]).map(r).filter(Boolean);return`<section class="section" id="rentals" aria-labelledby="rent-title">
  <div class="wrap">
    <div class="head"><p class="kicker">01 \xB7 ${e(t.rentals.kicker)}</p><h2 id="rent-title" class="h2">${e(t.rentals.title)}</h2>
      <p class="muted" data-count data-tpl="${e(t.rentals.count)}">${e(t.rentals.count.replace("{n}",i.length))}</p></div>
    <div class="filters" data-filters>
      <div class="chips" role="group" aria-label="${e(t.rentals.type)}">
        <button type="button" class="chip" aria-pressed="true" data-type="">${e(t.rentals.all)}</button>
        ${l.map(d=>`<button type="button" class="chip" aria-pressed="false" data-type="${e(d)}">${e(t.types[d])}</button>`).join("")}
      </div>
      <label class="field"><span>${e(t.rentals.bedsLabel)}</span><select data-beds><option value="0">${e(t.rentals.any)}</option>${[1,2,3].map(d=>`<option value="${d}">${e(t.rentals.bedsMin.replace("{n}",d))}</option>`).join("")}</select></label>
      <label class="field"><span>${e(t.rentals.max)}</span><select data-max><option value="">${e(t.rentals.any)}</option>${p.map(d=>`<option value="${d}">${e(t.rentals.upTo.replace("{price}",s(d)))}</option>`).join("")}</select></label>
      <label class="field"><span>${e(t.rentals.moveIn)}</span><input type="date" data-movein></label>
      <label class="check"><input type="checkbox" data-pets> <span>${e(t.rentals.petsOk)}</span></label>
    </div>
    <ul class="homes" data-homes>${i.map((d,b)=>Ce(n,d,b)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${e(t.rentals.empty)}</p>
    ${h.length?`<div class="reqs"><h3 class="h4">${u("check",18)} ${e(t.rentals.reqTitle)}</h3><ul>${h.map(d=>`<li>${e(d)}</li>`).join("")}</ul>
      ${a.applyUrl?`<a class="btn btn--primary" href="${e(a.applyUrl)}" target="_blank" rel="noopener">${e(t.rentals.apply)} ${u("arrow",16)}</a>`:""}</div>`:""}
  </div>
</section>`}function Re(n){var g;let{site:a,t,L:r,homes:s,channels:i,gform:l,money:o}=n;if(!s.length)return"";let c=t.showing,p=(g=a.contact)!=null?g:{},h=l?` data-gform="${e(l.action)}" data-gmap='${e(JSON.stringify(l.fields))}'`:"";return`<section class="section section--soft" id="showing" aria-labelledby="show-title">
  <div class="wrap office">
    <div class="office-copy">
      <p class="kicker">${e(c.kicker)}</p>
      <h2 id="show-title" class="h2">${e(c.title)}</h2>
      <p class="lead">${e(r(a.showingText)||c.text)}</p>
    </div>
    <form class="card order" data-form="showing" data-text="${e(c.message)}"${h} novalidate>
      <div class="order-fields">
        <label class="field"><span>${e(c.home)} *</span><select name="home" required>${s.map(d=>`<option value="${e(d.id)}" data-label="${e(`${r(d.title)} \xB7 ${o(d.price)}`)}">${e(r(d.title))} \xB7 ${e(o(d.price))}</option>`).join("")}</select></label>
        <div class="row2">
          <label class="field"><span>${e(c.day)}</span><input name="day" type="date"></label>
          <label class="field"><span>${e(c.time)}</span><select name="time">${c.times.map(d=>`<option>${e(d)}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(t.form.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(t.form.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(c.people)}</span><input name="people" type="number" min="1" max="10" value="1" inputmode="numeric"></label>
          <label class="field"><span>${e(c.pets)}</span><input name="pets" maxlength="80" placeholder="${e(c.petsHint)}"></label>
        </div>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(t.form.required)}</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">${u("calendar",18)} ${e(c.submit)}</button>
      </div>
      ${V(t,l,i,p)}
    </form>
  </div>
</section>`}var V=(n,a,t,r)=>`<div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${u(a?"check":"arrow",22)} ${e(a?n.form.done:n.form.stepTitle)}</p>
        <p>${e(a?n.form.doneText:n.form.stepText)}</p>
        ${a?"":`<div class="buy">${t.map((s,i)=>{var l;return`<button type="button" class="btn ${i===0?"btn--primary":"btn--line"}" data-channel="${e(s)}" data-href="${e(O(s,r,""))}">${u(s,18)} ${e((l=n.via[s])!=null?l:s)}</button>`}).join("")}</div><button type="button" class="link" data-edit>${e(n.form.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>`;function Ee(n){let{site:a,t,L:r,url:s,money:i,conv:l,plans:o}=n;if(!o.length)return"";let c=t.owners;return`<section class="section" id="owners" aria-labelledby="own-title">
  <div class="wrap">
    <div class="head"><p class="kicker">02 \xB7 ${e(c.kicker)}</p><h2 id="own-title" class="h2">${e(c.title)}</h2><p class="muted">${e(r(a.ownersText)||c.text)}</p></div>
    ${a.ownersImage?`<figure class="own-ph"><img sizes="${C.wide}" src="${e(z(s,a.ownersImage))}" alt="" width="1400" height="600" loading="lazy">${r(a.ownersQuote)?`<figcaption>${e(r(a.ownersQuote))}</figcaption>`:""}</figure>`:""}
    <ul class="plans">${o.map(p=>{var h;return`<li class="plan${p.featured?" is-top":""}">
      ${p.featured?`<span class="tag">${e(c.popular)}</span>`:""}
      <h3>${e(r(p.name))}</h3>
      <p class="plan-pct"><b>${e(String(p.pct))}%</b><small>${e(c.ofRent)}</small></p>
      <p class="muted small">${e(c.min.replace("{price}",i(p.variants[0].price)))}</p>
      ${r(p.description)?`<p>${e(r(p.description))}</p>`:""}
      <dl class="plan-fees">
        <div><dt>${e(c.lease)}</dt><dd>${p.leasePct?e(c.leaseVal.replace("{pct}",p.leasePct)):e(c.included)}</dd></div>
        <div><dt>${e(c.renewal)}</dt><dd>${p.renewal?e(i(l(p.renewal))):e(c.included)}</dd></div>
      </dl>
      ${((h=p.includes)!=null?h:[]).length?`<ul class="incl">${p.includes.map(g=>`<li>${u("check",16)} ${e(r(g))}</li>`).join("")}</ul>`:""}
      <a class="btn ${p.featured?"btn--primary":"btn--line"}" href="#calc" data-plan="${e(p.id)}">${e(c.try)}</a>
    </li>`}).join("")}</ul>
  </div>
</section>`}function Le(n){var w,m,x,k;let{site:a,t,L:r,plans:s,conv:i,money:l,gform:o,channels:c}=n;if(!s.length)return"";let p=t.calc,h=(w=a.calc)!=null?w:{},g=(m=a.contact)!=null?m:{},d=s.map(f=>({id:f.id,name:r(f.name),pct:Number(f.pct)||0,min:f.variants[0].price,lease:Number(f.leasePct)||0,renewal:i(f.renewal)})),b=i(h.rent||1500),$=o?` data-gform="${e(o.action)}" data-gmap='${e(JSON.stringify(o.fields))}'`:"";return`<section class="section section--ink" id="calc" aria-labelledby="calc-title">
  <div class="wrap calc-grid">
    <div>
      <div class="head"><p class="kicker">03 \xB7 ${e(p.kicker)}</p><h2 id="calc-title" class="h2">${e(p.title)}</h2><p class="lead">${e(p.text)}</p></div>
      <form class="calc-form calc-js" data-calc data-turnover="${Number((x=h.turnover)!=null?x:.4)}" data-tpl='${e(JSON.stringify({per:p.perUnit,eff:p.effective,units:p.unitsN}))}' novalidate>
        <script type="application/json" data-plans>${JSON.stringify(d).replace(/</g,"\\u003c")}<\/script>
        <div class="row2">
          <label class="field"><span>${e(p.rent)}</span><input name="rent" type="number" min="100" step="50" value="${b}" inputmode="numeric"></label>
          <label class="field"><span>${e(p.units)}</span><input name="units" type="number" min="1" max="500" value="${Number(h.units)||1}" inputmode="numeric"></label>
        </div>
        <fieldset class="plan-pick"><legend>${e(p.plan)}</legend>${s.map((f,S)=>`<label><input type="radio" name="plan" value="${e(f.id)}"${f.featured||!s.some(N=>N.featured)&&!S?" checked":""}><span>${e(r(f.name))} \xB7 ${e(String(f.pct))}%</span></label>`).join("")}</fieldset>
        <dl class="sum" aria-live="polite">
          <div><dt>${e(p.monthly)}</dt><dd data-r="monthly">\u2013</dd></div>
          <div><dt>${e(p.leasing)}</dt><dd data-r="leasing">\u2013</dd></div>
          <div><dt>${e(p.renewals)}</dt><dd data-r="renewals">\u2013</dd></div>
          <div class="total"><dt>${e(p.yearly)}</dt><dd data-r="yearly">\u2013</dd></div>
          <div class="net"><dt>${e(p.net)}</dt><dd data-r="net">\u2013</dd></div>
        </dl>
        <p class="muted small" data-r="eff"></p>
        <p class="muted small">${e(p.note.replace("{n}",Math.round(Number((k=h.turnover)!=null?k:.4)*100)))}</p>
      </form>
      <noscript><p class="lead">${e(p.noJs)}</p></noscript>
    </div>
    <form class="card order" id="estimate" data-form="estimate" data-text="${e(p.message)}"${$} novalidate>
      <div class="order-fields">
        <h3 class="h3">${e(p.estTitle)}</h3>
        <p class="muted">${e(p.estText)}</p>
        <label class="field"><span>${e(p.address)} *</span><input name="address" autocomplete="street-address" required maxlength="160"></label>
        <div class="row2">
          <label class="field"><span>${e(p.beds)}</span><select name="beds">${[0,1,2,3,4,5].map(f=>`<option value="${f}">${e(f?t.rentals.beds.replace("{n}",f):t.rentals.studio)}</option>`).join("")}</select></label>
          <label class="field"><span>${e(p.ready)}</span><select name="ready">${p.readyOpts.map(f=>`<option>${e(f)}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(t.form.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(t.form.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(t.form.required)}</p>
        <button class="btn btn--accent btn--lg btn--block" type="submit">${u("key",18)} ${e(p.estSubmit)}</button>
        <p class="muted small">${e(p.estNote)}</p>
      </div>
      ${V(t,o,c,g)}
    </form>
  </div>
</section>`}function Oe(n){var d,b,$,w;let{site:a,t,L:r,url:s,channels:i}=n,l=(d=a.maintenance)!=null?d:{},o=t.residents,c=((b=l.categories)!=null?b:[]).filter(m=>r(m==null?void 0:m.name)),p=($=a.contact)!=null?$:{},h=l.emergencyPhone||p.phone,g=((w=a.residentLinks)!=null?w:[]).filter(m=>r(m==null?void 0:m.label)&&m.url);return`<section class="section" id="residents" aria-labelledby="res-title">
  <div class="wrap res-grid">
    <div class="res-copy">
      <div class="head"><p class="kicker">04 \xB7 ${e(o.kicker)}</p><h2 id="res-title" class="h2">${e(o.title)}</h2><p class="muted">${e(r(a.residentsText)||o.text)}</p></div>
      ${a.residentsImage?`<img class="res-ph" sizes="${C.wide}" src="${e(z(s,a.residentsImage))}" alt="" width="900" height="700" loading="lazy">`:""}
      ${g.length?`<ul class="res-links">${g.map(m=>{var x;return`<li><a class="btn btn--line" href="${e(m.url)}" target="_blank" rel="noopener">${u((x=m.icon)!=null?x:"arrow",18)} ${e(r(m.label))}</a></li>`}).join("")}</ul>`:""}
      ${h?`<p class="emer-line">${u("phone",18)} ${e(o.emerLine)} <a href="tel:${D(h)}">${e(h)}</a></p>`:""}
    </div>
    <form class="card order" data-form="repair" data-text="${e(o.message)}" novalidate>
      <div class="order-fields">
        <h3 class="h3">${u("wrench",22)} ${e(o.formTitle)}</h3>
        <fieldset class="urg" data-urgency><legend>${e(o.urgency)}</legend>
          ${["emergency","urgent","routine"].map((m,x)=>`<label class="urg-${m}"><input type="radio" name="urgency" value="${e(o.levels[m].label)}" data-u="${m}"${x===2?" checked":""}><span><b>${e(o.levels[m].label)}</b><small>${e(o.levels[m].text)}</small></span></label>`).join("")}
        </fieldset>
        <div class="emer" data-emer hidden>
          <p><b>${e(o.emerTitle)}</b> ${e(r(l.emergencyNote)||o.emerText)}</p>
          ${h?`<a class="btn btn--danger btn--lg btn--block" href="tel:${D(h)}">${u("phone",18)} ${e(o.call.replace("{phone}",h))}</a>`:""}
        </div>
        ${c.length?`<label class="field"><span>${e(o.category)}</span><select name="category">${c.map(m=>`<option>${e(r(m.name))}</option>`).join("")}</select></label>`:""}
        <label class="field"><span>${e(o.address)} *</span><input name="address" autocomplete="street-address" required maxlength="160"></label>
        <label class="field"><span>${e(o.issue)} *</span><textarea name="issue" rows="3" required maxlength="800" placeholder="${e(o.issueHint)}"></textarea></label>
        <div class="row2">
          <label class="field"><span>${e(t.form.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(t.form.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="check"><input type="checkbox" name="enter" value="1"> <span>${e(o.enter)}</span></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(t.form.required)}</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit">${u("wrench",18)} ${e(o.submit)}</button>
      </div>
      ${V(t,null,i,p)}
    </form>
  </div>
</section>`}function Be({site:n,t:a,L:t}){var i,l;let r=((i=n.steps)!=null?i:[]).filter(o=>t(o==null?void 0:o.title)),s=((l=n.areas)!=null?l:[]).map(t).filter(Boolean);return!r.length&&!s.length?"":`<section class="section section--soft" id="how" aria-labelledby="how-title">
  <div class="wrap">
    <div class="head"><p class="kicker">05 \xB7 ${e(a.steps.kicker)}</p><h2 id="how-title" class="h2">${e(a.steps.title)}</h2></div>
    ${r.length?`<ol class="steps">${r.map((o,c)=>`<li><span class="no">${String(c+1).padStart(2,"0")}</span><h3>${e(t(o.title))}</h3>${t(o.text)?`<p class="muted">${e(t(o.text))}</p>`:""}${t(o.time)?`<p class="when">${u("clock",14)} ${e(t(o.time))}</p>`:""}</li>`).join("")}</ol>`:""}
    ${s.length?`<div class="areas"><h3 class="h4">${u("pin",18)} ${e(a.steps.areas)}</h3><ul>${s.map(o=>`<li>${e(o)}</li>`).join("")}</ul></div>`:""}
  </div>
</section>`}function Ae({site:n,t:a,L:t,lang:r}){let s=re(n,a,r,"btn btn--line"),i=se(n);return n.showReviews===!1||!i.length&&!s?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2>
    ${le(i,r,"quotes",l=>`<figure class="quote">
      ${l.rating?`<div class="stars" aria-label="${l.rating}/5">${Array.from({length:5},(o,c)=>`<span class="${c<l.rating?"on":""}">${u("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(t(l.text))}</blockquote>
      <figcaption>${e(l.name)}${t(l.bought)?`<small>${e(t(l.bought))}</small>`:""}${ie(l,r)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Fe({site:n,t:a,L:t}){var s;let r=((s=n.faq)!=null?s:[]).filter(i=>t(i==null?void 0:i.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div class="qa">${r.map((i,l)=>`<details${l===0?" open":""}><summary>${e(t(i.q))}</summary><p>${e(t(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ve({site:n,t:a,L:t,channels:r}){var o,c,p;let s=(o=n.contact)!=null?o:{},i=encodeURIComponent((c=s.mapQuery)!=null?c:t(s.address)),l=h=>h.length===7?a.everyDay:X(h,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${A(n,a)}
      ${((p=n.hours)!=null?p:[]).length?`<table class="hours"><tbody>${n.hours.map(h=>`<tr><th scope="row">${e(l(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${t(s.address)?`<p class="addr">${u("pin",18)} ${e(t(s.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(a.visit.directions)} ${u("arrow",16)}</a>
        ${r.map(h=>{var g;return`<a class="btn btn--line" href="${e(O(h,s))}" ${te(h)}>${u(h,18)} ${e((g=a.via[h])!=null?g:h)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ie({site:n,t:a,L:t,market:r}){var l,o;let s=(l=n.contact)!=null?l:{},i=Object.entries((o=n.social)!=null?o:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(t(n.tagline))}</p>${t(n.license)?`<p class="muted small">${e(t(n.license))}</p>`:""}</div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${s.phone?`<li><a href="tel:${D(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${t(s.address)?`<li>${e(t(s.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${i.map(([c,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${ce(n,a,r.lang)}</div>
</footer>`}function Ge({site:n,market:a,L:t,abs:r,url:s,plans:i,homes:l,size:o}){var p,h,g;let c=(p=n.contact)!=null?p:{};return{"@context":"https://schema.org","@type":"RealEstateAgent",name:n.name,url:r(`${a.id}/`),description:t(n.intro),image:new URL(F(n,s),r("")).href,telephone:c.phone,email:c.email,address:{"@type":"PostalAddress",streetAddress:t(c.address)},areaServed:((h=n.areas)!=null?h:[]).map(t).filter(Boolean),openingHoursSpecification:ee((g=n.hours)!=null?g:[]),makesOffer:l.map(d=>({"@type":"Offer",price:d.price,priceCurrency:a.currency,businessFunction:"http://purl.org/goodrelations/v1#LeaseOut",itemOffered:{"@type":"Accommodation",name:t(d.title),numberOfBedrooms:Number(d.beds)||0,floorSize:o(d.sqft)||void 0}})),hasOfferCatalog:{"@type":"OfferCatalog",name:n.name,itemListElement:i.map(d=>({"@type":"Offer",itemOffered:{"@type":"Service",name:t(d.name),description:t(d.description)||void 0}}))}}}var He=({site:n,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(t=>a(t==null?void 0:t.q)).map(t=>({"@type":"Question",name:a(t.q),acceptedAnswer:{"@type":"Answer",text:a(t.a)}}))});export{Ne as areaOf,na as renderSite};
