<template>
  <span class="arrow-forward"
    ><svg viewBox="0 0 30 30" :width="toSize" :height="toSize">
      <path
        fill="currentColor"
        d="M15 7l-1.4 1.4 5.6 5.6H7v2h12.2l-5.6 5.6L15 23l8-8-8-8z"
      ></path></svg
  ></span>
</template>

<script>
export default {
  props: ['size'],
  computed: {
    toSize() {
      return this.size || 30
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  display: block;
}
</style>