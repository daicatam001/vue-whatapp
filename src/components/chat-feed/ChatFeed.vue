
<template>
  <div class="chat-feed">
    <div class="message-list-wrapper">
      <MessageList />
    </div>
    <div class="new-message-wrapper">
      <NewMessage />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import MessageList from './MessageList.vue'
import NewMessage from './NewMessage.vue'
export default defineComponent({
  components: {
    MessageList,
    NewMessage
  }
})
</script>

<style scoped lang="scss">
.chat-feed {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.message-list-wrapper {
  flex-grow: 1;
}
.new-message-wrapper {
  flex-shrink: 0;
}
</style>