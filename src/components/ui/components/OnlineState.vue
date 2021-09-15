<template>
  <div class="online-state">
    {{ status }}
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['isOnline', 'chatUpdated'],
  computed: {
    status() {
      if (this.isOnline) {
        return this.$t('online')
      } else if(this.chatUpdated) {
        let lastSent = moment(this.chatUpdated)
        const diff = moment().diff(lastSent, 'day')
        if (diff > 7) {
          lastSent = lastSent.format('DD-MM-YYYY')
        } else if (diff >= 1) {
          lastSent = lastSent.format('dddd')
        } else {
          lastSent = moment(lastSent).format('hh:mm')
        }
        return this.$t('lastTimeSeen', { time: lastSent })
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>