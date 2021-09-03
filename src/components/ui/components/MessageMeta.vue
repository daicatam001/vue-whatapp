<template>
  <div class="message-meta">
    <span class="date">{{ createdFormat }}</span>
    <SendState :state="sendState" :size="15" v-if="!offState" />
  </div>
</template>

<script>
import moment from 'moment'
import { SEND_STATE } from '@/core/constants'
export default {
  props: ['message', 'offState'],
  computed: {
    createdFormat() {
      return moment(+this.message.custom_json.sending_time).format('hh:mm')
    },
    sendState() {
      if(this.offState){
        return 
      }
      const members = this.$store.getters['chat/members']
      if (
        this.message.id &&
        members.every((m) => m.last_read >= this.message.id)
      ) {
        return SEND_STATE.SEEN
      } else if (
        this.message.id &&
        this.message.custom_json.state === SEND_STATE.SENDING
      ) {
        return SEND_STATE.RECEIVED
      } else {
        return this.message.custom_json.state
      }
    }
  }
}
</script>

<style scoped lang="scss">
.message-meta {
  font-size: 11px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.45);
  text-align: right;
  white-space: nowrap;
  margin: -10px 0 -5px 4px;
  .date {
    display: inline-block;
    vertical-align: top;
    margin-right: 5px;
  }
  .send-state {
    display: inline-block;
  }
}
</style>