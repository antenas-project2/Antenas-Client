<template>
  <div class="resumed-steps d-flex justify-center">
    <el-steps
      :active="currentPosition"
      finish-status="success"
      :process-status="projectStatus"
      align-center
    >
      <el-step
        v-for="(step, index) in steps"
        :key="index"
        :title="step"
        :class="shouldShowStep(index)"
      />
    </el-steps>
  </div>
</template>

<script>
export default {
  props: ['project', 'steps', 'projectStatus'],
  computed: {
    currentPosition() {
      return this.project.progress - 1
    }
  },
  methods: {
    shouldShowStep(index) {
      const isLastPosition = index === this.currentPosition + 1
      if (this.project.progress === 9) {
        return index === this.currentPosition
          ? 'visible-step hide-last-line'
          : 'd-none'
      } else {
        if (isLastPosition) {
          return 'visible-step hide-last-line'
        }

        return index < this.currentPosition - 1 ||
          index > this.currentPosition + 1
          ? 'd-none'
          : 'visible-step'
      }
    }
  }
}
</script>

<style lang="scss">
.resumed-steps {
  padding: 18px 0;

  .el-steps {
    width: 100%;
    display: flex;
    justify-content: center;

    .hide-last-line {
      .el-step__line {
        display: none !important;
      }
    }
  }

  .el-step__title {
    font-size: 10pt;
    line-height: 1rem;
    padding: 7px;
  }
}
</style>
