var ie={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,n=>ie[n]);function A(a,n,t="vi"){var l,i,o;return a==null?"":typeof a!="object"?String(a):(o=(i=(l=a[n])!=null?l:a[t])!=null?i:Object.values(a)[0])!=null?o:""}var le={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},B=a=>{var n;return(n=le[a])!=null?n:"en-US"};function ce(a,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(a)-.01);let t=Number(n)||1;return Math.max(t,Math.round(a/t)*t)}function G(a,n){var l,i;if(n.default)return a.basePrice;let t=(i=(l=a.prices)==null?void 0:l[n.id])!=null?i:{mode:"auto"};return t.mode==="hidden"?null:t.mode==="manual"?t.amount:ce(a.basePrice*n.rate,n.rounding)}var de=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function H(a,n){let t={style:"currency",currency:n.currency};return de.has(n.currency)&&(t.maximumFractionDigits=0),new Intl.NumberFormat(B(n.lang),t).format(a)}function I(a="/"){let n=a.endsWith("/")?a:`${a}/`;return(t="")=>n+String(t).replace(/^\//,"")}var R=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,D=(a,n)=>{let t=R(n);return t==null?n:a(t)},w=(a="")=>String(a).replace(/\D/g,"");function S(a,n,t=""){switch(a){case"phone":return`tel:${w(n.phone)}`;case"zalo":return`https://zalo.me/${w(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${w(n.whatsapp)}${t?`?text=${encodeURIComponent(t)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${t?`?subject=${encodeURIComponent(t)}`:""}`;default:return"#"}}var O=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,pe=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function U(a){if(!a||typeof a!="string")return null;let n;try{n=new URL(a.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let t=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!t)return{error:"not-google"};let l={};for(let[i,o]of n.searchParams){if(!/^entry\.\d+$/.test(i))continue;let r=o.trim().replace(/^\{|\}$/g,"").toLowerCase();pe.includes(r)&&(l[r]=i)}return Object.keys(l).length?l.phone?{action:`https://docs.google.com/forms/d/e/${t[1]}/formResponse`,fields:l}:{error:"no-phone"}:{error:"no-fields"}}var F={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var he={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(a,n=20,t="")=>{var l;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${t}>${(l=he[a])!=null?l:""}</svg>`},q=[1,2,3,4,5,6,0],ue=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function _(a,n){let t=a.map(i=>q.indexOf(i)).sort((i,o)=>i-o);return t.every((i,o)=>o===0||i===t[o-1]+1)&&t.length>2?`${n[q[t[0]]]} \u2013 ${n[q[t.at(-1)]]}`:t.map(i=>n[q[i]]).join(", ")}var K=a=>a.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(t=>ue[t]),opens:n.open,closes:n.close}));function Y(a){var t,l;return(l=(t=new Intl.NumberFormat(B(a.lang),{style:"currency",currency:a.currency}).formatToParts(0).find(i=>i.type==="currency"))==null?void 0:t.value)!=null?l:a.currency}var V=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',J=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`,Z=(a,n)=>{var t;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(a.hours))}' data-tz="${e((t=a.timezone)!=null?t:"Asia/Ho_Chi_Minh")}" data-open="${e(n.visit.open)}" data-closed="${e(n.visit.closed)}" hidden></p>`},W={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},me=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ge=a=>{var n;try{let t=new URL(String((n=a.googleReview)!=null?n:"").trim());return t.protocol==="https:"&&me.test(t.hostname)?t.href:""}catch{return""}},Q=(a,n,t,l="btn btn--line")=>{var r;let i=ge(a);if(!i)return"";let o=typeof n.reviews=="object"&&((r=n.reviews)==null?void 0:r.google)||W[t]||W.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${l}" href="${e(i)}" target="_blank" rel="noopener">${m("star",16)} ${e(o)}</a></p>`},E={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},X={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ee=a=>{var n;return((n=a.reviews)!=null?n:[]).filter(t=>t&&(t.name||t.text)&&!(typeof t.text=="object"&&t.text&&!Object.values(t.text).some(Boolean)&&!t.name))};function ae(a,n){var o,r,s;let t=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((o=a==null?void 0:a.date)!=null?o:"").trim());if(!t)return"";let l=new Date(Date.UTC(+t[1],+t[2]-1,+((r=t[3])!=null?r:1)));if(Number.isNaN(l.getTime()))return"";let i=new Intl.DateTimeFormat((s=X[n])!=null?s:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(l);return`<time class="rv-date" datetime="${e(a.date)}">${e(i)}</time>`}function fe(a,n){var r,s;let t=a.filter(c=>c.rating>=1&&c.rating<=5);if(t.length<2)return"";let l=t.reduce((c,h)=>c+Number(h.rating),0)/t.length,i=(r=E[n])!=null?r:E.en,o=new Intl.NumberFormat((s=X[n])!=null?s:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(l);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${o}</strong><span>\xB7</span><span>${e(i.count.replace("{n}",String(a.length)))}</span></p>`}function te(a,n,t,l){var r;if(!a.length)return"";let i=(r=E[n])!=null?r:E.en,o=s=>`<button type="button" class="rv-btn" data-rv-${s} aria-label="${e(s==="prev"?i.prev:i.next)}">${m("arrow",18,s==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${fe(a,n)}<div class="rv" data-rv data-rv-more="${e(i.more)}" data-rv-less="${e(i.less)}">
      <div class="${t} rv-track" tabindex="0">${a.map(l).join("")}</div>
      <div class="rv-nav" hidden>${o("prev")}${o("next")}</div>
    </div>${ve}`}var ve=`<style>
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
upd()}})()<\/script>`;var ne=(a,n,t)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(t==="vi"||t==="ja"?t:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(n.footer.madeWith)}</a>`;function oe({site:a,markets:n,url:t,abs:l}){var r;let i=(r=n.find(s=>s.default))!=null?r:n[0],o=n.map(s=>({id:s.id,lang:s.lang,country:s.country}));return`<!doctype html>
<html lang="${e(i.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${l(`${i.id}/`)}">
${n.map(s=>`<link rel="alternate" hreflang="${e(s.lang)}-${e(s.country)}" href="${l(`${s.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(o)}, root = ${JSON.stringify(t(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${n.map(s=>`<a href="${t(`${s.id}/`)}">${e(s.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var be="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap",re=6,ye=["morning","afternoon","evening"];function $e(a,n){var t;return((t=a.products)!=null?t:[]).map(l=>{var i,o,r;return{...l,min:G((o=((i=l.variants)!=null?i:[])[0])!=null?o:{},n),r:Number((r=l.rate)==null?void 0:r[n.id])||null}}).filter(l=>l.min!=null)}var ke=a=>String(a).split(/\s+/).filter(Boolean).slice(-2).map(n=>n[0]).join("").toUpperCase(),L=a=>String(a!=null?a:"").split(`
`).map(n=>n.trim()).filter(Boolean);function xe({loan:a,years:n,promo:t,promoYears:l,rate:i,method:o}){let r=Math.max(1,Math.round(n*12)),s=Math.min(r,Math.max(0,Math.round((l||0)*12))),c=a,h=0,d=[];for(let u=0;u<r;u++){let p=(u<s?t:i)/1200,g,b=c*p;if(o==="annuity"){if(u===0||u===s){let $=r-u;h=p?c*p/(1-(1+p)**-$):c/$}g=Math.min(c,h-b)}else g=Math.min(c,a/r);c=Math.max(0,c-g),d.push({p:g,i:b,bal:c})}return d}function ea({site:a,catalog:n,i18n:t,template:l,basePath:i="/",siteUrl:o=a.domain}){var p,g,b,$,k,v;let r=I(i),s=y=>new URL(r(y),o).href,c=n.markets,h=U(a.orderForm),d=h&&!h.error?h:null,u=[];for(let y of c){let x=y.lang,N=(g=(p=t[x])!=null?p:t.en)!=null?g:t.vi,z=M=>A(M,x,"en"),P=$e(n,y),j=($=(b=a.orderChannels)==null?void 0:b[y.id])!=null?$:["phone"],C=M=>H(M,y),T=M=>`${new Intl.NumberFormat(x,{maximumFractionDigits:2}).format(M)}%`,f={price:3e9,down:30,years:20,promo:6.5,promoYears:2,rate:10.5,method:"principal",...(v=(k=a.calc)==null?void 0:k[y.id])!=null?v:{}},se={site:a,catalog:n,market:y,markets:c,lang:x,t:N,L:z,url:r,abs:s,channels:j,money:C,pct:T,items:P,template:l,gform:d,calc:f};u.push({path:`${y.id}/index.html`,html:we(se)})}return u.push({path:"index.html",html:oe({site:a,markets:c,url:r,abs:s})}),u}function we(a){var v,y,x,N,z,P,j,C,T;let{site:n,market:t,markets:l,lang:i,t:o,L:r,url:s,abs:c,channels:h}=a,d=`${n.name} \xB7 ${r(n.tagline)}`,u=(v=n.theme)!=null?v:{},p=["primary","ink","bg","surface","soft","accent"].filter(f=>u[f]).map(f=>`--${f}:${u[f]}`).join(";"),g=(y=l.find(f=>f.default))!=null?y:l[0],b=l.map(f=>({id:f.id,lang:f.lang,country:f.country,currency:f.currency,href:s(`${f.id}/`)})),$=(x=n.contact)!=null?x:{},k=n.heroImage;return`<!doctype html>
<html lang="${e(i)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(d)}</title>
<meta name="description" content="${e(r(n.intro))}">
<link rel="canonical" href="${c(`${t.id}/`)}">
${l.map(f=>`<link rel="alternate" hreflang="${e(f.lang)}-${e(f.country)}" href="${c(`${f.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${g.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(d)}">
<meta property="og:description" content="${e(r(n.intro))}">
<meta property="og:url" content="${c(`${t.id}/`)}">
${k?`<meta property="og:image" content="${e(c(R(k)))}">`:""}
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((N=u.bg)!=null?N:"#121315")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${be}">
<link rel="stylesheet" href="${s("assets/style.css")}">
<style>:root{${p}}</style>
${O(Fe(a))}${((z=n.faq)!=null?z:[]).length?O(Le(a)):""}
<script src="${s("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(t.id)}" data-markets='${e(JSON.stringify(b))}' data-copied="${e(o.copied)}" data-wa="${e(w((P=$.whatsapp)!=null?P:""))}" data-email="${e((j=$.email)!=null?j:"")}" data-tz="${e((C=n.timezone)!=null?C:"Asia/Ho_Chi_Minh")}" data-currency="${e(t.currency)}" data-lang="${e(i)}">
<a class="skip" href="#main">${e(o.skip)}</a>
${J(o)}
${r(n.announcement)?`<p class="announce">${e(r(n.announcement))}</p>`:""}
${Me(a)}
<main id="main">
${[De,Se,ze,Pe,je,Ce,Te,Re,qe,Ee,Ve,Ae,Be].map(f=>f(a)).join(`
`)}
</main>
${Oe(a)}
<nav class="dock" aria-label="${e(o.nav.book)}">
  <a href="${e(S(h[0],$))}" ${V(h[0])}>${m(h[0],20)}<span>${e((T=o.via[h[0]])!=null?T:h[0])}</span></a>
  <a class="primary" href="#book">${m("calendar",20)}<span>${e(o.nav.book)}</span></a>
</nav>
</body>
</html>
`}function Me({site:a,market:n,markets:t,t:l,url:i}){let o=[["#calc",l.nav.calc],["#loans",l.nav.loans],["#steps",l.nav.steps],["#fees",l.nav.fees],["#visit",l.nav.contact]];return`<header class="header" data-header>
  <div class="wrap bar">
    <a class="brand" href="${i(`${n.id}/`)}">
      ${a.logo?`<img src="${e(D(i,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${m("key",18)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${o.map(([r,s])=>`<a href="${r}">${e(s)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${t.length>1?`<details class="market">
        <summary aria-label="${e(l.market.label)}">${m("globe",16)}<span>${e(n.id.toUpperCase())}<span class="cur"> \xB7 ${e(Y(n))}</span></span></summary>
        <ul>${t.map(r=>`<li><a href="${i(`${r.id}/`)}" hreflang="${e(r.lang)}"${r.id===n.id?' aria-current="true"':""}>${e(r.country)} \xB7 ${e(r.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#book">${e(l.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(l.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${o.map(([r,s])=>`<a href="${r}">${e(s)}</a>`).join("")}<a href="#book">${e(l.nav.book)}</a></nav>
      </details>
    </div>
  </div>
</header>`}function De({site:a,t:n,L:t,url:l}){var r;let i=a.heroImage,o=((r=a.stats)!=null?r:[]).filter(s=>t(s==null?void 0:s.value));return`<section class="hero">
  ${i?`<img class="hero-img" src="${e(D(l,i))}" alt="" width="1600" height="1000" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${t(a.heroKicker)?`<p class="kicker">${e(t(a.heroKicker))}</p>`:""}
    <h1>${e(t(a.tagline))}</h1>
    <p class="lead">${e(t(a.intro))}</p>
    <div class="actions"><a class="btn btn--accent btn--lg" href="#calc">${m("scale",18)} ${e(n.hero.calc)}</a><a class="btn btn--ghost btn--lg" href="#book">${e(n.hero.book)}</a></div>
  </div>
  ${o.length?`<div class="wrap"><ul class="stats">${o.slice(0,4).map(s=>`<li><b>${e(t(s.value))}</b><span>${e(t(s.label))}</span></li>`).join("")}</ul></div>`:""}
</section>`}function Se(a){let{t:n,L:t,site:l,money:i,pct:o,calc:r,market:s}=a,c=n.calc,h=r.price*(1-r.down/100),d=xe({loan:h,...r}),u=Math.min(d.length,Math.round(r.promoYears*12)),p=v=>v?v.p+v.i:0,g=Math.max(...d.slice(u).map(p),0),b=d.reduce((v,y)=>v+y.i,0),$=s.currency==="VND"?1e7:s.currency==="USD"||s.currency==="AUD"?1e3:100,k=(v,y,x="")=>`<input name="${v}" type="number" inputmode="decimal" value="${e(y)}" ${x} data-in="${v}">`;return`<section class="section" id="calc" aria-labelledby="calc-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(c.kicker)}</p><h2 id="calc-title" class="h2">${e(c.title)}</h2><p class="lead">${e(c.text)}</p></div>
    <div class="calc" data-calc data-money='${e(JSON.stringify({locale:a.lang,currency:s.currency}))}'>
      <form class="calc-in" onsubmit="return false">
        <label class="field field--wide"><span>${e(c.price)}</span>${k("price",r.price,`min="0" step="${$}"`)}<small class="as-money" data-show="price">${e(i(r.price))}</small></label>
        <fieldset class="field field--wide"><legend>${e(c.down)} <b data-down-v>${e(o(r.down))}</b></legend>
          <input type="range" name="down" min="10" max="90" step="5" value="${e(r.down)}" data-in="down" aria-label="${e(c.down)}">
          <small class="as-money"><span>${e(c.own)}</span> <b data-show="own">${e(i(r.price*r.down/100))}</b></small>
        </fieldset>
        <label class="field"><span>${e(c.years)}</span><select name="years" data-in="years">${[5,10,15,20,25,30,35].map(v=>`<option value="${v}"${v===Number(r.years)?" selected":""}>${e(c.yearsOpt.replace("{n}",v))}</option>`).join("")}</select></label>
        <fieldset class="field"><legend>${e(c.method)}</legend><div class="opts">
          <label class="opt"><input type="radio" name="method" value="principal"${r.method==="principal"?" checked":""} data-in="method"><span>${e(c.principal)}</span></label>
          <label class="opt"><input type="radio" name="method" value="annuity"${r.method==="annuity"?" checked":""} data-in="method"><span>${e(c.annuity)}</span></label>
        </div></fieldset>
        <div class="row3">
          <label class="field"><span>${e(c.promo)}</span>${k("promo",r.promo,'min="0" max="30" step="0.1"')}</label>
          <label class="field"><span>${e(c.promoYears)}</span>${k("promoYears",r.promoYears,'min="0" max="10" step="1"')}</label>
          <label class="field"><span>${e(c.rate)}</span>${k("rate",r.rate,'min="0" max="30" step="0.1"')}</label>
        </div>
        <p class="hint small">${m("shield",14)} ${e(t(l.calcNote)||c.note)}</p>
      </form>
      <div class="calc-out" aria-live="polite">
        <p class="out-k">${e(c.loan)}</p>
        <p class="out-big" data-out="loan">${e(i(h))}</p>
        <dl class="out">
          <div><dt>${e(c.first)}</dt><dd data-out="first">${e(i(p(d[0])))}</dd></div>
          <div data-peak-row${u?"":" hidden"}><dt>${e(c.peak)}</dt><dd data-out="peak">${e(i(g))}</dd></div>
          <div><dt>${e(c.interest)}</dt><dd data-out="interest">${e(i(b))}</dd></div>
          <div><dt>${e(c.total)}</dt><dd data-out="total">${e(i(h+b))}</dd></div>
        </dl>
        <div class="split" aria-hidden="true"><span class="split-p" data-split="p" style="width:${Math.round(h/(h+b||1)*100)}%"></span><span class="split-i"></span></div>
        <p class="legend"><span><i class="lg-p"></i>${e(c.principalL)}</span><span><i class="lg-i"></i>${e(c.interestL)}</span></p>
        <details class="years">
          <summary>${e(c.table)}</summary>
          <div class="table-wrap"><table class="yt"><thead><tr><th>${e(c.year)}</th><th>${e(c.paidP)}</th><th>${e(c.paidI)}</th><th>${e(c.balance)}</th></tr></thead><tbody data-years>${Ne(d,i)}</tbody></table></div>
        </details>
        <a class="btn btn--accent btn--lg btn--full" href="#book" data-use-calc>${m("calendar",18)} ${e(c.book)}</a>
      </div>
    </div>
  </div>
</section>`}var Ne=(a,n)=>{let t=[];for(let l=0;l*12<a.length;l++){let i=a.slice(l*12,l*12+12);t.push(`<tr><td>${l+1}</td><td>${e(n(Math.round(i.reduce((o,r)=>o+r.p,0))))}</td><td>${e(n(Math.round(i.reduce((o,r)=>o+r.i,0))))}</td><td>${e(n(Math.round(i[i.length-1].bal)))}</td></tr>`)}return t.join("")};function ze({site:a,t:n,L:t,pct:l,market:i}){var s,c,h,d,u;let o=n.afford,r=Number((s=a.afford)==null?void 0:s.dti)||40;return`<section class="section section--deep" id="afford" aria-labelledby="afford-title">
  <div class="wrap aff">
    <div class="sec-head sec-head--left"><p class="kicker">${e(o.kicker)}</p><h2 id="afford-title" class="h2">${e(o.title)}</h2><p class="lead">${e(o.text.replace("{n}",l(r)))}</p></div>
    <form class="aff-in" data-afford data-dti="${r}" onsubmit="return false">
      <div class="row2">
        <label class="field"><span>${e(o.income)}</span><input name="income" type="number" inputmode="decimal" min="0" value="${e((d=(h=(c=a.afford)==null?void 0:c.income)==null?void 0:h[i.id])!=null?d:"")}" placeholder="${e(o.incomeHint)}" data-a="income"></label>
        <label class="field"><span>${e(o.debts)}</span><input name="debts" type="number" inputmode="decimal" min="0" value="0" data-a="debts"></label>
      </div>
      <dl class="aff-out" aria-live="polite">
        <div><dt>${e(o.pay)}</dt><dd data-a-out="pay">\u2014</dd></div>
        <div><dt>${e(o.loan)}</dt><dd data-a-out="loan">\u2014</dd></div>
        <div><dt>${e(o.home)}</dt><dd data-a-out="home">\u2014</dd></div>
      </dl>
      <p class="hint small">${e(t((u=a.afford)==null?void 0:u.note)||o.note)}</p>
      <button type="button" class="btn btn--ghost" data-a-use hidden>${e(o.use)} \u2191</button>
    </form>
  </div>
</section>`}function Pe({items:a,t:n,L:t,url:l,money:i,pct:o}){if(!a.length)return"";let r=n.loans;return`<section class="section" id="loans" aria-labelledby="loans-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(r.kicker)}</p><h2 id="loans-title" class="h2">${e(r.title)}</h2><p class="lead">${e(r.text)}</p></div>
    <ul class="loans">${a.map(s=>{var c;return`<li class="loan">
      ${s.image?`<div class="loan-img"><img sizes="${F.card}" src="${e(D(l,s.image))}" alt="" width="800" height="600" loading="lazy">${t(s.badge)?`<span class="badge">${e(t(s.badge))}</span>`:""}</div>`:""}
      <div class="loan-body">
        <h3>${e(t(s.name))}</h3>
        <p class="muted">${e(t(s.description))}</p>
        <dl class="terms">
          ${s.r?`<div><dt>${e(r.rate)}</dt><dd>${e(r.from.replace("{n}",o(s.r)))}${s.promoYears?`<small>${e(r.promoFor.replace("{n}",s.promoYears))}</small>`:""}</dd></div>`:""}
          ${s.ltv?`<div><dt>${e(r.ltv)}</dt><dd>${e(o(s.ltv))}</dd></div>`:""}
          ${s.years?`<div><dt>${e(r.years)}</dt><dd>${e(r.yearsV.replace("{n}",s.years))}</dd></div>`:""}
          <div><dt>${e(r.min)}</dt><dd>${e(i(s.min))}</dd></div>
        </dl>
        <button type="button" class="link" data-loan="${e(s.id)}" data-rate="${(c=s.r)!=null?c:""}" data-promo-years="${Number(s.promoYears)||0}" data-max-years="${Number(s.years)||""}" data-ltv="${Number(s.ltv)||""}">${m("scale",16)} ${e(r.try)}</button>
      </div>
    </li>`}).join("")}</ul>
  </div>
</section>`}function je({site:a,t:n,L:t}){var i;let l=((i=a.steps)!=null?i:[]).filter(o=>t(o==null?void 0:o.title));return l.length?`<section class="section section--deep" id="steps" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(n.steps.title)}</h2></div>
    <ol class="steps">${l.map((o,r)=>`<li><span class="st-n">${String(r+1).padStart(2,"0")}</span><h3>${e(t(o.title))}</h3>${t(o.time)?`<small>${e(t(o.time))}</small>`:""}<p>${e(t(o.text))}</p></li>`).join("")}</ol>
  </div>
</section>`:""}function Ce({site:a,t:n,L:t}){var i;let l=((i=a.docs)!=null?i:[]).filter(o=>t(o==null?void 0:o.title)&&L(t(o.items)).length);return l.length?`<section class="section" id="docs" aria-labelledby="docs-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.docs.kicker)}</p><h2 id="docs-title" class="h2">${e(n.docs.title)}</h2><p class="lead">${e(n.docs.text)}</p></div>
    <div class="docs">${l.map(o=>{var r;return`<div class="doc"><h3>${m((r=o.icon)!=null?r:"doc",20)} ${e(t(o.title))}</h3><ul>${L(t(o.items)).map(s=>`<li>${m("check",15)} ${e(s)}</li>`).join("")}</ul></div>`}).join("")}</div>
  </div>
</section>`:""}function Te({site:a,t:n,L:t}){var i;let l=((i=a.fees)!=null?i:[]).filter(o=>t(o==null?void 0:o.title));return l.length?`<section class="section section--deep" id="fees" aria-labelledby="fees-title">
  <div class="wrap feesw">
    <div class="sec-head sec-head--left"><p class="kicker">${e(n.fees.kicker)}</p><h2 id="fees-title" class="h2">${e(n.fees.title)}</h2>${t(a.feesNote)?`<p class="lead">${e(t(a.feesNote))}</p>`:""}</div>
    <ul class="fees">${l.map(o=>{var r;return`<li><div><h3>${e(t(o.title))}</h3>${t(o.text)?`<p class="muted">${e(t(o.text))}</p>`:""}</div><b>${e((r=t(o.value))!=null?r:"")}</b></li>`}).join("")}</ul>
  </div>
</section>`:""}function Re({site:a,t:n,L:t,url:l}){var o;let i=((o=a.homes)!=null?o:[]).filter(r=>r==null?void 0:r.image);return i.length?`<section class="section" id="homes" aria-labelledby="homes-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.homes.kicker)}</p><h2 id="homes-title" class="h2">${e(n.homes.title)}</h2></div>
    <ul class="homes" data-homes>${i.map((r,s)=>{var c;return`<li${s>=re?' class="is-more"':""}><figure><img sizes="${F.card}" src="${e(D(l,r.image))}" alt="${e((c=t(r.tag))!=null?c:"")}" width="800" height="600" loading="lazy">${t(r.tag)?`<figcaption>${e(t(r.tag))}</figcaption>`:""}</figure></li>`}).join("")}</ul>
    ${i.length>re?`<div class="more"><button type="button" class="btn btn--ghost" data-homes-more hidden>${e(n.homes.more)}</button></div>`:""}
  </div>
</section>`:""}function qe({site:a,t:n,L:t}){var i;let l=((i=a.team)!=null?i:[]).filter(o=>o==null?void 0:o.name);return l.length?`<section class="section section--deep" id="team" aria-labelledby="team-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.team.kicker)}</p><h2 id="team-title" class="h2">${e(n.team.title)}</h2></div>
    <ul class="team">${l.map(o=>`<li><span class="avatar" aria-hidden="true">${e(ke(o.name))}</span><div><b>${e(o.name)}</b><small>${e(t(o.role))}</small>${o.years?`<p>${e(n.team.years.replace("{n}",o.years))}${t(o.langs)?` \xB7 ${e(t(o.langs))}`:""}</p>`:""}</div></li>`).join("")}</ul>
  </div>
</section>`:""}function Ee({site:a,t:n,L:t,lang:l}){let i=Q(a,n,l,"btn btn--ghost"),o=ee(a);return a.showReviews===!1||!o.length&&!i?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(n.reviews.title)}</h2></div>
    ${te(o,l,"reviews",r=>`<figure class="review">
      <p class="stars" aria-label="${e(r.rating)}/5">${Array.from({length:5},(s,c)=>`<span class="${c<r.rating?"on":""}">${m("star",15)}</span>`).join("")}</p>
      <blockquote>${e(t(r.text))}</blockquote>
      <figcaption>${e(r.name)}${t(r.bought)?`<small>${e(t(r.bought))}</small>`:""}${ae(r,l)}</figcaption>
    </figure>`)}${i}
  </div>
</section>`}function Ve({site:a,t:n,L:t}){var i;let l=((i=a.faq)!=null?i:[]).filter(o=>t(o==null?void 0:o.q));return l.length?`<section class="section section--deep" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(n.faq.title)}</h2>
    <div>${l.map((o,r)=>`<details${r===0?" open":""}><summary>${e(t(o.q))}</summary><p>${e(t(o.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ae({site:a,items:n,t,L:l,channels:i,gform:o,market:r}){let s=t.book,c=t.orderText.replace(/\{\w+\}/g,"\u2026"),h=o?` data-gform="${e(o.action)}" data-gmap='${e(JSON.stringify(o.fields))}'`:"",d=p=>i.map((g,b)=>{var $,k;return`<button type="submit" class="btn ${p!=null?p:b?"btn--ghost":"btn--accent"} btn--lg" data-channel="${e(g)}" data-href="${e(S(g,($=a.contact)!=null?$:{},c))}">${m(g,18)} ${e(g==="phone"?s.call:s.send.replace("{channel}",(k=t.via[g])!=null?k:g))}</button>`}).join(""),u=L(l(a.bookPoints));return`<section class="section" id="book" aria-labelledby="book-title">
  <div class="wrap reg">
    <div class="reg-copy">
      <p class="kicker">${e(s.kicker)}</p>
      <h2 id="book-title" class="h2">${e(s.title)}</h2>
      <p class="lead">${e(l(a.bookText)||s.text)}</p>
      ${u.length?`<ul class="reg-points">${u.map(p=>`<li>${m("check",16)} ${e(p)}</li>`).join("")}</ul>`:""}
    </div>
    <form class="form" data-book${h} data-text="${e(t.orderText)}" data-yrs="${e(t.calc.yearsOpt)}" data-pm="${e(t.book.perMonth)}" data-market="${e(`${r.id.toUpperCase()} \xB7 ${r.currency}`)}" novalidate>
      <div class="order-fields">
        <label class="field"><span>${e(s.loan)}</span><select name="product" data-b-loan>${n.map(p=>`<option value="${e(p.id)}">${e(l(p.name))}</option>`).join("")}<option value="">${e(s.unsure)}</option></select></label>
        <div class="row2">
          <label class="field"><span>${e(s.amount)}</span><input name="amount" inputmode="decimal" maxlength="40" data-b-amount></label>
          <label class="field"><span>${e(s.years)}</span><input name="years" inputmode="numeric" maxlength="20" data-b-years></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(s.income)}</span><select name="income">${s.incomes.map(p=>`<option>${e(p)}</option>`).join("")}</select></label>
          <label class="field"><span>${e(s.when)}</span><select name="when">${ye.map(p=>`<option value="${p}">${e(s.calls[p])}</option>`).join("")}</select></label>
        </div>
        <div class="calc-sum" data-b-calc hidden><p class="small"><b>${e(s.calcL)}</b></p><p class="small" data-b-calc-text></p></div>
        <div class="row2">
          <label class="field"><span>${e(s.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(s.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(s.note)}</span><input name="note" maxlength="300" placeholder="${e(s.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="hint small">${m("lock",14)} ${e(s.privacy)}</p>
        <p class="form-err" data-err hidden>${e(s.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-order-submit>${m("calendar",18)} ${e(s.submit)}</button>
        <noscript><p>${i.map(p=>{var g,b;return`<a href="${e(S(p,(g=a.contact)!=null?g:{},c))}" ${V(p)}>${e((b=t.via[p])!=null?b:p)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m(o?"check":"arrow",22)} ${e(o?s.done:s.stepTitle)}</p>
        <p class="muted">${e(o?s.doneText:s.stepText)}</p>
        <div class="buy">${d(o?"btn--ghost":void 0)}</div>
        ${o?"":`<button type="button" class="link" data-edit>${e(s.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Be({site:a,t:n,L:t,channels:l}){var s,c,h;let i=(s=a.contact)!=null?s:{},o=encodeURIComponent((c=i.mapQuery)!=null?c:t(i.address)),r=d=>d.length===7?n.visit.everyDay:_(d,n.days);return`<section class="section section--deep" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(n.visit.title)}</h2>
      ${Z(a,n)}
      ${((h=a.hours)!=null?h:[]).length?`<table class="hours"><tbody>${a.hours.map(d=>`<tr><th scope="row">${e(r(d.days))}</th><td>${e(d.open)} \u2013 ${e(d.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${t(i.address)?`<p class="addr">${m("pin",18)} ${e(t(i.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--ghost" href="https://www.google.com/maps/dir/?api=1&amp;destination=${o}" target="_blank" rel="noopener">${e(n.visit.directions)} ${m("arrow",16)}</a>
        ${l.map(d=>{var u;return`<a class="btn btn--ghost" href="${e(S(d,i))}" ${V(d)}>${m(d,18)} ${e((u=n.via[d])!=null?u:d)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(n.visit.title)}" src="https://www.google.com/maps?q=${o}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Oe({site:a,t:n,L:t,market:l}){var r,s;let i=(r=a.contact)!=null?r:{},o=Object.entries((s=a.social)!=null?s:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(t(a.tagline))}</p>${t(a.license)?`<p class="muted small">${e(t(a.license))}</p>`:""}</div>
    <div><p class="foot-h">${e(n.footer.contact)}</p><ul>
      ${i.phone?`<li>${e(n.footer.hotline)}: <a href="tel:${w(i.phone)}">${e(i.phone)}</a></li>`:""}
      ${i.email?`<li><a href="mailto:${e(i.email)}">${e(i.email)}</a></li>`:""}
      ${t(i.address)?`<li>${e(t(i.address))}</li>`:""}</ul></div>
    ${o.length?`<div><p class="foot-h">${e(n.footer.follow)}</p><ul>${o.map(([c,h])=>`<li><a href="${e(h)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  ${t(a.disclaimer)?`<div class="wrap"><p class="disclaimer">${e(t(a.disclaimer))}</p></div>`:""}
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${ne(a,n,l.lang)}</div>
</footer>`}function Fe({site:a,market:n,L:t,abs:l,items:i}){var r,s;let o=(r=a.contact)!=null?r:{};return{"@context":"https://schema.org","@type":"FinancialService",name:a.name,url:l(`${n.id}/`),...a.heroImage?{image:l(R(a.heroImage))}:{},description:t(a.intro),telephone:o.phone,email:o.email,address:{"@type":"PostalAddress",streetAddress:t(o.address)},currenciesAccepted:n.currency,openingHoursSpecification:K((s=a.hours)!=null?s:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:a.name,itemListElement:i.map(c=>({"@type":"Offer",itemOffered:{"@type":"LoanOrCredit",name:t(c.name),description:t(c.description),...c.r?{annualPercentageRate:c.r}:{},...c.years?{loanTerm:{"@type":"QuantitativeValue",value:c.years,unitCode:"ANN"}}:{}}}))}}}var Le=({site:a,L:n})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(t=>n(t==null?void 0:t.q)).map(t=>({"@type":"Question",name:n(t.q),acceptedAnswer:{"@type":"Answer",text:n(t.a)}}))});export{ea as renderSite,xe as schedule};
