var ie={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,t=>ie[t]);function R(n,t,a="vi"){var r,s,i;return n==null?"":typeof n!="object"?String(n):(i=(s=(r=n[t])!=null?r:n[a])!=null?s:Object.values(n)[0])!=null?i:""}var le={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},P=n=>{var t;return(t=le[n])!=null?t:"en-US"};function ce(n,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(n)-.01);let a=Number(t)||1;return Math.max(a,Math.round(n/a)*a)}function E(n,t){var r,s;if(t.default)return n.basePrice;let a=(s=(r=n.prices)==null?void 0:r[t.id])!=null?s:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:ce(n.basePrice*t.rate,t.rounding)}var pe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function L(n,t){let a={style:"currency",currency:t.currency};return pe.has(t.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(P(t.lang),a).format(n)}function I(n="/"){let t=n.endsWith("/")?n:`${n}/`;return(a="")=>t+String(a).replace(/^\//,"")}var j=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,D=(n,t)=>{let a=j(t);return a==null?t:n(a)},N=(n="")=>String(n).replace(/\D/g,"");function A(n,t,a=""){switch(n){case"phone":return`tel:${N(t.phone)}`;case"zalo":return`https://zalo.me/${N(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${N(t.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var B=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,de=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function U(n){if(!n||typeof n!="string")return null;let t;try{t=new URL(n.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let a=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let r={};for(let[s,i]of t.searchParams){if(!/^entry\.\d+$/.test(s))continue;let o=i.trim().replace(/^\{|\}$/g,"").toLowerCase();de.includes(o)&&(r[o]=s)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var T={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var he={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(n,t=20,a="")=>{var r;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(r=he[n])!=null?r:""}</svg>`},C=[1,2,3,4,5,6,0];function _(n,t){let a=n.map(s=>C.indexOf(s)).sort((s,i)=>s-i);return a.every((s,i)=>i===0||s===a[i-1]+1)&&a.length>2?`${t[C[a[0]]]} \u2013 ${t[C[a.at(-1)]]}`:a.map(s=>t[C[s]]).join(", ")}function K(n){var a,r;return(r=(a=new Intl.NumberFormat(P(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:a.value)!=null?r:n.currency}var J=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',Z=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,Y=(n,t)=>{var a;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((a=n.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},W={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ue=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,me=n=>{var t;try{let a=new URL(String((t=n.googleReview)!=null?t:"").trim());return a.protocol==="https:"&&ue.test(a.hostname)?a.href:""}catch{return""}},Q=(n,t,a,r="btn btn--line")=>{var o;let s=me(n);if(!s)return"";let i=typeof t.reviews=="object"&&((o=t.reviews)==null?void 0:o.google)||W[a]||W.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${e(s)}" target="_blank" rel="noopener">${u("star",16)} ${e(i)}</a></p>`},q={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},X={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ee=n=>{var t;return((t=n.reviews)!=null?t:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function ae(n,t){var i,o,l;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=n==null?void 0:n.date)!=null?i:"").trim());if(!a)return"";let r=new Date(Date.UTC(+a[1],+a[2]-1,+((o=a[3])!=null?o:1)));if(Number.isNaN(r.getTime()))return"";let s=new Intl.DateTimeFormat((l=X[t])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${e(n.date)}">${e(s)}</time>`}function ge(n,t){var o,l;let a=n.filter(c=>c.rating>=1&&c.rating<=5);if(a.length<2)return"";let r=a.reduce((c,d)=>c+Number(d.rating),0)/a.length,s=(o=q[t])!=null?o:q.en,i=new Intl.NumberFormat((l=X[t])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(n.length)))}</span></p>`}function te(n,t,a,r){var o;if(!n.length)return"";let s=(o=q[t])!=null?o:q.en,i=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?s.prev:s.next)}">${u("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ge(n,t)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${a} rv-track" tabindex="0">${n.map(r).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${fe}`}var fe=`<style>
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
upd()}})()<\/script>`;var ne=(n,t,a)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function oe({site:n,markets:t,url:a,abs:r}){var o;let s=(o=t.find(l=>l.default))!=null?o:t[0],i=t.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${r(`${s.id}/`)}">
${t.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${r(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(i)}, root = ${JSON.stringify(a(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${t.map(l=>`<a href="${a(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ve="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;1,400&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap",re=9;function se(n,t){return n.map(a=>{var r;return{...a,variants:((r=a.variants)!=null?r:[]).map(s=>({...s,price:E(s,t)})).filter(s=>s.price!=null)}}).filter(a=>a.variants.length).map(a=>({...a,from:Math.min(...a.variants.map(r=>r.price))}))}function We({site:n,catalog:t,i18n:a,template:r,basePath:s="/",siteUrl:i=n.domain}){let o=I(s),l=f=>new URL(o(f),i).href,c=t.markets,d=U(n.bookingForm),b=d&&!d.error?d:null,p=c.map(f=>{var m,V,F,O,G,H;let g=f.lang,k=(V=(m=a[g])!=null?m:a.en)!=null?V:a.vi,S=v=>R(v,g,"en"),x=(F=t.products)!=null?F:[],z=se(x.filter(v=>v.category==="lesson"),f),w=se(x.filter(v=>v.category==="rental"),f),M=((O=n.addons)!=null?O:[]).filter(v=>v==null?void 0:v.id).map(v=>({...v,price:E({basePrice:v.price,prices:v.prices},f)})).filter(v=>v.price!=null),h=(H=(G=n.bookingChannels)==null?void 0:G[f.id])!=null?H:["phone"],$={site:n,catalog:t,market:f,markets:c,lang:g,t:k,L:S,url:o,abs:l,lessons:z,rentals:w,addons:M,channels:h,money:v=>L(v,f),template:r,gform:b};return{path:`${f.id}/index.html`,html:be($)}});return p.push({path:"index.html",html:oe({site:n,markets:c,url:o,abs:l})}),p}function be(n){var S,x,z,w,M,h,y,$;let{site:t,market:a,markets:r,lang:s,t:i,L:o,url:l,abs:c}=n,d=`${t.name} \xB7 ${o(t.tagline)}`,b=(S=t.theme)!=null?S:{},p=["primary","ink","bg","surface","soft","accent"].filter(m=>b[m]).map(m=>`--${m}:${b[m]}`).join(";"),f=(x=r.find(m=>m.default))!=null?x:r[0],g=r.map(m=>({id:m.id,lang:m.lang,country:m.country,currency:m.currency,href:l(`${m.id}/`)})),k=(z=t.contact)!=null?z:{};return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(d)}</title>
<meta name="description" content="${e(o(t.intro))}">
<link rel="canonical" href="${c(`${a.id}/`)}">
${r.map(m=>`<link rel="alternate" hreflang="${e(m.lang)}-${e(m.country)}" href="${c(`${m.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${f.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(d)}">
<meta property="og:description" content="${e(o(t.intro))}">
<meta property="og:url" content="${c(`${a.id}/`)}">
<meta property="og:site_name" content="${e(t.name)}">
<meta property="og:image" content="${e(c(j(t.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((w=b.bg)!=null?w:"#0A1418")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ve}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${p}}</style>
<noscript><style>.album .is-more{display:block}</style></noscript>
${B(Ce(n))}${((M=t.faq)!=null?M:[]).length?B(qe(n)):""}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(a.id)}" data-markets='${e(JSON.stringify(g))}' data-wa="${e(N((h=k.whatsapp)!=null?h:""))}" data-email="${e((y=k.email)!=null?y:"")}" data-copied="${e(i.copied)}" data-tz="${e(($=t.timezone)!=null?$:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(i.skip)}</a>
${Z(i)}
${ye(n)}
<main id="main">
${[$e,ke,xe,we,Me,De,Se,ze,Ne,Pe,je].map(m=>m(n)).join(`
`)}
</main>
${Te(n)}
<nav class="dock" aria-label="${e(i.nav.book)}">
  <a href="#rentals">${u("wave",20)}<span>${e(i.nav.rentals)}</span></a>
  <a class="primary" href="#book">${u("calendar",20)}<span>${e(i.nav.book)}</span></a>
</nav>
</body>
</html>
`}function ye({site:n,market:t,markets:a,t:r,url:s}){let i=[["#lessons",r.nav.lessons],["#rentals",r.nav.rentals],["#season",r.nav.season],["#team",r.nav.team],["#visit",r.nav.contact]];return`<header class="header" data-header>
  <div class="wrap bar">
    <a class="brand" href="${s(`${t.id}/`)}">
      ${n.logo?`<img src="${e(D(s,n.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("wave",20)}</span>`}
      <span>${e(n.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([o,l])=>`<a href="${o}">${e(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${a.length>1?`<details class="market">
        <summary aria-label="${e(r.market.label)}">${u("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(K(t))}</span></span></summary>
        <ul>${a.map(o=>`<li><a href="${s(`${o.id}/`)}" hreflang="${e(o.lang)}"${o.id===t.id?' aria-current="true"':""}>${e(o.country)} \xB7 ${e(o.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#book">${e(r.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(r.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${[...i,["#book",r.nav.book]].map(([o,l])=>`<a href="${o}">${e(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function $e({site:n,t,L:a,url:r}){var i;let s=((i=n.conditions)!=null?i:[]).filter(o=>a(o==null?void 0:o.value));return`<section class="hero">
  <img class="hero-img" src="${e(D(r,n.heroImage||"photos/h-hero.webp"))}" alt="" width="1600" height="1000" fetchpriority="high">
  <div class="wrap hero-copy">
    ${a(n.heroKicker)?`<p class="kicker">${e(a(n.heroKicker))}</p>`:""}
    <h1>${e(a(n.tagline))}</h1>
    ${a(n.intro)?`<p class="lead">${e(a(n.intro))}</p>`:""}
    <div class="actions">
      <a class="btn btn--accent btn--lg" href="#lessons">${e(t.hero.lessons)} ${u("arrow",18)}</a>
      <a class="btn btn--ghost btn--lg" href="#rentals">${e(t.hero.rentals)}</a>
    </div>
  </div>
  ${s.length?`<div class="wrap"><div class="today"><p class="today-h">${u("sun",16)} ${e(t.today.title)}${a(n.conditionsNote)?` <small>${e(a(n.conditionsNote))}</small>`:""}</p>
    <ul>${s.map(o=>{var l;return`<li>${u((l=o.icon)!=null?l:"wave",22)}<span>${e(a(o.label))}</span><b>${e(a(o.value))}</b></li>`}).join("")}</ul></div></div>`:""}
</section>`}function ke({lessons:n,t,L:a,url:r,money:s}){if(!n.length)return"";let i=o=>{var l;return String((l=a(o))!=null?l:"").split(`
`).map(c=>c.trim()).filter(Boolean)};return`<section class="section" id="lessons" aria-labelledby="ls-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.lessons.kicker)}</p><h2 id="ls-title" class="h2">${e(t.lessons.title)}</h2><p class="lead">${e(t.lessons.text)}</p></div>
    <ul class="lessons">${n.map((o,l)=>`<li class="lesson${l===0?" lesson--wide":""}">
      <div class="lesson-img">${o.image?`<img sizes="${T.wide}" src="${e(D(r,o.image))}" alt="" width="1200" height="900" loading="lazy">`:""}${a(o.badge)?`<span class="badge">${e(a(o.badge))}</span>`:""}</div>
      <div class="lesson-body">
        <h3>${e(a(o.name))}</h3>
        ${a(o.description)?`<p class="muted">${e(a(o.description))}</p>`:""}
        <ul class="facts">
          ${a(o.duration)?`<li>${u("clock",16)} ${e(a(o.duration))}</li>`:""}
          ${o.max?`<li>${u("users",16)} ${e(t.lessons.max.replace("{n}",o.max))}</li>`:""}
          ${a(o.level)?`<li>${u("gauge",16)} ${e(a(o.level))}</li>`:""}
          ${o.ages?`<li>${u("heart",16)} ${e(t.lessons.ages.replace("{a}",o.ages[0]).replace("{b}",o.ages[1]))}</li>`:""}
        </ul>
        ${i(o.includes).length?`<p class="incl">${e(t.lessons.includes)}: ${e(i(o.includes).join(" \xB7 "))}</p>`:""}
        <div class="lesson-foot">
          <p class="price">${o.variants.length>1?`<small>${e(t.from)}</small> `:""}<b>${e(s(o.from))}</b><small>${e(t.lessons.per)}</small></p>
          <a class="btn btn--line" href="#book" data-pick="${e(o.id)}">${e(t.lessons.book)}</a>
        </div>
      </div>
    </li>`).join("")}</ul>
  </div>
</section>`}function xe({site:n,t,L:a}){var s;let r=((s=n.levels)!=null?s:[]).filter(i=>a(i==null?void 0:i.title));return r.length?`<section class="section section--deep" aria-labelledby="lv-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.levels.kicker)}</p><h2 id="lv-title" class="h2">${e(t.levels.title)}</h2></div>
    <ol class="levels">${r.map((i,o)=>`<li><span class="lv-n">${String(o+1).padStart(2,"0")}</span><h3>${e(a(i.title))}</h3><p>${e(a(i.text))}</p></li>`).join("")}</ol>
  </div>
</section>`:""}function we({site:n,rentals:t,t:a,L:r,url:s,money:i}){if(!t.length)return"";let o=[...new Set(t.flatMap(c=>c.variants.map(d=>r(d.label))))],l=(c,d)=>{let b=c.variants.find(p=>r(p.label)===d);return b?e(i(b.price)):"\u2013"};return`<section class="section" id="rentals" aria-labelledby="rt-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.rentals.kicker)}</p><h2 id="rt-title" class="h2">${e(a.rentals.title)}</h2><p class="lead">${e(a.rentals.text)}</p></div>
    <ul class="boards">${t.map(c=>`<li>
      ${c.image?`<img sizes="${T.card}" src="${e(D(s,c.image))}" alt="" width="900" height="1100" loading="lazy">`:""}
      <div><h3>${e(r(c.name))}</h3>${r(c.size)?`<p class="muted">${e(r(c.size))}</p>`:""}${r(c.description)?`<p>${e(r(c.description))}</p>`:""}</div>
    </li>`).join("")}</ul>
    <div class="table-wrap"><table class="rates"><thead><tr><th scope="col">${e(a.rentals.item)}</th>${o.map(c=>`<th scope="col">${e(c)}</th>`).join("")}</tr></thead>
      <tbody>${t.map(c=>`<tr><th scope="row">${e(r(c.name))}</th>${o.map(d=>`<td>${l(c,d)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
    ${r(n.rentalDeposit)?`<p class="note">${u("card",16)} ${e(r(n.rentalDeposit))}</p>`:""}
  </div>
</section>`}function Me({site:n,t,L:a,lang:r}){var o;let s=((o=n.season)!=null?o:[]).filter(l=>l==null?void 0:l.m);if(!s.length)return"";let i=l=>r==="vi"?`T${l}`:new Intl.DateTimeFormat(P(r),{month:"short",timeZone:"UTC"}).format(new Date(Date.UTC(2026,l-1,1)));return`<section class="section section--deep" id="season" aria-labelledby="ss-title">
  <div class="wrap season-wrap">
    <div class="sec-head sec-head--left"><p class="kicker">${e(t.season.kicker)}</p><h2 id="ss-title" class="h2">${e(t.season.title)}</h2><p class="lead">${e(a(n.seasonNote)||t.season.text)}</p>
      <ul class="legend">${t.season.levels.map((l,c)=>`<li><i class="lv${c}"></i>${e(l)}</li>`).join("")}</ul></div>
    <ol class="months">${s.map(l=>{var c,d;return`<li data-m="${l.m}" class="lv${l.level}" title="${e(i(l.m))}: ${e((c=t.season.levels[l.level])!=null?c:"")}"><span class="bar" style="--h:${(l.level+1)*25}%"></span><b>${e(i(l.m))}</b><span class="sr">${e((d=t.season.levels[l.level])!=null?d:"")}</span></li>`}).join("")}</ol>
  </div>
</section>`}function De({site:n,t,L:a}){var o,l;let r=((o=n.team)!=null?o:[]).filter(c=>c==null?void 0:c.name),s=((l=n.safety)!=null?l:[]).filter(c=>a(c==null?void 0:c.title));if(!r.length&&!s.length)return"";let i=c=>String(c).trim().split(/\s+/).slice(-2).map(d=>d[0]).join("").toUpperCase();return`<section class="section" id="team" aria-labelledby="tm-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.team.kicker)}</p><h2 id="tm-title" class="h2">${e(t.team.title)}</h2></div>
    ${r.length?`<ul class="team">${r.map(c=>`<li><span class="avatar" aria-hidden="true">${e(i(c.name))}</span><div><b>${e(c.name)}</b>${a(c.role)?`<small>${e(a(c.role))}</small>`:""}${a(c.text)?`<p>${e(a(c.text))}</p>`:""}</div></li>`).join("")}</ul>`:""}
    ${s.length?`<ul class="safe">${s.map(c=>{var d;return`<li>${u((d=c.icon)!=null?d:"shield",22)}<div><b>${e(a(c.title))}</b><p>${e(a(c.text))}</p></div></li>`}).join("")}</ul>`:""}
  </div>
</section>`}function Se({site:n,t,url:a}){var s;let r=((s=n.album)!=null?s:[]).filter(i=>i==null?void 0:i.image);return r.length?`<section class="section section--deep" aria-labelledby="al-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.album.kicker)}</p><h2 id="al-title" class="h2">${e(t.album.title)}</h2></div>
    <ul class="album" data-album>${r.map((i,o)=>`<li class="${o>=re?"is-more":""}"><a href="${e(D(a,i.image))}" data-zoom="${o}"><img sizes="${T.card}" src="${e(D(a,i.image))}" alt="" width="900" height="900" loading="lazy"></a></li>`).join("")}</ul>
    ${r.length>re?`<div class="more"><button type="button" class="btn btn--ghost" data-album-more hidden>${e(t.album.more)}</button></div>`:""}
    <dialog class="lightbox" data-lightbox aria-label="${e(t.album.title)}">
      <img src="" alt="" data-lb-img>
      <button type="button" class="lb-close" data-lb-close aria-label="${e(t.album.close)}">\u2715</button>
      <button type="button" class="lb-nav lb-prev" data-lb-step="-1" aria-label="${e(t.album.prev)}">${u("chevron",26)}</button>
      <button type="button" class="lb-nav lb-next" data-lb-step="1" aria-label="${e(t.album.next)}">${u("chevron",26)}</button>
    </dialog>
  </div>
</section>`:""}function ze({site:n,t,L:a,lang:r}){let s=Q(n,t,r,"btn btn--ghost"),i=ee(n);return n.showReviews===!1||!i.length&&!s?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${te(i,r,"reviews",o=>`<figure class="review">
      <p class="stars" aria-label="${e(o.rating)}/5">${Array.from({length:5},(l,c)=>`<span class="${c<o.rating?"on":""}">${u("star",14)}</span>`).join("")}</p>
      <blockquote>${e(a(o.text))}</blockquote>
      <figcaption>${e(o.name)}${a(o.bought)?`<small>${e(a(o.bought))}</small>`:""}${ae(o,r)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Ne(n){var w,M;let{site:t,t:a,L:r,lessons:s,rentals:i,addons:o,money:l,channels:c,gform:d,market:b}=n;if(!s.length&&!i.length)return"";let p=a.book,f=(w=t.contact)!=null?w:{},g=d?` data-gform="${e(d.action)}" data-gmap='${e(JSON.stringify(d.fields))}'`:"",k=a.orderText.replace(/\{\w+\}/g,"\u2026"),S=h=>c.map((y,$)=>{var m;return`<button type="submit" class="btn ${h!=null?h:$?"btn--ghost":"btn--accent"}" data-channel="${e(y)}" data-href="${e(A(y,f,k))}">${u(y,18)} ${e(y==="phone"?p.call:p.send.replace("{channel}",(m=a.via[y])!=null?m:y))}</button>`}).join(""),x=[...s,...i].map(h=>{var y;return{id:h.id,k:h.category,max:(y=h.max)!=null?y:0,v:h.variants.map($=>{var m;return{l:(m=r($.label))!=null?m:"",p:$.price,m:l($.price)}})}}),z=(M=t.slots)!=null?M:[];return`<section class="section section--deep" id="book" aria-labelledby="bk-title">
  <div class="wrap reg">
    <div class="reg-copy">
      <p class="kicker">${e(p.kicker)}</p>
      <h2 id="bk-title" class="h2">${e(p.title)}</h2>
      <p class="lead">${e(p.text)}</p>
      <ul class="reg-points">${p.points.map(h=>`<li>${u("check",18)} ${e(h)}</li>`).join("")}</ul>
    </div>
    <form class="form" data-book novalidate${g} data-text="${e(a.orderText)}" data-market="${e(`${b.id.toUpperCase()} \xB7 ${b.currency}`)}" data-items='${e(JSON.stringify(x))}' data-currency="${e(b.currency)}" data-lang="${e(b.lang)}">
      <div class="order-fields">
        <label class="field"><span>${e(p.what)} *</span><select name="product" data-item required>
          ${s.length?`<optgroup label="${e(a.nav.lessons)}">${s.map(h=>`<option value="${e(h.id)}">${e(r(h.name))}</option>`).join("")}</optgroup>`:""}
          ${i.length?`<optgroup label="${e(a.nav.rentals)}">${i.map(h=>`<option value="${e(h.id)}">${e(r(h.name))}</option>`).join("")}</optgroup>`:""}
        </select></label>
        <fieldset class="field" data-var-field><legend>${e(p.option)}</legend><div class="opts" data-variants></div></fieldset>
        <div class="row2">
          <label class="field"><span>${e(p.date)} *</span><input type="date" name="date" required data-date></label>
          <label class="field"><span>${e(p.time)}</span><select name="time">${z.map(h=>`<option>${e(h)}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <div class="field"><span id="ppl-l" data-ppl-label data-lesson="${e(p.people)}" data-rental="${e(p.qty)}">${e(p.people)}</span><div class="step" data-step><button type="button" data-d="-1" aria-label="\u2212">${u("minus",16)}</button><input name="people" type="number" min="1" max="20" value="1" inputmode="numeric" aria-labelledby="ppl-l"><button type="button" data-d="1" aria-label="+">${u("plus",16)}</button></div></div>
          <label class="field" data-lesson-only><span>${e(p.level)}</span><select name="level">${p.levels.map(h=>`<option>${e(h)}</option>`).join("")}</select></label>
        </div>
        <p class="hint" data-max-note data-tpl="${e(p.maxWarn)}" hidden></p>
        <label class="check" data-lesson-only><input type="checkbox" name="swim" value="1" data-swim> <span>${e(p.swim)}</span></label>
        ${o.length?`<fieldset class="field"><legend>${e(p.addons)}</legend><div class="addons">${o.map(h=>`<label class="check"><input type="checkbox" name="addon" value="${e(r(h.name))}" data-price="${h.price}" data-per="${h.per==="person"?1:0}"> <span>${e(r(h.name))}</span><b>+ ${e(l(h.price))}${h.per==="person"?` <small>${e(p.perPerson)}</small>`:""}</b></label>`).join("")}</div></fieldset>`:""}
        <div class="row2">
          <label class="field"><span>${e(p.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(p.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(p.note)}</span><input name="note" maxlength="300" placeholder="${e(p.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <dl class="sum">
          <div><dt data-s-line data-tpl="${e(p.line)}">\u2014</dt><dd data-s-base>\u2014</dd></div>
          <div data-s-add-row hidden><dt>${e(p.addons)}</dt><dd data-s-add></dd></div>
          <div class="sum-total"><dt>${e(p.total)}</dt><dd data-s-total>\u2014</dd></div>
        </dl>
        <p class="form-err" data-err hidden data-swim-msg="${e(p.swimWarn)}" data-req-msg="${e(p.required)}">${e(p.required)}</p>
        <button class="btn btn--accent btn--lg btn--full" type="submit" data-submit>${u("calendar",18)} ${e(p.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${u(d?"check":"arrow",22)} ${e(d?p.done:p.stepTitle)}</p>
        <p>${e(d?p.doneText:p.stepText)}</p>
        <div class="buy">${S(d?"btn--ghost":void 0)}</div>
        ${d?"":`<button type="button" class="link back" data-edit>${e(p.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Pe({site:n,t,L:a}){var s;let r=((s=n.faq)!=null?s:[]).filter(i=>a(i==null?void 0:i.q));return r.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${r.map((i,o)=>`<details${o===0?" open":""}><summary>${e(a(i.q))}</summary><p>${e(a(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function je({site:n,t,L:a,channels:r}){var c,d,b,p,f;let s=(c=n.contact)!=null?c:{},i=(d=n.beach)!=null?d:{},o=encodeURIComponent((p=(b=i.mapQuery)!=null?b:s.mapQuery)!=null?p:a(s.address)),l=g=>g.length===7?t.visit.everyDay:_(g,t.days);return`<section class="section section--deep" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${a(i.address)?`<p class="addr">${u("wave",18)} <span><b>${e(t.visit.beach)}</b> ${e(a(i.address))}</span></p>`:""}
      ${a(s.address)?`<p class="addr">${u("house",18)} <span><b>${e(t.visit.shop)}</b> ${e(a(s.address))}</span></p>`:""}
      ${Y(n,t)}
      ${((f=n.hours)!=null?f:[]).length?`<table class="hours"><tbody>${n.hours.map(g=>`<tr><th scope="row">${e(l(g.days))}</th><td>${e(g.open)} \u2013 ${e(g.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <div class="actions">
        <a class="btn btn--ghost" href="https://www.google.com/maps/dir/?api=1&amp;destination=${o}" target="_blank" rel="noopener">${e(t.visit.directions)} ${u("arrow",16)}</a>
        ${r.map(g=>{var k;return`<a class="btn btn--ghost" href="${e(A(g,s))}" ${J(g)}>${u(g,18)} ${e((k=t.via[g])!=null?k:g)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${o}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Te({site:n,t,L:a,market:r}){var o,l;let s=(o=n.contact)!=null?o:{},i=Object.entries((l=n.social)!=null?l:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(a(n.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${s.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${N(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${a(s.address)?`<li>${e(a(s.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([c,d])=>`<li><a href="${e(d)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${ne(n,t,r.lang)}</div>
</footer>`}function Ce({site:n,market:t,L:a,abs:r,lessons:s}){var o;let i=(o=n.contact)!=null?o:{};return{"@context":"https://schema.org","@type":"SportsActivityLocation",name:n.name,url:r(`${t.id}/`),description:a(n.intro),image:r(j(n.heroImage||"photos/h-hero.webp")),telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:a(i.address)},makesOffer:s.map(l=>({"@type":"Offer",name:a(l.name),price:l.from,priceCurrency:t.currency}))}}var qe=({site:n,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(a=>t(a==null?void 0:a.q)).map(a=>({"@type":"Question",name:t(a.q),acceptedAnswer:{"@type":"Answer",text:t(a.a)}}))});export{We as renderSite};
