<template>
  <a-menu class="menu-settings-dropdown chat-settings">
    <a-menu-item> {{ $t('storeChat') }} </a-menu-item>
    <a-menu-item @click="showProfile">
      {{ $t('offNotification') }}
    </a-menu-item>
    <a-menu-item @click="deleteChat"> {{ $t('deleteChat') }} </a-menu-item>
    <a-menu-item @click="logout"> {{ $t('pinChat') }} </a-menu-item>
    <a-menu-item @click="logout">{{ $t('markUnread') }}</a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { Modal } from 'ant-design-vue'

export default defineComponent({
  methods: {
    deleteChat(): void {
      Modal.confirm({
        centered: true,
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消'
      })
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
