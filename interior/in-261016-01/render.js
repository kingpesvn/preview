var ne={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,n=>ne[n]);function R(a,n,t="vi"){var r,s,i;return a==null?"":typeof a!="object"?String(a):(i=(s=(r=a[n])!=null?r:a[t])!=null?s:Object.values(a)[0])!=null?i:""}var oe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},k=a=>{var n;return(n=oe[a])!=null?n:"en-US"};function re(a,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(a)-.01);let t=Number(n)||1;return Math.max(t,Math.round(a/t)*t)}function B(a,n){var r,s;if(n.default)return a.basePrice;let t=(s=(r=a.prices)==null?void 0:r[n.id])!=null?s:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:re(a.basePrice*n.rate,n.rounding)}var ie=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function A(a,n){let t={style:"currency",currency:n.currency};return ie.has(n.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(k(n.lang),t).format(a)}function V(a="/"){let n=a.endsWith("/")?a:`${a}/`;return(t="")=>n+String(t).replace(/^\//,"")}var se=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,y=(a,n)=>{let t=se(n);return t==null?n:a(t)},x=(a="")=>String(a).replace(/\D/g,"");function E(a,n,t=""){switch(a){case"phone":return`tel:${x(n.phone)}`;case"zalo":return`https://zalo.me/${x(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${x(n.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var F=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,le=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function O(a){if(!a||typeof a!="string")return null;let n;try{n=new URL(a.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let t=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let r={};for(let[s,i]of n.searchParams){if(!/^entry\.\d+$/.test(s))continue;let o=i.trim().replace(/^\{|\}$/g,"").toLowerCase();le.includes(o)&&(r[o]=s)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var w={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ce={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},f=(a,n=20,t="")=>{var r;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(r=ce[a])!=null?r:""}</svg>`},N=[1,2,3,4,5,6,0],pe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function H(a,n){let t=a.map(s=>N.indexOf(s)).sort((s,i)=>s-i);return t.every((s,i)=>i===0||s===t[i-1]+1)&&t.length>2?`${n[N[t[0]]]} \u2013 ${n[N[t.at(-1)]]}`:t.map(s=>n[N[s]]).join(", ")}var I=a=>a.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(t=>pe[t]),opens:n.open,closes:n.close}));function U(a){var t,r;return(r=(t=new Intl.NumberFormat(k(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:t.value)!=null?r:a.currency}var W=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',L=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,_=(a,n)=>{var t;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((t=a.timezone)!=null?t:"Asia/Ho_Chi_Minh")}" data-open="${e(n.visit.open)}" data-closed="${e(n.visit.closed)}" hidden></p>`},G={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},de=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,he=a=>{var n;try{let t=new URL(String((n=a.googleReview)!=null?n:"").trim());return t.protocol==="https:"&&de.test(t.hostname)?t.href:""}catch{return""}},K=(a,n,t,r="btn btn--line")=>{var o;let s=he(a);if(!s)return"";let i=typeof n.reviews=="object"&&((o=n.reviews)==null?void 0:o.google)||G[t]||G.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(s)}" target="_blank" rel="noopener">${f("star",16)} ${e(i)}</a></p>`},P={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},J={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},Z=a=>{var n;return((n=a.reviews)!=null?n:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function Y(a,n){var i,o,c;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!t)return"";let r=new Date(Date.UTC(+t[1],+t[2]-1,+((o=t[3])!=null?o:1)));if(Number.isNaN(r.getTime()))return"";let s=new Intl.DateTimeFormat((c=J[n])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(a.date)}">${e(s)}</time>`}function ue(a,n){var o,c;let t=a.filter(p=>p.rating>=1&&p.rating<=5);if(t.length<2)return"";let r=t.reduce((p,u)=>p+Number(u.rating),0)/t.length,s=(o=P[n])!=null?o:P.en,i=new Intl.NumberFormat((c=J[n])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${f("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(a.length)))}</span></p>`}function X(a,n,t,r){var o;if(!a.length)return"";let s=(o=P[n])!=null?o:P.en,i=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?s.prev:s.next)}">${f("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ue(a,n)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${t} rv-track" tabindex="0">${a.map(r).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${me}`}var me=`<style>
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
upd()}})()<\/script>`;var Q=(a,n,t)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(n.footer.madeWith)}</a>`;function ee({site:a,markets:n,url:t,abs:r}){var o;let s=(o=n.find(c=>c.default))!=null?o:n[0],i=n.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${r(`${s.id}/`)}">
${n.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${r(`${c.id}/`)}">`).join(`
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
<body><p>${n.map(c=>`<a href="${t(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ge="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",te=9;function fe(a,n){var t;return((t=a.products)!=null?t:[]).map(r=>{var s;return{...r,variants:((s=r.variants)!=null?s:[]).map(i=>({...i,price:B(i,n)})).filter(i=>i.price!=null)}}).filter(r=>r.variants.length>0)}function Ie({site:a,catalog:n,i18n:t,template:r,basePath:s="/",siteUrl:i=a.domain}){let o=V(s),c=h=>new URL(o(h),i).href,p=n.markets,u=O(a.bookingForm),d=u&&!u.error?u:null,g=p.map(h=>{var M,D,S,v;let l=h.lang,m=(D=(M=t[l])!=null?M:t.en)!=null?D:t.vi,b=T=>R(T,l,"en"),$=fe(n,h),j=(v=(S=a.bookingChannels)==null?void 0:S[h.id])!=null?v:["phone"],z={site:a,catalog:n,market:h,markets:p,lang:l,t:m,L:b,url:o,abs:c,services:$,channels:j,money:T=>A(T,h),template:r,gform:d};return{path:`${h.id}/index.html`,html:ve(z)}});return g.push({path:"index.html",html:ee({site:a,markets:p,url:o,abs:c})}),g}var q=(a,n)=>a.heroImage?y(n,a.heroImage):n("assets/photos/hero.webp");function ve(a){var $,j,C,z,M,D,S;let{site:n,market:t,markets:r,lang:s,t:i,L:o,url:c,abs:p}=a,u=`${n.name} \xB7 ${o(n.tagline)}`,d=($=n.theme)!=null?$:{},g=["primary","ink","bg","surface","soft","accent"].filter(v=>d[v]).map(v=>`--${v}:${d[v]}`).join(";"),h=(j=r.find(v=>v.default))!=null?j:r[0],l=r.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:c(`${v.id}/`)})),m=(C=n.contact)!=null?C:{},b=new Intl.NumberFormat(k(s),{style:"currency",currency:t.currency,maximumFractionDigits:0}).resolvedOptions();return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(u)}</title>
<meta name="description" content="${e(o(n.intro))}">
<link rel="canonical" href="${p(`${t.id}/`)}">
${r.map(v=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${p(`${v.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${h.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(u)}">
<meta property="og:description" content="${e(o(n.intro))}">
<meta property="og:url" content="${p(`${t.id}/`)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta property="og:image" content="${e(new URL(q(n,c),p("")).href)}">
<meta name="theme-color" content="${e((z=d.bg)!=null?z:"#F4EFE7")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ge}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${g}}</style>
<noscript><style>.proj.more{display:block}.proj-more,.chips,.est{display:none}</style></noscript>
${F(Pe(a))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(l))}' data-wa="${e(x(m.whatsapp))}" data-email="${e((M=m.email)!=null?M:"")}" data-copied="${e(i.booking.copied)}" data-money='${e(JSON.stringify({locale:k(s),currency:t.currency,max:(D=b.maximumFractionDigits)!=null?D:0}))}'>
<a class="skip" href="#main">${e(i.skip)}</a>
${L(i)}
${be(a)}
<main id="main">
${ye(a)}
${$e(a)}
${ke(a)}
${xe(a)}
${we(a)}
${Me(a)}
${De(a)}
${Se(a)}
${je(a)}
${ze(a)}
</main>
${Ne(a)}
<nav class="dock" aria-label="${e(i.nav.book)}">
  <a href="${e(E(a.channels[0],m))}" ${W(a.channels[0])}>${f(a.channels[0],20)}<span>${e((S=i.via[a.channels[0]])!=null?S:"")}</span></a>
  <a class="primary" href="#booking">${f("ruler",20)}<span>${e(i.nav.book)}</span></a>
</nav>
</body>
</html>
`}function be({site:a,market:n,markets:t,t:r,url:s}){var o,c;let i=[["#projects",r.nav.projects],["#pricing",r.nav.pricing],["#materials",r.nav.materials],["#visit",r.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${n.id}/`)}">
      ${a.logo?`<img src="${e(y(s,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${e((c=((o=a.name)!=null?o:"M").trim()[0])!=null?c:"M")}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([p,u])=>`<a href="${p}">${e(u)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${t.length>1?`<details class="market">
        <summary aria-label="${e(r.market.label)}">${f("globe",18)}<span>${e(n.id.toUpperCase())}<span class="cur"> \xB7 ${e(U(n))}</span></span></summary>
        <ul>${t.map(p=>`<li><a href="${s(`${p.id}/`)}" hreflang="${e(p.lang)}"${p.id===n.id?' aria-current="true"':""}>${e(p.country)} \xB7 ${e(p.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-md" href="#booking">${e(r.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${f("menu",22)}</summary>
        <nav aria-label="Menu">${[...i,["#booking",r.nav.book]].map(([p,u])=>`<a href="${p}">${e(u)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ye({site:a,t:n,L:t,url:r}){var i;let s=((i=a.stats)!=null?i:[]).filter(o=>t(o==null?void 0:o.value));return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${t(a.place)?`<p class="eyebrow">${e(t(a.place))}</p>`:""}
      <h1>${e(t(a.tagline))}</h1>
      ${t(a.intro)?`<p class="lead">${e(t(a.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#booking">${f("ruler",18)} ${e(n.hero.book)}</a>
        <a class="btn btn--line btn--lg" href="#projects">${e(n.hero.projects)}</a>
      </div>
      ${s.length?`<ul class="stats">${s.map(o=>`<li><b>${e(t(o.value))}</b><span>${e(t(o.label))}</span></li>`).join("")}</ul>`:""}
    </div>
    <figure class="hero-ph"><img src="${e(q(a,r))}" alt="${e(t(a.tagline))}" width="1200" height="1400" fetchpriority="high"></figure>
  </div>
</section>`}var ae=(a,n,t)=>{var r,s,i;return(i=n((s=((r=a.projectTypes)!=null?r:[]).find(o=>o.id===t))==null?void 0:s.name))!=null?i:""};function $e({site:a,t:n,L:t,url:r,lang:s}){var p,u;let i=((p=a.projects)!=null?p:[]).filter(d=>d==null?void 0:d.image);if(!i.length)return"";let o=((u=a.projectTypes)!=null?u:[]).filter(d=>i.some(g=>g.type===d.id)),c=new Intl.NumberFormat(k(s));return`<section class="section" id="projects" aria-labelledby="proj-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(n.projects.kicker)}</p><h2 id="proj-title" class="h2">${e(n.projects.title)}</h2><p class="muted">${e(n.projects.text)}</p></div>
    ${o.length>1?`<div class="chips" role="group" aria-label="${e(n.projects.filter)}"><button type="button" class="chip" data-type="" aria-pressed="true">${e(n.projects.all)}</button>${o.map(d=>`<button type="button" class="chip" data-type="${e(d.id)}" aria-pressed="false">${e(t(d.name))}</button>`).join("")}</div>`:""}
    <div class="projs" data-projs>${i.map((d,g)=>{var m,b;let h=[d.image,...((m=d.images)!=null?m:[]).filter(Boolean)].map($=>y(r,$)),l=[d.area?n.projects.area.replace("{n}",c.format(d.area)).replace("{ft}",c.format(Math.round(d.area*10.764/10)*10)):"",t(d.place),d.weeks?n.projects.weeks.replace("{n}",d.weeks):""].filter(Boolean);return`<article class="proj${g>=te?" more":""}" data-t="${e((b=d.type)!=null?b:"")}">
      <a class="proj-ph" href="${e(h[0])}" data-open="${g}" aria-label="${e(n.projects.view)}: ${e(t(d.title))}">
        <img sizes="${w.wide}" src="${e(h[0])}" alt="${e(t(d.title))}" width="1200" height="900" loading="lazy">
        ${d.before?`<span class="tag-ba">${e(n.projects.beforeAfter)}</span>`:""}
        ${h.length>1?`<span class="tag-n">${f("camera",14)} ${h.length+(d.before?1:0)}</span>`:""}
      </a>
      <div class="proj-body">
        ${ae(a,t,d.type)?`<p class="proj-type">${e(ae(a,t,d.type))}</p>`:""}
        <h3>${e(t(d.title))}</h3>
        ${l.length?`<p class="facts">${l.map($=>`<span>${e($)}</span>`).join("")}</p>`:""}
        ${t(d.text)?`<p class="muted">${e(t(d.text))}</p>`:""}
      </div>
      <script type="application/json" data-proj>${JSON.stringify({title:t(d.title),text:t(d.text),facts:l,before:d.before?y(r,d.before):"",images:h}).replace(/</g,"\\u003c")}<\/script>
    </article>`}).join("")}</div>
    ${i.length>te?`<p class="center"><button type="button" class="btn btn--line proj-more" data-proj-more>${e(n.projects.more)}</button></p>`:""}
  </div>
  <dialog class="pv" data-pv aria-labelledby="pv-title">
    <div class="pv-box">
      <button type="button" class="pv-x" data-pv-close aria-label="${e(n.projects.close)}">\u2715</button>
      <div class="pv-media">
        <div class="ba" data-ba hidden>
          <img data-ba-after alt="${e(n.projects.after)}">
          <div class="ba-before"><img data-ba-before alt="${e(n.projects.before)}"></div><span class="ba-line"></span>
          <span class="ba-l">${e(n.projects.before)}</span><span class="ba-r">${e(n.projects.after)}</span>
          <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="${e(n.projects.compare)}" data-ba-range>
        </div>
        <img class="pv-img" data-pv-img alt="">
        <div class="pv-thumbs" data-pv-thumbs></div>
      </div>
      <div class="pv-info"><h3 id="pv-title" data-pv-title></h3><p class="facts" data-pv-facts></p><p class="muted" data-pv-text></p>
        <a class="btn btn--primary" href="#booking" data-pv-book>${e(n.projects.similar)}</a></div>
    </div>
  </dialog>
</section>`}function ke({catalog:a,services:n,t,L:r,url:s,money:i}){var h;if(!n.length)return"";let o=(h=a.categories)!=null?h:[],c=l=>{let m=o.findIndex(b=>b.id===l.category);return m<0?o.length:m},p=[...n].sort((l,m)=>c(l)-c(m)),u=(l,m)=>r(l.unit)?t.pricing.per.replace("{price}",i(m)).replace("{unit}",r(l.unit)):i(m),g=p.filter(l=>l.perArea&&r(l.unit)).map(l=>({name:r(l.name),unit:r(l.unit),tiers:l.variants.map(m=>({label:r(m.label),price:m.price}))}));return`<section class="section section--soft" id="pricing" aria-labelledby="price-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(t.pricing.kicker)}</p><h2 id="price-title" class="h2">${e(t.pricing.title)}</h2><p class="muted">${e(t.pricing.text)}</p></div>
    <div class="prices">${p.map(l=>`<article class="price${l.featured?" price--hot":""}">
      ${l.image?`<img sizes="${w.card}" src="${e(y(s,l.image))}" alt="${e(r(l.name))}" width="800" height="600" loading="lazy">`:""}
      <div class="price-body">
        ${l.featured?`<span class="hot">${e(t.pricing.popular)}</span>`:""}
        <h3>${e(r(l.name))}</h3>
        ${r(l.description)?`<p class="muted">${e(r(l.description))}</p>`:""}
        <table class="ptable"><tbody>${l.variants.map(m=>`<tr><th scope="row">${e(r(m.label))}</th><td>${e(u(l,m.price))}</td></tr>`).join("")}</tbody></table>
        <a class="link" href="#booking" data-pick="${e(r(l.name))}">${e(t.pricing.ask)} ${f("arrow",16)}</a>
      </div>
    </article>`).join("")}</div>
    ${g.length?`<div class="est card" data-est='${e(JSON.stringify(g))}'>
      <div class="est-copy"><h3>${e(t.estimate.title)}</h3><p class="muted">${e(t.estimate.text)}</p></div>
      <div class="est-form">
        <label class="field"><span>${e(t.estimate.service)}</span><select data-est-service>${g.map((l,m)=>`<option value="${m}">${e(l.name)}</option>`).join("")}</select></label>
        <label class="field"><span>${e(t.estimate.tier)}</span><select data-est-tier></select></label>
        <label class="field"><span data-est-area-label data-tpl="${e(t.estimate.area)}">${e(t.estimate.area.replace("{unit}",g[0].unit))}</span><input type="number" inputmode="decimal" min="1" max="100000" value="${e(t.estimate.defaultArea)}" data-est-area></label>
      </div>
      <div class="est-out"><p class="muted">${e(t.estimate.result)}</p><p class="est-sum" data-est-sum aria-live="polite">\u2014</p><p class="small muted">${e(t.estimate.note)}</p>
        <a class="btn btn--primary" href="#booking" data-est-book>${f("ruler",18)} ${e(t.estimate.book)}</a></div>
    </div>`:""}
  </div>
</section>`}function xe({site:a,t:n,L:t}){var s;let r=((s=a.steps)!=null?s:[]).filter(i=>t(i==null?void 0:i.title));return r.length?`<section class="section" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(n.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(n.steps.title)}</h2></div>
    <ol class="steps">${r.map((i,o)=>`<li><span class="step-n">${o+1}</span><div><strong>${e(t(i.title))}</strong>${t(i.time)?`<span class="step-t">${f("clock",14)} ${e(t(i.time))}</span>`:""}${t(i.text)?`<p class="muted">${e(t(i.text))}</p>`:""}</div></li>`).join("")}</ol>
  </div>
</section>`:""}function we({site:a,t:n,L:t,url:r}){var i;let s=((i=a.materials)!=null?i:[]).filter(o=>t(o==null?void 0:o.name));return s.length?`<section class="section section--wood" id="materials" aria-labelledby="mat-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(n.materials.kicker)}</p><h2 id="mat-title" class="h2">${e(n.materials.title)}</h2><p class="muted">${e(n.materials.text)}</p></div>
    <div class="mats">${s.map(o=>`<article class="mat">
      ${o.image?`<img sizes="${w.card}" src="${e(y(r,o.image))}" alt="${e(t(o.name))}" width="600" height="600" loading="lazy">`:""}
      <h3>${e(t(o.name))}</h3>${t(o.text)?`<p>${e(t(o.text))}</p>`:""}
    </article>`).join("")}</div>
  </div>
</section>`:""}function Me({site:a,t:n,L:t,url:r}){var o,c;let s=(o=a.workshop)!=null?o:{},i=((c=a.promises)!=null?c:[]).filter(p=>t(p==null?void 0:p.title));return!t(s.text)&&!i.length?"":`<section class="section" aria-labelledby="ws-title">
  <div class="wrap ws">
    <div class="ws-ph">
      ${s.image?`<img class="ws-a" sizes="${w.wide}" src="${e(y(r,s.image))}" alt="${e(n.workshop.title)}" width="1000" height="1200" loading="lazy">`:""}
      ${s.image2?`<img class="ws-b" sizes="${w.card}" src="${e(y(r,s.image2))}" alt="" width="700" height="700" loading="lazy">`:""}
    </div>
    <div class="ws-copy">
      <p class="kicker">${e(n.workshop.kicker)}</p>
      <h2 id="ws-title" class="h2">${e(n.workshop.title)}</h2>
      ${t(s.text)?`<p class="lead">${e(t(s.text))}</p>`:""}
      ${i.length?`<ul class="promises">${i.map(p=>`<li><span class="pi">${f(p.icon||"check",20)}</span><div><strong>${e(t(p.title))}</strong>${t(p.text)?`<p class="muted">${e(t(p.text))}</p>`:""}</div></li>`).join("")}</ul>`:""}
    </div>
  </div>
</section>`}function De({site:a,t:n,L:t,lang:r}){let s=K(a,n,r,"btn btn--line"),i=Z(a);return a.showReviews===!1||!i.length&&!s?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(n.reviews)}</h2>
    ${X(i,r,"quotes",o=>`<figure class="quote">
      ${o.rating?`<div class="stars" aria-label="${o.rating}/5">${Array.from({length:5},(c,p)=>`<span class="${p<o.rating?"on":""}">${f("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(t(o.text))}</blockquote>
      <figcaption><strong>${e(o.name)}</strong>${o.bought?` \xB7 ${e(t(o.bought))}`:""}${Y(o,r)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Se({site:a,services:n,t,L:r,channels:s,gform:i}){var g,h;let o=t.booking,c=(g=a.contact)!=null?g:{},p=i?` data-gform="${e(i.action)}" data-gmap='${e(JSON.stringify(i.fields))}'`:"",u=s.map((l,m)=>{var b;return`<button type="button" class="btn ${m===0?"btn--primary":"btn--line"}" data-channel="${e(l)}" data-href="${e(E(l,c,""))}">${f(l,18)} ${e((b=t.via[l])!=null?b:l)}</button>`}).join(""),d=r((h=n.find(l=>l.perArea&&r(l.unit)))==null?void 0:h.unit)||"m\xB2";return`<section class="section" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="book-copy">
      <p class="kicker">${e(o.kicker)}</p>
      <h2 id="book-title" class="h2">${e(o.heading)}</h2>
      <p class="lead">${e(o.text)}</p>
      <ul class="book-list">${o.points.map(l=>`<li>${f("check",18)} ${e(l)}</li>`).join("")}</ul>
    </div>
    <form class="card form" data-book novalidate${p} data-order-text="${e(o.message)}">
      <div class="book-fields">
        <h3 class="form-h">${e(o.title)}</h3>
        <label class="field"><span>${e(o.service)}</span><select name="product">
          <option value="${e(o.notSure)}">${e(o.notSure)}</option>
          ${n.map(l=>`<option>${e(r(l.name))}</option>`).join("")}
        </select></label>
        <div class="row2">
          <label class="field"><span>${e(o.home)}</span><select name="home">${o.homes.map(l=>`<option>${e(l)}</option>`).join("")}</select></label>
          <label class="field"><span>${e(o.area.replace("{unit}",d))}</span><input name="area" type="number" inputmode="decimal" min="1" max="100000" data-unit="${e(d)}"></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(o.budget)}</span><input name="budget" maxlength="60" placeholder="${e(o.budgetHint)}"></label>
          <label class="field"><span>${e(o.date)}</span><input name="day" type="date"></label>
        </div>
        <label class="field"><span>${e(o.address)}</span><input name="address" maxlength="160" autocomplete="street-address" placeholder="${e(o.addressHint)}"></label>
        <div class="row2">
          <label class="field"><span>${e(o.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(o.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(o.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${e(o.noteHint)}"></textarea></label>
        <input type="hidden" name="estimate">
        <p class="est-chip" data-est-chip hidden></p>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(o.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${e(o.sending)}">${f("ruler",18)} ${e(o.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${f(i?"check":"arrow",22)} ${e(i?o.done:o.stepTitle)}</p>
        <p>${e(i?o.doneText:o.stepText)}</p>
        ${i?"":`<div class="buy">${u}</div><button type="button" class="link" data-edit>${e(o.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function je({site:a,t:n,L:t}){var o,c,p;let r=(o=a.contact)!=null?o:{},s=encodeURIComponent((c=r.mapQuery)!=null?c:t(r.address)),i=u=>u.length===7?n.everyDay:H(u,n.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(n.visit.title)}</h2>
      ${_(a,n)}
      ${((p=a.hours)!=null?p:[]).length?`<table class="hours"><tbody>${a.hours.map(u=>`<tr><th scope="row">${e(i(u.days))}</th><td>${e(u.open)} \u2013 ${e(u.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${t(r.address)?`<p class="addr">${f("pin",18)} ${e(t(r.address))}</p>`:""}
      ${t(a.areas)?`<p class="addr">${f("globe",18)} ${e(t(a.areas))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(n.visit.directions)} ${f("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(n.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function ze({site:a,t:n,L:t}){var s;let r=((s=a.faq)!=null?s:[]).filter(i=>t(i==null?void 0:i.q));return r.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(n.faq.title)}</h2>
    <div class="qa">${r.map((i,o)=>`<details${o===0?" open":""}><summary>${e(t(i.q))}</summary><p>${e(t(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ne({site:a,t:n,L:t,market:r}){var o,c;let s=(o=a.contact)!=null?o:{},i=Object.entries((c=a.social)!=null?c:{}).filter(([,p])=>p);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(t(a.tagline))}</p></div>
    <div><p class="foot-h">${e(n.footer.contact)}</p><ul>
      ${s.phone?`<li><a href="tel:${x(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${t(s.address)?`<li>${e(t(s.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(n.footer.follow)}</p><ul>${i.map(([p,u])=>`<li><a href="${e(u)}" target="_blank" rel="noopener">${e(p[0].toUpperCase()+p.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${Q(a,n,r.lang)}</div>
</footer>`}function Pe({site:a,market:n,L:t,abs:r,url:s,services:i,catalog:o}){var p,u,d;let c=(p=a.contact)!=null?p:{};return{"@context":"https://schema.org","@type":"HomeAndConstructionBusiness",name:a.name,url:r(`${n.id}/`),description:t(a.intro),image:new URL(q(a,s),r("")).href,telephone:c.phone,email:c.email,address:{"@type":"PostalAddress",streetAddress:t(c.address)},areaServed:t(a.areas)||void 0,openingHoursSpecification:I((u=a.hours)!=null?u:[]),currenciesAccepted:n.currency,hasOfferCatalog:{"@type":"OfferCatalog",name:a.name,itemListElement:((d=o.categories)!=null?d:[]).filter(g=>i.some(h=>h.category===g.id)).map(g=>({"@type":"OfferCatalog",name:t(g.name),itemListElement:i.filter(h=>h.category===g.id).flatMap(h=>h.variants.map(l=>({"@type":"Offer",name:`${t(h.name)}${t(l.label)?` (${t(l.label)})`:""}`,priceSpecification:{"@type":"UnitPriceSpecification",price:l.price,priceCurrency:n.currency,...t(h.unit)?{unitText:t(h.unit)}:{}},itemOffered:{"@type":"Service",name:t(h.name),description:t(h.description)||t(h.name)}})))}))}}}export{Ie as renderSite};
