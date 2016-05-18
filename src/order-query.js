import ref from './ref'
import router from './router'
var query = function (resolve) {
  var id = this.$route.params.id
  var self = this
  if (id.match(/^-/)) {
    this.serial = id
    ref.child('cangbai/order').child(id).on('value', function (snapshot) {
      var val = snapshot.val()
      if (val) {
        resolve({
          info: val
        })
      } else {
        router.replace('/404')
      }
    })
  } else {
    ref.child('cangbai/order').orderByChild('number').equalTo(id).on('value', function (snapshot) {
      var val = snapshot.val()
      if (val) {
        var data = Object.values(val)
        self.serial = Object.keys(val)[0]
        resolve({
          info: data[0]
        })
      } else {
        router.replace('/404')
      }
    })
  }
}
export default query
