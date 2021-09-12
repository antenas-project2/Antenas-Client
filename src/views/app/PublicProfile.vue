<template>
  <div class="h-100 w-100" style="width: calc(100% - 55px) !important;">
    <div v-if="student" class="public-profile d-flex h-100 w-100 small-scroll">
      <div class="public-profile__personal">
        <el-avatar class="personal-avatar" size="medium" fit="scale-down">
          <img v-if="photo" :src="photo" class="personal-avatar__img">
          <i v-else class="el-icon-user" />
        </el-avatar>
        <div class="public-profile__personal__information w-100">
          <h2 class="public-profile__personal__information__name mt-3">
            {{ studentName }}
          </h2>
          <div v-if="student.id === userId" class="d-flex">
            <el-button
              v-if="editingProfile"
              type="success"
              class="mt-2 w-100"
              size="small"
              round
              @click="saveEdition"
            >
              Salvar edição
            </el-button>
            <el-button
              v-else
              class="mt-2 w-100"
              size="small"
              round
              @click="toggleEdition"
            >
              Editar perfil
            </el-button>
            <el-button
              v-if="editingProfile"
              class="mt-2"
              type="danger"
              icon="el-icon-close"
              size="small"
              round
              @click="toggleEdition"
            />
          </div>
          <div class="public-profile__personal__information__description mt-3">
            <p v-if="companyName">
              <i class="el-icon-office-building" />
              {{ companyName }}
            </p>
            <p v-if="student.city">
              <i class="el-icon-location-outline" />
              {{ student.city }}
            </p>
            <p v-if="student.email">
              <i class="el-icon-message" />
              {{ student.email }}
            </p>
            <p v-if="companyPosition">
              <i class="el-icon-user" />
              {{ companyPosition }}
            </p>
            <p
              v-if="
                student.studentMedals.length || student.studentMedals.length > 0
              "
            >
              <i class="el-icon-medal-1" />
              {{ student.studentMedals.length }}
              {{ student.studentMedals.length === 1 ? 'medalha' : 'medalhas' }}
            </p>
            <p v-if="companyPosition">
              <i class="el-icon-user" />
              {{ companyPosition }}
            </p>
          </div>
        </div>
      </div>
      <PublicProfileSkills
        ref="publicProfileSkills"
        class="public-profile__skills ml-3"
        :studentName="studentName"
        :editingProfile="editingProfile"
        :markdownProfile="student.markdownProfile"
      />
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import StudentService from '@/services/StudentService'

import PublicProfileSkills from '@/components/PublicProfile/PublicProfileSkills'
import { mapGetters } from 'vuex'

export default {
  components: {
    PublicProfileSkills
  },
  data() {
    return {
      student: null,
      editingProfile: false
    }
  },
  computed: {
    ...mapGetters(['userId']),
    photo() {
      return this.student.photo
    },
    studentName() {
      return this.student.name
    },
    companyName() {
      const lastCompany = this.student?.professionalInfos
        ? this.student.professionalInfos.length - 1
        : null

      if (lastCompany || lastCompany === 0) {
        const company = this.student.professionalInfos[lastCompany]
        return company?.company
      }

      return null
    },
    companyPosition() {
      const lastCompany = this.student.professionalInfos
        ? this.student.professionalInfos.length - 1
        : null

      if (lastCompany || lastCompany === 0) {
        const company = this.student.professionalInfos[lastCompany]
        return company?.role
      }

      return null
    }
  },
  async mounted() {
    const userId = this.$route.params?.userId

    if (userId) {
      this.student = await UserService.getStudent(userId)
    }
  },
  methods: {
    async toggleEdition() {
      this.editingProfile = !this.editingProfile
    },
    saveEdition() {
      const markdownContent = this.$refs.publicProfileSkills.getMarkdownContent

      this.updatePublicProfile(markdownContent)
      this.toggleEdition()
    },
    async updatePublicProfile(markdownContent) {
      await StudentService.updatePublicProfile(markdownContent)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.public-profile {
  border-left: 1px solid $--default-border-color;
  padding: 12px 40px;

  &__personal {
    .personal-avatar {
      width: 250px;
      height: 250px;
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-icon-user {
        font-size: 140pt;
      }
      &__img {
        cursor: pointer;
        object-fit: cover;
        width: 100%;
      }
    }

    &__information {
      &__name {
        font-size: 18pt;
        font-weight: 600;
      }
      &__description {
        i {
          font-weight: 600;
          color: $--color-text-regular;
        }
        p {
          color: $--color-text-regular;
          font-size: 0.9rem;
          margin-bottom: 3px;
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .public-profile {
    flex-direction: column;
    padding: 12px;

    &__personal {
      display: flex;
      flex-direction: column;
      align-items: center;

      .personal-avatar {
        margin-right: 8px;
        width: 130px;
        height: 130px;

        .el-icon-user {
          font-size: 70pt;
        }
      }

      &__information {
        max-width: 100%;

        &__name {
          font-size: 16pt;
          // width: calc(100% - 30px);

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    &__skills {
      margin-left: 0 !important;
      margin-top: 8px;
    }
  }
}
</style>
