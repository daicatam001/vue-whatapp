
<template>
  <div class="chat-feed">
    <div class="welcome-wrapper" v-if="!hasSelectedChat">
      <Welcome />
    </div>
    <template v-else>
      <div class="bg"></div>
      <div class="chat-heading-wapper">
        <ChatHeading />
      </div>
      <div class="message-list-wrapper">
        <a-dropdown :trigger="['contextmenu']">
          <MessageList />
          <template #overlay>
            <ChatFeedSettings />
          </template>
        </a-dropdown>
      </div>
      <div class="new-message-wrapper">
        <NewMessage />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import MessageList from './MessageList.vue'
import NewMessage from './NewMessage.vue'
import Welcome from './Welcome.vue'
import ChatHeading from './ChatHeading.vue'
import ChatFeedSettings from './ChatFeedSettings.vue'
export default defineComponent({
  components: {
    MessageList,
    NewMessage,
    Welcome,
    ChatHeading,
    ChatFeedSettings
  },
  computed: {
    hasSelectedChat() {
      return this.$store.getters['chats/hasSelectedChat']
    }
  }
})
</script>

<style scoped lang="scss">
.chat-feed {
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
}
.welcome-wrapper {
  height: 100%;
}
.message-list-wrapper {
  flex-grow: 1;
  position: relative;
}
.new-message-wrapper {
  flex-shrink: 0;
  position: relative;
}
.chat-heading-wapper {
  position: relative;
}

.bg {
  position: absolute;
  background-image: url('../../assets/images/bg-chat-tile-light.png');
  opacity: 0.1;
  top: 0;
  left: 0;
  background-repeat: repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
}
</style>