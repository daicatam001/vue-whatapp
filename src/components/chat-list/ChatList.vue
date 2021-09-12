<template>
  <div class="chat-list">
    <NewChat />
    <div class="notifiy" v-if="isSearching">
      <span>
        {{ $t('chatSearching') }}
      </span>
    </div>
    <div class="notifiy" v-else-if="noSearchResult">
      <span>
        {{ $t('chatNoResult') }}
      </span>
    </div>
    <div class="chat-card-list" v-else>
      <div v-for="chat of chats" :key="chat.id">
        <HeadingCard
          v-if="chat.type === CHAT_CARD_TYPE.HEADING"
          :title="chat.title"
        />
        <PhoneBookCard
          v-else-if="chat.type === CHAT_CARD_TYPE.PHONE_BOOK"
          @click="setNewChatUser(chat)"
          :first_name="chat.first_name"
          :custom_json="chat.custom_json"
        />
        <ChatCard
          v-else
          @click="selectChat(chat.id)"
          :id="chat.id"
          :title="chat.title"
          :messageEntities="chat.messageEntities"
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
import PhoneBookCard from './PhoneBookCard.vue'
import NewChat from './NewChat.vue'
import { CHAT_CARD_TYPE } from '@/core/constants'
export default {
  components: {
    ChatCard,
    NewChat,
    HeadingCard,
    PhoneBookCard
  },
  computed: {
    chats() {
      return this.$store.getters['chats/chats']
    },
    noSearchResult() {
      return this.$store.getters['chats/noSearchResult']
    },
    isSearching() {
      return this.$store.getters['chats/isSearching']
    },
    selectedChatId() {
      return this.$store.getters['chats/selectedChatId']
    }
  },
  data() {
    return {
      CHAT_CARD_TYPE: CHAT_CARD_TYPE
    }
  },
  methods: {
    selectChat(id) {
      if (this.selectedChatId == id) {
        return
      }
      this.$store.dispatch('chats/selectChat', id)
    },
    setNewChatUser(user){
       this.$store.dispatch('chats/setNewChatUser', user)
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
 