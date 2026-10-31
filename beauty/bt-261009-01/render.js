var re={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},a=(t="")=>String(t).replace(/[&<>"']/g,e=>re[e]);function R(t,e,n="vi"){var o,r,l;return t==null?"":typeof t!="object"?String(t):(l=(r=(o=t[e])!=null?o:t[n])!=null?r:Object.values(t)[0])!=null?l:""}var ie={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},E=t=>{var e;return(e=ie[t])!=null?e:"en-US"};function se(t,e="1"){if(e==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(e)||1;return Math.max(n,Math.round(t/n)*n)}function A(t,e){var o,r;if(e.default)return t.basePrice;let n=(r=(o=t.prices)==null?void 0:o[e.id])!=null?r:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:se(t.basePrice*e.rate,e.rounding)}var le=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function F(t,e){let n={style:"currency",currency:e.currency};return le.has(e.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(E(e.lang),n).format(t)}function O(t="/"){let e=t.endsWith("/")?t:`${t}/`;return(n="")=>e+String(n).replace(/^\//,"")}var ce=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,w=(t,e)=>{let n=ce(e);return n==null?e:t(n)},S=(t="")=>String(t).replace(/\D/g,"");function L(t,e,n=""){switch(t){case"phone":return`tel:${S(e.phone)}`;case"zalo":return`https://zalo.me/${S(e.zalo||e.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(e.messenger)}`;case"whatsapp":return`https://wa.me/${S(e.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(e.kakao)}/chat`;case"email":return`mailto:${e.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var G=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function H(t){if(!t||typeof t!="string")return null;let e;try{e=new URL(t.trim())}catch{return{error:"not-google"}}if(e.hostname==="forms.gle")return{error:"short-link"};let n=e.hostname==="docs.google.com"&&e.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,l]of e.searchParams){if(!/^entry\.\d+$/.test(r))continue;let i=l.trim().replace(/^\{|\}$/g,"").toLowerCase();pe.includes(i)&&(o[i]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var de={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(t,e=20,n="")=>{var o;return`<svg class="i" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=de[t])!=null?o:""}</svg>`},C=[1,2,3,4,5,6,0],he=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function U(t,e){let n=t.map(r=>C.indexOf(r)).sort((r,l)=>r-l);return n.every((r,l)=>l===0||r===n[l-1]+1)&&n.length>2?`${e[C[n[0]]]} \u2013 ${e[C[n.at(-1)]]}`:n.map(r=>e[C[r]]).join(", ")}var W=t=>t.map(e=>({"@type":"OpeningHoursSpecification",dayOfWeek:e.days.map(n=>he[n]),opens:e.open,closes:e.close}));function _(t){var n,o;return(o=(n=new Intl.NumberFormat(E(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:n.value)!=null?o:t.currency}var K=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',J=t=>`<div class="suggest" id="market-suggest" data-suggest="${a(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${a(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${a(t.market.dismiss)}">\xD7</button>
</div>`,Z=(t,e)=>{var n;return`<p class="status" data-open-status data-hours='${a(JSON.stringify(t.hours))}' data-tz="${a((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${a(e.visit.open)}" data-closed="${a(e.visit.closed)}" hidden></p>`},I={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ue=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,me=t=>{var e;try{let n=new URL(String((e=t.googleReview)!=null?e:"").trim());return n.protocol==="https:"&&ue.test(n.hostname)?n.href:""}catch{return""}},Y=(t,e,n,o="btn btn--line")=>{var i;let r=me(t);if(!r)return"";let l=typeof e.reviews=="object"&&((i=e.reviews)==null?void 0:i.google)||I[n]||I.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${a(r)}" target="_blank" rel="noopener">${m("star",16)} ${a(l)}</a></p>`},T={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},X={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},Q=t=>{var e;return((e=t.reviews)!=null?e:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ee(t,e){var l,i,s;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((l=t==null?void 0:t.date)!=null?l:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((i=n[3])!=null?i:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((s=X[e])!=null?s:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${a(t.date)}">${a(r)}</time>`}function ge(t,e){var i,s;let n=t.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let o=n.reduce((c,p)=>c+Number(p.rating),0)/n.length,r=(i=T[e])!=null?i:T.en,l=new Intl.NumberFormat((s=X[e])!=null?s:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${l}</strong><span>\xB7</span><span>${a(r.count.replace("{n}",String(t.length)))}</span></p>`}function te(t,e,n,o){var i;if(!t.length)return"";let r=(i=T[e])!=null?i:T.en,l=s=>`<button type="button" class="rv-btn" data-rv-${s} aria-label="${a(s==="prev"?r.prev:r.next)}">${m("arrow",18,s==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ge(t,e)}<div class="rv" data-rv data-rv-more="${a(r.more)}" data-rv-less="${a(r.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(o).join("")}</div>
      <div class="rv-nav" hidden>${l("prev")}${l("next")}</div>
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
upd()}})()<\/script>`;var ae=(t,e,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${a(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${a(e.footer.madeWith)}</a>`;function ne({site:t,markets:e,url:n,abs:o}){var i;let r=(i=e.find(s=>s.default))!=null?i:e[0],l=e.map(s=>({id:s.id,lang:s.lang,country:s.country}));return`<!doctype html>
<html lang="${a(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${a(t.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${e.map(s=>`<link rel="alternate" hreflang="${a(s.lang)}-${a(s.country)}" href="${o(`${s.id}/`)}">`).join(`
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
<body><p>${e.map(s=>`<a href="${n(`${s.id}/`)}">${a(s.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ve="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,600&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",q=16,be=["art","sparkle","solid","spa"],V=t=>`N-${String(t+1).padStart(3,"0")}`;function ye(t,e){return t.products.map(n=>{var o;return{...n,variants:((o=n.variants)!=null?o:[]).map(r=>({...r,price:A(r,e)})).filter(r=>r.price!=null)}}).filter(n=>n.variants.length>0)}function We({site:t,catalog:e,i18n:n,template:o,basePath:r="/",siteUrl:l=t.domain}){let i=O(r),s=g=>new URL(i(g),l).href,c=e.markets,p=H(t.bookingForm),u=p&&!p.error?p:null,h=c.map(g=>{var v,b,y,d;let $=g.lang,z=(b=(v=n[$])!=null?v:n.en)!=null?b:n.vi,x=f=>R(f,$,"en"),N=ye(e,g),M=(d=(y=t.bookingChannels)==null?void 0:y[g.id])!=null?d:["phone"],k={site:t,catalog:e,market:g,markets:c,lang:$,t:z,L:x,url:i,abs:s,services:N,channels:M,money:f=>F(f,g),vlabel:f=>x(f.label)||(f.minutes?`${f.minutes}\u2032`:""),template:o,gform:u};return{path:`${g.id}/index.html`,html:$e(k)}});return h.push({path:"index.html",html:ne({site:t,markets:c,url:i,abs:s})}),h}var oe=t=>{var e;return((e=t.heroImages)!=null?e:[]).filter(n=>n==null?void 0:n.image).slice(0,3)};function $e(t){var M,P,j,k,v,b,y;let{site:e,market:n,markets:o,lang:r,t:l,L:i,url:s,abs:c,channels:p}=t,u=`${e.name} \xB7 ${i(e.tagline)}`,h=(M=e.theme)!=null?M:{},g=["primary","ink","bg","surface","soft","accent"].filter(d=>h[d]).map(d=>`--${d}:${h[d]}`).join(";"),$=(P=o.find(d=>d.default))!=null?P:o[0],z=o.map(d=>({id:d.id,lang:d.lang,country:d.country,currency:d.currency,href:s(`${d.id}/`)})),x=(j=e.contact)!=null?j:{},N=(v=(k=oe(e)[0])==null?void 0:k.image)!=null?v:"photos/hero-1.webp";return`<!doctype html>
<html lang="${a(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${a(u)}</title>
<meta name="description" content="${a(i(e.intro))}">
<link rel="canonical" href="${c(`${n.id}/`)}">
${o.map(d=>`<link rel="alternate" hreflang="${a(d.lang)}-${a(d.country)}" href="${c(`${d.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${$.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${a(u)}">
<meta property="og:description" content="${a(i(e.intro))}">
<meta property="og:url" content="${c(`${n.id}/`)}">
<meta property="og:site_name" content="${a(e.name)}">
<meta property="og:image" content="${a(new URL(w(s,N),c("")).href)}">
<meta name="theme-color" content="${a((b=h.primary)!=null?b:"#C2457A")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ve}">
<link rel="stylesheet" href="${s("assets/style.css")}">
<style>:root{${g}}</style>
<noscript><style>.gallery .more{display:block}.g-more,.chips{display:none}</style></noscript>
${G(Re(t))}
<script src="${s("assets/site.js")}" defer><\/script>
</head>
<body data-market="${a(n.id)}" data-markets='${a(JSON.stringify(z))}' data-wa="${a(S(x.whatsapp))}" data-email="${a((y=x.email)!=null?y:"")}" data-copied="${a(l.booking.copied)}">
<a class="skip" href="#main">${a(l.skip)}</a>
${J(l)}
${xe(t)}
<main id="main">
${ke(t)}
${we(t)}
${Me(t)}
${De(t)}
${Se(t)}
${ze(t)}
${Ne(t)}
${Pe(t)}
${je(t)}
${Ce(t)}
</main>
${Te(t)}
<nav class="dock" aria-label="${a(l.nav.book)}">
  <a href="#gallery">${m("star",20)}<span>${a(l.nav.gallery)}</span></a>
  <a class="primary" href="#booking">${m("calendar",20)}<span>${a(l.nav.book)}</span></a>
</nav>
</body>
</html>
`}function xe({site:t,market:e,markets:n,t:o,url:r}){let l=[["#gallery",o.nav.gallery],["#prices",o.nav.prices],["#visit",o.nav.visit]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${e.id}/`)}">
      ${t.logo?`<img src="${a(w(r,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${a((t.name||"N").trim()[0])}</span>`}
      <span>${a(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${l.map(([i,s])=>`<a href="${i}">${a(s)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${a(o.market.label)}">${m("globe",18)}<span>${a(e.id.toUpperCase())}<span class="cur"> \xB7 ${a(_(e))}</span></span></summary>
        <ul>${n.map(i=>`<li><a href="${r(`${i.id}/`)}" hreflang="${a(i.lang)}"${i.id===e.id?' aria-current="true"':""}>${a(i.country)} \xB7 ${a(i.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-sm" href="#booking">${a(o.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${a(o.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${[...l,["#booking",o.nav.book]].map(([i,s])=>`<a href="${i}">${a(s)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ke(t){var c,p,u;let{site:e,t:n,L:o,url:r}=t,l=oe(e),i=(c=e.hours)==null?void 0:c[0],s=((p=e.gallery)!=null?p:[]).filter(h=>h==null?void 0:h.image).length;return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${o(e.place)?`<p class="eyebrow">${a(o(e.place))}</p>`:""}
      <h1>${a(o(e.tagline))}</h1>
      ${o(e.intro)?`<p class="lead">${a(o(e.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#booking">${m("calendar",18)} ${a(n.hero.book)}</a>
        ${s?`<a class="btn btn--line btn--lg" href="#gallery">${a(n.hero.gallery.replace("{n}",s))}</a>`:""}
      </div>
      <ul class="facts">
        ${i?`<li>${m("clock",18)} ${a(i.open)} \u2013 ${a(i.close)}</li>`:""}
        ${o((u=e.contact)==null?void 0:u.address)?`<li>${m("pin",18)} ${a(o(e.contact.address))}</li>`:""}
      </ul>
    </div>
    <div class="stack" aria-hidden="${l.length?"false":"true"}">${l.map((h,g)=>`<figure class="pic pic--${g}"><img src="${a(w(r,h.image))}" alt="${a(`${e.name} ${g+1}`)}" width="900" height="900"${g===0?' fetchpriority="high"':' loading="lazy"'}></figure>`).join("")}</div>
  </div>
</section>`}function we({site:t,L:e}){let n=t.offer;return!n||!e(n.title)?"":`<aside class="offer" aria-label="${a(e(n.title))}">
  <div class="wrap offer-in">${m("star",20)}<strong>${a(e(n.title))}</strong>${e(n.text)?`<span>${a(e(n.text))}</span>`:""}</div>
</aside>`}function Me({site:t,t:e,url:n}){var i;let o=((i=t.gallery)!=null?i:[]).filter(s=>s==null?void 0:s.image);if(!o.length)return"";let r=s=>o.filter(c=>c.style===s).length,l=[["",e.gallery.all,o.length],...be.filter(r).map(s=>[s,e.gallery.styles[s],r(s)])];return`<section class="section" id="gallery" aria-labelledby="gal-title">
  <div class="wrap">
    <div class="head">
      <h2 id="gal-title" class="h2">${a(e.gallery.title)}</h2>
      <p class="muted">${a(e.gallery.text)}</p>
    </div>
    ${l.length>2?`<div class="chips" role="group" aria-label="${a(e.gallery.filter)}">${l.map(([s,c,p],u)=>`<button type="button" class="chip" data-style="${s}" aria-pressed="${u===0}">${a(c)} <span>${p}</span></button>`).join("")}</div>`:""}
    <div class="gallery" data-gallery>${o.map((s,c)=>{var u;let p=a(w(n,s.image));return`<a class="tile${c>=q?" more":""}" href="${p}" data-i="${c}" data-code="${V(c)}" data-s="${a((u=s.style)!=null?u:"")}"><img sizes="auto, (max-width: 640px) 50vw, 280px" src="${p}" alt="${a(`${e.gallery.design} ${V(c)}`)}" width="900" height="900" loading="lazy"><span class="code">${V(c)}</span></a>`}).join("")}</div>
    ${o.length>q?`<p class="center"><button type="button" class="btn btn--line g-more" data-more>${a(e.gallery.more)} <span data-left>(${o.length-q})</span></button></p>`:""}
  </div>
  <dialog class="lb" data-lightbox aria-label="${a(e.gallery.title)}">
    <img alt="" data-lb-img>
    <div class="lb-bar">
      <span class="lb-code" data-lb-code></span>
      <a class="btn btn--primary" href="#booking" data-lb-book>${m("calendar",18)} ${a(e.gallery.book)}</a>
    </div>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${a(e.gallery.close)}">\u2715</button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${a(e.gallery.prev)}">${m("arrow",22,'style="transform:scaleX(-1)"')}</button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${a(e.gallery.next)}">${m("arrow",22)}</button>
  </dialog>
</section>`}function De({services:t,t:e,L:n,url:o,money:r}){let l=t.filter(i=>i.featured&&i.image).slice(0,4);return l.length?`<section class="section section--soft" id="services" aria-labelledby="feat-title">
  <div class="wrap">
    <h2 id="feat-title" class="h2">${a(e.featured.title)}</h2>
    <div class="feat">${l.map(i=>`<article class="feat-card">
      <figure><img sizes="auto, (max-width: 640px) 100vw, 280px" src="${a(w(o,i.image))}" alt="${a(n(i.name))}" width="900" height="900" loading="lazy">${i.badge?`<span class="badge">${a(n(i.badge))}</span>`:""}</figure>
      <h3>${a(n(i.name))}</h3>
      ${n(i.description)?`<p class="muted">${a(n(i.description))}</p>`:""}
      <p class="from">${e.featured.from.replace("{price}",`<strong>${a(r(Math.min(...i.variants.map(s=>s.price))))}</strong>`)}</p>
    </article>`).join("")}</div>
  </div>
</section>`:""}function Se({services:t,catalog:e,t:n,L:o,money:r,vlabel:l}){var s;let i=((s=e.categories)!=null?s:[]).filter(c=>t.some(p=>p.category===c.id));return i.length?`<section class="section" id="prices" aria-labelledby="price-title">
  <div class="wrap">
    <div class="head"><h2 id="price-title" class="h2">${a(n.prices.title)}</h2><p class="muted">${a(n.prices.note)}</p></div>
    <div class="menu">${i.map(c=>`<div class="menu-cat">
      <h3>${a(o(c.name))}</h3>
      <ul>${t.filter(p=>p.category===c.id).map(p=>`<li class="item">
        <div class="item-head"><span class="item-name">${a(o(p.name))}</span>${p.badge?`<span class="pill">${a(o(p.badge))}</span>`:""}</div>
        ${o(p.description)?`<p class="item-desc muted">${a(o(p.description))}</p>`:""}
        <dl class="rates">${p.variants.map(u=>`<div><dt>${a(l(u))}</dt><dd>${a(r(u.price))}</dd></div>`).join("")}</dl>
      </li>`).join("")}</ul>
    </div>`).join("")}</div>
  </div>
</section>`:""}function ze({site:t,t:e,L:n,url:o}){var i,s;let r=((i=t.promises)!=null?i:[]).filter(c=>n(c==null?void 0:c.title)),l=((s=t.salonImages)!=null?s:[]).filter(c=>c==null?void 0:c.image).slice(0,3);return!r.length&&!l.length?"":`<section class="section section--ink" aria-labelledby="prom-title">
  <div class="wrap prom">
    <div>
      <h2 id="prom-title" class="h2">${a(e.promises.title)}</h2>
      <ul class="prom-list">${r.map(c=>{var p;return`<li><span class="prom-i">${m((p=c.icon)!=null?p:"star",22)}</span><div><h3>${a(n(c.title))}</h3>${n(c.text)?`<p>${a(n(c.text))}</p>`:""}</div></li>`}).join("")}</ul>
    </div>
    ${l.length?`<div class="salon">${l.map((c,p)=>`<img sizes="auto, (max-width: 640px) 33vw, 260px" src="${a(w(o,c.image))}" alt="${a(`${t.name} ${e.promises.salon} ${p+1}`)}" width="900" height="900" loading="lazy">`).join("")}</div>`:""}
  </div>
</section>`}function Ne({site:t,t:e,L:n,lang:o}){let r=Y(t,e,o,"btn btn--line"),l=Q(t);return t.showReviews===!1||!l.length&&!r?"":`<section class="section section--soft" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${a(e.reviews)}</h2>
    ${te(l,o,"quotes",i=>`<figure class="quote">
      ${i.rating?`<div class="stars" aria-label="${i.rating}/5">${Array.from({length:5},(s,c)=>`<span class="${c<i.rating?"on":""}">${m("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${a(n(i.text))}</blockquote>
      <figcaption>${a(i.name)}${ee(i,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Pe({site:t,t:e,L:n,services:o,channels:r,money:l,vlabel:i,catalog:s,gform:c}){var k,v,b,y;let p=e.booking,u=(k=t.contact)!=null?k:{},h=(b=(v=t.hours)==null?void 0:v[0])!=null?b:{open:"09:00",close:"21:00"},g=[],[$,z]=h.open.split(":").map(Number),[x,N]=h.close.split(":").map(Number);for(let d=$*60+z;d<=x*60+N-60;d+=30)g.push(`${String(Math.floor(d/60)).padStart(2,"0")}:${String(d%60).padStart(2,"0")}`);let M=((y=s.categories)!=null?y:[]).filter(d=>o.some(f=>f.category===d.id)),P=c?` data-gform="${a(c.action)}" data-gmap='${a(JSON.stringify(c.fields))}'`:"",j=r.map((d,f)=>{var D;return`<button type="button" class="btn ${f===0?"btn--primary":"btn--line"}" data-channel="${a(d)}" data-href="${a(L(d,u,""))}">${m(d,18)} ${a((D=e.via[d])!=null?D:d)}</button>`}).join("");return`<section class="section" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="booking-copy">
      <h2 id="book-title" class="h2">${a(p.title)}</h2>
      <p class="lead">${a(p.text)}</p>
      <div class="actions">${r.map(d=>{var f;return`<a class="btn btn--line" href="${a(L(d,u))}" ${K(d)}>${m(d,18)} ${a((f=e.via[d])!=null?f:d)}</a>`}).join("")}</div>
    </div>
    <form class="card form" data-book novalidate${P} data-order-text="${a(p.message)}">
      <div class="book-fields">
        <div class="row2">
          <label class="field"><span>${a(p.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${a(p.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${a(p.service)}</span><select name="product">
          ${M.map(d=>`<optgroup label="${a(n(d.name))}">${o.filter(f=>f.category===d.id).flatMap(f=>f.variants.map(D=>{let B=`${n(f.name)} \xB7 ${i(D)}`;return`<option value="${a(B)}" data-price="${a(l(D.price))}">${a(B)} \xB7 ${a(l(D.price))}</option>`})).join("")}</optgroup>`).join("")}
        </select></label>
        <label class="field"><span>${a(p.design)}</span><input name="size" data-design placeholder="${a(p.designHint)}" maxlength="40"></label>
        <div class="row2">
          <label class="field"><span>${a(p.date)}</span><input name="day" type="date"></label>
          <label class="field"><span>${a(p.time)}</span><select name="time">${g.map(d=>`<option>${d}</option>`).join("")}</select></label>
        </div>
        <label class="field"><span>${a(p.note)}</span><textarea name="note" rows="2" maxlength="400"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${a(p.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${a(p.sending)}">${m("calendar",18)} ${a(p.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m(c?"check":"arrow",22)} ${a(c?p.done:p.stepTitle)}</p>
        <p>${a(c?p.doneText:p.stepText)}</p>
        ${c?"":`<div class="buy">${j}</div><button type="button" class="link" data-edit>${a(p.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function je({site:t,t:e,L:n}){var i,s,c;let o=(i=t.contact)!=null?i:{},r=encodeURIComponent((s=o.mapQuery)!=null?s:n(o.address)),l=p=>p.length===7?e.everyDay:U(p,e.days);return`<section class="section section--soft" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${a(e.visit.title)}</h2>
      ${Z(t,e)}
      ${((c=t.hours)!=null?c:[]).length?`<table class="hours"><tbody>${t.hours.map(p=>`<tr><th scope="row">${a(l(p.days))}</th><td>${a(p.open)} \u2013 ${a(p.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(o.address)?`<p class="addr">${m("pin",18)} ${a(n(o.address))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${a(e.visit.directions)} ${m("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${a(e.visit.title)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ce({site:t,t:e,L:n}){var r;let o=((r=t.faq)!=null?r:[]).filter(l=>n(l==null?void 0:l.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${a(e.faq.title)}</h2>
    <div class="qa">${o.map((l,i)=>`<details${i===0?" open":""}><summary>${a(n(l.q))}</summary><p>${a(n(l.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Te({site:t,t:e,L:n,market:o}){var i,s;let r=(i=t.contact)!=null?i:{},l=Object.entries((s=t.social)!=null?s:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${a(t.name)}</p><p class="muted">${a(n(t.tagline))}</p></div>
    <div><p class="foot-h">${a(e.footer.contact)}</p><ul>
      ${r.phone?`<li><a href="tel:${S(r.phone)}">${a(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${a(r.email)}">${a(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${a(n(r.address))}</li>`:""}</ul></div>
    ${l.length?`<div><p class="foot-h">${a(e.footer.follow)}</p><ul>${l.map(([c,p])=>`<li><a href="${a(p)}" target="_blank" rel="noopener">${a(c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${a(t.name)}</span>${ae(t,e,o.lang)}</div>
</footer>`}function Re({site:t,market:e,L:n,abs:o,services:r,catalog:l}){var s,c,p;let i=(s=t.contact)!=null?s:{};return{"@context":"https://schema.org","@type":"NailSalon",name:t.name,url:o(`${e.id}/`),description:n(t.intro),telephone:i.phone,email:i.email,address:{"@type":"PostalAddress",streetAddress:n(i.address)},currenciesAccepted:e.currency,openingHoursSpecification:W((c=t.hours)!=null?c:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:t.name,itemListElement:((p=l.categories)!=null?p:[]).filter(u=>r.some(h=>h.category===u.id)).map(u=>({"@type":"OfferCatalog",name:n(u.name),itemListElement:r.filter(h=>h.category===u.id).flatMap(h=>h.variants.map(g=>({"@type":"Offer",name:`${n(h.name)} (${n(g.label)||g.minutes||""})`,price:g.price,priceCurrency:e.currency,itemOffered:{"@type":"Service",name:n(h.name),description:n(h.description)}})))}))}}}export{We as renderSite};
