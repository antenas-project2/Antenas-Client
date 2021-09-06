<template>
  <div class="edit-project-modal">
    <Modal v-model="modalVisibility">
      <div class="edit-project-modal__container">
        <div
          class="edit-project-modal__header d-flex justify-between align-center w100"
        >
          <h4>Edição informações do projeto</h4>
        </div>
        <el-form
          ref="form"
          class="edit-project-modal__content"
          :model="project"
        >
          <el-form-item label="Resumo" prop="shortDescription">
            <el-input
              v-model="project.shortDescription"
              type="textarea"
              :rows="4"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="Descrição completa" prop="completeDescription">
            <el-input
              v-model="project.completeDescription"
              type="textarea"
              :rows="4"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>
          <el-form-item
            label="Descrição da tecnologia"
            prop="technologyDescription"
          >
            <el-input
              v-model="project.technologyDescription"
              type="textarea"
              :rows="4"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>
          <div class="d-flex justify-end">
            <el-button @click="modalVisibility = false">
              Cancelar
            </el-button>
            <el-button type="primary" @click="updateProjectInformation()">
              Salvar
            </el-button>
          </div>
        </el-form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Modal from '@/components/Modal'

export default {
  components: {
    Modal
  },
  props: ['value'],
  data() {
    return {
      savingProject: false
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
    }
  },
  methods: {
    updateProjectInformation() {
      this.savingProject = true
      this.$store
        .dispatch('updateProject', this.project)
        .catch(err => this.$throwError(err))
        .finally(() => {
          this.modalVisibility = this.savingProject = false
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.edit-project-modal {
  &__header {
    margin-bottom: 10px;

    &__clear-filters {
      font-size: 0.8rem;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: $--color-primary;
      }
    }
  }

  &__content {
    &.el-form {
      .el-form-item {
        &__label {
          line-height: normal;
          padding-bottom: 5px !important;
          font-size: 0.8rem;
          color: $--color-text-regular;
        }
      }
    }
  }
}

@media (min-width: 580px) {
  .edit-project-modal {
    &__container {
      min-width: 400px;
    }
  }
}
</style>
