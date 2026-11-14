var ne={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>ne[a]);function R(t,a,n="vi"){var r,o,i;return t==null?"":typeof t!="object"?String(t):(i=(o=(r=t[a])!=null?r:t[n])!=null?o:Object.values(t)[0])!=null?i:""}var oe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},N=t=>{var a;return(a=oe[t])!=null?a:"en-US"};function re(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function B(t,a){var r,o;if(a.default)return t.basePrice;let n=(o=(r=t.prices)==null?void 0:r[a.id])!=null?o:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:re(t.basePrice*a.rate,a.rounding)}var ie=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function V(t,a){let n={style:"currency",currency:a.currency};return ie.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(N(a.lang),n).format(t)}function A(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var se=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,z=(t,a)=>{let n=se(a);return n==null?a:t(n)},S=(t="")=>String(t).replace(/\D/g,"");function q(t,a,n=""){switch(t){case"phone":return`tel:${S(a.phone)}`;case"zalo":return`https://zalo.me/${S(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${S(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var O=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,le=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function H(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let r={};for(let[o,i]of a.searchParams){if(!/^entry\.\d+$/.test(o))continue;let s=i.trim().replace(/^\{|\}$/g,"").toLowerCase();le.includes(s)&&(r[s]=o)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var j={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ce={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(t,a=20,n="")=>{var r;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(r=ce[t])!=null?r:""}</svg>`},C=[1,2,3,4,5,6,0],pe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function I(t,a){let n=t.map(o=>C.indexOf(o)).sort((o,i)=>o-i);return n.every((o,i)=>i===0||o===n[i-1]+1)&&n.length>2?`${a[C[n[0]]]} \u2013 ${a[C[n.at(-1)]]}`:n.map(o=>a[C[o]]).join(", ")}var U=t=>t.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>pe[n]),opens:a.open,closes:a.close}));function W(t){var n,r;return(r=(n=new Intl.NumberFormat(N(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(o=>o.type==="currency"))==null?void 0:n.value)!=null?r:t.currency}var _=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',K=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,E=(t,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},G={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},de=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,he=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&de.test(n.hostname)?n.href:""}catch{return""}},J=(t,a,n,r="btn btn--line")=>{var s;let o=he(t);if(!o)return"";let i=typeof a.reviews=="object"&&((s=a.reviews)==null?void 0:s.google)||G[n]||G.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(o)}" target="_blank" rel="noopener">${u("star",16)} ${e(i)}</a></p>`},T={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},Z={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},Y=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function Q(t,a){var i,s,l;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=t==null?void 0:t.date)!=null?i:"").trim());if(!n)return"";let r=new Date(Date.UTC(+n[1],+n[2]-1,+((s=n[3])!=null?s:1)));if(Number.isNaN(r.getTime()))return"";let o=new Intl.DateTimeFormat((l=Z[a])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(t.date)}">${e(o)}</time>`}function ue(t,a){var s,l;let n=t.filter(d=>d.rating>=1&&d.rating<=5);if(n.length<2)return"";let r=n.reduce((d,c)=>d+Number(c.rating),0)/n.length,o=(s=T[a])!=null?s:T.en,i=new Intl.NumberFormat((l=Z[a])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(o.count.replace("{n}",String(t.length)))}</span></p>`}function X(t,a,n,r){var s;if(!t.length)return"";let o=(s=T[a])!=null?s:T.en,i=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?o.prev:o.next)}">${u("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ue(t,a)}<div class="rv" data-rv data-rv-more="${e(o.more)}" data-rv-less="${e(o.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(r).join("")}</div>
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
upd()}})()<\/script>`;var ee=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function te({site:t,markets:a,url:n,abs:r}){var s;let o=(s=a.find(l=>l.default))!=null?s:a[0],i=a.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(o.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${r(`${o.id}/`)}">
${a.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${r(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(i)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(l=>`<a href="${n(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ge="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,500&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",L=9,fe=new Set(["VND","JPY","KRW","IDR","CLP","HUF","TWD"]);function Ue({site:t,catalog:a,i18n:n,template:r,basePath:o="/",siteUrl:i=t.domain}){let s=A(o),l=h=>new URL(s(h),i).href,d=a.markets,c=H(t.orderForm),p=c&&!c.error?c:null,g=d.map(h=>{var y,$,f,m;let b=h.lang,v=($=(y=n[b])!=null?y:n.en)!=null?$:n.vi,P=k=>R(k,b,"en"),x=(m=(f=t.orderChannels)==null?void 0:f[h.id])!=null?m:["phone"],w=k=>V(k,h),M=ve(a,h),D={site:t,catalog:a,market:h,markets:d,lang:b,t:v,L:P,url:s,abs:l,channels:x,money:w,menu:M,template:r,gform:p};return{path:`${h.id}/index.html`,html:ye(D)}});return g.push({path:"index.html",html:te({site:t,markets:d,url:s,abs:l})}),g}var F=(t,a)=>t.heroImage?z(a,t.heroImage):a("assets/photos/hero.webp");function ve(t,a){var n;return((n=t.products)!=null?n:[]).map(r=>{var i;let o=((i=r.variants)!=null?i:[]).map(s=>({...s,price:B(s,a)})).filter(s=>s.price!=null);return o.length?{...r,variants:o}:null}).filter(Boolean)}function be(t,a){var o,i;let n=(o=t.bulk)!=null?o:{},r=(s,l)=>{var d;return(l==null?void 0:l[a.id])!=null?l[a.id]:s==null?null:a.default?s:Math.round(s*((d=a.rate)!=null?d:1)*100)/100};return{...n,fee:r(n.fee,n.feeManual),freeFrom:r(n.freeFrom,n.freeFromManual),tiers:((i=n.tiers)!=null?i:[]).filter(s=>(s==null?void 0:s.min)>0&&(s==null?void 0:s.off)>0).sort((s,l)=>s.min-l.min)}}function ye(t){var x,w,M,D,y,$,f;let{site:a,market:n,markets:r,lang:o,t:i,L:s,url:l,abs:d}=t,c=`${a.name} \xB7 ${s(a.tagline)}`,p=(x=a.theme)!=null?x:{},g=["primary","ink","bg","surface","soft","accent"].filter(m=>p[m]).map(m=>`--${m}:${p[m]}`).join(";"),h=(w=r.find(m=>m.default))!=null?w:r[0],b=r.map(m=>({id:m.id,lang:m.lang,country:m.country,currency:m.currency,href:l(`${m.id}/`)})),v=(M=a.contact)!=null?M:{},P={locale:N(o),currency:n.currency,max:fe.has(n.currency)?0:2};return`<!doctype html>
<html lang="${e(o)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(c)}</title>
<meta name="description" content="${e(s(a.intro))}">
<link rel="canonical" href="${d(`${n.id}/`)}">
${r.map(m=>`<link rel="alternate" hreflang="${e(m.lang)}-${e(m.country)}" href="${d(`${m.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${h.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(c)}">
<meta property="og:description" content="${e(s(a.intro))}">
<meta property="og:url" content="${d(`${n.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(new URL(F(a,l),d("")).href)}">
<meta name="theme-color" content="${e((D=p.bg)!=null?D:"#F6F1E7")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ge}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${g}}</style>
<noscript><style>.album .more{display:block}.album-more,.calc-js{display:none}</style></noscript>
${O(Te(t))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(b))}' data-wa="${e(S(v.whatsapp))}" data-email="${e((y=v.email)!=null?y:"")}" data-copied="${e(i.order.copied)}" data-tz="${e(($=a.timezone)!=null?$:"Asia/Ho_Chi_Minh")}" data-locale="${e(N(o))}" data-money='${e(JSON.stringify(P))}'>
<a class="skip" href="#main">${e(i.skip)}</a>
${K(i)}
${$e(t)}
<main id="main">
${ke(t)}
${we(t)}
${Me(t)}
${De(t)}
${Se(t)}
${ze(t)}
${Ne(t)}
${Pe(t)}
${je(t)}
</main>
${Ce(t)}
<nav class="dock" aria-label="${e(i.nav.order)}">
  <a href="${e(q(t.channels[0],v))}" ${_(t.channels[0])}>${u(t.channels[0],20)}<span>${e((f=i.via[t.channels[0]])!=null?f:"")}</span></a>
  <a class="primary" href="#office">${u("bag",20)}<span>${e(i.nav.order)}</span><b class="dock-n" data-dock-n hidden></b></a>
</nav>
</body>
</html>
`}function $e({site:t,market:a,markets:n,t:r,L:o,url:i}){let s=[["#menu",r.nav.menu],["#office",r.nav.office],["#story",r.nav.story],["#visit",r.nav.visit]];return`<header class="header">
  <div class="wrap topline">
    <span class="dateline" data-dateline>${e(o(t.place))}</span>
    ${E(t,r)}
    ${n.length>1?`<details class="market">
      <summary aria-label="${e(r.market.label)}">${u("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(W(a))}</span></span></summary>
      <ul>${n.map(l=>`<li><a href="${i(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===a.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)}</a></li>`).join("")}</ul>
    </details>`:""}
  </div>
  <div class="wrap mast">
    <a class="brand" href="${i(`${a.id}/`)}">
      ${t.logo?`<img src="${e(z(i,t.logo))}" alt="" width="48" height="48">`:""}
      <span>${e(t.name)}</span>
    </a>
    ${t.since?`<span class="since">${e(r.since.replace("{year}",t.since))}</span>`:""}
  </div>
  <div class="navbar">
    <div class="wrap navrow">
      <nav class="nav" aria-label="Menu">${s.map(([l,d])=>`<a href="${l}">${e(d)}</a>`).join("")}</nav>
      <a class="btn btn--primary btn--sm" href="#office">${e(r.nav.order)}</a>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${[...s,["#office",r.nav.order]].map(([l,d])=>`<a href="${l}">${e(d)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ke({site:t,t:a,L:n,url:r}){var s,l,d;let o=((s=t.bakes)!=null?s:[]).filter(c=>{var p;return/^\d{1,2}:\d{2}$/.test((p=c==null?void 0:c.time)!=null?p:"")}).sort((c,p)=>c.time.localeCompare(p.time,"en",{numeric:!0})),i=(l=t.contact)!=null?l:{};return`<section class="cover">
  <div class="wrap cover-grid">
    <figure class="cover-ph">
      <img src="${e(F(t,r))}" alt="" width="1400" height="1000" fetchpriority="high">
      <figcaption class="cover-copy">
        <p class="kicker">${e(a.hero.kicker)}</p>
        <h1>${e(n(t.tagline))}</h1>
        ${n(t.intro)?`<p class="lead">${e(n(t.intro))}</p>`:""}
      </figcaption>
    </figure>
    <aside class="side">
      ${o.length?`<div class="bakes" data-bakes>
        <h2 class="side-h">${u("flame",18)} ${e(a.bakes.title)}</h2>
        <ol>${o.map(c=>`<li data-bake="${e(c.time)}"><time>${e(c.time)}</time><span>${e(n(c.label))}</span></li>`).join("")}</ol>
        <p class="next" data-next data-tpl="${e(a.bakes.next)}" data-done="${e(a.bakes.done)}" data-soon="${e(a.bakes.soon)}" hidden></p>
      </div>`:""}
      <div class="side-box">
        <p class="side-h">${u("users",18)} ${e(a.hero.officeTitle)}</p>
        <p>${e(n((d=t.bulk)==null?void 0:d.pitch)||a.hero.officeText)}</p>
        <a class="btn btn--primary" href="#office">${e(a.hero.order)} ${u("arrow",16)}</a>
        ${i.phone?`<a class="tel" href="tel:${S(i.phone)}">${u("phone",16)} ${e(i.phone)}</a>`:""}
      </div>
    </aside>
  </div>
</section>`}var xe=(t,a)=>{var n;return(n=a.tags)!=null&&n[t]?`<span class="tag tag--${e(t)}">${e(a.tags[t])}</span>`:""};function ae(t,a,n){let r=t.variants.map(i=>i.price),o=Math.min(...r);return`${r.length>1&&Math.max(...r)!==o?`<small>${e(n.menu.from)}</small> `:""}${e(a(o))}`}function we({catalog:t,menu:a,t:n,L:r,url:o,money:i}){var c,p;let s=((c=t.categories)!=null?c:[]).filter(g=>a.some(h=>h.category===g.id));if(!s.length)return"";let l=(p=a.find(g=>g.featured))!=null?p:a[0],d=0;return`<section class="section" id="menu" aria-labelledby="menu-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(n.menu.kicker)}</p><h2 id="menu-title" class="h2">${e(n.menu.title)}</h2><p class="muted">${e(n.menu.text)}</p></div>
    <article class="lead-dish">
      ${l.image?`<img sizes="${j.wide}" src="${e(z(o,l.image))}" alt="${e(r(l.name))}" width="1200" height="900" loading="lazy">`:""}
      <div class="lead-body">
        <p class="kicker">${e(n.menu.signature)}</p>
        <h3>${e(r(l.name))}</h3>
        ${r(l.description)?`<p>${e(r(l.description))}</p>`:""}
        <p class="lead-price">${ae(l,i,n)}</p>
        <button type="button" class="btn btn--primary" data-add="${e(l.id)}">${u("plus",16)} ${e(n.menu.add)}</button>
      </div>
    </article>
    <div class="chips" role="group" aria-label="${e(n.menu.filter)}" data-chips>
      <button type="button" class="chip" aria-pressed="true" data-cat="">${e(n.menu.all)}</button>
      ${s.map(g=>`<button type="button" class="chip" aria-pressed="false" data-cat="${e(g.id)}">${e(r(g.name))}</button>`).join("")}
    </div>
    ${s.map(g=>`<div class="mgroup" data-group="${e(g.id)}">
      <h3 class="mgroup-h">${e(r(g.name))}</h3>
      <ul class="dishes">${a.filter(h=>h.category===g.id).map(h=>{var b;return d+=1,`<li class="dish" id="dish-${e(h.id)}">
        <span class="no" aria-hidden="true">${String(d).padStart(2,"0")}</span>
        ${h.image?`<img sizes="${j.thumb}" src="${e(z(o,h.image))}" alt="" width="240" height="240" loading="lazy">`:""}
        <div class="dish-body">
          <p class="dish-top"><strong>${e(r(h.name))}</strong><span class="dots" aria-hidden="true"></span><span class="price">${ae(h,i,n)}</span></p>
          ${r(h.description)?`<p class="muted">${e(r(h.description))}</p>`:""}
          <p class="dish-foot">${((b=h.tags)!=null?b:[]).map(v=>xe(v,n)).join("")}${h.variants.length>1?`<span class="vars">${h.variants.map(v=>`${e(r(v.label))} ${e(i(v.price))}`).join(" \xB7 ")}</span>`:""}<button type="button" class="add" data-add="${e(h.id)}" aria-label="${e(`${n.menu.add}: ${r(h.name)}`)}">${u("plus",16)}</button></p>
        </div>
      </li>`}).join("")}</ul>
    </div>`).join("")}
    ${r(t.note)?`<p class="muted small note">${e(r(t.note))}</p>`:""}
  </div>
</section>`}function Me(t){var x,w,M,D,y,$;let{site:a,market:n,menu:r,t:o,L:i,money:s,gform:l,channels:d}=t,c=be(a,n),p=o.order,g=(x=a.contact)!=null?x:{},h=l?` data-gform="${e(l.action)}" data-gmap='${e(JSON.stringify(l.fields))}'`:"",b=d.map((f,m)=>{var k;return`<button type="button" class="btn ${m===0?"btn--primary":"btn--line"}" data-channel="${e(f)}" data-href="${e(q(f,g,""))}">${u(f,18)} ${e((k=o.via[f])!=null?k:f)}</button>`}).join(""),v=((w=c.slots)!=null?w:[]).filter(f=>/^\d{1,2}:\d{2}$/.test(f)),P=r.map(f=>({id:f.id,name:i(f.name),vars:f.variants.map((m,k)=>({i:k,label:i(m.label)||"",price:m.price}))}));return`<section class="section section--paper" id="office" aria-labelledby="office-title">
  <div class="wrap office">
    <div class="office-copy">
      <p class="kicker">${e(o.office.kicker)}</p>
      <h2 id="office-title" class="h2">${e(o.office.title)}</h2>
      <p class="lead">${e(i(c.text)||o.office.text)}</p>
      ${c.tiers.length?`<table class="tiers"><caption>${e(o.office.tiers)}</caption><tbody>${c.tiers.map(f=>`<tr><th scope="row">${e(p.fromQty.replace("{n}",f.min))}</th><td>\u2212${e(f.off)}%</td></tr>`).join("")}</tbody></table>`:""}
      <ul class="rules">
        ${c.minQty?`<li>${u("check",16)} ${e(o.office.min.replace("{n}",c.minQty))}</li>`:""}
        ${c.leadHours?`<li>${u("clock",16)} ${e(o.office.lead.replace("{n}",c.leadHours))}</li>`:""}
        ${c.bigQty&&i(c.bigLead)?`<li>${u("calendar",16)} ${e(o.office.big.replace("{n}",c.bigQty))} ${e(i(c.bigLead))}</li>`:""}
        ${c.fee!=null?`<li>${u("truck",16)} ${e(c.fee?o.office.fee.replace("{fee}",s(c.fee)):o.office.freeShip)}${c.fee&&c.freeFrom?` ${e(o.office.freeFrom.replace("{amount}",s(c.freeFrom)))}`:""}</li>`:""}
        ${i(c.areas)?`<li>${u("pin",16)} ${e(i(c.areas))}</li>`:""}
      </ul>
    </div>
    <form class="card order" data-order novalidate${h} data-order-text="${e(p.message)}" data-min="${e((M=c.minQty)!=null?M:0)}" data-lead="${e((D=c.leadHours)!=null?D:0)}" data-fee="${e((y=c.fee)!=null?y:0)}" data-free="${e(($=c.freeFrom)!=null?$:0)}" data-tiers='${e(JSON.stringify(c.tiers))}' data-labels='${e(JSON.stringify({items:p.items,qty:p.qty,total:p.total}))}'>
      <script type="application/json" data-items>${JSON.stringify(P).replace(/</g,"\\u003c")}<\/script>
      <div class="order-fields">
        <div class="calc calc-js">
          <p class="calc-h">${e(p.pick)}</p>
          <ul class="lines" data-lines></ul>
          <p class="muted small" data-empty>${e(p.empty)}</p>
          <dl class="sum">
            <div><dt>${e(p.subtotal)} <span data-count></span></dt><dd data-sub>${e(s(0))}</dd></div>
            <div data-off-row hidden><dt data-off-label data-tpl="${e(p.discount)}"></dt><dd data-off></dd></div>
            <div><dt>${e(p.ship)}</dt><dd data-ship data-free-text="${e(p.free)}">${e(c.fee?s(c.fee):p.free)}</dd></div>
            <div class="total"><dt>${e(p.total)}</dt><dd data-total>${e(s(0))}</dd></div>
          </dl>
          <p class="hint" data-hint data-min-tpl="${e(p.needMin)}" data-tier-tpl="${e(p.nextTier)}" data-free-tpl="${e(p.toFree)}" hidden></p>
        </div>
        <noscript><label class="field"><span>${e(p.items)}</span><textarea name="items" rows="3" placeholder="${e(p.itemsHint)}"></textarea></label></noscript>
        <div class="row2">
          <label class="field"><span>${e(p.day)}</span><input name="day" type="date"></label>
          <label class="field"><span>${e(p.time)}</span>${v.length?`<select name="time">${v.map(f=>`<option>${e(f)}</option>`).join("")}</select>`:'<input name="time" type="time">'}</label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(p.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(p.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(p.company)}</span><input name="company" autocomplete="organization" maxlength="120"></label>
        <label class="field"><span>${e(p.address)} *</span><input name="address" autocomplete="street-address" required maxlength="200" placeholder="${e(p.addressHint)}"></label>
        ${c.invoice?`<label class="check"><input type="checkbox" name="invoice" value="1"> <span>${e(p.invoice)}</span></label>`:""}
        <label class="field"><span>${e(p.note)}</span><textarea name="note" rows="3" maxlength="600" placeholder="${e(p.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden data-min-err="${e(p.minErr)}" data-req="${e(p.required)}"></p>
        <button class="btn btn--primary btn--lg btn--block" type="submit" data-submit data-sending="${e(p.sending)}">${u("bag",18)} ${e(p.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${u(l?"check":"arrow",22)} ${e(l?p.done:p.stepTitle)}</p>
        <p>${e(l?p.doneText:p.stepText)}</p>
        ${l?"":`<div class="buy">${b}</div><button type="button" class="link" data-edit>${e(p.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function De({site:t,t:a,L:n,url:r}){var s;let o=(s=t.story)!=null?s:{},i=(n(o.text)||"").split(/\n+/).map(l=>l.trim()).filter(Boolean);return!i.length&&!n(o.title)?"":`<section class="section" id="story" aria-labelledby="story-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(a.story.kicker)}</p><h2 id="story-title" class="h2">${e(n(o.title)||a.story.title)}</h2></div>
    <div class="story">
      <div class="cols">${i.map((l,d)=>`<p${d===0?' class="drop"':""}>${e(l)}</p>`).join("")}</div>
      <aside class="story-side">
        ${o.image?`<img sizes="${j.wide}" src="${e(z(r,o.image))}" alt="" width="900" height="1100" loading="lazy">`:""}
        ${n(o.quote)?`<blockquote class="pull">${e(n(o.quote))}${o.by?`<cite>${e(n(o.by))}</cite>`:""}</blockquote>`:""}
      </aside>
    </div>
  </div>
</section>`}function Se({site:t,t:a,L:n}){var o;let r=((o=t.perks)!=null?o:[]).filter(i=>n(i==null?void 0:i.title));return r.length?`<section class="section section--ink" aria-labelledby="perks-title">
  <div class="wrap">
    <h2 id="perks-title" class="h2">${e(a.perks.title)}</h2>
    <ul class="perks">${r.map((i,s)=>`<li><span class="perk-n">${String(s+1).padStart(2,"0")}</span><strong>${e(n(i.title))}</strong>${n(i.text)?`<p>${e(n(i.text))}</p>`:""}</li>`).join("")}</ul>
  </div>
</section>`:""}function ze({site:t,t:a,url:n}){var o;let r=((o=t.album)!=null?o:[]).filter(i=>i==null?void 0:i.image);return r.length?`<section class="section" id="album" aria-labelledby="album-title">
  <div class="wrap">
    <div class="head"><h2 id="album-title" class="h2">${e(a.album.title)}</h2><p class="muted">${e(a.album.text)}</p></div>
    <div class="album" data-album>${r.map((i,s)=>{let l=e(z(n,i.image));return`<a class="ph${s>=L?" more":""}" href="${l}" data-i="${s}"><img sizes="${j.card}" src="${l}" alt="${e(`${t.name} ${s+1}`)}" width="1000" height="750" loading="lazy"></a>`}).join("")}</div>
    ${r.length>L?`<p class="center"><button type="button" class="btn btn--line album-more" data-album-more>${e(a.album.more)} <span data-left>(${r.length-L})</span></button></p>`:""}
  </div>
  <dialog class="lb" data-lightbox aria-label="${e(a.album.title)}">
    <img alt="" data-lb-img>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${e(a.album.close)}">\u2715</button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${e(a.album.prev)}">${u("arrow",22,'style="transform:scaleX(-1)"')}</button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${e(a.album.next)}">${u("arrow",22)}</button>
    <p class="lb-count" data-lb-count></p>
  </dialog>
</section>`:""}function Ne({site:t,t:a,L:n,lang:r}){let o=J(t,a,r,"btn btn--line"),i=Y(t);return t.showReviews===!1||!i.length&&!o?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(a.reviews)}</h2>
    ${X(i,r,"quotes",s=>`<figure class="quote">
      ${s.rating?`<div class="stars" aria-label="${s.rating}/5">${Array.from({length:5},(l,d)=>`<span class="${d<s.rating?"on":""}">${u("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(n(s.text))}</blockquote>
      <figcaption>${e(s.name)}${Q(s,r)}</figcaption>
    </figure>`)}${o}
  </div>
</section>`}function Pe({site:t,t:a,L:n}){var s,l,d;let r=(s=t.contact)!=null?s:{},o=encodeURIComponent((l=r.mapQuery)!=null?l:n(r.address)),i=c=>c.length===7?a.everyDay:I(c,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${E(t,a)}
      ${((d=t.hours)!=null?d:[]).length?`<table class="hours"><tbody>${t.hours.map(c=>`<tr><th scope="row">${e(i(c.days))}</th><td>${e(c.open)} \u2013 ${e(c.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${u("pin",18)} ${e(n(r.address))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${o}" target="_blank" rel="noopener">${e(a.visit.directions)} ${u("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${o}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function je({site:t,t:a,L:n}){var o;let r=((o=t.faq)!=null?o:[]).filter(i=>n(i==null?void 0:i.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div class="qa">${r.map((i,s)=>`<details${s===0?" open":""}><summary>${e(n(i.q))}</summary><p>${e(n(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ce({site:t,t:a,L:n,market:r}){var s,l;let o=(s=t.contact)!=null?s:{},i=Object.entries((l=t.social)!=null?l:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${o.phone?`<li><a href="tel:${S(o.phone)}">${e(o.phone)}</a></li>`:""}
      ${o.email?`<li><a href="mailto:${e(o.email)}">${e(o.email)}</a></li>`:""}
      ${n(o.address)?`<li>${e(n(o.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${i.map(([d,c])=>`<li><a href="${e(c)}" target="_blank" rel="noopener">${e(d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${ee(t,a,r.lang)}</div>
</footer>`}function Te({site:t,market:a,L:n,abs:r,url:o,menu:i,catalog:s}){var d,c,p;let l=(d=t.contact)!=null?d:{};return{"@context":"https://schema.org","@type":"Bakery",name:t.name,url:r(`${a.id}/`),description:n(t.intro),image:new URL(F(t,o),r("")).href,telephone:l.phone,email:l.email,servesCuisine:"Vietnamese",address:{"@type":"PostalAddress",streetAddress:n(l.address)},openingHoursSpecification:U((c=t.hours)!=null?c:[]),hasMenu:{"@type":"Menu",hasMenuSection:((p=s.categories)!=null?p:[]).filter(g=>i.some(h=>h.category===g.id)).map(g=>({"@type":"MenuSection",name:n(g.name),hasMenuItem:i.filter(h=>h.category===g.id).map(h=>({"@type":"MenuItem",name:n(h.name),description:n(h.description)||void 0,offers:{"@type":"Offer",price:h.variants[0].price,priceCurrency:a.currency}}))}))}}}export{Ue as renderSite};
