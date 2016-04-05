<template>
  <div class="account">
    <div class="ui two column middle aligned very relaxed stackable grid" v-show="status == 0">
      <div class="column">
        <div class="ui form" :class="{error: loginError, success: loginSuccess}">
          <div class="field">
            <label>账号</label>
            <div class="ui left icon input">
              <input type="text" placeholder="邮箱" v-model="loginInfo.email" @blur="verifyEmail(this.loginInfo)">
              <i class="user icon"></i>
            </div>
          </div>
          <div class="field">
            <label>密码</label>
            <div class="ui left icon input">
              <input type="password" v-model="loginInfo.password">
              <i class="lock icon"></i>
            </div>
          </div>
          <div class="ui message error">
            <p v-if="loginInfo.error.email">邮箱格式不正确</p>
            <p v-if="loginInfo.query.status == 2"></p>
          </div>
          <div class="ui blue submit button" :class="{disabled: loginError}" @click="login">登入</div>
          <div class="ui submit button" @click="switchForgot">忘记密码</div>
        </div>
      </div>
      <div class="ui vertical divider">Or </div>
      <div class="center aligned column">
        <div class="ui big green labeled icon button" @click="registerEntry"><i class="signup icon"></i> 注册 </div>
      </div>
    </div>
    <!-- 注册 -->
    <div class="ui two column middle aligned very relaxed stackable grid" v-show="status == 1">
      <div class="center aligned column">
        <div class="ui big blue labeled icon button" @click="loginEntry"><i class="signup icon"></i> 登入 </div>
      </div>
      <div class="ui vertical divider">Or </div>
      <div class="column">
        <div class="ui form" :class="{error: registerError, success: registerSuccess}">
          <div class="field">
            <label>邮箱</label>
            <div class="ui left icon input">
              <input type="email" v-model="registerInfo.email" @blur="verifyEmail(this.registerInfo)">
              <i class="mail icon"></i>
            </div>
          </div>
          <div class="field">
            <label>密码</label>
            <div class="ui left icon input">
              <input type="password" v-model="registerInfo.password">
              <i class="lock icon"></i>
            </div>
          </div>
          <div class="field">
            <label>重复密码</label>
            <div class="ui left icon input">
              <input type="password" v-model="registerInfo.repeat">
              <i class="lock icon"></i>
            </div>
          </div>
          <div class="ui message error">
            <p v-if="registerInfo.error.email">邮箱格式不正确</p>
            <p v-if="registerInfo.error.repeat">两次密码输入不一致</p>
            <p v-if="registerInfo.query.status == 2">{{registerErrorText}}</p>
          </div>
          <div class="ui message success">
            <p>注册成功</p>
          </div>
          <div class="ui green submit button" :class="{disabled: registerError}" @click="register">注册</div>
        </div>
      </div>
    </div>
    <!-- 找回密码 -->
    <div v-show="forgot">
      <div class="ui horizontal divider">忘记密码？ </div>
      <div class="ui form">
        <div class="field">
          <label>邮箱</label>
          <input type="text" value="">
        </div>
        <div class="ui success message">
          <div class="header">提交成功</div>
          <p>已经向您的邮箱发送了一封密码找回邮件，请登录您的邮箱重置密码信息</p>
        </div>
        <div class="ui submit button">找回</div>
      </div>
    </div>
  </div>
</template>
<style>
.account .grid {
  position: relative;
}
.account {
  max-width: 760px;
  margin: 0 auto;
}
</style>
<script>
import refInstance from './ref'
import router from './main'
var ref = refInstance()
export default {
  data: function () {
    return {
      // 0 登陆
      // 1 注册
      status: 0,
      forgot: false,
      // 登陆
      loginInfo: {
        email: '',
        password: '',
        error: {
          email: false
        },
        // 0:初始化 1:成功 2:失败
        query: {
          status: 0,
          error: ''
        }
      },
      // 注册
      registerInfo: {
        email: '',
        password: '',
        repeat: '',
        error: {
          email: false,
          repeat: false
        },
        // 0:初始化 1:成功 2:失败
        query: {
          status: 0,
          error: ''
        }
      }
    }
  },
  watch: {
    'registerInfo.repeat': function (val) {
      if (this.registerInfo.password !== val) {
        this.registerInfo.error.repeat = true
      } else {
        this.registerInfo.error.repeat = false
      }
    }
  },
  computed: {
    loginError: function () {
      return this.loginInfo.error.email || this.loginInfo.query.status === 2
    },
    loginSuccess: function () {
      return this.registerInfo.query.status === 1
    },
    registerError: function () {
      return this.registerInfo.error.repeat || this.registerInfo.error.email || this.registerInfo.query.status === 2
    },
    registerSuccess: function () {
      return this.registerInfo.query.status === 1
    },
    registerErrorText: function () {
      if (this.registerInfo.query.error === 'email_taken') {
        return '该电子邮箱已经被使用'
      }
      return ''
    }
  },
  methods: {
    switchForgot: function () {
      this.forgot = !this.forgot
    },
    registerEntry: function () {
      this.status = 1
      this.forgot = false
    },
    loginEntry: function () {
      this.status = 0
      this.forgot = false
    },
    register: function () {
      var data = {
        email: this.registerInfo.email,
        password: this.registerInfo.password
      }
      var self = this
      ref.createUser(data, function (err, data) {
        if (err != null) {
          self.registerInfo.query.status = 2
          self.registerInfo.query.error = err.code
        } else {
          self.registerInfo.query.status = 1
        }
      })
    },
    login: function () {
      if (!this.loginInfo.email || !this.loginInfo.password) {
        return
      }
      var data = {
        email: this.loginInfo.email,
        password: this.loginInfo.password
      }
      var self = this
      ref.authWithPassword(data, function (err, data) {
        if (err == null) {
          var id = data.uid.replace(/simplelogin:/ig, '')
          $.cookie('access_token', data.token, { expires: 7, path: '/' })
          $.cookie('uid', id, { expires: 7, path: '/' })
          self.$dispatch('user:login', id)
          router().replace('/')
        } else {
          console.log('auth failed,msg:', err)
        }
      })
    },
    verifyEmail: function (context) {
      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (re.test(context.email)) {
        context.error.email = false
      } else {
        context.error.email = true
      }
    }
  }
}
</script>
