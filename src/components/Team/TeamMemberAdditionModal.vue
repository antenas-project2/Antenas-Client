<template>
  <div class="new-member-team-modal">
    <Modal v-model="modalVisibility">
      <div class="new-member-team-modal__container">
        <h5>Adicionar um membro na equipe</h5>
      </div>

      <div class="w-100 mt-2">
        <h6 class="mb-1 mt-3">Aluno</h6>
        <el-select
          v-model="teamName"
          class="w-100"
          filterable
        >
          <el-option
            v-for="student in students"
            :key="student.id"
            :label="`${student.name}`"
            :value="student.id"
          />
        </el-select>

        <h6 class="mb-1 mt-3">Função na equipe</h6>
        <el-select v-model="roles" class="w-100" multiple>
          <el-option
            v-for="roleList in rolesSelect"
            :key="roleList.id"
            :label="roleList.name"
            :value="roleList.id"
          />
        </el-select>
      </div>

      <div class="d-flex justify-center mt-3">
        <el-button class="w-100" @click="modalVisibility = false">
          Cancelar
        </el-button>
        <el-button type="primary" class="w-100" @click="save()">
          Salvar
        </el-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'

import TeamService from '@/services/TeamService'

export default {
  components: {
    Modal
  },
  props: ['value', 'students', 'team'],
  data() {
    return {
      teamName: '',
      roles: '',
      rolesSelect: []
    }
  },
  mounted() {
    this.getRoles()
  },
  computed: {
    modalVisibility: {
      get() {
        return this.value
      },
      set(visibility) {
        this.$emit('input', visibility)
      }
    }
  },
  methods: {
    async getRoles() {
      if (this.$store.getters.isStudent) {
        this.rolesSelect = await TeamService.getRoles()
      }
    },
    save() {
      const team = JSON.parse(JSON.stringify(this.team))
      team.studentTeamList.push({
        role: this.getRoleObject(this.roles),
        student: {
          id: this.teamName
        }
      })

      TeamService.updateTeam(team)
        .then(() => {
          this.throwAlert('Sucesso', 'Aluno adicionado na equipe com sucesso.', 'success')
          this.updateTeam()
        })
        .catch(err => {
          if (err.response.status === 409) {
            this.throwAlert('Ops!', 'Este aluno já pertence a uma equpe.', 'error')
          } else {
            this.throwAlert('Ops!', 'Ocorreu um erro ao atualizar a equipe.', 'error')
          }
        })

      this.teamName = null
      this.roles = ''
      this.modalVisibility = false
    },
    getRoleObject(roles) {
      const roleList = []
      roles.forEach(role => {
        roleList.push({ id: role })
      })
      return roleList
    },
    updateTeam() {
      this.$emit('updateTeam')
    },
    throwAlert(title, msg, type) {
      this.$notify({
        title: title,
        message: msg,
        type: type,
        position: 'bottom-right'
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.new-member-team-modal {
  .overlay__content {
    overflow: hidden !important;
  }
}
.new-member-team-modal {
  &__container {
    overflow: hidden;
  }
}

@media (min-width: 580px) {
  .new-member-team-modal {
    .overlay {
      overflow: hidden;
      min-width: 400px;
      width: 400px;
    }
  }
}
</style>
