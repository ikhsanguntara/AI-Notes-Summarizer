import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patient: {}
  },
  plugins: [createPersistedState()],
  mutations: {
    selectItem(state, patient) {
      state.patient = patient
      router.replace("/patient_detail")
    }
  },
  actions: {

  }
})
