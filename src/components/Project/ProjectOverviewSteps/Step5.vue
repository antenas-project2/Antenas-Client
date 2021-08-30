<template>
  <div
    v-if="$store.getters.isCadi || $store.getters.isRepresentative"
    class="project-step-five"
  >
    <Information
      v-if="$store.getters.isRepresentative && hasNotAddressInformation"
    >
      Nesta etapa um <b>Cadi</b> irá formalizar uma reunião adicionando data e
      local do encontro com o <b>Representante</b>.
    </Information>
    <Information v-if="$store.getters.isCadi && hasAddressInformation">
      A partir de agora o <b>Representante</b> irá definir qual o melhor horário
      para reunião com o <b>CADI</b>.
    </Information>

    <div
      v-if="$store.getters.isCadi && hasNotAddressInformation"
      class="project-step-five__content"
    >
      <h5 class="project-step-five__title">
        Preencha o local da reunião
      </h5>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="130px"
      >
        <el-row :gutter="10">
          <el-col :sm="24" :md="15">
            <el-form-item label="Local" prop="place">
              <el-input
                v-model="form.place"
                type="text"
                maxlength="100"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="9">
            <el-form-item label="CEP" prop="zipCode">
              <el-input
                v-model="form.zipCode"
                v-mask="'#####-###'"
                type="text"
                maxlength="9"
                show-word-limit
                @blur="findAddressByZipCode()"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="24" :md="12">
            <el-form-item label="Cidade" prop="city">
              <el-input
                v-model="form.city"
                type="text"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item label="Bairro" prop="neighborhood">
              <el-input
                v-model="form.neighborhood"
                type="text"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :sm="24" :md="19">
            <el-form-item label="Rua" prop="street">
              <el-input
                v-model="form.street"
                type="text"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="5">
            <el-form-item label="Número" prop="number">
              <el-input v-model="form.number" type="number" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <hr /> -->

        <ProjectPossibleDatePicker @newPossibleDate="addPossibleDate" />
        <PossibleDatesList
          :selectedPossibleDates="selectedPossibleDates"
          @handleClose="handleClose"
        />
      </el-form>

      <div class="d-flex justify-end">
        <el-button
          :disabled="!isFiveStepInformationsValid"
          type="primary"
          @click="update()"
        >
          Salvar local e datas
        </el-button>
      </div>
    </div>

    <div
      v-else-if="$store.getters.isRepresentative && hasAddressInformation"
      class="project-step-five__content"
    >
      <RepresentativeSelectionMeet
        :possibleDates="project.meeting.possibleDate"
      />
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'
import jsonp from 'jsonp'
import { mapGetters } from 'vuex'

import ProjectPossibleDatePicker from '@/components/Project/ProjectOverviewSteps/ProjectPossibleDatePicker'
import PossibleDatesList from '@/components/Project/ProjectOverviewSteps/PossibleDatesList'
import RepresentativeSelectionMeet from '@/components/Project/ProjectOverviewSteps/RepresentativeSelectionMeet'
import Information from '@/components/Information'

export default {
  components: {
    ProjectPossibleDatePicker,
    PossibleDatesList,
    RepresentativeSelectionMeet,
    Information
  },
  directives: { mask },
  data() {
    const defaultRule = [
      {
        required: true,
        message: 'Campo obrigatório',
        trigger: 'submit'
      }
    ]

    return {
      selectedPossibleDates: [],
      form: {
        place: '',
        number: '',
        street: '',
        neighborhood: '',
        city: '',
        zipCode: ''
      },
      rules: {
        place: defaultRule,
        number: defaultRule,
        street: defaultRule,
        neighborhood: defaultRule,
        city: defaultRule,
        zipCode: defaultRule
      }
    }
  },
  computed: {
    ...mapGetters({
      project: 'selectedProject'
    }),
    isFiveStepInformationsValid() {
      return this.selectedPossibleDates.length > 0
    },
    hasAddressInformation() {
      return (
        this.project.meeting.address.place &&
        (this.project.meeting.address.number ||
          this.project.meeting.address.number === 0) &&
        this.project.meeting.address.street &&
        this.project.meeting.address.neighborhood &&
        this.project.meeting.address.city &&
        this.project.meeting.address.zipCode &&
        this.project.meeting.possibleDate.length > 0
      )
    },
    hasNotAddressInformation() {
      return (
        !this.project.meeting.address.place ||
        (!this.project.meeting.address.number &&
          this.project.meeting.address.number !== 0) ||
        !this.project.meeting.address.street ||
        !this.project.meeting.address.neighborhood ||
        !this.project.meeting.address.city ||
        !this.project.meeting.address.zipCode ||
        !this.project.meeting.possibleDate.length
      )
    }
  },
  watch: {
    project() {
      this.selectedPossibleDates = []
      this.form = {
        place: '',
        number: '',
        street: '',
        neighborhood: '',
        city: '',
        zipCode: ''
      }
    }
  },
  mounted() {
    this.form = { ...JSON.parse(JSON.stringify(this.project.meeting.address)) }
    this.selectedPossibleDates = JSON.parse(
      JSON.stringify(this.project.meeting.possibleDate)
    )
  },
  methods: {
    isZipCodeValid(zipCode) {
      return (
        /^[0-9]{5}-[0-9]{3}$/.test(zipCode) ||
        /^[0-9]{5}[0-9]{3}$/.test(zipCode)
      )
    },
    update() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          const project = JSON.parse(JSON.stringify(this.project))

          project.meeting.address = JSON.parse(JSON.stringify(this.form))
          project.meeting.possibleDate = JSON.parse(
            JSON.stringify(this.selectedPossibleDates)
          )

          this.$store
            .dispatch('updateProject', project)
            .catch(err => this.$throwError(err))
        }
      })
    },
    findAddressByZipCode() {
      const self = this
      const zipCode = this.form.zipCode
      const addressDataUrl = `https://viacep.com.br/ws/${zipCode}/json/`

      if (this.isZipCodeValid(zipCode)) {
        jsonp(addressDataUrl, null, (err, address) => {
          if (err) {
            this.$throwError(err)
          } else {
            self.form.city = address.localidade
            self.form.street = address.logradouro
            self.form.neighborhood = address.bairro
            self.form.zipCode = address.cep
          }
        })
      }
    },
    addPossibleDate(meetingDate) {
      this.selectedPossibleDates.push({ dateTime: meetingDate })
    },
    handleClose(tag) {
      const selectedDatePosition = this.selectedPossibleDates.indexOf(tag)
      this.selectedPossibleDates.splice(selectedDatePosition, 1)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.project-step-five {
  &__content {
    padding: 12px;
    margin-bottom: 20px;
    border-radius: 4px;
    background-color: #ffffff;
    border: 1px solid $--default-border-color;

    .el-form {
      .el-form-item {
        &__label {
          line-height: normal;
          padding-bottom: 5px !important;
          font-size: 0.8rem;
          color: $--color-text-regular;
        }
        &__content {
          line-height: 0;

          textarea {
            font-family: 'Inter';
            border: 1px solid $--default-border-color;
          }
        }
      }
    }
  }

  &__title {
    margin-bottom: 8px;
    color: $--color-text-title;
  }

  .el-tag {
    margin: 0 12px 12px 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
}
</style>
