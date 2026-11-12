var de={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,n=>de[n]);function F(t,n,a="vi"){var i,s,r;return t==null?"":typeof t!="object"?String(t):(r=(s=(i=t[n])!=null?i:t[a])!=null?s:Object.values(t)[0])!=null?r:""}var pe={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},G=t=>{var n;return(n=pe[t])!=null?n:"en-US"};function he(t,n="1"){if(n==="0.99")return Math.max(.99,Math.ceil(t)-.01);let a=Number(n)||1;return Math.max(a,Math.round(t/a)*a)}function H(t,n){var i,s;if(n.default)return t.basePrice;let a=(s=(i=t.prices)==null?void 0:i[n.id])!=null?s:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:he(t.basePrice*n.rate,n.rounding)}var ue=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function W(t,n){let a={style:"currency",currency:n.currency};return ue.has(n.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(G(n.lang),a).format(t)}function _(t="/"){let n=t.endsWith("/")?t:`${t}/`;return(a="")=>n+String(a).replace(/^\//,"")}var A=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,N=(t,n)=>{let a=A(n);return a==null?n:t(a)},D=(t="")=>String(t).replace(/\D/g,"");function P(t,n,a=""){switch(t){case"phone":return`tel:${D(n.phone)}`;case"zalo":return`https://zalo.me/${D(n.zalo||n.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(n.messenger)}`;case"whatsapp":return`https://wa.me/${D(n.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(n.kakao)}/chat`;case"email":return`mailto:${n.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var I=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,me=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function K(t){if(!t||typeof t!="string")return null;let n;try{n=new URL(t.trim())}catch{return{error:"not-google"}}if(n.hostname==="forms.gle")return{error:"short-link"};let a=n.hostname==="docs.google.com"&&n.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let i={};for(let[s,r]of n.searchParams){if(!/^entry\.\d+$/.test(s))continue;let o=r.trim().replace(/^\{|\}$/g,"").toLowerCase();me.includes(o)&&(i[o]=s)}return Object.keys(i).length?i.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:i}:{error:"no-phone"}:{error:"no-fields"}}var U={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ge={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},u=(t,n=20,a="")=>{var i;return`<svg class="i" width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(i=ge[t])!=null?i:""}</svg>`},V=[1,2,3,4,5,6,0],fe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function Z(t,n){let a=t.map(s=>V.indexOf(s)).sort((s,r)=>s-r);return a.every((s,r)=>r===0||s===a[r-1]+1)&&a.length>2?`${n[V[a[0]]]} \u2013 ${n[V[a.at(-1)]]}`:a.map(s=>n[V[s]]).join(", ")}var Y=t=>t.map(n=>({"@type":"OpeningHoursSpecification",dayOfWeek:n.days.map(a=>fe[a]),opens:n.open,closes:n.close}));function X(t){var a,i;return(i=(a=new Intl.NumberFormat(G(t.lang),{style:"currency",currency:t.currency}).formatToParts(0).find(s=>s.type==="currency"))==null?void 0:a.value)!=null?i:t.currency}var O=t=>t==="phone"||t==="email"?"":'target="_blank" rel="noopener"',Q=t=>`<div class="suggest" id="market-suggest" data-suggest="${e(t.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(t.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(t.market.dismiss)}">\xD7</button>
</div>`,ee=(t,n)=>{var a;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(t.hours))}' data-tz="${e((a=t.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${e(n.visit.open)}" data-closed="${e(n.visit.closed)}" hidden></p>`},J={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ve=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,be=t=>{var n;try{let a=new URL(String((n=t.googleReview)!=null?n:"").trim());return a.protocol==="https:"&&ve.test(a.hostname)?a.href:""}catch{return""}},te=(t,n,a,i="btn btn--line")=>{var o;let s=be(t);if(!s)return"";let r=typeof n.reviews=="object"&&((o=n.reviews)==null?void 0:o.google)||J[a]||J.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${i}" href="${e(s)}" target="_blank" rel="noopener">${u("star",16)} ${e(r)}</a></p>`},L={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},ae={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ne=t=>{var n;return((n=t.reviews)!=null?n:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function oe(t,n){var r,o,l;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((r=t==null?void 0:t.date)!=null?r:"").trim());if(!a)return"";let i=new Date(Date.UTC(+a[1],+a[2]-1,+((o=a[3])!=null?o:1)));if(Number.isNaN(i.getTime()))return"";let s=new Intl.DateTimeFormat((l=ae[n])!=null?l:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(i);return`<time class="rv-date" datetime="${e(t.date)}">${e(s)}</time>`}function ye(t,n){var o,l;let a=t.filter(c=>c.rating>=1&&c.rating<=5);if(a.length<2)return"";let i=a.reduce((c,p)=>c+Number(p.rating),0)/a.length,s=(o=L[n])!=null?o:L.en,r=new Intl.NumberFormat((l=ae[n])!=null?l:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(i);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${u("star",18)}</span><strong>${r}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(t.length)))}</span></p>`}function re(t,n,a,i){var o;if(!t.length)return"";let s=(o=L[n])!=null?o:L.en,r=l=>`<button type="button" class="rv-btn" data-rv-${l} aria-label="${e(l==="prev"?s.prev:s.next)}">${u("arrow",18,l==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ye(t,n)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${a} rv-track" tabindex="0">${t.map(i).join("")}</div>
      <div class="rv-nav" hidden>${r("prev")}${r("next")}</div>
    </div>${$e}`}var $e=`<style>
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
upd()}})()<\/script>`;var se=(t,n,a)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(n.footer.madeWith)}</a>`;function ie({site:t,markets:n,url:a,abs:i}){var o;let s=(o=n.find(l=>l.default))!=null?o:n[0],r=n.map(l=>({id:l.id,lang:l.lang,country:l.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${i(`${s.id}/`)}">
${n.map(l=>`<link rel="alternate" hreflang="${e(l.lang)}-${e(l.country)}" href="${i(`${l.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(r)}, root = ${JSON.stringify(a(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${n.map(l=>`<a href="${a(`${l.id}/`)}">${e(l.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ke="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap",le=6;function xe(t,n){var a;return((a=t.products)!=null?a:[]).map(i=>{var s;return{...i,variants:((s=i.variants)!=null?s:[]).map(r=>({...r,price:H(r,n)})).filter(r=>r.price!=null)}}).filter(i=>i.variants.length).map(i=>{var s;return{...i,from:Math.min(...i.variants.map(r=>r.price)),months:((s=i.months)!=null?s:[]).map(Number)}})}var we=t=>String(t!=null?t:"").split(`
`).map(n=>n.trim()).filter(Boolean),ce=(t,n,a="short")=>new Intl.DateTimeFormat(t,{month:a,timeZone:"UTC"}).format(new Date(Date.UTC(2026,n-1,15)));function Ye({site:t,catalog:n,i18n:a,template:i,basePath:s="/",siteUrl:r=t.domain}){var f,v,y,$,j,x,S;let o=_(s),l=b=>new URL(o(b),r).href,c=n.markets,p=K(t.orderForm),g=p&&!p.error?p:null,h=[];for(let b of c){let w=b.lang,C=(v=(f=a[w])!=null?f:a.en)!=null?v:a.vi,z=m=>F(m,w,"en"),T=xe(n,b),R=($=(y=t.orderChannels)==null?void 0:y[b.id])!=null?$:["phone"],q=m=>W(m,b),M=(j=t.order)!=null?j:{},E=((x=M.delivery)!=null?x:[]).filter(m=>m==null?void 0:m.id).map(m=>{var k;return{id:m.id,n:z(m.name),p:(k=H(m,b))!=null?k:0,lead:Number(m.lead)||0}}),B={tiers:((S=M.tiers)!=null?S:[]).map(m=>({min:Number(m.min)||0,off:Number(m.off)||0})).sort((m,k)=>m.min-k.min),delivery:E,min:Number(M.minBunches)||1},d={site:t,catalog:n,market:b,markets:c,lang:w,t:C,L:z,url:o,abs:l,channels:R,money:q,items:T,template:i,gform:g,ord:B};h.push({path:`${b.id}/index.html`,html:Me(d)})}return h.push({path:"index.html",html:ie({site:t,markets:c,url:o,abs:l})}),h}function Me(t){var w,C,z,T,R,q,M,E,B;let{site:n,market:a,markets:i,lang:s,t:r,L:o,url:l,abs:c,channels:p,ord:g,items:h}=t,f=`${n.name} \xB7 ${o(n.tagline)}`,v=(w=n.theme)!=null?w:{},y=["primary","ink","bg","surface","soft","accent"].filter(d=>v[d]).map(d=>`--${d}:${v[d]}`).join(";"),$=(C=i.find(d=>d.default))!=null?C:i[0],j=i.map(d=>({id:d.id,lang:d.lang,country:d.country,currency:d.currency,href:l(`${d.id}/`)})),x=(z=n.contact)!=null?z:{},S=n.heroImage,b=h.map(d=>({id:d.id,n:o(d.name),m:d.months,s:Number(d.stems)||10,v:d.variants.map(m=>{var k;return[(k=o(m.label))!=null?k:"",m.price]})}));return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(f)}</title>
<meta name="description" content="${e(o(n.intro))}">
<link rel="canonical" href="${c(`${a.id}/`)}">
${i.map(d=>`<link rel="alternate" hreflang="${e(d.lang)}-${e(d.country)}" href="${c(`${d.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${$.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(f)}">
<meta property="og:description" content="${e(o(n.intro))}">
<meta property="og:url" content="${c(`${a.id}/`)}">
${S?`<meta property="og:image" content="${e(c(A(S)))}">`:""}
<meta property="og:site_name" content="${e(n.name)}">
<meta name="theme-color" content="${e((T=v.bg)!=null?T:"#101612")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ke}">
<link rel="stylesheet" href="${l("assets/style.css")}">
<style>:root{${y}}</style>
${I(Ae(t))}${((R=n.faq)!=null?R:[]).length?I(Ve(t)):""}
<script src="${l("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(a.id)}" data-markets='${e(JSON.stringify(j))}' data-copied="${e(r.copied)}" data-wa="${e(D((q=x.whatsapp)!=null?q:""))}" data-email="${e((M=x.email)!=null?M:"")}" data-tz="${e((E=n.timezone)!=null?E:"Asia/Ho_Chi_Minh")}" data-currency="${e(a.currency)}" data-lang="${e(s)}" data-order='${e(JSON.stringify(g))}'>
<script type="application/json" id="fl-data">${JSON.stringify(b).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${e(r.skip)}</a>
${Q(r)}
${o(n.announcement)?`<p class="announce">${e(o(n.announcement))}</p>`:""}
${De(t)}
<main id="main">
${[Se,ze,Ne,Pe,Ce,Te,Re,qe,je,Ee].map(d=>d(t)).join(`
`)}
</main>
${Be(t)}
<nav class="dock" aria-label="${e(r.nav.book)}">
  <a href="${e(P(p[0],x))}" ${O(p[0])}>${u(p[0],20)}<span>${e((B=r.via[p[0]])!=null?B:p[0])}</span></a>
  <a class="primary" href="#order">${u("flower",20)}<span>${e(r.nav.book)}</span></a>
</nav>
</body>
</html>
`}function De({site:t,market:n,markets:a,t:i,url:s}){let r=[["#season",i.nav.season],["#flowers",i.nav.flowers],["#order",i.nav.order],["#steps",i.nav.steps],["#visit",i.nav.contact]];return`<header class="header" data-header>
  <div class="wrap bar">
    <a class="brand" href="${s(`${n.id}/`)}">
      ${t.logo?`<img src="${e(N(s,t.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${u("flower",18)}</span>`}
      <span>${e(t.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${r.map(([o,l])=>`<a href="${o}">${e(l)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${a.length>1?`<details class="market">
        <summary aria-label="${e(i.market.label)}">${u("globe",16)}<span>${e(n.id.toUpperCase())}<span class="cur"> \xB7 ${e(X(n))}</span></span></summary>
        <ul>${a.map(o=>`<li><a href="${s(`${o.id}/`)}" hreflang="${e(o.lang)}"${o.id===n.id?' aria-current="true"':""}>${e(o.country)} \xB7 ${e(o.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--accent btn--sm hide-sm" href="#order">${e(i.nav.book)}</a>
      <details class="mnav">
        <summary aria-label="${e(i.nav.openMenu)}">${u("menu",22)}</summary>
        <nav aria-label="Menu">${r.map(([o,l])=>`<a href="${o}">${e(l)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function Se({site:t,t:n,L:a,url:i}){var o;let s=t.heroImage,r=((o=t.stats)!=null?o:[]).filter(l=>a(l==null?void 0:l.value));return`<section class="hero">
  ${s?`<img class="hero-img" src="${e(N(i,s))}" alt="" width="1600" height="1000" fetchpriority="high">`:""}
  <div class="wrap hero-copy">
    ${a(t.heroKicker)?`<p class="kicker">${e(a(t.heroKicker))}</p>`:""}
    <h1>${e(a(t.tagline))}</h1>
    <p class="lead">${e(a(t.intro))}</p>
    <div class="actions"><a class="btn btn--accent btn--lg" href="#order">${u("flower",18)} ${e(n.hero.order)}</a><a class="btn btn--ghost btn--lg" href="#season">${u("calendar",18)} ${e(n.hero.season)}</a></div>
  </div>
  ${r.length?`<div class="wrap"><ul class="stats">${r.slice(0,4).map(l=>`<li><b>${e(a(l.value))}</b><span>${e(a(l.label))}</span></li>`).join("")}</ul></div>`:""}
</section>`}function ze({items:t,t:n,L:a,lang:i}){if(!t.length)return"";let s=n.season,r=Array.from({length:12},(o,l)=>l+1);return`<section class="section section--deep" id="season" aria-labelledby="season-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(s.kicker)}</p><h2 id="season-title" class="h2">${e(s.title)}</h2><p class="lead">${e(s.text)}</p></div>
    <p class="now" data-now data-tpl="${e(s.now)}" hidden></p>
    <div class="table-wrap"><table class="season" data-season>
      <thead><tr><th scope="col"><span class="sr">${e(s.flower)}</span></th>${r.map(o=>`<th scope="col" data-m="${o}"><abbr title="${e(ce(i,o,"long"))}">${e(ce(i,o))}</abbr></th>`).join("")}</tr></thead>
      <tbody>${t.map(o=>`<tr><th scope="row"><a href="#fl-${e(o.id)}">${e(a(o.name))}</a></th>${r.map(l=>`<td data-m="${l}"${o.months.includes(l)?' class="on"':""}><span class="sr">${e(o.months.includes(l)?s.yes:s.no)}</span></td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>
    <p class="legend"><span><i class="lg-on"></i>${e(s.yes)}</span><span><i class="lg-now"></i>${e(s.thisMonth)}</span></p>
  </div>
</section>`}function Ne({items:t,t:n,L:a,url:i,money:s}){if(!t.length)return"";let r=n.flowers;return`<section class="section" id="flowers" aria-labelledby="fl-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(r.kicker)}</p><h2 id="fl-title" class="h2">${e(r.title)}</h2><p class="lead">${e(r.text)}</p></div>
    <ul class="loans flowers">${t.map(o=>{var l;return`<li class="loan" id="fl-${e(o.id)}" data-fl="${e(o.id)}">
      ${o.image?`<div class="loan-img"><img sizes="${U.card}" src="${e(N(i,o.image))}" alt="${e(a(o.name))}" width="800" height="600" loading="lazy">${a(o.badge)?`<span class="badge">${e(a(o.badge))}</span>`:""}<span class="badge badge--season" data-in-season hidden>${e(r.inSeason)}</span></div>`:""}
      <div class="loan-body">
        <h3>${e(a(o.name))}</h3>
        ${a(o.description)?`<p class="muted">${e(a(o.description))}</p>`:""}
        <dl class="terms">
          <div><dt>${e(r.bunch)}</dt><dd>${e(r.stems.replace("{n}",(l=o.stems)!=null?l:10))}</dd></div>
          ${o.vase?`<div><dt>${e(r.vase)}</dt><dd>${e(r.days.replace("{n}",o.vase))}</dd></div>`:""}
          ${a(o.colors)?`<div><dt>${e(r.colors)}</dt><dd>${e(a(o.colors))}</dd></div>`:""}
          ${o.variants.map(c=>`<div><dt>${e(a(c.label)||r.price)}</dt><dd>${e(s(c.price))}</dd></div>`).join("")}
        </dl>
        <button type="button" class="link" data-add-fl="${e(o.id)}">${u("plus",16)} ${e(r.add)}</button>
      </div>
    </li>`}).join("")}</ul>
  </div>
</section>`}function Pe({items:t,t:n,L:a,money:i,ord:s}){if(!t.length)return"";let r=n.order;return`<section class="section section--deep" id="order" aria-labelledby="order-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(r.kicker)}</p><h2 id="order-title" class="h2">${e(r.title)}</h2><p class="lead">${e(r.text)}</p></div>
    <div class="calc" data-order-calc>
      <form class="calc-in" onsubmit="return false">
        <ul class="ol">${t.map(o=>{var l;return`<li class="ol-row" data-row="${e(o.id)}">
          <span class="ol-n"><b>${e(a(o.name))}</b><small>${e(n.flowers.stems.replace("{n}",(l=o.stems)!=null?l:10))}</small></span>
          ${o.variants.length>1?`<select name="v-${e(o.id)}" aria-label="${e(r.length)}">${o.variants.map((c,p)=>`<option value="${p}">${e(a(c.label))} \xB7 ${e(i(c.price))}</option>`).join("")}</select>`:`<span class="ol-p">${e(i(o.variants[0].price))}</span>`}
          <span class="qty"><button type="button" data-d="-1" aria-label="\u2212">\u2212</button><input name="q-${e(o.id)}" type="number" min="0" max="999" value="0" inputmode="numeric" aria-label="${e(a(o.name))} \xB7 ${e(r.bunches)}"><button type="button" data-d="1" aria-label="+">+</button></span>
        </li>`}).join("")}</ul>
        <div class="row2">
          <label class="field"><span>${e(r.date)}</span><input name="date" type="date" data-o-date></label>
          ${s.delivery.length?`<label class="field"><span>${e(r.how)}</span><select name="how" data-o-how>${s.delivery.map(o=>`<option value="${e(o.id)}">${e(o.n)}${o.p?` \xB7 ${e(i(o.p))}`:""}</option>`).join("")}</select></label>`:""}
        </div>
        ${s.tiers.filter(o=>o.off).length?`<p class="tiers" data-tiers>${s.tiers.filter(o=>o.off).map(o=>`<span data-min="${o.min}">${e(r.tier.replace("{n}",o.min).replace("{p}",o.off))}</span>`).join("")}</p>`:""}
      </form>
      <div class="calc-out" aria-live="polite" data-o-out data-l='${e(JSON.stringify({stems:r.stemsN,off:r.offLine,ship:r.shipLine,out:r.outSeason,min:r.minWarn,lead:r.leadWarn,empty:r.empty}))}'>
        <p class="out-k">${e(r.total)}</p>
        <p class="out-big" data-o-total>\u2014</p>
        <dl class="out">
          <div><dt>${e(r.bunchesL)}</dt><dd data-o-bunches>0</dd></div>
          <div><dt>${e(r.subtotal)}</dt><dd data-o-sub>\u2014</dd></div>
          <div data-o-off-row hidden><dt data-o-off-l></dt><dd data-o-off></dd></div>
          <div data-o-ship-row hidden><dt>${e(r.ship)}</dt><dd data-o-ship></dd></div>
        </dl>
        <p class="warn" data-o-warn hidden></p>
        <p class="hint small">${u("leaf",14)} ${e(r.note)}</p>
        <a class="btn btn--accent btn--lg btn--full" href="#book" data-use-order>${u("flower",18)} ${e(r.use)}</a>
      </div>
    </div>
  </div>
</section>`}function je({site:t,t:n,L:a,channels:i,gform:s,market:r}){let o=n.book,l=n.orderText.replace(/\{\w+\}/g,"\u2026"),c=s?` data-gform="${e(s.action)}" data-gmap='${e(JSON.stringify(s.fields))}'`:"",p=h=>i.map((f,v)=>{var y,$;return`<button type="submit" class="btn ${h!=null?h:v?"btn--ghost":"btn--accent"} btn--lg" data-channel="${e(f)}" data-href="${e(P(f,(y=t.contact)!=null?y:{},l))}">${u(f,18)} ${e(f==="phone"?o.call:o.send.replace("{channel}",($=n.via[f])!=null?$:f))}</button>`}).join(""),g=we(a(t.bookPoints));return`<section class="section" id="book" aria-labelledby="book-title">
  <div class="wrap reg">
    <div class="reg-copy">
      <p class="kicker">${e(o.kicker)}</p>
      <h2 id="book-title" class="h2">${e(o.title)}</h2>
      <p class="lead">${e(a(t.bookText)||o.text)}</p>
      ${g.length?`<ul class="reg-points">${g.map(h=>`<li>${u("check",16)} ${e(h)}</li>`).join("")}</ul>`:""}
    </div>
    <form class="form" data-book${c} data-text="${e(n.orderText)}" data-market="${e(`${r.id.toUpperCase()} \xB7 ${r.currency}`)}" novalidate>
      <div class="order-fields">
        <div class="calc-sum" data-b-cart hidden><p class="small"><b>${e(o.cart)}</b></p><p class="small" data-b-cart-text></p></div>
        <p class="small muted" data-b-nocart>${e(o.noCart)} <a href="#order">${e(n.order.title)}</a></p>
        <fieldset class="field"><legend>${e(o.who)}</legend><div class="opts">${o.whos.map((h,f)=>`<label class="opt"><input type="radio" name="who" value="${e(h)}"${f?"":" checked"}><span>${e(h)}</span></label>`).join("")}</div></fieldset>
        <div class="row2">
          <label class="field"><span>${e(o.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(o.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(o.address)}</span><input name="address" maxlength="200" autocomplete="street-address" placeholder="${e(o.addressHint)}"></label>
        <label class="field"><span>${e(o.note)}</span><input name="note" maxlength="300" placeholder="${e(o.noteHint)}"></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(o.required)}</p>
        <button type="submit" class="btn btn--accent btn--lg btn--full" data-order-submit>${u("check",18)} ${e(o.submit)}</button>
        <noscript><p>${i.map(h=>{var f,v;return`<a href="${e(P(h,(f=t.contact)!=null?f:{},l))}" ${O(h)}>${e((v=n.via[h])!=null?v:h)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${u(s?"check":"arrow",22)} ${e(s?o.done:o.stepTitle)}</p>
        <p class="muted">${e(s?o.doneText:o.stepText)}</p>
        <div class="buy">${p(s?"btn--ghost":void 0)}</div>
        ${s?"":`<button type="button" class="link" data-edit>${e(o.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Ce({site:t,t:n,L:a}){var s;let i=((s=t.steps)!=null?s:[]).filter(r=>a(r==null?void 0:r.title));return i.length?`<section class="section section--deep" id="steps" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(n.steps.title)}</h2></div>
    <ol class="steps">${i.map((r,o)=>`<li><span class="st-n">${String(o+1).padStart(2,"0")}</span><h3>${e(a(r.title))}</h3>${a(r.time)?`<small>${e(a(r.time))}</small>`:""}<p>${e(a(r.text))}</p></li>`).join("")}</ol>
  </div>
</section>`:""}function Te({site:t,t:n,L:a,url:i}){var r;let s=((r=t.homes)!=null?r:[]).filter(o=>o==null?void 0:o.image);return s.length?`<section class="section" id="homes" aria-labelledby="homes-title">
  <div class="wrap">
    <div class="sec-head"><p class="kicker">${e(n.homes.kicker)}</p><h2 id="homes-title" class="h2">${e(n.homes.title)}</h2></div>
    <ul class="homes" data-homes>${s.map((o,l)=>{var c;return`<li${l>=le?' class="is-more"':""}><figure><img sizes="${U.card}" src="${e(N(i,o.image))}" alt="${e((c=a(o.tag))!=null?c:"")}" width="800" height="600" loading="lazy">${a(o.tag)?`<figcaption>${e(a(o.tag))}</figcaption>`:""}</figure></li>`}).join("")}</ul>
    ${s.length>le?`<div class="more"><button type="button" class="btn btn--ghost" data-homes-more hidden>${e(n.homes.more)}</button></div>`:""}
  </div>
</section>`:""}function Re({site:t,t:n,L:a,lang:i}){let s=te(t,n,i,"btn btn--ghost"),r=ne(t);return t.showReviews===!1||!r.length&&!s?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="rev-title" class="h2">${e(n.reviews.title)}</h2></div>
    ${re(r,i,"reviews",o=>`<figure class="review">
      <p class="stars" aria-label="${e(o.rating)}/5">${Array.from({length:5},(l,c)=>`<span class="${c<o.rating?"on":""}">${u("star",15)}</span>`).join("")}</p>
      <blockquote>${e(a(o.text))}</blockquote>
      <figcaption>${e(o.name)}${a(o.bought)?`<small>${e(a(o.bought))}</small>`:""}${oe(o,i)}</figcaption>
    </figure>`)}${s}
  </div>
</section>`}function qe({site:t,t:n,L:a}){var s;let i=((s=t.faq)!=null?s:[]).filter(r=>a(r==null?void 0:r.q));return i.length?`<section class="section section--deep" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(n.faq.title)}</h2>
    <div>${i.map((r,o)=>`<details${o===0?" open":""}><summary>${e(a(r.q))}</summary><p>${e(a(r.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ee({site:t,t:n,L:a,channels:i}){var l,c,p;let s=(l=t.contact)!=null?l:{},r=encodeURIComponent((c=s.mapQuery)!=null?c:a(s.address)),o=g=>g.length===7?n.visit.everyDay:Z(g,n.days);return`<section class="section section--deep" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(n.visit.title)}</h2>
      ${ee(t,n)}
      ${((p=t.hours)!=null?p:[]).length?`<table class="hours"><tbody>${t.hours.map(g=>`<tr><th scope="row">${e(o(g.days))}</th><td>${e(g.open)} \u2013 ${e(g.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${a(s.address)?`<p class="addr">${u("pin",18)} ${e(a(s.address))}</p>`:""}
      <div class="actions">
        <a class="btn btn--ghost" href="https://www.google.com/maps/dir/?api=1&amp;destination=${r}" target="_blank" rel="noopener">${e(n.visit.directions)} ${u("arrow",16)}</a>
        ${i.map(g=>{var h;return`<a class="btn btn--ghost" href="${e(P(g,s))}" ${O(g)}>${u(g,18)} ${e((h=n.via[g])!=null?h:g)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(n.visit.title)}" src="https://www.google.com/maps?q=${r}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Be({site:t,t:n,L:a,market:i}){var o,l;let s=(o=t.contact)!=null?o:{},r=Object.entries((l=t.social)!=null?l:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(t.name)}</p><p class="muted">${e(a(t.tagline))}</p>${a(t.license)?`<p class="muted small">${e(a(t.license))}</p>`:""}</div>
    <div><p class="foot-h">${e(n.footer.contact)}</p><ul>
      ${s.phone?`<li>${e(n.footer.hotline)}: <a href="tel:${D(s.phone)}">${e(s.phone)}</a></li>`:""}
      ${s.email?`<li><a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
      ${a(s.address)?`<li>${e(a(s.address))}</li>`:""}</ul></div>
    ${r.length?`<div><p class="foot-h">${e(n.footer.follow)}</p><ul>${r.map(([c,p])=>`<li><a href="${e(p)}" target="_blank" rel="noopener">${e(c==="tiktok"?"TikTok":c==="youtube"?"YouTube":c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  ${a(t.disclaimer)?`<div class="wrap"><p class="disclaimer">${e(a(t.disclaimer))}</p></div>`:""}
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${se(t,n,i.lang)}</div>
</footer>`}function Ae({site:t,market:n,L:a,abs:i,items:s}){var o,l;let r=(o=t.contact)!=null?o:{};return{"@context":"https://schema.org","@type":"Florist",name:t.name,url:i(`${n.id}/`),...t.heroImage?{image:i(A(t.heroImage))}:{},description:a(t.intro),telephone:r.phone,email:r.email,address:{"@type":"PostalAddress",streetAddress:a(r.address)},currenciesAccepted:n.currency,openingHoursSpecification:Y((l=t.hours)!=null?l:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:t.name,itemListElement:s.flatMap(c=>c.variants.map(p=>({"@type":"Offer",name:`${a(c.name)}${a(p.label)?` \xB7 ${a(p.label)}`:""}`,price:p.price,priceCurrency:n.currency})))}}}var Ve=({site:t,L:n})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:t.faq.filter(a=>n(a==null?void 0:a.q)).map(a=>({"@type":"Question",name:n(a.q),acceptedAnswer:{"@type":"Answer",text:n(a.a)}}))});export{Ye as renderSite};
