import http from '../helpers/Http'

export default {
  async getStudents() {
    return http.get('/student').then(res => {
      const students = res.data
      return students.map(student => ({
        id: student.id,
        email: student.email,
        name: student.name,
        photo: student.photo,
        role: student.authorizations[0].name,
        cpf: student.cpf,
        city: student.city,
        ra: student.ra,
        linkedin: student.linkedin,
        academicInformation: student.academicInfos,
        professionalInformation: student.profissionalInfos,
        medalsAmount: student.studentMedals.length
      }))
    })
  },
  async updatePublicProfile(markdownProfile) {
    return http.put('/student/public-profile', { markdownProfile }).then(res => {
      return res.data
    })
  }
}
