<template>
  <div class="chat-detail-avatar">
    <Avatar :src="avatar" size="200px" />
    <div class="content">
      <div class="line">
        <div class="title">{{ title }}</div>
        <div class="brief">
          <OnlineState
            v-if="directChatUser"
            :isOnline="isOnline"
            :chatUpdated="chatUpdated"
          />
          <template v-else>
            {{ created }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'avatar',
    'title',
    'isDirectChat',
    'isOnline',
    'chatUpdated',
    'created'
  ]
}
</script>

<style scoped lang="scss">
.chat-detail-avatar {
  padding: 28px 30px 19px;
  .ui-avatar {
    margin: 0 auto;
  }
  .content {
    margin-top: 20px;
  }
  .title {
    font-size: 19px;
    margin-bottom: 5px;
    color: black;
  }
  .online-state {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
  .content {
    cursor: pointer;
    height: 100%;
    flex-grow: 1;
  }
  .brief {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>