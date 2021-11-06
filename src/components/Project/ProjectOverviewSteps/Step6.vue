<template>
  <div>
    <div v-if="project.refused" class="project-step-six">
      <Danger class="mb-3">
        Projeto cancelado após reunião presencial
      </Danger>

      <div class="d-flex">
        <h6>Motivo:</h6>
        <span class="refused-reason ml-1">{{ project.reason }}</span>
      </div>
    </div>
    <div v-if="$store.getters.isCadi && !project.refused">
      <Information class="mb-3">
        Você ainda pode cancelar o projeto, se quiser. Basta clicar em
        <a href="#" @click.stop.prevent="cancelProject()">cancelar projeto</a>.
      </Information>
    </div>
    <div
      v-if="$store.getters.isCadi && !project.refused"
      class="project-step-six"
    >
      <h5 class="project-step-six__title">
        Escolha o professor responsável pelo projeto
      </h5>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="130px"
      >
        <el-form-item label="Professor" prop="teacher">
          <el-select v-model="form.teacher" class="w100" prop="teacher">
            <el-option
              v-for="teacher in teacherList"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"
            />
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :md="19">
            <el-form-item label="Curso" prop="course">
              <el-select v-model="form.course" class="w100">
                <el-option
                  v-for="course in courses"
                  :key="course"
                  :label="course"
                  :value="course"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="5">
            <el-form-item label="Semestre" prop="semester">
              <el-input-number
                v-model="form.semester"
                :min="0"
                :max="6"
                :step="1"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="justify-end d-flex mt-10">
          <el-button type="primary" @click="update()">
            Escolher professor
          </el-button>
        </div>
      </el-form>
    </div>
    <div v-else>
      <Information v-if="!project.refused">
        Na etapa de <b>Designar professor</b> o <b>Cadi</b> irá incluir um
        <b>professor</b> para se responsabilizar pelo projeto e seu devido
        andamento.
      </Information>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'
import { mapGetters } from 'vuex'

import Information from '@/components/Information'
import Danger from '@/components/Danger'

export default {
  components: {
    Information,
    Danger
  },
  computed: {
    ...mapGetters({
      project: 'selectedProject'
    })
  },
  data() {
    const required = [
      { required: true, message: 'Campo obrigatório', trigger: 'submit' }
    ]
    return {
      form: {
        teacher: '',
        semester: 1,
        course: ''
      },
      rules: {
        teacher: required,
        semester: required,
        course: required
      },
      courses: [
        'Análise e Desenvolvimento de Sistemas',
        'Banco de Dados',
        'Gestão da Produção Industrial',
        'Logística',
        'Manufatura Avançada',
        'Manutenção de Aeronaves',
        'Projetos de Estruturas Aeronáuticas'
      ],
      teacherList: []
    }
  },
  mounted() {
    this.$store.commit('SHOW_LOADING')
    UserService.getTeacherUsers()
      .then(res => {
        this.teacherList = res
      })
      .finally(() => this.$store.commit('HIDE_LOADING'))
  },
  methods: {
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.commit('SHOW_LOADING')
          const project = JSON.parse(
            JSON.stringify(this.$store.getters.selectedProject)
          )
          project.course = this.form.course
          project.teacher = { id: this.form.teacher }
          project.semester = this.form.semester
          this.$store
            .dispatch('updateProject', project)
            .catch(err => this.$throwError(err))
            .finally(() => this.$store.commit('HIDE_LOADING'))
        }
      })
    },
    cancelProject() {
      const project = JSON.parse(JSON.stringify(this.project))

      this.$prompt(
        'Por qual razão deseja cancelar este projeto?',
        'Cancelamento do projeto',
        {
          confirmButtonText: 'Cancelar projeto',
          cancelButtonText: 'Voltar',
          confirmButtonClass: 'el-button--danger',
          inputPattern: /([^\s])/,
          inputErrorMessage: 'Campo obrigatório'
        }
      ).then(({ value }) => {
        project.refused = true
        project.reason = value

        this.dispatchUpdate(project)
      })
    },
    dispatchUpdate(project) {
      this.$store.commit('SHOW_LOADING')
      this.$store
        .dispatch('updateProject', project)
        .catch(err => this.$throwError(err))
        .finally(() => this.$store.commit('HIDE_LOADING'))
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.refused-reason {
  font-size: 0.8rem;
  color: $--color-text-regular;
}

.project-step-six {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid $--default-border-color;

  &__title {
    margin-bottom: 8px;
  }

  .el-form {
    .el-form-item {
      &__label {
        line-height: normal;
        padding-bottom: 5px !important;
        font-size: 0.8rem;
        color: $--color-text-regular;
      }
      &__content {
        textarea {
          font-family: 'Inter';
          border: 1px solid $--default-border-color;
        }
      }
    }
  }
}
</style>
