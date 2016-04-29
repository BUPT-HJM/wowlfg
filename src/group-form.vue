<template>
  <div class="ui container text">
    <form class="ui form">
      <h4 class="ui dividing header">创建一个组队信息</h4>
      <div class="field">
        <label>标题 *</label>
        <input type="text" v-model="title">
      </div>
      <div class="three fields">
        <div class="field">
          <label>日期 *</label>
          <input type="text" v-model="date" placeholder="01.01">
        </div>
        <div class="field">
          <label>时间 *</label>
          <input type="text" v-model="time" placeholder="19:00">
        </div>
        <div class="field">
          <label>所需人数</label>
          <input type="text" v-model="member">
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>阵营</label>
          <select class="ui dropdown" v-model="faction">
            <option value="0">联盟</option>
            <option value="1">部落</option>
          </select>
        </div>
        <div class="field">
          <label>服务器 *</label>
          <input type="text" v-model="server">
        </div>
      </div>
      <div class="three fields">
        <div class="field">
          <label>版本</label>
          <select class="ui dropdown" v-model="version">
            <option v-for="item in versionList" value="{{item.type}}">{{item.val}}</option>
          </select>
        </div>
        <div class="field">
          <label>类型</label>
          <select class="ui dropdown" v-model="type">
            <option v-for="item in activity" value="{{$index}}">{{item}}</option>
          </select>
        </div>
        <div class="field">
          <label>类型描述</label>
          <input type="text" v-model="typeDesc" placeholder="副本、任务、成就名称或ID">
        </div>
      </div>
      <div class="fields">
        <div class="field eight wide">
          <label>联系方式 *</label>
          <div class="two fields">
            <div class="field">
              <select class="ui dropdown" v-model="contact.type">
                <option value="qq">QQ</option>
                <option value="wechat">微信</option>
                <option value="battle">战网ID</option>
              </select>
            </div>
            <div class="field">
              <input type="text" v-model="contact.content">
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label>描述</label>
        <textarea v-model="desc"></textarea>
      </div>
      <div class="ui button" :class="{disabled: !allow, loading: loading}" @click="submit" tabindex="0">提交</div>
    </form>
  </div>
  <div class="info alert">
    <div class="ui message success">
      <div class="header">提交成功 </div>
    </div>
  </div>
</template>
<style lang="less">
  .alert {
    position: fixed;
    width: 180px;
    right: 12px;
    bottom: 12px;
    display: none;
  }
</style>
<script>
  import auth from './helper/auth'
  import router from './router'
  import ref from './ref'
  import {activity, version} from './data'
  var origin = {
    title: '',
    date: '',
    time: '',
    member: '',
    faction: 0,
    server: '',
    version: 60,
    type: 0,
    typeDesc: '',
    contact: {
      type: 'qq',
      content: ''
    },
    desc: ''
  }
  var jsonClone = function (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  export default {
    data: function () {
      return jsonClone(origin)
    },
    created: function () {
      auth.fail(function () {
        router.go('/account')
      })
    },
    computed: {
      allow: function () {
        return !!(this.title && this.date && this.time && this.server && this.contact.content) && !this.loading
      },
      activity: function () {
        return activity
      },
      versionList: function () {
        return version
      }
    },
    methods: {
      submit: function () {
        var self = this
        var data = jsonClone(this.$data)
        self.$set('loading', true)
        ref.child('group').push(data, function () {
          $('.alert').transition('fade up')
          setTimeout(function () {
            $('.alert').transition('fade down')
            self.loading = false
            self.$data = jsonClone(origin)
            router.replace('/group')
          }, 1500)
        })
      }
    }
  }
</script>
