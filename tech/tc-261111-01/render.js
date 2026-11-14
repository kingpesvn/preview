var be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>be[t]);function K(a,t,n="vi"){var s,o,i;return a==null?"":typeof a!="object"?String(a):(i=(o=(s=a[t])!=null?s:a[n])!=null?o:Object.values(a)[0])!=null?i:""}var ve={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},J=a=>{var t;return(t=ve[a])!=null?t:"en-US"};function ye(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function z(a,t){var s,o;if(t.default)return a.basePrice;let n=(o=(s=a.prices)==null?void 0:s[t.id])!=null?o:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ye(a.basePrice*t.rate,t.rounding)}var $e=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function Q(a,t){let n={style:"currency",currency:t.currency};return $e.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(J(t.lang),n).format(a)}function ee(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var G=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,H=(a,t)=>{let n=G(t);return n==null?t:a(n)},S=(a="")=>String(a).replace(/\D/g,"");function Z(a,t,n=""){switch(a){case"phone":return`tel:${S(t.phone)}`;case"zalo":return`https://zalo.me/${S(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${S(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var Y=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,ke=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function te(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let s={};for(let[o,i]of t.searchParams){if(!/^entry\.\d+$/.test(o))continue;let l=i.trim().replace(/^\{|\}$/g,"").toLowerCase();ke.includes(l)&&(s[l]=o)}return Object.keys(s).length?s.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:s}:{error:"no-phone"}:{error:"no-fields"}}var xe={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},f=(a,t=20,n="")=>{var s;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(s=xe[a])!=null?s:""}</svg>`},I=[1,2,3,4,5,6,0],we=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function ne(a,t){let n=a.map(o=>I.indexOf(o)).sort((o,i)=>o-i);return n.every((o,i)=>i===0||o===n[i-1]+1)&&n.length>2?`${t[I[n[0]]]} \u2013 ${t[I[n.at(-1)]]}`:n.map(o=>t[I[o]]).join(", ")}var oe=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>we[n]),opens:t.open,closes:t.close}));function re(a){var n,s;return(s=(n=new Intl.NumberFormat(J(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(o=>o.type==="currency"))==null?void 0:n.value)!=null?s:a.currency}var se=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',ie=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`;var ae={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},Me=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,De=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&Me.test(n.hostname)?n.href:""}catch{return""}},le=(a,t,n,s="btn btn--line")=>{var l;let o=De(a);if(!o)return"";let i=typeof t.reviews=="object"&&((l=t.reviews)==null?void 0:l.google)||ae[n]||ae.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${s}" href="${e(o)}" target="_blank" rel="noopener">${f("star",16)} ${e(i)}</a></p>`},U={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ce={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},pe=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function de(a,t){var i,l,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!n)return"";let s=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(s.getTime()))return"";let o=new Intl.DateTimeFormat((c=ce[t])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(s);return`<time class="rv-date" datetime="${e(a.date)}">${e(o)}</time>`}function Se(a,t){var l,c;let n=a.filter(r=>r.rating>=1&&r.rating<=5);if(n.length<2)return"";let s=n.reduce((r,p)=>r+Number(p.rating),0)/n.length,o=(l=U[t])!=null?l:U.en,i=new Intl.NumberFormat((c=ce[t])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(s);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${f("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(o.count.replace("{n}",String(a.length)))}</span></p>`}function he(a,t,n,s){var l;if(!a.length)return"";let o=(l=U[t])!=null?l:U.en,i=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?o.prev:o.next)}">${f("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Se(a,t)}<div class="rv" data-rv data-rv-more="${e(o.more)}" data-rv-less="${e(o.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(s).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${ze}`}var ze=`<style>
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
upd()}})()<\/script>`;var ue=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function me({site:a,markets:t,url:n,abs:s}){var l;let o=(l=t.find(c=>c.default))!=null?l:t[0],i=t.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(o.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${s(`${o.id}/`)}">
${t.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${s(`${c.id}/`)}">`).join(`
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
`}var Ne="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=JetBrains+Mono:wght@400;600&display=swap",Pe=["cpu","mb","ram","gpu","ssd","psu","case"],je=["cpu","mb","ram","gpu","ssd","psu","case","laptop","monitor","acc"];function nt({site:a,catalog:t,i18n:n,template:s,basePath:o="/",siteUrl:i=a.domain}){let l=ee(o),c=d=>new URL(l(d),i).href,r=t.markets,p=te(a.bookingForm),h=p&&!p.error?p:null,m=r.map(d=>{var N,P,j,T,C,u,R,E,q,L,F;let g=d.lang,b=(P=(N=n[g])!=null?N:n.en)!=null?P:n.vi,v=y=>K(y,g,"en"),$=((j=t.products)!=null?j:[]).map(y=>{var B;let D=((B=y.variants)!=null?B:[]).map(x=>({...x,price:z(x,d)})).filter(x=>x.price!=null);return{...y,variants:D,price:D.length?Math.min(...D.map(x=>x.price)):null}}).filter(y=>y.price!=null),k=(T=a.shipping)!=null?T:{},M={fee:(u=z({basePrice:(C=k.fee)!=null?C:0,prices:k.prices},d))!=null?u:0,free:k.freeFrom?z({basePrice:k.freeFrom,prices:k.freePrices},d):null},w=(R=a.build)!=null?R:{},V={fee:(q=z({basePrice:(E=w.fee)!=null?E:0,prices:w.prices},d))!=null?q:0,free:w.freeFrom?z({basePrice:w.freeFrom,prices:w.freePrices},d):null,headroom:Number(w.headroom)||1.25},A=(F=(L=a.bookingChannels)==null?void 0:L[d.id])!=null?F:["phone"],O={site:a,catalog:t,market:d,markets:r,lang:g,t:b,L:v,url:l,abs:c,products:$,ship:M,build:V,channels:A,money:y=>Q(y,d),socketName:y=>{var D,B,x,X;return(X=(x=v((B=((D=a.sockets)!=null?D:[]).find(fe=>fe.id===y))==null?void 0:B.name))!=null?x:y)!=null?X:""},template:s,gform:h};return{path:`${d.id}/index.html`,html:Te(O)}});return m.push({path:"index.html",html:me({site:a,markets:r,url:l,abs:c})}),m}function ge(a,{t,L:n,socketName:s}){var i,l;let o=[];return a.socket&&o.push(s(a.socket)),a.mem&&o.push(a.mem.toUpperCase()),a.size&&o.push((i=t.size[a.size])!=null?i:a.size),a.category==="case"&&a.fits&&o.push(a.fits.map(c=>{var r;return(r=t.size[c])!=null?r:c}).join(" / ")),a.category==="psu"&&a.watt?o.push(`${a.watt} W`):a.watt&&o.push(`${a.watt} W TDP`),a.category==="cpu"&&a.igpu===!1&&o.push(t.build.noIgpu),((l=a.specs)!=null?l:[]).forEach(c=>{let r=n(c==null?void 0:c[1]);r&&o.push(r)}),o.join(" \xB7 ")}function Te(a){var V,A,W,_,O,N,P,j,T,C;let{site:t,market:n,markets:s,lang:o,t:i,L:l,url:c,abs:r,products:p,ship:h,build:m,socketName:d}=a,g=`${t.name} \xB7 ${l(t.tagline)}`,b=(V=t.theme)!=null?V:{},v=["primary","ink","bg","surface","soft","accent"].filter(u=>b[u]).map(u=>`--${u}:${b[u]}`).join(";"),$=(A=s.find(u=>u.default))!=null?A:s[0],k=s.map(u=>({id:u.id,lang:u.lang,country:u.country,currency:u.currency,href:c(`${u.id}/`)})),M=(W=t.contact)!=null?W:{},w=p.map(u=>{var R,E,q,L;return{id:u.id,c:u.category,n:l(u.name),s:(R=u.socket)!=null?R:"",sn:u.socket?d(u.socket):"",r:(E=u.mem)!=null?E:"",z:(q=u.size)!=null?q:"",f:(L=u.fits)!=null?L:[],w:Number(u.watt)||0,g:u.igpu!==!1,v:u.variants.map(F=>{var y;return[(y=l(F.label))!=null?y:"",F.price]})}});return`<!doctype html>
<html lang="${e(o)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(g)}</title>
<meta name="description" content="${e(l(t.intro))}">
<link rel="canonical" href="${r(`${n.id}/`)}">
${s.map(u=>`<link rel="alternate" hreflang="${e(u.lang)}-${e(u.country)}" href="${r(`${u.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${r(`${$.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(g)}">
<meta property="og:description" content="${e(l(t.intro))}">
<meta property="og:url" content="${r(`${n.id}/`)}">
<meta property="og:site_name" content="${e(t.name)}">
<meta property="og:image" content="${e(r(G(t.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((_=b.bg)!=null?_:"#F7F7F4")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${Ne}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${v}}</style>
${Y(Ge(a))}${((O=t.faq)!=null?O:[]).length?Y(He(a)):""}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(k))}' data-wa="${e(S((N=M.whatsapp)!=null?N:""))}" data-email="${e((P=M.email)!=null?P:"")}" data-copied="${e(i.copied)}" data-store="${e(`kp-pc-${String((j=t.name)!=null?j:"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`)}" data-currency="${e(n.currency)}" data-lang="${e(o)}" data-ship="${h.fee}" data-free="${(T=h.free)!=null?T:""}" data-build-fee="${m.fee}" data-build-free="${(C=m.free)!=null?C:""}" data-headroom="${m.headroom}">
<script type="application/json" id="pc-data">${JSON.stringify(w).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${e(i.skip)}</a>
${ie(i)}
${Ce(a)}
<main id="main">
  ${Re(a)}
  ${Ee(a)}
  ${qe(a)}
  ${Le(a)}
  ${Fe(a)}
  ${Be(a)}
  ${Ve(a)}
  ${Ae(a)}
</main>
${Oe(a)}
<a class="cartfab" href="#cart" aria-label="${e(i.nav.cart)}">${f("bag",20)}<b data-bag-count hidden>0</b></a>
<p class="toast" data-toast role="status" hidden></p>
</body>
</html>
`}function Ce({site:a,market:t,markets:n,t:s,url:o}){return`<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${o(`${t.id}/`)}">
      ${a.logo?`<img src="${e(H(o,a.logo))}" alt="" width="32" height="32">`:'<span class="brand-dot" aria-hidden="true"></span>'}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="${e(s.nav.label)}">
      <a href="#build">${e(s.nav.build)}</a>
      <a href="#shop">${e(s.nav.shop)}</a>
      <a href="#visit">${e(s.nav.visit)}</a>
      <a class="nav-cart" href="#cart">${e(s.nav.cart)} <b data-bag-count hidden>0</b></a>
    </nav>
    ${n.length>1?`<details class="market">
      <summary aria-label="${e(s.market.label)}">${f("globe",16)}<span>${e(t.id.toUpperCase())}</span></summary>
      <ul>${n.map(i=>`<li><a href="${o(`${i.id}/`)}" hreflang="${e(i.lang)}"${i.id===t.id?' aria-current="true"':""}>${e(i.country)} \xB7 ${e(i.currency)} ${e(re(i))}</a></li>`).join("")}</ul>
    </details>`:""}
  </div>
</header>`}function Re({site:a,t,L:n,url:s}){var i;let o=((i=a.stats)!=null?i:[]).filter(l=>(l==null?void 0:l.value)&&n(l.label));return`<section class="hero wrap" aria-labelledby="h-title">
  <div class="hero-copy">
    ${n(a.heroKicker)?`<p class="kicker">${e(n(a.heroKicker))}</p>`:""}
    <h1 id="h-title">${e(n(a.tagline))}</h1>
    ${n(a.intro)?`<p class="lead">${e(n(a.intro))}</p>`:""}
    <p class="actions"><a class="btn btn--ink" href="#build">${e(t.hero.build)} ${f("arrow",16)}</a><a class="btn btn--line" href="#shop">${e(t.hero.shop)}</a></p>
  </div>
  <figure class="hero-img"><img src="${e(H(s,a.heroImage||"photos/h-hero.webp"))}" alt="" width="1200" height="1500" fetchpriority="high"></figure>
  ${o.length?`<dl class="stats">${o.map(l=>`<div><dt>${e(l.value)}</dt><dd>${e(n(l.label))}</dd></div>`).join("")}</dl>`:""}
</section>`}function Ee({site:a,t,L:n,products:s,money:o}){var c;let i=Object.fromEntries(s.map(r=>[r.id,r])),l=((c=a.uses)!=null?c:[]).filter(r=>{var p;return(r==null?void 0:r.id)&&n(r.name)&&((p=r.parts)!=null?p:[]).some(h=>i[h])});return l.length?`<section class="sec wrap" id="uses" aria-labelledby="u-title">
  <div class="sec-head"><p class="eyebrow">01</p><h2 id="u-title" class="h2">${e(t.uses.title)}</h2><p class="muted">${e(t.uses.text)}</p></div>
  <ol class="uses">${l.map((r,p)=>{var m,d;let h=((m=r.parts)!=null?m:[]).reduce((g,b)=>{var v,$;return g+(($=(v=i[b])==null?void 0:v.variants[0].price)!=null?$:0)},0);return`<li><a href="#build" data-preset="${e(((d=r.parts)!=null?d:[]).filter(g=>i[g]).join(" "))}">
      <span class="u-n">${String(p+1).padStart(2,"0")}</span>
      <span class="u-t"><b>${e(n(r.name))}</b>${n(r.text)?`<small>${e(n(r.text))}</small>`:""}</span>
      <span class="u-p"><small>${e(t.uses.about)}</small>${e(o(h))}</span>
      <span class="u-go">${f("arrow",22)}</span>
    </a></li>`}).join("")}</ol>
</section>`:""}function qe(a){let{t,L:n,products:s,money:o,build:i}=a,l=h=>s.filter(m=>m.category===h);if(!l("cpu").length||!l("mb").length)return"";let c=(h,m)=>{var d,g,b,v;return`<li data-part data-s="${e((d=h.socket)!=null?d:"")}" data-r="${e((g=h.mem)!=null?g:"")}" data-z="${e((b=h.size)!=null?b:"")}" data-f="${e(((v=h.fits)!=null?v:[]).join(" "))}" data-w="${Number(h.watt)||0}"><label class="opt-row">
    <input type="radio" name="b-${m}" value="${e(h.id)}" data-price="${h.variants[0].price}">
    <span class="o-t"><b>${e(n(h.name))}</b><small>${e(ge(h,a))}${n(h.variants[0].label)?` \xB7 ${e(n(h.variants[0].label))}`:""}</small></span>
    <span class="o-p">${e(o(h.variants[0].price))}</span>
  </label></li>`},r=(h,m)=>{let d=l(h);if(!d.length)return"";let g=h==="gpu"?`<li data-part data-none><label class="opt-row"><input type="radio" name="b-gpu" value="" data-price="0" checked><span class="o-t"><b>${e(t.build.noGpu)}</b><small>${e(t.build.noGpuHint)}</small></span><span class="o-p">\u2014</span></label></li>`:"";return`<fieldset class="step" data-step="${h}">
      <legend><span class="s-n">${String(m+1).padStart(2,"0")}</span> ${e(t.parts[h])}${h==="gpu"?` <small>${e(t.build.optional)}</small>`:""}</legend>
      ${t.build.hints[h]?`<p class="hint" data-hint="${h}">${e(t.build.hints[h])}</p>`:""}
      <ul class="opts">${g}${d.map(b=>c(b,h)).join("")}</ul>
    </fieldset>`},p=i.free!=null?t.build.feeFree.replace("{fee}",o(i.fee)).replace("{free}",o(i.free)):t.build.feeOnly.replace("{fee}",o(i.fee));return`<section class="sec sec--build" id="build" aria-labelledby="b-title">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">02</p><h2 id="b-title" class="h2">${e(t.build.title)}</h2><p class="muted">${e(t.build.text)}</p></div>
    <div class="build" data-build data-sock-tpl="${e(t.build.sockFor)}" data-mem-tpl="${e(t.build.memFor)}" data-size-tpl="${e(t.build.sizeFor)}" data-psu-tpl="${e(t.build.psuFor)}" data-weak="${e(t.build.weak)}" data-sizes='${e(JSON.stringify(t.size))}'>
      <div class="steps">${Pe.map(r).join("")}</div>
      <aside class="summary" aria-live="polite">
        <p class="eyebrow">${e(t.build.summary)}</p>
        <ul class="sum-list" data-b-list data-empty="${e(t.build.empty)}"><li class="muted">${e(t.build.empty)}</li></ul>
        <dl class="sum">
          <div><dt>${e(t.build.watt)}</dt><dd data-b-watt>\u2014</dd></div>
          <div><dt>${e(t.build.subtotal)}</dt><dd data-b-sub>\u2014</dd></div>
          <div><dt>${e(t.build.fee)}</dt><dd data-b-fee data-free-label="${e(t.build.free)}">${e(o(i.fee))}</dd></div>
          <div class="sum-total"><dt>${e(t.build.total)}</dt><dd data-b-total>\u2014</dd></div>
        </dl>
        <ul class="warns" data-b-warns data-w-missing="${e(t.build.wMissing)}" data-w-gpu="${e(t.build.wGpu)}"></ul>
        <p class="hint">${e(p)}</p>
        <button type="button" class="btn btn--ink btn--full" data-b-add disabled>${f("bag",18)} ${e(t.build.add)}</button>
        <button type="button" class="link" data-b-reset>${e(t.build.reset)}</button>
      </aside>
    </div>
  </div>
</section>`}function Le(a){let{t,L:n,url:s,products:o,money:i}=a;if(!o.length)return"";let l=je.filter(r=>o.some(p=>p.category===r)),c=(r,p,h)=>`<button type="button" class="chip" data-f="c" data-v="${e(r)}" aria-pressed="${h?"true":"false"}">${e(p)}</button>`;return`<section class="sec wrap" id="shop" aria-labelledby="s-title">
  <div class="sec-head"><p class="eyebrow">03</p><h2 id="s-title" class="h2">${e(t.shop.title)}</h2><p class="muted">${e(t.shop.text)}</p></div>
  <div class="chips" role="group" aria-label="${e(t.shop.type)}">${c("all",t.shop.all,!0)}${l.map(r=>c(r,t.parts[r],!1)).join("")}</div>
  <p class="count" data-count data-tpl="${e(t.shop.count)}" aria-live="polite">${e(t.shop.count.replace("{n}",o.length))}</p>
  <ul class="rows" data-grid>${o.map(r=>{var p;return`<li class="prod" data-id="${e(r.id)}" data-c="${e(r.category)}">
    <div class="p-img">${r.image?`<img sizes="96px" src="${e(H(s,r.image))}" alt="" width="600" height="600" loading="lazy">`:""}</div>
    <div class="p-t">
      <p class="tags">${e((p=t.parts[r.category])!=null?p:"")}${n(r.badge)?` <span class="badge">${e(n(r.badge))}</span>`:""}</p>
      <h3>${e(n(r.name))}</h3>
      <p class="mono">${e(ge(r,a))}</p>
      ${n(r.description)?`<p class="muted desc">${e(n(r.description))}</p>`:""}
      ${r.variants.length>1?`<div class="vars" role="radiogroup" aria-label="${e(t.shop.version)}">${r.variants.map((h,m)=>`<label class="var"><input type="radio" name="v-${e(r.id)}" value="${m}"${m?"":" checked"}><span>${e(n(h.label))}</span></label>`).join("")}</div>`:""}
    </div>
    <div class="p-buy"><span class="price" data-price>${e(i(r.variants[0].price))}</span>
      <button type="button" class="addbtn" data-add="${e(r.id)}">${f("plus",16)} <span>${e(t.shop.add)}</span></button></div>
  </li>`}).join("")}</ul>
  <p class="empty" data-empty hidden>${e(t.shop.empty)}</p>
</section>`}function Fe({site:a,t,L:n}){var i,l;let s=((i=a.services)!=null?i:[]).filter(c=>n(c==null?void 0:c.name)),o=String((l=n(a.perks))!=null?l:"").split(`
`).map(c=>c.trim()).filter(Boolean);return!s.length&&!o.length?"":`<section class="sec wrap" id="services" aria-labelledby="sv-title">
  <div class="sec-head"><p class="eyebrow">04</p><h2 id="sv-title" class="h2">${e(t.services.title)}</h2></div>
  ${s.length?`<ol class="svc">${s.map((c,r)=>`<li><span class="u-n">${String(r+1).padStart(2,"0")}</span><div><h3>${e(n(c.name))}</h3>${n(c.text)?`<p class="muted">${e(n(c.text))}</p>`:""}</div></li>`).join("")}</ol>`:""}
  ${o.length?`<ul class="perks">${o.map(c=>`<li>${f("check",16)} ${e(c)}</li>`).join("")}</ul>`:""}
</section>`}function Be({site:a,t,L:n,lang:s}){let o=le(a,t,s,"btn btn--line"),i=pe(a);return a.showReviews===!1||!i.length&&!o?"":`<section class="sec wrap" aria-labelledby="rv-title">
  <div class="sec-head"><h2 id="rv-title" class="h2">${e(t.reviews.title)}</h2></div>
  ${he(i,s,"reviews",l=>`<figure class="review">
    <p class="stars" aria-label="${e(l.rating)}/5">${Array.from({length:5},(c,r)=>`<span class="${r<l.rating?"on":""}">${f("star",14)}</span>`).join("")}</p>
    <blockquote>${e(n(l.text))}</blockquote>
    <figcaption>${e(l.name)}${n(l.bought)?`<small>${e(n(l.bought))}</small>`:""}${de(l,s)}</figcaption>
  </figure>`)}${o}
</section>`}function Ve(a){var b;let{t,channels:n,gform:s,market:o,money:i,ship:l,site:c}=a,r=(b=c.contact)!=null?b:{},p=t.form,h=s?` data-gform="${e(s.action)}" data-gmap='${e(JSON.stringify(s.fields))}'`:"",m=t.orderText.replace(/\{\w+\}/g,"\u2026"),d=v=>n.map(($,k)=>{var M;return`<button type="submit" class="btn btn--full ${v!=null?v:k?"btn--line":"btn--ink"}" data-channel="${e($)}" data-href="${e(Z($,r,m))}">${f($,18)} ${e($==="phone"?p.call:p.send.replace("{channel}",(M=t.via[$])!=null?M:$))}</button>`}).join(""),g=l.free!=null?t.bag.shipFree.replace("{fee}",i(l.fee)).replace("{free}",i(l.free)):t.bag.shipFee.replace("{fee}",i(l.fee));return`<section class="sec sec--cart" id="cart" aria-labelledby="c-title">
  <div class="wrap">
  <div class="sec-head"><p class="eyebrow">05</p><h2 id="c-title" class="h2">${e(t.bag.title)}</h2><p class="muted">${e(t.bag.text)}</p></div>
  <form class="order" data-order novalidate${h} data-text="${e(t.orderText)}" data-market="${e(`${o.id.toUpperCase()} \xB7 ${o.currency}`)}" data-ship-label="${e(p.ship)}" data-pick-label="${e(p.pickup)}">
    <div class="order-fields">
      <div class="order-l">
        <ul class="bag-list" data-bag data-remove="${e(t.bag.remove)}" data-kit-tag="${e(t.bag.buildTag)}"></ul>
        <div class="bag-empty" data-bag-empty><p>${e(t.bag.empty)}</p><a class="btn btn--line" href="#build">${e(t.hero.build)}</a></div>
        <dl class="sum">
          <div><dt>${e(t.bag.subtotal)}</dt><dd data-b2-sub>\u2014</dd></div>
          <div data-b2-fee-row hidden><dt>${e(t.build.fee)}</dt><dd data-b2-fee></dd></div>
          <div data-b2-ship-row hidden><dt>${e(t.bag.ship)}</dt><dd data-b2-ship></dd></div>
          <div class="sum-total"><dt>${e(t.bag.total)}</dt><dd data-b2-total>\u2014</dd></div>
        </dl>
      </div>
      <div class="order-r">
        <fieldset class="field"><legend>${e(p.how)}</legend><div class="seg">
          <label><input type="radio" name="version" value="pickup" checked><span>${e(p.pickup)}</span></label>
          <label><input type="radio" name="version" value="ship"><span>${e(p.ship)}</span></label>
        </div><p class="hint">${e(g)}</p></fieldset>
        <label class="field"><span>${e(p.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(p.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        <label class="field" data-addr hidden><span>${e(p.address)} *</span><input name="address" autocomplete="street-address" maxlength="200"></label>
        <label class="field"><span>${e(p.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${e(p.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(p.required)}</p>
        <button class="btn btn--ink btn--full" type="submit" data-submit>${f("check",18)} ${e(p.submit)}</button>
        <p class="hint">${e(p.privacy)}</p>
      </div>
    </div>
    <div class="done" data-done hidden tabindex="-1">
      <p class="done-title">${f(s?"check":"arrow",22)} ${e(s?p.done:p.stepTitle)}</p>
      <p>${e(s?p.doneText:p.stepText)}</p>
      <div class="buy">${d(s?"btn--line":void 0)}</div>
      ${s?"":`<button type="button" class="link back" data-edit>${e(p.edit)}</button>`}
    </div>
    <p class="form-msg" role="status" hidden></p>
  </form>
  </div>
</section>`}function Ae({site:a,t,L:n,channels:s}){var r,p,h,m;let o=(r=a.contact)!=null?r:{},i=encodeURIComponent((p=o.mapQuery)!=null?p:n(o.address)),l=d=>d.length===7?t.visit.everyDay:ne(d,t.days),c=((h=a.faq)!=null?h:[]).filter(d=>n(d==null?void 0:d.q));return`<section class="sec wrap" id="visit" aria-labelledby="v-title">
  <div class="visit">
    <div>
      <p class="eyebrow">06</p>
      <h2 id="v-title" class="h2">${e(t.visit.title)}</h2>
      ${n(o.address)?`<p class="addr">${e(n(o.address))}</p>`:""}
      ${((m=a.hours)!=null?m:[]).length?`<table class="hours"><tbody>${a.hours.map(d=>`<tr><th scope="row">${e(l(d.days))}</th><td>${e(d.open)} \u2013 ${e(d.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <p class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(t.visit.directions)} ${f("arrow",16)}</a>
        ${s.map(d=>{var g;return`<a class="btn btn--line" href="${e(Z(d,o))}" ${se(d)}>${f(d,18)} ${e((g=t.via[d])!=null?g:d)}</a>`}).join("")}
      </p>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
  ${c.length?`<div class="faq"><h2 class="h3">${e(t.faq.title)}</h2>${c.map((d,g)=>`<details${g===0?" open":""}><summary>${e(n(d.q))}</summary><p>${e(n(d.a))}</p></details>`).join("")}</div>`:""}
</section>`}function Oe({site:a,t,L:n,market:s}){var l,c;let o=(l=a.contact)!=null?l:{},i=Object.entries((c=a.social)!=null?c:{}).filter(([,r])=>r);return`<footer class="footer"><div class="wrap">
  <p class="foot-name">${e(a.name)}</p>
  ${n(a.disclaimer)?`<p class="disclaimer">${e(n(a.disclaimer))}</p>`:""}
  <p>${o.phone?`${e(t.footer.hotline)}: <a href="tel:${S(o.phone)}">${e(o.phone)}</a>`:""}${o.email?` \xB7 <a href="mailto:${e(o.email)}">${e(o.email)}</a>`:""}</p>
  ${i.length?`<p class="social">${i.map(([r,p])=>`<a href="${e(p)}" target="_blank" rel="noopener">${e(r==="tiktok"?"TikTok":r==="youtube"?"YouTube":r[0].toUpperCase()+r.slice(1))}</a>`).join(" \xB7 ")}</p>`:""}
  <p class="foot-bottom"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${ue(a,t,s.lang)}</p>
</div></footer>`}function Ge({site:a,market:t,L:n,abs:s,products:o}){var l,c;let i=(l=a.contact)!=null?l:{};return{"@context":"https://schema.org","@type":"ComputerStore",name:a.name,url:s(`${t.id}/`),description:n(a.intro),image:s(G(a.heroImage||"photos/h-hero.webp")),telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:n(i.address)},openingHoursSpecification:oe((c=a.hours)!=null?c:[]),makesOffer:o.map(r=>({"@type":"Offer",name:n(r.name),price:r.price,priceCurrency:t.currency,itemCondition:"https://schema.org/NewCondition"}))}}var He=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});export{nt as renderSite};
