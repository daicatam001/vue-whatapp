<template>
  <div class="home">
    <div class="left-side">
      <button @click="logout">Logout</button>
      <ChatList />
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

export default defineComponent({
  components: {
    ChatList,
    ChatFeed
  },
  created() {
    setupSocket()
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
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
  flex-shrink: 0;
}

.right-side {
  height: 100%;
  position: inherit;
  flex-grow: 1;
}
</style>
