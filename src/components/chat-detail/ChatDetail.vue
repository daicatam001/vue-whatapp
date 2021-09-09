<template>
  <div class="chat-detail">
    <ChatDetailHeading />
    <div class="detail-body-wrapper">
      <div class="detail-body scoll-element">
        <div class="user-block">
          <UserCard type="big" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatDetailHeading from './ChatDetailHeading.vue'

export default {
  components: {
    ChatDetailHeading
  }
}
</script>

<style scoped>
.chat-detail {
  background-color: rgb(237, 237, 237);
  height: 100%;
  display: flex;
  flex-direction: column;
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
}
.user-block {
  padding: 28px 30px 19px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px 0px;
}
.ui-avatar {
  margin: 0 auto;
}
</style>