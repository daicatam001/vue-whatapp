<template>
  <span class="ban"
    ><svg viewBox="0 0 24 24" width="24" height="24" class="">
      <path
        :fill="color"
        d="M12 2.8c-5.3 0-9.7 4.3-9.7 9.7s4.3 9.7 9.7 9.7 9.7-4.3 9.7-9.7-4.4-9.7-9.7-9.7zm-7.3 9.7c0-4 3.3-7.3 7.3-7.3 1.6 0 3.1.5 4.3 1.4L6.1 16.8c-.9-1.2-1.4-2.7-1.4-4.3zm7.3 7.3c-1.6 0-3-.5-4.2-1.4L17.9 8.3c.9 1.2 1.4 2.6 1.4 4.2 0 4-3.3 7.3-7.3 7.3z"
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