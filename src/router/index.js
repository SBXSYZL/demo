import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/foodNews',
        name: 'foodNews',
        component: resolve => require(['../views/FoodNews.vue'], resolve)
      },
      {
        path: '/recipe',
        name: 'recipe',
        component: resolve => require(['../views/Recipe.vue'], resolve)
      },
      {
        path: '/foodIllustratedBook',
        name: 'foodIllustratedBook',
        component: resolve => require(['../views/FoodIllustratedBook.vue'], resolve)
      },
      {
        path: '/',
        redirect: 'foodNews'
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BABEL_ENV,
  routes
})

export default router
