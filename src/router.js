import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import recruit from './recruit'
import account from './account'
import user from './user'
import tips from './tips'
import group from './group'

Vue.use(VueRouter)
Vue.use(VueAsyncData)
var router = new VueRouter({
  linkActiveClass: 'active'
})

router.map({
  'index': {
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
  },
  'tips': {
    component: tips
  },
  'group': {
    component: group
  }
})

router.redirect({
  '*': '/index'
})

export default router
