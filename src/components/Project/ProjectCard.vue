<template>
  <div class="project-card">
    <el-card
      shadow="never"
      :class="{ 'project-selected': isActive }"
      @click.native="$emit('click', project.id)"
    >
      <div class="d-flex justify-between">
        <div class="project-card-body d-flex justify-between align-center w100">
          <div class="project-main-information d-flex flex-column">
            <h4 class="project-title">{{ project.title }}</h4>
            <small class="project-description">
              {{ project.shortDescription }}
            </small>
            <div class="d-flex justify-between align-center"></div>
          </div>
          <b class="project-updatedAt d-flex align-center">
            <box-icon class="calendar" name="calendar-edit" size="xs" />
            {{
              project.updatedAt
                ? project.updatedAt
                : project.createdAt | moment('DD/MM/YYYY')
            }}
          </b>
        </div>
      </div>
      <el-tag
        :type="getTagTypeByProjectProgress(project.status)"
        class="project-status-tag"
        style="text-overflow: ellipsis;max-width: 220px;overflow: hidden;"
        size="small"
      >
        {{ project.labelPhase }}
      </el-tag>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTagTypeByProjectProgress(progress) {
      const tagTypes = {
        waiting: 'primary',
        pending: 'warning',
        refused: 'danger',
        concluded: 'success'
      }

      return tagTypes[progress]
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
@import '@/styles/_colors.scss';

.project-card {
  :hover {
    background-color: $--default-hover-color;
    transition: 0.3s;
  }
  .project-card-body {
    .project-title {
      font-weight: 500;
      margin-bottom: 3px;
    }
    .project-description {
      font-size: 0.8rem;
      color: $--color-text-secondary;
      font-weight: 400;
      max-width: 230px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-top: 5px;
      padding-bottom: 10px;
    }
    .project-updatedAt {
      font-size: 9pt;
      font-weight: 600;
      color: $--color-text-secondary;

      .calendar {
        width: 18px;
        height: 18px;
        margin-right: 3px;
        fill: $--color-text-secondary;
      }
    }
  }

  > .el-card {
    border: 0;
    transition: 0;

    &.project-selected {
      background-color: $--default-hover-color !important;
    }

    > .el-card__body {
      padding: 12px 12px 12px 18px;
    }
  }
  .el-card {
    padding: 10px 0;
    border-radius: 0;
    border-bottom: 1px solid $--default-border-color !important;
    cursor: pointer;
  }

  .project-status-tag.el-tag {
    border-radius: 50px !important;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 8.3pt;
    border: 0;
    line-height: 2.2;
    padding: 0 13px;
  }

  // .alert {
  //   top: -4px;
  //   right: -4px;
  //   font-size: 1.4rem;
  //   position: absolute;
  //   color: $--color-warning;
  //   animation: pulse 1.5s infinite linear;
  // }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
