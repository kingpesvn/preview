var X={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>X[t]);function C(a,t,n="vi"){var l,s,i;return a==null?"":typeof a!="object"?String(a):(i=(s=(l=a[t])!=null?l:a[n])!=null?s:Object.values(a)[0])!=null?i:""}function B(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var N=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,x=(a,t)=>{let n=N(t);return n==null?t:a(n)},$=(a="")=>String(a).replace(/\D/g,"");function R(a,t,n=""){switch(a){case"phone":return`tel:${$(t.phone)}`;case"zalo":return`https://zalo.me/${$(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${$(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var q=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,Q=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function V(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let l={};for(let[s,i]of t.searchParams){if(!/^entry\.\d+$/.test(s))continue;let r=i.trim().replace(/^\{|\}$/g,"").toLowerCase();Q.includes(r)&&(l[r]=s)}return Object.keys(l).length?l.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:l}:{error:"no-phone"}:{error:"no-fields"}}var E={card:"auto, (max-width: 640px) 50vw, 280px",wide:"auto, (max-width: 640px) 100vw, 580px",thumb:"auto, 120px"};var ee={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8c-1.5-3-6-4-6-1.5S10 8 12 8zm0 0c1.5-3 6-4 6-1.5S14 8 12 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},b=(a,t=20,n="")=>{var l;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(l=ee[a])!=null?l:""}</svg>`},T=[1,2,3,4,5,6,0],te=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function L(a,t){let n=a.map(s=>T.indexOf(s)).sort((s,i)=>s-i);return n.every((s,i)=>i===0||s===n[i-1]+1)&&n.length>2?`${t[T[n[0]]]} \u2013 ${t[T[n.at(-1)]]}`:n.map(s=>t[T[s]]).join(", ")}var F=a=>a.map(t=>({"@type":"OpeningHoursSpecification",dayOfWeek:t.days.map(n=>te[n]),opens:t.open,closes:t.close}));var G=a=>a==="phone"||a==="email"?"":'target="_blank" rel="noopener"',O=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`;var A={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},ae=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,ne=a=>{var t;try{let n=new URL(String((t=a.googleReview)!=null?t:"").trim());return n.protocol==="https:"&&ae.test(n.hostname)?n.href:""}catch{return""}},H=(a,t,n,l="btn btn--line")=>{var r;let s=ne(a);if(!s)return"";let i=typeof t.reviews=="object"&&((r=t.reviews)==null?void 0:r.google)||A[n]||A.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${l}" href="${e(s)}" target="_blank" rel="noopener">${b("star",16)} ${e(i)}</a></p>`},j={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},I={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},U=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function W(a,t){var i,r,c;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!n)return"";let l=new Date(Date.UTC(+n[1],+n[2]-1,+((r=n[3])!=null?r:1)));if(Number.isNaN(l.getTime()))return"";let s=new Intl.DateTimeFormat((c=I[t])!=null?c:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(l);return`<time class="rv-date" datetime="${e(a.date)}">${e(s)}</time>`}function oe(a,t){var r,c;let n=a.filter(o=>o.rating>=1&&o.rating<=5);if(n.length<2)return"";let l=n.reduce((o,u)=>o+Number(u.rating),0)/n.length,s=(r=j[t])!=null?r:j.en,i=new Intl.NumberFormat((c=I[t])!=null?c:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(l);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${b("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(s.count.replace("{n}",String(a.length)))}</span></p>`}function _(a,t,n,l){var r;if(!a.length)return"";let s=(r=j[t])!=null?r:j.en,i=c=>`<button type="button" class="rv-btn" data-rv-${c} aria-label="${e(c==="prev"?s.prev:s.next)}">${b("arrow",18,c==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${oe(a,t)}<div class="rv" data-rv data-rv-more="${e(s.more)}" data-rv-less="${e(s.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(l).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${re}`}var re=`<style>
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
upd()}})()<\/script>`;var K=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function J({site:a,markets:t,url:n,abs:l}){var r;let s=(r=t.find(c=>c.default))!=null?r:t[0],i=t.map(c=>({id:c.id,lang:c.lang,country:c.country}));return`<!doctype html>
<html lang="${e(s.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${l(`${s.id}/`)}">
${t.map(c=>`<link rel="alternate" hreflang="${e(c.lang)}-${e(c.country)}" href="${l(`${c.id}/`)}">`).join(`
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
<body><p>${t.map(c=>`<a href="${n(`${c.id}/`)}">${e(c.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var se="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:ital,wght@0,300;0,400;0,500;1,300&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap";function Ee({site:a,catalog:t,i18n:n,template:l,basePath:s="/",siteUrl:i=a.domain}){let r=B(s),c=p=>new URL(r(p),i).href,o=t.markets,u=V(a.bookingForm),d=u&&!u.error?u:null,f=o.map(p=>{var k,w,M,D,m;let h=p.lang,g=(w=(k=n[h])!=null?k:n.en)!=null?w:n.vi,v=S=>C(S,h,"en"),y=((M=t.products)!=null?M:[]).filter(S=>v(S==null?void 0:S.name)),z=(m=(D=a.bookingChannels)==null?void 0:D[p.id])!=null?m:["phone"],P={site:a,catalog:t,market:p,markets:o,lang:h,t:g,L:v,url:r,abs:c,rites:y,channels:z,template:l,gform:d};return{path:`${p.id}/index.html`,html:le(P)}});return f.push({path:"index.html",html:J({site:a,markets:o,url:r,abs:c})}),f}var Z=a=>{let t=String(a!=null?a:"").match(/^(\d{1,2})\s*\/\s*(\d{1,2})$/);return t&&+t[1]>=1&&+t[1]<=30&&+t[2]>=1&&+t[2]<=12?[+t[1],+t[2]]:null},ie=(a,t,n)=>a.lunar.dm.replace("{d}",t).replace("{m}",a.lunar.months[n-1]);function le(a){var v,y,z,P,k,w,M,D;let{site:t,market:n,markets:l,lang:s,t:i,L:r,url:c,abs:o}=a,u=`${t.name} \xB7 ${r(t.tagline)}`,d=(v=t.theme)!=null?v:{},f=["primary","ink","bg","surface","soft","accent"].filter(m=>d[m]).map(m=>`--${m}:${d[m]}`).join(";"),p=(y=l.find(m=>m.default))!=null?y:l[0],h=l.map(m=>({id:m.id,lang:m.lang,country:m.country,currency:m.currency,href:c(`${m.id}/`)})),g=(z=t.contact)!=null?z:{};return`<!doctype html>
<html lang="${e(s)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(u)}</title>
<meta name="description" content="${e(r(t.intro))}">
<link rel="canonical" href="${o(`${n.id}/`)}">
${l.map(m=>`<link rel="alternate" hreflang="${e(m.lang)}-${e(m.country)}" href="${o(`${m.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${o(`${p.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(u)}">
<meta property="og:description" content="${e(r(t.intro))}">
<meta property="og:url" content="${o(`${n.id}/`)}">
<meta property="og:site_name" content="${e(t.name)}">
<meta property="og:image" content="${e(o(N(t.heroImage||"photos/h-hero.webp")))}">
<meta name="theme-color" content="${e((P=d.bg)!=null?P:"#100F0D")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${se}">
<link rel="stylesheet" href="${c("assets/style.css")}">
<style>:root{${f}}</style>
${q(ye(a))}${((k=t.faq)!=null?k:[]).length?q($e(a)):""}
<script src="${c("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(h))}' data-wa="${e($((w=g.whatsapp)!=null?w:""))}" data-email="${e((M=g.email)!=null?M:"")}" data-copied="${e(i.copied)}" data-lang="${e(s)}" data-tz="${e((D=t.timezone)!=null?D:"Asia/Ho_Chi_Minh")}" data-lunar-tz="${Number(t.lunarTz)||7}">
<script type="application/json" id="lunar-t">${JSON.stringify(i.lunar).replace(/</g,"\\u003c")}<\/script>
<a class="skip" href="#main">${e(i.skip)}</a>
${O(i)}
${ce(a)}
<main id="main">
  ${pe(a)}
  ${de(a)}
  ${he(a)}
  ${ue(a)}
  ${me(a)}
  ${ge(a)}
  ${fe(a)}
  ${ve(a)}
</main>
${be(a)}
</body>
</html>
`}function ce({site:a,market:t,markets:n,t:l,url:s}){return`<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${s(`${t.id}/`)}">
      ${a.logo?`<img src="${e(x(s,a.logo))}" alt="" width="34" height="34">`:`<span class="brand-mark" aria-hidden="true">${Y(30)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="${e(l.nav.label)}">
      <a href="#schedule">${e(l.nav.schedule)}</a>
      <a href="#festivals">${e(l.nav.festivals)}</a>
      <a href="#register">${e(l.nav.register)}</a>
      <a href="#donate">${e(l.nav.donate)}</a>
      <a href="#visit">${e(l.nav.visit)}</a>
    </nav>
    ${n.length>1?`<details class="market">
      <summary aria-label="${e(l.market.label)}">${b("globe",16)}<span>${e(t.id.toUpperCase())}</span></summary>
      <ul>${n.map(i=>`<li><a href="${s(`${i.id}/`)}" hreflang="${e(i.lang)}"${i.id===t.id?' aria-current="true"':""}>${e(i.country)} \xB7 ${e(i.lang.toUpperCase())}</a></li>`).join("")}</ul>
    </details>`:""}
  </div>
</header>`}var Y=a=>`<svg width="${a}" height="${a}" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M20 8c4 5 4 13 0 20-4-7-4-15 0-20Z"/><path d="M20 28c-3-6-9-10-15-10 1 7 7 11 15 10Z"/><path d="M20 28c3-6 9-10 15-10-1 7-7 11-15 10Z"/><path d="M8 32h24"/></svg>`;function pe({site:a,t,L:n,url:l}){return`<section class="hero" aria-labelledby="h-title">
  <img class="hero-bg" src="${e(x(l,a.heroImage||"photos/h-hero.webp"))}" alt="" width="1920" height="1080" fetchpriority="high">
  <div class="wrap hero-in">
    ${n(a.heroKicker)?`<p class="kicker">${e(n(a.heroKicker))}</p>`:""}
    <h1 id="h-title">${e(n(a.tagline))}</h1>
    ${n(a.intro)?`<p class="lead">${e(n(a.intro))}</p>`:""}
    <p class="actions"><a class="btn btn--gold" href="#register">${e(t.hero.register)}</a><a class="btn btn--line" href="#schedule">${e(t.hero.schedule)}</a></p>
  </div>
  <div class="today" data-today hidden>
    <div class="wrap today-in">
      <p><small>${e(t.today.label)}</small><b data-today-solar></b></p>
      <p><small>${e(t.today.lunar)}</small><b data-today-lunar></b></p>
      <p><small>${e(t.today.next)}</small><b data-today-next></b></p>
    </div>
  </div>
</section>`}function de({site:a,t,L:n}){var i;let l=((i=a.schedule)!=null?i:[]).filter(r=>n(r==null?void 0:r.name)&&r.time);if(!l.length)return"";let s=r=>{var c,o;return(c=r.lunar)!=null&&c.length?t.lunar.days.replace("{list}",r.lunar.join(", ")):!((o=r.days)!=null&&o.length)||r.days.length===7?t.visit.everyDay:L(r.days,t.days)};return`<section class="sec wrap" id="schedule" aria-labelledby="sc-title">
  <div class="sec-head"><p class="eyebrow">${e(t.schedule.eyebrow)}</p><h2 id="sc-title" class="h2">${e(t.schedule.title)}</h2><p class="muted">${e(t.schedule.text)}</p></div>
  <ul class="sched">${l.map(r=>{var c,o;return`<li data-days="${e(((c=r.days)!=null?c:[]).join(" "))}" data-lunar="${e(((o=r.lunar)!=null?o:[]).join(" "))}">
    <span class="sc-time">${e(r.time)}</span>
    <span class="sc-t"><b>${e(n(r.name))}</b>${n(r.note)?`<small>${e(n(r.note))}</small>`:""}</span>
    <span class="sc-when">${e(s(r))}</span>
    <span class="sc-today" hidden>${e(t.schedule.today)}</span>
  </li>`}).join("")}</ul>
</section>`}function he({site:a,t,L:n,url:l}){var i;let s=((i=a.festivals)!=null?i:[]).filter(r=>n(r==null?void 0:r.name)&&Z(r.lunar));return s.length?`<section class="sec sec--dark" id="festivals" aria-labelledby="fe-title">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">${e(t.festivals.eyebrow)}</p><h2 id="fe-title" class="h2">${e(t.festivals.title)}</h2><p class="muted">${e(t.festivals.text)}</p></div>
    <ol class="fest" data-fest data-in="${e(t.festivals.inDays)}" data-today="${e(t.festivals.isToday)}" data-tomorrow="${e(t.festivals.tomorrow)}">${s.map(r=>{let[c,o]=Z(r.lunar);return`<li class="fe" data-ld="${c}" data-lm="${o}">
      ${r.image?`<img sizes="${E.card}" src="${e(x(l,r.image))}" alt="" width="900" height="600" loading="lazy">`:""}
      <div class="fe-t">
        <p class="fe-date"><span>${e(ie(t,c,o))}</span><b data-fe-solar></b></p>
        <h3>${e(n(r.name))}</h3>
        ${n(r.text)?`<p class="muted">${e(n(r.text))}</p>`:""}
        <p class="fe-in" data-fe-in hidden></p>
      </div>
    </li>`}).join("")}</ol>
  </div>
</section>`:""}function ue(a){var p;let{t,L:n,rites:l,channels:s,gform:i,site:r}=a;if(!l.length)return"";let c=(p=r.contact)!=null?p:{},o=t.form,u=i?` data-gform="${e(i.action)}" data-gmap='${e(JSON.stringify(i.fields))}'`:"",d=t.orderText.replace(/\{\w+\}/g,"\u2026"),f=h=>s.map((g,v)=>{var y;return`<button type="submit" class="btn btn--full ${h!=null?h:v?"btn--line":"btn--gold"}" data-channel="${e(g)}" data-href="${e(R(g,c,d))}">${b(g,18)} ${e(g==="phone"?o.call:o.send.replace("{channel}",(y=t.via[g])!=null?y:g))}</button>`}).join("");return`<section class="sec wrap" id="register" aria-labelledby="rg-title">
  <div class="reg">
    <div class="reg-l">
      <p class="eyebrow">${e(t.register.eyebrow)}</p>
      <h2 id="rg-title" class="h2">${e(t.register.title)}</h2>
      <p class="muted">${e(t.register.text)}</p>
      <ul class="rites">${l.map(h=>`<li><h3>${e(n(h.name))}</h3>${n(h.description)?`<p class="muted">${e(n(h.description))}</p>`:""}</li>`).join("")}</ul>
      <p class="free-note">${e(t.register.offering)}</p>
    </div>
    <form class="reg-form" data-order novalidate${u} data-text="${e(t.orderText)}">
      <div class="order-fields">
        <fieldset class="field"><legend>${e(o.rite)}</legend><div class="pills">${l.map((h,g)=>{var v;return`<label><input type="radio" name="product" value="${e(n(h.name))}" data-need="${e((v=h.need)!=null?v:"")}"${g?"":" checked"}><span>${e(n(h.name))}</span></label>`}).join("")}</div></fieldset>
        <label class="field"><span>${e(o.date)}</span><input name="date" type="date"></label>
        <div class="chips" data-dates aria-label="${e(o.suggest)}" hidden></div>
        <label class="field" data-names><span data-names-label data-birth="${e(o.namesBirth)}" data-death="${e(o.namesDeath)}" data-people="${e(o.namesPeople)}" data-plain="${e(o.namesPlain)}">${e(o.namesBirth)}</span>
          <textarea name="names" rows="4" maxlength="1500" data-ph-birth="${e(o.phBirth)}" data-ph-death="${e(o.phDeath)}" data-ph-people="${e(o.phPeople)}" placeholder="${e(o.phBirth)}"></textarea>
          <small class="count" data-names-count data-tpl="${e(o.count)}"></small></label>
        <div class="row2">
          <label class="field"><span>${e(o.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(o.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        </div>
        <label class="field"><span>${e(o.note)}</span><textarea name="note" rows="2" maxlength="500" placeholder="${e(o.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(o.required)}</p>
        <button class="btn btn--gold btn--full" type="submit" data-submit>${e(o.submit)}</button>
        <p class="hint">${e(o.privacy)}</p>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${e(i?o.done:o.stepTitle)}</p>
        <p>${e(i?o.doneText:o.stepText)}</p>
        <div class="buy">${f(i?"btn--line":void 0)}</div>
        ${i?"":`<button type="button" class="link back" data-edit>${e(o.edit)}</button>`}
      </div>
      <p class="form-msg" role="status" hidden></p>
    </form>
  </div>
</section>`}function me({site:a,t,L:n,url:l}){var c,o,u;let s=(c=a.donate)!=null?c:{},i=((o=s.accounts)!=null?o:[]).filter(d=>d==null?void 0:d.number),r=String((u=n(s.purposes))!=null?u:"").split(`
`).map(d=>d.trim()).filter(Boolean);return!i.length&&!n(s.text)?"":`<section class="sec sec--dark" id="donate" aria-labelledby="dn-title">
  <div class="wrap donate">
    <div>
      <p class="eyebrow">${e(t.donate.eyebrow)}</p>
      <h2 id="dn-title" class="h2">${e(t.donate.title)}</h2>
      ${n(s.text)?`<p class="lead">${e(n(s.text))}</p>`:""}
      ${r.length?`<ul class="purposes">${r.map(d=>`<li>${e(d)}</li>`).join("")}</ul>`:""}
    </div>
    <div class="accs">${i.map(d=>{var f,p;return`<div class="acc">
      ${d.qr?`<img src="${e(x(l,d.qr))}" alt="${e(t.donate.qr)}" width="200" height="200" loading="lazy">`:""}
      <p class="acc-bank">${e((p=(f=n(d.bank))!=null?f:d.bank)!=null?p:"")}</p>
      <p class="acc-no">${e(d.number)}</p>
      ${d.holder?`<p class="muted">${e(d.holder)}</p>`:""}
      <button type="button" class="btn btn--line btn--sm" data-copy="${e(String(d.number).replace(/\s+/g,""))}" data-done-label="${e(t.donate.copied)}">${e(t.donate.copy)}</button>
    </div>`}).join("")}</div>
  </div>
</section>`}function ge({site:a,t,L:n,url:l}){var r,c;let s=String((r=n(a.etiquette))!=null?r:"").split(`
`).map(o=>o.trim()).filter(Boolean),i=((c=a.gallery)!=null?c:[]).filter(o=>o==null?void 0:o.image);return!s.length&&!i.length?"":`<section class="sec wrap" id="guide" aria-labelledby="gd-title">
  <div class="sec-head"><p class="eyebrow">${e(t.guide.eyebrow)}</p><h2 id="gd-title" class="h2">${e(t.guide.title)}</h2></div>
  ${s.length?`<ol class="rules">${s.map(o=>`<li>${e(o)}</li>`).join("")}</ol>`:""}
  ${i.length?`<div class="gallery">${i.map((o,u)=>{var d;return`<figure class="${u%5===0?"wide":""}"><img sizes="${E.card}" src="${e(x(l,o.image))}" alt="${e((d=n(o.caption))!=null?d:"")}" width="1200" height="800" loading="lazy">${n(o.caption)?`<figcaption>${e(n(o.caption))}</figcaption>`:""}</figure>`}).join("")}</div>`:""}
</section>`}function fe({site:a,t,L:n,lang:l}){let s=H(a,t,l,"btn btn--line"),i=U(a);return a.showReviews===!1||!i.length&&!s?"":`<section class="sec wrap" aria-labelledby="rv-title">
  <div class="sec-head"><h2 id="rv-title" class="h2">${e(t.reviews.title)}</h2></div>
  ${_(i,l,"reviews",r=>`<figure class="review">
    <p class="stars" aria-label="${e(r.rating)}/5">${Array.from({length:5},(c,o)=>`<span class="${o<r.rating?"on":""}">${b("star",14)}</span>`).join("")}</p>
    <blockquote>${e(n(r.text))}</blockquote>
    <figcaption>${e(r.name)}${W(r,l)}</figcaption>
  </figure>`)}${s}
</section>`}function ve({site:a,t,L:n,channels:l}){var o,u,d,f;let s=(o=a.contact)!=null?o:{},i=encodeURIComponent((u=s.mapQuery)!=null?u:n(s.address)),r=p=>p.length===7?t.visit.everyDay:L(p,t.days),c=((d=a.faq)!=null?d:[]).filter(p=>n(p==null?void 0:p.q));return`<section class="sec wrap" id="visit" aria-labelledby="v-title">
  <div class="visit">
    <div>
      <p class="eyebrow">${e(t.visit.eyebrow)}</p>
      <h2 id="v-title" class="h2">${e(t.visit.title)}</h2>
      ${n(s.address)?`<p class="addr">${e(n(s.address))}</p>`:""}
      ${((f=a.hours)!=null?f:[]).length?`<table class="hours"><caption>${e(t.visit.gates)}</caption><tbody>${a.hours.map(p=>`<tr><th scope="row">${e(r(p.days))}</th><td>${e(p.open)} \u2013 ${e(p.close)}</td></tr>`).join("")}</tbody></table>`:""}
      <p class="actions">
        <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${i}" target="_blank" rel="noopener">${e(t.visit.directions)}</a>
        ${l.map(p=>{var h;return`<a class="btn btn--line" href="${e(R(p,s))}" ${G(p)}>${b(p,18)} ${e((h=t.via[p])!=null?h:p)}</a>`}).join("")}
      </p>
    </div>
    <div class="map"><iframe title="${e(t.visit.title)}" src="https://www.google.com/maps?q=${i}&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
  ${c.length?`<div class="faq"><h2 class="h3">${e(t.faq.title)}</h2>${c.map((p,h)=>`<details${h===0?" open":""}><summary>${e(n(p.q))}</summary><p>${e(n(p.a))}</p></details>`).join("")}</div>`:""}
</section>`}function be({site:a,t,L:n,market:l}){var r,c;let s=(r=a.contact)!=null?r:{},i=Object.entries((c=a.social)!=null?c:{}).filter(([,o])=>o);return`<footer class="footer"><div class="wrap">
  <p class="foot-mark" aria-hidden="true">${Y(40)}</p>
  <p class="foot-name">${e(a.name)}</p>
  ${n(a.disclaimer)?`<p class="disclaimer">${e(n(a.disclaimer))}</p>`:""}
  <p>${s.phone?`${e(t.footer.hotline)}: <a href="tel:${$(s.phone)}">${e(s.phone)}</a>`:""}${s.email?` \xB7 <a href="mailto:${e(s.email)}">${e(s.email)}</a>`:""}</p>
  ${i.length?`<p class="social">${i.map(([o,u])=>`<a href="${e(u)}" target="_blank" rel="noopener">${e(o==="tiktok"?"TikTok":o==="youtube"?"YouTube":o[0].toUpperCase()+o.slice(1))}</a>`).join(" \xB7 ")}</p>`:""}
  <p class="foot-bottom"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${K(a,t,l.lang)}</p>
</div></footer>`}function ye({site:a,market:t,L:n,abs:l}){var i,r;let s=(i=a.contact)!=null?i:{};return{"@context":"https://schema.org","@type":a.placeType||"BuddhistTemple",name:a.name,url:l(`${t.id}/`),description:n(a.intro),image:l(N(a.heroImage||"photos/h-hero.webp")),telephone:s.phone,email:s.email,address:{"@type":"PostalAddress",streetAddress:n(s.address)},openingHoursSpecification:F((r=a.hours)!=null?r:[])}}var $e=({site:a,L:t})=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:a.faq.filter(n=>t(n==null?void 0:n.q)).map(n=>({"@type":"Question",name:t(n.q),acceptedAnswer:{"@type":"Answer",text:t(n.a)}}))});export{Ee as renderSite};
