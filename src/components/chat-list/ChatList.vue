<template>
  <div class="chat-list">
    <NewChat />
    <div class="notifiy" v-if="isSearching">
      <span>
        Đang tìm kiếm cuộc trò chuyện, người liên hệ hoặc tin nhắn...
      </span>
    </div>
    <div class="notifiy" v-else-if="noSearchResult">
      <span>
        Không tìm thấy cuộc trò chuyện, người liên hệ hoặc tin nhắn nào
      </span>
    </div>
    <div class="chat-card-list" v-else>
      <div v-for="chat of chats" :key="chat.id">
        <HeadingCard v-if="chat.isHeading" :title="chat.title" />
        <ChatCard
          v-else
          @click="selectChat(chat.id)"
          :id="chat.id"
          :title="chat.title"
          :last-message="chat.last_message"
          :avatar="chat.avatar"
          :people="chat.people"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChatCard from './ChatCard.vue'
import HeadingCard from './HeadingCard.vue'
import NewChat from './NewChat.vue'
export default {
  components: {
    ChatCard,
    NewChat,
    HeadingCard
  },
  computed: {
    chats() {
      return this.$store.getters['chats/chats']
    },
    noSearchResult() {
      console.log(this.$store.getters['chats/noSearchResult'])
      return this.$store.getters['chats/noSearchResult']
    },
    isSearching() {
      return this.$store.getters['chats/isSearching']
    },
    selectedChatId() {
      return this.$store.getters['chats/selectedChatId']
    }
  },
  methods: {
    selectChat(id) {
      if (this.selectedChatId == id) {
        return
      }
      this.$store.dispatch('chats/selectChat', id)
    }
  },
  created() {
    this.$store.dispatch('chats/getLatestChats', 25)
  }
}
</script>

<style scoped>
.notifiy {
  padding: 72px 50px;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
}
</style>
 