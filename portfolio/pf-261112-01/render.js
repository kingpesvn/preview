var he={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>he[t]);function O(a,t,n="vi"){var s,r,o;return a==null?"":typeof a!="object"?String(a):(o=(r=(s=a[t])!=null?s:a[n])!=null?r:Object.values(a)[0])!=null?o:""}var ue={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},F=a=>{var t;return(t=ue[a])!=null?t:"en-US"};function me(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function E(a,t){var s,r;if(t.default)return a.basePrice;let n=(r=(s=a.prices)==null?void 0:s[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:me(a.basePrice*t.rate,t.rounding)}var ge=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function X(a,t){let n={style:"currency",currency:t.currency};return ge.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(F(t.lang),n).format(a)}function Q(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var B=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,N=(a,t)=>{let n=B(t);return n==null?t:a(n)},P=(a="")=>String(a).replace(/\D/g,"");function H(a,t,n=""){switch(a){case"phone":return`tel:${P(t.phone)}`;case"zalo":return`https://zalo.me/${P(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${P(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var I=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,fe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function ee(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let s={};for(let[r,o]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=o.trim().replace(/^\{|\}$/g,"").toLowerCase();fe.includes(i)&&(s[i]=r)}return Object.keys(s).length?s.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:s}:{error:"no-phone"}:{error:"no-fields"}}var L={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ve={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},y=(a,t=20,n="")=>{var s;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(s=ve[a])!=null?s:""}</svg>`};function te(a){var n,s;return(s=(n=new Intl.NumberFormat(F(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?s:a.currency}var ne=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',oe=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`;var ae={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},be=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ye=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&be.test(n.hostname)?n.href:""}catch{return""}},re=(a,t,n,s="btn btn--line")=>{var i;let r=ye(a);if(!r)return"";let o=typeof t.reviews=="object"&&((i=t.reviews)==null?void 0:i.google)||ae[n]||ae.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${s}" href="${e(r)}" target="_blank" rel="noopener">${y("star",16)} ${e(o)}</a></p>`},A={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},se={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ie=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function le(a,t){var o,i,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((o=a==null?void 0:a.date)!=null?o:"").trim());if(!n)return"";let s=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(s.getTime()))return"";let r=new Intl.DateTimeFormat((c=se[t])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(s);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function $e(a,t){var i,c;let n=a.filter(d=>d.rating>=1&&d.rating<=5);if(n.length<2)return"";let s=n.reduce((d,l)=>d+Number(l.rating),0)/n.length,r=(i=A[t])!=null?i:A.en,o=new Intl.NumberFormat((c=se[t])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(s);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${y("star",18)}</span><strong>${o}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function ce(a,t,n,s){var i;if(!a.length)return"";let r=(i=A[t])!=null?i:A.en,o=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?r.prev:r.next)}">${y("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${$e(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(s).join("")}</div>
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
upd()}})()<\/script>`;var pe=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function de({site:a,markets:t,url:n,abs:s}){var i;let r=(i=t.find(c=>c.default))!=null?i:t[0],o=t.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${s(`${r.id}/`)}">
${t.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${s(`${c.id}/`)}">`).join(`
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
<body><p>${t.map(c=>`<a href="${n(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ke="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap";var V=a=>String(a!=null?a:"").split(`
`).map(t=>t.trim()).filter(Boolean);function Je({site:a,catalog:t,i18n:n,template:s,basePath:r="/",siteUrl:o=a.domain}){let i=Q(r),c=f=>new URL(i(f),o).href,d=t.markets,l=ee(a.bookingForm),p=l&&!l.error?l:null,g=d.map(f=>{var j,T,C,q,u,U,W,_,K,J;let h=f.lang,x=(T=(j=n[h])!=null?j:n.en)!=null?T:n.vi,k=m=>O(m,h,"en"),w=m=>m&&m.basePrice!=null?E(m,f):null,S=((C=t.products)!=null?C:[]).map(m=>{var Z,Y;let $=((Z=m.variants)!=null?Z:[])[0];return{...m,price:$?E($,f):null,extraPrice:(Y=w(m.extra))!=null?Y:0}}).filter(m=>m.price!=null&&k(m.name)),M=((q=a.sound)!=null?q:[]).map(m=>{var $;return{...m,price:($=w(m))!=null?$:0}}).sort((m,$)=>(m.upTo||1e9)-($.upTo||1e9)),b=((u=a.addons)!=null?u:[]).filter(m=>k(m==null?void 0:m.name)).map(m=>{var $;return{...m,price:($=w(m))!=null?$:0}}),v=(U=a.travel)!=null?U:{},z={freeKm:Number(v.freeKm)||0,perKm:(_=E({basePrice:(W=v.perKm)!=null?W:0,prices:v.perKmPrices},f))!=null?_:0},D=(J=(K=a.bookingChannels)==null?void 0:K[f.id])!=null?J:["phone"],R={site:a,catalog:t,market:f,markets:d,lang:h,t:x,L:k,url:i,abs:c,packs:S,sound:M,addons:b,travel:z,channels:D,money:m=>X(m,f),template:s,gform:p};return{path:`${f.id}/index.html`,html:we(R)}});return g.push({path:"index.html",html:de({site:a,markets:d,url:i,abs:c})}),g}function we(a){var v,z,D,G,R,j,T,C,q;let{site:t,market:n,markets:s,lang:r,t:o,L:i,url:c,abs:d,packs:l,sound:p,addons:g,travel:f}=a,h=`${t.name} \xB7 ${i(t.tagline)}`,x=(v=t.theme)!=null?v:{},k=["primary","ink","bg","surface","soft","accent"].filter(u=>x[u]).map(u=>`--${u}:${x[u]}`).join(";"),w=(z=s.find(u=>u.default))!=null?z:s[0],S=s.map(u=>({id:u.id,lang:u.lang,country:u.country,currency:u.currency,href:c(`${u.id}/`)})),M=(D=t.contact)!=null?D:{},b={p:l.map(u=>({id:u.id,n:i(u.name),h:Number(u.hours)||0,pr:u.price,x:u.extraPrice})),s:p.map(u=>({u:Number(u.upTo)||0,n:i(u.name),pr:u.price})),a:g.map(u=>({id:u.id,n:i(u.name),pr:u.price})),tr:f,dep:Number(t.deposit)||0,booked:((G=t.booked)!=null?G:[]).filter(u=>/^\d{4}-\d\d-\d\d$/.test(u))};return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(h)}</title>
<meta name="description" content="${e(i(t.intro))}">
<link rel="canonical" href="${d(`${n.id}/`)}">
${s.map(u=>`<link rel="alternate" hreflang="${e(u.lang)}-${e(u.country)}" href="${d(`${u.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${w.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(h)}">
<meta property="og:description" content="${e(i(t.intro))}">
<meta property="og:url" content="${d(`${n.id}/`)}">
<meta property="og:site_name" content="${e(t.name)}">
<meta property="og:image" content="${e(d(B(t.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((R=x.bg)!=null?R:"#0B0A10")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ke}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${k}}</style>
${I(Ee(a))}${((j=t.faq)!=null?j:[]).length?I(Be(a)):""}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(S))}' data-wa="${e(P((T=M.whatsapp)!=null?T:""))}" data-email="${e((C=M.email)!=null?C:"")}" data-copied="${e(o.copied)}" data-lang="${e(r)}" data-currency="${e(n.currency)}" data-tz="${e((q=t.timezone)!=null?q:"Asia/Ho_Chi_Minh")}">
<script type="application/json" id="dj-data">${JSON.stringify(b).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${e(o.skip)}</a>
${oe(o)}
${Me(a)}
<main id="main">
  ${De(a)}
  ${Se(a)}
  ${ze(a)}
  ${Pe(a)}
  ${Ne(a)}
  ${je(a)}
  ${Te(a)}
  ${Ce(a)}
  ${qe(a)}
</main>
${Re(a)}
</body>
</html>
`}function Me({site:a,market:t,markets:n,t:s,url:r}){return`<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(N(r,a.logo))}" alt="" width="34" height="34">`:`<span class="brand-mark" aria-hidden="true">${y("music",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="${e(s.nav.label)}">
      <a href="#mixes">${e(s.nav.mixes)}</a>
      <a href="#packages">${e(s.nav.packages)}</a>
      <a href="#dates">${e(s.nav.dates)}</a>
      <a href="#contact">${e(s.nav.contact)}</a>
    </nav>
    <a class="btn btn--neon btn--sm" href="#book">${e(s.nav.book)}</a>
    ${n.length>1?`<details class="market">
      <summary aria-label="${e(s.market.label)}">${y("globe",16)}<span>${e(t.id.toUpperCase())}</span></summary>
      <ul>${n.map(o=>`<li><a href="${r(`${o.id}/`)}" hreflang="${e(o.lang)}"${o.id===t.id?' aria-current="true"':""}>${e(o.country)} \xB7 ${e(o.currency)} ${e(te(o))}</a></li>`).join("")}</ul>
    </details>`:""}
  </div>
</header>`}function De({site:a,t,L:n,url:s}){return`<section class="hero" aria-labelledby="h-title">
  <img class="hero-bg" src="${e(N(s,a.heroImage||"photos/h-hero.webp"))}" alt="" width="1920" height="1080" fetchpriority="high">
  <div class="wrap hero-in">
    ${n(a.heroKicker)?`<p class="kicker">${e(n(a.heroKicker))}</p>`:""}
    <h1 id="h-title">${e(n(a.tagline))}</h1>
    ${n(a.intro)?`<p class="lead">${e(n(a.intro))}</p>`:""}
    <p class="actions"><a class="btn btn--neon" href="#book">${e(t.hero.book)}</a><a class="btn btn--line" href="#mixes">${y("music",16)} ${e(t.hero.listen)}</a></p>
  </div>
  <div class="strip" data-strip hidden>
    <div class="wrap strip-in">
      <p><small>${e(t.hero.free)}</small><b data-strip-free></b></p>
      <p><small>${e(t.hero.next)}</small><b data-strip-next>${e(t.hero.noGig)}</b></p>
    </div>
  </div>
</section>`}function Se({site:a,t,L:n}){var o;let s=((o=a.stats)!=null?o:[]).filter(i=>i==null?void 0:i.value),r=V(n(a.played));return!n(a.bio)&&!s.length?"":`<section class="sec wrap" id="about" aria-labelledby="ab-title">
  <div class="about">
    <div>
      <p class="eyebrow">${e(t.about.eyebrow)}</p>
      <h2 id="ab-title" class="h2">${e(t.about.title)}</h2>
      ${V(n(a.bio)).map(i=>`<p class="muted big">${e(i)}</p>`).join("")}
    </div>
    <div>
      ${s.length?`<dl class="stats">${s.map(i=>`<div><dt>${e(n(i.value))}</dt><dd>${e(n(i.label))}</dd></div>`).join("")}</dl>`:""}
      ${r.length?`<p class="eyebrow small-gap">${e(t.about.played)}</p><ul class="played">${r.map(i=>`<li>${e(i)}</li>`).join("")}</ul>`:""}
    </div>
  </div>
</section>`}function ze({site:a,t,L:n,url:s}){var c,d;let r=((c=a.genres)!=null?c:[]).filter(l=>(l==null?void 0:l.id)&&n(l.name)),o=((d=a.mixes)!=null?d:[]).filter(l=>n(l==null?void 0:l.title));if(!o.length)return"";let i=l=>{var p,g;return(g=n((p=r.find(f=>f.id===l))==null?void 0:p.name))!=null?g:l};return`<section class="sec wrap" id="mixes" aria-labelledby="mx-title">
  <div class="sec-head"><p class="eyebrow">${e(t.mixes.eyebrow)}</p><h2 id="mx-title" class="h2">${e(t.mixes.title)}</h2><p class="muted">${e(t.mixes.text)}</p></div>
  ${r.length>1?`<div class="chips" role="group" aria-label="${e(t.mixes.genre)}"><button type="button" class="chip" data-genre="" aria-pressed="true">${e(t.mixes.all)}</button>${r.map(l=>`<button type="button" class="chip" data-genre="${e(l.id)}" aria-pressed="false">${e(n(l.name))}</button>`).join("")}</div>`:""}
  <ul class="mixes">${o.map(l=>{var p,g;return`<li class="mix" data-genres="${e(((p=l.genres)!=null?p:[]).join(" "))}">
    ${l.image?`<img sizes="${L.card}" src="${e(N(s,l.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
    <div class="mix-in">
      <p class="mix-tags">${((g=l.genres)!=null?g:[]).map(f=>`<span>${e(i(f))}</span>`).join("")}</p>
      <h3>${e(n(l.title))}</h3>
      <p class="mix-meta">${l.bpm?`<span>${e(l.bpm)} BPM</span>`:""}${l.minutes?`<span>${e(t.mixes.min.replace("{n}",l.minutes))}</span>`:""}</p>
      ${l.url?`<a class="play" href="${e(l.url)}" target="_blank" rel="noopener">${y("music",16)} ${e(t.mixes.play)}</a>`:""}
    </div>
  </li>`}).join("")}</ul>
</section>`}function Pe({packs:a,t,L:n,url:s,money:r}){return a.length?`<section class="sec sec--dark" id="packages" aria-labelledby="pk-title">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">${e(t.packs.eyebrow)}</p><h2 id="pk-title" class="h2">${e(t.packs.title)}</h2><p class="muted">${e(t.packs.text)}</p></div>
    <ul class="packs">${a.map(o=>{var i;return`<li class="pack${o.badge?" is-hot":""}">
      ${o.image?`<img sizes="${L.card}" src="${e(N(s,o.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
      <div class="pack-in">
        <p class="pack-kind">${e((i=t.kinds[o.category])!=null?i:"")}${n(o.badge)?` <span class="tag">${e(n(o.badge))}</span>`:""}</p>
        <h3>${e(n(o.name))}</h3>
        ${n(o.description)?`<p class="muted">${e(n(o.description))}</p>`:""}
        <p class="pack-price"><b>${e(r(o.price))}</b><small>${e(t.packs.hours.replace("{n}",o.hours))}</small></p>
        ${o.extraPrice?`<p class="muted small">${e(t.packs.extra.replace("{price}",r(o.extraPrice)))}</p>`:""}
        ${V(n(o.includes)).length?`<ul class="incl">${V(n(o.includes)).map(c=>`<li>${y("check",14)} ${e(c)}</li>`).join("")}</ul>`:""}
        <a class="btn btn--line btn--full" href="#book" data-pick-pack="${e(o.id)}">${e(t.packs.choose)}</a>
      </div>
    </li>`}).join("")}</ul>
  </div>
</section>`:""}function Ne({site:a,t,L:n}){var r;let s=((r=a.gigs)!=null?r:[]).filter(o=>{var i;return/^\d{4}-\d\d-\d\d$/.test((i=o==null?void 0:o.date)!=null?i:"")}).sort((o,i)=>o.date.localeCompare(i.date));return`<section class="sec wrap" id="dates" aria-labelledby="dt-title">
  <div class="sec-head"><p class="eyebrow">${e(t.cal.eyebrow)}</p><h2 id="dt-title" class="h2">${e(t.cal.title)}</h2><p class="muted">${e(t.cal.text)}</p></div>
  <div class="dates">
    <div class="cal" data-cal data-wd="${e(JSON.stringify(t.daysShort))}" data-free="${e(t.cal.freeL)}" data-taken="${e(t.cal.takenL)}" hidden>
      <div class="cal-legend"><span class="lg lg--free">${e(t.cal.freeL)}</span><span class="lg lg--taken">${e(t.cal.takenL)}</span></div>
      <div class="cal-months" data-cal-months></div>
    </div>
    <noscript><p class="muted">${e(t.cal.noJs)}</p></noscript>
    ${s.length?`<div class="gigs"><h3 class="h3">${e(t.cal.gigs)}</h3><ul data-gigs>${s.map(o=>{var i,c,d,l;return`<li data-date="${e(o.date)}"><span class="gig-d">${e(o.date.split("-").reverse().slice(0,2).join("/"))}</span><span class="gig-t"><b>${e((c=(i=n(o.venue))!=null?i:o.venue)!=null?c:"")}</b><small>${e((l=(d=n(o.city))!=null?d:o.city)!=null?l:"")}${o.time?` \xB7 ${e(o.time)}`:""}</small></span>${o.url?`<a class="link" href="${e(o.url)}" target="_blank" rel="noopener">${e(t.cal.tickets)}</a>`:""}</li>`}).join("")}</ul><p class="muted" data-no-gigs hidden>${e(t.hero.noGig)}</p></div>`:""}
  </div>
</section>`}function je(a){var M;let{site:t,t:n,L:s,packs:r,sound:o,addons:i,travel:c,channels:d,gform:l,market:p,money:g}=a;if(!r.length)return"";let f=(M=t.contact)!=null?M:{},h=n.form,x=l?` data-gform="${e(l.action)}" data-gmap='${e(JSON.stringify(l.fields))}'`:"",k=n.orderText.replace(/\{\w+\}/g,"\u2026"),w=b=>d.map((v,z)=>{var D;return`<button type="submit" class="btn btn--full ${b!=null?b:z?"btn--line":"btn--neon"}" data-channel="${e(v)}" data-href="${e(H(v,f,k))}">${y(v,18)} ${e(v==="phone"?h.call:h.send.replace("{channel}",(D=n.via[v])!=null?D:v))}</button>`}).join(""),S=Number(t.deposit)||0;return`<section class="sec wrap" id="book" aria-labelledby="bk-title">
  <div class="sec-head"><p class="eyebrow">${e(n.book.eyebrow)}</p><h2 id="bk-title" class="h2">${e(n.book.title)}</h2><p class="muted">${e(n.book.text)}</p></div>
  <form class="book" data-order novalidate${x} data-text="${e(n.orderText)}" data-market="${e(`${p.id.toUpperCase()} \xB7 ${p.currency}`)}">
    <div class="order-fields book-grid">
      <div class="book-l">
        <fieldset class="field"><legend>${e(h.pack)}</legend><div class="pills">${r.map((b,v)=>`<label><input type="radio" name="product" value="${e(b.id)}"${v?"":" checked"}><span>${e(s(b.name))}</span></label>`).join("")}</div></fieldset>
        <div class="row2">
          <label class="field"><span>${e(h.date)} *</span><input name="date" type="date" required data-date></label>
          <label class="field"><span>${e(h.hours)}</span><input name="qty" type="number" min="1" max="12" step="1" inputmode="numeric" data-hours></label>
        </div>
        <p class="warn" data-date-warn hidden>${e(h.taken)}</p>
        <div class="row2">
          <label class="field"><span>${e(h.guests)}</span><input name="size" type="number" min="1" max="5000" inputmode="numeric" value="150" data-guests></label>
          <label class="field"><span>${e(h.km)}</span><input name="km" type="number" min="0" max="2000" inputmode="numeric" value="0" data-km></label>
        </div>
        ${i.length?`<fieldset class="field"><legend>${e(h.addons)}</legend><div class="checks">${i.map(b=>`<label><input type="checkbox" name="addon" value="${e(b.id)}"> <span>${e(s(b.name))}</span><b>+${e(g(b.price))}</b></label>`).join("")}</div></fieldset>`:""}
        <label class="field"><span>${e(h.venue)} *</span><input name="address" required maxlength="200" placeholder="${e(h.venueHint)}"></label>
        <div class="row2">
          <label class="field"><span>${e(h.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(h.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(h.note)}</span><textarea name="note" rows="3" maxlength="500" placeholder="${e(h.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
      </div>
      <aside class="quote" aria-live="polite">
        <p class="eyebrow">${e(h.quote)}</p>
        <dl class="q-rows">
          <div><dt data-q-pack-l>${e(h.pack)}</dt><dd data-q-pack>${e(g(r[0].price))}</dd></div>
          <div data-q-extra-row hidden><dt data-q-extra-l></dt><dd data-q-extra></dd></div>
          ${o.length?`<div><dt data-q-sound-l>${e(h.sound)}</dt><dd data-q-sound></dd></div>`:""}
          <div data-q-add-row hidden><dt>${e(h.addons)}</dt><dd data-q-add></dd></div>
          <div data-q-travel-row hidden><dt>${e(h.travel)}</dt><dd data-q-travel></dd></div>
          <div class="q-total"><dt>${e(h.total)}</dt><dd data-q-total>${e(g(r[0].price))}</dd></div>
        </dl>
        ${S?`<p class="dep" data-q-dep data-tpl="${e(h.deposit.replace("{pct}",S))}"></p>`:""}
        <p class="hint">${e(c.freeKm?h.travelNote.replace("{km}",c.freeKm).replace("{price}",g(c.perKm)):h.estimate)}</p>
        <p class="form-err" data-err hidden>${e(h.required)}</p>
        <button class="btn btn--neon btn--full" type="submit" data-submit>${e(h.submit)}</button>
        <p class="hint">${e(h.privacy)}</p>
      </aside>
    </div>
    <div class="done" data-done hidden tabindex="-1">
      <p class="done-title">${e(l?h.done:h.stepTitle)}</p>
      <p>${e(l?h.doneText:h.stepText)}</p>
      <div class="buy">${w(l?"btn--line":void 0)}</div>
      ${l?"":`<button type="button" class="link back" data-edit>${e(h.edit)}</button>`}
    </div>
    <p class="form-msg" role="status" hidden></p>
  </form>
</section>`}function Te({site:a,t,L:n,url:s}){var c;let r=((c=a.gallery)!=null?c:[]).filter(d=>d==null?void 0:d.image);if(!r.length)return"";let o=0,i=r.map((d,l)=>{let p=l%5===0?2:1;return p===2&&o===2&&(p=1),l===r.length-1&&(p=3-o),o=(o+p)%3,p===3?"full":p===2?"wide":""});return`<section class="sec wrap" aria-labelledby="gl-title">
  <div class="sec-head"><p class="eyebrow">${e(t.gallery.eyebrow)}</p><h2 id="gl-title" class="h2">${e(t.gallery.title)}</h2></div>
  <div class="gallery">${r.map((d,l)=>{var p;return`<figure class="${i[l]}"><img sizes="${L.card}" src="${e(N(s,d.image))}" alt="${e((p=n(d.caption))!=null?p:"")}" width="1200" height="800" loading="lazy">${n(d.caption)?`<figcaption>${e(n(d.caption))}</figcaption>`:""}</figure>`}).join("")}</div>
</section>`}function Ce({site:a,t,L:n,lang:s}){let r=re(a,t,s,"btn btn--line"),o=ie(a);return a.showReviews===!1||!o.length&&!r?"":`<section class="sec wrap" aria-labelledby="rv-title">
  <div class="sec-head"><h2 id="rv-title" class="h2">${e(t.reviews.title)}</h2></div>
  ${ce(o,s,"reviews",i=>`<figure class="review">
    <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(c,d)=>`<span class="${d<i.rating?"on":""}">${y("star",14)}</span>`).join("")}</p>
    <blockquote>${e(n(i.text))}</blockquote>
    <figcaption>${e(i.name)}${n(i.bought)?`<small>${e(n(i.bought))}</small>`:""}${le(i,s)}</figcaption>
  </figure>`)}${r}
</section>`}function qe({site:a,t,L:n,channels:s}){var c,d,l;let r=(c=a.contact)!=null?c:{},o=Object.entries((d=a.social)!=null?d:{}).filter(([,p])=>p),i=((l=a.faq)!=null?l:[]).filter(p=>n(p==null?void 0:p.q));return`<section class="sec wrap" id="contact" aria-labelledby="ct-title">
  <div class="contact">
    <div>
      <p class="eyebrow">${e(t.contact.eyebrow)}</p>
      <h2 id="ct-title" class="h2">${e(t.contact.title)}</h2>
      ${n(r.address)?`<p class="addr">${y("pin",18)} ${e(n(r.address))}</p>`:""}
      <p class="actions">${s.map(p=>{var g;return`<a class="btn btn--line" href="${e(H(p,r))}" ${ne(p)}>${y(p,18)} ${e((g=t.via[p])!=null?g:p)}</a>`}).join("")}</p>
      ${o.length?`<p class="social">${o.map(([p,g])=>`<a href="${e(g)}" target="_blank" rel="noopener">${e(p==="tiktok"?"TikTok":p==="youtube"?"YouTube":p==="soundcloud"?"SoundCloud":p==="mixcloud"?"Mixcloud":p[0].toUpperCase()+p.slice(1))}</a>`).join("")}</p>`:""}
    </div>
    ${i.length?`<div class="faq"><h3 class="h3">${e(t.faq.title)}</h3>${i.map((p,g)=>`<details${g===0?" open":""}><summary>${e(n(p.q))}</summary><p>${e(n(p.a))}</p></details>`).join("")}</div>`:""}
  </div>
</section>`}function Re({site:a,t,L:n,market:s}){var o;let r=(o=a.contact)!=null?o:{};return`<footer class="footer"><div class="wrap">
  <p class="foot-name">${e(a.name)}</p>
  ${n(a.disclaimer)?`<p class="disclaimer">${e(n(a.disclaimer))}</p>`:""}
  <p>${r.phone?`${e(t.footer.hotline)}: <a href="tel:${P(r.phone)}">${e(r.phone)}</a>`:""}${r.email?` \xB7 <a href="mailto:${e(r.email)}">${e(r.email)}</a>`:""}</p>
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${pe(a,t,s.lang)}</div>
</footer>`}function Ee({site:a,market:t,L:n,abs:s,packs:r}){var i,c;let o=(i=a.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"EntertainmentBusiness",name:a.name,url:s(`${t.id}/`),description:n(a.intro),image:s(B(a.heroImage||"photos/h-hero.webp")),telephone:o.phone,email:o.email,address:n(o.address)?{"@type":"PostalAddress",streetAddress:n(o.address)}:void 0,sameAs:Object.values((c=a.social)!=null?c:{}).filter(Boolean),makesOffer:r.map(d=>({"@type":"Offer",name:n(d.name),price:d.price,priceCurrency:t.currency}))}}var Be=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});export{Je as renderSite};
