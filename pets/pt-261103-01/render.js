var pe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>pe[t]);function F(a,t,n="vi"){var o,r,i;return a==null?"":typeof a!="object"?String(a):(i=(r=(o=a[t])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?i:""}var de={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},O=a=>{var t;return(t=de[a])!=null?t:"en-US"};function he(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function G(a,t){var o,r;if(t.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:he(a.basePrice*t.rate,t.rounding)}var ue=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function W(a,t){let n={style:"currency",currency:t.currency};return ue.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(O(t.lang),n).format(a)}function _(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var q=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,M=(a,t)=>{let n=q(t);return n==null?t:a(n)},T=(a="")=>String(a).replace(/\D/g,"");function j(a,t,n=""){switch(a){case"phone":return`tel:${T(t.phone)}`;case"zalo":return`https://zalo.me/${T(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${T(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var H=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,me=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function K(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,i]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let l=i.trim().replace(/^\{|\}$/g,"").toLowerCase();me.includes(l)&&(o[l]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var C={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ge={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},g=(a,t=20,n="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=ge[a])!=null?o:""}</svg>`},R=[1,2,3,4,5,6,0],fe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Z(a,t){let n=a.map(r=>R.indexOf(r)).sort((r,i)=>r-i);return n.every((r,i)=>i===0||r===n[i-1]+1)&&n.length>2?`${t[R[n[0]]]} \u2013 ${t[R[n.at(-1)]]}`:n.map(r=>t[R[r]]).join(", ")}var Y=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>fe[n]),opens:t.open,closes:t.close}));function X(a){var n,o;return(o=(n=new Intl.NumberFormat(O(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var B=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',Q=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,ee=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},J={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},be=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ve=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&be.test(n.hostname)?n.href:""}catch{return""}},te=(a,t,n,o="btn btn--line")=>{var l;let r=ve(a);if(!r)return"";let i=typeof t.reviews=="object"&&((l=t.reviews)==null?void 0:l.google)||J[n]||J.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${g("star",16)} ${e(i)}</a></p>`},E={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ae={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ne=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function oe(a,t){var i,l,s;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((s=ae[t])!=null?s:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function ye(a,t){var l,s;let n=a.filter(p=>p.rating>=1&&p.rating<=5);if(n.length<2)return"";let o=n.reduce((p,h)=>p+Number(h.rating),0)/n.length,r=(l=E[t])!=null?l:E.en,i=new Intl.NumberFormat((s=ae[t])!=null?s:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${g("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function re(a,t,n,o){var l;if(!a.length)return"";let r=(l=E[t])!=null?l:E.en,i=s=>`<button type="button" class="rv-btn" data-rv-${s} aria-label="${e(s==="prev"?r.prev:r.next)}">${g("arrow",18,s==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ye(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${$e}`}var $e=`<style>
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
upd()}})()<\/script>`;var se=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function ie({site:a,markets:t,url:n,abs:o}){var l;let r=(l=t.find(s=>s.default))!=null?l:t[0],i=t.map(s=>({id:s.id,lang:s.lang,country:s.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${t.map(s=>`<link rel="alternate" hreflang="${e(s.lang)}-${e(s.country)}" href="${o(`${s.id}/`)}">`).join(`
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
`}var ke="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",le=8,ce=["dog","cat"];function xe(a,t){var n;return((n=a.products)!=null?n:[]).map(o=>{var r,i;return{...o,kind:o.category==="cat"?"cat":"dog",price:G((i=((r=o.variants)!=null?r:[])[0])!=null?i:{},t),pets:Math.max(1,+o.pets||2)}}).filter(o=>o.price!=null)}var A=a=>String(a!=null?a:"").split(`
`).map(t=>t.trim()).filter(Boolean);function Je({site:a,catalog:t,i18n:n,template:o,basePath:r="/",siteUrl:i=a.domain}){var y,f,v,u,x;let l=_(r),s=$=>new URL(l($),i).href,p=t.markets,h=K(a.orderForm),c=h&&!h.error?h:null,b=[];for(let $ of p){let w=$.lang,P=(f=(y=n[w])!=null?y:n.en)!=null?f:n.vi,k=d=>F(d,w,"en"),D=xe(t,$),S=(u=(v=a.orderChannels)==null?void 0:v[$.id])!=null?u:["phone"],z=d=>W(d,$),N=((x=a.addons)!=null?x:[]).filter(d=>k(d==null?void 0:d.name)).map(d=>({...d,price:G(d,$)})).filter(d=>d.price!=null),m={site:a,catalog:t,market:$,markets:p,lang:w,t:P,L:k,url:l,abs:s,channels:S,money:z,items:D,template:o,gform:c,addons:N};b.push({path:`${$.id}/index.html`,html:we(m)})}return b.push({path:"index.html",html:ie({site:a,markets:p,url:l,abs:s})}),b}function we(a){var $,w,P,k,D,S,z,N,m;let{site:t,market:n,markets:o,lang:r,t:i,L:l,url:s,abs:p,channels:h}=a,c=`${t.name} \xB7 ${l(t.tagline)}`,b=($=t.theme)!=null?$:{},y=["primary","ink","bg","surface","soft","accent"].filter(d=>b[d]).map(d=>`--${d}:${b[d]}`).join(";"),f=(w=o.find(d=>d.default))!=null?w:o[0],v=o.map(d=>({id:d.id,lang:d.lang,country:d.country,currency:d.currency,href:s(`${d.id}/`)})),u=(P=t.contact)!=null?P:{},x=t.heroImage;return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(c)}</title>
<meta name="description" content="${e(l(t.intro))}">
<link rel="canonical" href="${p(`${n.id}/`)}">
${o.map(d=>`<link rel="alternate" hreflang="${e(d.lang)}-${e(d.country)}" href="${p(`${d.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${f.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(c)}">
<meta property="og:description" content="${e(l(t.intro))}">
<meta property="og:url" content="${p(`${n.id}/`)}">
${x?`<meta property="og:image" content="${e(p(q(x)))}">`:""}
<meta property="og:site_name" content="${e(t.name)}">
<meta name="theme-color" content="${e((k=b.primary)!=null?k:"#1F5560")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ke}">
<link rel="stylesheet" href="${s("assets/style.css")}">
<style>:root{${y}}</style>
${H(Re(a))}${((D=t.faq)!=null?D:[]).length?H(Ee(a)):""}
<script src="${s("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(v))}' data-copied="${e(i.copied)}" data-wa="${e(T((S=u.whatsapp)!=null?S:""))}" data-email="${e((z=u.email)!=null?z:"")}" data-tz="${e((N=t.timezone)!=null?N:"Asia/Ho_Chi_Minh")}" data-currency="${e(n.currency)}" data-lang="${e(r)}">
<a class="skip" href="#main">${e(i.skip)}</a>
${Q(i)}
${l(t.announcement)?`<p class="announce">${e(l(t.announcement))}</p>`:""}
${Me(a)}
<main id="main">
${[De,Se,ze,Ne,Pe,Te,je,Ce,Le].map(d=>d(a)).join(`
`)}
</main>
${qe(a)}
<nav class="dock" aria-label="${e(i.nav.book)}">
  <a href="${e(j(h[0],u))}" ${B(h[0])}>${g(h[0],20)}<span>${e((m=i.via[h[0]])!=null?m:h[0])}</span></a>
  <a class="primary" href="#book">${g("calendar",20)}<span>${e(i.nav.book)}</span></a>
</nav>
</body>
</html>
`}function Me({site:a,market:t,markets:n,t:o,url:r}){let i=[["#rooms",o.nav.rooms],["#day",o.nav.day],["#ready",o.nav.ready],["#hotel",o.nav.hotel],["#visit",o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(M(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${g("paw",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([l,s])=>`<a href="${l}">${e(s)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${g("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(X(t))}</span></span></summary>
        <ul>${n.map(l=>`<li><a href="${r(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===t.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#book">${e(o.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${g("menu",22)}</summary>
        <nav aria-label="Menu">${i.map(([l,s])=>`<a href="${l}">${e(s)}</a>`).join("")}<a href="#book">${e(o.nav.book)}</a></nav>
      </details>
    </div>
  </div>
</header>`}function De(a){var p;let{site:t,t:n,L:o,url:r}=a,i=t.heroImage,l=[["#rooms",n.ch.rooms],["#day",n.ch.day],["#ready",n.ch.ready],["#hotel",n.ch.hotel],["#book",n.ch.book]],s=(p=t.checkin)!=null?p:{};return`<section class="hero">
  ${i?`<img class="hero-img" src="${e(M(r,i))}" alt="" width="1600" height="1000" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${o(t.heroKicker)?`<p class="kicker">${e(o(t.heroKicker))}</p>`:""}
    <h1>${e(o(t.tagline))}</h1>
    <p class="lead">${e(o(t.intro))}</p>
    <div class="actions"><a class="btn btn--accent btn--lg" href="#book">${e(n.hero.book)} ${g("arrow",18)}</a><a class="btn btn--ghost btn--lg" href="#rooms">${e(n.hero.rooms)}</a></div>
    ${o(s.in)||o(s.out)?`<p class="next-in">${o(s.in)?`<span class="next-k">${e(n.hero.in)}</span><b>${e(o(s.in))}</b>`:""}${o(s.out)?`<span class="next-k">${e(n.hero.out)}</span><b>${e(o(s.out))}</b>`:""}</p>`:""}
  </div>
  <ol class="wrap toc">${l.map(([h,c],b)=>`<li><a href="${h}"><span>${String(b+1).padStart(2,"0")}</span>${e(c)}</a></li>`).join("")}</ol>
</section>`}var V=(a,{id:t,n,kicker:o,title:r,text:i,image:l,body:s,flip:p,extra:h=""})=>`<section class="chapter${p?" chapter--flip":""}${h}" id="${t}" aria-labelledby="${t}-title">
  ${l?`<figure class="ch-pic"><img sizes="${C.wide}" src="${e(M(a.url,l))}" alt="" width="1000" height="1250" loading="lazy"></figure>`:""}
  <div class="ch-body">
    <p class="ch-n"><span class="num">${String(n).padStart(2,"0")}</span> <span>${e(o)}</span></p>
    <h2 id="${t}-title" class="h2">${e(r)}</h2>
    ${i?`<p class="lead">${e(i)}</p>`:""}
    ${s}
  </div>
</section>`;function Se(a){var y,f,v;let{site:t,t:n,L:o,url:r,items:i,money:l}=a;if(!i.length)return"";let s=n.rooms,p=ce.filter(u=>i.some(x=>x.kind===u)),h=i.some(u=>u.kind==="dog"&&+u.maxKg>0),c=[t.sharePct?s.share.replace("{n}",t.sharePct):"",(y=t.longStay)!=null&&y.nights&&((f=t.longStay)!=null&&f.pct)?s.long.replace("{n}",t.longStay.nights).replace("{p}",t.longStay.pct):""].filter(Boolean),b=`${p.length>1?`<div class="chips" role="group" aria-label="${e(s.filter)}" data-kinds hidden><button type="button" class="chip is-on" data-kind="">${e(s.all)}</button>${p.map(u=>`<button type="button" class="chip" data-kind="${u}">${g("paw",14)} ${e(s[u])}</button>`).join("")}</div>`:""}
    ${h?`<div class="finder" data-finder hidden><label for="kg">${g("scale",20)} ${e(s.finder)}</label><input id="kg" type="number" min="0.5" max="90" step="0.5" inputmode="decimal" placeholder="kg" data-kg><p class="finder-out" data-finder-out data-fit="${e(s.fitText)}" data-none="${e(s.noneText)}"></p></div>`:""}
    <ul class="classes">${i.map(u=>`<li class="cls" data-room="${e(u.id)}" data-k="${u.kind}"${+u.maxKg>0?` data-max="${+u.maxKg}"`:""}>
      ${u.image?`<img sizes="${C.thumb}" src="${e(M(r,u.image))}" alt="" width="480" height="360" loading="lazy">`:""}
      <div class="cls-body">
        <p class="cls-top"><span class="age">${g("paw",13)} ${e(s[u.kind])}${+u.maxKg>0?` \xB7 ${e(s.upTo.replace("{n}",u.maxKg))}`:""}</span>${o(u.badge)?`<span class="tag">${e(o(u.badge))}</span>`:""}<span class="fit">${g("check",13)} ${e(s.fits)}</span></p>
        <h3>${e(o(u.name))}</h3>
        <p class="muted">${e(o(u.description))}</p>
        <ul class="facts">${o(u.area)?`<li>${g("ruler",14)} ${e(o(u.area))}</li>`:""}<li>${g("users",14)} ${e(s.pets.replace("{n}",u.pets))}</li></ul>
        ${A(o(u.feats)).length?`<ul class="incl">${A(o(u.feats)).map(x=>`<li>${g("check",14)} ${e(x)}</li>`).join("")}</ul>`:""}
        <dl class="vars"><div><dt>${e(s.night)}</dt><dd>${e(l(u.price))}</dd></div></dl>
        <a class="link" href="#book" data-pick="${e(u.id)}">${e(s.pick)} \u2192</a>
      </div>
    </li>`).join("")}</ul>
    ${c.length?`<p class="trial">${g("heart",18)} <span>${e(c.join(" \xB7 "))}</span></p>`:""}`;return V(a,{id:"rooms",n:1,kicker:n.ch.rooms,title:s.title,text:o(t.roomsText)||s.text,image:(v=t.chapters)==null?void 0:v.rooms,body:b})}function ze(a){var s,p;let{site:t,t:n,L:o}=a,r=((s=t.day)!=null?s:[]).filter(h=>o(h==null?void 0:h.title)),i=A(o(t.bring));if(!r.length&&!i.length)return"";let l=`${r.length?`<ol class="timeline">${r.map(h=>{var c;return`<li><span class="dot dot--time">${e((c=h.time)!=null?c:"")}</span><div><b>${e(o(h.title))}</b>${o(h.text)?`<p>${e(o(h.text))}</p>`:""}</div></li>`}).join("")}</ol>`:""}
    ${i.length?`<div class="docs"><p class="mini">${g("bag",16)} ${e(n.day.bring)}</p><ul>${i.map(h=>`<li>${g("check",15)} ${e(h)}</li>`).join("")}</ul></div>`:""}`;return V(a,{id:"day",n:2,kicker:n.ch.day,title:n.day.title,text:o(t.dayText)||n.day.text,image:(p=t.chapters)==null?void 0:p.day,body:l,flip:!0})}function Ne(a){var s,p;let{site:t,t:n,L:o}=a,r=((s=t.checks)!=null?s:[]).filter(h=>o(h==null?void 0:h.text));if(!r.length)return"";let i=n.ready,l=`<div class="docs docs--check" data-checks>
      <ul>${r.map((h,c)=>`<li><label class="check"><input type="checkbox" data-must="${h.must?1:0}" id="chk-${c}"> <span>${e(o(h.text))}${h.must?` <em class="must">${e(i.must)}</em>`:""}</span></label></li>`).join("")}</ul>
      <p class="ready-out" data-ready-out data-ok="${e(i.ok)}" data-left="${e(i.left)}" aria-live="polite" hidden></p>
    </div>
    ${o(t.checksNote)?`<p class="small muted">${g("syringe",14)} ${e(o(t.checksNote))}</p>`:""}`;return V(a,{id:"ready",n:3,kicker:n.ch.ready,title:i.title,text:o(t.readyText)||i.text,image:(p=t.chapters)==null?void 0:p.ready,body:l})}function Pe(a){var c,b,y;let{site:t,t:n,L:o,url:r}=a,i=((c=t.facts)!=null?c:[]).filter(f=>o(f==null?void 0:f.label)&&o(f==null?void 0:f.value)),l=A(o(t.rules)),s=((b=t.album)!=null?b:[]).filter(f=>f==null?void 0:f.image);if(!i.length&&!l.length&&!s.length)return"";let p=n.hotel,h=`${i.length?`<ul class="pool">${i.map(f=>{var v;return`<li>${g((v=f.icon)!=null?v:"paw",22)}<b>${e(o(f.value))}</b><span>${e(o(f.label))}</span></li>`}).join("")}</ul>`:""}
    ${l.length?`<div class="docs docs--safe"><p class="mini">${g("shield",16)} ${e(p.rules)}</p><ul>${l.map(f=>`<li>${g("check",15)} ${e(f)}</li>`).join("")}</ul></div>`:""}
    ${s.length?`<ul class="album" data-album>${s.map((f,v)=>`<li${v>=le?' class="is-more"':""}><a href="${e(M(r,f.image))}" data-zoom="${v}" aria-label="${e(p.zoom)} ${v+1}"><img sizes="${C.card}" src="${e(M(r,f.image))}" alt="" width="600" height="600" loading="lazy"></a></li>`).join("")}</ul>
    ${s.length>le?`<div class="more"><button type="button" class="btn btn--line" data-album-more hidden>${e(p.more)}</button></div>`:""}
    <dialog class="lightbox" data-lightbox aria-label="${e(p.title)}">
      <img src="" alt="" data-lb-img>
      <button type="button" class="lb-close" data-lb-close aria-label="${e(p.close)}">\u2715</button>
      <button type="button" class="lb-nav lb-prev" data-lb-step="-1" aria-label="${e(p.prev)}">${g("chevron",26)}</button>
      <button type="button" class="lb-nav lb-next" data-lb-step="1" aria-label="${e(p.next)}">${g("chevron",26)}</button>
    </dialog>`:""}`;return V(a,{id:"hotel",n:4,kicker:n.ch.hotel,title:p.title,text:o(t.hotelText)||p.text,image:(y=t.chapters)==null?void 0:y.hotel,body:h,flip:!0})}function Te(a){var D,S,z,N;let{site:t,items:n,t:o,L:r,money:i,channels:l,gform:s,market:p,addons:h}=a;if(!n.length)return"";let c=o.book,b=n.map(m=>({id:m.id,n:r(m.name),p:m.price,max:m.pets})),y=h.map(m=>({id:m.id,n:r(m.name),p:m.price,per:["night","booking"].includes(m.per)?m.per:"pet"})),f={share:+t.sharePct||0,nights:+((D=t.longStay)==null?void 0:D.nights)||0,pct:+((S=t.longStay)==null?void 0:S.pct)||0},v=o.orderText.replace(/\{\w+\}/g,"\u2026"),u=s?` data-gform="${e(s.action)}" data-gmap='${e(JSON.stringify(s.fields))}'`:"",x=m=>l.map((d,L)=>{var I,U;return`<button type="submit" class="btn ${m!=null?m:L?"btn--line":"btn--accent"} btn--lg" data-channel="${e(d)}" data-href="${e(j(d,(I=t.contact)!=null?I:{},v))}">${g(d,18)} ${e(d==="phone"?c.call:c.send.replace("{channel}",(U=o.via[d])!=null?U:d))}</button>`}).join(""),$={night:c.perNight,pet:c.perPet,booking:""},w=m=>n.filter(d=>d.kind===m),P=ce.filter(m=>w(m).length).map(m=>`<optgroup label="${e(o.rooms[m])}">${w(m).map(d=>`<option value="${e(d.id)}"${d===n[0]?" selected":""}>${e(r(d.name))} \xB7 ${e(i(d.price))}</option>`).join("")}</optgroup>`).join(""),k=(z=t.checkin)!=null?z:{};return`<section class="chapter chapter--book" id="book" aria-labelledby="book-title">
  ${(N=t.chapters)!=null&&N.book?`<figure class="ch-pic"><img sizes="${C.wide}" src="${e(M(a.url,t.chapters.book))}" alt="" width="1000" height="1250" loading="lazy"></figure>`:""}
  <div class="ch-body">
    <p class="ch-n"><span class="num">05</span> <span>${e(o.ch.book)}</span></p>
    <h2 id="book-title" class="h2">${e(c.title)}</h2>
    <p class="lead">${e(r(t.bookText)||c.text)}</p>
    <form class="order" data-book-form${u} data-rooms='${e(JSON.stringify(b))}' data-adds='${e(JSON.stringify(y))}' data-deal='${e(JSON.stringify(f))}' data-text="${e(o.orderText)}" data-market="${e(`${p.id.toUpperCase()} \xB7 ${p.currency}`)}" novalidate>
      <div class="order-fields">
        <div class="fields">
          <label class="wide"><span>${e(c.room)} *</span><select name="room" data-room-sel>${P}</select></label>
          <label><span>${e(c.in)} *</span><input name="in" type="date" required data-in></label>
          <label><span>${e(c.out)} *</span><input name="out" type="date" required data-out></label>
        </div>
        <p class="small muted" data-nights data-one="${e(c.night1)}" data-many="${e(c.nights)}">${r(k.in)?`${e(o.hero.in)} ${e(r(k.in))}`:""}${r(k.in)&&r(k.out)?" \xB7 ":""}${r(k.out)?`${e(o.hero.out)} ${e(r(k.out))}`:""}</p>
        <div class="fields">
          <label><span>${e(c.pets)}</span><span class="stepper"><button type="button" data-step="-1" aria-label="\u2212">${g("minus",16)}</button><input name="pets" type="number" min="1" max="${Math.max(...n.map(m=>m.pets))}" value="1" inputmode="numeric" data-n="pets"><button type="button" data-step="1" aria-label="+">${g("plus",16)}</button></span></label>
          <label><span>${e(c.pet)} *</span><input name="pet" required maxlength="120" placeholder="${e(c.petHint)}"></label>
        </div>
        <p class="warn small" data-warn data-max="${e(c.max)}" data-date-msg="${e(c.dateErr)}" hidden></p>
        ${y.length?`<fieldset class="opts"><legend>${e(c.addons)}</legend><div class="adds">${h.map((m,d)=>`<label class="check"><input type="checkbox" name="add" value="${e(m.id)}"> <span>${e(r(m.name))}</span> <b>${e(i(m.price))}${$[y[d].per]?` ${e($[y[d].per])}`:""}</b></label>`).join("")}</div></fieldset>`:""}
        <div class="fields">
          <label><span>${e(c.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label><span>${e(c.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          <label class="wide"><span>${e(c.note)}</span><input name="note" maxlength="300" placeholder="${e(c.noteHint)}"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <div class="quote" aria-live="polite">
          <dl data-break data-room-l="${e(c.roomL)}" data-share-l="${e(c.shareL)}" data-long-l="${e(c.longL)}"></dl>
          <p class="sum"><span>${e(c.total)}</span><b data-total>${e(i(n[0].price))}</b></p>
          <small>${e(r(t.quoteNote)||c.quoteNote)}</small>
        </div>
        <p class="form-err" data-err hidden>${e(c.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--accent btn--lg btn--full" data-order-submit>${g("check",18)} <span>${e(c.submit)}</span></button></div>
        <noscript><p>${l.map(m=>{var d,L;return`<a href="${e(j(m,(d=t.contact)!=null?d:{},v))}" ${B(m)}>${e((L=o.via[m])!=null?L:m)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${s?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${g(s?"check":"arrow",22)} ${e(s?c.done:c.stepTitle)}</p>
        <p>${e(s?c.doneText:c.stepText)}</p>
        <div class="buy">${x(s?"btn--line":void 0)}</div>
        ${s?"":`<button type="button" class="link back" data-edit>${e(c.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function je({site:a,t,L:n,lang:o}){let r=te(a,t,o,"btn btn--line"),i=ne(a);return a.showReviews===!1||!i.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${re(i,o,"reviews",l=>`<figure class="review">
      <p class="stars" aria-label="${e(l.rating)}/5">${Array.from({length:5},(s,p)=>`<span class="${p<l.rating?"on":""}">${g("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(l.text))}</blockquote>
      <figcaption>${e(l.name)}${n(l.bought)?`<small>${e(n(l.bought))}</small>`:""}${oe(l,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ce({site:a,t,L:n}){var r;let o=((r=a.faq)!=null?r:[]).filter(i=>n(i==null?void 0:i.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${o.map((i,l)=>`<details${l===0?" open":""}><summary>${e(n(i.q))}</summary><p>${e(n(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Le({site:a,t,L:n,channels:o}){var s,p,h;let r=(s=a.contact)!=null?s:{},i=encodeURIComponent((p=r.mapQuery)!=null?p:n(r.address)),l=c=>c.length===7?t.visit.everyDay:Z(c,t.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${ee(a,t)}
      ${((h=a.hours)!=null?h:[]).length?`<table class="hours"><tbody>${a.hours.map(c=>`<tr><th scope="row">${e(l(c.days))}</th><td>${e(c.open)} \u2013 ${e(c.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${g("pin",18)} ${e(n(r.address))}</p>`:""}
      ${n(a.parking)?`<p class="addr">${g("car",18)} ${e(n(a.parking))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(t.visit.directions)} ${g("arrow",16)}</a>
        ${o.map(c=>{var b;return`<a class="btn btn--line" href="${e(j(c,r))}" ${B(c)}>${g(c,18)} ${e((b=t.via[c])!=null?b:c)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function qe({site:a,t,L:n,market:o}){var l,s;let r=(l=a.contact)!=null?l:{},i=Object.entries((s=a.social)!=null?s:{}).filter(([,p])=>p);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${T(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([p,h])=>`<li><a href="${e(h)}" target="_blank" rel="noopener">${e(p==="tiktok"?"TikTok":p==="youtube"?"YouTube":p[0].toUpperCase()+p.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${se(a,t,o.lang)}</div>
</footer>`}function Re({site:a,market:t,L:n,abs:o,items:r}){var l,s;let i=(l=a.contact)!=null?l:{};return{"@context":"https://schema.org","@type":"LocalBusiness",name:a.name,url:o(`${t.id}/`),...a.heroImage?{image:o(q(a.heroImage))}:{},description:n(a.intro),telephone:i.phone,address:{"@type":"PostalAddress",streetAddress:n(i.address)},currenciesAccepted:t.currency,openingHoursSpecification:Y((s=a.hours)!=null?s:[]),makesOffer:r.map(p=>({"@type":"Offer",name:n(p.name),price:p.price,priceCurrency:t.currency}))}}var Ee=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});export{Je as renderSite};
