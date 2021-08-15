<template>
 <div class="chat-list">
  <div class="chat-cart-list">
   <ChatCard
     v-for="chat of chats"
     :key="chat.id"
     :title="chat.title"
     :last-message="chat.last_message"
     :people="chat.people"
   />
  </div>
 </div>
</template>

<script>
import ChatCard from './ChatCard'
export default {
  components: {
    ChatCard,
  },
  computed: {
    chats() {
      return this.$store.getters['chats/chats']
    },
  },
  created() {
    this.$store.dispatch('chats/getLatestChats', 25)
  },
}
</script>

<style scoped></style>
