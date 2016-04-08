<template>
  <div class="ui container">
    <button class="ui green button" @click="modalCtrl('#group-modal')">发布{{module}}信息</button>
    <h4 class="ui horizontal divider header"><i class="info icon"></i> {{module}}信息</h4>
    <div class="ui form">
      <div class="inline fields">
        <div class="field">
          <select class="ui dropdown faction-select" v-model="filter.faction">
            <option value="">阵营</option>
            <option value="0">联盟</option>
            <option value="1">部落</option>
          </select>
        </div>
        <div class="field">
          <input type="text" v-model="filter.server" placeholder="服务器">
        </div>
        <div class="field">
          <input type="text" v-model="filter.tags" placeholder="标签">
        </div>
      </div>
    </div>
    <table id="recruit-tb" class="ui single line table">
      <thead>
        <tr>
          <th v-for="th in thead">{{th}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :class="{hidden: !activity.show}">
          <td v-if="activity.faction == 0">联盟</td>
          <td v-else>部落</td>
          <td>{{activity.server}}</td>
          <td>标签</td>
          <td>{{activity.startedAt}}</td>
          <td v-if="activity.msg">{{activity.msg}}</td>
          <td v-else>无</td>
          <td>{{activity.contact.content}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <modal></modal>
</template>
<style lang="less">
.faction-select {
  width: 70px!important;
}
#recruit-tb {
  .hidden {
    display: none!important;
  }
}
</style>
<script>
import post from './mixins/post'
import modal from './components/group-form'
export default {
  mixins: [post],
  data: function () {
    return {
      module: '组队',
      thead: ['阵营', '服务器', '标签', '时间', '描述', '联系方式'],
      options: [{
        key: '',
        value: '标签'
      }, {
        key: '0',
        value: '成就'
      }],
      filter: {
        faction: '',
        server: '',
        tags: ''
      }
    }
  },
  watch: {
    'filter.faction': function (val) {
      this.$emit('keyFilter', 'faction', val)
    },
    'filter.server': function (val) {
      this.$emit('keyFilter', 'server', val)
    },
    'filter.mainAccount': function (val) {
      this.$emit('keyFilter', 'tags', val)
    }
  },
  components: {
    modal: modal
  }
}
</script>
