<template>
  <div shadow="never" class="project-list h100">
    <div
      class="project-list-header justify-between d-flex align-center p-2 mt-2"
    >
      <h3>Projetos</h3>
      <div class="d-flex">
        <el-button
          class="projects-filter-button"
          type="primary"
          @click="openProjectFilters"
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon
              points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
            ></polygon>
          </svg>
        </el-button>
        <el-button
          v-if="$store.getters.isRepresentative"
          class="new"
          type="primary"
          size="mini"
          @click="showProjectModal"
        >
          Novo projeto
        </el-button>
      </div>
    </div>

    <div class="project-list-search-header d-flex align-center">
      <el-input
        v-model="searchTerm"
        placeholder="Buscar por projetos"
        suffix-icon="el-icon-search"
        class="w100"
        clearable
      />
    </div>

    <ProjectListLoading v-if="isLoading" />
    <ProjectListError v-else-if="!isLoading && hasError" />
    <ProjectListEmpty
      v-else-if="!isLoading && !hasError && filteredProject.length === 0"
    />
    <div v-else class="project-list-contents small-scroll">
      <ProjectCard
        v-for="(project, index) in filteredProject"
        :key="index"
        :project="project"
        :isActive="activeProjectId === project.id"
        @click="selectProject"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ProjectCard from '@/components/Project/ProjectCard'
import ProjectListLoading from '@/components/Project/ProjectListLoading'
import ProjectListEmpty from './ProjectListEmpty'
import ProjectListError from './ProjectListError'

export default {
  components: {
    ProjectCard,
    ProjectListLoading,
    ProjectListEmpty,
    ProjectListError
  },
  props: {
    activeProjectIdProps: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchTerm: ''
    }
  },
  computed: {
    ...mapGetters(['projects', 'isProjectsLoading', 'hasError', 'filterQuery']),
    hasError() {
      return this.$store.getters.hasError
    },
    isLoading() {
      return this.$store.getters.isProjectsLoading
    },
    activeProjectId: {
      get() {
        return this.$store.getters.selectedProject?.id || 0
      },
      set(id) {
        this.$store.commit('SET_SELECTED_PROJECT_ID', id)
      }
    },
    filteredProject() {
      let found = []

      if (this.searchTerm) {
        found = this.projects.filter(project => {
          const searched = this.searchTerm.toLowerCase()
          const title = project.title.toLowerCase()
          const shortDescription = project.shortDescription.toLowerCase()

          return title.includes(searched) || shortDescription.includes(searched)
        })
      } else {
        found = this.projects.filter(project => {
          return this.filterQuery.projectStatus.includes(project.progress)
        })
      }
      return found
    }
  },
  methods: {
    selectProject(id) {
      this.activeProjectId = id
      this.$emit('selectProject')
    },
    showProjectModal() {
      this.$store.commit('SET_PROJECT_MODAL', true)
    },
    openProjectFilters() {
      this.$store.commit('CHANGE_PROJECT_FILTER_MODAL_VISIBILITY', true)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.project-list {
  height: 100%;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-left: 1px solid $--default-border-color;

  .project-list-header {
    padding: 12px 18px 5px 18px;
    font-weight: 600;
    color: $--color-text-regular;

    .projects-filter-button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 7px;
      background-color: rgb(68, 114, 233, 0.15);
      border: 0;

      span {
        display: flex;
        stroke: $--color-primary;
        justify-content: center;
      }
    }
  }

  .project-list-search-header {
    padding: 8px;
    border-bottom: 1px solid $--default-border-color;
  }

  > .el-card__body {
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .project-list-contents {
    height: 100%;
    overflow-y: auto;
  }
  .filter-button {
    font-size: 1.2rem;
    padding: 0 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
