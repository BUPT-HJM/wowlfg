import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import header from './components/header'
import recruit from './recruit'
import account from './account'
import user from './user'
import refInstance from './ref'
var ref = refInstance()

Vue.use(VueRouter)
Vue.use(VueAsyncData)
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
    if (token) {
      this.$emit('user:login', id)
      if (!auth) {
        ref.authWithCustomToken(token, function (error, authData) {
          if (error) {
            console.log('Login Failed!', error)
          } else {
            console.log('Authenticated successfully with payload:', authData)
          }
        })
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

var router = new VueRouter()

router.map({
  '/': {
    component: home
  },
  'recruit-a-friend': {
    component: recruit
  },
  'account': {
    component: account
  },
  'user/:uid': {
    name: 'user',
    component: user
  }
})

router.start(app, 'body')

export default function () {
  return router
}
