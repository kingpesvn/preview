var Se={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>Se[t]);function W(a,t,n="vi"){var o,r,s;return a==null?"":typeof a!="object"?String(a):(s=(r=(o=a[t])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?s:""}var Pe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},Y=a=>{var t;return(t=Pe[a])!=null?t:"en-US"};function je(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function B(a,t){var o,r;if(t.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:je(a.basePrice*t.rate,t.rounding)}var Ne=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function Q(a,t){let n={style:"currency",currency:t.currency};return Ne.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(Y(t.lang),n).format(a)}function ee(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var F=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,C=(a,t)=>{let n=F(t);return n==null?t:a(n)},R=(a="")=>String(a).replace(/\D/g,"");function X(a,t,n=""){switch(a){case"phone":return`tel:${R(t.phone)}`;case"zalo":return`https://zalo.me/${R(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${R(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var A=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,Ce=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function te(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,s]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=s.trim().replace(/^\{|\}$/g,"").toLowerCase();Ce.includes(i)&&(o[i]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var q={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Te={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},f=(a,t=20,n="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=Te[a])!=null?o:""}</svg>`},_=[1,2,3,4,5,6,0],Ee=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function oe(a,t){let n=a.map(r=>_.indexOf(r)).sort((r,s)=>r-s);return n.every((r,s)=>s===0||r===n[s-1]+1)&&n.length>2?`${t[_[n[0]]]} \u2013 ${t[_[n.at(-1)]]}`:n.map(r=>t[_[r]]).join(", ")}var re=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>Ee[n]),opens:t.open,closes:t.close}));function se(a){var n,o;return(o=(n=new Intl.NumberFormat(Y(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var ie=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',le=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,ce=(a,t)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((n=a.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},ae={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Le=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Re=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&Le.test(n.hostname)?n.href:""}catch{return""}},pe=(a,t,n,o="btn btn--line")=>{var i;let r=Re(a);if(!r)return"";let s=typeof t.reviews=="object"&&((i=t.reviews)==null?void 0:i.google)||ae[n]||ae.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${f("star",16)} ${e(s)}</a></p>`},K={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},de={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},he=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ue(a,t){var s,i,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=a==null?void 0:a.date)!=null?s:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((c=de[t])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function qe(a,t){var i,c;let n=a.filter(l=>l.rating>=1&&l.rating<=5);if(n.length<2)return"";let o=n.reduce((l,d)=>l+Number(d.rating),0)/n.length,r=(i=K[t])!=null?i:K.en,s=new Intl.NumberFormat((c=de[t])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${f("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function me(a,t,n,o){var i;if(!a.length)return"";let r=(i=K[t])!=null?i:K.en,s=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?r.prev:r.next)}">${f("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${qe(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${Be}`}var Be=`<style>
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
upd()}})()<\/script>`,ne={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function ge(a){var o;let t=(o=ne[a])!=null?o:ne.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(t.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(t.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${f("share",15)} ${e(t.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${f("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${f("link",15)} <span>${e(t.copy)}</span></button>
    </div>`}var fe=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function be({site:a,markets:t,url:n,abs:o}){var i;let r=(i=t.find(c=>c.default))!=null?i:t[0],s=t.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
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
  var markets = ${JSON.stringify(s)}, root = ${JSON.stringify(n(""))};
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
`}var Fe="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ke=24,xe=["XS","S","M","L","XL","XXL"],ve={black:"#1C1C1C",white:"#F4F1EA",blue:"#2E6FB5",green:"#2E8B6E",red:"#D2413A",pink:"#E77FA3",yellow:"#F2C14E",print:"conic-gradient(#E77FA3 0 25%, #F2C14E 0 50%, #2E8B6E 0 75%, #2E6FB5 0)"};function we(a,t){var n;return((n=a.products)!=null?n:[]).map(o=>{var r;return{...o,variants:((r=o.variants)!=null?r:[]).map(s=>({...s,price:B(s,t)})).filter(s=>s.price!=null)}}).filter(o=>o.variants.length>0).map(o=>{let r=Math.min(...o.variants.map(i=>i.price)),s=o.was?B({basePrice:o.was,prices:o.wasPrices},t):null;return{...o,from:r,was:s&&s>r?s:null}})}function Ae(a){let t=a.filter(s=>s.badge||s.was),n=a.filter(s=>!t.includes(s)),o=[...new Set(n.map(s=>s.category))].map(s=>n.filter(i=>i.category===s)),r=[...t];for(let s=0;r.length<a.length;s++)for(let i of o)i[s]&&r.push(i[s]);return r}var Me=a=>String(a).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();function Oe(a){let t=10**Math.floor(Math.log10(a));return[1,2,2.5,5,10].map(n=>n*t).reduce((n,o)=>Math.abs(o-a)<Math.abs(n-a)?o:n)}function Ve(a){let t=a.map(o=>o.from).sort((o,r)=>o-r),n=[...new Set([.25,.5,.75].map(o=>Oe(t[Math.floor(o*(t.length-1))])))];return n.map((o,r)=>[r?n[r-1]:0,o]).concat([[n[n.length-1],1/0]])}function vt({site:a,catalog:t,i18n:n,template:o,basePath:r="/",siteUrl:s=a.domain}){var p,h,g,w,M,S,z,P,j,D,u,k;let i=ee(r),c=b=>new URL(i(b),s).href,l=t.markets,d=(b,N)=>`${N.id}/${W(b.slug,N.lang,"en")}/`,m=te(a.orderForm),y=m&&!m.error?m:null,$=[];for(let b of l){let N=b.lang,J=(h=(p=n[N])!=null?p:n.en)!=null?h:n.vi,O=x=>W(x,N,"en"),L=we(t,b),V=(w=(g=a.orderChannels)==null?void 0:g[b.id])!=null?w:["phone"],I=x=>Q(x,b),G=x=>{var E;return((E=t.collections)!=null?E:[]).find(Z=>Z.id===x.category)},H=((M=t.collections)!=null?M:[]).filter(x=>L.some(E=>E.category===x.id)),T=(S=a.shipping)!=null?S:{},U={fee:(j=(P=(z=T.prices)==null?void 0:z[b.id])==null?void 0:P.fee)!=null?j:T.fee!=null?B({basePrice:T.fee},b):0,free:(k=(u=(D=T.prices)==null?void 0:D[b.id])==null?void 0:u.freeFrom)!=null?k:T.freeFrom!=null?B({basePrice:T.freeFrom},b):null},v={site:a,catalog:t,market:b,markets:l,lang:N,t:J,L:O,url:i,abs:c,channels:V,money:I,items:L,productPath:d,template:o,col:G,collections:H,gform:y,ship:U};$.push({path:`${b.id}/index.html`,html:ye(v,{kind:"home"})});for(let x of L)$.push({path:`${d(x,b)}index.html`,html:ye(v,{kind:"product",product:x})})}return $.push({path:"index.html",html:be({site:a,markets:l,url:i,abs:c})}),$}function ye(a,t){var O,L,V,I,G,H,T,U;let{site:n,market:o,markets:r,lang:s,t:i,L:c,url:l,abs:d,catalog:m,productPath:y,gform:$,money:p}=a,h=t.kind==="home",g=t.product,w=h?`${o.id}/`:y(g,o),M=h?`${n.name} \xB7 ${c(n.tagline)}`:`${c(g.name)} \xB7 ${n.name}`,S=h?c(n.intro):`${c(g.description)} ${p(g.from)}.`,z=r.map(v=>{var x;return h?{m:v,href:`${v.id}/`}:we({products:[((x=m.products)!=null?x:[]).find(E=>E.id===g.id)]},v).length?{m:v,href:y(g,v)}:null}).filter(Boolean),P=v=>{var x,E;return(E=(x=z.find(Z=>Z.m.id===v.id))==null?void 0:x.href)!=null?E:`${v.id}/`},j=(O=r.find(v=>v.default))!=null?O:r[0],D=(L=n.theme)!=null?L:{},u=["primary","ink","bg","surface","soft","accent"].filter(v=>D[v]).map(v=>`--${v}:${D[v]}`).join(";"),k=r.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:l(P(v))})),b=(V=n.contact)!=null?V:{},N=d(F(h?n.heroImage||((I=a.items[0])==null?void 0:I.image):g.image)),J=$?` data-gform="${e($.action)}" data-gmap='${e(JSON.stringify($.fields))}'`:"";return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(M)}</title>
<meta name="description" content="${e(S)}">
<link rel="canonical" href="${d(w)}">
${z.map(({m:v,href:x})=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${d(x)}">`).join(`
`)}
${z.some(v=>v.m.id===j.id)?`<link rel="alternate" hreflang="x-default" href="${d(P(j))}">`:""}
<meta property="og:type" content="${h?"website":"product"}">
<meta property="og:title" content="${e(M)}">
<meta property="og:description" content="${e(S)}">
<meta property="og:url" content="${d(w)}">
<meta property="og:image" content="${e(N)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((G=D.primary)!=null?G:"#0E5E6F")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Fe}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${u}}</style>
${h?A(at(a))+(((H=n.faq)!=null?H:[]).length?A(nt(a)):""):A(ot(a,g))+A(rt(a,g))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(o.id)}" data-markets='${e(JSON.stringify(k))}' data-copied="${e(i.copied)}" data-wa="${e(R((T=b.whatsapp)!=null?T:""))}" data-email="${e((U=b.email)!=null?U:"")}" data-store="${e(`kp-swim-${Me(n.name).replace(/[^a-z0-9]+/g,"")}-${o.id}`)}" data-currency="${e(o.currency)}" data-lang="${e(s)}">
<a class="skip" href="#main">${e(i.skip)}</a>
${le(i)}
${c(n.announcement)?`<p class="announce">${f("sun",15)} ${e(c(n.announcement))}</p>`:""}
${Ie(a,h)}
<main id="main">
${h?[Ge,He,Ue,We,_e,Ke,Je,Ze,Ye].map(v=>v(a)).join(`
`):Xe(a,g)}
</main>
${tt(a)}
${et(a,J)}
<nav class="dock" aria-label="${e(i.bag.title)}">
  <a href="${h?"":l(`${o.id}/`)}#shop">${f("search",20)}<span>${e(i.nav.shop)}</span></a>
  <button type="button" class="primary" data-bag-open>${f("bag",20)}<span>${e(i.bag.title)}</span><b class="bag-n" data-bag-count hidden>0</b></button>
</nav>
</body>
</html>
`}function Ie({site:a,market:t,markets:n,t:o,url:r},s){let i=s?"":r(`${t.id}/`),c=[[`${i}#collections`,o.nav.collections],[`${i}#shop`,o.nav.shop],[`${i}#size`,o.nav.size],[`${i}#care`,o.nav.care],[`${i}#visit`,o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(C(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${f("sun",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${c.map(([l,d])=>`<a href="${l}">${e(d)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${f("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(se(t))}</span></span></summary>
        <ul>${n.map(l=>`<li><a href="${r(`${l.id}/`)}" hreflang="${e(l.lang)}"${l.id===t.id?' aria-current="true"':""}>${e(l.country)} \xB7 ${e(l.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <button type="button" class="bagbtn" data-bag-open aria-label="${e(o.bag.title)}">${f("bag",20)}<b class="bag-n" data-bag-count hidden>0</b></button>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${f("menu",22)}</summary>
        <nav aria-label="Menu">${c.map(([l,d])=>`<a href="${l}">${e(d)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Ge({site:a,t,L:n,url:o,items:r}){var i;let s=a.heroImage||((i=r[0])==null?void 0:i.image);return`<section class="hero">
  ${s?`<img class="hero-img" src="${e(C(o,s))}" alt="" width="1600" height="1000" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${n(a.heroKicker)?`<p class="kicker">${e(n(a.heroKicker))}</p>`:""}
    <h1>${e(n(a.tagline))}</h1>
    <p class="lead">${e(n(a.intro))}</p>
    <div class="actions">
      <a class="btn btn--accent btn--lg" href="#shop">${e(t.hero.shop)} ${f("arrow",18)}</a>
      <a class="btn btn--light btn--lg" href="#size">${f("ruler",18)} ${e(t.hero.size)}</a>
    </div>
  </div>
  <svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v40H0z"/></svg>
</section>`}function He({collections:a,items:t,t:n,L:o,url:r}){if(!a.length)return"";let s=a.length%2===1;return`<section class="section" id="collections" aria-labelledby="col-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.collections.kicker)}</p><h2 id="col-title" class="h2">${e(n.collections.title)}</h2></div>
    <ul class="cols${s?"":" cols--even"}">${a.map((i,c)=>{var d,m;let l=(m=i.image)!=null?m:(d=t.find(y=>y.category===i.id))==null?void 0:d.image;return`<li${c===0&&s?' class="col--big"':""}><a href="?type=${e(i.id)}#shop" data-filter-link="type" data-value="${e(i.id)}">
        ${l?`<img sizes="${q.card}" src="${e(C(r,l))}" alt="" width="900" height="1100" loading="lazy">`:""}
        <span class="col-copy"><b>${e(o(i.name))}</b>${o(i.text)?`<small>${e(o(i.text))}</small>`:""}<em>${e(n.collections.count.replace("{n}",t.filter(y=>y.category===i.id).length))} ${f("arrow",16)}</em></span>
      </a></li>`}).join("")}</ul>
  </div>
</section>`}function ze(a,t,n=0){var p,h,g,w,M,S,z,P,j,D,u,k;let{t:o,L:r,url:s,money:i,productPath:c,market:l,col:d}=a,m=[r(t.name),(p=t.name)==null?void 0:p.vi,(h=t.name)==null?void 0:h.en,r((g=d(t))==null?void 0:g.name),...((w=t.colors)!=null?w:[]).map(b=>r(b.name)),(M=o.for[t.for])!=null?M:""].filter(Boolean).join(" "),y=((S=t.sizes)!=null?S:[]).filter(b=>{var N;return!((N=t.soldOut)!=null&&N.includes(b))}),$=(z=t.images)==null?void 0:z[0];return`<li class="card${n>=ke?" is-more":""}" data-type="${e(t.category)}" data-for="${e((P=t.for)!=null?P:"unisex")}" data-sz="${e(y.join(" "))}" data-color="${e([...new Set(((j=t.colors)!=null?j:[]).map(b=>b.family))].join(" "))}" data-price="${t.from}" data-name="${e(Me(m))}">
  <a class="card-link" href="${s(c(t,l))}">
    <div class="card-img${$?" has-alt":""}">
      <img sizes="${q.card}" src="${e(C(s,t.image))}" alt="${e(r(t.name))}" width="1000" height="1250" loading="lazy">
      ${$?`<img sizes="${q.card}" class="alt" src="${e(C(s,$))}" alt="" width="1000" height="1250" loading="lazy">`:""}
      ${t.was?`<span class="tag tag--sale">-${Math.round((1-t.from/t.was)*100)}%</span>`:r(t.badge)?`<span class="tag">${e(r(t.badge))}</span>`:""}
    </div>
    <p class="card-cat">${e(r((D=d(t))==null?void 0:D.name))}${t.for&&t.for!=="unisex"&&o.for[t.for]!==r((u=d(t))==null?void 0:u.name)?` \xB7 ${e(o.for[t.for])}`:""}</p>
    <h3>${e(r(t.name))}</h3>
    <p class="card-price"><b>${e(i(t.from))}</b>${t.was?` <s>${e(i(t.was))}</s>`:""}</p>
    ${((k=t.colors)==null?void 0:k.length)>1?`<p class="dots" aria-hidden="true">${t.colors.map(b=>`<i style="background:${e(b.hex)}"></i>`).join("")}</p>`:""}
  </a>
</li>`}function Ue(a){let{items:t,collections:n,t:o,L:r,money:s}=a,i=["women","men","kids"].filter(p=>t.some(h=>h.for===p)),c=xe.filter(p=>t.some(h=>{var g;return(g=h.sizes)==null?void 0:g.includes(p)})),l=[...new Set(t.filter(p=>p.for==="kids").flatMap(p=>{var h;return(h=p.sizes)!=null?h:[]}))],d=Object.keys(ve).filter(p=>t.some(h=>{var g;return(g=h.colors)==null?void 0:g.some(w=>w.family===p)})),m=t.length>4?Ve(t):[],y=([p,h])=>p?h===1/0?o.shop.over.replace("{a}",s(p)):`${s(p)} \u2013 ${s(h)}`:o.shop.under.replace("{b}",s(h)),$=(p,h,g,w)=>`<label class="select"><span class="lab">${e(h)}</span><select ${p}><option value="">${e(g)}</option>${w}</select></label>`;return`<section class="section section--soft" id="shop" aria-labelledby="shop-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(o.shop.kicker)}</p><h2 id="shop-title" class="h2">${e(o.shop.title)}</h2>
      <p class="muted" data-count="${e(o.shop.count)}">${e(o.shop.count.replace("{n}",t.length))}</p></div>
    <div class="toolbar" data-toolbar>
      <div class="chips" role="group" aria-label="${e(o.shop.type)}">
        <button type="button" class="pill is-on" data-type="">${e(o.shop.all)}</button>
        ${n.map(p=>`<button type="button" class="pill" data-type="${e(p.id)}">${e(r(p.name))}</button>`).join("")}
      </div>
      <div class="filters">
        <label class="search">${f("search",18)}<input type="search" placeholder="${e(o.search)}" aria-label="${e(o.search)}" data-search></label>
        ${i.length>1?$("data-forf",o.shop.for,o.shop.anyFor,i.map(p=>`<option value="${p}">${e(o.for[p])}</option>`).join("")):""}
        ${c.length||l.length?$("data-szf",o.shop.size,o.shop.anySize,`${c.map(p=>`<option value="${e(p)}">${e(p)}</option>`).join("")}${l.length?`<optgroup label="${e(o.for.kids)}">${l.map(p=>`<option value="${e(p)}">${e(p)}</option>`).join("")}</optgroup>`:""}`):""}
        ${m.length?$("data-band",o.shop.price,o.shop.anyPrice,m.map(p=>`<option value="${p[0]}-${p[1]===1/0?"":p[1]}">${e(y(p))}</option>`).join("")):""}
        ${$("data-sort",o.shop.sort,o.shop.sortPop,`<option value="asc">${e(o.shop.sortLow)}</option><option value="desc">${e(o.shop.sortHigh)}</option>`)}
      </div>
      ${d.length>1?`<div class="swatch-row" role="group" aria-label="${e(o.shop.color)}"><span class="lab">${e(o.shop.color)}</span>${d.map(p=>{var h,g;return`<button type="button" class="fam" data-color="${p}" aria-pressed="false" title="${e((h=o.colors[p])!=null?h:p)}" style="background:${ve[p]}"><span class="sr">${e((g=o.colors[p])!=null?g:p)}</span></button>`}).join("")}</div>`:""}
      <p class="mysize" data-mysize hidden><span data-mysize-text data-tpl="${e(o.size.mine)}"></span> <button type="button" class="link" data-mysize-filter>${e(o.size.filterMine)}</button></p>
    </div>
    <ul class="grid" data-grid>${Ae(t).map((p,h)=>ze(a,p,h)).join("")}</ul>
    <p class="empty muted" data-empty hidden>${e(o.shop.empty)}</p>
    ${t.length>ke?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(o.shop.more)}</button></div>`:""}
  </div>
</section>`}function De({catalog:a,t}){var o;let n=a.sizeChart;return(o=n==null?void 0:n.rows)!=null&&o.length?`<div class="chart-wrap"><table class="chart" data-chart><thead><tr>${n.cols.map(r=>{var s;return`<th scope="col">${e((s=t.size.cols[r])!=null?s:r.toUpperCase())}</th>`}).join("")}</tr></thead>
    <tbody>${n.rows.map(r=>`<tr data-key="${e(r[0])}" data-bust="${e(String(r[n.cols.indexOf("bust")]).split("\u2013").pop())}" data-hip="${e(String(r[n.cols.indexOf("hip")]).split("\u2013").pop())}">${r.map((s,i)=>i?`<td>${e(s!=null?s:"\u2013")}</td>`:`<th scope="row">${e(s)}</th>`).join("")}</tr>`).join("")}</tbody></table></div>`:""}function We(a){var i,c;let{catalog:t,t:n,L:o,site:r}=a;if(!((c=(i=t.sizeChart)==null?void 0:i.rows)!=null&&c.length))return"";let s=n.size;return`<section class="section" id="size" aria-labelledby="size-title">
  <div class="wrap size-wrap">
    <div class="sec-head sec-head--left"><p class="kicker">${e(s.kicker)}</p><h2 id="size-title" class="h2">${e(s.title)}</h2><p class="lead">${e(o(r.sizeIntro)||s.text)}</p>
      <ol class="how">${s.steps.map((l,d)=>`<li><span>${d+1}</span>${e(l)}</li>`).join("")}</ol></div>
    <div>
      <form class="finder" data-finder novalidate>
        <div class="row2">
          <label class="cm"><span>${e(s.bust)}</span><span class="in"><input type="number" name="bust" min="60" max="140" step="0.5" inputmode="decimal" placeholder="86"><b>cm</b></span></label>
          <label class="cm"><span>${e(s.hip)}</span><span class="in"><input type="number" name="hip" min="60" max="150" step="0.5" inputmode="decimal" placeholder="94"><b>cm</b></span></label>
        </div>
        <output class="result" data-result data-tpl="${e(s.result)}" data-none="${e(s.none)}" data-between="${e(s.between)}" aria-live="polite">${e(s.hint)}</output>
        <button type="button" class="btn btn--accent" data-save hidden>${f("heart",18)} ${e(s.save)}</button>
      </form>
      <details class="charts" open><summary>${e(s.table)}</summary>${De(a)}<p class="muted small">${e(o(t.sizeNote)||s.note)}</p></details>
    </div>
  </div>
</section>`}function _e({site:a,t,L:n,url:o}){var s;let r=((s=a.care)!=null?s:[]).filter(i=>n(i==null?void 0:i.title));return r.length?`<section class="section section--deep" id="care" aria-labelledby="care-title">
  <div class="wrap care">
    ${a.careImage?`<img sizes="${q.wide}" src="${e(C(o,a.careImage))}" alt="" width="1000" height="1200" loading="lazy">`:""}
    <div>
      <p class="kicker">${e(t.care.kicker)}</p>
      <h2 id="care-title" class="h2">${e(t.care.title)}</h2>
      <ol class="care-list">${r.map(i=>{var c;return`<li>${f((c=i.icon)!=null?c:"drop",22)}<div><b>${e(n(i.title))}</b><p>${e(n(i.text))}</p></div></li>`}).join("")}</ol>
    </div>
  </div>
</section>`:""}function Ke({site:a,L:t}){var o;let n=((o=a.perks)!=null?o:[]).filter(r=>t(r==null?void 0:r.title));return n.length?`<section class="perks" aria-label="${e(a.name)}"><ul class="wrap perk-list">${n.map(r=>{var s;return`<li>${f((s=r.icon)!=null?s:"check",22)}<div><b>${e(t(r.title))}</b>${t(r.text)?`<span>${e(t(r.text))}</span>`:""}</div></li>`}).join("")}</ul></section>`:""}function Je({site:a,t,L:n,lang:o}){let r=pe(a,t,o,"btn btn--line"),s=he(a);return a.showReviews===!1||!s.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${me(s,o,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(c,l)=>`<span class="${l<i.rating?"on":""}">${f("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(i.text))}</blockquote>
      <figcaption>${e(i.name)}${n(i.bought)?`<small>${e(n(i.bought))}</small>`:""}${ue(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ze({site:a,t,L:n}){var r;let o=((r=a.faq)!=null?r:[]).filter(s=>n(s==null?void 0:s.q));return o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${o.map((s,i)=>`<details${i===0?" open":""}><summary>${e(n(s.q))}</summary><p>${e(n(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ye({site:a,t,L:n,channels:o}){var c,l,d;let r=(c=a.contact)!=null?c:{},s=encodeURIComponent((l=r.mapQuery)!=null?l:n(r.address)),i=m=>m.length===7?t.visit.everyDay:oe(m,t.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${ce(a,t)}
      ${((d=a.hours)!=null?d:[]).length?`<table class="hours"><tbody>${a.hours.map(m=>`<tr><th scope="row">${e(i(m.days))}</th><td>${e(m.open)} \u2013 ${e(m.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${f("pin",18)} ${e(n(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(t.visit.directions)} ${f("arrow",16)}</a>
        ${o.map(m=>{var y;return`<a class="btn btn--line" href="${e(X(m,r))}" ${ie(m)}>${f(m,18)} ${e((y=t.via[m])!=null?y:m)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Xe(a,t){var S,z,P,j,D;let{site:n,t:o,L:r,url:s,money:i,market:c,items:l,col:d}=a,m=d(t),y=((S=t.pairs)!=null?S:[]).map(u=>l.find(k=>k.id===u)).filter(Boolean),$=[...y,...l.filter(u=>u.id!==t.id&&!y.includes(u)&&u.category===t.category),...l.filter(u=>u.id!==t.id&&!y.includes(u)&&u.category!==t.category&&u.for===t.for)].filter((u,k,b)=>b.indexOf(u)===k).slice(0,8),p=s(`${c.id}/`),h=u=>typeof u=="object"?r(u):String(u),g=(z=t.sizes)!=null?z:[],w=t.variants[0],M=(P=t.specs)!=null?P:[];return`<div class="wrap crumbs"><a href="${p}">${e(o.nav.home)}</a>${f("chevron",14)}<a href="${p}?type=${e(t.category)}#shop">${e(r(m==null?void 0:m.name))}</a>${f("chevron",14)}<span aria-current="page">${e(r(t.name))}</span></div>
<section class="wrap pdp-grid">
  ${Qe(a,t)}
  <div class="pdp" data-product data-id="${e(t.id)}" data-name="${e(r(t.name))}" data-price="${w.price}" data-img="${e(C(s,t.image))}" data-href="${e(s(a.productPath(t,c)))}" data-letters="${$e(t)?1:0}">
    <p class="kicker">${e(r(m==null?void 0:m.name))}${t.for&&t.for!=="unisex"&&o.for[t.for]!==r(m==null?void 0:m.name)?` \xB7 ${e(o.for[t.for])}`:""}</p>
    <h1 class="pdp-title">${e(r(t.name))}</h1>
    <p class="pdp-price"><strong>${e(i(w.price))}</strong>${t.was?` <s>${e(i(t.was))}</s> <span class="tag tag--sale tag--inline">-${Math.round((1-t.from/t.was)*100)}%</span>`:""}</p>
    <p class="lead">${e(r(t.description))}</p>
    ${(j=t.colors)!=null&&j.length?`<fieldset class="opts"><legend>${e(o.product.color)}: <span data-v="color">${e(r(t.colors[0].name))}</span></legend><div class="swatches">
      ${t.colors.map((u,k)=>`<label class="sw" title="${e(r(u.name))}"><input type="radio" name="color" value="${e(r(u.name))}"${k?"":" checked"}><span style="background:${e(u.hex)}"></span><b class="sr">${e(r(u.name))}</b></label>`).join("")}
    </div></fieldset>`:""}
    ${g.length?`<fieldset class="opts" data-size-field><legend>${e(o.product.size)}: <span data-v="size">\u2014</span></legend><div class="sizes">
      ${g.map(u=>{var b;let k=(b=t.soldOut)==null?void 0:b.includes(u);return`<label class="sz${k?" is-out":""}"><input type="radio" name="size" value="${e(u)}" data-label="${e(u)}"${k?" disabled":""}${g.length===1&&!k?" checked":""}><span>${e(u)}</span>${k?`<b class="sr">${e(o.soldOut)}</b>`:""}</label>`}).join("")}
    </div>
    <p class="size-msg" data-size-msg hidden>${e(o.product.pickSize)}</p>
    <p class="mine-msg" data-mine-msg data-tpl="${e(o.size.picked)}" hidden></p>
    ${$e(t)?`<details class="sizeguide"><summary>${f("ruler",16)} ${e(o.product.sizeGuide)}</summary>${De(a)}</details>`:""}
    </fieldset>`:""}
    <div class="buyrow">
      <div class="qty" data-qty><button type="button" data-d="-1" aria-label="\u2212">${f("minus",16)}</button><input type="number" name="qty" min="1" max="20" value="1" inputmode="numeric" aria-label="${e(o.product.qty)}"><button type="button" data-d="1" aria-label="+">${f("plus",16)}</button></div>
      <button type="button" class="btn btn--accent btn--lg" data-add>${f("bag",18)} ${e(o.product.add)}</button>
    </div>
    <p class="added" data-added hidden>${f("check",16)} ${e(o.product.added)} <button type="button" class="link" data-bag-open>${e(o.product.viewBag)}</button></p>
    ${((D=n.promises)!=null?D:[]).length?`<ul class="promises">${n.promises.map(u=>{var k;return`<li>${f((k=u.icon)!=null?k:"check",18)} ${e(r(u.text))}</li>`}).join("")}</ul>`:""}
    ${M.length?`<div class="specs"><h2 class="h4">${e(o.product.specs)}</h2><table><tbody>${M.map(([u,k])=>{var b;return`<tr><th scope="row">${e((b=o.specs[u])!=null?b:u)}</th><td>${e(h(k))}</td></tr>`}).join("")}</tbody></table></div>`:""}
    ${ge(c.lang)}
  </div>
</section>
${$.length?`<section class="section section--soft"><div class="wrap"><h2 class="h3">${e(y.length?o.product.pairs:o.product.related)}</h2><ul class="grid grid--related">${$.map(u=>ze(a,u)).join("")}</ul></div></section>`:""}`}var $e=a=>xe.some(t=>{var n;return((n=a.sizes)!=null?n:[]).includes(t)})&&a.for!=="men"&&a.for!=="kids";function Qe({t:a,L:t,url:n},o){var c;let r=[o.image,...(c=o.images)!=null?c:[]],s=a.gallery,i=t(o.name);return`<div class="pdp-gallery" data-gallery>
  <ul class="g-track" tabindex="0" aria-label="${e(s.label)}">${r.map((l,d)=>`<li><a href="${e(C(n,l))}" data-zoom="${d}" aria-label="${e(s.zoom)}: ${e(s.photo.replace("{i}",d+1).replace("{n}",r.length))}"><img sizes="${q.wide}" src="${e(C(n,l))}" alt="${e(d?`${i} \u2013 ${s.photo.replace("{i}",d+1).replace("{n}",r.length)}`:i)}" width="1000" height="1250"${d?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
  ${r.length>1?`<p class="g-dots" aria-hidden="true">${r.map((l,d)=>`<i${d?"":' class="on"'}></i>`).join("")}</p>`:""}
  <dialog class="lightbox" data-lightbox aria-label="${e(i)}">
    <img src="" alt="${e(i)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(s.close)}">\u2715</button>
    ${r.length>1?`<button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(s.prev)}">${f("chevron",26)}</button><button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(s.next)}">${f("chevron",26)}</button>`:""}
  </dialog>
</div>`}function et({site:a,t,L:n,channels:o,money:r,ship:s,market:i},c){var $,p;let l=t.bag,d=($=a.contact)!=null?$:{},m=t.orderText.replace(/\{\w+\}/g,"\u2026"),y=h=>o.map((g,w)=>{var M;return`<button type="submit" class="btn ${h!=null?h:w?"btn--line":"btn--accent"} btn--full" data-channel="${e(g)}" data-href="${e(X(g,d,m))}">${f(g,18)} ${e(g==="phone"?l.call:l.send.replace("{channel}",(M=t.via[g])!=null?M:g))}</button>`}).join("");return`<dialog class="bag" data-bag aria-labelledby="bag-title" data-fee="${s.fee}" data-free="${(p=s.free)!=null?p:""}" data-free-tpl="${e(l.freeLeft)}" data-free-ok="${e(l.freeOk)}">
  <form class="bag-in" data-checkout novalidate${c} data-text="${e(t.orderText)}" data-market="${e(`${i.id.toUpperCase()} \xB7 ${i.currency}`)}">
    <header class="bag-head"><h2 id="bag-title" class="h3">${f("bag",22)} ${e(l.title)}</h2><button type="button" class="bag-x" data-bag-close aria-label="${e(t.gallery.close)}">\u2715</button></header>
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
        <div class="intents" role="radiogroup" aria-label="${e(l.how)}">${l.intents.map((h,g)=>`<label class="intent"><input type="radio" name="intent" value="${e(h)}"${g?"":" checked"}><span>${e(h)}</span></label>`).join("")}</div>
        <label class="field"><span>${e(l.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(l.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        <label class="field"><span>${e(l.address)}</span><input name="address" autocomplete="street-address" maxlength="200"></label>
        <label class="field"><span>${e(l.note)}</span><input name="note" maxlength="300" placeholder="${e(l.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(l.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-submit>${f("check",18)} ${e(l.submit)}</button>
        <p class="muted small">${e(n(a.returns)||l.reply)}</p>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${f("check",22)} ${e(l.doneTitle)}</p>
        <p>${e(l.doneText)}</p>
        <div class="buy">${y()}</div>
        <button type="button" class="link back" data-edit>${e(l.edit)}</button>
      </div>
      <p class="form-msg" role="status" hidden></p>
    </div>
  </form>
</dialog>`}function tt({site:a,t,L:n,market:o}){var i,c;let r=(i=a.contact)!=null?i:{},s=Object.entries((c=a.social)!=null?c:{}).filter(([,l])=>l);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${R(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${s.map(([l,d])=>`<li><a href="${e(d)}" target="_blank" rel="noopener">${e(l==="tiktok"?"TikTok":l==="youtube"?"YouTube":l[0].toUpperCase()+l.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${fe(a,t,o.lang)}</div>
</footer>`}function at({site:a,market:t,L:n,abs:o,items:r}){var i,c,l;let s=(i=a.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"ClothingStore",name:a.name,url:o(`${t.id}/`),image:o(F(a.heroImage||((c=r[0])==null?void 0:c.image))),description:n(a.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:n(s.address)},currenciesAccepted:t.currency,openingHoursSpecification:re((l=a.hours)!=null?l:[])}}var nt=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});function ot({site:a,market:t,L:n,abs:o,productPath:r,col:s},i){var c,l,d,m;return{"@context":"https://schema.org","@type":"Product",name:n(i.name),description:n(i.description),image:[i.image,...(c=i.images)!=null?c:[]].map(y=>o(F(y))),url:o(r(i,t)),category:n((l=s(i))==null?void 0:l.name),...(d=i.colors)!=null&&d.length?{color:i.colors.map(y=>n(y.name)).join(", ")}:{},...(m=i.sizes)!=null&&m.length?{size:i.sizes.join(", ")}:{},offers:{"@type":"Offer",price:i.variants[0].price,priceCurrency:t.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:a.name}}}}function rt({market:a,L:t,abs:n,productPath:o,t:r,col:s},i){var c;return{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:r.nav.home,item:n(`${a.id}/`)},{"@type":"ListItem",position:2,name:t((c=s(i))==null?void 0:c.name),item:n(`${a.id}/?type=${i.category}`)},{"@type":"ListItem",position:3,name:t(i.name),item:n(o(i,a))}]}}export{vt as renderSite};
