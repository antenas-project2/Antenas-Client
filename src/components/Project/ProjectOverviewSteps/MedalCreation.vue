<template>
  <div class="medal-creation-container">
    <Modal v-model="modalVisibility">
      <div class="medal-creation">
        <div class="medal-creation__header">
          <h4 class="mb-2">Criação de medalha</h4>
        </div>

        <div class="medal-creation__content">
          <el-form
            class="medal-creation__content__inputs"
            ref="medalForm"
            :model="medal"
            :rules="rules"
            label-position="top"
            label-width="130px"
          >
            <el-form-item label="Nome" prop="name">
              <el-input v-model="medal.name" maxlength="15" show-word-limit />
            </el-form-item>
            <el-form-item label="Descrição" prop="description">
              <el-input
                v-model="medal.description"
                maxlength="15"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Categoria" prop="category">
              <el-select v-model="medal.category" class="w100">
                <el-option
                  v-for="category in medalsCategories"
                  :key="category"
                  :label="category"
                  :value="category"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Cor" prop="color">
              <el-color-picker v-model="medal.color" class="w100" />
            </el-form-item>
          </el-form>
          <div
            class="medal-creation__content__image d-flex justify-center align-center h100"
          >
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-change="changePhoto"
              :auto-upload="false"
            >
              <Medal :medal="medal" size="lg" />
            </el-upload>
          </div>
        </div>

        <div class="d-flex justify-between">
          <el-button :disabled="creatingMedal" @click="modalVisibility = false">
            Cancelar
          </el-button>
          <el-button :loading="creatingMedal" type="primary" @click="createMedal">
            Criar medalha
          </el-button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Modal from '@/components/Modal'
import Medal from '@/components/Medal/Medal'

export default {
  components: { Modal, Medal },
  props: ['value'],
  computed: {
    ...mapGetters(['medalsCategories']),
    modalVisibility: {
      get() {
        return this.value
      },
      set(visibility) {
        return this.$emit('input', visibility)
      }
    }
  },
  data() {
    const required = [
      { required: true, message: 'Campo obrigatório', trigger: 'submit' }
    ]

    return {
      medal: {
        name: '',
        description: '',
        category: '',
        picture: '',
        color: ''
      },
      rules: {
        name: required,
        description: required,
        category: required
      },
      creatingMedal: false
    }
  },
  methods: {
    createMedal() {
      this.$refs.medalForm.validate(valid => {
        if (valid) {
          this.creatingMedal = true
          this.$store
            .dispatch('saveMedal', this.medal)
            .then(() => {
              this.$notify({
                title: 'Pronto!',
                message: 'Medalha salva com sucesso',
                type: 'success',
                position: 'bottom-right'
              })
            })
            .catch(err => this.$throwError(err))
            .finally(() => {
              this.modalVisibility = false
            })
          this.creatingMedal = false
        }
      })
    },
    changePhoto(file) {
      const isJPG = ['image/jpeg', 'image/png'].includes(file.raw.type)
      const isLt2M = file.raw.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Imagem deve estar no formato JPG ou PNG.')
      } else if (!isLt2M) {
        this.$message.error('Imagem não pode exceder 2 MB.')
      }
      if (isJPG && isLt2M) {
        const reader = new FileReader()
        reader.onload = e => {
          this.medal.picture = e.target.result
        }
        reader.readAsDataURL(file.raw)
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss">
.medal-creation-container .overlay {
  width: 70%;
}
.medal-creation {
  &__content {
    display: grid;
    grid-template-columns: 0.8fr 1fr;

    &__inputs {
      .el-color-picker__trigger {
        width: 100% !important;
      }
    }
    &__image {
      height: 100%;

      .medal-container {
        transform: scale(2);
      }
    }
  }
}
</style>
