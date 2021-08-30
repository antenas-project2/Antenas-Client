<template>
  <div class="main-container h100">
    <Header />
    <div class="view-container d-flex w100">
      <Sidebar id="sidebar" />
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Sidebar from './Sidebar'
import Header from './Header'

export default {
  components: { Sidebar, Header },
  data() {
    return { completeLoading: false }
  },
  computed: {
    ...mapGetters(['userName', 'userRoleDisplay', 'userPhoto']),
    userInitials() {
      if (this.userName) {
        const splitedName = this.userName.split(' ')
        return (
          splitedName[0].charAt(0) +
          splitedName[splitedName.length - 1].charAt(0)
        ).toUpperCase()
      }
      return ''
    }
  },
  mounted() {
    Promise.all([
      this.$store.dispatch('loadCurrentUserInfo'),
      this.$store.dispatch('loadProjects'),
      this.$store.dispatch('loadMedals')
    ])
      .catch(err => this.$throwError(err))
      .finally(() => {
        this.completeLoading = true
      })
  },
  methods: {
    dropdownClick(action) {
      if (action === 'account' && this.$route.path !== '/dados-cadastrais') {
        this.$router.push('/dados-cadastrais')
      } else if (action === 'logout') {
        this.$store.commit('LOGOUT_CURRENT_USER')
        this.$store.commit('CLEAR_PROJECTS')
        this.$router.push('/')
      } else if (action === 'projects') {
        this.$router.push('/projects')
      } else if (action === 'medals') {
        this.$router.push('/medals')
      } else if (action === 'profile') {
        this.$router.push(
          `/${this.$store.getters.userName
            .replace(' ', '.')
            .replace(' ', '')}-${this.$store.getters.userId}`
        )
      }
    }
  }
}
</script>

<style lang="scss">
.main-container {
  .view-container {
    // Total height minus menu
    height: calc(100vh - 58px);
  }
}
</style>
