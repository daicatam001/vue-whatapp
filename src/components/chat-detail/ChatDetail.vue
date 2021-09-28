<template>
  <div class="chat-detail">
    <ChatDetailHeading />
    <div class="detail-body-wrapper">
      <div class="detail-body scroll-element">
        <!-- <div class="user-block block"> -->
        <!-- <Avatar :src="avatar" size="200px" />
          <div class="content">
            <div class="line">
              <div class="title">{{ vm.title }}</div>
              <div class="brief">
                <OnlineState
                  v-if="directChatUser"
                  :isOnline="vm.isOnline"
                  :chatUpdated="vm.chatUpdated"
                />
                <template v-else>
                  {{ vm.createFormated }}
                </template>
              </div>
            </div>
          </div>
        </div> -->
        <div class="chat-detail-block">
          <ChatDetailAvatar
            :title="vm.title"
            :isDirectChat="!!directChatUser"
            :isOnline="vm.isOnline"
            :chatUpdated="vm.chatUpdated"
            :created="vm.createFormated"
          />
        </div>
        <div class="chat-detail-block">
          <ChatDetailMedia />
        </div>
        <div class="chat-detail-block">
          <ChatDetailMessageAction />
        </div>
        <div class="chat-detail-block">
          <ChatDetailUserIntro
            :introduce="vm.introduce"
            :username="vm.username"
          />
        </div>
        <div class="chat-detail-block">
          <ChatDetailChatAction :label="$t('ban')" type="danger">
            <template #icon>
              <Ban />
            </template>
          </ChatDetailChatAction>
        </div>

        <div class="chat-detail-block">
          <ChatDetailChatAction :label="$t('reportUser')" type="danger">
            <template #icon>
              <ThumbDown />
            </template>
          </ChatDetailChatAction>
        </div>

        <div class="chat-detail-block">
          <ChatDetailChatAction :label="$t('deleteChat')" type="danger">
            <template #icon>
              <Trash />
            </template>
          </ChatDetailChatAction>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Chat, UserChat } from '@/core/models/chats'
import { defineComponent } from '@vue/runtime-core'
import moment from 'moment'
import ChatDetailHeading from './ChatDetailHeading.vue'
import ChatDetailAvatar from './ChatDetailAvatar.vue'
import ChatDetailMedia from './ChatDetailMedia.vue'
import ChatDetailMessageAction from './ChatDetailMessageAction.vue'
import ChatDetailUserIntro from './ChatDetailUserIntro.vue'
import ChatDetailChatAction from './ChatDetailChatAction.vue'

export default defineComponent({
  components: {
    ChatDetailHeading,
    ChatDetailAvatar,
    ChatDetailMedia,
    ChatDetailMessageAction,
    ChatDetailUserIntro,
    ChatDetailChatAction
  },
  computed: {
    chat(): Chat {
      return this.$store.getters['chat/chat']
    },
    directChatUser(): UserChat {
      return this.$store.getters['chat/directChatUser']
    },
    vm() {
      const data = {
        avatar: '',
        title: '',
        brief: null,
        isOnline: false,
        chatUpdated: '',
        username: '',
        introduce: '',
        createFormated: ''
      }
      if (this.directChatUser) {
        data.avatar = this.directChatUser.person.avatar
        data.title = this.directChatUser.person.first_name
        data.isOnline = this.directChatUser.person.is_online
        data.username = this.directChatUser.person.username
        data.introduce = (
          this.directChatUser.person.custom_json as { introduce: string }
        ).introduce
        data.chatUpdated = this.directChatUser.chat_updated as string
      } else {
        data.title = this.chat.title
        const createTime = moment(this.chat.created)
        data.createFormated = this.$t('createTime', {
          date: createTime.format('YYY-MM-DD'),
          time: createTime.format('hh:ss')
        })
      }
      return data
    }
  }
})
</script>

<style scoped lang="scss">
.chat-detail {
  background-color: rgb(237, 237, 237);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-detail-header {
  flex-shrink: 0;
}
.detail-body-wrapper {
  flex-grow: 1;
  position: relative;
}
.detail-body {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.chat-detail-block {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px 0px;
  margin-bottom: 10px;
  background-color: white;
}
</style>

<style lang="scss">
.chat-detail {
  .list-item {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    + .list-item {
      border-top: 1px solid #f2f2f2;
    }
    .item-title {
      font-size: 17px;
      color: #000;
    }
  }
}
</style>