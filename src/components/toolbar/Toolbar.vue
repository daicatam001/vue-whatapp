<template>
  <div class="toolbar">
    <div class="thumb-wrapper">
      <Avatar @click="showProfile" size="40px" />
    </div>
    <div class="actions">
      <ToolbarSettings />
    </div>
  </div>
</template>

<script lang="ts">
import { UserInfo } from '@/core/models/users'
import { defineComponent } from '@vue/runtime-core'
import ToolbarSettings from './ToolbarSettings.vue'

export default defineComponent({
  components: { ToolbarSettings },
  computed: {
    userInfo(): UserInfo {
      return this.$store.getters['auth/userInfo']
    }
  },
  methods: {
    showProfile() {
      this.$store.dispatch('ui/toggleShowProfile', true)
    }
  }
})
</script>

<style scoped lang="scss">
.toolbar {
  background-color: #ededed;
  padding: 10px 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>