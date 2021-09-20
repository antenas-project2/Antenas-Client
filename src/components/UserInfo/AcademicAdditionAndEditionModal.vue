<template>
  <div class="academic-addition-edition">
    <Modal v-model="modalVisibility">
      <h4>Nova informação acadêmica</h4>

      <div class="academic-addition-edition__container">
        <div class="academic-addition-edition__container__information d-flex">
          <div class="w-100 mr-2">
            <h6 class="mb-1 mt-3">Instituição</h6>
            <el-input
              v-model="academic.institution"
              maxlength="40"
              show-word-limit
            />
          </div>
          <div class="w-100">
            <h6 class="mb-1 mt-3">Curso</h6>
            <el-input
              v-model="academic.course"
              maxlength="40"
              show-word-limit
            />
          </div>
        </div>

        <div class="academic-addition-edition__container__dates d-flex">
          <div class="w-100 mr-2">
            <h6 class="mb-1 mt-3">Data inicial</h6>
            <el-date-picker
              v-model="academic.start"
              format="dd/MM/yyyy"
              type="date"
            />
          </div>
          <div class="w-100">
            <h6 class="mb-1 mt-3">Data final</h6>
            <el-date-picker
              v-model="academic.end"
              format="dd/MM/yyyy"
              label="Data de início"
              type="date"
            />
          </div>
        </div>
      </div>

      <div class="academic-addition-edition__footer d-flex mt-3">
        <el-button class="w-100" @click="modalVisibility = false">
          Cancelar
        </el-button>
        <el-button type="primary" class="w-100" @click="saveAcademicDetails()">
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
  props: ['value', 'academic', 'user'],
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
    addAcademicDetailAtUser() {
      const index = this.user.academicInfos.findIndex(
        item => item.id === this.academic.id
      )

      if (this.academic && index === -1) {
        if (!this.user.academicInfos) {
          this.user.academicInfos = []
        }
        const academic = {
          institution: this.clean(this.academic.institution),
          course: this.clean(this.academic.course),
          start: this.clean(this.academic.start),
          end: this.clean(this.academic.end)
        }
        this.user.academicInfos.push(academic)
      } else {
        this.user.academicInfos[index].institution = this.clean(
          this.academic.institution
        )
        this.user.academicInfos[index].course = this.clean(this.academic.course)
        this.user.academicInfos[index].start = this.clean(this.academic.start)
        this.user.academicInfos[index].end = this.clean(this.academic.end)
      }
    },
    saveAcademicDetails() {
      this.addAcademicDetailAtUser()
      UserService.updateUser(this.user).catch(err => this.$throwError(err))

      this.modalVisibility = false

      this.academic.institution = ''
      this.academic.course = ''
      this.academic.start = ''
      this.academic.end = ''
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
  .academic-addition-edition {
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
