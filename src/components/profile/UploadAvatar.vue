<template>
  <div class="upload-avatar">
    <div class="wrapper">
      <div class="line-1">
        <Camera />
      </div>
      <div class="line-2">
        <div class="choose-image-text">{{$t('addAvatar')}}</div>
      </div>
    </div>
    <Avatar size="100%" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({})
</script>

<style scoped lang="scss">
.upload-avatar {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  align-items: center;
  justify-content: center;
  background-color: rgba(102, 102, 102, 0.8);
}
.choose-image-text {
  font-size: 13px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
}
.line-1 {
  margin-top: 20px;
}
.line-2 {
  text-align: center;
  width: 110px;
}
.ui-avatar{
  position: absolute;
  inset: 0;
}
</style>