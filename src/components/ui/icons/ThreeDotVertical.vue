<template>
  <svg viewBox="0 0 24 24" :width="toSize" :height="toSize" class="three-dot-vertical">
    <path
      :fill="color"
      d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: ['color', 'size'],
  computed: {
    toSize() {
      return this.size || 24
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  color: #919191;
}
</style>