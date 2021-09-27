<template>
  <div class="chat-list">
    <Toolbar />
    <ChatSearch />
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
    <div class="chat-card-list-wrapper" v-else>
      <div class="chat-card-list scroll-element">
        <template v-for="chat of chats" :key="chat.id">
          <HeadingCard
            v-if="chat.type === CHAT_CARD_TYPE.HEADING"
            :title="chat.title"
          />
          <PhoneBookCard
            v-else-if="chat.type === CHAT_CARD_TYPE.PHONE_BOOK"
            @click="createNewChatUser(chat)"
            :first_name="chat.first_name"
            :custom_json="chat.custom_json"
          />
          <ChatCard
            v-else
            @click="selectChat(chat.id)"
            :id="chat.id"
            :title="chat.title"
            :admin="chat.admin"
            :custom_json="chat.custom_json"
            :isDirectChat="chat.is_direct_chat"
            :messageEntities="chat.messageEntities"
            :lastMessage="chat.last_message"
            :avatar="chat.avatar"
            :people="chat.people"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ChatSearch from './ChatSearch.vue'
import Toolbar from '@/components/toolbar/Toolbar.vue'
import { CHAT_CARD_TYPE } from '@/core/constants'
export default {
  components: {
    ChatSearch,
    Toolbar
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
      CHAT_CARD_TYPE: CHAT_CARD_TYPE,
      newChatTimer: null
    }
  },
  methods: {
    selectChat(id) {
      if (this.selectedChatId == id) {
        return
      }
      this.$store.dispatch('chats/selectChat', id)
    },
    createNewChatUser(user) {
      clearTimeout(this.newChatTimer)
      this.$store.dispatch('chats/setNewChatUser', user)

      this.newChatTimer = setTimeout(async () => {
        await this.$store.dispatch('chats/createNewChatUser', user)
        this.$store.dispatch('chats/setNewChatUser', null)
      }, 1000)
    }
  },
  created() {
    // this.$store.dispatch('chats/getLatestChats', 25)
  }
}
</script>

<style scoped lang="scss">
.notifiy {
  padding: 72px 50px;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
}
.chat-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.chat-card-list-wrapper {
  flex-grow: 1;
  position: relative;
  .chat-card-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    > * {
      border-bottom: 1px solid rgb(213, 217, 222);
    }
  }
}
</style>

 