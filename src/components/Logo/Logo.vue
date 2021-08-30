<template>
  <div class="logo" @click="redirect()">
    <h1 class="logo__title">
      Antenas
    </h1>
    <h2 class="logo__subtitle">
      Um projeto FATEC
    </h2>
  </div>
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push('/projects')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.logo {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  &__title {
    font-weight: 600;
    color: $--color-primary;
    font-size: 25px !important;
    line-height: 1;
  }
  &__subtitle {
    color: $--color-primary;
    font-weight: 300;
    font-size: 11px;
    font-style: normal;
  }
}
</style>
