<template>
  <span class="checkmark">
    <svg viewBox="0 0 24 24" :width="toSize" :height="toSize">
      <path
        fill="currentColor"
        d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"
      ></path>
    </svg>
  </span>
</template>

<script>
export default {
  props: ['size'],
  computed: {
    toSize() {
      return this.size || 24
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  display: block;
}
</style>