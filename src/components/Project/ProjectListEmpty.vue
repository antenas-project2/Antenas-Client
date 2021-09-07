<template>
  <div class="project-list-empty h100 w-100">
    <el-empty :image-size="90">
      <template slot="description">
        <h4 class="main-message">Opa, nenhum projeto por aqui..</h4>
        <p class="main-submessage">Crie algum ou defina melhor os filtros</p>
      </template>
    </el-empty>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.project-list-empty {
  padding: 60px;
  .main-message {
    color: $--color-text-regular;
    font-weight: 500;
  }
  .main-submessage {
    margin-top: 6px;
    color: $--color-text-secondary;
  }
}
</style>
