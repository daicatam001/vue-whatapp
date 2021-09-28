<template>
  <span class="exit"
    ><svg viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M16.6 8.1l1.2-1.2 5.1 5.1-5.1 5.1-1.2-1.2 3-3H8.7v-1.8h10.9l-3-3zM3.8 19.9h9.1c1 0 1.8-.8 1.8-1.8v-1.4h-1.8v1.4H3.8V5.8h9.1v1.4h1.8V5.8c0-1-.8-1.8-1.8-1.8H3.8C2.8 4 2 4.8 2 5.8v12.4c0 .9.8 1.7 1.8 1.7z"
      ></path></svg
  ></span>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style scoped lang="scss">
svg {
  display: block;
  fill: #df3333;
}
</style>