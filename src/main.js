import Vue from 'vue'
import header from './components/header'
import ref from './ref'
import auth from './helper/auth'
import './filter'

var init = {
  islogin: false,
  user: {
    uid: '',
    screenname: '',
    admin: false
  }
}

var app = Vue.extend({
  data: function () {
    return Object.assign({}, init)
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
      auth.done(function () {
        self.$emit('user:login', id)
      })
      auth.fail(function () {
        tokenLogin()
      })
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
      this.$data = Object.assign({}, init)
      $.removeCookie('uid', {path: '/'})
      $.removeCookie('access_token', {path: '/'})
      $.removeCookie('screenname', {path: '/'})
    },
    'getUserInfo': function (id) {
      var self = this
      ref.child('users').child(id).on('value', function (snapshot) {
        var val = snapshot.val()
        var screenname = $.cookie('screenname')
        if (val) {
          if (val.username) {
            if (!screenname) {
              $.cookie('screenname', val.username, { expires: 7, path: '/' })
            }
            self.user.screenname = val.username
          }
          if (val.admin) {
            self.user.admin = true
          }
        }
      })
    }
  }
})
import router from './router'
router.start(app, 'body')
