<template>
  <div class="chat-heading">
    <div class="chat-heading-content">
      <div class="content-wrapper" @click="showChatInfo">
        <Avatar :src="data.avatar" size="40px" />
        <div class="content">
          <div class="line">
            <div class="title">{{ data.title }}</div>
            <div class="brief">
              <OnlineState :isOnline="data.isOnline" :chatUpdated="data.chatUpdated" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="action">
      <ThreeDotVertical color="black" />
    </div>
  </div>
</template>

<script lang="ts">
import { Chat, UserChat } from '@/core/models/chats'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  computed: {
    chat(): Chat {
      return this.$store.getters['chat/chat']
    },
    directChatUser(): UserChat {
      return this.$store.getters['chat/directChatUser']
    },
    data() {
      const data = {
        avatar: '',
        title: '',
        brief: null,
        isOnline: false,
        chatUpdated:''
      }
      if (this.directChatUser) {
        data.avatar = this.directChatUser.person.avatar
        data.title = this.directChatUser.person.first_name
        data.isOnline = this.directChatUser.person.is_online
        data.chatUpdated  = this.directChatUser.chat_updated as string
      } else {
        data.title = this.chat.title
      }
      return data
    }
  },
  methods: {
    showChatInfo() {
      this.$store.dispatch('ui/toggleShowChatInfo', true)
    }
  }
})
</script>

<style scoped lang="scss">
.chat-heading {
  gap: 15px;
  background-color: #ededed;
  align-items: center;
  display: flex;
  padding: 10px 16px;
  height: 60px;
}
.chat-heading-content {
  flex-grow: 1;
  margin-right: 20px;
}
.content-wrapper {
  display: flex;
  gap: 15px;
}
.title {
  font-weight: 500;
  color: black;
}
.content {
  cursor: pointer;
  height: 100%;
  flex-grow: 1;
}
.line {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
}
.online-state {
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
</style>