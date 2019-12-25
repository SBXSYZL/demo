import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/foodNews',
        component: resolve => require(['../views/FoodNews.vue'], resolve)
      },
      {
        path: '/recipe',
        component: resolve => require(['../views/Recipe.vue'], resolve)
      },
      {
        path: '/foodIllustratedBook',
        component: resolve => require(['../views/FoodIllustratedBook.vue'], resolve)
      },
      {
        path: '/newsDetails',
        component: resolve => require(['../views/NewsDetails.vue'], resolve)
      },
      {
        path: '/forum',
        component: resolve => require(['../views/Forum.vue'], resolve)
      },
      {
        path: '/',
        redirect: '/foodNews'
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
  },
  {
    path: '/login',
    name: 'index',
    component: Login
  },
  {
    path: '/',
    redirect: 'login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BABEL_ENV,
  routes
})

export default router
