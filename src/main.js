import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import header from './components/header'
import recruit from './recruit'
import account from './account'

Vue.use(VueRouter)

var app = Vue.extend({
  components: {
    navigator: header
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
  }
})

router.start(app, 'body')
