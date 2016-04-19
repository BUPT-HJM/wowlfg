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

var app = Vue.extend({
  data: function () {
    return {
      islogin: false,
      uid: ''
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
            $.removeCookie('uid')
            $.removeCookie('access_token')
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
    }
  }
})
import router from './router'
router.start(app, 'body')
