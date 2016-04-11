<template>
  <div class="ui container">
    <button class="ui green button" v-link="{path: '/create-group'}">发布组队信息</button>
    <h4 class="ui horizontal divider header"><i class="info icon"></i> 组队信息</h4>
    <div class="ui divided items">
      <div class="item">
        <div class="content">
          <div class="header">箭头谷露营</div>
          <div class="meta">
            <span class="price">1200 美元</span>
            <span class="stay">1 个月</span>
          </div>
          <div class="description">
            <img src="http://semantic-ui.com/images/wireframe/short-paragraph.png" class="ui wireframe image">
          </div>
          <div class="extra">
            <div class="ui label">IMAX</div>
            <div class="ui label">额外<i class="globe icon"></i>种语言</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="header">Buck's Homebrew Stayaway</div>
          <div class="meta">
            <span class="price">1000 美元</span>
            <span class="stay">2 周</span>
          </div>
          <div class="description">
            <p></p>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="header">Astrology Camp</div>
          <div class="meta">
            <span class="price">1600 美元</span>
            <span class="stay">6 周</span>
          </div>
          <div class="description">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
