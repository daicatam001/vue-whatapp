<template>
  <div class="timeline" v-if="isShow">
    <div class="time">{{ timeFormat }}</div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    lastMessage: Object
  },
  computed: {
    isShow() {
      if (
        !this.lastMessage ||
        moment(+this.message.custom_json.sending_time).diff(
          moment(+this.lastMessage.custom_json.sending_time),
          'day'
        ) >= 1
      ) {
        return this.message.custom_json.sending_time
      }
      return null
    },
    timeFormat() {
      if (!this.isShow) {
        return
      }
      const time = moment(+this.message.custom_json.sending_time)
      const diff = moment().diff(time, 'day')
      if (diff === 0) {
        return this.$t('today')
      } else if (diff === 1) {
        return this.$t('yesterday')
      } else if (diff <= 7) {
        return time.format('dddd')
      } else {
        return time.format('DD-MM-YYYY')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.timeline {
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  padding: 5px 12px 6px;
  text-align: center;
  border-radius: 7.5px;
  font-size:12.5px;
  background-color: rgba(225, 245, 254, 0.92);
  box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px 0px;
  text-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px;
}
</style>