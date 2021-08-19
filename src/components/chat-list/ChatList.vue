<template>
  <div class="chat-list">
    <NewChat />
    <div class="chat-card-list">
      <ChatCard
        @click="selectChat(chat.id)"
        v-for="chat of chats"
        :key="chat.id"
        :id="chat.id"
        :title="chat.title"
        :last-message="chat.last_message"
        :people="chat.people"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import ChatCard from '@/components/chat-list/ChatCard.vue'
import NewChat from './NewChat.vue'
export default defineComponent({
  components: {
    ChatCard,
    NewChat
  },
  computed: {
    chats() {
      return this.$store.getters['chats/chats']
    }
  },
  methods: {
    selectChat(id) {
      this.$store.dispatch('chats/setSelectedChatId', id)
    }
  },
  created() {
    this.$store.dispatch('chats/getLatestChats', 25)
  }
})
</script>

<style scoped></style>
 