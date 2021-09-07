<template>
  <el-card class="profile h100" :shadow="'always'">
    <div class="personal-info">
      <el-row>
        <el-col :span="3">
          <img v-if="user.photo !== null" class="image" :src="user.photo" alt="Foto de perfil">
          <i v-else class="el-icon-user-solid" alt="Foto de perfil" />
        </el-col>
        <el-col :span="16">
          <span class="student-name">{{ user.name }}</span>
          <div> <i class="el-icon-location-outline" /> {{ user.city }} </div>
          <br>
          <div class="mb-20"> {{ user.biography }} </div>
        </el-col>
        <el-col :span="5" class="info-student">
          <div>
            <i class="el-icon-trophy" />
            {{ user.completedProjects }} projetos concluídos
          </div>
          <div v-if="user.email">
            <i class="el-icon-message" />
            {{ user.email }}
          </div>
          <div v-if="user.linkedin">
            <i class="el-icon-link" />
            {{ user.linkedin }}
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="mt-20">
      <el-col :span="11" class="mr-40 border-right">
        <el-tabs class="mr-40">
          <el-tab-pane label="Informaçôes Profissionais" class="info">
            <div v-for="professionalInfo in user.professionalInfos" :key="professionalInfo.id" class="info-item">
              <div class="info-title"> <span class="info-name"> {{ professionalInfo.company }} </span> / {{ professionalInfo.role }} </div>
              <div class="other-info">
                <div v-if="professionalInfo.end" class="info-date">
                  <strong>De </strong> {{ professionalInfo.start | moment("MM/YYYY") }}
                  <strong>até </strong> {{ professionalInfo.end | moment("MM/YYYY") }}
                </div>
                <div v-else>
                  <strong>Desde </strong> {{ professionalInfo.start | moment("DD/MM/YYYY") }}
                </div>
                {{ professionalInfo.activitiesPerformed }}
              </div>
            </div>
            <div v-if="user.professionalInfos.length == 0">
              Não há informações cadastradas
            </div>
          </el-tab-pane>
          <el-tab-pane label="Informações Acadêmicas" class="info">
            <div v-for="academicInfo in user.academicInfos" :key="academicInfo.id" class="info-item">
              <div class="info-title"> <span class="info-name"> {{ academicInfo.institution }} </span> / {{ academicInfo.course }} </div>
              <div class="other-info">
                <div v-if="academicInfo.end" class="info-date">
                  <strong>De </strong> {{ academicInfo.start | moment("MM/YYYY") }}
                  <strong>até </strong> {{ academicInfo.end | moment("MM/YYYY") }}
                </div>
                <div v-else>
                  <strong>Desde </strong> {{ academicInfo.start | moment("DD/MM/YYYY") }}
                </div>
              </div>
            </div>
            <div v-if="user.academicInfos == 0">
              Não há informações cadastradas
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <br>
      <el-col :span="12">
        <h3 v-if="user.medals"> Medalhas ({{ user.medals.length }})</h3>
        <div class="info medal-flex-box">
          <div v-for="medal in user.medals" :key="medal.id" class="medal">
            <medal-template :medal="medal" />
          </div>
        </div>
      </el-col>
    </el-row>


    
    <div class="profile-view h100 projects">
      <br>
      <span>Projetos ({{ user.completedProjects }})</span>
      <br><br>
      <el-row v-if="user.studentTeam.length > 0" :gutter="40">
        <el-col :span="4" class="project-list">
          <div v-for="studentTeam in user.studentTeam" :key="studentTeam.team.project.title" class="project" @click="currentProject = studentTeam">
            {{ studentTeam.team.project.title }}
            <div class="description">
              {{ studentTeam.team.project.shortDescription }}
            </div>
          </div>
        </el-col>
        <el-col v-if="currentProject" :span="9" class="project-info">
          <div>
            <div class="project-title"> {{ currentProject.team.project.title }} </div>
            <div>
              <div class="project-detail"> <span class="project-detail-title"> Resumo: </span>{{ currentProject.team.project.shortDescription }} </div>
              <div class="project-detail"> <span class="project-detail-title"> Descrição completa: </span> {{ currentProject.team.project.completeDescription }} </div>
              <div class="project-detail"> <span class="project-detail-title"> Descrição da tecnologia: </span> {{ currentProject.team.project.technologyDescription }} </div>
            </div>
          </div>
        </el-col>
        <el-col v-if="!currentProject" :span="9">
          <highcharts :options="getChartOptionsAverage()" />
        </el-col>
        <el-col :span="9">
          <highcharts :options="getChartOptions()" />
        </el-col>
        <el-col v-if="currentProject" :span="1">
          <i class="el-icon-close" @click="deselect()" />
        </el-col>
      </el-row>
      <div v-else>
        Ainda não participou de nenhum projeto.
      </div>
    </div>
  </el-card>
</template>

<script>
import { Chart } from 'highcharts-vue'
import UserService from '@/services/UserService.js'
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import MedalTemplate from '@/components/Medal/MedalTemplate'

highchartsMore(Highcharts)

export default {
  components: {
    highcharts: Chart,
    MedalTemplate
  },
  data() {
    return {
      currentProject: undefined,
      user: {}
    }
  },
  beforeMount() {
    this.$store.commit('SHOW_LOADING')
    UserService.getProfileInfo(this.$route.params.userId)
      .then((res) => {
        this.user = res
      })
      .catch(err => this.$throwError(err))
      .finally(() => this.$store.commit('HIDE_LOADING'))
  },
  methods: {
    getChartOptions() {
      return {
        series: this.getSeries(this.currentProject ? this.currentProject : this.user.studentTeam ? this.user.studentTeam[0] : []),
        chart: {
          polar: true,
          type: 'line'
        },
        title: {
          text: this.currentProject ? 'Desempenho' : 'Desempenho no último projeto'
        },
        xAxis: {
          categories: ['Proatividade', 'Autonomia', 'Colaboração', 'Entrega de resultados'],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        }
      }
    },
    getChartOptionsAverage() {
      return {
        series: this.getSeriesAverage(),
        chart: {
          polar: true,
          type: 'line'
        },
        title: {
          text: 'Desempenho geral'
        },
        xAxis: {
          categories: ['Proatividade', 'Autonomia', 'Colaboração', 'Entrega de resultados'],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
          max: 5
        }
      }
    },
    getSeriesAverage() {
      if (this.user.average) {
        return [{
          name: 'Avaliação do professor',
          data: [
            this.user.average.proactivity,
            this.user.average.autonomy,
            this.user.average.collaboration,
            this.user.average.resultsDeliver
          ],
          pointPlacement: 'on'
        }]
      }
      return [{
        name: 'Não há avaliação',
        data: [
          0, 0, 0, 0
        ],
        pointPlacement: 'on'
      }]
    },
    getSeries(project) {
      const series = []
      if (project && project.evaluation) {
        series.push({
          name: 'Avaliação do professor',
          data: [
            project.evaluation.proactivity,
            project.evaluation.autonomy,
            project.evaluation.collaboration,
            project.evaluation.resultsDeliver
          ],
          pointPlacement: 'on'
        })
      }
      return series
    },
    deselect() {
      this.currentProject = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
.profile {
  overflow-y: auto;
  overflow-x: hidden;

  .profile-view {
    max-height: calc(34vh - 100px);
    .title {
      font-size: 1.8rem;
    }
  }
  .image {
    width: 120px;
    border-radius: 50%;
  }
  .description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info {
    height: 386px;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    max-height: 386PX;
  }
  .medal {
    transform: scale(0.5);
    width: 76px;
    height: 0px;
  }
  .info-title {
    margin-bottom: 10px;
  }
  .info-name {
    font-weight: 600;
    font-size: 18px;
  }
  .other-info {
    margin-left: 14px;
    margin-bottom: 10px;
  }
  .personal-info {
    border-bottom: solid #dadada 1px;
  }
  .info-date {
    margin-bottom: 5px;
  }
  .info-item {
    border-bottom: solid #dadada 1px;
    margin: 10px 0px;
  }
  .info-student {
    text-align: right;
  }
  .border-right {
    border-right: solid #dadada 1px;
  }
  .medal-flex-box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;
  }
  .student-name {
    font-size: 20px;
    font-weight: 600;
    line-height: 36px;
  }
  .projects {
    border-top: solid #dadada 1px;
    margin-top: 20px
  }
  .project {
    background-color: #e8e8e8;
    border-radius: 50px;
    margin-bottom: 14px;
    padding: 6px 14px;
    cursor: pointer;
  }
  .project-list {
    height: 386px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    max-height: 386PX;
  }
  .el-icon-close {
    cursor: pointer;
  }
  .el-icon-user-solid {
    font-size: 134px;
  }
  .project-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .project-detail-title {
    font-size: 14px;
    font-weight: bold;
  }
  .project-detail {
    font-size: 14px;
    margin-bottom: 5px;
  }
  .project-info {
    height: 380px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 380PX;
  }
}

</style>
