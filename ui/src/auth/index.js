import store from "../store/store";

/**
 * Check if the user transitioning the route is logged in.
 */
export const isAuthenticated = (to, from, next) => {
    if (store.state.loggedIn) {
        next();
    } else {
        next({ path: "/login" });
    }
};

/**
 * Check if the user transitioning the route is an admin.
 */
export const isOperator = (to, from, next) => {
    if (store.getters.user.type == "Operator") {
        next();
    } else {
        next({ path: "/forbidden" });
    }
};

/**
 * Check if the user transitioning the route is logged out.
 */
export const isLoggedOut = (to, from, next) => {
    if (store.state.loggedIn) {
        next({ path: "/my-bills" });
    } else {
        next();
    }
};
