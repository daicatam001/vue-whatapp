<template>
  <div class="notitication">
    <div class="noti-text">{{ noti }}</div>
  </div>
</template>

<script>
import { NOTIFY_TYPE } from '@/core/constants'
export default {
  props: ['title', 'type'],
  computed: {
    noti() {
      switch (this.type) {
        case NOTIFY_TYPE.CREATED_GROUP:
          return this.$t('label.youCreatedGroup')
        default:
          return ''
      }
    }
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
.title {
  padding: 5px 12px 6px;
  text-align: center;
  border-radius: 7.5px;
  background-color: rgba(225, 245, 254, 0.92);
  box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px 0px;
  text-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px;
}
</style>