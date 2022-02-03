import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
 state: () => ({ 
  selectedCurrency: 'NOK'
 }),
 mutations: {
  /**
   * Updates the selectedCurrency in the state.
   * @param state
   * @param selectedCurrency
   */
  updateSelectedCurrency (state, selectedCurrency) {
   state.selectedCurrency = selectedCurrency
  }
 },
 actions: {
  /**
   * Calls the updateSelectedCurrency mutation.
   * @param selectedCurrency
   */
  updateSelectedCurrency({ commit }, selectedCurrency) {
   commit('updateSelectedCurrency', selectedCurrency)
  }
 },
 getters: {
  /**
   * Gets the selectedCurrency from the state.
   */
  selectedCurrency: state => state.selectedCurrency
 }
})