var ze={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>ze[a]);function _(t,a,n="vi"){var s,o,l;return t==null?"":typeof t!="object"?String(t):(l=(o=(s=t[a])!=null?s:t[n])!=null?o:Object.values(t)[0])!=null?l:""}var Pe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},ee=t=>{var a;return(a=Pe[t])!=null?a:"en-US"};function Ne(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function V(t,a){var s,o;if(a.default)return t.basePrice;let n=(o=(s=t.prices)==null?void 0:s[a.id])!=null?o:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:Ne(t.basePrice*a.rate,a.rounding)}var je=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function te(t,a){let n={style:"currency",currency:a.currency};return je.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(ee(a.lang),n).format(t)}function ne(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var O=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,L=(t,a)=>{let n=O(a);return n==null?a:t(n)},F=(t="")=>String(t).replace(/\D/g,"");function K(t,a,n=""){switch(t){case"phone":return`tel:${F(a.phone)}`;case"zalo":return`https://zalo.me/${F(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${F(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var J=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,Te=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function oe(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let s={};for(let[o,l]of a.searchParams){if(!/^entry\.\d+$/.test(o))continue;let i=l.trim().replace(/^\{|\}$/g,"").toLowerCase();Te.includes(i)&&(s[i]=o)}return Object.keys(s).length?s.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:s}:{error:"no-phone"}:{error:"no-fields"}}var Z={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var Ce={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(t,a=20,n="")=>{var s;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(s=Ce[t])!=null?s:""}</svg>`},Y=[1,2,3,4,5,6,0],qe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function ie(t,a){let n=t.map(o=>Y.indexOf(o)).sort((o,l)=>o-l);return n.every((o,l)=>l===0||o===n[l-1]+1)&&n.length>2?`${a[Y[n[0]]]} \u2013 ${a[Y[n.at(-1)]]}`:n.map(o=>a[Y[o]]).join(", ")}var le=t=>t.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>qe[n]),opens:a.open,closes:a.close}));function ce(t){var n,s;return(s=(n=new Intl.NumberFormat(ee(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(o=>o.type==="currency"))==null?void 0:n.value)!=null?s:t.currency}var de=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',pe=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,he=(t,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},re={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Re=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Le=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&Re.test(n.hostname)?n.href:""}catch{return""}},ue=(t,a,n,s="btn btn--line")=>{var i;let o=Le(t);if(!o)return"";let l=typeof a.reviews=="object"&&((i=a.reviews)==null?void 0:i.google)||re[n]||re.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${s}" href="${e(o)}" target="_blank" rel="noopener">${m("star",16)} ${e(l)}</a></p>`},X={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},me={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ge=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function fe(t,a){var l,i,r;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((l=t==null?void 0:t.date)!=null?l:"").trim());if(!n)return"";let s=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(s.getTime()))return"";let o=new Intl.DateTimeFormat((r=me[a])!=null?r:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(s);return`<time class="rv-date" datetime="${e(t.date)}">${e(o)}</time>`}function Ee(t,a){var i,r;let n=t.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let s=n.reduce((c,d)=>c+Number(d.rating),0)/n.length,o=(i=X[a])!=null?i:X.en,l=new Intl.NumberFormat((r=me[a])!=null?r:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(s);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${l}</strong><span>\xB7</span><span>${e(o.count.replace("{n}",String(t.length)))}</span></p>`}function be(t,a,n,s){var i;if(!t.length)return"";let o=(i=X[a])!=null?i:X.en,l=r=>`<button type="button" class="rv-btn" data-rv-${r} aria-label="${e(r==="prev"?o.prev:o.next)}">${m("arrow",18,r==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Ee(t,a)}<div class="rv" data-rv data-rv-more="${e(o.more)}" data-rv-less="${e(o.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(s).join("")}</div>
      <div class="rv-nav" hidden>${l("prev")}${l("next")}</div>
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
upd()}})()<\/script>`,se={vi:{label:"Chia s\u1EBB",native:"G\u1EEDi qua Zalo, Messenger\u2026",copy:"Sao ch\xE9p link",copied:"\u0110\xE3 sao ch\xE9p"},en:{label:"Share",native:"Send via apps\u2026",copy:"Copy link",copied:"Copied"},ja:{label:"\u30B7\u30A7\u30A2",native:"\u30A2\u30D7\u30EA\u3067\u9001\u308B\u2026",copy:"\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",copied:"\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"},ko:{label:"\uACF5\uC720",native:"\uC571\uC73C\uB85C \uBCF4\uB0B4\uAE30\u2026",copy:"\uB9C1\uD06C \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428"},zh:{label:"\u5206\u4EAB",native:"\u901A\u8FC7\u5E94\u7528\u53D1\u9001\u2026",copy:"\u590D\u5236\u94FE\u63A5",copied:"\u5DF2\u590D\u5236"},th:{label:"\u0E41\u0E0A\u0E23\u0E4C",native:"\u0E2A\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u2026",copy:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",copied:"\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27"},id:{label:"Bagikan",native:"Kirim lewat aplikasi\u2026",copy:"Salin tautan",copied:"Tersalin"},es:{label:"Compartir",native:"Enviar por apps\u2026",copy:"Copiar enlace",copied:"Copiado"},fr:{label:"Partager",native:"Envoyer via une app\u2026",copy:"Copier le lien",copied:"Copi\xE9"},de:{label:"Teilen",native:"Per App senden\u2026",copy:"Link kopieren",copied:"Kopiert"},pt:{label:"Compartilhar",native:"Enviar por apps\u2026",copy:"Copiar link",copied:"Copiado"},ru:{label:"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",native:"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u2026",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"}};function ve(t){var s;let a=(s=se[t])!=null?s:se.en,n="display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px solid currentColor;border-radius:999px;background:none;color:inherit;font:inherit;font-size:13px;text-decoration:none;cursor:pointer;opacity:.85";return`<div class="kp-share" data-share data-copied="${e(a.copied)}" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;font-size:13px">
      <span style="opacity:.65">${e(a.label)}</span>
      <button type="button" data-share-native hidden style="${n}">${m("share",15)} ${e(a.native)}</button>
      <a data-share-fb href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" style="${n}">${m("facebook",15)} Facebook</a>
      <button type="button" data-share-copy style="${n}">${m("link",15)} <span>${e(a.copy)}</span></button>
    </div>`}var $e=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function ye({site:t,markets:a,url:n,abs:s}){var i;let o=(i=a.find(r=>r.default))!=null?i:a[0],l=a.map(r=>({id:r.id,lang:r.lang,country:r.country}));return`<!doctype html>
<html lang="${e(o.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${s(`${o.id}/`)}">
${a.map(r=>`<link rel="alternate" hreflang="${e(r.lang)}-${e(r.country)}" href="${s(`${r.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(l)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(r=>`<a href="${n(`${r.id}/`)}">${e(r.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var Ae="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",we=24;function Me(t,a){var n;return((n=t.products)!=null?n:[]).map(s=>{var o;return{...s,variants:((o=s.variants)!=null?o:[]).map(l=>({...l,price:V(l,a)})).filter(l=>l.price!=null)}}).filter(s=>s.variants.length>0).map(s=>{let o=Math.min(...s.variants.map(i=>i.price)),l=s.was?V({basePrice:s.was,prices:s.wasPrices},a):null;return{...s,from:o,was:l&&l>o?l:null}})}var De=t=>String(t).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase(),Q=t=>{let a=/^(\d{1,2}):(\d{2})$/.exec(String(t!=null?t:""));return a?+a[1]*60+ +a[2]:null};function Fe(t){let a=10**Math.floor(Math.log10(t));return[1,2,2.5,5,10].map(n=>n*a).reduce((n,s)=>Math.abs(s-t)<Math.abs(n-t)?s:n)}function Ve(t){let a=t.map(s=>s.from).sort((s,o)=>s-o);if(a.length<5)return[];let n=[...new Set([.33,.66].map(s=>Fe(a[Math.floor(s*(a.length-1))])))];return n.map((s,o)=>[o?n[o-1]:0,s]).concat([[n[n.length-1],1/0]])}function fa({site:t,catalog:a,i18n:n,template:s,basePath:o="/",siteUrl:l=t.domain}){var w,f,y,p,g,$,S,z,M,P,T,C;let i=ne(o),r=h=>new URL(i(h),l).href,c=a.markets,d=(h,D)=>`${D.id}/${_(h.slug,D.lang,"en")}/`,u=oe(t.orderForm),b=u&&!u.error?u:null,x=[];for(let h of c){let D=h.lang,q=(f=(w=n[D])!=null?w:n.en)!=null?f:n.vi,E=k=>_(k,D,"en"),N=Me(a,h),A=(p=(y=t.orderChannels)==null?void 0:y[h.id])!=null?p:["phone"],H=k=>te(k,h),G=(k,j)=>(k!=null?k:[]).find(B=>B.id===j),I=((g=a.lenses)!=null?g:[]).map(k=>{var j;return{...k,price:(j=V(k,h))!=null?j:0}}),U=k=>{var j;return((j=a.faces)!=null?j:[]).filter(B=>{var ae;return((ae=B.shapes)!=null?ae:[]).includes(k.shape)}).map(B=>B.id)},R=($=t.shipping)!=null?$:{},W={fee:(M=(z=(S=R.prices)==null?void 0:S[h.id])==null?void 0:z.fee)!=null?M:R.fee!=null?V({basePrice:R.fee},h):0,free:(C=(T=(P=R.prices)==null?void 0:P[h.id])==null?void 0:T.freeFrom)!=null?C:R.freeFrom!=null?V({basePrice:R.freeFrom},h):null},v={site:t,catalog:a,market:h,markets:c,lang:D,t:q,L:E,url:i,abs:r,channels:A,money:H,items:N,productPath:d,template:s,gform:b,byId:G,lenses:I,fits:U,ship:W,bands:Ve(N)};x.push({path:`${h.id}/index.html`,html:xe(v,{kind:"home"})});for(let k of N)x.push({path:`${d(k,h)}index.html`,html:xe(v,{kind:"product",product:k})})}return x.push({path:"index.html",html:ye({site:t,markets:c,url:i,abs:r})}),x}function xe(t,a){var E,N,A,H,G,I,U,R,W;let{site:n,market:s,markets:o,lang:l,t:i,L:r,url:c,abs:d,catalog:u,productPath:b,gform:x,money:w}=t,f=a.kind==="home",y=a.product,p=f?`${s.id}/`:b(y,s),g=f?`${n.name} \xB7 ${r(n.tagline)}`:`${r(y.name)} \xB7 ${n.name}`,$=f?r(n.intro):`${r(y.description)} ${w(y.from)}.`,S=o.map(v=>{var k;return f?{m:v,href:`${v.id}/`}:Me({products:[((k=u.products)!=null?k:[]).find(j=>j.id===y.id)]},v).length?{m:v,href:b(y,v)}:null}).filter(Boolean),z=v=>{var k,j;return(j=(k=S.find(B=>B.m.id===v.id))==null?void 0:k.href)!=null?j:`${v.id}/`},M=(E=o.find(v=>v.default))!=null?E:o[0],P=(N=n.theme)!=null?N:{},T=["primary","ink","bg","surface","soft","accent"].filter(v=>P[v]).map(v=>`--${v}:${P[v]}`).join(";"),C=o.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:c(z(v))})),h=(A=n.contact)!=null?A:{},D=d(O(f?n.heroImage||((H=t.items[0])==null?void 0:H.image):y.image)),q=x?` data-gform="${e(x.action)}" data-gmap='${e(JSON.stringify(x.fields))}'`:"";return`<!doctype html>
<html lang="${e(l)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(g)}</title>
<meta name="description" content="${e($)}">
<link rel="canonical" href="${d(p)}">
${S.map(({m:v,href:k})=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${d(k)}">`).join(`
`)}
${S.some(v=>v.m.id===M.id)?`<link rel="alternate" hreflang="x-default" href="${d(z(M))}">`:""}
<meta property="og:type" content="${f?"website":"product"}">
<meta property="og:title" content="${e(g)}">
<meta property="og:description" content="${e($)}">
<meta property="og:url" content="${d(p)}">
<meta property="og:image" content="${e(D)}">
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((G=P.bg)!=null?G:"#F7F5F1")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ae}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${T}}</style>
${f?J(aa(t))+(((I=n.faq)!=null?I:[]).length?J(ta(t)):""):J(na(t,y))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(s.id)}" data-markets='${e(JSON.stringify(C))}' data-copied="${e(i.copied)}" data-wa="${e(F((U=h.whatsapp)!=null?U:""))}" data-email="${e((R=h.email)!=null?R:"")}" data-store="${e(`kp-optic-${De(n.name).replace(/[^a-z0-9]+/g,"")}-${s.id}`)}" data-currency="${e(s.currency)}" data-lang="${e(l)}" data-tz="${e((W=n.timezone)!=null?W:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(i.skip)}</a>
${pe(i)}
${r(n.announcement)?`<p class="announce">${e(r(n.announcement))}</p>`:""}
${Oe(t,f)}
<main id="main">
${f?[He,Ge,Ie,Ue,We,_e,Ke,Je,Ze].map(v=>v(t)).join(`
`):Ye(t,y)}
</main>
${ea(t)}
${Qe(t,q)}
<nav class="dock" aria-label="${e(i.bag.title)}">
  <a href="${f?"":c(`${s.id}/`)}#exam">${m("calendar",20)}<span>${e(i.nav.exam)}</span></a>
  <button type="button" class="primary" data-bag-open>${m("bag",20)}<span>${e(i.bag.title)}</span><b class="bag-n" data-bag-count hidden>0</b></button>
</nav>
</body>
</html>
`}function Oe({site:t,market:a,markets:n,t:s,url:o},l){let i=l?"":o(`${a.id}/`),r=[[`${i}#shop`,s.nav.shop],[`${i}#faces`,s.nav.faces],[`${i}#lenses`,s.nav.lenses],[`${i}#exam`,s.nav.exam],[`${i}#visit`,s.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${o(`${a.id}/`)}">
      ${t.logo?`<img src="${e(L(o,t.logo))}" alt="" width="40" height="40">`:'<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 20" width="30" height="15" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="9" cy="10" r="7"/><circle cx="31" cy="10" r="7"/><path d="M16 9q4-3 8 0"/></svg></span>'}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${r.map(([c,d])=>`<a href="${c}">${e(d)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(s.market.label)}">${m("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(ce(a))}</span></span></summary>
        <ul>${n.map(c=>`<li><a href="${o(`${c.id}/`)}" hreflang="${e(c.lang)}"${c.id===a.id?' aria-current="true"':""}>${e(c.country)} \xB7 ${e(c.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <button type="button" class="bagbtn" data-bag-open aria-label="${e(s.bag.title)}">${m("bag",20)}<b class="bag-n" data-bag-count hidden>0</b></button>
      <details class="mnav">
        <summary aria-label="${e(s.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${r.map(([c,d])=>`<a href="${c}">${e(d)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function He({site:t,t:a,L:n,url:s,items:o,catalog:l}){var c,d;let i=[t.heroImage,...(c=t.heroImages)!=null?c:[]].filter(Boolean).slice(0,2),r=((d=l.categories)!=null?d:[]).filter(u=>o.some(b=>b.category===u.id));return`<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${n(t.heroKicker)?`<p class="kicker">${e(n(t.heroKicker))}</p>`:""}
      <h1>${e(n(t.tagline))}</h1>
      <p class="lead">${e(n(t.intro))}</p>
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#shop">${e(a.hero.shop)} ${m("arrow",18)}</a>
        <a class="btn btn--line btn--lg" href="#exam">${m("calendar",18)} ${e(a.hero.exam)}</a>
      </div>
    </div>
    ${i.length?`<div class="hero-pics">${i.map((u,b)=>`<img src="${e(L(s,u))}" alt="" width="1000" height="1000"${b?' loading="lazy"':' fetchpriority="high"'}>`).join("")}</div>`:""}
  </div>
  ${r.length?`<div class="wrap"><ul class="jump">${r.map(u=>{var b;return`<li><a href="?type=${e(u.id)}#shop" data-jump="type" data-value="${e(u.id)}">${m((b=u.icon)!=null?b:"eye",16)} ${e(n(u.name))}</a></li>`}).join("")}</ul></div>`:""}
</section>`}function Se(t,a,n=0){var p,g,$,S,z,M,P,T,C,h,D,q,E;let{t:s,L:o,url:l,money:i,productPath:r,market:c,catalog:d,byId:u,fits:b,bands:x}=t,w=[o(a.name),(p=a.name)==null?void 0:p.vi,(g=a.name)==null?void 0:g.en,o(($=u(d.categories,a.category))==null?void 0:$.name),o((S=u(d.shapes,a.shape))==null?void 0:S.name),o((z=u(d.materials,a.material))==null?void 0:z.name),...((M=a.colors)!=null?M:[]).map(N=>o(N.name))].filter(Boolean).join(" "),f=x.findIndex(([N,A])=>a.from>=N&&a.from<A),y=(P=a.images)==null?void 0:P[0];return`<li class="card${n>=we?" is-more":""}" data-type="${e(a.category)}" data-shape="${e((T=a.shape)!=null?T:"")}" data-material="${e((C=a.material)!=null?C:"")}" data-for="${e((h=a.for)!=null?h:"unisex")}" data-face="${e(b(a).join(" "))}" data-band="${f}" data-price="${a.from}" data-name="${e(De(w))}">
  <a class="card-link" href="${l(r(a,c))}">
    <div class="card-img${y?" has-alt":""}">
      <img sizes="${Z.card}" src="${e(L(l,a.image))}" alt="${e(o(a.name))}" width="1000" height="750" loading="lazy">
      ${y?`<img sizes="${Z.card}" class="alt" src="${e(L(l,y))}" alt="" width="1000" height="750" loading="lazy">`:""}
      ${a.was?`<span class="tag tag--sale">-${Math.round((1-a.from/a.was)*100)}%</span>`:o(a.badge)?`<span class="tag">${e(o(a.badge))}</span>`:""}
    </div>
    <p class="card-cat">${e([o((D=u(d.shapes,a.shape))==null?void 0:D.name),o((q=u(d.materials,a.material))==null?void 0:q.name)].filter(Boolean).join(" \xB7 "))}</p>
    <h3>${e(o(a.name))}</h3>
    <p class="card-price"><b>${e(i(a.from))}</b>${a.was?` <s>${e(i(a.was))}</s>`:""}${a.size?`<span class="sz">${e(a.size)}</span>`:""}</p>
    ${((E=a.colors)==null?void 0:E.length)>1?`<p class="dots" aria-hidden="true">${a.colors.map(N=>`<i style="background:${e(N.hex)}"></i>`).join("")}</p>`:""}
  </a>
</li>`}function Ge(t){var x,w,f,y;let{items:a,catalog:n,t:s,L:o,money:l,bands:i,fits:r}=t,c=s.shop,d=(p,g,$,S)=>{let z=$.map(M=>({...M,n:a.filter(P=>S(P).includes(String(M.id))).length})).filter(M=>M.n);return z.length<2?"":`<fieldset class="fgroup" data-group="${p}"><legend>${e(g)}</legend>${z.map(M=>`<label class="fopt"><input type="checkbox" value="${e(M.id)}" data-f="${p}"> <span>${e(typeof M.name=="string"?M.name:o(M.name))}</span><small>${M.n}</small></label>`).join("")}</fieldset>`},u=["women","men","kids","unisex"].map(p=>({id:p,name:s.for[p]})),b=i.map(([p,g],$)=>({id:String($),name:g===1/0?c.over.replace("{a}",l(p)):p===0?c.under.replace("{b}",l(g)):`${l(p)} \u2013 ${l(g)}`}));return`<section class="section shop-sec" id="shop" aria-labelledby="shop-title">
  <div class="wrap shop">
    <aside class="side" id="filters" data-side aria-label="${e(c.filters)}">
      <div class="side-head"><p class="side-title">${m("filter",18)} ${e(c.filters)}</p><button type="button" class="side-x" data-side-close aria-label="${e(c.close)}">\u2715</button></div>
      ${d("type",c.type,(x=n.categories)!=null?x:[],p=>[p.category])}
      ${d("shape",c.shape,(w=n.shapes)!=null?w:[],p=>[p.shape])}
      ${d("face",c.face,(f=n.faces)!=null?f:[],p=>r(p))}
      ${d("material",c.material,(y=n.materials)!=null?y:[],p=>[p.material])}
      ${d("for",c.for,u,p=>{var g;return[(g=p.for)!=null?g:"unisex"]})}
      ${d("band",c.price,b,p=>[String(i.findIndex(([g,$])=>p.from>=g&&p.from<$))])}
      <div class="side-foot"><button type="button" class="link" data-reset>${e(c.reset)}</button><button type="button" class="btn btn--primary" data-side-close data-show-tpl="${e(c.show)}">${e(c.show.replace("{n}",a.length))}</button></div>
    </aside>
    <div class="shop-main">
      <div class="shop-head">
        <h2 id="shop-title" class="h2">${e(c.title)}</h2>
        <p class="muted" data-count="${e(c.count)}">${e(c.count.replace("{n}",a.length))}</p>
      </div>
      <div class="toolbar">
        <button type="button" class="btn btn--line filter-btn" data-side-open aria-controls="filters">${m("filter",18)} ${e(c.filters)} <b data-nsel hidden></b></button>
        <label class="search">${m("search",18)}<input type="search" placeholder="${e(s.search)}" aria-label="${e(s.search)}" data-search></label>
        <label class="select"><span>${e(c.sort)}</span><select data-sort>
          <option value="">${e(c.sortPop)}</option><option value="asc">${e(c.sortLow)}</option><option value="desc">${e(c.sortHigh)}</option>
        </select></label>
      </div>
      <ul class="chosen" data-chosen hidden></ul>
      <ul class="grid" data-grid>${a.map((p,g)=>Se(t,p,g)).join("")}</ul>
      <p class="empty muted" data-empty hidden>${e(c.empty)} <button type="button" class="link" data-reset>${e(c.reset)}</button></p>
      ${a.length>we?`<div class="more"><button type="button" class="btn btn--line btn--lg" data-more hidden>${e(c.more)}</button></div>`:""}
    </div>
  </div>
</section>`}var ke={round:'<ellipse cx="30" cy="34" rx="22" ry="23"/>',square:'<rect x="9" y="11" width="42" height="46" rx="9"/>',oval:'<ellipse cx="30" cy="34" rx="18" ry="25"/>',heart:'<path d="M8 18q22-12 44 0q-2 22-22 40q-20-18-22-40z"/>',long:'<rect x="13" y="6" width="34" height="56" rx="16"/>'};function Ie({catalog:t,t:a,L:n}){var l;let s=((l=t.faces)!=null?l:[]).filter(i=>n(i==null?void 0:i.name));if(!s.length)return"";let o=a.faces;return`<section class="section section--soft" id="faces" aria-labelledby="faces-title">
  <div class="wrap faces">
    <div>
      <p class="kicker">${e(o.kicker)}</p>
      <h2 id="faces-title" class="h2">${e(o.title)}</h2>
      <p class="lead">${e(o.text)}</p>
      <div class="face-row" role="group" aria-label="${e(o.title)}">${s.map(i=>{var r;return`<button type="button" class="face" data-face-pick="${e(i.id)}" aria-pressed="false"><svg viewBox="0 0 60 66" width="44" height="48" aria-hidden="true">${(r=ke[i.id])!=null?r:ke.oval}</svg><span>${e(n(i.name))}</span></button>`}).join("")}</div>
      ${s.map(i=>{var r;return`<div class="face-tip" data-face-tip="${e(i.id)}" hidden><p>${e(n(i.text))}</p><p class="small muted">${e(o.suits)}: ${e(((r=i.shapes)!=null?r:[]).map(c=>{var d,u;return n((u=((d=t.shapes)!=null?d:[]).find(b=>b.id===c))==null?void 0:u.name)}).filter(Boolean).join(", "))}</p><a class="btn btn--primary" href="#shop" data-face-go="${e(i.id)}">${e(o.see)} ${m("arrow",16)}</a></div>`}).join("")}
    </div>
    <div class="sizecard">
      <p class="mini">${m("ruler",16)} ${e(o.sizeTitle)}</p>
      <svg class="frame-svg" viewBox="0 0 320 120" role="img" aria-label="52-18-140">
        <rect x="18" y="30" width="112" height="64" rx="26"/><rect x="190" y="30" width="112" height="64" rx="26"/><path d="M130 50q30-18 60 0"/>
        <path class="dim" d="M18 108h112M130 18h60"/><text x="74" y="118">52</text><text x="160" y="13">18</text>
      </svg>
      <dl class="sizes-dl"><div><dt>52</dt><dd>${e(o.lens)}</dd></div><div><dt>18</dt><dd>${e(o.bridge)}</dd></div><div><dt>140</dt><dd>${e(o.temple)}</dd></div></dl>
      <p class="small muted">${e(o.sizeTip)}</p>
    </div>
  </div>
</section>`}function Ue({site:t,t:a,L:n,lenses:s,money:o}){let l=s.filter(i=>i.price>0);return l.length?`<section class="section" id="lenses" aria-labelledby="lens-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.lenses.kicker)}</p><h2 id="lens-title" class="h2">${e(a.lenses.title)}</h2><p class="lead">${e(n(t.lensText)||a.lenses.text)}</p></div>
    <ul class="lens-list">${l.map(i=>`<li><div><b>${e(n(i.name))}</b><p class="muted">${e(n(i.text))}</p></div><span class="lp">${e(a.lenses.from.replace("{price}",o(i.price)))}</span></li>`).join("")}</ul>
  </div>
</section>`:""}function We({site:t,t:a,L:n,channels:s,gform:o,market:l}){var w,f,y;let i=(w=t.exam)!=null?w:{},r=a.exam,c=Number(i.step)||30,d=((f=t.hours)!=null?f:[]).filter(p=>Q(p.open)!=null&&Q(p.close)!=null).map(p=>({d:p.days,o:Q(p.open),c:Q(p.close)})),u=a.examText.replace(/\{\w+\}/g,"\u2026"),b=o?` data-gform="${e(o.action)}" data-gmap='${e(JSON.stringify(o.fields))}'`:"",x=p=>s.map((g,$)=>{var S,z;return`<button type="submit" class="btn ${p!=null?p:$?"btn--line":"btn--primary"} btn--lg" data-channel="${e(g)}" data-href="${e(K(g,(S=t.contact)!=null?S:{},u))}">${m(g,18)} ${e(g==="phone"?r.call:r.send.replace("{channel}",(z=a.via[g])!=null?z:g))}</button>`}).join("");return`<section class="section section--deep" id="exam" aria-labelledby="exam-title">
  <div class="wrap exam">
    <div class="exam-copy">
      <p class="kicker">${e(r.kicker)}</p>
      <h2 id="exam-title" class="h2">${e(r.title)}</h2>
      <p class="lead">${e(r.text.replace("{n}",(y=i.minutes)!=null?y:20))}</p>
      <ol class="steps">${r.steps.map((p,g)=>`<li><span>${g+1}</span>${e(p)}</li>`).join("")}</ol>
      <p class="note">${m("shield",16)} ${e(n(i.note)||r.note)}</p>
    </div>
    <form class="order" data-exam${b} data-hours='${e(JSON.stringify(d))}' data-step="${c}" data-lead="${Number(i.lead)||60}" data-len="${Number(i.minutes)||20}" data-text="${e(a.examText)}" data-market="${e(`${l.id.toUpperCase()} \xB7 ${l.currency}`)}" novalidate>
      <div class="order-fields">
        <fieldset class="opts"><legend>${e(r.need)}</legend><div class="row-opts">${r.needs.map((p,g)=>`<label class="opt"><input type="radio" name="need" value="${e(p)}"${g?"":" checked"}><span>${e(p)}</span></label>`).join("")}</div></fieldset>
        <div class="fields">
          <label><span>${e(r.date)} *</span><input name="date" type="date" required data-date></label>
          <label><span>${e(r.time)} *</span><select name="time" required data-time></select></label>
          <label><span>${e(r.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label><span>${e(r.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          <label class="wide"><span>${e(r.noteL)}</span><input name="note" maxlength="300" placeholder="${e(r.noteHint)}"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <p class="small muted" data-time-note data-none="${e(r.noTime)}" data-closed="${e(r.closed)}" hidden></p>
        <p class="form-err" data-err hidden>${e(r.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-order-submit>${m("calendar",18)} ${e(r.submit)}</button>
      </div>
      <div class="done${o?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${m(o?"check":"arrow",22)} ${e(o?r.done:r.stepTitle)}</p>
        <p>${e(o?r.doneText:r.stepText)}</p>
        <div class="buy">${x(o?"btn--line":void 0)}</div>
        ${o?"":`<button type="button" class="link back" data-edit>${e(r.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function _e({site:t,L:a}){var s;let n=((s=t.perks)!=null?s:[]).filter(o=>a(o==null?void 0:o.title));return n.length?`<section class="perks" aria-label="${e(t.name)}"><ul class="wrap perk-list">${n.map(o=>{var l;return`<li>${m((l=o.icon)!=null?l:"check",22)}<div><b>${e(a(o.title))}</b>${a(o.text)?`<span>${e(a(o.text))}</span>`:""}</div></li>`}).join("")}</ul></section>`:""}function Ke({site:t,t:a,L:n,lang:s}){let o=ue(t,a,s,"btn btn--line"),l=ge(t);return t.showReviews===!1||!l.length&&!o?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2></div>
    ${be(l,s,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(r,c)=>`<span class="${c<i.rating?"on":""}">${m("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(i.text))}</blockquote>
      <figcaption>${e(i.name)}${n(i.bought)?`<small>${e(n(i.bought))}</small>`:""}${fe(i,s)}</figcaption>
    </figure>`)}${o}
  </div>
</section>`}function Je({site:t,t:a,L:n}){var o;let s=((o=t.faq)!=null?o:[]).filter(l=>n(l==null?void 0:l.q));return s.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div>${s.map((l,i)=>`<details${i===0?" open":""}><summary>${e(n(l.q))}</summary><p>${e(n(l.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ze({site:t,t:a,L:n,channels:s}){var r,c,d;let o=(r=t.contact)!=null?r:{},l=encodeURIComponent((c=o.mapQuery)!=null?c:n(o.address)),i=u=>u.length===7?a.visit.everyDay:ie(u,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${he(t,a)}
      ${((d=t.hours)!=null?d:[]).length?`<table class="hours"><tbody>${t.hours.map(u=>`<tr><th scope="row">${e(i(u.days))}</th><td>${e(u.open)} \u2013 ${e(u.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(o.address)?`<p class="addr">${m("pin",18)} ${e(n(o.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${l}" target="_blank" rel="noopener">${e(a.visit.directions)} ${m("arrow",16)}</a>
        ${s.map(u=>{var b;return`<a class="btn btn--line" href="${e(K(u,o))}" ${de(u)}>${m(u,18)} ${e((b=a.via[u])!=null?b:u)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${l}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ye(t,a){var z,M,P,T,C;let{site:n,t:s,L:o,url:l,money:i,market:r,items:c,catalog:d,byId:u,lenses:b}=t,x=u(d.categories,a.category),w=[...c.filter(h=>h.id!==a.id&&h.shape===a.shape),...c.filter(h=>h.id!==a.id&&h.shape!==a.shape&&h.category===a.category)].slice(0,8),f=l(`${r.id}/`),y=h=>typeof h=="object"?o(h):String(h),p=a.variants[0],g=[a.size?["size",a.size]:null,a.shape?["shape",o((z=u(d.shapes,a.shape))==null?void 0:z.name)]:null,a.material?["material",o((M=u(d.materials,a.material))==null?void 0:M.name)]:null,...(P=a.specs)!=null?P:[]].filter(Boolean),$=s.product,S=a.rx===!1?[]:b;return`<div class="wrap crumbs"><a href="${f}">${e(s.nav.home)}</a>${m("chevron",14)}<a href="${f}?type=${e(a.category)}#shop">${e(o(x==null?void 0:x.name))}</a>${m("chevron",14)}<span aria-current="page">${e(o(a.name))}</span></div>
<section class="wrap pdp-grid">
  ${Xe(t,a)}
  <div class="pdp" data-product data-id="${e(a.id)}" data-name="${e(o(a.name))}" data-price="${p.price}" data-img="${e(L(l,a.image))}" data-href="${e(l(t.productPath(a,r)))}">
    <p class="kicker">${e(o(x==null?void 0:x.name))}${a.for&&a.for!=="unisex"?` \xB7 ${e(s.for[a.for])}`:""}</p>
    <h1 class="pdp-title">${e(o(a.name))}</h1>
    <p class="pdp-price"><strong data-pdp-total>${e(i(p.price))}</strong>${a.was?` <s>${e(i(a.was))}</s>`:""}</p>
    <p class="lead">${e(o(a.description))}</p>
    ${(T=a.colors)!=null&&T.length?`<fieldset class="opts"><legend>${e($.color)}: <span data-v="color">${e(o(a.colors[0].name))}</span></legend><div class="swatches">
      ${a.colors.map((h,D)=>`<label class="sw" title="${e(o(h.name))}"><input type="radio" name="color" value="${e(o(h.name))}"${D?"":" checked"}><span style="background:${e(h.hex)}"></span><b class="sr">${e(o(h.name))}</b></label>`).join("")}
    </div></fieldset>`:""}
    ${S.length?`<fieldset class="opts"><legend>${e($.lens)}</legend><div class="lens-opts">
      ${S.map((h,D)=>`<label class="lopt"><input type="radio" name="lens" value="${e(o(h.name))}" data-add="${h.price}"${D?"":" checked"}><span><b>${e(o(h.name))}</b><small>${e(o(h.text))}</small><em>${h.price?`+ ${e(i(h.price))}`:e($.free)}</em></span></label>`).join("")}
    </div></fieldset>
    <label class="field rx"><span>${e($.rx)}</span><select name="rx">${$.rxOpts.map(h=>`<option>${e(h)}</option>`).join("")}</select></label>`:""}
    <div class="buyrow">
      <div class="qty" data-qty><button type="button" data-d="-1" aria-label="\u2212">${m("minus",16)}</button><input type="number" name="qty" min="1" max="10" value="1" inputmode="numeric" aria-label="${e($.qty)}"><button type="button" data-d="1" aria-label="+">${m("plus",16)}</button></div>
      <button type="button" class="btn btn--accent btn--lg" data-add-bag>${m("bag",18)} ${e($.add)}</button>
    </div>
    <p class="added" data-added hidden>${m("check",16)} ${e($.added)} <button type="button" class="link" data-bag-open>${e($.viewBag)}</button></p>
    ${((C=n.promises)!=null?C:[]).length?`<ul class="promises">${n.promises.map(h=>{var D;return`<li>${m((D=h.icon)!=null?D:"check",18)} ${e(o(h.text))}</li>`}).join("")}</ul>`:""}
    ${g.length?`<div class="specs"><h2 class="h4">${e($.specs)}</h2><table><tbody>${g.map(([h,D])=>{var q;return`<tr><th scope="row">${e((q=s.specs[h])!=null?q:h)}</th><td>${e(y(D))}</td></tr>`}).join("")}</tbody></table></div>`:""}
    <p class="small muted">${m("calendar",14)} ${e($.examHint)} <a class="link" href="${f}#exam">${e(s.nav.exam)}</a></p>
    ${ve(r.lang)}
  </div>
</section>
${w.length?`<section class="section section--soft"><div class="wrap"><h2 class="h3">${e($.related)}</h2><ul class="grid grid--related">${w.map(h=>Se(t,h)).join("")}</ul></div></section>`:""}`}function Xe({t,L:a,url:n},s){var r;let o=[s.image,...(r=s.images)!=null?r:[]],l=t.gallery,i=a(s.name);return`<div class="pdp-gallery" data-gallery>
  <ul class="g-track" tabindex="0" aria-label="${e(l.label)}">${o.map((c,d)=>`<li><a href="${e(L(n,c))}" data-zoom="${d}" aria-label="${e(l.zoom)}: ${e(l.photo.replace("{i}",d+1).replace("{n}",o.length))}"><img sizes="${Z.wide}" src="${e(L(n,c))}" alt="${e(d?`${i} \u2013 ${l.photo.replace("{i}",d+1).replace("{n}",o.length)}`:i)}" width="1000" height="750"${d?' loading="lazy"':' fetchpriority="high"'}></a></li>`).join("")}</ul>
  ${o.length>1?`<p class="g-dots" aria-hidden="true">${o.map((c,d)=>`<i${d?"":' class="on"'}></i>`).join("")}</p>`:""}
  <dialog class="lightbox" data-lightbox aria-label="${e(i)}">
    <img src="" alt="${e(i)}" data-lb-img>
    <button type="button" class="lb-close" data-lb-close aria-label="${e(l.close)}">\u2715</button>
    ${o.length>1?`<button type="button" class="g-nav g-prev" data-lb-step="-1" aria-label="${e(l.prev)}">${m("chevron",26)}</button><button type="button" class="g-nav g-next" data-lb-step="1" aria-label="${e(l.next)}">${m("chevron",26)}</button>`:""}
  </dialog>
</div>`}function Qe({site:t,t:a,L:n,channels:s,ship:o,market:l},i){var b,x;let r=a.bag,c=(b=t.contact)!=null?b:{},d=a.orderText.replace(/\{\w+\}/g,"\u2026"),u=w=>s.map((f,y)=>{var p;return`<button type="submit" class="btn ${w!=null?w:y?"btn--line":"btn--accent"} btn--full" data-channel="${e(f)}" data-href="${e(K(f,c,d))}">${m(f,18)} ${e(f==="phone"?r.call:r.send.replace("{channel}",(p=a.via[f])!=null?p:f))}</button>`}).join("");return`<dialog class="bag" data-bag aria-labelledby="bag-title" data-fee="${o.fee}" data-free="${(x=o.free)!=null?x:""}" data-free-tpl="${e(r.freeLeft)}" data-free-ok="${e(r.freeOk)}">
  <form class="bag-in" data-checkout novalidate${i} data-text="${e(a.orderText)}" data-market="${e(`${l.id.toUpperCase()} \xB7 ${l.currency}`)}">
    <header class="bag-head"><h2 id="bag-title" class="h3">${m("bag",22)} ${e(r.title)}</h2><button type="button" class="bag-x" data-bag-close aria-label="${e(a.gallery.close)}">\u2715</button></header>
    <p class="bag-empty muted" data-bag-empty>${e(r.empty)}</p>
    <ul class="bag-list" data-bag-list data-remove="${e(r.remove)}"></ul>
    <div class="bag-body" data-bag-body hidden>
      <p class="freebar" data-freebar hidden><span data-freebar-text></span><i><b data-freebar-fill></b></i></p>
      <dl class="sum">
        <div><dt>${e(r.subtotal)}</dt><dd data-s-sub>\u2014</dd></div>
        <div><dt>${e(r.shipping)}</dt><dd data-s-ship data-free-label="${e(r.free)}">\u2014</dd></div>
        <div class="sum-total"><dt>${e(r.total)}</dt><dd data-s-total>\u2014</dd></div>
      </dl>
      <div class="order-fields">
        <div class="intents" role="radiogroup" aria-label="${e(r.how)}">${r.intents.map((w,f)=>`<label class="intent"><input type="radio" name="intent" value="${e(w)}"${f?"":" checked"}><span>${e(w)}</span></label>`).join("")}</div>
        <label class="field"><span>${e(r.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(r.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        <label class="field"><span>${e(r.address)}</span><input name="address" autocomplete="street-address" maxlength="200"></label>
        <label class="field"><span>${e(r.note)}</span><input name="note" maxlength="300" placeholder="${e(r.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(r.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-submit>${m("check",18)} ${e(r.submit)}</button>
        <p class="muted small">${e(n(t.returns)||r.reply)}</p>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m("check",22)} ${e(r.doneTitle)}</p>
        <p>${e(r.doneText)}</p>
        <div class="buy">${u()}</div>
        <button type="button" class="link back" data-edit>${e(r.edit)}</button>
      </div>
      <p class="form-msg" role="status" hidden></p>
    </div>
  </form>
</dialog>`}function ea({site:t,t:a,L:n,market:s}){var i,r;let o=(i=t.contact)!=null?i:{},l=Object.entries((r=t.social)!=null?r:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${o.phone?`<li>${e(a.footer.hotline)}: <a href="tel:${F(o.phone)}">${e(o.phone)}</a></li>`:""}
      ${o.email?`<li><a href="mailto:${e(o.email)}">${e(o.email)}</a></li>`:""}
      ${n(o.address)?`<li>${e(n(o.address))}</li>`:""}</ul></div>
    ${l.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${l.map(([c,d])=>`<li><a href="${e(d)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${$e(t,a,s.lang)}</div>
</footer>`}function aa({site:t,market:a,L:n,abs:s,items:o}){var i,r,c;let l=(i=t.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"Optician",name:t.name,url:s(`${a.id}/`),image:s(O(t.heroImage||((r=o[0])==null?void 0:r.image))),description:n(t.intro),telephone:l.phone,email:l.email,address:{"@type":"PostalAddress",streetAddress:n(l.address)},currenciesAccepted:a.currency,openingHoursSpecification:le((c=t.hours)!=null?c:[])}}var ta=({site:t,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:t.faq.filter(n=>a(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:a(n.q),acceptedAnswer:{"@type":"Answer",text:a(n.a)}}))});function na({site:t,market:a,L:n,abs:s,productPath:o,catalog:l,byId:i},r){var c,d,u;return{"@context":"https://schema.org","@type":"Product",name:n(r.name),description:n(r.description),image:[r.image,...(c=r.images)!=null?c:[]].map(b=>s(O(b))),url:s(o(r,a)),category:n((d=i(l.categories,r.category))==null?void 0:d.name),...(u=r.colors)!=null&&u.length?{color:r.colors.map(b=>n(b.name)).join(", ")}:{},...r.size?{size:r.size}:{},offers:{"@type":"Offer",price:r.variants[0].price,priceCurrency:a.currency,availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition",seller:{"@type":"Organization",name:t.name}}}}export{fa as renderSite};
