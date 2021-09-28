<template>
  <div class="chat-detail-user-intro">
    <div class="intro-title">
      <div class="block-title-text">
        {{ $t('introAndPhone') }}
      </div>
    </div>
    <div class="list-item">
      <div class="item-title">
        {{ introduce }}
      </div>
    </div>
    <div class="list-item">
      <div class="item-title">
        {{ username }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['introduce', 'username']
}
</script>

<style scoped lang="scss">
.chat-detail-user-intro {
  .intro-title {
    padding: 14px 30px 10px;
  }
}
</style>