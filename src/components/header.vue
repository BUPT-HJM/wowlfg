<template>
  <div class="ui top fixed menu ">
    <div class="ui container">
      <div class="item">
        <img src="../assets/logo.png">
      </div>
      <a class="item" v-link="{ path: '/index' }">首页</a>
      <a class="item">News</a>
      <a class="item" v-link="{ path: '/group' }">组队</a>
      <a class="item" v-link="{ path: '/recruit-a-friend' }">招募</a>
      <a class="item" v-link="{ path: '/tips' }">Tips</a>
      <div class="right menu">
        <a class="item" v-link="{ path: '/account' }" v-if="!auth">登入</a>
        <a class="item" v-link="{ name: 'user', params: { uid: uid }}" v-else>{{uid}}</a>
        <a class="item">帮助</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['uid', 'auth']
  }
</script>
