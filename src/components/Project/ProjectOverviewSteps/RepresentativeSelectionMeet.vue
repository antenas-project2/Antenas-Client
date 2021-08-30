<template>
  <div class="representative-selection-meet">
    <div>
      <h4>Selecione uma data para a reunião:</h4>

      <el-row :gutter="24">
        <el-col :sm="24" :md="14">
          <el-select
            v-model="chosenDate"
            class="representative-selection-meet__selection w100"
          >
            <el-option
              v-for="date in possibleDates"
              :key="date.dateTime"
              :value="date.dateTime"
              :label="formatDate(date.dateTime)"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="justify-end d-flex mt-10">
      <el-button
        class="representative-selection-meet__update"
        type="primary"
        :disabled="disableUpdateButton"
        @click="update()"
      >
        Selecionar
      </el-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  props: ['possibleDates'],
  computed: {
    ...mapGetters({
      isCadi: 'isCadi',
      project: 'selectedProject'
    }),
    disableUpdateButton() {
      if (!this.chosenDate) {
        return true
      }
      return false
    }
  },
  data() {
    return {
      chosenDate: null
    }
  },
  methods: {
    update() {
      const project = JSON.parse(JSON.stringify(this.project))

      if (this.chosenDate) {
        project.meeting.chosenDate = this.chosenDate
      }
      this.$store
        .dispatch('updateProject', project)
        .catch(err => this.$throwError(err))
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }
  }
}
</script>

<style lang="scss">
.representative-selection-meet {
  &__selection {
    margin-top: 10px;
  }
  &__update {
    margin-top: 10px;
  }
}
</style>
