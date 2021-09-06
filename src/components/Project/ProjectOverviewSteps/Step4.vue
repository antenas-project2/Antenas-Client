<template>
  <div class="project-step-four">
    <div
      v-if="$store.getters.isCadi && !project.refused"
      class="project-step-four__action"
    >
      <h5 class="project-step-four__title">Avaliação inicial</h5>
      <el-alert
        class="project-step-four__alert-container"
        title="Leia as especificações do projeto e decida-se se ele ainda está apto a continuar:"
        type="info"
        :closable="false"
      >
        <el-button type="danger" icon="el-icon-close" @click="update(true)">
          Rejeitar
        </el-button>
        <el-button
          type="success"
          class="ml-16"
          icon="el-icon-check"
          @click="update(false)"
        >
          Aprovar
        </el-button>
      </el-alert>
    </div>

    <Information v-else>
      Nesta etapa um <b>Cadi</b> irá analisar o projeto de forma mais detalhada
      após a novas descrições adicionadas pelo <b>representate</b>. Após a analise, ele
      irá decidir se o mesmo ainda está apto a continuar. <b>Aguarde</b> até que
      seja feita a revisão.
    </Information>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Information from '@/components/Information.vue'

export default {
  components: {
    Information
  },
  computed: {
    ...mapGetters({
      project: 'selectedProject'
    })
  },
  methods: {
    update(refused) {
      const project = JSON.parse(JSON.stringify(this.project))
      if (refused) {
        this.$prompt('* Informe o motivo da recusa', 'Avaliação Inicial', {
          confirmButtonText: 'Rejeitar',
          cancelButtonText: 'Cancelar',
          confirmButtonClass: 'el-button--danger',
          inputPattern: /([^\s])/,
          inputErrorMessage: 'Campo obrigatório'
        }).then(({ value }) => {
          project.refused = true
          project.reason = value
          this.dispatchUpdate(project)
        })
      } else {
        this.$confirm(
          'Tem certeza que deseja continuar?',
          'Avaliação Inicial',
          {
            confirmButtonText: 'Aprovar',
            cancelButtonText: 'Cancelar',
            confirmButtonClass: 'el-button--success'
          }
        ).then(() => {
          project.refused = false
          this.dispatchUpdate(project)
        })
      }
    },
    dispatchUpdate(project) {
      this.$store.commit('SHOW_LOADING')
      this.$store
        .dispatch('updateProject', project)
        .catch(err => this.$throwError(err))
        .finally(() => this.$store.commit('HIDE_LOADING'))
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.project-step-four {
  margin-bottom: 20px;

  &__alert-container {
    background-color: #ffffff !important;

    .el-alert__content {
        padding: 5px;
    }
    .el-alert__title {
      font-size: 0.9rem;
      color: $--color-text-title;
    }
  }

  &__title {
    margin-bottom: 8px;
    color: $--color-text-title;
  }

  &__action,
  &__warning {
    border: 1px solid $--default-border-color;
    border-radius: 4px;
    padding: 12px;
  }

  &__warning {
    &__description {
      font-size: 0.8rem;
      color: $--color-primary;

      .info-icon {
        fill: $--color-primary;
        width: 2rem;
        margin-right: 10px;
      }
    }
  }
}
</style>
