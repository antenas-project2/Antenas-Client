<template>
  <ul class="sidebar d-flex flex-column justify-center h100">
    <li>
      <el-tooltip
        class="item"
        effect="dark"
        content="Projetos"
        placement="right-start"
      >
        <div
          :class="{ 'is-active': isProjectTabSelected }"
          class="icon-container d-flex justify-center algin-center"
          @click="goToProjectPage()"
        >
          <box-icon class="sidebar-icon" name="spreadsheet" />
        </div>
      </el-tooltip>
    </li>
    <li v-if="$store.getters.isTeacher || $store.getters.isCadi">
      <el-tooltip
        class="item"
        effect="dark"
        content="Painel administrativo"
        placement="right-start"
      >
        <div
          :class="{ 'is-active': isUsersTableSelected }"
          class="icon-container d-flex justify-center algin-center"
          @click="goToUsersTablePage()"
        >
          <box-icon class="sidebar-icon" name="table" />
        </div>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip
        class="item"
        effect="dark"
        content="Descobrir alunos"
        placement="right-start"
      >
        <div
          :class="{ 'is-active': isExploreSelected }"
          class="icon-container d-flex justify-center algin-center"
          @click="goToExplorePage()"
        >
          <box-icon class="sidebar-icon" name="compass" />
        </div>
      </el-tooltip>
    </li>
    <li v-if="$store.getters.isStudent">
      <el-tooltip
        class="item"
        effect="dark"
        content="Meu perfil"
        placement="right-start"
      >
        <div
          :class="{ 'is-active': isUserProfileSelected }"
          class="icon-container d-flex justify-center algin-center"
          @click="goToMyProfile()"
        >
          <box-icon class="sidebar-icon" name="user" />
        </div>
      </el-tooltip>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    isProjectTabSelected() {
      return this.$route.name === 'projects'
    },
    isUsersTableSelected() {
      return this.$route.name === 'user-acceptance'
    },
    isUserProfileSelected() {
      return this.$route.name === 'profile'
    },
    isExploreSelected() {
      return this.$route.name === 'explore'
    }
  },
  methods: {
    goToProjectPage() {
      if (this.$route.name !== 'projects') {
        this.$router.push({ name: 'projects' })
      }
    },
    goToMyProfile() {
      this.$router.push(
        `/${this.$store.getters.userName.replace(' ', '.').replace(' ', '')}-${
          this.$store.getters.userId
        }`
      )
    },
    goToUsersTablePage() {
      if (this.$route.name !== 'user-acceptance') {
        this.$router.push({ name: 'user-acceptance' })
      }
    },
    goToExplorePage() {
      if (this.$route.name !== 'explore') {
        this.$router.push({ name: 'explore' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.sidebar {
  min-width: 55px;
  width: 55px;
  background-color: #ffffff;
  transition: all 0.3s;

  li {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;

    .icon-container {
      padding: 8px;
      border-radius: 50px;
      cursor: pointer;
      fill: $--color-text-regular;

      &.is-active,
      &:hover {
        background-color: $--default-sidebar-hover-color;
      }

      .sidebar-icon {
        width: 24px;
        height: 24px;
      }

      &.is-active .sidebar-icon {
        fill: $--color-primary;
      }
    }
  }
}
</style>
