var oe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,a=>oe[a]);function A(n,a,t="vi"){var o,i,s;return n==null?"":typeof n!="object"?String(n):(s=(i=(o=n[a])!=null?o:n[t])!=null?i:Object.values(n)[0])!=null?s:""}var re={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},j=n=>{var a;return(a=re[n])!=null?a:"en-US"};function se(n,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(n)-.01);let t=Number(a)||1;return Math.max(t,Math.round(n/t)*t)}function B(n,a){var o,i;if(a.default)return n.basePrice;let t=(i=(o=n.prices)==null?void 0:o[a.id])!=null?i:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:se(n.basePrice*a.rate,a.rounding)}var ie=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function O(n,a){let t={style:"currency",currency:a.currency};return ie.has(a.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(j(a.lang),t).format(n)}function G(n="/"){let a=n.endsWith("/")?n:`${n}/`;return(t="")=>a+String(t).replace(/^\//,"")}var R=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,S=(n,a)=>{let t=R(a);return t==null?a:n(t)},T=(n="")=>String(n).replace(/\D/g,"");function L(n,a,t=""){switch(n){case"phone":return`tel:${T(a.phone)}`;case"zalo":return`https://zalo.me/${T(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${T(a.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var V=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,le=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function H(n){if(!n||typeof n!="string")return null;let a;try{a=new URL(n.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let t=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let o={};for(let[i,s]of a.searchParams){if(!/^entry\.\d+$/.test(i))continue;let r=s.trim().replace(/^\{|\}$/g,"").toLowerCase();le.includes(r)&&(o[r]=i)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var C={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ce={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(n,a=20,t="")=>{var o;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(o=ce[n])!=null?o:""}</svg>`},q=[1,2,3,4,5,6,0];function U(n,a){let t=n.map(i=>q.indexOf(i)).sort((i,s)=>i-s);return t.every((i,s)=>s===0||i===t[s-1]+1)&&t.length>2?`${a[q[t[0]]]} \u2013 ${a[q[t.at(-1)]]}`:t.map(i=>a[q[i]]).join(", ")}function W(n){var t,o;return(o=(t=new Intl.NumberFormat(j(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(i=>i.type==="currency"))==null?void 0:t.value)!=null?o:n.currency}var _=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',K=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,Z=(n,a)=>{var t;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((t=n.timezone)!=null?t:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},I={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},pe=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,de=n=>{var a;try{let t=new URL(String((a=n.googleReview)!=null?a:"").trim());return t.protocol==="https:"&&pe.test(t.hostname)?t.href:""}catch{return""}},J=(n,a,t,o="btn btn--line")=>{var r;let i=de(n);if(!i)return"";let s=typeof a.reviews=="object"&&((r=a.reviews)==null?void 0:r.google)||I[t]||I.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(i)}" target="_blank" rel="noopener">${u("star",16)} ${e(s)}</a></p>`},E={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},Y={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},Q=n=>{var a;return((a=n.reviews)!=null?a:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function X(n,a){var s,r,l;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((s=n==null?void 0:n.date)!=null?s:"").trim());if(!t)return"";let o=new Date(Date.UTC(+t[1],+t[2]-1,+((r=t[3])!=null?r:1)));if(Number.isNaN(o.getTime()))return"";let i=new Intl.DateTimeFormat((l=Y[a])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(n.date)}">${e(i)}</time>`}function he(n,a){var r,l;let t=n.filter(p=>p.rating>=1&&p.rating<=5);if(t.length<2)return"";let o=t.reduce((p,v)=>p+Number(v.rating),0)/t.length,i=(r=E[a])!=null?r:E.en,s=new Intl.NumberFormat((l=Y[a])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${s}</strong><span>\xB7</span><span>${e(i.count.replace("{n}",String(n.length)))}</span></p>`}function ee(n,a,t,o){var r;if(!n.length)return"";let i=(r=E[a])!=null?r:E.en,s=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?i.prev:i.next)}">${u("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${he(n,a)}<div class="rv" data-rv data-rv-more="${e(i.more)}" data-rv-less="${e(i.less)}">
      <div class="${t} rv-track" tabindex="0">${n.map(o).join("")}</div>
      <div class="rv-nav" hidden>${s("prev")}${s("next")}</div>
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
upd()}})()<\/script>`;var te=(n,a,t)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function ae({site:n,markets:a,url:t,abs:o}){var r;let i=(r=a.find(l=>l.default))!=null?r:a[0],s=a.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(i.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${o(`${i.id}/`)}">
${a.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${o(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(s)}, root = ${JSON.stringify(t(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(l=>`<a href="${t(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var me="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ne=8;function ge(n,a){var t;return((t=n.products)!=null?t:[]).map(o=>{var i;return{...o,variants:((i=o.variants)!=null?i:[]).map(s=>({...s,price:B(s,a)})).filter(s=>s.price!=null)}}).filter(o=>o.variants.length>0&&o.start).sort((o,i)=>String(o.start).localeCompare(String(i.start)))}var fe=(n,a)=>{var t;return((t=n.addons)!=null?t:[]).filter(o=>o==null?void 0:o.id).map(o=>({...o,price:B({basePrice:o.price,prices:o.prices},a)})).filter(o=>o.price!=null)};function _e({site:n,catalog:a,i18n:t,template:o,basePath:i="/",siteUrl:s=n.domain}){let r=G(i),l=f=>new URL(r(f),s).href,p=a.markets,v=H(n.bookingForm),d=v&&!v.error?v:null,c=p.map(f=>{var b,g,M,F;let m=f.lang,y=(g=(b=t[m])!=null?b:t.en)!=null?g:t.vi,x=D=>A(D,m,"en"),w=ge(a,f),$=fe(n,f),k=(F=(M=n.bookingChannels)==null?void 0:M[f.id])!=null?F:["phone"],h={site:n,catalog:a,market:f,markets:p,lang:m,t:y,L:x,url:r,abs:l,sessions:w,addons:$,channels:k,money:D=>O(D,f),template:o,gform:d,fmtDate:D=>new Intl.DateTimeFormat(j(m),{day:"numeric",month:"short",timeZone:"UTC"}).format(new Date(`${D}T00:00:00Z`)),nights:D=>Math.round((Date.parse(`${D.end}T00:00:00Z`)-Date.parse(`${D.start}T00:00:00Z`))/864e5)};return{path:`${f.id}/index.html`,html:ve(h)}});return c.push({path:"index.html",html:ae({site:n,markets:p,url:r,abs:l})}),c}function ve(n){var x,w,$,k,z,N,P,h,b;let{site:a,market:t,markets:o,lang:i,t:s,L:r,url:l,abs:p}=n,v=`${a.name} \xB7 ${r(a.tagline)}`,d=(x=a.theme)!=null?x:{},c=["primary","ink","bg","surface","soft","accent"].filter(g=>d[g]).map(g=>`--${g}:${d[g]}`).join(";"),f=(w=o.find(g=>g.default))!=null?w:o[0],m=o.map(g=>({id:g.id,lang:g.lang,country:g.country,currency:g.currency,href:l(`${g.id}/`)})),y=($=a.contact)!=null?$:{};return`<!doctype html>
<html lang="${e(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(v)}</title>
<meta name="description" content="${e(r(a.intro))}">
<link rel="canonical" href="${p(`${t.id}/`)}">
${o.map(g=>`<link rel="alternate" hreflang="${e(g.lang)}-${e(g.country)}" href="${p(`${g.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${f.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(v)}">
<meta property="og:description" content="${e(r(a.intro))}">
<meta property="og:url" content="${p(`${t.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(p(R(a.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((k=d.primary)!=null?k:"#1E4D6B")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${me}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${c}}</style>
<noscript><style>.album .is-more{display:block}</style></noscript>
${V(Ce(n))}${((z=a.faq)!=null?z:[]).length?V(Re(n)):""}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(m))}' data-wa="${e(T((N=y.whatsapp)!=null?N:""))}" data-email="${e((P=y.email)!=null?P:"")}" data-copied="${e(s.copied)}" data-tz="${e((h=a.timezone)!=null?h:"Asia/Ho_Chi_Minh")}" data-store="${e(`kp-camp-${String((b=a.name)!=null?b:"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`)}">
<a class="skip" href="#main">${e(s.skip)}</a>
${K(s)}
${r(a.announcement)?`<p class="announce">${u("sun",15)} ${e(r(a.announcement))}</p>`:""}
${be(n)}
<main id="main">
${[ye,$e,ke,xe,we,Me,De,Se,ze,Ne,Pe,Te].map(g=>g(n)).join(`
`)}
</main>
${je(n)}
<nav class="dock" aria-label="${e(s.nav.register)}">
  <a href="#sessions">${u("calendar",20)}<span>${e(s.nav.sessions)}</span></a>
  <a class="primary" href="#register">${u("sun",20)}<span>${e(s.nav.register)}</span></a>
</nav>
</body>
</html>
`}function be({site:n,market:a,markets:t,t:o,url:i}){let s=[["#sessions",o.nav.sessions],["#day",o.nav.day],["#activities",o.nav.activities],["#safety",o.nav.safety],["#visit",o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${i(`${a.id}/`)}">
      ${n.logo?`<img src="${e(S(i,n.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("sun",20)}</span>`}
      <span>${e(n.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${s.map(([r,l])=>`<a href="${r}">${e(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${t.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${u("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(W(a))}</span></span></summary>
        <ul>${t.map(r=>`<li><a href="${i(`${r.id}/`)}" hreflang="${e(r.lang)}"${r.id===a.id?' aria-current="true"':""}>${e(r.country)} \xB7 ${e(r.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#register">${e(o.nav.register)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${[...s,["#register",o.nav.register]].map(([r,l])=>`<a href="${r}">${e(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ye({site:n,t:a,L:t,url:o}){var s;let i=((s=n.facts)!=null?s:[]).filter(r=>t(r==null?void 0:r.value));return`<section class="hero">
  <img class="hero-img" src="${e(S(o,n.heroImage||"photos/h-hero.webp"))}" alt="" width="1600" height="900" fetchpriority="high">
  <div class="wrap hero-copy">
    ${t(n.heroKicker)?`<p class="kicker">${e(t(n.heroKicker))}</p>`:""}
    <h1>${e(t(n.tagline))}</h1>
    ${t(n.intro)?`<p class="lead">${e(t(n.intro))}</p>`:""}
    <div class="actions">
      <a class="btn btn--accent btn--lg" href="#register">${u("sun",18)} ${e(a.hero.register)}</a>
      <a class="btn btn--light btn--lg" href="#sessions">${u("calendar",18)} ${e(a.hero.sessions)}</a>
    </div>
  </div>
  ${i.length?`<div class="wrap"><ul class="facts">${i.map(r=>{var l;return`<li>${u((l=r.icon)!=null?l:"check",24)}<b>${e(t(r.value))}</b><span>${e(t(r.label))}</span></li>`}).join("")}</ul></div>`:""}
</section>`}function $e(n){let{sessions:a,t,L:o,url:i,money:s,fmtDate:r,nights:l,catalog:p}=n;if(!a.length)return"";let v=d=>{var c,f;return o((f=((c=p.categories)!=null?c:[]).find(m=>m.id===d.category))==null?void 0:f.name)};return`<section class="section" id="sessions" aria-labelledby="ss-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.sessions.kicker)}</p><h2 id="ss-title" class="h2">${e(t.sessions.title)}</h2><p class="lead">${e(t.sessions.text)}</p></div>
    <ul class="sessions">${a.map(d=>{var y;let c=Math.max(0,(Number(d.seats)||0)-(Number(d.taken)||0)),f=d.seats?c===0?"full":c<=5?"low":"ok":"",m=l(d);return`<li class="session${f==="full"?" is-full":""}" data-start="${e(d.start)}" data-end="${e(d.end)}">
      <div class="session-img">
        ${d.image?`<img sizes="${C.card}" src="${e(S(i,d.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
        ${f?`<span class="seats seats--${f}">${e(f==="full"?t.sessions.full:t.sessions.left.replace("{n}",c))}</span>`:""}
        <span class="live" data-live hidden>${e(t.sessions.live)}</span>
      </div>
      <div class="session-body">
        <p class="session-cat">${e((y=v(d))!=null?y:"")}${o(d.badge)?` \xB7 <b>${e(o(d.badge))}</b>`:""}</p>
        <h3>${e(o(d.name))}</h3>
        <p class="when">${u("calendar",16)} ${e(r(d.start))}${d.end!==d.start?` \u2013 ${e(r(d.end))}`:""} \xB7 ${e(m?t.sessions.nights.replace("{n}",m+1).replace("{m}",m):t.sessions.oneDay)}</p>
        ${d.ages?`<p class="when">${u("users",16)} ${e(t.sessions.ages.replace("{a}",d.ages[0]).replace("{b}",d.ages[1]))}</p>`:""}
        ${o(d.description)?`<p class="muted">${e(o(d.description))}</p>`:""}
        <dl class="prices">${d.variants.map(x=>{var w;return`<div><dt>${e((w=o(x.label))!=null?w:"")}</dt><dd>${e(s(x.price))}</dd></div>`}).join("")}</dl>
        <a class="btn ${f==="full"?"btn--line":"btn--primary"} btn--full" href="#register" data-pick-session="${e(d.id)}">${e(f==="full"?t.sessions.waitlist:t.sessions.book)}</a>
      </div>
    </li>`}).join("")}</ul>
    <p class="muted" data-none hidden>${e(t.sessions.none)}</p>
  </div>
</section>`}function ke({site:n,t:a,L:t}){var i;let o=((i=n.day)!=null?i:[]).filter(s=>t(s==null?void 0:s.title));return o.length?`<section class="section section--soft" id="day" aria-labelledby="day-title">
  <div class="wrap day-wrap">
    <div class="sec-head sec-head--left"><p class="kicker">${e(a.day.kicker)}</p><h2 id="day-title" class="h2">${e(a.day.title)}</h2><p class="lead">${e(a.day.text)}</p></div>
    <ol class="timeline">${o.map(s=>{var r,l;return`<li><time>${e((r=s.time)!=null?r:"")}</time><span class="dot" aria-hidden="true">${u((l=s.icon)!=null?l:"sun",18)}</span><div><b>${e(t(s.title))}</b>${t(s.text)?`<p>${e(t(s.text))}</p>`:""}</div></li>`}).join("")}</ol>
  </div>
</section>`:""}function xe({site:n,t:a,L:t,url:o}){var s;let i=((s=n.activities)!=null?s:[]).filter(r=>t(r==null?void 0:r.name));return i.length?`<section class="section" id="activities" aria-labelledby="act-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.act.kicker)}</p><h2 id="act-title" class="h2">${e(a.act.title)}</h2></div>
    <ul class="acts">${i.map(r=>`<li class="act">
      ${r.image?`<img sizes="${C.card}" src="${e(S(o,r.image))}" alt="" width="900" height="900" loading="lazy">`:""}
      <div><h3>${e(t(r.name))}</h3>${t(r.text)?`<p>${e(t(r.text))}</p>`:""}</div>
    </li>`).join("")}</ul>
  </div>
</section>`:""}function we({site:n,t:a,L:t}){var i;let o=((i=n.safety)!=null?i:[]).filter(s=>t(s==null?void 0:s.title));return o.length?`<section class="section section--ink" id="safety" aria-labelledby="sf-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.safety.kicker)}</p><h2 id="sf-title" class="h2">${e(a.safety.title)}</h2><p class="lead">${e(a.safety.text)}</p></div>
    <ul class="safe">${o.map(s=>{var r;return`<li>${u((r=s.icon)!=null?r:"shield",28)}<b>${e(t(s.title))}</b><p>${e(t(s.text))}</p></li>`}).join("")}</ul>
    ${t(n.safetyNote)?`<p class="note">${u("heart",16)} ${e(t(n.safetyNote))}</p>`:""}
  </div>
</section>`:""}function Me({site:n,t:a,L:t,url:o}){var s;let i=String((s=t(n.packing))!=null?s:"").split(`
`).map(r=>r.trim()).filter(Boolean);return i.length?`<section class="section" id="packing" aria-labelledby="pk-title">
  <div class="wrap pack">
    <img sizes="${C.wide}" src="${e(S(o,"photos/p-pack.webp"))}" alt="" width="1000" height="750" loading="lazy">
    <div>
      <p class="kicker">${e(a.pack.kicker)}</p>
      <h2 id="pk-title" class="h2">${e(a.pack.title)}</h2>
      <p class="lead">${e(a.pack.text)}</p>
      <ul class="checklist" data-packing>${i.map((r,l)=>`<li><label><input type="checkbox" data-i="${l}"> <span>${e(r)}</span></label></li>`).join("")}</ul>
      <p class="pack-meta"><span data-pack-count data-tpl="${e(a.pack.count)}">${e(a.pack.count.replace("{a}",0).replace("{b}",i.length))}</span>
        <button type="button" class="link" data-print>${u("doc",16)} ${e(a.pack.print)}</button></p>
    </div>
  </div>
</section>`:""}function De({site:n,t:a,L:t}){var s;let o=((s=n.team)!=null?s:[]).filter(r=>r==null?void 0:r.name);if(!o.length)return"";let i=r=>String(r).trim().split(/\s+/).slice(-2).map(l=>l[0]).join("").toUpperCase();return`<section class="section section--soft" aria-labelledby="tm-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.team.kicker)}</p><h2 id="tm-title" class="h2">${e(a.team.title)}</h2></div>
    <ul class="team">${o.map(r=>`<li><span class="avatar" aria-hidden="true">${e(i(r.name))}</span><b>${e(r.name)}</b>${t(r.role)?`<small>${e(t(r.role))}</small>`:""}${t(r.text)?`<p>${e(t(r.text))}</p>`:""}</li>`).join("")}</ul>
  </div>
</section>`}function Se({site:n,t:a,url:t}){var i;let o=((i=n.album)!=null?i:[]).filter(s=>s==null?void 0:s.image);return o.length?`<section class="section" aria-labelledby="al-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.album.kicker)}</p><h2 id="al-title" class="h2">${e(a.album.title)}</h2></div>
    <ul class="album" data-album>${o.map((s,r)=>`<li class="${r>=ne?"is-more":""}"><a href="${e(S(t,s.image))}" data-zoom="${r}"><img sizes="${C.card}" src="${e(S(t,s.image))}" alt="" width="900" height="900" loading="lazy"></a></li>`).join("")}</ul>
    ${o.length>ne?`<div class="more"><button type="button" class="btn btn--line" data-album-more hidden>${e(a.album.more)}</button></div>`:""}
    <dialog class="lightbox" data-lightbox aria-label="${e(a.album.title)}">
      <img src="" alt="" data-lb-img>
      <button type="button" class="lb-close" data-lb-close aria-label="${e(a.album.close)}">\u2715</button>
      <button type="button" class="lb-nav lb-prev" data-lb-step="-1" aria-label="${e(a.album.prev)}">${u("chevron",26)}</button>
      <button type="button" class="lb-nav lb-next" data-lb-step="1" aria-label="${e(a.album.next)}">${u("chevron",26)}</button>
    </dialog>
  </div>
</section>`:""}function ze({site:n,t:a,L:t,lang:o}){let i=J(n,a,o,"btn btn--line"),s=Q(n);return n.showReviews===!1||!s.length&&!i?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2></div>
    ${ee(s,o,"reviews",r=>`<figure class="review">
      <p class="stars" aria-label="${e(r.rating)}/5">${Array.from({length:5},(l,p)=>`<span class="${p<r.rating?"on":""}">${u("star",15)}</span>`).join("")}</p>
      <blockquote>${e(t(r.text))}</blockquote>
      <figcaption>${e(r.name)}${t(r.bought)?`<small>${e(t(r.bought))}</small>`:""}${X(r,o)}</figcaption>
    </figure>`)}${i}
  </div>
</section>`}function Ne(n){var z,N,P;let{site:a,t,L:o,sessions:i,addons:s,money:r,channels:l,gform:p,market:v,fmtDate:d}=n;if(!i.length)return"";let c=t.reg,f=(z=a.contact)!=null?z:{},m=p?` data-gform="${e(p.action)}" data-gmap='${e(JSON.stringify(p.fields))}'`:"",y=t.orderText.replace(/\{\w+\}/g,"\u2026"),x=h=>l.map((b,g)=>{var M;return`<button type="submit" class="btn ${h!=null?h:g?"btn--line":"btn--accent"}" data-channel="${e(b)}" data-href="${e(L(b,f,y))}">${u(b,18)} ${e(b==="phone"?c.call:c.send.replace("{channel}",(M=t.via[b])!=null?M:b))}</button>`}).join(""),w=i.map(h=>{var b;return{id:h.id,a:(b=h.ages)!=null?b:null,s:h.start,e:h.end,full:h.seats?Number(h.seats)-(Number(h.taken)||0)<=0:!1,v:h.variants.map(g=>{var M;return{l:(M=o(g.label))!=null?M:"",p:g.price,m:r(g.price)}})}}),$=Number(a.siblingOff)||0,k=Number(a.deposit)||0;return`<section class="section section--ink" id="register" aria-labelledby="rg-title">
  <div class="wrap reg">
    <div class="reg-copy">
      <p class="kicker">${e(c.kicker)}</p>
      <h2 id="rg-title" class="h2">${e(c.title)}</h2>
      <p class="lead">${e(c.text)}</p>
      <ul class="reg-points">
        ${k?`<li>${u("card",18)} ${e(c.depositNote.replace("{n}",k))}</li>`:""}
        ${$?`<li>${u("users",18)} ${e(c.siblingNote.replace("{n}",$))}</li>`:""}
        <li>${u("refresh",18)} ${e(o(a.refund)||c.refund)}</li>
      </ul>
    </div>
    <form class="form" data-reg novalidate${m} data-text="${e(t.orderText)}" data-market="${e(`${v.id.toUpperCase()} \xB7 ${v.currency}`)}" data-sessions='${e(JSON.stringify(w))}' data-off="${$}" data-dep="${k}" data-currency="${e(v.currency)}" data-lang="${e(v.lang)}">
      <div class="order-fields">
        <label class="field"><span>${e(c.session)} *</span><select name="product" data-session required>${i.map(h=>`<option value="${e(h.id)}">${e(o(h.name))} \xB7 ${e(d(h.start))}${h.end!==h.start?` \u2013 ${e(d(h.end))}`:""}</option>`).join("")}</select></label>
        <p class="hint" data-session-note data-full="${e(c.full)}" data-past="${e(c.past)}" hidden></p>
        <fieldset class="field"><legend>${e(c.stay)}</legend><div class="opts" data-variants></div></fieldset>
        <div class="row2">
          <label class="field"><span>${e(c.child)} *</span><input name="child" required maxlength="80"></label>
          <label class="field"><span>${e(c.age)} *</span><input name="age" type="number" min="3" max="18" inputmode="numeric" required data-age></label>
        </div>
        <p class="hint hint--warn" data-age-note data-tpl="${e(c.ageWarn)}" hidden></p>
        <div class="row2">
          <label class="field"><span>${e(c.shirt)}</span><select name="shirt">${((N=c.shirts)!=null?N:[]).map(h=>`<option>${e(h)}</option>`).join("")}</select></label>
          <label class="field"><span>${e(c.swim)}</span><select name="swim">${((P=c.swimLevels)!=null?P:[]).map(h=>`<option>${e(h)}</option>`).join("")}</select></label>
        </div>
        <label class="field"><span>${e(c.health)}</span><textarea name="health" rows="2" maxlength="400" placeholder="${e(c.healthHint)}"></textarea></label>
        <div class="row2">
          <label class="field"><span>${e(c.parent)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(c.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(c.email)}</span><input name="email" type="email" autocomplete="email" maxlength="120"></label>
        ${s.length?`<fieldset class="field"><legend>${e(c.addons)}</legend><div class="addons">${s.map(h=>`<label class="check"><input type="checkbox" name="addon" value="${e(o(h.name))}" data-price="${h.price}"> <span>${e(o(h.name))}</span><b>+ ${e(r(h.price))}</b></label>`).join("")}</div></fieldset>`:""}
        ${$?`<label class="check"><input type="checkbox" name="sibling" value="1" data-sibling> ${e(c.sibling.replace("{n}",$))}</label>`:""}
        <label class="field"><span>${e(c.note)}</span><input name="note" maxlength="300" placeholder="${e(c.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <dl class="sum">
          <div><dt>${e(c.base)}</dt><dd data-s-base>\u2014</dd></div>
          <div data-s-add-row hidden><dt>${e(c.addons)}</dt><dd data-s-add></dd></div>
          <div data-s-off-row hidden><dt>${e(c.offLabel)}</dt><dd data-s-off></dd></div>
          <div class="sum-total"><dt>${e(c.total)}</dt><dd data-s-total>\u2014</dd></div>
          ${k?`<div class="sum-dep"><dt>${e(c.deposit.replace("{n}",k))}</dt><dd data-s-dep>\u2014</dd></div>`:""}
        </dl>
        <p class="form-err" data-err hidden>${e(c.required)}</p>
        <button class="btn btn--accent btn--lg btn--full" type="submit" data-submit>${u("sun",18)} ${e(c.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${u(p?"check":"arrow",22)} ${e(p?c.done:c.stepTitle)}</p>
        <p>${e(p?c.doneText:c.stepText)}</p>
        <div class="buy">${x(p?"btn--line":void 0)}</div>
        ${p?"":`<button type="button" class="link back" data-edit>${e(c.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Pe({site:n,t:a,L:t}){var i;let o=((i=n.faq)!=null?i:[]).filter(s=>t(s==null?void 0:s.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div>${o.map((s,r)=>`<details${r===0?" open":""}><summary>${e(t(s.q))}</summary><p>${e(t(s.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Te({site:n,t:a,L:t,channels:o}){var p,v,d,c,f;let i=(p=n.contact)!=null?p:{},s=(v=n.camp)!=null?v:{},r=encodeURIComponent((c=(d=s.mapQuery)!=null?d:i.mapQuery)!=null?c:t(i.address)),l=m=>m.length===7?a.visit.everyDay:U(m,a.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${t(s.address)?`<p class="addr">${u("pin",18)} <span><b>${e(a.visit.camp)}</b> ${e(t(s.address))}</span></p>`:""}
      ${t(i.address)?`<p class="addr">${u("house",18)} <span><b>${e(a.visit.office)}</b> ${e(t(i.address))}</span></p>`:""}
      ${Z(n,a)}
      ${((f=n.hours)!=null?f:[]).length?`<table class="hours"><tbody>${n.hours.map(m=>`<tr><th scope="row">${e(l(m.days))}</th><td>${e(m.open)} \u2013 ${e(m.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${e(a.visit.directions)} ${u("arrow",16)}</a>
        ${o.map(m=>{var y;return`<a class="btn btn--line" href="${e(L(m,i))}" ${_(m)}>${u(m,18)} ${e((y=a.via[m])!=null?y:m)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function je({site:n,t:a,L:t,market:o}){var r,l;let i=(r=n.contact)!=null?r:{},s=Object.entries((l=n.social)!=null?l:{}).filter(([,p])=>p);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(t(n.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${i.phone?`<li>${e(a.footer.hotline)}: <a href="tel:${T(i.phone)}">${e(i.phone)}</a></li>`:""}
      ${i.email?`<li><a href="mailto:${e(i.email)}">${e(i.email)}</a></li>`:""}
      ${t(i.address)?`<li>${e(t(i.address))}</li>`:""}</ul></div>
    ${s.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${s.map(([p,v])=>`<li><a href="${e(v)}" target="_blank" rel="noopener">${e(p==="tiktok"?"TikTok":p==="youtube"?"YouTube":p[0].toUpperCase()+p.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${te(n,a,o.lang)}</div>
</footer>`}function Ce({site:n,market:a,L:t,abs:o,sessions:i}){var r;let s=(r=n.contact)!=null?r:{};return{"@context":"https://schema.org","@type":"EducationalOrganization",name:n.name,url:o(`${a.id}/`),description:t(n.intro),image:o(R(n.heroImage||"photos/h-hero.webp")),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:t(s.address)},event:i.map(l=>{var p,v;return{"@type":"Event",name:t(l.name),startDate:l.start,endDate:l.end,eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode",location:{"@type":"Place",name:n.name,address:(v=t((p=n.camp)==null?void 0:p.address))!=null?v:t(s.address)},offers:l.variants.map(d=>({"@type":"Offer",name:t(d.label),price:d.price,priceCurrency:a.currency})),typicalAgeRange:l.ages?`${l.ages[0]}-${l.ages[1]}`:void 0}})}}var Re=({site:n,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(t=>a(t==null?void 0:t.q)).map(t=>({"@type":"Question",name:a(t.q),acceptedAnswer:{"@type":"Answer",text:a(t.a)}}))});export{_e as renderSite};
