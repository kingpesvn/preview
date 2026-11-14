var ce={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>ce[a]);function B(t,a,n="vi"){var o,s,r;return t==null?"":typeof t!="object"?String(t):(r=(s=(o=t[a])!=null?o:t[n])!=null?s:Object.values(t)[0])!=null?r:""}var de={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},P=t=>{var a;return(a=de[t])!=null?a:"en-US"};function pe(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function A(t,a){var o,s;if(a.default)return t.basePrice;let n=(s=(o=t.prices)==null?void 0:o[a.id])!=null?s:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:pe(t.basePrice*a.rate,a.rounding)}var he=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function I(t,a){let n={style:"currency",currency:a.currency};return he.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(P(a.lang),n).format(t)}function U(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var ue=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,v=(t,a)=>{let n=ue(a);return n==null?a:t(n)},x=(t="")=>String(t).replace(/\D/g,"");function O(t,a,n=""){switch(t){case"phone":return`tel:${x(a.phone)}`;case"zalo":return`https://zalo.me/${x(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${x(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var W=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,me=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function _(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[s,r]of a.searchParams){if(!/^entry\.\d+$/.test(s))continue;let i=r.trim().replace(/^\{|\}$/g,"").toLowerCase();me.includes(i)&&(o[i]=s)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var ge={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},p=(t,a=20,n="")=>{var o;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=ge[t])!=null?o:""}</svg>`},q=[1,2,3,4,5,6,0],fe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function L(t,a){let n=t.map(s=>q.indexOf(s)).sort((s,r)=>s-r);return n.every((s,r)=>r===0||s===n[r-1]+1)&&n.length>2?`${a[q[n[0]]]} \u2013 ${a[q[n.at(-1)]]}`:n.map(s=>a[q[s]]).join(", ")}var J=t=>t.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>fe[n]),opens:a.open,closes:a.close}));function Z(t){var n,o;return(o=(n=new Intl.NumberFormat(P(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:n.value)!=null?o:t.currency}var Y=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',X=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,Q=(t,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},K={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ve=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,be=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&ve.test(n.hostname)?n.href:""}catch{return""}},ee=(t,a,n,o="btn btn--line")=>{var i;let s=be(t);if(!s)return"";let r=typeof a.reviews=="object"&&((i=a.reviews)==null?void 0:i.google)||K[n]||K.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(s)}" target="_blank" rel="noopener">${p("star",16)} ${e(r)}</a></p>`},E={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ae={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},te=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ne(t,a){var r,i,l;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((r=t==null?void 0:t.date)!=null?r:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let s=new Intl.DateTimeFormat((l=ae[a])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(t.date)}">${e(s)}</time>`}function ye(t,a){var i,l;let n=t.filter(d=>d.rating>=1&&d.rating<=5);if(n.length<2)return"";let o=n.reduce((d,h)=>d+Number(h.rating),0)/n.length,s=(i=E[a])!=null?i:E.en,r=new Intl.NumberFormat((l=ae[a])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${p("star",18)}</span><strong>${r}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(t.length)))}</span></p>`}function oe(t,a,n,o){var i;if(!t.length)return"";let s=(i=E[a])!=null?i:E.en,r=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?s.prev:s.next)}">${p("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ye(t,a)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(o).join("")}</div>
      <div class="rv-nav" hidden>${r("prev")}${r("next")}</div>
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
upd()}})()<\/script>`;var re=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function se({site:t,markets:a,url:n,abs:o}){var i;let s=(i=a.find(l=>l.default))!=null?i:a[0],r=a.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${o(`${s.id}/`)}">
${a.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${o(`${l.id}/`)}">`).join(`
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
<body><p>${a.map(l=>`<a href="${n(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var xe="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",G=24,H=8,ke=new Set(["VND","JPY","KRW","IDR","CLP","TWD","HUF","ISK","UGX","PYG"]);function we(t,a){var n;return((n=t.products)!=null?n:[]).map(o=>{var s;return{...o,variants:((s=o.variants)!=null?s:[]).map(r=>({...r,price:A(r,a)})).filter(r=>r.price!=null)}}).filter(o=>o.variants.length>0)}var ie=(t,a,n)=>n!=null&&a.id!=="vn"?n:A({basePrice:t,prices:{}},a);function Xe({site:t,catalog:a,i18n:n,template:o,basePath:s="/",siteUrl:r=t.domain}){let i=U(s),l=c=>new URL(i(c),r).href,d=a.markets,h=_(t.orderForm),f=h&&!h.error?h:null,g=d.map(c=>{var w,M,D,S,z,N,m;let u=c.lang,y=(M=(w=n[u])!=null?w:n.en)!=null?M:n.vi,k=V=>B(V,u,"en"),$=we(a,c),C=(S=(D=t.orderChannels)==null?void 0:D[c.id])!=null?S:["phone"],F=V=>I(V,c),b=(z=t.delivery)!=null?z:{},T=b.fee?ie(+b.fee,c,(N=b.feeManual)==null?void 0:N[c.id]):0,j=b.freeFrom?ie(+b.freeFrom,c,(m=b.freeFromManual)==null?void 0:m[c.id]):0,R={site:t,catalog:a,market:c,markets:d,lang:u,t:y,L:k,url:i,abs:l,products:$,channels:C,money:F,template:o,gform:f,fee:T,freeFrom:j};return{path:`${c.id}/index.html`,html:Me(R)}});return g.push({path:"index.html",html:se({site:t,markets:d,url:i,abs:l})}),g}var le=(t,a)=>t.heroImage?v(a,t.heroImage):a("assets/photos/hero.webp");function Me(t){var b,T,j,R,w,M,D,S,z,N;let{site:a,market:n,markets:o,lang:s,t:r,L:i,url:l,abs:d,fee:h,freeFrom:f}=t,g=`${a.name} \xB7 ${i(a.tagline)}`,c=(b=a.theme)!=null?b:{},u=["primary","ink","bg","surface","soft","accent"].filter(m=>c[m]).map(m=>`--${m}:${c[m]}`).join(";"),y=(T=o.find(m=>m.default))!=null?T:o[0],k=o.map(m=>({id:m.id,lang:m.lang,country:m.country,currency:m.currency,href:l(`${m.id}/`)})),$=(j=a.contact)!=null?j:{},C=(R=a.delivery)!=null?R:{},F={locale:P(n.lang),currency:n.currency,max:ke.has(n.currency)?0:2,fee:h,freeFrom:f,days:(w=C.days)!=null?w:[],cutoff:(M=C.cutoff)!=null?M:"20:00",key:`kp-cart-${a.name}-${n.id}`};return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(g)}</title>
<meta name="description" content="${e(i(a.intro))}">
<link rel="canonical" href="${d(`${n.id}/`)}">
${o.map(m=>`<link rel="alternate" hreflang="${e(m.lang)}-${e(m.country)}" href="${d(`${m.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${y.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(g)}">
<meta property="og:description" content="${e(i(a.intro))}">
<meta property="og:url" content="${d(`${n.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(new URL(le(a,l),d("")).href)}">
<meta name="theme-color" content="${e((D=c.primary)!=null?D:"#2F6B3A")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${xe}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${u}}</style>
<noscript><style>.grid .more,.album .more{display:block}.more-wrap,.add,.cart-btn,.search,.season-row,.next-ship{display:none}</style></noscript>
${W(Ae(t))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(k))}' data-cfg='${e(JSON.stringify(F))}' data-wa="${e(x($.whatsapp))}" data-email="${e((S=$.email)!=null?S:"")}" data-copied="${e(r.order.copied)}" data-tz="${e((z=a.timezone)!=null?z:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(r.skip)}</a>
${X(r)}
${De(t)}
<main id="main">
${Se(t)}
${ze(t)}
${Ne(t)}
${Pe(t)}
${Ce(t)}
${Te(t)}
${je(t)}
${Re(t)}
${qe(t)}
${Ee(t)}
${Fe(t)}
</main>
${Ve(t)}
${Be(t)}
<nav class="dock" aria-label="${e(r.cart.title)}">
  <a href="${e(O(t.channels[0],$))}" ${Y(t.channels[0])}>${p(t.channels[0],20)}<span>${e((N=r.via[t.channels[0]])!=null?N:"")}</span></a>
  <button type="button" class="primary" data-cart-open>${p("bag",20)}<span>${e(r.cart.title)}</span> <b class="badge" data-count hidden>0</b></button>
</nav>
</body>
</html>
`}function De({site:t,market:a,markets:n,t:o,url:s}){let r=[["#shop",o.nav.shop],["#farm",o.nav.farm],["#delivery",o.nav.delivery],["#visit",o.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${a.id}/`)}">
      ${t.logo?`<img src="${e(v(s,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${p("leaf",22)}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${r.map(([i,l])=>`<a href="${i}">${e(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${p("globe",18)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(Z(a))}</span></span></summary>
        <ul>${n.map(i=>`<li><a href="${s(`${i.id}/`)}" hreflang="${e(i.lang)}"${i.id===a.id?' aria-current="true"':""}>${e(i.country)} \xB7 ${e(i.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <button type="button" class="cart-btn" data-cart-open aria-label="${e(o.cart.title)}">${p("bag",20)}<span class="hide-sm">${e(o.cart.title)}</span><b class="badge" data-count hidden>0</b></button>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${p("menu",22)}</summary>
        <nav aria-label="Menu">${r.map(([i,l])=>`<a href="${i}">${e(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Se({site:t,t:a,L:n,url:o,money:s,freeFrom:r}){var d;let i=(d=t.delivery)!=null?d:{},l=[t.heroImage?v(o,t.heroImage):o("assets/photos/hero.webp"),o("assets/photos/hero-2.webp"),o("assets/photos/hero-3.webp")];return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${n(t.place)?`<p class="eyebrow">${p("pin",16)} ${e(n(t.place))}</p>`:""}
      <h1>${e(n(t.tagline))}</h1>
      ${n(t.intro)?`<p class="lead">${e(n(t.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#shop">${p("bag",18)} ${e(a.hero.shop)}</a>
        <a class="btn btn--line btn--lg" href="#farm">${e(a.hero.farm)}</a>
      </div>
      <ul class="promise">
        ${n(i.text)?`<li>${p("truck",18)} ${e(n(i.text))}</li>`:""}
        ${r?`<li>${p("check",18)} ${e(a.hero.free.replace("{amount}",s(r)))}</li>`:""}
        <li class="next-ship" data-next-ship data-tpl="${e(a.delivery.next)}" hidden>${p("calendar",18)} <span></span></li>
      </ul>
    </div>
    <div class="hero-ph">
      <img class="h1" src="${e(l[0])}" alt="" width="900" height="1100" fetchpriority="high">
      ${t.heroImage?"":`<img class="h2" src="${e(l[1])}" alt="" width="600" height="600"><img class="h3" src="${e(l[2])}" alt="" width="600" height="600">`}
    </div>
  </div>
</section>`}function ze({catalog:t,products:a,t:n,L:o,url:s}){var i;let r=((i=t.categories)!=null?i:[]).filter(l=>a.some(d=>d.category===l.id));return r.length<2?"":`<section class="section section--tight" aria-label="${e(n.shop.cats)}">
  <div class="wrap">
    <ul class="cats">${r.map(l=>`<li><a href="#shop" data-go-cat="${e(l.id)}">
      ${l.image?`<img sizes="auto, 120px" src="${e(v(s,l.image))}" alt="" width="400" height="400" loading="lazy">`:""}
      <span>${e(o(l.name))}</span><small>${a.filter(d=>d.category===l.id).length}</small></a></li>`).join("")}</ul>
  </div>
</section>`}function Ne({products:t,t:a,L:n,url:o,money:s}){let r=t.filter(i=>{var l;return((l=i.months)!=null?l:[]).length});return r.length?`<section class="section section--soft season-row" aria-labelledby="season-title" data-season hidden>
  <div class="wrap">
    <div class="head"><h2 id="season-title" class="h2">${e(a.season.title)} <span class="month" data-month></span></h2><p class="muted">${e(a.season.text)}</p></div>
    <div class="strip">${r.map(i=>{var l;return`<article class="mini" data-months="${e(((l=i.months)!=null?l:[]).join(","))}">
      <img sizes="auto, 180px" src="${e(v(o,i.image))}" alt="${e(n(i.name))}" width="600" height="600" loading="lazy">
      <div><h3>${e(n(i.name))}</h3><p>${e(s(i.variants[0].price))} <small>/ ${e(n(i.variants[0].label))}</small></p></div>
      <button type="button" class="add add--sm" data-add="${e(i.id)}" data-v="0" aria-label="${e(a.shop.add)}: ${e(n(i.name))}">${p("plus",18)}</button>
    </article>`}).join("")}</div>
  </div>
</section>`:""}function Pe({catalog:t,products:a,t:n,L:o,url:s,money:r}){var g;if(!a.length)return"";let i=((g=t.categories)!=null?g:[]).filter(c=>a.some(u=>u.category===c.id)),l=c=>{let u=i.findIndex(y=>y.id===c.category);return u<0?i.length:u},d=[...a].sort((c,u)=>l(c)-l(u)||(u.featured?1:0)-(c.featured?1:0)),h=c=>c.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase(),f=a.map(c=>({id:c.id,name:o(c.name),image:v(s,c.image),v:c.variants.map(u=>({l:o(u.label),p:u.price}))}));return`<section class="section" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="head head--row">
      <div><h2 id="shop-title" class="h2">${e(n.shop.title)}</h2><p class="muted">${e(n.shop.text)}</p></div>
      <label class="search">${p("search",18)}<input type="search" data-search placeholder="${e(n.shop.search)}" aria-label="${e(n.shop.search)}"></label>
    </div>
    ${i.length>1?`<div class="chips" role="group" aria-label="${e(n.shop.cats)}"><button type="button" class="chip" data-cat="" aria-pressed="true">${e(n.shop.all)} <span>${a.length}</span></button>${i.map(c=>`<button type="button" class="chip" data-cat="${e(c.id)}" aria-pressed="false">${e(o(c.name))} <span>${a.filter(u=>u.category===c.id).length}</span></button>`).join("")}</div>`:""}
    <div class="grid" data-grid>${d.map((c,u)=>{var y;return`<article class="card${u>=G?" more":""}" data-c="${e(c.category)}" data-q="${e(h(`${o(c.name)} ${o(c.origin)}`))}" data-months="${e(((y=c.months)!=null?y:[]).join(","))}">
      <figure class="card-ph">
        <img sizes="auto, (max-width: 640px) 50vw, 280px" src="${e(v(s,c.image))}" alt="${e(o(c.name))}" width="600" height="600" loading="lazy">
        ${c.image2?`<img class="alt" sizes="auto, (max-width: 640px) 50vw, 280px" src="${e(v(s,c.image2))}" alt="" width="600" height="600" loading="lazy">`:""}
        ${c.featured?`<span class="tag tag--hot">${e(n.shop.best)}</span>`:""}<span class="tag tag--season" hidden>${e(n.shop.inSeason)}</span>
      </figure>
      <div class="card-body">
        ${o(c.origin)?`<p class="origin">${p("pin",13)} ${e(o(c.origin))}</p>`:""}
        <h3>${e(o(c.name))}</h3>
        ${o(c.description)?`<p class="desc">${e(o(c.description))}</p>`:""}
        ${c.variants.length>1?`<div class="vars" role="radiogroup" aria-label="${e(n.shop.size)}">${c.variants.map((k,$)=>`<button type="button" class="var" data-vi="${$}" aria-pressed="${$===0}">${e(o(k.label))}</button>`).join("")}</div>`:""}
        <div class="buy-row">
          <p class="price"><b data-price>${e(r(c.variants[0].price))}</b> <small data-unit>/ ${e(o(c.variants[0].label))}</small></p>
          <button type="button" class="add" data-add="${e(c.id)}" data-v="0" aria-label="${e(n.shop.add)}: ${e(o(c.name))}">${p("plus",20)}</button>
        </div>
      </div>
    </article>`}).join("")}</div>
    <p class="empty" data-empty hidden>${e(n.shop.empty)}</p>
    ${d.length>G?`<p class="center more-wrap"><button type="button" class="btn btn--line" data-more>${e(n.shop.more)} <span data-left>(${d.length-G})</span></button></p>`:""}
    <script type="application/json" id="kp-products">${JSON.stringify(f).replace(/</g,"\\u003c")}<\/script>
  </div>
</section>`}function Ce({site:t,t:a,L:n,url:o}){var i,l;let s=(i=t.farm)!=null?i:{};if(!n(s.title))return"";let r=((l=s.facts)!=null?l:[]).filter(d=>n(d==null?void 0:d.value));return`<section class="section section--green" id="farm" aria-labelledby="farm-title">
  <div class="wrap farm">
    ${s.image?`<figure class="farm-ph"><img sizes="auto, (max-width: 1000px) 100vw, 560px" src="${e(v(o,s.image))}" alt="${e(n(s.title))}" width="1000" height="750" loading="lazy"></figure>`:""}
    <div class="farm-copy">
      <p class="kicker">${e(a.farm.kicker)}</p>
      <h2 id="farm-title" class="h2">${e(n(s.title))}</h2>
      ${n(s.text)?`<p class="lead">${e(n(s.text))}</p>`:""}
      ${r.length?`<ul class="facts">${r.map(d=>`<li><b>${e(n(d.value))}</b><span>${e(n(d.label))}</span></li>`).join("")}</ul>`:""}
    </div>
  </div>
</section>`}function Te({site:t,t:a,L:n}){var s;let o=((s=t.steps)!=null?s:[]).filter(r=>n(r==null?void 0:r.title));return o.length?`<section class="section" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="head"><h2 id="steps-title" class="h2">${e(a.steps.title)}</h2></div>
    <ol class="steps">${o.map((r,i)=>{var l;return`<li><span class="step-i">${p((l=r.icon)!=null?l:"check",24)}</span><span class="step-n">${String(i+1).padStart(2,"0")}</span><strong>${e(n(r.title))}</strong>${n(r.text)?`<p class="muted">${e(n(r.text))}</p>`:""}</li>`}).join("")}</ol>
  </div>
</section>`:""}function je({site:t,t:a,L:n,money:o,fee:s,freeFrom:r}){var d,h,f;let i=(d=t.delivery)!=null?d:{},l=((h=i.days)!=null?h:[]).length;return!l&&!n(i.areas)?"":`<section class="section section--soft" id="delivery" aria-labelledby="del-title">
  <div class="wrap">
    <div class="head"><h2 id="del-title" class="h2">${e(a.delivery.title)}</h2></div>
    <ul class="del">
      ${l?`<li>${p("calendar",26)}<strong>${e(a.delivery.days)}</strong><span>${e(i.days.length===7?a.everyDay:L([...i.days].sort((g,c)=>(g||7)-(c||7)),a.days))}</span><span class="next-ship" data-next-ship data-tpl="${e(a.delivery.next)}" hidden><span></span></span></li>`:""}
      <li>${p("clock",26)}<strong>${e(a.delivery.cutoff)}</strong><span>${e(a.delivery.cutoffText.replace("{time}",(f=i.cutoff)!=null?f:"20:00"))}</span></li>
      <li>${p("truck",26)}<strong>${e(a.delivery.fee)}</strong><span>${s?e(o(s)):e(a.delivery.freeShip)}${r?` \xB7 ${e(a.hero.free.replace("{amount}",o(r)))}`:""}</span></li>
      ${n(i.areas)?`<li>${p("pin",26)}<strong>${e(a.delivery.areas)}</strong><span>${e(n(i.areas))}</span></li>`:""}
    </ul>
  </div>
</section>`}function Re({site:t,t:a,url:n}){var s;let o=((s=t.album)!=null?s:[]).filter(r=>r==null?void 0:r.image);return o.length?`<section class="section" id="album" aria-labelledby="album-title">
  <div class="wrap">
    <div class="head"><h2 id="album-title" class="h2">${e(a.album.title)}</h2><p class="muted">${e(a.album.text)}</p></div>
    <div class="album" data-album>${o.map((r,i)=>{let l=e(v(n,r.image));return`<a class="ph${i>=H?" more":""}" href="${l}"><img sizes="auto, (max-width: 640px) 50vw, 300px" src="${l}" alt="${e(`${t.name} ${i+1}`)}" width="1000" height="750" loading="lazy"></a>`}).join("")}</div>
    ${o.length>H?`<p class="center"><button type="button" class="btn btn--line" data-album-more>${e(a.album.more)} <span>(${o.length-H})</span></button></p>`:""}
  </div>
  <dialog class="lb" data-lightbox aria-label="${e(a.album.title)}">
    <img alt="" data-lb-img>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${e(a.album.close)}">\u2715</button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${e(a.album.prev)}">${p("arrow",22,'style="transform:scaleX(-1)"')}</button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${e(a.album.next)}">${p("arrow",22)}</button>
  </dialog>
</section>`:""}function qe({site:t,t:a,L:n,lang:o}){let s=ee(t,a,o,"btn btn--line"),r=te(t);return t.showReviews===!1||!r.length&&!s?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(a.reviews)}</h2>
    ${oe(r,o,"quotes",i=>`<figure class="quote">
      ${i.rating?`<div class="stars" aria-label="${i.rating}/5">${Array.from({length:5},(l,d)=>`<span class="${d<i.rating?"on":""}">${p("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(n(i.text))}</blockquote>
      <figcaption>${e(i.name)}${ne(i,o)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Ee({site:t,t:a,L:n}){var i,l,d;let o=(i=t.contact)!=null?i:{},s=encodeURIComponent((l=o.mapQuery)!=null?l:n(o.address)),r=h=>h.length===7?a.everyDay:L(h,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${Q(t,a)}
      ${((d=t.hours)!=null?d:[]).length?`<table class="hours"><tbody>${t.hours.map(h=>`<tr><th scope="row">${e(r(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(o.address)?`<p class="addr">${p("pin",18)} ${e(n(o.address))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(a.visit.directions)} ${p("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Fe({site:t,t:a,L:n}){var s;let o=((s=t.faq)!=null?s:[]).filter(r=>n(r==null?void 0:r.q));return o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div class="qa">${o.map((r,i)=>`<details${i===0?" open":""}><summary>${e(n(r.q))}</summary><p>${e(n(r.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ve({site:t,t:a,L:n,market:o}){var i,l;let s=(i=t.contact)!=null?i:{},r=Object.entries((l=t.social)!=null?l:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${s.phone?`<li><a href="tel:${x(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${n(s.address)?`<li>${e(n(s.address))}</li>`:""}</ul></div>
    ${r.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${r.map(([d,h])=>`<li><a href="${e(h)}" target="_blank" rel="noopener">${e(d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${re(t,a,o.lang)}</div>
</footer>`}function Be({site:t,t:a,channels:n,gform:o}){var d;let s=(d=t.contact)!=null?d:{},r=a.order,i=o?` data-gform="${e(o.action)}" data-gmap='${e(JSON.stringify(o.fields))}'`:"",l=n.map((h,f)=>{var g;return`<button type="button" class="btn ${f===0?"btn--primary":"btn--line"}" data-channel="${e(h)}" data-href="${e(O(h,s,""))}">${p(h,18)} ${e((g=a.via[h])!=null?g:h)}</button>`}).join("");return`<dialog class="drawer" data-cart aria-labelledby="cart-title">
  <div class="drawer-in">
    <div class="drawer-head"><h2 id="cart-title">${p("bag",22)} ${e(a.cart.title)}</h2><button type="button" class="x" data-cart-close aria-label="${e(a.album.close)}">\u2715</button></div>
    <div class="free" data-free hidden><p data-free-text data-tpl="${e(a.cart.toFree)}" data-done="${e(a.cart.gotFree)}"></p><span class="free-bar"><span data-free-bar></span></span></div>
    <ul class="lines" data-lines></ul>
    <p class="cart-empty" data-cart-empty>${e(a.cart.empty)}</p>
    <dl class="sum" data-sum hidden>
      <div><dt>${e(a.cart.subtotal)}</dt><dd data-subtotal></dd></div>
      <div><dt>${e(a.cart.ship)}</dt><dd data-ship data-free-label="${e(a.delivery.freeShip)}"></dd></div>
      <div class="total"><dt>${e(a.cart.total)}</dt><dd data-total></dd></div>
    </dl>
    <form class="form" data-order novalidate${i} data-order-text="${e(r.message)}" hidden>
      <div class="order-fields">
        <div class="row2">
          <label class="field"><span>${e(r.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(r.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(r.address)} *</span><input name="address" autocomplete="street-address" required maxlength="200"></label>
        <label class="field"><span>${e(r.date)}</span><select name="date" data-ship-days data-tpl="${e(r.dayTpl)}"><option>${e(r.asap)}</option></select></label>
        <label class="field"><span>${e(r.note)}</span><textarea name="note" rows="2" maxlength="300" placeholder="${e(r.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(r.required)}</p>
        <button class="btn btn--primary btn--lg btn--block" type="submit" data-submit data-sending="${e(r.sending)}">${e(r.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${p(o?"check":"arrow",22)} ${e(o?r.done:r.stepTitle)}</p>
        <p>${e(o?r.doneText:r.stepText)}</p>
        ${o?"":`<div class="buy">${l}</div><button type="button" class="link" data-edit>${e(r.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</dialog>
<div class="toast" data-toast role="status" aria-live="polite" hidden></div>
<template data-tpl-added>${e(a.cart.added)}</template>`}function Ae({site:t,market:a,L:n,abs:o,url:s,products:r,catalog:i}){var d,h,f;let l=(d=t.contact)!=null?d:{};return{"@context":"https://schema.org","@type":"GroceryStore",name:t.name,url:o(`${a.id}/`),description:n(t.intro),image:new URL(le(t,s),o("")).href,telephone:l.phone,email:l.email,address:{"@type":"PostalAddress",streetAddress:n(l.address)},openingHoursSpecification:J((h=t.hours)!=null?h:[]),currenciesAccepted:a.currency,hasOfferCatalog:{"@type":"OfferCatalog",name:t.name,itemListElement:((f=i.categories)!=null?f:[]).filter(g=>r.some(c=>c.category===g.id)).map(g=>({"@type":"OfferCatalog",name:n(g.name),itemListElement:r.filter(c=>c.category===g.id).map(c=>({"@type":"Offer",price:c.variants[0].price,priceCurrency:a.currency,itemOffered:{"@type":"Product",name:n(c.name),image:new URL(v(s,c.image),o("")).href,description:n(c.description)||n(c.name)}}))}))}}}export{Xe as renderSite};
