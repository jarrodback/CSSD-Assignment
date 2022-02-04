import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        // Handle storing and retrieving data from the session storage
        // as the store is stateless.
        createPersistedState({
            storage: sessionStorage,
        }),
    ],
    state: () => ({
        selectedCurrency: "NOK",
        loggedIn: false,
        user: {
            id: null,
            username: null,
            type: null,
        },
    }),
    mutations: {
        /**
         * Updates the selectedCurrency in the state.
         * @param state
         * @param selectedCurrency
         */
        updateSelectedCurrency(state, selectedCurrency) {
            state.selectedCurrency = selectedCurrency;
        },

        /**
         * Updates the loggedIn state in the state.
         * @param state
         * @param payload
         */
        setLoggedIn(state, payload) {
            state.loggedIn = payload;
        },

        /**
         * Updates the user state in the state.
         * @param state
         * @param payload
         */
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        /**
         * Calls the updateSelectedCurrency mutation.
         * @param selectedCurrency
         */
        updateSelectedCurrency({ commit }, selectedCurrency) {
            commit("updateSelectedCurrency", selectedCurrency);
        },
    },
    getters: {
        /**
         * Gets the selectedCurrency from the state.
         */
        selectedCurrency: (state) => state.selectedCurrency,

        /**
         * Gets the loggedIn state.
         */
        loggedIn: (state) => {
            return state.loggedIn;
        },

        /**
         * Gets the logged in user.
         */
        user: (state) => {
            return state.user;
        },
    },
});
