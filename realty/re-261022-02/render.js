var pe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>pe[a]);function q(t,a,n="vi"){var r,s,o;return t==null?"":typeof t!="object"?String(t):(o=(s=(r=t[a])!=null?r:t[n])!=null?s:Object.values(t)[0])!=null?o:""}var he={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},T=t=>{var a;return(a=he[t])!=null?a:"en-US"};function ue(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function F(t,a){var r,s;if(a.default)return t.basePrice;let n=(s=(r=t.prices)==null?void 0:r[a.id])!=null?s:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ue(t.basePrice*a.rate,a.rounding)}var me=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function O(t,a){let n={style:"currency",currency:a.currency};return me.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(T(a.lang),n).format(t)}function I(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var ge=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,E=(t,a)=>{let n=ge(a);return n==null?a:t(n)},N=(t="")=>String(t).replace(/\D/g,"");function B(t,a,n=""){switch(t){case"phone":return`tel:${N(a.phone)}`;case"zalo":return`https://zalo.me/${N(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${N(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var U=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,fe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function W(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let r={};for(let[s,o]of a.searchParams){if(!/^entry\.\d+$/.test(s))continue;let l=o.trim().replace(/^\{|\}$/g,"").toLowerCase();fe.includes(l)&&(r[l]=s)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var _={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ve={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},p=(t,a=20,n="")=>{var r;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(r=ve[t])!=null?r:""}</svg>`},V=[1,2,3,4,5,6,0],be=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function J(t,a){let n=t.map(s=>V.indexOf(s)).sort((s,o)=>s-o);return n.every((s,o)=>o===0||s===n[o-1]+1)&&n.length>2?`${a[V[n[0]]]} \u2013 ${a[V[n.at(-1)]]}`:n.map(s=>a[V[s]]).join(", ")}var Z=t=>t.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>be[n]),opens:a.open,closes:a.close}));function Y(t){var n,r;return(r=(n=new Intl.NumberFormat(T(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:n.value)!=null?r:t.currency}var G=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',X=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,Q=(t,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},K={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},$e=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ye=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&$e.test(n.hostname)?n.href:""}catch{return""}},ee=(t,a,n,r="btn btn--line")=>{var l;let s=ye(t);if(!s)return"";let o=typeof a.reviews=="object"&&((l=a.reviews)==null?void 0:l.google)||K[n]||K.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(s)}" target="_blank" rel="noopener">${p("star",16)} ${e(o)}</a></p>`},A={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ae={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},te=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ne(t,a){var o,l,i;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((o=t==null?void 0:t.date)!=null?o:"").trim());if(!n)return"";let r=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(r.getTime()))return"";let s=new Intl.DateTimeFormat((i=ae[a])!=null?i:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(t.date)}">${e(s)}</time>`}function ke(t,a){var l,i;let n=t.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let r=n.reduce((c,d)=>c+Number(d.rating),0)/n.length,s=(l=A[a])!=null?l:A.en,o=new Intl.NumberFormat((i=ae[a])!=null?i:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${p("star",18)}</span><strong>${o}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(t.length)))}</span></p>`}function oe(t,a,n,r){var l;if(!t.length)return"";let s=(l=A[a])!=null?l:A.en,o=i=>`<button type="button" class="rv-btn" data-rv-${i} aria-label="${e(i==="prev"?s.prev:s.next)}">${p("arrow",18,i==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ke(t,a)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(r).join("")}</div>
      <div class="rv-nav" hidden>${o("prev")}${o("next")}</div>
    </div>${xe}`}var xe=`<style>
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
upd()}})()<\/script>`;var re=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function se({site:t,markets:a,url:n,abs:r}){var l;let s=(l=a.find(i=>i.default))!=null?l:a[0],o=a.map(i=>({id:i.id,lang:i.lang,country:i.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${r(`${s.id}/`)}">
${a.map(i=>`<link rel="alternate" hreflang="${e(i.lang)}-${e(i.country)}" href="${r(`${i.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(o)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(i=>`<a href="${n(`${i.id}/`)}">${e(i.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var we="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ie=9;function Qe({site:t,catalog:a,i18n:n,template:r,basePath:s="/",siteUrl:o=t.domain}){let l=I(s),i=f=>new URL(l(f),o).href,c=a.markets,d=W(t.bookingForm),y=d&&!d.error?d:null,h=c.map(f=>{var M,g,P,j;let b=f.lang,$=(g=(M=n[b])!=null?M:n.en)!=null?g:n.vi,m=D=>q(D,b,"en"),v=(j=(P=t.bookingChannels)==null?void 0:P[f.id])!=null?j:["phone"],x=D=>O(D,f),w=D=>De(D,f),z=Me(a,f),S={site:t,catalog:a,market:f,markets:c,lang:b,t:$,L:m,url:l,abs:i,channels:v,money:x,short:w,homes:z,template:r,gform:y};return{path:`${f.id}/index.html`,html:Se(S)}});return h.push({path:"index.html",html:se({site:t,markets:c,url:l,abs:i})}),h}var H=(t,a)=>t.heroImage?E(a,t.heroImage):a("assets/photos/hero.webp"),le=(t,a)=>{var n,r,s;return(Array.isArray(t)?t:(s=(r=(n=t==null?void 0:t[a])!=null?n:t==null?void 0:t.en)!=null?r:t==null?void 0:t.vi)!=null?s:[]).map(o=>typeof o=="string"?o:q(o,a,"en")).filter(Boolean)};function Me(t,a){var n;return((n=t.products)!=null?n:[]).map((r,s)=>{var l;let o=((l=r.variants)!=null?l:[])[0];return{...r,i:s,price:o?F(o,a):null}}).filter(r=>r.price!=null)}function De(t,a){let n=a.lang,r=(s,o)=>new Intl.NumberFormat(T(n),{maximumFractionDigits:o}).format(s);if(a.currency==="VND"&&n==="vi"){if(t>=1e9)return`${r(t/1e9,2)} t\u1EF7`;if(t>=1e6)return`${r(t/1e6,1)} tri\u1EC7u`}return t>=1e5?new Intl.NumberFormat(T(n),{style:"currency",currency:a.currency,notation:"compact",maximumFractionDigits:2}).format(t):O(t,a)}function Se(t){var m,v,x,w,z,S,M;let{site:a,market:n,markets:r,lang:s,t:o,L:l,url:i,abs:c}=t,d=`${a.name} \xB7 ${l(a.tagline)}`,y=(m=a.theme)!=null?m:{},h=["primary","ink","bg","surface","soft","accent"].filter(g=>y[g]).map(g=>`--${g}:${y[g]}`).join(";"),f=(v=r.find(g=>g.default))!=null?v:r[0],b=r.map(g=>({id:g.id,lang:g.lang,country:g.country,currency:g.currency,href:i(`${g.id}/`)})),$=(x=a.contact)!=null?x:{};return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(d)}</title>
<meta name="description" content="${e(l(a.intro))}">
<link rel="canonical" href="${c(`${n.id}/`)}">
${r.map(g=>`<link rel="alternate" hreflang="${e(g.lang)}-${e(g.country)}" href="${c(`${g.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${f.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(d)}">
<meta property="og:description" content="${e(l(a.intro))}">
<meta property="og:url" content="${c(`${n.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(new URL(H(a,i),c("")).href)}">
<meta name="theme-color" content="${e((w=y.primary)!=null?w:"#1F5C4A")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${we}">
<link rel="stylesheet" href="${i("assets/style.css")}">
<style>:root{${h}}</style>
<noscript><style>.lsts .lst.more{display:flex}.list-more,.search,.toolbar,.loan-calc,.seg-mode{display:none}.lst-more summary{pointer-events:auto}</style></noscript>
${U(Fe(t))}
<script src="${i("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(b))}' data-wa="${e(N($.whatsapp))}" data-email="${e((z=$.email)!=null?z:"")}" data-copied="${e(o.booking.copied)}" data-tz="${e((S=a.timezone)!=null?S:"Asia/Ho_Chi_Minh")}" data-locale="${e(T(s))}" data-currency="${e(n.currency)}">
<a class="skip" href="#main">${e(o.skip)}</a>
${X(o)}
${ze(t)}
<main id="main">
${Ne(t)}
${je(t)}
${Ce(t)}
${Te(t)}
${Le(t)}
${Re(t)}
${qe(t)}
${Ee(t)}
${Be(t)}
${Ve(t)}
</main>
${Ae(t)}
<nav class="dock" aria-label="${e(o.nav.book)}">
  <a href="${e(B(t.channels[0],$))}" ${G(t.channels[0])}>${p(t.channels[0],20)}<span>${e((M=o.via[t.channels[0]])!=null?M:"")}</span></a>
  <a class="primary" href="#booking">${p("calendar",20)}<span>${e(o.nav.book)}</span></a>
</nav>
<dialog class="dlg" data-dialog aria-label="${e(o.list.details)}">
  <div class="dlg-in">
    <button type="button" class="dlg-x" data-dlg-close aria-label="${e(o.detail.close)}">\u2715</button>
    <div class="dlg-gal"><img alt="" data-dlg-img><button type="button" class="gal-btn gal-prev" data-gal-prev aria-label="${e(o.detail.prev)}">${p("arrow",20,'style="transform:scaleX(-1)"')}</button><button type="button" class="gal-btn gal-next" data-gal-next aria-label="${e(o.detail.next)}">${p("arrow",20)}</button><span class="gal-n" data-gal-n></span></div>
    <div class="dlg-body" data-dlg-body></div>
  </div>
</dialog>
</body>
</html>
`}function ze({site:t,market:a,markets:n,t:r,url:s}){var l;let o=[["#listings",r.nav.listings],...((l=t.loan)==null?void 0:l.show)!==!1?[["#loan",r.nav.loan]]:[],["#consign",r.nav.consign],["#team",r.nav.team],["#visit",r.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${a.id}/`)}">
      ${t.logo?`<img src="${e(E(s,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${p("key",20)}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${o.map(([i,c])=>`<a href="${i}">${e(c)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(r.market.label)}">${p("globe",18)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(Y(a))}</span></span></summary>
        <ul>${n.map(i=>`<li><a href="${s(`${i.id}/`)}" hreflang="${e(i.lang)}"${i.id===a.id?' aria-current="true"':""}>${e(i.country)} \xB7 ${e(i.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-md" href="#booking">${e(r.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${p("menu",22)}</summary>
        <nav aria-label="Menu">${[...o,["#booking",r.nav.book]].map(([i,c])=>`<a href="${i}">${e(c)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ce(t,a){var b,$;let{site:n,catalog:r,homes:s,t:o,L:l,market:i,short:c}=t,d=((b=r.categories)!=null?b:[]).filter(m=>s.some(v=>v.category===m.id)),y=(($=n.districts)!=null?$:[]).filter(m=>s.some(v=>v.district===m.id)),h=["sale","rent"].flatMap(m=>{var v,x;return((x=(v=n.budgets)==null?void 0:v[m])!=null?x:[]).map(w=>[m,F({basePrice:w,prices:{}},i)]).filter(([,w])=>w)}),f=[1,2,3,4];return`${a?`<label class="field"><span>${e(o.search.deal)}</span><select name="deal"><option value="">${e(o.list.all)}</option><option value="sale">${e(o.list.sale)}</option><option value="rent">${e(o.list.rent)}</option></select></label>`:""}
      ${d.length>1?`<label class="field"><span>${e(o.search.type)}</span><select name="type"><option value="">${e(o.search.anyType)}</option>${d.map(m=>`<option value="${e(m.id)}">${e(l(m.name))}</option>`).join("")}</select></label>`:""}
      ${y.length>1?`<label class="field"><span>${e(o.search.district)}</span><select name="district"><option value="">${e(o.search.anyDistrict)}</option>${y.map(m=>`<option value="${e(m.id)}">${e(l(m.name))}</option>`).join("")}</select></label>`:""}
      ${h.length?`<label class="field"><span>${e(o.search.budget)}</span><select name="budget"><option value="">${e(o.search.anyBudget)}</option>${h.map(([m,v])=>`<option value="${v}" data-deal="${m}">\u2264 ${e(c(v))}${m==="rent"?e(o.list.perMonth):""}</option>`).join("")}</select></label>`:""}
      <label class="field"><span>${e(o.search.beds)}</span><select name="beds"><option value="">${e(o.search.anyBeds)}</option>${f.map(m=>`<option value="${m}">${e(o.search.bedsMin.replace("{n}",m))}</option>`).join("")}</select></label>`}function Ne(t){var l;let{site:a,t:n,L:r,url:s}=t,o=((l=a.stats)!=null?l:[]).filter(i=>r(i==null?void 0:i.value));return`<section class="hero">
  <img class="hero-bg" src="${e(H(a,s))}" alt="" width="1600" height="900" fetchpriority="high">
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${r(a.place)?`<p class="eyebrow">${p("pin",16)} ${e(r(a.place))}</p>`:""}
      <h1>${e(r(a.tagline))}</h1>
      ${r(a.intro)?`<p class="lead">${e(r(a.intro))}</p>`:""}
    </div>
    <form class="search card" data-search role="search" aria-label="${e(n.search.title)}">
      <div class="seg" role="radiogroup" aria-label="${e(n.search.deal)}">
        <label><input type="radio" name="deal" value="sale" checked><span>${e(n.search.buy)}</span></label>
        <label><input type="radio" name="deal" value="rent"><span>${e(n.search.rent)}</span></label>
      </div>
      <div class="search-grid">${ce(t,!1)}</div>
      <button class="btn btn--primary btn--lg" type="submit">${p("search",18)} ${e(n.search.go)}</button>
    </form>
    ${o.length?`<ul class="stats">${o.map(i=>`<li><b>${e(r(i.value))}</b><span>${e(r(i.label))}</span></li>`).join("")}</ul>`:""}
  </div>
</section>`}function Pe(t,a,n){var M,g,P,j,D,L,u,C,R;let{site:r,catalog:s,t:o,L:l,url:i,short:c,money:d,lang:y}=t,h=(M=a.facts)!=null?M:{},f=a.deal==="rent",b=((g=s.categories)!=null?g:[]).find(k=>k.id===a.category),$=((P=r.districts)!=null?P:[]).find(k=>k.id===a.district),m=[a.image,...(j=a.images)!=null?j:[]].filter(Boolean).map(k=>E(i,k)),v=!f&&h.area?c(Math.round(a.price/h.area)):"",x=[h.area?["ruler",`${h.area} m\xB2`]:null,h.bedrooms?["bed",o.list.beds.replace("{n}",h.bedrooms)]:null,h.baths?["drop",o.list.baths.replace("{n}",h.baths)]:null,l(h.direction)?["sun",l(h.direction)]:null].filter(Boolean),w=((D=a.tags)!=null?D:[]).filter(k=>o.list.tags[k]),z=le(a.features,y),S=l(a.name);return`<article class="lst${n>=ie?" more":""}${a.sold?" is-sold":""}" id="home-${e(a.id)}" data-id="${e(a.id)}" data-deal="${e((L=a.deal)!=null?L:"sale")}" data-type="${e((u=a.category)!=null?u:"")}" data-district="${e((C=a.district)!=null?C:"")}" data-beds="${Number(h.bedrooms)||0}" data-price="${a.price}" data-i="${a.i}"${a.sold?" data-sold":""} data-images='${e(JSON.stringify(m))}'>
      <div class="lst-img">
        ${m[0]?`<img sizes="${_.wide}" src="${e(m[0])}" alt="${e(S)}" width="900" height="640" loading="lazy">`:""}
        <span class="deal deal--${f?"rent":"sale"}">${e(f?o.list.rent:o.list.sale)}</span>
        ${a.sold?`<span class="tag tag--sold">${e(f?o.list.rented:o.list.sold)}</span>`:w.map(k=>`<span class="tag tag--${e(k)}">${e(o.list.tags[k])}</span>`).join("")}
        ${m.length>1?`<span class="nimg">${p("camera",14)} ${m.length}</span>`:""}
      </div>
      <div class="lst-body">
        <p class="lst-price"><b>${e(c(a.price))}</b>${f?`<small>${e(o.list.perMonth)}</small>`:""}${v?`<small class="pm2">\u2248 ${e(o.list.perM2.replace("{p}",v))}</small>`:""}</p>
        <h3>${e(S)}</h3>
        ${$||b?`<p class="lst-loc">${p("pin",15)} ${e([b?l(b.name):"",$?l($.name):""].filter(Boolean).join(" \xB7 "))}</p>`:""}
        ${x.length?`<ul class="lst-facts">${x.map(([k,de])=>`<li>${p(k,15)} ${e(de)}</li>`).join("")}</ul>`:""}
        ${l(h.legal)?`<p class="lst-legal">${p("shield",15)} ${e(l(h.legal))}</p>`:""}
        <details class="lst-more">
          <summary>${e(o.list.details)} ${p("arrow",16)}</summary>
          <div class="lst-detail">
            <p class="d-price"><b>${e(d(a.price))}</b>${f?` <small>${e(o.list.perMonth)}</small>`:""}</p>
            <h3 class="d-name">${e(S)}</h3>
            ${$||b?`<p class="lst-loc">${p("pin",15)} ${e([b?l(b.name):"",$?l($.name):""].filter(Boolean).join(" \xB7 "))}</p>`:""}
            ${l(a.description)?`<p>${e(l(a.description))}</p>`:""}
            <dl class="d-facts">
              ${h.area?`<div><dt>${e(o.detail.area)}</dt><dd>${e(h.area)} m\xB2</dd></div>`:""}
              ${h.bedrooms?`<div><dt>${e(o.detail.beds)}</dt><dd>${e(h.bedrooms)}</dd></div>`:""}
              ${h.baths?`<div><dt>${e(o.detail.baths)}</dt><dd>${e(h.baths)}</dd></div>`:""}
              ${l(h.direction)?`<div><dt>${e(o.detail.direction)}</dt><dd>${e(l(h.direction))}</dd></div>`:""}
              ${l(h.legal)?`<div><dt>${e(o.detail.legal)}</dt><dd>${e(l(h.legal))}</dd></div>`:""}
              <div><dt>${e(o.detail.code)}</dt><dd>${e(String(a.id).toUpperCase())}</dd></div>
            </dl>
            ${z.length?`<ul class="d-feat">${z.map(k=>`<li>${p("check",16)} ${e(k)}</li>`).join("")}</ul>`:""}
            ${a.sold?`<p class="muted">${e(o.detail.soldNote)}</p>`:`<div class="actions">
              <a class="btn btn--primary" href="#booking" data-book-home="${e(a.id)}">${p("calendar",18)} ${e(o.detail.book)}</a>
              ${!f&&((R=r.loan)==null?void 0:R.show)!==!1?`<a class="btn btn--line" href="#loan" data-loan-price="${a.price}">${e(o.detail.loan)}</a>`:""}
            </div>`}
          </div>
        </details>
      </div>
    </article>`}function je(t){let{homes:a,t:n}=t;if(!a.length)return"";let r=[...a].sort((s,o)=>+!!s.sold-+!!o.sold);return`<section class="section" id="listings" aria-labelledby="list-title">
  <div class="wrap">
    <div class="head"><h2 id="list-title" class="h2">${e(n.list.title)}</h2><p class="muted">${e(n.list.text)}</p></div>
    <form class="toolbar" data-filter aria-label="${e(n.list.filter)}">
      ${ce(t,!0)}
      <label class="field"><span>${e(n.list.sort)}</span><select name="sort"><option value="">${e(n.list.sortNew)}</option><option value="low">${e(n.list.sortLow)}</option><option value="high">${e(n.list.sortHigh)}</option></select></label>
    </form>
    <p class="count" aria-live="polite"><span data-count data-tpl="${e(n.list.count)}"></span> <button type="button" class="link" data-reset hidden>${e(n.list.reset)}</button></p>
    <div class="lsts" data-list>${r.map((s,o)=>Pe(t,s,o)).join("")}</div>
    <p class="empty" data-empty hidden>${e(n.list.none)} <a href="#booking">${e(n.nav.book)}</a></p>
    ${a.length>ie?`<p class="center"><button type="button" class="btn btn--line list-more" data-more>${e(n.list.more)}</button></p>`:""}
  </div>
</section>`}function Ce({site:t,t:a,L:n,homes:r,market:s}){var c;let o=(c=t.loan)!=null?c:{};if(o.show===!1)return"";let l=r.filter(d=>d.deal!=="rent"&&!d.sold),i=l.length?l[0].price:0;return`<section class="section section--soft" id="loan" aria-labelledby="loan-title">
  <div class="wrap">
    <div class="head"><h2 id="loan-title" class="h2">${e(a.loan.title)}</h2><p class="muted">${e(a.loan.text)}</p></div>
    <div class="loan-card">
      <form class="loan-calc" data-loan>
        <label class="field"><span>${e(a.loan.price)} (${e(s.currency)})</span><input name="price" inputmode="numeric" value="${i}" data-money></label>
        <label class="field"><span>${e(a.loan.ratio)} <b data-out="ratio"></b></span><input name="ratio" type="range" min="10" max="80" step="5" value="${Number(o.ratio)||50}"></label>
        <label class="field"><span>${e(a.loan.years)} <b data-out="years" data-tpl="${e(a.loan.yearsUnit)}"></b></span><input name="years" type="range" min="5" max="35" step="1" value="${Number(o.years)||20}"></label>
        <label class="field"><span>${e(a.loan.rate)}</span><input name="rate" inputmode="decimal" value="${Number(o.rate)||9}"></label>
      </form>
      <div class="loan-out" aria-live="polite">
        <div class="big"><span>${e(a.loan.monthly)}</span><b data-r="monthly">\u2014</b></div>
        <dl>
          <div><dt>${e(a.loan.first)}</dt><dd data-r="first">\u2014</dd></div>
          <div><dt>${e(a.loan.loan)}</dt><dd data-r="loan">\u2014</dd></div>
          <div><dt>${e(a.loan.down)}</dt><dd data-r="down">\u2014</dd></div>
          <div><dt>${e(a.loan.interest)}</dt><dd data-r="interest">\u2014</dd></div>
        </dl>
        <a class="btn btn--primary" href="#booking" data-loan-ask>${e(a.loan.ask)}</a>
      </div>
    </div>
    <p class="muted small note">${e(n(o.note)||a.loan.note)}</p>
  </div>
</section>`}function Te({site:t,t:a,L:n}){var o,l;let r=((o=t.services)!=null?o:[]).filter(i=>n(i==null?void 0:i.title)),s=((l=t.steps)!=null?l:[]).filter(i=>n(i==null?void 0:i.title));return!r.length&&!s.length?"":`<section class="section" id="services" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="head"><h2 id="svc-title" class="h2">${e(a.services.title)}</h2><p class="muted">${e(a.services.text)}</p></div>
    ${r.length?`<ul class="svcs">${r.map(i=>{var c;return`<li><span class="svc-i">${p((c=i.icon)!=null?c:"check",24)}</span><strong>${e(n(i.title))}</strong>${n(i.text)?`<p class="muted">${e(n(i.text))}</p>`:""}</li>`}).join("")}</ul>`:""}
    ${s.length?`<h3 class="h3">${e(a.steps.title)}</h3>
    <ol class="steps">${s.map((i,c)=>`<li><span class="step-n">${c+1}</span><span><strong>${e(n(i.title))}</strong>${n(i.text)?`<span class="muted">${e(n(i.text))}</span>`:""}</span></li>`).join("")}</ol>`:""}
  </div>
</section>`}function Le({site:t,t:a,L:n,lang:r}){var l;let s=(l=t.consign)!=null?l:{};if(s.show===!1)return"";let o=le(s.points,r);return`<section class="section section--brand" id="consign" aria-labelledby="cs-title">
  <div class="wrap consign">
    <div>
      <h2 id="cs-title" class="h2">${e(a.consign.title)}</h2>
      <p class="lead">${e(n(s.text)||a.consign.text)}</p>
    </div>
    <div class="consign-side">
      ${o.length?`<ul class="ticks">${o.map(i=>`<li>${p("check",18)} ${e(i)}</li>`).join("")}</ul>`:""}
      <a class="btn btn--accent btn--lg" href="#booking" data-mode-link="consign">${p("key",18)} ${e(a.consign.btn)}</a>
    </div>
  </div>
</section>`}function Re({site:t,t:a,L:n,channels:r}){var i;let s=((i=t.team)!=null?i:[]).filter(c=>c==null?void 0:c.name);if(!s.length)return"";let o=c=>c.split(/\s+/).map(d=>d[0]).slice(-2).join("").toUpperCase(),l=r.find(c=>c==="zalo"||c==="whatsapp");return`<section class="section section--soft" id="team" aria-labelledby="team-title">
  <div class="wrap">
    <div class="head"><h2 id="team-title" class="h2">${e(a.team.title)}</h2><p class="muted">${e(a.team.text)}</p></div>
    <div class="team">${s.map((c,d)=>{let y=l==="zalo"&&c.zalo?`https://zalo.me/${N(c.zalo)}`:l==="whatsapp"&&c.whatsapp?`https://wa.me/${N(c.whatsapp)}`:"";return`<figure class="agent">
      <div class="agent-ph tone-${d%3}">${c.photo?`<img src="${e(c.photo)}" alt="${e(c.name)}" loading="lazy">`:`<span aria-hidden="true">${e(o(c.name))}</span>`}</div>
      <figcaption>
        <strong>${e(c.name)}</strong><span class="role">${e(n(c.role))}</span>
        ${n(c.zone)?`<span class="muted">${p("pin",14)} ${e(n(c.zone))}</span>`:""}
        ${c.years?`<span class="yrs">${e(a.team.years.replace("{n}",c.years))}</span>`:""}
        <span class="agent-btns">${c.phone?`<a class="btn btn--sm btn--line" href="tel:${N(c.phone)}">${p("phone",16)} ${e(c.phone)}</a>`:""}${y?`<a class="btn btn--sm btn--line" href="${e(y)}" target="_blank" rel="noopener">${p(l,16)} ${e(a.via[l])}</a>`:""}</span>
      </figcaption>
    </figure>`}).join("")}</div>
  </div>
</section>`}function qe({site:t,t:a,L:n,lang:r}){let s=ee(t,a,r,"btn btn--line"),o=te(t);return t.showReviews===!1||!o.length&&!s?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(a.reviews)}</h2>
    ${oe(o,r,"quotes",l=>`<figure class="quote">
      ${l.rating?`<div class="stars" aria-label="${l.rating}/5">${Array.from({length:5},(i,c)=>`<span class="${c<l.rating?"on":""}">${p("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(n(l.text))}</blockquote>
      <figcaption>${e(l.name)}${ne(l,r)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Ee(t){var g,P,j,D,L;let{site:a,catalog:n,homes:r,t:s,L:o,channels:l,gform:i,short:c}=t,d=s.booking,y=(g=a.contact)!=null?g:{},h=(j=(P=a.hours)==null?void 0:P[0])!=null?j:{open:"08:00",close:"20:00"},f=[],[b,$]=h.open.split(":").map(Number),[m,v]=h.close.split(":").map(Number);for(let u=b*60+$;u<=m*60+v-60;u+=30)f.push(`${String(Math.floor(u/60)).padStart(2,"0")}:${String(u%60).padStart(2,"0")}`);let x=i?` data-gform="${e(i.action)}" data-gmap='${e(JSON.stringify(i.fields))}'`:"",w=l.map((u,C)=>{var R;return`<button type="button" class="btn ${C===0?"btn--primary":"btn--line"}" data-channel="${e(u)}" data-href="${e(B(u,y,""))}">${p(u,18)} ${e((R=s.via[u])!=null?R:u)}</button>`}).join(""),z=r.filter(u=>!u.sold),S=(D=n.categories)!=null?D:[],M=((L=a.consign)==null?void 0:L.show)!==!1;return`<section class="section section--deep" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="booking-copy">
      <h2 id="book-title" class="h2">${e(d.title)}</h2>
      <p class="lead">${e(d.text)}</p>
      <div class="actions">${l.map(u=>{var C;return`<a class="btn btn--ghost" href="${e(B(u,y))}" ${G(u)}>${p(u,18)} ${e((C=s.via[u])!=null?C:u)}</a>`}).join("")}</div>
    </div>
    <form class="card form" data-book novalidate${x} data-order-text="${e(d.message)}" data-consign-text="${e(d.messageConsign)}" data-consign-tag="${e(d.tabConsign)}">
      <div class="book-fields">
        ${M?`<div class="seg seg-mode" role="radiogroup" aria-label="${e(d.title)}">
          <label><input type="radio" name="mode" value="view" checked><span>${p("calendar",16)} ${e(d.tabView)}</span></label>
          <label><input type="radio" name="mode" value="consign"><span>${p("key",16)} ${e(d.tabConsign)}</span></label>
        </div>`:""}
        <div class="mode-view" data-mode="view">
          <label class="field"><span>${e(d.listing)}</span><select name="product">
            <option value="${e(d.anyListing)}">${e(d.anyListing)}</option>
            ${z.map(u=>`<option value="${e(`${String(u.id).toUpperCase()} \xB7 ${o(u.name)} \xB7 ${c(u.price)}${u.deal==="rent"?s.list.perMonth:""}`)}" data-id="${e(u.id)}">${e(`${String(u.id).toUpperCase()} \xB7 ${o(u.name)}`)}</option>`).join("")}
          </select></label>
          <div class="row2">
            <label class="field"><span>${e(d.date)}</span><input name="day" type="date"></label>
            <label class="field"><span>${e(d.time)}</span><select name="time">${f.map(u=>`<option>${u}</option>`).join("")}</select></label>
          </div>
        </div>
        ${M?`<div class="mode-consign" data-mode="consign" hidden>
          <div class="row2">
            <label class="field"><span>${e(d.want)}</span><select name="want"><option value="${e(d.wantSell)}">${e(d.wantSell)}</option><option value="${e(d.wantRent)}">${e(d.wantRent)}</option></select></label>
            <label class="field"><span>${e(s.search.type)}</span><select name="kind">${S.map(u=>`<option>${e(o(u.name))}</option>`).join("")}</select></label>
          </div>
          <label class="field"><span>${e(d.address)}</span><input name="address" autocomplete="street-address" maxlength="160"></label>
          <div class="row2">
            <label class="field"><span>${e(d.area)}</span><input name="area" inputmode="decimal" maxlength="10"></label>
            <label class="field"><span>${e(d.ask)}</span><input name="ask" maxlength="40" placeholder="${e(d.askHint)}"></label>
          </div>
        </div>`:""}
        <div class="row2">
          <label class="field"><span>${e(d.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(d.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(d.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${e(d.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(d.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${e(d.sending)}">${p("arrow",18)} ${e(d.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${p(i?"check":"arrow",22)} ${e(i?d.done:d.stepTitle)}</p>
        <p>${e(i?d.doneText:d.stepText)}</p>
        ${i?"":`<div class="buy">${w}</div><button type="button" class="link" data-edit>${e(d.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function Be({site:t,t:a,L:n}){var l,i,c;let r=(l=t.contact)!=null?l:{},s=encodeURIComponent((i=r.mapQuery)!=null?i:n(r.address)),o=d=>d.length===7?a.everyDay:J(d,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${Q(t,a)}
      ${((c=t.hours)!=null?c:[]).length?`<table class="hours"><tbody>${t.hours.map(d=>`<tr><th scope="row">${e(o(d.days))}</th><td>${e(d.open)} \u2013 ${e(d.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(r.address)?`<p class="addr">${p("pin",18)} ${e(n(r.address))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(a.visit.directions)} ${p("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ve({site:t,t:a,L:n}){var s;let r=((s=t.faq)!=null?s:[]).filter(o=>n(o==null?void 0:o.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div class="qa">${r.map((o,l)=>`<details${l===0?" open":""}><summary>${e(n(o.q))}</summary><p>${e(n(o.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ae({site:t,t:a,L:n,market:r}){var l,i;let s=(l=t.contact)!=null?l:{},o=Object.entries((i=t.social)!=null?i:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p>${n(t.license)?`<p class="muted small">${e(n(t.license))}</p>`:""}</div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${s.phone?`<li><a href="tel:${N(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${n(s.address)?`<li>${e(n(s.address))}</li>`:""}</ul></div>
    ${o.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${o.map(([c,d])=>`<li><a href="${e(d)}" target="_blank" rel="noopener">${e(c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${re(t,a,r.lang)}</div>
</footer>`}function Fe({site:t,market:a,L:n,abs:r,url:s,homes:o}){var i,c;let l=(i=t.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"RealEstateAgent",name:t.name,url:r(`${a.id}/`),description:n(t.intro),image:new URL(H(t,s),r("")).href,telephone:l.phone,email:l.email,address:{"@type":"PostalAddress",streetAddress:n(l.address)},openingHoursSpecification:Z((c=t.hours)!=null?c:[]),currenciesAccepted:a.currency,makesOffer:o.filter(d=>!d.sold).map(d=>({"@type":"Offer",name:n(d.name),businessFunction:d.deal==="rent"?"http://purl.org/goodrelations/v1#LeaseOut":"http://purl.org/goodrelations/v1#Sell",price:d.price,priceCurrency:a.currency,url:`${r(`${a.id}/`)}#home-${d.id}`}))}}export{Qe as renderSite};
