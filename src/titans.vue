<template>
  <div class="ui container text">
    <h3>Titans 快速组队统计</h3>
    <div class="ui form">
      <div class="field">
        <label>标题</label>
        <input type="text" name="name" value="">
      </div>
      <div class="field">
        <div class="three fields">
          <div class="field">
            <label>阵营</label>
            <input type="text" name="name" value="">
          </div>
          <div class="field">
            <label>人数</label>
            <input type="text" name="name" value="">
          </div>
          <div class="field">
            <label>时间</label>
            <input type="text" name="name" value="">
          </div>
        </div>
      </div>
      <div class="field">
        <label>是否开启密码</label>
        <div class="fields">
          <div class="inline field">
            <div class="ui slider checkbox">
              <input type="checkbox" tabindex="0" class="hidden">
              <label></label>
            </div>
          </div>
          <div class="field">
            <input type="text" name="name" value="">
          </div>
        </div>
      </div>

      <div class="field">
        <label>描述</label>
        <textarea rows="2"></textarea>
      </div>
      <button type="button" class="ui button">发起</button>
    </div>
  </div>
</template>
<style lang="less">
  .slider {
    margin-top: (37 - 17)/2px!important;
  }
</style>
<script>
  export default {
    ready: function () {
      $('.ui.checkbox').checkbox()
    }
  }
</script>
