<template>
  <div class="ui container text">
    <div class="titans-card">
      <content select=""></content>
      <h3 class="ui header">泰坦的使者 <div class="sub header">3月15日 17:00</div></h3>
      <div>
        <div class="ui label blue">联盟</div>
        <div class="ui label red">部落</div>
      </div>
      <div class="ui tiny horizontal statistic">
        <div class="value">
          1/9
        </div>
        <div class="label">人数 </div>
      </div>
      <p>
        描述
      </p>
      <div class="clearfix">
        <button type="button" class="ui button right floated blue" @click="joinCtrl">报名</button>
      </div>
    </div>
    <div class="titans-member">
      <h3 class="ui header">已加入成员</h3>
      <div class="ui list">
        <div class="item">
          Kenny#7705 - 输出 - 猎人
        </div>
      </div>
    </div>
  </div>
  <div class="ui modal titans-join">
    <div class="header">参与活动报名</div>
    <div class="content">
      <div class="ui form equal width">
        <div class="field">
          <div class="fields">
            <div class="field">
              <label>联系方式</label>
              <div class="fields">
                <div class="field">
                  <select class="ui dropdown" v-model="join.contact.type">
                    <option value="qq">QQ</option>
                    <option value="wechat">微信</option>
                    <option value="battle">战网ID</option>
                  </select>
                </div>
                <div class="field">
                  <input type="text" v-model="join.contact.content">
                </div>
              </div>
            </div>
            <div class="field">
              <div class="fields">
                <div class="field">
                  <label>职业</label>
                  <div class="ui selection dropdown wow-class">
                    <input type="hidden" name="gender">
                    <i class="dropdown icon"></i>
                    <div class="default text"></div>
                    <div class="menu">
                      <div class="item" v-for="item in wowClass" data-value="{{$index}}"><i :style="{'background-color': item.color}"></i>{{item.name}}</div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label>职能</label>
                  <select class="ui dropdown" v-model="join.talent">
                    <option v-for="item in duty" value="{{item}}">{{item | responsibility}}</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">取消 </div>
      <div class="ui positive right labeled icon button" :class="{disabled: !allow}">提交 <i class="checkmark icon"></i> </div>
    </div>
  </div>
</template>
<style lang="less">
  .clearfix {
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }
  .titans-card {
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px 0 #d4d4d5,0 0 0 1px #d4d4d5;
    .header {
      margin-top: 0;
    }
  }
  .titans-join {
    margin: 20px auto;
  }
  .wow-class {
    .item {
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 10px;
        box-shadow: 0 0 0 1px #eee;
      }
    }
  }
</style>
<script>
  import filter from './filter'
  export default {
    data: function () {
      return {
        join: {
          contact: {
            type: 'qq',
            content: ''
          },
          class: '',
          talent: ''
        },
        wowClass: filter().classArray
      }
    },
    computed: {
      duty: function () {
        var index = this.join.class
        if (this.wowClass[index]) {
          return this.wowClass[index].type
        } else {
          return []
        }
      },
      allow: function () {
        return !!(this.join.contact.content && this.join.class)
      }
    },
    methods: {
      joinCtrl: function () {
        $('.titans-join').modal({
          onApprove: function () {
            return false
          }
        }).modal('show')
      }
    },
    ready: function () {
      var self = this
      $('.wow-class').dropdown({
        onChange: function (value, text, $selectedItem) {
          self.join.class = value
          self.join.talent = '1'
        }
      })
    }
  }
</script>
