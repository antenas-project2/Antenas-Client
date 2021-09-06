<template>
  <div class="new-project-modal">
    <Modal v-model="modalVisibility">
      <h4 class="new-project-modal__title">Novo projeto</h4>
      <!-- v-loading="loading" -->
      <el-form
        ref="form"
        class="new-project-form"
        label-position="top"
        :model="project"
        :rules="rules"
      >
        <el-form-item label="Título" prop="title">
          <el-input
            v-model="project.title"
            class="new-project-form__input"
            maxlength="30"
            show-word-limit
            :disabled="isCreatingProject"
          />
        </el-form-item>
        <el-form-item label="Resumo" prop="shortDescription">
          <el-input
            v-model="project.shortDescription"
            class="new-project-form__input"
            type="textarea"
            maxlength="1000"
            show-word-limit
            :disabled="isCreatingProject"
            :rows="4"
          />
        </el-form-item>
        <el-form-item
          label="Notas adicionais (materiais de apoio)"
          prop="notes"
        >
          <el-input
            v-model="project.notes"
            class="new-project-form__input"
            type="textarea"
            maxlength="1000"
            show-word-limit
            :disabled="isCreatingProject"
            :rows="4"
          />
        </el-form-item>
      </el-form>
      <div class="new-project-modal__footer">
        <el-button
          :disabled="isCreatingProject"
          @click="modalVisibility = false"
        >
          Cancelar
        </el-button>
        <el-button
          :disabled="isCreatingProject"
          type="primary"
          @click="saveProject()"
        >
          Criar projeto
        </el-button>
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
  data() {
    return {
      project: {
        title: '',
        shortDescription: '',
        notes: ''
      },
      rules: {
        title: [
          { required: true, message: 'Campo obrigatório', trigger: 'submit' }
        ],
        shortDescription: [
          { required: true, message: 'Campo obrigatório', trigger: 'submit' }
        ],
        notes: [
          { required: true, message: 'Campo obrigatório', trigger: 'submit' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['projectModal', 'creatingProject']),
    modalVisibility: {
      get() {
        return this.projectModal
      },
      set(visibility) {
        this.$store.commit('SET_PROJECT_MODAL', visibility)
      }
    },
    isCreatingProject() {
      return this.creatingProject
    }
  },
  methods: {
    saveProject() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('saveProject', this.project)
            .then(() => {
              this.notifyProjectSaved()
              this.resetProject()
              this.modalVisibility = false
            })
            .catch(err => this.$throwError(err))
        }
      })
    },
    resetProject() {
      this.project = { title: null, shortDescription: null, notes: null }
    },
    notifyProjectSaved() {
      this.$notify({
        title: 'Pronto!',
        message: 'Projeto salvo com sucesso',
        type: 'success',
        position: 'bottom-right'
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.new-project-modal {
  &__title {
    margin-bottom: 10px;
  }
  &__footer {
    display: grid;
    grid-template-columns: 120px 1fr;
    justify-content: space-between;
    margin-top: 20px;
  }

  .el-form {
    .el-form-item {
      &__label {
        line-height: normal;
        padding-bottom: 5px !important;
        font-size: 0.8rem;
        color: $--color-text-regular;
      }
    }
  }
  .new-project-form {
    &__input {
      textarea {
        font-family: 'Inter';
      }
    }
  }
}

@media (min-width: 580px) {
  .new-project-modal {
    .el-form {
      min-width: 400px;
    }
  }
}
</style>
