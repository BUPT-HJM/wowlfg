<template>
  <div class="ui container text">
    <h2 class="ui header">订单编号：{{info.number}}</h2>
    <p>
      {{info.content}}
    </p>
    <p>
      {{info.name}} {{info.region | region}} {{info.server}}
    </p>
    <p v-if="info.msg">
      {{info.msg}}
    </p>
    <p>
      预计于 {{info.date}} {{info.time}} 完成
    </p>
    <div class="ui teal large label"> {{info.status | orderStatus}} </div>
  </div>
</template>
<script>
  import ref from './ref'
  import router from './router'
  export default {
    data: function () {
      return {
        info: {}
      }
    },
    asyncData: function (resolve) {
      var id = this.$route.params.id
      ref.child('cangbai/order').orderByChild('number').equalTo(id).on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          var data = Object.values(val)
          resolve({
            info: data[0]
          })
        } else {
          router.replace('/404')
        }
      })
    }
  }
</script>
