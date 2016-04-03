<template>
  <div class="ui container">
    <button class="ui green button" @click="modalCtrl">发布招募信息</button>
    <h4 class="ui horizontal divider header"><i class="info icon"></i> 招募信息</h4>
    <div class="ui form">
      <div class="inline fields">
        <div class="field">
          <select class="ui dropdown">
            <option value="">阵营</option>
            <option value="1">联盟</option>
            <option value="0">部落</option>
          </select>
        </div>
        <div class="field">
          <input type="text" name="shipping[first-name]" placeholder="First Name">
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="example" v-model="isMainAccount">
            <label>主招募</label>
          </div>
        </div>
      </div>
    </div>
    <table class="ui single line table">
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
        <tr>
          <td>联盟</td>
          <td>德拉诺</td>
          <td>主招募</td>
          <td>2016年2月4日</td>
          <td>晚上在线</td>
          <td>#122182</td>
        </tr>
        <tr>
          <td>联盟</td>
          <td>德拉诺</td>
          <td>主招募</td>
          <td>2016年2月4日</td>
          <td>无</td>
          <td>#122182</td>
        </tr>
        <tr>
          <td>联盟</td>
          <td>德拉诺</td>
          <td>主招募</td>
          <td>2016年2月4日</td>
          <td>奖励一张小卡</td>
          <td>#122182</td>
        </tr>
      </tbody>
    </table>
  </div>
  <modal></modal>
</template>

<script>
import modal from './components/recruit-form'
export default {
  data: function () {
    return {
      isMainAccount: true
    }
  },
  methods: {
    modalCtrl: function () {
      $('.ui.modal').modal('show')
    }
  },
  components: {
    modal: modal
  }
}
</script>
