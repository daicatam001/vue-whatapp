<template>
  <div class="toolbar-settings">
    <a-dropdown :trigger="['click']" placement="bottomRight">
      <div class="menu">
        <ThreeDotVertical />
      </div>
      <template #overlay>
        <a-menu class="menu-settings-dropdown">
          <a-menu-item> Nhóm mới </a-menu-item>
          <a-menu-item @click="showProfile"> Hồ sơ </a-menu-item>
          <a-menu-item> Cài đặt </a-menu-item>
          <a-menu-item @click="logout"> Đăng xuất </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  methods: {
    logout(): void {
      this.$store.dispatch('auth/logout')
    },
    showProfile() {
      this.$store.dispatch('ui/toggleShowProfile', true)
    }
  }
})
</script>
