<template>
  <div class="avatar-content-information">
    <el-avatar
      class="avatar-content-information__avatar"
      size="medium"
      fit="scale-down"
    >
      <img
        v-if="getUserPhoto"
        :src="getUserPhoto"
        class="content-information-img"
      />
      <span v-else>
        {{ userInitials }}
      </span>
    </el-avatar>
    <div
      v-if="!disableTitle"
      class="avatar-content-information__student-info d-flex flex-column ml-2"
    >
      <h5 class="student-name">{{ studentName }}</h5>
      <p
        v-if="student.role && Array.isArray(student.role)"
        class="student-information__student-info__position"
      >
        {{ studentRole }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userPhoto', 'student', 'disableTitle'],
  computed: {
    getUserPhoto() {
      if (this.userPhoto) {
        return this.userPhoto
      }
      return this.student.student.photo
    },
    studentName() {
      return this.student?.student.name
    },
    studentRole() {
      const firstRole = this.student?.role[0]
      return firstRole?.name
    },
    userInitials() {
      if (this.studentName) {
        const splitedName = this.studentName.split(' ')
        return (
          splitedName[0].charAt(0) +
          splitedName[splitedName.length - 1].charAt(0)
        ).toUpperCase()
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.avatar-content-information {
  line-height: 1.3;
  max-width: 100%;
  display: flex;
  align-items: center;

  &__avatar {
    min-width: 36px;

    .content-information-img {
      cursor: pointer;
      object-fit: cover;
      width: 100%;
    }
  }

  &__student-info {
    width: 80%;

    .student-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    &__position {
      font-size: 0.7rem;
      color: $--color-text-secondary;
    }
  }
}
</style>
