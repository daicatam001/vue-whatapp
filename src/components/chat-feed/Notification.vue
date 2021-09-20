<template>
  <div class="notification">
    <div class="noti-text">{{ notify }}</div>
  </div>
</template>

<script>
import { notifyMessage } from '@/core/helpers'
import { NOTIFY_TYPE } from '@/core/constants'
export default {
  props: {
    message: Object
  },
  computed: {
    chat() {
      return this.$store.getters['chat/chat']
    },
    username() {
      return this.$store.getters['auth/username']
    },
    isPersonAddMembers(){
      return this.message.custom_json.notify === NOTIFY_TYPE.ADD_MEMBER && this.message.sender_username === this.username
    },
    notify() {
      return notifyMessage(this.message, this.chat, this.username)
    }
  },
  data(){
    NOTIFY_TYPE
  }
}
</script>

<style scoped lang="scss">
.notification {
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.noti-text {
  padding: 5px 12px 6px;
  text-align: center;
  font-size: 12.5px;
  border-radius: 7.5px;
  background-color: rgba(225, 245, 254, 0.92);
  box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px 0px;
  text-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px;
}
</style>