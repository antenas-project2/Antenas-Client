<template>
  <div class="possible-dates-list">
    <el-empty
      v-if="selectedPossibleDates.length === 0"
      :image-size="60"
      description="Nenhum horário selecionado"
    />
    <div v-else>
      <h6 class="possible-dates-list__title">
        Data(s) cadastrada(s):
      </h6>
      <el-tag
        v-for="(date, index) in selectedPossibleDates"
        :key="index"
        closable
        effect="plain"
        @close="handleClose(date)"
      >
        {{ date.dateTime | formatDate }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  filters: {
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }
  },
  props: ['selectedPossibleDates'],
  methods: {
    handleClose(date) {
      this.$emit('handleClose', date)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.possible-dates-list {
  &__title {
    margin-top: 15px;
    margin-bottom: 8px;
  }
}
</style>
