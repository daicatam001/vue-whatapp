<template>
  <div class="send-state">
    <Time v-if="state == SEND_STATE.SENDING" :size="size" />
    <Checkmark v-else-if="state == SEND_STATE.SENT" :size="size" />
    <DoubleCheck v-else-if="state == SEND_STATE.RECEIVED" :size="size" />
    <DoubleCheck
      color="#4fc3f7"
      v-else-if="state == SEND_STATE.SEEN"
      :size="size"
    />
  </div>
</template>

<script>
import { SEND_STATE } from '@/core/constants'
export default {
  props: ['state', 'size'],
  data() {
    return {
      SEND_STATE
    }
  }
}
</script>

<style>
</style>