var me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(n="")=>String(n).replace(/[&<>"']/g,t=>me[t]);function W(n,t,a="vi"){var o,r,i;return n==null?"":typeof n!="object"?String(n):(i=(r=(o=n[t])!=null?o:n[a])!=null?r:Object.values(n)[0])!=null?i:""}var ge={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL",sv:"sv-SE"},O=n=>{var t;return(t=ge[n])!=null?t:"en-US"};function fe(n,t="1"){if(t==="0.99")return Math.max(.99,Math.ceil(n)-.01);let a=Number(t)||1;return Math.max(a,Math.round(n/a)*a)}function F(n,t){var o,r;if(t.default)return n.basePrice;let a=(r=(o=n.prices)==null?void 0:o[t.id])!=null?r:{mode:"auto"};return a.mode==="hidden"?null:a.mode==="manual"?a.amount:fe(n.basePrice*t.rate,t.rounding)}var ve=new Set(["VND","JPY","KRW","IDR","KHR","LAK"]);function Z(n,t){let a={style:"currency",currency:t.currency};return ve.has(t.currency)&&(a.maximumFractionDigits=0),new Intl.NumberFormat(O(t.lang),a).format(n)}function Y(n="/"){let t=n.endsWith("/")?n:`${n}/`;return(a="")=>t+String(a).replace(/^\//,"")}var G=(n="")=>n.startsWith("uploads/")?n:/^([a-z]+:|\/)/i.test(n)?null:`assets/${n}`,A=(n,t)=>{let a=G(t);return a==null?t:n(a)},E=(n="")=>String(n).replace(/\D/g,"");function V(n,t,a=""){switch(n){case"phone":return`tel:${E(t.phone)}`;case"zalo":return`https://zalo.me/${E(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${E(t.whatsapp)}${a?`?text=${encodeURIComponent(a)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${a?`?subject=${encodeURIComponent(a)}`:""}`;default:return"#"}}var _=n=>`<script type="application/ld+json">${JSON.stringify(n).replace(/</g,"\\u003c")}<\/script>`,be=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function Q(n){if(!n||typeof n!="string")return null;let t;try{t=new URL(n.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let a=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!a)return{error:"not-google"};let o={};for(let[r,i]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let s=i.trim().replace(/^\{|\}$/g,"").toLowerCase();be.includes(s)&&(o[s]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${a[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var K={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ye={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},h=(n,t=20,a="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${(o=ye[n])!=null?o:""}</svg>`},H=[1,2,3,4,5,6,0],$e=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function ee(n,t){let a=n.map(r=>H.indexOf(r)).sort((r,i)=>r-i);return a.every((r,i)=>i===0||r===a[i-1]+1)&&a.length>2?`${t[H[a[0]]]} \u2013 ${t[H[a.at(-1)]]}`:a.map(r=>t[H[r]]).join(", ")}var te=n=>n.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(a=>$e[a]),opens:t.open,closes:t.close}));function ae(n){var a,o;return(o=(a=new Intl.NumberFormat(O(n.lang),{style:"currency",currency:n.currency}).formatToParts(0).find(r=>r.type==="currency"))==null?void 0:a.value)!=null?o:n.currency}var U=n=>n==="phone"||n==="email"?"":'target="_blank" rel="noopener"',ne=n=>`<div class="suggest" id="market-suggest" data-suggest="${e(n.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(n.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(n.market.dismiss)}">\xD7</button>
</div>`,J=(n,t)=>{var a;return`<p class="status" data-open-status data-hours='${e(JSON.stringify(n.hours))}' data-tz="${e((a=n.timezone)!=null?a:"Asia/Ho_Chi_Minh")}" data-open="${e(t.visit.open)}" data-closed="${e(t.visit.closed)}" hidden></p>`},X={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ke=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,xe=n=>{var t;try{let a=new URL(String((t=n.googleReview)!=null?t:"").trim());return a.protocol==="https:"&&ke.test(a.hostname)?a.href:""}catch{return""}},oe=(n,t,a,o="btn btn--line")=>{var s;let r=xe(n);if(!r)return"";let i=typeof t.reviews=="object"&&((s=t.reviews)==null?void 0:s.google)||X[a]||X.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${o}" href="${e(r)}" target="_blank" rel="noopener">${h("star",16)} ${e(i)}</a></p>`},I={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},re={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},ie=n=>{var t;return((t=n.reviews)!=null?t:[]).filter(a=>a&&(a.name||a.text)&&!(typeof a.text=="object"&&a.text&&!Object.values(a.text).some(Boolean)&&!a.name))};function se(n,t){var i,s,d;let a=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=n==null?void 0:n.date)!=null?i:"").trim());if(!a)return"";let o=new Date(Date.UTC(+a[1],+a[2]-1,+((s=a[3])!=null?s:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((d=re[t])!=null?d:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(n.date)}">${e(r)}</time>`}function we(n,t){var s,d;let a=n.filter(p=>p.rating>=1&&p.rating<=5);if(a.length<2)return"";let o=a.reduce((p,m)=>p+Number(m.rating),0)/a.length,r=(s=I[t])!=null?s:I.en,i=new Intl.NumberFormat((d=re[t])!=null?d:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${h("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(n.length)))}</span></p>`}function le(n,t,a,o){var s;if(!n.length)return"";let r=(s=I[t])!=null?s:I.en,i=d=>`<button type="button" class="rv-btn" data-rv-${d} aria-label="${e(d==="prev"?r.prev:r.next)}">${h("arrow",18,d==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${we(n,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${a} rv-track" tabindex="0">${n.map(o).join("")}</div>
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
upd()}})()<\/script>`;var ce=(n,t,a)=>n.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(a==="vi"||a==="ja"?a:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function de({site:n,markets:t,url:a,abs:o}){var s;let r=(s=t.find(d=>d.default))!=null?s:t[0],i=t.map(d=>({id:d.id,lang:d.lang,country:d.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(n.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${t.map(d=>`<link rel="alternate" hreflang="${e(d.lang)}-${e(d.country)}" href="${o(`${d.id}/`)}">`).join(`
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
<body><p>${t.map(d=>`<a href="${a(`${d.id}/`)}">${e(d.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var De="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",pe=8,Se=["veg","porkfree","gf"],Ne=["tonkotsu","shoyu","miso","shio","vegan"],he=["wheat","egg","soy","sesame","fish","pork","milk"];function ze(n,t){var a;return((a=n.products)!=null?a:[]).map(o=>{var r;return{...o,variants:((r=o.variants)!=null?r:[]).map(i=>({...i,price:F(i,t)})).filter(i=>i.price!=null)}}).filter(o=>o.variants.length>0).map(o=>({...o,from:Math.min(...o.variants.map(r=>r.price))}))}var ue=n=>String(n!=null?n:"").split(`
`).map(t=>t.trim()).filter(Boolean);function at({site:n,catalog:t,i18n:a,template:o,basePath:r="/",siteUrl:i=n.domain}){var u,g,C,N;let s=Y(r),d=x=>new URL(s(x),i).href,p=t.markets,m=Q(n.orderForm),b=m&&!m.error?m:null,f=[];for(let x of p){let S=x.lang,w=(g=(u=a[S])!=null?u:a.en)!=null?g:a.vi,z=c=>W(c,S,"en"),T=ze(t,x).map(c=>({...c,min:Number(c.min)||0,qty:Number(c.qty)||0})),l=(N=(C=n.orderChannels)==null?void 0:C[x.id])!=null?N:["phone"],y=c=>Number.isInteger(c)?new Intl.NumberFormat(O(S),{style:"currency",currency:x.currency,maximumFractionDigits:0}).format(c):Z(c,x),k=c=>{var v;return(v=w.unit[c])!=null?v:c},M=(c,v)=>{var D,R,B;return(B=v===1?w.unit[c]:(R=(D=w.unitN)==null?void 0:D[c])!=null?R:w.unit[c])!=null?B:c},q=null,P=null,j=(c,v)=>w.per.replace("{price}",y(v)).replace("{unit}",k(c.unit)),$=n.minOrder?F(n.minOrder,x):null,L={site:n,catalog:t,market:x,markets:p,lang:S,t:w,L:z,url:s,abs:d,channels:l,money:y,items:T,template:o,gform:b,unitLabel:k,unitPl:M,perUnit:j,minOrder:$,peak:q,depth:P};f.push({path:`${x.id}/index.html`,html:qe(L)})}return f.push({path:"index.html",html:de({site:n,markets:p,url:s,abs:d})}),f}function qe(n){var S,w,z,T,l,y,k,M,q,P,j;let{site:t,market:a,markets:o,lang:r,t:i,L:s,url:d,abs:p,channels:m}=n,b=`${t.name} \xB7 ${s(t.tagline)}`,f=(S=t.theme)!=null?S:{},u=["primary","ink","bg","surface","soft","accent"].filter($=>f[$]).map($=>`--${$}:${f[$]}`).join(";"),g=(w=o.find($=>$.default))!=null?w:o[0],C=o.map($=>({id:$.id,lang:$.lang,country:$.country,currency:$.currency,href:d(`${$.id}/`)})),N=(z=t.contact)!=null?z:{},x=t.heroImage||((T=n.items[0])==null?void 0:T.image);return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(b)}</title>
<meta name="description" content="${e(s(t.intro))}">
<link rel="canonical" href="${p(`${a.id}/`)}">
${o.map($=>`<link rel="alternate" hreflang="${e($.lang)}-${e($.country)}" href="${p(`${$.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${p(`${g.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(b)}">
<meta property="og:description" content="${e(s(t.intro))}">
<meta property="og:url" content="${p(`${a.id}/`)}">
${x?`<meta property="og:image" content="${e(p(G(x)))}">`:""}
<meta property="og:site_name" content="${e(t.name)}">
<meta name="theme-color" content="${e((l=f.primary)!=null?l:"#1E1A17")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${De}">
<link rel="stylesheet" href="${d("assets/style.css")}">
<style>:root{${u}}</style>
${_(Ge(n))}${((y=t.faq)!=null?y:[]).length?_(He(n)):""}
<script src="${d("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(a.id)}" data-markets='${e(JSON.stringify(C))}' data-copied="${e(i.copied)}" data-wa="${e(E((k=N.whatsapp)!=null?k:""))}" data-email="${e((M=N.email)!=null?M:"")}" data-tz="${e((q=t.timezone)!=null?q:"America/Los_Angeles")}" data-store="kp-ramen-${e(String((P=t.name)!=null?P:"").toLowerCase().replace(/[^a-z0-9]+/g,"-"))}-${e(a.id)}">
<a class="skip" href="#main">${e(i.skip)}</a>
${ne(i)}
${s(t.announcement)?`<p class="announce">${e(s(t.announcement))}</p>`:""}
${Pe(n)}
<main id="main">
${[je,Te,Ce,Re,Le,Ee,Ae,Be,Oe,Ve].map($=>$(n)).join(`
`)}
</main>
${Fe(n)}
<nav class="dock" aria-label="${e(i.nav.quote)}">
  <a href="${e(V(m[0],N))}" ${U(m[0])}>${h(m[0],20)}<span>${e((j=i.via[m[0]])!=null?j:m[0])}</span></a>
  <a class="primary" href="#quote">${h("doc",20)}<span>${e(i.nav.quote)}</span><b class="count" data-count hidden>0</b></a>
</nav>
</body>
</html>
`}function Pe({site:n,market:t,markets:a,t:o,url:r}){let i=[["#services",o.nav.services],["#sites",o.nav.rooms],["#kitchen",o.nav.safety],["#visit",o.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${n.logo?`<img src="${e(A(r,n.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${h("drop",20)}</span>`}
      <span>${e(n.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([s,d])=>`<a href="${s}">${e(d)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${a.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${h("globe",16)}<span>${e(t.id.toUpperCase())}<span class="cur"> \xB7 ${e(ae(t))}</span></span></summary>
        <ul>${a.map(s=>`<li><a href="${r(`${s.id}/`)}" hreflang="${e(s.lang)}"${s.id===t.id?' aria-current="true"':""}>${e(s.country)} \xB7 ${e(s.currency)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary btn--sm hide-sm" href="#quote">${h("doc",16)} ${e(o.nav.quote)} <b class="count" data-count hidden>0</b></a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${h("menu",22)}</summary>
        <nav aria-label="Menu">${i.map(([s,d])=>`<a href="${s}">${e(d)}</a>`).join("")}<a href="#quote">${e(o.nav.quote)}</a></nav>
      </details>
    </div>
  </div>
</header>`}function je(n){var b,f;let{site:t,t:a,L:o,url:r}=n,i=t.heroImage,s=((b=t.conditions)!=null?b:[]).filter(u=>o(u==null?void 0:u.value)),d=(f=t.busy)!=null?f:{},p=Object.keys(d).sort(),m=a.quick;return`<section class="hero">
  ${i?`<img class="hero-img" src="${e(A(r,i))}" alt="" width="1600" height="900" fetchpriority="high">`:""}
  <div class="wrap hero-in">
    <div class="hero-copy">
      ${o(t.heroKicker)?`<p class="kicker">${e(o(t.heroKicker))}</p>`:""}
      <h1>${e(o(t.tagline))}</h1>
      <p class="lead">${e(o(t.intro))}</p>
      ${s.length?`<div class="sea"><p class="sea-h">${h("drop",16)} ${e(a.sea.title)}${o(t.conditionsNote)?` <small>${e(o(t.conditionsNote))}</small>`:""}</p>
        <ul>${s.map(u=>{var g;return`<li>${h((g=u.icon)!=null?g:"clock",18)}<span>${e(o(u.label))}</span><b>${e(o(u.value))}</b></li>`}).join("")}</ul></div>`:""}
      ${J(t,a)}
    </div>
    ${p.length?`<form class="quick" data-wait onsubmit="return false" data-busy='${e(JSON.stringify(d))}' data-weekend="${Number(t.busyWeekend)||1}" data-l='${e(JSON.stringify({wait:m.wait,none:m.none,calm:m.calm,calmFree:m.calmFree,closed:m.closed}))}'>
      <p class="quick-title">${h("clock",20)} ${e(m.title)}</p>
      <div class="quick-row">
        <label><span>${e(m.day)}</span><select name="wd" data-w-day>${[1,2,3,4,5,6,0].map(u=>`<option value="${u}">${e(a.days[u])}</option>`).join("")}</select></label>
        <label><span>${e(m.time)}</span><select name="wh" data-w-hour>${p.map(u=>`<option value="${e(u)}">${e(u)}:00</option>`).join("")}</select></label>
      </div>
      <p class="quick-out" aria-live="polite"><b data-w-out>\u2014</b><span data-w-calm></span></p>
      <div class="bars" data-w-bars aria-hidden="true">${p.map(u=>`<i data-h="${e(u)}"><s></s><small>${e(u)}</small></i>`).join("")}</div>
      <a class="btn btn--primary btn--full" href="#services">${h("bag",16)} ${e(m.order)}</a>
      <p class="quick-note">${e(m.note)}</p>
    </form>`:""}
  </div>
</section>`}function Te(n){var T;let{catalog:t,items:a,t:o,L:r,url:i,money:s,perUnit:d,unitLabel:p,unitPl:m,peak:b,depth:f}=n;if(!a.length)return"";let u=((T=t.categories)!=null?T:[]).filter(l=>a.some(y=>y.category===l.id)),g=Ne.filter(l=>a.some(y=>y.broth===l)),C=Se.filter(l=>a.some(y=>{var k;return((k=y.diet)!=null?k:[]).includes(l)})),N=(l,y)=>a.filter(k=>{var M;return l==="diet"?((M=k.diet)!=null?M:[]).includes(y):k[l]===y}).length,x=l=>l>0?`<span class="chili" role="img" aria-label="${e(`${o.services.spice} ${l}/3`)}">${"<i></i>".repeat(Math.min(3,l))}</span>`:"",S=l=>he.filter(y=>{var k;return((k=l.allergens)!=null?k:[]).includes(y)}).map(y=>{var k;return(k=o.allergens[y])!=null?k:y}).join(", "),w=(l,y,k,M)=>`<label class="ck"><input type="checkbox" name="${l}" value="${e(y)}"><span>${e(k)}</span><small>${M}</small></label>`,z=l=>Number(l.qty)>0?Number(l.qty):Math.max(Number(l.min)||0,1);return`<section class="section" id="services" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="sec-head"><div><p class="kicker">${e(o.services.kicker)}</p><h2 id="svc-title" class="h2">${e(o.services.title)}</h2></div><p class="lead">${e(o.services.text)}</p></div>
    <div class="cat">
      <details class="filters" open data-filters>
        <summary>${h("search",18)} ${e(o.filter.title)} <span class="fcount" data-fcount hidden></span></summary>
        <form class="fbody" data-filter-form onsubmit="return false">
          <label class="search">${h("search",16)}<input type="search" name="q" placeholder="${e(o.filter.search)}" autocomplete="off"></label>
          ${u.length>1?`<fieldset><legend>${e(o.filter.type)}</legend>${u.map(l=>w("cat",l.id,r(l.name),N("category",l.id))).join("")}</fieldset>`:""}
          ${g.length>1?`<fieldset><legend>${e(o.filter.unit)}</legend>${g.map(l=>w("unit",l,o.broth[l],N("broth",l))).join("")}</fieldset>`:""}
          ${C.length?`<fieldset><legend>${e(o.filter.fit)}</legend>${C.map(l=>w("fit",l,o.fit[l],N("diet",l))).join("")}</fieldset>`:""}
          <fieldset><legend>${e(o.filter.more)}</legend>${w("rec","1",o.filter.recurring,a.filter(l=>Number(l.spice)>0).length)}</fieldset>
          <button type="reset" class="link" data-reset>${e(o.filter.reset)}</button>
        </form>
      </details>
      <div class="results">
        <div class="res-bar">
          <p data-res-count data-tpl="${e(o.filter.count)}">${e(o.filter.count.replace("{n}",a.length))}</p>
          <label class="sort"><span>${e(o.filter.sort)}</span><select data-sort><option value="">${e(o.filter.sortDefault)}</option><option value="asc">${e(o.filter.sortAsc)}</option><option value="desc">${e(o.filter.sortDesc)}</option></select></label>
        </div>
        <ul class="grid" data-grid>${a.map((l,y)=>{var k,M,q,P,j,$,L;return`<li class="card" id="s-${e(l.id)}" data-i="${y}" data-cat="${e(l.category)}" data-unit="${e((k=l.broth)!=null?k:"")}" data-fit="${e(((M=l.diet)!=null?M:[]).join(" "))}" data-rec="${Number(l.spice)>0?1:0}" data-from="${l.from}" data-name="${e(`${r(l.name)} ${r(l.description)}`.toLowerCase())}">
          <div class="card-img">${l.image?`<img sizes="${K.card}" src="${e(A(i,l.image))}" alt="${e(r(l.name))}" width="600" height="450" loading="lazy">`:""}${r(l.badge)?`<span class="tag">${e(r(l.badge))}</span>`:""}${l.role==="main"?`<span class="rec">${h("star",13)} ${e(o.services.recurring)}</span>`:""}</div>
          <div class="card-body">
            <p class="card-cat">${e((j=r((P=((q=t.categories)!=null?q:[]).find(c=>c.id===l.category))==null?void 0:P.name))!=null?j:"")}</p>
            <h3>${e(r(l.name))} ${x(Number(l.spice)||0)}</h3>
            <p class="desc">${e(r(l.description))}</p>
            <ul class="meta">${l.broth?`<li>${h("drop",14)} ${e(($=o.broth[l.broth])!=null?$:l.broth)}</li>`:""}${((L=l.diet)!=null?L:[]).map(c=>{var v;return`<li class="diet">${h("leaf",14)} ${e((v=o.fit[c])!=null?v:c)}</li>`}).join("")}</ul>
            ${S(l)?`<p class="lvl">${h("shield",14)} ${e(o.services.contains.replace("{list}",S(l)))}</p>`:""}
            <div class="buy-row" data-item="${e(l.id)}" data-unit="${e(l.unit)}" data-min="${Number(l.min)||0}">
              ${l.variants.length>1?`<select class="var" data-var aria-label="${e(r(l.name))}">${l.variants.map((c,v)=>`<option value="${v}" data-price="${c.price}">${e(r(c.label))} \xB7 ${e(s(c.price))}</option>`).join("")}</select>`:""}
              <p class="price"><b data-price-out data-tpl="${e(o.per.replace("{unit}",p(l.unit)))}">${e(d(l,l.variants[0].price))}</b></p>
              <div class="qty"><button type="button" data-step="-1" aria-label="\u2212">${h("minus",14)}</button><input type="number" inputmode="numeric" min="1" value="${z(l)}" data-qty aria-label="${e(p(l.unit))}"><span data-u1="${e(m(l.unit,1))}" data-un="${e(m(l.unit,2))}">${e(m(l.unit,z(l)))}</span><button type="button" data-step="1" aria-label="+">${h("plus",14)}</button></div>
              <button type="button" class="btn btn--line btn--sm btn--full" data-add>${h("plus",16)} <span data-add-label data-added="${e(o.services.added)}">${e(o.services.add)}</span></button>
            </div>
          </div>
        </li>`}).join("")}</ul>
        <p class="empty" data-empty hidden>${e(o.filter.empty)}</p>
      </div>
    </div>
  </div>
</section>`}function Ce(n){var y,k,M,q,P,j,$,L;let{site:t,items:a,t:o,L:r,money:i,channels:s,gform:d,market:p,unitLabel:m,unitPl:b,minOrder:f,peak:u}=n;if(!a.length)return"";let g=o.book,C=((y=t.frequencies)!=null?y:[]).filter(c=>(c==null?void 0:c.id)&&r(c.label)),N=((k=t.homeTypes)!=null?k:[]).filter(c=>r(c==null?void 0:c.label)),x=((M=t.slots)!=null?M:[]).filter(Boolean),S=a.map(c=>{var v,D;return{id:c.id,name:r(c.name),unit:c.unit,u:m(c.unit),un:b(c.unit,2),min:Number(c.min)||0,role:(v=c.role)!=null?v:"",al:(D=c.allergens)!=null?D:[],v:c.variants.map(R=>({label:r(R.label),p:R.price}))}}),w=t.combo&&(q=F(t.combo,p))!=null?q:0,z=o.orderText.replace(/\{\w+\}/g,"\u2026"),T=d?` data-gform="${e(d.action)}" data-gmap='${e(JSON.stringify(d.fields))}'`:"",l=c=>s.map((v,D)=>{var R,B;return`<button type="submit" class="btn ${c!=null?c:D?"btn--line":"btn--primary"} btn--lg" data-channel="${e(v)}" data-href="${e(V(v,(R=t.contact)!=null?R:{},z))}">${h(v,18)} ${e(v==="phone"?g.call:g.send.replace("{channel}",(B=o.via[v])!=null?B:v))}</button>`}).join("");return`<section class="section section--soft" id="quote" aria-labelledby="quote-title">
  <script type="application/json" id="kp-items">${JSON.stringify(S).replace(/</g,"\\u003c")}<\/script>
  <div class="wrap quote">
    <div class="q-list">
      <p class="kicker">${e(o.quote.kicker)}</p>
      <h2 id="quote-title" class="h2">${e(o.quote.title)}</h2>
      <p class="lead">${e(o.quote.text)}</p>
      <ul class="q-items" data-q-items></ul>
      <p class="q-empty" data-q-empty>${h("doc",18)} ${e(o.quote.empty)} <a class="link" href="#services">${e(o.quote.browse)}</a></p>
      ${w?`<p class="packs">${h("card",16)} <span><b>${e(o.quote.freq)}</b> ${e(o.quote.pack.replace("{p}",i(w)))}</span></p><p class="small muted" data-pack-hint data-tpl="${e(o.quote.packHint)}" data-roles='${e(JSON.stringify((P=o.quote.roles)!=null?P:{}))}' hidden></p>`:""}
      <dl class="sum">
        <div><dt>${e(o.quote.subtotal)}</dt><dd data-sum-sub>${e(i(0))}</dd></div>
        <div data-sum-off-row hidden><dt>${e(o.quote.discount)}</dt><dd data-sum-off></dd></div>
        <div data-sum-min-row hidden><dt>${e(o.quote.minFee.replace("{price}",f!=null?i(f):""))}</dt><dd data-sum-min></dd></div>
        <div class="sum-total"><dt>${e(o.quote.total)}</dt><dd data-sum-total>${e(i(0))}</dd></div>
      </dl>
      ${f!=null?`<p class="small muted">${e(o.quote.minNote.replace("{price}",i(f)))}</p>`:""}
    </div>
    <form class="order" id="book-form" data-book-form${T} data-text="${e(o.orderText)}" data-market="${e(`${p.id.toUpperCase()} \xB7 ${p.currency}`)}" data-currency="${e(p.currency)}" data-lang="${e(p.lang)}" data-min-order="${f!=null?f:0}" data-combo="${w}" data-combo-label="${e(o.quote.discount)}" data-lead="${Number((j=t.booking)==null?void 0:j.leadDays)||0}" data-peak-from="${e(($=u==null?void 0:u.from)!=null?$:"")}" data-peak-pct="${(L=u==null?void 0:u.pct)!=null?L:0}" novalidate>
      <div class="order-fields">
        <p class="order-title">${h("calendar",20)} ${e(g.title)}</p>
        <div class="fields">
          <label><span>${e(g.date)} *</span><input name="date" type="date" required data-date></label>
          ${x.length?`<label><span>${e(g.slot)} *</span><select name="slot" required>${x.map(c=>`<option>${e(c)}</option>`).join("")}</select></label>`:""}
          <label class="wide"><span>${e(g.cert)}</span><select name="last">${g.lastList.map(c=>`<option>${e(c)}</option>`).join("")}</select></label>
          <label><span>${e(g.name)} *</span><input name="name" autocomplete="name" required></label>
          <label><span>${e(g.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required></label>
          <label class="wide"><span>${e(g.note)}</span><input name="note" placeholder="${e(g.noteHint)}"></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        </div>
        <fieldset class="opts"><legend>${e(g.lastDive)}</legend><div class="row" data-avoid>${he.filter(c=>a.some(v=>{var D;return((D=v.allergens)!=null?D:[]).includes(c)})).map(c=>{var v;return`<label class="opt opt--check"><input type="checkbox" name="avoid" value="${e(c)}"><span>${e((v=o.allergens[c])!=null?v:c)}</span></label>`}).join("")}</div></fieldset>
        <fieldset class="opts"><legend>${e(g.extras)}</legend><div class="row">${g.extraList.map(c=>`<label class="opt opt--check"><input type="checkbox" name="extra" value="${e(c)}"><span>${e(c)}</span></label>`).join("")}</div></fieldset>
        <p class="warn" data-cert-warn data-tpl="${e(g.certWarn)}" hidden></p>
        <p class="form-err" data-err hidden data-empty-msg="${e(g.needItems)}" data-req-msg="${e(g.required)}">${e(g.required)}</p>
        <div class="buy"><button type="submit" class="btn btn--primary btn--lg btn--full" data-order-submit>${h("calendar",18)} <span>${e(g.submit)}</span></button></div>
        <noscript><p>${s.map(c=>{var v,D;return`<a href="${e(V(c,(v=t.contact)!=null?v:{},z))}" ${U(c)}>${e((D=o.via[c])!=null?D:c)}</a>`}).join(" \xB7 ")}</p></noscript>
      </div>
      <div class="done${d?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${h(d?"check":"arrow",22)} ${e(d?g.done:g.stepTitle)}</p>
        <p>${e(d?g.doneText:g.stepText)}</p>
        <div class="buy">${l(d?"btn--line":void 0)}</div>
        ${d?"":`<button type="button" class="link back" data-edit>${e(g.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function Re({site:n,t,L:a}){var r;let o=((r=n.checklist)!=null?r:[]).filter(i=>a(i==null?void 0:i.room)&&ue(a(i.items)).length);return o.length?`<section class="section" id="sites" aria-labelledby="rooms-title">
  <div class="wrap">
    <div class="sec-head"><div><p class="kicker">${e(t.rooms.kicker)}</p><h2 id="rooms-title" class="h2">${e(t.rooms.title)}</h2></div><p class="lead">${e(t.rooms.text)}</p></div>
    <div class="rooms" data-rooms>
      <div class="room-tabs" role="tablist">${o.map((i,s)=>`<button type="button" role="tab" id="rt-${s}" aria-controls="rp-${s}" aria-selected="${s?"false":"true"}" data-room="${s}">${e(a(i.room))}</button>`).join("")}</div>
      ${o.map((i,s)=>`<div class="room-panel" role="tabpanel" id="rp-${s}" aria-labelledby="rt-${s}" data-panel="${s}"><h3>${e(a(i.room))}</h3><ul>${ue(a(i.items)).map(d=>`<li>${h("check",16)} ${e(d)}</li>`).join("")}</ul></div>`).join("")}
    </div>
  </div>
</section>`:""}function Le({site:n,t,L:a}){var r;let o=((r=n.promises)!=null?r:[]).filter(i=>a(i==null?void 0:i.title));return o.length?`<section class="section section--dark" id="kitchen" aria-labelledby="pr-title">
  <div class="wrap">
    <div class="sec-head"><div><p class="kicker">${e(t.promises.kicker)}</p><h2 id="pr-title" class="h2">${e(t.promises.title)}</h2></div></div>
    <ul class="promises">${o.map(i=>{var s;return`<li>${h((s=i.icon)!=null?s:"shield",26)}<b>${e(a(i.title))}</b><p>${e(a(i.text))}</p></li>`}).join("")}</ul>
  </div>
</section>`:""}function Ee({site:n,t,L:a}){var r;let o=((r=n.steps)!=null?r:[]).filter(i=>a(i==null?void 0:i.title));return o.length?`<section class="section" id="how" aria-labelledby="steps-title">
  <div class="wrap">
    <div class="sec-head"><div><p class="kicker">${e(t.steps.kicker)}</p><h2 id="steps-title" class="h2">${e(t.steps.title)}</h2></div></div>
    <ol class="steps">${o.map((i,s)=>`<li><span class="n">${s+1}</span><b>${e(a(i.title))}</b>${a(i.text)?`<p>${e(a(i.text))}</p>`:""}</li>`).join("")}</ol>
    ${a(n.areas)?`<p class="areas">${h("pin",18)} <span><b>${e(t.steps.areas)}</b> ${e(a(n.areas))}</span></p>`:""}
  </div>
</section>`:""}function Ae({site:n,t,url:a}){var r;let o=((r=n.album)!=null?r:[]).filter(i=>i==null?void 0:i.image);return o.length?`<section class="section section--soft" id="album" aria-labelledby="album-title">
  <div class="wrap">
    <div class="sec-head"><div><p class="kicker">${e(t.album.kicker)}</p><h2 id="album-title" class="h2">${e(t.album.title)}</h2></div></div>
    <ul class="album" data-album>${o.map((i,s)=>`<li${s>=pe?' class="is-more"':""}><a href="${e(A(a,i.image))}" data-zoom="${s}"><img sizes="${K.card}" src="${e(A(a,i.image))}" alt="" width="600" height="450" loading="lazy"></a></li>`).join("")}</ul>
    ${o.length>pe?`<div class="more"><button type="button" class="btn btn--line" data-album-more hidden>${e(t.album.more)}</button></div>`:""}
    <dialog class="lightbox" data-lightbox aria-label="${e(t.album.title)}">
      <img src="" alt="" data-lb-img>
      <button type="button" class="lb-close" data-lb-close aria-label="${e(t.album.close)}">\u2715</button>
      <button type="button" class="lb-nav lb-prev" data-lb-step="-1" aria-label="${e(t.album.prev)}">${h("chevron",26)}</button>
      <button type="button" class="lb-nav lb-next" data-lb-step="1" aria-label="${e(t.album.next)}">${h("chevron",26)}</button>
    </dialog>
  </div>
</section>`:""}function Be({site:n,t,L:a,lang:o}){let r=oe(n,t,o,"btn btn--line"),i=ie(n);return n.showReviews===!1||!i.length&&!r?"":`<section class="section" aria-labelledby="rev-title">
  <div class="wrap">
    <div class="sec-head"><div><h2 id="rev-title" class="h2">${e(t.reviews.title)}</h2></div></div>
    ${le(i,o,"reviews",s=>`<figure class="review">
      <p class="stars" aria-label="${e(s.rating)}/5">${Array.from({length:5},(d,p)=>`<span class="${p<s.rating?"on":""}">${h("star",15)}</span>`).join("")}</p>
      <blockquote>${e(a(s.text))}</blockquote>
      <figcaption>${e(s.name)}${a(s.bought)?`<small>${e(a(s.bought))}</small>`:""}${se(s,o)}</figcaption>
    </figure>`)}${r}
  </div>
</section>`}function Oe({site:n,t,L:a}){var r;let o=((r=n.faq)!=null?r:[]).filter(i=>a(i==null?void 0:i.q));return o.length?`<section class="section section--soft" aria-labelledby="faq-title">
  <div class="wrap faq">
    <h2 id="faq-title" class="h2">${e(t.faq.title)}</h2>
    <div>${o.map((i,s)=>`<details${s===0?" open":""}><summary>${e(a(i.q))}</summary><p>${e(a(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function Ve({site:n,t,L:a,channels:o}){var d,p,m;let r=(d=n.contact)!=null?d:{},i=encodeURIComponent((p=r.mapQuery)!=null?p:a(r.address)),s=b=>b.length===7?t.visit.everyDay:ee(b,t.days);return`<section class="section" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit">
    <div class="visit-info">
      <h2 id="visit-title" class="h2">${e(t.visit.title)}</h2>
      ${J(n,t)}
      ${((m=n.hours)!=null?m:[]).length?`<table class="hours"><tbody>${n.hours.map(b=>`<tr><th scope="row">${e(s(b.days))}</th><td>${e(b.open)} \u2013 ${e(b.close)}</td></tr>`).join("")}</tbody></table>`:""}
      ${a(r.address)?`<p class="addr">${h("pin",18)} ${e(a(r.address))}</p>`:""}
      <div class="actions">
        ${o.map((b,f)=>{var u;return`<a class="btn ${f?"btn--line":"btn--primary"}" href="${e(V(b,r))}" ${U(b)}>${h(b,18)} ${e((u=t.via[b])!=null?u:b)}</a>`}).join("")}
      </div>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`}function Fe({site:n,t,L:a,market:o}){var s,d;let r=(s=n.contact)!=null?s:{},i=Object.entries((d=n.social)!=null?d:{}).filter(([,p])=>p);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(n.name)}</p><p class="muted">${e(a(n.tagline))}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li>${e(t.footer.hotline)}: <a href="tel:${E(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${a(r.address)?`<li>${e(a(r.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([p,m])=>`<li><a href="${e(m)}" target="_blank" rel="noopener">${e(p==="tiktok"?"TikTok":p==="youtube"?"YouTube":p[0].toUpperCase()+p.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${n.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(n.name)}</span>${ce(n,t,o.lang)}</div>
</footer>`}function Ge({site:n,market:t,L:a,abs:o,items:r,unitLabel:i}){var p,m,b;let s=(p=n.contact)!=null?p:{},d=n.heroImage||((m=r[0])==null?void 0:m.image);return{"@context":"https://schema.org","@type":"Restaurant",servesCuisine:"Japanese, Ramen",acceptsReservations:!1,name:n.name,url:o(`${t.id}/`),...d?{image:o(G(d))}:{},description:a(n.intro),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:a(s.address)},...a(n.areas)?{areaServed:a(n.areas)}:{},currenciesAccepted:t.currency,openingHoursSpecification:te((b=n.hours)!=null?b:[]),hasOfferCatalog:{"@type":"OfferCatalog",name:n.name,itemListElement:r.flatMap(f=>f.variants.map(u=>({"@type":"Offer",name:f.variants.length>1?`${a(f.name)} \xB7 ${a(u.label)}`:a(f.name),priceSpecification:{"@type":"UnitPriceSpecification",price:u.price,priceCurrency:t.currency,unitText:i(f.unit)},itemOffered:{"@type":"MenuItem",name:a(f.name),description:a(f.description)}})))}}}var He=({site:n,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:n.faq.filter(a=>t(a==null?void 0:a.q)).map(a=>({"@type":"Question",name:t(a.q),acceptedAnswer:{"@type":"Answer",text:t(a.a)}}))});export{at as renderSite};
