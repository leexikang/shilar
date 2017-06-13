import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Attentance from '@/components/Attendance'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hello
    },
    {
      path: '/:date/attendance',
      name: 'Attendance',
      component: Attentance
    }

  ]
})

