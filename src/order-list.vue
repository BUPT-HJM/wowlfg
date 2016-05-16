<template>
  <div class="ui container">
    <div class="ui cards">
      <div class="ui card" v-for="item in list">
        <div class="content">
          <div class="header">订单号：{{item.number}}</div>
          <div class="meta">
            <span v-if="item.date || item.time">预计于 {{item.date}} {{item.time}} 完成</span>
          </div>
          <p>
            {{item.name}}
          </p>
          <p>
            {{item.content}}
          </p>
        </div>
        <div class="extra content">
          <span v-order-status="item.status"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ref from './ref'
  export default {
    data: function () {
      return {
        list: {}
      }
    },
    methods: {

    },
    directives: {
      'order-status': {
        update: function (value) {
          var data = [
            {
              icon: 'feed',
              text: '派单中'
            },
            {
              icon: 'wait',
              text: '已接单'
            },
            {
              icon: 'find',
              text: '待验收'
            },
            {
              icon: 'checkered flag',
              text: '完成'
            }
          ]
          this.el.innerHTML = '<i class="' + data[value].icon + ' icon"></i>' + data[value].text
        }
      }
    },
    asyncData: function (resolve) {
      ref.child('cangbai/order').on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          resolve({
            list: val
          })
        }
      })
    }
  }
</script>
