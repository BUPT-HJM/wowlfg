<template>
  <div class="ui form">
    <h4 class="ui dividing header">角色信息</h4>

    <div class="field">
      <div class="two fields">
        <div class="field">
          <label>战网通行证 *</label>
          <input type="text" v-model="battle">
        </div>
        <div class="field">
          <label>角色名-服务器 *</label>
          <input type="text" v-model="name">
        </div>
      </div>
    </div>

    <h4 class="ui dividing header">订单完成</h4>

    <div class="field">
      <label data-content="如是淘宝订单，请输入淘宝订单号" class="order-number-tip">订单编号 <i class="info circle icon"></i></label>
      <input type="text" v-model="number">
    </div>

    <div class="field">
      <div class="two fields">
        <div class="field">
          日期
          <input type="text" placeholder="2016.5.4" v-model="date">
        </div>
        <div class="field">
          时间
          <input type="text" placeholder="21:00" v-model="time">
        </div>
      </div>
    </div>

    <div class="field">
      <label>代练内容 *</label>
      <input type="text" v-model="content"></textarea>
    </div>

    <div class="field">
      <label>备注</label>
      <textarea rows="2" v-model="msg"></textarea>
    </div>
    <div class="ui button" tabindex="0" :class="{disabled: !allow}" @click="submit">提交</div>
    <div class="ui positive hidden message">
      <i class="close icon"></i>
      <div class="header">成功 </div>
    </div>
  </div>
</template>
<script>
  var init = {
    name: '',
    number: '',
    date: '',
    time: '',
    content: '',
    msg: '',
    status: 0
  }
  import ref from './ref'
  export default {
    data: function () {
      return $.extend(true, {}, init)
    },
    computed: {
      allow: function () {
        return !!(this.battle && this.name && this.number && this.content)
      }
    },
    ready: function () {
      $('.message .close').on('click', function () {
        $(this).closest('.message').transition('fade')
      })

      $('.order-number-tip').popup()
    },
    methods: {
      submit: function () {
        var self = this
        var data = JSON.parse(JSON.stringify(self.$data))
        ref.child('cangbai/order').push(data, function (err) {
          if (!err) {
            self.$data = $.extend(true, {}, init)
            $('.message').transition('fade')
            setTimeout(function () {
              $('.message').transition('fade')
            }, 1500)
          }
        })
      }
    }
  }
</script>
