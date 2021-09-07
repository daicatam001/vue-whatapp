<template>
    <a-menu class="menu-settings-dropdown chat-settings">
      <a-menu-item> Lưu trữ cuộc trò chuyện </a-menu-item>
      <a-menu-item @click="showProfile"> Tắt thông báo </a-menu-item>
      <a-menu-item @click="deleteChat"> Xóa cuộc trò chuyện </a-menu-item>
      <a-menu-item @click="logout"> Ghim cuộc trò chuyện </a-menu-item>
      <a-menu-item @click="logout"> Đánh dấu chưa đọc </a-menu-item>
    </a-menu>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { Modal } from 'ant-design-vue';

export default defineComponent({
  methods: {
    deleteChat():void{
       Modal.confirm({
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
      });
    },
    logout(): void {
      this.$store.dispatch('auth/logout')
    },
    showProfile() {
      this.$store.dispatch('ui/toggleShowProfile', true)
    }
  }
})
</script>

<style scoped lang="scss">
</style>
