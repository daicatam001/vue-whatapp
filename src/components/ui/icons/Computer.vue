<template>
  <svg viewBox="0 0 21 18" width="21" height="18" class="computer">
    <path
      fill="currentColor"
      d="M10.426 14.235a.767.767 0 0 1-.765-.765c0-.421.344-.765.765-.765s.765.344.765.765-.344.765-.765.765zM4.309 3.529h12.235v8.412H4.309V3.529zm12.235 9.942c.841 0 1.522-.688 1.522-1.529l.008-8.412c0-.842-.689-1.53-1.53-1.53H4.309c-.841 0-1.53.688-1.53 1.529v8.412c0 .841.688 1.529 1.529 1.529H1.25c0 .842.688 1.53 1.529 1.53h15.294c.841 0 1.529-.688 1.529-1.529h-3.058z"
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
 color: #919191;
}
</style>