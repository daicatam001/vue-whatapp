<template>
  <div class="chat-heading">
    <div class="user-state">
      <UserCard @click="showChatInfo" />
    </div>
    <div class="action">
      <ThreeDotVertical color="black" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showChatInfo() {
      this.$store.dispatch('ui/toggleShowChatInfo', true)
    }
  }
}
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
.user-state {
  flex-grow: 1;
  margin-right: 20px;
}
</style>