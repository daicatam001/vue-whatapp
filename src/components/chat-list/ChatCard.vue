<template>
  {{ title }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: ['title', 'lastMessage', 'peoplel'],
})
</script>

<style scoped>
</style>