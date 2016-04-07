import Vue from 'vue'
import header from './components/header'
import ref from './ref'

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
    var auth = ref.getAuth()
    var self = this
    if (token) {
      if (!auth) {
        ref.authWithCustomToken(token, function (error, authData) {
          if (error) {
            $.removeCookie('uid')
            $.removeCookie('access_token')
          } else {
            self.$emit('user:login', id)
          }
        })
      } else {
        this.$emit('user:login', id)
      }
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
