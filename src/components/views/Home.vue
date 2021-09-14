<template>
  <div class="home" :class="{ loading: loading }">
    <div class="setup" v-if="loading">
      <PhoneCircle />
      <a-progress
        :percent="percent"
        size="small"
        strokeWidth="3"
        strokeColor="#00d9bb"
        :show-info="false"
        :success="{ percent: 100, strokeColor: '#00d9bb' }"
      />
      <div class="app-name">WhatsApp</div>
      <div class="app-des">
        <Lock />
        <span>{{ $t('appDes') }}</span>
      </div>
    </div>
    <div class="chat-container" v-else>
      <div class="left-side">
        <ChatList />
        <a-drawer
          placement="left"
          :closable="false"
          :visible="showProfile"
          :get-container="false"
          width="100%"
          :maskStyle="{ backgroundColor: 'transparent' }"
          :bodyStyle="{
            padding: 0,
            height: '100%',
            backgroundColor: '#ededed'
          }"
          :wrapStyle="{ position: 'absolute', overflow: 'hidden' }"
          @close="onCloseProfile"
        >
          <Profile v-if="showProfile" />
        </a-drawer>
      </div>
      <div class="right-side">
        <div class="chat-body" :class="{ 'show-info': showChatInfo }">
          <ChatFeed />
          <div class="detail-wrapper">
            <a-drawer
              placement="right"
              :closable="false"
              :visible="showChatInfo"
              :get-container="false"
              width="100%"
              :bodyStyle="{
                padding: 0,
                height: '100%',
                backgroundColor: 'transparent'
              }"
              :wrapStyle="{ position: 'absolute' }"
            >
              <ChatDetail v-if="showChatInfo" />
            </a-drawer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { setupSocket } from '@/socket'
import ChatList from '@/components/chat-list/ChatList.vue'
import ChatFeed from '@/components/chat-feed/ChatFeed.vue'
import Profile from '@/components/profile/Profile.vue'
import ChatDetail from '@/components/chat-detail/ChatDetail.vue'
import { getLatestChats } from '@/core/api/chats'
import { getLatestMessage } from '@/core/api/messages'
import { formatChat } from '@/core/helpers'
import moment from 'moment'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    ChatList,
    ChatFeed,
    Profile,
    ChatDetail
  },
  computed: {
    showProfile() {
      return this.$store.getters['ui/showProfile']
    },
    showChatInfo() {
      return this.$store.getters['ui/showChatInfo']
    }
  },
  data(): {
    loading: boolean
    percent: number
  } {
    return {
      loading: true,
      percent: 20
    }
  },
  async created() {
    const { data } = await getLatestChats(25)
    const chats = data.filter((item) => !!item.last_message.created)

    const chatEntities = chats.reduce((entity, chat) => {
      chat = formatChat(chat)
      return {
        ...entity,
        [chat.id]: { ...chat, messageEntities: {} }
      }
    }, {})
    this.$store.dispatch('chats/setChatEntities', chatEntities)
    this.percent = 60
    const messagePros = chats.map((chat) =>
      getLatestMessage(chat.id as number, 25)
    )
    const messageListRes = await Promise.all(messagePros)
    messageListRes.forEach((messageRes, index) => {
      const messageEntities = messageRes.data.reduce((entity, item) => {
        item.custom_json = item.custom_json ? JSON.parse(item.custom_json) : {}
        return {
          ...entity,
          [moment.utc(item.created).valueOf()]: item
        }
      }, {})
      this.$store.dispatch('chats/setMessageEntities', {
        chatId: chats[index].id,
        messageEntities
      })
    })
    this.percent = 95
    setTimeout(() => {
      this.percent = 100
      setTimeout(() => {
        this.loading = false
      }, 200)
    }, 300)
    setupSocket()
  },
  methods: {
    logout(): void {
      this.$store.dispatch('auth/logout')
      this.$router.replace({
        name: 'login'
      })
    },
    onCloseProfile() {
      this.$store.dispatch('ui/toggleShowProfile', false)
    }
  }
})
</script>
<style scoped lang="scss">
.home {
  background-color: #f0f0f0;
  position: relative;

  height: 100%;
  &:not(.loading)::before {
    background-color: #009688;
    position: fixed;
    top: 0;
    width: 100%;
    height: 127px;
    content: '';
  }
}

.left-side {
  background: rgb(237, 237, 237);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  width: 25%;
  min-width: 300px;
  position: relative;
  flex-shrink: 0;
}

.right-side {
  height: 100%;
  width: 100%;
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  background-color: #e5ddd5;
}

.chat-body {
  display: flex;
  height: 100%;
  .chat-feed {
    width: 100%;
    transition: width 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }

  .detail-wrapper {
    width: 0;
    position: relative;
    transition: width 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }

  &.show-info {
    .chat-feed {
      width: calc(100% - 420px);
    }
    .detail-wrapper {
      width: 420px;
    }
  }
}

.chat-container {
  background-color: rgb(247, 247, 247);
  z-index: 1;
  margin: 0 auto;
  top: 20px;
  position: relative;
  width: 1400px;
  max-width: 100%;
  display: flex;
  height: calc(100% - 40px);
  min-height: 600px;
  min-width: 700px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.2) 0px 2px 5px 0px;
}
.setup {
  width: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .app-name {
    margin-top: 30px;
    color: #525252;
    font-size: 17px;
  }
  .app-des {
    font-size: 14px;
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.45);
    .lock {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}

.phone-circle {
  color: #bfbfbf;
  display: inline-block;
  margin-bottom: 25px;
}
</style>