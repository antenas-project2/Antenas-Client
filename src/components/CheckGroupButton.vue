<template>
  <div class="check-group-button">
    <button
      v-for="option in options"
      :key="option.value"
      class="check-group-button__item"
      :class="isSelected(option.value)"
      @click="selectItem(option.value)"
    >
      {{ option.title }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['value', 'options'],
  data() {
    return {
      selectedsIds: []
    }
  },
  created() {
    if (this.value) {
      this.value.map(v => this.selectedsIds.push(v))
    }
  },
  watch: {
    value() {
      this.value.forEach(v => {
        if (!this.selectedsIds.includes(v)) {
          this.selectedsIds.push(v)
        }
      })
    }
  },
  methods: {
    selectItem(id) {
      if (this.selectedsIds.includes(id)) {
        const index = this.selectedsIds.findIndex(
          selectedId => selectedId === id
        )
        this.selectedsIds.splice(index, 1)
      } else {
        this.selectedsIds.push(id)
      }

      this.$emit('input', this.selectedsIds)
    },
    isSelected(id) {
      return this.selectedsIds.includes(id) ? 'has-selected' : null
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.check-group-button {
  &__item {
    margin-top: 5px;
    margin-left: 0 !important;
    margin-right: 5px;
    border-radius: 50px;
    font-size: 12px;
    padding: 8px 10px;
    border: 0;
    color: $--color-text-secondary;
    cursor: pointer;

    &.has-selected {
      color: $--color-primary;
      background-color: rgba(
        $--r-color-primary,
        $--g-color-primary,
        $--b-color-primary,
        0.2
      );
    }
  }
}
</style>
