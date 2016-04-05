import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import header from './components/header'
import recruit from './recruit'
import account from './account'
import user from './user'

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
    if (token) {
      this.$emit('user:login', id)
    }
  },
  components: {
    navigator: header
  },
  events: {
    'user:login': function (id, callback) {
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
