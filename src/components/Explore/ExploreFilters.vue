<template>
  <div>
    <div v-if="visibility" class="explore-filters">
      <h4 class="text-primary mb-3">Filtrar por:</h4>
      <div>
        <div class="mb-3">
          <p class="font-weight-500 mb-1">Medalhas:</p>
          <el-input-number
            class="explore-filters__amount-filters"
            v-model="medalsAmount"
            :min="0"
            :max="1000"
            @input="changeMedalsAmount"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    visibility: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  data() {
    return {
      medalsAmount: 0
    }
  },
  methods: {
    changeMedalsAmount() {
      this.$emit('changeMedalsAmount', this.medalsAmount)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.explore-filters {
  width: auto;
  height: 300px;
  background-color: #ffffff;
  border: 1px solid $--default-border-color;
  box-shadow: 0 6px 10px rgb(0 0 0 / 5%), 0 4px 6px rgb(0 0 0 / 5%);
  border-radius: 4px;
  padding: 12px 16px;
  position: absolute;
  right: 0;
  bottom: -310px;
  z-index: 9999999999999999999999999;
  // top: 160px;
  // right: 300px;
  // left: 0;
  // margin: auto;

  &__amount-filters {
    width: 180px !important;
  }
}

@media (max-width: 580px) {
  .explore-filters {
    width: 100%;
  }
}
</style>
