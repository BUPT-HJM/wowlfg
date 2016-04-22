<template>
  <div class="ui container">
    <div class="ui cards">
      <div class="card">
        <div class="content">
          <div class="header">泰坦组队</div>
          <div class="meta">泰坦的使者</div>
          <div class="description">
            快速发布组队统计
          </div>
        </div>
        <div class="extra content">
          <a class="ui button" v-link="{path : '/titans-group'}">发布</a>
        </div>
      </div>
      <div class="card">
        <div class="content">
          <div class="header">泰坦助手</div>
          <div class="meta">泰坦的使者</div>
          <div class="description">
            专业技能互助信息
          </div>
        </div>
        <div class="extra content">
          <a class="ui button" v-link="{path : '/titans-helper'}">查看</a>
        </div>
      </div>
    </div>
  </div>
</template>
