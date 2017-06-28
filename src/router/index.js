import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Report from '@/components/Report'
import Attendance from '@/components/Attendance'
import ChoseAttendance from '@/components/ChoseAttendance'
import TrainingReport from '@/components/TrainingReport'
import TodayAttendance from '@/components/TodayAttendance'
import UserAttendances from '@/components/UserAttendances'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hello
    },
    // {
      // path: '/select',
      // name: 'ChoseAttendance',
      // component: 'ChoseAttendance'
    // },
    {
      path: '/training/:name/attendance/:date',
      name: 'Attendance',
      component: Attendance
    },
    {
      path: '/training/:name/report',
      name: 'TrainingReport',
      component: TrainingReport
    },
    {
      path: '/select',
      component: ChoseAttendance
    },
   {
     path: '/attendance/:training/:date',
     component: TodayAttendance,
     name: 'TodayAttendance',
   },
   {
    path: '/report',
    component: Report,
    name: 'Report'
   },
   {
    path: '/user/attendances',
    component: UserAttendances,
    name: 'UserAttendances' 
   }
  ]
})

