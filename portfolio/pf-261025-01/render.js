var oe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>oe[t]);function E(a,t,n="vi"){var o,r,i;return a==null?"":typeof a!="object"?String(a):(i=(r=(o=a[t])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?i:""}var re={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},B=a=>{var t;return(t=re[a])!=null?t:"en-US"};function se(a,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(a)-.01);let n=Number(t)||1;return Math.max(n,Math.round(a/n)*n)}function T(a,t){var o,r;if(t.default)return a.basePrice;let n=(r=(o=a.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:se(a.basePrice*t.rate,t.rounding)}var ie=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function H(a,t){let n={style:"currency",currency:t.currency};return ie.has(t.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(B(t.lang),n).format(a)}function I(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var C=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,M=(a,t)=>{let n=C(t);return n==null?t:a(n)},N=(a="")=>String(a).replace(/\D/g,"");function q(a,t,n=""){switch(a){case"phone":return`tel:${N(t.phone)}`;case"zalo":return`https://zalo.me/${N(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${N(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var A=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,le=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function U(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,i]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let s=i.trim().replace(/^\{|\}$/g,"").toLowerCase();le.includes(s)&&(o[s]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var P={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ce={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},g=(a,t=20,n="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=ce[a])!=null?o:""}</svg>`};function _(a){var n,o;return(o=(n=new Intl.NumberFormat(B(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:a.currency}var V=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',K=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`;var W={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},pe=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,de=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&pe.test(n.hostname)?n.href:""}catch{return""}},J=(a,t,n,o="btn btn--line")=>{var s;let r=de(a);if(!r)return"";let i=typeof t.reviews=="object"&&((s=t.reviews)==null?void 0:s.google)||W[n]||W.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${g("star",16)} ${e(i)}</a></p>`},L={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},Z={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},Y=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function X(a,t){var i,s,l;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((s=n[3])!=null?s:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((l=Z[t])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function he(a,t){var s,l;let n=a.filter(d=>d.rating>=1&&d.rating<=5);if(n.length<2)return"";let o=n.reduce((d,c)=>d+Number(c.rating),0)/n.length,r=(s=L[t])!=null?s:L.en,i=new Intl.NumberFormat((l=Z[t])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${g("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function Q(a,t,n,o){var s;if(!a.length)return"";let r=(s=L[t])!=null?s:L.en,i=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?r.prev:r.next)}">${g("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${he(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${ue}`}var ue=`<style>
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
upd()}})()<\/script>`;var ee=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function te({site:a,markets:t,url:n,abs:o}){var s;let r=(s=t.find(l=>l.default))!=null?s:t[0],i=t.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${t.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${o(`${l.id}/`)}">`).join(`
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
<body><p>${t.map(l=>`<a href="${n(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var me="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ae=8,ge={spotify:"Spotify",apple:"Apple Music",youtube:"YouTube",soundcloud:"SoundCloud",zing:"Zing MP3",nct:"NhacCuaTui"};function fe(a,t){var n;return((n=a.products)!=null?n:[]).map(o=>{var r;return{...o,variants:((r=o.variants)!=null?r:[]).map(i=>({...i,price:T(i,t)})).filter(i=>i.price!=null),extraPrice:o.extra?T(o.extra,t):null}}).filter(o=>o.variants.length>0).map(o=>({...o,from:Math.min(...o.variants.map(r=>r.price))}))}var be=a=>String(a).split(/\s+/).filter(Boolean).slice(-2).map(t=>t[0]).join("").toUpperCase(),F=a=>{let t=/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/.exec(String(a!=null?a:""));return t?t[1]:null},R=a=>/^https?:\/\//i.test(String(a!=null?a:""))?a:"";function Ue({site:a,catalog:t,i18n:n,template:o,basePath:r="/",siteUrl:i=a.domain}){var f,$,y,k;let s=I(r),l=v=>new URL(s(v),i).href,d=t.markets,c=U(a.orderForm),p=c&&!c.error?c:null,h=[];for(let v of d){let x=v.lang,D=($=(f=n[x])!=null?f:n.en)!=null?$:n.vi,u=m=>E(m,x,"en"),b=fe(t,v),w=(k=(y=a.orderChannels)==null?void 0:y[v.id])!=null?k:["phone"],j={site:a,catalog:t,market:v,markets:d,lang:x,t:D,L:u,url:s,abs:l,channels:w,money:m=>H(m,v),items:b,template:o,gform:p,fmtDate:(m,ne)=>{try{return new Intl.DateTimeFormat(x,{timeZone:"UTC",...ne}).format(new Date(`${m}T00:00:00Z`))}catch{return m}}};h.push({path:`${v.id}/index.html`,html:ve(j)})}return h.push({path:"index.html",html:te({site:a,markets:d,url:s,abs:l})}),h}function ve(a){var x,D,u,b,w,S,z,j;let{site:t,market:n,markets:o,lang:r,t:i,L:s,url:l,abs:d,channels:c}=a,p=`${t.name} \xB7 ${s(t.tagline)}`,h=(x=t.theme)!=null?x:{},f=["primary","ink","bg","surface","soft","accent"].filter(m=>h[m]).map(m=>`--${m}:${h[m]}`).join(";"),$=(D=o.find(m=>m.default))!=null?D:o[0],y=o.map(m=>({id:m.id,lang:m.lang,country:m.country,currency:m.currency,href:l(`${m.id}/`)})),k=(u=t.contact)!=null?u:{},v=t.heroImage;return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(p)}</title>
<meta name="description" content="${e(s(t.intro))}">
<link rel="canonical" href="${d(`${n.id}/`)}">
${o.map(m=>`<link rel="alternate" hreflang="${e(m.lang)}-${e(m.country)}" href="${d(`${m.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${$.id}/`)}">
<meta property="og:type" content="profile">
<meta property="og:title" content="${e(p)}">
<meta property="og:description" content="${e(s(t.intro))}">
<meta property="og:url" content="${d(`${n.id}/`)}">
${v?`<meta property="og:image" content="${e(d(C(v)))}">`:""}
<meta property="og:site_name" content="${e(t.name)}">
<meta name="theme-color" content="${e((b=h.bg)!=null?b:"#0F0E13")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${me}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${f}}</style>
${A(Te(a))}${((w=t.faq)!=null?w:[]).length?A(Ce(a)):""}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(y))}' data-copied="${e(i.copied)}" data-wa="${e(N((S=k.whatsapp)!=null?S:""))}" data-email="${e((z=k.email)!=null?z:"")}" data-tz="${e((j=t.timezone)!=null?j:"Asia/Ho_Chi_Minh")}" data-currency="${e(n.currency)}" data-lang="${e(r)}">
<a class="skip" href="#main">${e(i.skip)}</a>
${K(i)}
${s(t.announcement)?`<p class="announce">${e(s(t.announcement))}</p>`:""}
${ye(a)}
<main id="main">
${[$e,ke,xe,we,Me,De,Se,ze,Ne,Pe].map(m=>m(a)).join(`
`)}
</main>
${je(a)}
<nav class="dock" aria-label="${e(i.nav.book)}">
  <a href="#shows">${g("calendar",20)}<span>${e(i.nav.shows)}</span></a>
  <a class="primary" href="#book">${g("chat",20)}<span>${e(i.nav.book)}</span></a>
</nav>
</body>
</html>
`}function ye({site:a,market:t,markets:n,t:o,url:r}){let i=[["#story",o.nav.story],["#music",o.nav.music],["#shows",o.nav.shows],["#media",o.nav.media],["#press",o.nav.press]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(M(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${g("wave",20)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([s,l])=>`<a href="${s}">${e(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${g("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(_(t))}</span></span></summary>
        <ul>${n.map(s=>`<li><a href="${r(`${s.id}/`)}" hreflang="${e(s.lang)}"${s.id===t.id?' aria-current="true"':""}>${e(s.country)} \xB7 ${e(s.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#book">${e(o.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${g("menu",22)}</summary>
        <nav aria-label="Menu">${i.map(([s,l])=>`<a href="${s}">${e(l)}</a>`).join("")}<a href="#book">${e(o.nav.book)}</a></nav>
      </details>
    </div>
  </div>
</header>`}var O=a=>{var t;return((t=a.shows)!=null?t:[]).filter(n=>{var o;return/^\d{4}-\d{2}-\d{2}$/.test((o=n==null?void 0:n.date)!=null?o:"")&&n.venue}).sort((n,o)=>n.date.localeCompare(o.date))};function $e(a){let{site:t,t:n,L:o,url:r,fmtDate:i}=a,s=t.heroImage,l=O(t),d=[["#story",n.ch.story],["#music",n.ch.music],["#shows",n.ch.shows],["#media",n.ch.media],["#book",n.ch.book]];return`<section class="hero">
  ${s?`<img class="hero-img" src="${e(M(r,s))}" alt="" width="1600" height="1000" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${o(t.heroKicker)?`<p class="kicker">${e(o(t.heroKicker))}</p>`:""}
    <h1>${e(t.name)}</h1>
    <p class="tagline">${e(o(t.tagline))}</p>
    <p class="lead">${e(o(t.intro))}</p>
    <div class="actions"><a class="btn btn--accent btn--lg" href="#music">${g("wave",18)} ${e(n.hero.listen)}</a><a class="btn btn--ghost btn--lg" href="#book">${e(n.hero.book)}</a></div>
    ${l.length?`<div class="next" data-next>${l.map((c,p)=>`<a href="#shows" class="next-show" data-date="${e(c.date)}"${p?" hidden":""}><span class="next-k">${e(n.shows.next)}</span><b>${e(i(c.date,{day:"numeric",month:"short"}))}</b><span>${e(o(c.venue))} \xB7 ${e(o(c.city))}</span></a>`).join("")}</div>`:""}
  </div>
  <ol class="wrap toc">${d.map(([c,p],h)=>`<li><a href="${c}"><span>${String(h+1).padStart(2,"0")}</span>${e(p)}</a></li>`).join("")}</ol>
</section>`}var G=(a,{id:t,n,kicker:o,title:r,text:i,image:s,body:l,flip:d,extra:c=""})=>`<section class="chapter${d?" chapter--flip":""}${c}" id="${t}" aria-labelledby="${t}-title">
  ${s?`<figure class="ch-pic"><img sizes="${P.wide}" src="${e(M(a.url,s))}" alt="" width="1000" height="1250" loading="lazy"></figure>`:""}
  <div class="ch-body">
    <p class="ch-n">${String(n).padStart(2,"0")} <span>${e(o)}</span></p>
    <h2 id="${t}-title" class="h2">${e(r)}</h2>
    ${i?`<p class="lead">${e(i)}</p>`:""}
    ${l}
  </div>
</section>`;function ke(a){var l,d,c;let{site:t,t:n,L:o}=a,r=((l=t.story)!=null?l:[]).filter(p=>o(p==null?void 0:p.title)),i=((d=t.members)!=null?d:[]).filter(p=>p==null?void 0:p.name);if(!r.length&&!i.length)return"";let s=`${r.length?`<ol class="timeline">${r.map(p=>{var h;return`<li><span class="yr">${e((h=p.year)!=null?h:"")}</span><div><b>${e(o(p.title))}</b>${o(p.text)?`<p>${e(o(p.text))}</p>`:""}</div></li>`}).join("")}</ol>`:""}
    ${i.length?`<h3 class="mini">${e(n.story.members)}</h3><ul class="members">${i.map(p=>`<li><span class="ava" aria-hidden="true">${e(be(p.name))}</span><div><b>${e(p.name)}</b><span>${e(o(p.role))}</span></div></li>`).join("")}</ul>`:""}`;return G(a,{id:"story",n:1,kicker:n.ch.story,title:o(t.storyTitle)||n.story.title,text:o(t.storyText),image:(c=t.chapters)==null?void 0:c.story,body:s})}function xe(a){var d,c;let{site:t,t:n,L:o,url:r}=a,i=((d=t.releases)!=null?d:[]).filter(p=>o(p==null?void 0:p.title));if(!i.length)return"";let s=p=>{var h;return Object.entries((h=p.links)!=null?h:{}).filter(([,f])=>R(f)).map(([f,$])=>{var y;return`<a class="listen" href="${e($)}" target="_blank" rel="noopener">${g(f==="youtube"?"camera":"wave",15)} ${e((y=ge[f])!=null?y:f)}</a>`}).join("")},l=`<ul class="releases">${i.map((p,h)=>{var f,$;return`<li class="release${h===0?" release--new":""}">
      ${p.image?`<img class="cover" sizes="${P.thumb}" src="${e(M(r,p.image))}" alt="${e(o(p.title))}" width="400" height="400" loading="lazy">`:'<span class="cover cover--empty" aria-hidden="true"></span>'}
      <div class="rel-body">
        <p class="rel-meta">${h===0?`<span class="tag">${e(n.music.latest)}</span>`:""}${e([(f=n.music.types[p.type])!=null?f:p.type,p.year].filter(Boolean).join(" \xB7 "))}</p>
        <h3>${e(o(p.title))}</h3>
        ${(($=p.tracks)!=null?$:[]).length?`<ol class="tracks">${p.tracks.map((y,k)=>`<li><span class="tn">${k+1}</span><span class="tt">${e(o(y.title))}</span>${y.length?`<span class="tl">${e(y.length)}</span>`:""}</li>`).join("")}</ol>`:""}
        <p class="listens">${s(p)}</p>
      </div>
    </li>`}).join("")}</ul>`;return G(a,{id:"music",n:2,kicker:n.ch.music,title:n.music.title,text:o(t.musicText)||n.music.text,image:(c=t.chapters)==null?void 0:c.music,body:l,flip:!0})}function we(a){var d;let{site:t,t:n,L:o,fmtDate:r}=a,i=O(t),s=n.shows,l=`<ul class="shows" data-shows>${i.map(c=>{let p=R(c.tickets),h=c.status==="soldout"?`<span class="badge badge--out">${e(s.soldout)}</span>`:c.status==="private"?`<span class="badge">${e(s.private)}</span>`:c.status==="free"?`<span class="badge badge--free">${e(s.free)}</span>`:"";return`<li class="show" data-date="${e(c.date)}">
      <p class="when"><b>${e(r(c.date,{day:"numeric"}))}</b><span>${e(r(c.date,{month:"short"}))}</span><small>${e(r(c.date,{weekday:"short"}))}${c.time?` \xB7 ${e(c.time)}`:""}</small></p>
      <div class="where"><b>${e(o(c.venue))}</b><span>${g("pin",14)} ${e(o(c.city))}</span>${c.status==="few"?`<em class="few">${e(s.few)}</em>`:""}</div>
      <div class="tix">${h||(p?`<a class="btn btn--accent btn--sm" href="${e(p)}" target="_blank" rel="noopener">${e(s.tickets)}</a>`:`<a class="btn btn--line btn--sm" href="#contact">${e(s.ask)}</a>`)}</div>
    </li>`}).join("")}</ul>
    <p class="muted" data-shows-empty${i.length?" hidden":""}>${e(s.empty)}</p>
    <p class="past-note small muted" data-past data-tpl="${e(s.past)}" hidden></p>
    <a class="link" href="#book">${e(s.cta)} \u2192</a>`;return G(a,{id:"shows",n:3,kicker:n.ch.shows,title:s.title,text:o(t.showsText)||s.text,image:(d=t.chapters)==null?void 0:d.shows,body:l})}function Me(a){var d,c;let{site:t,t:n,L:o,url:r}=a,i=((d=t.videos)!=null?d:[]).filter(p=>F(p==null?void 0:p.youtube)),s=((c=t.album)!=null?c:[]).filter(p=>p==null?void 0:p.image);if(!i.length&&!s.length)return"";let l=n.media;return`<section class="chapter chapter--wide" id="media" aria-labelledby="media-title">
  <div class="ch-body">
    <p class="ch-n">04 <span>${e(n.ch.media)}</span></p>
    <h2 id="media-title" class="h2">${e(l.title)}</h2>
    ${i.length?`<ul class="videos">${i.map(p=>`<li><a href="https://www.youtube.com/watch?v=${e(F(p.youtube))}" target="_blank" rel="noopener" class="video">
      ${p.image?`<img sizes="${P.wide}" src="${e(M(r,p.image))}" alt="" width="960" height="540" loading="lazy">`:`<img src="https://i.ytimg.com/vi/${e(F(p.youtube))}/hqdefault.jpg" alt="" width="480" height="360" loading="lazy">`}
      <span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>
      <span class="vt">${e(o(p.title))}<small>${e(l.watch)}</small></span></a></li>`).join("")}</ul>`:""}
    ${s.length?`<ul class="album" data-album>${s.map((p,h)=>`<li${h>=ae?' class="is-more"':""}><a href="${e(M(r,p.image))}" data-zoom="${h}" aria-label="${e(l.zoom)} ${h+1}"><img sizes="${P.card}" src="${e(M(r,p.image))}" alt="" width="600" height="750" loading="lazy"></a></li>`).join("")}</ul>
    ${s.length>ae?`<div class="more"><button type="button" class="btn btn--line" data-album-more hidden>${e(l.more)}</button></div>`:""}
    <dialog class="lightbox" data-lightbox aria-label="${e(l.title)}">
      <img src="" alt="" data-lb-img>
      <button type="button" class="lb-close" data-lb-close aria-label="${e(l.close)}">\u2715</button>
      <button type="button" class="lb-nav lb-prev" data-lb-step="-1" aria-label="${e(l.prev)}">${g("chevron",26)}</button>
      <button type="button" class="lb-nav lb-next" data-lb-step="1" aria-label="${e(l.next)}">${g("chevron",26)}</button>
    </dialog>`:""}
  </div>
</section>`}function De(a){var v,x,D;let{site:t,items:n,t:o,L:r,money:i,channels:s,gform:l,market:d}=a;if(!n.length)return"";let c=o.book,p=(v=t.booking)!=null&&v.travel?T(t.booking.travel,d):null,h=n.map(u=>({id:u.id,n:r(u.name),m:Number(u.minutes)||60,p:u.from,x:u.extraPrice})),f=o.orderText.replace(/\{\w+\}/g,"\u2026"),$=l?` data-gform="${e(l.action)}" data-gmap='${e(JSON.stringify(l.fields))}'`:"",y=u=>s.map((b,w)=>{var S,z;return`<button type="submit" class="btn ${u!=null?u:w?"btn--line":"btn--accent"} btn--lg" data-channel="${e(b)}" data-href="${e(q(b,(S=t.contact)!=null?S:{},f))}">${g(b,18)} ${e(b==="phone"?c.call:c.send.replace("{channel}",(z=o.via[b])!=null?z:b))}</button>`}).join(""),k=Number((x=t.booking)==null?void 0:x.notice)||14;return`<section class="chapter chapter--book" id="book" aria-labelledby="book-title">
  ${(D=t.chapters)!=null&&D.book?`<figure class="ch-pic"><img sizes="${P.wide}" src="${e(M(a.url,t.chapters.book))}" alt="" width="1000" height="1250" loading="lazy"></figure>`:""}
  <div class="ch-body">
    <p class="ch-n">05 <span>${e(o.ch.book)}</span></p>
    <h2 id="book-title" class="h2">${e(c.title)}</h2>
    <p class="lead">${e(r(t.bookText)||c.text)}</p>
    <ul class="pkgs">${n.map((u,b)=>`<li><label class="pkg"><input type="radio" name="pkg-pick" value="${e(u.id)}"${b?"":" checked"} form="book-form">
      <span><b>${e(r(u.name))}</b>${r(u.badge)?` <em class="tag">${e(r(u.badge))}</em>`:""}<small>${e(r(u.description))}</small>
      <span class="pk-meta">${[r(u.members),u.minutes?c.minutes.replace("{n}",u.minutes):""].filter(Boolean).map(e).join(" \xB7 ")}</span>
      <strong>${e(c.from.replace("{price}",i(u.from)))}</strong></span></label></li>`).join("")}</ul>
    <form class="order" id="book-form" data-book-form${$} data-pkgs='${e(JSON.stringify(h))}' data-travel="${p!=null?p:""}" data-notice="${k}" data-text="${e(o.orderText)}" data-market="${e(`${d.id.toUpperCase()} \xB7 ${d.currency}`)}" novalidate>
      <div class="order-fields">
        <div class="fields">
          <label><span>${e(c.event)} *</span><select name="event" required>${c.events.map(u=>`<option>${e(u)}</option>`).join("")}</select></label>
          <label><span>${e(c.date)} *</span><input name="date" type="date" required data-date></label>
          <label><span>${e(c.place)} *</span><input name="place" required maxlength="160" placeholder="${e(c.placeHint)}"></label>
          <label><span>${e(c.guests)}</span><input name="guests" type="number" min="1" max="100000" inputmode="numeric" placeholder="150"></label>
          <label><span>${e(c.length)}</span><select name="extra" data-extra>${[0,1,2].map(u=>`<option value="${u}">${e(u?c.plus.replace("{n}",u):c.base)}</option>`).join("")}</select></label>
          ${p!=null?`<label class="opt opt--check"><input type="checkbox" name="travel" value="1" data-travel-cb><span>${e(c.travel.replace("{price}",i(p)))}</span></label>`:""}
        </div>
        <p class="small muted" data-date-note data-tpl="${e(c.tooSoon.replace("{n}",k))}" hidden></p>
        <div class="fields">
          <label><span>${e(c.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label><span>${e(c.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
          <label class="wide"><span>${e(c.note)}</span><input name="note" maxlength="300" placeholder="${e(c.noteHint)}"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <div class="quote" aria-live="polite"><p><span>${e(c.quote)}</span><b data-total>${e(i(n[0].from))}</b></p><small data-break></small><small>${e(c.quoteNote)}</small></div>
        <p class="form-err" data-err hidden>${e(c.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--accent btn--lg btn--full" data-order-submit>${g("chat",18)} <span>${e(c.submit)}</span></button></div>
        <noscript><p>${s.map(u=>{var b,w;return`<a href="${e(q(u,(b=t.contact)!=null?b:{},f))}" ${V(u)}>${e((w=o.via[u])!=null?w:u)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${l?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${g(l?"check":"arrow",22)} ${e(l?c.done:c.stepTitle)}</p>
        <p>${e(l?c.doneText:c.stepText)}</p>
        <div class="buy">${y(l?"btn--line":void 0)}</div>
        ${l?"":`<button type="button" class="link back" data-edit>${e(c.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Se({site:a,t,L:n}){var l,d,c,p;let o=(l=a.press)!=null?l:{},r=((d=o.facts)!=null?d:[]).filter(h=>h==null?void 0:h.value),i=((c=o.files)!=null?c:[]).filter(h=>n(h==null?void 0:h.label)&&R(h.url)),s=((p=o.quotes)!=null?p:[]).filter(h=>n(h==null?void 0:h.text));return!n(o.bio)&&!r.length&&!i.length?"":`<section class="section section--soft" id="press" aria-labelledby="press-title">
  <div class="wrap press">
    <div>
      <p class="kicker">${e(t.press.kicker)}</p>
      <h2 id="press-title" class="h2">${e(t.press.title)}</h2>
      ${n(o.bio)?`<div class="bio">${String(n(o.bio)).split(`
`).filter(Boolean).map(h=>`<p>${e(h)}</p>`).join("")}</div>`:""}
      ${i.length?`<ul class="files">${i.map(h=>`<li><a href="${e(h.url)}" target="_blank" rel="noopener">${g("doc",18)} ${e(n(h.label))} ${g("arrow",15)}</a></li>`).join("")}</ul>`:""}
    </div>
    <div>
      ${r.length?`<dl class="facts">${r.map(h=>`<div><dt>${e(n(h.label))}</dt><dd>${e(n(h.value))}</dd></div>`).join("")}</dl>`:""}
      ${s.map(h=>`<blockquote class="pq"><p>\u201C${e(n(h.text))}\u201D</p><cite>${e(n(h.source))}</cite></blockquote>`).join("")}
    </div>
  </div>
</section>`}function ze({site:a,t,L:n,lang:o}){let r=J(a,t,o,"btn btn--line"),i=Y(a);return a.showReviews===!1||!i.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${Q(i,o,"reviews",s=>`<figure class="review">
      <p class="stars" aria-label="${e(s.rating)}/5">${Array.from({length:5},(l,d)=>`<span class="${d<s.rating?"on":""}">${g("star",15)}</span>`).join("")}</p>
      <blockquote>${e(n(s.text))}</blockquote>
      <figcaption>${e(s.name)}${n(s.bought)?`<small>${e(n(s.bought))}</small>`:""}${X(s,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Ne({site:a,t,L:n}){var r;let o=((r=a.faq)!=null?r:[]).filter(i=>n(i==null?void 0:i.q));return o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${o.map((i,s)=>`<details${s===0?" open":""}><summary>${e(n(i.q))}</summary><p>${e(n(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Pe({site:a,t,L:n,channels:o}){var i;let r=(i=a.contact)!=null?i:{};return`<section class="section" id="contact" aria-labelledby="contact-title">
  <div class="wrap contact">
    <div>
      <h2 id="contact-title" class="h2">${e(t.contact.title)}</h2>
      <p class="lead">${e(n(r.manager)?t.contact.manager.replace("{name}",n(r.manager)):t.contact.text)}</p>
    </div>
    <div class="actions">
      ${o.map((s,l)=>{var d;return`<a class="btn ${l?"btn--line":"btn--accent"} btn--lg" href="${e(q(s,r))}" ${V(s)}>${g(s,18)} ${e((d=t.via[s])!=null?d:s)}</a>`}).join("")}
      ${r.email&&!o.includes("email")?`<a class="btn btn--line btn--lg" href="mailto:${e(r.email)}">${g("email",18)} ${e(r.email)}</a>`:""}
    </div>
  </div>
</section>`}function je({site:a,t,L:n,market:o}){var s,l;let r=(s=a.contact)!=null?s:{},i=Object.entries((l=a.social)!=null?l:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(n(a.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${N(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([d,c])=>`<li><a href="${e(c)}" target="_blank" rel="noopener">${e(d==="tiktok"?"TikTok":d==="youtube"?"YouTube":d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${ee(a,t,o.lang)}</div>
</footer>`}function Te({site:a,market:t,L:n,abs:o}){var i,s,l;let r=(i=a.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"MusicGroup",name:a.name,url:o(`${t.id}/`),...a.heroImage?{image:o(C(a.heroImage))}:{},description:n(a.intro),...n(a.genre)?{genre:n(a.genre)}:{},email:r.email,telephone:r.phone,member:((s=a.members)!=null?s:[]).filter(d=>d==null?void 0:d.name).map(d=>({"@type":"Person",name:d.name})),sameAs:Object.values((l=a.social)!=null?l:{}).filter(Boolean),event:O(a).filter(d=>d.status!=="private").map(d=>({"@type":"MusicEvent",name:`${a.name} \xB7 ${n(d.venue)}`,startDate:d.time?`${d.date}T${d.time}`:d.date,location:{"@type":"Place",name:n(d.venue),address:n(d.city)},...R(d.tickets)?{offers:{"@type":"Offer",url:d.tickets,availability:d.status==="soldout"?"https://schema.org/SoldOut":"https://schema.org/InStock"}}:{}}))}}var Ce=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});export{Ue as renderSite};
