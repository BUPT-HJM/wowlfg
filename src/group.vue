<template>
  <div class="ui container">
    <button class="ui green button" v-link="{path: '/create-group'}">发布组队信息</button>
    <h4 class="ui horizontal divider header"><i class="info icon"></i> 组队信息</h4>
    <div class="ui divided items">
      <div class="item" v-for="item in list">
        <div class="content">
          <div class="header">{{item.title}}</div>
          <div class="meta">
            <span>{{item.date}}</span>
            <span>{{item.time}}</span>
            <span v-if="item.member">{{item.member}}人</span>
            <span>{{item.server}}</span>
          </div>
          <div class="description" v-if="item.desc">
            {{item.desc}}
          </div>
          <div class="">
            {{item.contact.type | contact}}: {{item.contact.content}}
          </div>
          <div class="extra">
            <div class="ui label" v-if="item.faction == 0">联盟</div>
            <div class="ui label" v-else>部落</div>
            <div class="ui label">{{item.type | activity}}</div>
            <div class="ui label">{{item.version | version}}</div>
          </div>
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
  created: function () {
    var self = this
    ref.child('group').on('value', function (snapshot) {
      var val = snapshot.val()
      if (val) {
        self.list = val
      }
    })
  }
}
</script>
