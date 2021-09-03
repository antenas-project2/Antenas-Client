<template>
  <div class="profile w100 small-scroll">
    <div class="profile__header d-flex">
      <div class="profile__header__content d-flex">
        <img
          v-if="user.photo !== null"
          class="profile__header__content__image"
          :src="user.photo"
          alt="Foto de perfil"
        />
        <i
          v-else
          class="profile__header__content__user-icon el-icon-user"
          alt="Foto de perfil"
        />
      </div>
      <div class="profile__header__personal-info d-flex flex-column ml-2 mt-2">
        <h2 class="profile__header__personal-info__name mb-2">
          {{ user.name }}
        </h2>
        <div v-if="user.email" class="profile__header__personal-info__email">
          <i class="el-icon-message" />
          {{ user.email }}
        </div>
        <div
          v-if="user.linkedin"
          class="profile__header__personal-info__linkedin"
        >
          <i class="el-icon-link" />
          {{ user.linkedin }}
        </div>
        <div class="profile__header__personal-info__city">
          <i class="el-icon-location-outline" />
          {{ user.city }}
        </div>
        <div class="profile__header__personal-info__completedProjects">
          <i class="el-icon-trophy" />
          {{ user.completedProjects }} projetos concluídos
        </div>
        <div
          v-if="user.biography"
          class="profile__header__personal-info__biography mt-2"
        >
          <h6 class="mb-1">Biografia</h6>
          {{ user.biography }}
        </div>
      </div>
    </div>

    <div class="profile__informations mt-2">
      <StudentProfileInformation
        class="student-profile mr-2"
        :professionalInfos="user.professionalInfos"
        :academicInfos="user.academicInfos"
      />
      <StudentProfileMedals class="student-medals" :medals="user.medals" />
    </div>

    <div v-if="user.studentTeam.length > 0" class="profile__projects-information mt-2">
      <StudentProjectsInformation :user="user" />
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'

import StudentProfileInformation from '@/components/Profile/StudentProfileInformation'
import StudentProfileMedals from '@/components/Profile/StudentProfileMedals'
import StudentProjectsInformation from '@/components/Profile/StudentProjectsInformation'

export default {
  components: {
    StudentProfileInformation,
    StudentProfileMedals,
    StudentProjectsInformation
  },
  data() {
    return {
      user: {}
    }
  },
  async mounted() {
    this.user = await UserService.getProfileInfo(this.$route.params.userId)
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.profile {
  border-left: 1px solid $--default-border-color;
  padding: 12px;

  &__header {
    &__content {
      border: 1px dashed $--default-border-color;
      border-radius: 4px;
      height: min-content;
      width: min-content;

      img {
        border-radius: 4px;
      }
      &__image {
        width: 120px;
        height: 120px;
        padding: 2px;
        object-fit: cover;
      }
      &__user-icon {
        font-size: 134px;
        color: $--color-text-title;
      }
    }
    &__personal-info {
      &__name {
        color: $--color-text-title;
        font-weight: 600;
      }
      &__email,
      &__linkedin,
      &__city,
      &__completedProjects,
      &__biography {
        font-size: 0.85rem;
        color: $--color-text-regular;
        margin-bottom: 3px;
      }
    }
  }

  &__informations {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 860px) {
  .profile {
    &__informations {
      display: grid;
      grid-template-columns: 1fr !important;

      .student-profile {
        width: 100% !important;
      }
      .student-medals {
        margin-top: 0.5rem;
        width: 100% !important;
      }
    }
  }
}

@media (max-width: 580px) {
  .profile {
    &__header {
      display: flex !important;
      flex-direction: column !important;
      align-items: center;

      &__content {
        justify-content: center;
      }
      &__personal-info {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
