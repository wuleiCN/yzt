<template>
  <div class="login-container">
    <div class="login-header">
      <div class="header-item">
        <img src="../../assets/datav-logo.png" alt="" srcset="">
      </div>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      @keyup.enter.native="activeName === 'second' ? handleMsgLogin() : handleLogin()"
    >
      <img class="login-border" src="../../assets/login-border.png" alt="">
      <div class="login-form-wrap">
        <div class="title-container">
          <h1 class="title">
            智慧工地宝管理平台
          </h1>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="账号密码登录" name="first">
            <div v-if="activeName === 'first'">
              <el-form-item prop="userName">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  ref="username"
                  v-model="loginForm.userName"
                  placeholder="请输入用户名"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="passWord">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.passWord"
                  :type="passwordType"
                  placeholder="请输入密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-input v-model="loginForm.verifyCode" placeholder="验证码" />
                  </el-col>
                  <el-col :span="10" class="login-captcha">
                    <img :src="captchaPath" alt="" @click="getCaptcha()">
                  </el-col>
                </el-row>
              </el-form-item>
              <!-- <el-form-item prop="verifyCode">
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-input v-model="loginForm.verifyCode" placeholder="验证码" />
                  </el-col>
                  <el-col :span="10" class="login-captcha">
                    <img :src="captchaPath" alt="" @click="getCaptcha()">
                  </el-col>
                </el-row>
              </el-form-item> -->
              <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="handleLogin">登 录</el-button>
              <div class="a_privacy" style="padding-left:10px">
                <el-checkbox v-model="radio" label="1">登录代表已阅读和同意 <a @click="showModal">《用户使用协议》</a></el-checkbox>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="second">
            <div v-if="activeName === 'second'">
              <el-form-item prop="phone">
                <span class="svg-container">
                  <i class="el-icon-mobile-phone" />
                </span>
                <el-input
                  ref="phone"
                  v-model="loginForm.phone"
                  placeholder="请输入手机号"
                  name="phone"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="smsCode">
                <el-row>
                  <el-col :span="14">
                    <el-input v-model="loginForm.smsCode" placeholder="手机验证码" />
                  </el-col>
                  <el-col :span="10" class="login-captcha">
                    <div class="input-div">
                      <el-button class="code-btn" :disabled="isDisabled" @click="getCode()">
                        <span v-show="show">获取验证码</span>
                        <span v-show="!show" class="count">{{ count }} S</span>
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;" @click.native.prevent="handleMsgLogin">登 录</el-button>
              <div class="a_privacy" style="padding-left:10px">
                <el-checkbox v-model="radio" label="1">登录代表已阅读和同意 <a @click="showModal">《用户使用协议》</a></el-checkbox>
              </div>
            </div>

          </el-tab-pane>
        </el-tabs>

      </div>
    </el-form>
    <UserPrivacy v-if="dialogVisible" ref="userPrivacy" />
    <div class="footer-contraner">
      <span>系统版本: v{{ version }}</span>
    </div>

  </div>
</template>

<script>
import { version } from '../../../package.json'
import { getUUID } from '@/utils'
import { sendSms } from '@/api/sys/user'
import UserPrivacy from './user-privacy'
import md5 from 'md5'
const TIME_COUNT = 60
export default {
  name: 'Login',
  components: {
    UserPrivacy
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码不少于8位数'))
      } else {
        callback()
      }
    }
    return {
      version,
      dialogVisible: false,
      radio: true,
      show: true,
      count: '',
      timer: null,
      activeName: 'first',
      isDisabled: true,
      loginForm: {
        userName: '',
        verifyCode: '',
        uuid: '',
        phone: '',
        smsCode: '',
        passWord: ''
      },
      captchaPath: '',
      loginRules: {
        userName: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        phone: [
          { required: true, trigger: 'blur', message: '手机号码不能为空' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: ['blur', 'change'] }
        ],
        verifyCode: [{ required: true, trigger: 'blur', message: '验证码不能为空' }],
        smsCode: [
          { required: true, trigger: 'blur', message: '手机验证码不能为空' }
        ],
        passWord: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    'loginForm.phone': {
      handler: function(phone) {
        this.isDisabled = !(/^1[3456789]\d{9}$/.test(phone))
      }
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    handleClick() {
      this.$refs['loginForm'].resetFields()
    },
    showModal() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.userPrivacy.init()
      })
    },
    getCode() {
      sendSms({ phone: this.loginForm.phone }).then((data) => {
        if (data && data.code === 1000) {
          this.$message({
            message: '短信已发送，请注意查收',
            type: 'success',
            duration: 1000
          })
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.isDisabled = true
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                this.isDisabled = false
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    handleMsgLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (!this.radio) return this.$message.warning('请先勾选用户使用协议，才能登录')
          this.loading = true
          this.$store.dispatch('user/phonelogin', this.loginForm).then(() => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 获取验证码
    getCaptcha() {
      this.loginForm.uuid = getUUID()
      this.captchaPath = this.$http.baseUrl(`/user/getVerifyCode?uuid=${this.loginForm.uuid}`)
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (!this.radio) return this.$message.warning('请先勾选用户使用协议，才能登录')
          this.loading = true
          this.$store.dispatch('user/login', { ...this.loginForm, passWord: md5(this.loginForm.passWord) }).then((res) => {
            if (res.code === 1234) {
              this.activeName = 'second'
              this.loginForm.phone = res.result
            }
            this.loading = false
          }).catch((res) => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  height: 100% !important;
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
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-tabs {
    .el-tabs__nav {
      width: 100%;
      text-align: center;
    }
    .el-tabs__item {
      width: 50%;
      color: #fff;
      padding: 0;
    }
  }
  .input-div {
    // background: red;
    padding: 5px;
    .el-button {
      width: 100%;
      // height: 40px;
      font-size: 14px;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #fff !important;
  }
}

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('../../assets/login-bg.png') no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 520px;
    max-width: 100%;
    padding: 0px 35px 0;
    right: 100px;
    overflow: hidden;
    top: 50%;
    transform: translate(0%, -40%);
    .login-border {
      width: 85%;
      height: 410px;
      position: absolute;
      top: 60px;
      z-index: -100;
    }
    .login-form-wrap {
      height: 460px;
      padding: 35px 70px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 30px;
      color: $light_gray;
      margin: 0px auto 45px auto;
      text-align: center;
      font-weight: 500;
      span {
        padding: 0 6px;
      }
    }
  }
  .a_privacy {
    // text-decoration: underline;
    .el-checkbox  {
      color: #fff !important;
    }
    a {
      text-decoration: underline;
      color: #ff9a00;
    }
    text-align: center;
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
  .login-captcha {
    overflow: hidden;
    height: 45px;
    // background: pink;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .login-header {
    color: #fff;
    font-weight: 550;
    .header-item {
      display: inline-block;
      margin-top: 30px;
      margin-left: 30px;
      img {
        width: 250px;
        // height: 40px;
      }
    }
    .header-right {
      float: right;
      padding: 0 30px;
    }
    .header-right-item {
      margin: 0 10px;
      cursor: pointer;
    }
    .header-title {
      height: 40px;
      padding-left: 10px;
      vertical-align: text-bottom;
      border-left: 2px solid #fff;
      line-height: 22px;
      text-align: center;
    }

  }
  .login-img-gif {
    width: 1000px;
    position: absolute;
    left: 8%;
    top:15%;
  }
  .footer-contraner {
    font-size: 16px;
    width: 100%;
    color: #fff;
    position: absolute;
    bottom: 30px;
    text-align: center;
    .tel {
      display: inline-block;
      margin: 0 40px;
    }
  }
}
</style>
