import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import recruit from './recruit'
import account from './account'
import user from './user'
import tips from './tips'

Vue.use(VueRouter)
Vue.use(VueAsyncData)
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
  },
  'tips': {
    component: tips
  }
})

export default router
