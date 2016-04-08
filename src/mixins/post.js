import ref from '../ref'
import router from '../router'
var mixin = {
  methods: {
    modalCtrl: function (id) {
      var self = this
      var auth = ref.getAuth()
      if (auth) {
        $(id).modal({
          onApprove: function () {
            self.$broadcast('submit', this)
            return false
          }
        }).modal('show')
      } else {
        router.go('/account')
      }
    }
  },
  events: {
    keyFilter: function (key, val) {
      var obj = this.activities
      Object.keys(obj).map(function (i) {
        if (val === '') {
          obj[i].show = true
          return
        }
        if (typeof val === 'boolean') {
          if (!val) {
            obj[i].show = false
            return
          }
        } else {
          if (key === 'server' || key === 'tags') {
            var reg = new RegExp(val, 'g')
            if (!reg.test(obj[i][key])) {
              obj[i].show = false
              return
            }
          } else {
            if (+obj[i][key] !== +val) {
              obj[i].show = false
              return
            }
          }
        }
        obj[i].show = true
      })
    }
  }
}
export default mixin
