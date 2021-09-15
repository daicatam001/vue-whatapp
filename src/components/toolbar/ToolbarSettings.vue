<template>
  <div class="toolbar-settings">
    <a-dropdown :trigger="['click']" placement="bottomRight">
      <div class="menu">
        <ThreeDotVertical />
      </div>
      <template #overlay>
        <a-menu class="menu-settings-dropdown">
          <a-menu-item @click="createGroup"> {{ $t('newGroup') }} </a-menu-item>
          <a-menu-item @click="showProfile"> {{ $t('profile') }} </a-menu-item>
          <a-menu-item> {{ $t('setting') }} </a-menu-item>
          <a-menu-item @click="logout"> {{ $t('logout') }} </a-menu-item>
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
      this.$router.replace({
        name: 'login'
      })
    },
    showProfile() {
      this.$store.dispatch('ui/toggleShowProfile', true)
    },
    createGroup() {
      this.$store.dispatch('ui/toggleShowAddMembers', true)
    }
  }
})
</script>
