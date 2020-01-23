import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Base/Home.vue'
import Login from '../views/Base/Login'
import ArticleDetail from '../views/User/ArticleDetail.vue'
import LikeDetail from '../views/User/LikeDetail.vue'

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
        path: '/userInfo/:userId',
        name: 'userInfo',
        component: resolve => require(['../views/User/UserInfo.vue'], resolve),
        children: [
          {
            path: '/likeDetail',
            name: 'like',
            component: LikeDetail,
          },
          {
            path: '/articleDetail',
            name: 'article',
            component: ArticleDetail,
          },
        ]
      },
      {
        path: '/foodNews',
        component: resolve => require(['../views/News/FoodNews.vue'], resolve)
      },
      {
        path: '/WriteNews',
        component: resolve => require(['../views/News/WriteNews'], resolve)
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
        path: '/WriteForum',
        component: resolve => require(['../views/Forum/WriteForum.vue'], resolve)
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

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
export default router
