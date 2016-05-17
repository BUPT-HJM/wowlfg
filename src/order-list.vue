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
        <a class="ui bottom attached button" v-link="{ name: 'orderDetail', params: {id: item.number} }"><i class="tasks icon"></i> 详情</a>
      </div>
    </div>
  </div>
</template>
<script>
  import ref from './ref'
  import {orderStatus} from './data'
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
          var data = orderStatus
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
