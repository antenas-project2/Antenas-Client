<template>
  <div>
    <Information class="mb-3" v-if="$store.getters.isCadi">
      Você pode redesignar um professor a qualquer momento clicando aqui em
      <a href="" @click.stop.prevent="openReassignTeacherModal()">
        redesignar professor </a
      >.
    </Information>

    <div v-if="$store.getters.isTeacher" class="project-step-seven">
      <div class="project-step-seven__content">
        <div v-if="!project.open" class="d-flex flex-column align-center">
          <h4 class="project-step-seven__content__title">
            Verifique se todas as informações estão corretas!
          </h4>
          <h6 class="project-step-seven__content__subtitle">
            Caso tudo já esteja completo, inicie o projeto para ficar visível
            aos alunos.
          </h6>
        </div>
        <div v-else class="d-flex flex-column align-center">
          <h4 class="project-step-seven__content__title">
            O projeto está em execução!
          </h4>
          <h6 class="project-step-seven__content__subtitle">
            Quando quiser pode clicar no botão <b>Encerrar projeto</b> para
            prosseguir para próxima fase.
          </h6>
        </div>

        <div>
          <el-button
            :type="project.open ? 'danger' : 'success'"
            @click="confirmDialog()"
          >
            {{ project.open ? 'Encerrar projeto' : 'Iniciar projeto' }}
          </el-button>
          <el-button
            icon="el-icon-edit-outline"
            @click="editProjectModalVisibility = !editProjectModalVisibility"
          >
            Editar projeto
          </el-button>
        </div>
      </div>
    </div>
    <div v-else>
      <Information v-if="!project.open">
        Nesta etapa o <b>Professor</b> irá se certificar que o projeto tem todas
        as informações necessárias e então irá dar inicio no mesmo.
      </Information>
      <Information v-else>
        O <b>Professor</b> já iniciou o projeto e o mesmo já está disponível
        para ser desenvolvido.
        <span v-if="$store.getters.isStudent">
          Crie agora mesmo a sua equipe ou procure uma já cadastrada! =)
        </span>
      </Information>
    </div>

    <StepSevenEditProject v-model="editProjectModalVisibility" />
    <ReassignTeacher v-model="reassignTeacherModalVisibility" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import StepSevenEditProject from './StepSevenEditProject'
import ReassignTeacher from './ReassignTeacher'
import Information from '@/components/Information'

export default {
  components: {
    StepSevenEditProject,
    ReassignTeacher,
    Information
  },
  data() {
    return {
      editProject: false,
      editProjectModalVisibility: false,
      reassignTeacherModalVisibility: false
    }
  },
  computed: {
    ...mapGetters({
      project: 'selectedProject'
    })
  },
  methods: {
    update(openProject) {
      this.$store.commit('SHOW_LOADING')
      const project = JSON.parse(JSON.stringify(this.project))
      if (openProject) {
        project.open = !project.open
      }
      this.$store
        .dispatch('updateProject', project)
        .catch(err => this.$throwError(err))
        .finally(() => this.$store.commit('HIDE_LOADING'))
    },
    confirmDialog() {
      const confirmMessage = this.project.open
        ? 'Tem certeza de que deseja encerrar o projeto? Ele ficará invisível para os alunos.'
        : 'Deseja iniciar o projeto?'
      this.$confirm(confirmMessage, 'Entrega', {
        confirmButtonText: this.project.open ? 'Sim, encerrar' : 'Sim, iniciar',
        cancelButtonText: 'Cancelar',
        confirmButtonClass: this.project.open
          ? 'el-button--danger'
          : 'el-button--success'
      }).then(() => {
        if (this.project.open) {
          const project = JSON.parse(JSON.stringify(this.project))
          this.$store
            .dispatch('closeProject', project)
            .catch(err => this.$throwError(err))
            .finally(() => this.$store.commit('HIDE_LOADING'))
        } else {
          this.update(true)
        }
      })
    },
    openReassignTeacherModal() {
      this.reassignTeacherModalVisibility = true
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.project-step-seven {
  padding: 20px 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid $--default-border-color;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      margin-bottom: 5px;
      color: $--color-text-title;
    }
    &__subtitle {
      color: $--color-text-regular;
      font-weight: 400;
      margin-bottom: 20px;
    }
  }
}
</style>
