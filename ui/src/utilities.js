import dayjs from "dayjs";
import store from "./store/store";
import fx from "money";

/**
 * Configure money.js.
 * Sets the base currency to NOK.
 * Configures the conversion rates for each currency based on NOK.
 */
fx.base = "NOK";
fx.rates = {
    EUR: 0.1,
    GBP: 0.084,
    DKK: 0.74,
    ISK: 14.28,
    SEK: 1.04,
    NOK: 1,
};

/**
 * Formats a date string into the format ddd D MMM YYYY @ H:mm.
 * @param date
 * @returns {string}
 */
export function formatDate(date) {
    return dayjs(date).format("ddd D MMM YYYY @ H:mm");
}

/**
 * Formats the cost based on the selected currency in the navbar.
 * @param cost
 * @returns {string}
 */
export function formatCost(cost) {
    const selectedCurrency = store.getters.selectedCurrency;
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: selectedCurrency,
    }).format(
        Number.parseFloat(
            fx.convert(cost, { from: "NOK", to: selectedCurrency })
        )
    );
}

/**
 * Check if the user is logged in
 * @returns {Boolean}
 */
export function isUserAuthenticated() {
    return store.getters.loggedIn;
}
