import Vue from 'vue'
import ProjectService from '@/services/ProjectService.js'

export default {
  state: {
    projects: [],
    selectedProjectId: 0,
    defaultFilterQuery: {
      projectStatus: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    filterQuery: {
      projectStatus: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    projectFilterModalVisibility: false,
    hasError: false,
    isProjectsLoading: false,
    creatingProject: false
  },
  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects.map(project => {
        const status = Vue.prototype.$getProjectStatus(project)
        const labelPhase = Vue.prototype.$getProjectLabelPhase(status, project)
        return { ...project, status, labelPhase }
      })
    },
    SET_SELECTED_PROJECT_ID(state, selectedProjectId) {
      state.selectedProjectId = selectedProjectId
    },
    CLEAR_PROJECTS(state) {
      state.projects = []
      state.selectedProjectId = 0
    },
    UPDATE_PROJECT(state, project) {
      const status = Vue.prototype.$getProjectStatus(project)
      const labelPhase = Vue.prototype.$getProjectLabelPhase(status, project)
      const index = state.projects.findIndex(item => item.id === project.id)
      Vue.set(state.projects, index, { ...project, status, labelPhase })
    },
    ADD_PROJECT(state, project) {
      const status = Vue.prototype.$getProjectStatus(project)
      const labelPhase = Vue.prototype.$getProjectLabelPhase(status, project)
      state.projects.unshift({ ...project, status, labelPhase })
    },
    APPLY_FILTERS(state, query) {
      state.filterQuery.projectStatus = query.projectStatus
    },
    // FILTER MODAL
    CHANGE_PROJECT_FILTER_MODAL_VISIBILITY(state, visibility) {
      state.projectFilterModalVisibility = visibility
    },
    // Errors
    THROW_ERROR(state) {
      state.hasError = true
    },
    RESET_ERROR(state) {
      state.hasError = false
    },
    // Loadings
    SET_LOADING(state) {
      state.isProjectsLoading = true
    },
    RESET_LOADING(state) {
      state.isProjectsLoading = false
    },
    SET_CREATING_PROJECT(state) {
      state.creatingProject = true
    },
    RESET_CREATING_PROJECT(state) {
      state.creatingProject = false
    }
  },
  actions: {
    loadProjects({ commit }) {
      commit('RESET_ERROR')
      commit('SET_LOADING')
      return new Promise((resolve, reject) => {
        ProjectService.getProjects()
          .then(projects => {
            commit('RESET_LOADING')
            commit('SET_PROJECTS', projects)
            resolve()
          })
          .catch(err => {
            commit('RESET_LOADING')
            commit('THROW_ERROR')
            reject(err)
          })
      })
    },
    saveProject({ commit }, project) {
      commit('SET_CREATING_PROJECT')
      return new Promise((resolve, reject) => {
        ProjectService.addProject(project)
          .then(res => {
            commit('RESET_CREATING_PROJECT')
            commit('ADD_PROJECT', res)
            resolve()
          })
          .catch(err => {
            commit('RESET_CREATING_PROJECT')
            reject(err)
          })
      })
    },
    updateProject({ commit }, project) {
      return new Promise((resolve, reject) => {
        ProjectService.updateProject(project)
          .then(res => {
            commit('UPDATE_PROJECT', res)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateProjectView({ commit }, project) {
      commit('UPDATE_PROJECT', project)
    },
    closeProject({ commit }, project) {
      return new Promise((resolve, reject) => {
        ProjectService.closeProject(project)
          .then(res => {
            commit('UPDATE_PROJECT', res)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    projects: state => state.projects,
    hasError: state => state.hasError,
    isProjectsLoading: state => state.isProjectsLoading,
    creatingProject: state => state.creatingProject,
    projectFilterModalVisibility: state => state.projectFilterModalVisibility,
    selectedProject: state =>
      state.projects.find(p => p.id === state.selectedProjectId),
    filterQuery: state => state.filterQuery,
    defaultFilterQuery: state => state.defaultFilterQuery
  }
}
