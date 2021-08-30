<template>
  <div ref="projectsContainer" class="projects w-100">
    <transition-group name="card" tag="div" class="d-flex w100 h100">
      <ProjectsList
        key="1"
        ref="projectList"
        class="project-list-container"
        @selectProject="selectProject"
      />
      <ProjectDetails
        key="2"
        ref="projectDetails"
        class="project-details-container"
        @backToList="backToList"
      />
    </transition-group>

    <NewProjectModal />
    <ProjectFilterModal />
  </div>
</template>

<script>
import ProjectsList from '@/components/Project/ProjectsList'
import ProjectDetails from '@/components/Project/ProjectDetails.vue'
import NewProjectModal from '@/components/Project/NewProjectModal'
import ProjectFilterModal from '@/components/Project/ProjectFilterModal'

export default {
  components: {
    ProjectsList,
    ProjectDetails,
    NewProjectModal,
    ProjectFilterModal
  },
  methods: {
    selectProject() {
      this.$refs.projectDetails.$el.classList.add(
        'show-project-details-container'
      )
      document.getElementById('sidebar').classList.add('minimize-sidebar')
      this.$refs.projectsContainer.classList.add('maximize-projects-container')
    },
    backToList() {
      this.$refs.projectDetails.$el.classList.remove(
        'show-project-details-container'
      )
      document.getElementById('sidebar').classList.remove('minimize-sidebar')
      this.$refs.projectsContainer.classList.remove(
        'maximize-projects-container'
      )
    }
  }
}
</script>

<style lang="scss">
.show-project-details-container {
  right: 0 !important;
}

@media (min-width: 792px) {
  .project-list-container {
    width: 360px;
    min-width: 360px;
  }
}

@media (max-width: 792px) {
  .projects {
    // Screen minus sidebar width
    width: calc(100% - 65px);
    position: relative;
    overflow: hidden;
    z-index: 5;
  }
  .minimize-sidebar {
    width: 0 !important;
    min-width: 0 !important;
  }
  .maximize-projects-container {
    width: 100% !important;
  }
  .project-list-container,
  .project-list-container .project-card,
  .project-list-container .project-card .project-card-body {
    width: 100% !important;
  }
  .project-list-container
    .project-card
    .project-card-body
    .project-main-information
    .project-description {
    max-width: none;
  }
  .project-list-container
    .project-card
    .project-card-body
    .project-main-information {
    width: 70%;
  }
  .project-details-container {
    position: absolute;
    right: -100%;
    background-color: #ffffff;
    transition: all 0.3s;
  }
}
</style>
