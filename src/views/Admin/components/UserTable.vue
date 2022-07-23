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
        <div class="username_content" @click="stopEvent($event)" @dblclick="changeUsername($event)">
          <p>{{ row.item.username }}</p>
          <input class="change_username" type="text" :value="row.item.username" @focusout="handleChangeUsername($event)">
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
      <template #cell(option)>
        <b-button class="btn btn-danger btn-sm">
          删除
        </b-button>
      </template>
      <!-- 🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋🐋 -->
    </b-table>
    <p>
      <b-button variant="primary" size="sm" @click="selectAllRows">全选</b-button>
      <b-button variant="primary" size="sm" @click="clearSelected">取消</b-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: ['pitems'],
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
      items: [
      ],
      selected: []
    }
  },
  methods: {
    onRowSelected (items) {
      this.selected = items
    },
    selectAllRows () {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected () {
      this.$refs.selectableTable.clearSelected()
    },
    changeUsername (e) {
      const ff = e.target
      ff.nextSibling.style.visibility = 'visible'
      ff.nextSibling.focus()
    },
    handleChangeUsername (e) {
      e.target.style.visibility = 'hidden'
    },
    stopEvent (e) {
      e.stopImmediatePropagation()
    }
  },
  mounted () {
    this.items = this._props.pitems
  }
}
</script>

<style lang="scss" scoped>
.usertable_container {
  // width: 100%;
  flex: 3;
  height: 30rem;
  border-radius: 1rem;
  box-shadow: .125rem .125rem .325rem;
  margin: 1rem 1rem 1rem 1rem;
  padding: 1.25rem 1.25rem 1.25rem 1.25rem;
  background-color: #fff;
  div {
    height: 90%;
  }
  .controler {
    margin-top: 1.25rem;
  }
  button {
    color: #fff;
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
