import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// Pages

const External = () => import(/* webpackChunkName: "external-view" */ '@/views/external/External.vue')
const RegistrationInfo = () => import(/* webpackChunkName: "registration-info-view" */ '@/views/app/RegistrationInfo.vue')
const Container = () => import(/* webpackChunkName: "container-view" */ '@/views/app/Container.vue')
const Projects = () => import(/* webpackChunkName: "projects-view" */ '@/views/app/Projects.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: External,
    meta: {
      public: true
    }
  },
  {
    path: '/',
    component: Container,
    meta: {
      public: false
    },
    children: [
      {
        path: '/projects',
        name: 'Projects',
        component: Projects,
        meta: {
          public: false
        }
      },
      {
        path: '/dados-cadastrais',
        name: 'Dados cadastrais',
        component: RegistrationInfo,
        meta: {
          public: false
        }
      }
    ]
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.public && !store.getters.isLoggedIn) {
    return next({ path: '/' })
  } else if (to.meta.public && store.getters.isLoggedIn) {
    return next({ path: '/projects' })
  }
  next()
})

export default router
