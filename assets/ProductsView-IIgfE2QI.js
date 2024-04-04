import{P as y}from"./PaginationCom-Y6PWvyB_.js";import{_ as k,f as _,m,r as P,o,c as i,a as t,n as h,i as l,F as g,g as u,b as C,t as a}from"./index-Zq8gSJsz.js";import{C as f}from"./CartStore-iQSnuSZB.js";import{P as b}from"./ProductStore-1Ti7E9OU.js";import{S as w}from"./sweetalert2.all-lOhIckfE.js";var A={VITE_APP_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_APP_API_NAME:"leo535",BASE_URL:"/flash-taste/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_API_URL:$,VITE_APP_API_NAME:x}=A,S={data(){return{products:[],page:{}}},watch:{category(){this.getProducts()}},methods:{getProducts(s=1){const n=this.$loading.show();this.axios.get(`${$}/api/${x}/products/?page=${s}&category=${this.category}`).then(r=>{this.products=r.data.products,this.page=r.data.pagination,n.hide()}).catch(r=>{w.fire({position:"top-end",icon:"error",title:r,showConfirmButton:!1,timer:1500})})},more(s){this.$router.push(`/product/${s}`)},..._(f,["addToCart"]),..._(b,["getid","addToFavorite","setCategory","getProductAllData"])},mounted(){this.getProducts(),this.getProductAllData(),this.getid()},computed:{...m(b,["favoriteList","categories","category"]),...m(f,["isLoadingStatus"])},components:{PaginationCom:y}},D=t("div",{class:"position-relative mb-3",style:{"background-image":"url('https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')","background-size":"cover","background-repeat":"no-repeat","background-position":"center",height:"300px"}},[t("div",{class:"px-lg-5 py-lg-2 px-4 py-3 position-absolute top-50 start-50 translate-middle",style:{background:"rgba(255, 255, 255, 0.6)","border-radius":"24px"}},[t("h1",null,"產品列表")])],-1),E={class:"container"},I={class:"row"},V={class:"col-lg-3 mb-md-0 mb-2"},L={class:"list-group"},T=t("li",{class:"list-group-item mb-2"},"產品類別",-1),B={class:"list-group-item p-0 border-0 mb-2"},M=["onClick"],R={class:"col-lg-9"},F={class:"row gx-2"},G={class:"card mb-3"},N={class:"fw-bold text-primary"},U={class:""},j=["onClick"],H=["src","alt","onClick"],O={class:"p-2"},z={class:"badge bg-primary mb-1"},q={class:"d-flex align-items-center justify-content-between"},W={class:"card-title fs-4 mb-0"},Y=["onClick"],J={key:0,class:"bi bi-heart fs-3",style:{cursor:"pointer"}},K={key:1,class:"bi bi-heart-fill fs-3"},Q={class:"fw-normal d-block text-truncate",style:{height:"48px","vertical-align":"middle"}},X={key:0,class:"d-flex align-items-center"},Z={class:"fs-4 text-danger fw-normal"},tt={class:"fs-5 text-black fw-normal"},et={key:1,class:"fs-3 text-danger fw-normal"},st={class:"d-grid gap-2 mb-2 p-2"},ot=["disabled","onClick"];function it(s,n,r,at,p,d){const v=P("PaginationCom");return o(),i(g,null,[D,t("div",E,[t("div",I,[t("div",V,[t("ul",L,[T,t("li",B,[t("a",{href:"#",class:h(["list-group-item",{active:s.category===""}]),onClick:n[0]||(n[0]=l(e=>s.setCategory(""),["prevent"]))},"全部商品",2)]),(o(!0),i(g,null,u(s.categories,(e,c)=>(o(),i("li",{class:"list-group-item p-0 border-0 mb-2",key:e+c},[t("a",{href:"#",class:h(["list-group-item list-group-item-action",{active:s.category===e}]),onClick:l(rt=>s.setCategory(e),["prevent"])},a(e),11,M)]))),128))])]),t("div",R,[t("div",F,[(o(!0),i(g,null,u(p.products,e=>(o(),i("div",{class:"col-md-4",key:e.id},[t("div",G,[t("div",N,[t("div",U,[t("a",{class:"product d-block mb-2 rounded-top",onClick:c=>d.more(e.id),style:{cursor:"pointer"}},[t("img",{src:e.imageUrl,class:"product-img card-img-top object-fit-cover mb-2",alt:`product-img-${e.id}`,height:"200",onClick:c=>d.more(e.id)},null,8,H)],8,j),t("div",O,[t("span",z,a(e.category),1),t("div",q,[t("h5",W,a(e.title),1),t("a",{class:"d-block",href:"#",onClick:l(()=>s.addToFavorite(e.id),["prevent"])},[s.favoriteList.id.indexOf(e.id)===-1?(o(),i("i",J)):(o(),i("i",K))],8,Y)]),t("span",Q,a(e.description.replace(/<[^>]*>|<\/[^>]*>/gm,"")),1),e.price!==e.origin_price?(o(),i("div",X,[t("span",Z,a(s.$filters.currency(e.price)),1),t("del",tt,a(s.$filters.currency(e.origin_price)),1)])):(o(),i("span",et,a(s.$filters.currency(e.origin_price)),1))])]),t("div",st,[t("button",{class:"btn btn-outline-primary fw-normal",disabled:s.isLoadingStatus.ItemId===e.id,onClick:l(c=>s.addToCart(e.id),["prevent"])}," 加入購物車",8,ot)])])])]))),128))]),C(v,{"page-info":p.page,onGetProducts:d.getProducts},null,8,["page-info","onGetProducts"])])])])],64)}const pt=k(S,[["render",it]]);export{pt as default};