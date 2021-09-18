<template>
  <div class="profile">
    <PanelTitle :title=" $t('profile')" @back="closeProfile" />
    <div class="profile-body-wrapper">
      <div class="profile-body scroll-element">
        <div class="avatar-section">
          <UploadAvatar />
        </div>
        <div class="information-section">
          <EditInformation />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import EditInformation from './EditInformation.vue'
export default defineComponent({
  components: {
    EditInformation
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
.profile-body-wrapper {
  flex-grow: 1;
  position: relative;
  .profile-body {
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