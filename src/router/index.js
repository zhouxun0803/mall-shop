import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {
      name: "Goods"
    },
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import("../views/Goods.vue"),
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import("../views/Product.vue"),
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import("../views/Category.vue"),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import("../views/Order.vue"),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import("../views/User.vue"),
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import("../views/Detail.vue"),
      },
      {
        path: 'editor',
        name: 'Editor',
        component: () => import("../views/Editor.vue"),
      },

    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== "Login") { // 判断是否已经登录过
    if (!store.state.username) {
      next({
        replace: true,
        name: "Login"
      })
      return;
    }
    next()
    return;
  }
  next();
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
