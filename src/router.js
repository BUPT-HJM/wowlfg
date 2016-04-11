import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import recruit from './recruit'
import account from './account'
import user from './user'
import tips from './tips'
import group from './group'
import groupForm from './group-form'
import titans from './titans'
import titansDetail from './titans-detail'

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
  },
  'create-group': {
    component: groupForm
  },
  'titans': {
    component: titans
  },
  'titans/:id': {
    component: titansDetail
  }
})

router.redirect({
  '*': '/index'
})

export default router
