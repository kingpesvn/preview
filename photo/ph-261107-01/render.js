var de={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,n=>de[n]);function I(a,n,t="vi"){var o,i,s;return a==null?"":typeof a!="object"?String(a):(s=(i=(o=a[n])!=null?o:a[t])!=null?i:Object.values(a)[0])!=null?s:""}var he={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},U=a=>{var n;return(n=he[a])!=null?n:"en-US"};function ue(a,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(a)-.01);let t=Number(n)||1;return Math.max(t,Math.round(a/t)*t)}function A(a,n){var o,i;if(n.default)return a.basePrice;let t=(i=(o=a.prices)==null?void 0:o[n.id])!=null?i:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:ue(a.basePrice*n.rate,n.rounding)}var me=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function J(a,n){let t={style:"currency",currency:n.currency};return me.has(n.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(U(n.lang),t).format(a)}function Z(a="/"){let n=a.endsWith("/")?a:`${a}/`;return(t="")=>n+String(t).replace(/^\//,"")}var F=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,T=(a,n)=>{let t=F(n);return t==null?n:a(t)},j=(a="")=>String(a).replace(/\D/g,"");function G(a,n,t=""){switch(a){case"phone":return`tel:${j(n.phone)}`;case"zalo":return`https://zalo.me/${j(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${j(n.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var W=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,ge=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function Y(a){if(!a||typeof a!="string")return null;let n;try{n=new URL(a.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let t=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let o={};for(let[i,s]of n.searchParams){if(!/^entry\.\d+$/.test(i))continue;let c=s.trim().replace(/^\{|\}$/g,"").toLowerCase();ge.includes(c)&&(o[c]=i)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var _={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var fe={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},g=(a,n=20,t="")=>{var o;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(o=fe[a])!=null?o:""}</svg>`},O=[1,2,3,4,5,6,0],ve=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Q(a,n){let t=a.map(i=>O.indexOf(i)).sort((i,s)=>i-s);return t.every((i,s)=>s===0||i===t[s-1]+1)&&t.length>2?`${n[O[t[0]]]} \u2013 ${n[O[t.at(-1)]]}`:t.map(i=>n[O[i]]).join(", ")}var ee=a=>a.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(t=>ve[t]),opens:n.open,closes:n.close}));function te(a){var t,o;return(o=(t=new Intl.NumberFormat(U(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(i=>i.type==="currency"))==null?void 0:t.value)!=null?o:a.currency}var K=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',ae=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`;var X={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},be=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ye=a=>{var n;try{let t=new URL(String((n=a.googleReview)!=null?n:"").trim());return t.protocol==="https:"&&be.test(t.hostname)?t.href:""}catch{return""}},ne=(a,n,t,o="btn btn--line")=>{var c;let i=ye(a);if(!i)return"";let s=typeof n.reviews=="object"&&((c=n.reviews)==null?void 0:c.google)||X[t]||X.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(i)}" target="_blank" rel="noopener">${g("star",16)} ${e(s)}</a></p>`},H={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},oe={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},re=a=>{var n;return((n=a.reviews)!=null?n:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function se(a,n){var s,c,l;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!t)return"";let o=new Date(Date.UTC(+t[1],+t[2]-1,+((c=t[3])!=null?c:1)));if(Number.isNaN(o.getTime()))return"";let i=new Intl.DateTimeFormat((l=oe[n])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(i)}</time>`}function $e(a,n){var c,l;let t=a.filter(h=>h.rating>=1&&h.rating<=5);if(t.length<2)return"";let o=t.reduce((h,f)=>h+Number(f.rating),0)/t.length,i=(c=H[n])!=null?c:H.en,s=new Intl.NumberFormat((l=oe[n])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${g("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(i.count.replace("{n}",String(a.length)))}</span></p>`}function ie(a,n,t,o){var c;if(!a.length)return"";let i=(c=H[n])!=null?c:H.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?i.prev:i.next)}">${g("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${$e(a,n)}<div class="rv" data-rv data-rv-more="${e(i.more)}" data-rv-less="${e(i.less)}">
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
upd()}})()<\/script>`;var le=(a,n,t)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(n.footer.madeWith)}</a>`;function ce({site:a,markets:n,url:t,abs:o}){var c;let i=(c=n.find(l=>l.default))!=null?c:n[0],s=n.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(i.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${o(`${i.id}/`)}">
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
`}var xe="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";function Ke({site:a,catalog:n,i18n:t,template:o,basePath:i="/",siteUrl:s=a.domain}){let c=Z(i),l=v=>new URL(c(v),s).href,h=n.markets,f=Y(a.bookingForm),d=f&&!f.error?f:null,y=h.map(v=>{var k,C,z,R,E,V,B,u;let $=v.lang,r=(C=(k=t[$])!=null?k:t.en)!=null?C:t.vi,b=w=>I(w,$,"en"),p=((z=n.products)!=null?z:[]).map(w=>{var P;let S=((P=w.variants)!=null?P:[]).map(N=>({...N,price:A(N,v)})).filter(N=>N.price!=null);return{...w,variants:S,price:S.length?Math.min(...S.map(N=>N.price)):null}}).filter(w=>w.price!=null),x=(R=a.shipping)!=null?R:{},M={fee:(V=A({basePrice:(E=x.fee)!=null?E:0,prices:x.prices},v))!=null?V:0,free:x.freeFrom?A({basePrice:x.freeFrom,prices:x.freePrices},v):null},D=(u=(B=a.bookingChannels)==null?void 0:B[v.id])!=null?u:["phone"],m={site:a,catalog:n,market:v,markets:h,lang:$,t:r,L:b,url:c,abs:l,products:p,ship:M,channels:D,money:w=>J(w,v),mountName:w=>{var S,P,N;return(N=b((P=((S=a.mounts)!=null?S:[]).find(pe=>pe.id===w))==null?void 0:P.name))!=null?N:""},template:o,gform:d};return{path:`${v.id}/index.html`,html:Me(m)}});return y.push({path:"index.html",html:ce({site:a,markets:h,url:c,abs:l})}),y}var we=[["home","house"],["shop","camera"],["kit","layers"],["bag","bag"]];function Me(a){var L,q,m,k,C,z,R,E,V,B;let{site:n,market:t,markets:o,lang:i,t:s,L:c,url:l,abs:h,products:f,ship:d,mountName:y}=a,v=`${n.name} \xB7 ${c(n.tagline)}`,$=(L=n.theme)!=null?L:{},r=["primary","ink","bg","surface","soft","accent"].filter(u=>$[u]).map(u=>`--${u}:${$[u]}`).join(";"),b=(q=o.find(u=>u.default))!=null?q:o[0],p=o.map(u=>({id:u.id,lang:u.lang,country:u.country,currency:u.currency,href:l(`${u.id}/`)})),x=(m=n.contact)!=null?m:{},M=f.map(u=>{var w;return{id:u.id,c:u.category,m:(w=u.mount)!=null?w:"all",n:c(u.name),img:u.image?T(l,u.image):"",mn:u.mount&&u.mount!=="all"?y(u.mount):"",v:u.variants.map(S=>{var P;return[(P=c(S.label))!=null?P:"",S.price]})}}),D=we.map(([u,w])=>`<a href="#${u}" data-tab="${u}">${g(w,22)}<span>${e(s.tabs[u])}</span>${u==="bag"?'<b class="tab-count" data-bag-count hidden>0</b>':""}</a>`).join("");return`<!doctype html>
<html lang="${e(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(v)}</title>
<meta name="description" content="${e(c(n.intro))}">
<link rel="canonical" href="${h(`${t.id}/`)}">
${o.map(u=>`<link rel="alternate" hreflang="${e(u.lang)}-${e(u.country)}" href="${h(`${u.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${h(`${b.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(v)}">
<meta property="og:description" content="${e(c(n.intro))}">
<meta property="og:url" content="${h(`${t.id}/`)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta property="og:image" content="${e(h(F(n.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((k=$.primary)!=null?k:"#16181D")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${xe}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${r}}</style>
${W(qe(a))}${((C=n.faq)!=null?C:[]).length?W(Re(a)):""}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(p))}' data-wa="${e(j((z=x.whatsapp)!=null?z:""))}" data-email="${e((R=x.email)!=null?R:"")}" data-copied="${e(s.copied)}" data-store="${e(`kp-cam-${String((E=n.name)!=null?E:"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`)}" data-currency="${e(t.currency)}" data-lang="${e(i)}" data-kit-pct="${Number((V=n.kit)==null?void 0:V.pct)||0}" data-ship="${d.fee}" data-free="${(B=d.free)!=null?B:""}">
<script type="application/json" id="cam-data">${JSON.stringify(M).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${e(s.skip)}</a>
${ae(s)}
<div class="shell">
  ${De(a)}
  <div class="app">
    ${Se(a)}
    <nav class="tabs tabs--top" aria-label="${e(s.tabs.label)}">${D}</nav>
    <main id="main">
      ${Ne(a)}
      ${je(a)}
      ${Te(a)}
      ${Ce(a)}
    </main>
    ${Le(a)}
  </div>
</div>
<nav class="tabs tabs--bottom" aria-label="${e(s.tabs.label)}">${D}</nav>
<p class="toast" data-toast role="status" hidden></p>
</body>
</html>
`}function De({site:a,t:n,L:t,url:o}){var s;let i=(s=a.contact)!=null?s:{};return`<aside class="side" aria-hidden="true">
  <img src="${e(T(o,a.sideImage||"photos/h-side.webp"))}" alt="" width="1200" height="900">
  <div class="side-card">
    <p class="side-name">${e(a.name)}</p>
    <p>${e(t(a.tagline))}</p>
    ${i.phone?`<a class="side-call" href="tel:${j(i.phone)}" tabindex="-1">${g("phone",22)} <span><small>${e(n.side.ask)}</small><b>${e(i.phone)}</b></span></a>`:""}
  </div>
</aside>`}function Se({site:a,market:n,markets:t,t:o,url:i}){var c;let s=(c=a.contact)!=null?c:{};return`<header class="appbar">
  <a class="brand" href="${i(`${n.id}/`)}">
    ${a.logo?`<img src="${e(T(i,a.logo))}" alt="" width="36" height="36">`:`<span class="brand-mark" aria-hidden="true">${g("camera",20)}</span>`}
    <span>${e(a.name)}</span>
  </a>
  ${t.length>1?`<details class="market">
    <summary aria-label="${e(o.market.label)}">${g("globe",16)}<span>${e(n.id.toUpperCase())}</span></summary>
    <ul>${t.map(l=>`<li><a href="${i(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===n.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)} ${e(te(l))}</a></li>`).join("")}</ul>
  </details>`:""}
  ${s.phone?`<a class="callfab" href="tel:${j(s.phone)}" aria-label="${e(o.side.ask)} ${e(s.phone)}">${g("phone",20)}</a>`:""}
</header>`}function Ne(a){var y,v,$,r,b;let{site:n,t,L:o,url:i,channels:s}=a,c=(y=n.contact)!=null?y:{},l=((v=n.uses)!=null?v:[]).filter(p=>(p==null?void 0:p.id)&&o(p.name)),h=String(($=o(n.perks))!=null?$:"").split(`
`).map(p=>p.trim()).filter(Boolean),f=((r=n.services)!=null?r:[]).filter(p=>o(p==null?void 0:p.name)),d=s.find(p=>p!=="phone");return`<section class="view" id="home" data-view="home" aria-labelledby="hm-title">
  <div class="card hero">
    <img src="${e(T(i,n.heroImage||"photos/h-hero.webp"))}" alt="" width="1200" height="900" fetchpriority="high">
    <div class="hero-copy">
      ${o(n.heroKicker)?`<p class="kicker">${e(o(n.heroKicker))}</p>`:""}
      <h1 id="hm-title">${e(o(n.tagline))}</h1>
      ${o(n.intro)?`<p>${e(o(n.intro))}</p>`:""}
    </div>
  </div>
  <div class="quick">
    <a class="qbtn" href="#shop">${g("camera",24)}<span>${e(t.quick.shop)}</span></a>
    <a class="qbtn" href="#kit">${g("layers",24)}<span>${e(t.quick.kit)}</span></a>
    <a class="qbtn" href="#bag">${g("bag",24)}<span>${e(t.quick.bag)}</span></a>
    ${d?`<a class="qbtn" href="${e(G(d,c))}" ${K(d)}>${g(d,24)}<span>${e((b=t.via[d])!=null?b:d)}</span></a>`:`<a class="qbtn" href="#visit">${g("pin",24)}<span>${e(t.quick.visit)}</span></a>`}
  </div>
  ${l.length?`<div class="card uses">
    <h2 class="h2">${e(t.uses.title)}</h2>
    <p class="muted">${e(t.uses.text)}</p>
    <div class="use-grid">${l.map(p=>`<a class="use" href="#shop" data-go-use="${e(p.id)}">${g(p.icon||"camera",22)}<span>${e(o(p.name))}</span></a>`).join("")}</div>
  </div>`:""}
  ${h.length?`<ul class="perks">${h.map(p=>`<li>${g("check",16)} ${e(p)}</li>`).join("")}</ul>`:""}
  ${f.length?`<div class="block">
    <div class="block-head"><h2 class="h2">${e(t.services.title)}</h2><span class="swipe-hint">${e(t.swipe)}</span></div>
    <ul class="rail">${f.map(p=>`<li class="svc">
      ${p.image?`<img sizes="${_.card}" src="${e(T(i,p.image))}" alt="" width="900" height="675" loading="lazy">`:""}
      <div><h3>${e(o(p.name))}</h3>${o(p.text)?`<p>${e(o(p.text))}</p>`:""}</div>
    </li>`).join("")}</ul>
  </div>`:""}
  ${ze(a)}
</section>`}function ze({site:a,t:n,L:t,lang:o}){let i=ne(a,n,o,"btn btn--line"),s=re(a);return a.showReviews===!1||!s.length&&!i?"":`<div class="block" aria-labelledby="rev-title">
  <div class="block-head"><h2 id="rev-title" class="h2">${e(n.reviews.title)}</h2></div>
  ${ie(s,o,"reviews",c=>`<figure class="review">
    <p class="stars" aria-label="${e(c.rating)}/5">${Array.from({length:5},(l,h)=>`<span class="${h<c.rating?"on":""}">${g("star",14)}</span>`).join("")}</p>
    <blockquote>${e(t(c.text))}</blockquote>
    <figcaption>${e(c.name)}${t(c.bought)?`<small>${e(t(c.bought))}</small>`:""}${se(c,o)}</figcaption>
  </figure>`)}${i}
</div>`}var Pe=(a,n,t)=>`${a.variants.length>1?`<small>${e(n.shop.from)}</small> `:""}${e(t(a.price))}`;function je(a){var v,$;let{site:n,t,L:o,url:i,products:s,money:c,mountName:l}=a;if(!s.length)return"";let h=((v=n.mounts)!=null?v:[]).filter(r=>s.some(b=>b.mount===r.id)),f=(($=n.uses)!=null?$:[]).filter(r=>s.some(b=>{var p;return((p=b.fit)!=null?p:[]).includes(r.id)})),d=(r,b,p,x)=>`<button type="button" class="chip" data-f="${r}" data-v="${e(b)}" aria-pressed="${x?"true":"false"}">${e(p)}</button>`,y=r=>{var b;return((b=r.specs)!=null?b:[]).filter(p=>o(p==null?void 0:p[1])).slice(0,3)};return`<section class="view" id="shop" data-view="shop" aria-labelledby="sh-title">
  <div class="view-head"><h2 id="sh-title" class="h1">${e(t.shop.title)}</h2><p class="muted">${e(t.shop.text)}</p></div>
  <div class="filters" data-filters>
    <div class="chips" role="group" aria-label="${e(t.shop.type)}">${d("c","all",t.shop.all,!0)}${["body","lens","acc"].filter(r=>s.some(b=>b.category===r)).map(r=>d("c",r,t.cats[r],!1)).join("")}</div>
    ${h.length>1?`<div class="chips" role="group" aria-label="${e(t.shop.mount)}"><span class="chips-l">${e(t.shop.mount)}</span>${d("m","all",t.shop.anyMount,!0)}${h.map(r=>d("m",r.id,o(r.name),!1)).join("")}</div>`:""}
    ${f.length?`<div class="chips" role="group" aria-label="${e(t.shop.use)}"><span class="chips-l">${e(t.shop.use)}</span>${d("u","all",t.shop.anyUse,!0)}${f.map(r=>d("u",r.id,o(r.name),!1)).join("")}</div>`:""}
    <p class="count" data-count data-tpl="${e(t.shop.count)}" aria-live="polite">${e(t.shop.count.replace("{n}",s.length))}</p>
  </div>
  <ul class="grid" data-grid>${s.map(r=>{var b,p,x;return`<li class="prod" data-id="${e(r.id)}" data-c="${e(r.category)}" data-m="${e((b=r.mount)!=null?b:"all")}" data-u="${e(((p=r.fit)!=null?p:[]).join(" "))}">
    <div class="prod-img">${r.image?`<img sizes="${_.card}" src="${e(T(i,r.image))}" alt="${e(o(r.name))}" width="900" height="900" loading="lazy">`:""}
      ${o(r.badge)?`<span class="badge">${e(o(r.badge))}</span>`:""}${r.cond==="used"?`<span class="badge badge--used">${e(t.shop.used)}</span>`:""}</div>
    <div class="prod-body">
      <p class="tags">${e((x=t.cats[r.category])!=null?x:"")}${r.mount&&r.mount!=="all"?` \xB7 ${e(l(r.mount))}`:r.category!=="body"?` \xB7 ${e(t.shop.allMounts)}`:""}</p>
      <h3>${e(o(r.name))}</h3>
      ${o(r.description)?`<p class="muted desc">${e(o(r.description))}</p>`:""}
      ${y(r).length?`<dl class="specs">${y(r).map(M=>{var D;return`<div><dt>${e((D=t.specs[M[0]])!=null?D:M[0])}</dt><dd>${e(o(M[1]))}</dd></div>`}).join("")}</dl>`:""}
      ${r.variants.length>1?`<div class="vars" role="radiogroup" aria-label="${e(t.shop.version)}">${r.variants.map((M,D)=>`<label class="var"><input type="radio" name="v-${e(r.id)}" value="${D}"${D?"":" checked"}><span>${e(o(M.label))}<b>${e(c(M.price))}</b></span></label>`).join("")}</div>`:""}
      <p class="prod-foot"><span class="price" data-price>${Pe(r,t,c)}</span>
        <button type="button" class="addbtn" data-add="${e(r.id)}">${g("plus",16)} <span>${e(t.shop.add)}</span></button></p>
    </div>
  </li>`}).join("")}</ul>
  <p class="empty" data-empty hidden>${e(t.shop.empty)}</p>
</section>`}function Te(a){var $;let{site:n,t,L:o,url:i,products:s,money:c,mountName:l}=a,h=s.filter(r=>r.category==="body"),f=s.filter(r=>r.category==="lens"),d=s.filter(r=>r.category==="acc");if(!h.length||!f.length)return"";let y=Number(($=n.kit)==null?void 0:$.pct)||0,v=(r,b)=>{var p;return`<li data-kit-item data-m="${e((p=r.mount)!=null?p:"all")}"><label class="kit-opt">
    <input type="${b}" name="kit-${e(r.category)}" value="${e(r.id)}" data-price="${r.variants[0].price}">
    ${r.image?`<img src="${e(T(i,r.image))}" alt="" width="120" height="120" loading="lazy">`:"<span></span>"}
    <span class="kit-t"><b>${e(o(r.name))}</b><small>${r.mount&&r.mount!=="all"?e(l(r.mount)):e(t.shop.allMounts)}${o(r.variants[0].label)?` \xB7 ${e(o(r.variants[0].label))}`:""}</small></span>
    <span class="kit-p">${e(c(r.variants[0].price))}</span>
  </label></li>`};return`<section class="view" id="kit" data-view="kit" aria-labelledby="kt-title">
  <div class="view-head"><h2 id="kt-title" class="h1">${e(t.kit.title)}</h2><p class="muted">${e(y?t.kit.text.replace("{p}",y):t.kit.textNoDeal)}</p></div>
  <div class="card kit" data-kit>
    <h3 class="h3"><span class="n">1</span> ${e(t.kit.body)}</h3>
    <ul class="kit-list kit-list--body">${h.map(r=>v(r,"radio")).join("")}</ul>
    <h3 class="h3"><span class="n">2</span> ${e(t.kit.lens)}</h3>
    <p class="hint" data-kit-mount data-tpl="${e(t.kit.fits)}">${e(t.kit.pickBody)}</p>
    <ul class="kit-list">${f.map(r=>v(r,"checkbox")).join("")}</ul>
    ${d.length?`<h3 class="h3"><span class="n">3</span> ${e(t.kit.acc)}</h3><ul class="kit-list">${d.map(r=>v(r,"checkbox")).join("")}</ul>`:""}
    <dl class="sum">
      <div><dt>${e(t.kit.items)}</dt><dd data-k-items>0</dd></div>
      <div><dt>${e(t.kit.subtotal)}</dt><dd data-k-sub>\u2014</dd></div>
      ${y?`<div class="sum-save" data-k-save-row hidden><dt>${e(t.kit.save.replace("{p}",y))}</dt><dd data-k-save></dd></div>`:""}
      <div class="sum-total"><dt>${e(t.kit.total)}</dt><dd data-k-total>\u2014</dd></div>
    </dl>
    ${y?`<p class="hint" data-k-hint data-ok="${e(t.kit.dealOn)}" data-need="${e(t.kit.dealNeed)}">${e(t.kit.dealNeed)}</p>`:""}
    <button type="button" class="btn btn--primary btn--lg btn--full" data-kit-add disabled>${g("bag",18)} ${e(t.kit.add)}</button>
  </div>
</section>`}function Ce(a){var M,D,L,q;let{site:n,t,L:o,channels:i,gform:s,market:c,money:l,ship:h}=a,f=(M=n.contact)!=null?M:{},d=t.form,y=s?` data-gform="${e(s.action)}" data-gmap='${e(JSON.stringify(s.fields))}'`:"",v=t.orderText.replace(/\{\w+\}/g,"\u2026"),$=m=>i.map((k,C)=>{var z;return`<button type="submit" class="btn btn--lg btn--full ${m!=null?m:C?"btn--line":"btn--primary"}" data-channel="${e(k)}" data-href="${e(G(k,f,v))}">${g(k,18)} ${e(k==="phone"?d.call:d.send.replace("{channel}",(z=t.via[k])!=null?z:k))}</button>`}).join(""),r=encodeURIComponent((D=f.mapQuery)!=null?D:o(f.address)),b=m=>m.length===7?t.visit.everyDay:Q(m,t.days),p=((L=n.faq)!=null?L:[]).filter(m=>o(m==null?void 0:m.q)),x=h.free!=null?t.bag.shipFree.replace("{fee}",l(h.fee)).replace("{free}",l(h.free)):t.bag.shipFee.replace("{fee}",l(h.fee));return`<section class="view" id="bag" data-view="bag" aria-labelledby="bg-title">
  <div class="view-head"><h2 id="bg-title" class="h1">${e(t.bag.title)}</h2><p class="muted">${e(t.bag.text)}</p></div>
  <form class="card form" data-order novalidate${y} data-text="${e(t.orderText)}" data-market="${e(`${c.id.toUpperCase()} \xB7 ${c.currency}`)}" data-ship-label="${e(d.ship)}" data-pick-label="${e(d.pickup)}">
    <div class="order-fields">
      <ul class="bag-list" data-bag data-remove="${e(t.bag.remove)}" data-kit-tag="${e(t.bag.kitTag)}"></ul>
      <div class="bag-empty" data-bag-empty><p>${e(t.bag.empty)}</p><a class="btn btn--line" href="#shop">${g("camera",18)} ${e(t.quick.shop)}</a></div>
      <fieldset class="field"><legend>${e(d.how)}</legend><div class="opts">
        <label class="opt"><input type="radio" name="version" value="pickup" checked><span>${g("pin",16)} ${e(d.pickup)}</span></label>
        <label class="opt"><input type="radio" name="version" value="ship"><span>${g("truck",16)} ${e(d.ship)}</span></label>
      </div><p class="hint">${e(x)}</p></fieldset>
      <dl class="sum">
        <div><dt>${e(t.bag.subtotal)}</dt><dd data-b-sub>\u2014</dd></div>
        <div class="sum-save" data-b-save-row hidden><dt>${e(t.bag.kitSave)}</dt><dd data-b-save></dd></div>
        <div data-b-ship-row hidden><dt>${e(t.bag.ship)}</dt><dd data-b-ship></dd></div>
        <div class="sum-total"><dt>${e(t.bag.total)}</dt><dd data-b-total>\u2014</dd></div>
      </dl>
      <div class="row2">
        <label class="field"><span>${e(d.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(d.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
      </div>
      <label class="field" data-addr hidden><span>${e(d.address)} *</span><input name="address" autocomplete="street-address" maxlength="200"></label>
      <label class="field"><span>${e(d.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${e(d.noteHint)}"></textarea></label>
      <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
      <p class="form-err" data-err hidden>${e(d.required)}</p>
      <button class="btn btn--primary btn--lg btn--full" type="submit" data-submit>${g("check",18)} ${e(d.submit)}</button>
      <p class="hint">${e(d.privacy)}</p>
    </div>
    <div class="done" data-done hidden tabindex="-1">
      <p class="done-title">${g(s?"check":"arrow",22)} ${e(s?d.done:d.stepTitle)}</p>
      <p>${e(s?d.doneText:d.stepText)}</p>
      <div class="buy">${$(s?"btn--line":void 0)}</div>
      ${s?"":`<button type="button" class="link back" data-edit>${e(d.edit)}</button>`}
    </div>
    <p class="form-msg" role="status" hidden></p>
  </form>
  <div class="card visit" id="visit">
    <h3 class="h3">${e(t.visit.title)}</h3>
    ${o(f.address)?`<p class="addr">${g("pin",18)} <span>${e(o(f.address))}</span></p>`:""}
    ${((q=n.hours)!=null?q:[]).length?`<table class="hours"><tbody>${n.hours.map(m=>`<tr><th scope="row">${e(b(m.days))}</th><td>${e(m.open)} \u2013 ${e(m.close)}</td></tr>`).join("")}</tbody></table>`:""}
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <div class="actions">
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${e(t.visit.directions)} ${g("arrow",16)}</a>
      ${i.map(m=>{var k;return`<a class="btn btn--line" href="${e(G(m,f))}" ${K(m)}>${g(m,18)} ${e((k=t.via[m])!=null?k:m)}</a>`}).join("")}
    </div>
  </div>
  ${p.length?`<div class="block faq"><h2 class="h2">${e(t.faq.title)}</h2>${p.map((m,k)=>`<details${k===0?" open":""}><summary>${e(o(m.q))}</summary><p>${e(o(m.a))}</p></details>`).join("")}</div>`:""}
</section>`}function Le({site:a,t:n,L:t,market:o}){var c,l;let i=(c=a.contact)!=null?c:{},s=Object.entries((l=a.social)!=null?l:{}).filter(([,h])=>h);return`<footer class="footer">
  <p class="foot-name">${e(a.name)}</p>
  ${t(a.disclaimer)?`<p class="disclaimer">${e(t(a.disclaimer))}</p>`:""}
  <p>${i.phone?`${e(n.footer.hotline)}: <a href="tel:${j(i.phone)}">${e(i.phone)}</a>`:""}${i.email?` \xB7 <a href="mailto:${e(i.email)}">${e(i.email)}</a>`:""}</p>
  ${s.length?`<p class="social">${s.map(([h,f])=>`<a href="${e(f)}" target="_blank" rel="noopener">${e(h==="tiktok"?"TikTok":h==="youtube"?"YouTube":h[0].toUpperCase()+h.slice(1))}</a>`).join(" \xB7 ")}</p>`:""}
  <p class="foot-bottom"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${le(a,n,o.lang)}</p>
</footer>`}function qe({site:a,market:n,L:t,abs:o,products:i}){var c,l;let s=(c=a.contact)!=null?c:{};return{"@context":"https://schema.org","@type":"ElectronicsStore",name:a.name,url:o(`${n.id}/`),description:t(a.intro),image:o(F(a.heroImage||"photos/h-hero.webp")),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:t(s.address)},openingHoursSpecification:ee((l=a.hours)!=null?l:[]),makesOffer:i.map(h=>({"@type":"Offer",name:t(h.name),price:h.price,priceCurrency:n.currency,itemCondition:h.cond==="used"?"https://schema.org/UsedCondition":"https://schema.org/NewCondition"}))}}var Re=({site:a,L:n})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(t=>n(t==null?void 0:t.q)).map(t=>({"@type":"Question",name:n(t.q),acceptedAnswer:{"@type":"Answer",text:n(t.a)}}))});export{Ke as renderSite};
