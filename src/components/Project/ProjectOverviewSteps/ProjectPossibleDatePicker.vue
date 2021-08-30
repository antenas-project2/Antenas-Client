<template>
  <div class="project-possible-date-picker">
    <h5 class="project-possible-date-picker__title">
      Selecione data e horário do possível encontro
      <small class="project-possible-date-picker__disclaimer">
        (É obrigatório adicionar um horário para reunião)
      </small>
    </h5>
    <div class="d-flex justify-content-center">
      <v-date-picker
        class="d-flex flex-column"
        v-model="meetingDate"
        mode="dateTime"
        is24hr
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="project-possible-date-picker__input"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </v-date-picker>
      <el-button
        class="project-possible-date-picker__add"
        type="primary"
        icon="el-icon-plus"
        @click="newPossibleDate"
      />
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar'

export default {
  components: { 'v-date-picker': DatePicker },
  data() {
    return {
      meetingDate: new Date()
    }
  },
  methods: {
    newPossibleDate() {
      this.$emit('newPossibleDate', this.meetingDate)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.project-possible-date-picker {
  &__title {
    margin-top: 13px;
    margin-bottom: 8px;
  }
  &__disclaimer {
    font-size: 0.7rem;
    font-weight: 500;
    color: $--color-danger;
  }
  &__input {
    padding: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 6px;
    border: 1px solid #c0c4cc;
    margin-right: 5px;
    color: $--color-text-regular;
  }
  &__add {
    padding: 12px;
    border-radius: 6px;
  }
}

@media (max-width: 992px) {
  .project-possible-date-picker {
    span,
    &__input {
      width: 100%;
    }
    &__add {
      margin-left: 5px;
    }
  }
}
</style>
