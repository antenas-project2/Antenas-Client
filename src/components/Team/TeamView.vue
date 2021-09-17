<template>
  <div class="team-container h-100">
    <div v-if="teams.length == 0 && !createTeam" class="h-100">
      <div
        v-if="canEdit && teams.length == 0 && !createTeam"
        class="d-flex flex-column justify-center align-center h-100 py-4"
      >
        <img
          class="team-container__selecting-team-image"
          src="@/assets/images/selecting_team.svg"
        />
        <h4 class="team-container__selecting-team-description mt-3">
          <a
            href="#"
            class="text-primary"
            @click="createNewTeamModal = !createNewTeamModal"
          >
            Crie uma equipe
          </a>
          <span class="text-regular font-weight-500">
            ou peça para um colega te adicionar em uma. 👍🏼
          </span>
        </h4>
      </div>

      <div
        v-if="!$store.getters.isStudent"
        class="d-flex flex-column justify-center align-center h-100"
      >
        <img
          class="team-container__empty-teams-image"
          src="@/assets/images/empty_teams.svg"
        />
        <div
          class="team-container__empty-teams-description d-flex align-center mt-4"
        >
          <h4 class="text-regular font-weight-500">
            Ainda não há equipes cadastradas no momento! 👍🏼
          </h4>
        </div>
      </div>
    </div>

    <div v-else-if="teams.length > 0 && !createTeam">
      <el-collapse v-for="teamInfo in teams" :key="teamInfo.id" value="1">
        <el-collapse-item :title="teamInfo.name" name="1">
          <template slot="title">
            <i class="header-icon el-icon-office-building" style="font-size: 14pt;margin-right: 3px;"></i>
            <h4>{{ teamInfo.name }}</h4>
          </template>
          <div class="student-flex-box">
            <div
              v-for="member in teamInfo.studentTeamList"
              :key="member.label"
              :type="member.type"
              class="d-flex team-member member-view"
            >
              <Avatar
                :student="member"
                style="cursor: pointer;"
                @click.native="openStudentProfile(member.student)"
              />
              <div class="student-flex-box">
                <div v-if="canEdit" class="overlay">
                  <div class="icon" @click="editMember(member)">
                    <i class="el-icon-edit-outline" /> Editar
                  </div>
                  <div class="icon close" @click="removeStudent(member)">
                    <i class="el-icon-close" /> Remover
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="canEdit" class="justify-end d-flex">
            <el-button
              icon="el-icon-plus"
              type="text"
              @click="teamMemberAdditionModal = !teamMemberAdditionModal"
            >
              Adicionar novo membro
            </el-button>
          </div>
          <div v-if="canEdit">
            <el-form
              ref="form"
              v-loading="$store.getters.loading"
              class="team-form-url"
              label-position="top"
              label-width="130px"
            >
              <el-form-item label="Url do projeto" prop="projectUrl">
                <el-input
                  v-model="projectUrl"
                  type="text"
                  maxlength="50"
                  show-word-limit
                  @blur="update()"
                />
              </el-form-item>
              <el-form-item
                label="Link de comunicação"
                prop="communicationLink"
              >
                <el-input
                  v-model="communicationLink"
                  type="text"
                  maxlength="50"
                  show-word-limit
                  @blur="update()"
                />
              </el-form-item>
            </el-form>
          </div>
          <div v-else>
            <strong>Url do projeto: </strong>
            <el-link type="primary" @click="openUrl(teamInfo.projectUrl)">
              {{ teamInfo.projectUrl }}
            </el-link>
            <br />
            <strong>Link de comunicação: </strong>
            <el-link
              type="primary"
              @click="openUrl(teamInfo.communicationLink)"
            >
              {{ teamInfo.communicationLink }}
            </el-link>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <TeamMemberEditionModal
      v-if="canEdit"
      v-model="teamMemberEditionModal"
      :editingMember="editingMember"
      :students="students"
      :team="teams[0]"
      @updateTeam="updateTeams"
      @save="save"
    />
    <TeamMemberAdditionModal
      v-if="canEdit"
      v-model="teamMemberAdditionModal"
      :students="students"
      :team="teams[0]"
      @updateTeam="updateTeams"
      @save="save"
    />
    <CreateNewTeamModal v-model="createNewTeamModal" @save="save" />
  </div>
</template>

<script>
import TeamService from '@/services/TeamService'
import UserService from '@/services/UserService.js'
import Avatar from '@/components/Avatar'

import CreateNewTeamModal from '@/components/Team/CreateNewTeamModal'
import TeamMemberAdditionModal from '@/components/Team/TeamMemberAdditionModal'
import TeamMemberEditionModal from '@/components/Team/TeamMemberEditionModal'

import { mapGetters } from 'vuex'

export default {
  components: {
    Avatar,
    CreateNewTeamModal,
    TeamMemberAdditionModal,
    TeamMemberEditionModal
  },
  data() {
    return {
      createNewTeamModal: false,
      teamMemberAdditionModal: false,
      teamMemberEditionModal: false,
      teams: [],
      students: [],
      addMember: false,
      createTeam: false,
      editingMember: false,
      teamName: '',
      roles: [],
      newTeamMember: '',
      rolesSelect: [],
      communicationLink: '',
      projectUrl: ''
    }
  },
  computed: {
    ...mapGetters({
      project: 'selectedProject'
    }),
    canEdit() {
      return this.$store.getters.isStudent && !this.project.finished
    }
  },
  watch: {
    project() {
      this.getTeam()
    },
    teamMemberEditionModal() {
      if (!this.teamMemberEditionModal) {
        this.editingMember = null
      }
    }
  },
  mounted() {
    this.getTeam()
  },
  methods: {
    updateTeams() {
      this.$store.commit('SHOW_LOADING')
      TeamService.getTeam(this.project.id)
        .then(teams => {
          this.teams = teams
          if (this.$store.getters.isStudent && this.teams.length) {
            this.projectUrl = this.teams[0].projectUrl
            this.communicationLink = this.teams[0].communicationLink
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: 'Ops!',
            message: 'Ocorreu um erro ao atualizar a equipe.',
            type: 'error',
            position: 'bottom-right'
          })
        })
        .finally(() => this.$store.commit('HIDE_LOADING'))

      this.editingMember = null
    },
    getRoles() {
      if (this.$store.getters.isStudent) {
        TeamService.getRoles().then(roles => {
          this.rolesSelect = roles
        })
      }
    },
    getRoleObject(roles) {
      const roleList = []
      roles.forEach(role => {
        roleList.push({ id: role })
      })
      return roleList
    },
    save(name, roles) {
      TeamService.addTeam({
        project: { id: this.project.id },
        name: name,
        roles: this.getRoleObject(roles)
      })
        .then(() => {
          this.$notify({
            title: 'Equipe criada',
            message: 'A equipe foi criada com sucesso!',
            type: 'success',
            position: 'bottom-right'
          })
          this.createNewTeamModal = false
          this.updateTeams()
        })
        .catch(err => {
          if (err.response.status === 409) {
            this.$notify({
              title: 'Você já pertence a uma equipe!',
              message:
                'Para criar uma nova equipe, é necessário sair da outra.',
              type: 'error',
              position: 'bottom-right'
            })
          } else {
            this.$notify({
              title: 'Ops!',
              message: 'Ocorreu um erro ao criar uma equipe.',
              type: 'error',
              position: 'bottom-right'
            })
          }
        })
      this.clear()
    },
    update() {
      if (
        this.projectUrl &&
        this.communicationLink &&
        ((!this.projectUrl.includes('http://') &&
          !this.projectUrl.includes('https://')) ||
          !this.projectUrl ||
          (!this.communicationLink.includes('http://') &&
            !this.communicationLink.includes('https://')) ||
          !this.communicationLink)
      ) {
        this.$notify({
          title: 'Ops!',
          message: 'A url deve conter http:// ou https://.',
          type: 'error',
          position: 'bottom-right'
        })
      } else {
        const team = JSON.parse(JSON.stringify(this.teams[0]))
        if (this.newTeamMember) {
          team.studentTeamList.push({
            role: this.getRoleObject(),
            student: {
              id: this.newTeamMember
            }
          })
        }
        team.projectUrl = this.projectUrl
        team.communicationLink = this.communicationLink
        team.project = { id: this.project.id }
        TeamService.updateTeam(team)
          .then(() => {
            this.updateTeams()
          })
          .catch(err => {
            if (err.response.status === 409) {
              this.$notify({
                title: 'Ops!',
                message: 'Este aluno já pertence a uma equpe.',
                type: 'error',
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: 'Ops!',
                message: 'Ocorreu um erro ao atualizar a equipe.',
                type: 'error',
                position: 'bottom-right'
              })
            }
          })
        this.clear()
      }
    },
    formatStudentRoles(member) {
      let roleString = ''
      member.role.forEach(role => {
        if (roleString.length > 0) {
          roleString += ' / '
        }
        roleString += role.name
      })
      return roleString
    },
    removeStudent(student) {
      this.$confirm(
        `Tem certeza que deseja remover ${student.student.name} da equipe? (A equipe será excluída com essa ação)`,
        'Remover aluno',
        {
          confirmButtonText: 'Remover',
          cancelButtonText: 'Cancelar',
          confirmButtonClass: 'el-button--danger'
        }
      ).then(() => {
        this.$store.commit('SHOW_LOADING')
        TeamService.removeStudent(student.id)
          .then(() => {
            this.updateTeams()
            this.$notify({
              title: 'Sucesso!',
              message: `${student.student.name} foi removido do grupo`,
              type: 'success',
              position: 'bottom-right'
            })
          })
          .catch(err => {
            this.$throwError(err)
            this.$notify({
              title: 'Ops!',
              message: 'Ocorreu um erro ao remover o aluno da equipe.',
              type: 'error',
              position: 'bottom-right'
            })
          })
          .finally(() => {
            this.$store.commit('HIDE_LOADING')
          })
      })
    },
    getTeam() {
      this.updateTeams()
      UserService.getStudentsUsers().then(students => {
        this.students = students
      })
      this.getRoles()
    },
    editMember(member) {
      this.teamMemberEditionModal = true
      this.editingMember = member
    },
    clear() {
      this.editingMember = null
      this.addMember = false
      this.newTeamMember = ''
      this.roles = []
    },
    updateRole() {
      this.editingMember.role = this.getRoleObject()
      TeamService.updateStudentTeam(this.editingMember)
        .then(() => {
          this.$notify({
            title: 'Sucesso!',
            message: 'Função do aluno foi alterada.',
            type: 'success',
            position: 'bottom-right'
          })
          this.updateTeams()
        })
        .catch(() => {
          this.$notify({
            title: 'Ops!',
            message: 'Ocorreu um erro ao alterar a função do aluno.',
            type: 'error',
            position: 'bottom-right'
          })
        })
      this.clear()
    },
    openUrl(url) {
      const win = window.open(url, '_blank')
      win.focus()
    },
    openStudentProfile(student) {
      this.$router.push(
        `/${student.name.replace(' ', '.').replace(' ', '')}-${student.id}`
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.team-container {
  &__selecting-team-image {
    width: 250px;
  }
  &__selecting-team-description {
    min-width: 400px;
    text-align: center;

    a {
      text-decoration: none;
    }
  }
  &__empty-teams-image {
    width: 250px;
    padding: 8px 0;
  }
  &__empty-teams-description {
    min-width: 350px;
    text-align: center;

    h3 {
      font-weight: 500;
    }
  }
}

@media (max-width: 900px) {
  .team-container {
    &__selecting-team-image {
      width: 250px;
    }
    &__selecting-team-description {
      min-width: auto;
      text-align: center;

      a {
        text-decoration: none;
      }
    }
    &__empty-teams-image {
      width: 250px;
      padding: 10px 0;
    }
    &__empty-teams-description {
      min-width: auto;
      text-align: center;

      h3 {
        font-weight: 500;
      }
    }
  }
}

.el-alert .el-alert__description {
  font-size: 14px;
}
.el-alert__closebtn el-icon-close {
  visibility: hidden !important;
}
.el-select {
  width: 100%;
}
.student-flex-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.team-member {
  background-color: white;
  border-radius: 6px;
  padding: 20px 10px;
  min-width: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px outset #1c6ea436;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.123));
}
.role-view {
  // font-family: Open Sans;
  font-size: 14px;
  line-height: 14px;
  color: #9f9d9d;
  padding-top: 5px;
}

// overlay
.member-view {
  position: relative;
}
.image {
  display: block;
  width: 100%;
  height: auto;
}
.overlay {
  border-radius: 6px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: 0.6s ease;
  background-color: #00000094;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.member-view:hover .overlay {
  opacity: 1;
}
.icon {
  color: #d0cccc;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
}
.icon:hover {
  color: #e6e5e5;
}
.member-name {
  color: $--color-text-regular;
  line-height: 1;
}
.el-collapse {
  border-top: none;
}

@media (max-width: 680px) {
  .team-member {
    margin-right: 0;
    width: 100%;
  }
}
</style>
