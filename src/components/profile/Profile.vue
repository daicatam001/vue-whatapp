<template>
  <div class="profile">
    <div class="header">
      <div class="back">
        <BackArrow @click="closeProfile" />
      </div>
      <div class="header-text">Hồ sơ</div>
    </div>
    <div class="body-wrapper">
      <div class="avatar-section">
        <UploadAvatar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import UploadAvatar from './UploadAvatar.vue'
export default defineComponent({
  components: {
    UploadAvatar
  },
  methods: {
    closeProfile() {
      this.$store.dispatch('ui/toggleShowProfile', false)
    }
  }
})
</script>

<style scoped lang="scss">
.profile {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  height: 100px;
  background-color: #00bfa5;
  padding: 0 20px 20px 20px;
  display: flex;
  align-items: flex-end;
}
.back {
  width: 50px;
  height: 24px;
}
.header-text {
  flex-grow: 1;
  overflow: hidden;
  font-size: 19px;
  line-height: normal;
  font-weight: 600;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.body-wrapper {
  flex-grow: 1;
  position: relative;
  .body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.avatar-section {
  margin: 20px 0;
}
</style>