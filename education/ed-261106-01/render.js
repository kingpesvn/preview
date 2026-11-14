var re={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,n=>re[n]);function V(t,n,a="vi"){var o,r,i;return t==null?"":typeof t!="object"?String(t):(i=(r=(o=t[n])!=null?o:t[a])!=null?r:Object.values(t)[0])!=null?i:""}var ie={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},C=t=>{var n;return(n=ie[t])!=null?n:"en-US"};function se(t,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(t)-.01);let a=Number(n)||1;return Math.max(a,Math.round(t/a)*a)}function F(t,n){var o,r;if(n.default)return t.basePrice;let a=(r=(o=t.prices)==null?void 0:o[n.id])!=null?r:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:se(t.basePrice*n.rate,n.rounding)}var le=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function G(t,n){let a={style:"currency",currency:n.currency};return le.has(n.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(C(n.lang),a).format(t)}function H(t="/"){let n=t.endsWith("/")?t:`${t}/`;return(a="")=>n+String(a).replace(/^\//,"")}var R=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,q=(t,n)=>{let a=R(n);return a==null?n:t(a)},P=(t="")=>String(t).replace(/\D/g,"");function L(t,n,a=""){switch(t){case"phone":return`tel:${P(n.phone)}`;case"zalo":return`https://zalo.me/${P(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${P(n.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var A=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,ce=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function I(t){if(!t||typeof t!="string")return null;let n;try{n=new URL(t.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let a=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let o={};for(let[r,i]of n.searchParams){if(!/^entry\.\d+$/.test(r))continue;let l=i.trim().replace(/^\{|\}$/g,"").toLowerCase();ce.includes(l)&&(o[l]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var pe={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(t,n=20,a="")=>{var o;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(o=pe[t])!=null?o:""}</svg>`},E=[1,2,3,4,5,6,0],de=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function W(t,n){let a=t.map(r=>E.indexOf(r)).sort((r,i)=>r-i);return a.every((r,i)=>i===0||r===a[i-1]+1)&&a.length>2?`${n[E[a[0]]]} \u2013 ${n[E[a.at(-1)]]}`:a.map(r=>n[E[r]]).join(", ")}var _=t=>t.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(a=>de[a]),opens:n.open,closes:n.close}));function K(t){var a,o;return(o=(a=new Intl.NumberFormat(C(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:a.value)!=null?o:t.currency}var J=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',Z=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,Y=(t,n)=>{var a;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((a=t.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${e(n.visit.open)}" data-closed="${e(n.visit.closed)}" hidden></p>`},U={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},he=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ue=t=>{var n;try{let a=new URL(String((n=t.googleReview)!=null?n:"").trim());return a.protocol==="https:"&&he.test(a.hostname)?a.href:""}catch{return""}},X=(t,n,a,o="btn btn--line")=>{var l;let r=ue(t);if(!r)return"";let i=typeof n.reviews=="object"&&((l=n.reviews)==null?void 0:l.google)||U[a]||U.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${u("star",16)} ${e(i)}</a></p>`},B={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},Q={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ee=t=>{var n;return((n=t.reviews)!=null?n:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function te(t,n){var i,l,p;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=t==null?void 0:t.date)!=null?i:"").trim());if(!a)return"";let o=new Date(Date.UTC(+a[1],+a[2]-1,+((l=a[3])!=null?l:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((p=Q[n])!=null?p:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(t.date)}">${e(r)}</time>`}function me(t,n){var l,p;let a=t.filter(c=>c.rating>=1&&c.rating<=5);if(a.length<2)return"";let o=a.reduce((c,s)=>c+Number(s.rating),0)/a.length,r=(l=B[n])!=null?l:B.en,i=new Intl.NumberFormat((p=Q[n])!=null?p:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(t.length)))}</span></p>`}function ae(t,n,a,o){var l;if(!t.length)return"";let r=(l=B[n])!=null?l:B.en,i=p=>`<button type="button" class="rv-btn" data-rv-${p} aria-label="${e(p==="prev"?r.prev:r.next)}">${u("arrow",18,p==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${me(t,n)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${a} rv-track" tabindex="0">${t.map(o).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${ge}`}var ge=`<style>
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
upd()}})()<\/script>`;var ne=(t,n,a)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(n.footer.madeWith)}</a>`;function oe({site:t,markets:n,url:a,abs:o}){var l;let r=(l=n.find(p=>p.default))!=null?l:n[0],i=n.map(p=>({id:p.id,lang:p.lang,country:p.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${n.map(p=>`<link rel="alternate" hreflang="${e(p.lang)}-${e(p.country)}" href="${o(`${p.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(i)}, root = ${JSON.stringify(a(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${n.map(p=>`<a href="${a(`${p.id}/`)}">${e(p.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var fe="https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ve={home:"house",center:"users",online:"wifi"};function be(t,n){var a;return((a=t.products)!=null?a:[]).map(o=>{var i;let r=((i=o.variants)!=null?i:[]).length?F(o.variants[0],n):null;return r==null?null:{...o,price:r}}).filter(Boolean)}function Ie({site:t,catalog:n,i18n:a,template:o,basePath:r="/",siteUrl:i=t.domain}){let l=H(r),p=f=>new URL(l(f),i).href,c=n.markets,s=I(t.bookingForm),h=s&&!s.error?s:null,v=c.map(f=>{var x,y,$,m;let b=f.lang,w=(y=(x=a[b])!=null?x:a.en)!=null?y:a.vi,M=j=>V(j,b,"en"),D=(m=($=t.bookingChannels)==null?void 0:$[f.id])!=null?m:["phone"],S=j=>G(j,f),N=be(n,f),z={site:t,catalog:n,market:f,markets:c,lang:b,t:w,L:M,url:l,abs:p,channels:D,money:S,formats:N,template:o,gform:h};return{path:`${f.id}/index.html`,html:ye(z)}});return v.push({path:"index.html",html:oe({site:t,markets:c,url:l,abs:p})}),v}function ye(t){var M,D,S,N,z,x,y,$;let{site:n,market:a,markets:o,lang:r,t:i,L:l,url:p,abs:c}=t,s=`${n.name} \xB7 ${l(n.tagline)}`,h=(M=n.theme)!=null?M:{},v=["primary","ink","bg","surface","soft","accent"].filter(m=>h[m]).map(m=>`--${m}:${h[m]}`).join(";"),f=(D=o.find(m=>m.default))!=null?D:o[0],b=o.map(m=>({id:m.id,lang:m.lang,country:m.country,currency:m.currency,href:p(`${m.id}/`)})),w=(S=n.contact)!=null?S:{};return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(s)}</title>
<meta name="description" content="${e(l(n.intro))}">
<link rel="canonical" href="${c(`${a.id}/`)}">
${o.map(m=>`<link rel="alternate" hreflang="${e(m.lang)}-${e(m.country)}" href="${c(`${m.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${f.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(s)}">
<meta property="og:description" content="${e(l(n.intro))}">
<meta property="og:url" content="${c(`${a.id}/`)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta property="og:image" content="${e(c(R(n.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((N=h.bg)!=null?N:"#F7F5EF")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fe}">
<link rel="stylesheet" href="${p("assets/style.css")}">
<style>:root{${v}}</style>
${A(Pe(t))}${((z=n.faq)!=null?z:[]).length?A(Te(t)):""}
<script src="${p("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(a.id)}" data-markets='${e(JSON.stringify(b))}' data-wa="${e(P((x=w.whatsapp)!=null?x:""))}" data-email="${e((y=w.email)!=null?y:"")}" data-copied="${e(i.copied)}" data-tz="${e(($=n.timezone)!=null?$:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(i.skip)}</a>
${Z(i)}
${$e(t)}
<main id="main">
${[xe,ke,we,Me,De,Se,Ne,ze].map(m=>m(t)).join(`
`)}
</main>
${je(t)}
<a class="fab" href="#quote" data-fab>${u("calendar",20)} <span>${e(i.nav.quote)}</span></a>
</body>
</html>
`}function $e({site:t,market:n,markets:a,t:o,url:r}){let i=[["#formats",o.nav.formats],["#subjects",o.nav.subjects],["#process",o.nav.process],["#contact",o.nav.contact]];return`<header class="header">
  <div class="pill">
    <a class="brand" href="${r(`${n.id}/`)}">
      ${t.logo?`<img src="${e(q(r,t.logo))}" alt="" width="32" height="32">`:`<span class="brand-mark" aria-hidden="true">${u("book",18)}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([l,p])=>`<a href="${l}">${e(p)}</a>`).join("")}</nav>
    ${a.length>1?`<details class="market">
      <summary aria-label="${e(o.market.label)}">${u("globe",16)}<span>${e(n.id.toUpperCase())}<span class="cur"> \xB7 ${e(K(n))}</span></span></summary>
      <ul>${a.map(l=>`<li><a href="${r(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===n.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)}</a></li>`).join("")}</ul>
    </details>`:""}
    <details class="mnav">
      <summary aria-label="${e(o.nav.openMenu)}">${u("menu",20)}</summary>
      <nav aria-label="Menu">${i.map(([l,p])=>`<a href="${l}">${e(p)}</a>`).join("")}</nav>
    </details>
    <a class="btn btn--accent btn--sm" href="#quote">${e(o.nav.quote)}</a>
  </div>
</header>`}function xe({site:t,t:n,L:a,url:o}){var p,c,s;let r=((p=t.samples)!=null?p:[]).filter(h=>a(h==null?void 0:h.code)&&a(h==null?void 0:h.text)).slice(0,4),i=((c=t.trust)!=null?c:[]).filter(h=>a(h==null?void 0:h.text)),l=((s=t.subjects)!=null?s:[]).filter(h=>a(h==null?void 0:h.name)).length;return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${a(t.heroKicker)?`<p class="kicker">${e(a(t.heroKicker))}</p>`:""}
      <h1>${e(a(t.tagline))}</h1>
      ${a(t.intro)?`<p class="lead">${e(a(t.intro))}</p>`:""}
      <a class="btn btn--accent btn--xl" href="#quote">${u("calendar",22)} ${e(n.hero.cta)} ${u("arrow",20)}</a>
      <p class="hero-sub">${e(n.hero.sub.replace("{n}",l))}</p>
      ${i.length?`<ul class="trust">${i.map(h=>{var v;return`<li>${u((v=h.icon)!=null?v:"check",18)} ${e(a(h.text))}</li>`}).join("")}</ul>`:""}
    </div>
    <figure class="hero-fig">
      <img src="${e(q(o,t.heroImage||"photos/h-hero.webp"))}" alt="" width="1200" height="1400" fetchpriority="high">
      ${r.length?`<figcaption class="samples"><span class="samples-h">${e(n.hero.samples)}</span>${r.map(h=>`<p><code>${e(a(h.code))}</code><span>${e(a(h.text))}</span></p>`).join("")}</figcaption>`:""}
    </figure>
  </div>
</section>`}function ke(t){var y,$,m,j,O;let{site:n,t:a,L:o,formats:r,money:i,channels:l,gform:p,market:c}=t;if(!r.length)return"";let s=a.quote,h=(y=n.contact)!=null?y:{},v=(($=n.grades)!=null?$:[]).filter(d=>o(d==null?void 0:d.name)),f=((m=n.subjects)!=null?m:[]).filter(d=>o(d==null?void 0:d.name)),b=((j=n.tutorTypes)!=null?j:[]).filter(d=>o(d==null?void 0:d.name)),w=((O=n.lengths)!=null?O:[60,90,120]).map(Number).filter(d=>d>0),M=p?` data-gform="${e(p.action)}" data-gmap='${e(JSON.stringify(p.fields))}'`:"",D=a.orderText.replace(/\{\w+\}/g,"\u2026"),S=d=>l.map((g,k)=>{var T;return`<button type="submit" class="btn ${d!=null?d:k?"btn--line":"btn--accent"}" data-channel="${e(g)}" data-href="${e(L(g,h,D))}">${u(g,18)} ${e(g==="phone"?s.call:s.send.replace("{channel}",(T=a.via[g])!=null?T:g))}</button>`}).join(""),N=r.map(d=>{var g,k;return{id:d.id,k:(g=d.kind)!=null?g:"home",p:d.price,x:Number(d.extra)||0,u:(k=o(d.unit))!=null?k:""}}),z=[1,2,3,4,5,6,0],x=[2,4];return`<section class="section quote-sec" id="quote" aria-labelledby="q-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(s.kicker)}</p><h2 id="q-title" class="h2">${e(s.title)}</h2><p class="lead">${e(s.text)}</p></div>
    <form class="quote" data-quote novalidate${M} data-text="${e(a.orderText)}" data-market="${e(`${c.id.toUpperCase()} \xB7 ${c.currency}`)}"
      data-formats='${e(JSON.stringify(N))}' data-weeks="${Number(n.weeks)||4}"
      data-currency="${e(c.currency)}" data-lang="${e(c.lang)}" data-locale="${e(C(c.lang))}">
      <div class="q-main">
        <fieldset class="field"><legend><b>1</b> ${e(s.format)}</legend>
          <div class="tabs">${r.map((d,g)=>{var k,T;return`<label class="tab"><input type="radio" name="format" value="${e(d.id)}" data-label="${e(o(d.name))}"${g?"":" checked"}><span>${u((k=ve[d.kind])!=null?k:"book",20)}<b>${e(o(d.name))}</b><small>${e(s.from.replace("{price}",i(d.price)).replace("{unit}",(T=o(d.unit))!=null?T:""))}</small></span></label>`}).join("")}</div>
        </fieldset>
        <fieldset class="field"><legend><b>2</b> ${e(s.level)}</legend>
          <div class="row2">
            <label class="field"><span>${e(s.grade)}</span><select name="grade" data-grade>${v.map((d,g)=>`<option value="${e(d.id)}" data-mult="${Number(d.mult)||1}"${g===1?" selected":""}>${e(o(d.name))}</option>`).join("")}</select></label>
            <label class="field"><span>${e(s.subject)}</span><select name="subject" data-subject>${f.map(d=>`<option value="${e(d.id)}" data-mult="${Number(d.mult)||1}">${e(o(d.name))}</option>`).join("")}</select></label>
          </div>
        </fieldset>
        ${b.length?`<fieldset class="field"><legend><b>3</b> ${e(s.tutor)}</legend>
          <div class="tabs tabs--tutor">${b.map((d,g)=>`<label class="tab"><input type="radio" name="tutor" value="${e(o(d.name))}" data-mult="${Number(d.mult)||1}" data-days="${Number(d.days)||0}"${g?"":" checked"}><span><b>${e(o(d.name))}</b>${o(d.text)?`<small>${e(o(d.text))}</small>`:""}${Number(d.mult)>1?`<em>+${Math.round((Number(d.mult)-1)*100)}%</em>`:""}</span></label>`).join("")}</div>
        </fieldset>`:""}
        <fieldset class="field"><legend><b>4</b> ${e(s.schedule)}</legend>
          <div class="days" role="group" aria-label="${e(s.days)}">${z.map(d=>`<label class="day"><input type="checkbox" name="day" value="${d}" data-name="${e(a.days[d])}"${x.includes(d)?" checked":""}><span>${e(a.short[d])}</span></label>`).join("")}</div>
          <p class="hint" data-spw data-tpl="${e(s.perWeek)}">\u2014</p>
          <div class="row2">
            <label class="field"><span>${e(s.time)}</span><select name="time">${s.times.map((d,g)=>`<option${g===2?" selected":""}>${e(d)}</option>`).join("")}</select></label>
            <label class="field"><span>${e(s.length)}</span><select name="len" data-len>${w.map(d=>`<option value="${d}"${d===90?" selected":""}>${e(s.minutes.replace("{n}",d))}</option>`).join("")}</select></label>
          </div>
        </fieldset>
        <label class="field field--students"><span>${e(s.students)}</span>
          <span class="stepper"><button type="button" data-step="-1" aria-label="\u2212">${u("minus",16)}</button><input name="students" type="number" min="1" max="8" value="1" inputmode="numeric" data-students><button type="button" data-step="1" aria-label="+">${u("plus",16)}</button></span>
          <small class="hint" data-students-hint data-tpl="${e(s.studentsHint)}">${e(s.studentsHint)}</small></label>
      </div>
      <aside class="q-side">
        <div class="ticket">
          <p class="ticket-h">${e(s.estimate)}</p>
          <dl class="lines">
            <div><dt>${e(s.perSession)}</dt><dd data-v-session>\u2014</dd></div>
            <div><dt data-l-month data-tpl="${e(s.monthLine)}">\u2014</dt><dd data-v-month>\u2014</dd></div>
          </dl>
          <p class="total"><span>${e(s.total)}</span><b data-total>\u2014</b></p>
          <p class="eta" data-eta-wrap>${u("calendar",16)} <span data-eta data-tpl="${e(s.trial)}">\u2014</span></p>
          <p class="fine">${e(o(n.note)||s.note)}</p>
        </div>
        <div class="order-fields">
          <div class="row2">
            <label class="field"><span>${e(s.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
            <label class="field"><span>${e(s.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          </div>
          <label class="field" data-home-only><span>${e(s.address)} *</span><input name="address" autocomplete="street-address" maxlength="200"></label>
          <label class="field"><span>${e(s.email)}</span><input name="email" type="email" autocomplete="email" maxlength="120"></label>
          <label class="field"><span>${e(s.note2)}</span><textarea name="note" rows="2" maxlength="400" placeholder="${e(s.noteHint)}"></textarea></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          <p class="form-err" data-err hidden>${e(s.required)}</p>
          <button class="btn btn--accent btn--lg btn--full" type="submit" data-submit>${u("calendar",18)} ${e(s.submit)}</button>
          <p class="hint">${u("shield",14)} ${e(s.privacy)}</p>
        </div>
        <div class="done" data-done hidden tabindex="-1">
          <p class="done-title">${u(p?"check":"arrow",22)} ${e(p?s.done:s.stepTitle)}</p>
          <p>${e(p?s.doneText:s.stepText)}</p>
          <div class="buy">${S(p?"btn--line":void 0)}</div>
          ${p?"":`<button type="button" class="link" data-edit>${e(s.edit)}</button>`}
        </div>
        <p class="form-msg" role="status" hidden></p>
      </aside>
    </form>
  </div>
</section>`}function we({t,L:n,url:a,money:o,formats:r}){return r.length?`<section class="section" id="formats" aria-labelledby="fm-title">
  <div class="wrap">
    <div class="sec-head sec-head--row"><div><p class="kicker">${e(t.formats.kicker)}</p><h2 id="fm-title" class="h2">${e(t.formats.title)}</h2></div><a class="btn btn--line" href="#quote">${e(t.nav.quote)} ${u("arrow",16)}</a></div>
    <ul class="svc">${r.map((i,l)=>{var p;return`<li class="svc-card${l===0?" is-big":""}">
      ${i.image?`<img src="${e(q(a,i.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
      <div><h3>${e(n(i.name))}</h3>${n(i.description)?`<p>${e(n(i.description))}</p>`:""}
      <p class="svc-price">${e(t.quote.from.replace("{price}",o(i.price)).replace("{unit}",(p=n(i.unit))!=null?p:""))}</p>
      <a class="link" href="#quote" data-pick-format="${e(i.id)}">${e(t.formats.quote)} ${u("arrow",14)}</a></div>
    </li>`}).join("")}</ul>
  </div>
</section>`:""}function Me({site:t,t:n,L:a,formats:o,money:r}){var p;let i=((p=t.grades)!=null?p:[]).filter(c=>a(c==null?void 0:c.name));if(!i.length)return"";let l=o.reduce((c,s)=>s.price<c.price?s:c,o[0]);return`<section class="section section--soft" id="subjects" aria-labelledby="sj-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.subjects.kicker)}</p><h2 id="sj-title" class="h2">${e(n.subjects.title)}</h2><p class="lead">${e(n.subjects.text)}</p></div>
    <div class="tiers">${i.map(c=>{var h,v;let s=String((h=a(c.subjects))!=null?h:"").split(/[,，、]\s*/).map(f=>f.trim()).filter(Boolean);return`<div class="tier">
      <p class="tier-h"><b>${e(a(c.name))}</b>${l?`<span>${e(n.quote.from.replace("{price}",r(Math.round(l.price*(Number(c.mult)||1)))).replace("{unit}",(v=a(l.unit))!=null?v:""))}</span>`:""}</p>
      <ul>${s.map(f=>`<li>${u("check",14)} ${e(f)}</li>`).join("")}</ul>
    </div>`}).join("")}</div>
  </div>
</section>`}function De({site:t,t:n,L:a,url:o}){var l,p;let r=((l=t.steps)!=null?l:[]).filter(c=>a(c==null?void 0:c.title)),i=((p=t.promises)!=null?p:[]).filter(c=>a(c==null?void 0:c.title));return!r.length&&!i.length?"":`<section class="section" id="process" aria-labelledby="pr-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.process.kicker)}</p><h2 id="pr-title" class="h2">${e(n.process.title)}</h2></div>
    ${r.length?`<ol class="steps">${r.map((c,s)=>`<li><span class="num">${String(s+1).padStart(2,"0")}</span><b>${e(a(c.title))}</b><p>${e(a(c.text))}</p></li>`).join("")}</ol>`:""}
    ${i.length?`<div class="promise">
      <img src="${e(q(o,t.processImage||"photos/office.webp"))}" alt="" width="1000" height="750" loading="lazy">
      <ul>${i.map(c=>{var s;return`<li>${u((s=c.icon)!=null?s:"shield",24)}<div><b>${e(a(c.title))}</b><p>${e(a(c.text))}</p></div></li>`}).join("")}</ul>
    </div>`:""}
    ${a(t.disclaimer)?`<p class="disclaimer">${u("shield",16)} ${e(a(t.disclaimer))}</p>`:""}
  </div>
</section>`}function Se({site:t,t:n,L:a,lang:o}){let r=X(t,n,o,"btn btn--line"),i=ee(t);return t.showReviews===!1||!i.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(n.reviews.title)}</h2></div>
    ${ae(i,o,"reviews",l=>`<figure class="review">
      <p class="stars" aria-label="${e(l.rating)}/5">${Array.from({length:5},(p,c)=>`<span class="${c<l.rating?"on":""}">${u("star",15)}</span>`).join("")}</p>
      <blockquote>${e(a(l.text))}</blockquote>
      <figcaption>${e(l.name)}${a(l.bought)?`<small>${e(a(l.bought))}</small>`:""}${te(l,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ne({site:t,t:n,L:a}){var r;let o=((r=t.faq)!=null?r:[]).filter(i=>a(i==null?void 0:i.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(n.faq.title)}</h2>
    <div>${o.map((i,l)=>`<details${l===0?" open":""}><summary>${e(a(i.q))}</summary><p>${e(a(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function ze({site:t,t:n,L:a,channels:o}){var p,c,s;let r=(p=t.contact)!=null?p:{},i=encodeURIComponent((c=r.mapQuery)!=null?c:a(r.address)),l=h=>h.length===7?n.visit.everyDay:W(h,n.days);return`<section class="section section--ink" id="contact" aria-labelledby="ct-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="ct-title" class="h2">${e(n.visit.title)}</h2>
      ${a(r.address)?`<p class="addr">${u("pin",18)} ${e(a(r.address))}</p>`:""}
      ${Y(t,n)}
      ${((s=t.hours)!=null?s:[]).length?`<table class="hours"><tbody>${t.hours.map(h=>`<tr><th scope="row">${e(l(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <div class="actions">
        <a class="btn btn--accent" href="#quote">${e(n.nav.quote)}</a>
        ${o.map(h=>{var v;return`<a class="btn btn--line" href="${e(L(h,r))}" ${J(h)}>${u(h,18)} ${e((v=n.via[h])!=null?v:h)}</a>`}).join("")}
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(n.visit.directions)}</a>
      </div>
    </div>
    <div class="map"><iframe title="${e(n.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function je({site:t,t:n,L:a,market:o}){var l,p;let r=(l=t.contact)!=null?l:{},i=Object.entries((p=t.social)!=null?p:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(a(t.tagline))}</p></div>
    <div><p class="foot-h">${e(n.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(n.footer.hotline)}: <a href="tel:${P(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${a(r.address)?`<li>${e(a(r.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(n.footer.follow)}</p><ul>${i.map(([c,s])=>`<li><a href="${e(s)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${ne(t,n,o.lang)}</div>
</footer>`}function Pe({site:t,market:n,L:a,abs:o,formats:r}){var l,p;let i=(l=t.contact)!=null?l:{};return{"@context":"https://schema.org","@type":"EducationalOrganization",name:t.name,url:o(`${n.id}/`),description:a(t.intro),image:o(R(t.heroImage||"photos/h-hero.webp")),telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:a(i.address)},openingHoursSpecification:_((p=t.hours)!=null?p:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:t.name,itemListElement:r.map(c=>({"@type":"Offer",itemOffered:{"@type":"Service",name:a(c.name)},priceSpecification:{"@type":"UnitPriceSpecification",price:c.price,priceCurrency:n.currency,unitText:a(c.unit)}}))}}}var Te=({site:t,L:n})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:t.faq.filter(a=>n(a==null?void 0:a.q)).map(a=>({"@type":"Question",name:n(a.q),acceptedAnswer:{"@type":"Answer",text:n(a.a)}}))});export{Ie as renderSite};
