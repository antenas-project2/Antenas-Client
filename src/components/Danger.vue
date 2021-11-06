<template>
  <div class="danger">
    <div class="danger__group">
      <div class="danger__group__description d-flex align-center">
        <i class="danger-icon el-icon-error" />
        <span>
          <slot />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.danger {
  margin-bottom: 20px;

  &__group {
    border: 1px solid $--color-danger;
    border-radius: 4px;
    padding: 12px;

    &__description {
      font-size: 0.8rem;
      color: $--color-danger;

      .danger-icon {
        fill: $--color-danger;
        font-size: 16pt;
        margin-right: 10px;
      }
    }
  }
}
</style>
