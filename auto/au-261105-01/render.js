var ze={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>ze[t]);function _(a,t,n="vi"){var o,r,i;return a==null?"":typeof a!="object"?String(a):(i=(r=(o=a[t])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?i:""}var Se={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},X=a=>{var t;return(t=Se[a])!=null?t:"en-US"};function De(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function F(a,t){var o,r;if(t.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:De(a.basePrice*t.rate,t.rounding)}var Pe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function ee(a,t){let n={style:"currency",currency:t.currency};return Pe.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(X(t.lang),n).format(a)}function te(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var A=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,C=(a,t)=>{let n=A(t);return n==null?t:a(n)},E=(a="")=>String(a).replace(/\D/g,"");function Q(a,t,n=""){switch(a){case"phone":return`tel:${E(t.phone)}`;case"zalo":return`https://zalo.me/${E(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${E(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var O=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,je=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function ae(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,i]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let s=i.trim().replace(/^\{|\}$/g,"").toLowerCase();je.includes(s)&&(o[s]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var B={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Ne={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(a,t=20,n="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=Ne[a])!=null?o:""}</svg>`},K=[1,2,3,4,5,6,0],Ce=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function re(a,t){let n=a.map(r=>K.indexOf(r)).sort((r,i)=>r-i);return n.every((r,i)=>i===0||r===n[i-1]+1)&&n.length>2?`${t[K[n[0]]]} \u2013 ${t[K[n.at(-1)]]}`:n.map(r=>t[K[r]]).join(", ")}var se=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>Ce[n]),opens:t.open,closes:t.close}));function ie(a){var n,o;return(o=(n=new Intl.NumberFormat(X(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var le=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',ce=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,de=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},ne={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Te=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Re=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&Te.test(n.hostname)?n.href:""}catch{return""}},pe=(a,t,n,o="btn btn--line")=>{var s;let r=Re(a);if(!r)return"";let i=typeof t.reviews=="object"&&((s=t.reviews)==null?void 0:s.google)||ne[n]||ne.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${m("star",16)} ${e(i)}</a></p>`},J={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},he={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ue=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function me(a,t){var i,s,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((s=n[3])!=null?s:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((c=he[t])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function qe(a,t){var s,c;let n=a.filter(l=>l.rating>=1&&l.rating<=5);if(n.length<2)return"";let o=n.reduce((l,h)=>l+Number(h.rating),0)/n.length,r=(s=J[t])!=null?s:J.en,i=new Intl.NumberFormat((c=he[t])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function ge(a,t,n,o){var s;if(!a.length)return"";let r=(s=J[t])!=null?s:J.en,i=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?r.prev:r.next)}">${m("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${qe(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${Le}`}var Le=`<style>
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
upd()}})()<\/script>`,oe={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function fe(a){var o;let t=(o=oe[a])!=null?o:oe.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${m("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${m("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${m("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var be=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function ve({site:a,markets:t,url:n,abs:o}){var s;let r=(s=t.find(c=>c.default))!=null?s:t[0],i=t.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${t.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${o(`${c.id}/`)}">`).join(`
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
<body><p>${t.map(c=>`<a href="${n(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Ee="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ke=24,ye={black:"#1C1C1C",silver:"#C3C7CC",gunmetal:"#4B5057",bronze:"#9C7A4A",white:"#F2F2F2"},Be=["car","suv","pickup","moto"],Fe=/^(\d{3})\/(\d{2})Z?R(\d{2})$/,Z=a=>{var t,n,o,r;return(typeof a.label=="string"?a.label:(r=(o=(t=a.label)==null?void 0:t.vi)!=null?o:(n=a.label)==null?void 0:n.en)!=null?r:"").trim()};function xe(a,t){var n;return((n=a.products)!=null?n:[]).map(o=>{var r;return{...o,variants:((r=o.variants)!=null?r:[]).map(i=>({...i,price:F(i,t)})).filter(i=>i.price!=null)}}).filter(o=>o.variants.length>0).map(o=>{let r=o.variants.map(Z).filter(Boolean),i=Math.min(...o.variants.filter(c=>{var l;return!((l=o.soldOut)!=null&&l.includes(Z(c)))}).map(c=>c.price).concat(o.variants.map(c=>c.price))),s=o.was?F({basePrice:o.was,prices:o.wasPrices},t):null;return{...o,sizes:r,from:i,was:s&&s>i?s:null}})}function Ae(a){let t=a.filter(i=>i.badge||i.was),n=a.filter(i=>!t.includes(i)),o=[...new Set(n.map(i=>i.category))].map(i=>n.filter(s=>s.category===i)),r=[...t];for(let i=0;r.length<a.length;i++)for(let s of o)s[i]&&r.push(s[i]);return r}var we=a=>String(a).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function Oe(a){let t=10**Math.floor(Math.log10(a));return[1,2,2.5,5,10].map(n=>n*t).reduce((n,o)=>Math.abs(o-a)<Math.abs(n-a)?o:n)}function Ve(a){let t=a.map(o=>o.from).sort((o,r)=>o-r),n=[...new Set([.25,.5,.75].map(o=>Oe(t[Math.floor(o*(t.length-1))])))];return n.map((o,r)=>[r?n[r-1]:0,o]).concat([[n[n.length-1],1/0]])}function vt({site:a,catalog:t,i18n:n,template:o,basePath:r="/",siteUrl:i=a.domain}){var $,d,f,k,w,x,M,P,D,j,N,p;let s=te(r),c=b=>new URL(s(b),i).href,l=t.markets,h=(b,z)=>`${z.id}/${_(b.slug,z.lang,"en")}/`,g=ae(a.orderForm),u=g&&!g.error?g:null,y=[];for(let b of l){let z=b.lang,q=(d=($=n[z])!=null?$:n.en)!=null?d:n.vi,V=S=>_(S,z,"en"),L=xe(t,b),I=(k=(f=a.orderChannels)==null?void 0:f[b.id])!=null?k:["phone"],G=S=>ee(S,b),H=S=>{var R;return((R=t.collections)!=null?R:[]).find(Y=>Y.id===S.category)},U=((w=t.collections)!=null?w:[]).filter(S=>L.some(R=>R.category===S.id)),T=(x=a.shipping)!=null?x:{},W={fee:(D=(P=(M=T.prices)==null?void 0:M[b.id])==null?void 0:P.fee)!=null?D:T.fee!=null?F({basePrice:T.fee},b):0,free:(p=(N=(j=T.prices)==null?void 0:j[b.id])==null?void 0:N.freeFrom)!=null?p:T.freeFrom!=null?F({basePrice:T.freeFrom},b):null},v={site:a,catalog:t,market:b,markets:l,lang:z,t:q,L:V,url:s,abs:c,channels:I,money:G,items:L,productPath:h,template:o,col:H,collections:U,gform:u,ship:W};y.push({path:`${b.id}/index.html`,html:$e(v,{kind:"home"})});for(let S of L)y.push({path:`${h(S,b)}index.html`,html:$e(v,{kind:"product",product:S})})}return y.push({path:"index.html",html:ve({site:a,markets:l,url:s,abs:c})}),y}function $e(a,t){var V,L,I,G,H,U,T,W;let{site:n,market:o,markets:r,lang:i,t:s,L:c,url:l,abs:h,catalog:g,productPath:u,gform:y,money:$}=a,d=t.kind==="home",f=t.product,k=d?`${o.id}/`:u(f,o),w=d?`${n.name} \xB7 ${c(n.tagline)}`:`${c(f.name)} \xB7 ${n.name}`,x=d?c(n.intro):`${c(f.description)} ${$(f.from)}.`,M=r.map(v=>{var S;return d?{m:v,href:`${v.id}/`}:xe({products:[((S=g.products)!=null?S:[]).find(R=>R.id===f.id)]},v).length?{m:v,href:u(f,v)}:null}).filter(Boolean),P=v=>{var S,R;return(R=(S=M.find(Y=>Y.m.id===v.id))==null?void 0:S.href)!=null?R:`${v.id}/`},D=(V=r.find(v=>v.default))!=null?V:r[0],j=(L=n.theme)!=null?L:{},N=["primary","ink","bg","surface","soft","accent"].filter(v=>j[v]).map(v=>`--${v}:${j[v]}`).join(";"),p=r.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:l(P(v))})),b=(I=n.contact)!=null?I:{},z=h(A(d?n.heroImage||((G=a.items[0])==null?void 0:G.image):f.image)),q=y?` data-gform="${e(y.action)}" data-gmap='${e(JSON.stringify(y.fields))}'`:"";return`<!doctype html>
<html lang="${e(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(w)}</title>
<meta name="description" content="${e(x)}">
<link rel="canonical" href="${h(k)}">
${M.map(({m:v,href:S})=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${h(S)}">`).join(`
`)}
${M.some(v=>v.m.id===D.id)?`<link rel="alternate" hreflang="x-default" href="${h(P(D))}">`:""}
<meta property="og:type" content="${d?"website":"product"}">
<meta property="og:title" content="${e(w)}">
<meta property="og:description" content="${e(x)}">
<meta property="og:url" content="${h(k)}">
<meta property="og:image" content="${e(z)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((H=j.primary)!=null?H:"#14171B")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ee}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${N}}</style>
${d?O(at(a))+(((U=n.faq)!=null?U:[]).length?O(nt(a)):""):O(ot(a,f))+O(rt(a,f))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(o.id)}" data-markets='${e(JSON.stringify(p))}' data-copied="${e(s.copied)}" data-wa="${e(E((T=b.whatsapp)!=null?T:""))}" data-email="${e((W=b.email)!=null?W:"")}" data-store="${e(`kp-tyre-${we(n.name).replace(/[^a-z0-9]+/g,"")}-${o.id}`)}" data-currency="${e(o.currency)}" data-lang="${e(i)}">
<a class="skip" href="#main">${e(s.skip)}</a>
${ce(s)}
${c(n.announcement)?`<p class="announce">${m("wrench",15)} ${e(c(n.announcement))}</p>`:""}
${Ie(a,d)}
<main id="main">
${d?[Ge,He,Ue,We,_e,Ke,Je,Ze,Ye].map(v=>v(a)).join(`
`):Xe(a,f)}
</main>
${tt(a)}
${et(a,q)}
<nav class="dock" aria-label="${e(s.bag.title)}">
  <a href="${d?"":l(`${o.id}/`)}#shop">${m("search",20)}<span>${e(s.nav.shop)}</span></a>
  <button type="button" class="primary" data-bag-open>${m("bag",20)}<span>${e(s.bag.title)}</span><b class="bag-n" data-bag-count hidden>0</b></button>
</nav>
</body>
</html>
`}function Ie({site:a,market:t,markets:n,t:o,url:r},i){let s=i?"":r(`${t.id}/`),c=[[`${s}#collections`,o.nav.collections],[`${s}#shop`,o.nav.shop],[`${s}#size`,o.nav.size],[`${s}#care`,o.nav.care],[`${s}#visit`,o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(C(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${m("gear",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${c.map(([l,h])=>`<a href="${l}">${e(h)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${m("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(ie(t))}</span></span></summary>
        <ul>${n.map(l=>`<li><a href="${r(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===t.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <button type="button" class="bagbtn" data-bag-open aria-label="${e(o.bag.title)}">${m("bag",20)}<b class="bag-n" data-bag-count hidden>0</b></button>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${c.map(([l,h])=>`<a href="${l}">${e(h)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Ge({site:a,t,L:n,url:o,items:r}){var s;let i=a.heroImage||((s=r[0])==null?void 0:s.image);return`<section class="hero">
  ${i?`<img class="hero-img" src="${e(C(o,i))}" alt="" width="1600" height="1000" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${n(a.heroKicker)?`<p class="kicker">${e(n(a.heroKicker))}</p>`:""}
    <h1>${e(n(a.tagline))}</h1>
    <p class="lead">${e(n(a.intro))}</p>
    <div class="actions">
      <a class="btn btn--accent btn--lg" href="#shop">${e(t.hero.shop)} ${m("arrow",18)}</a>
      <a class="btn btn--light btn--lg" href="#size">${m("search",18)} ${e(t.hero.size)}</a>
    </div>
  </div>
  <div class="tread" aria-hidden="true"></div>
</section>`}function He({collections:a,items:t,t:n,L:o,url:r}){if(!a.length)return"";let i=a.length%2===1;return`<section class="section" id="collections" aria-labelledby="col-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.collections.kicker)}</p><h2 id="col-title" class="h2">${e(n.collections.title)}</h2></div>
    <ul class="cols${i?"":" cols--even"}">${a.map((s,c)=>{var h,g;let l=(g=s.image)!=null?g:(h=t.find(u=>u.category===s.id))==null?void 0:h.image;return`<li${c===0&&i?' class="col--big"':""}><a href="?type=${e(s.id)}#shop" data-filter-link="type" data-value="${e(s.id)}">
        ${l?`<img sizes="${B.card}" src="${e(C(r,l))}" alt="" width="900" height="1100" loading="lazy">`:""}
        <span class="col-copy"><b>${e(o(s.name))}</b>${o(s.text)?`<small>${e(o(s.text))}</small>`:""}<em>${e(n.collections.count.replace("{n}",t.filter(u=>u.category===s.id).length))} ${m("arrow",16)}</em></span>
      </a></li>`}).join("")}</ul>
  </div>
</section>`}function Me(a,t,n=0){var $,d,f,k,w,x,M,P,D,j,N;let{t:o,L:r,url:i,money:s,productPath:c,market:l,col:h}=a,g=[r(t.name),($=t.name)==null?void 0:$.vi,(d=t.name)==null?void 0:d.en,r((f=h(t))==null?void 0:f.name),...((k=t.colors)!=null?k:[]).map(p=>r(p.name)),(w=o.for[t.for])!=null?w:"",...t.sizes].filter(Boolean).join(" "),u=((x=t.sizes)!=null?x:[]).filter(p=>{var b;return!((b=t.soldOut)!=null&&b.includes(p))}),y=(M=t.images)==null?void 0:M[0];return`<li class="card${n>=ke?" is-more":""}" data-type="${e(t.category)}" data-for="${e((P=t.for)!=null?P:"all")}" data-sz="${e(u.join(" "))}" data-color="${e([...new Set(((D=t.colors)!=null?D:[]).map(p=>p.family))].join(" "))}" data-price="${t.from}" data-name="${e(we(g))}">
  <a class="card-link" href="${i(c(t,l))}">
    <div class="card-img${y?" has-alt":""}">
      <img sizes="${B.card}" src="${e(C(i,t.image))}" alt="${e(r(t.name))}" width="1000" height="1250" loading="lazy">
      ${y?`<img sizes="${B.card}" class="alt" src="${e(C(i,y))}" alt="" width="1000" height="1250" loading="lazy">`:""}
      ${t.was?`<span class="tag tag--sale">-${Math.round((1-t.from/t.was)*100)}%</span>`:r(t.badge)?`<span class="tag">${e(r(t.badge))}</span>`:""}
    </div>
    <p class="card-cat">${e(r((j=h(t))==null?void 0:j.name))}${t.category==="suv"?` \xB7 ${e(o.for[t.for])}`:""}</p>
    <h3>${e(r(t.name))}</h3>
    <p class="card-sizes">${e(t.sizes.slice(0,3).join(" \xB7 "))}${t.sizes.length>3?` <small>+${t.sizes.length-3}</small>`:""}</p>
    <p class="card-price">${t.variants.length>1?`<small>${e(o.shop.from)}</small> `:""}<b>${e(s(t.from))}</b>${t.was?` <s>${e(s(t.was))}</s>`:""}</p>
    ${((N=t.colors)==null?void 0:N.length)>1?`<p class="dots" aria-hidden="true">${t.colors.map(p=>`<i style="background:${e(p.hex)}"></i>`).join("")}</p>`:""}
  </a>
</li>`}function Ue(a){let{items:t,collections:n,t:o,L:r,money:i}=a,s=Be.filter(d=>t.some(f=>f.for===d)),c=(d,f)=>d.localeCompare(f,"en",{numeric:!0}),l=[...new Set(t.filter(d=>d.for!=="moto").flatMap(d=>d.sizes))].sort(c),h=[...new Set(t.filter(d=>d.for==="moto").flatMap(d=>d.sizes))].sort(c),g=Object.keys(ye).filter(d=>t.some(f=>{var k;return(k=f.colors)==null?void 0:k.some(w=>w.family===d)})),u=t.length>4?Ve(t):[],y=([d,f])=>d?f===1/0?o.shop.over.replace("{a}",i(d)):`${i(d)} \u2013 ${i(f)}`:o.shop.under.replace("{b}",i(f)),$=(d,f,k,w)=>`<label class="select"><span class="lab">${e(f)}</span><select ${d}><option value="">${e(k)}</option>${w}</select></label>`;return`<section class="section section--soft" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(o.shop.kicker)}</p><h2 id="shop-title" class="h2">${e(o.shop.title)}</h2>
      <p class="muted" data-count="${e(o.shop.count)}">${e(o.shop.count.replace("{n}",t.length))}</p></div>
    <div class="toolbar" data-toolbar>
      <div class="chips" role="group" aria-label="${e(o.shop.type)}">
        <button type="button" class="pill is-on" data-type="">${e(o.shop.all)}</button>
        ${n.map(d=>`<button type="button" class="pill" data-type="${e(d.id)}">${e(r(d.name))}</button>`).join("")}
      </div>
      <div class="filters">
        <label class="search">${m("search",18)}<input type="search" placeholder="${e(o.search)}" aria-label="${e(o.search)}" data-search></label>
        ${s.length>1?$("data-forf",o.shop.for,o.shop.anyFor,s.map(d=>`<option value="${d}">${e(o.for[d])}</option>`).join("")):""}
        ${l.length||h.length?$("data-szf",o.shop.size,o.shop.anySize,`${l.map(d=>`<option value="${e(d)}">${e(d)}</option>`).join("")}${h.length?`<optgroup label="${e(o.for.moto)}">${h.map(d=>`<option value="${e(d)}">${e(d)}</option>`).join("")}</optgroup>`:""}`):""}
        ${u.length?$("data-band",o.shop.price,o.shop.anyPrice,u.map(d=>`<option value="${d[0]}-${d[1]===1/0?"":d[1]}">${e(y(d))}</option>`).join("")):""}
        ${$("data-sort",o.shop.sort,o.shop.sortPop,`<option value="asc">${e(o.shop.sortLow)}</option><option value="desc">${e(o.shop.sortHigh)}</option>`)}
      </div>
      ${g.length>1?`<div class="swatch-row" role="group" aria-label="${e(o.shop.color)}"><span class="lab">${e(o.shop.color)}</span>${g.map(d=>{var f,k;return`<button type="button" class="fam" data-color="${d}" aria-pressed="false" title="${e((f=o.colors[d])!=null?f:d)}" style="background:${ye[d]}"><span class="sr">${e((k=o.colors[d])!=null?k:d)}</span></button>`}).join("")}</div>`:""}
      <p class="mysize" data-mysize hidden><span data-mysize-text data-tpl="${e(o.size.mine)}"></span> <button type="button" class="link" data-mysize-filter>${e(o.size.filterMine)}</button></p>
    </div>
    <ul class="grid" data-grid>${Ae(t).map((d,f)=>Me(a,d,f)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${e(o.shop.empty)}</p>
    ${t.length>ke?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(o.shop.more)}</button></div>`:""}
  </div>
</section>`}function We(a){var g;let{items:t,t:n,L:o,site:r}=a,i=[...new Set(t.flatMap(u=>u.sizes))].map(u=>Fe.exec(u)).filter(Boolean);if(!i.length)return"";let s=u=>[...new Set(i.map(y=>y[u]))].sort((y,$)=>y-$),c=n.size,l=((g=r.sizeParts)!=null?g:[]).filter(u=>(u==null?void 0:u.code)&&o(u.label)),h=(u,y,$)=>`<label class="select"><span class="lab">${e(y)}</span><select name="${u}"><option value="">\u2014</option>${$.map(d=>`<option>${e(d)}</option>`).join("")}</select></label>`;return`<section class="section" id="size" aria-labelledby="size-title">
  <div class="wrap size-wrap">
    <div class="sec-head sec-head--left"><p class="kicker">${e(c.kicker)}</p><h2 id="size-title" class="h2">${e(c.title)}</h2><p class="lead">${e(o(r.sizeIntro)||c.text)}</p>
      ${l.length?`<div class="sidewall" aria-label="${e(c.read)}"><p class="sw-code">${l.map((u,y)=>`<span class="sw-p sw-p${y}">${e(u.code)}</span>`).join("")}</p>
        <ol class="sw-legend">${l.map((u,y)=>`<li><b class="sw-p sw-p${y}">${e(u.code)}</b><span>${e(o(u.label))}</span></li>`).join("")}</ol></div>`:""}</div>
    <div>
      <form class="finder" data-finder novalidate data-sizes='${e(JSON.stringify(i.map(u=>u[0])))}'>
        <p class="finder-h">${m("search",18)} ${e(c.pick)}</p>
        <div class="row3">${h("w",c.width,s(1))}${h("a",c.aspect,s(2))}${h("r",c.rim,s(3))}</div>
        <output class="result" data-result data-tpl="${e(c.result)}" data-none="${e(c.none)}" aria-live="polite">${e(c.hint)}</output>
        <div class="finder-act"><button type="button" class="btn btn--accent" data-show hidden>${m("arrow",18)} ${e(c.show)}</button><button type="button" class="btn btn--line" data-save hidden>${m("heart",18)} ${e(c.save)}</button></div>
      </form>
      <p class="muted small">${e(o(r.sizeNote)||c.note)}</p>
    </div>
  </div>
</section>`}function _e({site:a,t,L:n,url:o}){var i;let r=((i=a.care)!=null?i:[]).filter(s=>n(s==null?void 0:s.title));return r.length?`<section class="section section--deep" id="care" aria-labelledby="care-title">
  <div class="wrap care">
    ${a.careImage?`<img sizes="${B.wide}" src="${e(C(o,a.careImage))}" alt="" width="1000" height="1200" loading="lazy">`:""}
    <div>
      <p class="kicker">${e(t.care.kicker)}</p>
      <h2 id="care-title" class="h2">${e(t.care.title)}</h2>
      <ol class="care-list">${r.map(s=>{var c;return`<li>${m((c=s.icon)!=null?c:"drop",22)}<div><b>${e(n(s.title))}</b><p>${e(n(s.text))}</p></div></li>`}).join("")}</ol>
    </div>
  </div>
</section>`:""}function Ke({site:a,L:t}){var o;let n=((o=a.perks)!=null?o:[]).filter(r=>t(r==null?void 0:r.title));return n.length?`<section class="perks" aria-label="${e(a.name)}"><ul class="wrap perk-list">${n.map(r=>{var i;return`<li>${m((i=r.icon)!=null?i:"check",22)}<div><b>${e(t(r.title))}</b>${t(r.text)?`<span>${e(t(r.text))}</span>`:""}</div></li>`}).join("")}</ul></section>`:""}function Je({site:a,t,L:n,lang:o}){let r=pe(a,t,o,"btn btn--line"),i=ue(a);return a.showReviews===!1||!i.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${ge(i,o,"reviews",s=>`<figure class="review">
      <p class="stars" aria-label="${e(s.rating)}/5">${Array.from({length:5},(c,l)=>`<span class="${l<s.rating?"on":""}">${m("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(s.text))}</blockquote>
      <figcaption>${e(s.name)}${n(s.bought)?`<small>${e(n(s.bought))}</small>`:""}${me(s,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ze({site:a,t,L:n}){var r;let o=((r=a.faq)!=null?r:[]).filter(i=>n(i==null?void 0:i.q));return o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${o.map((i,s)=>`<details${s===0?" open":""}><summary>${e(n(i.q))}</summary><p>${e(n(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ye({site:a,t,L:n,channels:o}){var c,l,h;let r=(c=a.contact)!=null?c:{},i=encodeURIComponent((l=r.mapQuery)!=null?l:n(r.address)),s=g=>g.length===7?t.visit.everyDay:re(g,t.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${de(a,t)}
      ${((h=a.hours)!=null?h:[]).length?`<table class="hours"><tbody>${a.hours.map(g=>`<tr><th scope="row">${e(s(g.days))}</th><td>${e(g.open)} \u2013 ${e(g.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${m("pin",18)} ${e(n(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(t.visit.directions)} ${m("arrow",16)}</a>
        ${o.map(g=>{var u;return`<a class="btn btn--line" href="${e(Q(g,r))}" ${le(g)}>${m(g,18)} ${e((u=t.via[g])!=null?u:g)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Xe(a,t){var M,P,D,j,N;let{site:n,t:o,L:r,url:i,money:s,market:c,items:l,col:h}=a,g=h(t),u=((M=t.pairs)!=null?M:[]).map(p=>l.find(b=>b.id===p)).filter(Boolean),y=[...u,...l.filter(p=>p.id!==t.id&&!u.includes(p)&&p.category===t.category),...l.filter(p=>p.id!==t.id&&!u.includes(p)&&p.category!==t.category&&(p.for===t.for||p.for==="all"))].filter((p,b,z)=>z.indexOf(p)===b).slice(0,8),$=i(`${c.id}/`),d=p=>typeof p=="object"?r(p):String(p),f=t.variants.map(p=>({s:Z(p),price:p.price})).filter(p=>p.s),k=(P=t.variants.find(p=>{var b;return!((b=t.soldOut)!=null&&b.includes(Z(p)))}))!=null?P:t.variants[0],w=t.for!=="all",x=(D=t.specs)!=null?D:[];return`<div class="wrap crumbs"><a href="${$}">${e(o.nav.home)}</a>${m("chevron",14)}<a href="${$}?type=${e(t.category)}#shop">${e(r(g==null?void 0:g.name))}</a>${m("chevron",14)}<span aria-current="page">${e(r(t.name))}</span></div>
<section class="wrap pdp-grid">
  ${Qe(a,t)}
  <div class="pdp" data-product data-id="${e(t.id)}" data-name="${e(r(t.name))}" data-price="${k.price}" data-img="${e(C(i,t.image))}" data-href="${e(i(a.productPath(t,c)))}" data-tyre="${w?1:0}">
    <p class="kicker">${e(r(g==null?void 0:g.name))}${t.category==="suv"?` \xB7 ${e(o.for[t.for])}`:""}</p>
    <h1 class="pdp-title">${e(r(t.name))}</h1>
    <p class="pdp-price"><strong data-price-now>${e(s(k.price))}</strong> <small>${e(w?o.product.each:o.product.eachRim)}</small>${t.was?` <s>${e(s(t.was))}</s> <span class="tag tag--sale tag--inline">-${Math.round((1-t.from/t.was)*100)}%</span>`:""}</p>
    <p class="lead">${e(r(t.description))}</p>
    ${(j=t.colors)!=null&&j.length?`<fieldset class="opts"><legend>${e(o.product.color)}: <span data-v="color">${e(r(t.colors[0].name))}</span></legend><div class="swatches">
      ${t.colors.map((p,b)=>`<label class="sw" title="${e(r(p.name))}"><input type="radio" name="color" value="${e(r(p.name))}"${b?"":" checked"}><span style="background:${e(p.hex)}"></span><b class="sr">${e(r(p.name))}</b></label>`).join("")}
    </div></fieldset>`:""}
    ${f.length?`<fieldset class="opts" data-size-field><legend>${e(w?o.product.size:o.product.rimSize)}: <span data-v="size">\u2014</span></legend><div class="sizes">
      ${f.map(({s:p,price:b})=>{var q;let z=(q=t.soldOut)==null?void 0:q.includes(p);return`<label class="sz${z?" is-out":""}"><input type="radio" name="size" value="${e(p)}" data-label="${e(p)}" data-price="${b}" data-money="${e(s(b))}"${z?" disabled":""}${f.length===1&&!z?" checked":""}><span>${e(p)}<small>${e(s(b))}</small></span>${z?`<b class="sr">${e(o.soldOut)}</b>`:""}</label>`}).join("")}
    </div>
    <p class="size-msg" data-size-msg hidden>${e(o.product.pickSize)}</p>
    <p class="mine-msg" data-mine-msg data-tpl="${e(o.size.picked)}" data-miss="${e(o.size.miss)}" hidden></p>
    ${w?`<p class="muted small">${m("search",14)} ${e(o.product.sizeHelp)} <a href="${$}#size">${e(o.nav.size)}</a></p>`:""}
    </fieldset>`:""}
    <div class="buyrow">
      <div class="qty" data-qty><button type="button" data-d="-1" aria-label="\u2212">${m("minus",16)}</button><input type="number" name="qty" min="1" max="20" value="${w&&t.for!=="moto"?4:t.for==="moto"?1:4}" inputmode="numeric" aria-label="${e(o.product.qty)}"><button type="button" data-d="1" aria-label="+">${m("plus",16)}</button></div>
      <button type="button" class="btn btn--accent btn--lg" data-add>${m("bag",18)} ${e(o.product.add)}</button>
    </div>
    <p class="added" data-added hidden>${m("check",16)} ${e(o.product.added)} <button type="button" class="link" data-bag-open>${e(o.product.viewBag)}</button></p>
    ${((N=n.promises)!=null?N:[]).length?`<ul class="promises">${n.promises.map(p=>{var b;return`<li>${m((b=p.icon)!=null?b:"check",18)} ${e(r(p.text))}</li>`}).join("")}</ul>`:""}
    ${x.length?`<div class="specs"><h2 class="h4">${e(o.product.specs)}</h2><table><tbody>${x.map(([p,b])=>{var z;return`<tr><th scope="row">${e((z=o.specs[p])!=null?z:p)}</th><td>${e(d(b))}</td></tr>`}).join("")}</tbody></table></div>`:""}
    ${fe(c.lang)}
  </div>
</section>
${y.length?`<section class="section section--soft"><div class="wrap"><h2 class="h3">${e(u.length?o.product.pairs:o.product.related)}</h2><ul class="grid grid--related">${y.map(p=>Me(a,p)).join("")}</ul></div></section>`:""}`}function Qe({t:a,L:t,url:n},o){var c;let r=[o.image,...(c=o.images)!=null?c:[]],i=a.gallery,s=t(o.name);return`<div class="pdp-gallery" data-gallery>
  <ul class="g-track" tabindex="0" aria-label="${e(i.label)}">${r.map((l,h)=>`<li><a href="${e(C(n,l))}" data-zoom="${h}" aria-label="${e(i.zoom)}: ${e(i.photo.replace("{i}",h+1).replace("{n}",r.length))}"><img sizes="${B.wide}" src="${e(C(n,l))}" alt="${e(h?`${s} \u2013 ${i.photo.replace("{i}",h+1).replace("{n}",r.length)}`:s)}" width="1000" height="1250"${h?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
  ${r.length>1?`<p class="g-dots" aria-hidden="true">${r.map((l,h)=>`<i${h?"":' class="on"'}></i>`).join("")}</p>`:""}
  <dialog class="lightbox" data-lightbox aria-label="${e(s)}">
    <img src="" alt="${e(s)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(i.close)}">\u2715</button>
    ${r.length>1?`<button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(i.prev)}">${m("chevron",26)}</button><button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(i.next)}">${m("chevron",26)}</button>`:""}
  </dialog>
</div>`}function et({site:a,t,L:n,channels:o,money:r,ship:i,market:s},c){var $,d,f,k,w;let l=t.bag,h=($=a.contact)!=null?$:{},g=t.orderText.replace(/\{\w+\}/g,"\u2026"),u=x=>o.map((M,P)=>{var D;return`<button type="submit" class="btn ${x!=null?x:P?"btn--line":"btn--accent"} btn--full" data-channel="${e(M)}" data-href="${e(Q(M,h,g))}">${m(M,18)} ${e(M==="phone"?l.call:l.send.replace("{channel}",(D=t.via[M])!=null?D:M))}</button>`}).join(""),y=((f=(d=a.fitting)==null?void 0:d.slots)!=null?f:[]).filter(x=>/^\d{1,2}:\d{2}$/.test(x));return`<dialog class="bag" data-bag aria-labelledby="bag-title" data-fee="${i.fee}" data-free="${(k=i.free)!=null?k:""}" data-free-tpl="${e(l.freeLeft)}" data-free-ok="${e(l.freeOk)}">
  <form class="bag-in" data-checkout novalidate${c} data-text="${e(t.orderText)}" data-market="${e(`${s.id.toUpperCase()} \xB7 ${s.currency}`)}">
    <header class="bag-head"><h2 id="bag-title" class="h3">${m("bag",22)} ${e(l.title)}</h2><button type="button" class="bag-x" data-bag-close aria-label="${e(t.gallery.close)}">\u2715</button></header>
    <p class="bag-empty muted" data-bag-empty>${e(l.empty)}</p>
    <ul class="bag-list" data-bag-list data-remove="${e(l.remove)}"></ul>
    <div class="bag-body" data-bag-body hidden>
      <p class="freebar" data-freebar hidden><span data-freebar-text></span><i><b data-freebar-fill></b></i></p>
      <dl class="sum">
        <div><dt>${e(l.subtotal)}</dt><dd data-s-sub>\u2014</dd></div>
        <div><dt>${e(l.shipping)}</dt><dd data-s-ship data-free-label="${e(l.free)}">\u2014</dd></div>
        <div class="sum-total"><dt>${e(l.total)}</dt><dd data-s-total>\u2014</dd></div>
      </dl>
      <div class="order-fields">
        <div class="intents" role="radiogroup" aria-label="${e(l.how)}">${l.intents.map((x,M)=>`<label class="intent"><input type="radio" name="intent" value="${e(x)}"${M?"":" checked"}><span>${e(x)}</span></label>`).join("")}</div>
        <label class="field"><span>${e(l.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(l.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        <div class="row2" data-fit-fields>
          <label class="field"><span>${e(l.day)}</span><input name="day" type="date" data-day></label>
          <label class="field"><span>${e(l.time)}</span>${y.length?`<select name="time">${y.map(x=>`<option>${e(x)}</option>`).join("")}</select>`:'<input name="time" type="time">'}</label>
        </div>
        ${n((w=a.fitting)==null?void 0:w.note)?`<p class="muted small" data-fit-fields>${m("wrench",14)} ${e(n(a.fitting.note))}</p>`:""}
        <label class="field" data-ship-fields hidden><span>${e(l.address)} *</span><input name="address" autocomplete="street-address" maxlength="200"></label>
        <label class="field"><span>${e(l.car)}</span><input name="car" maxlength="80" placeholder="${e(l.carHint)}"></label>
        <label class="field"><span>${e(l.note)}</span><input name="note" maxlength="300" placeholder="${e(l.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(l.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-submit>${m("check",18)} ${e(l.submit)}</button>
        <p class="muted small">${e(n(a.returns)||l.reply)}</p>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m("check",22)} ${e(l.doneTitle)}</p>
        <p>${e(l.doneText)}</p>
        <div class="buy">${u()}</div>
        <button type="button" class="link back" data-edit>${e(l.edit)}</button>
      </div>
      <p class="form-msg" role="status" hidden></p>
    </div>
  </form>
</dialog>`}function tt({site:a,t,L:n,market:o}){var s,c;let r=(s=a.contact)!=null?s:{},i=Object.entries((c=a.social)!=null?c:{}).filter(([,l])=>l);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${E(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([l,h])=>`<li><a href="${e(h)}" target="_blank" rel="noopener">${e(l==="tiktok"?"TikTok":l==="youtube"?"YouTube":l[0].toUpperCase()+l.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${be(a,t,o.lang)}</div>
</footer>`}function at({site:a,market:t,L:n,abs:o,items:r}){var s,c,l;let i=(s=a.contact)!=null?s:{};return{"@context":"https://schema.org","@type":"TireShop",name:a.name,url:o(`${t.id}/`),image:o(A(a.heroImage||((c=r[0])==null?void 0:c.image))),description:n(a.intro),telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:n(i.address)},currenciesAccepted:t.currency,openingHoursSpecification:se((l=a.hours)!=null?l:[])}}var nt=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});function ot({site:a,market:t,L:n,abs:o,productPath:r,col:i},s){var c,l,h,g;return{"@context":"https://schema.org","@type":"Product",name:n(s.name),description:n(s.description),image:[s.image,...(c=s.images)!=null?c:[]].map(u=>o(A(u))),url:o(r(s,t)),category:n((l=i(s))==null?void 0:l.name),...(h=s.colors)!=null&&h.length?{color:s.colors.map(u=>n(u.name)).join(", ")}:{},...(g=s.sizes)!=null&&g.length?{size:s.sizes.join(", ")}:{},offers:{"@type":"Offer",price:s.variants[0].price,priceCurrency:t.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:a.name}}}}function rt({market:a,L:t,abs:n,productPath:o,t:r,col:i},s){var c;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:n(`${a.id}/`)},{"@type":"ListItem",position:2,name:t((c=i(s))==null?void 0:c.name),item:n(`${a.id}/?type=${s.category}`)},{"@type":"ListItem",position:3,name:t(s.name),item:n(o(s,a))}]}}export{vt as renderSite};
