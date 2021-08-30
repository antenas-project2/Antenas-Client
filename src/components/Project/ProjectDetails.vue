<template>
  <div class="project-details w100 h100 small-scroll">
    <div v-if="project">
      <transition name="fade">
        <div>
          <div class="project-details__header">
            <div class="d-flex justify-start align-center">
              <el-button
                class="back-button"
                icon="el-icon-back"
                @click="backToList()"
              />
              <h1 class="title">{{ project.title }}</h1>
            </div>
            <p class="short-description">{{ project.shortDescription }}</p>
          </div>

          <el-tabs v-model="tabPosition">
            <el-tab-pane label="Projeto">
              <ProjectSteps
                class="project-steps-visibility"
                :project="project"
                :projectStatus="getProjectStatus"
                :steps="steps"
              />
              <ProjectResumedSteps
                class="project-resumed-steps-visibility"
                :project="project"
                :projectStatus="getProjectStatus"
                :steps="steps"
              />

              <component :is="getCurrentStepComponent" />
              <ProjectStatus :project="project" />
              <ProjectDescriptions :project="project" />

              <el-row :gutter="24">
                <el-col :md="24" :lg="12">
                  <ProjectFieldGroupTable
                    title="Local da reunião"
                    :options="meetAddessOptions"
                  />
                </el-col>
                <el-col :md="24" :lg="12">
                  <ProjectFieldGroupTable
                    title="Outras informações"
                    class="mt-xl-0 mt-3"
                    :options="anotherInformationOptions"
                  />
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="Equipe">
              <TeamView />
            </el-tab-pane>
          </el-tabs>
        </div>
      </transition>
    </div>
    <div v-else class="h100">
      <noProjectSelected @open-new-project-modal="openNewProjectModal" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

import Step2 from './ProjectOverviewSteps/Step2'
import Step3 from './ProjectOverviewSteps/Step3'
import Step4 from './ProjectOverviewSteps/Step4'
import Step5 from './ProjectOverviewSteps/Step5'
import Step6 from './ProjectOverviewSteps/Step6'
import Step7 from './ProjectOverviewSteps/Step7'
import Step8 from './ProjectOverviewSteps/Step8'
import Step9 from './ProjectOverviewSteps/Step9'

import noProjectSelected from './noProjectSelected'
import ProjectSteps from './ProjectSteps'
import ProjectStatus from './ProjectStatus'
import ProjectDescriptions from './ProjectDescriptions'
import ProjectFieldGroupTable from './ProjectFieldGroupTable'
import ProjectResumedSteps from './ProjectResumedSteps'

import TeamView from '@/components/Team/TeamView'

export default {
  components: {
    noProjectSelected,
    ProjectSteps,
    ProjectStatus,
    ProjectDescriptions,
    ProjectFieldGroupTable,
    ProjectResumedSteps,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    Step9,

    TeamView
  },
  data() {
    return {
      tabPosition: 0,
      steps: [
        'Cadastro inicial',
        'Avaliação inicial',
        'Cadastro detalhado',
        'Avaliação detalhada',
        'Reunião',
        'Designar professor',
        'Entrega',
        'Avaliação dos alunos',
        'Finalizado'
      ]
    }
  },
  computed: {
    ...mapGetters({
      project: 'selectedProject'
    }),
    isProjectAtDeliveryTurn() {
      return this.project.progress === 7
    },
    showMeetingDetails() {
      return (
        this.project &&
        this.project.meeting &&
        (this.project.progress === 5 || this.project.progress === 6) &&
        (this.$store.getters.isCadi || this.$store.getters.isRepresentative)
      )
    },
    meetAddessOptions() {
      return [
        {
          title: 'Lugar',
          value: this.meeting.place,
          visible:
            this.showMeetingDetails && this.project.meeting?.address?.place
        },
        {
          title: 'Bairro',
          value: this.meeting.neighborhood,
          visible:
            this.showMeetingDetails &&
            this.project.meeting?.address?.neighborhood
        },
        {
          title: 'Rua',
          value: this.meeting.street,
          visible:
            this.showMeetingDetails && this.project.meeting?.address?.street
        },
        {
          title: 'Número',
          value: this.meeting.number,
          visible:
            this.showMeetingDetails && this.project.meeting?.address?.number
        },
        {
          title: 'CEP',
          value: this.meeting.zipCode,
          visible:
            this.showMeetingDetails && this.project.meeting?.address?.zipCode
        },
        {
          title: 'Cidade',
          value: this.meeting.city,
          visible:
            this.showMeetingDetails && this.project.meeting?.address?.city
        },
        {
          title: 'Data e hora:',
          value: this.meeting.chosenDate,
          visible: this.showMeetingDetails && this.project.meeting?.chosenDate
        }
      ]
    },
    meeting() {
      return {
        place: this.project.meeting.address.place,
        neighborhood: this.project.meeting.address.neighborhood,
        street: this.project.meeting.address.street,
        number: this.project.meeting.address.number,
        zipCode: this.project.meeting.address.zipCode,
        city: this.project.meeting.address.city,
        chosenDate: this.project.meeting.chosenDate
          ? this.formatDate(this.project.meeting.chosenDate)
          : 'A definir'
      }
    },
    anotherInformationOptions() {
      return [
        {
          title: 'Professor responsável',
          value: this.project.teacher?.name,
          visible: this.isProjectAtDeliveryTurn
        },
        {
          title: 'Semestre',
          value: this.project.semester,
          visible: this.isProjectAtDeliveryTurn
        },
        {
          title: 'Curso',
          value: this.project.course,
          visible: this.isProjectAtDeliveryTurn
        },
        {
          title: 'Criado por',
          value: this.project.createdBy?.name,
          visible: this.project.createdBy && this.project.createdBy.name
        },
        {
          title: 'Telefone',
          value: this.project.createdBy.telephone,
          visible: this.project.createdBy && this.project.createdBy.telephone
        },
        {
          title: 'Empresa',
          value: this.project.createdBy.company,
          visible: this.project.createdBy && this.project.createdBy.company
        },
        {
          title: 'Aprovado por',
          value: this.project.approvedBy?.name,
          visible: this.project.approvedBy
        }
      ]
    },
    getCurrentStepComponent() {
      /**
       * Steps
       * ________________________________________
       * | Status code | Status description     |
       * |______________________________________|
       * |      1      | 'Cadastro inicial'     |
       * |      2      | 'Avaliação inicial'    |
       * |      3      | 'Cadastro detalhado'   |
       * |      4      | 'Avaliação detalhada'  |
       * |      5      | 'Reunião'              |
       * |      6      | 'Designar professor'   |
       * |      7      | 'Entrega'              |
       * |      8      | 'Avaliação dos alunos' |
       * |      9      | 'Finalizado'           |
       * |______________________________________|
       */
      return `Step${this.project.progress}`
    },
    getProjectStatus() {
      if (this.project.progress === 9) {
        return 'success'
      }
      return this.project.refused ? 'error' : 'finish'
    }
  },
  methods: {
    formatDate(date) {
      moment.locale('pt-br')
      return moment(date).format('LLL')
    },
    openNewProjectModal() {
      this.$store.commit('SET_PROJECT_MODAL', true)
    },
    backToList() {
      this.$emit('backToList')
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/margin-padding.scss';

.project-details {
  border-left: 1px solid $--default-border-color !important;
  padding: 16px;
  overflow-y: auto;

  .el-tabs__active-bar {
    border-radius: 50px;
  }
  .el-tabs__nav-wrap::after {
    height: 1px !important;
    background-color: $--default-border-color;
  }

  &__header {
    padding-bottom: 12px;

    .back-button {
      display: flex;
      padding: 3px 5px;
      margin-right: 8px;

      i {
        font-size: 16pt;
      }
    }
    .short-description {
      margin-top: 6px;
      color: $--color-text-secondary;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 1200px) {
    .project-steps-visibility {
      display: none !important;
    }
  }

  @media (min-width: 1200px) {
    .project-resumed-steps-visibility {
      display: none !important;
    }
  }
}

@media (min-width: 792px) {
  .back-button {
    display: none !important;
  }
}
</style>
