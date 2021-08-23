<template>
  <div class="message-list">
    <div class="message-list-panel">
      <div v-for="message of messages" :key="message.id">
        <Message
          :id="message.id"
          :senderFirstName="`${message.sender.first_name}`"
          :senderLastName="`${message.sender.last_name}`"
          :avatar="message.sender.avatar"
          :senderUsername="message.sender_username"
          :text="message.text"
          :created="message.created"
          :customJson="message.custom_json"
         />
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
export default {
  components: { Message },
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