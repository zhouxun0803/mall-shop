import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: localStorage.getItem("username") || "",
    theme: localStorage.getItem("themeColor") || "#1e9fff",
  },
  mutations: {
    login(state, data) {
      state.username = data
      localStorage.setItem("username", data)
    },
    updateTheme(state, val) {
      state.theme = val;
      localStorage.setItem("themeColor", val);
    }
  },
  actions: {
  },
  modules: {
  }
})
