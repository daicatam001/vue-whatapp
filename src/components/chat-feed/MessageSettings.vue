<template>
  <a-menu class="menu-settings-dropdown chat-settings">
    <a-menu-item v-if="isMine">
      {{ $t('messageInfomation') }}
    </a-menu-item>
    <a-menu-item>
      {{ $t('answer') }}
    </a-menu-item>
    <a-menu-item v-if="!isMine">
      {{ $t('answerInPrivate') }}
    </a-menu-item>
    <a-menu-item>
      {{ $t('forwardmessage') }}
    </a-menu-item>

    <a-menu-item>
      {{ $t('starMessage') }}
    </a-menu-item>
    <a-menu-item>
      {{ $t('deleteMessage') }}
    </a-menu-item>
    <a-menu-item v-if="!isMine">
      {{ $t('inboxUser', { name: sender.first_name }) }}
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  props: ['sender'],
  username() {
    return this.$store.getters['auth/username']
  },
  isMine() {
    return this.username === this.sender.username
  }
}
</script>

<style>
</style>