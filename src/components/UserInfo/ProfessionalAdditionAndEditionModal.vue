<template>
  <div class="professional-addition-edition">
    <Modal v-model="modalVisibility">
      <h4>Informações profissionais</h4>

      <div class="professional-addition-edition__container">
        <div
          class="professional-addition-edition__container__information d-flex"
        >
          <div class="w-100 mr-2">
            <h6 class="mb-1 mt-3">Empresa</h6>
            <el-input
              v-model="company.company"
              maxlength="60"
              show-word-limit
            />
          </div>
          <div class="w-100">
            <h6 class="mb-1 mt-3">Cargo</h6>
            <el-input v-model="company.role" maxlength="20" show-word-limit />
          </div>
        </div>

        <div class="professional-addition-edition__container__dates d-flex">
          <div class="w-100 mr-2">
            <h6 class="mb-1 mt-3">Data inicial</h6>
            <el-date-picker
              v-model="company.start"
              format="dd/MM/yyyy"
              prop="start"
              type="date"
            />
          </div>
          <div class="w-100">
            <h6 class="mb-1 mt-3">Data final</h6>
            <el-date-picker
              v-model="company.end"
              format="dd/MM/yyyy"
              prop="end"
              label="Data de início"
              type="date"
            />
          </div>
        </div>

        <h6 class="mb-1 mt-3">Atividades realizadas</h6>
        <el-input
          v-model="company.activitiesPerformed"
          type="textarea"
          :rows="4"
          maxlength="150"
          show-word-limit
        />
      </div>

      <div class="professional-addition-edition__footer d-flex mt-3">
        <el-button class="w-100" @click="modalVisibility = false">
          Cancelar
        </el-button>
        <el-button
          type="primary"
          class="w-100"
          @click="saveProfessionalDetails()"
        >
          Salvar
        </el-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'

import UserService from '@/services/UserService'

export default {
  components: {
    Modal
  },
  props: ['value', 'company', 'user'],
  computed: {
    modalVisibility: {
      get() {
        return this.value
      },
      set(visibility) {
        this.$emit('input', visibility)
      }
    }
  },
  methods: {
    addProfessionalDetailAtUser() {
      const index = this.user.professionalInfos.findIndex(
        item => item.id === this.company.id
      )

      if (this.company && index === -1) {
        if (!this.user.professionalInfos) {
          this.user.professionalInfos = []
        }
        const company = {
          company: this.clean(this.company.company),
          role: this.clean(this.company.role),
          start: this.clean(this.company.start),
          end: this.clean(this.company.end),
          activitiesPerformed: this.clean(this.company.activitiesPerformed)
        }
        this.user.professionalInfos.push(company)
      } else {
        this.user.professionalInfos[index].company = this.clean(
          this.company.company
        )
        this.user.professionalInfos[index].role = this.clean(this.company.role)
        this.user.professionalInfos[index].start = this.clean(
          this.company.start
        )
        this.user.professionalInfos[index].end = this.clean(this.company.end)
        this.user.professionalInfos[index].activitiesPerformed = this.clean(
          this.company.activitiesPerformed
        )
      }
    },
    saveProfessionalDetails() {
      this.addProfessionalDetailAtUser()
      UserService.updateUser(this.user).catch(err => this.$throwError(err))

      this.modalVisibility = false

      this.company.company = null
      this.company.role = null
      this.company.start = null
      this.company.end = null
      this.company.activitiesPerformed = null
    },
    clean(value) {
      return JSON.parse(JSON.stringify(value))
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

@media (max-width: 580px) {
  .professional-addition-edition {
    .overlay {
      min-width: 100%;
      padding: 0;
      padding-top: 18px;
    }

    h4 {
      padding: 0 13px;
    }
    &__container {
      max-width: 400px;
      padding: 0 13px;

      &__information {
        flex-direction: column;
      }
      &__dates {
        flex-direction: column;
      }
    }
    &__footer {
      margin-left: 12px;
      margin-right: 12px;
      margin-bottom: 12px;
    }
  }
}
</style>
