var ce={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>ce[a]);function V(t,a,n="vi"){var i,r,l;return t==null?"":typeof t!="object"?String(t):(l=(r=(i=t[a])!=null?i:t[n])!=null?r:Object.values(t)[0])!=null?l:""}var pe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},L=t=>{var a;return(a=pe[t])!=null?a:"en-US"};function de(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function H(t,a){var i,r;if(a.default)return t.basePrice;let n=(r=(i=t.prices)==null?void 0:i[a.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:de(t.basePrice*a.rate,a.rounding)}var he=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function I(t,a){let n={style:"currency",currency:a.currency};return he.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(L(a.lang),n).format(t)}function U(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var E=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,z=(t,a)=>{let n=E(a);return n==null?a:t(n)},y=(t="")=>String(t).replace(/\D/g,"");function A(t,a,n=""){switch(t){case"phone":return`tel:${y(a.phone)}`;case"zalo":return`https://zalo.me/${y(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${y(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var O=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,ue=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function W(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let i={};for(let[r,l]of a.searchParams){if(!/^entry\.\d+$/.test(r))continue;let s=l.trim().replace(/^\{|\}$/g,"").toLowerCase();ue.includes(s)&&(i[s]=r)}return Object.keys(i).length?i.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:i}:{error:"no-phone"}:{error:"no-fields"}}var _={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var me={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},d=(t,a=20,n="")=>{var i;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(i=me[t])!=null?i:""}</svg>`},F=[1,2,3,4,5,6,0],ge=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function J(t,a){let n=t.map(r=>F.indexOf(r)).sort((r,l)=>r-l);return n.every((r,l)=>l===0||r===n[l-1]+1)&&n.length>2?`${a[F[n[0]]]} \u2013 ${a[F[n.at(-1)]]}`:n.map(r=>a[F[r]]).join(", ")}var Z=t=>t.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>ge[n]),opens:a.open,closes:a.close}));function Y(t){var n,i;return(i=(n=new Intl.NumberFormat(L(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?i:t.currency}var G=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',X=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,Q=(t,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},K={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},fe=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ve=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&fe.test(n.hostname)?n.href:""}catch{return""}},ee=(t,a,n,i="btn btn--line")=>{var s;let r=ve(t);if(!r)return"";let l=typeof a.reviews=="object"&&((s=a.reviews)==null?void 0:s.google)||K[n]||K.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${i}" href="${e(r)}" target="_blank" rel="noopener">${d("star",16)} ${e(l)}</a></p>`},B={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},te={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ae=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ne(t,a){var l,s,o;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((l=t==null?void 0:t.date)!=null?l:"").trim());if(!n)return"";let i=new Date(Date.UTC(+n[1],+n[2]-1,+((s=n[3])!=null?s:1)));if(Number.isNaN(i.getTime()))return"";let r=new Intl.DateTimeFormat((o=te[a])!=null?o:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(i);return`<time class="rv-date" datetime="${e(t.date)}">${e(r)}</time>`}function be(t,a){var s,o;let n=t.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let i=n.reduce((c,p)=>c+Number(p.rating),0)/n.length,r=(s=B[a])!=null?s:B.en,l=new Intl.NumberFormat((o=te[a])!=null?o:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(i);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${d("star",18)}</span><strong>${l}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(t.length)))}</span></p>`}function oe(t,a,n,i){var s;if(!t.length)return"";let r=(s=B[a])!=null?s:B.en,l=o=>`<button type="button" class="rv-btn" data-rv-${o} aria-label="${e(o==="prev"?r.prev:r.next)}">${d("arrow",18,o==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${be(t,a)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(i).join("")}</div>
      <div class="rv-nav" hidden>${l("prev")}${l("next")}</div>
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
upd()}})()<\/script>`;var re=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function ie({site:t,markets:a,url:n,abs:i}){var s;let r=(s=a.find(o=>o.default))!=null?s:a[0],l=a.map(o=>({id:o.id,lang:o.lang,country:o.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${i(`${r.id}/`)}">
${a.map(o=>`<link rel="alternate" hreflang="${e(o.lang)}-${e(o.country)}" href="${i(`${o.id}/`)}">`).join(`
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
<body><p>${a.map(o=>`<a href="${n(`${o.id}/`)}">${e(o.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var $e="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";function ke(t,a){var n;return((n=t.products)!=null?n:[]).map(i=>{var r,l;return{...i,price:H((l=((r=i.variants)!=null?r:[])[0])!=null?l:{},a)}}).filter(i=>i.price!=null)}function se(t,a,n){var i;return(a==null?void 0:a[n.id])!=null?a[n.id]:t==null||t===""?null:n.default?Number(t):Math.round(Number(t)*((i=n.rate)!=null?i:1)*100)/100}function Je({site:t,catalog:a,i18n:n,template:i,basePath:r="/",siteUrl:l=t.domain}){var b,w,$,M,u,m,D;let s=U(r),o=v=>new URL(s(v),l).href,c=a.markets,p=W(t.orderForm),h=p&&!p.error?p:null,f=[];for(let v of c){let S=v.lang,j=(w=(b=n[S])!=null?b:n.en)!=null?w:n.vi,N=x=>V(x,S,"en"),P=ke(a,v),q=(($=a.categories)!=null?$:[]).filter(x=>N(x==null?void 0:x.name)&&P.some(le=>le.category===x.id)),C=(u=(M=t.orderChannels)==null?void 0:M[v.id])!=null?u:["phone"],T=x=>I(x,v),k=(m=t.quote)!=null?m:{},R={visit:(D=se(k.visitFee,k.visitFeeManual,v))!=null?D:0,free:se(k.freeFrom,k.freeFromManual,v),urgent:Number(k.urgent)||0},g={site:t,catalog:a,market:v,markets:c,lang:S,t:j,L:N,url:s,abs:o,channels:C,money:T,items:P,cats:q,template:i,gform:h,fees:R};f.push({path:`${v.id}/index.html`,html:xe(g)})}return f.push({path:"index.html",html:ie({site:t,markets:c,url:s,abs:o})}),f}function xe(t){var v,S,j,N,P,q,C,T,k,R;let{site:a,market:n,markets:i,lang:r,t:l,L:s,url:o,abs:c,fees:p}=t,h=`${n.id}/`,f=`${a.name} \xB7 ${s(a.tagline)}`,b=s(a.intro),w=(v=i.find(g=>g.default))!=null?v:i[0],$=(S=a.theme)!=null?S:{},M=["primary","ink","bg","surface","soft","accent"].filter(g=>$[g]).map(g=>`--${g}:${$[g]}`).join(";"),u=i.map(g=>({id:g.id,lang:g.lang,country:g.country,currency:g.currency,href:o(`${g.id}/`)})),m=(j=a.contact)!=null?j:{},D=`kp-fix-${String((N=a.name)!=null?N:"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${n.id}`;return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(f)}</title>
<meta name="description" content="${e(b)}">
<link rel="canonical" href="${c(h)}">
${i.map(g=>`<link rel="alternate" hreflang="${e(g.lang)}-${e(g.country)}" href="${c(`${g.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${w.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(f)}">
<meta property="og:description" content="${e(b)}">
<meta property="og:url" content="${c(h)}">
<meta property="og:image" content="${e(c(E(a.heroImage||((P=t.cats[0])==null?void 0:P.image))))}">
<meta property="og:site_name" content="${e(a.name)}">
<meta name="theme-color" content="${e((q=$.bg)!=null?q:"#FAFAF7")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${$e}">
<link rel="stylesheet" href="${o("assets/style.css")}">
<style>:root{${M}}</style>
${O(Ee(t))+(((C=a.faq)!=null?C:[]).length?O(Ae(t)):"")}
<script src="${o("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(u))}' data-copied="${e(l.copied)}" data-wa="${e(y((T=m.whatsapp)!=null?T:""))}" data-email="${e((k=m.email)!=null?k:"")}" data-tz="${e((R=a.timezone)!=null?R:"Asia/Ho_Chi_Minh")}" data-store="${e(D)}" data-currency="${e(n.currency)}" data-lang="${e(r)}" data-fees='${e(JSON.stringify(p))}'>
<a class="skip" href="#main">${e(l.skip)}</a>
${X(l)}
${s(a.announcement)?`<p class="announce">${e(s(a.announcement))}</p>`:""}
${we(t)}
<main id="main">
${[Me,De,Se,ze,Ne,Pe,je,qe,Ce,Te].map(g=>g(t)).join(`
`)}
</main>
${Re(t)}
<nav class="dock" aria-label="${e(l.nav.quote)}">
  ${m.phone?`<a href="tel:${e(y(m.phone))}">${d("phone",20)}<span>${e(l.nav.call)}</span></a>`:""}
  <a class="primary" href="#quote">${d("doc",20)}<span>${e(l.nav.quote)}</span><b class="count" data-count hidden>0</b></a>
</nav>
</body>
</html>
`}function we({site:t,market:a,markets:n,t:i,url:r,L:l}){var c;let s=(c=t.contact)!=null?c:{},o=[["#services",i.nav.services],["#quote",i.nav.quote],["#work",i.nav.work],["#warranty",i.nav.warranty],["#book",i.nav.book]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${a.id}/`)}">
      ${t.logo?`<img src="${e(z(r,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${d("hammer",18)}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${o.map(([p,h])=>`<a href="${p}">${e(h)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(i.market.label)}">${d("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(Y(a))}</span></span></summary>
        <ul>${n.map(p=>`<li><a href="${r(`${p.id}/`)}" hreflang="${e(p.lang)}"${p.id===a.id?' aria-current="true"':""}>${e(p.country)} \xB7 ${e(p.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      ${s.phone?`<a class="btn btn--primary btn--sm hide-sm" href="tel:${e(y(s.phone))}">${d("phone",16)} ${e(s.phone)}</a>`:""}
      <details class="mnav">
        <summary aria-label="${e(i.nav.openMenu)}">${d("menu",22)}</summary>
        <nav aria-label="Menu">${o.map(([p,h])=>`<a href="${p}">${e(h)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Me({site:t,t:a,L:n,url:i}){var s,o;let r=(s=t.contact)!=null?s:{},l=((o=t.stats)!=null?o:[]).filter(c=>c==null?void 0:c.value);return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${n(t.heroKicker)?`<p class="kicker">${e(n(t.heroKicker))}</p>`:""}
      <h1>${e(n(t.tagline))}</h1>
      <p class="lead">${e(n(t.intro))}</p>
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#quote">${d("doc",18)} ${e(a.hero.quote)}</a>
        ${r.phone?`<a class="btn btn--line btn--lg" href="tel:${e(y(r.phone))}">${d("phone",18)} ${e(a.hero.call)}</a>`:""}
      </div>
      ${n(t.emergency)?`<p class="sos">${d("bolt",16)} ${e(n(t.emergency))}</p>`:""}
    </div>
    ${t.heroImage?`<figure class="hero-pic"><img src="${e(z(i,t.heroImage))}" alt="" width="800" height="1000" fetchpriority="high"></figure>`:""}
  </div>
  ${l.length?`<div class="wrap"><ul class="stats">${l.slice(0,4).map(c=>`<li><b>${e(n(c.value))}</b><span>${e(n(c.label))}</span></li>`).join("")}</ul></div>`:""}
</section>`}function De({cats:t,items:a,t:n,L:i,url:r,money:l}){if(!t.length)return"";let s=o=>Math.min(...a.filter(c=>c.category===o).map(c=>c.price));return`<section class="section section--line" id="services" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.services.kicker)}</p><h2 id="svc-title" class="h2">${e(n.services.title)}</h2></div>
    <ol class="cats">${t.map((o,c)=>{var p;return`<li><a href="?cat=${e(o.id)}#quote" data-jump="${e(o.id)}">
      <span class="n">${String(c+1).padStart(2,"0")}</span>
      <span class="cat-body"><span class="cat-name">${e(i(o.name))}</span>${i(o.text)?`<span class="cat-text">${e(i(o.text))}</span>`:""}</span>
      <span class="cat-c">${e(n.services.from.replace("{price}",l(s(o.id))))}</span>
      ${o.image?`<img src="${e(z(r,o.image))}" alt="" width="1000" height="750" loading="lazy">`:`<span class="cat-ic">${d((p=o.icon)!=null?p:"wrench",28)}</span>`}
    </a></li>`}).join("")}</ol>
  </div>
</section>`}function Se({cats:t,items:a,t:n,L:i,money:r,fees:l}){if(!t.length)return"";let s=n.quote;return`<section class="section section--soft" id="quote" aria-labelledby="quote-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(s.kicker)}</p><h2 id="quote-title" class="h2">${e(s.title)}</h2><p class="lead">${e(s.text)}</p></div>
    <div class="qb" data-quote>
      <div class="qb-main">
        <div class="tabs" role="tablist" aria-label="${e(n.services.title)}">${t.map((o,c)=>{var p;return`<button type="button" class="tab" role="tab" id="tab-${e(o.id)}" aria-controls="pane-${e(o.id)}" aria-selected="${c?"false":"true"}" data-tab="${e(o.id)}">${d((p=o.icon)!=null?p:"wrench",16)} ${e(i(o.name))}<b class="tab-n" data-tab-n hidden>0</b></button>`}).join("")}</div>
        ${t.map((o,c)=>`<div class="pane" role="tabpanel" id="pane-${e(o.id)}" aria-labelledby="tab-${e(o.id)}" data-pane="${e(o.id)}"${c?" data-later":""}>
          <h3 class="pane-h">${e(i(o.name))}</h3>
          <ul class="rows">${a.filter(p=>p.category===o.id).map(p=>{var h,f;return`<li class="row" data-item="${e(p.id)}" data-price="${p.price}" data-name="${e(i(p.name))}" data-unit="${e((h=i(p.unit))!=null?h:"")}" data-min="${Number(p.min)||0}">
            <div class="row-name"><b>${e(i(p.name))}</b>${i(p.note)?`<small>${e(i(p.note))}</small>`:""}</div>
            <p class="row-price"><b>${e(r(p.price))}</b><span>/ ${e((f=i(p.unit))!=null?f:"")}</span></p>
            <label class="qty"><span class="sr">${e(s.qty)} \u2013 ${e(i(p.name))}</span><button type="button" data-step="-1" aria-label="\u2212">${d("minus",16)}</button><input type="number" min="0" step="${Number(p.step)||1}" value="0" inputmode="decimal" data-qty><button type="button" data-step="1" aria-label="+">${d("plus",16)}</button></label>
            <p class="row-line" data-line></p>
          </li>`}).join("")}</ul>
        </div>`).join("")}
      </div>
      <aside class="qb-sum" aria-labelledby="sum-title">
        <h3 id="sum-title" class="h4">${d("doc",18)} ${e(s.lines)}</h3>
        <ul class="sum-lines" data-sum-lines></ul>
        <p class="muted small" data-sum-empty>${e(s.empty)}</p>
        <dl class="sum">
          <div><dt>${e(s.subtotal)}</dt><dd data-sub>${e(r(0))}</dd></div>
          <div><dt>${e(s.visit)}</dt><dd data-visit data-free="${e(s.visitFree)}">${e(l.visit?r(l.visit):s.visitFree)}</dd></div>
          ${l.free?`<p class="small muted sum-hint" data-free-hint data-tpl="${e(s.freeFrom)}">${e(s.freeFrom.replace("{price}",r(l.free)))}</p>`:""}
          ${l.urgent?`<label class="check urgent"><input type="checkbox" data-urgent> ${e(s.urgent.replace("{n}",l.urgent))}</label><div data-urgent-row hidden><dt>${e(s.urgentL)}</dt><dd data-urgent-v></dd></div>`:""}
          <div class="sum-total"><dt>${e(s.total)}</dt><dd data-total>${e(r(0))}</dd></div>
        </dl>
        <p class="small muted">${d("shield",14)} ${e(s.note)}</p>
        <a class="btn btn--primary btn--lg btn--full" href="#book" data-use-quote>${d("calendar",18)} ${e(s.book)}</a>
        <button type="button" class="link" data-clear hidden>${e(s.clear)}</button>
      </aside>
    </div>
  </div>
</section>`}function ze({site:t,t:a,L:n}){var r;let i=((r=t.steps)!=null?r:[]).filter(l=>n(l==null?void 0:l.title));return i.length?`<section class="section" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(a.steps.title)}</h2></div>
    <ol class="steps">${i.map((l,s)=>{var o;return`<li><span class="n">${String(s+1).padStart(2,"0")}</span>${d((o=l.icon)!=null?o:"check",24)}<h3 class="h4">${e(n(l.title))}</h3><p class="muted">${e(n(l.text))}</p></li>`}).join("")}</ol>
  </div>
</section>`:""}function Ne({site:t,t:a,L:n,url:i}){var l;let r=((l=t.album)!=null?l:[]).filter(s=>s==null?void 0:s.image);return r.length?`<section class="section section--dark" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.work.kicker)}</p><h2 id="work-title" class="h2">${e(a.work.title)}</h2></div>
    <ul class="album">${r.map((s,o)=>{var c,p;return`<li${o>=10?' class="is-more"':""}><figure><img sizes="${_.wide}" src="${e(z(i,s.image))}" alt="${e((c=n(s.title))!=null?c:"")}" width="1000" height="750" loading="lazy"><figcaption>${n(s.tag)?`<span class="tag">${e(n(s.tag))}</span>`:""}${e((p=n(s.title))!=null?p:"")}</figcaption></figure></li>`}).join("")}</ul>
    ${r.length>10?`<p class="more"><button type="button" class="btn btn--line" data-album-more hidden>${e(a.work.more)}</button></p>`:""}
  </div>
</section>`:""}function Pe({site:t,t:a,L:n,url:i}){var s,o;let r=((s=t.warranty)!=null?s:[]).filter(c=>n(c==null?void 0:c.title)),l=((o=t.areas)!=null?o:[]).map(c=>n(c)).filter(Boolean);return!r.length&&!l.length?"":`<section class="section" id="warranty" aria-labelledby="war-title">
  <div class="wrap war">
    <div>
      <div class="sec-head"><p class="kicker">${e(a.warranty.kicker)}</p><h2 id="war-title" class="h2">${e(a.warranty.title)}</h2></div>
      <ul class="war-list">${r.map(c=>{var p;return`<li>${d((p=c.icon)!=null?p:"shield",22)}<div><h3 class="h4">${e(n(c.title))}</h3><p class="muted">${e(n(c.text))}</p></div></li>`}).join("")}</ul>
    </div>
    <div class="areas">
      ${t.warrantyImage?`<img src="${e(z(i,t.warrantyImage))}" alt="" width="1000" height="750" loading="lazy">`:""}
      ${l.length?`<h3 class="h4">${d("pin",18)} ${e(a.warranty.areas)}</h3><ul class="chips">${l.map(c=>`<li>${e(c)}</li>`).join("")}</ul><p class="small muted">${e(a.warranty.areasText)}</p>`:""}
    </div>
  </div>
</section>`}function je({site:t,t:a,L:n,lang:i}){let r=ee(t,a,i,"btn btn--line"),l=ae(t);return t.showReviews===!1||!l.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2></div>
    ${oe(l,i,"reviews",s=>`<figure class="review">
      <p class="stars" aria-label="${e(s.rating)}/5">${Array.from({length:5},(o,c)=>`<span class="${c<s.rating?"on":""}">${d("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(s.text))}</blockquote>
      <figcaption>${e(s.name)}${n(s.bought)?`<small>${e(n(s.bought))}</small>`:""}${ne(s,i)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function qe({site:t,t:a,L:n}){var r;let i=((r=t.faq)!=null?r:[]).filter(l=>n(l==null?void 0:l.q));return i.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div>${i.map((l,s)=>`<details${s===0?" open":""}><summary>${e(n(l.q))}</summary><p>${e(n(l.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ce({site:t,t:a,L:n,cats:i,channels:r,gform:l,market:s}){var w,$,M;let o=a.book,c=(w=t.contact)!=null?w:{},p=(($=t.areas)!=null?$:[]).map(u=>n(u)).filter(Boolean),h=a.bookText.replace(/\{\w+\}/g,"\u2026"),f=l?` data-gform="${e(l.action)}" data-gmap='${e(JSON.stringify(l.fields))}'`:"",b=u=>r.map((m,D)=>{var v;return`<button type="submit" class="btn ${u!=null?u:D?"btn--line":"btn--primary"} btn--lg" data-channel="${e(m)}" data-href="${e(A(m,c,h))}">${d(m,18)} ${e(m==="phone"?o.call:o.send.replace("{channel}",(v=a.via[m])!=null?v:m))}</button>`}).join("");return`<section class="section section--dark" id="book" aria-labelledby="book-title">
  <div class="wrap bookw">
    <div class="book-copy">
      <p class="kicker">${e(o.kicker)}</p>
      <h2 id="book-title" class="h2">${e(o.title)}</h2>
      <p class="lead">${e(o.text)}</p>
      ${c.phone?`<a class="sos-call" href="tel:${e(y(c.phone))}">${d("phone",22)}<span><small>${e(a.nav.call)}</small><b>${e(c.phone)}</b></span></a>`:""}
    </div>
    <form class="order" data-book${f} data-lead="${Number((M=t.booking)==null?void 0:M.lead)||2}" data-text="${e(a.bookText)}" data-market="${e(`${s.id.toUpperCase()} \xB7 ${s.currency}`)}" novalidate>
      <div class="order-fields">
        <fieldset class="opts"><legend>${e(o.need)}</legend><div class="row-opts">${i.map((u,m)=>`<label class="opt"><input type="checkbox" name="need" value="${e(n(u.name))}" data-need="${e(u.id)}"><span>${e(n(u.name))}</span></label>`).join("")}</div></fieldset>
        <div class="qcfg" data-qcfg hidden><p class="small"><b>${e(o.quoteL)}</b></p><p data-qcfg-text></p><input type="hidden" name="cfg" data-qcfg-input></div>
        <div class="fields">
          <label><span>${e(o.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label><span>${e(o.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          <label class="wide"><span>${e(o.address)} *</span><input name="address" autocomplete="street-address" required maxlength="200"></label>
          ${p.length?`<label><span>${e(o.area)}</span><select name="area">${p.map(u=>`<option>${e(u)}</option>`).join("")}<option>${e(o.otherArea)}</option></select></label>`:""}
          <label><span>${e(o.date)}</span><input name="date" type="date" data-date></label>
          <fieldset class="opts wide"><legend>${e(o.slot)}</legend><div class="row-opts">${o.slots.map((u,m)=>`<label class="opt"><input type="radio" name="slot" value="${e(u)}"${m?"":" checked"}><span>${e(u)}</span></label>`).join("")}</div></fieldset>
          <label class="wide"><span>${e(o.note)}</span><input name="note" maxlength="300" placeholder="${e(o.noteHint)}"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <p class="form-err" data-err hidden>${e(o.required)}</p>
        <button type="submit" class="btn btn--primary btn--lg btn--full" data-order-submit>${d("calendar",18)} ${e(o.submit)}</button>
      </div>
      <div class="done${l?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${d(l?"check":"arrow",22)} ${e(l?o.done:o.stepTitle)}</p>
        <p>${e(l?o.doneText:o.stepText)}</p>
        <div class="buy">${b(l?"btn--line":void 0)}</div>
        ${l?"":`<button type="button" class="link back" data-edit>${e(o.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
      <noscript><p>${r.map(u=>{var m;return`<a href="${e(A(u,c,h))}" ${G(u)}>${e((m=a.via[u])!=null?m:u)}</a>`}).join(" \xB7 ")}</p></noscript>
    </form>
  </div>
</section>`}function Te({site:t,t:a,L:n,channels:i}){var o,c,p;let r=(o=t.contact)!=null?o:{},l=encodeURIComponent((c=r.mapQuery)!=null?c:n(r.address)),s=h=>h.length===7?a.visit.everyDay:J(h,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${Q(t,a)}
      ${((p=t.hours)!=null?p:[]).length?`<table class="hours"><tbody>${t.hours.map(h=>`<tr><th scope="row">${e(s(h.days))}</th><td>${e(h.open)} \u2013 ${e(h.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${d("pin",18)} ${e(n(r.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${l}" target="_blank" rel="noopener">${e(a.visit.directions)} ${d("arrow",16)}</a>
        ${i.map(h=>{var f;return`<a class="btn btn--line" href="${e(A(h,r))}" ${G(h)}>${d(h,18)} ${e((f=a.via[h])!=null?f:h)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${l}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Re({site:t,t:a,L:n,market:i}){var s,o;let r=(s=t.contact)!=null?s:{},l=Object.entries((o=t.social)!=null?o:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(a.footer.hotline)}: <a href="tel:${y(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${l.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${l.map(([c,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${re(t,a,i.lang)}</div>
</footer>`}function Ee({site:t,market:a,L:n,abs:i,cats:r,items:l}){var o,c,p,h;let s=(o=t.contact)!=null?o:{};return{"@context":"https://schema.org","@type":"HomeAndConstructionBusiness",name:t.name,url:i(`${a.id}/`),image:i(E(t.heroImage||((c=r[0])==null?void 0:c.image))),description:n(t.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:n(s.address)},areaServed:((p=t.areas)!=null?p:[]).map(f=>n(f)).filter(Boolean),currenciesAccepted:a.currency,openingHoursSpecification:Z((h=t.hours)!=null?h:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:n(t.tagline),itemListElement:r.map(f=>({"@type":"OfferCatalog",name:n(f.name),itemListElement:l.filter(b=>b.category===f.id).map(b=>({"@type":"Offer",itemOffered:{"@type":"Service",name:n(b.name)},price:b.price,priceCurrency:a.currency}))}))}}}var Ae=({site:t,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:t.faq.filter(n=>a(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:a(n.q),acceptedAnswer:{"@type":"Answer",text:a(n.a)}}))});export{Je as renderSite};
