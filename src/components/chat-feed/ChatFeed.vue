
<template>
  <div class="chat-feed"></div>
</template>

<script>
export default {
  computed: {
    selectedChatId() {
      return this.$store.getters['chats/selectedChatId']
    }
  },
  watch: {
    selectedChatId() {
      this.$store.dispatch('messages/fetchLatestMessages')
    }
  }
}
</script>

<style>
</style>