<template>
  <svg viewBox="0 0 24 24" width="24" height="24" class="pencil">
    <path
      :fill="color"
      d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"
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
  fill: #919191;
}
</style>