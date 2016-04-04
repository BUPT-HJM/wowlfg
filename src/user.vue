<template>
  <div class="user-center">
    <button class="ui button" type="submit" @click="logout">退出账号</button>
    <h3>账号信息</h3>
    <div class="ui form">
      <div class="two fields">
        <div class="field">
          <label>用户名</label>
          <input type="text" name="name" value="">
        </div>
        <div class="field">
          <label>战网ID</label>
          <input type="text" name="name" value="">
        </div>
      </div>
      <div class="field">
        <label>邮箱</label>
        <input placeholder="Read Only" value="{{email}}" readonly="" type="text">
      </div>
    </div>
  </div>
</template>
<style>
  .user-center {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
<script>
import ref from './ref'
import router from './main'
export default {
  data: function () {
    return {
      email: ''
    }
  },
  created: function () {
    var auth = ref().getAuth()
    var token = $.cookie('access_token')
    if (!token || token !== auth.token) {
      router().replace('/')
    }
    if (auth) {
      this.email = auth.password.email
    }
  },
  methods: {
    logout: function () {
      this.$root.$data.islogin = false
      this.$root.$data.uid = ''
      $.removeCookie('access_token', {path: '/'})
      $.removeCookie('uid', {path: '/'})
      router().replace('/')
    }
  }
}
</script>
