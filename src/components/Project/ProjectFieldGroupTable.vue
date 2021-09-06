<template>
  <div>
    <div v-if="shouldShowTable" class="project-field-group-table">
      <h5 class="field">{{ title }}</h5>

      <div class="group-table">
        <div
          v-for="(option, index) in filterVisibleOptions(options)"
          :key="index"
        >
          <div
            v-if="option.visible"
            class="group-table__item"
            :class="{
              'separation-border': index < totalVisibleValues - 1
            }"
          >
            <ul class="d-flex justify-between align-center">
              <li class="group-table__item__title">
                {{ option.title }}
              </li>
              <li class="group-table__item__value">
                {{ option.value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * option should be: [{ title, value }]
 */
export default {
  props: ['title', 'options'],
  computed: {
    shouldShowTable() {
      return this.options.find(option => option.visible)
    },
    totalVisibleValues() {
      return this.options.filter(option => option.visible).length
    }
  },
  methods: {
    filterVisibleOptions(options) {
      return options.filter(option => option.visible)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.project-field-group-table {
  .field {
    margin-bottom: 8px;
  }

  .group-table {
    border-radius: 4px;
    border: 1px solid $--default-border-color;

    &__item {
      padding: 10px;

      &.separation-border {
        border-bottom: 1px solid $--default-border-color;
      }

      &__title {
        font-size: 0.8rem;
        font-weight: 600;
        color: $--color-text-title;
      }
      &__value {
        font-size: 0.8rem;
        color: $--color-text-regular;
      }
    }
  }
}
</style>
