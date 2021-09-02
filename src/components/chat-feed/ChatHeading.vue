<template>
  <div class="chat-heading">
    <Avatar :src="avatar" size="40px" />
    <div class="content">
      <div class="line">
        <div class="title">{{ title }}</div>
        <div class="last-send-time">{{ status }}</div>
      </div>
    </div>
    <div class="action">
      <ThreeDotVertical color="black" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    title() {
      return this.$store.getters['chat/title']
    },
    isOnline() {
      return this.$store.getters['chat/isOnline']
    },
    chatUpdated() {
      return this.$store.getters['chat/chatUpdated']
    },
    status() {
      if (this.isOnline) {
        return 'trực tuyến'
      } else {
        let lastSent = moment(this.chatUpdated)
        const diff = moment().diff(lastSent, 'day')
        if (diff > 7) {
          lastSent = lastSent.format('DD-MM-YYYY')
        } else if (diff >= 1) {
          lastSent = lastSent.format('dddd')
        } else {
          lastSent = moment(this.lastMessage.created).format('hh:mm')
        }
        return `lần cuối thấy, ${lastSent}`
      }
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
}
.title {
  font-weight: 500;
  color: black;
}
.content {
  height: 100%;
  flex-grow: 1;
}
.line {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
}
</style>