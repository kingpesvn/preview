var te={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t=(e="")=>String(e).replace(/[&<>"']/g,a=>te[a]);function T(e,a,n="vi"){var r,l,s;return e==null?"":typeof e!="object"?String(e):(s=(l=(r=e[a])!=null?r:e[n])!=null?l:Object.values(e)[0])!=null?s:""}var ae={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},R=e=>{var a;return(a=ae[e])!=null?a:"en-US"};function ne(e,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(e)-.01);let n=Number(a)||1;return Math.max(n,Math.round(e/n)*n)}function A(e,a){var r,l;if(a.default)return e.basePrice;let n=(l=(r=e.prices)==null?void 0:r[a.id])!=null?l:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ne(e.basePrice*a.rate,a.rounding)}var oe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function F(e,a){let n={style:"currency",currency:a.currency};return oe.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(R(a.lang),n).format(e)}function O(e="/"){let a=e.endsWith("/")?e:`${e}/`;return(n="")=>a+String(n).replace(/^\//,"")}var re=(e="")=>e.startsWith("uploads/")?e:/^([a-z]+:|\/)/i.test(e)?null:`assets/${e}`,N=(e,a)=>{let n=re(a);return n==null?a:e(n)},k=(e="")=>String(e).replace(/\D/g,"");function P(e,a,n=""){switch(e){case"phone":return`tel:${k(a.phone)}`;case"zalo":return`https://zalo.me/${k(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${k(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var G=e=>`<script type="application/ld+json">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`,ie=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function H(e){if(!e||typeof e!="string")return null;let a;try{a=new URL(e.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let r={};for(let[l,s]of a.searchParams){if(!/^entry\.\d+$/.test(l))continue;let o=s.trim().replace(/^\{|\}$/g,"").toLowerCase();ie.includes(o)&&(r[o]=l)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var se={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(e,a=20,n="")=>{var r;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(r=se[e])!=null?r:""}</svg>`},j=[1,2,3,4,5,6,0],le=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function U(e,a){let n=e.map(l=>j.indexOf(l)).sort((l,s)=>l-s);return n.every((l,s)=>s===0||l===n[s-1]+1)&&n.length>2?`${a[j[n[0]]]} \u2013 ${a[j[n.at(-1)]]}`:n.map(l=>a[j[l]]).join(", ")}var W=e=>e.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>le[n]),opens:a.open,closes:a.close}));function _(e){var n,r;return(r=(n=new Intl.NumberFormat(R(e.lang),{style:"currency",currency:e.currency}).formatToParts(0).find(l=>l.type==="currency"))==null?void 0:n.value)!=null?r:e.currency}var q=e=>e==="phone"||e==="email"?"":'target="_blank" rel="noopener"',K=e=>`<div class="suggest" id="market-suggest" data-suggest="${t(e.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${t(e.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${t(e.market.dismiss)}">\xD7</button>
</div>`,E=(e,a)=>{var n;return`<p class="status" data-open-status data-hours='${t(JSON.stringify(e.hours))}' data-tz="${t((n=e.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${t(a.visit.open)}" data-closed="${t(a.visit.closed)}" hidden></p>`},I={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ce=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,pe=e=>{var a;try{let n=new URL(String((a=e.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&ce.test(n.hostname)?n.href:""}catch{return""}},J=(e,a,n,r="btn btn--line")=>{var o;let l=pe(e);if(!l)return"";let s=typeof a.reviews=="object"&&((o=a.reviews)==null?void 0:o.google)||I[n]||I.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${t(l)}" target="_blank" rel="noopener">${u("star",16)} ${t(s)}</a></p>`},C={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},Z={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},L=e=>{var a;return((a=e.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function Y(e,a){var s,o,i;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=e==null?void 0:e.date)!=null?s:"").trim());if(!n)return"";let r=new Date(Date.UTC(+n[1],+n[2]-1,+((o=n[3])!=null?o:1)));if(Number.isNaN(r.getTime()))return"";let l=new Intl.DateTimeFormat((i=Z[a])!=null?i:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${t(e.date)}">${t(l)}</time>`}function de(e,a){var o,i;let n=e.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let r=n.reduce((c,p)=>c+Number(p.rating),0)/n.length,l=(o=C[a])!=null?o:C.en,s=new Intl.NumberFormat((i=Z[a])!=null?i:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${t(l.count.replace("{n}",String(e.length)))}</span></p>`}function X(e,a,n,r){var o;if(!e.length)return"";let l=(o=C[a])!=null?o:C.en,s=i=>`<button type="button" class="rv-btn" data-rv-${i} aria-label="${t(i==="prev"?l.prev:l.next)}">${u("arrow",18,i==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${de(e,a)}<div class="rv" data-rv data-rv-more="${t(l.more)}" data-rv-less="${t(l.less)}">
      <div class="${n} rv-track" tabindex="0">${e.map(r).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${he}`}var he=`<style>
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
upd()}})()<\/script>`;var Q=(e,a,n)=>e.badge===!1?"":`<a class="made" href="https://kingpes.net/${t(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${t(a.footer.madeWith)}</a>`;function ee({site:e,markets:a,url:n,abs:r}){var o;let l=(o=a.find(i=>i.default))!=null?o:a[0],s=a.map(i=>({id:i.id,lang:i.lang,country:i.country}));return`<!doctype html>
<html lang="${t(l.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(e.name)}</title>
<link rel="canonical" href="${r(`${l.id}/`)}">
${a.map(i=>`<link rel="alternate" hreflang="${t(i.lang)}-${t(i.country)}" href="${r(`${i.id}/`)}">`).join(`
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
<body><p>${a.map(i=>`<a href="${n(`${i.id}/`)}">${t(i.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ue="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",B=12,me=["clinic","equip","care"];function ge(e,a){var n;return((n=e.products)!=null?n:[]).map(r=>{var l;return{...r,variants:((l=r.variants)!=null?l:[]).map(s=>({...s,price:A(s,a)})).filter(s=>s.price!=null)}}).filter(r=>r.variants.length>0)}function He({site:e,catalog:a,i18n:n,template:r,basePath:l="/",siteUrl:s=e.domain}){let o=O(l),i=m=>new URL(o(m),s).href,c=a.markets,p=H(e.bookingForm),g=p&&!p.error?p:null,y=c.map(m=>{var $,h,d,v;let f=m.lang,b=(h=($=n[f])!=null?$:n.en)!=null?h:n.vi,w=z=>T(z,f,"en"),M=ge(a,m),D=(v=(d=e.bookingChannels)==null?void 0:d[m.id])!=null?v:["phone"],x={site:e,catalog:a,market:m,markets:c,lang:f,t:b,L:w,url:o,abs:i,services:M,channels:D,money:z=>F(z,m),template:r,gform:g};return{path:`${m.id}/index.html`,html:ve(x)}});return y.push({path:"index.html",html:ee({site:e,markets:c,url:o,abs:i})}),y}var V=(e,a)=>e.heroImage?N(a,e.heroImage):a("assets/photos/hero.webp"),fe=e=>Math.min(...e.variants.map(a=>a.price));function ve(e){var w,M,D,S,x,$;let{site:a,market:n,markets:r,lang:l,t:s,L:o,url:i,abs:c}=e,p=`${a.name} \xB7 ${o(a.tagline)}`,g=(w=a.theme)!=null?w:{},y=["primary","ink","bg","surface","soft","accent"].filter(h=>g[h]).map(h=>`--${h}:${g[h]}`).join(";"),m=(M=r.find(h=>h.default))!=null?M:r[0],f=r.map(h=>({id:h.id,lang:h.lang,country:h.country,currency:h.currency,href:i(`${h.id}/`)})),b=(D=a.contact)!=null?D:{};return`<!doctype html>
<html lang="${t(l)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t(p)}</title>
<meta name="description" content="${t(o(a.intro))}">
<link rel="canonical" href="${c(`${n.id}/`)}">
${r.map(h=>`<link rel="alternate" hreflang="${t(h.lang)}-${t(h.country)}" href="${c(`${h.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${m.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${t(p)}">
<meta property="og:description" content="${t(o(a.intro))}">
<meta property="og:url" content="${c(`${n.id}/`)}">
<meta property="og:site_name" content="${t(a.name)}">
<meta property="og:image" content="${t(new URL(V(a,i),c("")).href)}">
<meta name="theme-color" content="${t((S=g.primary)!=null?S:"#1C6FB8")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ue}">
<link rel="stylesheet" href="${i("assets/style.css")}">
<style>:root{${y}}</style>
<noscript><style>.album .more{display:block}.album-more,.chips{display:none}</style></noscript>
${G(je(e))}
<script src="${i("assets/site.js")}" defer><\/script>
</head>
<body data-market="${t(n.id)}" data-markets='${t(JSON.stringify(f))}' data-wa="${t(k(b.whatsapp))}" data-email="${t((x=b.email)!=null?x:"")}" data-copied="${t(s.booking.copied)}">
<a class="skip" href="#main">${t(s.skip)}</a>
${K(s)}
${be(e)}
<main id="main">
${ye(e)}
${$e(e)}
${xe(e)}
${ke(e)}
${we(e)}
${Me(e)}
${De(e)}
${Se(e)}
${ze(e)}
${Ne(e)}
</main>
${Pe(e)}
<nav class="dock" aria-label="${t(s.nav.book)}">
  <a href="${t(P(e.channels[0],b))}" ${q(e.channels[0])}>${u(e.channels[0],20)}<span>${t(($=s.via[e.channels[0]])!=null?$:"")}</span></a>
  <a class="primary" href="#booking">${u("calendar",20)}<span>${t(s.nav.book)}</span></a>
</nav>
</body>
</html>
`}function be({site:e,market:a,markets:n,t:r,url:l}){let s=[["#services",r.nav.services],["#prices",r.nav.prices],["#team",r.nav.team],["#visit",r.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${l(`${a.id}/`)}">
      ${e.logo?`<img src="${t(N(l,e.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("shield",22)}</span>`}
      <span>${t(e.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([o,i])=>`<a href="${o}">${t(i)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${t(r.market.label)}">${u("globe",18)}<span>${t(a.id.toUpperCase())}<span class="cur"> \xB7 ${t(_(a))}</span></span></summary>
        <ul>${n.map(o=>`<li><a href="${l(`${o.id}/`)}" hreflang="${t(o.lang)}"${o.id===a.id?' aria-current="true"':""}>${t(o.country)} \xB7 ${t(o.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-sm" href="#booking">${t(r.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${t(r.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${[...s,["#booking",r.nav.book]].map(([o,i])=>`<a href="${o}">${t(i)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ye({site:e,t:a,L:n,url:r}){var o,i;let l=((o=e.stats)!=null?o:[]).filter(c=>c==null?void 0:c.value),s=(i=e.contact)!=null?i:{};return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${n(e.place)?`<p class="eyebrow">${t(n(e.place))}</p>`:""}
      <h1>${t(n(e.tagline))}</h1>
      ${n(e.intro)?`<p class="lead">${t(n(e.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#booking">${u("calendar",18)} ${t(a.hero.book)}</a>
        ${s.phone?`<a class="btn btn--line btn--lg" href="tel:${k(s.phone)}">${u("phone",18)} ${t(s.phone)}</a>`:""}
      </div>
      ${E(e,a)}
    </div>
    <figure class="hero-img">
      <img src="${t(V(e,r))}" alt="${t(e.name)}" width="1200" height="900" fetchpriority="high">
      ${l.length?`<ul class="stats">${l.map(c=>`<li><b>${t(c.value)}</b><span>${t(n(c.label))}</span></li>`).join("")}</ul>`:""}
    </figure>
  </div>
</section>`}function $e({site:e,t:a,L:n}){var l;let r=((l=e.promises)!=null?l:[]).filter(s=>n(s==null?void 0:s.title));return r.length?`<section class="section section--soft" aria-labelledby="prom-title">
  <div class="wrap">
    <h2 id="prom-title" class="h2">${t(a.promises.title)}</h2>
    <ul class="prom">${r.map(s=>{var o;return`<li><span class="prom-i">${u((o=s.icon)!=null?o:"check",24)}</span><h3>${t(n(s.title))}</h3>${n(s.text)?`<p class="muted">${t(n(s.text))}</p>`:""}</li>`}).join("")}</ul>
  </div>
</section>`:""}function xe({services:e,t:a,L:n,url:r,money:l}){let s=e.filter(o=>o.featured&&o.image).slice(0,4);return s.length?`<section class="section" id="services" aria-labelledby="feat-title">
  <div class="wrap">
    <div class="head"><h2 id="feat-title" class="h2">${t(a.services.title)}</h2><p class="muted">${t(a.services.text)}</p></div>
    <div class="feat">${s.map(o=>`<article class="feat-card">
      <figure><img sizes="auto, (max-width: 640px) 100vw, 280px" src="${t(N(r,o.image))}" alt="${t(n(o.name))}" width="1000" height="750" loading="lazy">${o.tag?`<span class="tag">${t(n(o.tag))}</span>`:""}</figure>
      <div class="feat-body">
        <h3>${t(n(o.name))}</h3>
        ${n(o.description)?`<p class="muted">${t(n(o.description))}</p>`:""}
        <p class="from">${a.services.from.replace("{price}",`<strong>${t(l(fe(o)))}</strong>`)}</p>
        <button type="button" class="link" data-pick="${t(o.id)}">${t(a.services.book)} ${u("arrow",14)}</button>
      </div>
    </article>`).join("")}</div>
  </div>
</section>`:""}function ke({services:e,catalog:a,t:n,L:r,money:l}){var o;let s=((o=a.categories)!=null?o:[]).filter(i=>e.some(c=>c.category===i.id));return s.length?`<section class="section section--soft" id="prices" aria-labelledby="price-title">
  <div class="wrap">
    <div class="head"><h2 id="price-title" class="h2">${t(n.prices.title)}</h2><p class="muted">${t(n.prices.note)}</p></div>
    <div class="menu">${s.map(i=>`<div class="menu-cat">
      <h3>${t(r(i.name))}</h3>
      <table class="ptable"><tbody>${e.filter(c=>c.category===i.id).flatMap(c=>c.variants.map((p,g)=>`<tr>
        <th scope="row">${g===0?`<span class="nm">${t(r(c.name))}</span>`:""}${c.variants.length>1||r(p.label)?`<small>${t(r(p.label))}</small>`:""}</th>
        <td>${t(l(p.price))}</td></tr>`)).join("")}</tbody></table>
    </div>`).join("")}</div>
  </div>
</section>`:""}function we({site:e,t:a,L:n}){var s;let r=((s=e.team)!=null?s:[]).filter(o=>o==null?void 0:o.name);if(!r.length)return"";let l=o=>o.replace(/^(BS|Dr)\.?\s*/i,"").split(/\s+/).map(i=>i[0]).slice(-2).join("").toUpperCase();return`<section class="section" id="team" aria-labelledby="team-title">
  <div class="wrap">
    <h2 id="team-title" class="h2">${t(a.team.title)}</h2>
    <div class="team">${r.map((o,i)=>`<figure class="doc">
      <div class="doc-ph tone-${i%3}">${o.photo?`<img src="${t(o.photo)}" alt="${t(o.name)}" loading="lazy">`:`<span aria-hidden="true">${t(l(o.name))}</span>`}</div>
      <figcaption><strong>${t(o.name)}</strong><span>${t(n(o.role))}</span>${o.years?`<span class="muted">${t(a.team.years.replace("{n}",o.years))}</span>`:""}</figcaption>
    </figure>`).join("")}</div>
  </div>
</section>`}function Me({site:e,t:a,url:n}){var o;let r=((o=e.album)!=null?o:[]).filter(i=>i==null?void 0:i.image);if(!r.length)return"";let l=i=>r.filter(c=>c.tag===i).length,s=[["",a.album.all,r.length],...me.filter(l).map(i=>[i,a.album.tags[i],l(i)])];return`<section class="section section--soft" id="album" aria-labelledby="album-title">
  <div class="wrap">
    <div class="head"><h2 id="album-title" class="h2">${t(a.album.title)}</h2><p class="muted">${t(a.album.text)}</p></div>
    ${s.length>2?`<div class="chips" role="group" aria-label="${t(a.album.filter)}">${s.map(([i,c,p],g)=>`<button type="button" class="chip" data-tag="${i}" aria-pressed="${g===0}">${t(c)} <span>${p}</span></button>`).join("")}</div>`:""}
    <div class="album" data-album>${r.map((i,c)=>{var g;let p=t(N(n,i.image));return`<a class="ph${c>=B?" more":""}" href="${p}" data-i="${c}" data-t="${t((g=i.tag)!=null?g:"")}"><img sizes="auto, (max-width: 640px) 50vw, 300px" src="${p}" alt="${t(`${e.name} ${c+1}`)}" width="1000" height="750" loading="lazy"></a>`}).join("")}</div>
    ${r.length>B?`<p class="center"><button type="button" class="btn btn--line album-more" data-album-more>${t(a.album.more)} <span data-left>(${r.length-B})</span></button></p>`:""}
  </div>
  <dialog class="lb" data-lightbox aria-label="${t(a.album.title)}">
    <img alt="" data-lb-img>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${t(a.album.close)}">\u2715</button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${t(a.album.prev)}">${u("arrow",22,'style="transform:scaleX(-1)"')}</button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${t(a.album.next)}">${u("arrow",22)}</button>
    <p class="lb-count" data-lb-count></p>
  </dialog>
</section>`}function De({site:e,t:a,L:n,lang:r}){let l=J(e,a,r,"btn btn--line"),s=L(e);return e.showReviews===!1||!s.length&&!l?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${t(a.reviews)}</h2>
    ${X(s,r,"quotes",o=>`<figure class="quote">
      ${o.rating?`<div class="stars" aria-label="${o.rating}/5">${Array.from({length:5},(i,c)=>`<span class="${c<o.rating?"on":""}">${u("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${t(n(o.text))}</blockquote>
      <figcaption>${t(o.name)}${Y(o,r)}</figcaption>
    </figure>`)}${l}
  </div>
</section>`}function Se({site:e,services:a,catalog:n,t:r,L:l,channels:s,gform:o}){var S,x,$,h;let i=r.booking,c=(S=e.contact)!=null?S:{},p=($=(x=e.hours)==null?void 0:x[0])!=null?$:{open:"08:00",close:"20:00"},g=[],[y,m]=p.open.split(":").map(Number),[f,b]=p.close.split(":").map(Number);for(let d=y*60+m;d<=f*60+b-30;d+=30)g.push(`${String(Math.floor(d/60)).padStart(2,"0")}:${String(d%60).padStart(2,"0")}`);let w=((h=n.categories)!=null?h:[]).filter(d=>a.some(v=>v.category===d.id)),M=o?` data-gform="${t(o.action)}" data-gmap='${t(JSON.stringify(o.fields))}'`:"",D=s.map((d,v)=>{var z;return`<button type="button" class="btn ${v===0?"btn--primary":"btn--line"}" data-channel="${t(d)}" data-href="${t(P(d,c,""))}">${u(d,18)} ${t((z=r.via[d])!=null?z:d)}</button>`}).join("");return`<section class="section section--deep" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="booking-copy">
      <h2 id="book-title" class="h2">${t(i.title)}</h2>
      <p class="lead">${t(i.text)}</p>
      <div class="actions">${s.map(d=>{var v;return`<a class="btn btn--light" href="${t(P(d,c))}" ${q(d)}>${u(d,18)} ${t((v=r.via[d])!=null?v:d)}</a>`}).join("")}</div>
    </div>
    <form class="card form" data-book novalidate${M} data-order-text="${t(i.message)}">
      <div class="book-fields">
        <label class="field"><span>${t(i.service)}</span><select name="product">
          <option value="${t(i.notSure)}">${t(i.notSure)}</option>
          ${w.map(d=>`<optgroup label="${t(l(d.name))}">${a.filter(v=>v.category===d.id).map(v=>`<option value="${t(l(v.name))}" data-id="${t(v.id)}">${t(l(v.name))}</option>`).join("")}</optgroup>`).join("")}
        </select></label>
        <div class="row2">
          <label class="field"><span>${t(i.date)}</span><input name="day" type="date"></label>
          <label class="field"><span>${t(i.time)}</span><select name="time">${g.map(d=>`<option>${d}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <label class="field"><span>${t(i.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${t(i.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${t(i.note)}</span><textarea name="note" rows="2" maxlength="400" placeholder="${t(i.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${t(i.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${t(i.sending)}">${u("calendar",18)} ${t(i.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${u(o?"check":"arrow",22)} ${t(o?i.done:i.stepTitle)}</p>
        <p>${t(o?i.doneText:i.stepText)}</p>
        ${o?"":`<div class="buy">${D}</div><button type="button" class="link" data-edit>${t(i.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function ze({site:e,t:a,L:n}){var o,i,c;let r=(o=e.contact)!=null?o:{},l=encodeURIComponent((i=r.mapQuery)!=null?i:n(r.address)),s=p=>p.length===7?a.everyDay:U(p,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${t(a.visit.title)}</h2>
      ${E(e,a)}
      ${((c=e.hours)!=null?c:[]).length?`<table class="hours"><tbody>${e.hours.map(p=>`<tr><th scope="row">${t(s(p.days))}</th><td>${t(p.open)} \u2013 ${t(p.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${u("pin",18)} ${t(n(r.address))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${l}" target="_blank" rel="noopener">${t(a.visit.directions)} ${u("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${t(a.visit.title)}" src="https://www.google.com/maps?q=${l}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ne({site:e,t:a,L:n}){var l;let r=((l=e.faq)!=null?l:[]).filter(s=>n(s==null?void 0:s.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${t(a.faq.title)}</h2>
    <div class="qa">${r.map((s,o)=>`<details${o===0?" open":""}><summary>${t(n(s.q))}</summary><p>${t(n(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Pe({site:e,t:a,L:n,market:r}){var o,i;let l=(o=e.contact)!=null?o:{},s=Object.entries((i=e.social)!=null?i:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${t(e.name)}</p><p class="muted">${t(n(e.tagline))}</p></div>
    <div><p class="foot-h">${t(a.footer.contact)}</p><ul>
      ${l.phone?`<li><a href="tel:${k(l.phone)}">${t(l.phone)}</a></li>`:""}
      ${l.email?`<li><a href="mailto:${t(l.email)}">${t(l.email)}</a></li>`:""}
      ${n(l.address)?`<li>${t(n(l.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${t(a.footer.follow)}</p><ul>${s.map(([c,p])=>`<li><a href="${t(p)}" target="_blank" rel="noopener">${t(c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${e.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${t(e.name)}</span>${Q(e,a,r.lang)}</div>
</footer>`}function je({site:e,market:a,L:n,abs:r,url:l,services:s,catalog:o}){var p,g,y;let i=(p=e.contact)!=null?p:{},c=L(e).filter(m=>m.rating);return{"@context":"https://schema.org","@type":"Dentist",name:e.name,url:r(`${a.id}/`),description:n(e.intro),image:new URL(V(e,l),r("")).href,telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:n(i.address)},openingHoursSpecification:W((g=e.hours)!=null?g:[]),currenciesAccepted:a.currency,hasOfferCatalog:{"@type":"OfferCatalog",name:e.name,itemListElement:((y=o.categories)!=null?y:[]).filter(m=>s.some(f=>f.category===m.id)).map(m=>({"@type":"OfferCatalog",name:n(m.name),itemListElement:s.filter(f=>f.category===m.id).flatMap(f=>f.variants.map(b=>({"@type":"Offer",name:`${n(f.name)}${n(b.label)?` (${n(b.label)})`:""}`,price:b.price,priceCurrency:a.currency,itemOffered:{"@type":"MedicalProcedure",name:n(f.name),description:n(f.description)}})))}))},...c.length?{aggregateRating:{"@type":"AggregateRating",ratingValue:(c.reduce((m,f)=>m+f.rating,0)/c.length).toFixed(1),reviewCount:c.length}}:{}}}export{He as renderSite};
