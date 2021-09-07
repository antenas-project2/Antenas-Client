<template>
  <div>
    <div
      class="overlay__background"
      :class="{ opened: visibility }"
      @click="visibility = false"
    />
    <div
      class="overlay"
      :class="{ 'overlay-show': visibility, 'overlay-hide': !visibility }"
    >
      <div
        class="overlay__content small-scroll"
        :class="{ 'retract-scroll': retractScroll }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'retractScroll'],
  computed: {
    visibility: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  text-align: left;
  height: auto;
  max-height: 80%;
  border-radius: 6px;
  padding: 18px 24px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &.overlay-show {
    transform: translate(-50%, -50%);
  }
  &.overlay-hide {
    width: 0;
    opacity: 0;
    pointer-events: none;
  }

  &__background {
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    min-height: 100%;
    position: fixed;
    opacity: 0;
    z-index: 0;
    left: 0;
    top: 0;
    transition: all 0.4s ease;
    pointer-events: none;
    cursor: pointer;

    &.opened {
      z-index: 9;
      opacity: 1;
      pointer-events: all;
    }
  }
}
.retract-scroll {
  margin-right: -10px;
}

@media (max-width: 580px) {
  .overlay {
    top: inherit;
    bottom: 0;
    width: 100%;
    height: auto;
    border-radius: 6px 6px 0 0;
    transform: translate(-50%, 100%);
    transition: ease 0.4s;

    &.overlay-show {
      transform: translate(-50%, 0);
    }
  }
}
</style>
