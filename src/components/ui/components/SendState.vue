<template>
  <div class="send-state">
    <Time v-if="state == SEND_STATE.SENDING" />
    <Checkmark v-else-if="state == SEND_STATE.SENT" :size="18" />
    <DoubleCheck v-else-if="state == SEND_STATE.RECEIVED" />
    <DoubleCheck color="#4fc3f7" v-else-if="state == SEND_STATE.SEEN" />
  </div>
</template>

<script>
import { SEND_STATE } from '@/core/constants'
export default {
  props: ['state'],
  data() {
    return {
      SEND_STATE
    }
  }
}
</script>

<style>
</style>