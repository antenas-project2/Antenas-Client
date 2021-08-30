<template>
  <div class="student-to-evaluation-list">
    <div
      v-for="team in teams"
      :id="`team-${team.id}`"
      :key="team.id"
      class="team-list-item"
    >
      <h5 class="team-list-item__name">
        {{ team.name }}
      </h5>
      <div
        v-for="student in team.studentTeamList"
        :id="`student-${student.id}`"
        :key="student.id"
        class="student-list-item"
      >
        <div class="d-flex align-center">
          <Avatar :student="student" />
        </div>
        <el-button
          class="student-list-item__call-evaluation"
          size="mini"
          @click="openStudentAchievementsEvaluationModal(student)"
        >
          Avaliar
        </el-button>
        <div
          class="student-list-item__evaluation-information d-flex"
          :class="{ 'mt-2': student.student.studentMedals.length > 0 }"
        >
          <div
            v-for="(medal, index) in student.student.studentMedals"
            :key="index"
          >
            <Medal :medal="medal.medal" size="sm" />
          </div>
        </div>
      </div>
    </div>

    <StudentAchievementsEvaluation
      v-model="studentAchievementsEvaluationVisibility"
      :student="selectedStudent"
      @closeStudentAchievementsEvaluationModal="
        closeStudentAchievementsEvaluationModal
      "
    />

    <div class="d-flex justify-end">
      <el-button
        :disabled="!isEvaluationCompleted"
        type="primary"
        class="finish-evaluation"
        @click="completeEvaluation"
      >
        Finalizar avaliações
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Medal from '@/components/Medal/Medal'
import StudentAchievementsEvaluation from './StudentAchievementsEvaluation'
import Avatar from '@/components/Avatar'

import TeamService from '@/services/TeamService'

export default {
  components: {
    StudentAchievementsEvaluation,
    Medal,
    Avatar
  },
  props: {
    value: {
      type: Boolean,
      default: () => {}
    }
  },
  data() {
    return {
      teams: [],
      selectedStudent: null,
      studentAchievementsEvaluationVisibility: false
    }
  },
  computed: {
    ...mapGetters({
      project: 'selectedProject',
      projects: 'projects',
      isTeacher: 'isTeacher'
    }),
    isEvaluationCompleted() {
      let completedEvaluations = 0

      this.teams.forEach(team => {
        if (!this.hasIncompleteStudentEvaluationInTeam(team)) {
          completedEvaluations++
        }
      })

      return this.teams.length === completedEvaluations
    }
  },
  async mounted() {
    this.teams = await TeamService.getTeam(this.project.id)

    this.applyProjectToAllTeams()
  },
  methods: {
    hasIncompleteStudentEvaluationInTeam(team) {
      return team.studentTeamList.find(student => {
        if (
          !student.evaluation.autonomy ||
          !student.evaluation.collaboration ||
          !student.evaluation.proactivity ||
          !student.evaluation.resultsDeliver ||
          student.student.studentMedals.length === 0
        ) {
          return team
        }
      })
    },
    openStudentAchievementsEvaluationModal(student) {
      this.selectedStudent = student
      this.studentAchievementsEvaluationVisibility = true
    },
    closeStudentAchievementsEvaluationModal() {
      this.selectedStudent = null
      this.studentAchievementsEvaluationVisibility = false
    },
    async completeEvaluation() {
      await TeamService.evaluate(this.teams)

      this.concludeProject()
    },
    concludeProject() {
      this.project.finished = true
      this.project.progress = 9
      this.project.open = false
      this.project.status = 'concluded'
      this.project.labelPhase = 'Concluído'

      this.projects.forEach(project => {
        if (project.id === this.project.id) {
          project.finished = true
          project.progress = 9
          project.open = false
          project.status = 'concluded'
          project.labelPhase = 'Concluído'
        }
      })
    },
    applyProjectToAllTeams() {
      this.teams.forEach(team => {
        team.project = {
          id: this.project.id,
          ...team.project
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.student-to-evaluation-list {
  .team-list-item {
    border-radius: 4px;
    margin-bottom: 15px;

    &__name {
      margin-left: 3px;
      margin-bottom: 0px;
    }
  }
  .student-list-item {
    border: 1px dashed $--default-border-color;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 1fr 60px;
    align-items: center;

    &:last-child {
      margin: 0;
    }

    &__name {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__call-evaluation {
      padding: 10px 0;
    }
    &__evaluation-information {
      flex-wrap: wrap;
    }
  }
  .finish-evaluation {
    margin-bottom: 15px;
  }
}

@media (max-width: 580px) {
  .student-to-evaluation-list {
    .finish-evaluation {
      width: 100%;
    }
  }
}
</style>
