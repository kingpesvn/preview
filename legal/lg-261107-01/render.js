var de={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,n=>de[n]);function E(a,n,t="vi"){var o,r,s;return a==null?"":typeof a!="object"?String(a):(s=(r=(o=a[n])!=null?o:a[t])!=null?r:Object.values(a)[0])!=null?s:""}var he={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},R=a=>{var n;return(n=he[a])!=null?n:"en-US"};function ue(a,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(a)-.01);let t=Number(n)||1;return Math.max(t,Math.round(a/t)*t)}function T(a,n){var o,r;if(n.default)return a.basePrice;let t=(r=(o=a.prices)==null?void 0:o[n.id])!=null?r:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:ue(a.basePrice*n.rate,n.rounding)}var me=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function K(a,n){let t={style:"currency",currency:n.currency};return me.has(n.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(R(n.lang),t).format(a)}function J(a="/"){let n=a.endsWith("/")?a:`${a}/`;return(t="")=>n+String(t).replace(/^\//,"")}var C=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,P=(a,n)=>{let t=C(n);return t==null?n:a(t)},z=(a="")=>String(a).replace(/\D/g,"");function V(a,n,t=""){switch(a){case"phone":return`tel:${z(n.phone)}`;case"zalo":return`https://zalo.me/${z(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${z(n.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var B=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,ge=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function Z(a){if(!a||typeof a!="string")return null;let n;try{n=new URL(a.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let t=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let o={};for(let[r,s]of n.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();ge.includes(i)&&(o[i]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var Y={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var fe={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},g=(a,n=20,t="")=>{var o;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(o=fe[a])!=null?o:""}</svg>`},L=[1,2,3,4,5,6,0],ve=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Q(a,n){let t=a.map(r=>L.indexOf(r)).sort((r,s)=>r-s);return t.every((r,s)=>s===0||r===t[s-1]+1)&&t.length>2?`${n[L[t[0]]]} \u2013 ${n[L[t.at(-1)]]}`:t.map(r=>n[L[r]]).join(", ")}var ee=a=>a.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(t=>ve[t]),opens:n.open,closes:n.close}));function te(a){var t,o;return(o=(t=new Intl.NumberFormat(R(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:t.value)!=null?o:a.currency}var ae=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',ne=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`;var X={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},be=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ye=a=>{var n;try{let t=new URL(String((n=a.googleReview)!=null?n:"").trim());return t.protocol==="https:"&&be.test(t.hostname)?t.href:""}catch{return""}},oe=(a,n,t,o="btn btn--line")=>{var i;let r=ye(a);if(!r)return"";let s=typeof n.reviews=="object"&&((i=n.reviews)==null?void 0:i.google)||X[t]||X.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${g("star",16)} ${e(s)}</a></p>`},q={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},re={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},se=a=>{var n;return((n=a.reviews)!=null?n:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function ie(a,n){var s,i,l;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!t)return"";let o=new Date(Date.UTC(+t[1],+t[2]-1,+((i=t[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((l=re[n])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function $e(a,n){var i,l;let t=a.filter(p=>p.rating>=1&&p.rating<=5);if(t.length<2)return"";let o=t.reduce((p,d)=>p+Number(d.rating),0)/t.length,r=(i=q[n])!=null?i:q.en,s=new Intl.NumberFormat((l=re[n])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${g("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function le(a,n,t,o){var i;if(!a.length)return"";let r=(i=q[n])!=null?i:q.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${g("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${$e(a,n)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${t} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${ke}`}var ke=`<style>
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
upd()}})()<\/script>`;var ce=(a,n,t)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(n.footer.madeWith)}</a>`;function pe({site:a,markets:n,url:t,abs:o}){var i;let r=(i=n.find(l=>l.default))!=null?i:n[0],s=n.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${n.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${o(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(s)}, root = ${JSON.stringify(t(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${n.map(l=>`<a href="${t(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var xe="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";function _e({site:a,catalog:n,i18n:t,template:o,basePath:r="/",siteUrl:s=a.domain}){let i=J(r),l=m=>new URL(i(m),s).href,p=n.markets,d=Z(a.bookingForm),v=d&&!d.error?d:null,u=p.map(m=>{var b,j,F,G,O,H,I,U,W;let $=m.lang,x=(j=(b=t[$])!=null?b:t.en)!=null?j:t.vi,w=f=>E(f,$,"en"),D=((F=a.bizTypes)!=null?F:[]).filter(f=>(f==null?void 0:f.id)&&w(f.name)),c=((G=n.products)!=null?G:[]).filter(f=>f.category==="package").map(f=>({...f,price:T(f,m)})).filter(f=>f.price!=null),y=((O=a.addons)!=null?O:[]).filter(f=>f==null?void 0:f.id).map(f=>({...f,price:T({basePrice:f.price,prices:f.prices},m)})).filter(f=>f.price!=null),M=a.perEmployee&&(H=T({basePrice:a.perEmployee.price,prices:a.perEmployee.prices},m))!=null?H:0,S=((I=a.deadlines)!=null?I:[]).filter(f=>{var _;return w(f==null?void 0:f.title)&&(!((_=f.markets)!=null&&_.length)||f.markets.includes(m.id))}),h=(W=(U=a.bookingChannels)==null?void 0:U[m.id])!=null?W:["phone"],N={site:a,catalog:n,market:m,markets:p,lang:$,t:x,L:w,url:i,abs:l,types:D,packages:c,addons:y,perEmp:M,deadlines:S,channels:h,money:f=>K(f,m),template:o,gform:v};return{path:`${m.id}/index.html`,html:Me(N)}});return u.push({path:"index.html",html:pe({site:a,markets:p,url:i,abs:l})}),u}var we=[["home","house"],["fees","card"],["dates","calendar"],["contact","chat"]],A=(a,n)=>{var t;return String((t=n(a))!=null?t:"").split(`
`).map(o=>o.trim()).filter(Boolean)};function Me(a){var D,c,y,M,S,h,k,N;let{site:n,market:t,markets:o,lang:r,t:s,L:i,url:l,abs:p}=a,d=`${n.name} \xB7 ${i(n.tagline)}`,v=(D=n.theme)!=null?D:{},u=["primary","ink","bg","surface","soft","accent"].filter(b=>v[b]).map(b=>`--${b}:${v[b]}`).join(";"),m=(c=o.find(b=>b.default))!=null?c:o[0],$=o.map(b=>({id:b.id,lang:b.lang,country:b.country,currency:b.currency,href:l(`${b.id}/`)})),x=(y=n.contact)!=null?y:{},w=we.map(([b,j])=>`<a href="#${b}" data-tab="${b}">${g(j,22)}<span>${e(s.tabs[b])}</span></a>`).join("");return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(d)}</title>
<meta name="description" content="${e(i(n.intro))}">
<link rel="canonical" href="${p(`${t.id}/`)}">
${o.map(b=>`<link rel="alternate" hreflang="${e(b.lang)}-${e(b.country)}" href="${p(`${b.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${m.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(d)}">
<meta property="og:description" content="${e(i(n.intro))}">
<meta property="og:url" content="${p(`${t.id}/`)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta property="og:image" content="${e(p(C(n.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((M=v.primary)!=null?M:"#1D2B4F")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${xe}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${u}}</style>
${B(Le(a))}${((S=n.faq)!=null?S:[]).length?B(qe(a)):""}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify($))}' data-wa="${e(z((h=x.whatsapp)!=null?h:""))}" data-email="${e((k=x.email)!=null?k:"")}" data-copied="${e(s.copied)}" data-store="${e(`kp-tax-${String((N=n.name)!=null?N:"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`)}" data-currency="${e(t.currency)}" data-lang="${e(r)}">
<a class="skip" href="#main">${e(s.skip)}</a>
${ne(s)}
<div class="shell">
  ${De(a)}
  <div class="app">
    ${Se(a)}
    <nav class="tabs tabs--top" aria-label="${e(s.tabs.label)}">${w}</nav>
    <main id="main">
      ${ze(a)}
      ${Pe(a)}
      ${je(a)}
      ${Te(a)}
    </main>
    ${Ce(a)}
  </div>
</div>
<nav class="tabs tabs--bottom" aria-label="${e(s.tabs.label)}">${w}</nav>
</body>
</html>
`}function De({site:a,t:n,L:t,url:o}){var s;let r=(s=a.contact)!=null?s:{};return`<aside class="side" aria-hidden="true">
  <img src="${e(P(o,a.sideImage||"photos/h-side.webp"))}" alt="" width="1200" height="900">
  <div class="side-card">
    <p class="side-name">${e(a.name)}</p>
    <p>${e(t(a.tagline))}</p>
    ${r.phone?`<a class="side-call" href="tel:${z(r.phone)}" tabindex="-1">${g("phone",22)} <span><small>${e(n.side.ask)}</small><b>${e(r.phone)}</b></span></a>`:""}
  </div>
</aside>`}function Se({site:a,market:n,markets:t,t:o,url:r}){var i;let s=(i=a.contact)!=null?i:{};return`<header class="appbar">
  <a class="brand" href="${r(`${n.id}/`)}">
    ${a.logo?`<img src="${e(P(r,a.logo))}" alt="" width="36" height="36">`:`<span class="brand-mark" aria-hidden="true">${g("scale",20)}</span>`}
    <span>${e(a.name)}</span>
  </a>
  ${t.length>1?`<details class="market">
    <summary aria-label="${e(o.market.label)}">${g("globe",16)}<span>${e(n.id.toUpperCase())}</span></summary>
    <ul>${t.map(l=>`<li><a href="${r(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===n.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)} ${e(te(l))}</a></li>`).join("")}</ul>
  </details>`:""}
  ${s.phone?`<a class="callfab" href="tel:${z(s.phone)}" aria-label="${e(o.side.ask)} ${e(s.phone)}">${g("phone",20)}</a>`:""}
</header>`}function ze(a){var d;let{site:n,t,L:o,url:r,types:s,deadlines:i}=a,l=A(n.perks,o),p=((d=n.steps)!=null?d:[]).filter(v=>o(v==null?void 0:v.title));return`<section class="view" id="home" data-view="home" aria-labelledby="hm-title">
  <div class="card hero">
    <img src="${e(P(r,n.heroImage||"photos/h-hero.webp"))}" alt="" width="1200" height="900" fetchpriority="high">
    <div class="hero-copy">
      ${o(n.heroKicker)?`<p class="kicker">${e(o(n.heroKicker))}</p>`:""}
      <h1 id="hm-title">${e(o(n.tagline))}</h1>
      ${o(n.intro)?`<p>${e(o(n.intro))}</p>`:""}
    </div>
  </div>
  ${i.length?`<a class="next" href="#dates" data-next hidden>${g("calendar",24)}<span><small>${e(t.dates.next)}</small><b data-next-title></b><em data-next-when></em></span>${g("chevron",20)}</a>`:""}
  <div class="quick">
    <a class="qbtn" href="#fees">${g("card",24)}<span>${e(t.quick.fees)}</span></a>
    <a class="qbtn" href="#dates">${g("calendar",24)}<span>${e(t.quick.dates)}</span></a>
    <a class="qbtn" href="#docs">${g("doc",24)}<span>${e(t.quick.docs)}</span></a>
    <a class="qbtn" href="#contact">${g("chat",24)}<span>${e(t.quick.contact)}</span></a>
  </div>
  ${s.length?`<div class="block">
    <h2 class="h2">${e(t.who.title)}</h2>
    <div class="who">${s.map(v=>`<a class="who-card" href="#fees" data-go-type="${e(v.id)}">${g(v.icon||"briefcase",24)}<span><b>${e(o(v.name))}</b>${o(v.text)?`<small>${e(o(v.text))}</small>`:""}</span>${g("chevron",18)}</a>`).join("")}</div>
  </div>`:""}
  ${l.length?`<ul class="perks">${l.map(v=>`<li>${g("shield",16)} ${e(v)}</li>`).join("")}</ul>`:""}
  ${p.length?`<div class="block">
    <h2 class="h2">${e(t.steps.title)}</h2>
    <ol class="flow">${p.map((v,u)=>`<li><span class="flow-n">${u+1}</span><div><p class="flow-t"><b>${e(o(v.title))}</b>${o(v.time)?`<small>${e(o(v.time))}</small>`:""}</p>${o(v.text)?`<p>${e(o(v.text))}</p>`:""}</div></li>`).join("")}</ol>
  </div>`:""}
  ${Ne(a)}
</section>`}function Ne({site:a,t:n,L:t,lang:o}){let r=oe(a,n,o,"btn btn--line"),s=se(a);return a.showReviews===!1||!s.length&&!r?"":`<div class="block" aria-labelledby="rev-title">
  <div class="block-head"><h2 id="rev-title" class="h2">${e(n.reviews.title)}</h2></div>
  ${le(s,o,"reviews",i=>`<figure class="review">
    <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(l,p)=>`<span class="${p<i.rating?"on":""}">${g("star",14)}</span>`).join("")}</p>
    <blockquote>${e(t(i.text))}</blockquote>
    <figcaption>${e(i.name)}${t(i.bought)?`<small>${e(t(i.bought))}</small>`:""}${ie(i,o)}</figcaption>
  </figure>`)}${r}
</div>`}function Pe(a){var w,D;let{site:n,t,L:o,url:r,types:s,packages:i,addons:l,perEmp:p,money:d,market:v}=a;if(!i.length)return"";let u=((w=n.volumes)!=null?w:[]).filter(c=>(c==null?void 0:c.id)&&o(c.name)),m=(D=n.prepay)!=null?D:{},$=c=>{var y,M;return(M=o((y=s.find(S=>S.id===c))==null?void 0:y.name))!=null?M:""},x={};return i.forEach(c=>{x[c.for]==null&&(x[c.for]=c.id)}),`<section class="view" id="fees" data-view="fees" aria-labelledby="fe-title">
  <div class="view-head"><h2 id="fe-title" class="h1">${e(t.fees.title)}</h2><p class="muted">${e(t.fees.text)}</p></div>
  ${s.length>1?`<div class="chips" role="group" aria-label="${e(t.fees.type)}">${s.map((c,y)=>`<button type="button" class="chip" data-type="${e(c.id)}" aria-pressed="${y?"false":"true"}">${e(o(c.name))}</button>`).join("")}</div>`:""}
  <ul class="rail rail--pkg" role="radiogroup" aria-label="${e(t.fees.title)}">${i.map(c=>{var y,M,S;return`<li class="pkg" data-for="${e((y=c.for)!=null?y:"")}">
    <label>
      <input type="radio" name="pkg" value="${e(c.id)}" data-price="${c.price}" data-name="${e(o(c.name))}" data-for="${e((M=c.for)!=null?M:"")}"${c.id===x[(S=s[0])==null?void 0:S.id]?" checked":""}>
      ${c.image?`<img sizes="${Y.card}" src="${e(P(r,c.image))}" alt="" width="900" height="675" loading="lazy">`:""}
      <span class="pkg-body">
        <span class="pkg-top">${o(c.badge)?`<span class="badge">${e(o(c.badge))}</span>`:""}<span class="pkg-type">${e($(c.for))}</span></span>
        <span class="pkg-name">${e(o(c.name))}</span>
        ${o(c.description)?`<span class="muted">${e(o(c.description))}</span>`:""}
        <span class="pkg-price"><small>${e(t.fees.from)}</small> ${e(d(c.price))} <small>${e(t.fees.perMonth)}</small></span>
        <span class="ticks">${A(c.includes,o).map(h=>`<span>${g("check",15)} ${e(h)}</span>`).join("")}</span>
        <span class="pick">${e(t.fees.pick)}</span>
      </span>
    </label>
  </li>`}).join("")}</ul>
  <div class="card est" data-est data-pre-months="${Number(m.months)||0}" data-pre-pct="${Number(m.pct)||0}" data-per-emp="${p}" data-pre-label="${e(t.est.prepayShort)}">
    <h3 class="h3">${e(t.est.title)}</h3>
    ${u.length?`<fieldset class="field"><legend>${e(t.est.volume)}</legend><div class="opts">${u.map((c,y)=>`<label class="opt"><input type="radio" name="vol" value="${e(o(c.name))}" data-mult="${Number(c.mult)||1}"${y?"":" checked"}><span>${e(o(c.name))}</span></label>`).join("")}</div></fieldset>`:""}
    ${p?`<div class="field"><span id="em-l">${e(t.est.staff)} <small class="muted">${e(t.est.staffHint.replace("{price}",d(p)))}</small></span><div class="step" data-step><button type="button" data-d="-1" aria-label="\u2212">${g("minus",16)}</button><input name="staff" type="number" min="0" max="500" step="1" value="0" inputmode="numeric" aria-labelledby="em-l"><button type="button" data-d="1" aria-label="+">${g("plus",16)}</button></div></div>`:""}
    ${l.length?`<fieldset class="field"><legend>${e(t.est.addons)}</legend><div class="addons">${l.map(c=>{var y;return`<label class="check"><input type="checkbox" name="addon" value="${e(o(c.name))}" data-price="${c.price}" data-per="${e((y=c.per)!=null?y:"once")}"> <span>${e(o(c.name))}</span><b>${e(d(c.price))} <small>${e(c.per==="month"?t.fees.perMonth:t.est.once)}</small></b></label>`}).join("")}</div></fieldset>`:""}
    ${m.months?`<label class="check check--pre"><input type="checkbox" name="prepay"> <span>${e(t.est.prepay.replace("{n}",m.months).replace("{p}",m.pct))}</span></label>`:""}
    <dl class="sum">
      <div><dt>${e(t.est.package)}</dt><dd data-e-pkg>\u2014</dd></div>
      <div><dt>${e(t.est.monthly)}</dt><dd data-e-month>\u2014</dd></div>
      <div data-e-once-row hidden><dt>${e(t.est.oneTime)}</dt><dd data-e-once></dd></div>
      <div class="sum-save" data-e-save-row hidden><dt>${e(t.est.save)}</dt><dd data-e-save></dd></div>
      <div class="sum-total"><dt>${e(t.est.year)}</dt><dd data-e-year>\u2014</dd></div>
    </dl>
    <p class="hint">${e(t.est.note)}</p>
    <a class="btn btn--primary btn--lg btn--full" href="#contact">${g("chat",18)} ${e(t.est.ask)}</a>
  </div>
</section>`}function je(a){var v;let{site:n,t,L:o,types:r,deadlines:s,market:i}=a,l=A(n.docs,o);if(!s.length&&!l.length)return"";let p=u=>{var $;let m=u.day==="last"?t.dates.lastDay:String(u.day);return($=u.months)!=null&&$.length?u.months.length===1?t.dates.yearly.replace("{d}",m).replace("{m}",u.months[0]):t.dates.months.replace("{d}",m).replace("{m}",u.months.join(", ")):t.dates.monthly.replace("{d}",m)},d=u=>{var m,$;return($=o((m=r.find(x=>x.id===u))==null?void 0:m.name))!=null?$:""};return`<section class="view" id="dates" data-view="dates" aria-labelledby="dt-title">
  <div class="view-head"><h2 id="dt-title" class="h1">${e(t.dates.title)}</h2><p class="muted">${e(t.dates.text)}</p></div>
  ${s.length?`${r.length>1?`<div class="chips" role="group" aria-label="${e(t.fees.type)}"><button type="button" class="chip" data-dtype="all" aria-pressed="true">${e(t.dates.all)}</button>${r.map(u=>`<button type="button" class="chip" data-dtype="${e(u.id)}" aria-pressed="false">${e(o(u.name))}</button>`).join("")}</div>`:""}
  <ol class="dl" data-dl data-tz="${e((v=n.timezone)!=null?v:"")}" data-locale="${e(i.lang)}" data-today="${e(t.dates.today)}" data-left="${e(t.dates.left)}" data-late="${e(t.dates.soon)}" data-name="${e(n.name)}">${s.map((u,m)=>{var $,x,w;return`<li class="dl-item" data-for="${e((($=u.for)!=null?$:[]).join(" "))}" data-months="${e(((x=u.months)!=null?x:[]).join(","))}" data-day="${e(u.day)}" data-i="${m}">
    <span class="dl-date"><b data-dd>${e(u.day==="last"?"\u2014":String(u.day))}</b><small data-dm>${e(p(u))}</small></span>
    <span class="dl-body"><b>${e(o(u.title))}</b>${o(u.text)?`<small>${e(o(u.text))}</small>`:""}<span class="dl-tags">${((w=u.for)!=null?w:[]).map(D=>`<em>${e(d(D))}</em>`).join("")}</span></span>
    <span class="dl-left" data-left-n></span>
  </li>`}).join("")}</ol>
  <p class="actions"><button type="button" class="btn btn--line" data-ics>${g("calendar",18)} ${e(t.dates.ics)}</button></p>
  <p class="hint">${e(t.dates.note)}</p>`:""}
  ${l.length?`<div class="card docs" id="docs">
    <h3 class="h3">${g("doc",20)} ${e(t.docs.title)}</h3>
    <p class="muted">${e(t.docs.text)}</p>
    <ul class="checklist" data-docs>${l.map((u,m)=>`<li><label><input type="checkbox" data-i="${m}"> <span>${e(u)}</span></label></li>`).join("")}</ul>
    <p class="pack-meta"><span data-docs-count data-tpl="${e(t.docs.count)}">${e(t.docs.count.replace("{a}",0).replace("{b}",l.length))}</span>
      <button type="button" class="link" data-print>${g("printer",16)} ${e(t.docs.print)}</button></p>
  </div>`:""}
</section>`}function Te(a){var D,c,y,M,S;let{site:n,t,L:o,types:r,channels:s,gform:i,market:l}=a,p=(D=n.contact)!=null?D:{},d=t.form,v=i?` data-gform="${e(i.action)}" data-gmap='${e(JSON.stringify(i.fields))}'`:"",u=t.orderText.replace(/\{\w+\}/g,"\u2026"),m=h=>s.map((k,N)=>{var b;return`<button type="submit" class="btn btn--lg btn--full ${h!=null?h:N?"btn--line":"btn--primary"}" data-channel="${e(k)}" data-href="${e(V(k,p,u))}">${g(k,18)} ${e(k==="phone"?d.call:d.send.replace("{channel}",(b=t.via[k])!=null?b:k))}</button>`}).join(""),$=encodeURIComponent((c=p.mapQuery)!=null?c:o(p.address)),x=h=>h.length===7?t.visit.everyDay:Q(h,t.days),w=((y=n.faq)!=null?y:[]).filter(h=>o(h==null?void 0:h.q));return`<section class="view" id="contact" data-view="contact" aria-labelledby="ct-title">
  <div class="view-head"><h2 id="ct-title" class="h1">${e(t.contact.title)}</h2><p class="muted">${e(t.contact.text)}</p></div>
  <form class="card form" data-req novalidate${v} data-text="${e(t.orderText)}" data-market="${e(`${l.id.toUpperCase()} \xB7 ${l.currency}`)}">
    <div class="order-fields">
      <p class="chosen" data-chosen hidden></p>
      <div class="row2">
        <label class="field"><span>${e(d.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(d.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
      </div>
      ${r.length?`<fieldset class="field"><legend>${e(d.type)}</legend><div class="opts">${r.map((h,k)=>`<label class="opt"><input type="radio" name="version" value="${e(o(h.name))}" data-type="${e(h.id)}"${k?"":" checked"}><span>${e(o(h.name))}</span></label>`).join("")}</div></fieldset>`:""}
      <fieldset class="field"><legend>${e(d.now)}</legend><div class="opts">${((M=d.situations)!=null?M:[]).map((h,k)=>`<label class="opt"><input type="radio" name="when" value="${e(h)}"${k?"":" checked"}><span>${e(h)}</span></label>`).join("")}</div></fieldset>
      <label class="field"><span>${e(d.email)}</span><input name="email" type="email" autocomplete="email" maxlength="120"></label>
      <label class="field"><span>${e(d.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${e(d.noteHint)}"></textarea></label>
      <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
      <p class="form-err" data-err hidden>${e(d.required)}</p>
      <button class="btn btn--primary btn--lg btn--full" type="submit" data-submit>${g("chat",18)} ${e(d.submit)}</button>
      <p class="hint">${e(d.privacy)}</p>
    </div>
    <div class="done" data-done hidden tabindex="-1">
      <p class="done-title">${g(i?"check":"arrow",22)} ${e(i?d.done:d.stepTitle)}</p>
      <p>${e(i?d.doneText:d.stepText)}</p>
      <div class="buy">${m(i?"btn--line":void 0)}</div>
      ${i?"":`<button type="button" class="link back" data-edit>${e(d.edit)}</button>`}
    </div>
    <p class="form-msg" role="status" hidden></p>
  </form>
  <div class="card visit">
    <h3 class="h3">${e(t.visit.title)}</h3>
    ${o(p.address)?`<p class="addr">${g("pin",18)} <span>${e(o(p.address))}</span></p>`:""}
    ${((S=n.hours)!=null?S:[]).length?`<table class="hours"><tbody>${n.hours.map(h=>`<tr><th scope="row">${e(x(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${$}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <div class="actions">
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${$}" target="_blank" rel="noopener">${e(t.visit.directions)} ${g("arrow",16)}</a>
      ${s.map(h=>{var k;return`<a class="btn btn--line" href="${e(V(h,p))}" ${ae(h)}>${g(h,18)} ${e((k=t.via[h])!=null?k:h)}</a>`}).join("")}
    </div>
  </div>
  ${w.length?`<div class="block faq"><h2 class="h2">${e(t.faq.title)}</h2>${w.map((h,k)=>`<details${k===0?" open":""}><summary>${e(o(h.q))}</summary><p>${e(o(h.a))}</p></details>`).join("")}</div>`:""}
</section>`}function Ce({site:a,t:n,L:t,market:o}){var i,l;let r=(i=a.contact)!=null?i:{},s=Object.entries((l=a.social)!=null?l:{}).filter(([,p])=>p);return`<footer class="footer">
  <p class="foot-name">${e(a.name)}</p>
  ${t(a.license)?`<p>${e(t(a.license))}</p>`:""}
  ${t(a.disclaimer)?`<p class="disclaimer">${e(t(a.disclaimer))}</p>`:""}
  <p>${r.phone?`${e(n.footer.hotline)}: <a href="tel:${z(r.phone)}">${e(r.phone)}</a>`:""}${r.email?` \xB7 <a href="mailto:${e(r.email)}">${e(r.email)}</a>`:""}</p>
  ${s.length?`<p class="social">${s.map(([p,d])=>`<a href="${e(d)}" target="_blank" rel="noopener">${e(p==="tiktok"?"TikTok":p==="youtube"?"YouTube":p[0].toUpperCase()+p.slice(1))}</a>`).join(" \xB7 ")}</p>`:""}
  <p class="foot-bottom"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${ce(a,n,o.lang)}</p>
</footer>`}function Le({site:a,market:n,L:t,abs:o,packages:r}){var i,l;let s=(i=a.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"AccountingService",name:a.name,url:o(`${n.id}/`),description:t(a.intro),image:o(C(a.heroImage||"photos/h-hero.webp")),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:t(s.address)},openingHoursSpecification:ee((l=a.hours)!=null?l:[]),makesOffer:r.map(p=>({"@type":"Offer",name:t(p.name),price:p.price,priceCurrency:n.currency}))}}var qe=({site:a,L:n})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(t=>n(t==null?void 0:t.q)).map(t=>({"@type":"Question",name:n(t.q),acceptedAnswer:{"@type":"Answer",text:n(t.a)}}))});export{_e as renderSite};
