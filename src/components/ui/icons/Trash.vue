<template>
  <span class="trash"
    ><svg viewBox="0 0 24 24" width="24" height="24" class="">
      <path
        :fill="color"
        d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H6v12zM19 3h-3.5l-1-1h-5l-1 1H5v2h14V3z"
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
  fill: #df3333;
}
</style>