<template>
  <a-menu class="menu-settings-dropdown chat-settings">
    <a-menu-item>
      {{ $t(isDirectChat ? 'contactInfomation' : 'groupInformation') }}
    </a-menu-item>
    <a-menu-item>
      {{ $t('chooseMessage') }}
    </a-menu-item>
    <a-menu-item>
      {{ $t('offNotification') }}
    </a-menu-item>

    <a-menu-item>
      {{ $t('deleteMessage') }}
    </a-menu-item>
    <a-menu-item v-if="isDirectChat">
      {{ $t('deleteChat') }}
    </a-menu-item>
     <a-menu-item v-if="!isDirectChat">
      {{ $t('leaveGroup') }}
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  computed: {
    isDirectChat() {
      return this.$store.getters['chat/isDirectChat']
    }
  }
}
</script>

<style>
</style>