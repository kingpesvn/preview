var ge={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>ge[a]);function U(t,a,n="vi"){var r,s,o;return t==null?"":typeof t!="object"?String(t):(o=(s=(r=t[a])!=null?r:t[n])!=null?s:Object.values(t)[0])!=null?o:""}var fe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},W=t=>{var a;return(a=fe[t])!=null?a:"en-US"};function ve(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function _(t,a){var r,s;if(a.default)return t.basePrice;let n=(s=(r=t.prices)==null?void 0:r[a.id])!=null?s:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ve(t.basePrice*a.rate,a.rounding)}var be=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function X(t,a){let n={style:"currency",currency:a.currency};return be.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(W(a.lang),n).format(t)}function Q(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var G=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,E=(t,a)=>{let n=G(a);return n==null?a:t(n)},R=(t="")=>String(t).replace(/\D/g,"");function L(t,a,n=""){switch(t){case"phone":return`tel:${R(a.phone)}`;case"zalo":return`https://zalo.me/${R(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${R(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var K=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,ye=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function ee(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let r={};for(let[s,o]of a.searchParams){if(!/^entry\.\d+$/.test(s))continue;let l=o.trim().replace(/^\{|\}$/g,"").toLowerCase();ye.includes(l)&&(r[l]=s)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var J={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var $e={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},h=(t,a=20,n="")=>{var r;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(r=$e[t])!=null?r:""}</svg>`},H=[1,2,3,4,5,6,0],ke=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function te(t,a){let n=t.map(s=>H.indexOf(s)).sort((s,o)=>s-o);return n.every((s,o)=>o===0||s===n[o-1]+1)&&n.length>2?`${a[H[n[0]]]} \u2013 ${a[H[n.at(-1)]]}`:n.map(s=>a[H[s]]).join(", ")}var ne=t=>t.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>ke[n]),opens:a.open,closes:a.close}));function oe(t){var n,r;return(r=(n=new Intl.NumberFormat(W(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:n.value)!=null?r:t.currency}var V=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',re=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,Z=(t,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},ae={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},xe=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,we=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&xe.test(n.hostname)?n.href:""}catch{return""}},se=(t,a,n,r="btn btn--line")=>{var l;let s=we(t);if(!s)return"";let o=typeof a.reviews=="object"&&((l=a.reviews)==null?void 0:l.google)||ae[n]||ae.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(s)}" target="_blank" rel="noopener">${h("star",16)} ${e(o)}</a></p>`},I={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ie={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},le=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ce(t,a){var o,l,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((o=t==null?void 0:t.date)!=null?o:"").trim());if(!n)return"";let r=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(r.getTime()))return"";let s=new Intl.DateTimeFormat((c=ie[a])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(t.date)}">${e(s)}</time>`}function Me(t,a){var l,c;let n=t.filter(p=>p.rating>=1&&p.rating<=5);if(n.length<2)return"";let r=n.reduce((p,u)=>p+Number(u.rating),0)/n.length,s=(l=I[a])!=null?l:I.en,o=new Intl.NumberFormat((c=ie[a])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${h("star",18)}</span><strong>${o}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(t.length)))}</span></p>`}function pe(t,a,n,r){var l;if(!t.length)return"";let s=(l=I[a])!=null?l:I.en,o=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?s.prev:s.next)}">${h("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Me(t,a)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(r).join("")}</div>
      <div class="rv-nav" hidden>${o("prev")}${o("next")}</div>
    </div>${De}`}var De=`<style>
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
upd()}})()<\/script>`;var de=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function he({site:t,markets:a,url:n,abs:r}){var l;let s=(l=a.find(c=>c.default))!=null?l:a[0],o=a.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${r(`${s.id}/`)}">
${a.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${r(`${c.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(o)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(c=>`<a href="${n(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Se="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ue=9;function ze(t,a){var n;return((n=t.products)!=null?n:[]).map(r=>{var s;return{...r,variants:((s=r.variants)!=null?s:[]).map(o=>({...o,price:_(o,a)})).filter(o=>o.price!=null)}}).filter(r=>r.variants.length>0).map(r=>({...r,from:Math.min(...r.variants.map(s=>s.price))}))}var Ne=t=>String(t).replace(/^(KTV|BS|Dr|Mr|Ms)\.?\s+/i,"").split(/\s+/).filter(Boolean).slice(-2).map(a=>a[0]).join("").toUpperCase(),B=t=>{let a=/^(\d{1,2}):(\d{2})$/.exec(String(t!=null?t:""));return a?+a[1]*60+ +a[2]:null},Pe=t=>`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`;function ra({site:t,catalog:a,i18n:n,template:r,basePath:s="/",siteUrl:o=t.domain}){var g,m,$,x,T;let l=Q(s),c=k=>new URL(l(k),o).href,p=a.markets,u=ee(t.orderForm),i=u&&!u.error?u:null,f=[];for(let k of p){let S=k.lang,j=(m=(g=n[S])!=null?g:n.en)!=null?m:n.vi,z=y=>U(y,S,"en"),N=ze(a,k),w=new Set((($=a.categories)!=null?$:[]).filter(y=>y.kind==="package").map(y=>y.id)),q=N.filter(y=>!w.has(y.category)),P=N.filter(y=>w.has(y.category)),C=(T=(x=t.orderChannels)==null?void 0:x[k.id])!=null?T:["phone"],A={site:t,catalog:a,market:k,markets:p,lang:S,t:j,L:z,url:l,abs:c,channels:C,money:y=>X(y,k),items:q,packages:P,template:r,gform:i,mins:y=>j.min.replace("{n}",z(y.label))};f.push({path:`${k.id}/index.html`,html:je(A)})}return f.push({path:"index.html",html:he({site:t,markets:p,url:l,abs:c})}),f}function je(t){var k,S,j,z,N,w,q,P,C,M;let{site:a,market:n,markets:r,lang:s,t:o,L:l,url:c,abs:p,channels:u}=t,i=`${a.name} \xB7 ${l(a.tagline)}`,f=(k=a.theme)!=null?k:{},g=["primary","ink","bg","surface","soft","accent"].filter(v=>f[v]).map(v=>`--${v}:${f[v]}`).join(";"),m=(S=r.find(v=>v.default))!=null?S:r[0],$=r.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:c(`${v.id}/`)})),x=(j=a.contact)!=null?j:{},T=a.heroImage||((z=t.items[0])==null?void 0:z.image);return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(i)}</title>
<meta name="description" content="${e(l(a.intro))}">
<link rel="canonical" href="${p(`${n.id}/`)}">
${r.map(v=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${p(`${v.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${m.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(i)}">
<meta property="og:description" content="${e(l(a.intro))}">
<meta property="og:url" content="${p(`${n.id}/`)}">
<meta property="og:image" content="${e(p(G(T)))}">
<meta property="og:site_name" content="${e(a.name)}">
<meta name="theme-color" content="${e((N=f.bg)!=null?N:"#F4F8F7")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Se}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${g}}</style>
${K(Ue(t))}${((w=a.faq)!=null?w:[]).length?K(We(t)):""}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify($))}' data-copied="${e(o.copied)}" data-wa="${e(R((q=x.whatsapp)!=null?q:""))}" data-email="${e((P=x.email)!=null?P:"")}" data-tz="${e((C=a.timezone)!=null?C:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(o.skip)}</a>
${re(o)}
${l(a.announcement)?`<p class="announce">${e(l(a.announcement))}</p>`:""}
${Ce(t)}
<main id="main">
${[Te,qe,Re,Ee,Le,Be,Ve,Ae,Fe,Oe,Ge,He].map(v=>v(t)).join(`
`)}
</main>
${Ie(t)}
<nav class="dock" aria-label="${e(o.nav.book)}">
  <a href="${e(L(u[0],x))}" ${V(u[0])}>${h(u[0],20)}<span>${e((M=o.via[u[0]])!=null?M:u[0])}</span></a>
  <a class="primary" href="#book">${h("calendar",20)}<span>${e(o.nav.book)}</span></a>
</nav>
</body>
</html>
`}function Ce({site:t,market:a,markets:n,t:r,url:s}){let o=[["#concerns",r.nav.concerns],["#services",r.nav.services],["#packages",r.nav.packages],["#team",r.nav.team],["#visit",r.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${a.id}/`)}">
      ${t.logo?`<img src="${e(E(s,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${h("cross",18)}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${o.map(([l,c])=>`<a href="${l}">${e(c)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(r.market.label)}">${h("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(oe(a))}</span></span></summary>
        <ul>${n.map(l=>`<li><a href="${s(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===a.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary btn--sm hide-sm" href="#book">${h("calendar",16)} ${e(r.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${h("menu",22)}</summary>
        <nav aria-label="Menu">${o.map(([l,c])=>`<a href="${l}">${e(c)}</a>`).join("")}<a href="#book">${e(r.nav.book)}</a></nav>
      </details>
    </div>
  </div>
</header>`}function Te(t){var i,f;let{site:a,t:n,L:r,url:s,items:o,money:l}=t,c=a.heroImage||((i=o[0])==null?void 0:i.image),p=((f=a.stats)!=null?f:[]).filter(g=>g==null?void 0:g.value),u=o.length?Math.min(...o.map(g=>g.from)):null;return`<section class="hero">
  ${c?`<img class="hero-img" src="${e(E(s,c))}" alt="" width="1600" height="1000" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${r(a.heroKicker)?`<p class="kicker">${e(r(a.heroKicker))}</p>`:""}
    <h1>${e(r(a.tagline))}</h1>
    <p class="lead">${e(r(a.intro))}</p>
    <div class="actions">
      <a class="btn btn--primary btn--lg" href="#book">${h("calendar",18)} ${e(n.hero.book)}</a>
      <a class="btn btn--light btn--lg" href="#services">${e(n.hero.menu)}${u!=null?` \xB7 ${e(n.hero.from.replace("{price}",l(u)))}`:""}</a>
    </div>
    ${Z(a,n)}
  </div>
  ${p.length?`<div class="stats"><ul class="wrap">${p.map(g=>`<li><b>${e(r(g.value))}</b><span>${e(r(g.label))}</span></li>`).join("")}</ul></div>`:""}
</section>`}function qe({site:t,t:a,L:n}){var s;let r=((s=t.concerns)!=null?s:[]).filter(o=>(o==null?void 0:o.id)&&n(o.label));return r.length?`<section class="section" id="concerns" aria-labelledby="con-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.concerns.kicker)}</p><h2 id="con-title" class="h2">${e(a.concerns.title)}</h2><p class="lead">${e(a.concerns.text)}</p></div>
    <div class="con" role="group" aria-label="${e(a.concerns.title)}" data-concerns>
      ${r.map(o=>{var l;return`<a class="con-chip" href="#services" data-concern="${e(o.id)}" aria-pressed="false">${h((l=o.icon)!=null?l:"leaf",26)}<span>${e(n(o.label))}</span></a>`}).join("")}
    </div>
    <div class="con-tips">${r.map(o=>`<p class="con-tip" data-tip="${e(o.id)}" hidden>${h("check",18)} <span>${e(n(o.text))}</span> <a class="link" href="#services">${e(a.concerns.see)}</a></p>`).join("")}</div>
  </div>
</section>`:""}function Re(t){var f,g;let{site:a,catalog:n,items:r,t:s,L:o,url:l,money:c,mins:p}=t;if(!r.length)return"";let u=((f=n.categories)!=null?f:[]).filter(m=>m.kind!=="package"&&r.some($=>$.category===m.id)),i=((g=a.pressure)!=null?g:[]).filter(m=>o(m==null?void 0:m.label));return`<section class="section section--soft" id="services" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(s.services.kicker)}</p><h2 id="svc-title" class="h2">${e(s.services.title)}</h2><p class="lead">${e(s.services.text)}</p></div>
    ${u.length>1?`<div class="chips" role="group" aria-label="${e(s.services.title)}"><button type="button" class="pill is-on" data-cat="">${e(s.services.all)}</button>${u.map(m=>`<button type="button" class="pill" data-cat="${e(m.id)}">${e(o(m.name))}</button>`).join("")}</div>`:""}
    <ul class="svc" data-svc>${r.map(m=>{var $;return`<li class="svc-card" id="s-${e(m.id)}" data-cat="${e(m.category)}" data-concerns="${e((($=m.concerns)!=null?$:[]).join(" "))}">
      <div class="svc-img">${m.image?`<img sizes="${J.card}" src="${e(E(l,m.image))}" alt="${e(o(m.name))}" width="800" height="600" loading="lazy">`:""}${o(m.badge)?`<span class="tag">${e(o(m.badge))}</span>`:""}<span class="match" aria-hidden="true">${h("check",14)} ${e(s.concerns.match)}</span></div>
      <div class="svc-body">
        <h3>${e(o(m.name))}</h3>
        <p>${e(o(m.description))}</p>
        <ul class="durs">${m.variants.map(x=>`<li><span>${h("clock",15)} ${e(p(x))}</span><b>${e(c(x.price))}</b></li>`).join("")}</ul>
        ${m.couple?`<p class="couple">${h("users",16)} ${e(s.services.couple)}</p>`:""}
        <a class="btn btn--line btn--sm" href="#book" data-book="${e(m.id)}">${h("calendar",16)} ${e(s.services.book)}</a>
      </div>
    </li>`}).join("")}</ul>
    ${i.length?`<div class="pressure"><h3 class="h4">${h("hand",18)} ${e(s.services.pressure)}</h3><ol>${i.map((m,$)=>`<li><span class="dots" aria-hidden="true">${"\u25CF".repeat($+1)}${"\u25CB".repeat(i.length-$-1)}</span><b>${e(o(m.label))}</b>${o(m.text)?`<small>${e(o(m.text))}</small>`:""}</li>`).join("")}</ol></div>`:""}
  </div>
</section>`}function Ee({site:t,t:a,L:n}){var s;let r=((s=t.steps)!=null?s:[]).filter(o=>n(o==null?void 0:o.title));return r.length?`<section class="section" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(a.steps.title)}</h2></div>
    <ol class="steps">${r.map((o,l)=>`<li><span class="n">${l+1}</span><b>${e(n(o.title))}</b>${n(o.text)?`<p>${e(n(o.text))}</p>`:""}</li>`).join("")}</ol>
  </div>
</section>`:""}function Le({site:t,packages:a,t:n,L:r,money:s,channels:o,mins:l}){if(!a.length)return"";let c=o[0];return`<section class="section section--dark" id="packages" aria-labelledby="pk-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.packages.kicker)}</p><h2 id="pk-title" class="h2">${e(n.packages.title)}</h2><p class="lead">${e(n.packages.text)}</p></div>
    <ul class="pk">${a.map(p=>{var u;return`<li class="pk-card">
      ${r(p.badge)?`<span class="tag">${e(r(p.badge))}</span>`:""}
      <h3>${e(r(p.name))}</h3>
      <p>${e(r(p.description))}</p>
      <ul class="durs">${p.variants.map(i=>`<li><span>${e(/^\d+$/.test(String(r(i.label)))?l(i):r(i.label))}</span><b>${e(s(i.price))}</b></li>`).join("")}</ul>
      <a class="btn btn--light btn--sm" href="${e(L(c,(u=t.contact)!=null?u:{},n.packages.msg.replace("{name}",r(p.name))))}" ${V(c)}>${h(c,16)} ${e(n.packages.cta)}</a>
    </li>`}).join("")}</ul>
  </div>
</section>`}function Be(t){var v,A,y,Y;let{site:a,items:n,t:r,L:s,money:o,mins:l,channels:c,gform:p,market:u}=t;if(!n.length)return"";let i=r.book,f=Number((v=a.booking)==null?void 0:v.step)||30,g=((A=a.hours)!=null?A:[]).filter(d=>B(d.open)!=null&&B(d.close)!=null),m=g.length?Math.min(...g.map(d=>B(d.open))):540,$=g.length?Math.max(...g.map(d=>B(d.close))):1320,x=[];for(let d=m;d+60<=$;d+=f)x.push(Pe(d));let T=n.map(d=>({id:d.id,name:s(d.name),couple:!!d.couple,d:d.variants.map(b=>({m:Number(s(b.label))||60,label:l(b),p:b.price,money:o(b.price)}))})),k=r.orderText.replace(/\{\w+\}/g,"\u2026"),S=p?` data-gform="${e(p.action)}" data-gmap='${e(JSON.stringify(p.fields))}'`:"",j=d=>c.map((b,D)=>{var F,O;return`<button type="submit" class="btn ${d!=null?d:D?"btn--line":"btn--primary"} btn--lg" data-channel="${e(b)}" data-href="${e(L(b,(F=a.contact)!=null?F:{},k))}">${h(b,18)} ${e(b==="phone"?i.call:i.send.replace("{channel}",(O=r.via[b])!=null?O:b))}</button>`}).join(""),z=(d,b,D=0)=>b.map(([F,O],me)=>`<label class="opt"><input type="radio" name="${d}" value="${e(F)}"${me===D?" checked":""}><span>${e(O)}</span></label>`).join(""),N=(d,b)=>b.map(D=>`<label class="opt opt--check"><input type="checkbox" name="${d}" value="${e(D)}"><span>${e(D)}</span></label>`).join(""),w=((y=a.pressure)!=null?y:[]).map(d=>s(d.label)).filter(Boolean),q=g.map(d=>({d:d.days,o:B(d.open),c:B(d.close)})),P=a.homeVisit,C=P?_(P,u):null,M=C?{price:C,area:P.area}:null;return`<section class="section" id="book" aria-labelledby="book-title">
  <div class="wrap book">
    <div class="book-intro">
      <p class="kicker">${e(i.kicker)}</p>
      <h2 id="book-title" class="h2">${e(i.title)}</h2>
      <p class="lead">${e(i.text)}</p>
      <ul class="book-points">${i.points.map(d=>`<li>${h("check",18)} ${e(d)}</li>`).join("")}</ul>
    </div>
    <form class="order" data-book-form${S} data-svc='${e(JSON.stringify(T))}' data-hours='${e(JSON.stringify(q))}' data-step="${f}" data-lead="${Number((Y=a.booking)==null?void 0:Y.lead)||60}" data-text="${e(r.orderText)}" data-market="${e(`${u.id.toUpperCase()} \xB7 ${u.currency}`)}" data-currency="${e(u.currency)}" data-lang="${e(u.lang)}" data-min="${e(i.minLabel)}" novalidate>
      <div class="order-fields">
        <div class="fields">
          <label class="wide"><span>${e(i.service)} *</span><select name="service" required>${n.map((d,b)=>`<option value="${e(d.id)}"${b?"":" selected"}>${e(s(d.name))} \xB7 ${e(r.hero.from.replace("{price}",o(d.from)))}</option>`).join("")}</select></label>
        </div>
        <fieldset class="opts"><legend>${h("clock",16)} ${e(i.duration)}</legend><div class="row" data-durs>${n[0].variants.map((d,b)=>`<label class="opt"><input type="radio" name="duration" value="${e(s(d.label))}"${b?"":" checked"}><span>${e(l(d))} \xB7 ${e(o(d.price))}</span></label>`).join("")}</div></fieldset>
        <div class="fields">
          <label><span>${e(i.date)} *</span><input name="date" type="date" required data-date></label>
          <label><span>${e(i.time)} *</span><select name="time" required data-time>${x.map(d=>`<option>${d}</option>`).join("")}</select></label>
        </div>
        <p class="muted small" data-time-note data-none="${e(i.noTime)}" data-closed="${e(i.closedDay)}" hidden></p>
        ${M?`<fieldset class="opts"><legend>${h("house",16)} ${e(i.place)}</legend><div class="row"><label class="opt"><input type="radio" name="place" value="${e(i.clinic)}" data-fee="0" checked><span>${e(i.clinic)}</span></label><label class="opt"><input type="radio" name="place" value="${e(i.home)}" data-fee="${e(M.price)}"><span>${e(i.home)} \xB7 +${e(o(M.price))}</span></label></div>${s(M.area)?`<p class="muted small">${e(s(M.area))}</p>`:""}</fieldset>`:""}
        <fieldset class="opts pain"><legend>${h("gauge",16)} ${e(i.pain)}</legend><div class="pain-row"><input type="range" name="pain" min="0" max="10" step="1" value="5" aria-label="${e(i.pain)}" data-pain><output data-pain-out>5</output></div><p class="pain-scale" aria-hidden="true"><span>${e(i.painLow)}</span><span>${e(i.painHigh)}</span></p></fieldset>
        <fieldset class="opts"><legend>${h("hand",16)} ${e(i.therapist)}</legend><div class="row">${z("therapist",[[i.any,i.any],[i.female,i.female],[i.male,i.male]])}</div></fieldset>
        ${w.length?`<fieldset class="opts"><legend>${h("gauge",16)} ${e(i.pressure)}</legend><div class="row">${z("pressure",w.map(d=>[d,d]),Math.min(1,w.length-1))}</div></fieldset>`:""}
        <fieldset class="opts"><legend>${h("pin",16)} ${e(i.focus)}</legend><div class="row">${N("focus",i.areas)}</div></fieldset>
        <fieldset class="opts"><legend>${h("shield",16)} ${e(i.health)}</legend><div class="row">${N("health",i.healthList)}</div><p class="muted small">${e(i.healthNote)}</p></fieldset>
        <div class="fields">
          <label><span>${e(i.name)} *</span><input name="name" autocomplete="name" required></label>
          <label><span>${e(i.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required></label>
          <label class="wide"><span>${e(i.note)}</span><input name="note" placeholder="${e(i.noteHint)}"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <p class="total"><span>${e(i.total)}</span><b data-total>${e(o(n[0].variants[0].price))}</b></p>
        <p class="form-err" data-err hidden>${e(i.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--primary btn--lg btn--full" data-order-submit>${h("calendar",18)} <span>${e(i.submit)}</span></button></div>
        <noscript><p>${c.map(d=>{var b,D;return`<a href="${e(L(d,(b=a.contact)!=null?b:{},k))}" ${V(d)}>${e((D=r.via[d])!=null?D:d)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${p?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${h(p?"check":"arrow",22)} ${e(p?i.done:i.stepTitle)}</p>
        <p>${e(p?i.doneText:i.stepText)}</p>
        <div class="buy">${j(p?"btn--line":void 0)}</div>
        ${p?"":`<button type="button" class="link back" data-edit>${e(i.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Ve({site:t,t:a,L:n}){var s;let r=String((s=n(t.notes))!=null?s:"").split(`
`).map(o=>o.trim()).filter(Boolean);return r.length?`<section class="section section--soft" aria-labelledby="notes-title">
  <div class="wrap notes">
    <h2 id="notes-title" class="h3">${h("shield",26)} ${e(a.notes.title)}</h2>
    <ul>${r.map(o=>`<li>${e(o)}</li>`).join("")}</ul>
  </div>
</section>`:""}function Ae({site:t,t:a,L:n}){var s;let r=((s=t.team)!=null?s:[]).filter(o=>o==null?void 0:o.name);return r.length?`<section class="section" id="team" aria-labelledby="team-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.team.kicker)}</p><h2 id="team-title" class="h2">${e(a.team.title)}</h2></div>
    <ul class="team">${r.map(o=>`<li><span class="ava" aria-hidden="true">${e(Ne(o.name))}</span><b>${e(o.name)}</b><span class="muted">${e(n(o.role))}</span>${o.years?`<span class="yrs">${e(a.team.years.replace("{n}",o.years))}</span>`:""}${n(o.skills)?`<small>${e(n(o.skills))}</small>`:""}</li>`).join("")}</ul>
  </div>
</section>`:""}function Fe({site:t,t:a,url:n}){var s;let r=((s=t.album)!=null?s:[]).filter(o=>o==null?void 0:o.image);return r.length?`<section class="section section--soft" id="album" aria-labelledby="album-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.album.kicker)}</p><h2 id="album-title" class="h2">${e(a.album.title)}</h2></div>
    <ul class="album" data-album>${r.map((o,l)=>`<li${l>=ue?' class="is-more"':""}><a href="${e(E(n,o.image))}" data-zoom="${l}"><img sizes="${J.card}" src="${e(E(n,o.image))}" alt="" width="800" height="800" loading="lazy"></a></li>`).join("")}</ul>
    ${r.length>ue?`<div class="more"><button type="button" class="btn btn--line" data-album-more hidden>${e(a.album.more)}</button></div>`:""}
    <dialog class="lightbox" data-lightbox aria-label="${e(a.album.title)}">
      <img src="" alt="" data-lb-img>
      <button type="button" class="lb-close" data-lb-close aria-label="${e(a.album.close)}">\u2715</button>
      <button type="button" class="lb-nav lb-prev" data-lb-step="-1" aria-label="${e(a.album.prev)}">${h("chevron",26)}</button>
      <button type="button" class="lb-nav lb-next" data-lb-step="1" aria-label="${e(a.album.next)}">${h("chevron",26)}</button>
    </dialog>
  </div>
</section>`:""}function Oe({site:t,t:a,L:n,lang:r}){let s=se(t,a,r,"btn btn--line"),o=le(t);return t.showReviews===!1||!o.length&&!s?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2></div>
    ${pe(o,r,"reviews",l=>`<figure class="review">
      <p class="stars" aria-label="${e(l.rating)}/5">${Array.from({length:5},(c,p)=>`<span class="${p<l.rating?"on":""}">${h("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(l.text))}</blockquote>
      <figcaption>${e(l.name)}${n(l.bought)?`<small>${e(n(l.bought))}</small>`:""}${ce(l,r)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Ge({site:t,t:a,L:n}){var s;let r=((s=t.faq)!=null?s:[]).filter(o=>n(o==null?void 0:o.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div>${r.map((o,l)=>`<details${l===0?" open":""}><summary>${e(n(o.q))}</summary><p>${e(n(o.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function He({site:t,t:a,L:n,channels:r}){var c,p,u;let s=(c=t.contact)!=null?c:{},o=encodeURIComponent((p=s.mapQuery)!=null?p:n(s.address)),l=i=>i.length===7?a.visit.everyDay:te(i,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${Z(t,a)}
      ${((u=t.hours)!=null?u:[]).length?`<table class="hours"><tbody>${t.hours.map(i=>`<tr><th scope="row">${e(l(i.days))}</th><td>${e(i.open)} \u2013 ${e(i.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(s.address)?`<p class="addr">${h("pin",18)} ${e(n(s.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${o}" target="_blank" rel="noopener">${e(a.visit.directions)} ${h("arrow",16)}</a>
        ${r.map(i=>{var f;return`<a class="btn btn--line" href="${e(L(i,s))}" ${V(i)}>${h(i,18)} ${e((f=a.via[i])!=null?f:i)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${o}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ie({site:t,t:a,L:n,market:r}){var l,c;let s=(l=t.contact)!=null?l:{},o=Object.entries((c=t.social)!=null?c:{}).filter(([,p])=>p);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${s.phone?`<li>${e(a.footer.hotline)}: <a href="tel:${R(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${n(s.address)?`<li>${e(n(s.address))}</li>`:""}</ul></div>
    ${o.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${o.map(([p,u])=>`<li><a href="${e(u)}" target="_blank" rel="noopener">${e(p==="tiktok"?"TikTok":p==="youtube"?"YouTube":p[0].toUpperCase()+p.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  ${n(t.disclaimer)?`<p class="wrap disclaimer">${h("shield",14)} ${e(n(t.disclaimer))}</p>`:""}
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${de(t,a,r.lang)}</div>
</footer>`}function Ue({site:t,market:a,L:n,abs:r,items:s,packages:o,mins:l}){var p,u,i;let c=(p=t.contact)!=null?p:{};return{"@context":"https://schema.org","@type":"Physiotherapy",name:t.name,url:r(`${a.id}/`),image:r(G(t.heroImage||((u=s[0])==null?void 0:u.image))),description:n(t.intro),telephone:c.phone,email:c.email,address:{"@type":"PostalAddress",streetAddress:n(c.address)},currenciesAccepted:a.currency,openingHoursSpecification:ne((i=t.hours)!=null?i:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:t.name,itemListElement:[...s,...o].flatMap(f=>f.variants.map(g=>({"@type":"Offer",name:`${n(f.name)} \xB7 ${/^\d+$/.test(String(n(g.label)))?l(g):n(g.label)}`,price:g.price,priceCurrency:a.currency,itemOffered:{"@type":"Service",name:n(f.name),description:n(f.description)}})))}}}var We=({site:t,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:t.faq.filter(n=>a(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:a(n.q),acceptedAnswer:{"@type":"Answer",text:a(n.a)}}))});export{ra as renderSite};
