<template>
  <svg
    viewBox="0 0 24 24"
    :width="toSize"
    :height="toSize"
    class="close"
  >
    <path
      fill="currentColor"
      d="M17.25 7.8L16.2 6.75l-4.2 4.2-4.2-4.2L6.75 7.8l4.2 4.2-4.2 4.2 1.05 1.05 4.2-4.2 4.2 4.2 1.05-1.05-4.2-4.2 4.2-4.2z"
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