var le={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,a=>le[a]);function B(n,a,t="vi"){var o,s,r;return n==null?"":typeof n!="object"?String(n):(r=(s=(o=n[a])!=null?o:n[t])!=null?s:Object.values(n)[0])!=null?r:""}var ce={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},T=n=>{var a;return(a=ce[n])!=null?a:"en-US"};function de(n,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(n)-.01);let t=Number(a)||1;return Math.max(t,Math.round(n/t)*t)}function C(n,a){var o,s;if(a.default)return n.basePrice;let t=(s=(o=n.prices)==null?void 0:o[a.id])!=null?s:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:de(n.basePrice*a.rate,a.rounding)}var pe=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function U(n,a){let t={style:"currency",currency:a.currency};return pe.has(a.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(T(a.lang),t).format(n)}function W(n="/"){let a=n.endsWith("/")?n:`${n}/`;return(t="")=>a+String(t).replace(/^\//,"")}var R=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,S=(n,a)=>{let t=R(a);return t==null?a:n(t)},j=(n="")=>String(n).replace(/\D/g,"");function F(n,a,t=""){switch(n){case"phone":return`tel:${j(a.phone)}`;case"zalo":return`https://zalo.me/${j(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${j(a.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var V=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,he=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function _(n){if(!n||typeof n!="string")return null;let a;try{a=new URL(n.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let t=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let o={};for(let[s,r]of a.searchParams){if(!/^entry\.\d+$/.test(s))continue;let i=r.trim().replace(/^\{|\}$/g,"").toLowerCase();he.includes(i)&&(o[i]=s)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var q={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ue={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(n,a=20,t="")=>{var o;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(o=ue[n])!=null?o:""}</svg>`},E=[1,2,3,4,5,6,0];function J(n,a){let t=n.map(s=>E.indexOf(s)).sort((s,r)=>s-r);return t.every((s,r)=>r===0||s===t[r-1]+1)&&t.length>2?`${a[E[t[0]]]} \u2013 ${a[E[t.at(-1)]]}`:t.map(s=>a[E[s]]).join(", ")}function Z(n){var t,o;return(o=(t=new Intl.NumberFormat(T(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:t.value)!=null?o:n.currency}var Y=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',X=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,Q=(n,a)=>{var t;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((t=n.timezone)!=null?t:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},K={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},me=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ge=n=>{var a;try{let t=new URL(String((a=n.googleReview)!=null?a:"").trim());return t.protocol==="https:"&&me.test(t.hostname)?t.href:""}catch{return""}},ee=(n,a,t,o="btn btn--line")=>{var i;let s=ge(n);if(!s)return"";let r=typeof a.reviews=="object"&&((i=a.reviews)==null?void 0:i.google)||K[t]||K.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(s)}" target="_blank" rel="noopener">${u("star",16)} ${e(r)}</a></p>`},L={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},te={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ae=n=>{var a;return((a=n.reviews)!=null?a:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function ne(n,a){var r,i,l;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((r=n==null?void 0:n.date)!=null?r:"").trim());if(!t)return"";let o=new Date(Date.UTC(+t[1],+t[2]-1,+((i=t[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let s=new Intl.DateTimeFormat((l=te[a])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(n.date)}">${e(s)}</time>`}function fe(n,a){var i,l;let t=n.filter(d=>d.rating>=1&&d.rating<=5);if(t.length<2)return"";let o=t.reduce((d,p)=>d+Number(p.rating),0)/t.length,s=(i=L[a])!=null?i:L.en,r=new Intl.NumberFormat((l=te[a])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${r}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(n.length)))}</span></p>`}function oe(n,a,t,o){var i;if(!n.length)return"";let s=(i=L[a])!=null?i:L.en,r=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?s.prev:s.next)}">${u("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${fe(n,a)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${t} rv-track" tabindex="0">${n.map(o).join("")}</div>
      <div class="rv-nav" hidden>${r("prev")}${r("next")}</div>
    </div>${be}`}var be=`<style>
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
upd()}})()<\/script>`;var re=(n,a,t)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function se({site:n,markets:a,url:t,abs:o}){var i;let s=(i=a.find(l=>l.default))!=null?i:a[0],r=a.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${o(`${s.id}/`)}">
${a.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${o(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(r)}, root = ${JSON.stringify(t(""))};
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
`}var ve="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",ie=8,ye={bus:"bus",plane:"plane",boat:"wave",car:"car",train:"route"};function $e(n,a){var t;return((t=n.products)!=null?t:[]).map(o=>{var s;return{...o,price:C(o,a),single:o.single?C({basePrice:o.single,prices:o.singlePrices},a):0,departures:[...(s=o.departures)!=null?s:[]].filter(r=>r==null?void 0:r.date).sort((r,i)=>r.date.localeCompare(i.date))}}).filter(o=>o.price!=null)}var ke=(n,a)=>{var t;return((t=n.addons)!=null?t:[]).filter(o=>o==null?void 0:o.id).map(o=>({...o,price:C({basePrice:o.price,prices:o.prices},a)})).filter(o=>o.price!=null)},N=n=>Math.max(0,(Number(n.seats)||0)-(Number(n.taken)||0));function Ye({site:n,catalog:a,i18n:t,template:o,basePath:s="/",siteUrl:r=n.domain}){let i=W(s),l=f=>new URL(i(f),r).href,d=a.markets,p=_(n.bookingForm),c=p&&!p.error?p:null,h=d.map(f=>{var b,O,G,H,I;let m=f.lang,v=(O=(b=t[m])!=null?b:t.en)!=null?O:t.vi,M=x=>B(x,m,"en"),y=$e(a,f),k=ke(n,f),D=(H=(G=n.bookingChannels)==null?void 0:G[f.id])!=null?H:["phone"],w=x=>U(x,f),g=(x,A={day:"numeric",month:"short"})=>new Intl.DateTimeFormat(T(m),{...A,timeZone:"UTC"}).format(new Date(`${x}T00:00:00Z`)),$=x=>x.nights?v.tours.dur.replace("{n}",x.days).replace("{m}",x.nights):v.tours.oneDay,P=((I=a.categories)!=null?I:[]).filter(x=>y.some(A=>A.category===x.id)),z={site:n,catalog:a,market:f,markets:d,lang:m,t:v,L:M,url:i,abs:l,tours:y,addons:k,channels:D,money:w,template:o,gform:c,fmtDate:g,dur:$,regions:P};return{path:`${f.id}/index.html`,html:xe(z)}});return h.push({path:"index.html",html:se({site:n,markets:d,url:i,abs:l})}),h}function xe(n){var M,y,k,D,w,g,$,P,z;let{site:a,market:t,markets:o,lang:s,t:r,L:i,url:l,abs:d}=n,p=`${a.name} \xB7 ${i(a.tagline)}`,c=(M=a.theme)!=null?M:{},h=["primary","ink","bg","surface","soft","accent"].filter(b=>c[b]).map(b=>`--${b}:${c[b]}`).join(";"),f=(y=o.find(b=>b.default))!=null?y:o[0],m=o.map(b=>({id:b.id,lang:b.lang,country:b.country,currency:b.currency,href:l(`${b.id}/`)})),v=(k=a.contact)!=null?k:{};return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(p)}</title>
<meta name="description" content="${e(i(a.intro))}">
<link rel="canonical" href="${d(`${t.id}/`)}">
${o.map(b=>`<link rel="alternate" hreflang="${e(b.lang)}-${e(b.country)}" href="${d(`${b.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${d(`${f.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(p)}">
<meta property="og:description" content="${e(i(a.intro))}">
<meta property="og:url" content="${d(`${t.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(d(R(a.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((D=c.primary)!=null?D:"#0F4C5C")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ve}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${h}}</style>
<noscript><style>.album .is-more{display:block}</style></noscript>
${V(Ae(n))}${((w=a.faq)!=null?w:[]).length?V(Be(n)):""}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(m))}' data-wa="${e(j((g=v.whatsapp)!=null?g:""))}" data-email="${e(($=v.email)!=null?$:"")}" data-copied="${e(r.copied)}" data-tz="${e((P=a.timezone)!=null?P:"Asia/Ho_Chi_Minh")}" data-store="${e(`kp-tour-${String((z=a.name)!=null?z:"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`)}">
<a class="skip" href="#main">${e(r.skip)}</a>
${X(r)}
${i(a.announcement)?`<p class="announce">${u("flag",15)} ${e(i(a.announcement))}</p>`:""}
${we(n)}
<main id="main">
${[Me,De,ze,Ne,Pe,je,Te,Ce,Re,qe,Ee].map(b=>b(n)).join(`
`)}
</main>
${Le(n)}
${Se(n)}
<nav class="dock" aria-label="${e(r.nav.book)}">
  <a href="#departures">${u("calendar",20)}<span>${e(r.nav.departures)}</span></a>
  <a class="primary" href="#book">${u("flag",20)}<span>${e(r.nav.book)}</span></a>
</nav>
</body>
</html>
`}function we({site:n,market:a,markets:t,t:o,url:s}){let r=[["#tours",o.nav.tours],["#departures",o.nav.departures],["#why",o.nav.why],["#packing",o.nav.packing],["#visit",o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${a.id}/`)}">
      ${n.logo?`<img src="${e(S(s,n.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("flag",20)}</span>`}
      <span>${e(n.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${r.map(([i,l])=>`<a href="${i}">${e(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${t.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${u("globe",16)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(Z(a))}</span></span></summary>
        <ul>${t.map(i=>`<li><a href="${s(`${i.id}/`)}" hreflang="${e(i.lang)}"${i.id===a.id?' aria-current="true"':""}>${e(i.country)} \xB7 ${e(i.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#book">${e(o.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${[...r,["#book",o.nav.book]].map(([i,l])=>`<a href="${i}">${e(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Me({site:n,t:a,L:t,url:o,regions:s}){var i;let r=((i=n.facts)!=null?i:[]).filter(l=>t(l==null?void 0:l.value));return`<section class="hero">
  <img class="hero-img" src="${e(S(o,n.heroImage||"photos/h-hero.webp"))}" alt="" width="1600" height="900" fetchpriority="high">
  <div class="wrap hero-copy">
    ${t(n.heroKicker)?`<p class="kicker">${e(t(n.heroKicker))}</p>`:""}
    <h1>${e(t(n.tagline))}</h1>
    ${t(n.intro)?`<p class="lead">${e(t(n.intro))}</p>`:""}
    <form class="finder" data-finder action="#departures">
      <label><span>${e(a.hero.where)}</span><select name="region"><option value="">${e(a.tours.all)}</option>${s.map(l=>`<option value="${e(l.id)}">${e(t(l.name))}</option>`).join("")}</select></label>
      <label><span>${e(a.hero.when)}</span><select name="month" data-months><option value="">${e(a.hero.anyMonth)}</option></select></label>
      <button class="btn btn--accent btn--lg" type="submit">${u("search",18)} ${e(a.hero.find)}</button>
    </form>
  </div>
  ${r.length?`<div class="wrap"><ul class="facts">${r.map(l=>{var d;return`<li>${u((d=l.icon)!=null?d:"check",24)}<b>${e(t(l.value))}</b><span>${e(t(l.label))}</span></li>`}).join("")}</ul></div>`:""}
</section>`}function De(n){let{tours:a,t,L:o,url:s,money:r,fmtDate:i,dur:l,regions:d,catalog:p}=n;if(!a.length)return"";let c=h=>{var f,m;return o((m=((f=p.categories)!=null?f:[]).find(v=>v.id===h.category))==null?void 0:m.name)};return`<section class="section" id="tours" aria-labelledby="tr-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.tours.kicker)}</p><h2 id="tr-title" class="h2">${e(t.tours.title)}</h2><p class="lead">${e(t.tours.text)}</p></div>
    ${d.length>1?`<div class="chips" role="group" aria-label="${e(t.tours.region)}" data-regions><button type="button" class="chip" aria-pressed="true" data-region="">${e(t.tours.all)}</button>${d.map(h=>`<button type="button" class="chip" aria-pressed="false" data-region="${e(h.id)}">${e(o(h.name))}</button>`).join("")}</div>`:""}
    <ul class="tours">${a.map(h=>{var m,v,M;let f=(m=h.departures.find(y=>N(y)>0))!=null?m:h.departures[0];return`<li class="tour" data-region="${e(h.category)}" data-tour="${e(h.id)}">
      <button type="button" class="tour-img" data-open="${e(h.id)}" aria-label="${e(t.tours.details)}: ${e(o(h.name))}">
        ${h.image?`<img sizes="${q.card}" src="${e(S(s,h.image))}" alt="" width="1000" height="750" loading="lazy">`:""}
        ${o(h.badge)?`<span class="badge">${e(o(h.badge))}</span>`:""}
        <span class="dur">${u("clock",14)} ${e(l(h))}</span>
      </button>
      <div class="tour-body">
        <p class="tour-reg">${u("pin",14)} ${e((v=c(h))!=null?v:"")}${o(h.from)?` \xB7 ${e(t.tours.from.replace("{c}",o(h.from)))}`:""}</p>
        <h3>${e(o(h.name))}</h3>
        ${o(h.description)?`<p class="muted">${e(o(h.description))}</p>`:""}
        <p class="ways">${((M=h.transport)!=null?M:[]).map(y=>{var k,D,w;return`<span title="${e((k=t.ways[y])!=null?k:y)}">${u((D=ye[y])!=null?D:"route",16)} ${e((w=t.ways[y])!=null?w:y)}</span>`}).join("")}</p>
        ${f?`<p class="next" data-next data-tpl="${e(t.tours.next)}" data-none="${e(t.tours.noDates)}">${u("calendar",16)} <span>${e(t.tours.next.replace("{d}",i(f.date,{weekday:"short",day:"numeric",month:"short"})).replace("{n}",N(f)))}</span></p>`:""}
        <div class="tour-foot">
          <p class="from"><small>${e(t.tours.priceFrom)}</small><b>${e(r(h.price))}</b><small>${e(t.tours.perAdult)}</small></p>
          <div class="tour-btns">
            <button type="button" class="btn btn--line btn--sm" data-open="${e(h.id)}">${e(t.tours.details)}</button>
            <a class="btn btn--primary btn--sm" href="#book" data-pick="${e(h.id)}">${e(t.tours.book)}</a>
          </div>
        </div>
      </div>
    </li>`}).join("")}</ul>
  </div>
</section>`}function Se(n){let{tours:a,t,L:o,url:s,money:r,fmtDate:i,dur:l}=n,d=p=>{var c;return String((c=o(p))!=null?c:"").split(`
`).map(h=>h.trim()).filter(Boolean)};return a.map(p=>{var h,f;let c=[p.image,...(h=p.images)!=null?h:[]].filter(Boolean).slice(0,3);return`<dialog class="sheet" id="tour-${e(p.id)}" data-sheet="${e(p.id)}" aria-labelledby="dl-${e(p.id)}">
  <div class="sheet-in">
    <button type="button" class="sheet-x" data-close aria-label="${e(t.album.close)}">\u2715</button>
    <div class="sheet-imgs">${c.map((m,v)=>`<img src="${e(S(s,m))}" alt="" width="1000" height="750" loading="lazy"${v?"":' class="big"'}>`).join("")}</div>
    <div class="sheet-body">
      <p class="tour-reg">${u("clock",14)} ${e(l(p))}${o(p.from)?` \xB7 ${e(t.tours.from.replace("{c}",o(p.from)))}`:""}</p>
      <h2 id="dl-${e(p.id)}" class="h3">${e(o(p.name))}</h2>
      ${((f=p.itinerary)!=null?f:[]).length?`<h3 class="sub">${e(t.sheet.plan)}</h3><ol class="plan">${p.itinerary.filter(m=>o(m==null?void 0:m.title)).map((m,v)=>`<li><span class="dayno">${e(t.sheet.day.replace("{n}",v+1))}</span><div><b>${e(o(m.title))}</b>${o(m.text)?`<p>${e(o(m.text))}</p>`:""}</div></li>`).join("")}</ol>`:""}
      <div class="incl">
        ${d(p.includes).length?`<div><h3 class="sub">${e(t.sheet.includes)}</h3><ul class="ticks">${d(p.includes).map(m=>`<li>${u("check",16)} ${e(m)}</li>`).join("")}</ul></div>`:""}
        ${d(p.excludes).length?`<div><h3 class="sub">${e(t.sheet.excludes)}</h3><ul class="ticks ticks--no">${d(p.excludes).map(m=>`<li>${u("minus",16)} ${e(m)}</li>`).join("")}</ul></div>`:""}
      </div>
      ${p.departures.length?`<h3 class="sub">${e(t.sheet.dates)}</h3><ul class="dates">${p.departures.map(m=>`<li data-date="${e(m.date)}"${N(m)?"":' class="is-full"'}><b>${e(i(m.date,{weekday:"short",day:"numeric",month:"short",year:"numeric"}))}</b><span>${e(N(m)?t.dep.left.replace("{n}",N(m)):t.dep.full)}</span></li>`).join("")}</ul>`:""}
      <div class="sheet-foot">
        <p class="from"><small>${e(t.tours.priceFrom)}</small><b>${e(r(p.price))}</b><small>${e(t.tours.perAdult)}</small></p>
        <a class="btn btn--accent" href="#book" data-pick="${e(p.id)}" data-close>${u("flag",16)} ${e(t.tours.book)}</a>
      </div>
    </div>
  </div>
</dialog>`}).join(`
`)}function ze(n){let{tours:a,t,L:o,money:s,fmtDate:r,dur:i}=n,l=a.flatMap(d=>d.departures.map(p=>({p:d,d:p}))).sort((d,p)=>d.d.date.localeCompare(p.d.date));return l.length?`<section class="section section--soft" id="departures" aria-labelledby="dp-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(t.dep.kicker)}</p><h2 id="dp-title" class="h2">${e(t.dep.title)}</h2><p class="lead">${e(t.dep.text)}</p></div>
    <div class="chips" role="group" aria-label="${e(t.hero.when)}" data-month-chips data-all="${e(t.hero.anyMonth)}" hidden></div>
    <div class="table-wrap"><table class="deps">
      <thead><tr><th scope="col">${e(t.dep.date)}</th><th scope="col">${e(t.dep.tour)}</th><th scope="col" class="hide-sm">${e(t.dep.length)}</th><th scope="col">${e(t.dep.price)}</th><th scope="col">${e(t.dep.seats)}</th><th scope="col"><span class="sr">${e(t.tours.book)}</span></th></tr></thead>
      <tbody>${l.map(({p:d,d:p})=>{let c=N(p),h=p.seats?c===0?"full":c<=4?"low":"ok":"";return`<tr data-date="${e(p.date)}" data-region="${e(d.category)}"${h==="full"?' class="is-full"':""}>
        <td><b>${e(r(p.date,{weekday:"short",day:"numeric",month:"short"}))}</b></td>
        <td><button type="button" class="link" data-open="${e(d.id)}">${e(o(d.name))}</button></td>
        <td class="hide-sm">${e(i(d))}</td>
        <td class="num">${e(s(d.price))}</td>
        <td>${h?`<span class="seat seat--${h}">${e(h==="full"?t.dep.full:t.dep.left.replace("{n}",c))}</span>`:""}</td>
        <td>${h==="full"?"":`<a class="btn btn--primary btn--sm" href="#book" data-pick="${e(d.id)}" data-pick-date="${e(p.date)}">${e(t.tours.book)}</a>`}</td>
      </tr>`}).join("")}</tbody>
    </table></div>
    <div class="more"><button type="button" class="btn btn--line" data-dep-more hidden>${e(t.dep.more)}</button></div>
    <p class="muted center" data-dep-none hidden>${e(t.dep.none)}</p>
  </div>
</section>`:""}function Ne({site:n,t:a,L:t}){var s;let o=((s=n.why)!=null?s:[]).filter(r=>t(r==null?void 0:r.title));return o.length?`<section class="section section--ink" id="why" aria-labelledby="wy-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.why.kicker)}</p><h2 id="wy-title" class="h2">${e(a.why.title)}</h2></div>
    <ul class="safe">${o.map(r=>{var i;return`<li>${u((i=r.icon)!=null?i:"shield",28)}<b>${e(t(r.title))}</b><p>${e(t(r.text))}</p></li>`}).join("")}</ul>
  </div>
</section>`:""}function Pe({site:n,t:a,L:t}){var r;let o=((r=n.team)!=null?r:[]).filter(i=>i==null?void 0:i.name);if(!o.length)return"";let s=i=>String(i).trim().split(/\s+/).slice(-2).map(l=>l[0]).join("").toUpperCase();return`<section class="section" aria-labelledby="tm-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.team.kicker)}</p><h2 id="tm-title" class="h2">${e(a.team.title)}</h2></div>
    <ul class="team">${o.map(i=>`<li><span class="avatar" aria-hidden="true">${e(s(i.name))}</span><b>${e(i.name)}</b>${t(i.role)?`<small>${e(t(i.role))}</small>`:""}${t(i.text)?`<p>${e(t(i.text))}</p>`:""}</li>`).join("")}</ul>
  </div>
</section>`}function je({site:n,t:a,L:t,url:o}){var r;let s=String((r=t(n.packing))!=null?r:"").split(`
`).map(i=>i.trim()).filter(Boolean);return s.length?`<section class="section section--soft" id="packing" aria-labelledby="pk-title">
  <div class="wrap pack">
    <img sizes="${q.wide}" src="${e(S(o,"photos/p-pack.webp"))}" alt="" width="1000" height="750" loading="lazy">
    <div>
      <p class="kicker">${e(a.pack.kicker)}</p>
      <h2 id="pk-title" class="h2">${e(a.pack.title)}</h2>
      <p class="lead">${e(a.pack.text)}</p>
      <ul class="checklist" data-packing>${s.map((i,l)=>`<li><label><input type="checkbox" data-i="${l}"> <span>${e(i)}</span></label></li>`).join("")}</ul>
      <p class="pack-meta"><span data-pack-count data-tpl="${e(a.pack.count)}">${e(a.pack.count.replace("{a}",0).replace("{b}",s.length))}</span>
        <button type="button" class="link" data-print>${u("doc",16)} ${e(a.pack.print)}</button></p>
    </div>
  </div>
</section>`:""}function Te({site:n,t:a,url:t}){var s;let o=((s=n.album)!=null?s:[]).filter(r=>r==null?void 0:r.image);return o.length?`<section class="section" aria-labelledby="al-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(a.album.kicker)}</p><h2 id="al-title" class="h2">${e(a.album.title)}</h2></div>
    <ul class="album" data-album>${o.map((r,i)=>`<li class="${i>=ie?"is-more":""}"><a href="${e(S(t,r.image))}" data-zoom="${i}"><img sizes="${q.card}" src="${e(S(t,r.image))}" alt="" width="900" height="900" loading="lazy"></a></li>`).join("")}</ul>
    ${o.length>ie?`<div class="more"><button type="button" class="btn btn--line" data-album-more hidden>${e(a.album.more)}</button></div>`:""}
    <dialog class="lightbox" data-lightbox aria-label="${e(a.album.title)}">
      <img src="" alt="" data-lb-img>
      <button type="button" class="lb-close" data-lb-close aria-label="${e(a.album.close)}">\u2715</button>
      <button type="button" class="lb-nav lb-prev" data-lb-step="-1" aria-label="${e(a.album.prev)}">${u("chevron",26)}</button>
      <button type="button" class="lb-nav lb-next" data-lb-step="1" aria-label="${e(a.album.next)}">${u("chevron",26)}</button>
    </dialog>
  </div>
</section>`:""}function Ce({site:n,t:a,L:t,lang:o}){let s=ee(n,a,o,"btn btn--line"),r=ae(n);return n.showReviews===!1||!r.length&&!s?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(a.reviews.title)}</h2></div>
    ${oe(r,o,"reviews",i=>`<figure class="review">
      <p class="stars" aria-label="${e(i.rating)}/5">${Array.from({length:5},(l,d)=>`<span class="${d<i.rating?"on":""}">${u("star",15)}</span>`).join("")}</p>
      <blockquote>${e(t(i.text))}</blockquote>
      <figcaption>${e(i.name)}${t(i.bought)?`<small>${e(t(i.bought))}</small>`:""}${ne(i,o)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Re(n){var w;let{site:a,t,L:o,tours:s,addons:r,money:i,channels:l,gform:d,market:p}=n;if(!s.length)return"";let c=t.book,h=(w=a.contact)!=null?w:{},f=d?` data-gform="${e(d.action)}" data-gmap='${e(JSON.stringify(d.fields))}'`:"",m=t.orderText.replace(/\{\w+\}/g,"\u2026"),v=g=>l.map(($,P)=>{var z;return`<button type="submit" class="btn ${g!=null?g:P?"btn--line":"btn--accent"}" data-channel="${e($)}" data-href="${e(F($,h,m))}">${u($,18)} ${e($==="phone"?c.call:c.send.replace("{channel}",(z=t.via[$])!=null?z:$))}</button>`}).join(""),M=s.map(g=>({id:g.id,p:g.price,s:g.single||0,n:g.nights||0,d:g.departures.map($=>({date:$.date,left:$.seats?N($):99}))})),y=Number(a.childPct)||0,k=Number(a.deposit)||0,D=Number(a.balanceDays)||0;return`<section class="section section--ink" id="book" aria-labelledby="bk-title">
  <div class="wrap reg">
    <div class="reg-copy">
      <p class="kicker">${e(c.kicker)}</p>
      <h2 id="bk-title" class="h2">${e(c.title)}</h2>
      <p class="lead">${e(c.text)}</p>
      <ul class="reg-points">
        ${k?`<li>${u("card",18)} ${e(c.depositNote.replace("{n}",k).replace("{d}",D))}</li>`:""}
        ${y?`<li>${u("users",18)} ${e(c.childNote.replace("{n}",y))}</li>`:""}
        <li>${u("refresh",18)} ${e(o(a.refund)||c.refund)}</li>
      </ul>
    </div>
    <form class="form" data-book novalidate${f} data-text="${e(t.orderText)}" data-market="${e(`${p.id.toUpperCase()} \xB7 ${p.currency}`)}" data-tours='${e(JSON.stringify(M))}' data-child="${y}" data-dep="${k}" data-currency="${e(p.currency)}" data-lang="${e(p.lang)}" data-full="${e(t.dep.full)}" data-left="${e(t.dep.left)}">
      <div class="order-fields">
        <label class="field"><span>${e(c.tour)} *</span><select name="product" data-tour-sel required>${s.map(g=>`<option value="${e(g.id)}">${e(o(g.name))}</option>`).join("")}</select></label>
        <label class="field"><span>${e(c.date)} *</span><select name="version" data-date-sel required></select></label>
        <p class="hint hint--warn" data-date-note hidden>${e(c.noDate)}</p>
        <div class="row2">
          <div class="field"><span id="ad-l">${e(c.adults)}</span><div class="step" data-step><button type="button" data-d="-1" aria-label="\u2212">${u("minus",16)}</button><input name="adults" type="number" min="1" max="30" value="2" inputmode="numeric" aria-labelledby="ad-l"><button type="button" data-d="1" aria-label="+">${u("plus",16)}</button></div></div>
          <div class="field"><span id="ch-l">${e(c.children)}</span><div class="step" data-step><button type="button" data-d="-1" aria-label="\u2212">${u("minus",16)}</button><input name="children" type="number" min="0" max="20" value="0" inputmode="numeric" aria-labelledby="ch-l"><button type="button" data-d="1" aria-label="+">${u("plus",16)}</button></div></div>
        </div>
        <p class="hint" data-seat-note data-tpl="${e(c.seatWarn)}" hidden></p>
        <label class="check" data-single-row><input type="checkbox" name="single" value="1" data-single> <span>${e(c.single)}</span> <b data-single-price></b></label>
        ${r.length?`<fieldset class="field"><legend>${e(c.addons)}</legend><div class="addons">${r.map(g=>`<label class="check"><input type="checkbox" name="addon" value="${e(o(g.name))}" data-price="${g.price}" data-per="${g.per==="person"?1:0}"> <span>${e(o(g.name))}</span><b>+ ${e(i(g.price))}${g.per==="person"?` <small>${e(c.perPerson)}</small>`:""}</b></label>`).join("")}</div></fieldset>`:""}
        <div class="row2">
          <label class="field"><span>${e(c.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(c.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(c.email)}</span><input name="email" type="email" autocomplete="email" maxlength="120"></label>
        <label class="field"><span>${e(c.note)}</span><textarea name="note" rows="2" maxlength="400" placeholder="${e(c.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <dl class="sum">
          <div><dt data-s-ad-l data-tpl="${e(c.adultLine)}">\u2014</dt><dd data-s-ad>\u2014</dd></div>
          <div data-s-ch-row hidden><dt data-s-ch-l data-tpl="${e(c.childLine)}"></dt><dd data-s-ch></dd></div>
          <div data-s-si-row hidden><dt>${e(c.singleShort)}</dt><dd data-s-si></dd></div>
          <div data-s-add-row hidden><dt>${e(c.addons)}</dt><dd data-s-add></dd></div>
          <div class="sum-total"><dt>${e(c.total)}</dt><dd data-s-total>\u2014</dd></div>
          ${k?`<div class="sum-dep"><dt>${e(c.deposit.replace("{n}",k))}</dt><dd data-s-dep>\u2014</dd></div>`:""}
        </dl>
        <p class="form-err" data-err hidden>${e(c.required)}</p>
        <button class="btn btn--accent btn--lg btn--full" type="submit" data-submit>${u("flag",18)} ${e(c.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${u(d?"check":"arrow",22)} ${e(d?c.done:c.stepTitle)}</p>
        <p>${e(d?c.doneText:c.stepText)}</p>
        <div class="buy">${v(d?"btn--line":void 0)}</div>
        ${d?"":`<button type="button" class="link back" data-edit>${e(c.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function qe({site:n,t:a,L:t}){var s;let o=((s=n.faq)!=null?s:[]).filter(r=>t(r==null?void 0:r.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div>${o.map((r,i)=>`<details${i===0?" open":""}><summary>${e(t(r.q))}</summary><p>${e(t(r.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ee({site:n,t:a,L:t,channels:o}){var l,d,p;let s=(l=n.contact)!=null?l:{},r=encodeURIComponent((d=s.mapQuery)!=null?d:t(s.address)),i=c=>c.length===7?a.visit.everyDay:J(c,a.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${t(s.address)?`<p class="addr">${u("pin",18)} <span>${e(t(s.address))}</span></p>`:""}
      ${t(n.license)?`<p class="addr">${u("shield",18)} <span>${e(t(n.license))}</span></p>`:""}
      ${Q(n,a)}
      ${((p=n.hours)!=null?p:[]).length?`<table class="hours"><tbody>${n.hours.map(c=>`<tr><th scope="row">${e(i(c.days))}</th><td>${e(c.open)} \u2013 ${e(c.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <div class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${e(a.visit.directions)} ${u("arrow",16)}</a>
        ${o.map(c=>{var h;return`<a class="btn btn--line" href="${e(F(c,s))}" ${Y(c)}>${u(c,18)} ${e((h=a.via[c])!=null?h:c)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Le({site:n,t:a,L:t,market:o}){var i,l;let s=(i=n.contact)!=null?i:{},r=Object.entries((l=n.social)!=null?l:{}).filter(([,d])=>d);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(t(n.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${s.phone?`<li>${e(a.footer.hotline)}: <a href="tel:${j(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${t(s.address)?`<li>${e(t(s.address))}</li>`:""}</ul></div>
    ${r.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${r.map(([d,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(d==="tiktok"?"TikTok":d==="youtube"?"YouTube":d[0].toUpperCase()+d.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${re(n,a,o.lang)}</div>
</footer>`}function Ae({site:n,market:a,L:t,abs:o,tours:s}){var i;let r=(i=n.contact)!=null?i:{};return{"@context":"https://schema.org","@type":"TravelAgency",name:n.name,url:o(`${a.id}/`),description:t(n.intro),image:o(R(n.heroImage||"photos/h-hero.webp")),telephone:r.phone,email:r.email,address:{"@type":"PostalAddress",streetAddress:t(r.address)},makesOffer:s.map(l=>{var d;return{"@type":"Offer",price:l.price,priceCurrency:a.currency,itemOffered:{"@type":"TouristTrip",name:t(l.name),description:t(l.description),itinerary:((d=l.itinerary)!=null?d:[]).map(p=>t(p.title)).filter(Boolean).join(" \u2192 ")}}})}}var Be=({site:n,L:a})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(t=>a(t==null?void 0:t.q)).map(t=>({"@type":"Question",name:a(t.q),acceptedAnswer:{"@type":"Answer",text:a(t.a)}}))});export{Ye as renderSite};
