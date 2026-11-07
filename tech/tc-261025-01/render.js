var re={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,t=>re[t]);function A(n,t,a="vi"){var r,o,i;return n==null?"":typeof n!="object"?String(n):(i=(o=(r=n[t])!=null?r:n[a])!=null?o:Object.values(n)[0])!=null?i:""}var se={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},V=n=>{var t;return(t=se[n])!=null?t:"en-US"};function ie(n,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(n)-.01);let a=Number(t)||1;return Math.max(a,Math.round(n/a)*a)}function F(n,t){var r,o;if(t.default)return n.basePrice;let a=(o=(r=n.prices)==null?void 0:r[t.id])!=null?o:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:ie(n.basePrice*t.rate,t.rounding)}var le=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function I(n,t){let a={style:"currency",currency:t.currency};return le.has(t.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(V(t.lang),a).format(n)}function U(n="/"){let t=n.endsWith("/")?n:`${n}/`;return(a="")=>t+String(a).replace(/^\//,"")}var R=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,w=(n,t)=>{let a=R(t);return a==null?t:n(a)},z=(n="")=>String(n).replace(/\D/g,"");function P(n,t,a=""){switch(n){case"phone":return`tel:${z(t.phone)}`;case"zalo":return`https://zalo.me/${z(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${z(t.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var O=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,ce=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function W(n){if(!n||typeof n!="string")return null;let t;try{t=new URL(n.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let a=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let r={};for(let[o,i]of t.searchParams){if(!/^entry\.\d+$/.test(o))continue;let s=i.trim().replace(/^\{|\}$/g,"").toLowerCase();ce.includes(s)&&(r[s]=o)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var N={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var pe={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(n,t=20,a="")=>{var r;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(r=pe[n])!=null?r:""}</svg>`},E=[1,2,3,4,5,6,0],de=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function K(n,t){let a=n.map(o=>E.indexOf(o)).sort((o,i)=>o-i);return a.every((o,i)=>i===0||o===a[i-1]+1)&&a.length>2?`${t[E[a[0]]]} \u2013 ${t[E[a.at(-1)]]}`:a.map(o=>t[E[o]]).join(", ")}var J=n=>n.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(a=>de[a]),opens:t.open,closes:t.close}));function Z(n){var a,r;return(r=(a=new Intl.NumberFormat(V(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(o=>o.type==="currency"))==null?void 0:a.value)!=null?r:n.currency}var L=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',Y=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,G=(n,t)=>{var a;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((a=n.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},_={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},he=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ue=n=>{var t;try{let a=new URL(String((t=n.googleReview)!=null?t:"").trim());return a.protocol==="https:"&&he.test(a.hostname)?a.href:""}catch{return""}},X=(n,t,a,r="btn btn--line")=>{var s;let o=ue(n);if(!o)return"";let i=typeof t.reviews=="object"&&((s=t.reviews)==null?void 0:s.google)||_[a]||_.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(o)}" target="_blank" rel="noopener">${u("star",16)} ${e(i)}</a></p>`},B={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},Q={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ee=n=>{var t;return((t=n.reviews)!=null?t:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function ae(n,t){var i,s,c;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=n==null?void 0:n.date)!=null?i:"").trim());if(!a)return"";let r=new Date(Date.UTC(+a[1],+a[2]-1,+((s=a[3])!=null?s:1)));if(Number.isNaN(r.getTime()))return"";let o=new Intl.DateTimeFormat((c=Q[t])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(n.date)}">${e(o)}</time>`}function me(n,t){var s,c;let a=n.filter(l=>l.rating>=1&&l.rating<=5);if(a.length<2)return"";let r=a.reduce((l,p)=>l+Number(p.rating),0)/a.length,o=(s=B[t])!=null?s:B.en,i=new Intl.NumberFormat((c=Q[t])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(o.count.replace("{n}",String(n.length)))}</span></p>`}function te(n,t,a,r){var s;if(!n.length)return"";let o=(s=B[t])!=null?s:B.en,i=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?o.prev:o.next)}">${u("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${me(n,t)}<div class="rv" data-rv data-rv-more="${e(o.more)}" data-rv-less="${e(o.less)}">
      <div class="${a} rv-track" tabindex="0">${n.map(r).join("")}</div>
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
upd()}})()<\/script>`;var ne=(n,t,a)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function oe({site:n,markets:t,url:a,abs:r}){var s;let o=(s=t.find(c=>c.default))!=null?s:t[0],i=t.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(o.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${r(`${o.id}/`)}">
${t.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${r(`${c.id}/`)}">`).join(`
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
<body><p>${t.map(c=>`<a href="${a(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var fe="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",H=9;function ve(n,t){var a;return((a=n.products)!=null?a:[]).map(r=>{var o;return{...r,variants:((o=r.variants)!=null?o:[]).map(i=>({...i,price:F(i,t)})).filter(i=>i.price!=null)}}).filter(r=>r.variants.length>0).map(r=>({...r,from:Math.min(...r.variants.map(o=>o.price))}))}var j=n=>String(n!=null?n:"").split(`
`).map(t=>t.trim()).filter(Boolean);function be(n,t,a){var i,s,c,l,p,$,v;let r=(i=n.calc)!=null?i:{},o=d=>{var b;return d&&(b=F(d,t))!=null?b:0};return{types:((s=r.types)!=null?s:[]).map(d=>({id:d.id,n:a(d.name),cover:Number(d.cover)||40,min:Number(d.min)||2})),res:((c=r.res)!=null?c:[]).map(d=>({id:d.id,n:a(d.name),gb:Number(d.gb)||20,cam:o(d.cam),out:o(d.out)})),days:(l=r.days)!=null?l:[7,15,30],nvr:((p=r.nvr)!=null?p:[]).map(d=>({ch:Number(d.ch),p:o(d)})).sort((d,b)=>d.ch-b.ch),tb:o(r.tb),tbSizes:($=r.tbSizes)!=null?$:[1,2,4,6,8,10,12],install:o(r.install),extras:((v=r.extras)!=null?v:[]).map(d=>({id:d.id,n:a(d.name),p:o(d)}))}}function We({site:n,catalog:t,i18n:a,template:r,basePath:o="/",siteUrl:i=n.domain}){var d,b,x,k;let s=U(o),c=m=>new URL(s(m),i).href,l=t.markets,p=W(n.orderForm),$=p&&!p.error?p:null,v=[];for(let m of l){let y=m.lang,h=(b=(d=a[y])!=null?d:a.en)!=null?b:a.vi,g=S=>A(S,y,"en"),D=ve(t,m),M=(k=(x=n.orderChannels)==null?void 0:x[m.id])!=null?k:["phone"],C=S=>I(S,m),T=be(n,m,g),q={site:n,catalog:t,market:m,markets:l,lang:y,t:h,L:g,url:s,abs:c,channels:M,money:C,items:D,template:r,gform:$,calc:T};v.push({path:`${m.id}/index.html`,html:ye(q)})}return v.push({path:"index.html",html:oe({site:n,markets:l,url:s,abs:c})}),v}function ye(n){var y,h,g,D,M,C,T,q,S;let{site:t,market:a,markets:r,lang:o,t:i,L:s,url:c,abs:l,channels:p,calc:$}=n,v=`${t.name} \xB7 ${s(t.tagline)}`,d=(y=t.theme)!=null?y:{},b=["primary","ink","bg","surface","soft","accent"].filter(f=>d[f]).map(f=>`--${f}:${d[f]}`).join(";"),x=(h=r.find(f=>f.default))!=null?h:r[0],k=r.map(f=>({id:f.id,lang:f.lang,country:f.country,currency:f.currency,href:c(`${f.id}/`)})),m=(g=t.contact)!=null?g:{};return`<!doctype html>
<html lang="${e(o)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(v)}</title>
<meta name="description" content="${e(s(t.intro))}">
<link rel="canonical" href="${l(`${a.id}/`)}">
${r.map(f=>`<link rel="alternate" hreflang="${e(f.lang)}-${e(f.country)}" href="${l(`${f.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${l(`${x.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(v)}">
<meta property="og:description" content="${e(s(t.intro))}">
<meta property="og:url" content="${l(`${a.id}/`)}">
${t.heroImage?`<meta property="og:image" content="${e(l(R(t.heroImage)))}">`:""}
<meta property="og:site_name" content="${e(t.name)}">
<meta name="theme-color" content="${e((D=d.bg)!=null?D:"#EEF1F4")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fe}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${b}}</style>
${O(Te(n))}${((M=t.faq)!=null?M:[]).length?O(qe(n)):""}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(a.id)}" data-markets='${e(JSON.stringify(k))}' data-copied="${e(i.copied)}" data-wa="${e(z((C=m.whatsapp)!=null?C:""))}" data-email="${e((T=m.email)!=null?T:"")}" data-tz="${e((q=t.timezone)!=null?q:"Asia/Ho_Chi_Minh")}" data-currency="${e(a.currency)}" data-lang="${e(o)}" data-calc='${e(JSON.stringify($))}'>
<a class="skip" href="#main">${e(i.skip)}</a>
${Y(i)}
${s(t.announcement)?`<p class="announce">${e(s(t.announcement))}</p>`:""}
${$e(n)}
<main id="main">
${[ke,xe,we,Me,De,Se,ze,Ne,Pe,je].map(f=>f(n)).join(`
`)}
</main>
${Ce(n)}
<nav class="dock" aria-label="${e(i.nav.survey)}">
  <a href="${e(P(p[0],m))}" ${L(p[0])}>${u(p[0],20)}<span>${e((S=i.via[p[0]])!=null?S:p[0])}</span></a>
  <a class="primary" href="#survey">${u("calendar",20)}<span>${e(i.nav.survey)}</span></a>
</nav>
</body>
</html>
`}function $e({site:n,market:t,markets:a,t:r,url:o}){let i=[["#packages",r.nav.packages],["#calc",r.nav.calc],["#devices",r.nav.devices],["#work",r.nav.work],["#survey",r.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${o(`${t.id}/`)}">
      ${n.logo?`<img src="${e(w(o,n.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("camera",20)}</span>`}
      <span>${e(n.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([s,c])=>`<a href="${s}">${e(c)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${a.length>1?`<details class="market">
        <summary aria-label="${e(r.market.label)}">${u("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(Z(t))}</span></span></summary>
        <ul>${a.map(s=>`<li><a href="${o(`${s.id}/`)}" hreflang="${e(s.lang)}"${s.id===t.id?' aria-current="true"':""}>${e(s.country)} \xB7 ${e(s.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#survey">${e(r.nav.survey)}</a>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${i.map(([s,c])=>`<a href="${s}">${e(c)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ke(n){var v,d,b,x,k;let{site:t,t:a,L:r,url:o,calc:i,items:s,money:c}=n,l=((v=t.stats)!=null?v:[]).filter(m=>m==null?void 0:m.value).slice(0,2),p=a.hero,$=s.length?Math.min(...s.map(m=>m.from)):null;return`<section class="hero">
  <div class="wrap bento bento--hero">
    <div class="tile tile--title">
      ${t.heroImage?`<img class="tile-bg" src="${e(w(o,t.heroImage))}" alt="" width="1200" height="900" fetchpriority="high">`:""}
      <div class="tile-in">
        ${r(t.heroKicker)?`<p class="kicker">${e(r(t.heroKicker))}</p>`:""}
        <h1>${e(r(t.tagline))}</h1>
        ${r(t.intro)?`<p class="lead">${e(r(t.intro))}</p>`:""}
        <div class="actions">
          <a class="btn btn--accent btn--lg" href="#calc">${u("gauge",18)} ${e(p.calc)}</a>
          <a class="btn btn--glass btn--lg" href="#survey">${u("calendar",18)} ${e(p.survey)}</a>
        </div>
      </div>
    </div>
    ${i.types.length?`<form class="tile tile--quick" data-quick action="#calc">
      <p class="tile-h">${u("gauge",18)} ${e(p.quick)}</p>
      <label><span>${e(a.calc.type)}</span><select name="qtype">${i.types.map((m,y)=>`<option value="${e(m.id)}"${y?"":" selected"}>${e(m.n)}</option>`).join("")}</select></label>
      <label><span>${e(a.calc.area)}</span><span class="in"><input name="qarea" type="number" min="10" max="20000" step="5" value="80" inputmode="numeric"><b>m\xB2</b></span></label>
      <p class="quick-out" aria-live="polite"><b data-q-cams data-tpl="${e(a.packages.cams)}">\u2014</b><span data-q-price data-tpl="${e(p.from)}">${$!=null?e(p.from.replace("{price}",c($))):""}</span></p>
      <a class="link" href="#calc" data-q-more>${e(p.more)} ${u("arrow",14)}</a>
    </form>`:""}
    ${l.map((m,y)=>`<div class="tile tile--stat${y?" tile--stat2":""}"><b>${e(r(m.value))}</b><span>${e(r(m.label))}</span></div>`).join("")}
    <a class="tile tile--free" href="#survey">${u("shield",26)}<b>${e(p.freeTitle)}</b><span>${e(p.freeText.replace("{n}",(b=(d=t.survey)==null?void 0:d.lead)!=null?b:24))}</span></a>
    <div class="tile tile--hours">${G(t,a)}<p class="tile-h">${u("pin",16)} ${e((k=r((x=t.contact)==null?void 0:x.address))!=null?k:"")}</p></div>
  </div>
</section>`}function xe({items:n,t,L:a,url:r,money:o}){if(!n.length)return"";let i=t.packages;return`<section class="section" id="packages" aria-labelledby="pk-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(i.kicker)}</p><h2 id="pk-title" class="h2">${e(i.title)}</h2><p class="lead">${e(i.text)}</p></div>
    <ul class="bento bento--pkg">${n.map((s,c)=>{var l;return`<li class="tile tile--pkg${s.badge?" is-hot":""}${c===0?" tile--wide":""}">
      ${s.image?`<img sizes="${N.card}" src="${e(w(r,s.image))}" alt="" width="800" height="600" loading="lazy">`:""}
      <div class="pkg-in">
        <p class="pkg-top"><span class="cams">${u("camera",15)} ${e(i.cams.replace("{n}",(l=s.cams)!=null?l:"?"))}</span>${a(s.badge)?`<span class="tag">${e(a(s.badge))}</span>`:""}</p>
        <h3>${e(a(s.name))}</h3>
        ${a(s.area)?`<p class="muted small">${e(a(s.area))}</p>`:""}
        ${j(a(s.includes)).length?`<ul class="ticks">${j(a(s.includes)).map(p=>`<li>${u("check",14)} ${e(p)}</li>`).join("")}</ul>`:""}
        <dl class="vars">${s.variants.map(p=>`<div><dt>${e(a(p.label))}</dt><dd>${e(o(p.price))}</dd></div>`).join("")}</dl>
        <a class="btn btn--line btn--sm" href="#survey" data-pick-pkg="${e(a(s.name))}">${e(i.pick)}</a>
      </div>
    </li>`}).join("")}</ul>
  </div>
</section>`}function we({site:n,t,L:a,calc:r}){if(!r.types.length||!r.res.length)return"";let o=t.calc;return`<section class="section section--soft" id="calc" aria-labelledby="calc-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(o.kicker)}</p><h2 id="calc-title" class="h2">${e(o.title)}</h2><p class="lead">${e(a(n.calcText)||o.text)}</p></div>
    <div class="bento bento--calc">
      <form class="tile tile--form" data-calc-form novalidate>
        <fieldset><legend>${e(o.type)}</legend><div class="chips">${r.types.map((i,s)=>`<label class="chip"><input type="radio" name="type" value="${e(i.id)}"${s?"":" checked"}><span>${e(i.n)}</span></label>`).join("")}</div></fieldset>
        <div class="grid3">
          <label><span>${e(o.area)}</span><span class="in"><input name="area" type="number" min="10" max="20000" step="5" value="80" inputmode="numeric"><b>m\xB2</b></span></label>
          <label><span>${e(o.floors)}</span><input name="floors" type="number" min="1" max="20" value="1" inputmode="numeric"></label>
          <label><span>${e(o.doors)}</span><input name="doors" type="number" min="0" max="20" value="1" inputmode="numeric"></label>
        </div>
        <fieldset><legend>${e(o.res)}</legend><div class="chips">${r.res.map((i,s)=>`<label class="chip"><input type="radio" name="res" value="${e(i.id)}"${s===1||r.res.length===1?" checked":""}><span>${e(i.n)}</span></label>`).join("")}</div></fieldset>
        <fieldset><legend>${e(o.days)}</legend><div class="chips">${r.days.map((i,s)=>`<label class="chip"><input type="radio" name="days" value="${i}"${s===1?" checked":""}><span>${e(o.dayN.replace("{n}",i))}</span></label>`).join("")}</div></fieldset>
        ${r.extras.length?`<fieldset><legend>${e(o.extras)}</legend><div class="chips">${r.extras.map(i=>`<label class="chip chip--check"><input type="checkbox" name="extra" value="${e(i.id)}"><span>${e(i.n)}</span></label>`).join("")}</div></fieldset>`:""}
      </form>
      <div class="tile tile--result" aria-live="polite" data-result data-l='${e(JSON.stringify({inCam:o.inCam,outCam:o.outCam,nvr:o.nvr,hdd:o.hdd,install:o.install}))}'>
        <p class="tile-h">${u("camera",18)} ${e(o.result)}</p>
        <p class="big"><b data-r-cams data-tpl="${e(t.packages.cams)}">\u2014</b><span data-r-split data-tpl="${e(t.calc.dayN)}"></span></p>
        <dl class="lines" data-r-lines></dl>
        <p class="sum"><span>${e(o.total)}</span><b data-r-total>\u2014</b></p>
        <p class="small">${e(a(n.calcNote)||o.note)}</p>
        <a class="btn btn--accent btn--full" href="#survey" data-use-calc>${u("calendar",18)} ${e(o.use)}</a>
      </div>
    </div>
  </div>
</section>`}function Me({site:n,t,L:a,url:r}){var i;let o=((i=n.devices)!=null?i:[]).filter(s=>a(s==null?void 0:s.name));return o.length?`<section class="section" id="devices" aria-labelledby="dev-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.devices.kicker)}</p><h2 id="dev-title" class="h2">${e(t.devices.title)}</h2></div>
    <ul class="bento bento--dev">${o.map(s=>`<li class="tile tile--dev">
      ${s.image?`<img sizes="${N.thumb}" src="${e(w(r,s.image))}" alt="${e(a(s.name))}" width="600" height="600" loading="lazy">`:""}
      <div><p class="kind">${e(a(s.kind))}</p><h3>${e(a(s.name))}</h3><p class="muted small">${e(a(s.text))}</p>
      ${j(a(s.specs)).length?`<ul class="specs">${j(a(s.specs)).map(c=>`<li>${e(c)}</li>`).join("")}</ul>`:""}</div>
    </li>`).join("")}</ul>
  </div>
</section>`:""}function De({site:n,t,L:a,url:r}){var i;let o=((i=n.steps)!=null?i:[]).filter(s=>a(s==null?void 0:s.title));return o.length?`<section class="section section--ink" id="process" aria-labelledby="st-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.steps.kicker)}</p><h2 id="st-title" class="h2">${e(t.steps.title)}</h2></div>
    <ol class="bento bento--steps">${o.map((s,c)=>{var l;return`<li class="tile tile--step"><span class="n">${c+1}</span>${u((l=s.icon)!=null?l:"check",24)}<b>${e(a(s.title))}</b><p>${e(a(s.text))}</p></li>`}).join("")}
      ${n.appImage?`<li class="tile tile--app"><img sizes="${N.card}" src="${e(w(r,n.appImage))}" alt="" width="800" height="600" loading="lazy"><span>${e(t.steps.app)}</span></li>`:""}</ol>
  </div>
</section>`:""}function Se({site:n,t,L:a,url:r}){var s;let o=((s=n.promises)!=null?s:[]).filter(c=>a(c==null?void 0:c.title)),i=j(a(n.privacy));return!o.length&&!i.length?"":`<section class="section" id="warranty" aria-labelledby="wr-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.promises.kicker)}</p><h2 id="wr-title" class="h2">${e(t.promises.title)}</h2></div>
    <div class="bento bento--promise">
      ${o.map(c=>{var l;return`<div class="tile tile--promise">${u((l=c.icon)!=null?l:"shield",26)}<b>${e(a(c.title))}</b><p class="muted">${e(a(c.text))}</p></div>`}).join("")}
      ${i.length?`<div class="tile tile--law">
        ${n.privacyImage?`<img sizes="${N.card}" src="${e(w(r,n.privacyImage))}" alt="" width="800" height="800" loading="lazy">`:""}
        <div><p class="tile-h">${u("scale",18)} ${e(t.promises.law)}</p><ul class="ticks">${i.map(c=>`<li>${u("check",14)} ${e(c)}</li>`).join("")}</ul></div>
      </div>`:""}
    </div>
  </div>
</section>`}function ze({site:n,t,url:a}){var c;let r=((c=n.album)!=null?c:[]).filter(l=>l==null?void 0:l.image);if(!r.length)return"";let o=t.album,i=Math.min(r.length,H),s=i>1&&(i+3)%4===3;return`<section class="section section--soft" id="work" aria-labelledby="al-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(o.kicker)}</p><h2 id="al-title" class="h2">${e(o.title)}</h2></div>
    <ul class="bento bento--album" data-album>${r.map((l,p)=>`<li class="${[p===0?"big":"",p===i-1&&s?"wide":"",p>=H?"is-more":""].filter(Boolean).join(" ")}"><a href="${e(w(a,l.image))}" data-zoom="${p}" aria-label="${e(o.zoom)} ${p+1}"><img sizes="${N.card}" src="${e(w(a,l.image))}" alt="" width="800" height="800" loading="lazy"></a></li>`).join("")}</ul>
    ${r.length>H?`<div class="more"><button type="button" class="btn btn--line" data-album-more hidden>${e(o.more)}</button></div>`:""}
    <dialog class="lightbox" data-lightbox aria-label="${e(o.title)}">
      <img src="" alt="" data-lb-img>
      <button type="button" class="lb-close" data-lb-close aria-label="${e(o.close)}">\u2715</button>
      <button type="button" class="lb-nav lb-prev" data-lb-step="-1" aria-label="${e(o.prev)}">${u("chevron",26)}</button>
      <button type="button" class="lb-nav lb-next" data-lb-step="1" aria-label="${e(o.next)}">${u("chevron",26)}</button>
    </dialog>
  </div>
</section>`}function Ne({site:n,t,L:a,lang:r}){let o=X(n,t,r,"btn btn--line"),i=ee(n);return n.showReviews===!1||!i.length&&!o?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${te(i,r,"reviews",s=>`<figure class="review">
      <p class="stars" aria-label="${e(s.rating)}/5">${Array.from({length:5},(c,l)=>`<span class="${l<s.rating?"on":""}">${u("star",15)}</span>`).join("")}</p>
      <blockquote>${e(a(s.text))}</blockquote>
      <figcaption>${e(s.name)}${a(s.bought)?`<small>${e(a(s.bought))}</small>`:""}${ae(s,r)}</figcaption>
    </figure>`)}${o}
  </div>
</section>`}function Pe({site:n,t,L:a}){var o;let r=((o=n.faq)!=null?o:[]).filter(i=>a(i==null?void 0:i.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${r.map((i,s)=>`<details${s===0?" open":""}><summary>${e(a(i.q))}</summary><p>${e(a(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function je(n){var k,m,y;let{site:t,t:a,L:r,channels:o,gform:i,market:s,calc:c}=n,l=a.survey,p=(k=t.contact)!=null?k:{},$=encodeURIComponent((m=p.mapQuery)!=null?m:r(p.address)),v=h=>h.length===7?a.visit.everyDay:K(h,a.days),d=a.orderText.replace(/\{\w+\}/g,"\u2026"),b=i?` data-gform="${e(i.action)}" data-gmap='${e(JSON.stringify(i.fields))}'`:"",x=h=>o.map((g,D)=>{var M;return`<button type="submit" class="btn ${h!=null?h:D?"btn--line":"btn--accent"} btn--lg" data-channel="${e(g)}" data-href="${e(P(g,p,d))}">${u(g,18)} ${e(g==="phone"?l.call:l.send.replace("{channel}",(M=a.via[g])!=null?M:g))}</button>`}).join("");return`<section class="section" id="survey" aria-labelledby="sv-title">
  <div class="wrap bento bento--survey">
    <form class="tile tile--order" data-survey${b} data-text="${e(a.orderText)}" data-market="${e(`${s.id.toUpperCase()} \xB7 ${s.currency}`)}" novalidate>
      <div class="order-fields">
        <p class="kicker">${e(l.kicker)}</p>
        <h2 id="sv-title" class="h2">${e(l.title)}</h2>
        <p class="muted">${e(l.text)}</p>
        <p class="cfg" data-cfg hidden><span>${e(l.cfg)}</span><b data-cfg-text></b></p>
        <input type="hidden" name="cfg" data-cfg-input>
        <div class="fields">
          <label><span>${e(l.type)}</span><select name="ptype">${c.types.map(h=>`<option value="${e(h.id)}">${e(h.n)}</option>`).join("")}</select></label>
          <label><span>${e(l.area)}</span><input name="parea" type="number" min="10" max="20000" inputmode="numeric" placeholder="80"></label>
          <label class="wide"><span>${e(l.address)} *</span><input name="address" required maxlength="200" autocomplete="street-address" placeholder="${e(l.addressHint)}"></label>
          <label><span>${e(l.date)}</span><input name="date" type="date" data-date></label>
          <label><span>${e(l.slot)}</span><select name="slot">${l.slots.map(h=>`<option>${e(h)}</option>`).join("")}</select></label>
          <label><span>${e(l.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label><span>${e(l.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          <label class="wide"><span>${e(l.note)}</span><input name="note" maxlength="300" placeholder="${e(l.noteHint)}"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <p class="form-err" data-err hidden>${e(l.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-order-submit>${u("check",18)} ${e(l.submit)}</button>
        <noscript><p>${o.map(h=>{var g;return`<a href="${e(P(h,p,d))}" ${L(h)}>${e((g=a.via[h])!=null?g:h)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${i?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${u(i?"check":"arrow",22)} ${e(i?l.done:l.stepTitle)}</p>
        <p>${e(i?l.doneText:l.stepText)}</p>
        <div class="buy">${x(i?"btn--line":void 0)}</div>
        ${i?"":`<button type="button" class="link back" data-edit>${e(l.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
    <div class="tile tile--visit">
      <h3>${e(a.visit.title)}</h3>
      ${G(t,a)}
      ${((y=t.hours)!=null?y:[]).length?`<table class="hours"><tbody>${t.hours.map(h=>`<tr><th scope="row">${e(v(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${r(p.address)?`<p class="addr">${u("pin",18)} ${e(r(p.address))}</p>`:""}
      <div class="actions">${o.map(h=>{var g;return`<a class="btn btn--line btn--sm" href="${e(P(h,p))}" ${L(h)}>${u(h,16)} ${e((g=a.via[h])!=null?g:h)}</a>`}).join("")}</div>
      <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${$}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
  </div>
</section>`}function Ce({site:n,t,L:a,market:r}){var s,c;let o=(s=n.contact)!=null?s:{},i=Object.entries((c=n.social)!=null?c:{}).filter(([,l])=>l);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(a(n.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${o.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${z(o.phone)}">${e(o.phone)}</a></li>`:""}
      ${o.email?`<li><a href="mailto:${e(o.email)}">${e(o.email)}</a></li>`:""}
      ${a(o.address)?`<li>${e(a(o.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([l,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(l==="tiktok"?"TikTok":l==="youtube"?"YouTube":l[0].toUpperCase()+l.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${ne(n,t,r.lang)}</div>
</footer>`}function Te({site:n,market:t,L:a,abs:r,items:o}){var s,c;let i=(s=n.contact)!=null?s:{};return{"@context":"https://schema.org","@type":"HomeAndConstructionBusiness",name:n.name,url:r(`${t.id}/`),...n.heroImage?{image:r(R(n.heroImage))}:{},description:a(n.intro),telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:a(i.address)},currenciesAccepted:t.currency,openingHoursSpecification:J((c=n.hours)!=null?c:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:n.name,itemListElement:o.flatMap(l=>l.variants.map(p=>({"@type":"Offer",name:`${a(l.name)} \xB7 ${a(p.label)}`,price:p.price,priceCurrency:t.currency,itemOffered:{"@type":"Service",name:a(l.name)}})))}}}var qe=({site:n,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(a=>t(a==null?void 0:a.q)).map(a=>({"@type":"Question",name:t(a.q),acceptedAnswer:{"@type":"Answer",text:t(a.a)}}))});export{We as renderSite};
