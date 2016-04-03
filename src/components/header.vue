<template>
  <div class="ui top fixed menu ">
    <div class="ui container">
      <div class="item">
        <img src="../assets/logo.png">
      </div>
      <a class="item">News</a>
      <a class="item">组队</a>
      <a class="item" v-link="{ path: '/recruit-a-friend' }">招募</a>
      <a class="item">Tips</a>
      <div class="right menu">
        <a class="item" v-link="{ path: '/account' }">登入</a>
        <a class="item">帮助</a>
      </div>
    </div>
  </div>
</template>
