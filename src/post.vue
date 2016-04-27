<template>
  <div class="ui container">
    <div class="ui basic buttons">
      <button class="ui icon button" @click="viewCtrl">
        <i class="exchange icon"></i>
      </button>
    </div>
    <div class="ui internally celled grid" :class="{two: layout == 2, column: layout == 2}" id="postMain">
      <div class="column">
        <textarea id="post" v-model="content"></textarea>
      </div>
      <div class="column" v-if="layout == 2">
        <div class="markdown-body" v-html="content | marked">

        </div>
      </div>
    </div>
    <div class="ui button">
      发布
    </div>
  </div>
</template>
<style lang="less">
  #post {
    width: 100%;
    max-width: 100%;
    min-height: 5 * 14 * 1.45 + 20px;
    max-height: none;
    padding: 10px;
    border: none;
    resize: none;
    background-color: #F5F5F0;
    box-shadow: 0px 3px 15px 2px #F5F5F0;
    border-bottom: 1px dashed #ccc;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    color: #333332;
    line-height: 1.45;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.42);
    }
  }
</style>
<script>
function debounce (callback, delay) {
  var timer = null
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      callback.apply(context, args)
    }, delay)
  }
}
export default {
  data: function () {
    return {
      layout: 1,
      content: ''
    }
  },
  filters: {
    marked: marked
  },
  events: {
    resizile: function () {
      this.$nextTick(function () {
        var textarea = $('#post')
        textarea.css({
          height: 'auto'
        })
        textarea.innerHeight(textarea[0].scrollHeight)
      })
    }
  },
  ready: function () {
    var self = this
    var textarea = $('#post')
    textarea.on('input change', function () {
      self.$emit('resizile')
    })
    var resize = debounce(function () {
      self.$emit('resizile')
    }, 250)
    $(window).on('resize', resize)
  },
  methods: {
    viewCtrl: function () {
      var self = this
      if (this.layout === 1) {
        this.layout = 2
      } else {
        this.layout = 1
      }
      self.$emit('resizile')
    }
  }
}
</script>
