<template>
  <svg
    viewBox="0 0 18 18"
    :width="toSize"
    :height="toSize"
    class="double-check"
  >
    <path
      :fill="color"
      d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: ['color', 'size'],
  computed: {
    toSize() {
      return this.size || 18
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  fill: #919191;
}
</style>