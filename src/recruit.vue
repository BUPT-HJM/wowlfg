<template>
  <div class="ui container">
    <button class="ui green button" @click="modalCtrl('#recruit-modal')">发布招募信息</button>
    <h4 class="ui horizontal divider header"><i class="info icon"></i> 招募信息</h4>
    <div class="ui form">
      <div class="inline fields">
        <div class="field two wide">
          <select class="ui dropdown" v-model="filter.faction">
            <option value="">阵营</option>
            <option value="0">联盟</option>
            <option value="1">部落</option>
          </select>
        </div>
        <div class="field">
          <input type="text" v-model="filter.server" placeholder="服务器">
        </div>
        <div class="field two wide">
          <select class="ui dropdown" v-model="filter.mainAccount">
            <option value="{{option.key}}" v-for="option in options">{{option.value}}</option>
          </select>
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
#recruit-tb {
  .hidden {
    display: none!important;
  }
}
</style>
<script>
import modal from './components/recruit-form'
import ref from './ref'
import router from './router'
export default {
  data: function () {
    return {
      thead: ['阵营', '服务器', '招募形式', '时间', '描述', '联系方式'],
      options: [{
        key: 0,
        value: '主招募'
      }, {
        key: 1,
        value: '被招募'
      }],
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
      this.$emit('keyFilter', 'faction', val)
    },
    'filter.server': function (val) {
      this.$emit('keyFilter', 'server', val)
    },
    'filter.mainAccount': function (val) {
      this.$emit('keyFilter', 'mainAccount', val)
    }
  },
  events: {
    keyFilter: function (key, val) {
      var obj = this.activities
      Object.keys(obj).map(function (i) {
        if (val === '') {
          obj[i].show = true
          return
        }
        if (typeof val === 'boolean') {
          if (!val) {
            obj[i].show = false
            return
          }
        } else {
          if (key === 'server' || key === 'tags') {
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
        }
        obj[i].show = true
      })
    }
  },
  methods: {
    modalCtrl: function (id) {
      var self = this
      var auth = ref.getAuth()
      if (auth) {
        $(id).modal({
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
  }
}
</script>
