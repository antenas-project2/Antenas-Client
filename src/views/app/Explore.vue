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
        <el-input
          v-model="search"
          class="students-seach"
          placeholder="Quem você está procurando?"
        />
      </div>
      <el-empty v-if="filteredStudents.length === 0" :image-size="90">
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

export default {
  components: {
    ExploreTableRow
  },
  data() {
    return {
      students: [],
      search: null
    }
  },
  computed: {
    ...mapGetters(['userId']),
    filteredStudents() {
      if (this.search) {
        return this.students.filter(student => {
          const studentName = student.name.toLowerCase()
          const studentDocument = student.ra
          const search = this.search.toLowerCase()

          return (
            studentName.includes(search) || studentDocument.includes(search)
          )
        })
      }

      return this.students
    }
  },
  async mounted() {
    this.students = await StudentService.getStudents()
  },
  methods: {
    goToReadmePage(userId) {
      this.$router.push({ name: 'public-profile', params: { userId } })
    },
    goToMyPublicProfile() {
      this.goToReadmePage(this.userId)
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
    .students-seach {
      width: 50%;
      margin: auto;
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
      .students-seach {
        width: 100%;
      }
    }
  }
}
</style>
