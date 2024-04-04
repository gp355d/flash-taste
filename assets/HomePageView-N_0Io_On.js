import{e as X,a as O,c as J,b as K,N as Q}from"./navigation-4jBMbqPD.js";import{S as Z,a as w}from"./swiper-slide-E41j4QSY.js";import{_ as tt,f as F,m as at,r as T,o as y,c as _,a as s,F as G,g as R,b as k,w as B,h as et,i as N,t as L,j as st,d as Y,p as lt,e as it}from"./index-Q2DV9-bg.js";import{C as nt}from"./CartStore-pb1W7c_e.js";import{P as W}from"./ProductStore-X0Pz2CDW.js";import"./sweetalert2.all-uOdz_5DA.js";function S(t=""){return`.${t.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function ot({swiper:t,extendParams:C,on:g,emit:A}){const d="swiper-pagination";C({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:a=>a,formatFractionTotal:a=>a,bulletClass:`${d}-bullet`,bulletActiveClass:`${d}-bullet-active`,modifierClass:`${d}-`,currentClass:`${d}-current`,totalClass:`${d}-total`,hiddenClass:`${d}-hidden`,progressbarFillClass:`${d}-progressbar-fill`,progressbarOppositeClass:`${d}-progressbar-opposite`,clickableClass:`${d}-clickable`,lockClass:`${d}-lock`,horizontalClass:`${d}-horizontal`,verticalClass:`${d}-vertical`,paginationDisabledClass:`${d}-disabled`}}),t.pagination={el:null,bullets:[]};let D,h=0;const u=a=>(Array.isArray(a)||(a=[a].filter(e=>!!e)),a);function H(){return!t.params.pagination.el||!t.pagination.el||Array.isArray(t.pagination.el)&&t.pagination.el.length===0}function n(a,e){const{bulletActiveClass:l}=t.params.pagination;a&&(a=a[`${e==="prev"?"previous":"next"}ElementSibling`],a&&(a.classList.add(`${l}-${e}`),a=a[`${e==="prev"?"previous":"next"}ElementSibling`],a&&a.classList.add(`${l}-${e}-${e}`)))}function P(a){const e=a.target.closest(S(t.params.pagination.bulletClass));if(!e)return;a.preventDefault();const l=O(e)*t.params.slidesPerGroup;if(t.params.loop){if(t.realIndex===l)return;const i=t.getSlideIndexByData(l),c=t.getSlideIndexByData(t.realIndex);i>t.slides.length-t.loopedSlides&&t.loopFix({direction:i>c?"next":"prev",activeSlideIndex:i,slideTo:!1}),t.slideToLoop(l)}else t.slideTo(l)}function x(){const a=t.rtl,e=t.params.pagination;if(H())return;let l=t.pagination.el;l=u(l);let i,c;const $=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,E=t.params.loop?Math.ceil($/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(c=t.previousRealIndex||0,i=t.params.slidesPerGroup>1?Math.floor(t.realIndex/t.params.slidesPerGroup):t.realIndex):typeof t.snapIndex<"u"?(i=t.snapIndex,c=t.previousSnapIndex):(c=t.previousIndex||0,i=t.activeIndex||0),e.type==="bullets"&&t.pagination.bullets&&t.pagination.bullets.length>0){const o=t.pagination.bullets;let v,p,I;if(e.dynamicBullets&&(D=X(o[0],t.isHorizontal()?"width":"height",!0),l.forEach(r=>{r.style[t.isHorizontal()?"width":"height"]=`${D*(e.dynamicMainBullets+4)}px`}),e.dynamicMainBullets>1&&c!==void 0&&(h+=i-(c||0),h>e.dynamicMainBullets-1?h=e.dynamicMainBullets-1:h<0&&(h=0)),v=Math.max(i-h,0),p=v+(Math.min(o.length,e.dynamicMainBullets)-1),I=(p+v)/2),o.forEach(r=>{const m=[...["","-next","-next-next","-prev","-prev-prev","-main"].map(f=>`${e.bulletActiveClass}${f}`)].map(f=>typeof f=="string"&&f.includes(" ")?f.split(" "):f).flat();r.classList.remove(...m)}),l.length>1)o.forEach(r=>{const m=O(r);m===i?r.classList.add(...e.bulletActiveClass.split(" ")):t.isElement&&r.setAttribute("part","bullet"),e.dynamicBullets&&(m>=v&&m<=p&&r.classList.add(...`${e.bulletActiveClass}-main`.split(" ")),m===v&&n(r,"prev"),m===p&&n(r,"next"))});else{const r=o[i];if(r&&r.classList.add(...e.bulletActiveClass.split(" ")),t.isElement&&o.forEach((m,f)=>{m.setAttribute("part",f===i?"bullet-active":"bullet")}),e.dynamicBullets){const m=o[v],f=o[p];for(let M=v;M<=p;M+=1)o[M]&&o[M].classList.add(...`${e.bulletActiveClass}-main`.split(" "));n(m,"prev"),n(f,"next")}}if(e.dynamicBullets){const r=Math.min(o.length,e.dynamicMainBullets+4),m=(D*r-D)/2-I*D,f=a?"right":"left";o.forEach(M=>{M.style[t.isHorizontal()?f:"top"]=`${m}px`})}}l.forEach((o,v)=>{if(e.type==="fraction"&&(o.querySelectorAll(S(e.currentClass)).forEach(p=>{p.textContent=e.formatFractionCurrent(i+1)}),o.querySelectorAll(S(e.totalClass)).forEach(p=>{p.textContent=e.formatFractionTotal(E)})),e.type==="progressbar"){let p;e.progressbarOpposite?p=t.isHorizontal()?"vertical":"horizontal":p=t.isHorizontal()?"horizontal":"vertical";const I=(i+1)/E;let r=1,m=1;p==="horizontal"?r=I:m=I,o.querySelectorAll(S(e.progressbarFillClass)).forEach(f=>{f.style.transform=`translate3d(0,0,0) scaleX(${r}) scaleY(${m})`,f.style.transitionDuration=`${t.params.speed}ms`})}e.type==="custom"&&e.renderCustom?(o.innerHTML=e.renderCustom(t,i+1,E),v===0&&A("paginationRender",o)):(v===0&&A("paginationRender",o),A("paginationUpdate",o)),t.params.watchOverflow&&t.enabled&&o.classList[t.isLocked?"add":"remove"](e.lockClass)})}function j(){const a=t.params.pagination;if(H())return;const e=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length;let l=t.pagination.el;l=u(l);let i="";if(a.type==="bullets"){let c=t.params.loop?Math.ceil(e/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&c>e&&(c=e);for(let $=0;$<c;$+=1)a.renderBullet?i+=a.renderBullet.call(t,$,a.bulletClass):i+=`<${a.bulletElement} ${t.isElement?'part="bullet"':""} class="${a.bulletClass}"></${a.bulletElement}>`}a.type==="fraction"&&(a.renderFraction?i=a.renderFraction.call(t,a.currentClass,a.totalClass):i=`<span class="${a.currentClass}"></span> / <span class="${a.totalClass}"></span>`),a.type==="progressbar"&&(a.renderProgressbar?i=a.renderProgressbar.call(t,a.progressbarFillClass):i=`<span class="${a.progressbarFillClass}"></span>`),t.pagination.bullets=[],l.forEach(c=>{a.type!=="custom"&&(c.innerHTML=i||""),a.type==="bullets"&&t.pagination.bullets.push(...c.querySelectorAll(S(a.bulletClass)))}),a.type!=="custom"&&A("paginationRender",l[0])}function V(){t.params.pagination=J(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const a=t.params.pagination;if(!a.el)return;let e;typeof a.el=="string"&&t.isElement&&(e=t.el.shadowRoot.querySelector(a.el)),!e&&typeof a.el=="string"&&(e=[...document.querySelectorAll(a.el)]),e||(e=a.el),!(!e||e.length===0)&&(t.params.uniqueNavElements&&typeof a.el=="string"&&Array.isArray(e)&&e.length>1&&(e=[...t.el.querySelectorAll(a.el)],e.length>1&&(e=e.filter(l=>K(l,".swiper")[0]===t.el)[0])),Array.isArray(e)&&e.length===1&&(e=e[0]),Object.assign(t.pagination,{el:e}),e=u(e),e.forEach(l=>{a.type==="bullets"&&a.clickable&&l.classList.add(a.clickableClass),l.classList.add(a.modifierClass+a.type),l.classList.add(t.isHorizontal()?a.horizontalClass:a.verticalClass),a.type==="bullets"&&a.dynamicBullets&&(l.classList.add(`${a.modifierClass}${a.type}-dynamic`),h=0,a.dynamicMainBullets<1&&(a.dynamicMainBullets=1)),a.type==="progressbar"&&a.progressbarOpposite&&l.classList.add(a.progressbarOppositeClass),a.clickable&&l.addEventListener("click",P),t.enabled||l.classList.add(a.lockClass)}))}function z(){const a=t.params.pagination;if(H())return;let e=t.pagination.el;e&&(e=u(e),e.forEach(l=>{l.classList.remove(a.hiddenClass),l.classList.remove(a.modifierClass+a.type),l.classList.remove(t.isHorizontal()?a.horizontalClass:a.verticalClass),a.clickable&&l.removeEventListener("click",P)})),t.pagination.bullets&&t.pagination.bullets.forEach(l=>l.classList.remove(...a.bulletActiveClass.split(" ")))}g("changeDirection",()=>{if(!t.pagination||!t.pagination.el)return;const a=t.params.pagination;let{el:e}=t.pagination;e=u(e),e.forEach(l=>{l.classList.remove(a.horizontalClass,a.verticalClass),l.classList.add(t.isHorizontal()?a.horizontalClass:a.verticalClass)})}),g("init",()=>{t.params.pagination.enabled===!1?q():(V(),j(),x())}),g("activeIndexChange",()=>{typeof t.snapIndex>"u"&&x()}),g("snapIndexChange",()=>{x()}),g("snapGridLengthChange",()=>{j(),x()}),g("destroy",()=>{z()}),g("enable disable",()=>{let{el:a}=t.pagination;a&&(a=u(a),a.forEach(e=>e.classList[t.enabled?"remove":"add"](t.params.pagination.lockClass)))}),g("lock unlock",()=>{x()}),g("click",(a,e)=>{const l=e.target;let{el:i}=t.pagination;if(Array.isArray(i)||(i=[i].filter(c=>!!c)),t.params.pagination.el&&t.params.pagination.hideOnClick&&i&&i.length>0&&!l.classList.contains(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&l===t.navigation.nextEl||t.navigation.prevEl&&l===t.navigation.prevEl))return;const c=i[0].classList.contains(t.params.pagination.hiddenClass);A(c===!0?"paginationShow":"paginationHide"),i.forEach($=>$.classList.toggle(t.params.pagination.hiddenClass))}});const U=()=>{t.el.classList.remove(t.params.pagination.paginationDisabledClass);let{el:a}=t.pagination;a&&(a=u(a),a.forEach(e=>e.classList.remove(t.params.pagination.paginationDisabledClass))),V(),j(),x()},q=()=>{t.el.classList.add(t.params.pagination.paginationDisabledClass);let{el:a}=t.pagination;a&&(a=u(a),a.forEach(e=>e.classList.add(t.params.pagination.paginationDisabledClass))),z()};Object.assign(t.pagination,{enable:U,disable:q,render:j,update:x,init:V,destroy:z})}const ct="/flash-taste/assets/logonew-01-xOlFllVk.svg";var rt={VITE_APP_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_APP_API_NAME:"leo535",BASE_URL:"/flash-taste/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_API_URL:dt,VITE_APP_API_NAME:mt}=rt,ft={data(){return{modules:[Q,ot],articleList:[]}},methods:{...F(W,["getProductAllData"]),getArticle(){const t=this.$loading.show();this.axios.get(`${dt}/api/${mt}/articles`).then(C=>{this.articleList=C.data.articles,console.log(this.articleList),t.hide()}).catch(C=>{alert(C.response.data.message),console.log(C.data)})},...F(nt,["addToCart"])},components:{Swiper:Z,SwiperSlide:w},computed:{...at(W,["products"])},mounted(){this.getProductAllData(),this.getArticle()}},b=t=>(lt("data-v-b3a1738b"),t=t(),it(),t),pt=et('<section class="" data-v-b3a1738b><div class="d-flex flex-column justify-content-center align-items-center px-5 px-lg-0" style="background-image:url(https://images.unsplash.com/photo-1522747776116-64ee03be1dad?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1170&amp;q=80);background-repeat:no-repeat;background-size:cover;height:450px;background-position:center;" data-v-b3a1738b><div class="d-flex flex-column justify-content-center align-items-center px-lg-5 py-lg-2 px-2 py-1" style="background:rgba(255, 255, 255, 0.1);border-radius:24px;backdrop-filter:blur(3px);" data-v-b3a1738b><img src="'+ct+'" alt="logo" width="260" height="160" class="img-fluid" data-v-b3a1738b><h3 class="fs-1 fs-lg-2 text-center mb-0" data-v-b3a1738b>療癒一杯，感受生活的美好</h3><h1 class="fs-2 fs-lg-3 text-center text-gray-dark mb-5" data-v-b3a1738b>尋找心靈的寧靜之旅</h1><a href="#/products" class="btn btn-primary fs-lg-5 px-5 py-3 px-lg-6" data-v-b3a1738b>立即探索</a></div></div></section><div class="py-5" data-v-b3a1738b><section class="container" data-v-b3a1738b><h2 class="text-center text-primary fw-bold mb-5" data-v-b3a1738b>產品特色</h2><ul class="row d-block d-md-flex align-items-center justify-content-md-end list-unstyled position-relative mb-5" data-v-b3a1738b><li class="col-md-8" data-v-b3a1738b><img class="rounded-3 indexAboutImg img-fluid object-fit-cover w-100" src="https://images.unsplash.com/photo-1582650859079-ee63913ecb84?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80" style="height:400px;" data-v-b3a1738b></li><li class="col-md-5 position-absolute start-0 position-none" data-v-b3a1738b><div class="d-flex flex-column justify-content-center align-items-center align-items-md-start rounded-3 bg-white p-4" style="min-height:250px;" data-v-b3a1738b><div class="text-center text-md-start" data-v-b3a1738b><h2 class="mb-3" data-v-b3a1738b>優質的烘焙技術</h2><span class="" data-v-b3a1738b>我們以優質的烘焙技術為基礎，精心挑選最優質的茶葉，將其烘焙至完美的狀態。每一杯茶都是我們匠心獨具的傑作，充滿著濃郁的香氣和獨特的風味。我們堅持以最優質的茶葉和最精湛的工藝，為您呈現一場真正的品茶饗宴。讓我們的烘焙技術帶您進入茶的世界，品味其中的無盡魅力。</span></div></div></li></ul></section><section class="container" data-v-b3a1738b><ul class="row d-block d-md-flex align-items-center list-unstyled position-relative mb-5" data-v-b3a1738b><li class="col-md-8" data-v-b3a1738b><img class="rounded-3 indexAboutImg img-fluid object-fit-cover w-100" src="https://images.unsplash.com/photo-1579887829663-67706e62e6ac?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80)" style="height:400px;" data-v-b3a1738b></li><li class="col-md-5 d-md-flex flex-md-column position-absolute end-0 position-none" data-v-b3a1738b><div class="rounded-3 bg-white d-flex flex-column justify-content-center p-4" style="min-height:250px;" data-v-b3a1738b><div class="text-center text-md-start" data-v-b3a1738b><h2 class="mb-3" data-v-b3a1738b>風味多樣的選擇</h2><span class="" data-v-b3a1738b>無論您是喜歡清新淡雅的綠茶，還是偏愛濃郁香醇的紅茶；無論您追求花果香氣的烏龍茶，還是喜愛清香爽口的白茶，我們都能滿足您的味蕾。在這裡，您可以找到各種風味多樣的茶葉，每一種茶都有其獨特的魅力和風味。讓我們的茶葉為您帶來一場風味之旅，讓您盡情享受茶的世界。</span></div></div></li></ul></section><section class="container" data-v-b3a1738b><ul class="row d-block d-md-flex align-items-center justify-content-md-end list-unstyled position-relative mb-0" data-v-b3a1738b><li class="col-md-8" data-v-b3a1738b><img class="bg-cover rounded-3 indexAboutImg img-fluid object-fit-cover w-100" src="https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&amp;w=800&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="height:400px;" data-v-b3a1738b></li><li class="col-md-5 position-absolute start-0 position-none" data-v-b3a1738b><div class="d-flex flex-column justify-content-center align-items-center align-items-md-start rounded-3 bg-white p-4" style="min-height:250px;" data-v-b3a1738b><div class="text-center text-md-start" data-v-b3a1738b><h2 class="mb-3" data-v-b3a1738b>健康享受的美好時刻</h2><span class="" data-v-b3a1738b>在這個忙碌的生活中，讓我們一起停下腳步，享受一杯健康的茶，為身心注入一絲寧靜與愉悅。我們精心挑選最優質的茶葉，為您帶來清新、醇厚、香氣四溢的茶品。無論是清晨的第一杯茶，還是下午的片刻悠閒，讓我們一起沉浸在茶的世界中，享受健康的美好時刻。</span></div></div></li></ul></section></div>',2),ut={class:""},bt={class:"container mb-3 py-5"},gt=b(()=>s("h2",{class:"text-center text-primary fw-bold mb-5"},"精選產品",-1)),ht={class:"row"},vt={key:0,class:"col-lg-3 col-md-6 mb-3"},xt={class:"card h-100 border border-1 rounded-top"},yt=["onClick"],_t=["src","alt"],Ct={class:"p-3"},At={class:"fs-4 fw-normal"},$t={key:0},kt={class:"fs-3 text-danger"},Bt={class:"fs-2 ms-2 fw-normal"},Dt={key:1,class:"fs-3 text-danger"},Mt={class:"text-center"},Lt=["onClick"],Ht=b(()=>s("div",{class:"d-grid gap-2 mx-auto col-8 mb-2"},null,-1)),It={class:"container mb-3 py-5"},St={class:"row flex-row-reverse"},Pt=b(()=>s("div",{class:"col-md-6 mb-md-0 mb-3"},[s("div",{class:"rounded-3",style:{"background-image":"url('https://images.unsplash.com/photo-1550450339-e7a4787a2074?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",height:"350px","background-size":"cover","background-repeat":"no-repeat","background-position":"center"}})],-1)),jt={class:"col-md-6 d-flex"},Gt={class:"d-flex justify-content-center align-items-center"},Vt=b(()=>s("h2",{class:"fw-normal mb-5"},"歡迎來到我們的茶葉世界！",-1)),zt=b(()=>s("p",{class:"mb-1"},"我們的使命是將茶的美好帶給每一位顧客，讓您品味生活的美好滋味。我們堅持品質至上，匠心製茶，致力於為您提供最純淨、最美味的茶品體驗。",-1)),Et={class:"text-center text-md-start"},Tt={class:"mb-3"},qt={class:"container"},Ot=b(()=>s("h2",{class:"text-center text-primary fw-bold mb-5"},"好評推薦",-1)),Ft={class:"row"},Rt=b(()=>s("div",{class:"card d-flex h-100"},[s("div",{class:"card-body"},[s("div",{class:"d-flex align-items-center flex-md-column"},[s("img",{class:"rounded-circle object-fit-cover mb-2 mb-lg-2 me-5 me-md-0",src:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"recommend-people3",width:"120",height:"120"}),s("h3",{class:"text-center fw-normal fs-4 mb-1"},"wendy lin")]),s("p",{class:"text-start fw-normal fs-6 mb-12 mb-0"},"茶葉的品質非常穩定，每次都能保持一致的口感和風味。")])],-1)),Nt=b(()=>s("div",{class:"card d-flex h-100"},[s("div",{class:"card-body"},[s("div",{class:"d-flex align-items-center flex-md-column"},[s("img",{class:"rounded-circle object-fit-cover mb-2 mb-lg-2 me-5 me-md-0",src:"https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"recommend-people4",width:"120",height:"120"}),s("h3",{class:"text-center fw-normal fs-4 mb-1"},"Tomy wang")]),s("p",{class:"text-start fw-normal fs-6 mb-12 mb-0"},"我已經向我的朋友們推薦了這款茶葉，他們也都非常喜歡！ ")])],-1)),Yt=b(()=>s("div",{class:"card d-flex h-100"},[s("div",{class:"card-body"},[s("div",{class:"d-flex align-items-center flex-md-column"},[s("img",{class:"rounded-circle object-fit-cover mb-2 mb-lg-2 me-5 me-md-0",src:"https://images.unsplash.com/photo-1541823709867-1b206113eafd?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"recommend-people4",width:"120",height:"120"}),s("h3",{class:"text-center fw-normal fs-4 mb-1"},"Jacky wang")]),s("p",{class:"text-start fw-normal fs-6 mb-12 mb-0"},"這是我嘗過的最棒的茶葉了！絕對值得一試！ ")])],-1)),Wt=b(()=>s("div",{class:"card d-flex h-100"},[s("div",{class:"card-body"},[s("div",{class:"d-flex align-items-center flex-md-column"},[s("img",{class:"rounded-circle object-fit-cover mb-2 mb-lg-2 me-5 me-md-0",src:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"recommend-people4",width:"120",height:"120"}),s("h3",{class:"text-center fw-normal fs-4 mb-1"},"Tom chen")]),s("p",{class:"text-start fw-normal fs-6 mb-12 mb-0"},"我很喜歡這款茶葉的味道，每天都讓我心情愉悅 ")])],-1)),Ut={class:"container py-5"},Xt={class:"row"},Jt=b(()=>s("h2",{class:"text-center text-primary fw-bold mb-5"},"知識文章",-1)),Kt={class:"position-relative h-100"},Qt={class:"position-absolute bg-primary p-2 rounded-3 text-white",style:{left:"-3%",top:"10%"}},Zt=["src","alt"],wt={class:"fw-normal mb-4",style:{"min-height":"60px"}};function ta(t,C,g,A,d,D){const h=T("RouterLink"),u=T("swiper-slide"),H=T("swiper");return y(),_(G,null,[pt,s("div",ut,[s("div",bt,[gt,s("div",ht,[(y(!0),_(G,null,R(t.products,(n,P)=>(y(),_(G,{key:n.id},[P<4?(y(),_("div",vt,[s("div",xt,[s("a",{href:"",onClick:N(x=>this.$router.push(`/product/${n.id}`),["prevent"])},[s("img",{class:"img-fluid object-fit-cover rounded-top position-relative w-100",style:{height:"300px"},src:n.imageUrl,alt:`img-${n.title}`},null,8,_t)],8,yt),s("div",Ct,[s("h3",At,L(n.title),1),n.price!==n.origin_price?(y(),_("div",$t,[s("span",kt,L(t.$filters.currency(n.price)),1),s("del",Bt,L(t.$filters.currency(n.origin_price)),1)])):(y(),_("span",Dt,L(t.$filters.currency(n.origin_price)),1))]),s("div",Mt,[s("a",{class:"btn-lg btn btn-primary text-nowrap",onClick:N(x=>t.addToCart(n.id),["prevent"])},"加入購物車",8,Lt)]),Ht])])):st("",!0)],64))),128))])])]),s("div",It,[s("div",St,[Pt,s("div",jt,[s("div",Gt,[s("div",null,[Vt,zt,s("div",Et,[k(h,{to:"/products",class:"btn btn-primary"},{default:B(()=>[Y("購物去")]),_:1})])])])])])]),s("div",Tt,[s("div",qt,[Ot,s("div",Ft,[k(H,{"slides-per-view":1,"space-between":24,class:"pb-10",modules:d.modules,navigation:"",pagination:{clickable:!0},breakpoints:{320:{slidesPerView:1,spaceBetween:24},768:{slidesPerView:3,spaceBetween:24},992:{slidesPerView:3,spaceBetween:24}}},{default:B(()=>[k(u,null,{default:B(()=>[Rt]),_:1}),k(u,null,{default:B(()=>[Nt]),_:1}),k(u,null,{default:B(()=>[Yt]),_:1}),k(u,null,{default:B(()=>[Wt]),_:1})]),_:1},8,["modules"])])])]),s("div",Ut,[s("div",Xt,[Jt,(y(!0),_(G,null,R(d.articleList,n=>(y(),_("div",{class:"col-lg-4 col-md-6",key:n.id},[s("div",Kt,[s("span",Qt,L(t.$filters.date(n.create_at)),1),s("img",{class:"img-fluid rounded-3 object-fit-cover mb-2 w-100",src:n.image,alt:`img${n.id}`,style:{height:"300px"}},null,8,Zt),s("h4",wt,L(n.title),1),k(h,{class:"btn btn-primary",to:`/blog/${n.id}`},{default:B(()=>[Y("閱讀更多")]),_:2},1032,["to"])])]))),128))])])],64)}const oa=tt(ft,[["render",ta],["__scopeId","data-v-b3a1738b"]]);export{oa as default};