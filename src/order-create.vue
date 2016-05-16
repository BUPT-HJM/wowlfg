<template>
  <div class="ui form">
    <h4 class="ui dividing header">角色信息</h4>

    <div class="field">
      <div class="two fields">
        <div class="field">
          <label>角色名</label>
          <input type="text" v-model="name">
        </div>
        <div class="field">
          <label>订单编号</label>
          <input type="text" v-model="number">
        </div>
      </div>
    </div>

    <div class="field">
      <label>服务器</label>
      <div class="two fields">
        <div class="field">
          <select class="ui dropdown" v-model="region">
            <option v-for="item in regionList" value="{{$index}}">{{item}}</option>
          </select>
        </div>
        <div class="field">
          <input type="text" v-model="server">
        </div>
      </div>
    </div>
    <h4 class="ui dividing header">预计完成</h4>
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
      <label>代练内容</label>
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
    region: 0,
    server: '',
    date: '',
    time: '',
    content: '',
    msg: '',
    status: 0
  }
  import {region} from './data'
  import ref from './ref'
  export default {
    data: function () {
      return $.extend(true, {}, init)
    },
    computed: {
      allow: function () {
        return !!(this.name && this.number && this.server && this.content)
      },
      regionList: function () {
        return region
      }
    },
    ready: function () {
      $('.message .close').on('click', function () {
        $(this).closest('.message').transition('fade')
      })
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
