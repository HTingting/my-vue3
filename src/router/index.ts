import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// @ts-ignore
import Layout from "@/layouts";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/homepage",
    children: [
      {
        path: "/homepage",
        name: "homepage",
        component: () => import("../views/homepage/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/more",
        name: "more",
        component: () => import("../views/more/index.vue"),
        meta: {
          title: "更多",
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
