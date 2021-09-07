<template>
  <div class="project-steps">
    <el-steps
      :active="project.progress - 1"
      finish-status="success"
      :process-status="projectStatus"
      align-center
    >
      <el-step v-for="(step, index) in steps" :key="index" :title="step" />
    </el-steps>
  </div>
</template>

<script>
export default {
  props: ['project', 'steps', 'projectStatus']
}
</script>

<style lang="scss">
.project-steps {
  padding: 18px 0;

  .el-step__title {
    font-size: 10pt;
    line-height: 1rem;
    padding: 7px;
  }
}
</style>
