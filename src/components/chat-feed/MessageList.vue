<template>
  <div class="message-list">
    <div class="message-list-panel">
      <div v-for="message of messages" :key="message.id">
        {{ messages }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages() {
      return this.$store.getters['messages/messages']
    }
  }
}
</script>

<style scoped lang="scss">
.message-list {
  height: 100%;
  position: relative;
}
.message-list-panel{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>