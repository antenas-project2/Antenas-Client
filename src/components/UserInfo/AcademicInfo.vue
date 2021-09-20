<template>
  <div class="academic-info">
    <div class="d-flex align-center">
      <h4 class="text-primary w-100 mr-2">
        Informações acadêmicas
      </h4>
      <el-button
        type="primary"
        class="d-flex justify-center"
        size="small"
        @click="academicAdditionAndEditionModal = true"
      >
        <i class="el-icon-plus" />
        <span class="d-sm-none d-md-flex justify-center">Adicionar</span>
      </el-button>
    </div>

    <div v-if="user.academicInfos && user.academicInfos.length > 0" class="academic-info__table small-scroll">
      <UserInfoRow
        v-for="(info, index) in user.academicInfos"
        :id="info.id"
        :key="index"
        :firstColumn="info.institution"
        :secondColumn="info.course"
        @edit="edit"
        @remove="removeAcademicDetail"
      >
        <div class="mt-2">
          <p class=" font-weight-500 font-9rem">
            <i class="el-icon-date" />
            {{ info.start | moment('DD/MM/YYYY') }} -
            <span v-if="info.end">
              {{ info.end | moment('DD/MM/YYYY') }}
            </span>
            <span v-else>Até o momento</span>
          </p>
        </div>
      </UserInfoRow>
    </div>

    <AcademicAdditionAndEditionModal
      v-model="academicAdditionAndEditionModal"
      :academic="academic"
      :user="user"
    />
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'

import UserInfoRow from './UserInfoRow'
import AcademicAdditionAndEditionModal from './AcademicAdditionAndEditionModal'

export default {
  components: {
    UserInfoRow,
    AcademicAdditionAndEditionModal
  },
  props: {
    user: {
      type: Object,
      default() {
        return {
          institution: '',
          course: '',
          start: '',
          end: ''
        }
      }
    }
  },
  data() {
    return {
      academicAdditionAndEditionModal: false,
      showDialog: false,
      academic: {
        id: null,
        institution: '',
        course: '',
        start: '',
        end: ''
      }
    }
  },
  methods: {
    edit(id) {
      this.academicAdditionAndEditionModal = true
      this.academic = this.user.academicInfos.find(info => info.id === id)
    },
    async removeAcademicDetail(id) {
      this.user.academicInfos = this.user.academicInfos.filter(
        info => info.id !== id
      )

      try {
        await UserService.updateUser(this.user)
        this.throwAlert('Sucesso!', 'Excluído com sucesso', 'success')
      } catch {
        this.throwAlert('Ops', 'Algo de errado aconteceu.', 'error')
      }
    },
    throwAlert(title, msg, type) {
      this.$notify({
        title: title,
        message: msg,
        type: type,
        position: 'bottom-right'
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.academic-info {
  .el-date-editor {
    width: 100%;
  }

  h2 {
    color: $--color-primary;
    margin-bottom: 30px;
  }

  &__table {
    width: 100%;
    display: block;
    background-image: linear-gradient(to right, #ffffff, #ffffff),
      linear-gradient(to right, #ffffff, #ffffff),
      linear-gradient(to right, #f4f4f4, #ffffff),
      linear-gradient(to left, #f4f4f4, #ffffff) !important;
    background-position: left center, right center, left center, right center !important;
    background-repeat: no-repeat !important;
    background-size: 20px 100%, 20px 100%, 20px 100%, 20px 100% !important;
    background-attachment: local, local, scroll, scroll !important;
  }
}
</style>
