var re={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>re[a]);function q(t,a,n="vi"){var o,s,r;return t==null?"":typeof t!="object"?String(t):(r=(s=(o=t[a])!=null?o:t[n])!=null?s:Object.values(t)[0])!=null?r:""}var se={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},A=t=>{var a;return(a=se[t])!=null?a:"en-US"};function ie(t,a="1"){if(a==="0.99")return Math.max(.99,Math.ceil(t)-.01);let n=Number(a)||1;return Math.max(n,Math.round(t/n)*n)}function F(t,a){var o,s;if(a.default)return t.basePrice;let n=(s=(o=t.prices)==null?void 0:o[a.id])!=null?s:{mode:"auto"};return n.mode==="hidden"?null:n.mode==="manual"?n.amount:ie(t.basePrice*a.rate,a.rounding)}var le=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function G(t,a){let n={style:"currency",currency:a.currency};return le.has(a.currency)&&(n.maximumFractionDigits=0),new Intl.NumberFormat(A(a.lang),n).format(t)}function H(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var ce=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,j=(t,a)=>{let n=ce(a);return n==null?a:t(n)},$=(t="")=>String(t).replace(/\D/g,"");function C(t,a,n=""){switch(t){case"phone":return`tel:${$(a.phone)}`;case"zalo":return`https://zalo.me/${$(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${$(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var U=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function I(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[s,r]of a.searchParams){if(!/^entry\.\d+$/.test(s))continue;let l=r.trim().replace(/^\{|\}$/g,"").toLowerCase();pe.includes(l)&&(o[l]=s)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var de={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},f=(t,a=20,n="")=>{var o;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=de[t])!=null?o:""}</svg>`},T=[1,2,3,4,5,6,0],he=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function _(t,a){let n=t.map(s=>T.indexOf(s)).sort((s,r)=>s-r);return n.every((s,r)=>r===0||s===n[r-1]+1)&&n.length>2?`${a[T[n[0]]]} \u2013 ${a[T[n.at(-1)]]}`:n.map(s=>a[T[s]]).join(", ")}var K=t=>t.map(a=>({"@type":"OpeningHoursSpecification",dayOfWeek:a.days.map(n=>he[n]),opens:a.open,closes:a.close}));function J(t){var n,o;return(o=(n=new Intl.NumberFormat(A(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:n.value)!=null?o:t.currency}var B=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',Z=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,V=(t,a)=>{var n;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((n=t.timezone)!=null?n:"Asia/Ho_Chi_Minh")}" data-open="${e(a.visit.open)}" data-closed="${e(a.visit.closed)}" hidden></p>`},W={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ue=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,me=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&ue.test(n.hostname)?n.href:""}catch{return""}},Y=(t,a,n,o="btn btn--line")=>{var l;let s=me(t);if(!s)return"";let r=typeof a.reviews=="object"&&((l=a.reviews)==null?void 0:l.google)||W[n]||W.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(s)}" target="_blank" rel="noopener">${f("star",16)} ${e(r)}</a></p>`},R={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},X={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},Q=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function ee(t,a){var r,l,i;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((r=t==null?void 0:t.date)!=null?r:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(o.getTime()))return"";let s=new Intl.DateTimeFormat((i=X[a])!=null?i:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(t.date)}">${e(s)}</time>`}function ge(t,a){var l,i;let n=t.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let o=n.reduce((c,u)=>c+Number(u.rating),0)/n.length,s=(l=R[a])!=null?l:R.en,r=new Intl.NumberFormat((i=X[a])!=null?i:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${f("star",18)}</span><strong>${r}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(t.length)))}</span></p>`}function te(t,a,n,o){var l;if(!t.length)return"";let s=(l=R[a])!=null?l:R.en,r=i=>`<button type="button" class="rv-btn" data-rv-${i} aria-label="${e(i==="prev"?s.prev:s.next)}">${f("arrow",18,i==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ge(t,a)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(o).join("")}</div>
      <div class="rv-nav" hidden>${r("prev")}${r("next")}</div>
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
upd()}})()<\/script>`;var ae=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function ne({site:t,markets:a,url:n,abs:o}){var l;let s=(l=a.find(i=>i.default))!=null?l:a[0],r=a.map(i=>({id:i.id,lang:i.lang,country:i.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${o(`${s.id}/`)}">
${a.map(i=>`<link rel="alternate" hreflang="${e(i.lang)}-${e(i.country)}" href="${o(`${i.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(r)}, root = ${JSON.stringify(n(""))};
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
`}var be="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",L=12,ve=["shop","engine","wheel","body","care"],ye=["US","GB","LR","MM"],oe={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"};function $e(t,a){var n;return((n=t.products)!=null?n:[]).map(o=>{var s;return{...o,variants:((s=o.variants)!=null?s:[]).map(r=>({...r,price:F(r,a)})).filter(r=>r.price!=null)}}).filter(o=>o.variants.length>0)}function Ye({site:t,catalog:a,i18n:n,template:o,basePath:s="/",siteUrl:r=t.domain}){let l=H(s),i=p=>new URL(l(p),r).href,c=a.markets,u=I(t.bookingForm),d=u&&!u.error?u:null,h=c.map(p=>{var k,x,m,g,P;let v=p.lang,b=(x=(k=n[v])!=null?k:n.en)!=null?x:n.vi,y=w=>q(w,v,"en"),D=$e(a,p),S=((m=t.carTypes)!=null?m:[]).filter(w=>(w==null?void 0:w.id)&&y(w.label)),z=(P=(g=t.bookingChannels)==null?void 0:g[p.id])!=null?P:["phone"],M={site:t,catalog:a,market:p,markets:c,lang:v,t:b,L:y,url:l,abs:i,services:D,cars:S,channels:z,money:w=>G(w,p),template:o,gform:d};return{path:`${p.id}/index.html`,html:xe(M)}});return h.push({path:"index.html",html:ne({site:t,markets:c,url:l,abs:i})}),h}var O=(t,a)=>t.heroImage?j(a,t.heroImage):a("assets/photos/hero.webp"),ke=t=>Math.min(...t.variants.map(a=>a.price)),E=t=>{var a,n;return((a=t.rescue)==null?void 0:a.phone)||((n=t.contact)==null?void 0:n.phone)||""};function xe(t){var D,S,z,N,M,k,x,m;let{site:a,market:n,markets:o,lang:s,t:r,L:l,url:i,abs:c}=t,u=`${a.name} \xB7 ${l(a.tagline)}`,d=(D=a.theme)!=null?D:{},h=["primary","ink","bg","surface","soft","accent"].filter(g=>d[g]).map(g=>`--${g}:${d[g]}`).join(";"),p=(S=o.find(g=>g.default))!=null?S:o[0],v=o.map(g=>({id:g.id,lang:g.lang,country:g.country,currency:g.currency,href:i(`${g.id}/`)})),b=(z=a.contact)!=null?z:{},y=E(a);return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(u)}</title>
<meta name="description" content="${e(l(a.intro))}">
<link rel="canonical" href="${c(`${n.id}/`)}">
${o.map(g=>`<link rel="alternate" hreflang="${e(g.lang)}-${e(g.country)}" href="${c(`${g.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${p.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(u)}">
<meta property="og:description" content="${e(l(a.intro))}">
<meta property="og:url" content="${c(`${n.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(new URL(O(a,i),c("")).href)}">
<meta name="theme-color" content="${e((N=d.ink)!=null?N:"#16191E")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${be}">
<link rel="stylesheet" href="${i("assets/style.css")}">
<style>:root{${h}}</style>
<noscript><style>.album .more{display:block}.album-more,.chips,.km-form{display:none}</style></noscript>
${U(Ve(t))}
<script src="${i("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(v))}' data-wa="${e($(b.whatsapp))}" data-email="${e((M=b.email)!=null?M:"")}" data-copied="${e(r.booking.copied)}" data-tz="${e((k=a.timezone)!=null?k:"Asia/Ho_Chi_Minh")}" data-locale="${e((x=oe[s])!=null?x:s)}">
<a class="skip" href="#main">${e(r.skip)}</a>
${Z(r)}
${we(t)}
<main id="main">
${Me(t)}
${De(t)}
${Se(t)}
${ze(t)}
${Ne(t)}
${Pe(t)}
${je(t)}
${Ce(t)}
${Te(t)}
${Re(t)}
${Ee(t)}
${qe(t)}
${Ae(t)}
</main>
${Be(t)}
<nav class="dock" aria-label="${e(r.nav.book)}">
  ${y?`<a class="sos" href="tel:${$(y)}">${f("phone",20)}<span>${e(r.rescue.short)}</span></a>`:`<a href="${e(C(t.channels[0],b))}" ${B(t.channels[0])}>${f(t.channels[0],20)}<span>${e((m=r.via[t.channels[0]])!=null?m:"")}</span></a>`}
  <a class="primary" href="#booking">${f("calendar",20)}<span>${e(r.nav.book)}</span></a>
</nav>
</body>
</html>
`}function we({site:t,market:a,markets:n,t:o,url:s}){let r=[["#services",o.nav.services],["#prices",o.nav.prices],["#maintenance",o.nav.maintenance],["#team",o.nav.team],["#visit",o.nav.visit]],l=E(t);return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${s(`${a.id}/`)}">
      ${t.logo?`<img src="${e(j(s,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${f("wrench",22)}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${r.map(([i,c])=>`<a href="${i}">${e(c)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${l?`<a class="hotline hide-md" href="tel:${$(l)}"><small>${e(o.rescue.short)}</small><b>${e(l)}</b></a>`:""}
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${f("globe",18)}<span>${e(a.id.toUpperCase())}<span class="cur"> \xB7 ${e(J(a))}</span></span></summary>
        <ul>${n.map(i=>`<li><a href="${s(`${i.id}/`)}" hreflang="${e(i.lang)}"${i.id===a.id?' aria-current="true"':""}>${e(i.country)} \xB7 ${e(i.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-sm" href="#booking">${e(o.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${f("menu",22)}</summary>
        <nav aria-label="Menu">${[...r,["#booking",o.nav.book]].map(([i,c])=>`<a href="${i}">${e(c)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Me({site:t,t:a,L:n,url:o}){var l;let s=((l=t.stats)!=null?l:[]).filter(i=>i==null?void 0:i.value),r=E(t);return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${n(t.place)?`<p class="eyebrow">${f("wrench",16)} ${e(n(t.place))}</p>`:""}
      <h1>${e(n(t.tagline))}</h1>
      ${n(t.intro)?`<p class="lead">${e(n(t.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--primary btn--lg" href="#booking">${f("calendar",18)} ${e(a.hero.book)}</a>
        ${r?`<a class="btn btn--sos btn--lg" href="tel:${$(r)}">${f("phone",18)} ${e(a.rescue.call)}</a>`:""}
      </div>
      ${V(t,a)}
    </div>
    <figure class="hero-img">
      <img src="${e(O(t,o))}" alt="${e(t.name)}" width="1200" height="900" fetchpriority="high">
    </figure>
  </div>
  ${s.length?`<div class="stats-bar"><ul class="wrap stats">${s.map(i=>`<li><b>${e(i.value)}</b><span>${e(n(i.label))}</span></li>`).join("")}</ul></div>`:""}
</section>`}function De({site:t,t:a,L:n}){var s;let o=((s=t.promises)!=null?s:[]).filter(r=>n(r==null?void 0:r.title));return o.length?`<section class="section section--soft" aria-labelledby="prom-title">
  <div class="wrap">
    <h2 id="prom-title" class="h2">${e(a.promises.title)}</h2>
    <ul class="prom">${o.map((r,l)=>{var i;return`<li><span class="prom-n">${String(l+1).padStart(2,"0")}</span><span class="prom-i">${f((i=r.icon)!=null?i:"check",24)}</span><h3>${e(n(r.title))}</h3>${n(r.text)?`<p class="muted">${e(n(r.text))}</p>`:""}</li>`}).join("")}</ul>
  </div>
</section>`:""}function Se({services:t,t:a,L:n,url:o,money:s}){let r=t.filter(l=>l.featured&&l.image).slice(0,6);return r.length?`<section class="section" id="services" aria-labelledby="feat-title">
  <div class="wrap">
    <div class="head"><h2 id="feat-title" class="h2">${e(a.services.title)}</h2><p class="muted">${e(a.services.text)}</p></div>
    <div class="feat">${r.map(l=>`<article class="feat-card">
      <figure><img sizes="auto, (max-width: 640px) 100vw, 380px" src="${e(j(o,l.image))}" alt="${e(n(l.name))}" width="1000" height="750" loading="lazy">${n(l.tag)?`<span class="tag">${e(n(l.tag))}</span>`:""}</figure>
      <div class="feat-body">
        <h3>${e(n(l.name))}</h3>
        ${n(l.description)?`<p class="muted">${e(n(l.description))}</p>`:""}
        <div class="feat-foot">
          <p class="from">${a.services.from.replace("{price}",`<strong>${e(s(ke(l)))}</strong>`)}</p>
          <button type="button" class="btn btn--sm btn--line" data-pick="${e(l.id)}">${e(a.services.book)} ${f("arrow",14)}</button>
        </div>
      </div>
    </article>`).join("")}</div>
  </div>
</section>`:""}function ze({services:t,catalog:a,cars:n,t:o,L:s,money:r}){var d;let l=((d=a.categories)!=null?d:[]).filter(h=>t.some(p=>p.category===h.id));if(!l.length)return"";let i=n.filter(h=>t.some(p=>p.variants.some(v=>v.car===h.id))),c=(h,p)=>{let v=h.variants.find(b=>b.car===p.id);return`<td class="c c-${e(p.id)}" data-car="${e(p.id)}" data-label="${e(s(p.label))}">${v?e(r(v.price)):'<span class="na">\u2014</span>'}</td>`},u=h=>{let p=h.variants.filter(b=>!b.car),v=`<th scope="row"><span class="nm">${e(s(h.name))}</span>${s(h.unit)?`<small>${e(s(h.unit))}</small>`:""}</th>`;return!i.length||p.length&&!h.variants.some(b=>b.car)?`<tr>${v}<td class="all" colspan="${Math.max(1,i.length)}">${e(r(p[0].price))}${s(p[0].label)?` <small>${e(s(p[0].label))}</small>`:""}</td></tr>`:`<tr>${v}${i.map(b=>c(h,b)).join("")}</tr>`};return`<section class="section section--soft" id="prices" aria-labelledby="price-title">
  <div class="wrap">
    <div class="head"><h2 id="price-title" class="h2">${e(o.prices.title)}</h2><p class="muted">${e(o.prices.note)}</p></div>
    ${i.length>1?`<div class="chips" role="group" aria-label="${e(o.prices.car)}"><span class="chips-l">${e(o.prices.car)}</span>${i.map((h,p)=>`<button type="button" class="chip" data-car="${e(h.id)}" aria-pressed="${p===0}">${f("car",16)} ${e(s(h.label))}</button>`).join("")}</div>`:""}
    <div class="price-groups" data-prices>${l.map(h=>`<div class="pgroup">
      <table class="ptable">
        <thead><tr><th scope="col">${e(s(h.name))}</th>${i.length?i.map(p=>`<th scope="col" class="c c-${e(p.id)}" data-car="${e(p.id)}">${e(s(p.label))}</th>`).join(""):'<th scope="col"></th>'}</tr></thead>
        <tbody>${t.filter(p=>p.category===h.id).map(u).join("")}</tbody>
      </table>
    </div>`).join("")}</div>
  </div>
</section>`}function Ne({site:t,market:a,t:n,L:o}){var c,u;let s=ye.includes(a.country),r=((c=t.maintenance)!=null?c:[]).filter(d=>+(d==null?void 0:d.km)>0&&o(d.items)).sort((d,h)=>d.km-h.km).map(d=>{if(!s)return{...d,km:+d.km};let h=d.km*.621371,p=h>=2e4?2500:500;return{...d,km:Math.max(500,Math.round(h/p)*p)}});if(!r.length)return"";let l=new Intl.NumberFormat((u=oe[a.lang])!=null?u:a.lang),i=s?n.maintenance.mi:n.maintenance.km;return`<section class="section section--ink" id="maintenance" aria-labelledby="mt-title">
  <div class="wrap mt">
    <div class="mt-copy">
      <h2 id="mt-title" class="h2">${e(n.maintenance.title)}</h2>
      <p class="lead">${e(n.maintenance.text)}</p>
      <form class="km-form" data-km data-rules='${e(JSON.stringify(r.map(d=>({km:+d.km,items:o(d.items)}))))}' data-unit="${e(i)}" data-next="${e(n.maintenance.next)}" data-left="${e(n.maintenance.left)}" data-book-note="${e(n.maintenance.bookNote)}">
        <label for="km-in">${e(n.maintenance.ask)}</label>
        <div class="km-row">
          <input id="km-in" name="km" type="text" inputmode="numeric" autocomplete="off" placeholder="${e(n.maintenance.placeholder)}" maxlength="9">
          <span class="km-unit">${e(i)}</span>
          <button class="btn btn--primary" type="submit">${e(n.maintenance.check)}</button>
        </div>
        <div class="km-out" data-km-out hidden aria-live="polite">
          <p class="km-next" data-km-next></p>
          <ul class="km-items" data-km-items></ul>
          <button type="button" class="btn btn--primary" data-km-book>${f("calendar",18)} ${e(n.maintenance.book)}</button>
        </div>
      </form>
    </div>
    <ol class="mt-list">${r.map(d=>`<li data-every="${e(d.km)}"><b>${e(n.maintenance.every.replace("{n}",l.format(d.km)).replace("{unit}",i))}</b><span>${e(o(d.items))}</span></li>`).join("")}</ol>
  </div>
</section>`}function Pe({site:t,t:a,L:n}){var s;let o=((s=t.steps)!=null?s:[]).filter(r=>n(r==null?void 0:r.title));return o.length?`<section class="section" aria-labelledby="step-title">
  <div class="wrap">
    <div class="head"><h2 id="step-title" class="h2">${e(a.steps.title)}</h2><p class="muted">${e(a.steps.text)}</p></div>
    <ol class="steps">${o.map((r,l)=>{var i;return`<li><span class="step-n">${l+1}</span><span class="step-i">${f((i=r.icon)!=null?i:"check",22)}</span><h3>${e(n(r.title))}</h3>${n(r.text)?`<p class="muted">${e(n(r.text))}</p>`:""}</li>`}).join("")}</ol>
  </div>
</section>`:""}function je({site:t,t:a,L:n}){var s,r;let o=E(t);return!o||((s=t.rescue)==null?void 0:s.show)===!1?"":`<section class="rescue" aria-labelledby="sos-title">
  <div class="wrap rescue-in">
    <span class="rescue-i" aria-hidden="true">${f("truck",30)}</span>
    <div><h2 id="sos-title">${e(a.rescue.title)}</h2><p>${e(n((r=t.rescue)==null?void 0:r.text)||a.rescue.text)}</p></div>
    <a class="btn btn--light btn--lg" href="tel:${$(o)}">${f("phone",18)} ${e(o)}</a>
  </div>
</section>`}function Ce({site:t,t:a,L:n}){var r;let o=((r=t.team)!=null?r:[]).filter(l=>l==null?void 0:l.name);if(!o.length)return"";let s=l=>l.split(/\s+/).map(i=>i[0]).slice(-2).join("").toUpperCase();return`<section class="section" id="team" aria-labelledby="team-title">
  <div class="wrap">
    <h2 id="team-title" class="h2">${e(a.team.title)}</h2>
    <div class="team">${o.map((l,i)=>`<figure class="tech">
      <div class="tech-ph tone-${i%4}">${l.photo?`<img src="${e(l.photo)}" alt="${e(l.name)}" loading="lazy">`:`<span aria-hidden="true">${e(s(l.name))}</span>`}</div>
      <figcaption><strong>${e(l.name)}</strong><span>${e(n(l.role))}</span>${l.years?`<span class="muted">${e(a.team.years.replace("{n}",l.years))}</span>`:""}</figcaption>
    </figure>`).join("")}</div>
  </div>
</section>`}function Te({site:t,t:a,url:n}){var l;let o=((l=t.album)!=null?l:[]).filter(i=>i==null?void 0:i.image);if(!o.length)return"";let s=i=>o.filter(c=>c.tag===i).length,r=[["",a.album.all,o.length],...ve.filter(s).map(i=>{var c;return[i,(c=a.album.tags[i])!=null?c:i,s(i)]})];return`<section class="section section--soft" id="album" aria-labelledby="album-title">
  <div class="wrap">
    <div class="head"><h2 id="album-title" class="h2">${e(a.album.title)}</h2><p class="muted">${e(a.album.text)}</p></div>
    ${r.length>2?`<div class="chips" role="group" aria-label="${e(a.album.filter)}">${r.map(([i,c,u],d)=>`<button type="button" class="chip" data-tag="${i}" aria-pressed="${d===0}">${e(c)} <span>${u}</span></button>`).join("")}</div>`:""}
    <div class="album" data-album>${o.map((i,c)=>{var d;let u=e(j(n,i.image));return`<a class="ph${c>=L?" more":""}" href="${u}" data-i="${c}" data-t="${e((d=i.tag)!=null?d:"")}"><img sizes="auto, (max-width: 640px) 50vw, 300px" src="${u}" alt="${e(`${t.name} ${c+1}`)}" width="1000" height="750" loading="lazy"></a>`}).join("")}</div>
    ${o.length>L?`<p class="center"><button type="button" class="btn btn--line album-more" data-album-more>${e(a.album.more)} <span data-left>(${o.length-L})</span></button></p>`:""}
  </div>
  <dialog class="lb" data-lightbox aria-label="${e(a.album.title)}">
    <img alt="" data-lb-img>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${e(a.album.close)}">\u2715</button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${e(a.album.prev)}">${f("arrow",22,'style="transform:scaleX(-1)"')}</button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${e(a.album.next)}">${f("arrow",22)}</button>
    <p class="lb-count" data-lb-count></p>
  </dialog>
</section>`}function Re({site:t,t:a,L:n,lang:o}){let s=Y(t,a,o,"btn btn--line"),r=Q(t);return t.showReviews===!1||!r.length&&!s?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(a.reviews)}</h2>
    ${te(r,o,"quotes",l=>`<figure class="quote">
      ${l.rating?`<div class="stars" aria-label="${l.rating}/5">${Array.from({length:5},(i,c)=>`<span class="${c<l.rating?"on":""}">${f("star",16)}</span>`).join("")}</div>`:""}
      <blockquote>${e(n(l.text))}</blockquote>
      <figcaption>${e(l.name)}${ee(l,o)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function Ee({site:t,services:a,catalog:n,cars:o,t:s,L:r,channels:l,gform:i}){var N,M,k,x;let c=s.booking,u=(N=t.contact)!=null?N:{},d=(k=(M=t.hours)==null?void 0:M[0])!=null?k:{open:"07:30",close:"18:00"},h=[],[p,v]=d.open.split(":").map(Number),[b,y]=d.close.split(":").map(Number);for(let m=p*60+v;m<=b*60+y-60;m+=30)h.push(`${String(Math.floor(m/60)).padStart(2,"0")}:${String(m%60).padStart(2,"0")}`);let D=((x=n.categories)!=null?x:[]).filter(m=>a.some(g=>g.category===m.id)),S=i?` data-gform="${e(i.action)}" data-gmap='${e(JSON.stringify(i.fields))}'`:"",z=l.map((m,g)=>{var P;return`<button type="button" class="btn ${g===0?"btn--primary":"btn--line"}" data-channel="${e(m)}" data-href="${e(C(m,u,""))}">${f(m,18)} ${e((P=s.via[m])!=null?P:m)}</button>`}).join("");return`<section class="section section--ink" id="booking" aria-labelledby="book-title">
  <div class="wrap booking">
    <div class="booking-copy">
      <h2 id="book-title" class="h2">${e(c.title)}</h2>
      <p class="lead">${e(c.text)}</p>
      <div class="actions">${l.map(m=>{var g;return`<a class="btn btn--ghost" href="${e(C(m,u))}" ${B(m)}>${f(m,18)} ${e((g=s.via[m])!=null?g:m)}</a>`}).join("")}</div>
    </div>
    <form class="card form" data-book novalidate${S} data-order-text="${e(c.message)}">
      <div class="book-fields">
        <label class="field"><span>${e(c.service)}</span><select name="product">
          <option value="${e(c.notSure)}">${e(c.notSure)}</option>
          ${D.map(m=>`<optgroup label="${e(r(m.name))}">${a.filter(g=>g.category===m.id).map(g=>`<option value="${e(r(g.name))}" data-id="${e(g.id)}">${e(r(g.name))}</option>`).join("")}</optgroup>`).join("")}
        </select></label>
        <div class="row2">
          ${o.length?`<label class="field"><span>${e(c.car)}</span><select name="size">${o.map(m=>`<option value="${e(r(m.label))}" data-car="${e(m.id)}">${e(r(m.label))}</option>`).join("")}</select></label>`:""}
          <label class="field"><span>${e(c.model)}</span><input name="version" maxlength="60" placeholder="${e(c.modelHint)}"></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(c.date)}</span><input name="day" type="date"></label>
          <label class="field"><span>${e(c.time)}</span><select name="time">${h.map(m=>`<option>${m}</option>`).join("")}</select></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(c.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(c.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(c.note)}</span><textarea name="note" rows="2" maxlength="400" placeholder="${e(c.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(c.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${e(c.sending)}">${f("calendar",18)} ${e(c.submit)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${f(i?"check":"arrow",22)} ${e(i?c.done:c.stepTitle)}</p>
        <p>${e(i?c.doneText:c.stepText)}</p>
        ${i?"":`<div class="buy">${z}</div><button type="button" class="link" data-edit>${e(c.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function qe({site:t,t:a,L:n}){var l,i,c;let o=(l=t.contact)!=null?l:{},s=encodeURIComponent((i=o.mapQuery)!=null?i:n(o.address)),r=u=>u.length===7?a.everyDay:_(u,a.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(a.visit.title)}</h2>
      ${V(t,a)}
      ${((c=t.hours)!=null?c:[]).length?`<table class="hours"><tbody>${t.hours.map(u=>`<tr><th scope="row">${e(r(u.days))}</th><td>${e(u.open)} \u2013 ${e(u.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${n(o.address)?`<p class="addr">${f("pin",18)} ${e(n(o.address))}</p>`:""}
      <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${s}" target="_blank" rel="noopener">${e(a.visit.directions)} ${f("arrow",16)}</a>
    </div>
    <div class="map"><iframe title="${e(a.visit.title)}" src="https://www.google.com/maps?q=${s}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Ae({site:t,t:a,L:n}){var s;let o=((s=t.faq)!=null?s:[]).filter(r=>n(r==null?void 0:r.q));return o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${e(a.faq.title)}</h2>
    <div class="qa">${o.map((r,l)=>`<details${l===0?" open":""}><summary>${e(n(r.q))}</summary><p>${e(n(r.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Be({site:t,t:a,L:n,market:o}){var l,i;let s=(l=t.contact)!=null?l:{},r=Object.entries((i=t.social)!=null?i:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(n(t.tagline))}</p></div>
    <div><p class="foot-h">${e(a.footer.contact)}</p><ul>
      ${s.phone?`<li><a href="tel:${$(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${n(s.address)?`<li>${e(n(s.address))}</li>`:""}</ul></div>
    ${r.length?`<div><p class="foot-h">${e(a.footer.follow)}</p><ul>${r.map(([c,u])=>`<li><a href="${e(u)}" target="_blank" rel="noopener">${e(c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${ae(t,a,o.lang)}</div>
</footer>`}function Ve({site:t,market:a,L:n,abs:o,url:s,services:r,catalog:l,cars:i}){var d,h,p;let c=(d=t.contact)!=null?d:{},u=new Map(i.map(v=>[v.id,n(v.label)]));return{"@context":"https://schema.org","@type":"AutoRepair",name:t.name,url:o(`${a.id}/`),description:n(t.intro),image:new URL(O(t,s),o("")).href,telephone:c.phone,email:c.email,address:{"@type":"PostalAddress",streetAddress:n(c.address)},openingHoursSpecification:K((h=t.hours)!=null?h:[]),currenciesAccepted:a.currency,hasOfferCatalog:{"@type":"OfferCatalog",name:t.name,itemListElement:((p=l.categories)!=null?p:[]).filter(v=>r.some(b=>b.category===v.id)).map(v=>({"@type":"OfferCatalog",name:n(v.name),itemListElement:r.filter(b=>b.category===v.id).flatMap(b=>b.variants.map(y=>({"@type":"Offer",name:`${n(b.name)}${y.car&&u.get(y.car)?` (${u.get(y.car)})`:""}`,price:y.price,priceCurrency:a.currency,itemOffered:{"@type":"Service",name:n(b.name),description:n(b.description)}})))}))}}}export{Ye as renderSite};
