<template>
  <div class="avatar-content-information">
    <el-avatar
      class="avatar-content-information__avatar"
      size="medium"
      fit="scale-down"
    >
      <img v-if="userPhoto" :src="userPhoto" />
      <span v-else>
        {{ studentInitials }}
      </span>
    </el-avatar>
    <div
      class="avatar-content-information__student-info d-flex flex-column ml-2"
    >
      <h5 class="student-name">{{ studentName }}dsadsadsadsadsda</h5>
      <p class="student-information__student-info__position">
        {{ studentRole }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userPhoto', 'student'],
  computed: {
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
  justify-content: center;
  align-items: center;

  &__avatar {
    min-width: 36px;
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
