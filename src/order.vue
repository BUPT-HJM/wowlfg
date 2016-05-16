<template>
  <div class="order-container">
    <div class="ui container">
      <div class="ui button">
        订单管理
      </div>
      <h3 class="ui top attached header">
        订单查询
        <div class="sub header">输入角色名或订单号码进行查询</div>
      </h3>
      <div class="ui attached segment">
        <div class="ui fluid action input">
          <input type="text">
          <div class="ui button">查询</div>
        </div>
      </div>
      <h5 class="ui bottom attached header">
        淘宝地址：<a href="" target="_blank"></a>
      </h5>
    </div>
  </div>
</template>
<style lang="less">
  .order-container {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
    .segment {
      min-height: 300px;
    }
  }
</style>
<script>
  // import ref from './ref'
  export default {
    created: function () {
      console.log(1)
    }
  }
</script>
