<template>
  <h3 class="ui header">账号信息 </h3>
  <div class="ui form">
    <div class="two fields">
      <div class="field">
        <label>用户名</label>
        <p v-show="info.username && !edit">{{info.username}}</p>
        <input type="text" v-model="info.username" v-show="edit">
      </div>
      <div class="field">
        <label>战网ID</label>
        <p v-show="info.battleID && !edit">{{info.battleID}}</p>
        <input type="text" v-model="info.battleID" v-show="edit">
      </div>
    </div>
    <button class="ui button" type="submit" :class="{green: edit}" @click="save">
      <span v-if="!edit">修改</span>
      <span v-else>保存</span>
    </button>
    <button class="ui button" type="submit" v-show="edit" @click="cancel">取消</button>
  </div>
  <div class="ui divider"></div>
  <h3 class="ui header">积分奖励</h3>
  <div class="ui statistic">
    <div class="value">
      5
    </div>
    <div class="label">
      积分
    </div>
  </div>
  <div class="">
    <button type="button" class="ui button basic" name="button"><i class="trophy icon"></i> 积分兑换</button>
  </div>
</template>
<script>
import ref from './ref'
import router from './router'
export default {
  data: function () {
    return {
      info: {
        battleID: '',
        username: ''
      },
      edit: false,
      admin: false,
      permission: 0
    }
  },
  asyncData: function (resolve, reject) {
    var uid = this.$root.user.uid
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
    if (!token || !auth || token !== auth.token) {
      router.replace('/')
    }
  },
  methods: {
    save: function () {
      var self = this
      if (self.edit) {
        var uid = self.$root.user.uid
        ref.child('users/' + uid + '/info').set({
          username: self.info.username,
          battleID: self.info.battleID
        }, function (err) {
          if (!err) {
            var username = self.info.username
            self.$root.screenname = username
          }
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
