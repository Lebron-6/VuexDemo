<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <a-button
      type="primary"
      @click="addItemToList"
    >添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="(e) => {checkboxStatusChange(e, item.id)}"
        >{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneItemLen }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="showKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="showKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="showKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      // list: []
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  methods: {
    handleInputChange (e) {
      // this.$store.state.inputValue = e.target.value
      this.$store.commit('setInputValue', e.target.value)
    },
    addItemToList () {
      if (!this.inputValue.trim()) {
        return this.$message.warning('文本框内容不能为空!')
      } else {
        this.$store.commit('addItem')
      }
    },
    deleteItemById (id) {
      this.$store.commit('deleteItem', id)
    },
    checkboxStatusChange (e, id) {
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeCheckedStatus', param)
    },
    clear () {
      this.$store.commit('clearDoneItem')
    },
    changeList (key) {
      this.$store.commit('changeShowKey', key)
    }
  },
  computed: {
    ...mapState(['list', 'inputValue', 'showKey']),
    ...mapGetters(['unDoneItemLen', 'infoList'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
