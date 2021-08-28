<template>
  <div class="user-settings">
    <div class="thumb-wrapper">
      <Avatar />
    </div>
    <div class="actions">
      <MenuSettings/>
    </div>
  </div>
</template>

<script lang="ts">
import { UserInfo } from '@/core/models/users'
import { defineComponent } from '@vue/runtime-core'
import MenuSettings from './MenuSettings.vue'

export default defineComponent({
  components: { MenuSettings },
  computed: {
    userInfo(): UserInfo {
      return this.$store.getters['auth/userInfo']
    }
  }
})
</script>

<style scoped lang="scss">
.user-settings {
  background-color: #ededed;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>