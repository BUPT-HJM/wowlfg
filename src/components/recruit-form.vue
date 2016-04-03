<template>
  <div class="ui modal">
    <div class="header">发布招募信息</div>
    <div class="content">
      <div class="ui form">
        <div class="field">
          <div class="three fields">
            <div class="field">
              <label>阵营</label>
              <input type="text" name="shipping[first-name]" placeholder="First Name">
            </div>
            <div class="field">
              <label>服务器</label>
              <input type="text" name="shipping[last-name]" placeholder="Last Name">
            </div>
            <div class="field">
              <label>招募形式</label>
              <input type="text" name="shipping[last-name]" placeholder="Last Name">
            </div>
          </div>
        </div>
        <div class="field">
          <label>联系方式</label>
          <div class="fields">
            <div class="field">
              <select class="ui dropdown">
                <option value="option">QQ</option>
                <option value="option">微信</option>
                <option value="option">战网ID</option>
              </select>
            </div>
            <div class="field">
              <input type="text" name="shipping[last-name]">
            </div>
          </div>
        </div>
        <div class="field">
          <label>描述</label>
          <textarea rows="2"></textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">取消 </div>
      <div class="ui positive right labeled icon button">提交 <i class="checkmark icon"></i> </div>
    </div>
  </div>
</template>
