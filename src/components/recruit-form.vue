<template>
  <div class="ui modal">
    <div class="header">发布招募信息</div>
    <div class="content">
      <div class="ui form">
        <div class="field">
          <div class="three fields">
            <div class="field">
              <label>阵营</label>
              <select class="ui dropdown" v-model="faction">
                <option value="0">联盟</option>
                <option value="1">部落</option>
              </select>
            </div>
            <div class="field">
              <label>服务器</label>
              <input type="text" v-model="server">
            </div>
            <div class="field">
              <label>招募形式</label>
              <select class="ui dropdown" v-model="mainAccount">
                <option value="0">主招募</option>
                <option value="1">被招募</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label>联系方式</label>
          <div class="fields">
            <div class="field">
              <select class="ui dropdown" v-model="contact.type">
                <option value="qq">QQ</option>
                <option value="wechat">微信</option>
                <option value="battle">战网ID</option>
              </select>
            </div>
            <div class="field">
              <input type="text" name="contact" v-model="contact.content">
            </div>
          </div>
        </div>
        <div class="field">
          <label>描述</label>
          <textarea rows="2" v-model="msg"></textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">取消 </div>
      <div class="ui positive right labeled icon button" :class="{disabled: !allow}">提交 <i class="checkmark icon"></i> </div>
    </div>
  </div>
</template>
<script>
import ref from '../ref.js'
export default {
  data: function () {
    return {
      faction: 0,
      server: '',
      mainAccount: 0,
      contact: {
        type: 'qq',
        content: ''
      },
      msg: ''
    }
  },
  computed: {
    'allow': function () {
      return !!(this.server && this.contact.content)
    }
  },
  ready: function () {
    ref.child('recruit').on('child_added', function () {
      $('.ui.modal').modal('hide')
    })
  },
  events: {
    submit: function (context) {
      var self = this
      var data = JSON.parse(JSON.stringify(self.$data))
      data.startedAt = Wilddog.ServerValue.TIMESTAMP
      data.auth = self.$root.uid
      ref.child('recruit').push(data)
    }
  }
}
</script>
