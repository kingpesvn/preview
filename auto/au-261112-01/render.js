var he={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,n=>he[n]);function A(a,n,t="vi"){var o,r,s;return a==null?"":typeof a!="object"?String(a):(s=(r=(o=a[n])!=null?o:a[t])!=null?r:Object.values(a)[0])!=null?s:""}var ue={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},F=a=>{var n;return(n=ue[a])!=null?n:"en-US"};function me(a,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(a)-.01);let t=Number(n)||1;return Math.max(t,Math.round(a/t)*t)}function K(a,n){var o,r;if(n.default)return a.basePrice;let t=(r=(o=a.prices)==null?void 0:o[n.id])!=null?r:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:me(a.basePrice*n.rate,n.rounding)}var ge=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function J(a,n){let t={style:"currency",currency:n.currency};return ge.has(n.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(F(n.lang),t).format(a)}function Z(a="/"){let n=a.endsWith("/")?a:`${a}/`;return(t="")=>n+String(t).replace(/^\//,"")}var L=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,T=(a,n)=>{let t=L(n);return t==null?n:a(t)},P=(a="")=>String(a).replace(/\D/g,"");function O(a,n,t=""){switch(a){case"phone":return`tel:${P(n.phone)}`;case"zalo":return`https://zalo.me/${P(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${P(n.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var G=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,fe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function Y(a){if(!a||typeof a!="string")return null;let n;try{n=new URL(a.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let t=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let o={};for(let[r,s]of n.searchParams){if(!/^entry\.\d+$/.test(r))continue;let c=s.trim().replace(/^\{|\}$/g,"").toLowerCase();fe.includes(c)&&(o[c]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var H={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var be={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},f=(a,n=20,t="")=>{var o;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(o=be[a])!=null?o:""}</svg>`},V=[1,2,3,4,5,6,0],ve=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Q(a,n){let t=a.map(r=>V.indexOf(r)).sort((r,s)=>r-s);return t.every((r,s)=>s===0||r===t[s-1]+1)&&t.length>2?`${n[V[t[0]]]} \u2013 ${n[V[t.at(-1)]]}`:t.map(r=>n[V[r]]).join(", ")}var ee=a=>a.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(t=>ve[t]),opens:n.open,closes:n.close}));function ae(a){var t,o;return(o=(t=new Intl.NumberFormat(F(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:t.value)!=null?o:a.currency}var te=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',ne=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`;var X={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ye=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,$e=a=>{var n;try{let t=new URL(String((n=a.googleReview)!=null?n:"").trim());return t.protocol==="https:"&&ye.test(t.hostname)?t.href:""}catch{return""}},re=(a,n,t,o="btn btn--line")=>{var c;let r=$e(a);if(!r)return"";let s=typeof n.reviews=="object"&&((c=n.reviews)==null?void 0:c.google)||X[t]||X.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${f("star",16)} ${e(s)}</a></p>`},B={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},oe={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},se=a=>{var n;return((n=a.reviews)!=null?n:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function ie(a,n){var s,c,i;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!t)return"";let o=new Date(Date.UTC(+t[1],+t[2]-1,+((c=t[3])!=null?c:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((i=oe[n])!=null?i:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function ke(a,n){var c,i;let t=a.filter(d=>d.rating>=1&&d.rating<=5);if(t.length<2)return"";let o=t.reduce((d,p)=>d+Number(p.rating),0)/t.length,r=(c=B[n])!=null?c:B.en,s=new Intl.NumberFormat((i=oe[n])!=null?i:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${f("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function le(a,n,t,o){var c;if(!a.length)return"";let r=(c=B[n])!=null?c:B.en,s=i=>`<button type="button" class="rv-btn" data-rv-${i} aria-label="${e(i==="prev"?r.prev:r.next)}">${f("arrow",18,i==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ke(a,n)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${t} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${xe}`}var xe=`<style>
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
upd()}})()<\/script>`;var ce=(a,n,t)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(n.footer.madeWith)}</a>`;function pe({site:a,markets:n,url:t,abs:o}){var c;let r=(c=n.find(i=>i.default))!=null?c:n[0],s=n.map(i=>({id:i.id,lang:i.lang,country:i.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${n.map(i=>`<link rel="alternate" hreflang="${e(i.lang)}-${e(i.country)}" href="${o(`${i.id}/`)}">`).join(`
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
<body><p>${n.map(i=>`<a href="${t(`${i.id}/`)}">${e(i.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var we="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap",de=a=>String(a!=null?a:"").split(`
`).map(n=>n.trim()).filter(Boolean);function Ke({site:a,catalog:n,i18n:t,template:o,basePath:r="/",siteUrl:s=a.domain}){let c=Z(r),i=u=>new URL(c(u),s).href,d=n.markets,p=Y(a.bookingForm),b=p&&!p.error?p:null,y=d.map(u=>{var C,q,R,E,g,I,U,W;let l=u.lang,j=(q=(C=t[l])!=null?C:t.en)!=null?q:t.vi,k=h=>A(h,l,"en"),x=h=>h&&h.basePrice!=null?K(h,u):null,w=((R=n.products)!=null?R:[]).filter(h=>k(h==null?void 0:h.name)).map(h=>{var $;return{...h,seats:Number(h.seats)||0,bags:Number(h.bags)||0,from:x((($=h.variants)!=null?$:[])[0])}}).sort((h,$)=>h.seats-$.seats),M=((E=a.zones)!=null?E:[]).filter(h=>(h==null?void 0:h.id)&&k(h.name)).map(h=>({...h,fare:Object.fromEntries(w.map($=>{var _;return[$.id,x((_=h.fares)==null?void 0:_[$.id])]}))})),D=((g=a.airports)!=null?g:[]).filter(h=>(h==null?void 0:h.id)&&k(h.name)),S=((I=a.extras)!=null?I:[]).filter(h=>k(h==null?void 0:h.name)).map(h=>{var $;return{...h,price:($=x(h))!=null?$:0}}),m=(W=(U=a.bookingChannels)==null?void 0:U[u.id])!=null?W:["phone"],v=h=>J(h,u),N=Math.min(...M.flatMap(h=>Object.values(h.fare).filter($=>$!=null))),z={site:a,catalog:n,market:u,markets:d,lang:l,t:j,L:k,url:c,abs:i,cars:w,zones:M,airports:D,extras:S,channels:m,money:v,template:o,gform:b,minFare:Number.isFinite(N)?N:null};return{path:`${u.id}/index.html`,html:Me(z)}});return y.push({path:"index.html",html:pe({site:a,markets:d,url:c,abs:i})}),y}function Me(a){var D,S,m,v,N,z,C,q,R,E;let{site:n,market:t,markets:o,lang:r,t:s,L:c,url:i,abs:d,cars:p,zones:b,extras:y}=a,u=`${n.name} \xB7 ${c(n.tagline)}`,l=(D=n.theme)!=null?D:{},j=["primary","ink","bg","surface","soft","accent"].filter(g=>l[g]).map(g=>`--${g}:${l[g]}`).join(";"),k=(S=o.find(g=>g.default))!=null?S:o[0],x=o.map(g=>({id:g.id,lang:g.lang,country:g.country,currency:g.currency,href:i(`${g.id}/`)})),w=(m=n.contact)!=null?m:{},M={cars:p.map(g=>({id:g.id,n:c(g.name),s:g.seats,b:g.bags})),zones:b.map(g=>({id:g.id,n:c(g.name),f:g.fare})),extras:y.map(g=>({id:g.id,n:c(g.name),pr:g.price,per:g.per==="item"?"item":"trip"})),night:(v=n.night)!=null?v:null,rt:Number((N=n.roundTrip)==null?void 0:N.pct)||0,lead:Number(n.leadHours)||0};return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(u)}</title>
<meta name="description" content="${e(c(n.intro))}">
<link rel="canonical" href="${d(`${t.id}/`)}">
${o.map(g=>`<link rel="alternate" hreflang="${e(g.lang)}-${e(g.country)}" href="${d(`${g.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${k.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(u)}">
<meta property="og:description" content="${e(c(n.intro))}">
<meta property="og:url" content="${d(`${t.id}/`)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta property="og:image" content="${e(d(L(n.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((z=l.bg)!=null?z:"#0C1117")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${we}">
<link rel="stylesheet" href="${i("assets/style.css")}">
<style>:root{${j}}</style>
${G(Re(a))}${((C=n.faq)!=null?C:[]).length?G(Ee(a)):""}
<script src="${i("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(x))}' data-wa="${e(P((q=w.whatsapp)!=null?q:""))}" data-email="${e((R=w.email)!=null?R:"")}" data-copied="${e(s.copied)}" data-lang="${e(r)}" data-currency="${e(t.currency)}" data-tz="${e((E=n.timezone)!=null?E:"Asia/Ho_Chi_Minh")}">
<script type="application/json" id="ap-data">${JSON.stringify(M).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${e(s.skip)}</a>
${ne(s)}
${De(a)}
<main id="main">
  ${Se(a)}
  ${Ne(a)}
  ${ze(a)}
  ${Pe(a)}
  ${Te(a)}
  ${je(a)}
  ${Ce(a)}
</main>
${qe(a)}
</body>
</html>
`}function De({site:a,market:n,markets:t,t:o,url:r}){return`<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${r(`${n.id}/`)}">
      ${a.logo?`<img src="${e(T(r,a.logo))}" alt="" width="34" height="34">`:`<span class="brand-mark" aria-hidden="true">${f("plane",18)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="${e(o.nav.label)}">
      <a href="#fares">${e(o.nav.fares)}</a>
      <a href="#fleet">${e(o.nav.fleet)}</a>
      <a href="#how">${e(o.nav.how)}</a>
      <a href="#contact">${e(o.nav.contact)}</a>
    </nav>
    <a class="btn btn--amber btn--sm" href="#book">${e(o.nav.book)}</a>
    ${t.length>1?`<details class="market">
      <summary aria-label="${e(o.market.label)}">${f("globe",16)}<span>${e(n.id.toUpperCase())}</span></summary>
      <ul>${t.map(s=>`<li><a href="${r(`${s.id}/`)}" hreflang="${e(s.lang)}"${s.id===n.id?' aria-current="true"':""}>${e(s.country)} \xB7 ${e(s.currency)} ${e(ae(s))}</a></li>`).join("")}</ul>
    </details>`:""}
  </div>
</header>`}function Se({site:a,t:n,L:t,url:o,money:r,minFare:s}){let c=de(t(a.perks)).slice(0,3);return`<section class="hero" aria-labelledby="h-title">
  <img class="hero-bg" src="${e(T(o,a.heroImage||"photos/h-hero.webp"))}" alt="" width="1920" height="1080" fetchpriority="high">
  <div class="wrap hero-in">
    ${t(a.heroKicker)?`<p class="kicker">${e(t(a.heroKicker))}</p>`:""}
    <h1 id="h-title">${e(t(a.tagline))}</h1>
    ${t(a.intro)?`<p class="lead">${e(t(a.intro))}</p>`:""}
    <p class="actions"><a class="btn btn--amber" href="#book">${e(n.hero.book)}</a><a class="btn btn--line" href="#fares">${e(n.hero.fares)}</a>${s!=null?`<span class="from">${e(n.hero.from.replace("{price}",r(s)))}</span>`:""}</p>
  </div>
  ${c.length?`<div class="perk-strip"><ul class="wrap">${c.map(i=>`<li>${f("check",16)} ${e(i)}</li>`).join("")}</ul></div>`:""}
</section>`}function Ne(a){var M,D,S;let{site:n,t,L:o,cars:r,zones:s,airports:c,extras:i,channels:d,gform:p,market:b,money:y}=a;if(!r.length||!s.length)return"";let u=(M=n.contact)!=null?M:{},l=t.form,j=p?` data-gform="${e(p.action)}" data-gmap='${e(JSON.stringify(p.fields))}'`:"",k=t.orderText.replace(/\{\w+\}/g,"\u2026"),x=m=>d.map((v,N)=>{var z;return`<button type="submit" class="btn btn--full ${m!=null?m:N?"btn--line":"btn--amber"}" data-channel="${e(v)}" data-href="${e(O(v,u,k))}">${f(v,18)} ${e(v==="phone"?l.call:l.send.replace("{channel}",(z=t.via[v])!=null?z:v))}</button>`}).join(""),w=(D=n.night)!=null?D:{};return`<section class="sec wrap" id="book" aria-labelledby="bk-title">
  <div class="sec-head"><p class="eyebrow">${e(t.book.eyebrow)}</p><h2 id="bk-title" class="h2">${e(t.book.title)}</h2><p class="muted">${e(t.book.text)}</p></div>
  <form class="book" data-order novalidate${j} data-text="${e(t.orderText)}" data-market="${e(`${b.id.toUpperCase()} \xB7 ${b.currency}`)}" data-pick="${e(l.pickup)}" data-drop="${e(l.dropoff)}" data-ret="${e(l.returnL)}">
    <div class="order-fields book-grid">
      <div class="book-l">
        <fieldset class="field"><legend>${e(l.dir)}</legend><div class="seg">
          <label><input type="radio" name="dir" value="pickup" checked><span>${f("plane",16)} ${e(l.pickup)}</span></label>
          <label><input type="radio" name="dir" value="dropoff"><span>${f("car",16)} ${e(l.dropoff)}</span></label>
        </div></fieldset>
        <div class="row2">
          ${c.length?`<label class="field"><span>${e(l.airport)}</span><select name="airport">${c.map(m=>`<option value="${e(m.id)}">${e(o(m.name))}${m.code?` (${e(m.code)})`:""}</option>`).join("")}</select></label>`:""}
          <label class="field"><span>${e(l.zone)}</span><select name="zone" data-zone>${s.map(m=>`<option value="${e(m.id)}">${e(o(m.name))}</option>`).join("")}</select></label>
        </div>
        <label class="field"><span data-addr-l data-pick="${e(l.addrTo)}" data-drop="${e(l.addrFrom)}">${e(l.addrTo)} *</span><input name="address" required maxlength="200" placeholder="${e(l.addrHint)}"></label>
        <div class="row3">
          <label class="field"><span>${e(l.date)} *</span><input name="date" type="date" required data-date></label>
          <label class="field"><span data-time-l data-pick="${e(l.landing)}" data-drop="${e(l.pickupTime)}">${e(l.landing)} *</span><input name="time" type="time" required data-time></label>
          <label class="field" data-flight-f><span>${e(l.flight)} *</span><input name="flight" maxlength="10" placeholder="VN 123" autocapitalize="characters"></label>
        </div>
        <p class="warn" data-lead-warn data-tpl="${e(l.lead)}" hidden></p>
        <div class="row2">
          <label class="field"><span>${e(l.pax)}</span><input name="qty" type="number" min="1" max="45" value="2" inputmode="numeric" data-pax></label>
          <label class="field"><span>${e(l.bags)}</span><input name="size" type="number" min="0" max="40" value="2" inputmode="numeric" data-bags></label>
        </div>
        <fieldset class="field"><legend>${e(l.car)}</legend><div class="cars" data-cars>${r.map((m,v)=>`<label class="car-opt" data-car="${e(m.id)}"><input type="radio" name="product" value="${e(m.id)}"${v?"":" checked"}><span class="co-t"><b>${e(o(m.name))}</b><small>${e(t.fleet.cap.replace("{s}",m.seats).replace("{b}",m.bags))}</small></span><span class="co-p" data-car-price></span></label>`).join("")}</div>
          <p class="hint" data-car-hint data-auto="${e(l.auto)}" data-none="${e(l.none)}"></p></fieldset>
        <label class="check"><input type="checkbox" name="round" data-round> ${e(Number((S=n.roundTrip)==null?void 0:S.pct)?l.round.replace("{pct}",n.roundTrip.pct):l.roundPlain)}</label>
        <div class="row2" data-return hidden>
          <label class="field"><span>${e(l.retDate)}</span><input name="rdate" type="date" data-rdate></label>
          <label class="field"><span>${e(l.retTime)}</span><input name="rtime" type="time" data-rtime></label>
        </div>
        ${i.length?`<fieldset class="field"><legend>${e(l.extras)}</legend><div class="extras">${i.map(m=>`<label class="ex"><span>${e(o(m.name))}<small>${m.price?`+${e(y(m.price))}${m.per==="item"?` ${e(l.each)}`:""}`:e(l.free)}</small></span>${m.per==="item"?`<input type="number" min="0" max="${Number(m.max)||4}" value="0" name="x-${e(m.id)}" data-extra="${e(m.id)}" inputmode="numeric">`:`<input type="checkbox" name="x-${e(m.id)}" data-extra="${e(m.id)}">`}</label>`).join("")}</div></fieldset>`:""}
        <div class="row2">
          <label class="field"><span>${e(l.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(l.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(l.note)}</span><textarea name="note" rows="2" maxlength="500" placeholder="${e(l.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
      </div>
      <aside class="quote" aria-live="polite">
        <p class="eyebrow">${e(l.quote)}</p>
        <dl class="q-rows">
          <div><dt data-q-car-l>${e(l.car)}</dt><dd data-q-car></dd></div>
          <div data-q-night-row hidden><dt>${e(l.night.replace("{pct}",Number(w.pct)||0))}</dt><dd data-q-night></dd></div>
          <div data-q-rt-row hidden><dt>${e(l.returnL)}</dt><dd data-q-rt></dd></div>
          <div data-q-ex-row hidden><dt>${e(l.extras)}</dt><dd data-q-ex></dd></div>
          <div class="q-total"><dt>${e(l.total)}</dt><dd data-q-total></dd></div>
        </dl>
        <p class="hint">${e(Number(n.waitFree)?l.wait.replace("{n}",n.waitFree):l.fixed)}</p>
        <p class="form-err" data-err hidden>${e(l.required)}</p>
        <button class="btn btn--amber btn--full" type="submit" data-submit>${e(l.submit)}</button>
        <p class="hint">${e(l.privacy)}</p>
      </aside>
    </div>
    <div class="done" data-done hidden tabindex="-1">
      <p class="done-title">${e(p?l.done:l.stepTitle)}</p>
      <p>${e(p?l.doneText:l.stepText)}</p>
      <div class="buy">${x(p?"btn--line":void 0)}</div>
      ${p?"":`<button type="button" class="link back" data-edit>${e(l.edit)}</button>`}
    </div>
    <p class="form-msg" role="status" hidden></p>
  </form>
</section>`}function ze({zones:a,cars:n,t,L:o,url:r,money:s,airports:c}){return a.length?`<section class="sec sec--dark" id="fares" aria-labelledby="fr-title">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">${e(t.fares.eyebrow)}</p><h2 id="fr-title" class="h2">${e(t.fares.title)}</h2><p class="muted">${e(t.fares.text)}</p></div>
    <div class="tbl"><table class="fare-tbl">
      <thead><tr><th scope="col">${e(t.fares.zone)}</th>${n.map(i=>`<th scope="col">${e(o(i.name))}<small>${e(t.fleet.cap.replace("{s}",i.seats).replace("{b}",i.bags))}</small></th>`).join("")}</tr></thead>
      <tbody>${a.map(i=>{var d;return`<tr><th scope="row">${i.image?`<img src="${e(T(r,i.image))}" alt="" width="96" height="72" loading="lazy">`:""}<span><b>${e(o(i.name))}</b>${i.km?`<small>${e(t.fares.km.replace("{km}",i.km).replace("{min}",(d=i.minutes)!=null?d:"\u2014"))}</small>`:""}</span></th>${n.map(p=>`<td>${i.fare[p.id]!=null?e(s(i.fare[p.id])):"\u2014"}</td>`).join("")}</tr>`}).join("")}</tbody>
    </table></div>
    <p class="hint">${e(t.fares.note)}</p>
    ${c.length?`<ul class="airports">${c.map(i=>{var d;return`<li><b>${e((d=i.code)!=null?d:"")}</b><span>${e(o(i.name))}</span>${o(i.note)?`<small>${e(o(i.note))}</small>`:""}</li>`}).join("")}</ul>`:""}
  </div>
</section>`:""}function Pe({cars:a,t:n,L:t,url:o,money:r}){return a.length?`<section class="sec wrap" id="fleet" aria-labelledby="fl-title">
  <div class="sec-head"><p class="eyebrow">${e(n.fleet.eyebrow)}</p><h2 id="fl-title" class="h2">${e(n.fleet.title)}</h2></div>
  <ul class="fleet">${a.map(s=>`<li class="veh">
    ${s.image?`<img sizes="${H.card}" src="${e(T(o,s.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
    <div class="veh-in">
      ${t(s.badge)?`<span class="tag">${e(t(s.badge))}</span>`:""}
      <h3>${e(t(s.name))}</h3>
      <p class="veh-cap"><span>${f("users",16)} ${e(n.fleet.seats.replace("{n}",s.seats))}</span><span>${f("bag",16)} ${e(n.fleet.bagsN.replace("{n}",s.bags))}</span></p>
      ${t(s.description)?`<p class="muted">${e(t(s.description))}</p>`:""}
      ${s.from!=null?`<p class="veh-from">${e(n.hero.from.replace("{price}",r(s.from)))}</p>`:""}
    </div>
  </li>`).join("")}</ul>
</section>`:""}function Te({site:a,t:n,L:t,url:o}){var i,d;let r=((i=a.steps)!=null?i:[]).filter(p=>t(p==null?void 0:p.title)),s=de(t(a.perks)),c=((d=a.gallery)!=null?d:[]).filter(p=>p==null?void 0:p.image);return!r.length&&!s.length?"":`<section class="sec wrap" id="how" aria-labelledby="hw-title">
  <div class="sec-head"><p class="eyebrow">${e(n.how.eyebrow)}</p><h2 id="hw-title" class="h2">${e(n.how.title)}</h2></div>
  ${r.length?`<ol class="steps">${r.map((p,b)=>{var y;return`<li><span class="st-n">${String(b+1).padStart(2,"0")}</span>${f((y=p.icon)!=null?y:"check",22)}<h3>${e(t(p.title))}</h3>${t(p.text)?`<p class="muted">${e(t(p.text))}</p>`:""}</li>`}).join("")}</ol>`:""}
  ${s.length?`<ul class="perks">${s.map(p=>`<li>${f("check",16)} ${e(p)}</li>`).join("")}</ul>`:""}
  ${c.length?`<div class="pics">${c.map(p=>{var b;return`<figure><img sizes="${H.card}" src="${e(T(o,p.image))}" alt="${e((b=t(p.caption))!=null?b:"")}" width="1200" height="800" loading="lazy">${t(p.caption)?`<figcaption>${e(t(p.caption))}</figcaption>`:""}</figure>`}).join("")}</div>`:""}
</section>`}function je({site:a,t:n,L:t,lang:o}){let r=re(a,n,o,"btn btn--line"),s=se(a);return a.showReviews===!1||!s.length&&!r?"":`<section class="sec wrap" aria-labelledby="rv-title">
  <div class="sec-head"><h2 id="rv-title" class="h2">${e(n.reviews.title)}</h2></div>
  ${le(s,o,"reviews",c=>`<figure class="review">
    <p class="stars" aria-label="${e(c.rating)}/5">${Array.from({length:5},(i,d)=>`<span class="${d<c.rating?"on":""}">${f("star",14)}</span>`).join("")}</p>
    <blockquote>${e(t(c.text))}</blockquote>
    <figcaption>${e(c.name)}${t(c.bought)?`<small>${e(t(c.bought))}</small>`:""}${ie(c,o)}</figcaption>
  </figure>`)}${r}
</section>`}function Ce({site:a,t:n,L:t,channels:o}){var d,p,b,y;let r=(d=a.contact)!=null?d:{},s=encodeURIComponent((p=r.mapQuery)!=null?p:t(r.address)),c=u=>u.length===7?n.contact.everyDay:Q(u,n.days),i=((b=a.faq)!=null?b:[]).filter(u=>t(u==null?void 0:u.q));return`<section class="sec wrap" id="contact" aria-labelledby="ct-title">
  <div class="contact">
    <div>
      <p class="eyebrow">${e(n.contact.eyebrow)}</p>
      <h2 id="ct-title" class="h2">${e(n.contact.title)}</h2>
      ${t(r.address)?`<p class="addr">${f("pin",18)} ${e(t(r.address))}</p>`:""}
      ${((y=a.hours)!=null?y:[]).length?`<table class="hours"><tbody>${a.hours.map(u=>`<tr><th scope="row">${e(c(u.days))}</th><td>${e(u.open)} \u2013 ${e(u.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <p class="actions">${o.map(u=>{var l;return`<a class="btn btn--line" href="${e(O(u,r))}" ${te(u)}>${f(u,18)} ${e((l=n.via[u])!=null?l:u)}</a>`}).join("")}
        ${t(r.address)?`<a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(n.contact.directions)}</a>`:""}</p>
    </div>
    ${i.length?`<div class="faq"><h3 class="h3">${e(n.faq.title)}</h3>${i.map((u,l)=>`<details${l===0?" open":""}><summary>${e(t(u.q))}</summary><p>${e(t(u.a))}</p></details>`).join("")}</div>`:""}
  </div>
</section>`}function qe({site:a,t:n,L:t,market:o}){var c,i;let r=(c=a.contact)!=null?c:{},s=Object.entries((i=a.social)!=null?i:{}).filter(([,d])=>d);return`<footer class="footer"><div class="wrap">
  <p class="foot-name">${e(a.name)}</p>
  ${t(a.disclaimer)?`<p class="disclaimer">${e(t(a.disclaimer))}</p>`:""}
  <p>${r.phone?`${e(n.footer.hotline)}: <a href="tel:${P(r.phone)}">${e(r.phone)}</a>`:""}${r.email?` \xB7 <a href="mailto:${e(r.email)}">${e(r.email)}</a>`:""}</p>
  ${s.length?`<p class="social">${s.map(([d,p])=>`<a href="${e(p)}" target="_blank" rel="noopener">${e(d==="tiktok"?"TikTok":d==="youtube"?"YouTube":d[0].toUpperCase()+d.slice(1))}</a>`).join(" \xB7 ")}</p>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${ce(a,n,o.lang)}</div>
</footer>`}function Re({site:a,market:n,L:t,abs:o,cars:r,minFare:s}){var i,d;let c=(i=a.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"TaxiService",name:a.name,url:o(`${n.id}/`),description:t(a.intro),image:o(L(a.heroImage||"photos/h-hero.webp")),provider:{"@type":"LocalBusiness",name:a.name,telephone:c.phone,email:c.email,address:t(c.address)?{"@type":"PostalAddress",streetAddress:t(c.address)}:void 0,openingHoursSpecification:ee((d=a.hours)!=null?d:[])},areaServed:t(a.area)||void 0,offers:s!=null?{"@type":"Offer",price:s,priceCurrency:n.currency,description:r.map(p=>t(p.name)).join(", ")}:void 0}}var Ee=({site:a,L:n})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(t=>n(t==null?void 0:t.q)).map(t=>({"@type":"Question",name:n(t.q),acceptedAnswer:{"@type":"Answer",text:n(t.a)}}))});export{Ke as renderSite};
