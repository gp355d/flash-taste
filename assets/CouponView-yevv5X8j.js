import{M as y}from"./modal-iN8-bLta.js";import{_ as P,r,o as c,c as p,a as e,b as i,w as k,n as g,k as w,H as x,J as D,t as b,F as M,g as V}from"./index-zLiU2U1g.js";import{D as I}from"./DeleteProductModal-SmAqsT0N.js";import{P as $}from"./PaginationCom-5inicFhf.js";import{S as v}from"./sweetalert2.all-MZ4wuwUD.js";const A={props:["tempCoupon","isNew"],data(){return{couponModal:"",tempCoupons:{},due_date:""}},methods:{open(){this.couponModal.show()},close(){this.couponModal.hide(),this.$emit("getProducts")},changestatus(o){this.$emit("updateCoupon",o)}},watch:{tempCoupon(){this.tempCoupons=this.tempCoupon;const o=new Date(this.tempCoupons.due_date*1e3).toISOString().split("T");[this.due_date]=o},due_date(){this.tempCoupons.due_date=Math.floor(new Date(this.due_date)/1e3);const o=new Date,n=new Date(o.getFullYear(),o.getMonth(),o.getDate()).toISOString().split("T")[0],u=document.getElementById("due_date");u.min=n}},mounted(){this.couponModal=new y(this.$refs.couponModal,{keyboard:!1,backdrop:"static"})}},N={class:"modal fade",ref:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},E={class:"modal-dialog",role:"document"},S={class:"modal-content"},U={class:"modal-header"},L={class:"modal-title",id:"exampleModalLabel"},T={key:0},B={key:1},G=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),O={class:"modal-body"},R={class:"mb-3"},q=e("label",{for:"title"},"標題",-1),F={class:"mb-3"},z=e("label",{for:"coupon_code"},"優惠碼",-1),H={class:"mb-3"},J=e("label",{for:"due_date"},"到期日",-1),Y={class:"mb-3"},j=e("label",{for:"price"},"折扣百分比",-1),K={class:"mb-3"},Q=e("span",null,"啟用狀態",-1),W={class:"form-check form-switch"},X={class:"form-check-label",for:"is_enabled"},Z={key:0},ee={key:1},oe={class:"modal-footer"};function te(o,t,n,u,s,l){const m=r("v-field"),_=r("error-message"),C=r("v-form");return c(),p("div",N,[e("div",E,[e("div",S,[e("div",U,[e("h5",L,[n.isNew?(c(),p("span",T,"新增優惠券")):(c(),p("span",B,"編輯優惠券"))]),G]),e("div",O,[i(C,{ref:"form"},{default:k(({errors:a})=>[e("div",R,[q,i(m,{type:"text",name:"標題",class:g(["form-control",{"is-invalid":a.標題}]),id:"title",modelValue:s.tempCoupons.title,"onUpdate:modelValue":t[0]||(t[0]=d=>s.tempCoupons.title=d),placeholder:"請輸入標題",rules:"required"},null,8,["modelValue","class"]),i(_,{name:"標題",class:"invalid-feedback"})]),e("div",F,[z,i(m,{type:"text",name:"優惠碼",class:g(["form-control",{"is-invalid":a.優惠碼}]),id:"coupon_code",modelValue:s.tempCoupons.code,"onUpdate:modelValue":t[1]||(t[1]=d=>s.tempCoupons.code=d),placeholder:"請輸入優惠碼",rules:"required"},null,8,["modelValue","class"]),i(_,{name:"優惠碼",class:"invalid-feedback"})]),e("div",H,[J,w(e("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[2]||(t[2]=d=>s.due_date=d),min:""},null,512),[[x,s.due_date]])]),e("div",Y,[j,i(m,{type:"number",name:"折扣百分比",min:"0",max:"100",class:g(["form-control",{"is-invalid":a.折扣百分比}]),id:"price",modelValue:s.tempCoupons.percent,"onUpdate:modelValue":t[3]||(t[3]=d=>s.tempCoupons.percent=d),modelModifiers:{number:!0},placeholder:"請輸入折扣百分比",rules:"required"},null,8,["modelValue","class"]),i(_,{name:"折扣百分比",class:"invalid-feedback"})]),e("div",K,[Q,e("div",W,[w(e("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":t[4]||(t[4]=d=>s.tempCoupons.is_enabled=d),id:"is_enabled"},null,512),[[D,s.tempCoupons.is_enabled]]),e("label",X,[s.tempCoupons.is_enabled?(c(),p("span",Z,"已啟用")):(c(),p("span",ee,"未啟用"))])])])]),_:1},512)]),e("div",oe,[e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal",onClick:t[5]||(t[5]=(...a)=>l.close&&l.close(...a))},"Close"),e("button",{type:"button",class:"btn btn-primary",onClick:t[6]||(t[6]=()=>l.changestatus(s.tempCoupons))},b(n.isNew?"新增優惠卷":"更新優惠券"),1)])])])],512)}const se=P(A,[["render",te]]);var ne={VITE_APP_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_APP_API_NAME:"leo535",BASE_URL:"/flash-taste/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_API_URL:h,VITE_APP_API_NAME:f}=ne,le={data(){return{couponList:[],page:{},tempCoupon:{title:"",is_enabled:0,percent:100,code:""},isNew:!1}},methods:{getCoupon(o=1){const t=this.$loading.show();this.axios.get(`${h}/api/${f}/admin/coupons/?page=${o}`).then(n=>{this.couponList=n.data.coupons,this.page=n.data.pagination,t.hide()}).catch(n=>{console.log(n)})},openModal(o,t){o==="new"?(this.tempCoupon={due_date:new Date().getTime()/1e3,is_enabled:1},this.isNew=!0):o==="edit"&&(this.tempCoupon={...t},this.isNew=!1),this.$refs.couponModal.open()},updateCoupon(o){if(o.percent>100||o.percent<=0)return v.fire({position:"top-end",icon:"error",title:"折扣百分比不能為負值或100以上",showConfirmButton:!1,timer:1500}),0;let t="post",n=o,u=`${h}/api/${f}/admin/coupon`;this.isNew||(u=`${h}/api/${f}/admin/coupon/${this.tempCoupon.id}`,t="put",n=this.tempCoupon),this.axios[t](u,{data:n}).then(s=>{v.fire({position:"top-end",icon:"success",title:s.data.message,showConfirmButton:!1,timer:1500}),this.$refs.couponModal.close(),this.getCoupon()}).catch(s=>{alert(s.response.data.message)})},deleteCouponModal(o){this.tempCoupon={...o},this.$refs.deleteProductmodal.open()},deleteCoupon(){this.axios.delete(`${h}/api/${f}/admin/coupon/${this.tempCoupon.id}`).then(o=>{v.fire({position:"top-end",icon:"success",title:o.data.message,showConfirmButton:!1,timer:1500}),this.getCoupon(),this.$refs.deleteProductmodal.close()}).catch(o=>{console.log(o.response.data.message)})}},components:{CouponModalCom:se,DeleteProductModal:I,PaginationCom:$},mounted(){this.getCoupon()}},ae=e("h2",null,"優惠券管理",-1),de={class:"py-0"},ie={class:"text-end mt-4"},ce={class:"table-responsive"},pe={class:"table mt-4 mb-3"},ue=e("thead",null,[e("tr",null,[e("th",null,"名稱"),e("th",{class:"text-nowrap"},"折扣百分比"),e("th",null,"到期日"),e("th",{class:"text-nowrap"},"啟用狀態"),e("th",null,"操作行為")])],-1),re={class:"text-nowrap"},me={key:0,class:"text-success"},_e={key:1,class:"text-muted"},he={class:"text-nowrap"},fe={class:"btn-group"},be=["onClick"],Ce=["onClick"];function ge(o,t,n,u,s,l){const m=r("CouponModalCom"),_=r("DeleteProductModal"),C=r("PaginationCom");return c(),p(M,null,[ae,e("div",de,[e("div",ie,[e("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=()=>l.openModal("new"))}," 建立新的優惠券 ")]),e("div",ce,[e("table",pe,[ue,e("tbody",null,[(c(!0),p(M,null,V(s.couponList,(a,d)=>(c(),p("tr",{key:d},[e("td",re,b(a.title),1),e("td",null,b(a.percent)+"%",1),e("td",null,b(o.$filters.date(a.due_date)),1),e("td",null,[a.is_enabled===1?(c(),p("span",me,"啟用")):(c(),p("span",_e,"未啟用"))]),e("td",he,[e("div",fe,[e("button",{class:"btn btn-outline-primary btn-sm",onClick:()=>l.openModal("edit",a)},"編輯",8,be),e("button",{class:"btn btn-outline-danger btn-sm",onClick:()=>l.deleteCouponModal(a)},"刪除",8,Ce)])])]))),128))])])]),i(m,{ref:"couponModal",onGetProducts:l.getCoupon,"temp-coupon":s.tempCoupon,"is-new":s.isNew,onUpdateCoupon:l.updateCoupon},null,8,["onGetProducts","temp-coupon","is-new","onUpdateCoupon"]),i(_,{ref:"deleteProductmodal",onGetProducts:l.getCoupon,"temp-product":s.tempCoupon,onDeleteData:l.deleteCoupon,id:3},null,8,["onGetProducts","temp-product","onDeleteData"]),i(C,{"page-info":s.page,onGetProducts:l.getCoupon},null,8,["page-info","onGetProducts"])])],64)}const ke=P(le,[["render",ge]]);export{ke as default};
