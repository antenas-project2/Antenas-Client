<template>
  <div class="project-field-group">
    <h5 class="field">{{ title }}</h5>
    <p class="value">
      {{ value }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['title', 'value']
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.project-field-group {
  margin-bottom: 15px;

  &:last-child {
      margin-bottom: 0;
  }

  .field {
    margin-bottom: 8px;
    color: $--color-text-title;
  }
  .value {
    font-size: 0.8rem;
    word-break: break-all;
  }
}
</style>
