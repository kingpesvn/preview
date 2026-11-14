var ae={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,n=>ae[n]);function C(a,n,t="vi"){var r,i,s;return a==null?"":typeof a!="object"?String(a):(s=(i=(r=a[n])!=null?r:a[t])!=null?i:Object.values(a)[0])!=null?s:""}var te={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},S=a=>{var n;return(n=te[a])!=null?n:"en-US"};function ne(a,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(a)-.01);let t=Number(n)||1;return Math.max(t,Math.round(a/t)*t)}function q(a,n){var r,i;if(n.default)return a.basePrice;let t=(i=(r=a.prices)==null?void 0:r[n.id])!=null?i:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:ne(a.basePrice*n.rate,n.rounding)}var oe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function L(a,n){let t={style:"currency",currency:n.currency};return oe.has(n.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(S(n.lang),t).format(a)}function V(a="/"){let n=a.endsWith("/")?a:`${a}/`;return(t="")=>n+String(t).replace(/^\//,"")}var re=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,z=(a,n)=>{let t=re(n);return t==null?n:a(t)},w=(a="")=>String(a).replace(/\D/g,"");function T(a,n,t=""){switch(a){case"phone":return`tel:${w(n.phone)}`;case"zalo":return`https://zalo.me/${w(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${w(n.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var A=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,se=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function B(a){if(!a||typeof a!="string")return null;let n;try{n=new URL(a.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let t=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let r={};for(let[i,s]of n.searchParams){if(!/^entry\.\d+$/.test(i))continue;let o=s.trim().replace(/^\{|\}$/g,"").toLowerCase();se.includes(o)&&(r[o]=i)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var ie={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(a,n=20,t="")=>{var r;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(r=ie[a])!=null?r:""}</svg>`},N=[1,2,3,4,5,6,0],le=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function F(a,n){let t=a.map(i=>N.indexOf(i)).sort((i,s)=>i-s);return t.every((i,s)=>s===0||i===t[s-1]+1)&&t.length>2?`${n[N[t[0]]]} \u2013 ${n[N[t.at(-1)]]}`:t.map(i=>n[N[i]]).join(", ")}var G=a=>a.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(t=>le[t]),opens:n.open,closes:n.close}));function H(a){var t,r;return(r=(t=new Intl.NumberFormat(S(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(i=>i.type==="currency"))==null?void 0:t.value)!=null?r:a.currency}var I=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',U=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,W=(a,n)=>{var t;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((t=a.timezone)!=null?t:"Asia/Ho_Chi_Minh")}" data-open="${e(n.visit.open)}" data-closed="${e(n.visit.closed)}" hidden></p>`},O={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ce=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,pe=a=>{var n;try{let t=new URL(String((n=a.googleReview)!=null?n:"").trim());return t.protocol==="https:"&&ce.test(t.hostname)?t.href:""}catch{return""}},_=(a,n,t,r="btn btn--line")=>{var o;let i=pe(a);if(!i)return"";let s=typeof n.reviews=="object"&&((o=n.reviews)==null?void 0:o.google)||O[t]||O.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(i)}" target="_blank" rel="noopener">${m("star",16)} ${e(s)}</a></p>`},P={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},K={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},J=a=>{var n;return((n=a.reviews)!=null?n:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function Z(a,n){var s,o,l;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!t)return"";let r=new Date(Date.UTC(+t[1],+t[2]-1,+((o=t[3])!=null?o:1)));if(Number.isNaN(r.getTime()))return"";let i=new Intl.DateTimeFormat((l=K[n])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(a.date)}">${e(i)}</time>`}function de(a,n){var o,l;let t=a.filter(d=>d.rating>=1&&d.rating<=5);if(t.length<2)return"";let r=t.reduce((d,p)=>d+Number(p.rating),0)/t.length,i=(o=P[n])!=null?o:P.en,s=new Intl.NumberFormat((l=K[n])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(i.count.replace("{n}",String(a.length)))}</span></p>`}function Y(a,n,t,r){var o;if(!a.length)return"";let i=(o=P[n])!=null?o:P.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?i.prev:i.next)}">${m("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${de(a,n)}<div class="rv" data-rv data-rv-more="${e(i.more)}" data-rv-less="${e(i.less)}">
      <div class="${t} rv-track" tabindex="0">${a.map(r).join("")}</div>
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
upd()}})()<\/script>`;var X=(a,n,t)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(n.footer.madeWith)}</a>`;function Q({site:a,markets:n,url:t,abs:r}){var o;let i=(o=n.find(l=>l.default))!=null?o:n[0],s=n.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(i.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${r(`${i.id}/`)}">
${n.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${r(`${l.id}/`)}">`).join(`
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
`}var ue="https://fonts.googleapis.com/css2?family=Prata&family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap",ee=14;function me(a,n){var t;return((t=a.products)!=null?t:[]).map(r=>{var i;return{...r,variants:((i=r.variants)!=null?i:[]).map(s=>({...s,price:q(s,n)})).filter(s=>s.price!=null)}}).filter(r=>r.variants.length>0)}function Oe({site:a,catalog:n,i18n:t,template:r,basePath:i="/",siteUrl:s=a.domain}){let o=V(i),l=h=>new URL(o(h),s).href,d=n.markets,p=B(a.bookingForm),g=p&&!p.error?p:null,b=d.map(h=>{var M,D,v,E;let c=h.lang,u=(D=(M=t[c])!=null?M:t.en)!=null?D:t.vi,y=j=>C(j,c,"en"),f=me(n,h),$=(E=(v=a.bookingChannels)==null?void 0:v[h.id])!=null?E:["phone"],x={site:a,catalog:n,market:h,markets:d,lang:c,t:u,L:y,url:o,abs:l,packages:f,channels:$,money:j=>L(j,h),template:r,gform:g};return{path:`${h.id}/index.html`,html:ge(x)}});return b.push({path:"index.html",html:Q({site:a,markets:d,url:o,abs:l})}),b}var R=(a,n)=>a.heroImage?z(n,a.heroImage):n("assets/photos/hero.webp");function ge(a){var y,f,$,k,x,M,D;let{site:n,market:t,markets:r,lang:i,t:s,L:o,url:l,abs:d}=a,p=`${n.name} \xB7 ${o(n.tagline)}`,g=(y=n.theme)!=null?y:{},b=["primary","ink","bg","surface","soft","accent"].filter(v=>g[v]).map(v=>`--${v}:${g[v]}`).join(";"),h=(f=r.find(v=>v.default))!=null?f:r[0],c=r.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:l(`${v.id}/`)})),u=($=n.contact)!=null?$:{};return`<!doctype html>
<html lang="${e(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(p)}</title>
<meta name="description" content="${e(o(n.intro))}">
<link rel="canonical" href="${d(`${t.id}/`)}">
${r.map(v=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${d(`${v.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${h.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(p)}">
<meta property="og:description" content="${e(o(n.intro))}">
<meta property="og:url" content="${d(`${t.id}/`)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta property="og:image" content="${e(new URL(R(n,l),d("")).href)}">
<meta name="theme-color" content="${e((k=g.bg)!=null?k:"#141312")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ue}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${b}}</style>
<noscript><style>.works .more{display:block}.works-more,.chips,.cal{display:none}.cal-nojs{display:block}</style></noscript>
${A(ze(a))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(c))}' data-wa="${e(w(u.whatsapp))}" data-email="${e((x=u.email)!=null?x:"")}" data-copied="${e(s.booking.copied)}" data-tz="${e((M=n.timezone)!=null?M:"Asia/Ho_Chi_Minh")}" data-locale="${e(S(i))}">
<a class="skip" href="#main">${e(s.skip)}</a>
${U(s)}
${fe(a)}
<main id="main">
${ve(a)}
${be(a)}
${ye(a)}
${$e(a)}
${ke(a)}
${xe(a)}
${we(a)}
${Me(a)}
${De(a)}
</main>
${Se(a)}
<nav class="dock" aria-label="${e(s.nav.book)}">
  <a href="${e(T(a.channels[0],u))}" ${I(a.channels[0])}>${m(a.channels[0],20)}<span>${e((D=s.via[a.channels[0]])!=null?D:"")}</span></a>
  <a class="primary" href="#booking">${m("calendar",20)}<span>${e(s.nav.book)}</span></a>
</nav>
</body>
</html>
`}function fe({site:a,market:n,markets:t,t:r,url:i}){let s=[["#works",r.nav.works],["#packages",r.nav.packages],["#booking",r.nav.calendar],["#visit",r.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${i(`${n.id}/`)}">
      ${a.logo?`<img src="${e(z(i,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${m("camera",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([o,l])=>`<a href="${o}">${e(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${t.length>1?`<details class="market">
        <summary aria-label="${e(r.market.label)}">${m("globe",18)}<span>${e(n.id.toUpperCase())}<span class="cur"> \xB7 ${e(H(n))}</span></span></summary>
        <ul>${t.map(o=>`<li><a href="${i(`${o.id}/`)}" hreflang="${e(o.lang)}"${o.id===n.id?' aria-current="true"':""}>${e(o.country)} \xB7 ${e(o.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-md" href="#booking">${e(r.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${[...s,["#booking",r.nav.book]].map(([o,l])=>`<a href="${o}">${e(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ve({site:a,t:n,L:t,url:r}){var s;let i=((s=a.stats)!=null?s:[]).filter(o=>t(o==null?void 0:o.value));return`<section class="hero">
  <img class="hero-bg" src="${e(R(a,r))}" alt="" width="1600" height="1000" fetchpriority="high">
  <div class="wrap hero-inner">
    ${t(a.place)?`<p class="eyebrow">${e(t(a.place))}</p>`:""}
    <h1>${e(t(a.tagline))}</h1>
    ${t(a.intro)?`<p class="lead">${e(t(a.intro))}</p>`:""}
    <div class="actions">
      <a class="btn btn--primary btn--lg" href="#booking">${m("calendar",18)} ${e(n.hero.book)}</a>
      <a class="btn btn--ghost btn--lg" href="#works">${e(n.hero.works)}</a>
    </div>
  </div>
  ${i.length?`<ul class="wrap stats">${i.map(o=>`<li><b>${e(t(o.value))}</b><span>${e(t(o.label))}</span></li>`).join("")}</ul>`:""}
</section>`}function be({site:a,catalog:n,t,L:r,url:i}){var l,d;let s=((l=a.portfolio)!=null?l:[]).filter(p=>p==null?void 0:p.image);if(!s.length)return"";let o=((d=n.categories)!=null?d:[]).filter(p=>s.some(g=>g.tag===p.id));return`<section class="section" id="works" aria-labelledby="works-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(t.works.kicker)}</p><h2 id="works-title" class="h2">${e(t.works.title)}</h2></div>
    ${o.length>1?`<div class="chips" role="group" aria-label="${e(t.works.filter)}"><button type="button" class="chip" data-tag="" aria-pressed="true">${e(t.works.all)}</button>${o.map(p=>`<button type="button" class="chip" data-tag="${e(p.id)}" aria-pressed="false">${e(r(p.name))}</button>`).join("")}</div>`:""}
    <div class="works" data-works>${s.map((p,g)=>{var h;let b=e(z(i,p.image));return`<a class="ph${g>=ee?" more":""}${g%7===0||g%7===4?" tall":""}" href="${b}" data-t="${e((h=p.tag)!=null?h:"")}"><img sizes="auto, (max-width: 640px) 50vw, 380px" src="${b}" alt="${e(`${a.name} ${g+1}`)}" width="1000" height="750" loading="lazy"></a>`}).join("")}</div>
    ${s.length>ee?`<p class="center"><button type="button" class="btn btn--line works-more" data-works-more>${e(t.works.more)}</button></p>`:""}
  </div>
  <dialog class="lb" data-lightbox aria-label="${e(t.works.title)}">
    <img alt="" data-lb-img>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${e(t.works.close)}">\u2715</button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${e(t.works.prev)}">${m("arrow",22,'style="transform:scaleX(-1)"')}</button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${e(t.works.next)}">${m("arrow",22)}</button>
    <p class="lb-count" data-lb-count></p>
  </dialog>
</section>`}function ye({catalog:a,packages:n,t,L:r,lang:i,url:s,money:o}){var h;if(!n.length)return"";let l=(h=a.categories)!=null?h:[],d=c=>{let u=l.findIndex(y=>y.id===c.category);return u<0?l.length:u},p=[...n].sort((c,u)=>d(c)-d(u)),g=c=>{var f,$,k;let u=c.includes;return u?(Array.isArray(u)?u:(k=($=(f=u[i])!=null?f:u.en)!=null?$:u.vi)!=null?k:[]).map(x=>typeof x=="string"?x:r(x)).filter(Boolean):[]},b=new Map(l.map(c=>[c.id,r(c.name)]));return`<section class="section section--light" id="packages" aria-labelledby="pk-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(t.packages.kicker)}</p><h2 id="pk-title" class="h2">${e(t.packages.title)}</h2><p class="muted">${e(t.packages.text)}</p></div>
    <div class="packs">${p.map(c=>`<article class="pack${c.featured?" pack--hot":""}">
      ${c.image?`<figure><img sizes="auto, (max-width: 640px) 100vw, 380px" src="${e(z(s,c.image))}" alt="${e(r(c.name))}" width="1000" height="750" loading="lazy">${c.featured?`<span class="hot">${e(t.packages.popular)}</span>`:""}</figure>`:""}
      <div class="pack-body">
        ${b.get(c.category)?`<p class="pack-cat">${e(b.get(c.category))}</p>`:""}
        <h3>${e(r(c.name))}</h3>
        ${r(c.description)?`<p class="muted">${e(r(c.description))}</p>`:""}
        ${g(c).length?`<ul class="inc">${g(c).map(u=>`<li>${m("check",15)} ${e(u)}</li>`).join("")}</ul>`:""}
        <table class="ptable"><tbody>${c.variants.map(u=>`<tr><th scope="row">${e(r(u.label))}</th><td>${e(o(u.price))}</td></tr>`).join("")}</tbody></table>
        <a class="btn ${c.featured?"btn--primary":"btn--line"}" href="#booking" data-pick="${e(r(c.name))}">${e(t.packages.pick)}</a>
      </div>
    </article>`).join("")}</div>
  </div>
</section>`}function $e({site:a,t:n,L:t}){var i;let r=((i=a.steps)!=null?i:[]).filter(s=>t(s==null?void 0:s.title));return r.length?`<section class="section" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(n.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(n.steps.title)}</h2></div>
    <ol class="steps">${r.map((s,o)=>`<li><span class="step-n">${String(o+1).padStart(2,"0")}</span><strong>${e(t(s.title))}</strong>${t(s.text)?`<p class="muted">${e(t(s.text))}</p>`:""}</li>`).join("")}</ol>
  </div>
</section>`:""}function ke({site:a,t:n,L:t}){var s;let r=((s=a.team)!=null?s:[]).filter(o=>o==null?void 0:o.name);if(!r.length)return"";let i=o=>o.split(/\s+/).map(l=>l[0]).slice(-2).join("").toUpperCase();return`<section class="section section--soft" aria-labelledby="team-title">
  <div class="wrap">
    <h2 id="team-title" class="h2">${e(n.team.title)}</h2>
    <div class="team">${r.map(o=>`<figure class="person">
      <div class="person-ph">${o.photo?`<img src="${e(o.photo)}" alt="${e(o.name)}" loading="lazy">`:`<span aria-hidden="true">${e(i(o.name))}</span>`}</div>
      <figcaption><strong>${e(o.name)}</strong><span>${e(t(o.role))}</span>${t(o.specialty)?`<span class="muted">${e(t(o.specialty))}</span>`:""}${o.years?`<span class="muted">${e(n.team.years.replace("{n}",o.years))}</span>`:""}</figcaption>
    </figure>`).join("")}</div>
  </div>
</section>`}function xe({site:a,t:n,L:t,lang:r}){let i=_(a,n,r,"btn btn--line"),s=J(a);return a.showReviews===!1||!s.length&&!i?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(n.reviews)}</h2>
    ${Y(s,r,"quotes",o=>`<figure class="quote">
      ${o.rating?`<div class="stars" aria-label="${o.rating}/5">${Array.from({length:5},(l,d)=>`<span class="${d<o.rating?"on":""}">${m("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(t(o.text))}</blockquote>
      <figcaption>${e(o.name)}${Z(o,r)}</figcaption>
    </figure>`)}${i}
  </div>
</section>`}function we({site:a,packages:n,t,L:r,channels:i,gform:s}){var b,h,c,u,y;let o=t.booking,l=(b=a.contact)!=null?b:{},d=s?` data-gform="${e(s.action)}" data-gmap='${e(JSON.stringify(s.fields))}'`:"",p=i.map((f,$)=>{var k;return`<button type="button" class="btn ${$===0?"btn--primary":"btn--line"}" data-channel="${e(f)}" data-href="${e(T(f,l,""))}">${m(f,18)} ${e((k=t.via[f])!=null?k:f)}</button>`}).join(""),g={booked:((h=a.booked)!=null?h:[]).filter(f=>/^\d{4}-\d{2}-\d{2}$/.test(f)),closed:((c=a.closedDays)!=null?c:[]).map(Number),ahead:(u=a.bookAhead)!=null?u:2,months:(y=a.monthsShown)!=null?y:4};return`<section class="section section--light" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="cal-box">
      <p class="kicker">${e(t.calendar.kicker)}</p>
      <h2 id="book-title" class="h2">${e(t.calendar.title)}</h2>
      <p class="muted">${e(t.calendar.text)}</p>
      <div class="cal" data-cal='${e(JSON.stringify(g))}' data-week="${e(JSON.stringify(t.daysShort))}">
        <div class="cal-head"><button type="button" class="cal-nav" data-cal-prev aria-label="${e(t.calendar.prev)}">${m("arrow",18,'style="transform:scaleX(-1)"')}</button><p class="cal-title" data-cal-title></p><button type="button" class="cal-nav" data-cal-next aria-label="${e(t.calendar.next)}">${m("arrow",18)}</button></div>
        <div class="cal-grid" data-cal-grid role="grid"></div>
        <ul class="cal-key"><li><span class="k k-free"></span>${e(t.calendar.free)}</li><li><span class="k k-busy"></span>${e(t.calendar.busy)}</li><li><span class="k k-sel"></span>${e(t.calendar.picked)}</li></ul>
      </div>
      <p class="cal-nojs" hidden>${e(t.calendar.nojs)}</p>
    </div>
    <form class="card form" data-book novalidate${d} data-order-text="${e(o.message)}">
      <div class="book-fields">
        <h3 class="form-h">${e(o.title)}</h3>
        <label class="field"><span>${e(o.package)}</span><select name="product">
          <option value="${e(o.notSure)}">${e(o.notSure)}</option>
          ${n.map(f=>`<option>${e(r(f.name))}</option>`).join("")}
        </select></label>
        <div class="row2">
          <label class="field"><span>${e(o.date)}</span><input name="day" type="date" data-day></label>
          <label class="field"><span>${e(o.time)}</span><select name="slot">${o.slots.map(f=>`<option>${e(f)}</option>`).join("")}</select></label>
        </div>
        <p class="day-note" data-day-note data-busy="${e(t.calendar.busyNote)}" hidden></p>
        <label class="field"><span>${e(o.place)}</span><input name="address" maxlength="160" placeholder="${e(o.placeHint)}"></label>
        <div class="row2">
          <label class="field"><span>${e(o.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(o.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(o.note)}</span><textarea name="note" rows="2" maxlength="400" placeholder="${e(o.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(o.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${e(o.sending)}">${m("calendar",18)} ${e(o.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m(s?"check":"arrow",22)} ${e(s?o.done:o.stepTitle)}</p>
        <p>${e(s?o.doneText:o.stepText)}</p>
        ${s?"":`<div class="buy">${p}</div><button type="button" class="link" data-edit>${e(o.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function Me({site:a,t:n,L:t}){var o,l,d;let r=(o=a.contact)!=null?o:{},i=encodeURIComponent((l=r.mapQuery)!=null?l:t(r.address)),s=p=>p.length===7?n.everyDay:F(p,n.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(n.visit.title)}</h2>
      ${W(a,n)}
      ${((d=a.hours)!=null?d:[]).length?`<table class="hours"><tbody>${a.hours.map(p=>`<tr><th scope="row">${e(s(p.days))}</th><td>${e(p.open)} \u2013 ${e(p.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${t(r.address)?`<p class="addr">${m("pin",18)} ${e(t(r.address))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(n.visit.directions)} ${m("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(n.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function De({site:a,t:n,L:t}){var i;let r=((i=a.faq)!=null?i:[]).filter(s=>t(s==null?void 0:s.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(n.faq.title)}</h2>
    <div class="qa">${r.map((s,o)=>`<details${o===0?" open":""}><summary>${e(t(s.q))}</summary><p>${e(t(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Se({site:a,t:n,L:t,market:r}){var o,l;let i=(o=a.contact)!=null?o:{},s=Object.entries((l=a.social)!=null?l:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(t(a.tagline))}</p></div>
    <div><p class="foot-h">${e(n.footer.contact)}</p><ul>
      ${i.phone?`<li><a href="tel:${w(i.phone)}">${e(i.phone)}</a></li>`:""}
      ${i.email?`<li><a href="mailto:${e(i.email)}">${e(i.email)}</a></li>`:""}
      ${t(i.address)?`<li>${e(t(i.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(n.footer.follow)}</p><ul>${s.map(([d,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${X(a,n,r.lang)}</div>
</footer>`}function ze({site:a,market:n,L:t,abs:r,url:i,packages:s,catalog:o}){var d,p,g;let l=(d=a.contact)!=null?d:{};return{"@context":"https://schema.org","@type":"ProfessionalService",additionalType:"https://schema.org/Photograph",name:a.name,url:r(`${n.id}/`),description:t(a.intro),image:new URL(R(a,i),r("")).href,telephone:l.phone,email:l.email,address:{"@type":"PostalAddress",streetAddress:t(l.address)},openingHoursSpecification:G((p=a.hours)!=null?p:[]),currenciesAccepted:n.currency,hasOfferCatalog:{"@type":"OfferCatalog",name:a.name,itemListElement:((g=o.categories)!=null?g:[]).filter(b=>s.some(h=>h.category===b.id)).map(b=>({"@type":"OfferCatalog",name:t(b.name),itemListElement:s.filter(h=>h.category===b.id).flatMap(h=>h.variants.map(c=>({"@type":"Offer",name:`${t(h.name)}${t(c.label)?` (${t(c.label)})`:""}`,price:c.price,priceCurrency:n.currency,itemOffered:{"@type":"Service",name:t(h.name),description:t(h.description)||t(h.name)}})))}))}}}export{Oe as renderSite};
