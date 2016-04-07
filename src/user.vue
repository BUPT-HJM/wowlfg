<template>
  <div class="user-center">
    <button class="ui button" type="submit" @click="logout">退出账号</button>
    <h3>账号信息 </h3>
    <div class="ui form">
      <div class="two fields">
        <div class="field">
          <label>用户名</label>
          <p v-show="username && !edit">{{username}}</p>
          <input type="text" v-model="username" v-show="edit">
        </div>
        <div class="field">
          <label>战网ID</label>
          <p v-show="battleID && !edit">{{battleID}}</p>
          <input type="text" v-model="battleID" v-show="edit">
        </div>
      </div>
      <div class="field">
        <label>邮箱</label>
        <p>{{email}}</p>
      </div>
      <button class="ui button" type="submit" :class="{green: edit}" @click="save">
        <span v-if="!edit">修改</span>
        <span v-else>保存</span>
      </button>
      <button class="ui button" type="submit" v-show="edit" @click="cancel">取消</button>
    </div>
  </div>
</template>
<style lang="less">
  .user-center {
    max-width: 600px;
    margin: 0 auto;
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
import router from './main'
export default {
  data: function () {
    return {
      email: '',
      battleID: '',
      username: '',
      edit: false
    }
  },
  asyncData: function (resolve, reject) {
    var uid = this.$root.uid
    ref.child('users/' + uid).on('value', function (snapshot) {
      var val = snapshot.val()
      if (val) {
        resolve(val)
      }
    })
  },
  created: function () {
    var auth = ref.getAuth()
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
    },
    save: function () {
      var self = this
      if (self.edit) {
        var uid = self.$root.uid
        ref.child('users/' + uid).set({
          username: self.username,
          battleID: self.battleID
        })
      }
      this.edit = !this.edit
    },
    cancel: function () {
      this.edit = false
    }
  }
}
</script>
