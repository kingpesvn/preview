var te={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t=(e="")=>String(e).replace(/[&<>"']/g,a=>te[a]);function P(e,a,n="vi"){var r,s,i;return e==null?"":typeof e!="object"?String(e):(i=(s=(r=e[a])!=null?r:e[n])!=null?s:Object.values(e)[0])!=null?i:""}var ae={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},T=e=>{var a;return(a=ae[e])!=null?a:"en-US"};function ne(e,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(e)-.01);let n=Number(a)||1;return Math.max(n,Math.round(e/n)*n)}function C(e,a){var r,s;if(a.default)return e.basePrice;let n=(s=(r=e.prices)==null?void 0:r[a.id])!=null?s:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ne(e.basePrice*a.rate,a.rounding)}var oe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function B(e,a){let n={style:"currency",currency:a.currency};return oe.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(T(a.lang),n).format(e)}function V(e="/"){let a=e.endsWith("/")?e:`${e}/`;return(n="")=>a+String(n).replace(/^\//,"")}var re=(e="")=>e.startsWith("uploads/")?e:/^([a-z]+:|\/)/i.test(e)?null:`assets/${e}`,w=(e,a)=>{let n=re(a);return n==null?a:e(n)},$=(e="")=>String(e).replace(/\D/g,"");function L(e,a,n=""){switch(e){case"phone":return`tel:${$(a.phone)}`;case"zalo":return`https://zalo.me/${$(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${$(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var A=e=>`<script type="application/ld+json">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`,ie=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function F(e){if(!e||typeof e!="string")return null;let a;try{a=new URL(e.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let r={};for(let[s,i]of a.searchParams){if(!/^entry\.\d+$/.test(s))continue;let o=i.trim().replace(/^\{|\}$/g,"").toLowerCase();ie.includes(o)&&(r[o]=s)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var R={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var se={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},d=(e,a=20,n="")=>{var r;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(r=se[e])!=null?r:""}</svg>`};function G(e){var n,r;return(r=(n=new Intl.NumberFormat(T(e.lang),{style:"currency",currency:e.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:n.value)!=null?r:e.currency}var H=e=>e==="phone"||e==="email"?"":'target="_blank" rel="noopener"',I=e=>`<div class="suggest" id="market-suggest" data-suggest="${t(e.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${t(e.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${t(e.market.dismiss)}">\xD7</button>
</div>`;var O={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ce=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,le=e=>{var a;try{let n=new URL(String((a=e.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&ce.test(n.hostname)?n.href:""}catch{return""}},U=(e,a,n,r="btn btn--line")=>{var o;let s=le(e);if(!s)return"";let i=typeof a.reviews=="object"&&((o=a.reviews)==null?void 0:o.google)||O[n]||O.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${t(s)}" target="_blank" rel="noopener">${d("star",16)} ${t(i)}</a></p>`},j={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},W={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},_=e=>{var a;return((a=e.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function K(e,a){var i,o,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=e==null?void 0:e.date)!=null?i:"").trim());if(!n)return"";let r=new Date(Date.UTC(+n[1],+n[2]-1,+((o=n[3])!=null?o:1)));if(Number.isNaN(r.getTime()))return"";let s=new Intl.DateTimeFormat((c=W[a])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${t(e.date)}">${t(s)}</time>`}function pe(e,a){var o,c;let n=e.filter(l=>l.rating>=1&&l.rating<=5);if(n.length<2)return"";let r=n.reduce((l,h)=>l+Number(h.rating),0)/n.length,s=(o=j[a])!=null?o:j.en,i=new Intl.NumberFormat((c=W[a])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${d("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${t(s.count.replace("{n}",String(e.length)))}</span></p>`}function J(e,a,n,r){var o;if(!e.length)return"";let s=(o=j[a])!=null?o:j.en,i=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${t(c==="prev"?s.prev:s.next)}">${d("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${pe(e,a)}<div class="rv" data-rv data-rv-more="${t(s.more)}" data-rv-less="${t(s.less)}">
      <div class="${n} rv-track" tabindex="0">${e.map(r).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${de}`}var de=`<style>
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
upd()}})()<\/script>`;var Z=(e,a,n)=>e.badge===!1?"":`<a class="made" href="https://kingpes.net/${t(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${t(a.footer.madeWith)}</a>`;function Y({site:e,markets:a,url:n,abs:r}){var o;let s=(o=a.find(c=>c.default))!=null?o:a[0],i=a.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${t(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(e.name)}</title>
<link rel="canonical" href="${r(`${s.id}/`)}">
${a.map(c=>`<link rel="alternate" hreflang="${t(c.lang)}-${t(c.country)}" href="${r(`${c.id}/`)}">`).join(`
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
<body><p>${a.map(c=>`<a href="${n(`${c.id}/`)}">${t(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var he="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",X=12,Q=8;function Ve({site:e,catalog:a,i18n:n,template:r,basePath:s="/",siteUrl:i=e.domain}){let o=V(s),c=m=>new URL(o(m),i).href,l=a.markets,h=F(e.bookingForm),v=h&&!h.error?h:null,p=l.map(m=>{var M,D,S,z;let f=m.lang,b=(D=(M=n[f])!=null?M:n.en)!=null?D:n.vi,u=x=>P(x,f,"en"),y=(z=(S=e.bookingChannels)==null?void 0:S[m.id])!=null?z:["phone"],N={site:e,catalog:a,market:m,markets:l,lang:f,t:b,L:u,url:o,abs:c,channels:y,money:x=>B(x,m),template:r,gform:v};return{path:`${m.id}/index.html`,html:ue(N)}});return p.push({path:"index.html",html:Y({site:e,markets:l,url:o,abs:c})}),p}var E=(e,a)=>e.heroImage?w(a,e.heroImage):a("assets/photos/hero.webp"),ee=(e,a)=>{var n,r,s;return(Array.isArray(e)?e:(s=(r=(n=e==null?void 0:e[a])!=null?n:e==null?void 0:e.en)!=null?r:e==null?void 0:e.vi)!=null?s:[]).map(i=>typeof i=="string"?i:P(i,a,"en")).filter(Boolean)};function q(e,a){var n;return((n=e.products)!=null?n:[]).map((r,s)=>{var o;let i=((o=r.variants)!=null?o:[]).map(c=>({...c,price:C(c,a)})).filter(c=>c.price!=null);return{...r,code:r.code||`M-${String(s+1).padStart(3,"0")}`,rates:i,from:i.length?Math.min(...i.map(c=>c.price)):null,depositPrice:r.deposit?C(r.deposit,a):null}}).filter(r=>r.rates.length)}function ue(e){var u,y,k,N,M,D,S,z,x;let{site:a,market:n,markets:r,lang:s,t:i,L:o,url:c,abs:l}=e,h=`${a.name} \xB7 ${o(a.tagline)}`,v=(u=a.theme)!=null?u:{},p=["primary","ink","bg","surface","soft","accent"].filter(g=>v[g]).map(g=>`--${g}:${v[g]}`).join(";"),m=(y=r.find(g=>g.default))!=null?y:r[0],f=r.map(g=>({id:g.id,lang:g.lang,country:g.country,currency:g.currency,href:c(`${g.id}/`)})),b=(k=a.contact)!=null?k:{};return`<!doctype html>
<html lang="${t(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t(h)}</title>
<meta name="description" content="${t(o(a.intro))}">
<link rel="canonical" href="${l(`${n.id}/`)}">
${r.map(g=>`<link rel="alternate" hreflang="${t(g.lang)}-${t(g.country)}" href="${l(`${g.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${l(`${m.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${t(h)}">
<meta property="og:description" content="${t(o(a.intro))}">
<meta property="og:url" content="${l(`${n.id}/`)}">
<meta property="og:site_name" content="${t(a.name)}">
<meta property="og:image" content="${t(new URL(E(a,c),l("")).href)}">
<meta name="theme-color" content="${t((N=v.bg)!=null?N:"#FBF7F2")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${he}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${p}}</style>
<noscript><style>.dress.more,.album .more{display:block}.dress-more,.album-more,.try-btn,.trybar{display:none}</style></noscript>
${A(De(e))}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${t(n.id)}" data-markets='${t(JSON.stringify(f))}' data-wa="${t($(b.whatsapp))}" data-email="${t((M=b.email)!=null?M:"")}" data-copied="${t(i.booking.copied)}" data-trykey="kp-try-${t(String((D=a.name)!=null?D:"").toLowerCase().replace(/[^a-z0-9]+/g,"-"))}" data-trymax="${t((S=a.tryMax)!=null?S:5)}" data-tz="${t((z=a.timezone)!=null?z:"Asia/Ho_Chi_Minh")}">
<a class="skip" href="#main">${t(i.skip)}</a>
${I(i)}
${me(e)}
<main id="main">
${ge(e)}
${fe(e)}
${ve(e)}
${be(e)}
${ye(e)}
${$e(e)}
${ke(e)}
${xe(e)}
${we(e)}
</main>
${Me(e)}
<div class="trybar" data-trybar hidden><span>${d("heart",18)} <b data-try-count>0</b> ${t(i.collection.picked)}</span><a class="btn btn--primary" href="#booking">${t(i.collection.bookTry)}</a></div>
<nav class="dock" aria-label="${t(i.nav.book)}">
  <a href="${t(L(e.channels[0],b))}" ${H(e.channels[0])}>${d(e.channels[0],20)}<span>${t((x=i.via[e.channels[0]])!=null?x:"")}</span></a>
  <a class="primary" href="#booking">${d("calendar",20)}<span>${t(i.nav.book)}</span></a>
</nav>
</body>
</html>
`}function me({site:e,market:a,markets:n,t:r,url:s}){let i=[["#collection",r.nav.collection],["#packages",r.nav.packages],["#steps",r.nav.steps],["#visit",r.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${a.id}/`)}">
      ${e.logo?`<img src="${t(w(s,e.logo))}" alt="" width="40" height="40">`:""}
      <span>${t(e.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([o,c])=>`<a href="${o}">${t(c)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${t(r.market.label)}">${d("globe",18)}<span>${t(a.id.toUpperCase())}<span class="cur"> \xB7 ${t(G(a))}</span></span></summary>
        <ul>${n.map(o=>`<li><a href="${s(`${o.id}/`)}" hreflang="${t(o.lang)}"${o.id===a.id?' aria-current="true"':""}>${t(o.country)} \xB7 ${t(o.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-md" href="#booking">${t(r.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${t(r.nav.openMenu)}">${d("menu",22)}</summary>
        <nav aria-label="Menu">${[...i,["#booking",r.nav.book]].map(([o,c])=>`<a href="${o}">${t(c)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ge(e){let{site:a,t:n,L:r,url:s,catalog:i,market:o,money:c}=e,l=q(i,o),h=Math.min(...l.map(v=>v.from));return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${r(a.place)?`<p class="eyebrow">${t(r(a.place))}</p>`:""}
      <h1>${t(r(a.tagline))}</h1>
      ${r(a.intro)?`<p class="lead">${t(r(a.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#collection">${t(n.hero.see)}</a>
        <a class="btn btn--line btn--lg" href="#booking">${d("calendar",18)} ${t(n.hero.book)}</a>
      </div>
      <p class="hero-note"><span>${t(n.hero.count.replace("{n}",l.length))}</span>${Number.isFinite(h)?`<span>${t(n.hero.from.replace("{price}",c(h)))}</span>`:""}</p>
    </div>
    <figure class="hero-media"><img src="${t(E(a,s))}" alt="" width="900" height="1150" fetchpriority="high"></figure>
  </div>
</section>`}function fe(e){var v;let{t:a,L:n,url:r,catalog:s,market:i,money:o}=e,c=q(s,i);if(!c.length)return"";let l=((v=s.categories)!=null?v:[]).filter(p=>c.some(m=>m.category===p.id)),h=p=>{var m;return n((m=l.find(f=>f.id===p))==null?void 0:m.name)};return`<section class="section" id="collection" aria-labelledby="col-title">
  <div class="wrap">
    <div class="head center"><p class="kicker">${t(a.collection.kicker)}</p><h2 id="col-title" class="h2">${t(a.collection.title)}</h2><p class="lead">${t(a.collection.text)}</p></div>
    ${l.length>1?`<div class="chips" role="group" aria-label="${t(a.collection.kicker)}"><button type="button" class="chip" aria-pressed="true" data-filter="">${t(a.collection.all)}</button>${l.map(p=>`<button type="button" class="chip" aria-pressed="false" data-filter="${t(p.id)}">${t(n(p.name))}</button>`).join("")}</div>`:""}
    <div class="dresses">${c.map((p,m)=>{var f,b,u;return`<article class="dress${m>=X?" more":""}" data-cat="${t((f=p.category)!=null?f:"")}">
      <div class="dress-img">
        ${p.image?`<img sizes="${R.card}" src="${t(w(r,p.image))}" alt="${t(`${p.code} \xB7 ${n(p.name)}`)}" width="640" height="800" loading="lazy">`:""}
        <span class="code">${t(p.code)}</span>
        <button type="button" class="try-btn" data-try="${t(p.code)}" aria-pressed="false" aria-label="${t(a.collection.tryThis)} ${t(p.code)}">${d("heart",18)}</button>
      </div>
      <div class="dress-body">
        ${h(p.category)?`<p class="dcat">${t(h(p.category))}</p>`:""}
        <h3>${t(n(p.name))}</h3>
        <p class="dmeta">${[n(p.color),((b=p.sizes)!=null?b:[]).length?`${a.collection.sizes}: ${((u=p.sizes)!=null?u:[]).join(" \xB7 ")}`:""].filter(Boolean).map(t).join(" \u2014 ")}</p>
        <dl class="rates">${p.rates.map(y=>`<div><dt>${t(n(y.label))}</dt><dd>${t(o(y.price))}</dd></div>`).join("")}${p.depositPrice?`<div><dt>${t(a.collection.deposit)}</dt><dd>${t(o(p.depositPrice))}</dd></div>`:""}</dl>
      </div>
    </article>`}).join("")}</div>
    ${c.length>X?`<p class="center"><button type="button" class="btn btn--line dress-more" data-dress-more>${t(a.collection.more)}</button></p>`:""}
  </div>
</section>`}function ve({site:e,t:a,L:n,market:r,money:s,lang:i}){var c;let o=((c=e.packages)!=null?c:[]).filter(l=>n(l==null?void 0:l.name)).map(l=>({...l,priceN:l.price?C(l.price,r):null}));return o.length?`<section class="section section--soft" id="packages" aria-labelledby="pk-title">
  <div class="wrap">
    <div class="head center"><p class="kicker">${t(a.packages.kicker)}</p><h2 id="pk-title" class="h2">${t(a.packages.title)}</h2></div>
    <div class="packs">${o.map(l=>`<article class="pack${l.featured?" is-featured":""}">
      ${l.featured?`<p class="flag">${t(a.packages.popular)}</p>`:""}
      <h3>${t(n(l.name))}</h3>
      ${l.priceN!=null?`<p class="pprice">${t(s(l.priceN))}</p>`:""}
      <ul>${ee(l.items,i).map(h=>`<li>${d("check",16)} ${t(h)}</li>`).join("")}</ul>
      <a class="btn ${l.featured?"btn--primary":"btn--line"}" href="#booking" data-pack="${t(n(l.name))}">${t(a.packages.choose)}</a>
    </article>`).join("")}</div>
  </div>
</section>`:""}function be({site:e,t:a,L:n,lang:r}){var o;let s=((o=e.steps)!=null?o:[]).filter(c=>n(c==null?void 0:c.title)),i=ee(e.policies,r);return!s.length&&!i.length?"":`<section class="section" id="steps" aria-labelledby="st-title">
  <div class="wrap">
    <div class="head center"><p class="kicker">${t(a.steps.kicker)}</p><h2 id="st-title" class="h2">${t(a.steps.title)}</h2></div>
    ${s.length?`<ol class="steps">${s.map((c,l)=>`<li><span class="n">${l+1}</span><h3>${t(n(c.title))}</h3>${n(c.text)?`<p>${t(n(c.text))}</p>`:""}</li>`).join("")}</ol>`:""}
    ${i.length?`<div class="policies"><h3>${t(a.steps.policies)}</h3><ul>${i.map(c=>`<li>${d("check",16)} ${t(c)}</li>`).join("")}</ul></div>`:""}
  </div>
</section>`}function ye(e){var p,m,f,b;let{site:a,t:n,L:r,channels:s,gform:i}=e,o=n.booking,c=(p=a.contact)!=null?p:{},l=((f=(m=a.fitting)==null?void 0:m.slots)!=null?f:["09:00","10:30","14:00","15:30","17:00","19:00"]).filter(Boolean),h=i?` data-gform="${t(i.action)}" data-gmap='${t(JSON.stringify(i.fields))}'`:"",v=s.map((u,y)=>{var k;return`<button type="button" class="btn ${y===0?"btn--primary":"btn--line"}" data-channel="${t(u)}" data-href="${t(L(u,c,""))}">${d(u,18)} ${t((k=n.via[u])!=null?k:u)}</button>`}).join("");return`<section class="section section--rose" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="book-copy">
      <p class="kicker">${t(o.kicker)}</p>
      <h2 id="book-title" class="h2">${t(o.heading)}</h2>
      <p class="lead">${t(r((b=a.fitting)==null?void 0:b.note)||o.text)}</p>
      <ul class="book-list">${o.points.map(u=>`<li>${d("check",18)} ${t(u)}</li>`).join("")}</ul>
    </div>
    <form class="card form" data-book novalidate${h} data-order-text="${t(o.message)}">
      <div class="book-fields">
        <h3 class="form-h">${t(o.title)}</h3>
        <label class="field"><span>${t(o.codes)}</span><input name="codes" data-codes maxlength="200" placeholder="${t(o.codesHint)}"></label>
        <div class="row2">
          <label class="field"><span>${t(o.date)}</span><input type="date" name="fdate" data-fdate></label>
          <label class="field"><span>${t(o.time)}</span><select name="ftime">${l.map(u=>`<option>${t(u)}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <label class="field"><span>${t(o.wedding)}</span><input type="date" name="wdate" data-wdate></label>
          <label class="field"><span>${t(o.guests)}</span><select name="guests">${[1,2,3,4,5].map(u=>`<option${u===2?" selected":""}>${u}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <label class="field"><span>${t(o.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${t(o.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${t(o.note)}</span><input name="note" maxlength="200" placeholder="${t(o.noteHint)}"></label>
        <input type="hidden" name="product"><input type="hidden" name="date"><input type="hidden" name="size">
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${t(o.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${t(o.sending)}">${d("calendar",18)} ${t(o.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${d(i?"check":"arrow",22)} ${t(i?o.done:o.stepTitle)}</p>
        <p>${t(i?o.doneText:o.stepText)}</p>
        ${i?"":`<div class="buy">${v}</div><button type="button" class="link" data-edit>${t(o.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function $e({site:e,t:a,url:n}){var s;let r=((s=e.album)!=null?s:[]).filter(i=>i==null?void 0:i.image);return r.length?`<section class="section" aria-labelledby="al-title">
  <div class="wrap">
    <h2 id="al-title" class="h2 center">${t(a.album.title)}</h2>
    <div class="album">${r.map((i,o)=>`<a class="ph${o>=Q?" more":""}" href="${t(w(n,i.image))}" target="_blank" rel="noopener"><img sizes="${R.card}" src="${t(w(n,i.image))}" alt="${t(`${e.name} ${o+1}`)}" width="640" height="800" loading="lazy"></a>`).join("")}</div>
    ${r.length>Q?`<p class="center"><button type="button" class="btn btn--line album-more" data-album-more>${t(a.album.more)}</button></p>`:""}
  </div>
</section>`:""}function ke({site:e,t:a,L:n,lang:r}){let s=U(e,a,r,"btn btn--line"),i=_(e);return e.showReviews===!1||!i.length&&!s?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2 center">${t(a.reviews)}</h2>
    ${J(i,r,"quotes",o=>`<figure class="quote">
      ${o.rating?`<div class="stars" aria-label="${o.rating}/5">${Array.from({length:5},(c,l)=>`<span class="${l<o.rating?"on":""}">${d("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${t(n(o.text))}</blockquote>
      <figcaption><strong>${t(o.name)}</strong>${o.bought?` \xB7 ${t(n(o.bought))}`:""}${K(o,r)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function xe({site:e,t:a,L:n}){var i,o;let r=(i=e.contact)!=null?i:{},s=encodeURIComponent((o=r.mapQuery)!=null?o:n(r.address));return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${t(a.visit.title)}</h2>
      ${n(e.hours)?`<p class="badge-open">${t(n(e.hours))}</p>`:""}
      ${n(r.address)?`<p class="addr">${d("pin",18)} ${t(n(r.address))}</p>`:""}
      ${n(e.directions)?`<p class="addr">${d("route",18)} ${t(n(e.directions))}</p>`:""}
      ${r.phone?`<p class="addr">${d("phone",18)} <a href="tel:${$(r.phone)}">${t(r.phone)}</a></p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${t(a.visit.directions)} ${d("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${t(a.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function we({site:e,t:a,L:n}){var s;let r=((s=e.faq)!=null?s:[]).filter(i=>n(i==null?void 0:i.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2 center">${t(a.faq.title)}</h2>
    <div class="qa">${r.map((i,o)=>`<details${o===0?" open":""}><summary>${t(n(i.q))}</summary><p>${t(n(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Me({site:e,t:a,L:n,market:r}){var o,c;let s=(o=e.contact)!=null?o:{},i=Object.entries((c=e.social)!=null?c:{}).filter(([,l])=>l);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${t(e.name)}</p><p class="muted">${t(n(e.tagline))}</p></div>
    <div><p class="foot-h">${t(a.footer.contact)}</p><ul>
      ${s.phone?`<li><a href="tel:${$(s.phone)}">${t(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${t(s.email)}">${t(s.email)}</a></li>`:""}
      ${n(s.address)?`<li>${t(n(s.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${t(a.footer.follow)}</p><ul>${i.map(([l,h])=>`<li><a href="${t(h)}" target="_blank" rel="noopener">${t(l[0].toUpperCase()+l.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${e.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${t(e.name)}</span>${Z(e,a,r.lang)}</div>
</footer>`}function De({site:e,market:a,L:n,abs:r,url:s,catalog:i}){var c;let o=(c=e.contact)!=null?c:{};return{"@context":"https://schema.org","@type":"ClothingStore",name:e.name,url:r(`${a.id}/`),description:n(e.intro),image:new URL(E(e,s),r("")).href,telephone:o.phone,address:{"@type":"PostalAddress",streetAddress:n(o.address)},currenciesAccepted:a.currency,hasOfferCatalog:{"@type":"OfferCatalog",name:e.name,itemListElement:q(i,a).slice(0,40).map(l=>({"@type":"Offer",sku:l.code,price:l.from,priceCurrency:a.currency,itemOffered:{"@type":"Product",name:`${l.code} ${n(l.name)}`}}))}}}export{Ve as renderSite};
