import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import decodeToken from 'jwt-decode'

// Pages

const External = () =>
  import(
    /* webpackChunkName: "external-view" */ '@/views/external/External.vue'
  )
const RegistrationInfo = () =>
  import(
    /* webpackChunkName: "registration-info-view" */ '@/views/app/RegistrationInfo.vue'
  )
const Container = () =>
  import(/* webpackChunkName: "container-view" */ '@/views/app/Container.vue')
const Projects = () =>
  import(/* webpackChunkName: "projects-view" */ '@/views/app/Projects.vue')
const Medals = () =>
  import(/* webpackChunkName: "medals-view" */ '@/views/app/Medals.vue')
const Profile = () =>
  import(/* webpackChunkName: "profile" */ '@/views/app/Profile.vue')
const UserAcceptance = () => import(/* webpackChunkName: "user-acceptance" */ '@/views/app/UserAcceptance.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
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
        name: 'projects',
        component: Projects,
        meta: {
          public: false
        }
      },
      {
        path: '/medals',
        name: 'medals',
        component: Medals,
        meta: {
          public: false
        }
      },
      {
        path: '/user-acceptance',
        name: 'user-acceptance',
        component: UserAcceptance,
        meta: {
          public: false
        }
      },
      {
        path: '/dados-cadastrais',
        name: 'registry-data',
        component: RegistrationInfo,
        meta: {
          public: false
        }
      },
      {
        path: '/:userName-:userId',
        name: 'profile',
        component: Profile,
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

const tokenHasBeenExpired = () => {
  const token = store.getters.userToken
  const decodedToken = decodeToken(token)
  const currentTime = new Date().getTime() / 1000

  return currentTime > decodedToken.exp
}

const logoutUser = () => {
  store.commit('LOGOUT_CURRENT_USER')
}

router.beforeEach((to, from, next) => {
  if (!to.meta.public) {
    if (tokenHasBeenExpired()) {
      logoutUser()
      next({ name: 'landing' })
    }
    if (!store.getters.isLoggedIn) {
      return next({ path: '/' })
    }
  } else {
    if (store.getters.isLoggedIn) {
      return next({ path: '/projects' })
    }
  }
  next()
})

export default router
