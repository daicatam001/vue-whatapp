<template>
  <div class="header">
    <div class="back">
      <BackArrow @click="closeProfile" />
    </div>
    <div class="header-text">Hồ sơ</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import BackArrow from '../ui/icons/BackArrow.vue'

export default defineComponent({
  components: { BackArrow },
  methods: {
    closeProfile() {
      this.$store.dispatch('ui/toggleShowProfile', false)
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  height: 100px;
  background-color: #00bfa5;
  padding: 0 20px 20px 20px;
  display: flex;
  align-items: flex-end;
}
.back {
  width: 50px;
  height: 24px;
}
.header-text {
  flex-grow: 1;
  overflow: hidden;
  font-size: 19px;
  line-height: normal;
  font-weight: 600;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>