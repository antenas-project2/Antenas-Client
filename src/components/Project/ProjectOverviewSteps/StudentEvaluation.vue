<template>
  <div class="student-evaluation">
    <ul class="student-evaluation__container">
      <li class="mb-2">
        <h5 class="text-center m-0">Proatividade</h5>
        <el-rate v-model="proactivity" class="d-flex justify-center" />
      </li>
      <li class="mb-2">
        <h5 class="text-center m-0">Autonomia</h5>
        <el-rate v-model="autonomy" class="d-flex justify-center" />
      </li>
      <li class="mb-2">
        <h5 class="text-center m-0">Colaboração</h5>
        <el-rate v-model="collaboration" class="d-flex justify-center" />
      </li>
      <li class="mb-2">
        <h5 class="text-center m-0">Entrega de resultados</h5>
        <el-rate v-model="resultsDeliver" class="d-flex justify-center" />
      </li>
    </ul>

    <div class="d-flex justify-end">
      <el-button
        class="go-to-achievements-evaluation"
        icon="el-icon-back"
        @click="goToAchievements"
      />
      <el-button
        type="primary"
        class="student-evaluation-button"
        :disabled="!allowEvaluationButton"
        @click="evaluate"
      >
        Finalizar avaliação do aluno
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modalVisibility', 'student'],
  data() {
    return {
      proactivity: null,
      autonomy: null,
      collaboration: null,
      resultsDeliver: null
    }
  },
  computed: {
    allowEvaluationButton() {
      return (
        this.proactivity &&
        this.autonomy &&
        this.collaboration &&
        this.resultsDeliver
      )
    }
  },
  mounted() {
    this.fillAutonomy()
    this.fillProactivity()
    this.fillColaboration()
    this.fillResultsDeliver()
  },
  methods: {
    evaluate() {
      const evaluation = this.initSkills()

      evaluation.proactivity = this.proactivity
      evaluation.autonomy = this.autonomy
      evaluation.collaboration = this.collaboration
      evaluation.resultsDeliver = this.resultsDeliver

      this.$emit('evaluate', evaluation)
    },
    goToAchievements() {
      this.$emit('callAchievementsPage')
    },
    initSkills() {
      return {
        proactivity: null,
        autonomy: null,
        collaboration: null,
        resultsDeliver: null
      }
    },
    fillAutonomy() {
      this.autonomy =
        this.student.evaluation.autonomy !== null
          ? this.student.evaluation.autonomy
          : null
    },
    fillProactivity() {
      this.proactivity =
        this.student.evaluation.proactivity !== null
          ? this.student.evaluation.proactivity
          : null
    },
    fillColaboration() {
      this.collaboration =
        this.student.evaluation.collaboration !== null
          ? this.student.evaluation.collaboration
          : null
    },
    fillResultsDeliver() {
      this.resultsDeliver =
        this.student.evaluation.resultsDeliver !== null
          ? this.student.evaluation.resultsDeliver
          : null
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.student-evaluation {
  &__container {
    margin-bottom: 20px;
  }

  .el-rate {
    height: 35px;

    .el-rate__icon {
      font-size: 35px;
    }
  }
  .go-to-achievements-evaluation {
    font-size: 20px;
    padding: 5px 10px;
  }
  .student-evaluation-button {
    width: 240px;
  }
}

@media (max-width: 580px) {
  .student-evaluation {
    .el-rate {
      height: 35px;

      .el-rate__icon {
        font-size: 35px;
      }
    }
    .student-evaluation-button {
      width: 100%;
    }
  }
}
</style>
