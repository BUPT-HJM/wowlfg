<template>
  <div class="ui top fixed menu ">
    <div class="ui container">
      <div class="item">
        <img src="../assets/logo.png">
      </div>
      <a class="item" v-link="{ path: '/index' }">首页</a>
      <a class="item" v-link="{ path: '/group' }">组队</a>
      <a class="item" v-link="{ path: '/recruit-a-friend' }">招募</a>
      <a class="item" v-link="{ path: '/tips' }">经验</a>
      <a class="item" v-link="{ path: '/favor' }">收藏夹</a>
      <a class="item" v-link="{ path: '/qgroup' }">成就群</a>
      <a class="item" v-link="{ path: '/titans' }">Titans</a>
      <div class="right menu">
        <a class="item" v-link="{ path: '/account' }" v-if="!auth">登入</a>
        <a class="item" v-link="{ name: 'user', params: { uid: user.uid }}" v-else>
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
<script>
  export default {
    props: ['user', 'auth']
  }
</script>
