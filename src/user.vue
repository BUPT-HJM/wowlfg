<template>
  <div class="ui grid stackable container">
    <div class="four wide column">
      <div class="ui vertical menu user-menu">
        <a class="item">
          组队
        </a>
        <a class="item" v-link="{ name: 'post', params: { uid: userId }}">
          文章
        </a>
        <a class="item" @click="logout">
          退出账号
        </a>
      </div>
    </div>
    <div class="twelve wide column">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="less">
  .user-menu {
    width: 100%!important;
  }
  .user-center {
    .field {
      p {
        padding: 10px 0;
        margin: 0;
      }
    }
  }
</style>
<script>
  import ref from './ref'
  import router from './router'
  export default {
    computed: {
      userId: function () {
        return this.$root.user.uid
      }
    },
    methods: {
      logout: function () {
        this.$root.islogin = false
        this.$root.user.uid = ''
        this.$dispatch('user:logout')
        ref.unauth()
        router.replace('/')
      }
    }
  }
</script>
