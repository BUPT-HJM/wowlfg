<template>
  <div class="ui container">
    <h3>积分兑换</h3>
    <div class="ui stackable four cards">
      <div class="card">
        <div class="image">
          <img src="./assets/wow-movie.png" alt="魔兽电影票" />
        </div>
        <div class="content">
          <div class="header">《魔兽》电影票</div>
          <div class="meta">
            <span class="category">花费：5 积分</span>
          </div>
          <div class="description">
            <p>花费积分抽取电影票</p>
          </div>
        </div>
        <div class="ui bottom attached button" @click="exchange">
          <i class="add icon"></i>
          兑换
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ref from './ref'
export default {
  methods: {
    exchange: function () {
      var uid = this.$root.user.uid
      var ref_point = ref.child('users').child(uid).child('point')
      ref_point.once('value', function (snapshot) {
        var val = snapshot.val()
        if (val) {
          var int = parseInt(val, 10)
          if (int >= 5) {
            ref_point.set(parseInt(val, 10) - 5, function (err) {
              if (!err) {
                window.alert('兑换成功')
                ref.child('logs').push({
                  id: uid,
                  time: Wilddog.ServerValue.TIMESTAMP,
                  action: 'reward',
                  detail: '兑换成功 -5'
                })
              }
            })
          } else {
            window.alert('您的积分不够')
          }
        } else {
          window.alert('您的积分不够')
        }
      })
    }
  }
}
</script>
