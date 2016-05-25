import Vue from 'vue'
import header from './components/header'
import ref from './ref'
import './filter'

require('./less/markdown.less')
require('./less/main.less')

var init = {
  islogin: false,
  user: {
    uid: '',
    screenname: '',
    admin: false,
    permission: 0
  }
}

var app = Vue.extend({
  data: function () {
    return $.extend(true, {}, init)
  },
  created: function () {
    var token = $.cookie('access_token')
    var id = $.cookie('uid')
    var self = this
    if (token && id) {
      // token认证
      var tokenLogin = function () {
        ref.authWithCustomToken(token, function (error, authData) {
          if (error) {
            // 验证失败
            self.$emit('user:logout')
          } else {
            self.$emit('user:login', id)
          }
        })
      }
      var auth = ref.getAuth()
      if (auth) {
        self.$emit('user:login', id)
      } else {
        tokenLogin()
      }
    } else {
      self.$emit('user:logout')
    }
  },
  ready: function () {
    FastClick.attach(document.body)
  },
  components: {
    navigator: header
  },
  events: {
    'user:login': function (id) {
      this.islogin = true
      this.user.uid = id
      this.$emit('getUserInfo', id)
    },
    'user:logout': function () {
      this.$data = $.extend(true, {}, init)
      $.removeCookie('uid', {path: '/'})
      $.removeCookie('access_token', {path: '/'})
      $.removeCookie('permission', {path: '/'})
    },
    'getUserInfo': function (id) {
      var self = this
      ref.child('users').child(id).on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          if (val.info && val.info.username) {
            self.user.screenname = val.info.username
          }
          if (val.admin) {
            self.user.admin = true
          }
          if (val.permission) {
            var permissionCookie = $.cookie('permission')
            if (!permissionCookie) {
              $.cookie('permission', val.permission, { expires: 7, path: '/' })
            }
            self.user.permission = val.permission
          }
        }
      })
    }
  }
})
import router from './router'
router.start(app, 'body')
