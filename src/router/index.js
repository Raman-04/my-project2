import Vue from 'vue'
import VueRouter from 'vue-router'
import SIPView from '../views/SIPView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SIP',
    component: SIPView
  },
  {
    path: '/lumpsum',
    name: 'lumpsum',
    component: () => import(/* webpackChunkName: "lumpsum" */ '../views/LUMPSUMView.vue')
  },
  {
    path: '/cagr',
    name: 'cagr',
    component: () => import(/* webpackChunkName: "cagr" */ '../views/CAGRView.vue')
  },
  {
    path: '/inflation',
    name: 'inflation',
    component: () => import(/* webpackChunkName: "inflation" */ '../views/INFLATIONView.vue')
  },
  {
    path: '/stepupsip',
    name: 'stepupsip',
    component: () => import(/* webpackChunkName: "stepupsip" */ '../views/STEPUPSIPView.vue')
  },
  {
    path: '/deflation',
    name: 'deflation',
    component: () => import(/* webpackChunkName: "deflation" */ '../views/DEFLATIONView.vue')
  },
]

const router = new VueRouter({
  mode:'history',
  base:process.env.BASE_URL,
  routes
})

export default router
