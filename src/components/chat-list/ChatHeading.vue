<template>
  <div class="chat-heading">
    <div class="heading-text">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped lang="scss">
.chat-heading {
  height: 72px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(213, 217, 222);

  .heading-text {
    text-transform: uppercase;
    color: rgb(0, 150, 136);
    font-size: 17px;
  }
}
</style>