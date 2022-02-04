import Vue from "vue";
import VueRouter from "vue-router";
import MyBills from "@/views/MyBills";
import PayBill from "@/views/PayBill";
import Help from "@/views/Help";
/**
 * Import Vue Router.
 */
Vue.use(VueRouter)

/**
 * Declare routes for the my bills, pay bills, help routes.
 */
const routes = [
 {
  path: '/',
  redirect: '/my-bills'
 },
 {
  path: '/my-bills',
  name: 'MyBills',
  component: MyBills,
  meta: {
   title: 'My Bills'
  }
 },
 {
  path: '/my-bills/:id',
  name: 'PayBill',
  component: PayBill,
  meta: {
   title: 'Pay Bill'
  }
 },
 {
  path: '/help',
  name: 'Help',
  component: Help,
  meta: {
   title: 'Frequently Asked Questions (FAQ)'
  }
 }
]

/**
 * Creates an instance of Vue Router with history mode enables and injects the routes above.
 */
const router = new VueRouter({
 mode: 'history',
 base: process.env.BASE_URL,
 routes
})

/**
 * Sets the document title of each page before route enter.
 */
router.beforeEach((to, from, next) => {
 document.title = to.meta.title
 next()
})

export default router