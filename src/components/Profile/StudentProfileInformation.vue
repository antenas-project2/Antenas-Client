<template>
  <div>
    <div v-if="professionalInfos && academicInfos" class="profile-information">
      <el-tabs>
        <el-tab-pane label="Profissional" class="info">
          <div
            v-for="(professionalInfo, index) in professionalInfos"
            :key="professionalInfo.id"
          >
            <div class="profile-information__institution-info" :class="{ 'mt-3': index !== 0 }">
              <h3>
                <i class="el-icon-office-building" />
                {{ professionalInfo.company }}
              </h3>
              <p>{{ professionalInfo.role }}</p>
              <small v-if="professionalInfo.end">
                {{ professionalInfo.start | moment('MM/YYYY') }} -
                {{ professionalInfo.end | moment('MM/YYYY') }}
              </small>
              <small v-else>
                {{ professionalInfo.start | moment('DD/MM/YYYY') }} - Até o momento
              </small>
            </div>

            <div class="profile-information__activities mt-2">
              {{ professionalInfo.activitiesPerformed }}
            </div>
          </div>
          <div v-if="professionalInfos.length == 0">
            <el-empty :image-size="90">
              <template slot="description">
                <h6>Opa, nenhum projeto por aqui..</h6>
              </template>
            </el-empty>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Acadêmico" class="info">
          <div
            v-for="(academicInfo, index) in academicInfos"
            :key="academicInfo.id"
          >
          <div class="profile-information__institution-info" :class="{ 'mt-3': index !== 0 }">
            <h3>
              <i class="el-icon-school"></i>
              {{ academicInfo.institution }}
            </h3>
            <p>{{ academicInfo.course }}</p>
            <small v-if="academicInfo.end">
              {{ academicInfo.start | moment('MM/YYYY') }} -
              {{ academicInfo.end | moment('MM/YYYY') }}
            </small>
            <small v-else>
              {{ academicInfo.start | moment('DD/MM/YYYY') }} - Até o momento
            </small>
          </div>
          </div>
          <div v-if="academicInfos == 0">
            Não há informações cadastradas
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props: ['professionalInfos', 'academicInfos']
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.profile-information {
  width: 100%;
  border: 1px solid $--default-border-color;
  border-radius: 4px;
  padding: 8px 12px 12px 12px;

  &__institution-info {
    h3 {
      font-weight: 600;
    }
    p {
      color: $--color-text-title;
      font-size: 0.9rem;
      font-weight: 500;
    }
    small {
      color: $--color-text-regular;
      font-size: 0.8rem;
    }
  }

  &__activities {
    font-size: 0.9rem;
  }
}
</style>
