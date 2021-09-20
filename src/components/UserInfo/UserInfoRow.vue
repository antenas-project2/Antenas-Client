<template>
  <div class="user-info-row">
    <div class="user-info-row__container">
      <div>
        <h5>{{ firstColumn }}</h5>
        <p class="user-info-row__container__role">{{ secondColumn }}</p>
      </div>
    </div>
    <slot />

    <div class="user-info-row__container__actions d-flex justify-center">
      <el-button
        size="small"
        icon="el-icon-edit"
        type="primary"
        @click="edit()"
      />
      <el-button
        size="small"
        icon="el-icon-delete"
        type="danger"
        @click="remove()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'firstColumn', 'secondColumn'],
  data() {
    return {}
  },
  methods: {
    edit() {
      this.$emit('edit', this.id)
    },
    remove() {
      this.$emit('remove', this.id)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.user-info-row {
  padding: 10px 10px;
  border: 1px solid $--default-border-color;
  border-radius: 4px;
  margin-top: 10px;

  &__container {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;

    &__role {
      font-size: 0.8rem;
    }
    &__actions {
        margin-top: 10px;
    }
  }
}

@media (max-width: 700px) {
  .user-info-row {
    &__container {
    }
  }
}
</style>
