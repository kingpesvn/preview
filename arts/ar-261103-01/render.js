var we={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,t=>we[t]);function W(n,t,a="vi"){var r,o,i;return n==null?"":typeof n!="object"?String(n):(i=(o=(r=n[t])!=null?r:n[a])!=null?o:Object.values(n)[0])!=null?i:""}var Me={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},Y=n=>{var t;return(t=Me[n])!=null?t:"en-US"};function De(n,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(n)-.01);let a=Number(t)||1;return Math.max(a,Math.round(n/a)*a)}function F(n,t){var r,o;if(t.default)return n.basePrice;let a=(o=(r=n.prices)==null?void 0:r[t.id])!=null?o:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:De(n.basePrice*t.rate,t.rounding)}var Se=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function Q(n,t){let a={style:"currency",currency:t.currency};return Se.has(t.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(Y(t.lang),a).format(n)}function ee(n="/"){let t=n.endsWith("/")?n:`${n}/`;return(a="")=>t+String(a).replace(/^\//,"")}var V=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,q=(n,t)=>{let a=V(t);return a==null?t:n(a)},E=(n="")=>String(n).replace(/\D/g,"");function _(n,t,a=""){switch(n){case"phone":return`tel:${E(t.phone)}`;case"zalo":return`https://zalo.me/${E(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${E(t.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var K=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,ze=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function te(n){if(!n||typeof n!="string")return null;let t;try{t=new URL(n.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let a=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let r={};for(let[o,i]of t.searchParams){if(!/^entry\.\d+$/.test(o))continue;let l=i.trim().replace(/^\{|\}$/g,"").toLowerCase();ze.includes(l)&&(r[l]=o)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var A={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Pe={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(n,t=20,a="")=>{var r;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(r=Pe[n])!=null?r:""}</svg>`},J=[1,2,3,4,5,6,0],Ne=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function oe(n,t){let a=n.map(o=>J.indexOf(o)).sort((o,i)=>o-i);return a.every((o,i)=>i===0||o===a[i-1]+1)&&a.length>2?`${t[J[a[0]]]} \u2013 ${t[J[a.at(-1)]]}`:a.map(o=>t[J[o]]).join(", ")}var re=n=>n.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(a=>Ne[a]),opens:t.open,closes:t.close}));function se(n){var a,r;return(r=(a=new Intl.NumberFormat(Y(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(o=>o.type==="currency"))==null?void 0:a.value)!=null?r:n.currency}var X=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',ie=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,le=(n,t)=>{var a;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((a=n.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},ae={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},je=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Ce=n=>{var t;try{let a=new URL(String((t=n.googleReview)!=null?t:"").trim());return a.protocol==="https:"&&je.test(a.hostname)?a.href:""}catch{return""}},ce=(n,t,a,r="btn btn--line")=>{var l;let o=Ce(n);if(!o)return"";let i=typeof t.reviews=="object"&&((l=t.reviews)==null?void 0:l.google)||ae[a]||ae.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(o)}" target="_blank" rel="noopener">${m("star",16)} ${e(i)}</a></p>`},Z={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},de={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},pe=n=>{var t;return((t=n.reviews)!=null?t:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function he(n,t){var i,l,s;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=n==null?void 0:n.date)!=null?i:"").trim());if(!a)return"";let r=new Date(Date.UTC(+a[1],+a[2]-1,+((l=a[3])!=null?l:1)));if(Number.isNaN(r.getTime()))return"";let o=new Intl.DateTimeFormat((s=de[t])!=null?s:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(n.date)}">${e(o)}</time>`}function Te(n,t){var l,s;let a=n.filter(c=>c.rating>=1&&c.rating<=5);if(a.length<2)return"";let r=a.reduce((c,h)=>c+Number(h.rating),0)/a.length,o=(l=Z[t])!=null?l:Z.en,i=new Intl.NumberFormat((s=de[t])!=null?s:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(o.count.replace("{n}",String(n.length)))}</span></p>`}function ue(n,t,a,r){var l;if(!n.length)return"";let o=(l=Z[t])!=null?l:Z.en,i=s=>`<button type="button" class="rv-btn" data-rv-${s} aria-label="${e(s==="prev"?o.prev:o.next)}">${m("arrow",18,s==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Te(n,t)}<div class="rv" data-rv data-rv-more="${e(o.more)}" data-rv-less="${e(o.less)}">
      <div class="${a} rv-track" tabindex="0">${n.map(r).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${qe}`}var qe=`<style>
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
upd()}})()<\/script>`,ne={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function me(n){var r;let t=(r=ne[n])!=null?r:ne.en,a="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${a}">${m("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${a}">${m("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${a}">${m("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var ge=(n,t,a)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function fe({site:n,markets:t,url:a,abs:r}){var l;let o=(l=t.find(s=>s.default))!=null?l:t[0],i=t.map(s=>({id:s.id,lang:s.lang,country:s.country}));return`<!doctype html>
<html lang="${e(o.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${r(`${o.id}/`)}">
${t.map(s=>`<link rel="alternate" hreflang="${e(s.lang)}-${e(s.country)}" href="${r(`${s.id}/`)}">`).join(`
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
<body><p>${t.map(s=>`<a href="${a(`${s.id}/`)}">${e(s.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Re="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ve=24;function ye(n,t){var a;return((a=n.products)!=null?a:[]).map(r=>{var o;return{...r,variants:((o=r.variants)!=null?o:[]).map(i=>({...i,price:F(i,t)})).filter(i=>i.price!=null)}}).filter(r=>r.variants.length>0).map(r=>{let o=Math.min(...r.variants.map(l=>l.price)),i=r.was?F({basePrice:r.was,prices:r.wasPrices},t):null;return{...r,from:o,was:i&&i>o?i:null}})}var $e=n=>String(n).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function Ee(n){let t=10**Math.floor(Math.log10(n));return[1,2,2.5,5,10].map(a=>a*t).reduce((a,r)=>Math.abs(r-n)<Math.abs(a-n)?r:a)}function Be(n){let t=n.map(r=>r.from).sort((r,o)=>r-o);if(t.length<5)return[];let a=[...new Set([.33,.66].map(r=>Ee(t[Math.floor(r*(t.length-1))])))];return a.map((r,o)=>[o?a[o-1]:0,r]).concat([[a[a.length-1],1/0]])}function pt({site:n,catalog:t,i18n:a,template:r,basePath:o="/",siteUrl:i=n.domain}){var y,d,g,f,k,w,M,P,N,S,j;let l=ee(o),s=p=>new URL(l(p),i).href,c=t.markets,h=(p,x)=>`${x.id}/${W(p.slug,x.lang,"en")}/`,u=te(n.orderForm),v=u&&!u.error?u:null,b=[];for(let p of c){let x=p.lang,z=(d=(y=a[x])!=null?y:a.en)!=null?d:a.vi,B=D=>W(D,x,"en"),R=ye(t,p),O=(f=(g=n.orderChannels)==null?void 0:g[p.id])!=null?f:["phone"],G=D=>Q(D,p),I=(D,$)=>(D!=null?D:[]).find(T=>T.id===$),C=(k=n.shipping)!=null?k:{},H={fee:(P=(M=(w=C.prices)==null?void 0:w[p.id])==null?void 0:M.fee)!=null?P:C.fee!=null?F({basePrice:C.fee},p):0,free:(j=(S=(N=C.prices)==null?void 0:N[p.id])==null?void 0:S.freeFrom)!=null?j:C.freeFrom!=null?F({basePrice:C.freeFrom},p):null},L={site:n,catalog:t,market:p,markets:c,lang:x,t:z,L:B,url:l,abs:s,channels:O,money:G,items:R,productPath:h,template:r,gform:v,byId:I,ship:H,bands:Be(R)};b.push({path:`${p.id}/index.html`,html:be(L,{kind:"home"})});for(let D of R)b.push({path:`${h(D,p)}index.html`,html:be(L,{kind:"product",product:D})})}return b.push({path:"index.html",html:fe({site:n,markets:c,url:l,abs:s})}),b}function be(n,t){var R,O,G,I,C,H,L,D;let{site:a,market:r,markets:o,lang:i,t:l,L:s,url:c,abs:h,catalog:u,productPath:v,gform:b,money:y}=n,d=t.kind==="home",g=t.product,f=d?`${r.id}/`:v(g,r),k=d?`${a.name} \xB7 ${s(a.tagline)}`:`${s(g.name)} \xB7 ${a.name}`,w=d?s(a.intro):`${s(g.description)} ${y(g.from)}.`,M=o.map($=>{var T;return d?{m:$,href:`${$.id}/`}:ye({products:[((T=u.products)!=null?T:[]).find(U=>U.id===g.id)]},$).length?{m:$,href:v(g,$)}:null}).filter(Boolean),P=$=>{var T,U;return(U=(T=M.find(xe=>xe.m.id===$.id))==null?void 0:T.href)!=null?U:`${$.id}/`},N=(R=o.find($=>$.default))!=null?R:o[0],S=(O=a.theme)!=null?O:{},j=["primary","ink","bg","surface","soft","accent"].filter($=>S[$]).map($=>`--${$}:${S[$]}`).join(";"),p=o.map($=>({id:$.id,lang:$.lang,country:$.country,currency:$.currency,href:c(P($))})),x=(G=a.contact)!=null?G:{},z=h(V(d||!g.image?a.heroImage:g.image)),B=b?` data-gform="${e(b.action)}" data-gmap='${e(JSON.stringify(b.fields))}'`:"";return`<!doctype html>
<html lang="${e(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(k)}</title>
<meta name="description" content="${e(w)}">
<link rel="canonical" href="${h(f)}">
${M.map(({m:$,href:T})=>`<link rel="alternate" hreflang="${e($.lang)}-${e($.country)}" href="${h(T)}">`).join(`
`)}
${M.some($=>$.m.id===N.id)?`<link rel="alternate" hreflang="x-default" href="${h(P(N))}">`:""}
<meta property="og:type" content="${d?"website":"product"}">
<meta property="og:title" content="${e(k)}">
<meta property="og:description" content="${e(w)}">
<meta property="og:url" content="${h(f)}">
<meta property="og:image" content="${e(z)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta name="theme-color" content="${e((I=S.bg)!=null?I:"#F7F5F1")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Re}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${j}}</style>
${d?K(Ze(n))+(((C=a.faq)!=null?C:[]).length?K(Ye(n)):""):K(Xe(n,g))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(r.id)}" data-markets='${e(JSON.stringify(p))}' data-copied="${e(l.copied)}" data-wa="${e(E((H=x.whatsapp)!=null?H:""))}" data-email="${e((L=x.email)!=null?L:"")}" data-store="${e(`kp-music-${$e(a.name).replace(/[^a-z0-9]+/g,"")}-${r.id}`)}" data-currency="${e(r.currency)}" data-lang="${e(i)}" data-tz="${e((D=a.timezone)!=null?D:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(l.skip)}</a>
${ie(l)}
${s(a.announcement)?`<p class="announce">${e(s(a.announcement))}</p>`:""}
${Le(n,d)}
<main id="main">
${d?[Fe,Ve,Ae,Oe,Ge,Ie,He,Ue].map($=>$(n)).join(`
`):We(n,g)}
</main>
${Je(n)}
${Ke(n,B)}
<nav class="dock" aria-label="${e(l.bag.title)}">
  <a href="${e(_(n.channels[0],x))}" ${X(n.channels[0])}>${m(n.channels[0],20)}<span>${e(l.nav.ask)}</span></a>
  <button type="button" class="primary" data-bag-open>${m("bag",20)}<span>${e(l.bag.title)}</span><b class="bag-n" data-bag-count hidden>0</b></button>
</nav>
</body>
</html>
`}function Le({site:n,market:t,markets:a,t:r,url:o},i){let l=i?"":o(`${t.id}/`),s=[[`${l}#finder`,r.nav.finder],[`${l}#shop`,r.nav.shop],[`${l}#services`,r.nav.services],[`${l}#visit`,r.nav.contact]];return`<header class="header">
  <div class="bar">
    <a class="brand" href="${o(`${t.id}/`)}">
      ${n.logo?`<img src="${e(q(o,n.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${m("music",18)}</span>`}
      <span>${e(n.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([c,h])=>`<a href="${c}">${e(h)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${a.length>1?`<details class="market">
        <summary aria-label="${e(r.market.label)}">${m("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(se(t))}</span></span></summary>
        <ul>${a.map(c=>`<li><a href="${o(`${c.id}/`)}" hreflang="${e(c.lang)}"${c.id===t.id?' aria-current="true"':""}>${e(c.country)} \xB7 ${e(c.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <button type="button" class="bagbtn" data-bag-open aria-label="${e(r.bag.title)}">${m("bag",20)}<b class="bag-n" data-bag-count hidden>0</b></button>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${s.map(([c,h])=>`<a href="${c}">${e(h)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Fe({site:n,t,L:a,url:r,items:o,catalog:i}){var c,h;let l=((c=i.categories)!=null?c:[]).filter(u=>o.some(v=>v.category===u.id)),s=String((h=a(n.trust))!=null?h:"").split(`
`).map(u=>u.trim()).filter(Boolean);return`<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${a(n.heroKicker)?`<p class="kicker">${e(a(n.heroKicker))}</p>`:""}
      <h1>${e(a(n.tagline))}</h1>
      <p class="lead">${e(a(n.intro))}</p>
      <a class="btn btn--accent btn--xl" href="#finder">${e(t.hero.find)} ${m("arrow",20)}</a>
      ${s.length?`<ul class="trust">${s.map(u=>`<li>${m("check",16)} ${e(u)}</li>`).join("")}</ul>`:""}
    </div>
    ${n.heroImage?`<figure class="arch"><img src="${e(q(r,n.heroImage))}" alt="" width="1000" height="1250" fetchpriority="high"></figure>`:""}
  </div>
  ${l.length?`<div class="wrap"><ul class="jump">${l.map(u=>{var v;return`<li><a href="?type=${e(u.id)}#shop" data-jump="type" data-value="${e(u.id)}">${m((v=u.icon)!=null?v:"music",18)} ${e(a(u.name))}</a></li>`}).join("")}</ul></div>`:""}
</section>`}function Ve({catalog:n,t,L:a,items:r}){var h,u,v,b,y;let o=((h=n.fit)!=null?h:[]).filter(d=>r.some(g=>g.category===d.category)),i=((u=n.ages)!=null?u:[]).filter(d=>a(d==null?void 0:d.name));if(!o.length||!i.length)return"";let l=t.finder,s=d=>{var g,f;return a((f=((g=n.categories)!=null?g:[]).find(k=>k.id===d))==null?void 0:f.name)},c=(y=(b=((v=n.levels)!=null?v:[])[0])==null?void 0:b.id)!=null?y:"";return`<section class="section finder-sec" id="finder" aria-labelledby="finder-title">
  <div class="wrap finder">
    <div class="sec-head"><p class="kicker">${e(l.kicker)}</p><h2 id="finder-title" class="h2">${e(l.title)}</h2><p class="lead">${e(l.text)}</p></div>
    <div class="fd-card">
      <fieldset class="fd-step"><legend><span>1</span> ${e(l.what)}</legend><div class="fd-row">${o.map((d,g)=>{var f,k,w;return`<label class="fd-opt"><input type="radio" name="fd-cat" value="${e(d.category)}"${g?"":" checked"}><span>${m((w=(k=((f=n.categories)!=null?f:[]).find(M=>M.id===d.category))==null?void 0:k.icon)!=null?w:"music",18)} ${e(s(d.category))}</span></label>`}).join("")}</div></fieldset>
      <fieldset class="fd-step"><legend><span>2</span> ${e(l.who)}</legend><div class="fd-row">${i.map((d,g)=>`<label class="fd-opt"><input type="radio" name="fd-age" value="${e(d.id)}"${g===i.length-1?" checked":""}><span>${e(a(d.name))}</span></label>`).join("")}</div></fieldset>
      ${o.map(d=>i.map(g=>{var f;return`<div class="fd-out" data-fd="${e(d.category)}|${e(g.id)}" hidden><p class="mini">${e(l.size)}</p><p class="fd-size">${e(a((f=d.sizes)==null?void 0:f[g.id])||"\u2014")}</p>${a(d.tip)?`<p class="muted">${e(a(d.tip))}</p>`:""}</div>`}).join("")).join("")}
      <noscript><ul class="fd-table">${o.map(d=>`<li><b>${e(s(d.category))}</b>: ${i.map(g=>{var f;return`${e(a(g.name))} \u2192 ${e(a((f=d.sizes)==null?void 0:f[g.id])||"\u2014")}`}).join(" \xB7 ")}</li>`).join("")}</ul></noscript>
      <a class="btn btn--primary btn--lg" href="#shop" data-fd-go data-level="${e(c)}" data-tpl="${e(l.see)}">${e(l.see.replace("{n}",""))} ${m("arrow",18)}</a>
    </div>
  </div>
</section>`}function ke(n,t,a=0){var d,g,f,k,w,M,P,N,S,j,p,x;let{L:r,url:o,money:i,productPath:l,market:s,catalog:c,byId:h,bands:u}=n,v=[r(t.name),(d=t.name)==null?void 0:d.vi,(g=t.name)==null?void 0:g.en,r((f=h(c.categories,t.category))==null?void 0:f.name),r((k=h(c.levels,t.level))==null?void 0:k.name),...((w=t.colors)!=null?w:[]).map(z=>r(z.name))].filter(Boolean).join(" "),b=u.findIndex(([z,B])=>t.from>=z&&t.from<B),y=(M=t.images)==null?void 0:M[0];return`<li class="card${a>=ve?" is-more":""}" data-type="${e(t.category)}" data-level="${e((P=t.level)!=null?P:"")}" data-band="${b}" data-price="${t.from}" data-name="${e($e(v))}">
  <a class="card-link" href="${o(l(t,s))}">
    <div class="card-img${y?" has-alt":""}${t.image?"":" is-empty"}">
      ${t.image?`<img sizes="${A.card}" src="${e(q(o,t.image))}" alt="${e(r(t.name))}" width="800" height="1000" loading="lazy">`:m((S=(N=h(c.categories,t.category))==null?void 0:N.icon)!=null?S:"music",48)}
      ${y?`<img sizes="${A.card}" class="alt" src="${e(q(o,y))}" alt="" width="800" height="1000" loading="lazy">`:""}
      ${t.was?`<span class="tag tag--sale">-${Math.round((1-t.from/t.was)*100)}%</span>`:r(t.badge)?`<span class="tag">${e(r(t.badge))}</span>`:""}
    </div>
    <p class="card-cat">${e(r((j=h(c.categories,t.category))==null?void 0:j.name))}${r((p=h(c.levels,t.level))==null?void 0:p.name)?` \xB7 ${e(r(h(c.levels,t.level).name))}`:""}</p>
    <h3>${e(r(t.name))}</h3>
    <p class="card-price"><b>${e(i(t.from))}</b>${t.was?` <s>${e(i(t.was))}</s>`:""}${r(t.variants[0].label)?`<span class="sz">${e(r(t.variants[0].label))}</span>`:""}</p>
    ${((x=t.colors)==null?void 0:x.length)>1?`<p class="dots" aria-hidden="true">${t.colors.map(z=>`<i style="background:${e(z.hex)}"></i>`).join("")}</p>`:""}
  </a>
</li>`}function Ae(n){var u,v;let{items:t,catalog:a,t:r,L:o,money:i,bands:l}=n,s=r.shop,c=(b,y,d,g)=>{let f=d.map(k=>({...k,n:t.filter(w=>g(w).includes(String(k.id))).length})).filter(k=>k.n);return f.length<2?"":`<fieldset class="fgroup" data-group="${b}"><legend>${e(y)}</legend>${f.map(k=>`<label class="fopt"><input type="checkbox" value="${e(k.id)}" data-f="${b}"> <span>${e(typeof k.name=="string"?k.name:o(k.name))}</span><small>${k.n}</small></label>`).join("")}</fieldset>`},h=l.map(([b,y],d)=>({id:String(d),name:y===1/0?s.over.replace("{a}",i(b)):b===0?s.under.replace("{b}",i(y)):`${i(b)} \u2013 ${i(y)}`}));return`<section class="section shop-sec" id="shop" aria-labelledby="shop-title">
  <div class="wrap shop">
    <aside class="side" id="filters" data-side aria-label="${e(s.filters)}">
      <div class="side-head"><p class="side-title">${m("filter",18)} ${e(s.filters)}</p><button type="button" class="side-x" data-side-close aria-label="${e(s.close)}">\u2715</button></div>
      ${c("type",s.type,(u=a.categories)!=null?u:[],b=>[b.category])}
      ${c("level",s.level,(v=a.levels)!=null?v:[],b=>{var y;return[(y=b.level)!=null?y:""]})}
      ${c("band",s.price,h,b=>[String(l.findIndex(([y,d])=>b.from>=y&&b.from<d))])}
      <div class="side-foot"><button type="button" class="link" data-reset>${e(s.reset)}</button><button type="button" class="btn btn--primary" data-side-close data-show-tpl="${e(s.show)}">${e(s.show.replace("{n}",t.length))}</button></div>
    </aside>
    <div class="shop-main">
      <div class="shop-head">
        <h2 id="shop-title" class="h2">${e(s.title)}</h2>
        <p class="muted" data-count="${e(s.count)}">${e(s.count.replace("{n}",t.length))}</p>
      </div>
      <div class="toolbar">
        <button type="button" class="btn btn--line filter-btn" data-side-open aria-controls="filters">${m("filter",18)} ${e(s.filters)} <b data-nsel hidden></b></button>
        <label class="search">${m("search",18)}<input type="search" placeholder="${e(r.search)}" aria-label="${e(r.search)}" data-search></label>
        <label class="select"><span>${e(s.sort)}</span><select data-sort>
          <option value="">${e(s.sortPop)}</option><option value="asc">${e(s.sortLow)}</option><option value="desc">${e(s.sortHigh)}</option>
        </select></label>
      </div>
      <ul class="chosen" data-chosen hidden></ul>
      <ul class="grid" data-grid>${t.map((b,y)=>ke(n,b,y)).join("")}</ul>
      <p class="empty muted" data-empty hidden>${e(s.empty)} <button type="button" class="link" data-reset>${e(s.reset)}</button></p>
      ${t.length>ve?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(s.more)}</button></div>`:""}
    </div>
  </div>
</section>`}function Oe({site:n,t,L:a,url:r}){var i;let o=((i=n.services)!=null?i:[]).filter(l=>a(l==null?void 0:l.title));return o.length?`<section class="section section--ink" id="services" aria-labelledby="services-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.services.kicker)}</p><h2 id="services-title" class="h2">${e(t.services.title)}</h2></div>
    <ol class="svc">${o.map((l,s)=>{var c;return`<li${l.image?' class="has-img"':""}>${l.image?`<img sizes="${A.card}" src="${e(q(r,l.image))}" alt="" width="1000" height="1250" loading="lazy">`:""}<div><span class="n">${String(s+1).padStart(2,"0")}</span>${m((c=l.icon)!=null?c:"check",22)}<h3 class="h4">${e(a(l.title))}</h3><p>${e(a(l.text))}</p></div></li>`}).join("")}</ol>
  </div>
</section>`:""}function Ge({site:n,L:t}){var r;let a=((r=n.perks)!=null?r:[]).filter(o=>t(o==null?void 0:o.title));return a.length?`<section class="perks" aria-label="${e(n.name)}"><ul class="wrap perk-list">${a.map(o=>{var i;return`<li>${m((i=o.icon)!=null?i:"check",22)}<div><b>${e(t(o.title))}</b>${t(o.text)?`<span>${e(t(o.text))}</span>`:""}</div></li>`}).join("")}</ul></section>`:""}function Ie({site:n,t,L:a,lang:r}){let o=ce(n,t,r,"btn btn--line"),i=pe(n);return n.showReviews===!1||!i.length&&!o?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${ue(i,r,"reviews",l=>`<figure class="review">
      <p class="stars" aria-label="${e(l.rating)}/5">${Array.from({length:5},(s,c)=>`<span class="${c<l.rating?"on":""}">${m("star",15)}</span>`).join("")}</p>
      <blockquote>${e(a(l.text))}</blockquote>
      <figcaption>${e(l.name)}${a(l.bought)?`<small>${e(a(l.bought))}</small>`:""}${he(l,r)}</figcaption>
    </figure>`)}${o}
  </div>
</section>`}function He({site:n,t,L:a}){var o;let r=((o=n.faq)!=null?o:[]).filter(i=>a(i==null?void 0:i.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${r.map((i,l)=>`<details${l===0?" open":""}><summary>${e(a(i.q))}</summary><p>${e(a(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ue({site:n,t,L:a,channels:r}){var s,c,h;let o=(s=n.contact)!=null?s:{},i=encodeURIComponent((c=o.mapQuery)!=null?c:a(o.address)),l=u=>u.length===7?t.visit.everyDay:oe(u,t.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${le(n,t)}
      ${((h=n.hours)!=null?h:[]).length?`<table class="hours"><tbody>${n.hours.map(u=>`<tr><th scope="row">${e(l(u.days))}</th><td>${e(u.open)} \u2013 ${e(u.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${a(o.address)?`<p class="addr">${m("pin",18)} ${e(a(o.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(t.visit.directions)} ${m("arrow",16)}</a>
        ${r.map(u=>{var v;return`<a class="btn btn--line" href="${e(_(u,o))}" ${X(u)}>${m(u,18)} ${e((v=t.via[u])!=null?v:u)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function We(n,t){var P,N,S,j;let{site:a,t:r,L:o,url:i,money:l,market:s,items:c,catalog:h,byId:u}=n,v=u(h.categories,t.category),b=[...c.filter(p=>p.id!==t.id&&p.category===t.category),...c.filter(p=>p.id!==t.id&&p.category!==t.category&&p.level===t.level)].slice(0,8),y=i(`${s.id}/`),d=p=>typeof p=="object"?o(p):String(p),g=t.variants[0],f=r.product,k=u(h.levels,t.level),w=[k?["level",o(k.name)]:null,...(P=t.specs)!=null?P:[]].filter(Boolean),M=String((N=o(t.includes))!=null?N:"").split(`
`).map(p=>p.trim()).filter(Boolean);return`<div class="wrap crumbs"><a href="${y}">${e(r.nav.home)}</a>${m("chevron",14)}<a href="${y}?type=${e(t.category)}#shop">${e(o(v==null?void 0:v.name))}</a>${m("chevron",14)}<span aria-current="page">${e(o(t.name))}</span></div>
<section class="wrap pdp-grid">
  ${_e(n,t)}
  <div class="pdp" data-product data-id="${e(t.id)}" data-name="${e(o(t.name))}" data-price="${g.price}" data-img="${e(t.image?q(i,t.image):"")}" data-href="${e(i(n.productPath(t,s)))}">
    <p class="kicker">${e(o(v==null?void 0:v.name))}</p>
    <h1 class="pdp-title">${e(o(t.name))}</h1>
    <p class="pdp-price"><strong data-pdp-total>${e(l(g.price))}</strong>${t.was?` <s>${e(l(t.was))}</s>`:""}</p>
    <p class="lead">${e(o(t.description))}</p>
    ${t.variants.length>1?`<fieldset class="opts"><legend>${e(f.size)}</legend><div class="sizes">${t.variants.map((p,x)=>`<label class="sopt"><input type="radio" name="size" value="${e(o(p.label))}" data-price="${p.price}"${x?"":" checked"}><span><b>${e(o(p.label))}</b><em>${e(l(p.price))}</em></span></label>`).join("")}</div></fieldset>`:""}
    ${(S=t.colors)!=null&&S.length?`<fieldset class="opts"><legend>${e(f.color)}: <span data-v="color">${e(o(t.colors[0].name))}</span></legend><div class="swatches">
      ${t.colors.map((p,x)=>`<label class="sw" title="${e(o(p.name))}"><input type="radio" name="color" value="${e(o(p.name))}"${x?"":" checked"}><span style="background:${e(p.hex)}"></span><b class="sr">${e(o(p.name))}</b></label>`).join("")}
    </div></fieldset>`:""}
    <div class="buyrow">
      <div class="qty" data-qty><button type="button" data-d="-1" aria-label="\u2212">${m("minus",16)}</button><input type="number" name="qty" min="1" max="10" value="1" inputmode="numeric" aria-label="${e(f.qty)}"><button type="button" data-d="1" aria-label="+">${m("plus",16)}</button></div>
      <button type="button" class="btn btn--accent btn--lg" data-add-bag>${m("bag",18)} ${e(f.add)}</button>
    </div>
    <p class="added" data-added hidden>${m("check",16)} ${e(f.added)} <button type="button" class="link" data-bag-open>${e(f.viewBag)}</button></p>
    ${((j=a.promises)!=null?j:[]).length?`<ul class="promises">${a.promises.map(p=>{var x;return`<li>${m((x=p.icon)!=null?x:"check",18)} ${e(o(p.text))}</li>`}).join("")}</ul>`:""}
    ${M.length?`<div class="howto"><h2 class="h4">${e(f.includes)}</h2><ul>${M.map(p=>`<li>${m("check",15)} ${e(p)}</li>`).join("")}</ul></div>`:""}
    ${w.length?`<div class="specs"><h2 class="h4">${e(f.specs)}</h2><table><tbody>${w.map(([p,x])=>{var z;return`<tr><th scope="row">${e((z=r.specs[p])!=null?z:p)}</th><td>${e(d(x))}</td></tr>`}).join("")}</tbody></table></div>`:""}
    ${o(a.tryNote)?`<p class="small muted">${m("pin",14)} ${e(o(a.tryNote))}</p>`:""}
    ${me(s.lang)}
  </div>
</section>
${b.length?`<section class="section section--soft"><div class="wrap"><h2 class="h3">${e(f.related)}</h2><ul class="grid grid--related">${b.map(p=>ke(n,p)).join("")}</ul></div></section>`:""}`}function _e({t:n,L:t,url:a},r){var s;let o=[r.image,...(s=r.images)!=null?s:[]].filter(Boolean),i=n.gallery,l=t(r.name);return o.length?`<div class="pdp-gallery" data-gallery>
  <ul class="g-track" tabindex="0" aria-label="${e(i.label)}">${o.map((c,h)=>`<li><a href="${e(q(a,c))}" data-zoom="${h}" aria-label="${e(i.zoom)}: ${e(i.photo.replace("{i}",h+1).replace("{n}",o.length))}"><img sizes="${A.wide}" src="${e(q(a,c))}" alt="${e(h?`${l} \u2013 ${i.photo.replace("{i}",h+1).replace("{n}",o.length)}`:l)}" width="800" height="1000"${h?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
  ${o.length>1?`<p class="g-dots" aria-hidden="true">${o.map((c,h)=>`<i${h?"":' class="on"'}></i>`).join("")}</p>`:""}
  <dialog class="lightbox" data-lightbox aria-label="${e(l)}">
    <img src="" alt="${e(l)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(i.close)}">\u2715</button>
    ${o.length>1?`<button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(i.prev)}">${m("chevron",26)}</button><button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(i.next)}">${m("chevron",26)}</button>`:""}
  </dialog>
</div>`:`<div class="pdp-gallery pdp-empty">${m("music",64)}</div>`}function Ke({site:n,t,L:a,channels:r,ship:o,market:i},l){var v,b;let s=t.bag,c=(v=n.contact)!=null?v:{},h=t.orderText.replace(/\{\w+\}/g,"\u2026"),u=y=>r.map((d,g)=>{var f;return`<button type="submit" class="btn ${y!=null?y:g?"btn--line":"btn--accent"} btn--full" data-channel="${e(d)}" data-href="${e(_(d,c,h))}">${m(d,18)} ${e(d==="phone"?s.call:s.send.replace("{channel}",(f=t.via[d])!=null?f:d))}</button>`}).join("");return`<dialog class="bag" data-bag aria-labelledby="bag-title" data-fee="${o.fee}" data-free="${(b=o.free)!=null?b:""}" data-free-tpl="${e(s.freeLeft)}" data-free-ok="${e(s.freeOk)}">
  <form class="bag-in" data-checkout novalidate${l} data-text="${e(t.orderText)}" data-market="${e(`${i.id.toUpperCase()} \xB7 ${i.currency}`)}">
    <header class="bag-head"><h2 id="bag-title" class="h3">${m("bag",22)} ${e(s.title)}</h2><button type="button" class="bag-x" data-bag-close aria-label="${e(t.gallery.close)}">\u2715</button></header>
    <p class="bag-empty muted" data-bag-empty>${e(s.empty)}</p>
    <ul class="bag-list" data-bag-list data-remove="${e(s.remove)}"></ul>
    <div class="bag-body" data-bag-body hidden>
      <p class="freebar" data-freebar hidden><span data-freebar-text></span><i><b data-freebar-fill></b></i></p>
      <dl class="sum">
        <div><dt>${e(s.subtotal)}</dt><dd data-s-sub>\u2014</dd></div>
        <div><dt>${e(s.shipping)}</dt><dd data-s-ship data-free-label="${e(s.free)}">\u2014</dd></div>
        <div class="sum-total"><dt>${e(s.total)}</dt><dd data-s-total>\u2014</dd></div>
      </dl>
      <div class="order-fields">
        <div class="intents" role="radiogroup" aria-label="${e(s.how)}">${s.intents.map((y,d)=>`<label class="intent"><input type="radio" name="intent" value="${e(y)}"${d?"":" checked"}><span>${e(y)}</span></label>`).join("")}</div>
        <label class="field"><span>${e(s.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(s.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        <label class="field"><span>${e(s.address)}</span><input name="address" autocomplete="street-address" maxlength="200"></label>
        <label class="field"><span>${e(s.note)}</span><input name="note" maxlength="300" placeholder="${e(s.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(s.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-submit>${m("check",18)} ${e(s.submit)}</button>
        <p class="muted small">${e(a(n.returns)||s.reply)}</p>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m("check",22)} ${e(s.doneTitle)}</p>
        <p>${e(s.doneText)}</p>
        <div class="buy">${u()}</div>
        <button type="button" class="link back" data-edit>${e(s.edit)}</button>
      </div>
      <p class="form-msg" role="status" hidden></p>
    </div>
  </form>
</dialog>`}function Je({site:n,t,L:a,market:r}){var l,s;let o=(l=n.contact)!=null?l:{},i=Object.entries((s=n.social)!=null?s:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(a(n.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${o.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${E(o.phone)}">${e(o.phone)}</a></li>`:""}
      ${o.email?`<li><a href="mailto:${e(o.email)}">${e(o.email)}</a></li>`:""}
      ${a(o.address)?`<li>${e(a(o.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([c,h])=>`<li><a href="${e(h)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${ge(n,t,r.lang)}</div>
</footer>`}function Ze({site:n,market:t,L:a,abs:r,items:o}){var l,s,c;let i=(l=n.contact)!=null?l:{};return{"@context":"https://schema.org","@type":"MusicStore",name:n.name,url:r(`${t.id}/`),image:r(V(n.heroImage||((s=o[0])==null?void 0:s.image))),description:a(n.intro),telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:a(i.address)},currenciesAccepted:t.currency,openingHoursSpecification:re((c=n.hours)!=null?c:[])}}var Ye=({site:n,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(a=>t(a==null?void 0:a.q)).map(a=>({"@type":"Question",name:t(a.q),acceptedAnswer:{"@type":"Answer",text:t(a.a)}}))});function Xe({site:n,market:t,L:a,abs:r,productPath:o,catalog:i,byId:l},s){var c,h,u;return{"@context":"https://schema.org","@type":"Product",name:a(s.name),description:a(s.description),image:[s.image,...(c=s.images)!=null?c:[]].filter(Boolean).map(v=>r(V(v))),url:r(o(s,t)),category:a((h=l(i.categories,s.category))==null?void 0:h.name),...(u=s.colors)!=null&&u.length?{color:s.colors.map(v=>a(v.name)).join(", ")}:{},...a(s.variants[0].label)?{size:a(s.variants[0].label)}:{},offers:{"@type":"Offer",price:s.variants[0].price,priceCurrency:t.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:n.name}}}}export{pt as renderSite};
