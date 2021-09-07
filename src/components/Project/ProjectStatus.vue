<template>
  <div v-if="project.approvedBy && project.reason" class="project-status">
    <h5 class="project-status__title">Status do projeto</h5>
    <div class="project-status-group">
      <h6
        v-if="project.approvedBy"
        class="project-status__subtitle d-flex align-center text-success"
      >
        <box-icon
          class="project-status__subtitle__icon success-icon"
          name="check-circle"
        />
        Projeto aprovado
      </h6>
      <small v-if="project.reason" class="project-status__description">
        Motivo: {{ project.reason }}
      </small>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project']
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.project-status {
  &__title {
    margin-bottom: 8px;
  }
  &__subtitle {
    &__icon {
      width: 16px;
      margin-right: 4px;
    }

    .danger-icon {
      fill: $--color-danger;
    }
    .success-icon {
      fill: $--color-success;
    }
  }
  &__description {
    font-size: 0.8rem;
    color: $--color-text-regular;
  }
  .project-status-group {
    border: 1px solid $--default-border-color;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 20px;
  }
}
</style>
