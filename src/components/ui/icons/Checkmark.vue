<template>
  <svg viewBox="0 0 24 24" width="24" height="24" class="checkmark">
    <path
      fill="currentColor"
      d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"
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
  color: #919191;;
}
</style>