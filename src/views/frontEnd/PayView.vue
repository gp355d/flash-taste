<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center p-3">
      <div class="col-md-8">
        <div class="p-3 border border-1 bg-white shadow-sm text-center">
            <h3 class="text-center text-primary fw-bold mb-2">付款完成</h3>
              <span class="material-symbols-outlined" style="font-size: 80px;">mark_email_read</span>
              <p class="fs-4 mb-0">感謝您的購物!</p>
              <p class="fs-5">付款已完成，經確認無誤後，我們將盡快為您出貨。</p>
            <div>
              <router-link to="/products" class="btn btn-primary">繼續購物</router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
