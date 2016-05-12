import Vue from 'vue'
import header from './components/header'
import ref from './ref'
import auth from './helper/auth'
import './filter'

var app = Vue.extend({
  data: function () {
    return {
      islogin: false,
      user: {
        uid: '',
        screenname: '',
        admin: false
      }
    }
  },
  created: function () {
    var token = $.cookie('access_token')
    var id = $.cookie('uid')
    var self = this
    if (token) {
      auth.done(function () {
        self.$emit('user:login', id)
      }).fail(function () {
        ref.authWithCustomToken(token, function (error, authData) {
          if (error) {
            $.removeCookie('uid', {path: '/'})
            $.removeCookie('access_token', {path: '/'})
            $.removeCookie('screenname', {path: '/'})
          } else {
            self.$emit('user:login', id)
          }
        })
      })
    } else {
      $.removeCookie('uid', {path: '/'})
      $.removeCookie('access_token', {path: '/'})
      $.removeCookie('screenname', {path: '/'})
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
