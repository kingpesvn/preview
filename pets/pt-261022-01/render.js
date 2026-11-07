var se={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>se[t]);function B(a,t,n="vi"){var s,i,r;return a==null?"":typeof a!="object"?String(a):(r=(i=(s=a[t])!=null?s:a[n])!=null?i:Object.values(a)[0])!=null?r:""}var ie={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},V=a=>{var t;return(t=ie[a])!=null?t:"en-US"};function le(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function H(a,t){var s,i;if(t.default)return a.basePrice;let n=(i=(s=a.prices)==null?void 0:s[t.id])!=null?i:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:le(a.basePrice*t.rate,t.rounding)}var ce=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function I(a,t){let n={style:"currency",currency:t.currency};return ce.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(V(t.lang),n).format(a)}function U(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var pe=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,T=(a,t)=>{let n=pe(t);return n==null?t:a(n)},k=(a="")=>String(a).replace(/\D/g,"");function R(a,t,n=""){switch(a){case"phone":return`tel:${k(t.phone)}`;case"zalo":return`https://zalo.me/${k(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${k(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var W=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,de=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function _(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let s={};for(let[i,r]of t.searchParams){if(!/^entry\.\d+$/.test(i))continue;let l=r.trim().replace(/^\{|\}$/g,"").toLowerCase();de.includes(l)&&(s[l]=i)}return Object.keys(s).length?s.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:s}:{error:"no-phone"}:{error:"no-fields"}}var he={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(a,t=20,n="")=>{var s;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(s=he[a])!=null?s:""}</svg>`},q=[1,2,3,4,5,6,0],ue=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function J(a,t){let n=a.map(i=>q.indexOf(i)).sort((i,r)=>i-r);return n.every((i,r)=>r===0||i===n[r-1]+1)&&n.length>2?`${t[q[n[0]]]} \u2013 ${t[q[n.at(-1)]]}`:n.map(i=>t[q[i]]).join(", ")}var Z=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>ue[n]),opens:t.open,closes:t.close}));function Y(a){var n,s;return(s=(n=new Intl.NumberFormat(V(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(i=>i.type==="currency"))==null?void 0:n.value)!=null?s:a.currency}var A=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',X=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,L=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},K={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},me=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ge=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&me.test(n.hostname)?n.href:""}catch{return""}},Q=(a,t,n,s="btn btn--line")=>{var l;let i=ge(a);if(!i)return"";let r=typeof t.reviews=="object"&&((l=t.reviews)==null?void 0:l.google)||K[n]||K.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${s}" href="${e(i)}" target="_blank" rel="noopener">${u("star",16)} ${e(r)}</a></p>`},E={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ee={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ae=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function te(a,t){var r,l,o;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((r=a==null?void 0:a.date)!=null?r:"").trim());if(!n)return"";let s=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(s.getTime()))return"";let i=new Intl.DateTimeFormat((o=ee[t])!=null?o:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(s);return`<time class="rv-date" datetime="${e(a.date)}">${e(i)}</time>`}function fe(a,t){var l,o;let n=a.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let s=n.reduce((c,p)=>c+Number(p.rating),0)/n.length,i=(l=E[t])!=null?l:E.en,r=new Intl.NumberFormat((o=ee[t])!=null?o:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(s);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${r}</strong><span>\xB7</span><span>${e(i.count.replace("{n}",String(a.length)))}</span></p>`}function ne(a,t,n,s){var l;if(!a.length)return"";let i=(l=E[t])!=null?l:E.en,r=o=>`<button type="button" class="rv-btn" data-rv-${o} aria-label="${e(o==="prev"?i.prev:i.next)}">${u("arrow",18,o==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${fe(a,t)}<div class="rv" data-rv data-rv-more="${e(i.more)}" data-rv-less="${e(i.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(s).join("")}</div>
      <div class="rv-nav" hidden>${r("prev")}${r("next")}</div>
    </div>${be}`}var be=`<style>
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
upd()}})()<\/script>`;var oe=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function re({site:a,markets:t,url:n,abs:s}){var l;let i=(l=t.find(o=>o.default))!=null?l:t[0],r=t.map(o=>({id:o.id,lang:o.lang,country:o.country}));return`<!doctype html>
<html lang="${e(i.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${s(`${i.id}/`)}">
${t.map(o=>`<link rel="alternate" hreflang="${e(o.lang)}-${e(o.country)}" href="${s(`${o.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(r)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${t.map(o=>`<a href="${n(`${o.id}/`)}">${e(o.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ve="https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",O=12,ye=["dog","cat","clinic","care"];function $e(a,t){var n;return((n=a.products)!=null?n:[]).map(s=>{var i;return{...s,variants:((i=s.variants)!=null?i:[]).map(r=>({...r,price:H(r,t)})).filter(r=>r.price!=null)}}).filter(s=>s.variants.length>0)}function Je({site:a,catalog:t,i18n:n,template:s,basePath:i="/",siteUrl:r=a.domain}){let l=U(i),o=g=>new URL(l(g),r).href,c=t.markets,p=_(a.bookingForm),h=p&&!p.error?p:null,m=c.map(g=>{var v,j,d,S,C,G;let f=g.lang,y=(j=(v=n[f])!=null?v:n.en)!=null?j:n.vi,x=N=>B(N,f,"en"),w=$e(t,g),b=((d=a.sizes)!=null?d:[]).filter(N=>(N==null?void 0:N.id)&&x(N.label)),M=(C=(S=a.bookingChannels)==null?void 0:S[g.id])!=null?C:["phone"],$=N=>I(N,g),D=(G=a.emergency)!=null?G:{},z=D.show!==!1&&D.phone?D:null,P={site:a,catalog:t,market:g,markets:c,lang:f,t:y,L:x,url:l,abs:o,services:w,sizes:b,channels:M,money:$,template:s,gform:h,sos:z};return{path:`${g.id}/index.html`,html:ke(P)}});return m.push({path:"index.html",html:re({site:a,markets:c,url:l,abs:o})}),m}var F=(a,t)=>a.heroImage?T(t,a.heroImage):t("assets/photos/hero.webp"),xe=(a,t)=>{var n,s,i;return(i=(s=((n=a.categories)!=null?n:[]).find(r=>r.id===t.category))==null?void 0:s.pet)!=null?i:"all"};function ke(a){var w,b,M,$,D,z,P;let{site:t,market:n,markets:s,lang:i,t:r,L:l,url:o,abs:c,sos:p}=a,h=`${t.name} \xB7 ${l(t.tagline)}`,m=(w=t.theme)!=null?w:{},g=["primary","ink","bg","surface","soft","accent"].filter(v=>m[v]).map(v=>`--${v}:${m[v]}`).join(";"),f=(b=s.find(v=>v.default))!=null?b:s[0],y=s.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:o(`${v.id}/`)})),x=(M=t.contact)!=null?M:{};return`<!doctype html>
<html lang="${e(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(h)}</title>
<meta name="description" content="${e(l(t.intro))}">
<link rel="canonical" href="${c(`${n.id}/`)}">
${s.map(v=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${c(`${v.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${f.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(h)}">
<meta property="og:description" content="${e(l(t.intro))}">
<meta property="og:url" content="${c(`${n.id}/`)}">
<meta property="og:site_name" content="${e(t.name)}">
<meta property="og:image" content="${e(new URL(F(t,o),c("")).href)}">
<meta name="theme-color" content="${e(($=m.primary)!=null?$:"#17647A")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ve}">
<link rel="stylesheet" href="${o("assets/style.css")}">
<style>:root{${g}}</style>
<noscript><style>.album .more{display:block}.album-more,.chips,.picker,.vax-form{display:none}</style></noscript>
${W(Be(a))}
<script src="${o("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(y))}' data-wa="${e(k(x.whatsapp))}" data-email="${e((D=x.email)!=null?D:"")}" data-copied="${e(r.booking.copied)}" data-tz="${e((z=t.timezone)!=null?z:"Asia/Ho_Chi_Minh")}" data-locale="${e(i)}">
<a class="skip" href="#main">${e(r.skip)}</a>
${X(r)}
${p?`<p class="sos">${u("cross",16)} <span>${e(l(p.text)||r.sos.text)}</span> <a href="tel:${k(p.phone)}">${u("phone",16)} ${e(p.phone)}</a></p>`:""}
${we(a)}
<main id="main">
${Me(a)}
${De(a)}
${Se(a)}
${ze(a)}
${Ne(a)}
${Pe(a)}
${je(a)}
${Ce(a)}
${Te(a)}
${Re(a)}
${qe(a)}
</main>
${Ee(a)}
<nav class="dock" aria-label="${e(r.nav.book)}">
  ${p?`<a class="sos-btn" href="tel:${k(p.phone)}">${u("phone",20)}<span>${e(r.sos.call)}</span></a>`:`<a href="${e(R(a.channels[0],x))}" ${A(a.channels[0])}>${u(a.channels[0],20)}<span>${e((P=r.via[a.channels[0]])!=null?P:"")}</span></a>`}
  <a class="primary" href="#booking">${u("calendar",20)}<span>${e(r.nav.book)}</span></a>
</nav>
</body>
</html>
`}function we({site:a,market:t,markets:n,t:s,url:i,sos:r}){let l=[["#prices",s.nav.prices],["#vaccines",s.nav.vaccines],["#team",s.nav.team],["#visit",s.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${i(`${t.id}/`)}">
      ${a.logo?`<img src="${e(T(i,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("cross",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${l.map(([o,c])=>`<a href="${o}">${e(c)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(s.market.label)}">${u("globe",18)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(Y(t))}</span></span></summary>
        <ul>${n.map(o=>`<li><a href="${i(`${o.id}/`)}" hreflang="${e(o.lang)}"${o.id===t.id?' aria-current="true"':""}>${e(o.country)} \xB7 ${e(o.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-md" href="#booking">${e(s.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(s.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${[...l,["#booking",s.nav.book]].map(([o,c])=>`<a href="${o}">${e(c)}</a>`).join("")}${r?`<a href="tel:${k(r.phone)}">${e(s.sos.call)} \xB7 ${e(r.phone)}</a>`:""}</nav>
      </details>
    </div>
  </div>
</header>`}function Me({site:a,t,L:n,url:s,sos:i}){var l,o;let r=((l=a.stats)!=null?l:[]).filter(c=>n(c==null?void 0:c.value));return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${n(a.place)?`<p class="eyebrow">${u("steth",16)} ${e(n(a.place))}</p>`:""}
      <h1>${e(n(a.tagline))}</h1>
      ${n(a.intro)?`<p class="lead">${e(n(a.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#booking">${u("calendar",18)} ${e(t.hero.book)}</a>
        ${i?`<a class="btn btn--sos btn--lg" href="tel:${k(i.phone)}">${u("phone",18)} ${e(t.sos.call)}</a>`:`<a class="btn btn--line btn--lg" href="#prices">${e(t.hero.prices)}</a>`}
      </div>
      ${L(a,t)}
    </div>
    <figure class="hero-ph">
      <img src="${e(F(a,s))}" alt="" width="1000" height="1000" fetchpriority="high">
      ${(o=a.vaccines)!=null&&o.length?`<figcaption class="vax-tag"><a href="#vaccines">${u("syringe",20)} <span><b>${e(t.vax.tag)}</b>${e(t.vax.tagText)}</span></a></figcaption>`:""}
    </figure>
  </div>
  ${r.length?`<ul class="wrap stats">${r.map(c=>`<li><b>${e(n(c.value))}</b><span>${e(n(c.label))}</span></li>`).join("")}</ul>`:""}
</section>`}function De({services:a,sizes:t,catalog:n,t:s,L:i,money:r}){var h;let l=((h=n.categories)!=null?h:[]).filter(m=>a.some(g=>g.category===m.id));if(!l.length)return"";let o=t.filter(m=>a.some(g=>g.variants.some(f=>f.size===m.id))),c=l.some(m=>m.pet==="cat"),p=m=>{var w;let g=a.filter(b=>b.category===m.id),f=o.length&&g.some(b=>b.variants.some(M=>M.size)),y=b=>`<th scope="row"><span class="nm">${e(i(b.name))}</span>${i(b.description)?`<small class="desc">${e(i(b.description))}</small>`:""}</th>`,x=b=>{let M=b.variants.filter($=>$.size);return!f||!M.length?`<tr>${y(b)}<td class="all"${f?` colspan="${o.length}"`:""}>${b.variants.map($=>`<span class="pv">${i($.label)?`<small>${e(i($.label))}</small>`:""}${e(r($.price))}</span>`).join("")}</td></tr>`:`<tr>${y(b)}${o.map($=>{let D=M.find(z=>z.size===$.id);return`<td class="c" data-size="${e($.id)}">${D?e(r(D.price)):'<span class="na">\u2014</span>'}</td>`}).join("")}</tr>`};return`<div class="pgroup" data-pet="${e((w=m.pet)!=null?w:"all")}">
      <table class="ptable${f?" ptable--sized":""}">
        <thead><tr><th scope="col">${m.icon?u(m.icon,20):""}${e(i(m.name))}</th>${f?o.map(b=>`<th scope="col" class="c" data-size="${e(b.id)}">${e(i(b.label))}</th>`).join(""):`<th scope="col" class="all">${e(s.prices.price)}</th>`}</tr></thead>
        <tbody>${g.map(x).join("")}</tbody>
      </table>
    </div>`};return`<section class="section" id="prices" aria-labelledby="price-title">
  <div class="wrap">
    <div class="head"><h2 id="price-title" class="h2">${e(s.prices.title)}</h2><p class="muted">${e(s.prices.text)}</p></div>
    ${c||o.length>1?`<div class="picker">
      ${c?`<div class="chips" role="group" aria-label="${e(s.prices.pet)}"><button type="button" class="chip chip--big" data-pet="dog" aria-pressed="true">\u{1F436} ${e(s.pets.dog)}</button><button type="button" class="chip chip--big" data-pet="cat" aria-pressed="false">\u{1F431} ${e(s.pets.cat)}</button></div>`:""}
      ${o.length>1?`<div class="chips" role="group" aria-label="${e(s.prices.size)}" data-sizes><span class="chips-h">${e(s.prices.size)}:</span>${o.map((m,g)=>`<button type="button" class="chip" data-size="${e(m.id)}" aria-pressed="${g===1||o.length===1&&g===0}">${e(i(m.label))}</button>`).join("")}</div>`:""}
    </div>`:""}
    <div class="price-groups" data-prices>${l.map(p).join("")}</div>
    <p class="muted small price-note">${e(s.prices.note)}</p>
  </div>
</section>`}function Se({site:a,t,L:n}){var l;let s=((l=a.vaccines)!=null?l:[]).filter(o=>n(o==null?void 0:o.name));if(!s.length)return"";let i=["dog","cat"].filter(o=>s.some(c=>c.pet===o)),r=o=>`<div class="vax-col" data-vax-pet="${o}">
      <h3>${o==="dog"?"\u{1F436}":"\u{1F431}"} ${e(t.pets[o])}</h3>
      <ol class="vax">${s.filter(c=>c.pet===o).map((c,p)=>{var h;return`<li data-weeks="${Number(c.atWeeks)||0}" data-service="${e((h=c.serviceId)!=null?h:"")}" data-name="${e(n(c.name))}">
        <span class="vax-n">${p+1}</span>
        <span class="vax-b"><strong>${e(n(c.name))}</strong><span class="muted">${e(n(c.age))}</span></span>
        <span class="vax-d" data-date hidden></span>
        <button type="button" class="btn btn--sm btn--line" data-vax-book hidden>${e(t.vax.book)}</button>
      </li>`}).join("")}</ol>
    </div>`;return`<section class="section section--soft" id="vaccines" aria-labelledby="vax-title">
  <div class="wrap">
    <div class="head"><h2 id="vax-title" class="h2">${e(t.vax.title)}</h2><p class="muted">${e(t.vax.text)}</p></div>
    <div class="vax-card">
      <div class="vax-form">
        ${i.length>1?`<div class="chips" role="group" aria-label="${e(t.prices.pet)}">${i.map((o,c)=>`<button type="button" class="chip chip--big" data-vax-for="${o}" aria-pressed="${c===0}">${o==="dog"?"\u{1F436}":"\u{1F431}"} ${e(t.pets[o])}</button>`).join("")}</div>`:""}
        <label class="field"><span>${e(t.vax.birth)}</span><input type="date" data-birth></label>
        <p class="muted small" data-vax-hint>${e(t.vax.hint)}</p>
      </div>
      <div class="vax-cols" data-vax data-due="${e(t.vax.due)}" data-past="${e(t.vax.past)}">${i.map(r).join("")}</div>
    </div>
    <p class="muted small price-note">${e(t.vax.note)}</p>
  </div>
</section>`}function ze({site:a,t,L:n}){var i;let s=((i=a.steps)!=null?i:[]).filter(r=>n(r==null?void 0:r.title));return s.length?`<section class="section" id="steps" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="head"><h2 id="steps-title" class="h2">${e(t.steps.title)}</h2><p class="muted">${e(t.steps.text)}</p></div>
    <ol class="steps">${s.map((r,l)=>{var o;return`<li><span class="step-i">${u((o=r.icon)!=null?o:"check",22)}</span><span class="step-n">${String(l+1).padStart(2,"0")}</span><strong>${e(n(r.title))}</strong>${n(r.text)?`<p class="muted">${e(n(r.text))}</p>`:""}</li>`}).join("")}</ol>
  </div>
</section>`:""}function Ne({site:a,t,L:n}){var r;let s=((r=a.team)!=null?r:[]).filter(l=>l==null?void 0:l.name);if(!s.length)return"";let i=l=>l.replace(/^(BS|Bác sĩ|Dr)\.?\s+/i,"").split(/\s+/).map(o=>o[0]).slice(-2).join("").toUpperCase();return`<section class="section section--soft" id="team" aria-labelledby="team-title">
  <div class="wrap">
    <div class="head"><h2 id="team-title" class="h2">${e(t.team.title)}</h2><p class="muted">${e(t.team.text)}</p></div>
    <div class="team">${s.map((l,o)=>`<figure class="doc">
      <div class="doc-ph tone-${o%3}">${l.photo?`<img src="${e(l.photo)}" alt="${e(l.name)}" loading="lazy">`:`<span aria-hidden="true">${e(i(l.name))}</span>`}</div>
      <figcaption><strong>${e(l.name)}</strong><span class="role">${e(n(l.role))}</span>${n(l.specialty)?`<span class="muted">${e(n(l.specialty))}</span>`:""}${l.years?`<span class="yrs">${e(t.team.years.replace("{n}",l.years))}</span>`:""}</figcaption>
    </figure>`).join("")}</div>
  </div>
</section>`}function Pe({site:a,t,url:n}){var l;let s=((l=a.album)!=null?l:[]).filter(o=>o==null?void 0:o.image);if(!s.length)return"";let i=o=>s.filter(c=>c.tag===o).length,r=[["",t.album.all,s.length],...ye.filter(i).map(o=>{var c;return[o,(c=t.album.tags[o])!=null?c:o,i(o)]})];return`<section class="section" id="album" aria-labelledby="album-title">
  <div class="wrap">
    <div class="head"><h2 id="album-title" class="h2">${e(t.album.title)}</h2><p class="muted">${e(t.album.text)}</p></div>
    ${r.length>2?`<div class="chips" role="group" aria-label="${e(t.album.filter)}">${r.map(([o,c,p],h)=>`<button type="button" class="chip" data-tag="${o}" aria-pressed="${h===0}">${e(c)} <span>${p}</span></button>`).join("")}</div>`:""}
    <div class="album" data-album>${s.map((o,c)=>{var h;let p=e(T(n,o.image));return`<a class="ph${c>=O?" more":""}" href="${p}" data-i="${c}" data-t="${e((h=o.tag)!=null?h:"")}"><img sizes="auto, (max-width: 640px) 50vw, 300px" src="${p}" alt="${e(`${a.name} ${c+1}`)}" width="1000" height="750" loading="lazy"></a>`}).join("")}</div>
    ${s.length>O?`<p class="center"><button type="button" class="btn btn--line album-more" data-album-more>${e(t.album.more)} <span data-left>(${s.length-O})</span></button></p>`:""}
  </div>
  <dialog class="lb" data-lightbox aria-label="${e(t.album.title)}">
    <img alt="" data-lb-img>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${e(t.album.close)}">\u2715</button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${e(t.album.prev)}">${u("arrow",22,'style="transform:scaleX(-1)"')}</button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${e(t.album.next)}">${u("arrow",22)}</button>
    <p class="lb-count" data-lb-count></p>
  </dialog>
</section>`}function je({site:a,t,L:n}){var i;let s=((i=a.amenities)!=null?i:[]).filter(r=>n(r==null?void 0:r.label));return s.length?`<section class="section section--soft" aria-labelledby="am-title">
  <div class="wrap">
    <h2 id="am-title" class="h2">${e(t.amenities.title)}</h2>
    <ul class="amen">${s.map(r=>{var l;return`<li><span class="amen-i">${u((l=r.icon)!=null?l:"check",22)}</span>${e(n(r.label))}</li>`}).join("")}</ul>
  </div>
</section>`:""}function Ce({site:a,t,L:n,lang:s}){let i=Q(a,t,s,"btn btn--line"),r=ae(a);return a.showReviews===!1||!r.length&&!i?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(t.reviews)}</h2>
    ${ne(r,s,"quotes",l=>`<figure class="quote">
      ${l.rating?`<div class="stars" aria-label="${l.rating}/5">${Array.from({length:5},(o,c)=>`<span class="${c<l.rating?"on":""}">${u("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(n(l.text))}</blockquote>
      <figcaption>${e(l.name)}${te(l,s)}</figcaption>
    </figure>`)}${i}
  </div>
</section>`}function Te({site:a,services:t,sizes:n,catalog:s,t:i,L:r,channels:l,gform:o,sos:c}){var z,P,v,j;let p=i.booking,h=(z=a.contact)!=null?z:{},m=(v=(P=a.hours)==null?void 0:P[0])!=null?v:{open:"08:00",close:"20:00"},g=[],[f,y]=m.open.split(":").map(Number),[x,w]=m.close.split(":").map(Number);for(let d=f*60+y;d<=x*60+w-30;d+=30)g.push(`${String(Math.floor(d/60)).padStart(2,"0")}:${String(d%60).padStart(2,"0")}`);let b=o?` data-gform="${e(o.action)}" data-gmap='${e(JSON.stringify(o.fields))}'`:"",M=l.map((d,S)=>{var C;return`<button type="button" class="btn ${S===0?"btn--primary":"btn--line"}" data-channel="${e(d)}" data-href="${e(R(d,h,""))}">${u(d,18)} ${e((C=i.via[d])!=null?C:d)}</button>`}).join(""),$=(j=a.homeVisit)!=null?j:{},D=[["dog",i.pets.dog],["cat",i.pets.cat]];return`<section class="section section--brand" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="booking-copy">
      <h2 id="book-title" class="h2">${e(p.title)}</h2>
      <p class="lead">${e(p.text)}</p>
      ${c?`<p class="sos-note">${u("cross",18)} <span>${e(p.urgent)} <a href="tel:${k(c.phone)}">${e(c.phone)}</a></span></p>`:""}
      <div class="actions">${l.map(d=>{var S;return`<a class="btn btn--ghost" href="${e(R(d,h))}" ${A(d)}>${u(d,18)} ${e((S=i.via[d])!=null?S:d)}</a>`}).join("")}</div>
    </div>
    <form class="card form" data-book novalidate${b} data-order-text="${e(p.message)}">
      <div class="book-fields">
        <fieldset class="pet-box">
          <legend>${u("paw",16)} ${e(p.pet)}</legend>
          <div class="row2">
            <label class="field"><span>${e(p.kind)}</span><select name="kind">${D.map(([d,S])=>`<option value="${e(S)}" data-pet="${d}">${e(S)}</option>`).join("")}</select></label>
            ${n.length?`<label class="field"><span>${e(p.size)}</span><select name="psize">${n.map(d=>`<option value="${e(r(d.label))}" data-size="${e(d.id)}">${e(r(d.label))}</option>`).join("")}</select></label>`:""}
          </div>
          <div class="row2">
            <label class="field"><span>${e(p.petName)}</span><input name="petName" maxlength="40"></label>
            <label class="field"><span>${e(p.age)}</span><input name="age" maxlength="30" placeholder="${e(p.ageHint)}"></label>
          </div>
        </fieldset>
        <label class="field"><span>${e(p.service)}</span><select name="product">
          <option value="${e(p.notSure)}">${e(p.notSure)}</option>
          ${t.map(d=>`<option value="${e(r(d.name))}" data-id="${e(d.id)}" data-pet="${e(xe(s,d))}">${e(r(d.name))}</option>`).join("")}
        </select></label>
        <div class="row2">
          <label class="field"><span>${e(p.date)}</span><input name="day" type="date"></label>
          <label class="field"><span>${e(p.time)}</span><select name="time">${g.map(d=>`<option>${d}</option>`).join("")}</select></label>
        </div>
        ${$.show!==!1&&r($.text)?`<label class="check"><input type="checkbox" name="home" value="1"> <span>${e(r($.text))}</span></label>
        <label class="field" data-addr hidden><span>${e(p.address)}</span><input name="address" autocomplete="street-address" maxlength="160"></label>`:""}
        <div class="row2">
          <label class="field"><span>${e(p.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(p.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(p.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${e(p.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(p.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${e(p.sending)}">${u("calendar",18)} ${e(p.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${u(o?"check":"arrow",22)} ${e(o?p.done:p.stepTitle)}</p>
        <p>${e(o?p.doneText:p.stepText)}</p>
        ${o?"":`<div class="buy">${M}</div><button type="button" class="link" data-edit>${e(p.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function Re({site:a,t,L:n,sos:s}){var o,c,p;let i=(o=a.contact)!=null?o:{},r=encodeURIComponent((c=i.mapQuery)!=null?c:n(i.address)),l=h=>h.length===7?t.everyDay:J(h,t.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${L(a,t)}
      ${((p=a.hours)!=null?p:[]).length?`<table class="hours"><tbody>${a.hours.map(h=>`<tr><th scope="row">${e(l(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}${s?`<tr class="hours-sos"><th scope="row">${e(t.sos.label)}</th><td><a href="tel:${k(s.phone)}">${e(s.phone)}</a></td></tr>`:""}</tbody></table>`:""}
      ${n(i.address)?`<p class="addr">${u("pin",18)} ${e(n(i.address))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${e(t.visit.directions)} ${u("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function qe({site:a,t,L:n}){var i;let s=((i=a.faq)!=null?i:[]).filter(r=>n(r==null?void 0:r.q));return s.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div class="qa">${s.map((r,l)=>`<details${l===0?" open":""}><summary>${e(n(r.q))}</summary><p>${e(n(r.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ee({site:a,t,L:n,market:s,sos:i}){var o,c;let r=(o=a.contact)!=null?o:{},l=Object.entries((c=a.social)!=null?c:{}).filter(([,p])=>p);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li><a href="tel:${k(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${i?`<li><a href="tel:${k(i.phone)}">${e(t.sos.label)}: ${e(i.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${l.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${l.map(([p,h])=>`<li><a href="${e(h)}" target="_blank" rel="noopener">${e(p[0].toUpperCase()+p.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${oe(a,t,s.lang)}</div>
</footer>`}function Be({site:a,market:t,L:n,abs:s,url:i,services:r,sizes:l,catalog:o}){var h,m,g;let c=(h=a.contact)!=null?h:{},p=new Map(l.map(f=>[f.id,n(f.label)]));return{"@context":"https://schema.org","@type":"VeterinaryCare",name:a.name,url:s(`${t.id}/`),description:n(a.intro),image:new URL(F(a,i),s("")).href,telephone:c.phone,email:c.email,address:{"@type":"PostalAddress",streetAddress:n(c.address)},openingHoursSpecification:Z((m=a.hours)!=null?m:[]),currenciesAccepted:t.currency,hasOfferCatalog:{"@type":"OfferCatalog",name:a.name,itemListElement:((g=o.categories)!=null?g:[]).filter(f=>r.some(y=>y.category===f.id)).map(f=>({"@type":"OfferCatalog",name:n(f.name),itemListElement:r.filter(y=>y.category===f.id).flatMap(y=>y.variants.map(x=>{var w;return{"@type":"Offer",name:[n(y.name),(w=p.get(x.size))!=null?w:n(x.label)].filter(Boolean).join(" \xB7 "),price:x.price,priceCurrency:t.currency,itemOffered:{"@type":"Service",name:n(y.name),description:n(y.description)||n(y.name)}}}))}))}}}export{Je as renderSite};
