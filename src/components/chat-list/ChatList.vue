<template>
  <div class="chat-list">
    <div class="chat-cart-list">
      <ChatCard 
      :key="chat.id"
      v-for="chat of chats" 
      :title="chat.title" />
    </div>
  </div>
</template>

<script>
import  ChatCard from './ChatCard'
  {
     components:{
         ChatCard
     },
     computed: {
         chats() {
             return this.$store.getters['chats/chats']
         }
     },
     created() {
         this.$store.dispatch('chats/getLatestChats', 25)
     }
 }
</script>

<style scoped></style>
