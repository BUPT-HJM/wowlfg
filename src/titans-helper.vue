<template>
  <div class="ui container">
    <h1 class="ui header">泰坦助手 <div class="sub header">
      泰坦的使者成就专业技能互助
    </div></h1>
    <button type="button" class="ui button blue" @click="modalCtrl" :class="{disabled: isPost}">发布信息</button>
    <div class="ui horizontal divider">
      INFO
    </div>
    <table class="ui table celled padded table titans-helper-tb">
      <thead>
        <tr>
          <th class="single line">服务器</th>
          <th>阵营</th>
          <th>专业</th>
          <th>联系方式</th>
          <th>留言</th>
          <th class="control" v-if="isAdmin">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.server}}</td>
          <td v-if="item.faction == 0">联盟</td>
          <td v-else>部落</td>
          <td>{{item.profession | profession}}</td>
          <td>{{item.contact.type | contact}}: {{item.contact.content}}</td>
          <td>{{item.msg}}</td>
          <td v-if="isAdmin">
            <button type="button" class="ui button" @click="deleteCtrl($key)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="ui modal titans-helper-modal">
    <div class="header">发布助手信息</div>
    <div class="content">
      <div class="ui form">
        <div class="field">
          <div class="two fields">
            <div class="field">
              <label>阵营</label>
              <select class="ui dropdown" v-model="post.faction">
                <option value="0">联盟</option>
                <option value="1">部落</option>
              </select>
            </div>
            <div class="field">
              <label>服务器</label>
              <input type="text" v-model="post.server">
            </div>
          </div>
        </div>
        <div class="field">
          <label>专业</label>
          <select class="ui dropdown" multiple>
            <option v-for="item in profession" v-bind:value="$index">{{item}}</option>
          </select>
        </div>
        <div class="field">
          <label>联系方式</label>
          <div class="fields">
            <div class="field">
              <select class="ui dropdown" v-model="post.contact.type">
                <option value="qq">QQ</option>
                <option value="wechat">微信</option>
                <option value="battle">战网ID</option>
              </select>
            </div>
            <div class="field">
              <input type="text" v-model="post.contact.content">
            </div>
          </div>
        </div>
        <div class="field">
          <label>描述</label>
          <textarea rows="2" v-model="post.msg"></textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">取消 </div>
      <div class="ui positive right labeled icon button" :class="{disabled: !allow}">提交 <i class="checkmark icon"></i> </div>
    </div>
  </div>

  <div class="ui small basic modal delete-confirm" v-if="isAdmin">
    <div class="ui icon header">
      <i class="archive icon"></i>
      删除信息
    </div>
    <div class="content">
      <p>你确认要删除这条信息吗？删除后无法恢复。</p>
    </div>
    <div class="actions">
      <div class="ui red basic cancel inverted button">
        <i class="remove icon"></i>
        No
      </div>
      <div class="ui green ok inverted button">
        <i class="checkmark icon"></i>
        Yes
      </div>
    </div>
  </div>

</template>
<style lang="less">
  .titans-helper-tb {
    tr {
      td {
        &:nth-child(3),&:nth-child(5) {
          width: 20%
        }
      }
    }
    .control {
      width: 10%;
    }
  }
</style>
<script>
  import {profession} from './data'
  import ref from './ref'
  export default {
    data: function () {
      return {
        post: {
          faction: 0,
          server: '',
          profession: [],
          contact: {
            type: 'qq',
            content: ''
          },
          msg: ''
        },
        profession: profession,
        list: {},
        isPost: false,
        current: ''
      }
    },
    created: function () {
      var self = this
      var child = ref.child('titans/helper')
      child.on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          self.list = val
        }
      })
    },
    ready: function () {
      var self = this
      $('.titans-helper-modal').modal({
        onApprove: function () {
          self.$emit('submit', this)
          return false
        }
      })
      this.$emit('dropdown')
    },
    computed: {
      allow: function () {
        return !!(this.post.profession.length > 0 && this.post.server && this.post.contact.content)
      },
      isAdmin: function () {
        return this.$root.user.admin
      }
    },
    watch: {
      isAdmin: function (val) {
        var self = this
        if (val) {
          $('.delete-confirm').modal({
            onApprove: function () {
              ref.child('titans/helper/' + self.current).remove(function (err) {
                if (!err) {
                  $('.delete-confirm').modal('hide')
                }
              })
              return false
            }
          })
        }
      }
    },
    methods: {
      modalCtrl: function () {
        $('.titans-helper-modal').modal('show')
      },
      deleteCtrl: function (val) {
        this.current = val
        $('.delete-confirm').modal('show')
      }
    },
    events: {
      submit: function () {
        var self = this
        var data = this.post
        ref.child('titans').child('helper').push(data, function () {
          $('.titans-helper-modal').modal('hide')
          self.isPost = true
        })
      },
      dropdown: function () {
        var self = this
        $('.ui.dropdown').dropdown({
          onChange: function (value, text, $choice) {
            self.post.profession = value
          }
        })
      }
    }
  }
</script>
