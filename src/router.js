import Vue from 'vue'
import VueRouter from 'vue-router'
import ref from './ref'

Vue.use(VueRouter)
Vue.use(VueAsyncData)
var router = new VueRouter({
  linkActiveClass: 'active'
})

router.map({
  'index': {
    component: function (resolve) {
      require(['./home'], resolve)
    }
  },
  'recruit-a-friend': {
    component: function (resolve) {
      require(['./recruit'], resolve)
    }
  },
  'account': {
    component: function (resolve) {
      require(['./account'], resolve)
    }
  },
  'user/:uid': {
    name: 'user',
    component: function (resolve) {
      require(['./user'], resolve)
    },
    subRoutes: {
      '/info': {
        name: 'userInfo',
        component: function (resolve) {
          require(['./user-info'], resolve)
        }
      },
      'posts': {
        name: 'post',
        component: function (resolve) {
          require(['./user-post'], resolve)
        }
      }
    }
  },
  'tips': {
    component: function (resolve) {
      require(['./tips'], resolve)
    }
  },
  'tips/:id': {
    name: 'tipsDetail',
    component: function (resolve) {
      require(['./tips-detail'], resolve)
    }
  },
  'group': {
    component: function (resolve) {
      require(['./group'], resolve)
    }
  },
  'create-group': {
    auth: true,
    component: function (resolve) {
      require(['./group-form'], resolve)
    }
  },
  'titans': {
    component: function (resolve) {
      require(['./titans'], resolve)
    }
  },
  'titans/:id': {
    component: function (resolve) {
      require(['./titans-detail'], resolve)
    }
  },
  'titans-helper': {
    component: function (resolve) {
      require(['./titans-helper'], resolve)
    }
  },
  'titans-group': {
    component: function (resolve) {
      require(['./titans-group'], resolve)
    }
  },
  'post': {
    component: function (resolve) {
      require(['./post'], resolve)
    }
  },
  'qqGroup': {
    component: function (resolve) {
      require(['./qq-group'], resolve)
    }
  },
  'order': {
    component: function (resolve) {
      require(['./order'], resolve)
    }
  },
  'order/:id': {
    name: 'orderDetail',
    component: function (resolve) {
      require(['./order-detail'], resolve)
    }
  },
  'order/:id/modify': {
    component: function (resolve) {
      require(['./order-modify'], resolve)
    }
  },
  'order/manager': {
    component: function (resolve) {
      require(['./order-manager'], resolve)
    },
    permission: true,
    subRoutes: {
      '/list': {
        component: function (resolve) {
          require(['./order-list'], resolve)
        }
      },
      '/add': {
        component: function (resolve) {
          require(['./order-create'], resolve)
        }
      }
    }
  },
  'help': {
    component: function (resolve) {
      require(['./help'], resolve)
    }
  },
  '404': {
    component: function (resolve) {
      require(['./404'], resolve)
    }
  }
})

router.redirect({
  '/': '/index',
  '/user/:uid': '/user/:uid/info',
  '/order/manager': '/order/manager/list',
  '*': '/404'
})

router.beforeEach(function (transition) {
  // 登陆权限
  if (transition.to.auth) {
    var auth = ref.getAuth()
    if (!auth) {
      transition.abort()
      router.go('/account')
    } else {
      transition.next()
    }
  } else if (transition.to.permission) {
    var permission = $.cookie('permission')
    if (permission && permission <= 3) {
      transition.next()
    } else {
      transition.abort()
    }
  } else {
    transition.next()
  }
})

export default router
