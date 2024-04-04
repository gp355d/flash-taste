import{M as k}from"./modal-bsFiqiHZ.js";import{_ as y,o,c as d,a as t,t as s,j as w,k as M,J as v,F as g,g as O,i as C,r as _,b as m}from"./index-Zq8gSJsz.js";import{D}from"./DeleteProductModal-J3uCq7No.js";import{P as V}from"./PaginationCom-Y6PWvyB_.js";import{S as h}from"./sweetalert2.all-lOhIckfE.js";const E={props:["temp-order"],data(){return{orderModal:""}},methods:{open(){this.orderModal.show()},close(){this.orderModal.hide(),this.$emit("getProducts")},changestatus(e){this.$emit("changeStatus",e)}},mounted(){this.orderModal=new k(this.$refs.orderModal,{keyboard:!1,backdrop:"static"})}},A={ref:"orderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"},x={class:"modal-dialog modal-xl",role:"document"},B={class:"modal-content border-0"},L=t("div",{class:"modal-header bg-dark text-white"},[t("h5",{class:"modal-title",id:"exampleModalLabel"},[t("span",null,"訂單細節")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),S={class:"modal-body"},I={class:"row"},N={class:"col-md-4"},G=t("h3",null,"用戶資料",-1),R={class:"table"},T={key:0},U=t("th",{style:{width:"100px"}},"姓名",-1),q=t("th",null,"Email",-1),F=t("th",null,"電話",-1),j=t("th",null,"地址",-1),J={class:"col-md-8"},z=t("h3",null,"訂單細節",-1),H={class:"table"},K=t("th",{style:{width:"100px"}},"訂單編號",-1),Q=t("th",null,"下單時間",-1),W=t("th",null,"付款時間",-1),X={key:0},Y={key:1},Z=t("th",null,"付款狀態",-1),tt={class:"form-check form-switch"},et={class:"form-check-label",for:"flexCheckDefault"},st={key:0,class:"text-success"},ot={key:1,class:"text-muted"},dt=t("th",null,"總金額",-1),rt=t("h3",null,"選購商品",-1),lt={class:"table"},at=t("thead",null,[t("tr")],-1),nt={class:"text-end"},it={class:"modal-footer"};function ct(e,l,r,$,u,a){return o(),d("div",A,[t("div",x,[t("div",B,[L,t("div",S,[t("div",I,[t("div",N,[G,t("table",R,[e.tempOrder.user?(o(),d("tbody",T,[t("tr",null,[U,t("td",null,s(e.tempOrder.user.name),1)]),t("tr",null,[q,t("td",null,s(e.tempOrder.user.email),1)]),t("tr",null,[F,t("td",null,s(e.tempOrder.user.tel),1)]),t("tr",null,[j,t("td",null,s(e.tempOrder.user.address),1)])])):w("",!0)])]),t("div",J,[z,t("table",H,[t("tbody",null,[t("tr",null,[K,t("td",null,s(e.tempOrder.id),1)]),t("tr",null,[Q,t("td",null,s(e.$filters.date(e.tempOrder.create_at)),1)]),t("tr",null,[W,t("td",null,[e.tempOrder.paid_date?(o(),d("span",X,s(e.$filters.date(e.tempOrder.paid_date)),1)):(o(),d("span",Y))])]),t("tr",null,[Z,t("td",null,[t("div",tt,[M(t("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":l[0]||(l[0]=n=>e.tempOrder.is_paid=n)},null,512),[[v,e.tempOrder.is_paid]]),t("label",et,[e.tempOrder.is_paid?(o(),d("span",st,"已付款")):(o(),d("span",ot,"未付款"))])])])]),t("tr",null,[dt,t("td",null,s(e.$filters.currency(e.tempOrder.total)),1)])])]),rt,t("table",lt,[at,t("tbody",null,[(o(!0),d(g,null,O(e.tempOrder.products,n=>{var p;return o(),d("tr",{key:n.id},[t("th",null,s((p=n.product)==null?void 0:p.title),1),t("td",null,s(n.qty)+" / "+s(n.product.unit),1),t("td",nt,s(n.final_Total),1)])}),128))])])])])]),t("div",it,[t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal",onClick:l[1]||(l[1]=(...n)=>a.close&&a.close(...n))}," 取消 "),t("button",{type:"button",class:"btn btn-primary",onClick:l[2]||(l[2]=C(()=>a.changestatus(e.tempOrder),["prevent"]))}," 修改付款狀態 ")])])])],512)}const ut=y(E,[["render",ct]]);var ht={VITE_APP_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_APP_API_NAME:"leo535",BASE_URL:"/flash-taste/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_API_URL:f,VITE_APP_API_NAME:b}=ht,pt={data(){return{orderList:[],isNew:!1,tempOrder:{},page:{}}},methods:{getOrders(e=1){const l=this.$loading.show();this.axios.get(`${f}/api/${b}/admin/orders/?page=${e}`).then(r=>{this.orderList=r.data.orders,this.page=r.data.pagination,l.hide()}).catch(r=>{h.fire({position:"top-end",icon:"error",title:r.response.data.message,showConfirmButton:!1,timer:1500})})},openModal(e){this.tempOrder={...e},this.isNew=!1,this.$refs.customerorderModal.open()},delProductModal(e){this.tempOrder={...e},this.$refs.deleteProductmodal.open()},deleteOrder(){this.axios.delete(`${f}/api/${b}/admin/order/${this.tempOrder.id}`).then(e=>{h.fire({position:"top-end",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500}),this.getOrders()}).catch(e=>{h.fire({position:"top-end",icon:"error",title:e.response.data.message,showConfirmButton:!1,timer:1500})}),this.$refs.deleteProductmodal.close()},updatePaid(e){if(e.is_paid){const r=Math.floor(new Date/1e3);e.paid_date=r}else e.paid_date="";const l={is_paid:e.is_paid,paid_date:e.paid_date};this.axios.put(`${f}/api/${b}/admin/order/${e.id}`,{data:l}).then(r=>{this.getOrders(),h.fire({position:"top-end",icon:"success",title:r.data.message,showConfirmButton:!1,timer:1500}),this.$refs.customerorderModal.close()}).catch(r=>{h.fire({position:"top-end",icon:"error",title:r.response.data.message,showConfirmButton:!1,timer:1500})})}},components:{OrderModalView:ut,DeleteModalView:D,PaginationCom:V},mounted(){this.getOrders()}},_t={class:"row"},mt=t("h2",null,"訂單管理",-1),ft={class:"table-responsive"},bt={class:"table mt-4 mb-3"},gt=t("thead",null,[t("tr",null,[t("th",{class:"text-nowrap"}," 購買時間 "),t("th",{class:"text-nowrap"}," Email "),t("th",{class:"text-nowrap"}," 購買款項 "),t("th",{class:"text-nowrap"}," 應付金額 "),t("th",{class:"text-nowrap"}," 付款狀態 "),t("th",{class:"text-nowrap"}," 操作行為 ")])],-1),Ot={key:0},yt={class:"list-unstyled"},wt={class:"text-end"},$t={key:0,class:"text-success"},Pt={key:1},kt={class:"text-nowrap"},Mt={class:"btn-group"},vt=["onClick"],Ct=["onClick"];function Dt(e,l,r,$,u,a){const n=_("OrderModalView"),p=_("DeleteModalView"),P=_("PaginationCom");return o(),d("div",_t,[mt,t("div",ft,[t("table",bt,[gt,t("tbody",null,[(o(!0),d(g,null,O(u.orderList,i=>(o(),d("tr",{key:i.id},[t("td",null,s(e.$filters.date(i.create_at)),1),t("td",null,[i.user?(o(),d("span",Ot,s(i.user.email),1)):w("",!0)]),t("td",null,[t("ul",yt,[(o(!0),d(g,null,O(i.products,c=>(o(),d("li",{key:c.id},s(c.product.title)+" 數量 :"+s(c.qty)+" :"+s(c.product.unit),1))),128))])]),t("td",wt,s(e.$filters.currency(i.total)),1),t("td",null,[i.is_paid?(o(),d("span",$t,"已付款")):(o(),d("span",Pt,"未付款"))]),t("td",kt,[t("div",Mt,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:c=>a.openModal(i)}," 編輯 ",8,vt),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:c=>a.delProductModal(i)}," 刪除 ",8,Ct)])])]))),128))])])]),m(n,{ref:"customerorderModal",onGetProducts:a.getOrders,"temp-order":u.tempOrder,onChangeStatus:a.updatePaid},null,8,["onGetProducts","temp-order","onChangeStatus"]),m(p,{ref:"deleteProductmodal",onGetProducts:a.getOrders,"temp-product":u.tempOrder,onDeleteData:a.deleteOrder,id:2},null,8,["onGetProducts","temp-product","onDeleteData"]),m(P,{"page-info":u.page,onGetProducts:a.getOrders},null,8,["page-info","onGetProducts"])])}const Lt=y(pt,[["render",Dt]]);export{Lt as default};
