<template>
  <div class="chat-detail-media">
    <div class="media-title">
      <div class="block-title-text">
        {{ $t('mediaAll') }}
      </div>
      <ChevronRight />
    </div>
    <div class="media-body">
      <div class="no-media">
        {{ $t('noMediaAll') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.chat-detail-media {
  padding: 14px 30px 10px;
  .media-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .media-body {
    .no-media {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>