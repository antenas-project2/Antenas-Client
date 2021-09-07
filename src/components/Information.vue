<template>
  <div class="information">
    <div class="information__group">
      <div class="information__group__description d-flex align-center">
        <i class="information-icon el-icon-warning-outline" />
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

.information {
  margin-bottom: 20px;

  &__group {
    border: 1px solid $--color-primary;
    border-radius: 4px;
    padding: 12px;

    &__description {
      font-size: 0.8rem;
      color: $--color-primary;

      .information-icon {
        fill: $--color-primary;
        font-size: 16pt;
        margin-right: 10px;
      }
    }
  }
}
</style>
