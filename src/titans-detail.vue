<template>
  <div class="ui container text">
    <div class="titans-card">
      <content select=""></content>
      <h3 class="ui header">{{info.title}} <div class="sub header">{{info.date}}</div></h3>
      <div>
        <div class="ui label blue" v-if="info.faction == 0">联盟</div>
        <div class="ui label red" v-else>部落</div>
      </div>
      <div class="ui tiny horizontal statistic">
        <div class="value">
          {{joined}}/{{info.member}}
        </div>
        <div class="label">人数 </div>
      </div>
      <p v-if="info.desc">
        {{info.desc}}
      </p>
      <div class="titans-card-ft">
        <button type="button" class="ui basic small button" :class="{disabled: isJoined}" @click="joinCtrl">报名</button>
        <button type="button" class="ui basic small button share-btn" data-content="复制成功" data-position="top left">
          <i class="icon share"></i>
          分享
        </button>
      </div>
    </div>
    <div class="titans-member">
      <h3 class="ui header">已加入成员</h3>
      <div class="ui list">
        <div class="item" v-for="item in info.list">
          <span>{{item.contact.type | contact}}: </span>{{item.contact.content}} - {{item.talent | responsibility}} - {{item.class | class}}
        </div>
      </div>
    </div>
  </div>
  <div class="ui modal titans-join">
    <div class="header">参与活动报名</div>
    <div class="content">
      <div class="ui form equal width">
        <div class="two fields">
          <div class="field">
            <label>联系方式</label>
            <div class="two fields">
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
            <div class="two fields">
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
  .titans-card-ft {
    text-align: right;
  }
  .share-btn {
    margin-left: 10px;
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
  import ref from './ref'
  import router from './router'
  var _id = ''
  var _$titans = ''
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
        info: {},
        wowClass: filter().classArray,
        isJoined: false
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
      },
      joined: function () {
        return (this.info.list) ? Object.keys(this.info.list).length : 0
      }
    },
    asyncData: function (resolve, reject) {
      _$titans.on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          resolve({
            info: val
          })
        } else {
          router.replace('/404')
        }
      })
    },
    methods: {
      joinCtrl: function () {
        $('.titans-join').modal('show')
      }
    },
    events: {
      share: function () {
        var self = this
        $('.share-btn').popup({
          on: 'manual'
        })
        var clipboard = new Clipboard('.share-btn', {
          text: function (trigger) {
            return '我发起了一个[' + self.info.title + ']活动，大家快来报名 \r\n' + window.location.href
          }
        })
        clipboard.on('success', function (e) {
          $('.share-btn').popup('show')
          setTimeout(function () {
            $('.share-btn').popup('hide')
          }, 500)
        })
      },
      submit: function () {
        var self = this
        var data = JSON.parse(JSON.stringify(self.join))
        _$titans.child('list').push(data, function () {
          self.$emit('modal-close')
        })
      },
      'modal-close': function () {
        var self = this
        $('.titans-join').modal('hide')
        self.isJoined = true
      }
    },
    created: function () {
      _id = '-' + this.$route.params.id
      _$titans = ref.child('titans').child(_id)
    },
    ready: function () {
      var self = this
      $('.wow-class').dropdown({
        onChange: function (value, text, $selectedItem) {
          self.join.class = value
          self.join.talent = '1'
        }
      })
      this.$emit('share')
      $('.titans-join').modal({
        onApprove: function () {
          self.$emit('submit', this)
          return false
        }
      })
    }
  }
</script>
