import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import recruit from './recruit'
import account from './account'
import user from './user'
import userInfo from './user-info'
import userPost from './user-post'
import tips from './tips'
import tipsDetail from './tips-detail'
import group from './group'
import groupForm from './group-form'
import titans from './titans'
import titansDetail from './titans-detail'
import titansHelper from './titans-helper'
import titansGroup from './titans-group'
import post from './post'
import help from './help'
import notFound from './404'

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
    component: user,
    subRoutes: {
      '/': {
        component: userInfo
      },
      'posts': {
        name: 'post',
        component: userPost
      }
    }
  },
  'tips': {
    component: tips
  },
  'tips/:id': {
    name: 'tipsDetail',
    component: tipsDetail
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
  },
  'titans-helper': {
    component: titansHelper
  },
  'titans-group': {
    component: titansGroup
  },
  'post': {
    component: post
  },
  'help': {
    component: help
  },
  '404': {
    component: notFound
  }
})

router.redirect({
  '/': '/index',
  '*': '/404'
})

export default router
