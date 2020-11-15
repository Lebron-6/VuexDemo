import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextId: 5,
    showKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, val) {
      state.inputValue = val
    },
    addItem (state) {
      const item = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(item)
      state.nextId += 1
      state.inputValue = ''
    },
    deleteItem (state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeCheckedStatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    clearDoneItem (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeShowKey (state, key) {
      state.showKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        // console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneItemLen (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.showKey === 'all') {
        return state.list
      }
      if (state.showKey === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if (state.showKey === 'done') {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  },
  modules: {
  }
})
