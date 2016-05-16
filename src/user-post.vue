<template>
  <div class="ui blue button" v-link="{path: '/post'}">发布</div>
  <h3>我的文章</h3>
  <div class="ui list">
    <a class="item" v-for="item in list" v-link="{ name: 'tipsDetail', params: {id: $key} }">{{item.title}}</a>
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
    asyncData: function (resolve) {
      var uid = this.$root.user.uid
      ref.child('tips').orderByChild('author').equalTo(uid).on('value', function (snapshot) {
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
