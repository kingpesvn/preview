var W={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},e=(a="")=>String(a).replace(/[&<>"']/g,t=>W[t]);function P(a,t,n="vi"){var o,r,i;return a==null?"":typeof a!="object"?String(a):(i=(r=(o=a[t])!=null?o:a[n])!=null?r:Object.values(a)[0])!=null?i:""}var _={vi:"vi-VN",en:"en-US",ja:"ja-JP",th:"th-TH",ko:"ko-KR",fr:"fr-FR",zh:"zh-CN",id:"id-ID",es:"es-ES",de:"de-DE",pt:"pt-BR",ru:"ru-RU",it:"it-IT",ms:"ms-MY",nl:"nl-NL"},T=a=>{var t;return(t=_[a])!=null?t:"en-US"};function q(a="/"){let t=a.endsWith("/")?a:`${a}/`;return(n="")=>t+String(n).replace(/^\//,"")}var C=(a="")=>a.startsWith("uploads/")?a:/^([a-z]+:|\/)/i.test(a)?null:`assets/${a}`,k=(a,t)=>{let n=C(t);return n==null?t:a(n)},w=(a="")=>String(a).replace(/\D/g,"");function E(a,t,n=""){switch(a){case"phone":return`tel:${w(t.phone)}`;case"zalo":return`https://zalo.me/${w(t.zalo||t.phone)}`;case"messenger":return`https://m.me/${encodeURIComponent(t.messenger)}`;case"whatsapp":return`https://wa.me/${w(t.whatsapp)}${n?`?text=${encodeURIComponent(n)}`:""}`;case"kakao":return`https://pf.kakao.com/${encodeURIComponent(t.kakao)}/chat`;case"email":return`mailto:${t.email}${n?`?subject=${encodeURIComponent(n)}`:""}`;default:return"#"}}var L=a=>`<script type="application/ld+json">${JSON.stringify(a).replace(/</g,"\\u003c")}<\/script>`,K=["name","phone","product","size","color","version","price","qty","date","address","note","page","market"];function V(a){if(!a||typeof a!="string")return null;let t;try{t=new URL(a.trim())}catch{return{error:"not-google"}}if(t.hostname==="forms.gle")return{error:"short-link"};let n=t.hostname==="docs.google.com"&&t.pathname.match(/^\/forms\/(?:u\/\d+\/)?d\/e\/([\w-]+)\//);if(!n)return{error:"not-google"};let o={};for(let[r,i]of t.searchParams){if(!/^entry\.\d+$/.test(r))continue;let l=i.trim().replace(/^\{|\}$/g,"").toLowerCase();K.includes(l)&&(o[l]=r)}return Object.keys(o).length?o.phone?{action:`https://docs.google.com/forms/d/e/${n[1]}/formResponse`,fields:o}:{error:"no-phone"}:{error:"no-fields"}}var J={zalo:'<path d="M4 5h16v11H9l-5 4z"/>',phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1-1.2 1.8.8"/>',messenger:'<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',kakao:'<path d="M12 4C6.5 4 3 7.3 3 11c0 2.4 1.6 4.5 4 5.7L6.5 20l3.6-2.4c.6.1 1.2.1 1.9.1 5.5 0 9-3.3 9-7s-3.5-6.7-9-6.7z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',leaf:'<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7s-5-2-6.5-4.5L3 12.5a1.5 1.5 0 0 1 2.5-1.6L8 14"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 20h6M14 3l-3 7M18 4l-4.5 6"/>',cup:'<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/>',bag:'<path d="M6 7h12l1 14H5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',chevron:'<path d="M9 6l6 6-6 6"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9 8 5H5M15 9l1-3h3"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',gauge:'<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 13l4-5"/><circle cx="12" cy="14" r="1.5"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',wave:'<path d="M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0"/>',car:'<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',ruler:'<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2"/>',heart:'<path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8"/>',chat:'<path d="M4 5h16v11h-9l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6"/>',paw:'<circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 12c-3 0-6 4-6 6.5S8 21 12 19.5 18 21 18 18.5 15 12 12 12z"/>',scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 7.5 20 18M8.5 16.5 20 6"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M4 10h11M15 8l3 2v8a1.5 1.5 0 0 0 3 0V9l-3-3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',moto:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h6l3-6h-4l-2-4H9M14.5 11l-3 6M5.5 17l3-6h3"/>',doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',flame:'<path d="M12 22c4 0 7-2.7 7-6.7 0-3.6-2.6-6-4.4-8.3-.6 1.9-1.6 3-3.1 3.6C12.6 7.4 11.6 4.3 9 2c0 4-5 6.5-5 13.3C4 19.3 8 22 12 22z"/>',drop2:'<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',syringe:'<path d="M18 2l4 4M20 4l-4 4M15 5l4 4M17 7 8.5 15.5l-3 .5.5-3L14.5 4.5M6 18l-4 4M10 10l2 2M8 12l2 2"/>',steth:'<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1M9 14v1a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="2"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',chef:'<path d="M7 17h10v4H7zM7 17v-4a4 4 0 0 1-.5-7.8A5 5 0 0 1 12 3a5 5 0 0 1 5.5 2.2A4 4 0 0 1 17 13v4"/>',pot:'<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 7c0-1.2 1-1.3 1-2.5M14 7c0-1.2 1-1.3 1-2.5"/>',scale:'<path d="M12 3v18M7 21h10M5 7h14M12 5l-7 2M12 5l7 2"/><path d="M2 15l3-8 3 8a3 3 0 0 1-6 0zM16 15l3-8 3 8a3 3 0 0 1-6 0z"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',house:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',facebook:'<path d="M15.5 3H14a4 4 0 0 0-4 4v14M6.5 10.5h8"/>',filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',printer:'<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',bus:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 17v3M16 17v3"/><circle cx="8" cy="14" r=".8"/><circle cx="16" cy="14" r=".8"/>',plane:'<path d="M2.5 13.5l7-2.5L14 4.5c.6-.9 2-.9 2.4.1.2.5.1 1-.2 1.4L12.5 12l7 1.5v2.5l-8-.5-2.5 3.5h2v1.5H7L6 18l-3.5-1.5z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',candle:'<path d="M9 10h6v11H9z"/><path d="M12 10V8M12 3c1.5 1.8 1.5 3.2 0 4.5-1.5-1.3-1.5-2.7 0-4.5z"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8a3 3 0 1 1 2.6 1.4M14.6 8.2a3 3 0 1 1-1 3.6M13.6 11.8a3 3 0 1 1-3.2 0M10.4 11.8a3 3 0 1 1-1-3.6M9.4 8.2A3 3 0 1 1 12 6.8M12 11.2V21M12 17c-2-2-4-2-5-1.5M12 18c2-2 4-2 5-1.5"/>',dove:'<path d="M3 14c3 0 5-1 7-4 1-1.6 2-4 4.5-4 1.6 0 2.5 1 3 2l3.5.5-3.2 1.6C17 14.5 13 18 7 18l-2 3v-3.5C4 17 3 15.8 3 14z"/>',hands:'<path d="M7 20v-4l-3-4V7.5a1.5 1.5 0 0 1 3 0V11M17 20v-4l3-4V7.5a1.5 1.5 0 0 0-3 0V11M7 11l3 3v6M17 11l-3 3v6"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',glasses:'<circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 13.5q2-1.4 4 0M3 14l-1-6h2M21 14l1-6h-2"/>',hammer:'<path d="M14 6l4 4-2 2-4-4z"/><path d="M12 8l-8 8 4 4 8-8M15 5l2-2 4 4-2 2"/>',roller:'<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3M11 14h2v7h-2z"/>',plug:'<path d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6"/>',tap:'<path d="M4 10h9a4 4 0 0 1 4 4v2M7 10V7h6v3M10 7V4M8 4h4M17 19v2"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'},p=(a,t=20,n="")=>{var o;return`<svg class="i" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${n}>${(o=J[a])!=null?o:""}</svg>`};var B=a=>`<div class="suggest" id="market-suggest" data-suggest="${e(a.market.suggest)}" hidden>
  <span data-text></span>
  <a class="btn btn--small" data-go href="#">${e(a.market.switch)}</a>
  <button type="button" class="suggest-x" data-close aria-label="${e(a.market.dismiss)}">\xD7</button>
</div>`;var N={vi:{count:"{n} \u0111\xE1nh gi\xE1",prev:"\u0110\xE1nh gi\xE1 tr\u01B0\u1EDBc",next:"\u0110\xE1nh gi\xE1 ti\u1EBFp",more:"Xem th\xEAm",less:"Thu g\u1ECDn"},en:{count:"{n} reviews",prev:"Previous reviews",next:"More reviews",more:"Read more",less:"Show less"},ja:{count:"\u30EC\u30D3\u30E5\u30FC{n}\u4EF6",prev:"\u524D\u306E\u30EC\u30D3\u30E5\u30FC",next:"\u6B21\u306E\u30EC\u30D3\u30E5\u30FC",more:"\u7D9A\u304D\u3092\u8AAD\u3080",less:"\u9589\u3058\u308B"},ko:{count:"\uD6C4\uAE30 {n}\uAC1C",prev:"\uC774\uC804 \uD6C4\uAE30",next:"\uB2E4\uC74C \uD6C4\uAE30",more:"\uB354 \uBCF4\uAE30",less:"\uC811\uAE30"},zh:{count:"{n} \u6761\u8BC4\u4EF7",prev:"\u4E0A\u4E00\u7EC4\u8BC4\u4EF7",next:"\u66F4\u591A\u8BC4\u4EF7",more:"\u5C55\u5F00",less:"\u6536\u8D77"},th:{count:"{n} \u0E23\u0E35\u0E27\u0E34\u0E27",prev:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",next:"\u0E23\u0E35\u0E27\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B",more:"\u0E2D\u0E48\u0E32\u0E19\u0E15\u0E48\u0E2D",less:"\u0E22\u0E48\u0E2D"},id:{count:"{n} ulasan",prev:"Ulasan sebelumnya",next:"Ulasan berikutnya",more:"Selengkapnya",less:"Tutup"},es:{count:"{n} opiniones",prev:"Opiniones anteriores",next:"M\xE1s opiniones",more:"Leer m\xE1s",less:"Ver menos"},fr:{count:"{n} avis",prev:"Avis pr\xE9c\xE9dents",next:"Plus d\u2019avis",more:"Lire la suite",less:"R\xE9duire"},de:{count:"{n} Bewertungen",prev:"Vorherige Bewertungen",next:"Weitere Bewertungen",more:"Weiterlesen",less:"Weniger"},pt:{count:"{n} avalia\xE7\xF5es",prev:"Avalia\xE7\xF5es anteriores",next:"Mais avalia\xE7\xF5es",more:"Ler mais",less:"Mostrar menos"},ru:{count:"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {n}",prev:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B",next:"\u0415\u0449\u0451 \u043E\u0442\u0437\u044B\u0432\u044B",more:"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",less:"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"}},A={vi:"vi-VN",en:"en-US",ja:"ja-JP",ko:"ko-KR",zh:"zh-CN",th:"th-TH",id:"id-ID",es:"es-ES",fr:"fr-FR",de:"de-DE",pt:"pt-BR",ru:"ru-RU"},F=a=>{var t;return((t=a.reviews)!=null?t:[]).filter(n=>n&&(n.name||n.text)&&!(typeof n.text=="object"&&n.text&&!Object.values(n.text).some(Boolean)&&!n.name))};function G(a,t){var i,l,s;let n=/^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(String((i=a==null?void 0:a.date)!=null?i:"").trim());if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+((l=n[3])!=null?l:1)));if(Number.isNaN(o.getTime()))return"";let r=new Intl.DateTimeFormat((s=A[t])!=null?s:"en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(o);return`<time class="rv-date" datetime="${e(a.date)}">${e(r)}</time>`}function Z(a,t){var l,s;let n=a.filter(c=>c.rating>=1&&c.rating<=5);if(n.length<2)return"";let o=n.reduce((c,h)=>c+Number(h.rating),0)/n.length,r=(l=N[t])!=null?l:N.en,i=new Intl.NumberFormat((s=A[t])!=null?s:"en-US",{minimumFractionDigits:1,maximumFractionDigits:1}).format(o);return`<p class="rv-sum"><span class="rv-sum-star" aria-hidden="true">${p("star",18)}</span><strong>${i}</strong><span>\xB7</span><span>${e(r.count.replace("{n}",String(a.length)))}</span></p>`}function O(a,t,n,o){var l;if(!a.length)return"";let r=(l=N[t])!=null?l:N.en,i=s=>`<button type="button" class="rv-btn" data-rv-${s} aria-label="${e(s==="prev"?r.prev:r.next)}">${p("arrow",18,s==="prev"?'style="transform:scaleX(-1)"':"")}</button>`;return`${Z(a,t)}<div class="rv" data-rv data-rv-more="${e(r.more)}" data-rv-less="${e(r.less)}">
      <div class="${n} rv-track" tabindex="0">${a.map(o).join("")}</div>
      <div class="rv-nav" hidden>${i("prev")}${i("next")}</div>
    </div>${Y}`}var Y=`<style>
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
upd()}})()<\/script>`;var I=(a,t,n)=>a.badge===!1?"":`<a class="made" href="https://kingpes.net/${e(n==="vi"||n==="ja"?n:"en")}/?ref=badge" rel="nofollow" target="_blank">${e(t.footer.madeWith)}</a>`;function H({site:a,markets:t,url:n,abs:o}){var l;let r=(l=t.find(s=>s.default))!=null?l:t[0],i=t.map(s=>({id:s.id,lang:s.lang,country:s.country}));return`<!doctype html>
<html lang="${e(r.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(a.name)}</title>
<link rel="canonical" href="${o(`${r.id}/`)}">
${t.map(s=>`<link rel="alternate" hreflang="${e(s.lang)}-${e(s.country)}" href="${o(`${s.id}/`)}">`).join(`
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
<body><p>${t.map(s=>`<a href="${n(`${s.id}/`)}">${e(s.country)}</a>`).join(" \xB7 ")}</p></body>
</html>
`}var X="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",j=12;function Ne({site:a,catalog:t,i18n:n,template:o,basePath:r="/",siteUrl:i=a.domain}){let l=q(r),s=f=>new URL(l(f),i).href,c=t.markets,h=V(a.rsvpForm),g=h&&!h.error?h:null,d=c.map(f=>{var $,M,D,S;let u=f.lang,y=(M=($=n[u])!=null?$:n.en)!=null?M:n.vi,x=z=>P(z,u,"en"),m=(S=(D=a.orderChannels)==null?void 0:D[f.id])!=null?S:["phone"],b={site:a,catalog:t,market:f,markets:c,lang:u,t:y,L:x,url:l,abs:s,channels:m,template:o,gform:g};return{path:`${f.id}/index.html`,html:te(b)}});return d.push({path:"index.html",html:H({site:a,markets:c,url:l,abs:s})}),d}var U=(a,t)=>new Date(`${t.date}T${t.time||"00:00"}:00${a.utcOffset||"+07:00"}`),Q=a=>{var t,n,o;return(o=((t=a.events)!=null?t:[]).find(r=>r.main))!=null?o:((n=a.events)!=null?n:[])[0]};function R(a,t){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(a!=null?a:""));if(!n)return"";let o=new Date(Date.UTC(+n[1],+n[2]-1,+n[3],12));return new Intl.DateTimeFormat(T(t),{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(o)}function ee(a,t,n){let o=U(a,t);if(Number.isNaN(o.getTime()))return"";let r=s=>s.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),i=new Date(o.getTime()+2*36e5);return`https://calendar.google.com/calendar/render?${new URLSearchParams({action:"TEMPLATE",text:`${n(t.name)} \xB7 ${a.name}`,dates:`${r(o)}/${r(i)}`,location:`${n(t.place)}, ${n(t.address)}`})}`}function te(a){var b,$,M,D,S,z;let{site:t,market:n,markets:o,lang:r,t:i,L:l,url:s,abs:c,channels:h}=a,g=`${t.name} \xB7 ${l(t.tagline)}`,d=(b=t.theme)!=null?b:{},f=["primary","ink","bg","surface","soft","accent"].filter(v=>d[v]).map(v=>`--${v}:${d[v]}`).join(";"),u=($=o.find(v=>v.default))!=null?$:o[0],y=o.map(v=>({id:v.id,lang:v.lang,country:v.country,currency:v.currency,href:s(`${v.id}/`)})),x=t.heroImage?c((M=C(t.heroImage))!=null?M:t.heroImage):c("assets/photos/hero.webp"),m=(D=t.contact)!=null?D:{};return`<!doctype html>
<html lang="${e(r)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(g)}</title>
<meta name="description" content="${e(l(t.intro))}">
<link rel="canonical" href="${c(`${n.id}/`)}">
${o.map(v=>`<link rel="alternate" hreflang="${e(v.lang)}-${e(v.country)}" href="${c(`${v.id}/`)}">`).join(`
`)}
<link rel="alternate" hreflang="x-default" href="${c(`${u.id}/`)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(g)}">
<meta property="og:description" content="${e(l(t.intro))}">
<meta property="og:url" content="${c(`${n.id}/`)}">
<meta property="og:image" content="${e(x)}">
<meta property="og:site_name" content="${e(t.name)}">
<meta name="theme-color" content="${e((S=d.primary)!=null?S:"#A8676F")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${X}">
<link rel="stylesheet" href="${s("assets/style.css")}">
<style>:root{${f}}</style>
<noscript><style>.album .more{display:block}.album-more{display:none}</style></noscript>
${L(me(a))}
<script src="${s("assets/site.js")}" defer><\/script>
</head>
<body data-market="${e(n.id)}" data-markets='${e(JSON.stringify(y))}' data-wa="${e(w(m.whatsapp))}" data-email="${e((z=m.email)!=null?z:"")}" data-copied="${e(i.gift.copied)}">
<a class="skip" href="#main">${e(i.skip)}</a>
${B(i)}
${ae(a)}
<main id="main">
${ne(a)}
${oe(a)}
${re(a)}
${se(a)}
${ie(a)}
${le(a)}
${ce(a)}
${pe(a)}
${de(a)}
${he(a)}
</main>
${ue(a)}
<nav class="dock" aria-label="${e(i.nav.rsvp)}">
  <a href="#events">${p("calendar",20)}<span>${e(i.nav.events)}</span></a>
  <a class="primary" href="#rsvp">${p("check",20)}<span>${e(i.nav.order)}</span></a>
</nav>
</body>
</html>
`}function ae({site:a,market:t,markets:n,t:o,url:r}){var h,g,d,f;let i=[["#story",o.nav.story],["#events",o.nav.events],["#album",o.nav.album],["#gift",o.nav.gift]],l=(g=(h=a.couple)==null?void 0:h.bride)==null?void 0:g.name,s=(f=(d=a.couple)==null?void 0:d.groom)==null?void 0:f.name,c=l&&s?`${l.trim().split(/\s+/).pop()[0]}&${s.trim().split(/\s+/).pop()[0]}`:a.name;return`<header class="header">
  <div class="wrap bar">
    <a class="brand" href="${r(`${t.id}/`)}">
      ${a.logo?`<img src="${e(k(r,a.logo))}" alt="" width="40" height="40">`:`<span class="brand-mark" aria-hidden="true">${e(c)}</span>`}
      <span>${e(a.name)}</span>
    </a>
    <nav class="nav" aria-label="Menu">${i.map(([u,y])=>`<a href="${u}">${e(y)}</a>`).join("")}</nav>
    <div class="bar-end">
      ${n.length>1?`<details class="market">
        <summary aria-label="${e(o.market.label)}">${p("globe",18)}<span>${e(t.lang.toUpperCase())}</span></summary>
        <ul>${n.map(u=>`<li><a href="${r(`${u.id}/`)}" hreflang="${e(u.lang)}"${u.id===t.id?' aria-current="true"':""}>${e(u.lang.toUpperCase())} \xB7 ${e(u.country)}</a></li>`).join("")}</ul>
      </details>`:""}
      <a class="btn btn--primary hide-sm" href="#rsvp">${e(o.nav.order)}</a>
      <details class="mnav">
        <summary aria-label="${e(o.nav.openMenu)}">${p("menu",22)}</summary>
        <nav aria-label="Menu">${[...i,["#rsvp",o.nav.rsvp]].map(([u,y])=>`<a href="${u}">${e(y)}</a>`).join("")}</nav>
      </details>
    </div>
  </div>
</header>`}function ne(a){var f,u,y,x,m,b;let{site:t,t:n,L:o,url:r,lang:i}=a,l=t.heroImage?e(k(r,t.heroImage)):r("assets/photos/hero.webp"),s=Q(t),c=s?U(t,s):null,h=(y=(u=(f=t.couple)==null?void 0:f.bride)==null?void 0:u.name)!=null?y:"",g=(b=(m=(x=t.couple)==null?void 0:x.groom)==null?void 0:m.name)!=null?b:"",d=$=>`<span class="cd-box"><b data-cd="${$}">\u2013</b><small>${e(n.hero[$])}</small></span>`;return`<section class="hero">
  <img class="hero-bg" src="${l}" alt="" width="1600" height="1000" fetchpriority="high">
  <div class="hero-veil" aria-hidden="true"></div>
  <div class="wrap hero-copy">
    <p class="kicker">${e(o(t.tagline))}</p>
    <h1 class="names">${h&&g?`<span>${e(h)}</span><span class="amp" aria-hidden="true">&amp;</span><span class="sr"> &amp; </span><span>${e(g)}</span>`:e(t.name)}</h1>
    ${t.date?`<p class="date">${e(R(t.date,i))}</p>`:""}
    ${s?`<p class="place">${p("pin",18)} ${e(o(s.place))}</p>`:""}
    ${c&&!Number.isNaN(c.getTime())?`<div class="countdown" data-countdown="${e(c.toISOString())}" data-today="${e(n.hero.today)}" data-after="${e(n.hero.after)}" aria-live="off">
      ${d("days")}${d("hours")}${d("minutes")}${d("seconds")}
    </div>`:""}
    <div class="actions">
      <a class="btn btn--primary btn--lg" href="#rsvp">${p("check",18)} ${e(n.hero.rsvp)}</a>
      <a class="btn btn--light btn--lg" href="#events">${p("calendar",18)} ${e(n.hero.events)}</a>
    </div>
  </div>
</section>`}function oe({site:a,t,L:n}){var r,i;let o=(l,s,c)=>l?`<div class="person">
      <p class="side">${e(s)}</p>
      ${l.parents?`<p class="parents">${e(n(l.parents))}</p>`:""}
      <p class="role">${e(c)}</p>
      <p class="full">${e(n(l.fullName)||l.name)}</p>
    </div>`:"";return`<section class="section invite" aria-labelledby="invite-title">
  <div class="wrap narrow center">
    <p class="script" id="invite-title">${e(t.invite.title)}</p>
    ${a.invite?`<p class="lead">${e(n(a.invite))}</p>`:""}
    <div class="couple">
      ${o((r=a.couple)==null?void 0:r.groom,t.invite.groomSide,t.invite.groom)}
      <span class="heart" aria-hidden="true">${p("heart",28)}</span>
      ${o((i=a.couple)==null?void 0:i.bride,t.invite.brideSide,t.invite.bride)}
    </div>
  </div>
</section>`}function re({site:a,t,L:n,url:o}){var i;let r=a.story;return r?`<section class="section section--soft" id="story" aria-labelledby="story-title">
  <div class="wrap">
    <div class="head center">
      <p class="script">${e(t.story.title)}</p>
      <h2 id="story-title" class="h2">${e(n(r.title))}</h2>
      ${r.body?`<p class="lead narrow">${e(n(r.body))}</p>`:""}
    </div>
    ${(i=r.timeline)!=null&&i.length?`<ol class="timeline">${r.timeline.map((l,s)=>`<li class="tl${s%2?" tl--r":""}">
      ${l.image?`<figure class="tl-img"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${e(k(o,l.image))}" alt="${e(n(l.title))}" width="1000" height="750" loading="lazy"></figure>`:""}
      <div class="tl-copy"><span class="year">${e(n(l.year))}</span><h3>${e(n(l.title))}</h3>${l.text?`<p>${e(n(l.text))}</p>`:""}</div>
    </li>`).join("")}</ol>`:""}
  </div>
</section>`:""}function se({site:a,t,L:n,url:o,lang:r}){var l;let i=(l=a.events)!=null?l:[];return i.length?`<section class="section" id="events" aria-labelledby="events-title">
  <div class="wrap">
    <div class="head center"><p class="script">${e(t.nav.events)}</p><h2 id="events-title" class="h2">${e(t.events.title)}</h2></div>
    <div class="events">${i.map(s=>{var g,d;let c=encodeURIComponent((g=s.mapQuery)!=null?g:n(s.address)),h=ee(a,s,n);return`<article class="event${s.main?" event--main":""}">
        ${s.image?`<figure class="event-img"><img sizes="auto, (max-width: 640px) 100vw, 580px" src="${e(k(o,s.image))}" alt="${e(n(s.name))}" width="1000" height="750" loading="lazy"></figure>`:""}
        <div class="event-body">
          <h3>${e(n(s.name))}</h3>
          <p class="event-time">${p("clock",18)} <span><strong>${e((d=s.time)!=null?d:"")}</strong> \xB7 ${e(R(s.date,r))}</span></p>
          <p class="event-place">${p("pin",18)} <span><strong>${e(n(s.place))}</strong><br>${e(n(s.address))}</span></p>
          <div class="actions">
            <a class="btn btn--line" href="https://www.google.com/maps/dir/?api=1&amp;destination=${c}" target="_blank" rel="noopener">${e(t.events.directions)} ${p("arrow",16)}</a>
            ${h?`<a class="btn btn--ghost" href="${e(h)}" target="_blank" rel="noopener">${p("calendar",16)} ${e(t.events.calendar)}</a>`:""}
          </div>
        </div>
      </article>`}).join("")}</div>
  </div>
</section>`:""}function ie({site:a,t,L:n,url:o}){var i;let r=((i=a.album)!=null?i:[]).filter(l=>l==null?void 0:l.image);return r.length?`<section class="section section--soft" id="album" aria-labelledby="album-title">
  <div class="wrap">
    <div class="head center"><p class="script">${e(t.nav.album)}</p><h2 id="album-title" class="h2">${e(t.album.title)}</h2></div>
    <div class="album" data-album>${r.map((l,s)=>{let c=e(k(o,l.image));return`<a class="ph${s>=j?" more":""}" href="${c}" data-lb data-i="${s}"><img sizes="auto, (max-width: 640px) 50vw, 280px" src="${c}" alt="${e(l.caption?n(l.caption):`${a.name} ${s+1}`)}" width="1000" height="750" loading="lazy"></a>`}).join("")}</div>
    ${r.length>j?`<p class="center"><button type="button" class="btn btn--line album-more" data-album-more>${e(t.album.more)} <span data-left>(${r.length-j})</span></button></p>`:""}
  </div>
  <dialog class="lb" data-lightbox aria-label="${e(t.album.title)}">
    <img alt="" data-lb-img>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${e(t.album.close)}">\u2715</button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${e(t.album.prev)}">${p("arrow",22,'style="transform:scaleX(-1)"')}</button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${e(t.album.next)}">${p("arrow",22)}</button>
    <p class="lb-count" data-lb-count></p>
  </dialog>
</section>`:""}function le({site:a,t,L:n}){var r,i;let o=a.dressCode;return!o||!n(o.text)&&!((r=o.colors)!=null&&r.length)?"":`<section class="section" aria-labelledby="dress-title">
  <div class="wrap narrow center">
    <h2 id="dress-title" class="h2">${e(t.dress.title)}</h2>
    ${n(o.text)?`<p class="lead">${e(n(o.text))}</p>`:""}
    ${(i=o.colors)!=null&&i.length?`<ul class="swatches" aria-hidden="true">${o.colors.map(l=>`<li style="--sw:${e(l)}"></li>`).join("")}</ul>`:""}
  </div>
</section>`}function ce({site:a,t,L:n,lang:o,channels:r,gform:i}){var d,f,u,y,x;let l=(d=a.rsvp)!=null?d:{},s=(f=a.contact)!=null?f:{},c=(u=a.events)!=null?u:[],h=i?` data-gform="${e(i.action)}" data-gmap='${e(JSON.stringify(i.fields))}'`:"",g=m=>r.map(b=>{var $;return`<button type="button" class="btn ${m!=null?m:b===r[0]?"btn--primary":"btn--line"}" data-channel="${e(b)}" data-href="${e(E(b,s,""))}">${p(b,18)} ${e(($=t.via[b])!=null?$:b)}</button>`}).join("");return`<section class="section section--soft" id="rsvp" aria-labelledby="rsvp-title">
  <div class="wrap rsvp">
    <div class="rsvp-copy">
      <p class="script">${e(t.nav.rsvp)}</p>
      <h2 id="rsvp-title" class="h2">${e(t.rsvp.title)}</h2>
      ${l.body?`<p class="lead">${e(n(l.body))}</p>`:""}
      ${l.deadline?`<p class="deadline">${p("calendar",18)} ${e(t.rsvp.deadline)}: <strong>${e(R(l.deadline,o))}</strong></p>`:""}
    </div>
    <form class="card form" data-rsvp novalidate${h} data-order-text="${e(t.orderText)}">
      <div class="rsvp-fields">
        <label class="field"><span>${e(t.rsvp.name)} *</span><input name="name" autocomplete="name" required maxlength="80"></label>
        <label class="field"><span>${e(t.rsvp.phone)} *</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20"></label>
        <fieldset class="field choice"><legend>${e(t.rsvp.attend)}</legend>
          <label><input type="radio" name="attend" value="yes" checked> <span data-label>${e(t.rsvp.yes)}</span></label>
          <label><input type="radio" name="attend" value="no"> <span data-label>${e(t.rsvp.no)}</span></label>
        </fieldset>
        <div class="row2">
          <label class="field"><span>${e(t.rsvp.guests)}</span><select name="qty">${[1,2,3,4,5,6].map(m=>`<option>${m}</option>`).join("")}</select></label>
          <label class="field"><span>${e(t.rsvp.side)}</span><select name="size"><option>${e(t.rsvp.sideBride)}</option><option>${e(t.rsvp.sideGroom)}</option><option>${e(t.rsvp.sideFriend)}</option></select></label>
        </div>
        ${c.length>1?`<label class="field"><span>${e(t.rsvp.event)}</span><select name="date"><option>${e(t.rsvp.all)}</option>${c.map(m=>`<option>${e(n(m.name))}</option>`).join("")}</select></label>`:""}
        <label class="field"><span>${e(t.rsvp.message)}</span><textarea name="note" rows="3" maxlength="500"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <p class="form-err" data-err hidden>${e(t.rsvp.required)}</p>
        <button class="btn btn--primary btn--lg" type="submit" data-submit data-sending="${e(t.rsvp.sending)}">${p("check",18)} ${e(t.rsvp.submit)}</button>
      </div>
      <div class="done${i?"":" done--step"}" data-done hidden tabindex="-1">
        <p class="done-title">${p(i?"check":"arrow",22)} ${e(i?t.rsvp.done:t.rsvp.stepTitle)}</p>
        <p>${e(i?t.rsvp.doneText:t.rsvp.stepText)}</p>
        ${i?"":`<div class="buy">${g()}</div><button type="button" class="link" data-edit>${e(t.rsvp.edit)}</button>`}
        ${((x=(y=a.gift)==null?void 0:y.accounts)!=null?x:[]).some(m=>m==null?void 0:m.number)?`<a class="btn btn--line" href="#gift" data-gift-link hidden>${p("heart",18)} ${e(t.gift.fromAfar)}</a>`:""}
        <p class="form-msg" data-msg hidden></p>
      </div>
    </form>
  </div>
</section>`}function pe({site:a,t,L:n,url:o}){var l;let r=a.gift,i=((l=r==null?void 0:r.accounts)!=null?l:[]).filter(s=>s==null?void 0:s.number);return!r||!i.length?"":`<section class="section" id="gift" aria-labelledby="gift-title">
  <div class="wrap">
    <div class="head center"><p class="script">${e(t.nav.gift)}</p><h2 id="gift-title" class="h2">${e(t.gift.title)}</h2>${r.body?`<p class="lead narrow">${e(n(r.body))}</p>`:""}</div>
    <div class="gifts">${i.map(s=>{var c,h,g,d;return`<article class="gift">
      ${s.qr?`<img class="qr" src="${e(k(o,s.qr))}" alt="QR ${e((c=s.bank)!=null?c:"")}" width="220" height="220" loading="lazy">
      <a class="link" href="${e(k(o,s.qr))}" download="qr-${e(String((h=s.bank)!=null?h:"bank").toLowerCase().replace(/[^a-z0-9]+/g,"-"))}.webp">${p("arrow",14,'style="transform:rotate(90deg)"')} ${e(t.gift.saveQr)}</a>
      <small class="muted">${e(t.gift.qrHint)}</small>`:`<span class="gift-ico" aria-hidden="true">${p("heart",30)}</span>`}
      <h3>${e(n(s.side))}</h3>
      <dl>
        <div><dt>${e(t.gift.bank)}</dt><dd>${e((g=s.bank)!=null?g:"")}</dd></div>
        <div><dt>${e(t.gift.number)}</dt><dd class="mono">${e(s.number)}</dd></div>
        <div><dt>${e(t.gift.holder)}</dt><dd>${e((d=s.holder)!=null?d:"")}</dd></div>
      </dl>
      <button type="button" class="btn btn--line" data-copy="${e(String(s.number).replace(/\s+/g,""))}" data-copied="${e(t.gift.copied)}">${e(t.gift.copy)}</button>
    </article>`}).join("")}</div>
  </div>
</section>`}function de({site:a,t,L:n,lang:o}){let r=F(a);return a.showReviews===!1||!r.length?"":`<section class="section section--soft" aria-labelledby="wish-title">
  <div class="wrap">
    <div class="head center"><h2 id="wish-title" class="h2">${e(t.reviews.title)}</h2></div>
    ${O(r,o,"wishes",i=>`<figure class="wish">
      <span class="wish-ico" aria-hidden="true">${p("heart",18)}</span>
      <blockquote>${e(n(i.text))}</blockquote>
      <figcaption>${e(i.name)}${G(i,o)}</figcaption>
    </figure>`)}
  </div>
</section>`}function he({site:a,t,L:n}){var r;let o=((r=a.faq)!=null?r:[]).filter(i=>n(i==null?void 0:i.q));return o.length?`<section class="section" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2 center">${e(t.faq.title)}</h2>
    <div class="qa">${o.map((i,l)=>`<details${l===0?" open":""}><summary>${e(n(i.q))}</summary><p>${e(n(i.a))}</p></details>`).join("")}</div>
  </div>
</section>`:""}function ue({site:a,t,L:n,market:o}){var l,s;let r=(l=a.contact)!=null?l:{},i=Object.entries((s=a.social)!=null?s:{}).filter(([,c])=>c);return`<footer class="footer">
  <div class="wrap foot">
    <div><p class="foot-name">${e(a.name)}</p><p class="muted">${e(t.footer.thanks)}</p></div>
    <div><p class="foot-h">${e(t.footer.contact)}</p><ul>
      ${r.phone?`<li><a href="tel:${w(r.phone)}">${e(r.phone)}</a></li>`:""}
      ${r.email?`<li><a href="mailto:${e(r.email)}">${e(r.email)}</a></li>`:""}
      ${n(r.address)?`<li>${e(n(r.address))}</li>`:""}</ul></div>
    ${i.length?`<div><p class="foot-h">${e(t.footer.follow)}</p><ul>${i.map(([c,h])=>`<li><a href="${e(h)}" target="_blank" rel="noopener">${e(c[0].toUpperCase()+c.slice(1))}</a></li>`).join("")}</ul></div>`:""}
  </div>
  <div class="wrap foot-bottom${a.badge===!1?" is-solo":""}"><span>\xA9 ${new Date().getFullYear()} ${e(a.name)}</span>${I(a,t,o.lang)}</div>
</footer>`}function me({site:a,L:t,abs:n,market:o}){var i;let r=a.utcOffset||"+07:00";return((i=a.events)!=null?i:[]).map(l=>({"@context":"https://schema.org","@type":"Event",name:`${t(l.name)} \xB7 ${a.name}`,startDate:`${l.date}T${l.time||"00:00"}:00${r}`,eventStatus:"https://schema.org/EventScheduled",eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode",location:{"@type":"Place",name:t(l.place),address:t(l.address)},image:n("assets/photos/hero.webp"),description:t(a.intro),url:n(`${o.id}/`),organizer:{"@type":"Person",name:a.name}}))}export{Ne as renderSite};
