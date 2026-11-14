var ce={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>ce[a]);function O(t,a,n="vi"){var o,r,i;return t==null?"":typeof t!="object"?String(t):(i=(r=(o=t[a])!=null?o:t[n])!=null?r:Object.values(t)[0])!=null?i:""}var pe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},S=t=>{var a;return(a=pe[t])!=null?a:"en-US"};function de(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function H(t,a){var o,r;if(a.default)return t.basePrice;let n=(r=(o=t.prices)==null?void 0:o[a.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:de(t.basePrice*a.rate,a.rounding)}var he=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function W(t,a){let n={style:"currency",currency:a.currency};return he.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(S(a.lang),n).format(t)}function _(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var B=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,A=(t,a)=>{let n=B(a);return n==null?a:t(n)},q=(t="")=>String(t).replace(/\D/g,"");function G(t,a,n=""){switch(t){case"phone":return`tel:${q(a.phone)}`;case"zalo":return`https://zalo.me/${q(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${q(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var I=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,ue=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function K(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,i]of a.searchParams){if(!/^entry\.\d+$/.test(r))continue;let s=i.trim().replace(/^\{|\}$/g,"").toLowerCase();ue.includes(s)&&(o[s]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var me={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(t,a=20,n="")=>{var o;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=me[t])!=null?o:""}</svg>`},V=[1,2,3,4,5,6,0],ge=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Z(t,a){let n=t.map(r=>V.indexOf(r)).sort((r,i)=>r-i);return n.every((r,i)=>i===0||r===n[i-1]+1)&&n.length>2?`${a[V[n[0]]]} \u2013 ${a[V[n.at(-1)]]}`:n.map(r=>a[V[r]]).join(", ")}var Y=t=>t.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>ge[n]),opens:a.open,closes:a.close}));function X(t){var n,o;return(o=(n=new Intl.NumberFormat(S(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:t.currency}var Q=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',ee=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,te=(t,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},J={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},fe=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ve=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&fe.test(n.hostname)?n.href:""}catch{return""}},ae=(t,a,n,o="btn btn--line")=>{var s;let r=ve(t);if(!r)return"";let i=typeof a.reviews=="object"&&((s=a.reviews)==null?void 0:s.google)||J[n]||J.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${m("star",16)} ${e(i)}</a></p>`},F={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ne={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},oe=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function re(t,a){var i,s,l;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=t==null?void 0:t.date)!=null?i:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((s=n[3])!=null?s:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((l=ne[a])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(t.date)}">${e(r)}</time>`}function be(t,a){var s,l;let n=t.filter(p=>p.rating>=1&&p.rating<=5);if(n.length<2)return"";let o=n.reduce((p,d)=>p+Number(d.rating),0)/n.length,r=(s=F[a])!=null?s:F.en,i=new Intl.NumberFormat((l=ne[a])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(t.length)))}</span></p>`}function ie(t,a,n,o){var s;if(!t.length)return"";let r=(s=F[a])!=null?s:F.en,i=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${m("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${be(t,a)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(o).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${ye}`}var ye=`<style>
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
upd()}})()<\/script>`;var se=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function le({site:t,markets:a,url:n,abs:o}){var s;let r=(s=a.find(l=>l.default))!=null?s:a[0],i=a.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${a.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${o(`${l.id}/`)}">`).join(`
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
`}var $e="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap";function xe(t,a){var n;return((n=t.products)!=null?n:[]).map(o=>{var i;let r=((i=o.variants)!=null?i:[]).length?H(o.variants[0],a):null;return r==null?null:{...o,price:r}}).filter(Boolean)}function _e({site:t,catalog:a,i18n:n,template:o,basePath:r="/",siteUrl:i=t.domain}){let s=_(r),l=v=>new URL(s(v),i).href,p=a.markets,d=K(t.bookingForm),u=d&&!d.error?d:null,c=p.map(v=>{var j,T,R,E,L;let y=v.lang,w=(T=(j=n[y])!=null?j:n.en)!=null?T:n.vi,x=b=>O(b,y,"en"),M=(E=(R=t.bookingChannels)==null?void 0:R[v.id])!=null?E:["phone"],k=b=>W(b,v),N=xe(a,v),$;try{$=new Intl.DisplayNames([S(y)],{type:"language"})}catch{$=null}let z=b=>{var g;let h=(g=$==null?void 0:$.of(b))!=null?g:b;return h.charAt(0).toLocaleUpperCase(S(y))+h.slice(1)},P=((L=t.languages)!=null?L:[]).filter(b=>b==null?void 0:b.code).map(b=>({...b,name:z(b.code)})),C=t.notaryFee?H({basePrice:t.notaryFee.price,prices:t.notaryFee.prices},v):null,f={site:t,catalog:a,market:v,markets:p,lang:y,t:w,L:x,url:s,abs:l,channels:M,money:k,services:N,languages:P,notary:C,template:o,gform:u};return{path:`${v.id}/index.html`,html:ke(f)}});return c.push({path:"index.html",html:le({site:t,markets:p,url:s,abs:l})}),c}function ke(t){var x,M,k,N,$,z,P,C;let{site:a,market:n,markets:o,lang:r,t:i,L:s,url:l,abs:p}=t,d=`${a.name} \xB7 ${s(a.tagline)}`,u=(x=a.theme)!=null?x:{},c=["primary","ink","bg","surface","soft","accent"].filter(f=>u[f]).map(f=>`--${f}:${u[f]}`).join(";"),v=(M=o.find(f=>f.default))!=null?M:o[0],y=o.map(f=>({id:f.id,lang:f.lang,country:f.country,currency:f.currency,href:l(`${f.id}/`)})),w=(k=a.contact)!=null?k:{};return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(d)}</title>
<meta name="description" content="${e(s(a.intro))}">
<link rel="canonical" href="${p(`${n.id}/`)}">
${o.map(f=>`<link rel="alternate" hreflang="${e(f.lang)}-${e(f.country)}" href="${p(`${f.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${v.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(d)}">
<meta property="og:description" content="${e(s(a.intro))}">
<meta property="og:url" content="${p(`${n.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(p(B(a.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((N=u.bg)!=null?N:"#F6F3EC")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${$e}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${c}}</style>
${I(Te(t))}${(($=a.faq)!=null?$:[]).length?I(Re(t)):""}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(y))}' data-wa="${e(q((z=w.whatsapp)!=null?z:""))}" data-email="${e((P=w.email)!=null?P:"")}" data-copied="${e(i.copied)}" data-tz="${e((C=a.timezone)!=null?C:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(i.skip)}</a>
${ee(i)}
${we(t)}
<main id="main">
${[Me,De,Se,Ne,ze,Pe,Ce,qe].map(f=>f(t)).join(`
`)}
</main>
${je(t)}
<a class="fab" href="#quote" data-fab>${m("doc",20)} <span>${e(i.nav.quote)}</span></a>
</body>
</html>
`}function we({site:t,market:a,markets:n,t:o,url:r}){var s;let i=[["#services",o.nav.services],["#languages",o.nav.languages],["#process",o.nav.process],["#contact",o.nav.contact]];return`<header class="header">
  <div class="pill">
    <a class="brand" href="${r(`${a.id}/`)}">
      ${t.logo?`<img src="${e(A(r,t.logo))}" alt="" width="32" height="32">`:`<span class="brand-mark" aria-hidden="true">${e(String((s=t.name)!=null?s:"").trim().charAt(0))}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([l,p])=>`<a href="${l}">${e(p)}</a>`).join("")}</nav>
    ${n.length>1?`<details class="market">
      <summary aria-label="${e(o.market.label)}">${m("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(X(a))}</span></span></summary>
      <ul>${n.map(l=>`<li><a href="${r(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===a.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)}</a></li>`).join("")}</ul>
    </details>`:""}
    <details class="mnav">
      <summary aria-label="${e(o.nav.openMenu)}">${m("menu",20)}</summary>
      <nav aria-label="Menu">${i.map(([l,p])=>`<a href="${l}">${e(p)}</a>`).join("")}</nav>
    </details>
    <a class="btn btn--accent btn--sm" href="#quote">${e(o.nav.quote)}</a>
  </div>
</header>`}function Me({site:t,t:a,L:n,url:o,languages:r}){var l,p;let i=((l=t.samples)!=null?l:[]).filter(d=>(d==null?void 0:d.code)&&(d==null?void 0:d.text)).slice(0,5),s=((p=t.trust)!=null?p:[]).filter(d=>n(d==null?void 0:d.text));return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${n(t.heroKicker)?`<p class="kicker">${e(n(t.heroKicker))}</p>`:""}
      <h1>${e(n(t.tagline))}</h1>
      ${n(t.intro)?`<p class="lead">${e(n(t.intro))}</p>`:""}
      <a class="btn btn--accent btn--xl" href="#quote">${m("doc",22)} ${e(a.hero.cta)} ${m("arrow",20)}</a>
      <p class="hero-sub">${e(a.hero.sub.replace("{n}",r.filter(d=>d.tier>0).length))}</p>
      ${s.length?`<ul class="trust">${s.map(d=>{var u;return`<li>${m((u=d.icon)!=null?u:"check",18)} ${e(n(d.text))}</li>`}).join("")}</ul>`:""}
    </div>
    <figure class="hero-fig">
      <img src="${e(A(o,t.heroImage||"photos/h-hero.webp"))}" alt="" width="1200" height="1400" fetchpriority="high">
      ${i.length?`<figcaption class="samples" aria-hidden="true">${i.map(d=>`<p lang="${e(d.code)}"><code>${e(String(d.code).toUpperCase())}</code><span>${e(d.text)}</span></p>`).join("")}</figcaption>`:""}
    </figure>
  </div>
</section>`}function De(t){var j,T,R,E,L,b;let{site:a,t:n,L:o,services:r,languages:i,notary:s,money:l,channels:p,gform:d,market:u}=t;if(!r.length)return"";let c=n.quote,v=(j=a.contact)!=null?j:{},y=((T=a.fields)!=null?T:[]).filter(h=>o(h==null?void 0:h.name)),w=((R=a.speeds)!=null?R:[]).filter(h=>o(h==null?void 0:h.name)),x=(E=i.find(h=>!h.tier))!=null?E:i[0],M=i.filter(h=>h!==x),k=(L=M.find(h=>h.code===u.lang))!=null?L:M[0],N=(h,g)=>`<option value="${e(h.code)}" data-tier="${Number(h.tier)||0}"${g?" selected":""}>${e(h.name)}</option>`,$=h=>i.map(g=>N(g,g.code===h)).join(""),z=d?` data-gform="${e(d.action)}" data-gmap='${e(JSON.stringify(d.fields))}'`:"",P=n.orderText.replace(/\{\w+\}/g,"\u2026"),C=h=>p.map((g,D)=>{var U;return`<button type="submit" class="btn ${h!=null?h:D?"btn--line":"btn--accent"}" data-channel="${e(g)}" data-href="${e(G(g,v,P))}">${m(g,18)} ${e(g==="phone"?c.call:c.send.replace("{channel}",(U=n.via[g])!=null?U:g))}</button>`}).join(""),f=r.map(h=>{var g,D;return{id:h.id,k:(g=h.kind)!=null?g:"doc",p:h.price,min:Number(h.min)||1,u:(D=o(h.unit))!=null?D:""}});return`<section class="section quote-sec" id="quote" aria-labelledby="q-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(c.kicker)}</p><h2 id="q-title" class="h2">${e(c.title)}</h2><p class="lead">${e(c.text)}</p></div>
    <form class="quote" data-quote novalidate${z} data-text="${e(n.orderText)}" data-market="${e(`${u.id.toUpperCase()} \xB7 ${u.currency}`)}"
      data-services='${e(JSON.stringify(f))}' data-tiers='${e(JSON.stringify((b=a.tiers)!=null?b:{1:1,2:1.35,3:1.8}))}' data-notary="${s!=null?s:0}" data-ppd="${Number(a.pagesPerDay)||10}"
      data-currency="${e(u.currency)}" data-lang="${e(u.lang)}" data-locale="${e(S(u.lang))}">
      <div class="q-main">
        <fieldset class="field"><legend><b>1</b> ${e(c.service)}</legend>
          <div class="tabs">${r.map((h,g)=>{var D;return`<label class="tab"><input type="radio" name="service" value="${e(h.id)}" data-label="${e(o(h.name))}"${g?"":" checked"}><span>${m(h.kind==="interpret"?"chat":h.kind==="notary"?"scale":"doc",20)}<b>${e(o(h.name))}</b><small>${e(c.from.replace("{price}",l(h.price)).replace("{unit}",(D=o(h.unit))!=null?D:""))}</small></span></label>`}).join("")}</div>
        </fieldset>
        <fieldset class="field"><legend><b>2</b> ${e(c.pair)}</legend>
          <div class="pair">
            <label><span class="sr">${e(c.fromLang)}</span><select name="from" data-from>${$(k==null?void 0:k.code)}</select></label>
            <button type="button" class="swap" data-swap aria-label="${e(c.swap)}">${m("refresh",18)}</button>
            <label><span class="sr">${e(c.toLang)}</span><select name="to" data-to>${$(x==null?void 0:x.code)}</select></label>
          </div>
          <p class="hint hint--warn" data-same hidden>${e(c.same)}</p>
        </fieldset>
        ${y.length?`<fieldset class="field" data-only="doc notary"><legend><b>3</b> ${e(c.field)}</legend>
          <div class="chips">${y.map((h,g)=>`<label class="chip"><input type="radio" name="field" value="${e(o(h.name))}" data-mult="${Number(h.mult)||1}"${g?"":" checked"}><span>${e(o(h.name))}${Number(h.mult)>1?` <small>\xD7${e(String(h.mult))}</small>`:""}</span></label>`).join("")}</div>
        </fieldset>`:""}
        <div class="row2">
          <label class="field"><span data-qty-label data-doc="${e(c.pages)}" data-hours="${e(c.hours)}">${e(c.pages)}</span>
            <span class="stepper"><button type="button" data-step="-1" aria-label="\u2212">${m("minus",16)}</button><input name="qty" type="number" min="1" max="2000" value="5" inputmode="numeric" data-qty><button type="button" data-step="1" aria-label="+">${m("plus",16)}</button></span>
            <small class="hint" data-qty-hint data-doc="${e(c.pageHint)}" data-hours="${e(c.hourHint)}">${e(c.pageHint)}</small></label>
          <label class="field" data-only="doc notary" data-copies-wrap${s?"":" hidden"}><span>${e(c.copies)}</span>
            <span class="stepper"><button type="button" data-cstep="-1" aria-label="\u2212">${m("minus",16)}</button><input name="copies" type="number" min="1" max="50" value="1" inputmode="numeric" data-copies><button type="button" data-cstep="1" aria-label="+">${m("plus",16)}</button></span>
            <small class="hint">${e(c.copiesHint.replace("{price}",l(s!=null?s:0)))}</small></label>
          <label class="field" data-only="interpret" hidden><span>${e(c.eventDate)}</span><input name="event" type="date" data-event></label>
        </div>
        ${w.length?`<fieldset class="field" data-only="doc notary"><legend><b>4</b> ${e(c.speed)}</legend>
          <div class="chips">${w.map((h,g)=>`<label class="chip"><input type="radio" name="speed" value="${e(o(h.name))}" data-mult="${Number(h.mult)||1}" data-days="${Number(h.days)||0}" data-rate="${Number(h.rate)||1}"${g?"":" checked"}><span>${e(o(h.name))}${Number(h.mult)>1?` <small>+${Math.round((Number(h.mult)-1)*100)}%</small>`:""}</span></label>`).join("")}</div>
        </fieldset>`:""}
      </div>
      <aside class="q-side">
        <div class="ticket">
          <p class="ticket-h">${e(c.estimate)}</p>
          <dl class="lines">
            <div><dt data-l-base>\u2014</dt><dd data-v-base>\u2014</dd></div>
            <div data-r-field hidden><dt data-l-field></dt><dd data-v-field></dd></div>
            <div data-r-speed hidden><dt data-l-speed></dt><dd data-v-speed></dd></div>
            <div data-r-notary hidden><dt data-l-notary data-tpl="${e(c.notaryLine)}"></dt><dd data-v-notary></dd></div>
          </dl>
          <p class="total"><span>${e(c.total)}</span><b data-total>\u2014</b></p>
          <p class="eta" data-eta-wrap>${m("calendar",16)} <span data-eta data-tpl="${e(c.eta)}" data-today="${e(c.today)}">\u2014</span></p>
          <p class="hint" data-min hidden data-tpl="${e(c.min)}"></p>
          <p class="fine">${e(o(a.note)||c.note)}</p>
        </div>
        <div class="order-fields">
          <div class="row2">
            <label class="field"><span>${e(c.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
            <label class="field"><span>${e(c.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          </div>
          <label class="field"><span>${e(c.email)}</span><input name="email" type="email" autocomplete="email" maxlength="120"></label>
          <label class="field"><span>${e(c.note2)}</span><textarea name="note" rows="2" maxlength="400" placeholder="${e(c.noteHint)}"></textarea></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          <p class="form-err" data-err hidden>${e(c.required)}</p>
          <button class="btn btn--accent btn--lg btn--full" type="submit" data-submit>${m("doc",18)} ${e(c.submit)}</button>
          <p class="hint">${m("lock",14)} ${e(c.files)}</p>
        </div>
        <div class="done" data-done hidden tabindex="-1">
          <p class="done-title">${m(d?"check":"arrow",22)} ${e(d?c.done:c.stepTitle)}</p>
          <p>${e(d?c.doneText:c.stepText)}</p>
          <div class="buy">${C(d?"btn--line":void 0)}</div>
          ${d?"":`<button type="button" class="link" data-edit>${e(c.edit)}</button>`}
        </div>
        <p class="form-msg" role="status" hidden></p>
      </aside>
    </form>
  </div>
</section>`}function Se({t,L:a,url:n,money:o,services:r}){return r.length?`<section class="section" id="services" aria-labelledby="sv-title">
  <div class="wrap">
    <div class="sec-head sec-head--row"><div><p class="kicker">${e(t.services.kicker)}</p><h2 id="sv-title" class="h2">${e(t.services.title)}</h2></div><a class="btn btn--line" href="#quote">${e(t.nav.quote)} ${m("arrow",16)}</a></div>
    <ul class="svc">${r.map((i,s)=>{var l;return`<li class="svc-card${s===0?" is-big":""}">
      ${i.image?`<img src="${e(A(n,i.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
      <div><h3>${e(a(i.name))}</h3>${a(i.description)?`<p>${e(a(i.description))}</p>`:""}
      <p class="svc-price">${e(t.quote.from.replace("{price}",o(i.price)).replace("{unit}",(l=a(i.unit))!=null?l:""))}</p>
      <a class="link" href="#quote" data-pick-service="${e(i.id)}">${e(t.services.quote)} ${m("arrow",14)}</a></div>
    </li>`}).join("")}</ul>
  </div>
</section>`:""}function Ne({site:t,t:a,L:n,languages:o,services:r,money:i}){var d,u;let s=(d=t.tiers)!=null?d:{1:1,2:1.35,3:1.8},l=(u=r.find(c=>{var v;return((v=c.kind)!=null?v:"doc")==="doc"}))!=null?u:r[0],p=[1,2,3].map(c=>({n:c,list:o.filter(v=>Number(v.tier)===c)})).filter(c=>c.list.length);return p.length?`<section class="section section--soft" id="languages" aria-labelledby="lg-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.langs.kicker)}</p><h2 id="lg-title" class="h2">${e(a.langs.title.replace("{n}",o.filter(c=>c.tier>0).length))}</h2><p class="lead">${e(a.langs.text)}</p></div>
    <div class="tiers">${p.map(c=>{var v;return`<div class="tier">
      <p class="tier-h"><b>${e(a.langs.group.replace("{n}",c.n))}</b>${l?`<span>${e(a.quote.from.replace("{price}",i(Math.round(l.price*(Number(s[c.n])||1)))).replace("{unit}",(v=n(l.unit))!=null?v:""))}</span>`:""}</p>
      <ul>${c.list.map(y=>`<li><code>${e(y.code.toUpperCase())}</code> ${e(y.name)}</li>`).join("")}</ul>
    </div>`}).join("")}</div>
  </div>
</section>`:""}function ze({site:t,t:a,L:n,url:o}){var s,l;let r=((s=t.steps)!=null?s:[]).filter(p=>n(p==null?void 0:p.title)),i=((l=t.promises)!=null?l:[]).filter(p=>n(p==null?void 0:p.title));return!r.length&&!i.length?"":`<section class="section" id="process" aria-labelledby="pr-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.process.kicker)}</p><h2 id="pr-title" class="h2">${e(a.process.title)}</h2></div>
    ${r.length?`<ol class="steps">${r.map((p,d)=>`<li><span class="num">${String(d+1).padStart(2,"0")}</span><b>${e(n(p.title))}</b><p>${e(n(p.text))}</p></li>`).join("")}</ol>`:""}
    ${i.length?`<div class="promise">
      <img src="${e(A(o,"photos/office.webp"))}" alt="" width="1000" height="750" loading="lazy">
      <ul>${i.map(p=>{var d;return`<li>${m((d=p.icon)!=null?d:"shield",24)}<div><b>${e(n(p.title))}</b><p>${e(n(p.text))}</p></div></li>`}).join("")}</ul>
    </div>`:""}
    ${n(t.disclaimer)?`<p class="disclaimer">${m("scale",16)} ${e(n(t.disclaimer))}</p>`:""}
  </div>
</section>`}function Pe({site:t,t:a,L:n,lang:o}){let r=ae(t,a,o,"btn btn--line"),i=oe(t);return t.showReviews===!1||!i.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2></div>
    ${ie(i,o,"reviews",s=>`<figure class="review">
      <p class="stars" aria-label="${e(s.rating)}/5">${Array.from({length:5},(l,p)=>`<span class="${p<s.rating?"on":""}">${m("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(s.text))}</blockquote>
      <figcaption>${e(s.name)}${n(s.bought)?`<small>${e(n(s.bought))}</small>`:""}${re(s,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ce({site:t,t:a,L:n}){var r;let o=((r=t.faq)!=null?r:[]).filter(i=>n(i==null?void 0:i.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div>${o.map((i,s)=>`<details${s===0?" open":""}><summary>${e(n(i.q))}</summary><p>${e(n(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function qe({site:t,t:a,L:n,channels:o}){var l,p,d;let r=(l=t.contact)!=null?l:{},i=encodeURIComponent((p=r.mapQuery)!=null?p:n(r.address)),s=u=>u.length===7?a.visit.everyDay:Z(u,a.days);return`<section class="section section--ink" id="contact" aria-labelledby="ct-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="ct-title" class="h2">${e(a.visit.title)}</h2>
      ${n(r.address)?`<p class="addr">${m("pin",18)} ${e(n(r.address))}</p>`:""}
      ${te(t,a)}
      ${((d=t.hours)!=null?d:[]).length?`<table class="hours"><tbody>${t.hours.map(u=>`<tr><th scope="row">${e(s(u.days))}</th><td>${e(u.open)} \u2013 ${e(u.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <div class="actions">
        <a class="btn btn--accent" href="#quote">${e(a.nav.quote)}</a>
        ${o.map(u=>{var c;return`<a class="btn btn--line" href="${e(G(u,r))}" ${Q(u)}>${m(u,18)} ${e((c=a.via[u])!=null?c:u)}</a>`}).join("")}
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(a.visit.directions)}</a>
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function je({site:t,t:a,L:n,market:o}){var s,l;let r=(s=t.contact)!=null?s:{},i=Object.entries((l=t.social)!=null?l:{}).filter(([,p])=>p);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(a.footer.hotline)}: <a href="tel:${q(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${i.map(([p,d])=>`<li><a href="${e(d)}" target="_blank" rel="noopener">${e(p==="linkedin"?"LinkedIn":p==="youtube"?"YouTube":p[0].toUpperCase()+p.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${se(t,a,o.lang)}</div>
</footer>`}function Te({site:t,market:a,L:n,abs:o,services:r,languages:i}){var l,p;let s=(l=t.contact)!=null?l:{};return{"@context":"https://schema.org","@type":"ProfessionalService",name:t.name,url:o(`${a.id}/`),description:n(t.intro),image:o(B(t.heroImage||"photos/h-hero.webp")),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:n(s.address)},knowsLanguage:i.map(d=>d.code),openingHoursSpecification:Y((p=t.hours)!=null?p:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:t.name,itemListElement:r.map(d=>({"@type":"Offer",itemOffered:{"@type":"Service",name:n(d.name)},priceSpecification:{"@type":"UnitPriceSpecification",price:d.price,priceCurrency:a.currency,unitText:n(d.unit)}}))}}}var Re=({site:t,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:t.faq.filter(n=>a(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:a(n.q),acceptedAnswer:{"@type":"Answer",text:a(n.a)}}))});export{_e as renderSite};
