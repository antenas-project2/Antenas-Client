import http from '../helpers/Http'

export default {
  getProjects() {
    return http.get('/project')
      .then(res => res.data)
  },
  getProject(projectId) {
    return http.get(`/project/${projectId}`)
      .then(res => res.data)
  },
  addProject(project) {
    return http.post('/project', project)
      .then(res => res.data)
  },
  updateProject(project) {
    return http.put('/project', project)
      .then(res => res.data)
  },
  closeProject(project) {
    return http.put('/project/close', project)
      .then(res => res.data)
  },
  deleteProject(id) {
    return http.delete(`/project/${id}`)
  }
}
