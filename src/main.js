import Vue from 'vue'
import VueRouter from 'vue-router'
import header from './components/header'
import ref from './ref'
Vue.use(VueAsyncData)
Vue.use(VueRouter)

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
import routerMap from './router'
routerMap(router)
router.start(app, 'body')
