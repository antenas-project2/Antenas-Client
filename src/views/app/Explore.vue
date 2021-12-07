<template>
  <div class="h-100 w-100">
    <div class="explore h-100 small-scroll">
      <div class="explore__header d-flex flex-column align-center my-2">
        <div class="d-flex justify-between align-center w-100 mb-2">
          <h3>Explorar</h3>
          <el-button
            v-if="$store.getters.isStudent"
            size="mini"
            type="primary"
            @click="goToMyPublicProfile()"
          >
            Meu perfil público
          </el-button>
        </div>
        <div class="d-flex filters-header">
          <el-input
            v-model="search"
            class="students-seach"
            placeholder="Quem você está procurando?"
          />
          <!-- @click="openProjectFilters" -->
          <el-button
            class="explore-filter-button"
            type="primary"
            @click="toggleExploreFilters()"
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtros
          </el-button>

          <ExploreFilters
            v-model="exploreFiltersVisibility"
            @changeMedalsAmount="changeMedalsAmount"
          />
        </div>
      </div>

      <div class="d-flex align-center">
        <p class="mr-2">Filtrando por:</p>
        <el-tag type="success">Medalhas ({{ medalsAmount }})</el-tag>
      </div>

      <div v-if="loading" class="d-flex justify-center align-center" style="height: 200px;">
        <h4>Carregando...</h4>
      </div>
      <el-empty v-if="!loading && filteredStudents.length === 0" :image-size="90">
        <template slot="description">
          <h6>Opa, nenhum usuário com esse nome por aqui</h6>
        </template>
      </el-empty>
      <div v-else class="explore__content">
        <div class="explore__content__table small-scroll">
          <ExploreTableRow
            v-for="(student, index) in filteredStudents"
            :key="index"
            class="explore__content__table__item"
            :firstChild="index === 0"
            :lastChild="index === students.length - 1"
            :student="student"
            @click.native="goToReadmePage(student.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExploreTableRow from '@/components/Explore/ExploreTableRow'

import StudentService from '@/services/StudentService'

import { mapGetters } from 'vuex'
import ExploreFilters from '../../components/Explore/ExploreFilters.vue'

export default {
  components: {
    ExploreTableRow,
    ExploreFilters
  },
  data() {
    return {
      students: [],
      search: null,
      exploreFiltersVisibility: false,
      medalsAmount: 1,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userId']),
    filteredStudents() {
      let found = this.students

      if (this.search) {
        found = this.students.filter(student => {
          const studentName = student.name.toLowerCase()
          const studentDocument = student.ra
          const search = this.search.toLowerCase()

          console.log(student)

          return (
            studentName.includes(search) || studentDocument.includes(search)
          )
        })

        found = found.filter(
          student => student.medalsAmount === this.medalsAmount
        )

        return found
      } else {
        found = found.filter(
          student => student.medalsAmount === this.medalsAmount
        )
      }

      return found
    }
  },
  async mounted() {
    this.loading = true
    this.students = await StudentService.getStudents()
    this.loading = false
  },
  methods: {
    goToReadmePage(userId) {
      this.$router.push({ name: 'public-profile', params: { userId } })
    },
    goToMyPublicProfile() {
      this.goToReadmePage(this.userId)
    },
    toggleExploreFilters() {
      this.exploreFiltersVisibility = !this.exploreFiltersVisibility
    },
    changeMedalsAmount(medalsAmount) {
      console.log('dhusahudsa')
      this.medalsAmount = medalsAmount
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.explore {
  border-left: 1px solid $--default-border-color;
  padding: 12px;
  width: calc(100vw - 55px);

  &__header {
    h3 {
      font-weight: 500;
    }
    .filters-header {
      width: 50%;
      position: relative;
    }
    .students-seach {
      width: 100%;
      margin: auto;
    }
    .explore-filter-button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 13px;
      margin-left: 5px;
      background-color: rgb(68, 114, 233, 0.15);
      border: 0;
      color: $--color-primary;

      span {
        display: flex;
        stroke: $--color-primary;
        justify-content: center;
      }
      svg {
        margin-right: 3px;
      }
    }
  }
  &__content {
    margin: 20px 150px;

    &__table {
      border-radius: 8px;
      border: 1px solid $--default-border-color;

      &__item {
        text-decoration: none;
      }

      &.small-scroll::-webkit-scrollbar-thumb {
        border-radius: 0 0 8px 8px;
      }
      &.small-scroll::-webkit-scrollbar-thumb {
        border: 5px solid #fff;
      }
    }
  }
}

@media (max-width: 1200px) {
  .explore {
    &__content {
      margin: 20px 0 !important;
    }
  }
}

@media (max-width: 900px) {
  .explore {
    &__content {
      &__table {
        overflow-x: auto;
        width: 100%;
        display: block;
        background-image: linear-gradient(to right, #ffffff, #ffffff),
          linear-gradient(to right, #ffffff, #ffffff),
          linear-gradient(to right, #f4f4f4, #ffffff),
          linear-gradient(to left, #f4f4f4, #ffffff) !important;
        background-position: left center, right center, left center,
          right center !important;
        background-repeat: no-repeat !important;
        background-size: 20px 100%, 20px 100%, 20px 100%, 20px 100% !important;
        background-attachment: local, local, scroll, scroll !important;

        &__item {
          width: 700px;
          min-width: 700px;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  .explore {
    &__header {
      .filters-header {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .explore-filter-button {
        margin-top: 5px;
        margin-left: 0;
        padding-top: 11px;
        padding-bottom: 11px;
      }
    }
  }
}
</style>
