import dayjs from 'dayjs'
import store from './store/store'
import fx from 'money'

fx.base = "NOK"
fx.rates = {
 "EUR": 0.10,
 "GBP": 0.084,
 "DKK": 0.74,
 "ISK": 14.28,
 "SEK": 1.04,
 "NOK": 1
}

export function formatDate(date) {
 return dayjs(date).format('ddd D MMM YYYY @ H:mm')
}

export function formatCost(price) {
 const selectedCurrency = store.getters.selectedCurrency
 return new Intl.NumberFormat(undefined, {style: 'currency', currency: selectedCurrency}).format(Number.parseFloat(fx.convert(price, {from: 'NOK', to: selectedCurrency})))
}