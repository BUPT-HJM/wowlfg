<template>
  <div class="ui container text">
    <h3>Titans 快速组队统计</h3>
    <div class="ui form">
      <div class="field">
        <label>标题</label>
        <input type="text" v-model="form.title">
      </div>
      <div class="field">
        <div class="three fields">
          <div class="field">
            <label>阵营</label>
            <select class="ui dropdown" v-model="form.faction">
              <option value="0">联盟</option>
              <option value="1">部落</option>
            </select>
          </div>
          <div class="field">
            <label>人数</label>
            <input type="text" v-model="form.member">
          </div>
          <div class="field">
            <label>时间</label>
            <input type="text" v-model="form.date">
          </div>
        </div>
      </div>
      <div class="field">
        <label>是否开启密码</label>
        <div class="fields">
          <div class="inline field">
            <div class="ui slider checkbox">
              <input type="checkbox" tabindex="0" class="hidden">
              <label></label>
            </div>
          </div>
          <div class="field">
            <input v-show="!form.secret.disable" type="text" v-model="form.secret.password">
          </div>
        </div>
      </div>

      <div class="field">
        <label>描述</label>
        <textarea rows="2"></textarea>
      </div>
      <button type="button" class="ui button" :class="{disabled: !allow}" @click="submit">发起</button>
    </div>
  </div>
</template>
<style lang="less">
  .slider {
    margin-top: (37 - 17)/2px!important;
  }
</style>
<script>
  import ref from './ref'
  import router from './router'
  export default {
    data: function () {
      return {
        form: {
          title: '',
          faction: '0',
          member: '',
          date: '',
          secret: {
            disable: true,
            password: ''
          },
          desc: ''
        }
      }
    },
    computed: {
      allow: function () {
        var password_allow = true
        if (!this.form.secret.disable && !this.form.secret.password) {
          password_allow = false
        }
        return !!(this.form.title && this.form.member && this.form.date) && password_allow
      }
    },
    ready: function () {
      var auth = ref.getAuth()
      if (!auth) {
        router.go('/account')
        return
      }
      var self = this
      $('.ui.checkbox').checkbox({
        onChange: function () {
          self.form.secret.disable = !self.form.secret.disable
        }
      })
    },
    methods: {
      submit: function () {
        var self = this
        var data = JSON.parse(JSON.stringify(self.form))
        data.createdAt = Wilddog.ServerValue.TIMESTAMP
        data.auth = self.$root.user.uid
        var titans = ref.child('titans').push(data, function (err) {
          if (!err) {
            var key = titans.key()
            router.go('/titans/' + key)
          } else {
            console.log(err)
          }
        })
      }
    }
  }
</script>
