<template>
  <div class="chat-detail-heading">
    <Close @click="closeChatInfo" size="30" color="rgb(81, 88, 92)" />
    <div class="title">
      {{ $t('contactInformation') }}
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeChatInfo() {
      this.$store.dispatch('ui/toggleShowChatInfo', false)
    }
  }
}
</script>

<style scoped>
.chat-detail-heading {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.title {
  margin-left: 30px;
  font-size: 16px;
  margin-top: -4px;
}
</style>