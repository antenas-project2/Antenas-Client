<template>
  <div class="project-information">
    <h5 class="project-information__title">Descrição do projeto</h5>
    <div class="project-information__group w-100">
      <ProjectFieldGroup
        v-if="project.completeDescription"
        title="Descrição completa"
        :value="project.completeDescription"
      />
      <ProjectFieldGroup
        v-if="project.technologyDescription"
        title="Tecnologias"
        :value="project.technologyDescription"
      />
      <ProjectFieldGroup
        v-if="project.notes && !$store.getters.isStudent"
        title="Notas adicionais"
        :value="project.notes"
      />
    </div>
  </div>
</template>

<script>
import ProjectFieldGroup from './ProjectFieldGroup'

export default {
  components: {
    ProjectFieldGroup
  },
  props: ['project']
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.project-information {
  &__title {
    margin-bottom: 8px;
  }
  &__group {
    border: 1px solid $--default-border-color;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 20px;
  }
}
</style>
