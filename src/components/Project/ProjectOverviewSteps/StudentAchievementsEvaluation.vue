<template>
  <div class="student-achievements-evaluation">
    <Modal v-model="modalVisibility">
      <div class="achievements__container d-flex flex-column">
        <div class="achievements__container__header">
          <h4 class="mb-2">
            Atribuição de medalhas
          </h4>
          <div class="student-information d-flex mb-2">
            <el-avatar class="avatar" size="medium" fit="scale-down">
              <img v-if="userPhoto" :src="userPhoto" />
              <span v-else>
                {{ studentInitials }}
              </span>
            </el-avatar>
            <div class="d-flex flex-column ml-2">
              <h5>{{ studentName }}</h5>
              <p class="student-information__position">{{ studentRole }}</p>
            </div>
          </div>
        </div>

        <StudentEvaluation
          v-if="evaluationTurn === 'evaluation'"
          :modalVisibility="value"
          :student="student"
          @evaluate="evaluate"
          @callAchievementsPage="callAchievementsPage"
        />
        <div
          v-else-if="evaluationTurn === 'achievements'"
          class="achievements__container__content d-flex flex-column"
        >
          <div
            v-if="selectedMedals.length > 0"
            class="selected-medals-content d-flex flex-column"
          >
            <h6>
              Medalhas selecionadas
            </h6>
            <div class="selected-medals-list d-flex justify-center">
              <div
                v-for="(medal, index) in selectedMedals"
                :key="index"
                @click="unselectMedal(medal)"
              >
                <Medal :medal="medal" class="medal" size="sm" />
              </div>
            </div>
          </div>

          <div class="d-flex flex-column align-start">
            <h6 class="mb-2">Lista de medalhas</h6>
            <el-input
              v-model="searchMedal"
              size="mini"
              placeholder="Procure pelo nome da medalha aqui!"
              class="mb-2"
              clearable
            />

            <div class="medals-list d-flex">
              <div
                v-for="(medal, index) in filteredMedals"
                :key="index"
                @click="selectMedal(medal)"
              >
                <Medal :medal="medal" size="lg" />
              </div>
            </div>
          </div>

          <div class="d-flex justify-end">
            <el-button
              class="apply-student-medals"
              type="primary mt-3"
              :disabled="!selectedMedals.length"
              @click="callEvaluationPage"
            >
              Atribuir medalhas ao aluno
            </el-button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import Medal from '@/components/Medal/Medal'
import StudentEvaluation from './StudentEvaluation'

import { mapGetters } from 'vuex'

export default {
  components: {
    Modal,
    Medal,
    StudentEvaluation
  },
  data() {
    return {
      selectedMedals: [],
      evaluationTurn: 'achievements',
      searchMedal: ''
    }
  },
  props: ['value', 'student'],
  computed: {
    ...mapGetters(['medals', 'userPhoto']),
    modalVisibility: {
      get() {
        return this.value
      },
      set(visibility) {
        this.$emit('input', visibility)
      }
    },
    studentName() {
      return this.student?.student.name
    },
    studentRole() {
      const firstRole = this.student?.role[0]
      return firstRole?.name
    },
    studentInitials() {
      if (this.studentName) {
        const splitedName = this.studentName.split(' ')
        const firstNameInitial = splitedName[0].charAt(0)
        const secondNameInitial =
          splitedName.length > 1
            ? splitedName[splitedName.length - 1].charAt(0)
            : ''
        return `
            ${firstNameInitial}
            ${secondNameInitial}`.toUpperCase()
      }
      return ''
    },
    filteredMedals() {
      if (this.searchMedal) {
        return this.medals.filter(medal => {
          const searched = this.searchMedal.toLowerCase()
          const name = medal.name.toLowerCase()

          return name.includes(searched)
        })
      }

      return this.medals
    }
  },
  watch: {
    modalVisibility() {
      if (!this.modalVisibility) {
        this.selectedMedals = []
        this.evaluationTurn = 'achievements'
      } else {
        this.fillMedalsOfStudent()
      }
    }
  },
  methods: {
    fillMedalsOfStudent() {
      this.student.student.studentMedals.forEach(medal => {
        this.selectedMedals.push(medal.medal)
      })
    },
    evaluate(evaluation) {
      this.student.evaluation.proactivity = evaluation.proactivity
      this.student.evaluation.autonomy = evaluation.autonomy
      this.student.evaluation.collaboration = evaluation.collaboration
      this.student.evaluation.resultsDeliver = evaluation.resultsDeliver

      this.$emit('closeStudentAchievementsEvaluationModal')
    },
    medalAlreadySelected(selectedMedal) {
      return this.selectedMedals.find(medal => medal.id === selectedMedal.id)
    },
    selectMedal(selectedMedal) {
      if (!this.medalAlreadySelected(selectedMedal)) {
        this.selectedMedals.push(selectedMedal)
      }
    },
    unselectMedal(selectedMedal) {
      this.selectedMedals = this.selectedMedals.filter(
        medal => medal.id !== selectedMedal.id
      )
    },
    giveMedalsToStudent() {
      this.selectedMedals.forEach(medal => {
        const studentHasMedald = this.student.student.studentMedals.find(
          studentMedal => studentMedal.medal.id === medal.id
        )

        if (!studentHasMedald) {
          this.student.student.studentMedals.push({ medal })
        }
      })
    },
    callEvaluationPage() {
      this.evaluationTurn = 'evaluation'

      this.giveMedalsToStudent()
    },
    callAchievementsPage() {
      this.evaluationTurn = 'achievements'
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.student-achievements-evaluation .overlay {
  min-width: 62%;
  width: 62%;
  padding: 10px;
}
.achievements {
  &__container {
    width: 100%;

    &__header {
      .student-information {
        line-height: 1.3;

        &__position {
          font-size: 0.7rem;
          color: $--color-text-secondary;
        }
      }
    }

    &__content {
      .selected-medals-content {
        border: 1px solid $--default-border-color;
        padding: 5px;
        border-radius: 4px;

        .selected-medals-list {
          justify-content: flex-start;
          flex-wrap: wrap;
        }
      }
      .medals-list {
        max-height: 100%;
        flex-wrap: wrap;
        overflow: auto;
        justify-content: flex-start;

        .medal-container {
          margin-bottom: 10px;
        }
      }
      .apply-student-medals {
        width: 240px;
      }
    }
  }
}

@media (max-width: 580px) {
  .student-achievements-evaluation .overlay {
    min-width: 100%;
    width: 100%;
  }

  .achievements {
    &__container {
      &__content {
        margin-bottom: 40px;

        .selected-medals-list {
          justify-content: center !important;
          flex-wrap: wrap;
        }
        .apply-student-medals {
          position: absolute;
          width: 90%;
          bottom: 10px;
          left: 10px;
          right: 10px;
          margin: auto;
        }
      }
      .medals-list {
        justify-content: space-around;

        .medal-container {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
