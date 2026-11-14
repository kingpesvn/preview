var we={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t=(e="")=>String(e).replace(/[&<>"']/g,a=>we[a]);function U(e,a,n="vi"){var o,r,l;return e==null?"":typeof e!="object"?String(e):(l=(r=(o=e[a])!=null?o:e[n])!=null?r:Object.values(e)[0])!=null?l:""}var Me={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},W=e=>{var a;return(a=Me[e])!=null?a:"en-US"};function De(e,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(e)-.01);let n=Number(a)||1;return Math.max(n,Math.round(e/n)*n)}function P(e,a){var o,r;if(a.default)return e.basePrice;let n=(r=(o=e.prices)==null?void 0:o[a.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:De(e.basePrice*a.rate,a.rounding)}var Se=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function re(e,a){let n={style:"currency",currency:a.currency};return Se.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(W(a.lang),n).format(e)}function se(e="/"){let a=e.endsWith("/")?e:`${e}/`;return(n="")=>a+String(n).replace(/^\//,"")}var O=(e="")=>e.startsWith("uploads/")?e:/^([a-z]+:|\/)/i.test(e)?null:`assets/${e}`,B=(e,a)=>{let n=O(a);return n==null?a:e(n)},j=(e="")=>String(e).replace(/\D/g,"");function _(e,a,n=""){switch(e){case"phone":return`tel:${j(a.phone)}`;case"zalo":return`https://zalo.me/${j(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${j(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var K=e=>`<script type="application/ld+json">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`,Pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function ie(e){if(!e||typeof e!="string")return null;let a;try{a=new URL(e.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,l]of a.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=l.trim().replace(/^\{|\}$/g,"").toLowerCase();Pe.includes(i)&&(o[i]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var J={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ze={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(e,a=20,n="")=>{var o;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=ze[e])!=null?o:""}</svg>`},H=[1,2,3,4,5,6,0],Ne=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function le(e,a){let n=e.map(r=>H.indexOf(r)).sort((r,l)=>r-l);return n.every((r,l)=>l===0||r===n[l-1]+1)&&n.length>2?`${a[H[n[0]]]} \u2013 ${a[H[n.at(-1)]]}`:n.map(r=>a[H[r]]).join(", ")}var pe=e=>e.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>Ne[n]),opens:a.open,closes:a.close}));function de(e){var n,o;return(o=(n=new Intl.NumberFormat(W(e.lang),{style:"currency",currency:e.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:e.currency}var he=e=>e==="phone"||e==="email"?"":'target="_blank" rel="noopener"',ue=e=>`<div class="suggest" id="market-suggest" data-suggest="${t(e.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${t(e.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${t(e.market.dismiss)}">\xD7</button>
</div>`;var ce={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Te=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Ce=e=>{var a;try{let n=new URL(String((a=e.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&Te.test(n.hostname)?n.href:""}catch{return""}},me=(e,a,n,o="btn btn--line")=>{var i;let r=Ce(e);if(!r)return"";let l=typeof a.reviews=="object"&&((i=a.reviews)==null?void 0:i.google)||ce[n]||ce.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${t(r)}" target="_blank" rel="noopener">${m("star",16)} ${t(l)}</a></p>`},I={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ge={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},fe=e=>{var a;return((a=e.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ve(e,a){var l,i,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((l=e==null?void 0:e.date)!=null?l:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((c=ge[a])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${t(e.date)}">${t(r)}</time>`}function je(e,a){var i,c;let n=e.filter(p=>p.rating>=1&&p.rating<=5);if(n.length<2)return"";let o=n.reduce((p,d)=>p+Number(d.rating),0)/n.length,r=(i=I[a])!=null?i:I.en,l=new Intl.NumberFormat((c=ge[a])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${l}</strong><span>\xB7</span><span>${t(r.count.replace("{n}",String(e.length)))}</span></p>`}function be(e,a,n,o){var i;if(!e.length)return"";let r=(i=I[a])!=null?i:I.en,l=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${t(c==="prev"?r.prev:r.next)}">${m("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${je(e,a)}<div class="rv" data-rv data-rv-more="${t(r.more)}" data-rv-less="${t(r.less)}">
      <div class="${n} rv-track" tabindex="0">${e.map(o).join("")}</div>
      <div class="rv-nav" hidden>${l("prev")}${l("next")}</div>
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
upd()}})()<\/script>`;var ye=(e,a,n)=>e.badge===!1?"":`<a class="made" href="https://kingpes.net/${t(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${t(a.footer.madeWith)}</a>`;function $e({site:e,markets:a,url:n,abs:o}){var i;let r=(i=a.find(c=>c.default))!=null?i:a[0],l=a.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${t(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(e.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${a.map(c=>`<link rel="alternate" hreflang="${t(c.lang)}-${t(c.country)}" href="${o(`${c.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(l)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(c=>`<a href="${n(`${c.id}/`)}">${t(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Le="https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",Ee=["ac","fridge","wash","tv"],ke=e=>String(e!=null?e:"").split(`
`).map(a=>a.trim()).filter(Boolean);function lt({site:e,catalog:a,i18n:n,template:o,basePath:r="/",siteUrl:l=e.domain}){let i=se(r),c=s=>new URL(i(s),l).href,p=a.markets,d=ie(e.bookingForm),f=d&&!d.error?d:null,h=p.map(s=>{var R,L,u,T,E,q,Z,Y,X,Q,ee,te;let b=s.lang,x=(L=(R=n[b])!=null?R:n.en)!=null?L:n.vi,M=v=>U(v,b,"en"),g=(u=e.power)!=null?u:{},y=g.kwh?P({basePrice:g.kwh,prices:g.prices},s):null,S=((T=a.products)!=null?T:[]).map(v=>{var ae,ne,oe;let V=((ae=v.variants)!=null?ae:[]).map(D=>({...D,price:P(D,s),list:D.listPrice?P({basePrice:D.listPrice,prices:D.listPrices},s):null})).filter(D=>D.price!=null),G=v.install?P(v.install,s):null,xe=Number((oe=v.hours)!=null?oe:(ne=g.hours)==null?void 0:ne[v.category])||0;return{...v,variants:V,install:G,hours:xe,price:V.length?Math.min(...V.map(D=>D.price)):null}}).filter(v=>v.price!=null),w=(E=e.shipping)!=null?E:{},z={fee:(Z=P({basePrice:(q=w.fee)!=null?q:0,prices:w.prices},s))!=null?Z:0,free:w.freeFrom?P({basePrice:w.freeFrom,prices:w.freePrices},s):null},$=(Y=e.installment)!=null?Y:{},k=((X=$.months)!=null?X:[]).length?{months:Math.max(...$.months.map(Number).filter(Boolean)),from:$.from?P({basePrice:$.from,prices:$.fromPrices},s):0}:null,C=(ee=(Q=e.bookingChannels)==null?void 0:Q[s.id])!=null?ee:["phone"],N=v=>re(v,s),F=((te=e.rooms)!=null?te:[]).filter(v=>(v==null?void 0:v.id)&&M(v.name)&&S.some(V=>{var G;return((G=v.cats)!=null?G:[]).includes(V.category)})),A={site:e,catalog:a,market:s,markets:p,lang:b,t:x,L:M,url:i,abs:c,products:S,rooms:F,ship:z,inst:k,kwh:y,channels:C,money:N,template:o,gform:f};return{path:`${s.id}/index.html`,html:Be(A)}});return h.push({path:"index.html",html:$e({site:e,markets:p,url:i,abs:c})}),h}var qe=(e,a)=>e.watt&&e.hours&&a?{kwh:Math.round(e.watt*e.hours*30/1e3),cost:e.watt*e.hours*30*a/1e3}:null,Ve=(e,a,n)=>{var o;return e.cap?((o=a.unit[e.category])!=null?o:"{n}").replace("{n}",Number(e.cap).toLocaleString(n==="vi"?"vi-VN":n)):""};function Be(e){var z,$,k,C,N,F,A,R,L;let{site:a,market:n,markets:o,lang:r,t:l,L:i,url:c,abs:p,products:d,ship:f,inst:h,kwh:s}=e,b=`${a.name} \xB7 ${i(a.tagline)}`,x=(z=a.theme)!=null?z:{},M=["primary","ink","bg","surface","soft","accent"].filter(u=>x[u]).map(u=>`--${u}:${x[u]}`).join(";"),g=($=o.find(u=>u.default))!=null?$:o[0],y=o.map(u=>({id:u.id,lang:u.lang,country:u.country,currency:u.currency,href:c(`${u.id}/`)})),S=(k=a.contact)!=null?k:{},w=d.map(u=>{var T;return{id:u.id,c:u.category,n:i(u.name),cap:Number(u.cap)||0,i:(T=u.install)!=null?T:0,v:u.variants.map(E=>{var q;return[(q=i(E.label))!=null?q:"",E.price]})}});return`<!doctype html>
<html lang="${t(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t(b)}</title>
<meta name="description" content="${t(i(a.intro))}">
<link rel="canonical" href="${p(`${n.id}/`)}">
${o.map(u=>`<link rel="alternate" hreflang="${t(u.lang)}-${t(u.country)}" href="${p(`${u.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${g.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${t(b)}">
<meta property="og:description" content="${t(i(a.intro))}">
<meta property="og:url" content="${p(`${n.id}/`)}">
<meta property="og:site_name" content="${t(a.name)}">
<meta property="og:image" content="${t(p(O(a.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${t((C=x.bg)!=null?C:"#F3F6F8")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Le}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${M}}</style>
<noscript><style>.fit{display:none}</style></noscript>
${K(Je(e))}${((N=a.faq)!=null?N:[]).length?K(Ze(e)):""}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${t(n.id)}" data-markets='${t(JSON.stringify(y))}' data-wa="${t(j((F=S.whatsapp)!=null?F:""))}" data-email="${t((A=S.email)!=null?A:"")}" data-copied="${t(l.copied)}" data-store="${t(`kp-em-${String((R=a.name)!=null?R:"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`)}" data-currency="${t(n.currency)}" data-lang="${t(r)}" data-ship="${f.fee}" data-free="${(L=f.free)!=null?L:""}" data-kwh="${s!=null?s:""}"${h?` data-months="${h.months}" data-inst-from="${h.from}"`:""}>
<script type="application/json" id="em-data">${JSON.stringify(w).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${t(l.skip)}</a>
${ue(l)}
${Fe(e)}
<main id="main">
  ${Ae(e)}
  ${e.rooms.map((u,T)=>He(e,u,T)).join(`
`)}
  ${We(e)}
  ${Ie(e)}
  ${Ue(e)}
  ${_e(e)}
</main>
${Ke(e)}
<a class="cartfab" href="#cart" aria-label="${t(l.nav.cart)}">${m("bag",20)}<b data-bag-count hidden>0</b></a>
<p class="toast" data-toast role="status" hidden></p>
</body>
</html>
`}function Fe({site:e,market:a,markets:n,t:o,L:r,url:l,rooms:i}){return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${l(`${a.id}/`)}">
      ${e.logo?`<img src="${t(B(l,e.logo))}" alt="" width="36" height="36">`:`<span class="brand-mark" aria-hidden="true">${m("plug",20)}</span>`}
      <span>${t(e.name)}</span>
    </a>
    <nav class="nav" aria-label="${t(o.nav.label)}">${i.map(c=>`<a href="#${t(c.id)}">${t(r(c.name))}</a>`).join("")}<a href="#visit">${t(o.nav.visit)}</a></nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${t(o.market.label)}">${m("globe",16)}<span>${t(a.id.toUpperCase())}</span></summary>
        <ul>${n.map(c=>`<li><a href="${l(`${c.id}/`)}" hreflang="${t(c.lang)}"${c.id===a.id?' aria-current="true"':""}>${t(c.country)} \xB7 ${t(c.currency)} ${t(de(c))}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--ink btn--sm" href="#cart">${m("bag",16)} <span class="hide-sm">${t(o.nav.cart)}</span> <b class="count" data-bag-count hidden>0</b></a>
    </div>
  </div>
</header>`}function Ae({site:e,t:a,L:n,url:o,rooms:r}){var c,p;let l=ke(n(e.perks)).slice(0,3),i=[...r.map(d=>[`#${d.id}`,n(d.name)]),["#cart",a.cart.kicker]];return`<section class="hero">
  <img class="hero-img" src="${t(B(o,e.heroImage||"photos/h-hero.webp"))}" alt="" width="1600" height="1000" fetchpriority="high">
  <div class="wrap hero-copy">
    ${n(e.heroKicker)?`<p class="kicker">${t(n(e.heroKicker))}</p>`:""}
    <h1>${t(n(e.tagline))}</h1>
    ${n(e.intro)?`<p class="lead">${t(n(e.intro))}</p>`:""}
    <div class="actions"><a class="btn btn--accent btn--lg" href="#${t((p=(c=r[0])==null?void 0:c.id)!=null?p:"cart")}">${t(a.hero.shop)} ${m("arrow",18)}</a><a class="btn btn--ghost btn--lg" href="#visit">${t(a.hero.visit)}</a></div>
    ${l.length?`<ul class="perks-strip">${l.map(d=>`<li>${m("check",16)} ${t(d)}</li>`).join("")}</ul>`:""}
  </div>
  <ol class="wrap toc">${i.map(([d,f],h)=>`<li><a href="${d}"><span>${String(h+1).padStart(2,"0")}</span>${t(f)}</a></li>`).join("")}</ol>
</section>`}function Ge(e,{t:a}){let n=a.fit[e];if(!n)return"";let o={ac:18,fridge:4,wash:4,tv:2.5}[e];return`<div class="fit" data-fit="${e}" data-out="${t(n.out)}" data-none="${t(a.fit.none)}" hidden>
    <p class="fit-h">${m("ruler",18)} ${t(n.title)}</p>
    <label class="fit-in"><span>${t(n.label)}</span><input type="number" inputmode="decimal" min="1" max="${e==="ac"?120:e==="tv"?8:12}" step="${e==="tv"?.5:1}" value="${o}" data-fit-in><small>${t(n.unit)}</small></label>
    ${e==="ac"?`<label class="fit-sun"><input type="checkbox" data-fit-sun> ${t(n.sun)}</label>`:""}
    <p class="fit-out" data-fit-out aria-live="polite"></p>
  </div>`}function Oe(e,a){var x,M;let{t:n,L:o,url:r,money:l,kwh:i,inst:c,lang:p}=a,d=qe(e,i),f=e.variants[0],h=((x=e.specs)!=null?x:[]).map(g=>[o(g==null?void 0:g[0]),o(g==null?void 0:g[1])]).filter(([g,y])=>g&&y),s=e.price>=1e5?1e3:1,b=c&&e.price>=c.from?Math.ceil(e.price/c.months/s)*s:0;return`<li class="item" data-id="${t(e.id)}" data-c="${t(e.category)}" data-cap="${Number(e.cap)||0}">
    <div class="it-img">${e.image?`<img sizes="${J.card}" src="${t(B(r,e.image))}" alt="" width="800" height="800" loading="lazy">`:""}${o(e.badge)?`<span class="tag">${t(o(e.badge))}</span>`:""}</div>
    <div class="it-body">
      <p class="it-cat">${t((M=n.cats[e.category])!=null?M:"")}${e.cap?` \xB7 <b>${t(Ve(e,n,p))}</b>`:""}<span class="fit-mark">${m("check",14)} ${t(n.fit.fits)}</span></p>
      <h3>${t(o(e.name))}</h3>
      ${o(e.description)?`<p class="muted desc">${t(o(e.description))}</p>`:""}
      ${h.length?`<dl class="specs">${h.map(([g,y])=>`<div><dt>${t(g)}</dt><dd>${t(y)}</dd></div>`).join("")}</dl>`:""}
      ${d||b||e.install?`<ul class="meter">
        ${d?`<li>${m("bolt",15)} ${t(n.power.line.replace("{cost}",l(Math.round(d.cost))).replace("{kwh}",d.kwh).replace("{h}",e.hours))}</li>`:""}
        ${b?`<li data-per>${m("card",15)} ${t(n.inst.line.replace("{price}",l(b)).replace("{n}",c.months))}</li>`:""}
        ${e.install?`<li>${m("wrench",15)} ${t(n.install.line.replace("{price}",l(e.install)))}</li>`:""}
      </ul>`:""}
      ${e.variants.length>1?`<div class="vars" role="radiogroup" aria-label="${t(n.shop.version)}">${e.variants.map((g,y)=>`<label class="var"><input type="radio" name="v-${t(e.id)}" value="${y}"${y?"":" checked"}><span>${t(o(g.label))}</span></label>`).join("")}</div>`:""}
      <div class="it-buy">
        <p class="price"><b data-price>${t(l(f.price))}</b>${f.list&&f.list>f.price?` <s data-list>${t(l(f.list))}</s>`:""}</p>
        <button type="button" class="btn btn--ink" data-add="${t(e.id)}">${m("plus",16)} ${t(n.shop.add)}</button>
      </div>
    </div>
  </li>`}function He(e,a,n){var f;let{t:o,L:r,url:l,products:i}=e,c=i.filter(h=>{var s;return((s=a.cats)!=null?s:[]).includes(h.category)}),p=((f=a.cats)!=null?f:[]).filter(h=>c.some(s=>s.category===h)),d=Ee.includes(a.fit)&&c.some(h=>h.category===a.fit&&h.cap)?a.fit:"";return`<section class="chapter${n%2?" chapter--flip":""}" id="${t(a.id)}" aria-labelledby="${t(a.id)}-title">
  ${a.image?`<figure class="ch-pic"><img sizes="${J.wide}" src="${t(B(l,a.image))}" alt="" width="1000" height="1250" loading="lazy"></figure>`:""}
  <div class="ch-body">
    <p class="ch-n"><span class="num">${String(n+1).padStart(2,"0")}</span> <span>${t(o.ch.kicker)}</span></p>
    <h2 id="${t(a.id)}-title" class="h2">${t(r(a.name))}</h2>
    ${r(a.text)?`<p class="lead">${t(r(a.text))}</p>`:""}
    ${d?Ge(d,e):""}
    ${p.length>1?`<div class="chips" role="group" aria-label="${t(o.shop.type)}"><button type="button" class="chip" data-room-f="" aria-pressed="true">${t(o.shop.all)}</button>${p.map(h=>{var s;return`<button type="button" class="chip" data-room-f="${t(h)}" aria-pressed="false">${t((s=o.cats[h])!=null?s:h)}</button>`}).join("")}</div>`:""}
    <ul class="items">${c.map(h=>Oe(h,e)).join("")}</ul>
  </div>
</section>`}function Ie({site:e,t:a,L:n}){var l;let o=((l=e.services)!=null?l:[]).filter(i=>n(i==null?void 0:i.name)),r=ke(n(e.perks));return!o.length&&!r.length?"":`<section class="sec" id="services" aria-labelledby="sv-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${t(a.services.kicker)}</p><h2 id="sv-title" class="h2">${t(a.services.title)}</h2></div>
    ${o.length?`<ol class="svc">${o.map((i,c)=>`<li><span class="svc-n">${String(c+1).padStart(2,"0")}</span><div><h3>${t(n(i.name))}</h3>${n(i.text)?`<p class="muted">${t(n(i.text))}</p>`:""}</div></li>`).join("")}</ol>`:""}
    ${r.length?`<ul class="perks">${r.map(i=>`<li>${m("check",16)} ${t(i)}</li>`).join("")}</ul>`:""}
  </div>
</section>`}function Ue({site:e,t:a,L:n,lang:o}){let r=me(e,a,o,"btn btn--line"),l=fe(e);return e.showReviews===!1||!l.length&&!r?"":`<section class="sec sec--soft" aria-labelledby="rv-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rv-title" class="h2">${t(a.reviews.title)}</h2></div>
    ${be(l,o,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${t(i.rating)}/5">${Array.from({length:5},(c,p)=>`<span class="${p<i.rating?"on":""}">${m("star",14)}</span>`).join("")}</p>
      <blockquote>${t(n(i.text))}</blockquote>
      <figcaption>${t(i.name)}${n(i.bought)?`<small>${t(n(i.bought))}</small>`:""}${ve(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function We(e){var y,S,w,z;let{t:a,channels:n,gform:o,market:r,money:l,ship:i,site:c,rooms:p,L:d,inst:f}=e,h=(y=c.contact)!=null?y:{},s=a.form,b=o?` data-gform="${t(o.action)}" data-gmap='${t(JSON.stringify(o.fields))}'`:"",x=a.orderText.replace(/\{\w+\}/g,"\u2026"),M=$=>n.map((k,C)=>{var N;return`<button type="submit" class="btn btn--full ${$!=null?$:C?"btn--line":"btn--ink"}" data-channel="${t(k)}" data-href="${t(_(k,h,x))}">${m(k,18)} ${t(k==="phone"?s.call:s.send.replace("{channel}",(N=a.via[k])!=null?N:k))}</button>`}).join(""),g=i.free!=null?a.bag.shipFree.replace("{fee}",l(i.fee)).replace("{free}",l(i.free)):a.bag.shipFee.replace("{fee}",l(i.fee));return`<section class="chapter chapter--cart" id="cart" aria-labelledby="c-title">
  <div class="ch-body wrap">
    <p class="ch-n"><span class="num">${String(p.length+1).padStart(2,"0")}</span> <span>${t(a.cart.kicker)}</span></p>
    <h2 id="c-title" class="h2">${t(a.bag.title)}</h2>
    <p class="lead">${t(a.bag.text)}</p>
    <form class="order" data-order novalidate${b} data-text="${t(a.orderText)}" data-market="${t(`${r.id.toUpperCase()} \xB7 ${r.currency}`)}" data-ship-label="${t(s.ship)}" data-pick-label="${t(s.pickup)}" data-inst-label="${t(a.install.tag)}">
      <div class="order-fields">
        <div class="order-l">
          <ul class="bag-list" data-bag data-remove="${t(a.bag.remove)}" data-install="${t(a.install.ask)}"></ul>
          <div class="bag-empty" data-bag-empty><p>${t(a.bag.empty)}</p><a class="btn btn--line" href="#${t((w=(S=p[0])==null?void 0:S.id)!=null?w:"main")}">${t(a.hero.shop)}</a></div>
          <dl class="sum">
            <div><dt>${t(a.bag.subtotal)}</dt><dd data-b2-sub>\u2014</dd></div>
            <div data-b2-fee-row hidden><dt>${t(a.install.title)}</dt><dd data-b2-fee></dd></div>
            <div data-b2-ship-row hidden><dt>${t(a.bag.ship)}</dt><dd data-b2-ship></dd></div>
            <div class="sum-total"><dt>${t(a.bag.total)}</dt><dd data-b2-total>\u2014</dd></div>
          </dl>
          ${f?`<p class="inst-note" data-b2-inst data-tpl="${t(a.inst.cart)}" hidden></p><p class="hint">${t(d((z=c.installment)==null?void 0:z.text)||a.inst.note)}</p>`:""}
        </div>
        <div class="order-r">
          <fieldset class="field"><legend>${t(s.how)}</legend><div class="seg">
            <label><input type="radio" name="version" value="ship" checked><span>${t(s.ship)}</span></label>
            <label><input type="radio" name="version" value="pickup"><span>${t(s.pickup)}</span></label>
          </div><p class="hint">${t(g)}</p></fieldset>
          <label class="field"><span>${t(s.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${t(s.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          <label class="field" data-addr><span>${t(s.address)} *</span><input name="address" autocomplete="street-address" maxlength="200"></label>
          <label class="field"><span>${t(s.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${t(s.noteHint)}"></textarea></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          <p class="form-err" data-err hidden>${t(s.required)}</p>
          <button class="btn btn--accent btn--lg btn--full" type="submit" data-submit>${m("check",18)} ${t(s.submit)}</button>
          <p class="hint">${t(s.privacy)}</p>
        </div>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m(o?"check":"arrow",22)} ${t(o?s.done:s.stepTitle)}</p>
        <p>${t(o?s.doneText:s.stepText)}</p>
        <div class="buy">${M(o?"btn--line":void 0)}</div>
        ${o?"":`<button type="button" class="link back" data-edit>${t(s.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function _e({site:e,t:a,L:n,channels:o}){var p,d,f,h;let r=(p=e.contact)!=null?p:{},l=encodeURIComponent((d=r.mapQuery)!=null?d:n(r.address)),i=s=>s.length===7?a.visit.everyDay:le(s,a.days),c=((f=e.faq)!=null?f:[]).filter(s=>n(s==null?void 0:s.q));return`<section class="sec" id="visit" aria-labelledby="v-title">
  <div class="wrap visit">
    <div class="visit-info">
      <p class="kicker">${t(a.visit.kicker)}</p>
      <h2 id="v-title" class="h2">${t(a.visit.title)}</h2>
      ${n(r.address)?`<p class="addr">${m("pin",18)} ${t(n(r.address))}</p>`:""}
      ${((h=e.hours)!=null?h:[]).length?`<table class="hours"><tbody>${e.hours.map(s=>`<tr><th scope="row">${t(i(s.days))}</th><td>${t(s.open)} \u2013 ${t(s.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <p class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${l}" target="_blank" rel="noopener">${t(a.visit.directions)} ${m("arrow",16)}</a>
        ${o.map(s=>{var b;return`<a class="btn btn--line" href="${t(_(s,r))}" ${he(s)}>${m(s,18)} ${t((b=a.via[s])!=null?b:s)}</a>`}).join("")}
      </p>
    </div>
    <div class="map"><iframe title="${t(a.visit.title)}" src="https://www.google.com/maps?q=${l}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
  ${c.length?`<div class="wrap faq"><h2 class="h3">${t(a.faq.title)}</h2><div>${c.map((s,b)=>`<details${b===0?" open":""}><summary>${t(n(s.q))}</summary><p>${t(n(s.a))}</p></details>`).join("")}</div></div>`:""}
</section>`}function Ke({site:e,t:a,L:n,market:o}){var i,c;let r=(i=e.contact)!=null?i:{},l=Object.entries((c=e.social)!=null?c:{}).filter(([,p])=>p);return`<footer class="footer"><div class="wrap">
  <p class="foot-name">${t(e.name)}</p>
  ${n(e.disclaimer)?`<p class="disclaimer">${t(n(e.disclaimer))}</p>`:""}
  <p>${r.phone?`${t(a.footer.hotline)}: <a href="tel:${j(r.phone)}">${t(r.phone)}</a>`:""}${r.email?` \xB7 <a href="mailto:${t(r.email)}">${t(r.email)}</a>`:""}</p>
  ${l.length?`<p class="social">${l.map(([p,d])=>`<a href="${t(d)}" target="_blank" rel="noopener">${t(p==="tiktok"?"TikTok":p==="youtube"?"YouTube":p[0].toUpperCase()+p.slice(1))}</a>`).join(" \xB7 ")}</p>`:""}
  </div>
  <div class="wrap foot-bottom${e.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${t(e.name)}</span>${ye(e,a,o.lang)}</div>
</footer>`}function Je({site:e,market:a,L:n,abs:o,products:r}){var i,c;let l=(i=e.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"ElectronicsStore",name:e.name,url:o(`${a.id}/`),description:n(e.intro),image:o(O(e.heroImage||"photos/h-hero.webp")),telephone:l.phone,email:l.email,address:{"@type":"PostalAddress",streetAddress:n(l.address)},openingHoursSpecification:pe((c=e.hours)!=null?c:[]),makesOffer:r.map(p=>({"@type":"Offer",name:n(p.name),price:p.price,priceCurrency:a.currency,itemCondition:"https://schema.org/NewCondition"}))}}var Ze=({site:e,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:e.faq.filter(n=>a(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:a(n.q),acceptedAnswer:{"@type":"Answer",text:a(n.a)}}))});export{lt as renderSite};
