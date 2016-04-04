import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
var router = new VueRouter()

router.map()

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
  events: {
    'user:login': function (id, callback) {
      this.islogin = true
      this.uid = id
      router.replace('/')
    }
  }
})

router.start(app, 'body')
export default function () {
  return router
}
