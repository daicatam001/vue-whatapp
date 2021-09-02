<template>
  <div class="home">
    <div class="chat-container">
      <div class="left-side">
        <Toolbar />
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
          <Profile />
        </a-drawer>
      </div>
      <div class="right-side">
        <ChatFeed />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { setupSocket } from '@/socket'
import ChatList from '@/components/chat-list/ChatList.vue'
import { defineComponent } from '@vue/runtime-core'
import ChatFeed from '@/components/chat-feed/ChatFeed.vue'
import Toolbar from '@/components/toolbar/Toolbar.vue'
import Profile from '@/components/profile/Profile.vue'

export default defineComponent({
  components: {
    ChatList,
    ChatFeed,
    Toolbar,
    Profile
  },
  computed: {
    showProfile() {
      return this.$store.getters['ui/showProfile']
    }
  },
  created() {
    setupSocket()
  },
  methods: {
    logout(): void {
      this.$store.dispatch('auth/logout')
    },
    onCloseProfile() {
      this.$store.dispatch('ui/toggleShowProfile', false)
    }
  }
})
</script>
<style scoped lang="scss">
.home {
  background-color: #d8dbd5;

  height: 100%;
  &::before {
    background-color: #009688;
    position: fixed;
    top: 0;
    width: 100%;
    height: 127px;
    content: '';
  }
}

.left-side {
  background: white;
  border-right: 1px solid rgb(213, 217, 222);
  width: 30%;
  position: relative;
  flex-shrink: 0;
}

.right-side {
  height: 100%;
  position: relative;
  flex-grow: 1;
  // background-image: url('../../assets/images/bg-chat-tile-light.png');
  background-repeat: repeat;
  background-size: contain;
  background-color: #E5DDD5;
  opacity: 0.6;
}
.chat-container {
  background-color: rgb(247, 247, 247);
  z-index: 1;
  margin: 0 auto;
  top: 20px;
  position: relative;
  max-width: 1400px;
  display: flex;
  height: calc(100% - 40px);
  min-height: 600px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.2) 0px 2px 5px 0px;
}
</style>
