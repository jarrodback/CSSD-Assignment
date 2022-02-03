import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
 state: () => ({
  selectedCurrency: 'NOK'
 }),
 mutations: {
  updateSelectedCurrency (state, selectedCurrency) {
   state.selectedCurrency = selectedCurrency
  }
 },
 actions: {
  updateSelectedCurrency({ commit }, selectedCurrency) {
   commit('updateSelectedCurrency', selectedCurrency)
  }
 },
 getters: {
  selectedCurrency: state => state.selectedCurrency
 }
})