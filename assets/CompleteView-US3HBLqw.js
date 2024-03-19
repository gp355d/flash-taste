import{S as m}from"./sweetalert2.all-MZ4wuwUD.js";import{_ as v,r as f,o as c,c as n,a as s,b as g,w as y,F as w,g as x,t,d as a,i as b,h as P}from"./index-zLiU2U1g.js";var A={VITE_APP_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_APP_API_NAME:"leo535",BASE_URL:"/flash-taste/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_API_URL:_,VITE_APP_API_NAME:p}=A,k={data(){return{order:{products:[],user:{}}}},methods:{getOrder(){const o=this.$route.params.order_id,r=this.$loading.show();this.axios.get(`${_}/api/${p}/order/${o}`).then(d=>{const{order:l}=d.data;this.order=l,console.log(this.order),r.hide()}).catch(d=>{m.fire({position:"top-end",icon:"error",title:d.response.data.message,showConfirmButton:!1,timer:1500})})},pay(){const o=this.$route.params.order_id,r=this.$loading.show();this.$http.post(`${_}/api/${p}/pay/${o}`).then(d=>{this.getOrder(),r.hide(),this.$router.push("/pay")})}},mounted(){this.getOrder()}},E={class:"container"},I={class:"pt-4 pb-3"},V={class:"container"},$=P('<div class="row justify-content-center"><div class="col-9 col-md-7 timeline"></div></div><div class="row mb-2"><div class="col-3 col-md-5"><div class="timeline-pointer text-center step-1 active"><p>購物清單確認</p></div></div><div class="col-6 col-md-2"><div class="timeline-pointer text-center step-2 active"><p>填寫訂單</p></div></div><div class="col-3 col-md-5"><div class="timeline-pointer text-center step-3 active"><p>購物完成</p></div></div></div>',2),S=s("span",{class:"material-icons"},"keyboard_return",-1),N={class:"order-summary p-4"},B=s("h4",null,"訂單成立",-1),C=s("p",null,"您已經完成本次購物，當確認訂購資訊無誤及付款完成後，我們將立即出貨，感謝您訂購商品",-1),O={class:"row mb-2"},R={class:"col-md-6"},T={class:"row shadow-sm p-2 mb-4"},D=s("p",{class:"h3"},[s("strong",null,"商品明細:")],-1),L={class:"col-md-12"},M={class:"list-unstyled"},U={class:"col-md-7"},j=["src","alt"],F={class:"col-md-5 d-flex flex-row flex-column justify-content-md-center p-3"},q={class:"d-block fs-3 fs-md-4"},X={class:"d-flex fs-4 fs-md-5"},z={class:"me-2"},G={class:"col-md-6"},H=s("p",{class:"h3"},[s("strong",null,"顧客資訊:")],-1),J={class:"row"},K={class:"col-md-8"},Q={class:"h2"},W={class:"text-danger"},Y={class:"d-flex justify-content-center"},Z={key:1};function ss(o,r,d,l,e,h){const u=f("router-link");return c(),n("div",E,[s("div",I,[s("div",V,[$,g(u,{to:"/products",class:"d-inline-flex align-items-center text-decoration-none"},{default:y(()=>[S,a(" 回商品列表 ")]),_:1})])]),s("div",N,[B,C,s("div",O,[s("div",R,[s("div",T,[D,s("div",L,[s("ul",M,[(c(!0),n(w,null,x(e.order.products,i=>(c(),n("li",{class:"row mb-3 g-0 border",key:i.id},[s("div",U,[s("img",{src:i.product.imageUrl,alt:i.product.title,class:"img-fluid"},null,8,j)]),s("div",F,[s("span",q,t(i.product.title),1),s("div",X,[s("span",z,t(o.$filters.currency(i.product.price)),1),s("span",null,"X"+t(i.qty),1)])])]))),128))])])])]),s("div",G,[H,s("p",null,"姓名:"+t(e.order.user.name),1),s("p",null,"地址:"+t(e.order.user.address),1),s("p",null,"電話: "+t(e.order.user.tel),1),s("p",null,"訂單編號: "+t(e.order.id),1),s("p",null,"訂單狀態: "+t(e.order.is_paid?"付款完成":"尚未付款"),1)])]),s("div",J,[s("div",K,[s("p",Q,[a("總金額:"),s("strong",W,t(o.$filters.currency(e.order.total)),1)])])]),s("div",Y,[e.order.is_paid!==!0?(c(),n("button",{key:0,type:"button",class:"btn btn-primary",onClick:r[0]||(r[0]=b(()=>h.pay(),["prevent"]))},"前往付款")):(c(),n("div",Z))])])])}const os=v(k,[["render",ss]]);export{os as default};
