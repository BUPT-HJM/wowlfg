<template>
  <div class="ui container text">
    <div class="ui stackable grid">
      <div class="two column row">
        <div class="column">
          <div class="ui basic buttons">
            <div class="ui button" v-for="item in orderCtrl" @click="statusCtrl($index)">{{item.text}}</div>
          </div>
        </div>
        <div class="column">
          <div class="ui basic buttons right floated">
            <div class="ui button" v-link="{'path': 'modify', append: true}">修改</div>
            <div class="ui button" @click="delCtrl">删除</div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="ui header">订单编号：{{info.number}}</h2>
    <p>
      {{info.content}}
    </p>
    <p>
      {{info.name}}
    </p>
    <p v-if="info.msg">
      {{info.msg}}
    </p>
    <p>
      预计于 {{info.date}} {{info.time}} 完成
    </p>
    <div class="ui teal large label"> {{info.status | orderStatus}} </div>
    <div class="ui divider"></div>
    <div class="ui small feed order-feed">
      <h3 class="ui header">动态</h3>
      <div class="event" v-for="item in info.trends">
        <div class="content">
          <div class="summary"> {{ item.status | trend }} <div class="ui label"> 5月30日 21:00</div></div>
        </div>
      </div>
    </div>
    <button class="circular ui icon large button trends-tip" data-content="根据订单状态自动创建一条动态" @click="updateTrends">
      <i class="icon plus"></i>
    </button>
  </div>

  <div class="ui small modal delete-confrim">
    <div class="header">
      确认删除？
    </div>
    <div class="content">
      <div class="ui form">
        <div class="field">
          <p>
            请输入 <strong>{{id}}</strong> 以确认删除该订单，删除后不可恢复。
          </p>
          <input type="text" v-model="delete">
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui positive right labeled icon button" :class="{disabled: !allow}">确认删除 <i class="checkmark icon"></i> </div>
    </div>
  </div>
</template>
<script>
  import ref from './ref'
  import {orderStatus} from './data'
  import orderQuery from './order-query'
  import router from './router'
  export default {
    data: function () {
      return {
        info: {},
        delete: '',
        serial: ''
      }
    },
    computed: {
      orderCtrl: function () {
        return orderStatus
      },
      id: function () {
        return this.$route.params.id
      },
      allow: function () {
        return this.delete === this.id
      }
    },
    asyncData: function (resolve) {
      orderQuery.call(this, resolve)
    },
    methods: {
      delCtrl: function () {
        var self = this
        $('.delete-confrim').modal({
          onApprove: function () {
            self.$emit('delete')
            console.log('adsf')
            return false
          }
        }).modal('show')
      },
      statusCtrl: function (type) {
        ref.child('cangbai/order').child(this.serial).update({
          status: parseInt(type, 10)
        })
      },
      updateTrends: function () {
        if (parseInt(this.info.status, 10) !== 0) {
          ref.child('cangbai/order').child(this.serial).child('trends').push({
            status: this.info.status,
            time: Wilddog.ServerValue.TIMESTAMP
          })
        }
      }
    },
    ready: function () {
      $('.trends-tip').popup()
    },
    filters: {
      trend: function (value) {
        var data = ['代练人员已接单', '代练已完成，等待验收', '代练已确认完成']
        return data[value - 1]
      }
    },
    events: {
      delete: function () {
        ref.child('cangbai/order').child(this.serial).remove(function (err) {
          if (!err) {
            $('.delete-confrim').modal('hide')
            router.go('/order/manager/list')
          }
        })
      }
    }
  }
</script>
