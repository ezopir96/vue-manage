<template>
  <div data-theme="dark" class="pg_top">
    <nav-bar></nav-bar>
    <div class="user_panel">
      <form-contr ref="form" :handleAddInfoFromChildren="handleAddInfoFromChildren"></form-contr>
      <user-table
      :pitems="items"
      :handleDeleteOne="handleDeleteOne"
      :handleDeleteMany="handleDeleteMany"
      :handleChangeUsername="handleChangeUsername"
      :handleEdit="handleEdit"></user-table>
    </div>
  </div>
</template>

<script>
import NavBar from './components/Nav_bar.vue'
import FormContr from './components/FormContr.vue'
import UserTable from './components/UserTable.vue'
import axios from 'axios'
export default {
  name: 'AdminPanel',
  components: {
    FormContr,
    UserTable,
    NavBar
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    // 初始化获取用户数据列表
    async getUserInfo () {
      try {
        await axios({
          url: 'http://localhost:6060/getInfo',
          method: 'GET'
        })
          .then((res, err) => {
            if (err) throw new Error('请求列表错误')
            if (res.data.code === 0) {
              res.data.list.forEach(item => {
                // 直接返回数组赋值给实例会造成视图不渲染的错误, 需要逐条添加
                this.items.push({
                  isActive: false,
                  ...item
                })
              })
            }
          })
      } catch (err) {
        console.log(err)
      }
    },
    async handleAddInfoFromChildren (info) {
      await axios({
        url: 'http://localhost:6060/addInfo',
        method: 'POST',
        data: { ...info }
      })
        .then((res, err) => {
          if (err) throw new Error('请求失败')
          // 如果是添加文件且成功
          if (res.data.code === 0) {
            const info = res.data.info
            this.items.push({
              isActive: false,
              ...info
            })
          }
          // 如果是修改文件且成功
          if (res.data.code === 3) {
            const { username, password, gender, age } = res.data.info
            this.items.forEach(item => {
              if (item.username === username) {
                item.password = password
                item.gender = gender
                item.age = age
              }
            })
          }
        })
    },
    async handleDeleteOne (username) {
      await axios({
        url: `http://localhost:6060/deleteOne/${username}`,
        method: 'GET'
      })
        .then((res, err) => {
          if (err) return alert('请求失败')
          // 返回 0 说明删除成功
          if (res.data.code === 0) {
            this.items = []
            // 正常情况可以直接再次请求数据
            // 但是 由于nodemon原因, 删除数据后后端服务器会重启, 中间有延迟
            // 所以写成了后端返回新数据, 前端接收后重新修改数据
            res.data.list.forEach(item => {
              this.items.push({
                isActive: false,
                ...item
              })
            })
          }
        })
    },
    // 删除多条数据
    async handleDeleteMany (userList) {
      const nameList = []
      userList.forEach(item => {
        nameList.push(item.username)
      })
      await axios({
        url: 'http://localhost:6060/deleteMany',
        method: 'POST',
        data: nameList
      })
        .then((res, err) => {
          if (err) return alert('请求失败')
          if (res.data.code === 0) {
            this.items = []
            // 正常情况可以直接再次请求数据
            // 但是 由于nodemon原因, 删除数据后后端服务器会重启, 中间有延迟
            // 所以写成了后端返回新数据, 前端接收后重新修改数据
            res.data.list.forEach(item => {
              this.items.push({
                isActive: false,
                ...item
              })
            })
          }
        })
    },
    async handleChangeUsername (newName, oldName) {
      console.log(newName, oldName)
      await axios({
        url: 'http://localhost:6060/changename',
        method: 'POST',
        data: {
          newName,
          oldName
        }
      })
        .then((res, err) => {
          if (err) return alert('请求失败')
          if (res.data.code === 1) return alert('已经存在该用户')
          if (res.data.code === 0) {
            this.items = []
            // 正常情况可以直接再次请求数据 🔥
            // 但是 由于nodemon原因, 删除数据后后端服务器会重启, 中间有延迟
            // 所以写成了后端返回新数据, 前端接收后重新修改数据
            res.data.list.forEach(item => {
              this.items.push({
                isActive: false,
                ...item
              })
            })
          }
        })
    },
    handleEdit (info) {
      console.log(info)
      // this.$children.editInfo(info)
      this.$refs.form.editInfo(info)
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_handle.scss';
.pg_top {
  height: 100vh;
  .user_panel {
    display: flex;
    flex: 1;
    @include bk_color("background_color4");
    h1 {
      background-color: #fff;
    }
  }
}
</style>
