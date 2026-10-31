var me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t=(e="")=>String(e).replace(/[&<>"']/g,n=>me[n]);function N(e,n,a="vi"){var r,s,i;return e==null?"":typeof e!="object"?String(e):(i=(s=(r=e[n])!=null?r:e[a])!=null?s:Object.values(e)[0])!=null?i:""}var ge={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},z=e=>{var n;return(n=ge[e])!=null?n:"en-US"};function fe(e,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(e)-.01);let a=Number(n)||1;return Math.max(a,Math.round(e/a)*a)}function S(e,n){var r,s;if(n.default)return e.basePrice;let a=(s=(r=e.prices)==null?void 0:r[n.id])!=null?s:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:fe(e.basePrice*n.rate,n.rounding)}var ye=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function H(e,n){let a={style:"currency",currency:n.currency};return ye.has(n.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(z(n.lang),a).format(e)}function G(e="/"){let n=e.endsWith("/")?e:`${e}/`;return(a="")=>n+String(a).replace(/^\//,"")}var ve=(e="")=>e.startsWith("uploads/")?e:/^([a-z]+:|\/)/i.test(e)?null:`assets/${e}`,P=(e,n)=>{let a=ve(n);return a==null?n:e(a)},D=(e="")=>String(e).replace(/\D/g,"");function E(e,n,a=""){switch(e){case"phone":return`tel:${D(n.phone)}`;case"zalo":return`https://zalo.me/${D(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${D(n.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var U=e=>`<script type="application/ld+json">${JSON.stringify(e).replace(/</g,"\\u003c")}<\/script>`,be=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function W(e){if(!e||typeof e!="string")return null;let n;try{n=new URL(e.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let a=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let r={};for(let[s,i]of n.searchParams){if(!/^entry\.\d+$/.test(s))continue;let o=i.trim().replace(/^\{|\}$/g,"").toLowerCase();be.includes(o)&&(r[o]=s)}return Object.keys(r).length?r.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:r}:{error:"no-phone"}:{error:"no-fields"}}var F={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ke={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},y=(e,n=20,a="")=>{var r;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(r=ke[e])!=null?r:""}</svg>`};function J(e){var a,r;return(r=(a=new Intl.NumberFormat(z(e.lang),{style:"currency",currency:e.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:a.value)!=null?r:e.currency}var K=e=>e==="phone"||e==="email"?"":'target="_blank" rel="noopener"',X=e=>`<div class="suggest" id="market-suggest" data-suggest="${t(e.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${t(e.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${t(e.market.dismiss)}">\xD7</button>
</div>`;var _={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},$e=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,xe=e=>{var n;try{let a=new URL(String((n=e.googleReview)!=null?n:"").trim());return a.protocol==="https:"&&$e.test(a.hostname)?a.href:""}catch{return""}},Y=(e,n,a,r="btn btn--line")=>{var o;let s=xe(e);if(!s)return"";let i=typeof n.reviews=="object"&&((o=n.reviews)==null?void 0:o.google)||_[a]||_.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${r}" href="${t(s)}" target="_blank" rel="noopener">${y("star",16)} ${t(i)}</a></p>`},A={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},Z={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},Q=e=>{var n;return((n=e.reviews)!=null?n:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function ee(e,n){var i,o,l;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=e==null?void 0:e.date)!=null?i:"").trim());if(!a)return"";let r=new Date(Date.UTC(+a[1],+a[2]-1,+((o=a[3])!=null?o:1)));if(Number.isNaN(r.getTime()))return"";let s=new Intl.DateTimeFormat((l=Z[n])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(r);return`<time class="rv-date" datetime="${t(e.date)}">${t(s)}</time>`}function we(e,n){var o,l;let a=e.filter(c=>c.rating>=1&&c.rating<=5);if(a.length<2)return"";let r=a.reduce((c,d)=>c+Number(d.rating),0)/a.length,s=(o=A[n])!=null?o:A.en,i=new Intl.NumberFormat((l=Z[n])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(r);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${y("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${t(s.count.replace("{n}",String(e.length)))}</span></p>`}function te(e,n,a,r){var o;if(!e.length)return"";let s=(o=A[n])!=null?o:A.en,i=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${t(l==="prev"?s.prev:s.next)}">${y("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${we(e,n)}<div class="rv" data-rv data-rv-more="${t(s.more)}" data-rv-less="${t(s.less)}">
      <div class="${a} rv-track" tabindex="0">${e.map(r).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${Me}`}var Me=`<style>
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
upd()}})()<\/script>`;var ae=(e,n,a)=>e.badge===!1?"":`<a class="made" href="https://kingpes.net/${t(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${t(n.footer.madeWith)}</a>`;function ne({site:e,markets:n,url:a,abs:r}){var o;let s=(o=n.find(l=>l.default))!=null?o:n[0],i=n.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${t(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t(e.name)}</title>
<link rel="canonical" href="${r(`${s.id}/`)}">
${n.map(l=>`<link rel="alternate" hreflang="${t(l.lang)}-${t(l.country)}" href="${r(`${l.id}/`)}">`).join(`
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
<body><p>${n.map(l=>`<a href="${a(`${l.id}/`)}">${t(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var re={vi:{room:"Lo\u1EA1i ph\xF2ng",mode:"H\xECnh th\u1EE9c",night:"Qua \u0111\xEAm",hour:"Theo gi\u1EDD",checkIn:"Ng\xE0y nh\u1EADn ph\xF2ng",checkOut:"Ng\xE0y tr\u1EA3 ph\xF2ng",date:"Ng\xE0y",start:"Gi\u1EDD \u0111\u1EBFn",hours:"S\u1ED1 gi\u1EDD",hourN:"{n} gi\u1EDD",guests:"S\u1ED1 kh\xE1ch",rooms:"S\u1ED1 ph\xF2ng",total:"T\u1EA1m t\xEDnh",nights:"{n} \u0111\xEAm",perNight:"{price}/\u0111\xEAm",firstHours:"{n} gi\u1EDD \u0111\u1EA7u {price}",extraHour:"th\xEAm {price}/gi\u1EDD",peak:"Ph\u1EE5 thu",note:"Kh\xE1ch s\u1EA1n x\xE1c nh\u1EADn c\xF2n ph\xF2ng trong 15 ph\xFAt qua tin nh\u1EAFn.",invalid:"Ng\xE0y tr\u1EA3 ph\xF2ng ph\u1EA3i sau ng\xE0y nh\u1EADn ph\xF2ng.",all:"M\u1ECDi \u0111\xEAm",from:"T\u1EEB {price}",unitDay:"{n} ng\xE0y",perDay:"{price}/ng\xE0y",pickup:"Ng\xE0y nh\u1EADn",dropoff:"Ng\xE0y tr\u1EA3",deposit:"C\u1ECDc",depositNote:"C\u1ECDc {price}, tr\u1EA3 l\u1EA1i khi ho\xE0n xe.",extras:"D\u1ECBch v\u1EE5 th\xEAm",perTrip:"{price}/l\u1EA7n",pickupTime:"Gi\u1EDD nh\u1EADn",dropoffTime:"Gi\u1EDD tr\u1EA3",longRate:"Gi\xE1 thu\xEA d\xE0i"},en:{room:"Room type",mode:"Stay type",night:"Overnight",hour:"By the hour",checkIn:"Check-in",checkOut:"Check-out",date:"Date",start:"Arrival time",hours:"Hours",hourN:"{n} h",guests:"Guests",rooms:"Rooms",total:"Estimated total",nights:"{n} nights",perNight:"{price}/night",firstHours:"first {n} h {price}",extraHour:"+{price}/extra hour",peak:"Surcharge",note:"We confirm availability within 15 minutes by message.",invalid:"Check-out must be after check-in.",all:"Every night",from:"From {price}",unitDay:"{n} days",perDay:"{price}/day",pickup:"Pick-up",dropoff:"Return",deposit:"Deposit",depositNote:"Deposit {price}, refunded on return.",extras:"Add-ons",perTrip:"{price} once",pickupTime:"Pick-up time",dropoffTime:"Return time",longRate:"Long-term rate"},ja:{room:"\u5BA2\u5BA4\u30BF\u30A4\u30D7",mode:"\u3054\u5229\u7528\u65B9\u6CD5",night:"\u5BBF\u6CCA",hour:"\u4F11\u61A9\uFF08\u6642\u9593\u5229\u7528\uFF09",checkIn:"\u30C1\u30A7\u30C3\u30AF\u30A4\u30F3",checkOut:"\u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8",date:"\u65E5\u4ED8",start:"\u5230\u7740\u6642\u9593",hours:"\u5229\u7528\u6642\u9593",hourN:"{n}\u6642\u9593",guests:"\u4EBA\u6570",rooms:"\u90E8\u5C4B\u6570",total:"\u6982\u7B97",nights:"{n}\u6CCA",perNight:"{price}/\u6CCA",firstHours:"\u6700\u521D\u306E{n}\u6642\u9593 {price}",extraHour:"\u5EF6\u9577 {price}/\u6642\u9593",peak:"\u7E41\u5FD9\u671F\u6599\u91D1",note:"\u7A7A\u5BA4\u72B6\u6CC1\u306F15\u5206\u4EE5\u5185\u306B\u30E1\u30C3\u30BB\u30FC\u30B8\u3067\u3054\u9023\u7D61\u3057\u307E\u3059\u3002",invalid:"\u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u306F\u30C1\u30A7\u30C3\u30AF\u30A4\u30F3\u3088\u308A\u5F8C\u306E\u65E5\u4ED8\u306B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",all:"\u6BCE\u65E5",from:"{price}\u301C",unitDay:"{n}\u65E5",perDay:"{price}/\u65E5",pickup:"\u8CB8\u51FA\u65E5",dropoff:"\u8FD4\u5374\u65E5",deposit:"\u4FDD\u8A3C\u91D1",depositNote:"\u4FDD\u8A3C\u91D1 {price}\uFF08\u8FD4\u5374\u6642\u306B\u8FD4\u91D1\uFF09",extras:"\u30AA\u30D7\u30B7\u30E7\u30F3",perTrip:"{price}/\u56DE",pickupTime:"\u8CB8\u51FA\u6642\u9593",dropoffTime:"\u8FD4\u5374\u6642\u9593",longRate:"\u9577\u671F\u6599\u91D1"},ko:{room:"\uAC1D\uC2E4 \uC720\uD615",mode:"\uC774\uC6A9 \uBC29\uBC95",night:"\uC219\uBC15",hour:"\uB300\uC2E4(\uC2DC\uAC04)",checkIn:"\uCCB4\uD06C\uC778",checkOut:"\uCCB4\uD06C\uC544\uC6C3",date:"\uB0A0\uC9DC",start:"\uB3C4\uCC29 \uC2DC\uAC04",hours:"\uC774\uC6A9 \uC2DC\uAC04",hourN:"{n}\uC2DC\uAC04",guests:"\uC778\uC6D0",rooms:"\uAC1D\uC2E4 \uC218",total:"\uC608\uC0C1 \uAE08\uC561",nights:"{n}\uBC15",perNight:"{price}/\uBC15",firstHours:"\uCC98\uC74C {n}\uC2DC\uAC04 {price}",extraHour:"\uCD94\uAC00 {price}/\uC2DC\uAC04",peak:"\uC131\uC218\uAE30 \uCD94\uAC00",note:"15\uBD84 \uC548\uC5D0 \uBA54\uC2DC\uC9C0\uB85C \uAC1D\uC2E4 \uC5EC\uBD80\uB97C \uC54C\uB824 \uB4DC\uB9BD\uB2C8\uB2E4.",invalid:"\uCCB4\uD06C\uC544\uC6C3\uC740 \uCCB4\uD06C\uC778 \uC774\uD6C4\uC5EC\uC57C \uD569\uB2C8\uB2E4.",all:"\uB9E4\uC77C",from:"{price}\uBD80\uD130",unitDay:"{n}\uC77C",perDay:"{price}/\uC77C",pickup:"\uB300\uC5EC\uC77C",dropoff:"\uBC18\uB0A9\uC77C",deposit:"\uBCF4\uC99D\uAE08",depositNote:"\uBCF4\uC99D\uAE08 {price}, \uBC18\uB0A9 \uC2DC \uD658\uBD88\uB429\uB2C8\uB2E4.",extras:"\uCD94\uAC00 \uC635\uC158",perTrip:"{price}/\uD68C",pickupTime:"\uB300\uC5EC \uC2DC\uAC04",dropoffTime:"\uBC18\uB0A9 \uC2DC\uAC04",longRate:"\uC7A5\uAE30 \uC694\uAE08"},zh:{room:"\u623F\u578B",mode:"\u5165\u4F4F\u65B9\u5F0F",night:"\u8FC7\u591C",hour:"\u949F\u70B9\u623F",checkIn:"\u5165\u4F4F\u65E5\u671F",checkOut:"\u9000\u623F\u65E5\u671F",date:"\u65E5\u671F",start:"\u5230\u5E97\u65F6\u95F4",hours:"\u65F6\u957F",hourN:"{n} \u5C0F\u65F6",guests:"\u4EBA\u6570",rooms:"\u623F\u95F4\u6570",total:"\u9884\u4F30\u8D39\u7528",nights:"{n} \u665A",perNight:"{price}/\u665A",firstHours:"\u524D {n} \u5C0F\u65F6 {price}",extraHour:"\u7EED\u65F6 {price}/\u5C0F\u65F6",peak:"\u65FA\u5B63\u52A0\u4EF7",note:"\u6211\u4EEC\u4F1A\u5728 15 \u5206\u949F\u5185\u901A\u8FC7\u6D88\u606F\u786E\u8BA4\u662F\u5426\u6709\u623F\u3002",invalid:"\u9000\u623F\u65E5\u671F\u5FC5\u987B\u665A\u4E8E\u5165\u4F4F\u65E5\u671F\u3002",all:"\u6BCF\u665A",from:"{price} \u8D77",unitDay:"{n} \u5929",perDay:"{price}/\u5929",pickup:"\u53D6\u8F66\u65E5\u671F",dropoff:"\u8FD8\u8F66\u65E5\u671F",deposit:"\u62BC\u91D1",depositNote:"\u62BC\u91D1 {price}\uFF0C\u8FD8\u8F66\u65F6\u9000\u8FD8\u3002",extras:"\u9644\u52A0\u670D\u52A1",perTrip:"{price}/\u6B21",pickupTime:"\u53D6\u8F66\u65F6\u95F4",dropoffTime:"\u8FD8\u8F66\u65F6\u95F4",longRate:"\u957F\u79DF\u4EF7"},th:{room:"\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E2B\u0E49\u0E2D\u0E07",mode:"\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E01\u0E32\u0E23\u0E1E\u0E31\u0E01",night:"\u0E04\u0E49\u0E32\u0E07\u0E04\u0E37\u0E19",hour:"\u0E23\u0E32\u0E22\u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",checkIn:"\u0E27\u0E31\u0E19\u0E40\u0E0A\u0E47\u0E01\u0E2D\u0E34\u0E19",checkOut:"\u0E27\u0E31\u0E19\u0E40\u0E0A\u0E47\u0E01\u0E40\u0E2D\u0E32\u0E15\u0E4C",date:"\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48",start:"\u0E40\u0E27\u0E25\u0E32\u0E40\u0E02\u0E49\u0E32\u0E1E\u0E31\u0E01",hours:"\u0E08\u0E33\u0E19\u0E27\u0E19\u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",hourN:"{n} \u0E0A\u0E21.",guests:"\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E40\u0E02\u0E49\u0E32\u0E1E\u0E31\u0E01",rooms:"\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2B\u0E49\u0E2D\u0E07",total:"\u0E23\u0E32\u0E04\u0E32\u0E42\u0E14\u0E22\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",nights:"{n} \u0E04\u0E37\u0E19",perNight:"{price}/\u0E04\u0E37\u0E19",firstHours:"{n} \u0E0A\u0E21.\u0E41\u0E23\u0E01 {price}",extraHour:"\u0E0A\u0E21.\u0E15\u0E48\u0E2D\u0E44\u0E1B {price}",peak:"\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E17\u0E28\u0E01\u0E32\u0E25",note:"\u0E40\u0E23\u0E32\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E2B\u0E49\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E20\u0E32\u0E22\u0E43\u0E19 15 \u0E19\u0E32\u0E17\u0E35\u0E17\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21",invalid:"\u0E27\u0E31\u0E19\u0E40\u0E0A\u0E47\u0E01\u0E40\u0E2D\u0E32\u0E15\u0E4C\u0E15\u0E49\u0E2D\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E27\u0E31\u0E19\u0E40\u0E0A\u0E47\u0E01\u0E2D\u0E34\u0E19",all:"\u0E17\u0E38\u0E01\u0E04\u0E37\u0E19",from:"\u0E40\u0E23\u0E34\u0E48\u0E21 {price}",unitDay:"{n} \u0E27\u0E31\u0E19",perDay:"{price}/\u0E27\u0E31\u0E19",pickup:"\u0E27\u0E31\u0E19\u0E23\u0E31\u0E1A",dropoff:"\u0E27\u0E31\u0E19\u0E04\u0E37\u0E19",deposit:"\u0E21\u0E31\u0E14\u0E08\u0E33",depositNote:"\u0E21\u0E31\u0E14\u0E08\u0E33 {price} \u0E04\u0E37\u0E19\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E04\u0E37\u0E19\u0E23\u0E16",extras:"\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21",perTrip:"{price}/\u0E04\u0E23\u0E31\u0E49\u0E07",pickupTime:"\u0E40\u0E27\u0E25\u0E32\u0E23\u0E31\u0E1A",dropoffTime:"\u0E40\u0E27\u0E25\u0E32\u0E04\u0E37\u0E19",longRate:"\u0E23\u0E32\u0E04\u0E32\u0E40\u0E0A\u0E48\u0E32\u0E22\u0E32\u0E27"},id:{room:"Tipe kamar",mode:"Jenis menginap",night:"Menginap",hour:"Per jam (transit)",checkIn:"Check-in",checkOut:"Check-out",date:"Tanggal",start:"Jam datang",hours:"Jumlah jam",hourN:"{n} jam",guests:"Jumlah tamu",rooms:"Jumlah kamar",total:"Perkiraan total",nights:"{n} malam",perNight:"{price}/malam",firstHours:"{n} jam pertama {price}",extraHour:"+{price}/jam tambahan",peak:"Biaya musim ramai",note:"Ketersediaan kamar dikonfirmasi lewat pesan dalam 15 menit.",invalid:"Check-out harus setelah check-in.",all:"Setiap malam",from:"Mulai {price}",unitDay:"{n} hari",perDay:"{price}/hari",pickup:"Tanggal ambil",dropoff:"Tanggal kembali",deposit:"Deposit",depositNote:"Deposit {price}, dikembalikan saat pengembalian.",extras:"Layanan tambahan",perTrip:"{price}/sekali",pickupTime:"Jam ambil",dropoffTime:"Jam kembali",longRate:"Harga sewa panjang"},es:{room:"Tipo de habitaci\xF3n",mode:"Tipo de estancia",night:"Por noches",hour:"Por horas",checkIn:"Entrada",checkOut:"Salida",date:"Fecha",start:"Hora de llegada",hours:"Horas",hourN:"{n} h",guests:"Hu\xE9spedes",rooms:"Habitaciones",total:"Total estimado",nights:"{n} noches",perNight:"{price}/noche",firstHours:"primeras {n} h {price}",extraHour:"+{price}/hora extra",peak:"Suplemento",note:"Confirmamos la disponibilidad en 15 minutos por mensaje.",invalid:"La salida debe ser posterior a la entrada.",all:"Todas las noches",from:"Desde {price}",unitDay:"{n} d\xEDas",perDay:"{price}/d\xEDa",pickup:"Recogida",dropoff:"Devoluci\xF3n",deposit:"Fianza",depositNote:"Fianza de {price}, se devuelve al entregar.",extras:"Extras",perTrip:"{price} por alquiler",pickupTime:"Hora de recogida",dropoffTime:"Hora de devoluci\xF3n",longRate:"Tarifa larga"},fr:{room:"Type de chambre",mode:"Type de s\xE9jour",night:"Nuit\xE9e",hour:"En journ\xE9e (\xE0 l\u2019heure)",checkIn:"Arriv\xE9e",checkOut:"D\xE9part",date:"Date",start:"Heure d\u2019arriv\xE9e",hours:"Heures",hourN:"{n} h",guests:"Personnes",rooms:"Chambres",total:"Total estim\xE9",nights:"{n} nuits",perNight:"{price}/nuit",firstHours:"{n} premi\xE8res h {price}",extraHour:"+{price}/heure en plus",peak:"Suppl\xE9ment",note:"Nous confirmons la disponibilit\xE9 sous 15 minutes par message.",invalid:"Le d\xE9part doit \xEAtre apr\xE8s l\u2019arriv\xE9e.",all:"Toutes les nuits",from:"D\xE8s {price}",unitDay:"{n} jours",perDay:"{price}/jour",pickup:"Retrait",dropoff:"Retour",deposit:"Caution",depositNote:"Caution de {price}, rendue au retour.",extras:"Options",perTrip:"{price} par location",pickupTime:"Heure de retrait",dropoffTime:"Heure de retour",longRate:"Tarif longue dur\xE9e"},de:{room:"Zimmertyp",mode:"Aufenthalt",night:"\xDCbernachtung",hour:"Tageszimmer (stundenweise)",checkIn:"Anreise",checkOut:"Abreise",date:"Datum",start:"Ankunftszeit",hours:"Stunden",hourN:"{n} Std.",guests:"G\xE4ste",rooms:"Zimmer",total:"Gesch\xE4tzter Preis",nights:"{n} N\xE4chte",perNight:"{price}/Nacht",firstHours:"erste {n} Std. {price}",extraHour:"+{price}/weitere Std.",peak:"Saisonaufschlag",note:"Wir best\xE4tigen die Verf\xFCgbarkeit innerhalb von 15 Minuten per Nachricht.",invalid:"Die Abreise muss nach der Anreise liegen.",all:"Jede Nacht",from:"Ab {price}",unitDay:"{n} Tage",perDay:"{price}/Tag",pickup:"Abholung",dropoff:"R\xFCckgabe",deposit:"Kaution",depositNote:"Kaution {price}, wird bei R\xFCckgabe erstattet.",extras:"Extras",perTrip:"{price} pro Miete",pickupTime:"Abholzeit",dropoffTime:"R\xFCckgabezeit",longRate:"Langzeitpreis"},pt:{room:"Tipo de quarto",mode:"Tipo de estadia",night:"Pernoite",hour:"Por hora",checkIn:"Check-in",checkOut:"Check-out",date:"Data",start:"Hor\xE1rio de chegada",hours:"Horas",hourN:"{n} h",guests:"H\xF3spedes",rooms:"Quartos",total:"Total estimado",nights:"{n} noites",perNight:"{price}/noite",firstHours:"primeiras {n} h {price}",extraHour:"+{price}/hora extra",peak:"Adicional de temporada",note:"Confirmamos a disponibilidade em 15 minutos por mensagem.",invalid:"O check-out deve ser depois do check-in.",all:"Todas as noites",from:"A partir de {price}",unitDay:"{n} dias",perDay:"{price}/dia",pickup:"Retirada",dropoff:"Devolu\xE7\xE3o",deposit:"Cau\xE7\xE3o",depositNote:"Cau\xE7\xE3o de {price}, devolvida na entrega.",extras:"Adicionais",perTrip:"{price} por aluguel",pickupTime:"Hor\xE1rio de retirada",dropoffTime:"Hor\xE1rio de devolu\xE7\xE3o",longRate:"Tarifa longa"},ru:{room:"\u0422\u0438\u043F \u043D\u043E\u043C\u0435\u0440\u0430",mode:"\u0424\u043E\u0440\u043C\u0430\u0442",night:"\u0421 \u043D\u043E\u0447\u0451\u0432\u043A\u043E\u0439",hour:"\u041F\u043E\u0447\u0430\u0441\u043E\u0432\u043E",checkIn:"\u0417\u0430\u0435\u0437\u0434",checkOut:"\u0412\u044B\u0435\u0437\u0434",date:"\u0414\u0430\u0442\u0430",start:"\u0412\u0440\u0435\u043C\u044F \u043F\u0440\u0438\u0435\u0437\u0434\u0430",hours:"\u0427\u0430\u0441\u043E\u0432",hourN:"{n} \u0447",guests:"\u0413\u043E\u0441\u0442\u0435\u0439",rooms:"\u041D\u043E\u043C\u0435\u0440\u043E\u0432",total:"\u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E",nights:"{n} \u043D\u043E\u0447.",perNight:"{price}/\u043D\u043E\u0447\u044C",firstHours:"\u043F\u0435\u0440\u0432\u044B\u0435 {n} \u0447 {price}",extraHour:"+{price}/\u0434\u043E\u043F. \u0447\u0430\u0441",peak:"\u041D\u0430\u0434\u0431\u0430\u0432\u043A\u0430",note:"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u043C \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u043D\u043E\u043C\u0435\u0440\u0430 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 15 \u043C\u0438\u043D\u0443\u0442 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438.",invalid:"\u0414\u0430\u0442\u0430 \u0432\u044B\u0435\u0437\u0434\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043F\u043E\u0437\u0436\u0435 \u0434\u0430\u0442\u044B \u0437\u0430\u0435\u0437\u0434\u0430.",all:"\u041A\u0430\u0436\u0434\u0443\u044E \u043D\u043E\u0447\u044C",from:"\u041E\u0442 {price}",unitDay:"{n} \u0434\u043D.",perDay:"{price}/\u0441\u0443\u0442\u043A\u0438",pickup:"\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435",dropoff:"\u0412\u043E\u0437\u0432\u0440\u0430\u0442",deposit:"\u0417\u0430\u043B\u043E\u0433",depositNote:"\u0417\u0430\u043B\u043E\u0433 {price}, \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u0441\u0434\u0430\u0447\u0435.",extras:"\u0414\u043E\u043F. \u0443\u0441\u043B\u0443\u0433\u0438",perTrip:"{price} \u0440\u0430\u0437\u043E\u0432\u043E",pickupTime:"\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F",dropoffTime:"\u0412\u0440\u0435\u043C\u044F \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430",longRate:"\u0414\u043E\u043B\u0433\u043E\u0441\u0440\u043E\u0447\u043D\u044B\u0439 \u0442\u0430\u0440\u0438\u0444"}},j=(e,n={})=>{var a,r;return{...(a=re[e])!=null?a:re.en,...(r=n.stays)!=null?r:{}}};function q(e,n){var a;return((a=e.products)!=null?a:[]).map(r=>{var l,c,d,h;let s=((l=r.variants)!=null?l:[]).map(u=>({...u,price:S(u,n)})).filter(u=>u.price!=null),i=r.hourly&&S(r.hourly,n)!=null?{hours:(d=(c=r.hourly.firstHours)!=null?c:r.hourly.hours)!=null?d:2,price:S(r.hourly,n),extra:r.hourly.extra&&(h=S(r.hourly.extra,n))!=null?h:0}:null,o=r.deposit?S(r.deposit,n):null;return{...r,rates:s,hourlyRate:i,depositPrice:o}}).filter(r=>r.rates.length)}var C=e=>{let n=/^(\d{1,2}):(\d{2})$/.exec(String(e!=null?e:""));return n?+n[1]*60+ +n[2]:0};function ie(e,n){var a,r;return((r=(a=e.stays)==null?void 0:a.extras)!=null?r:[]).map(s=>({...s,price:S(s,n)})).filter(s=>s.price!=null&&s.name)}function se({site:e,catalog:n,market:a,lang:r,t:s,L:i}){var c,d,h,u,v,m,f,$,M;let o=(c=e.stays)!=null?c:{},l=new Intl.NumberFormat(z(r),{style:"currency",currency:a.currency});return{rooms:q(n,a).map(g=>{var w,k;return{id:g.id,name:i(g.name),guests:(k=(w=g.facts)==null?void 0:w.guests)!=null?k:2,rates:g.rates.map(x=>{var b;return{label:i(x.label),days:((b=x.days)!=null?b:[]).map(Number),price:x.price,min:+x.minDays||0}}),hourly:g.hourlyRate,deposit:g.depositPrice}}),peaks:((d=o.peaks)!=null?d:[]).filter(g=>(g==null?void 0:g.start)&&(g==null?void 0:g.end)).map(g=>({label:i(g.label),start:g.start,end:g.end,percent:+g.percent||0})),unit:(h=o.unit)!=null?h:"night",hourly:!!o.hourly,from:C((u=o.hourlyFrom)!=null?u:"08:00"),to:C((v=o.hourlyTo)!=null?v:"22:00")||1440,maxHours:(m=o.maxHours)!=null?m:6,extras:ie(e,a).map(g=>({id:g.id,name:i(g.name),price:g.price,per:g.per==="trip"?"trip":"day"})),maxNights:(f=o.maxNights)!=null?f:30,tz:($=e.timezone)!=null?$:"Asia/Ho_Chi_Minh",money:{locale:z(r),currency:a.currency,max:(M=l.resolvedOptions().maximumFractionDigits)!=null?M:0},text:j(r,s)}}var oe=e=>`${String(Math.floor(e/60)%24).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`;function le(e,{site:n,lang:a,t:r,L:s,money:i}){let o=j(a,r),l=d=>{var h;return(((h=n==null?void 0:n.stays)==null?void 0:h.unit)==="day"?o.perDay:o.perNight).replace("{price}",i(d))},c=e.rates.map(d=>({label:s(d.label),value:l(d.price)}));return e.depositPrice&&c.push({label:o.deposit,value:i(e.depositPrice)}),e.hourlyRate&&c.push({label:o.hour,value:`${o.firstHours.replace("{n}",e.hourlyRate.hours).replace("{price}",i(e.hourlyRate.price))}${e.hourlyRate.extra?`, ${o.extraHour.replace("{price}",i(e.hourlyRate.extra))}`:""}`}),c}function ce({site:e,catalog:n,market:a,lang:r,t:s,L:i}){var b,R,T,B,V;let o=j(r,s),l=(b=e.stays)!=null?b:{},c=q(n,a),d=l.hourly&&c.some(p=>p.hourlyRate),h=C((R=l.hourlyFrom)!=null?R:"08:00"),u=C((T=l.hourlyTo)!=null?T:"22:00")||1440,v=[];for(let p=h;p<u;p+=30)v.push(oe(p));let m=[];for(let p=1;p<=((B=l.maxHours)!=null?B:6);p++)m.push(p);let f=l.unit==="day",$=ie(e,a),M=p=>H(p,a),g=l.pickupFrom&&C(l.pickupFrom),w=C((V=l.pickupTo)!=null?V:"20:00")||1440,k=[];if(g!=null&&g!=="")for(let p=g;p<=w;p+=30)k.push(oe(p));let x=(p,ue)=>`<select name="${p}" data-stay-${p}>${k.map(I=>`<option${I===ue?" selected":""}>${I}</option>`).join("")}</select>`;return`<div class="stay-fields">
  <label class="field"><span>${t(o.room)}</span><select name="room" data-stay-room>${c.map(p=>`<option value="${t(p.id)}">${t(i(p.name))}</option>`).join("")}</select></label>
  ${d?`<div class="stay-mode" role="radiogroup" aria-label="${t(o.mode)}"><label class="seg"><input type="radio" name="mode" value="night" checked data-stay-mode> <span>${t(o.night)}</span></label><label class="seg"><input type="radio" name="mode" value="hour" data-stay-mode> <span>${t(o.hour)}</span></label></div>`:""}
  <div class="row2" data-stay-nights>
    <label class="field"><span>${t(f?o.pickup:o.checkIn)}</span><input type="date" name="in" data-stay-in></label>
    <label class="field"><span>${t(f?o.dropoff:o.checkOut)}</span><input type="date" name="out" data-stay-out></label>
  </div>
  ${k.length?`<div class="row2" data-stay-times>
    <label class="field"><span>${t(o.pickupTime)}</span>${x("ptime",k.includes("08:00")?"08:00":k[0])}</label>
    <label class="field"><span>${t(o.dropoffTime)}</span>${x("dtime",k.includes("18:00")?"18:00":k[k.length-1])}</label>
  </div>`:""}
  ${d?`<div class="row3" data-stay-hours hidden>
    <label class="field"><span>${t(o.date)}</span><input type="date" name="hday" data-stay-hday></label>
    <label class="field"><span>${t(o.start)}</span><select name="hstart" data-stay-hstart>${v.map(p=>`<option${p==="14:00"?" selected":""}>${p}</option>`).join("")}</select></label>
    <label class="field"><span>${t(o.hours)}</span><select name="hcount" data-stay-hcount>${m.map(p=>`<option value="${p}"${p===2?" selected":""}>${t(o.hourN.replace("{n}",p))}</option>`).join("")}</select></label>
  </div>`:""}
  <div class="row2">
    ${l.guests===!1?"":`<label class="field"><span>${t(o.guests)}</span><select name="guests" data-stay-guests>${[1,2,3,4,5,6].map(p=>`<option${p===2?" selected":""}>${p}</option>`).join("")}</select></label>`}
    <label class="field"><span>${t(o.rooms)}</span><select name="roomcount" data-stay-count>${[1,2,3,4,5].map(p=>`<option>${p}</option>`).join("")}</select></label>
  </div>
  ${$.length?`<fieldset class="stay-extras"><legend>${t(o.extras)}</legend>${$.map(p=>`<label class="check"><input type="checkbox" data-stay-extra value="${t(p.id)}"> <span>${t(i(p.name))} <small>+${t((p.per==="trip"?o.perTrip:o.perDay).replace("{price}",M(p.price)))}</small></span></label>`).join("")}</fieldset>`:""}
  <div class="stay-total" aria-live="polite"><p class="stay-sum"><span>${t(o.total)}</span> <b data-stay-sum>\u2014</b></p><p class="stay-break" data-stay-break></p><p class="stay-warn" data-stay-warn hidden>${t(o.invalid)}</p><p class="stay-dep" data-stay-dep hidden></p><p class="stay-note">${t(N(l.note,r,"en")||o.note)}</p></div>
  <input type="hidden" name="product"><input type="hidden" name="date"><input type="hidden" name="price"><input type="hidden" name="size">
</div>`}var pe=`(function(){
Array.prototype.forEach.call(document.querySelectorAll('form[data-stays]'),function(f){
var D=JSON.parse(f.getAttribute('data-stays')),X=D.text,q=function(s){return f.querySelector(s)};
var money=function(n){try{return new Intl.NumberFormat(D.money.locale,{style:'currency',currency:D.money.currency,maximumFractionDigits:D.money.max||0}).format(n)}catch(e){return String(n)}};
var o={};new Intl.DateTimeFormat('en-US',{timeZone:D.tz,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).forEach(function(p){o[p.type]=p.value});
var today=o.year+'-'+o.month+'-'+o.day;
var U=function(s){var p=s.split('-');return Date.UTC(+p[0],+p[1]-1,+p[2])};
var iso=function(t){var d=new Date(t);return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0')};
var fin=q('[data-stay-in]'),fout=q('[data-stay-out]'),hday=q('[data-stay-hday]');
var DAY=D.unit==='day',gap=DAY?0:864e5;
fin.min=today;fin.value=fin.value||today;fout.min=iso(U(today)+gap);fout.value=fout.value||iso(U(fin.value)+864e5);if(hday){hday.min=today;hday.value=hday.value||today}
var df=new Intl.DateTimeFormat(D.money.locale,{weekday:'short',day:'numeric',month:'numeric',timeZone:'UTC'});
var nf=new Intl.NumberFormat(D.money.locale);
function calc(){
var r=D.rooms.filter(function(x){return x.id===q('[data-stay-room]').value})[0]||D.rooms[0];if(!r)return;
var m=f.querySelector('[data-stay-mode]:checked'),hourly=m&&m.value==='hour'&&r.hourly;
var modeBox=q('.stay-mode');if(modeBox){var hr=modeBox.querySelector('[value=hour]');hr.disabled=!r.hourly;if(!r.hourly&&m&&m.value==='hour'){modeBox.querySelector('[value=night]').checked=true;hourly=false}}
q('[data-stay-nights]').hidden=!!hourly;var hb=q('[data-stay-hours]');if(hb)hb.hidden=!hourly;
var gq=q('[data-stay-guests]'),rooms=+q('[data-stay-count]').value,g=gq?gq.value:'',sum=0,brk=[],date='',size='',bad=false;
if(hourly){var h=+q('[data-stay-hcount]').value,st=q('[data-stay-hstart]').value;
sum=r.hourly.price+Math.max(0,h-r.hourly.hours)*r.hourly.extra;
brk.push(X.firstHours.replace('{n}',r.hourly.hours).replace('{price}',money(r.hourly.price))+(h>r.hourly.hours?' + '+(h-r.hourly.hours)+' \xD7 '+money(r.hourly.extra):''));
date=df.format(U(hday.value))+' \xB7 '+st+' \xB7 '+X.hourN.replace('{n}',h);size=X.hour+' \xB7 '+X.hourN.replace('{n}',h);
}else{
if(U(fout.value)<U(fin.value)+gap){fout.value=iso(U(fin.value)+864e5)}
var a=U(fin.value),b=U(fout.value),n=Math.round((b-a)/864e5);bad=!DAY&&n<1;n=Math.min(Math.max(n,1),D.maxNights);
var by={},order=[],pk=0,base=r.rates.filter(function(x){return !x.min}),lr=r.rates.filter(function(x){return x.min&&n>=x.min}).sort(function(x,y){return y.min-x.min})[0];if(!base.length)base=r.rates;
for(var i=0;i<n;i++){var t=a+i*864e5,wd=new Date(t).getUTCDay(),ds=iso(t);
var rt=lr||base.filter(function(x){return x.days.length&&x.days.indexOf(wd)>=0})[0]||base.filter(function(x){return !x.days.length})[0]||base[0];
var p=rt.price;D.peaks.forEach(function(z){if(ds>=z.start&&ds<=z.end){var add=Math.round(rt.price*z.percent/100);p+=add;pk+=add}});
sum+=p;if(!by[rt.label]){by[rt.label]={n:0,p:rt.price};order.push(rt.label)}by[rt.label].n++}
var unit=DAY?X.unitDay:X.nights,pt=q('[data-stay-ptime]'),dt=q('[data-stay-dtime]');
brk=order.map(function(k){return k+': '+unit.replace('{n}',by[k].n)+' \xD7 '+money(by[k].p)});if(pk)brk.push(X.peak+' +'+money(pk));
date=df.format(a)+(pt?' '+pt.value:'')+' \u2192 '+df.format(b)+(dt?' '+dt.value:'')+' \xB7 '+unit.replace('{n}',n);size=unit.replace('{n}',n);
}
var ex=[],exs=0;Array.prototype.forEach.call(f.querySelectorAll('[data-stay-extra]:checked'),function(c){var e=D.extras.filter(function(z){return z.id===c.value})[0];if(!e)return;var v=e.per==='trip'?e.price:e.price*(hourly?1:n);exs+=v;ex.push(e.name)});
sum*=rooms;if(rooms>1)brk.push('\xD7 '+rooms);if(exs){sum+=exs*rooms;brk.push(X.extras+' +'+money(exs*rooms))}
var dep=q('[data-stay-dep]');if(dep){dep.hidden=!r.deposit;if(r.deposit)dep.textContent=X.depositNote.replace('{price}',money(r.deposit*rooms))}
if(ex.length)size+=' \xB7 '+ex.join(', ');
q('[data-stay-sum]').textContent=money(sum);q('[data-stay-break]').textContent=brk.join(' \xB7 ');q('[data-stay-warn]').hidden=!bad;
f.querySelector('[name=product]').value=r.name;f.querySelector('[name=date]').value=date;f.querySelector('[name=price]').value=money(sum);
f.querySelector('[name=size]').value=[size,g?X.guests+': '+g:'',rooms>1?X.rooms+': '+rooms:''].filter(Boolean).join(' \xB7 ');
}
f.addEventListener('change',function(e){if(e.target===fin){fout.min=iso(U(fin.value)+gap)}calc()});f.addEventListener('input',calc);calc();
f.kpStayCalc=calc;
});
})();`;var De="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",de=7;function tt({site:e,catalog:n,i18n:a,template:r,basePath:s="/",siteUrl:i=e.domain}){let o=G(s),l=v=>new URL(o(v),i).href,c=n.markets,d=W(e.bookingForm),h=d&&!d.error?d:null,u=c.map(v=>{var k,x,b,R;let m=v.lang,f=(x=(k=a[m])!=null?k:a.en)!=null?x:a.vi,$=T=>N(T,m,"en"),M=(R=(b=e.bookingChannels)==null?void 0:b[v.id])!=null?R:["phone"],w={site:e,catalog:n,market:v,markets:c,lang:m,t:f,L:$,url:o,abs:l,channels:M,money:T=>H(T,v),template:r,gform:h};return{path:`${v.id}/index.html`,html:Se(w)}});return u.push({path:"index.html",html:ne({site:e,markets:c,url:o,abs:l})}),u}var O=(e,n)=>e.heroImage?P(n,e.heroImage):n("assets/photos/hero.webp"),he=(e,n)=>{var a,r,s;return(Array.isArray(e)?e:(s=(r=(a=e==null?void 0:e[n])!=null?a:e==null?void 0:e.en)!=null?r:e==null?void 0:e.vi)!=null?s:[]).map(i=>typeof i=="string"?i:N(i,n,"en")).filter(Boolean)},L=e=>{let n=e.rates.filter(a=>!a.minDays);return Math.min(...(n.length?n:e.rates).map(a=>a.price))};function Se(e){var $,M,g,w,k,x;let{site:n,market:a,markets:r,lang:s,t:i,L:o,url:l,abs:c}=e,d=`${n.name} \xB7 ${o(n.tagline)}`,h=($=n.theme)!=null?$:{},u=["primary","ink","bg","surface","soft","accent"].filter(b=>h[b]).map(b=>`--${b}:${h[b]}`).join(";"),v=(M=r.find(b=>b.default))!=null?M:r[0],m=r.map(b=>({id:b.id,lang:b.lang,country:b.country,currency:b.currency,href:l(`${b.id}/`)})),f=(g=n.contact)!=null?g:{};return`<!doctype html>
<html lang="${t(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t(d)}</title>
<meta name="description" content="${t(o(n.intro))}">
<link rel="canonical" href="${c(`${a.id}/`)}">
${r.map(b=>`<link rel="alternate" hreflang="${t(b.lang)}-${t(b.country)}" href="${c(`${b.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${v.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${t(d)}">
<meta property="og:description" content="${t(o(n.intro))}">
<meta property="og:url" content="${c(`${a.id}/`)}">
<meta property="og:site_name" content="${t(n.name)}">
<meta property="og:image" content="${t(new URL(O(n,l),c("")).href)}">
<meta name="theme-color" content="${t((w=h.ink)!=null?w:"#14181D")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${De}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${u}}</style>
<noscript><style>.album .more{display:block}.album-more{display:none}</style></noscript>
${U(Oe(e))}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${t(a.id)}" data-markets='${t(JSON.stringify(m))}' data-wa="${t(D(f.whatsapp))}" data-email="${t((k=f.email)!=null?k:"")}" data-copied="${t(i.booking.copied)}">
<a class="skip" href="#main">${t(i.skip)}</a>
${X(i)}
${Te(e)}
<main id="main">
${Ne(e)}
${ze(e)}
${Pe(e)}
${Ce(e)}
${je(e)}
${qe(e)}
${Re(e)}
${He(e)}
${Ae(e)}
${Ee(e)}
</main>
${Fe(e)}
<nav class="dock" aria-label="${t(i.nav.book)}">
  <a href="${t(E(e.channels[0],f))}" ${K(e.channels[0])}>${y(e.channels[0],20)}<span>${t((x=i.via[e.channels[0]])!=null?x:"")}</span></a>
  <a class="primary" href="#booking">${y("key",20)}<span>${t(i.nav.book)}</span></a>
</nav>
<script>${pe}<\/script>
</body>
</html>
`}function Te({site:e,market:n,markets:a,t:r,url:s}){let i=[["#fleet",r.nav.fleet],["#how",r.nav.how],["#terms",r.nav.terms],["#visit",r.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${n.id}/`)}">
      ${e.logo?`<img src="${t(P(s,e.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${y("key",20)}</span>`}
      <span>${t(e.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([o,l])=>`<a href="${o}">${t(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${a.length>1?`<details class="market">
        <summary aria-label="${t(r.market.label)}">${y("globe",18)}<span>${t(n.id.toUpperCase())}<span class="cur"> \xB7 ${t(J(n))}</span></span></summary>
        <ul>${a.map(o=>`<li><a href="${s(`${o.id}/`)}" hreflang="${t(o.lang)}"${o.id===n.id?' aria-current="true"':""}>${t(o.country)} \xB7 ${t(o.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-md" href="#booking">${t(r.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${t(r.nav.openMenu)}">${y("menu",22)}</summary>
        <nav aria-label="Menu">${[...i,["#booking",r.nav.book]].map(([o,l])=>`<a href="${o}">${t(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Ne(e){var m;let{site:n,t:a,L:r,url:s,catalog:i,market:o,money:l,lang:c}=e,d=q(i,o),h=Math.min(...d.map(L)),u=j(c,a),v=((m=i.categories)!=null?m:[]).filter(f=>d.some($=>$.category===f.id));return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${r(n.place)?`<p class="eyebrow">${y("pin",16)} ${t(r(n.place))}</p>`:""}
      <h1>${t(r(n.tagline))}</h1>
      ${r(n.intro)?`<p class="lead">${t(r(n.intro))}</p>`:""}
      <form class="quick" data-quick aria-label="${t(a.hero.quick)}">
        <label class="field"><span>${t(u.pickup)}</span><input type="date" name="qin"></label>
        <label class="field"><span>${t(u.dropoff)}</span><input type="date" name="qout"></label>
        ${v.length>1?`<label class="field"><span>${t(a.hero.type)}</span><select name="qcat"><option value="">${t(a.hero.any)}</option>${v.map(f=>`<option value="${t(f.id)}">${t(r(f.name))}</option>`).join("")}</select></label>`:""}
        <button class="btn btn--primary" type="submit">${y("search",18)} ${t(a.hero.go)}</button>
      </form>
      ${Number.isFinite(h)?`<p class="from">${t(u.from.replace("{price}",u.perDay.replace("{price}",l(h))))}</p>`:""}
    </div>
    <div class="hero-media">
      <img src="${t(O(n,s))}" alt="" width="1200" height="900" fetchpriority="high">
      ${r(n.badgeText)?`<p class="hero-badge">${y("truck",20)} ${t(r(n.badgeText))}</p>`:""}
    </div>
  </div>
</section>`}function ze({site:e,t:n,L:a}){var s;let r=((s=e.promises)!=null?s:[]).filter(i=>a(i==null?void 0:i.title));return r.length?`<section class="promises" aria-label="${t(n.promises)}">
  <ul class="wrap prom">${r.map(i=>`<li><span class="pi">${y(i.icon||"check",22)}</span><div><strong>${t(a(i.title))}</strong>${a(i.text)?`<span>${t(a(i.text))}</span>`:""}</div></li>`).join("")}</ul>
</section>`:""}function Pe(e){var v;let{t:n,L:a,url:r,catalog:s,market:i,money:o,lang:l}=e,c=q(s,i);if(!c.length)return"";let d=j(l,n),h=((v=s.categories)!=null?v:[]).filter(m=>c.some(f=>f.category===m.id)),u=m=>{var f;return a((f=h.find($=>$.id===m))==null?void 0:f.name)};return`<section class="section" id="fleet" aria-labelledby="fleet-title">
  <div class="wrap">
    <div class="head-row">
      <div class="head"><p class="kicker">${t(n.fleet.kicker)}</p><h2 id="fleet-title" class="h2">${t(n.fleet.title)}</h2></div>
      ${h.length>1?`<div class="chips" role="group" aria-label="${t(n.hero.type)}"><button type="button" class="chip" aria-pressed="true" data-filter="">${t(n.fleet.all)}</button>${h.map(m=>`<button type="button" class="chip" aria-pressed="false" data-filter="${t(m.id)}">${t(a(m.name))}</button>`).join("")}</div>`:""}
    </div>
    <div class="cars">${c.map(m=>{var g,w;let f=(g=m.facts)!=null?g:{},$=[f.seats?["users",n.fleet.seats.replace("{n}",f.seats)]:null,a(f.gear)?["gear",a(f.gear)]:null,a(f.fuel)?[/điện|electric|ev\b/i.test(a(f.fuel))?"bolt":"fuel",a(f.fuel)]:null,f.km?["gauge",n.fleet.km.replace("{n}",f.km)]:null].filter(Boolean),M=le(m,e);return`<article class="car" data-cat="${t((w=m.category)!=null?w:"")}">
      <div class="car-img">
        ${m.image?`<img sizes="${F.wide}" src="${t(P(r,m.image))}" alt="${t(a(m.name))}" width="900" height="600" loading="lazy">`:""}
        ${u(m.category)?`<span class="tag">${t(u(m.category))}</span>`:""}
        ${f.year?`<span class="tag tag--year">${t(n.fleet.year.replace("{n}",f.year))}</span>`:""}
      </div>
      <div class="car-body">
        <h3>${t(a(m.name))}</h3>
        ${$.length?`<ul class="specs">${$.map(([k,x])=>`<li>${y(k,16)} ${t(x)}</li>`).join("")}</ul>`:""}
        ${a(m.description)?`<p class="muted">${t(a(m.description))}</p>`:""}
        <p class="car-price"><b>${t(o(L(m)))}</b><span>${t(n.fleet.perDay)}</span></p>
        <dl class="rates">${M.map(k=>`<div><dt>${t(k.label)}</dt><dd>${t(k.value)}</dd></div>`).join("")}</dl>
        <a class="btn btn--line" href="#booking" data-room="${t(m.id)}">${y("key",18)} ${t(n.fleet.book)}</a>
      </div>
    </article>`}).join("")}</div>
  </div>
</section>`}function Ce({site:e,t:n,L:a,lang:r}){var l,c,d,h;let s=((l=e.steps)!=null?l:[]).filter(u=>a(u==null?void 0:u.title)),i=he((c=e.papers)==null?void 0:c.need,r),o=he((d=e.papers)==null?void 0:d.deposit,r);return!s.length&&!i.length&&!o.length?"":`<section class="section section--ink" id="how" aria-labelledby="how-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${t(n.how.kicker)}</p><h2 id="how-title" class="h2">${t(n.how.title)}</h2></div>
    ${s.length?`<ol class="steps">${s.map((u,v)=>`<li><span class="n">${String(v+1).padStart(2,"0")}</span><h3>${t(a(u.title))}</h3>${a(u.text)?`<p>${t(a(u.text))}</p>`:""}</li>`).join("")}</ol>`:""}
    ${i.length||o.length?`<div class="papers">
      ${i.length?`<div><h3>${y("doc",20)} ${t(n.how.need)}</h3><ul>${i.map(u=>`<li>${y("check",16)} ${t(u)}</li>`).join("")}</ul></div>`:""}
      ${o.length?`<div><h3>${y("shield",20)} ${t(n.how.deposit)}</h3><ul>${o.map(u=>`<li>${y("check",16)} ${t(u)}</li>`).join("")}</ul></div>`:""}
    </div>
    <p class="fine">${t(a((h=e.papers)==null?void 0:h.note)||n.how.note)}</p>`:""}
  </div>
</section>`}function je({site:e,t:n,L:a}){var i,o;let r=((i=e.terms)!=null?i:[]).filter(l=>a(l==null?void 0:l.title)),s=((o=e.delivery)!=null?o:[]).filter(l=>a(l==null?void 0:l.name));return!r.length&&!s.length?"":`<section class="section" id="terms" aria-labelledby="terms-title">
  <div class="wrap">
    <div class="head"><p class="kicker">${t(n.terms.kicker)}</p><h2 id="terms-title" class="h2">${t(n.terms.title)}</h2></div>
    <div class="terms-grid">
      ${r.length?`<ul class="terms">${r.map(l=>`<li><span class="ti">${y(l.icon||"check",22)}</span><div><h3>${t(a(l.title))}</h3>${a(l.text)?`<p>${t(a(l.text))}</p>`:""}</div></li>`).join("")}</ul>`:""}
      ${s.length?`<div class="delivery"><h3>${y("truck",20)} ${t(n.terms.delivery)}</h3><ul>${s.map(l=>`<li><span>${t(a(l.name))}</span><b>${t(a(l.price))}</b></li>`).join("")}</ul></div>`:""}
    </div>
  </div>
</section>`}function qe(e){var d;let{site:n,t:a,channels:r,gform:s}=e,i=a.booking,o=(d=n.contact)!=null?d:{},l=s?` data-gform="${t(s.action)}" data-gmap='${t(JSON.stringify(s.fields))}'`:"",c=r.map((h,u)=>{var v;return`<button type="button" class="btn ${u===0?"btn--primary":"btn--line"}" data-channel="${t(h)}" data-href="${t(E(h,o,""))}">${y(h,18)} ${t((v=a.via[h])!=null?v:h)}</button>`}).join("");return`<section class="section section--soft" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="book-copy">
      <p class="kicker">${t(i.kicker)}</p>
      <h2 id="book-title" class="h2">${t(i.heading)}</h2>
      <p class="lead">${t(i.text)}</p>
      <ul class="book-list">${i.points.map(h=>`<li>${y("check",18)} ${t(h)}</li>`).join("")}</ul>
    </div>
    <form class="card form" data-book data-stays='${t(JSON.stringify(se(e)))}' novalidate${l} data-order-text="${t(i.message)}">
      <div class="book-fields">
        <h3 class="form-h">${t(i.title)}</h3>
        ${ce(e)}
        <div class="row2">
          <label class="field"><span>${t(i.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${t(i.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${t(i.note)}</span><input name="note" maxlength="200" placeholder="${t(i.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${t(i.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${t(i.sending)}">${y("key",18)} ${t(i.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${y(s?"check":"arrow",22)} ${t(s?i.done:i.stepTitle)}</p>
        <p>${t(s?i.doneText:i.stepText)}</p>
        ${s?"":`<div class="buy">${c}</div><button type="button" class="link" data-edit>${t(i.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function Re({site:e,t:n,url:a}){var s;let r=((s=e.album)!=null?s:[]).filter(i=>i==null?void 0:i.image);return r.length?`<section class="section" aria-labelledby="al-title">
  <div class="wrap">
    <h2 id="al-title" class="h2">${t(n.album.title)}</h2>
    <div class="album">${r.map((i,o)=>`<a class="ph${o>=de?" more":""}${o%8===0?" wide":""}" href="${t(P(a,i.image))}" target="_blank" rel="noopener"><img sizes="${F.card}" src="${t(P(a,i.image))}" alt="${t(`${e.name} ${o+1}`)}" width="800" height="600" loading="lazy"></a>`).join("")}</div>
    ${r.length>de?`<p class="center"><button type="button" class="btn btn--line album-more" data-album-more>${t(n.album.more)}</button></p>`:""}
  </div>
</section>`:""}function He({site:e,t:n,L:a,lang:r}){let s=Y(e,n,r,"btn btn--line"),i=Q(e);return e.showReviews===!1||!i.length&&!s?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${t(n.reviews)}</h2>
    ${te(i,r,"quotes",o=>`<figure class="quote">
      ${o.rating?`<div class="stars" aria-label="${o.rating}/5">${Array.from({length:5},(l,c)=>`<span class="${c<o.rating?"on":""}">${y("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${t(a(o.text))}</blockquote>
      <figcaption><strong>${t(o.name)}</strong>${o.bought?` \xB7 ${t(a(o.bought))}`:""}${ee(o,r)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Ae({site:e,t:n,L:a}){var i,o;let r=(i=e.contact)!=null?i:{},s=encodeURIComponent((o=r.mapQuery)!=null?o:a(r.address));return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${t(n.visit.title)}</h2>
      ${a(e.hours)?`<p class="status is-open">${t(a(e.hours))}</p>`:""}
      ${a(r.address)?`<p class="addr">${y("pin",18)} ${t(a(r.address))}</p>`:""}
      ${a(e.directions)?`<p class="addr">${y("route",18)} ${t(a(e.directions))}</p>`:""}
      ${r.phone?`<p class="addr">${y("phone",18)} <a href="tel:${D(r.phone)}">${t(r.phone)}</a></p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${t(n.visit.directions)} ${y("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${t(n.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ee({site:e,t:n,L:a}){var s;let r=((s=e.faq)!=null?s:[]).filter(i=>a(i==null?void 0:i.q));return r.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${t(n.faq.title)}</h2>
    <div class="qa">${r.map((i,o)=>`<details${o===0?" open":""}><summary>${t(a(i.q))}</summary><p>${t(a(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Fe({site:e,t:n,L:a,market:r}){var o,l;let s=(o=e.contact)!=null?o:{},i=Object.entries((l=e.social)!=null?l:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${t(e.name)}</p><p class="muted">${t(a(e.tagline))}</p></div>
    <div><p class="foot-h">${t(n.footer.contact)}</p><ul>
      ${s.phone?`<li><a href="tel:${D(s.phone)}">${t(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${t(s.email)}">${t(s.email)}</a></li>`:""}
      ${a(s.address)?`<li>${t(a(s.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${t(n.footer.follow)}</p><ul>${i.map(([c,d])=>`<li><a href="${t(d)}" target="_blank" rel="noopener">${t(c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${e.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${t(e.name)}</span>${ae(e,n,r.lang)}</div>
</footer>`}function Oe({site:e,market:n,L:a,abs:r,url:s,catalog:i}){var l;let o=(l=e.contact)!=null?l:{};return{"@context":"https://schema.org","@type":"AutoRental",name:e.name,url:r(`${n.id}/`),description:a(e.intro),image:new URL(O(e,s),r("")).href,telephone:o.phone,email:o.email,address:{"@type":"PostalAddress",streetAddress:a(o.address)},currenciesAccepted:n.currency,makesOffer:q(i,n).map(c=>{var d,h;return{"@type":"Offer",name:a(c.name),priceSpecification:{"@type":"UnitPriceSpecification",price:L(c),priceCurrency:n.currency,unitCode:"DAY"},itemOffered:{"@type":"Car",name:a(c.name),description:a(c.description)||a(c.name),seatingCapacity:(d=c.facts)==null?void 0:d.seats,fuelType:a((h=c.facts)==null?void 0:h.fuel)||void 0}}})}}export{tt as renderSite};
