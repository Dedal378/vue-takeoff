import Vue from 'vue'
import VueRouter from 'vue-router'
// import AuthGuard from './auth-guard';
import Home from "@/components/Home";
import Login from "@/components/Auth/Login";
import Registration from "@/components/Auth/Registration";


Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
/*  {
    path: '/list',
    name: 'list',
    component: AdList,
    beforeEnter: AuthGuard
  },*/
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'reg',
    component: Registration
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
