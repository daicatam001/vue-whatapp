
<template>
  <div class="chat-feed">
    <div class="message-list-wrapper">
      <MessageList />
      xsxs
    </div>
    <div class="new-message-wrapper">
      <NewMessage />
    </div>
  </div>
</template>

<script>
import MessageList from './MessageList.vue'
import NewMessage from './NewMessage.vue'
export default {
  components: {
    MessageList,
    NewMessage
  }
}
</script>

<style scoped lang="scss">
.chat-feed {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.message-list-wrapper {
  flex-grow: 1;
}
.new-message-wrapper {
  flex-shrink: 0;
}
</style>