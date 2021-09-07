<template>
  <div class="project-filter-modal">
    <Modal v-model="modalVisibility">
      <div class="project-filter-modal__container">
        <div
          class="project-filter-modal__header d-flex justify-between align-center w100"
        >
          <h4>Project filter</h4>
          <a
            @click="clearFilters()"
            class="project-filter-modal__header__clear-filters"
          >
            Clear filters
          </a>
        </div>
        <div class="project-filter-modal__content">
          <div class="form-filter-group">
            <p class="form-filter-group__title">Status do projeto</p>
            <CheckGroupButton
              v-model="projectStatus"
              :options="projectStatusOptions"
            />
          </div>
        </div>
        <el-button
          @click="applyFilters"
          class="apply-filters-button w100"
          type="primary"
        >
          Aplicar filtro
        </el-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Modal from '@/components/Modal'
import CheckGroupButton from '@/components/CheckGroupButton'

export default {
  components: {
    Modal,
    CheckGroupButton
  },
  data() {
    return {
      projectStatus: []
    }
  },
  created() {
    this.clearFilters()
  },
  computed: {
    ...mapGetters(['projectFilterModalVisibility', 'filterQuery', 'defaultFilterQuery']),
    modalVisibility: {
      get() {
        return this.projectFilterModalVisibility
      },
      set(visibility) {
        this.$store.commit('CHANGE_PROJECT_FILTER_MODAL_VISIBILITY', visibility)
      }
    },
    projectStatusOptions() {
      return [
        { value: 1, title: 'Cadastro inicial' },
        { value: 2, title: 'Avaliação inicial' },
        { value: 3, title: 'Cadastro detalhado' },
        { value: 4, title: 'Avaliação detalhada' },
        { value: 5, title: 'Reunião' },
        { value: 6, title: 'Designar professor' },
        { value: 7, title: 'Entrega' },
        { value: 8, title: 'Avaliação dos alunos' },
        { value: 9, title: 'Finalizado' }
      ]
    }
  },
  methods: {
    cleanReferences(object) {
      return JSON.parse(JSON.stringify(object))
    },
    clearFilters() {
      this.projectStatus = this.cleanReferences(this.defaultFilterQuery.projectStatus)
    },
    applyFilters() {
      const query = {
        projectStatus: this.cleanReferences(this.projectStatus)
      }

      this.$store.commit('APPLY_FILTERS', query)
      this.$store.commit('CHANGE_PROJECT_FILTER_MODAL_VISIBILITY', false)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.project-filter-modal {
  &__header {
    margin-bottom: 10px;

    &__clear-filters {
      font-size: 0.8rem;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: $--color-primary;
      }
    }
  }

  &__content {
    .form-filter-group {
      border: 1px solid $--default-border-color;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }

      &__title {
        font-size: 0.8rem;
        color: $--color-text-regular;
        padding-bottom: 10px !important;
      }
    }
  }

  .apply-filters-button {
    margin-top: 20px;
  }
}

@media (min-width: 580px) {
  .project-filter-modal {
    &__container {
      min-width: 400px;
    }
  }
}
</style>
