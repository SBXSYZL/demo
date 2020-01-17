import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Base/Home.vue'
import Login from '../views/Base/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/userManage',
        component: resolve => require(['../views/User/User.vue'], resolve)
      },
      {
        path: '/roleManage',
        component: resolve => require(['../views/User/RoleManage.vue'], resolve)
      },
      {
        path: '/foodNews',
        component: resolve => require(['../views/News/FoodNews.vue'], resolve)
      },
      {
        path: '/writeRecipe',
        component: resolve => require(['../views/Recipe/WriteRecipe.vue'], resolve)
      },
      {
        path: '/recipe',
        component: resolve => require(['../views/Recipe/Recipe.vue'], resolve)
      },
      {
        path: '/foodIllustratedBook',
        component: resolve => require(['../views/Food/FoodIllustratedBook.vue'], resolve)
      },

      {
        path: '/foodrecipedetails',
        component: resolve => require(['../views/Recipe/FoodrecipeDetails.vue'], resolve)
      },
      {
        path: '/foodIllustratedBookDetail',
        component: resolve => require(['../views/Food/FoodIllustratedBookDetail'], resolve)
      },
      {
        path: '/newsDetails',
        component: resolve => require(['../views/News/NewsDetails.vue'], resolve)
      },
      {
        path: '/write',
        component: resolve => require(['../views/Food/Write.vue'], resolve)
      },
      {
        path: '/forum',
        component: resolve => require(['../views/Forum/Forum.vue'], resolve)
      },
      {
        path: '/ForumDetial',
        component: resolve => require(['../views/Forum/ForumDetial.vue'], resolve)
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
