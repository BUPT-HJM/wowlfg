import Vue from 'vue'
import header from './components/header'
import ref from './ref'
import auth from './helper/auth'
import filter from './filter'

Vue.filter('responsibility', function (value) {
  return filter().responsibility(value)
})

Vue.filter('class', function (value) {
  return filter().class(value)
})

Vue.filter('contact', function (value) {
  return filter().contactType(value)
})

Vue.filter('date', function (value) {
  return filter().date(value)
})

var app = Vue.extend({
  data: function () {
    return {
      islogin: false,
      uid: '',
      screenname: ''
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
    }
  },
  components: {
    navigator: header
  },
  events: {
    'user:login': function (id) {
      this.islogin = true
      this.uid = id
      var screenname = $.cookie('screenname')
      if (!screenname) {
        this.$emit('getUserName', id)
      } else {
        this.screenname = screenname
      }
    },
    'getUserName': function (id) {
      var self = this
      ref.child('users').child(id).on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          console.log(val)
          if (val.username) {
            self.screenname = val.username
            $.cookie('screenname', val.username, { expires: 7, path: '/' })
          }
        }
      })
    }
  }
})
import router from './router'
router.start(app, 'body')
