<template>
  <div class="w-100">
    <div class="user-acceptance w-100 h-100 small-scroll">
      <div class="user-acceptance__header d-flex flex-column mb-3 mt-1 w-100">
        <div class="d-flex w-100">
          <el-input
            v-model="searchUser"
            placeholder="Quem você está procurando?"
          />
        </div>
        <div class="d-flex flex-column align-end w-100">
          <div
            ref="userAcceptanceFilter"
            class="user-acceptance__header__filter user-acceptance__header__filter__closed d-flex justify-start w-100 my-1"
          >
            <el-button
              :type="selectedUserFilter === 'pending' ? `primary` : `default`"
              size="mini"
              plain
              @click="selectUserFilter('pending')"
            >
              Usuários pendentes
            </el-button>
            <el-button
              :type="selectedUserFilter === 'declined' ? `primary` : `default`"
              size="mini"
              plain
              @click="selectUserFilter('declined')"
            >
              Usuários declinados
            </el-button>
          </div>
          <el-button size="mini" round @click="toggleFilter()">
            <span v-if="filterStatus === 'closed'">
              Abrir filtro
            </span>
            <span v-if="filterStatus === 'opened'">
              Fechar filtro
            </span>
          </el-button>
        </div>
      </div>
      <div class="user-acceptance__content">
        <h4
          v-if="selectedUserFilter === 'pending'"
          class="user-acceptance__content__title mb-2"
        >
          Usuários pendentes
        </h4>
        <h4
          v-if="selectedUserFilter === 'declined'"
          class="user-acceptance__content__title mb-2"
        >
          Usuários recusados
        </h4>
        <el-empty
          v-if="filteredUsers.length === 0"
          class="mt-3"
          description="Nenhum usuário por aqui."
          :image-size="100"
        />
        <div v-else class="user-acceptance__content__table">
          <div
            v-for="(user, index) in filteredUsers"
            :key="index"
            class="user-table-item d-flex justify-between align-center"
          >
            <div class="user-table-item__informations">
              <span class="d-flex">
                <i class="el-icon-user mr-1"></i>
                <h4>{{ user.name }}</h4>
              </span>
              <p class="mt-1">{{ user.email }}</p>
            </div>
            <div class="user-table-item__acceptance">
              <el-button
                class="user-table-item__acceptance__button p-2"
                type="success"
                icon="el-icon-check"
                :disabled="modifyingUser"
                @click="acceptUser(user.email)"
              />
              <el-button
                v-if="selectedUserFilter !== 'declined'"
                class="user-table-item__acceptance__button p-2"
                type="danger"
                icon="el-icon-close"
                :disabled="modifyingUser"
                @click="declineUser(user.email)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  data() {
    return {
      searchUser: '',
      modifyingUser: false,
      users: [],
      selectedUserFilter: 'pending',
      filterStatus: 'closed'
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const pending = this.selectedUserFilter === 'pending'
        const declined = this.selectedUserFilter === 'declined'
        const search = this.searchUser.toLowerCase()
        const name = user.name.toLowerCase()

        return (
          name.includes(search) &&
          ((pending && !user.active && !user.archived) ||
            (declined && user.archived && !user.active))
        )
      })
    }
  },
  async mounted() {
    this.loadDisabledUsers()
  },
  methods: {
    async acceptUser(email) {
      this.modifyingUser = true

      try {
        await UserService.acceptUser(email)
        this.$notify({
          title: 'Pronto!',
          message: 'Usuário foi aceito na plataforma.',
          type: 'success',
          position: 'bottom-right'
        })
      } catch (err) {
        this.$throwError(err)
      }

      this.loadDisabledUsers()
      this.modifyingUser = false
    },
    async declineUser(email) {
      this.modifyingUser = true

      try {
        await UserService.declineUser(email)
        this.$notify({
          title: 'Pronto!',
          message: 'Usuário foi recusado na plataforma.',
          type: 'success',
          position: 'bottom-right'
        })
      } catch (err) {
        this.$throwError(err)
      }

      this.loadDisabledUsers()
      this.modifyingUser = false
    },
    async loadDisabledUsers() {
      this.users = await UserService.getPendingAndArchivedUsers()
    },
    toggleFilter() {
      if (
        this.$refs.userAcceptanceFilter.classList.contains(
          'user-acceptance__header__filter__closed'
        )
      ) {
        this.$refs.userAcceptanceFilter.classList.remove(
          'user-acceptance__header__filter__closed'
        )
        this.filterStatus = 'opened'
      } else {
        this.$refs.userAcceptanceFilter.classList.add(
          'user-acceptance__header__filter__closed'
        )
        this.filterStatus = 'closed'
      }
    },
    selectUserFilter(userFilter) {
      this.selectedUserFilter = userFilter
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.user-acceptance {
  border-left: 1px solid $--default-border-color;
  padding: 12px;

  &__header {
    &__filter {
      height: 30px;
      transition: 0.1s all ease-in-out;

      &__closed {
        height: 0;
        opacity: 0;
        overflow: hidden;
      }
    }
  }

  &__content {
    &__title {
      font-weight: 600;
    }
    &__table {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;

      .user-table-item {
        padding: 10px;
        border: 1px solid $--default-border-color;
        border-radius: 6px;

        &__informations {
          i {
            font-weight: 600;
          }
          p {
            color: $--color-text-regular;
          }
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .user-acceptance {
    border-left: 1px solid $--default-border-color;
    padding: 12px;

    &__content {
      &__table {
        grid-template-columns: 1fr !important;
      }
    }
  }
}

@media (max-width: 580px) {
  .user-acceptance {
    border-left: 1px solid $--default-border-color;
    padding: 12px;

    &__content {
      &__table {
        .user-table-item {
          flex-direction: column !important;
          align-items: flex-start !important;

          &__acceptance {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 10px;

            &__button {
              width: 100%;
              padding: 10px 0 !important;
            }
          }
        }
      }
    }
  }
}
</style>
