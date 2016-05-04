<template>
  <div class="ui container tips">
    <div class="ui items">
      <div class="item" v-for="item in list">
        <div class="content">
          <a class="header" v-link="{ name: 'tipsDetail', params: {id: $key} }">{{item.title}}</a>
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
      ref.child('tips').on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          self.list = val
        }
      })
    }
  }
</script>
