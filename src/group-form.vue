<template>
  <div class="ui container text">
    <form class="ui form">
      <h4 class="ui dividing header">创建一个组队信息</h4>
      <div class="field">
        <label>标题</label>
        <input type="text">
      </div>
      <div class="three fields">
        <div class="field">
          <label>日期</label>
          <input type="text" placeholder="3.10">
        </div>
        <div class="field">
          <label>时间</label>
          <input type="text" placeholder="19:00">
        </div>
        <div class="field">
          <label>所需人数</label>
          <input type="text">
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>阵营</label>
          <select class="ui dropdown">
            <option value="0">联盟</option>
            <option value="1">部落</option>
          </select>
        </div>
        <div class="field">
          <label>服务器</label>
          <input type="text">
        </div>
      </div>
      <div class="three fields">
        <div class="field">
          <label>版本</label>
          <select class="ui dropdown">
            <option value="60">旧世界</option>
            <option value="70">燃烧的远征</option>
            <option value="80">巫妖王之怒</option>
            <option value="85">大地的裂变</option>
            <option value="90">熊猫人之谜</option>
            <option value="100">德拉诺之王</option>
          </select>
        </div>
        <div class="field">
          <label>类型</label>
          <select class="ui dropdown">
            <option value="0">副本</option>
            <option value="1">任务</option>
          </select>
        </div>
        <div class="field">
          <label>类型描述</label>
          <input type="text" placeholder="副本、任务、成就名称或ID">
        </div>
      </div>
      <div class="fields">
        <div class="field eight wide">
          <label>联系方式</label>
          <div class="two fields">
            <div class="field">
              <select class="ui dropdown">
                <option value="0">QQ</option>
                <option value="1">微信</option>
                <option value="2">战网ID</option>
              </select>
            </div>
            <div class="field">
              <input type="text">
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label>描述</label>
        <textarea></textarea>
      </div>
      <div class="ui button" tabindex="0">提交</div>
    </form>
  </div>
</template>
