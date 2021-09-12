<template>
  <div class="user-card" :class="type">
    <Avatar :src="avatar" :size="avatarSize" />
    <div class="content">
      <div class="line">
        <div class="title">{{ title }}</div>
        <div class="brief">{{ brief }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['type'], // type : big
  computed: {
    avatarSize() {
      return this.type === 'big' ? '200px' : '40px'
    },
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
        return this.$t('online')
      } else {
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
    }
  }
}
</script>

<style scoped lang="scss">
.user-card {
  &.big {
    display: block;

    .ui-avatar {
      margin: 0 auto;
    }
    .content {
      margin-top: 20px;
    }
    .title {
      font-size: 19px;
      margin-bottom: 5px;
    }
    .last-seen-time {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  display: flex;
  gap: 15px;
}
.title {
  font-weight: 500;
  color: black;
}
.content {
  cursor: pointer;
  height: 100%;
  flex-grow: 1;
}
.line {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
}
.last-seen-time {
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
}
</style>