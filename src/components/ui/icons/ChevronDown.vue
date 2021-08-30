<template>
  <svg viewBox="0 0 18 18" width="18" height="18" class="chevron-down">
    <path
      :fill="color"
      d="M3.3 4.6L9 10.3l5.7-5.7 1.6 1.6L9 13.4 1.7 6.2l1.6-1.6z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style scoped lang="scss">
svg {
  fill: #919191;;
}
</style>