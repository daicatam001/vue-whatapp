<template>
  <div class="chat-detail-message-action">
    <div class="list-item">
      <div class="item-title">
        {{ $t('offNotification') }}
      </div>
      <div class="action-icon">
        <ChevronRight />
      </div>
    </div>
    <div class="list-item">
      <div class="item-title">
        {{ $t('messageMarkStar') }}
      </div>
      <div class="action-icon">
        <ChevronRight />
      </div>
    </div>
    <div class="list-item">
      <div class="item-title">
        {{ $t('selfDestroyMessage') }}
      </div>
      <div class="action-icon">
        <ChevronRight />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.chat-detail-message-action {
  .list-item {
    cursor: pointer;
  }
}
</style>