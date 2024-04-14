import{S as v}from"./sweetalert2.all-HbtBlwOO.js";import{_ as u,o as i,c as r,a as e,F as f,g as m,t,d as b,i as g,h as y,p as w,e as x}from"./index-VXbgTIX3.js";var I={VITE_APP_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_APP_API_NAME:"leo535",BASE_URL:"/flash-taste/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_API_URL:p,VITE_APP_API_NAME:_}=I,E={data(){return{order:{total:0,products:[],user:{}}}},methods:{getOrder(){const s=this.$route.params.order_id,d=this.$loading.show();this.axios.get(`${p}/api/${_}/order/${s}`).then(c=>{const{order:n}=c.data;this.order=n,d.hide()}).catch(c=>{v.fire({position:"top-end",icon:"error",title:c.response.data.message,showConfirmButton:!1,timer:1500})})},pay(){const s=this.$route.params.order_id,d=this.$loading.show();this.$http.post(`${p}/api/${_}/pay/${s}`).then(c=>{this.getOrder(),d.hide(),this.$router.push("/pay")})}},mounted(){this.getOrder()}},l=s=>(w("data-v-ceb1df70"),s=s(),x(),s),P={class:"container"},A=y('<div class="pt-4 pb-3" data-v-ceb1df70><div class="container" data-v-ceb1df70><div class="row justify-content-center" data-v-ceb1df70><div class="col-9 col-md-7 timeline" data-v-ceb1df70></div></div><div class="row mb-2" data-v-ceb1df70><div class="col-3 col-md-5" data-v-ceb1df70><div class="timeline-pointer text-center step-1 active" data-v-ceb1df70><p data-v-ceb1df70>購物清單確認</p></div></div><div class="col-6 col-md-2" data-v-ceb1df70><div class="timeline-pointer text-center step-2 active" data-v-ceb1df70><p data-v-ceb1df70>填寫訂單</p></div></div><div class="col-3 col-md-5" data-v-ceb1df70><div class="timeline-pointer text-center step-3 active" data-v-ceb1df70><p data-v-ceb1df70>購物完成</p></div></div></div></div></div><div class="row justify-content-center px-3" data-v-ceb1df70><div class="col-md-8 bg-white p-3 shadow-sm" data-v-ceb1df70><h3 class="text-primary mb-5" data-v-ceb1df70>訂單已成立</h3></div></div>',2),O={class:"row justify-content-center px-3"},S={class:"col-md-8 bg-white p-3 shadow-sm"},V=l(()=>e("h4",{class:"mb-2"},"購買品項",-1)),$={class:"col-3"},k=["src","alt"],j={class:"col-6 text-center"},B={class:"col-3 text-end"},N={class:"me-2"},R=l(()=>e("div",{class:"row pt-3"},[e("hr",{class:"w-100 col-md-9 border-2 border-top"})],-1)),T=l(()=>e("div",{class:"accordion",id:"accordionExample"},null,-1)),D={class:"accordion",id:"accordionFlushExample"},F={class:"accordion-item"},L=l(()=>e("h2",{class:"accordion-header",id:"flush-headingOne"},[e("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#flush-collapseOne","aria-expanded":"false","aria-controls":"flush-collapseOne"}," 查看詳細資訊 ")],-1)),M={id:"flush-collapseOne",class:"accordion-collapse collapse","aria-labelledby":"flush-headingOne","data-bs-parent":"#accordionFlushExample"},U={class:"p-3"},C={class:"fs-5"},q={class:"text-danger"},X={class:"d-flex justify-content-center"},z={key:1};function G(s,d,c,n,o,h){return i(),r("div",P,[A,e("div",O,[e("div",S,[V,(i(!0),r(f,null,m(o.order.products,a=>(i(),r("div",{class:"row mb-3 justify-content-center align-items-center",key:a.id},[e("div",$,[e("img",{src:a.product.imageUrl,alt:a.product.title,class:"img-fluid"},null,8,k)]),e("div",j,[e("span",null,t(a.product.title),1),e("span",null,"X"+t(a.qty),1)]),e("div",B,[e("span",N,t(s.$filters.currency(a.product.price)),1)]),R,T]))),128)),e("div",D,[e("div",F,[L,e("div",M,[e("div",U,[e("p",null,"顧客姓名:"+t(o.order.user.name),1),e("p",null,"顧客地址:"+t(o.order.user.address),1),e("p",null,"聯絡電話:"+t(o.order.user.tel),1),e("p",null,"訂單編號:"+t(o.order.id),1),e("p",null,"訂單狀態:"+t(o.order.is_paid?"付款完成":"尚未付款"),1),e("p",C,[b("總金額:"),e("strong",q,t(s.$filters.currency(o.order.total)),1)])])])])])])]),e("div",X,[o.order.is_paid!==!0?(i(),r("button",{key:0,type:"button",class:"btn btn-primary",onClick:d[0]||(d[0]=g(()=>h.pay(),["prevent"]))},"前往付款")):(i(),r("div",z))])])}const K=u(E,[["render",G],["__scopeId","data-v-ceb1df70"]]);export{K as default};