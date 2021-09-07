<template>
  <div
    class="no-project-selected d-flex justify-center align-center text-center h100"
  >
    <el-empty :image-size="250">
      <template slot="description">
        <h1 class="main-message">Nenhum projeto por aqui ainda =/</h1>
        <h3 class="sub-message">
          Selecione um para saber mais informações
          <span v-if="!$store.getters.isRepresentative">.</span>
          <span>ou crie o seu agora mesmo.</span>
        </h3>
      </template>
      <el-button
        v-if="$store.getters.isRepresentative"
        class="create-project-button"
        type="primary"
        @click="openNewProjectModal"
      >
        Novo projeto
      </el-button>
    </el-empty>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      project: 'selectedProject'
    })
  },
  methods: {
    openNewProjectModal() {
      this.$emit('open-new-project-modal')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.no-project-selected {
  padding: 3%;

  .main-message {
    color: $--color-text-regular;
    margin-bottom: 15px;
  }
  .sub-message {
    color: $--color-text-secondary;
  }
  .create-project-button {
    margin-top: 15px;
  }
}
</style>
