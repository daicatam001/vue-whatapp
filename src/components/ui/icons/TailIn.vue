<template>
  <svg viewBox="0 0 8 13" width="8" height="13" class="tail-in">
    <path
      opacity=".13"
      fill="#0000000"
      d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
    ></path>
    <path
      :fill="color"
      d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style scoped>
svg {
  display: block;
}
</style>