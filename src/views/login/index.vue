<template>
  <div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">XX系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" :placeholder="$t('login.username')" name="username" type="text" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" v-model="loginForm.password" :placeholder="$t('login.password')" name="password" auto-complete="on" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <!-- <el-row type="flex" justify="center">
        <el-col :span="15">
          <el-form-item class="pic" prop="captcha">
            <span class="svg-container">
              <svg-icon icon-class="mudedi" />
            </span>
            <el-input v-model="loginForm.captcha" placeholder="验证码" name="captcha" type="text" auto-complete="off" @keyup.enter.native="handleLogin" />
          </el-form-item>
        </el-col>
        <el-col :span="1"/>
        <el-col :span="8">
          <span>
            <img :src="src" alt="如果看不清楚，请单击图片刷新！" style="width:140px;height:47px" @click="refreshCode">
          </span>
        </el-col>
      </el-row> -->

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>

  </div>
</template>

<script>
// import LangSelect from '@/components/LangSelect'
// import { getImg } from '@/api/login'

export default {
  name: 'Login',
  // components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur' }],
        captcha: [
          {
            required: true,
            trigger: 'blur',
            message: 'input varify code please!'
          }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      src: ''
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    this.$store.dispatch('InitLogin').then(res => {
      this.src = 'data:image/jpeg;base64,' + res.data.data.img
    })
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    // refreshCode: function() {
    //   getImg().then(res => {
    //     this.src = 'data:image/jpeg;base64,' + res.data.data.img
    //   })
    // },
    showResult(title, msg, type) {
      if (type === 'success') {
        this.$notify({
          title: title,
          message: msg,
          type: type,
          duration: 2000
        })
      } else {
        this.$notify.error({
          title: title,
          message: msg,
          duration: 3000
        })
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForm.username = this.loginForm.username.trim()
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
              this.showResult('登录失败', '账户或密码错误', 'fail')
              // this.refreshCode()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 480px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

.pic /deep/ .el-form-item__content {
  line-height: 0;
}
.pic {
  .el-input {
    width: 35%;
  }
  img {
    float: right;
  }
  .pointer {
    cursor: pointer;
    width: 150px;
    height: 45px;
  }
  .svg-container2 {
    padding: 16px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
}
</style>
