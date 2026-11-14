var ge={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>ge[t]);function W(a,t,n="vi"){var c,r,i;return a==null?"":typeof a!="object"?String(a):(i=(r=(c=a[t])!=null?c:a[n])!=null?r:Object.values(a)[0])!=null?i:""}var fe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},N=a=>{var t;return(t=fe[a])!=null?t:"en-US"};function ve(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function F(a,t){var c,r;if(t.default)return a.basePrice;let n=(r=(c=a.prices)==null?void 0:c[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ve(a.basePrice*t.rate,t.rounding)}var be=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function J(a,t){let n={style:"currency",currency:t.currency};return be.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(N(t.lang),n).format(a)}function Z(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var G=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,q=(a,t)=>{let n=G(t);return n==null?t:a(n)},T=(a="")=>String(a).replace(/\D/g,"");function E(a,t,n=""){switch(a){case"phone":return`tel:${T(t.phone)}`;case"zalo":return`https://zalo.me/${T(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${T(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var _=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,ye=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function Y(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let c={};for(let[r,i]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let o=i.trim().replace(/^\{|\}$/g,"").toLowerCase();ye.includes(o)&&(c[o]=r)}return Object.keys(c).length?c.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:c}:{error:"no-phone"}:{error:"no-fields"}}var K={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var $e={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(a,t=20,n="")=>{var c;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(c=$e[a])!=null?c:""}</svg>`},H=[1,2,3,4,5,6,0],ke=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Q(a,t){let n=a.map(r=>H.indexOf(r)).sort((r,i)=>r-i);return n.every((r,i)=>i===0||r===n[i-1]+1)&&n.length>2?`${t[H[n[0]]]} \u2013 ${t[H[n.at(-1)]]}`:n.map(r=>t[H[r]]).join(", ")}var ee=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>ke[n]),opens:t.open,closes:t.close}));function ae(a){var n,c;return(c=(n=new Intl.NumberFormat(N(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?c:a.currency}var L=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',te=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,ne=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},X={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},xe=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,we=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&xe.test(n.hostname)?n.href:""}catch{return""}},oe=(a,t,n,c="btn btn--line")=>{var o;let r=we(a);if(!r)return"";let i=typeof t.reviews=="object"&&((o=t.reviews)==null?void 0:o.google)||X[n]||X.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${c}" href="${e(r)}" target="_blank" rel="noopener">${m("star",16)} ${e(i)}</a></p>`},I={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},re={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},se=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ie(a,t){var i,o,s;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!n)return"";let c=new Date(Date.UTC(+n[1],+n[2]-1,+((o=n[3])!=null?o:1)));if(Number.isNaN(c.getTime()))return"";let r=new Intl.DateTimeFormat((s=re[t])!=null?s:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(c);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function Me(a,t){var o,s;let n=a.filter(d=>d.rating>=1&&d.rating<=5);if(n.length<2)return"";let c=n.reduce((d,p)=>d+Number(p.rating),0)/n.length,r=(o=I[t])!=null?o:I.en,i=new Intl.NumberFormat((s=re[t])!=null?s:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(c);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function ce(a,t,n,c){var o;if(!a.length)return"";let r=(o=I[t])!=null?o:I.en,i=s=>`<button type="button" class="rv-btn" data-rv-${s} aria-label="${e(s==="prev"?r.prev:r.next)}">${m("arrow",18,s==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Me(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(c).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
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
upd()}})()<\/script>`;var le=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function de({site:a,markets:t,url:n,abs:c}){var o;let r=(o=t.find(s=>s.default))!=null?o:t[0],i=t.map(s=>({id:s.id,lang:s.lang,country:s.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${c(`${r.id}/`)}">
${t.map(s=>`<link rel="alternate" hreflang="${e(s.lang)}-${e(s.country)}" href="${c(`${s.id}/`)}">`).join(`
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
<body><p>${t.map(s=>`<a href="${n(`${s.id}/`)}">${e(s.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Se="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=DM+Sans:wght@300;400;500;600&display=swap",ze=4.5359,ue=a=>{var t;return(t=a.weight)!=null?t:a.country==="US"?"lb":"g"},pe=6;function Ne(a,t){var c;let n=ue(t)==="g";return((c=a.products)!=null?c:[]).map(r=>{var i;return{...r,each:r.per==="each",variants:((i=r.variants)!=null?i:[]).map(o=>{var s,d;return{...o,price:F(n&&r.per!=="each"&&((d=(s=o.prices)==null?void 0:s[t.id])==null?void 0:d.mode)!=="manual"?{...o,basePrice:o.basePrice/ze}:o,t)}}).filter(o=>o.price!=null)}}).filter(r=>r.variants.length).map(r=>{var i;return{...r,from:Math.min(...r.variants.map(o=>o.price)),months:((i=r.months)!=null?i:[]).map(Number)}})}var Pe=a=>String(a!=null?a:"").split(`
`).map(t=>t.trim()).filter(Boolean),he=(a,t,n="short")=>new Intl.DateTimeFormat(a,{month:n,timeZone:"UTC"}).format(new Date(Date.UTC(2026,t-1,15)));function oa({site:a,catalog:t,i18n:n,template:c,basePath:r="/",siteUrl:i=a.domain}){var g,y,$,k,M,D,x,v;let o=Z(r),s=b=>new URL(o(b),i).href,d=t.markets,p=Y(a.orderForm),l=p&&!p.error?p:null,h=[];for(let b of d){let S=b.lang,z=(y=(g=n[S])!=null?g:n.en)!=null?y:n.vi,P=f=>W(f,S,"en"),B=Ne(t,b),O=(k=($=a.orderChannels)==null?void 0:$[b.id])!=null?k:["phone"],A=f=>Number.isInteger(f)?new Intl.NumberFormat(N(S),{style:"currency",currency:b.currency,maximumFractionDigits:0}).format(f):J(f,b),j=f=>{var R;return f&&(R=F({basePrice:f},b))!=null?R:0},w=(M=a.order)!=null?M:{},C=ue(b),V={delivery:((D=w.delivery)!=null?D:[]).filter(f=>f==null?void 0:f.id).map(f=>{var R;return{id:f.id,n:P(f.name),p:Number(f.basePrice)&&(R=F(f,b))!=null?R:0,lead:Number(f.lead)||0,free:j(f.freeOver)}}),min:j(w.minOrder),cutoff:/^\d{1,2}:\d{2}$/.test((x=w.cutoff)!=null?x:"")?w.cutoff:"",closed:((v=w.closedDays)!=null?v:[]).map(Number)},me={site:a,catalog:t,market:b,markets:d,lang:S,t:z,L:P,url:o,abs:s,channels:O,money:A,conv:j,items:B,template:c,gform:l,ord:V,weight:C,per:f=>f.each?`/ ${P(f.unit)||z.catch.each}`:C==="lb"?z.catch.perLb:z.catch.per100};h.push({path:`${b.id}/index.html`,html:je(me)})}return h.push({path:"index.html",html:de({site:a,markets:d,url:o,abs:s})}),h}function je(a){var S,z,P,B,O,A,j,w,C;let{site:t,market:n,markets:c,lang:r,t:i,L:o,url:s,abs:d,channels:p,ord:l,items:h,weight:g}=a,y=`${t.name} \xB7 ${o(t.tagline)}`,$=(S=t.theme)!=null?S:{},k=["primary","ink","bg","surface","soft","accent"].filter(u=>$[u]).map(u=>`--${u}:${$[u]}`).join(";"),M=(z=c.find(u=>u.default))!=null?z:c[0],D=c.map(u=>({id:u.id,lang:u.lang,country:u.country,currency:u.currency,href:s(`${u.id}/`)})),x=(P=t.contact)!=null?P:{},v=t.heroImage,b=h.map(u=>({id:u.id,n:o(u.name),m:u.months,e:u.each?1:0,u:u.each?o(u.unit)||i.catch.each:"",v:u.variants.map(V=>{var U;return[(U=o(V.label))!=null?U:"",V.price]})}));return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(y)}</title>
<meta name="description" content="${e(o(t.intro))}">
<link rel="canonical" href="${d(`${n.id}/`)}">
${c.map(u=>`<link rel="alternate" hreflang="${e(u.lang)}-${e(u.country)}" href="${d(`${u.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${M.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(y)}">
<meta property="og:description" content="${e(o(t.intro))}">
<meta property="og:url" content="${d(`${n.id}/`)}">
${v?`<meta property="og:image" content="${e(d(G(v)))}">`:""}
<meta property="og:site_name" content="${e(t.name)}">
<meta name="theme-color" content="${e((B=$.bg)!=null?B:"#0B1620")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Se}">
<link rel="stylesheet" href="${s("assets/style.css")}">
<style>:root{${k}}</style>
${_(Le(a))}${((O=t.faq)!=null?O:[]).length?_(Ue(a)):""}
<script src="${s("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(D))}' data-copied="${e(i.copied)}" data-wa="${e(T((A=x.whatsapp)!=null?A:""))}" data-email="${e((j=x.email)!=null?j:"")}" data-tz="${e((w=t.timezone)!=null?w:"America/New_York")}" data-currency="${e(n.currency)}" data-lang="${e(r)}" data-locale="${e(N(r))}" data-weight="${e(g)}" data-units='${e(JSON.stringify(i.units))}' data-order='${e(JSON.stringify(l))}'>
<script type="application/json" id="fl-data">${JSON.stringify(b).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${e(i.skip)}</a>
${te(i)}
${o(t.announcement)?`<p class="announce">${e(o(t.announcement))}</p>`:""}
${Te(a)}
<main id="main">
${[Ce,Re,qe,Ee,Oe,Ae,Ve,Fe,Ge,Be,He].map(u=>u(a)).join(`
`)}
</main>
${Ie(a)}
<nav class="dock" aria-label="${e(i.nav.book)}">
  <a href="${e(E(p[0],x))}" ${L(p[0])}>${m(p[0],20)}<span>${e((C=i.via[p[0]])!=null?C:p[0])}</span></a>
  <a class="primary" href="#order">${m("bag",20)}<span>${e(i.nav.book)}</span></a>
</nav>
</body>
</html>
`}function Te({site:a,market:t,markets:n,t:c,url:r}){let i=[["#season",c.nav.season],["#catch",c.nav.catch],["#order",c.nav.order],["#steps",c.nav.steps],["#visit",c.nav.contact]];return`<header class="header" data-header>
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(q(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${m("wave",18)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([o,s])=>`<a href="${o}">${e(s)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(c.market.label)}">${m("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(ae(t))}</span></span></summary>
        <ul>${n.map(o=>`<li><a href="${r(`${o.id}/`)}" hreflang="${e(o.lang)}"${o.id===t.id?' aria-current="true"':""}>${e(o.country)} \xB7 ${e(o.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#order">${e(c.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(c.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${i.map(([o,s])=>`<a href="${o}">${e(s)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Ce({site:a,t,L:n,url:c,items:r,money:i,per:o,lang:s}){var k,M,D,x;let d=a.heroImage,p=((k=a.stats)!=null?k:[]).filter(v=>n(v==null?void 0:v.value)),l=(M=a.board)!=null?M:{},h=((D=l.items)!=null?D:[]).map(v=>r.find(b=>b.id===v)).filter(Boolean),g=l.date==="auto",y=g||/^\d{4}-\d{2}-\d{2}$/.test((x=l.date)!=null?x:""),$=y&&!g?new Intl.DateTimeFormat(N(s),{timeZone:"UTC",weekday:"long",month:"long",day:"numeric"}).format(new Date(`${l.date}T00:00:00Z`)):"";return`<section class="hero">
  ${d?`<img class="hero-img" src="${e(q(c,d))}" alt="" width="1600" height="1000" fetchpriority="high">`:""}
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${n(a.heroKicker)?`<p class="kicker">${e(n(a.heroKicker))}</p>`:""}
      <h1>${e(n(a.tagline))}</h1>
      <p class="lead">${e(n(a.intro))}</p>
      <div class="actions"><a class="btn btn--accent btn--lg" href="#order">${m("bag",18)} ${e(t.hero.order)}</a><a class="btn btn--ghost btn--lg" href="#season">${m("calendar",18)} ${e(t.hero.season)}</a></div>
    </div>
    ${h.length&&y?`<aside class="board" data-board="${e(l.date)}" aria-labelledby="board-title">
      <p class="board-k" id="board-title">${m("wave",16)} ${e(t.board.title)}</p>
      <p class="board-d" data-board-date>${e($)}</p>
      <ul>${h.map(v=>`<li><a href="#fl-${e(v.id)}">${e(n(v.name))}</a><span>${e(i(v.from))} <small>${e(o(v))}</small></span></li>`).join("")}</ul>
      ${n(l.note)?`<p class="board-n">${e(n(l.note))}</p>`:""}
    </aside>`:""}
  </div>
  ${p.length?`<div class="wrap"><ul class="stats">${p.slice(0,4).map(v=>`<li><b>${e(n(v.value))}</b><span>${e(n(v.label))}</span></li>`).join("")}</ul></div>`:""}
</section>`}function Re({items:a,t,L:n,lang:c}){if(!a.length)return"";let r=t.season,i=Array.from({length:12},(o,s)=>s+1);return`<section class="section section--deep" id="season" aria-labelledby="season-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(r.kicker)}</p><h2 id="season-title" class="h2">${e(r.title)}</h2><p class="lead">${e(r.text)}</p></div>
    <p class="now" data-now data-tpl="${e(r.now)}" hidden></p>
    <div class="table-wrap"><table class="season" data-season>
      <thead><tr><th scope="col"><span class="sr">${e(r.species)}</span></th>${i.map(o=>`<th scope="col" data-m="${o}"><abbr title="${e(he(c,o,"long"))}">${e(he(c,o))}</abbr></th>`).join("")}</tr></thead>
      <tbody>${a.map(o=>`<tr><th scope="row"><a href="#fl-${e(o.id)}">${e(n(o.name))}</a></th>${i.map(s=>`<td data-m="${s}"${o.months.includes(s)?' class="on"':""}><span class="sr">${e(o.months.includes(s)?r.yes:r.no)}</span></td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
    <p class="legend"><span><i class="lg-on"></i>${e(r.yes)}</span><span><i class="lg-now"></i>${e(r.thisMonth)}</span></p>
  </div>
</section>`}function qe({items:a,catalog:t,t:n,L:c,url:r,money:i,per:o}){var p;if(!a.length)return"";let s=n.catch,d=((p=t.categories)!=null?p:[]).filter(l=>a.some(h=>h.category===l.id));return`<section class="section" id="catch" aria-labelledby="fl-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(s.kicker)}</p><h2 id="fl-title" class="h2">${e(s.title)}</h2><p class="lead">${e(s.text)}</p></div>
    <div class="chips" role="group" aria-label="${e(s.kicker)}" data-chips>
      <button type="button" class="chip" aria-pressed="true" data-f="">${e(s.all)}</button>
      <button type="button" class="chip" aria-pressed="false" data-f="season">${e(s.inSeason)}</button>
      ${a.some(l=>l.sashimi)?`<button type="button" class="chip" aria-pressed="false" data-f="sashimi">${e(s.sashimi)}</button>`:""}
      ${d.map(l=>`<button type="button" class="chip" aria-pressed="false" data-f="cat:${e(l.id)}">${e(c(l.name))}</button>`).join("")}
    </div>
    <ul class="loans flowers" data-cards>${a.map(l=>{var h;return`<li class="loan" id="fl-${e(l.id)}" data-fl="${e(l.id)}" data-cat="${e((h=l.category)!=null?h:"")}" data-sashimi="${l.sashimi?1:0}">
      ${l.image?`<div class="loan-img"><img sizes="${K.card}" src="${e(q(r,l.image))}" alt="${e(c(l.name))}" width="800" height="600" loading="lazy">${c(l.badge)?`<span class="badge">${e(c(l.badge))}</span>`:""}<span class="badge badge--season" data-in-season hidden>${e(s.inSeason)}</span></div>`:""}
      <div class="loan-body">
        <h3>${e(c(l.name))}</h3>
        ${c(l.description)?`<p class="muted">${e(c(l.description))}</p>`:""}
        <p class="tags">${l.wild===!0?`<span class="tag">${e(s.wild)}</span>`:l.wild===!1?`<span class="tag">${e(s.farmed)}</span>`:""}${l.sashimi?`<span class="tag tag--hi">${e(s.sashimi)}</span>`:""}</p>
        <dl class="terms">
          ${c(l.origin)?`<div><dt>${e(s.origin)}</dt><dd>${e(c(l.origin))}</dd></div>`:""}
          ${l.keeps?`<div><dt>${e(s.keeps)}</dt><dd>${e(l.keeps===1&&s.day?s.day:s.days.replace("{n}",l.keeps))}</dd></div>`:""}
          ${l.variants.map(g=>`<div><dt>${e(c(g.label)||s.price)}</dt><dd>${e(i(g.price))} <small>${e(o(l))}</small></dd></div>`).join("")}
        </dl>
        <button type="button" class="link" data-add-fl="${e(l.id)}">${m("plus",16)} ${e(s.add)}</button>
      </div>
    </li>`}).join("")}</ul>
    <p class="muted empty" data-cards-empty hidden>${e(s.none)}</p>
  </div>
</section>`}function Ee({items:a,t,L:n,money:c,ord:r,weight:i,per:o}){if(!a.length)return"";let s=t.order,d=i==="lb"?.5:100,p=r.cutoff?s.cutoff.replace("{time}",r.cutoff):"";return`<section class="section section--deep" id="order" aria-labelledby="order-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(s.kicker)}</p><h2 id="order-title" class="h2">${e(s.title)}</h2><p class="lead">${e(s.text)}</p></div>
    <div class="calc" data-order-calc>
      <form class="calc-in" onsubmit="return false">
        <ul class="ol">${a.map(l=>`<li class="ol-row" data-row="${e(l.id)}">
          <span class="ol-n"><b>${e(n(l.name))}</b><small>${e(o(l))}</small></span>
          ${l.variants.length>1?`<select name="v-${e(l.id)}" aria-label="${e(s.cut)}">${l.variants.map((h,g)=>`<option value="${g}">${e(n(h.label))} \xB7 ${e(c(h.price))}</option>`).join("")}</select>`:`<span class="ol-p">${e(c(l.variants[0].price))}</span>`}
          <span class="qty"><button type="button" data-d="-1" aria-label="\u2212">\u2212</button><input name="q-${e(l.id)}" type="number" min="0" max="${l.each?99:i==="lb"?50:2e4}" step="${l.each?1:d}" value="0" inputmode="decimal" aria-label="${e(n(l.name))} \xB7 ${e(l.each?n(l.unit)||t.catch.each:t.units[i])}"><button type="button" data-d="1" aria-label="+">+</button><i>${e(l.each?n(l.unit)||t.catch.each:t.units[i])}</i></span>
        </li>`).join("")}</ul>
        <div class="row2">
          <label class="field"><span>${e(s.date)}</span><input name="date" type="date" data-o-date></label>
          ${r.delivery.length?`<label class="field"><span>${e(s.how)}</span><select name="how" data-o-how>${r.delivery.map(l=>`<option value="${e(l.id)}">${e(l.n)}${l.p?` \xB7 ${e(c(l.p))}`:""}</option>`).join("")}</select></label>`:""}
        </div>
        ${p?`<p class="tiers"><span class="on">${m("clock",14)} ${e(p)}</span>${r.delivery.filter(l=>l.free).map(l=>`<span>${e(s.freeOver.replace("{how}",l.n).replace("{price}",c(l.free)))}</span>`).join("")}</p>`:""}
      </form>
      <div class="calc-out" aria-live="polite" data-o-out data-l='${e(JSON.stringify({free:s.free,out:s.outSeason,min:s.minWarn.replace("{price}",c(r.min)),empty:s.empty,closed:s.closed}))}'>
        <p class="out-k">${e(s.total)}</p>
        <p class="out-big" data-o-total>\u2014</p>
        <dl class="out">
          <div><dt>${e(s.weight)}</dt><dd data-o-bunches>\u2014</dd></div>
          <div><dt>${e(s.subtotal)}</dt><dd data-o-sub>\u2014</dd></div>
          <div data-o-ship-row hidden><dt>${e(s.ship)}</dt><dd data-o-ship></dd></div>
        </dl>
        <p class="warn" data-o-warn hidden></p>
        <p class="hint small">${m("scale",14)} ${e(s.note)}</p>
        <a class="btn btn--accent btn--lg btn--full" href="#book" data-use-order>${m("bag",18)} ${e(s.use)}</a>
      </div>
    </div>
  </div>
</section>`}function Be({site:a,t,L:n,channels:c,gform:r,market:i}){let o=t.book,s=t.orderText.replace(/\{\w+\}/g,"\u2026"),d=r?` data-gform="${e(r.action)}" data-gmap='${e(JSON.stringify(r.fields))}'`:"",p=h=>c.map((g,y)=>{var $,k;return`<button type="submit" class="btn ${h!=null?h:y?"btn--ghost":"btn--accent"} btn--lg" data-channel="${e(g)}" data-href="${e(E(g,($=a.contact)!=null?$:{},s))}">${m(g,18)} ${e(g==="phone"?o.call:o.send.replace("{channel}",(k=t.via[g])!=null?k:g))}</button>`}).join(""),l=Pe(n(a.bookPoints));return`<section class="section" id="book" aria-labelledby="book-title">
  <div class="wrap reg">
    <div class="reg-copy">
      <p class="kicker">${e(o.kicker)}</p>
      <h2 id="book-title" class="h2">${e(o.title)}</h2>
      <p class="lead">${e(n(a.bookText)||o.text)}</p>
      ${l.length?`<ul class="reg-points">${l.map(h=>`<li>${m("check",16)} ${e(h)}</li>`).join("")}</ul>`:""}
    </div>
    <form class="form" data-book${d} data-text="${e(t.orderText)}" data-market="${e(`${i.id.toUpperCase()} \xB7 ${i.currency}`)}" novalidate>
      <div class="order-fields">
        <div class="calc-sum" data-b-cart hidden><p class="small"><b>${e(o.cart)}</b></p><p class="small" data-b-cart-text></p></div>
        <p class="small muted" data-b-nocart>${e(o.noCart)} <a href="#order">${e(t.order.title)}</a></p>
                <div class="row2">
          <label class="field"><span>${e(o.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(o.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(o.address)}</span><input name="address" maxlength="200" autocomplete="street-address" placeholder="${e(o.addressHint)}"></label>
        <label class="field"><span>${e(o.note)}</span><input name="note" maxlength="300" placeholder="${e(o.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(o.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-order-submit>${m("check",18)} ${e(o.submit)}</button>
        <noscript><p>${c.map(h=>{var g,y;return`<a href="${e(E(h,(g=a.contact)!=null?g:{},s))}" ${L(h)}>${e((y=t.via[h])!=null?y:h)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m(r?"check":"arrow",22)} ${e(r?o.done:o.stepTitle)}</p>
        <p class="muted">${e(r?o.doneText:o.stepText)}</p>
        <div class="buy">${p(r?"btn--ghost":void 0)}</div>
        ${r?"":`<button type="button" class="link" data-edit>${e(o.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Oe({site:a,t,L:n}){var r;let c=((r=a.steps)!=null?r:[]).filter(i=>n(i==null?void 0:i.title));return c.length?`<section class="section section--deep" id="steps" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(t.steps.title)}</h2></div>
    <ol class="steps">${c.map((i,o)=>`<li><span class="st-n">${String(o+1).padStart(2,"0")}</span><h3>${e(n(i.title))}</h3>${n(i.time)?`<small>${e(n(i.time))}</small>`:""}<p>${e(n(i.text))}</p></li>`).join("")}</ol>
  </div>
</section>`:""}function Ae({site:a,t,L:n}){var r;let c=((r=a.care)!=null?r:[]).filter(i=>n(i==null?void 0:i.title));return c.length?`<section class="section" id="care" aria-labelledby="care-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.care.kicker)}</p><h2 id="care-title" class="h2">${e(t.care.title)}</h2></div>
    <ul class="care">${c.map(i=>{var o;return`<li>${m((o=i.icon)!=null?o:"thermo",22)}<h3>${e(n(i.title))}</h3><p class="muted">${e(n(i.text))}</p></li>`}).join("")}</ul>
  </div>
</section>`:""}function Ve({site:a,t,L:n,url:c}){var i;let r=((i=a.homes)!=null?i:[]).filter(o=>o==null?void 0:o.image);return r.length?`<section class="section" id="homes" aria-labelledby="homes-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.homes.kicker)}</p><h2 id="homes-title" class="h2">${e(t.homes.title)}</h2></div>
    <ul class="homes" data-homes>${r.map((o,s)=>{var d;return`<li${s>=pe?' class="is-more"':""}><figure><img sizes="${K.card}" src="${e(q(c,o.image))}" alt="${e((d=n(o.tag))!=null?d:"")}" width="800" height="600" loading="lazy">${n(o.tag)?`<figcaption>${e(n(o.tag))}</figcaption>`:""}</figure></li>`}).join("")}</ul>
    ${r.length>pe?`<div class="more"><button type="button" class="btn btn--ghost" data-homes-more hidden>${e(t.homes.more)}</button></div>`:""}
  </div>
</section>`:""}function Fe({site:a,t,L:n,lang:c}){let r=oe(a,t,c,"btn btn--ghost"),i=se(a);return a.showReviews===!1||!i.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${ce(i,c,"reviews",o=>`<figure class="review">
      <p class="stars" aria-label="${e(o.rating)}/5">${Array.from({length:5},(s,d)=>`<span class="${d<o.rating?"on":""}">${m("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(o.text))}</blockquote>
      <figcaption>${e(o.name)}${n(o.bought)?`<small>${e(n(o.bought))}</small>`:""}${ie(o,c)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ge({site:a,t,L:n}){var r;let c=((r=a.faq)!=null?r:[]).filter(i=>n(i==null?void 0:i.q));return c.length?`<section class="section section--deep" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${c.map((i,o)=>`<details${o===0?" open":""}><summary>${e(n(i.q))}</summary><p>${e(n(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function He({site:a,t,L:n,channels:c}){var s,d,p;let r=(s=a.contact)!=null?s:{},i=encodeURIComponent((d=r.mapQuery)!=null?d:n(r.address)),o=l=>l.length===7?t.visit.everyDay:Q(l,t.days);return`<section class="section section--deep" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${ne(a,t)}
      ${((p=a.hours)!=null?p:[]).length?`<table class="hours"><tbody>${a.hours.map(l=>`<tr><th scope="row">${e(o(l.days))}</th><td>${e(l.open)} \u2013 ${e(l.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${m("pin",18)} ${e(n(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--ghost" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(t.visit.directions)} ${m("arrow",16)}</a>
        ${c.map(l=>{var h;return`<a class="btn btn--ghost" href="${e(E(l,r))}" ${L(l)}>${m(l,18)} ${e((h=t.via[l])!=null?h:l)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ie({site:a,t,L:n,market:c}){var o,s;let r=(o=a.contact)!=null?o:{},i=Object.entries((s=a.social)!=null?s:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p>${n(a.license)?`<p class="muted small">${e(n(a.license))}</p>`:""}</div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${T(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([d,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(d==="tiktok"?"TikTok":d==="youtube"?"YouTube":d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  ${n(a.disclaimer)?`<div class="wrap"><p class="disclaimer">${e(n(a.disclaimer))}</p></div>`:""}
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${le(a,t,c.lang)}</div>
</footer>`}function Le({site:a,market:t,L:n,abs:c,items:r}){var o,s;let i=(o=a.contact)!=null?o:{};return{"@context":"https://schema.org","@type":"Store",additionalType:"https://schema.org/GroceryStore",name:a.name,url:c(`${t.id}/`),...a.heroImage?{image:c(G(a.heroImage))}:{},description:n(a.intro),telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:n(i.address)},currenciesAccepted:t.currency,openingHoursSpecification:ee((s=a.hours)!=null?s:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:a.name,itemListElement:r.flatMap(d=>d.variants.map(p=>({"@type":"Offer",name:`${n(d.name)}${n(p.label)?` \xB7 ${n(p.label)}`:""}`,price:p.price,priceCurrency:t.currency})))}}}var Ue=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});export{oa as renderSite,ue as weightOf};
