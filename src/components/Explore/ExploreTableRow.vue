<template>
  <div
    class="explore-table-row h-100 w-100"
    :class="{ 'round-top': firstChild }"
  >
    <div class="table">
      <div class="table__row" :class="{ 'round-top': firstChild }">
        <div class="d-flex align-center">
          <Avatar :student="{ student }" :disableTitle="true" />
          <div class="ml-2">
            <router-link
              class="unlink"
              :to="{ name: 'public-profile', params: { userId: student.id } }"
            >
              <h5>{{ student.name }}</h5>
              <p class="student-email">{{ student.email }}</p>
            </router-link>
          </div>
        </div>

        <div class="student-city d-flex align-center justify-center">
          {{ student.city }}
        </div>
        <div class="student-medals-amount d-flex align-center justify-center">
          {{ student.medalsAmount }} medalhas ganhas
        </div>
      </div>
      <hr v-if="!lastChild" class="table__divider">
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  components: {
    Avatar
  },
  props: ['student', 'lastChild', 'firstChild']
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.round-top {
  border-radius: 8px 8px 0 0;
}

.unlink {
  text-decoration: none;
}

.explore-table-row {
  .table {
    &__row {
      padding: 20px;
      cursor: pointer;
      transition: 0.2s all ease-in-out;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      .student-email,
      .student-city,
      .student-medals-amount {
        font-size: 0.8rem;
        color: $--color-text-regular;
      }

      &:hover {
        background-color: $--default-border-color;
      }
    }
    &__divider {
      border: 0;
      margin: 0;
      border-top: 1px solid $--default-border-color;
    }
  }
}
</style>
