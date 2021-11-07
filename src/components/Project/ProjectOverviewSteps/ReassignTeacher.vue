<template>
  <div class="reassign-teacher-modal">
    <Modal v-model="modalVisibility">
      <div class="reassign-teacher-modal__container">
        <div
          class="reassign-teacher-modal__header d-flex justify-between align-center w100"
        >
          <h4>Redesignar professor</h4>
        </div>

        <div>
          <div class="mb-3">
            <h6 class="mb-1">Professor responsável</h6>
            <p>{{ project.teacher.name }}</p>
          </div>

          <h6 class="mb-1">Novo professor responsável</h6>
          <el-select v-model="selectedTeacher" class="w100" prop="teacher">
            <el-option
              v-for="teacher in filteredTeachers"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"
            />
          </el-select>
        </div>

        <div class="d-flex justify-center mt-3">
          <el-button class="w-100" @click="modalVisibility = false">
            Cancelar
          </el-button>
          <el-button
            type="primary"
            class="w-100"
            :disabled="!selectedTeacher"
            @click="updateTeacherOfProject()"
          >
            Salvar
          </el-button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import UserService from '@/services/UserService.js'

import Modal from '@/components/Modal'

export default {
  components: {
    Modal
  },
  props: ['value'],
  data() {
    return {
      selectedTeacher: null,
      teacherList: []
    }
  },
  computed: {
    ...mapGetters({
      project: 'selectedProject'
    }),
    modalVisibility: {
      get() {
        return this.value
      },
      set(visibility) {
        this.$emit('input', visibility)
      }
    },
    filteredTeachers() {
      return this.teacherList.filter(
        teacher => teacher.id !== this.project.teacher.id
      )
    }
  },
  mounted() {
    UserService.getTeacherUsers()
      .then(res => {
        this.teacherList = res
      })
      .finally(() => this.$store.commit('HIDE_LOADING'))
  },
  methods: {
    updateTeacherOfProject() {
      this.project.teacher = { id: this.selectedTeacher }
      this.$store
        .dispatch('updateProject', this.project)
        .catch(err => this.$throwError(err))
        .finally(() => {
          this.$notify({
            title: 'Alteração de professor',
            message: 'Pronto! Professor alterado com sucesso.',
            duration: 6000,
            type: 'success',
            position: 'bottom-right'
          })

          this.modalVisibility = false
          this.selectedTeacher = null
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.reassign-teacher-modal {
  &__container {
    overflow: hidden;
  }
  &__header {
    margin-bottom: 10px;
  }
}

@media (min-width: 580px) {
  .reassign-teacher-modal {
    &__container {
      min-width: 400px;
    }
  }
}
</style>
