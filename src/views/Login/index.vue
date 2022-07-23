<template>
  <div class="login_container">
    <form class="login_form">
      <label for="username">
        <span>用户名:</span>
        <input v-model="username" type="text" name="username" id="username">
        <div>
          <span class="wrong" v-show="uwrong">只能填字母</span>
        </div>
      </label>
      <label for="password">
        <span>密&nbsp;&nbsp;&nbsp;码:</span>
        <input v-model="password" type="password" name="password" id="password">
        <div>
          <span class="wrong" v-show="pwrong">只能有数字</span>
        </div>
      </label>
      <button @click="handleLoginClick($event)">登录</button>
    </form>
    {{ username }} {{ password }} {{ uwrong }}
  </div>
</template>

<script>
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
      this.$router.push('/admin')
    }
  },
  watch: {
    username (un) {
      if (!/^[A-Za-z]+$/.test(un) && un) {
        this.uwrong = true
      } else {
        this.uwrong = false
      }
    },
    password (pw) {
      if (!/^\d{3,}$/.test(pw) && pw) {
        this.pwrong = true
      } else {
        this.pwrong = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  height: 100vh;
  position: relative;
  background-color: #eee;
  form {
    background-color: #fff;
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
        color: #fff;
        background-color: #eee;
        box-shadow: none;
        border: none;
        &:focus {
          background-color: #999;
          outline: none;
        }
      }
      span {
        width: 5rem;
      }
      div {
        width: 6rem;
      }
      .wrong {
        font-size: .6rem;
        overflow: hidden;
        color: pink;
      }
    }
    button {
      width: 6.25rem;
      height: 2rem;
      margin-top: 5.5rem;
      align-self: flex-end;
      border: none;
    }
  }
}
</style>
