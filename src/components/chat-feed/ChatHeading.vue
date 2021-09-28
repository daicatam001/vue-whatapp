<template>
  <div class="chat-heading">
    <div class="chat-heading-content">
      <div class="content-wrapper" @click="showChatInfo">
        <Avatar :src="vm.avatar" size="40px" />
        <div class="content">
          <div class="line">
            <div class="title">{{ vm.title }}</div>
            <div class="brief">
              <OnlineState
                v-if="!!directChatUser"
                :isOnline="vm.isOnline"
                :chatUpdated="vm.chatUpdated"
              />
              <template v-else>
                {{ vm.members }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="action">
      <a-dropdown :trigger="['click']" placement="bottomRight">
        <ThreeDotVertical color="black" />
        <template #overlay>
          <ChatFeedSettings/>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Chat, UserChat } from '@/core/models/chats'
import { UserInfo } from '@/core/models/users'
import { defineComponent } from '@vue/runtime-core'
import ChatFeedSettings from './ChatFeedSettings.vue'
export default defineComponent({
  components: {
    ChatFeedSettings
  },
  computed: {
    chat(): Chat {
      return this.$store.getters['chat/chat']
    },
    directChatUser(): UserChat {
      return this.$store.getters['chat/directChatUser']
    },
    members(): { person: UserInfo }[] {
      return this.$store.getters['chat/members']
    },
    vm() {
      const data = {
        avatar: '',
        title: '',
        brief: null,
        isOnline: false,
        chatUpdated: '',
        members: ''
      }
      if (this.directChatUser) {
        data.avatar = this.directChatUser.person.avatar
        data.title = this.directChatUser.person.first_name
        data.isOnline = this.directChatUser.person.is_online
        data.chatUpdated = this.directChatUser.chat_updated as string
      } else {
        data.title = this.chat.title
        data.members = this.members
          .map((item) => item.person.first_name)
          .join(', ')
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
.brief {
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
  line-height: 20px;
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