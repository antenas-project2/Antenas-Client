<template>
  <div>
    <div v-if="isTeacher" class="project-step-eight">
      <div class="d-flex justify-end mb-2">
        <el-button
          class="project-step-eight__create-new-medal"
          type="primary"
          size="mini"
          @click="openMedalCreation"
        >
          Criar nova medalha
        </el-button>
      </div>
      <el-collapse v-model="collapseItems">
        <el-collapse-item
          class="evaluation-collapse"
          title="Avaliação das equipes"
          name="evaluation"
        >
          <StudentToEvaluationList />
        </el-collapse-item>
      </el-collapse>

      <MedalCreation v-model="medalCreationVisibility" />
    </div>
    <Information v-else>
      Nesta etapa o <b>Professor</b> irá avaliar e entregar medalhas para cada
      um dos alunos.
    </Information>
  </div>
</template>

<script>
import Information from '@/components/Information'
import StudentToEvaluationList from './StudentToEvaluationList'
import MedalCreation from './MedalCreation'

import { mapGetters } from 'vuex'

export default {
  components: {
    StudentToEvaluationList,
    Information,
    MedalCreation
  },
  data() {
    return {
      collapseItems: ['evaluation'],
      medalCreationVisibility: false
    }
  },
  computed: {
    ...mapGetters(['isTeacher'])
  },
  methods: {
    openMedalCreation() {
      this.medalCreationVisibility = true
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.project-step-eight {
  .el-collapse {
    border: 1px solid $--default-border-color;
    padding: 0 8px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .evaluation-collapse {
    margin-bottom: 2px;

    .el-collapse-item__header {
      font-size: 1rem;
      font-weight: 600 !important;
      color: $--color-text-title !important;
    }
    .el-collapse-item__header,
    .el-collapse-item__wrap {
      border: 0 !important;

      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }
  }
}

@media (max-width: 680px) {
  .project-step-eight {
    &__create-new-medal {
      display: none;
    }
  }
}
</style>
