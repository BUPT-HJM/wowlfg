<template>
  <div class="ui grid stackable container">
    <div class="four wide column">
      <div class="ui vertical menu user-menu">
        <a class="item" v-link="{ path: '/order/manager', exact: true}">
          管理订单
        </a>
        <a class="item" v-link="{ path: '/order/manager/add'}">
          新增订单
        </a>
        <a class="item" v-link="{ path: '/order/manager/search'}">
          查询订单
        </a>
      </div>
    </div>
    <div class="twelve wide column">
      <router-view></router-view>
    </div>
  </div>
</template>
