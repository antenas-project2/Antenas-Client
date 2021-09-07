<template>
  <div class="project-list-error h100 w-100">
    <svg
      viewBox="0 0 24 24"
      width="50"
      height="50"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon-error"
    >
      <path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      ></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
    <div>
      <h4 class="main-message">
        Parece que houve algum problema =(
      </h4>
      <p class="main-submessage">
        Tente novamente e caso persista procure um administrador.
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.project-list-error {
  padding: 80px 30px;
  text-align: center;

  .icon-error {
    margin-bottom: 8px;
    stroke: rgb(235, 85, 85);
  }
  .main-message {
    color: $--color-text-regular;
    font-weight: 500;
  }
  .main-submessage {
    margin-top: 6px;
    color: $--color-text-secondary;
  }
}
</style>
