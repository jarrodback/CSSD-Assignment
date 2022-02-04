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
        updateLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
        },

        /**
         * Updates the user state in the state.
         * @param state
         * @param payload
         */
        updateUser(state, user) {
            state.user = user;
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

        /**
         * Calls the updateLoggedIn mutation.
         * @param loggedIn
         */
        updateLoggedIn({ commit }, loggedIn) {
            commit("updateLoggedIn", loggedIn);
        },

        /**
         * Calls the updateUser mutation.
         * @param loggedIn
         */
        updateUser({ commit }, user) {
            commit("updateUser", user);
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
