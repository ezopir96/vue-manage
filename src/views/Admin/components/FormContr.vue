<template>
  <div class="formcontr_container">
    <form>
      <label for="username">用户名:<span v-show="uwrong">格式不对</span></label>
      <input type="text" id="username" v-model="username">
      <label for="password">密&nbsp;&nbsp;&nbsp;码:<span v-show="pwrong">只能有数字</span></label>
      <input type="text" id="password" v-model="password">
      <label for="gender">性别</label>
      <div>
        <b-form-select v-model="selGender" :options="options" id="gender" class="gender_sel"></b-form-select>
      </div>
      <label for="age">年&nbsp;&nbsp;&nbsp;龄:</label>
      <input type="number" id="age" v-model="age">
      <b-button class="sub_info" variant="primary" @click="handlePutInfo">添加/修改</b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormContr',
  props: ['handleAddInfoFromChildren'],
  data () {
    return {
      username: '',
      password: '',
      age: 0,
      selGender: 2,
      options: [
        { value: 0, text: '男' },
        { value: 1, text: '女' },
        { value: 2, text: '保密' }
      ],
      uwrong: false,
      pwrong: false
    }
  },
  methods: {
    handlePutInfo () {
      let gender = ''

      if (this.pwrong || this.uwrong) return alert('用户名密码格式不对')

      if (this.selGender === 0) gender = '男'
      if (this.selGender === 1) gender = '女'
      if (this.selGender === 2) gender = '保密'
      const info = {
        username: this.username,
        password: this.password,
        gender,
        age: this.age
      }
      this.handleAddInfoFromChildren(info)
    },
    editInfo (info) {
      // 通过父组件调用来收到要修改的信息
      this.username = info.username
      this.password = info.password
      if (info.gender === '男') this.selGender = 0
      if (info.gender === '女') this.selGender = 1
      if (info.gender === '保密') this.selGender = 2
      this.age = info.age
    }
  },
  watch: {
    username (un) {
      if (/([A-Za-z]){2,}/.test(un) && /[0-9]{2,}/.test(un)) {
        console.log(1)
        this.uwrong = false
      } else {
        console.log(2)
        this.uwrong = true
      }
    },
    password (pw) {
      if (/[0-9a-z]{6,}$/.test(pw)) {
        this.pwrong = false
      } else {
        this.pwrong = true
      }
    },
    age (age) {
      if (age !== '') this.age = Math.min(Math.max(age, 1), 200)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_handle.scss';
.formcontr_container {
  position: relative;
  height: 30rem;
  // width: 20vw;
  flex: 1;
  form {
    @include bk_color("background_color2");
    border-radius: 1rem;
    box-shadow: .125rem .125rem .325rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 1rem 0rem 1rem 1rem;
    padding: 1.25rem 2.5rem 1.25rem 2.5rem;
    label {
      margin-top: 1rem;
      @include f_color("font_color1");
      span {
        font-size: .6rem;
        overflow: hidden;
        color: rgb(233, 37, 37) !important;
      }
    }
    input[type=text],
    input[type=number] {
      @include f_color("font_color2");
      @include bk_color("background_color5");
      // background-color: #999;
      box-shadow: none;
      border: none;
      padding: .5rem;
      &:focus {
        @include bk_color("background_color6");
        // background-color: #777;
        outline: none;
      }
    }
    .gender_sel {
      @include bk_color("background_color5");
      @include f_color("font_color2");
    }
    .sub_info {
      margin-top: 30%;
      @include f_color("font_color3");
    }
  }
}
</style>
