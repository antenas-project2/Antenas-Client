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
          <box-icon class="sidebar-icon" name="table"></box-icon>
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
          :class="{ 'is-active': isUsersTableSelected }"
          class="icon-container d-flex justify-center algin-center"
          @click="goToMyProfile()"
        >
          <box-icon class="sidebar-icon" name="user"></box-icon>
        </div>
      </el-tooltip>
    </li>
  </ul>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route)
  },
  computed: {
    isProjectTabSelected() {
      return this.$route.name === 'projects'
    },
    isUsersTableSelected() {
      return this.$route.name === ''
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
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.sidebar {
  min-width: 65px;
  width: 65px;
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
        background-color: $--default-hover-color;
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
