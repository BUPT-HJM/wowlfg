<template>
  <div class="ui container">
    <div class="qqgroup-control">
      <button class="ui green button right floated" @click="modalCtrl">发布招募信息</button>
    </div>

    <div class="ui cards">
      <div class="card" v-for="item in list">
        <div class="content">
          <div class="ui top right attached label">{{item.faction | faction}}</div>
          <div class="header">{{item.title}}</div>
          <div class="description">
            {{item.msg}}
          </div>
        </div>
        <div class="extra content" v-if="item.people">
          <span class="right floated">
            <i class="users icon"></i>
            {{item.people}} 人
          </span>
          <span v-if="!item.code">
            {{item.number}}
          </span>
        </div>
        <a class="ui bottom attached button" href="http://shang.qq.com/wpa/qunwpa?idkey={{item.code}}" target="_blank" v-if="item.code">
          <i class="add icon"></i>
          加入QQ群
        </a>
      </div>
    </div>
  </div>

  <div class="ui modal qqGroup-modal">
    <div class="header">发布群组信息</div>
    <div class="content">
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
                <option value="2">双阵营</option>
                <option value="0">联盟</option>
                <option value="1">部落</option>
              </select>
            </div>
            <div class="field">
              <label>群号</label>
              <input type="text" name="contact" v-model="form.number">
            </div>
            <div class="field">
              <label>人数</label>
              <input type="text" name="contact" v-model="form.people">
            </div>
          </div>
        </div>
        <div class="field">
          <label>加群代码 (可选) <a href="http://qun.qq.com/join.html" target="_blank">如何获取</a></label>
          <textarea rows="2" v-model="form.code"></textarea>
        </div>
        <div class="field">
          <label>描述</label>
          <textarea rows="2" v-model="form.msg"></textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">取消 </div>
      <div class="ui positive right labeled icon button" :class="{disabled: !allow}">提交 <i class="checkmark icon"></i> </div>
    </div>
  </div>
</template>

<style lang="less">
.qqgroup-control {
  margin-bottom: 15px;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>

<script>
  import auth from './helper/auth'
  import router from './router'
  import ref from './ref'
  var init = {
    faction: 2,
    number: '',
    people: '',
    code: '',
    msg: ''
  }
  export default {
    data: function () {
      return {
        form: $.extend(true, {}, init),
        list: []
      }
    },
    computed: {
      allow: function () {
        return !!(this.form.number && this.form.title)
      }
    },
    asyncData: function (resolve, reject) {
      ref.child('qqgroup').on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          resolve({
            list: val
          })
        }
      })
    },
    methods: {
      modalCtrl: function () {
        var self = this
        auth.done(function () {
          $('.qqGroup-modal').modal({
            onApprove: function () {
              self.$emit('submit')
              return false
            }
          }).modal('show')
        }).fail(function () {
          router.go('/account')
        })
      }
    },
    events: {
      submit: function () {
        var self = this
        var data = JSON.parse(JSON.stringify(this.form))
        data.auth = this.$root.user.uid
        if (data.code) {
          var match = data.code.match(/\?idkey=?=[^"]*/g)[0]
          if (match) {
            data.code = match.replace(/\?idkey=/g, '')
          } else {
            data.code = ''
          }
        } else {
          data.code = ''
        }
        ref.child('qqgroup').push(data, function () {
          self.form = $.extend(true, {}, init)
          $('.qqGroup-modal').modal('hide')
        })
      }
    }
  }

</script>
