<template>
  <div class="tips-mask">
    <div class="mask">

    </div>
  </div>
  <div class="background-copyright">
    背景来源：<a href="http://bbs.ngacn.cc/read.php?tid=9226680&_ff=7&_fp=2" target="_blank">NGA</a>
  </div>
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
<style lang="less">

  .tips-mask,.background-copyright {
    display: none;
  }
  @media screen and (min-width: 768px) {
    .tips-mask {
      display: block;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      background: url('./assets/wow-mounts.jpg') 50% no-repeat;
      background-size: cover;
      .mask {
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: .4;
      }
    }
    .tips {
      position: relative;
      z-index: 10;
      .ui.items>.item>.content>a.header {
        color: #fff;
      }
    }
    .background-copyright {
      display: block;
      position: fixed;
      right: 10px;
      bottom: 10px;
      z-index: 2;
      color: #ccc;
      font-size: 12px;
      a {
        color: #ccc;
      }
    }
  }
</style>
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
