<template>
  <div class="message-list">
    <div v-for="message of messages" :key="message.id">
      {{ messages }}
      <hr />
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

<style>
</style>