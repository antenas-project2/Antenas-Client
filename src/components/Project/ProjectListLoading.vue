<template>
  <div class="project-list-loading">
    <div v-for="item in itemsAmount" :key="item" class="skeleton-container">
      <el-skeleton :rows="3" animated />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsAmount: [1, 2, 3]
    }
  },
  mounted() {
    const randomAmount = Math.floor(Math.random() * 4) + 1
    this.itemsAmount = Array.apply(0, Array(randomAmount)).map((_, i) => {
      return i + 1
    })
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.project-list-loading {
  .skeleton-container {
    padding: 18px;
    border-bottom: 1px solid $--default-border-color !important;
  }
}
</style>
