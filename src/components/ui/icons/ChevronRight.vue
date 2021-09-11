<template>
  <span class="chevron-right">
    <svg viewBox="0 0 10 21" width="10" height="21">
      <path
        :fill="color"
        d="M1 15.75l5.2-5.2L1 5.35l1.5-1.5 6.5 6.7-6.6 6.6-1.4-1.4z"
      ></path>
    </svg>
  </span>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style scoped lang="scss">
svg {
  display: block;
  fill: #919191;
}
</style>