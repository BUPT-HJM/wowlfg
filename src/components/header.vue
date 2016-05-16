<template>
  <div id="mobile-sidebar" class="ui vertical sidebar menu left">
    <a class="item" v-link="{ path: '/index' }">首页</a>
    <a class="item" v-link="{ path: '/group' }">组队</a>
    <a class="item" v-link="{ path: '/recruit-a-friend' }">招募</a>
    <a class="item" v-link="{ path: '/tips' }">经验</a>
    <a class="item" v-link="{ path: '/favor' }">收藏夹</a>
    <a class="item" v-link="{ path: '/qqGroup' }">群组</a>
    <a class="item" v-link="{ path: '/titans' }">Titans</a>
  </div>
  <div id="mobile-menu" class="ui top fixed menu">
    <div class="ui container">
      <a class="launch icon item" @click="sidebar">
        <i class="content icon"></i>
      </a>

      <div class="right menu">
        <a class="item" v-link="{ path: '/account' }" v-if="!auth">登入</a>
        <a class="item user-info" v-link="{ name: 'user', params: { uid: user.uid }, exact: true}" v-else>
          <span v-if="!user.screenname">{{user.uid}}</span>
          <span v-else>{{user.screenname}}</span>
          <div class="ui teal label" v-if="user.admin">
            管理员
          </div>
        </a>
      </div>
    </div>
  </div>
  <div id="pc-menu" class="ui top menu ">
    <div class="ui container">
      <div class="item">
        <img src="../assets/logo.png">
      </div>
      <a class="item" v-link="{ path: '/index' }">首页</a>
      <a class="item" v-link="{ path: '/group' }">组队</a>
      <a class="item" v-link="{ path: '/recruit-a-friend' }">招募</a>
      <a class="item" v-link="{ path: '/tips' }">经验</a>
      <a class="item" v-link="{ path: '/favor' }">收藏夹</a>
      <a class="item" v-link="{ path: '/qqGroup' }">群组</a>
      <a class="item" v-link="{ path: '/titans' }">Titans</a>
      <div class="right menu">
        <a class="item" v-link="{ path: '/account' }" v-if="!auth">登入</a>
        <a class="item" v-link="{ name: 'user', params: { uid: user.uid }, exact: true}" v-else>
          <span v-if="!user.screenname">{{user.uid}}</span>
          <span v-else>{{user.screenname}}</span>
          <div class="ui teal label" v-if="user.admin">
            管理员
          </div>
        </a>
        <a class="item" v-link="{path: '/help'}">帮助</a>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  #pc-menu {
    margin-top: 0;
  }
  .pusher {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  @media (min-width: 992px) {
    #mobile-menu,#mobile-sidebar {
      display: none;
    }
  }
  @media (max-width: 991px) {
    #pc-menu {
      display: none;
    }
    .pusher {
      padding-top: 70px;
    }
  }
</style>
<script>
  export default {
    props: ['user', 'auth'],
    methods: {
      sidebar: function () {
        $('#mobile-sidebar').sidebar('toggle')
      }
    }
  }
</script>
