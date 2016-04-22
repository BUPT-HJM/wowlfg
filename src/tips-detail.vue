<template>
  <div class="ui container text">
    <div v-html="text | marked" class="markdown-body">

    </div>
  </div>
</template>
<script>
  require('./less/markdown.less')
  import router from './router'
  export default {
    data: function () {
      return {
        text: ''
      }
    },
    filters: {
      marked: marked
    },
    created: function () {
      var self = this
      var req = $.ajax({
        url: '/static/post/' + this.$route.params.id + '.md',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          if (textStatus === 'error') {
            router.replace('/404')
          }
        }
      })
      req.done(function (data) {
        self.text = data
        self.$nextTick(function () {
          self.$emit('replacement')
        })
      })
    },
    events: {
      replacement: function () {
        var hostname = window.location.hostname
        var reg = new RegExp(hostname, 'g')
        $('.markdown-body a').each(function () {
          var href = $(this).attr('href')
          if (!reg.test(href)) {
            $(this).attr('target', '_blank')
          }
        })
      }
    }
  }
</script>
