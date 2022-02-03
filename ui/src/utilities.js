import dayjs from 'dayjs'
export function formatDate(date) {
 return dayjs(date).format('ddd D MMM YYYY @ H:mm')
}

export function formatCost(price) {
 return new Intl.NumberFormat(undefined, {style: 'currency', currency: 'GBP'}).format(Number.parseInt(price))
}