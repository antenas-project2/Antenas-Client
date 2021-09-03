<template>
  <div>
    <div class="medals" v-if="medals">
      <h4 v-if="medals" class="mb-2">Medalhas ({{ medals.length }})</h4>
      <div class="d-flex justify-start">
        <div v-for="medal in medals" :key="medal.id">
          <Medal size="lg" :medal="medal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Medal from '@/components/Medal/Medal'

export default {
  components: {
    Medal
  },
  props: ['medals']
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.medals {
  width: 100%;
  border: 1px solid $--default-border-color;
  border-radius: 4px;
  padding: 8px;
}
</style>
