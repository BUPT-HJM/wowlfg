import home from './home'
import recruit from './recruit'
import account from './account'
import user from './user'
import tips from './tips'

export default function (router) {
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
}
