import Vue from 'vue'
import VueRouter from 'vue-router'
import Otels from '../pages/Otels.vue'
import AddOtel from '../pages/AddOtel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Otels',
    component: Otels
  },
  {
    path: '/AddOtel',
    name: 'AddOtel',
    component: AddOtel
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
