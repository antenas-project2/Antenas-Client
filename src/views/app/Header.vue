<template>
  <el-header class="header">
    <Logo variant="blue" />
    <div class="align-center d-flex">
      <div class="personal-information">
        <h5>{{ userName }}</h5>
        <p class="personal-information__role">{{ userRoleDisplay }}</p>
      </div>
      <el-dropdown @command="dropdownClick">
        <el-avatar size="medium" fit="scale-down">
          <img v-if="userPhoto" :src="userPhoto" class="header__avatar">
          <span v-else>
            {{ userInitials }}
          </span>
        </el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">
            <i class="el-icon-user" />
            Dados da conta
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <i class="el-icon-switch-button" />
            Sair
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'

import Logo from '@/components/Logo/Logo.vue'

export default {
  components: { Logo },
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
  methods: {
    dropdownClick(action) {
      if (action === 'logout') {
        this.$store.commit('LOGOUT_CURRENT_USER')
        this.$store.commit('CLEAR_PROJECTS')
        this.$router.push('/')
      } else if (action === 'account') {
        this.$router.push({ name: 'registry-data' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.header {
  height: 58px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $--default-border-color;
  padding: 0 20px;
  margin: 0;
  z-index: 9;

  &__avatar {
    cursor: pointer;
    object-fit: cover;
    width: 100%;
  }
  .personal-information {
    margin-right: 8px;

    &__role {
      font-size: 0.7rem;
      color: $--color-text-secondary;
    }
  }
}
</style>
