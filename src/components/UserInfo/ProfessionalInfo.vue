<template>
  <div class="professional-info">
    <div class="d-flex align-center">
      <h4 class="text-primary w-100">
        Informações profissionais
      </h4>
      <el-button
        type="primary"
        class="d-flex justify-center"
        size="small"
        @click="professionalAdditionAndEditionModal = true"
      >
        <i class="el-icon-plus"></i>
        <span class="d-sm-none d-md-flex justify-center">Adicionar</span>
      </el-button>
    </div>

    <div class="professional-info__table small-scroll">
      <UserInfoRow
        v-for="(info, index) in user.professionalInfos"
        :key="index"
        :id="info.id"
        :firstColumn="info.company"
        :secondColumn="info.role"
        @edit="edit"
        @remove="removeProfessionalDetail"
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
          <p class="font-9rem mt-1" style="word-break:break-all;">
            {{ info.activitiesPerformed }}
          </p>
        </div>
      </UserInfoRow>
    </div>

    <ProfessionalAdditionAndEditionModal
      v-model="professionalAdditionAndEditionModal"
      :company="company"
      :user="user"
    />
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'

import UserInfoRow from './UserInfoRow'
import ProfessionalAdditionAndEditionModal from './ProfessionalAdditionAndEditionModal'

export default {
  components: {
    UserInfoRow,
    ProfessionalAdditionAndEditionModal
  },
  props: {
    user: {
      type: Object,
      default() {
        return {
          company: {
            company: '',
            activitiesPerformed: '',
            start: '',
            end: ''
          }
        }
      }
    }
  },
  data() {
    const required = [
      { required: true, message: 'Campo obrigatório', trigger: 'submit' }
    ]
    return {
      professionalAdditionAndEditionModal: false,
      company: {
        id: null,
        company: null,
        role: null,
        start: null,
        end: null,
        activitiesPerformed: null
      },

      showDialog: false,
      form: {
        id: null,
        company: '',
        activitiesPerformed: '',
        start: '',
        end: ''
      },
      rules: {
        company: required,
        activitiesPerformed: required,
        start: required,
        end: required
      }
    }
  },
  methods: {
    update() {
      this.$store.commit('SHOW_LOADING')

      const index = this.user.professionalInfos.findIndex(
        item => item.id === this.form.id
      )

      if (this.form.company && index === -1) {
        if (!this.user.professionalInfos) {
          this.user.professionalInfos = []
        }
        this.user.professionalInfos.push(this.form)
      }

      UserService.updateUser(this.user)
        .catch(err => this.$throwError(err))
        .finally(() => {
          this.$store.commit('HIDE_LOADING')
          this.showDialog = false
          this.form = {
            id: null,
            company: '',
            activitiesPerformed: '',
            start: '',
            end: ''
          }
        })

      this.showDialog = false
      this.form = {
        id: null,
        company: '',
        activitiesPerformed: '',
        start: '',
        end: ''
      }
    },
    edit(id) {
      this.professionalAdditionAndEditionModal = true
      this.company = this.user.professionalInfos.find(info => info.id === id)
    },
    async removeProfessionalDetail(id) {
      this.user.professionalInfos = this.user.professionalInfos.filter(
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

.professional-info {
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
