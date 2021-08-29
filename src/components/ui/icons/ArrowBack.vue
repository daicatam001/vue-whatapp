<template>
  <svg viewBox="0 0 24 24" width="24" height="24" class="arrow-back">
    <path
      :fill="color"
      d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"
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
  fill: white;
}
</style>