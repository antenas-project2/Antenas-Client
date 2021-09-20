<template>
  <div class="registration-info-view h100">
    <el-tabs class="tabs h100" v-model="tabPosition">
      <el-tab-pane v-loading="loading" label="Informações pessoais" name="info">
        <PersonalInfo :user.sync="user" />
      </el-tab-pane>
      <el-tab-pane
        v-if="$store.getters.isStudent"
        v-loading="loading"
        label="Informações profissionais"
        name="job"
      >
        <ProfessionalInfo :user.sync="user" />
      </el-tab-pane>
      <el-tab-pane
        v-if="$store.getters.isStudent"
        v-loading="loading"
        label="Informações acadêmicas"
        name="school"
      >
        <AcademicInfo :user.sync="user" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PersonalInfo from '@/components/UserInfo/PersonalInfo.vue'
import ProfessionalInfo from '@/components/UserInfo/ProfessionalInfo.vue'
import AcademicInfo from '@/components/UserInfo/AcademicInfo.vue'
import UserService from '@/services/UserService.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    PersonalInfo,
    ProfessionalInfo,
    AcademicInfo
  },
  data() {
    return {
      user: {},
      tabPosition: 'info'
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  beforeMount() {
    this.$store.commit('SHOW_LOADING')
    UserService.getUser()
      .then(res => {
        this.user = res
      })
      .catch(err => this.$throwError(err))
      .finally(() => this.$store.commit('HIDE_LOADING'))
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_scroll.scss';

.registration-info-view {
  width: calc(100vw - 55px);
  border: 1px solid $--default-border-color;

  .tabs {
    background: #fff;
  }
  .el-tab-pane {
    width: 100%;
    padding: 12px;
  }

  .el-tabs {
    &__header {
      margin: 0 !important;
      background-color: $--default-hover-color;
    }
    &__content {
      height: calc(100% - 55px);
    }
    &__content {
      overflow-y: auto;
      scrollbar-color: rgba(200, 200, 200, 0.7) rgba(200, 200, 200, 0.5);
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        width: 15px;
        height: 15px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(200, 200, 200, 0.7);
        width: 5px;
        height: 5px;
        border-radius: 15px;
        border: 5px solid transparent;
        background-clip: content-box;
      }
      &.is-dark::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.5);
        width: 5px;
        height: 5px;
        border-radius: 15px;
        border: 5px solid transparent;
        background-clip: content-box;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(200, 200, 200, 0.7);
        width: 5px;
        height: 5px;
        border-radius: 15px;
        border: 5px solid transparent;
        background-clip: content-box;
      }
    }

    &__nav-wrap {
      padding: 0 30px;
      display: flex;
    }
    &__nav {
      padding: 3px 5px;
    }
    &__item {
      text-align: left !important;
    }
  }
}

@media (max-width: 700px) {
  .registration-info-view {
    .el-tabs__header {
      width: 100%;
    }
  }
}
</style>
