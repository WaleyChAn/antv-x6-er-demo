import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DemoER',
      component: () => import('@/views/demo/er/index')
    }
  ]
})
