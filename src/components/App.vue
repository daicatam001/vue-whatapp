<template>
  <div class="chat-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  created() {
    this.$store.dispatch('auth/tryLogin')
  }
})
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

html,
body {
  margin: 0;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

#app {
  height: 100%;
  width: 100%;
}
.chat-app {
  height: 100%;
}

* {
  box-sizing: border-box;
}
svg {
  cursor: pointer;
}
html,.scroll-element{
  scrollbar-width: thin;
  &::-webkit-scrollbar{
    width: 6px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(0,0,0,.2);
  }
  &::-webkit-scrollbar-track{
    background-color:transparent;
  }
}
</style>
