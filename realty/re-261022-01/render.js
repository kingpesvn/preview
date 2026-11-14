var X={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>X[a]);function P(t,a,n="vi"){var o,r,s;return t==null?"":typeof t!="object"?String(t):(s=(r=(o=t[a])!=null?o:t[n])!=null?r:Object.values(t)[0])!=null?s:""}var Q={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},S=t=>{var a;return(a=Q[t])!=null?a:"en-US"};function ee(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function T(t,a){var o,r;if(a.default)return t.basePrice;let n=(r=(o=t.prices)==null?void 0:o[a.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ee(t.basePrice*a.rate,a.rounding)}var te=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function q(t,a){let n={style:"currency",currency:a.currency};return te.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(S(a.lang),n).format(t)}function B(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var ae=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,z=(t,a)=>{let n=ae(a);return n==null?a:t(n)},D=(t="")=>String(t).replace(/\D/g,"");function L(t,a,n=""){switch(t){case"phone":return`tel:${D(a.phone)}`;case"zalo":return`https://zalo.me/${D(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${D(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var V=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,ne=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function A(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,s]of a.searchParams){if(!/^entry\.\d+$/.test(r))continue;let l=s.trim().replace(/^\{|\}$/g,"").toLowerCase();ne.includes(l)&&(o[l]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var R={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var oe={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},f=(t,a=20,n="")=>{var o;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=oe[t])!=null?o:""}</svg>`};function O(t){var n,o;return(o=(n=new Intl.NumberFormat(S(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:t.currency}var G=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',I=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`;var F={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},re=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,se=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&re.test(n.hostname)?n.href:""}catch{return""}},H=(t,a,n,o="btn btn--line")=>{var l;let r=se(t);if(!r)return"";let s=typeof a.reviews=="object"&&((l=a.reviews)==null?void 0:l.google)||F[n]||F.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${f("star",16)} ${e(s)}</a></p>`},j={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},U={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},W=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function _(t,a){var s,l,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=t==null?void 0:t.date)!=null?s:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((c=U[a])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(t.date)}">${e(r)}</time>`}function ie(t,a){var l,c;let n=t.filter(i=>i.rating>=1&&i.rating<=5);if(n.length<2)return"";let o=n.reduce((i,u)=>i+Number(u.rating),0)/n.length,r=(l=j[a])!=null?l:j.en,s=new Intl.NumberFormat((c=U[a])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${f("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(t.length)))}</span></p>`}function K(t,a,n,o){var l;if(!t.length)return"";let r=(l=j[a])!=null?l:j.en,s=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?r.prev:r.next)}">${f("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ie(t,a)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
    </div>${le}`}var le=`<style>
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
upd()}})()<\/script>`;var J=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function Z({site:t,markets:a,url:n,abs:o}){var l;let r=(l=a.find(c=>c.default))!=null?l:a[0],s=a.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${a.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${o(`${c.id}/`)}">`).join(`
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
<body><p>${a.map(c=>`<a href="${n(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ce="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",Y=9;function Ae({site:t,catalog:a,i18n:n,template:o,basePath:r="/",siteUrl:s=t.domain}){let l=B(r),c=h=>new URL(l(h),s).href,i=a.markets,u=A(t.bookingForm),b=u&&!u.error?u:null,p=i.map(h=>{var g,M,w,v;let y=h.lang,m=(M=(g=n[y])!=null?g:n.en)!=null?M:n.vi,d=C=>P(C,y,"en"),k=(v=(w=t.bookingChannels)==null?void 0:w[h.id])!=null?v:["phone"],x={site:t,catalog:a,market:h,markets:i,lang:y,t:m,L:d,url:l,abs:c,channels:k,money:C=>q(C,h),template:o,gform:b};return{path:`${h.id}/index.html`,html:ue(x)}});return p.push({path:"index.html",html:Z({site:t,markets:i,url:l,abs:c})}),p}var E=(t,a)=>t.heroImage?z(a,t.heroImage):a("assets/photos/hero.webp"),pe=(t,a)=>{var n,o,r;return(Array.isArray(t)?t:(r=(o=(n=t==null?void 0:t[a])!=null?n:t==null?void 0:t.en)!=null?o:t==null?void 0:t.vi)!=null?r:[]).map(s=>typeof s=="string"?s:P(s,a,"en")).filter(Boolean)};function N(t,a){var n;return((n=t.products)!=null?n:[]).map(o=>{var s;let r=((s=o.variants)!=null?s:[]).map(l=>({...l,price:T(l,a)})).filter(l=>l.price!=null);return{...o,rates:r,from:r.length?Math.min(...r.map(l=>l.price)):null}}).filter(o=>o.rates.length)}var de=(t,a)=>t&&t.basePrice!=null?T(t,a):null;function he(t,a){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t!=null?t:""));return n?new Intl.DateTimeFormat(S(a),{day:"2-digit",month:"2-digit",year:"numeric",timeZone:"UTC"}).format(new Date(Date.UTC(+n[1],+n[2]-1,+n[3]))):""}function ue(t){var d,k,$,x,g,M,w;let{site:a,market:n,markets:o,lang:r,t:s,L:l,url:c,abs:i}=t,u=`${a.name} \xB7 ${l(a.tagline)}`,b=(d=a.theme)!=null?d:{},p=["primary","ink","bg","surface","soft","accent"].filter(v=>b[v]).map(v=>`--${v}:${b[v]}`).join(";"),h=(k=o.find(v=>v.default))!=null?k:o[0],y=o.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:c(`${v.id}/`)})),m=($=a.contact)!=null?$:{};return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(u)}</title>
<meta name="description" content="${e(l(a.intro))}">
<link rel="canonical" href="${i(`${n.id}/`)}">
${o.map(v=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${i(`${v.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${i(`${h.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(u)}">
<meta property="og:description" content="${e(l(a.intro))}">
<meta property="og:url" content="${i(`${n.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(new URL(E(a,c),i("")).href)}">
<meta name="theme-color" content="${e((x=b.bg)!=null?x:"#F4F5F1")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ce}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${p}}</style>
<noscript><style>.album .more{display:block}.album-more{display:none}</style></noscript>
${V(Se(t))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(y))}' data-wa="${e(D(m.whatsapp))}" data-email="${e((g=m.email)!=null?g:"")}" data-copied="${e(s.booking.copied)}" data-tz="${e((M=a.timezone)!=null?M:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${e(s.skip)}</a>
${I(s)}
${me(t)}
<main id="main">
${ge(t)}
${fe(t)}
${ve(t)}
${be(t)}
${ye(t)}
${$e(t)}
${ke(t)}
${xe(t)}
${we(t)}
${Me(t)}
</main>
${De(t)}
<nav class="dock" aria-label="${e(s.nav.book)}">
  <a href="${e(L(t.channels[0],m))}" ${G(t.channels[0])}>${f(t.channels[0],20)}<span>${e((w=s.via[t.channels[0]])!=null?w:"")}</span></a>
  <a class="primary" href="#booking">${f("calendar",20)}<span>${e(s.nav.book)}</span></a>
</nav>
</body>
</html>
`}function me({site:t,market:a,markets:n,t:o,url:r}){var l,c;let s=[["#units",o.nav.units],["#costs",o.nav.costs],["#contract",o.nav.contract],["#visit",o.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${a.id}/`)}">
      ${t.logo?`<img src="${e(z(r,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${e((c=((l=t.name)!=null?l:"A").trim()[0])!=null?c:"A")}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([i,u])=>`<a href="${i}">${e(u)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${f("globe",18)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(O(a))}</span></span></summary>
        <ul>${n.map(i=>`<li><a href="${r(`${i.id}/`)}" hreflang="${e(i.lang)}"${i.id===a.id?' aria-current="true"':""}>${e(i.country)} \xB7 ${e(i.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-md" href="#booking">${e(o.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${f("menu",22)}</summary>
        <nav aria-label="Menu">${[...s,["#booking",o.nav.book]].map(([i,u])=>`<a href="${i}">${e(u)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ge(t){var y;let{site:a,t:n,L:o,url:r,catalog:s,market:l,money:c}=t,i=N(s,l),u=i.filter(m=>!m.rented).length,b=Math.min(...i.map(m=>m.from)),p=a.heroImage2?z(r,a.heroImage2):r("assets/photos/hero-2.webp"),h=[[String(u),n.hero.free],Number.isFinite(b)?[c(b),n.hero.from]:null,...((y=a.highlights)!=null?y:[]).filter(m=>o(m==null?void 0:m.label)).slice(0,2).map(m=>[o(m.value)||m.value,o(m.label)])].filter(Boolean);return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${o(a.place)?`<p class="eyebrow">${f("pin",16)} ${e(o(a.place))}</p>`:""}
      <h1>${e(o(a.tagline))}</h1>
      ${o(a.intro)?`<p class="lead">${e(o(a.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#units">${e(n.hero.see)}</a>
        <a class="btn btn--line btn--lg" href="#booking">${f("calendar",18)} ${e(n.hero.book)}</a>
      </div>
      <dl class="stats">${h.map(([m,d])=>`<div><dt>${e(d)}</dt><dd>${e(m)}</dd></div>`).join("")}</dl>
    </div>
    <div class="hero-media">
      <img class="h1img" src="${e(E(a,r))}" alt="" width="900" height="1100" fetchpriority="high">
      <img class="h2img" src="${e(p)}" alt="" width="600" height="450">
    </div>
  </div>
</section>`}function fe(t){var b;let{t:a,L:n,url:o,catalog:r,market:s,money:l,lang:c}=t,i=N(r,s);if(!i.length)return"";let u=((b=r.categories)!=null?b:[]).filter(p=>i.some(h=>h.category===p.id));return`<section class="section" id="units" aria-labelledby="units-title">
  <div class="wrap">
    <div class="head-row">
      <div class="head"><p class="kicker">${e(a.units.kicker)}</p><h2 id="units-title" class="h2">${e(a.units.title)}</h2></div>
      <div class="filters">
        ${u.length>1?`<div class="chips" role="group" aria-label="${e(a.units.kicker)}"><button type="button" class="chip" aria-pressed="true" data-filter="">${e(a.units.all)}</button>${u.map(p=>`<button type="button" class="chip" aria-pressed="false" data-filter="${e(p.id)}">${e(n(p.name))}</button>`).join("")}</div>`:""}
        <label class="switch"><input type="checkbox" data-only-free> <span>${e(a.units.onlyFree)}</span></label>
      </div>
    </div>
    <div class="units">${i.map(p=>{var d,k;let h=(d=p.facts)!=null?d:{},y=[h.area?["ruler",`${h.area} m\xB2`]:null,h.bedrooms!=null?["bed",h.bedrooms?a.units.bedrooms.replace("{n}",h.bedrooms):a.units.studio]:null,h.people?["users",a.units.people.replace("{n}",h.people)]:null,h.floor?["gauge",a.units.floor.replace("{n}",h.floor)]:null,n(h.view)?["sun",n(h.view)]:null,n(h.furniture)?["check",n(h.furniture)]:null].filter(Boolean),m=p.rented?`<span class="status is-rented">${e(a.units.rented)}</span>`:p.available?`<span class="status is-soon" data-from="${e(p.available)}" data-now="${e(a.units.freeNow)}">${e(a.units.freeFrom.replace("{date}",he(p.available,c)))}</span>`:`<span class="status is-free">${e(a.units.freeNow)}</span>`;return`<article class="unit${p.rented?" is-rented":""}" data-cat="${e((k=p.category)!=null?k:"")}"${p.rented?" data-rented":""}>
      <div class="unit-img">${p.image?`<img sizes="${R.wide}" src="${e(z(o,p.image))}" alt="${e(n(p.name))}" width="900" height="640" loading="lazy">`:""}${m}</div>
      <div class="unit-body">
        <h3>${e(n(p.name))}</h3>
        ${y.length?`<ul class="facts">${y.map(([$,x])=>`<li>${f($,15)} ${e(x)}</li>`).join("")}</ul>`:""}
        ${n(p.description)?`<p class="muted">${e(n(p.description))}</p>`:""}
        <dl class="rates">${p.rates.map($=>`<div><dt>${e(n($.label))}</dt><dd>${e(l($.price))}<small>${e(a.units.perMonth)}</small></dd></div>`).join("")}</dl>
        ${p.rented?`<button type="button" class="btn btn--line" disabled>${e(a.units.rented)}</button>`:`<a class="btn btn--primary" href="#booking" data-room="${e(p.id)}">${f("calendar",16)} ${e(a.units.book)}</a>`}
      </div>
    </article>`}).join("")}</div>
    <p class="empty" data-empty hidden>${e(a.units.empty)}</p>
  </div>
</section>`}function ve(t){var h,y,m;let{site:a,t:n,L:o,market:r,money:s,catalog:l}=t,c=(h=a.costs)!=null?h:{},i=[["electric","bolt",n.costs.electric,n.costs.perKwh],["water","drop",n.costs.water,n.costs.perPerson],["service","wrench",n.costs.service,n.costs.perUnit],["parking","bike",n.costs.parking,n.costs.perBike]].map(([d,k,$,x])=>({k:d,i:k,label:$,per:x,price:de(c[d],r)})).filter(d=>d.price!=null);if(!i.length)return"";let u=N(l,r).filter(d=>!d.rented),b={units:u.map(d=>{var k,$;return{id:d.id,name:o(d.name),price:d.from,people:($=(k=d.facts)==null?void 0:k.people)!=null?$:2}}),costs:Object.fromEntries(i.map(d=>[d.k,d.price]))},p=new Intl.NumberFormat(S(t.lang),{style:"currency",currency:r.currency});return`<section class="section section--soft" id="costs" aria-labelledby="costs-title">
  <div class="wrap costs">
    <div>
      <div class="head"><p class="kicker">${e(n.costs.kicker)}</p><h2 id="costs-title" class="h2">${e(n.costs.title)}</h2></div>
      <ul class="fees">${i.map(d=>`<li><span class="fi">${f(d.i,20)}</span><span class="fl">${e(d.label)}</span><b>${e(s(d.price))}<small>${e(d.per)}</small></b></li>`).join("")}
        ${o(c.internet)?`<li><span class="fi">${f("wifi",20)}</span><span class="fl">${e(n.costs.internet)}</span><b>${e(o(c.internet))}</b></li>`:""}</ul>
      ${o(c.note)?`<p class="fine">${e(o(c.note))}</p>`:""}
    </div>
    ${u.length?`<form class="card calc" data-calc='${e(JSON.stringify({...b,money:{locale:S(t.lang),currency:r.currency,max:(y=p.resolvedOptions().maximumFractionDigits)!=null?y:0}}))}' onsubmit="return false">
      <h3>${e(n.costs.calc)}</h3>
      <label class="field"><span>${e(n.costs.unit)}</span><select data-calc-unit>${u.map(d=>`<option value="${e(d.id)}">${e(o(d.name))}</option>`).join("")}</select></label>
      <div class="row3">
        <label class="field"><span>${e(n.costs.people)}</span><input type="number" min="1" max="8" value="2" data-calc-people></label>
        <label class="field"><span>${e(n.costs.bikes)}</span><input type="number" min="0" max="5" value="1" data-calc-bikes></label>
        <label class="field"><span>${e(n.costs.kwh)}</span><input type="number" min="0" max="2000" step="10" value="${e((m=c.kwh)!=null?m:150)}" data-calc-kwh></label>
      </div>
      <dl class="calc-lines" data-calc-lines></dl>
      <p class="calc-total"><span>${e(n.costs.total)}</span><b data-calc-total>\u2014</b></p>
    </form>`:""}
  </div>
</section>`}function be({site:t,t:a,lang:n}){var r;let o=pe((r=t.contract)==null?void 0:r.list,n);return o.length?`<section class="section" id="contract" aria-labelledby="contract-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${e(a.contract.kicker)}</p><h2 id="contract-title" class="h2">${e(a.contract.title)}</h2></div>
    <ol class="terms">${o.map((s,l)=>`<li><span class="n">${l+1}</span><p>${e(s)}</p></li>`).join("")}</ol>
  </div>
</section>`:""}function ye({site:t,t:a,L:n}){var s,l;let o=((s=t.amenities)!=null?s:[]).filter(c=>n(c==null?void 0:c.label)),r=((l=t.around)!=null?l:[]).filter(c=>n(c==null?void 0:c.name));return!o.length&&!r.length?"":`<section class="section section--deep" aria-labelledby="am-title">
  <div class="wrap amen-grid">
    <div>
      <h2 id="am-title" class="h2">${e(a.amenities)}</h2>
      <ul class="amen">${o.map(c=>`<li>${f(c.icon||"check",20)} ${e(n(c.label))}</li>`).join("")}</ul>
    </div>
    ${r.length?`<div class="around"><h3>${e(a.around)}</h3><ul>${r.map(c=>`<li><span>${e(n(c.name))}</span><b>${e(n(c.distance))}</b></li>`).join("")}</ul></div>`:""}
  </div>
</section>`}function $e(t){var m,d,k,$,x;let{site:a,t:n,L:o,channels:r,gform:s,catalog:l,market:c}=t,i=n.booking,u=(m=a.contact)!=null?m:{},b=N(l,c).filter(g=>!g.rented),p=((k=(d=a.viewing)==null?void 0:d.slots)!=null?k:["09:00","10:30","14:00","15:30","17:00","18:30"]).filter(Boolean),h=s?` data-gform="${e(s.action)}" data-gmap='${e(JSON.stringify(s.fields))}'`:"",y=r.map((g,M)=>{var w;return`<button type="button" class="btn ${M===0?"btn--primary":"btn--line"}" data-channel="${e(g)}" data-href="${e(L(g,u,""))}">${f(g,18)} ${e((w=n.via[g])!=null?w:g)}</button>`}).join("");return`<section class="section section--soft" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="book-copy">
      <p class="kicker">${e(i.kicker)}</p>
      <h2 id="book-title" class="h2">${e(i.heading)}</h2>
      <p class="lead">${e(o(($=a.viewing)==null?void 0:$.note)||i.text)}</p>
      <ul class="book-list">${i.points.map(g=>`<li>${f("check",18)} ${e(g)}</li>`).join("")}</ul>
    </div>
    <form class="card form" data-book novalidate${h} data-order-text="${e(i.message)}">
      <div class="book-fields">
        <h3 class="form-h">${e(i.title)}</h3>
        <label class="field"><span>${e(i.unit)}</span><select name="unit" data-unit>${b.map(g=>`<option value="${e(g.id)}" data-price="${e(t.money(g.from))}">${e(o(g.name))}</option>`).join("")}<option value="">${e(i.any)}</option></select></label>
        <div class="row2">
          <label class="field"><span>${e(i.date)}</span><input type="date" name="vdate" data-vdate></label>
          <label class="field"><span>${e(i.time)}</span><select name="vtime">${p.map(g=>`<option>${e(g)}</option>`).join("")}</select></label>
        </div>
        <div class="row3">
          <label class="field"><span>${e(i.moveIn)}</span><input type="date" name="movein" data-movein></label>
          <label class="field"><span>${e(i.term)}</span><select name="term">${((x=a.terms)!=null?x:[6,12]).map(g=>`<option value="${e(g)}">${e(i.months.replace("{n}",g))}</option>`).join("")}</select></label>
          <label class="field"><span>${e(i.people)}</span><select name="people">${[1,2,3,4,5,6].map(g=>`<option${g===2?" selected":""}>${g}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(i.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(i.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(i.note)}</span><input name="note" maxlength="200" placeholder="${e(i.noteHint)}"></label>
        <input type="hidden" name="product"><input type="hidden" name="date"><input type="hidden" name="price"><input type="hidden" name="size">
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(i.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${e(i.sending)}">${f("calendar",18)} ${e(i.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${f(s?"check":"arrow",22)} ${e(s?i.done:i.stepTitle)}</p>
        <p>${e(s?i.doneText:i.stepText)}</p>
        ${s?"":`<div class="buy">${y}</div><button type="button" class="link" data-edit>${e(i.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function ke({site:t,t:a,url:n}){var r;let o=((r=t.album)!=null?r:[]).filter(s=>s==null?void 0:s.image);return o.length?`<section class="section" aria-labelledby="al-title">
  <div class="wrap">
    <h2 id="al-title" class="h2">${e(a.album.title)}</h2>
    <div class="album">${o.map((s,l)=>`<a class="ph${l>=Y?" more":""}" href="${e(z(n,s.image))}" target="_blank" rel="noopener"><img sizes="${R.card}" src="${e(z(n,s.image))}" alt="${e(`${t.name} ${l+1}`)}" width="800" height="600" loading="lazy"></a>`).join("")}</div>
    ${o.length>Y?`<p class="center"><button type="button" class="btn btn--line album-more" data-album-more>${e(a.album.more)}</button></p>`:""}
  </div>
</section>`:""}function xe({site:t,t:a,L:n,lang:o}){let r=H(t,a,o,"btn btn--line"),s=W(t);return t.showReviews===!1||!s.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(a.reviews)}</h2>
    ${K(s,o,"quotes",l=>`<figure class="quote">
      ${l.rating?`<div class="stars" aria-label="${l.rating}/5">${Array.from({length:5},(c,i)=>`<span class="${i<l.rating?"on":""}">${f("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(n(l.text))}</blockquote>
      <figcaption><strong>${e(l.name)}</strong>${l.bought?` \xB7 ${e(n(l.bought))}`:""}${_(l,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function we({site:t,t:a,L:n}){var s,l;let o=(s=t.contact)!=null?s:{},r=encodeURIComponent((l=o.mapQuery)!=null?l:n(o.address));return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${n(t.hours)?`<p class="badge-open">${e(n(t.hours))}</p>`:""}
      ${n(o.address)?`<p class="addr">${f("pin",18)} ${e(n(o.address))}</p>`:""}
      ${n(t.directions)?`<p class="addr">${f("route",18)} ${e(n(t.directions))}</p>`:""}
      ${o.phone?`<p class="addr">${f("phone",18)} <a href="tel:${D(o.phone)}">${e(o.phone)}</a></p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${e(a.visit.directions)} ${f("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Me({site:t,t:a,L:n}){var r;let o=((r=t.faq)!=null?r:[]).filter(s=>n(s==null?void 0:s.q));return o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div class="qa">${o.map((s,l)=>`<details${l===0?" open":""}><summary>${e(n(s.q))}</summary><p>${e(n(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function De({site:t,t:a,L:n,market:o}){var l,c;let r=(l=t.contact)!=null?l:{},s=Object.entries((c=t.social)!=null?c:{}).filter(([,i])=>i);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${r.phone?`<li><a href="tel:${D(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${s.map(([i,u])=>`<li><a href="${e(u)}" target="_blank" rel="noopener">${e(i[0].toUpperCase()+i.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${J(t,a,o.lang)}</div>
</footer>`}function Se({site:t,market:a,L:n,abs:o,url:r,catalog:s}){var c;let l=(c=t.contact)!=null?c:{};return{"@context":"https://schema.org","@type":"ApartmentComplex",name:t.name,url:o(`${a.id}/`),description:n(t.intro),image:new URL(E(t,r),o("")).href,telephone:l.phone,address:{"@type":"PostalAddress",streetAddress:n(l.address)},containsPlace:N(s,a).map(i=>{var u,b,p;return{"@type":"Apartment",name:n(i.name),floorSize:(u=i.facts)!=null&&u.area?{"@type":"QuantitativeValue",value:i.facts.area,unitCode:"MTK"}:void 0,numberOfRooms:((b=i.facts)==null?void 0:b.bedrooms)||void 0,occupancy:(p=i.facts)!=null&&p.people?{"@type":"QuantitativeValue",maxValue:i.facts.people}:void 0,offers:{"@type":"Offer",price:i.from,priceCurrency:a.currency,availability:i.rented?"https://schema.org/SoldOut":"https://schema.org/InStock"}}})}}export{Ae as renderSite};
