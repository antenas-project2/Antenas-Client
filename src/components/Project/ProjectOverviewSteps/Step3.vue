<template>
  <div>
    <div v-if="$store.getters.isRepresentative" class="project-step-three">
      <h5 class="project-step-three__title">
        Adicione mais informações ao projeto
      </h5>
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        class="login-form"
        label-position="top"
      >
        <el-form-item label="Descrição completa" prop="completeDescription">
          <el-input
            v-model="form.completeDescription"
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
            v-model="form.technologyDescription"
            type="textarea"
            :rows="4"
            maxlength="1000"
            show-word-limit
          />
        </el-form-item>
        <div class="d-flex justify-end">
          <el-button size="medium" type="primary" @click="update()">
            Adicionar informações
          </el-button>
        </div>
      </el-form>
    </div>
    <Information v-else>
      Na etapa de <b>Cadastro detalhado</b> o <b>Representante</b> irá acrescentar mais informações de
      descrição do projeto.
    </Information>
  </div>
</template>

<script>
import Information from '@/components/Information'

export default {
  components: {
    Information
  },
  data() {
    return {
      form: {
        completeDescription: '',
        technologyDescription: ''
      },
      rules: {
        completeDescription: [
          { required: true, message: 'Campo obrigatório', trigger: 'submit' }
        ],
        technologyDescription: [
          { required: true, message: 'Campo obrigatório', trigger: 'submit' }
        ]
      }
    }
  },
  methods: {
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.commit('SHOW_LOADING')
          const completeDescription = this.form.completeDescription
          const technologyDescription = this.form.technologyDescription
          const project = JSON.parse(
            JSON.stringify(this.$store.getters.selectedProject)
          )
          this.$store
            .dispatch('updateProject', {
              ...project,
              completeDescription,
              technologyDescription
            })
            .catch(err => this.$throwError(err))
            .finally(() => this.$store.commit('HIDE_LOADING'))
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.project-step-three {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid $--default-border-color;

  &__title {
    margin-bottom: 8px;
  }

  .el-form {
    .el-form-item {
      &__label {
        line-height: normal;
        padding-bottom: 5px !important;
        font-size: 0.8rem;
        color: $--color-text-regular;
      }
      &__content {
        textarea {
          font-family: 'Inter';
          border: 1px solid $--default-border-color;
        }
      }
    }
  }
}
</style>
