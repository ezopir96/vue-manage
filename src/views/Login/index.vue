<template>
  <div class="login_container">
    <form class="login_form">
      <label for="username">
        <span class="label_text">用户名:</span>
        <input v-username type="text" name="username" id="username">
        <div>
          <span class="wrong" v-show="uwrong">只能填字母</span>
        </div>
      </label>
      <label for="password">
        <span class="label_text">密&nbsp;&nbsp;&nbsp;码:</span>
        <input v-model="password" type="password" name="password" id="password">
        <div>
          <span class="wrong" v-show="pwrong">只能有数字</span>
        </div>
      </label>
      <b-button class="btn btn-success btn-lg" @click="handleLoginClick($event)">登录</b-button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      uwrong: false,
      pwrong: false
    }
  },
  methods: {
    handleLoginClick (e) {
      e.preventDefault()
      if (!this.username || !this.password) return alert('不能为空')
      if (this.uwrong || this.pwrong) return alert('格式不正确')

      this.login(this.username, this.password)
      // this.$router.push('/admin')
    },
    async login (username, password) {
      try {
        await axios({
          url: 'http://localhost:6060/login',
          method: 'POST',
          data: {
            username,
            password
          }
        })
          .then((res, err) => {
            if (err) throw new Error('error')
            if (res.data.code !== 0) return alert(res.data.msg)
            if (res.data.code === 0) this.$router.push('/admin')
          })
      } catch (err) {
        console.log(err)
      }
    }
  },
  directives: {
    username: {
      // 组件渲染时执行一次, 获取元素绑定事件, vnode.context 是当前 vm 实例
      inserted (el, binding, vnode) {
        const that = vnode.context
        el.addEventListener('input', e => {
          const username = e.target.value
          if (!/^[A-Za-z]+$/.test(username) && username) {
            that.uwrong = true
          } else {
            that.uwrong = false
          }
          that.username = that.uwrong ? '' : username
        })
      }
    },
    password: {
      inserted (el, binding, vnode) {
        el.addEventListener('input', e => {
          const password = e.target.value
          const that = vnode.context
          if (!/^[A-Za-z]+$/.test(password) && password) {
            that.pwrong = true
          } else {
            that.pwrong = false
          }
          that.password = that.pwrong ? '' : password
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_handle.scss';
.login_container {
  height: 100vh;
  position: relative;
  @include bk_color("background_color1");
  form {
    @include bk_color("background_color2");
    width: 40vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: .125rem .125rem .325rem;
    border-radius: 0.625rem;
    label {
      width: 100%;
      margin-top: 0.625rem;
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: 1.125rem;
      input[type=text],
      input[type=password] {
        margin-left: 1rem;
        @include f_color("font_color2");
        @include bk_color("background_color5");
        box-shadow: none;
        border: none;
        &:focus {
          @include bk_color("background_color6");
          outline: none;
        }
      }
      .label_text {
        width: 5rem;
        @include f_color("font_color1");
      }
      div {
        width: 6rem;
      }
      .wrong {
        font-size: .6rem;
        overflow: hidden;
        margin-left: .325rem;
        @include f_color("font_color0");
      }
    }
    button {
      margin-top: 5.5rem;
      align-self: flex-end;
      border: none;
    }
  }
}
</style>
