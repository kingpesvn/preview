var K={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(t="")=>String(t).replace(/[&<>"']/g,a=>K[a]);function P(t,a,n="vi"){var i,l,o;return t==null?"":typeof t!="object"?String(t):(o=(l=(i=t[a])!=null?i:t[n])!=null?l:Object.values(t)[0])!=null?o:""}function B(t="/"){let a=t.endsWith("/")?t:`${t}/`;return(n="")=>a+String(n).replace(/^\//,"")}var J=(t="")=>t.startsWith("uploads/")?t:/^([a-z]+:|\/)/i.test(t)?null:`assets/${t}`,D=(t,a)=>{let n=J(a);return n==null?a:t(n)},M=(t="")=>String(t).replace(/\D/g,"");function L(t,a,n=""){switch(t){case"phone":return`tel:${M(a.phone)}`;case"zalo":return`https://zalo.me/${M(a.zalo||a.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(a.messenger)}`;case"whatsapp":return`https://wa.me/${M(a.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(a.kakao)}/chat`;case"email":return`mailto:${a.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var q=t=>`<script type="application/ld+json">${JSON.stringify(t).replace(/</g,"\\u003c")}<\/script>`,Z=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function V(t){if(!t||typeof t!="string")return null;let a;try{a=new URL(t.trim())}catch{return{error:"not-google"}}if(a.hostname==="forms.gle")return{error:"short-link"};let n=a.hostname==="docs.google.com"&&a.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let i={};for(let[l,o]of a.searchParams){if(!/^entry\.\d+$/.test(l))continue;let s=o.trim().replace(/^\{|\}$/g,"").toLowerCase();Z.includes(s)&&(i[s]=l)}return Object.keys(i).length?i.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:i}:{error:"no-phone"}:{error:"no-fields"}}var Y={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},m=(t,a=20,n="")=>{var i;return`<svg class="i" width="${a}" height="${a}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(i=Y[t])!=null?i:""}</svg>`};var A={vi:"\u0110\xE1nh gi\xE1 ch\xFAng t\xF4i tr\xEAn Google",en:"Review us on Google",ja:"Google\u3067\u30EC\u30D3\u30E5\u30FC\u3092\u66F8\u304F",ko:"Google\uC5D0 \uD6C4\uAE30 \uB0A8\uAE30\uAE30",zh:"\u5728 Google \u4E0A\u8BC4\u4EF7\u6211\u4EEC",th:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E40\u0E23\u0E32\u0E1A\u0E19 Google",id:"Beri ulasan di Google",es:"Opina sobre nosotros en Google",fr:"Donnez votre avis sur Google",de:"Bewerten Sie uns bei Google",pt:"Avalie-nos no Google",ru:"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u0432 Google"},X=/^(?:g\.page|g\.co|goo\.gl|maps\.app\.goo\.gl|(?:[a-z0-9-]+\.)*google\.[a-z.]{2,6})$/i,Q=t=>{var a;try{let n=new URL(String((a=t.googleReview)!=null?a:"").trim());return n.protocol==="https:"&&X.test(n.hostname)?n.href:""}catch{return""}},F=(t,a,n,i="btn btn--line")=>{var s;let l=Q(t);if(!l)return"";let o=typeof a.reviews=="object"&&((s=a.reviews)==null?void 0:s.google)||A[n]||A.en;return`<p class="g-review" style="margin:28px 0 0;text-align:center"><a class="${i}" href="${e(l)}" target="_blank" rel="noopener">${m("star",16)} ${e(o)}</a></p>`},S={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},G={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},O=t=>{var a;return((a=t.reviews)!=null?a:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function H(t,a){var o,s,r;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((o=t==null?void 0:t.date)!=null?o:"").trim());if(!n)return"";let i=new Date(Date.UTC(+n[1],+n[2]-1,+((s=n[3])!=null?s:1)));if(Number.isNaN(i.getTime()))return"";let l=new Intl.DateTimeFormat((r=G[a])!=null?r:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(i);return`<time class="rv-date" datetime="${e(t.date)}">${e(l)}</time>`}function ee(t,a){var s,r;let n=t.filter(h=>h.rating>=1&&h.rating<=5);if(n.length<2)return"";let i=n.reduce((h,p)=>h+Number(p.rating),0)/n.length,l=(s=S[a])!=null?s:S.en,o=new Intl.NumberFormat((r=G[a])!=null?r:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(i);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${m("star",18)}</span><strong>${o}</strong><span>\xB7</span><span>${e(l.count.replace("{n}",String(t.length)))}</span></p>`}function I(t,a,n,i){var s;if(!t.length)return"";let l=(s=S[a])!=null?s:S.en,o=r=>`<button type="button" class="rv-btn" data-rv-${r} aria-label="${e(r==="prev"?l.prev:l.next)}">${m("arrow",18,r==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${ee(t,a)}<div class="rv" data-rv data-rv-more="${e(l.more)}" data-rv-less="${e(l.less)}">
      <div class="${n} rv-track" tabindex="0">${t.map(i).join("")}</div>
      <div class="rv-nav" hidden>${o("prev")}${o("next")}</div>
    </div>${te}`}var te=`<style>
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
upd()}})()<\/script>`;var U=(t,a,n)=>t.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(a.footer.madeWith)}</a>`;function W({site:t,markets:a,url:n,abs:i}){var s;let l=(s=a.find(r=>r.default))!=null?s:a[0],o=a.map(r=>({id:r.id,lang:r.lang,country:r.country}));return`<!doctype html>
<html lang="${e(l.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.name)}</title>
<link rel="canonical" href="${i(`${l.id}/`)}">
${a.map(r=>`<link rel="alternate" hreflang="${e(r.lang)}-${e(r.country)}" href="${i(`${r.id}/`)}">`).join(`
`)}
<script>
(function () {
  var markets = ${JSON.stringify(o)}, root = ${JSON.stringify(n(""))};
  var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return l.toLowerCase(); });
  var pick = null;
  prefs.some(function (p) { var parts = p.split('-'); return markets.some(function (m) {
    if ((parts[1] && m.country.toLowerCase() === parts[1]) || m.lang === parts[0]) { pick = m; return true; } return false; }); });
  location.replace(root + (pick || markets[0]).id + '/');
})();
<\/script>
</head>
<body><p>${a.map(r=>`<a href="${n(`${r.id}/`)}">${e(r.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var ae="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@400;500;600&display=swap",ne={linkedin:"LinkedIn",behance:"Behance",dribbble:"Dribbble",github:"GitHub",instagram:"Instagram",website:"Website"};function Te({site:t,catalog:a,i18n:n,template:i,basePath:l="/",siteUrl:o=t.domain}){let s=B(l),r=d=>new URL(s(d),o).href,h=a.markets,p=V(t.contactForm),c=p&&!p.error?p:null,u=h.map(d=>{var g,b,j,T;let f=d.lang,v=(b=(g=n[f])!=null?g:n.en)!=null?b:n.vi,y=$=>P($,f,"en"),k=$=>{var C,R,E;if(!$)return[];let z=Array.isArray($)?$:(E=(R=(C=$[f])!=null?C:$.en)!=null?R:$.vi)!=null?E:[];return(Array.isArray(z)?z:[z]).map(N=>typeof N=="string"?N:y(N)).filter(Boolean)},x=(T=(j=t.contactChannels)==null?void 0:j[d.id])!=null?T:["email"],w={site:t,catalog:a,market:d,markets:h,lang:f,t:v,L:y,list:k,url:s,abs:r,channels:x,template:i,gform:c};return{path:`${d.id}/index.html`,html:ie(w)}});return u.push({path:"index.html",html:W({site:t,markets:h,url:s,abs:r})}),u}var oe=(t="")=>t.trim().split(/\s+/).map(a=>a[0]).slice(-2).join("").toUpperCase(),re=(t,a)=>{var n,i;return t.heroImage?D(a,t.heroImage):(i=(n=t.projects)==null?void 0:n[0])!=null&&i.image?D(a,t.projects[0].image):a("assets/photos/hero.webp")};function ie(t){var v,y,k,x,w;let{site:a,market:n,markets:i,lang:l,t:o,L:s,url:r,abs:h}=t,p=`${a.name} \xB7 ${s(a.role)}`,c=(v=a.theme)!=null?v:{},u=["primary","ink","bg","surface","soft","accent"].filter(g=>c[g]).map(g=>`--${g}:${c[g]}`).join(";"),d=(y=i.find(g=>g.default))!=null?y:i[0],f=(k=a.contact)!=null?k:{};return`<!doctype html>
<html lang="${e(l)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(p)}</title>
<meta name="description" content="${e(s(a.intro))}">
<link rel="canonical" href="${h(`${n.id}/`)}">
${i.map(g=>`<link rel="alternate" hreflang="${e(g.lang)}" href="${h(`${g.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${h(`${d.id}/`)}">
<meta property="og:type" content="profile">
<meta property="og:title" content="${e(p)}">
<meta property="og:description" content="${e(s(a.intro))}">
<meta property="og:url" content="${h(`${n.id}/`)}">
<meta property="og:site_name" content="${e(a.name)}">
<meta property="og:image" content="${e(new URL(re(a,r),h("")).href)}">
<meta name="theme-color" content="${e((x=c.bg)!=null?x:"#FFFFFF")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${ae}">
<link rel="stylesheet" href="${r("assets/style.css")}">
<style>:root{${u}}</style>
<noscript><style>.chips{display:none}</style></noscript>
${q(fe(t))}
<script src="${r("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-wa="${e(M(f.whatsapp))}" data-email="${e((w=f.email)!=null?w:"")}" data-copied="${e(o.contact.copied)}">
<a class="skip" href="#main">${e(o.skip)}</a>
${se(t)}
<main id="main">
${le(t)}
${ce(t)}
${pe(t)}
${de(t)}
${he(t)}
${ue(t)}
${me(t)}
</main>
${ge(t)}
</body>
</html>
`}function _({site:t,t:a},n){return t.cvUrl?`<a class="${n}" href="${e(t.cvUrl)}" target="_blank" rel="noopener">${m("arrow",16,'style="transform:rotate(90deg)"')} ${e(a.nav.cv)}</a>`:`<button type="button" class="${n}" data-print>${m("arrow",16,'style="transform:rotate(90deg)"')} ${e(a.nav.cv)}</button>`}function se(t){let{site:a,market:n,markets:i,t:l,url:o}=t,s=[["#work",l.nav.work],["#experience",l.nav.experience],["#skills",l.nav.skills],["#contact",l.nav.contact]];return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${o(`${n.id}/`)}">${e(a.name)}</a>
    <nav class="nav" aria-label="Menu">${s.map(([r,h])=>`<a href="${r}">${e(h)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${i.length>1?`<nav class="langs" aria-label="${e(l.lang)}">${i.map(r=>`<a href="${o(`${r.id}/`)}" hreflang="${e(r.lang)}" lang="${e(r.lang)}"${r.id===n.id?' aria-current="true"':""}>${e(r.lang.toUpperCase())}</a>`).join("")}</nav>`:""}
      ${_(t,"btn btn--dark hide-sm")}
      <details class="mnav">
        <summary aria-label="${e(l.nav.openMenu)}">${m("menu",22)}</summary>
        <nav aria-label="Menu">${s.map(([r,h])=>`<a href="${r}">${e(h)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function le(t){var h,p,c;let{site:a,t:n,L:i,url:l}=t,o=(h=a.contact)!=null?h:{},s=((p=a.stats)!=null?p:[]).filter(u=>i(u==null?void 0:u.value)),r=(c=a.availability)!=null?c:{};return`<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${r.show!==!1&&i(r.text)?`<p class="avail"><span class="dot" aria-hidden="true"></span>${e(i(r.text))}</p>`:""}
      <h1><span class="hello">${e(n.hero.hello)}</span> ${e(a.name)}<span class="role">${e(i(a.role))}</span></h1>
      ${i(a.intro)?`<p class="lead">${e(i(a.intro))}</p>`:""}
      <div class="actions">
        <a class="btn btn--accent btn--lg" href="#work">${e(n.hero.work)} ${m("arrow",18)}</a>
        <a class="btn btn--line btn--lg" href="#contact">${e(n.hero.contact)}</a>
        ${_(t,"link print-hide")}
      </div>
      <p class="meta">${i(a.location)?`<span>${m("pin",16)} ${e(i(a.location))}</span>`:""}${o.email?`<a href="mailto:${e(o.email)}">${e(o.email)}</a>`:""}${o.phone?`<span class="print-only">${e(o.phone)}</span>`:""}</p>
    </div>
    <div class="hero-side">
      <div class="avatar">${a.photo?`<img src="${e(D(l,a.photo))}" alt="${e(a.name)}" width="480" height="560">`:`<span aria-hidden="true">${e(oe(a.name))}</span>`}</div>
      ${s.length?`<ul class="stats">${s.map(u=>`<li><b>${e(i(u.value))}</b><span>${e(i(u.label))}</span></li>`).join("")}</ul>`:""}
    </div>
  </div>
</section>`}function ce({site:t,t:a,L:n,list:i,url:l}){var h,p;let o=((h=t.projects)!=null?h:[]).filter(c=>n(c==null?void 0:c.title));if(!o.length)return"";let s=((p=t.projectTags)!=null?p:[]).filter(c=>o.some(u=>{var d;return((d=u.tags)!=null?d:[]).includes(c.id)})),r=c=>{var u;return n((u=s.find(d=>d.id===c))==null?void 0:u.name)||c};return`<section class="section" id="work" aria-labelledby="work-title">
  <div class="wrap">
    <div class="head"><h2 id="work-title" class="h2">${e(a.work.title)}</h2><p class="muted">${e(a.work.text)}</p></div>
    ${s.length>1?`<div class="chips" role="group" aria-label="${e(a.work.filter)}"><button type="button" class="chip" data-tag="" aria-pressed="true">${e(a.work.all)}</button>${s.map(c=>`<button type="button" class="chip" data-tag="${e(c.id)}" aria-pressed="false">${e(n(c.name))}</button>`).join("")}</div>`:""}
    <div class="works">${o.map((c,u)=>{var y,k,x,w,g;let d=[c.image,...(y=c.images)!=null?y:[]].filter(Boolean).map(b=>D(l,b)),f={title:n(c.title),meta:[c.client,c.year,n(c.role)].filter(Boolean).join(" \xB7 "),images:d,sections:[[a.work.problem,n(c.problem)],[a.work.approach,n(c.approach)],[a.work.result,n(c.result)]].filter(b=>b[1]),link:c.link||""},v=u%3===0||u===o.length-1&&u%3===1;return`<article class="work${v?" work--wide":""}" data-tags="${e(((k=c.tags)!=null?k:[]).join(" "))}">
      <a class="work-ph" href="${e((x=d[0])!=null?x:"#")}" data-case aria-label="${e(a.work.open)}: ${e(n(c.title))}">
        ${d[0]?`<img sizes="auto, (max-width: 640px) 100vw, ${v?"700px":"560px"}" src="${e(d[0])}" alt="${e(n(c.title))}" width="1200" height="800" loading="lazy">`:""}
      </a>
      <div class="work-body">
        <p class="work-meta">${[c.client,c.year].filter(Boolean).map(b=>`<span>${e(b)}</span>`).join("")}</p>
        <h3><a href="${e((w=d[0])!=null?w:"#")}" data-case>${e(n(c.title))}</a></h3>
        ${n(c.summary)?`<p class="muted">${e(n(c.summary))}</p>`:""}
        ${((g=c.tags)!=null?g:[]).length?`<p class="tags">${c.tags.map(b=>`<span>${e(r(b))}</span>`).join("")}</p>`:""}
      </div>
      <script type="application/json" data-case-data>${JSON.stringify(f).replace(/</g,"\\u003c")}<\/script>
    </article>`}).join("")}</div>
  </div>
  <dialog class="case" data-case-box aria-labelledby="case-title">
    <div class="case-in">
      <button type="button" class="case-x" data-case-close aria-label="${e(a.work.close)}">\u2715</button>
      <p class="work-meta" data-case-meta></p>
      <h3 id="case-title" class="h2" data-case-title></h3>
      <div class="case-body" data-case-body></div>
      <a class="btn btn--line" data-case-link target="_blank" rel="noopener" hidden>${e(a.work.visit)} ${m("arrow",16)}</a>
      <div class="case-imgs" data-case-imgs></div>
    </div>
  </dialog>
</section>`}function pe({site:t,t:a,L:n,list:i}){var r,h;let l=((r=t.experience)!=null?r:[]).filter(p=>(p==null?void 0:p.company)||n(p==null?void 0:p.role)),o=((h=t.education)!=null?h:[]).filter(p=>p==null?void 0:p.school);if(!l.length&&!o.length)return"";let s=p=>[p.from,p.to?n(p.to):a.cv.now].filter(Boolean).join(" \u2013 ");return`<section class="section section--soft" id="experience" aria-labelledby="exp-title">
  <div class="wrap cv">
    <div>
      <h2 id="exp-title" class="h2">${e(a.cv.experience)}</h2>
      <ol class="timeline">${l.map(p=>{var c;return`<li>
        <p class="when">${e(s(p))}</p>
        <div><h3>${e(n(p.role))}</h3><p class="where">${e((c=p.company)!=null?c:"")}${n(p.place)?` \xB7 ${e(n(p.place))}`:""}</p>
        ${i(p.points).length?`<ul class="points">${i(p.points).map(u=>`<li>${e(u)}</li>`).join("")}</ul>`:""}</div>
      </li>`}).join("")}</ol>
    </div>
    ${o.length?`<div class="edu">
      <h2 class="h3">${e(a.cv.education)}</h2>
      <ol class="timeline timeline--sm">${o.map(p=>`<li><p class="when">${e([p.from,p.to].filter(Boolean).join(" \u2013 "))}</p><div><h3>${e(n(p.degree))}</h3><p class="where">${e(p.school)}</p></div></li>`).join("")}</ol>
    </div>`:""}
  </div>
</section>`}function de({site:t,t:a,L:n}){var o,s;let i=((o=t.skills)!=null?o:[]).filter(r=>n(r==null?void 0:r.items)),l=((s=t.languages)!=null?s:[]).filter(r=>n(r==null?void 0:r.name));return!i.length&&!l.length?"":`<section class="section" id="skills" aria-labelledby="skills-title">
  <div class="wrap">
    <h2 id="skills-title" class="h2">${e(a.cv.skills)}</h2>
    <div class="skills">${i.map(r=>`<div class="skill"><h3>${e(n(r.group))}</h3><ul class="pills">${n(r.items).split(/\s*[,，、]\s*/).filter(Boolean).map(h=>`<li>${e(h)}</li>`).join("")}</ul></div>`).join("")}
    ${l.length?`<div class="skill"><h3>${e(a.cv.languages)}</h3><ul class="langlist">${l.map(r=>`<li><span>${e(n(r.name))}</span><span class="muted">${e(n(r.level))}</span></li>`).join("")}</ul></div>`:""}</div>
  </div>
</section>`}function he({site:t,t:a,L:n}){var l;let i=((l=t.services)!=null?l:[]).filter(o=>n(o==null?void 0:o.title));return i.length?`<section class="section section--ink print-hide" aria-labelledby="svc-title">
  <div class="wrap">
    <h2 id="svc-title" class="h2">${e(a.services.title)}</h2>
    <ol class="svcs">${i.map((o,s)=>`<li><span class="n">${String(s+1).padStart(2,"0")}</span><h3>${e(n(o.title))}</h3>${n(o.text)?`<p>${e(n(o.text))}</p>`:""}</li>`).join("")}</ol>
  </div>
</section>`:""}function ue({site:t,t:a,L:n,lang:i}){let l=F(t,a,i,"btn btn--line"),o=O(t);return t.showReviews===!1||!o.length&&!l?"":`<section class="section print-hide" aria-labelledby="rev-title">
  <div class="wrap">
    <h2 id="rev-title" class="h2">${e(a.reviews)}</h2>
    ${I(o,i,"quotes",s=>`<figure class="quote">
      <blockquote>\u201C${e(n(s.text))}\u201D</blockquote>
      <figcaption><strong>${e(s.name)}</strong>${s.bought?`<span>${e(n(s.bought))}</span>`:""}${H(s,i)}</figcaption>
    </figure>`)}${l}
  </div>
</section>`}function me({site:t,t:a,L:n,channels:i,gform:l}){var c,u;let o=a.contact,s=(c=t.contact)!=null?c:{},r=Object.entries((u=t.links)!=null?u:{}).filter(([,d])=>d),h=l?` data-gform="${e(l.action)}" data-gmap='${e(JSON.stringify(l.fields))}'`:"",p=i.map((d,f)=>{var v;return`<button type="button" class="btn ${f===0?"btn--accent":"btn--line"}" data-channel="${e(d)}" data-href="${e(L(d,s,""))}">${m(d,18)} ${e((v=a.via[d])!=null?v:d)}</button>`}).join("");return`<section class="section section--soft" id="contact" aria-labelledby="contact-title">
  <div class="wrap contact">
    <div class="contact-copy">
      <h2 id="contact-title" class="h2">${e(o.title)}</h2>
      <p class="lead">${e(o.text)}</p>
      <ul class="clist">
        ${s.email?`<li>${m("email",18)} <a href="mailto:${e(s.email)}">${e(s.email)}</a></li>`:""}
        ${s.phone?`<li>${m("phone",18)} <a href="tel:${M(s.phone)}">${e(s.phone)}</a></li>`:""}
        ${n(t.location)?`<li>${m("pin",18)} ${e(n(t.location))}</li>`:""}
      </ul>
      ${r.length?`<p class="links">${r.map(([d,f])=>{var v;return`<a href="${e(f)}" target="_blank" rel="noopener me">${e((v=ne[d])!=null?v:d)} \u2197</a>`}).join("")}</p>`:""}
    </div>
    <form class="card form print-hide" data-contact novalidate${h} data-order-text="${e(o.message)}">
      <div class="c-fields">
        <div class="row2">
          <label class="field"><span>${e(o.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
          <label class="field"><span>${e(o.reach)} *</span><input name="phone" autocomplete="email" required maxlength="120" placeholder="${e(o.reachHint)}"></label>
        </div>
        <div class="row2">
          <label class="field"><span>${e(o.topic)}</span><select name="product">${o.topics.map(d=>`<option>${e(d)}</option>`).join("")}</select></label>
          <label class="field"><span>${e(o.budget)}</span><input name="price" maxlength="60" placeholder="${e(o.budgetHint)}"></label>
        </div>
        <label class="field"><span>${e(o.note)} *</span><textarea name="note" rows="4" maxlength="1000" required placeholder="${e(o.noteHint)}"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(o.required)}</p>
        <button class="btn btn--accent btn--lg" type="submit" data-submit data-sending="${e(o.sending)}">${e(o.submit)} ${m("arrow",18)}</button>
      </div>
      <div class="done" data-done hidden tabindex="-1">
        <p class="done-title">${m(l?"check":"arrow",22)} ${e(l?o.done:o.stepTitle)}</p>
        <p>${e(l?o.doneText:o.stepText)}</p>
        ${l?"":`<div class="buy">${p}</div><button type="button" class="link" data-edit>${e(o.edit)}</button>`}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function ge({site:t,t:a,market:n}){return`<footer class="footer">
  <div class="wrap foot-bottom${t.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(t.name)}</span>${U(t,a,n.lang)}</div>
</footer>`}function fe({site:t,market:a,L:n,abs:i,list:l}){var r,h,p,c,u;let o=(r=t.contact)!=null?r:{},s=((h=t.experience)!=null?h:[]).find(d=>!d.to);return{"@context":"https://schema.org","@type":"ProfilePage",url:i(`${a.id}/`),mainEntity:{"@type":"Person",name:t.name,jobTitle:n(t.role),description:n(t.intro),email:o.email?`mailto:${o.email}`:void 0,address:n(t.location)?{"@type":"PostalAddress",addressLocality:n(t.location)}:void 0,worksFor:s!=null&&s.company?{"@type":"Organization",name:s.company}:void 0,knowsAbout:((p=t.skills)!=null?p:[]).flatMap(d=>n(d.items).split(/\s*[,，、]\s*/)).filter(Boolean).slice(0,20),sameAs:Object.values((c=t.links)!=null?c:{}).filter(Boolean),alumniOf:((u=t.education)!=null?u:[]).map(d=>({"@type":"EducationalOrganization",name:d.school}))}}}export{Te as renderSite};
