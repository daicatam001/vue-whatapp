<template>
  <div class="chat-detail-chat-action" :class="'action-' + type">
    <div class="action-icon">
      <slot name="icon"></slot>
    </div>
    <div class="action-label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'type']
}
</script>

<style scoped lang="scss">
.chat-detail-chat-action {
  cursor: pointer;
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  height: 60px;
  &.action-danger {
    .action-label,
    .action-icon {
      color: #df3333;
    }
  }
  .action-icon {
    display: flex;
    justify-content: center;
    width: 74px;
  }
  .action-label {
    font-size: 17px;
    line-height: 21px;
  }
}
</style>