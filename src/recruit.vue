<template>
  <div class="ui container">
    <button class="ui green button" @click="modalCtrl">发布招募信息</button>
    <h4 class="ui horizontal divider header"><i class="info icon"></i> 招募信息</h4>
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
          <input type="text" v-model="filter.server">
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="example" v-model="filter.mainAccount" debounce="500">
            <label>主招募</label>
          </div>
        </div>
      </div>
    </div>
    <table id="recruit-tb" class="ui single line table">
      <thead>
        <tr>
          <th>阵营</th>
          <th>服务器</th>
          <th>招募形式</th>
          <th>时间</th>
          <th>描述</th>
          <th>联系方式</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :class="{hidden: !activity.show}">
          <td v-if="activity.faction == 0">联盟</td>
          <td v-else>部落</td>
          <td>{{activity.server}}</td>
          <td v-if="activity.mainAccount == 0">主招募</td>
          <td v-else>被招募</td>
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
import modal from './components/recruit-form'
import refInstance from './ref'
import router from './main'
var ref = refInstance()
function _filter (key, val) {
  var obj = this.activities
  Object.keys(obj).map(function (i) {
    if (val === null) {
      obj[i].show = true
      return
    }
    if (key === 'server') {
      var reg = new RegExp(val, 'g')
      if (!reg.test(obj[i][key])) {
        obj[i].show = false
        return
      }
    } else {
      if (+obj[i][key] !== +val) {
        obj[i].show = false
        return
      }
    }
    obj[i].show = true
  })
}
export default {
  data: function () {
    return {
      isMainAccount: true,
      activities: {},
      filter: {
        faction: '',
        server: '',
        mainAccount: 0
      }
    }
  },
  watch: {
    'filter.faction': function (val) {
      _filter.apply(this, ['faction', val])
    },
    'filter.server': function (val) {
      _filter.apply(this, ['server', val])
    },
    'filter.mainAccount': function (val) {
      _filter.apply(this, ['mainAccount', val])
    }
  },
  asyncData: function (resolve, reject) {
    ref.child('recruit').on('value', function (snapshot) {
      var val = snapshot.val()
      if (val) {
        Object.keys(val).map(function (i) {
          val[i].show = true
        })
        resolve({
          activities: val
        })
      }
    })
  },
  methods: {
    modalCtrl: function () {
      var self = this
      var auth = ref.getAuth()
      if (auth) {
        $('.ui.modal').modal({
          onApprove: function () {
            self.$broadcast('submit', this)
            return false
          }
        }).modal('show')
      } else {
        router.go('/account')
      }
    }
  },
  components: {
    modal: modal
  }
}
</script>
