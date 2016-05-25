<template>
  <div class="ui text container intro">
    <img class="logo" src="./assets/logo.png">
    <h3>Hi，这是一个用于wower组队的网站应用，你可以发布组队消息或者寻找队友！</h3>
    <div id="homeFeature" class="ui center aligned basic segment">
      <div class="ui left icon action input">
        <i class="search icon"></i>
        <input type="text" placeholder="成就名称/ID">
        <div class="ui blue submit button">寻求组队</div>
      </div>
      <div class="ui horizontal divider">
        或者
      </div>
      <div class="ui teal labeled icon button">
        创建组队信息
        <i class="add icon"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.intro {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px;
}

#homeFeature {
  display: none;
}
</style>
