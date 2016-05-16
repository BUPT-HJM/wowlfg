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
import qqGroup from './qq-group'
import post from './post'
import order from './order'
import orderManager from './order-manager'
import orderCreate from './order-create'
import orderList from './order-list'
import help from './help'
import notFound from './404'
import ref from './ref'
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
      '/info': {
        name: 'userInfo',
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
    component: groupForm,
    auth: true
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
  'qqGroup': {
    component: qqGroup
  },
  'order': {
    component: order
  },
  'order/manager': {
    component: orderManager,
    subRoutes: {
      '/': {
        component: orderList
      },
      '/add': {
        component: orderCreate
      }
    }
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
  '/user/:uid': '/user/:uid/info',
  '*': '/404'
})

router.beforeEach(function (transition) {
  if (transition.to.auth) {
    var auth = ref.getAuth()
    if (auth) {
      transition.next()
    } else {
      transition.abort()
      router.go('/account')
    }
  } else {
    transition.next()
  }
})

export default router
