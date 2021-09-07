<template>
  <div class="student-projects-information d-flex">
    <div class="student-projects-information__projects small-scroll">
      <div
        v-for="studentTeam in user.studentTeam"
        :key="studentTeam.team.project.title"
        class="student-projects-information__projects__project-item d-flex justify-start align-center px-3 mb-1"
        @click="currentProject = studentTeam"
      >
        <h5>
          <i class="el-icon-suitcase mr-1" />
          {{ studentTeam.team.project.title }}
        </h5>
      </div>
    </div>

    <el-row class="performance-charts w-100" :gutter="24">
      <el-col :sm="24" :md="12">
        <div class="d-flex justify-center">
          <highcharts :options="getChartOptions" />
        </div>
      </el-col>
      <el-col :sm="24" :md="12">
        <div class="d-flex justify-center">
          <highcharts :options="getChartOptionsAverage" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'

highchartsMore(Highcharts)

export default {
  components: {
    highcharts: Chart
  },
  props: ['user'],
  data() {
    return {
      currentProject: null
    }
  },
  computed: {
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
          categories: [
            'Proatividade',
            'Autonomia',
            'Colaboração',
            'Entrega de resultados'
          ],
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
    getChartOptions() {
      const studentTeamSeries = this.user.studentTeam
        ? this.user.studentTeam[0]
        : []
      const series = this.currentProject
        ? this.currentProject
        : studentTeamSeries
      return {
        series: this.getSeries(series),
        chart: {
          polar: true,
          type: 'line'
        },
        title: {
          text: this.currentProject
            ? 'Desempenho'
            : 'Desempenho no último projeto'
        },
        xAxis: {
          categories: [
            'Proatividade',
            'Autonomia',
            'Colaboração',
            'Entrega de resultados'
          ],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        }
      }
    }
  },
  methods: {
    getSeriesAverage() {
      if (this.user.average) {
        return [
          {
            name: 'Avaliação do professor',
            data: [
              this.user.average.proactivity,
              this.user.average.autonomy,
              this.user.average.collaboration,
              this.user.average.resultsDeliver
            ],
            pointPlacement: 'on'
          }
        ]
      }
      return [
        {
          name: 'Não há avaliação',
          data: [0, 0, 0, 0],
          pointPlacement: 'on'
        }
      ]
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
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.student-projects-information {
  &__projects {
    border: 1px solid $--default-border-color;
    padding: 8px;
    border-radius: 4px;
    max-height: 300px;
    max-width: 300px;
    min-width: 300px;

    &__project-item {
      width: 100%;
      height: 40px;
      border-radius: 6px;

      &:hover {
        background-color: rgba(204, 204, 204, 0.1);
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 900px) {
  .student-projects-information {
    display: inline !important;

    &__projects {
      max-height: 300px;
      max-width: 100% !important;
      min-width: auto !important;
      width: 100%;
      min-width: 300px;
    }

    .performance-charts {
      margin-top: 0.5rem !important;
    }
  }
}

@media (max-width: 580px) {
  .student-projects-information {
    width: 100%;
  }
}
</style>
