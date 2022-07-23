<template>
  <div class="pg_top">
    <h1>This is Nav</h1>
    <div class="user_panel">
      <form-contr></form-contr>
      <user-table :pitems="items"></user-table>
    </div>
  </div>
</template>

<script>
import FormContr from './components/FormContr.vue'
import UserTable from './components/UserTable.vue'
export default {
  name: 'AdminPanel',
  components: {
    FormContr,
    UserTable
  },
  data () {
    return {
      items: [
        { isActive: true, username: '张三', gender: '男', age: 40 },
        { isActive: false, username: '张一', gender: '男', age: 21 },
        { isActive: false, username: '张二', gender: '男', age: 89 },
        { isActive: true, username: '张四', gender: '男', age: 38 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.pg_top {
  height: 100vh;
  .user_panel {
    display: flex;
    flex: 1;
    background-color: #eee;
    h1 {
      background-color: #fff;
    }
  }
}
</style>
