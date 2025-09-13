import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './views/LoginPage'
import Main from './views/Main'
import Login from './components/Login'
import ForgotPass from './components/ForgotPass'
// import { mapActions } from 'vuex'
import Dashboard from './components/Dashboard'
import Hospital from './components/Hospital'
import Doctor from './components/Doctor'
import Patient from './components/Patient'
import ChangePassword from './components/ChangePassword'
import User from './components/User'
import PatientDetail from './components/PatientDetail'
import Biography from './components/Biography'
import MedicalHistory from './components/MedicalHistory'
import Test from './components/Test'
import Tes from './components/Tes'
import AddNew from './components/AddNew'
import Payment from './components/Payment'
import Timeline from './components/Timeline'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage,
      children: [
        {
          path: '/',
          name: 'Login',
          component: Login
        },
        {
          path: '/forgotpass',
          name: 'forgotpass',
          component: ForgotPass
        },
      ]
    },
    {
      path: '/dashboard',
      component: Main,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/hospital',
          name: 'hospital',
          component: Hospital
        },
        {
          path: '/doctor',
          name: 'doctor',
          component: Doctor
        },
        {
          path: '/patient',
          name: 'patient',
          component: Patient
        }, 
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/changepassword',
          name: 'changepassword',
          component: ChangePassword
        },
        {
          path: '/patient_detail',
          component: PatientDetail
        },
        {
          path: '/biography',
          component: Biography
        },
        {
          path: '/medical_history',
          component: MedicalHistory
        },
        {
          path: '/test',
          component: Test
        },
        {
          path: '/tes',
          component: Tes
        },
        {
          path: '/add_new',
          component: AddNew
        },
        {
          path: '/payment',
          component: Payment
        },
        {
          path: '/timeline',
          component: Timeline
        }
        
      ]
    },

  ]
})

// path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
