<template>
  <div class="ui container">
    <div class="ui basic buttons">
      <button class="ui icon button" @click="viewCtrl">
        <i class="unhide icon"></i>
      </button>
    </div>
    <div class="ui divided grid" id="postMain">
      <div class="row">
        <div class="column">
          <div class="ui form">
            <div class="field">
              <label>标题：</label>
              <input type="text" v-model="title">
            </div>
            <div class="field" v-if="isAdmin">
              <input type="text" v-model="semantic" placeholder="语义化url">
            </div>
          </div>
        </div>
      </div>
      <div class="row" :class="{two: layout == 2, column: layout == 2}">
        <div class="column">
          <textarea class="lfg-editor" v-model="content" placeholder="..."></textarea>
        </div>
        <div class="column" v-if="layout == 2">
          <div class="markdown-body post-view" v-html="content | marked">

          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="field">
            <div class="ui button" :class="{disabled: !allow}" @click="submit">
              发布
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  #postMain {
    margin-top: 10px;
  }
  .post-view {
    max-height: 40em;
    overflow: auto;
  }
</style>
<script>
import Editor from './mixins/editor'
import ref from './ref'
export default {
  data: function () {
    return {
      layout: 1,
      content: '',
      title: '',
      semantic: ''
    }
  },
  filters: {
    marked: marked
  },
  events: {
    resizile: function () {
      this.$nextTick(function () {
        Editor({
          target: $('.lfg-editor')
        }).responsive()
      })
    }
  },
  computed: {
    allow: function () {
      return !!this.content
    },
    isAdmin: function () {
      return this.$root.user.admin
    }
  },
  ready: function () {
    Editor({
      target: $('.lfg-editor')
    }).init()
    $('.lfg-editor').on('scroll', function () {
      var scale = $(this).scrollTop() / $(this)[0].scrollHeight
      var rt = $('.post-view')
      var rt_height = rt[0].scrollHeight
      rt.scrollTop(scale * rt_height)
    })
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
    },
    submit: function () {
      var self = this
      var admin = this.isAdmin
      var data = {
        content: this.content,
        author: this.$root.user.uid,
        audit: admin,
        title: this.title
      }
      if (admin) {
        data.semantic = this.semantic
      }
      ref.child('tips').push(data, function () {
        self.content = ''
        self.semantic = ''
        self.$emit('resizile')
      })
    }
  }
}
</script>
