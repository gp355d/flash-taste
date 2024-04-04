import{_ as E,f as S,m as A,r as u,o as a,c as d,a as s,b as n,w as v,F as _,g as P,k as U,H as j,i as I,t as c,j as b,h as N,d as M,n as p}from"./index-Q2DV9-bg.js";import{C as y}from"./CartStore-pb1W7c_e.js";import{S as h}from"./sweetalert2.all-uOdz_5DA.js";var B={VITE_APP_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_APP_API_NAME:"leo535",BASE_URL:"/flash-taste/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_API_URL:x,VITE_APP_API_NAME:V}=B,F={data(){return{couponCode:"",discountStatus:!1,discount:0,form:{email:"",name:"",phone:"",address:"",msg:"",region:""}}},methods:{...S(y,["getCarts"]),sendCoupon(l){const e={code:l};this.$http.post(`${x}/api/${V}/coupon`,{data:e}).then(r=>{this.discountStatus=r.data.success,this.discount=Math.round(this.final_total-this.total),h.fire({position:"top-end",icon:"success",title:"已套用優惠券",showConfirmButton:!1,timer:1500}),this.couponCode=""}).catch(r=>(h.fire({position:"top-end",icon:"error",title:r.response.data.message,showConfirmButton:!1,timer:1500}),0))},sendOrder(){const l={user:{name:this.form.name,email:this.form.email,tel:this.form.phone,address:this.form.address},message:this.form.msg};this.axios.post(`${x}/api/${V}/order`,{data:l}).then(e=>{const r=this.$loading.show();console.log(e.data),h.fire({position:"top-end",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500}),this.$refs.form.resetForm(),this.getCarts(),r.hide(),this.$router.push(`/complete/${e.data.orderId}`)}).catch(e=>{h.fire({position:"top-end",icon:"error",title:e.response.data.message,showConfirmButton:!1,timer:1500})})}},computed:{...A(y,["carts","total","cartNum","final_total"])},mounted(){this.getCarts()}},T={class:"container"},q={class:"pt-4 pb-3 mb-3"},D=N('<div class="row justify-content-center"><div class="col-9 col-md-7 timeline"></div></div><div class="row mb-2"><div class="col-3 col-md-5"><div class="timeline-pointer text-center step-1 active"><p>購物清單確認</p></div></div><div class="col-6 col-md-2"><div class="timeline-pointer text-center step-2 active"><p>填寫訂單</p></div></div><div class="col-3 col-md-5"><div class="timeline-pointer text-center step-3"><p>購物完成</p></div></div></div>',2),O=s("span",{class:"material-icons"},"keyboard_return",-1),R={class:"order-details p-4"},L=s("h4",null,"訂單明細",-1),z={class:"order-item"},H={class:"row justify-content-center"},X={class:"col-md-9"},G={class:"row"},J={class:"col-md-6"},K={class:"p-2 h-100"},Q=s("h3",{class:"text-center text-primary mb-5"},"訂單項目",-1),W={class:"col-md-4"},Y=["src","alt"],Z={class:"col-md-8 d-flex justify-content-center flex-md-column border border-1 p-2"},$={class:""},ss={class:"fs-6"},es={class:"d-flex fs-5"},ts={class:"mb-0"},os={class:"mb-0"},ls={class:"ms-2"},ns={class:"d-flex"},is=s("span",null,"售價",-1),as={key:0,class:"d-flex justify-content-between text-success"},ds=s("small",null,"折扣價",-1),cs={class:"form-group"},rs=s("label",{for:"coupon"},"優惠碼：",-1),ms={class:"input-group mb-3"},us={key:1,class:"text-center"},_s=s("h2",null,"目前無資料",-1),ps=[_s],fs={class:"row"},hs={class:"fs-5"},vs=s("span",{class:"d-block fw-bold text-success"},"已套用優惠券",-1),bs={class:"d-flex justify-content-between"},gs=s("span",null,"原價:",-1),ys={class:"text-success"},xs={class:"d-flex justify-content-between"},Vs=s("span",null,"折扣價:",-1),ws={class:"text-success"},ks={class:"d-flex justify-content-between"},Cs=s("span",null,"總計:",-1),Es={key:0,class:"d-flex justify-content-between"},Ss=s("span",null,"總計:",-1),As={class:"text-danger"},Ps={class:"p-2"},Us=s("h3",{class:"text-center text-primary mb-5"},"訂單資訊",-1),js={class:"mb-3"},Is=s("span",{class:"text-danger me-1"},"*",-1),Ns=s("label",{for:"customer-name",class:"form-label"},"姓名",-1),Ms={class:"mb-3"},Bs=s("span",{class:"text-danger me-1"},"*",-1),Fs=s("label",{for:"customer-emall",class:"form-label"},"Email",-1),Ts={class:"mb-3"},qs=s("span",{class:"text-danger me-1"},"*",-1),Ds=s("label",{for:"customer-phone",class:"form-label"},"電話",-1),Os={class:"mb-3"},Rs=s("span",{class:"text-danger me-1"},"*",-1),Ls=s("label",{for:"customer-address",class:"form-label"},"地址",-1),zs=s("span",{class:"text-danger me-1"},"*",-1),Hs=s("label",{for:"customer-pay",class:"form-label"},"付款方式",-1),Xs=s("option",{value:"",disabled:""},"請選擇",-1),Gs=s("option",{value:"1"},"超商繳費",-1),Js=s("option",{value:"2"},"ATM轉帳",-1),Ks=s("option",{value:"3"},"信用卡",-1),Qs=s("option",{value:"4"},"銀行轉帳",-1),Ws={class:"mb-3"},Ys=s("label",{for:"customer-note",class:"form-label"},"備註",-1),Zs={class:"text-end"},$s=["disabled"];function se(l,e,r,ee,t,g){const w=u("router-link"),m=u("VField"),f=u("ErrorMessage"),k=u("error-message"),C=u("VForm");return a(),d("div",T,[s("div",q,[D,n(w,{to:"/cart",class:"d-inline-flex align-items-center text-decoration-none"},{default:v(()=>[O,M(" 購物車清單 ")]),_:1})]),s("div",R,[L,s("div",z,[s("div",H,[s("div",X,[s("div",G,[s("div",J,[s("div",K,[Q,l.cartNum>0?(a(),d(_,{key:0},[(a(!0),d(_,null,P(l.carts.carts,o=>(a(),d("div",{class:"row g-0 mb-3",key:o.id},[s("div",W,[s("img",{class:"img-fluid object-fit-cover h-100",src:o.product.imageUrl,alt:`Order-Img-${o.id}`},null,8,Y)]),s("div",Z,[s("div",$,[s("div",ss,[s("div",es,[s("p",ts,c(o.product.title),1),s("p",os,"X"+c(o.qty),1),s("span",ls,c(o.unit),1)]),s("div",ns,[is,s("span",null,c(l.$filters.currency(o.product.price)),1)]),t.discountStatus?(a(),d(_,{key:0},[o.final_total!==o.total?(a(),d("div",as,[ds,s("small",null,c(l.$filters.currency(o.final_total)),1)])):b("",!0)],64)):b("",!0)])])])]))),128)),s("div",cs,[rs,s("div",ms,[U(s("input",{type:"text",class:"form-control",id:"coupon","aria-label":"Example text with button addon","aria-describedby":"button-addon1","onUpdate:modelValue":e[0]||(e[0]=o=>t.couponCode=o)},null,512),[[j,t.couponCode]]),s("button",{class:"btn btn-outline-primary",type:"button",id:"button-addon1",onClick:e[1]||(e[1]=I(()=>g.sendCoupon(t.couponCode),["prevent"]))},"套用優惠碼")])])],64)):(a(),d("div",us,ps)),s("div",fs,[s("div",hs,[t.discountStatus?(a(),d(_,{key:0},[vs,s("div",bs,[gs,s("span",ys,c(l.$filters.currency(l.total)),1)]),s("div",xs,[Vs,s("span",ws,c(t.discount),1)]),s("div",ks,[Cs,s("span",null,c(l.$filters.currency(l.final_total)),1)])],64)):(a(),d(_,{key:1},[l.cartNum>0?(a(),d("div",Es,[Ss,s("span",As,c(l.$filters.currency(l.total)),1)])):b("",!0)],64))])])])]),n(C,{class:"col-md-6",ref:"form",onSubmit:g.sendOrder},{default:v(({errors:o})=>[s("div",Ps,[Us,s("div",js,[Is,Ns,n(m,{id:"customer-name",name:"姓名",type:"text",class:p(["form-control",{"is-invalid":o.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:t.form.name,"onUpdate:modelValue":e[2]||(e[2]=i=>t.form.name=i)},null,8,["class","modelValue"]),n(f,{name:"姓名",class:"invalid-feedback"})]),s("div",Ms,[Bs,Fs,n(m,{name:"email",type:"email",class:p(["form-control",{"is-invalid":o.email}]),id:"customer-emall",placeholder:"請輸入 Email",rules:"email|required",modelValue:t.form.email,"onUpdate:modelValue":e[3]||(e[3]=i=>t.form.email=i)},null,8,["class","modelValue"]),n(f,{name:"email",class:"invalid-feedback"})]),s("div",Ts,[qs,Ds,n(m,{name:"電話",type:"tel",class:p(["form-control",{"is-invalid":o.電話}]),id:"customer-phone",placeholder:"0912345678",rules:"required|min:8|max:10",modelValue:t.form.phone,"onUpdate:modelValue":e[4]||(e[4]=i=>t.form.phone=i)},null,8,["class","modelValue"]),n(f,{name:"電話",class:"invalid-feedback"})]),s("div",Os,[Rs,Ls,n(m,{name:"地址",type:"text",class:p(["form-control",{"is-invalid":o.地址}]),id:"customer-address",placeholder:"請輸入地址",rules:"required",modelValue:t.form.address,"onUpdate:modelValue":e[5]||(e[5]=i=>t.form.address=i)},null,8,["class","modelValue"]),n(f,{name:"地址",class:"invalid-feedback"})]),zs,Hs,n(m,{name:"付款方式",class:p(["form-select mb-3",{"is-invalid":o.付款方式}]),id:"customer-pay","aria-label":"Default select example",rules:"required",modelValue:t.form.region,"onUpdate:modelValue":e[6]||(e[6]=i=>t.form.region=i),as:"select"},{default:v(()=>[Xs,Gs,Js,Ks,Qs]),_:2},1032,["class","modelValue"]),n(k,{name:"付款方式",class:"invalid-feedback"}),s("div",Ws,[Ys,n(m,{name:"留言",class:"form-control",id:"customer-note",rows:"3",modelValue:t.form.msg,"onUpdate:modelValue":e[7]||(e[7]=i=>t.form.msg=i),as:"textarea"},null,8,["modelValue"])]),s("div",Zs,[s("button",{type:"submit",class:"btn btn-danger",disabled:t.form.email===""||t.form.name===""||t.form.phone===""||t.form.address===""||l.final_total===0},"送出訂單",8,$s)])])]),_:1},8,["onSubmit"])])])])])])])}const ne=E(F,[["render",se]]);export{ne as default};
