<template>
  <div class="formcontr_container">
    <form>
      <label for="username">用户名:</label>
      <input type="text" id="username">
      <label for="password">密&nbsp;&nbsp;&nbsp;码:</label>
      <input type="text" id="password">
      <label for="gender">性别</label>
      <div>
        <b-form-select v-model="selGender" :options="options" id="gender"></b-form-select>
        selected: {{ selGender }}
      </div>
      <label for="age">年&nbsp;&nbsp;&nbsp;龄:</label>
      <input type="number" id="age">
      <b-button class="sub_info" variant="primary">添加/修改</b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormContr',
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.formcontr_container {
  position: relative;
  height: 30rem;
  // width: 20vw;
  flex: 1;
  form {
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: .125rem .125rem .325rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 1rem 0rem 1rem 1rem;
    padding: 1.25rem 2.5rem 1.25rem 2.5rem;
    input[type=text] {
      color: #fff;
      background-color: #eee;
      box-shadow: none;
      border: none;
      &:focus {
        background-color: #999;
        outline: none;
      }
    }
    .sub_info {
      margin-top: 50%;
      color: #fff;
    }
  }
}
</style>
