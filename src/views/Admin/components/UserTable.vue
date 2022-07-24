<template>
  <div class="usertable_container">
    <b-table
      hover
      :items="items"
      :fields="fields"
      select-mode="multi"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <template #cell(username)="row">
        <div class="username_content" @click="stopEvent($event)" @dblclick="showChangeUsername($event)">
          <p>{{ row.item.username }}</p>
          <input class="change_username" type="text" :value="row.item.username" :data-id="row.item.username" @focusout="changeUsername($event)">
        </div>
      </template>
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
        </template>
        <template v-else>
          <span aria-hidden="true">X</span>
        </template>
      </template>
      <!-- 🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋 -->
      <template #cell(option)="row">
        <b-button class="btn btn-info btn-sm" @click="handleSendEdit(row.item)">
          编辑
        </b-button>
        &nbsp;
        <b-button class="btn btn-danger btn-sm" @click="deleteOne(row.item.username)">
          删除
        </b-button>
      </template>
      <!-- 🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋 -->
    </b-table>
    <p>
      <b-button class="bottom_btn" variant="primary" size="sm" @click="selectAllRows">全选</b-button>
      <b-button class="bottom_btn" variant="primary" size="sm" @click="clearSelected">取消</b-button>
      <b-button class="bottom_btn" variant="danger" size="sm" @click="deleteMany">删除选中</b-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: ['pitems', 'handleDeleteOne', 'handleDeleteMany', 'handleChangeUsername', 'handleEdit'],
  data () {
    return {
      // 定义字段对象数组, 键名是表格内容的键名映射, label 是展示在表格顶部的名称
      fields: [
        { key: 'selected', label: '状态' },
        { key: 'username', label: '用户名' },
        { key: 'gender', label: '性别' },
        { key: 'age', label: '年龄' },
        { key: 'option', label: '操作' }
      ],
      items: this.pitems,
      selected: []
    }
  },
  methods: {
    onRowSelected (items) {
      console.log(items)
      this.selected = items
    },
    selectAllRows () {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected () {
      this.$refs.selectableTable.clearSelected()
    },
    showChangeUsername (e) {
      const ff = e.target
      ff.nextSibling.style.visibility = 'visible'
      ff.nextSibling.focus()
    },
    // 显示修改用户名输入框
    changeUsername (e) {
      const newName = e.target.value
      const oldName = e.target.getAttribute('data-id')
      if (newName === oldName) return (e.target.style.visibility = 'hidden')
      this.handleChangeUsername(newName, oldName)
      e.target.style.visibility = 'hidden'
    },
    // 阻止事件继续捕获防止双击前点击到列表数据
    stopEvent (e) {
      e.stopImmediatePropagation()
    },
    // 删除(用属性传值时, 父组件数据变化时子组件无法改变)
    deleteOne (username) {
      const status = confirm('确定删除这个数据吗?')
      if (!status) return
      this.handleDeleteOne(username)
    },
    deleteMany () {
      if (this.selected.length === 0) return alert('没有选中内容')
      const status = confirm('确定删除选中数据吗?')
      if (!status) return
      this.handleDeleteMany(this.selected)
    },
    handleSendEdit (info) {
      console.log(info)
      this.handleEdit(info)
    }
  },
  watch: {
    pitems: {
      deep: true,
      immediate: true,
      handler (items) {
        console.log('父组件变化了')
        this.items = items
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/_handle.scss';
.usertable_container {
  // width: 100%;
  flex: 3;
  height: 30rem;
  border-radius: 1rem;
  box-shadow: .125rem .125rem .325rem;
  margin: 1rem 1rem 1rem 1rem;
  padding: 1.25rem 1.25rem 1.25rem 1.25rem;
  // background-color: #fff;
  @include bk_color("background_color2");
  * {
    @include f_color("font_color2");
  }
  div {
    height: 90%;
  }
  .controler {
    margin-top: 1.25rem;
  }
  button {
    @include f_color("font_color2");
  }
  .bottom_btn {
    margin-left: 1.25rem;
  }
  .btn {
    @include f_color("font_color8");
  }
}
.username_content {
  position: relative;
  z-index: 99;
  height: 100%;
  width: 100%;
  .change_username {
    position: absolute;
    top: 0;
    visibility: hidden;
  }
}
</style>
