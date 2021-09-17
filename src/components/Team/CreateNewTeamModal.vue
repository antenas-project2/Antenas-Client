<template>
  <div class="create-new-team-modal">
    <Modal v-model="modalVisibility">
      <div class="create-new-team-modal__container">
        <h5>Criar equipe</h5>
        <div>
          <h6 class="mb-1 mt-3">Nome da equipe</h6>
          <el-input
            v-model="teamName"
            type="text"
            maxlength="15"
            show-word-limit
          />

          <h6 class="mb-1 mt-3">Sua função na equipe</h6>
          <el-select v-model="roles" multiple class="w-100">
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
  props: ['value'],
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
      this.$emit('save', this.teamName, this.roles)
      this.teamName = null
      this.roles = ''
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.create-new-team-modal {
  &__container {
    overflow: hidden;
  }
}

@media (min-width: 580px) {
  .create-new-team-modal {
    .overlay {
      overflow: hidden;
      width: 400px;
    }
  }
}
</style>
