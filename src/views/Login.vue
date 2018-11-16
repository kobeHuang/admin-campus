<template>
    <div class="login">
        <div class="login-box">
            <div v-loading="loading" class="login-form-wrap">
                <div class="form-title">管理平台平台登录</div>
                <form class="login-form">
                    <div class="input-wrap">
                        <i class="iconfont icon-user_login"></i>
                        <input type="text" v-model="params.account" class="username-input" placeholder="请输入登录账号">
                    </div>
                    <div class="input-wrap">
                        <i class="iconfont icon-ai-password"></i>
                        <input type="password" v-model="params.password" class="userpwd-input" placeholder="请输入您的密码">
                    </div>
                </form>
                <button class="login-btn" @click="onLogin">登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from 'MD5';
import { axiosLogin } from '../api';

export default {
  data() {
    return {
      loading: false,
      params: {
        account: '',
        password: '',
      },
    }
  },
  methods: {
    validateInfo() {
      const _params = this.params;
      if(!_params.account){
        this.$message({
          message: '账号不能为空',
          type: 'warning'
        })
        return false;
      }
      if(!_params.password){
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return false;
      }
      return true;
    },
    onLogin() {
      if(this.validateInfo()){
        this.loading = true;
        const _params = Object.assign({}, this.params);
        _params.password = md5(_params.password);
        axiosLogin(_params)
        .then( data => {
            this.loading = false;
            window.sessionStorage.setItem('USER_INFO', JSON.stringify(data));
            if(this.$route.query.redirect){
              location.href = decodeURIComponent(this.$route.query.redirect);
            }else{
              this.$router.replace({path: '/'});
            }
        }).catch(e => {
          this.loading = false;
        });
      }
    },
    keyupSubmit(evt) {
      evt = (evt) ? evt : ((window.event) ? window.event : "");     
      let _key=evt.keyCode;
      if(_key===13){
        this.onLogin()
      }
    }
  },
  created() {
    this.keyupSubmit();
    document.addEventListener('keydown',this.keyupSubmit);
  },
  beforeDestroy() {
    document.removeEventListener('keydown',this.keyupSubmit);
  }
};
</script>
<style lang='scss' scoped>
.login {
  flex: 1;
  position: relative;
  background: url("../assets/images/login_bg.png") center center no-repeat;
  background-size: cover;
  .login-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    background-color: rgba(0, 0, 0, 0.6);
    .login-form-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 40px;
      height: 100%;
      .form-title {
        font-size: 26px;
        font-weight: 700;
        color: #fff;
      }
      .login-form {
        margin-top: 20px;
        .input-wrap {
          position: relative;
          .iconfont {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            font-size: 20px;
            color: #333;
          }
          input {
            padding: 0 10px 0 40px;
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            color: #333;
            border: 1px solid #999;
            background-color: #fff;
            &::-webkit-input-placeholder {
              color: #999;
            }
            &.username-input {
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            &.userpwd-input {
              border-top: none;
              border-bottom: none;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            }
          }
          img {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            height: 45px;
          }
        }
      }
      .login-btn {
        margin-top: 30px;
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        border-radius: 8px;
        border-color: #126ed5;
        background-color: #126ed5;
      }
    }
  }
}
</style>