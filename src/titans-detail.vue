<template>
  <div class="ui container text">
    <div class="titans-card">
      <content select=""></content>
      <h3 class="ui header">泰坦的使者 <div class="sub header">3月15日 17:00</div></h3>
      <div>
        <div class="ui label blue">联盟</div>
        <div class="ui label red">部落</div>
      </div>
      <div class="ui tiny horizontal statistic">
        <div class="value">
          1/9
        </div>
        <div class="label">人数 </div>
      </div>
      <p>
        描述
      </p>
      <div class="clearfix">
        <button type="button" class="ui button right floated blue">报名</button>
      </div>
    </div>
    <div class="titans-join">

    </div>
    <div class="titans-member">
      <h3 class="ui header">已加入成员</h3>
      <div class="ui list">
        <div class="item">
          Kenny - 输出 - 猎人
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .clearfix {
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }
  .titans-card {
    padding: 20px;
    box-shadow: 0 1px 3px 0 #d4d4d5,0 0 0 1px #d4d4d5;
    .header {
      margin-top: 0;
    }
  }
  .titans-join {
    margin: 20px auto;
  }
</style>
