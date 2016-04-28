<template>
  <div class="ui container text">
    <div class="markdown-body">
      <div class="tips-detail-toolbar">
        <div class="ui small basic icon buttons">
          <button class="ui button share-btn" data-content="复制成功" data-position="top left"><i class="share icon"></i></button>
          <button class="ui button" @click="edit" v-if="myself"><i class="edit icon"></i></button>
        </div>
      </div>
      <div v-html="content | marked" v-show="!editable"></div>
      <div class="ui form tips-detail-edit" v-if="editable && myself">
        <div class="field">
          <label>标题：</label>
          <input type="text" v-model="title">
        </div>
        <div class="field">
          <textarea class="lfg-editor" v-model="content"></textarea>
        </div>
        <div class="field">
          <div class="ui button blue" :class="{disabled: !allow}" @click="save">
            保存
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .tips-detail-edit {
    padding-top: 30px;
  }
  .markdown-body {
    position: relative;
  }
  .tips-detail-toolbar {
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 10px;
  }
</style>
<script>
  require('./less/markdown.less')
  import router from './router'
  import ref from './ref'
  import Editor from './mixins/editor'
  let init = false
  export default {
    data: function () {
      return {
        content: '',
        author: '',
        title: '',
        editable: false,
        allow: false
      }
    },
    watch: {
      editable: function (val) {
        if (val) {
          Editor({
            target: $('.lfg-editor')
          }).responsive()
        }
      },
      content: function (val, oldVal) {
        if (oldVal !== '') {
          this.allow = true
        }
      }
    },
    computed: {
      myself: function () {
        return this.author === this.$root.user.uid
      }
    },
    filters: {
      marked: marked
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
      },
      share: function () {
        var self = this
        $('.share-btn').popup({
          on: 'manual'
        })
        var clipboard = new Clipboard('.share-btn', {
          text: function (trigger) {
            return '我分享了[' + self.title + ']的文章给你，快来看看吧 \r\n' + window.location.href
          }
        })
        clipboard.on('success', function (e) {
          $('.share-btn').popup('show')
          setTimeout(function () {
            $('.share-btn').popup('hide')
          }, 500)
        })
      }
    },
    methods: {
      edit: function () {
        if (!init) {
          this.$nextTick(function () {
            Editor({
              target: $('.lfg-editor')
            }).init()
          })
          init = true
        }
        this.editable = !this.editable
      },
      save: function () {
        var self = this
        var id = this.$route.params.id
        this.allow = false
        var data = {
          content: this.content,
          title: this.title
        }
        ref.child('tips').child(id).update(data, function (err) {
          if (!err) {
            self.editable = !self.editable
          }
        })
      }
    },
    created: function () {
      var id = this.$route.params.id
      var self = this
      ref.child('tips').child(id).on('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          self.content = val.content
          self.author = val.author
          self.title = val.title
          self.$nextTick(function () {
            self.$emit('replacement')
          })
        } else {
          router.replace('/404')
        }
      })
    },
    ready: function () {
      this.$emit('share')
    }
  }
</script>
