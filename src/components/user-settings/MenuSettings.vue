<template>
  <div class="menu-settings">
    <a-dropdown :trigger="['click']" placement="bottomRight">
      <div class="menu">
        <ThreeDotVertical />
      </div>
      <template #overlay>
        <a-menu class="menu-settings-dropdown">
          <a-menu-item> Nhóm mới </a-menu-item>
          <a-menu-item> Hồ sơ </a-menu-item>
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
    }
  }
})
</script>

<style scoped lang="scss">
.menu {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:active {
    background-color: #d5d5d5;
  }
}
</style>
<style lang="scss">
.menu-settings-dropdown {
  width: 200px;
  .ant-dropdown-menu-item {
    padding: 10px 24px;
  }
}
</style>