<template>
  <div class="home">
    <div class="left-side">
      <Toolbar />
      <ChatList />
      <a-drawer
        placement="left"
        :closable="false"
        :visible="showProfile"
        :get-container="false"
        width="100%"
        :maskStyle="{ backgroundColor: 'rgba(0, 0, 0, 0)' }"
        :bodyStyle="{ padding: 0 }"
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
  display: flex;
  height: 100%;
}

.left-side {
  background: white;
  border-right: 1px solid rgb(213, 217, 222);
  width: 350px;
  position: relative;
  flex-shrink: 0;
}

.right-side {
  height: 100%;
  position: relative;
  flex-grow: 1;
}
</style>
