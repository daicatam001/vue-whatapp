<template>
  <div class="home">
    <div class="left-side">
      <button @click="logout">Logout</button>
      <ChatList />
    </div>
    <div class="right-side" />
  </div>
</template>

<script lang="ts">
import { setupSocket } from '@/sockets'
import ChatList from '@/components/chat-list/ChatList.vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent ({
  components: {
    ChatList,
  },
  created() {
    setupSocket()
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
})
</script>
<style scoped lang="scss">
.home {
  display: flex;
  height: 100vh;
}

.left-side {
  background: white;
  border-left: 1px solid rgb(213, 217, 222);
  width: 350px;
  flex-shrink: 0;
}

.right-side {
  background: gray;
  flex-grow: 1;
}
</style>
