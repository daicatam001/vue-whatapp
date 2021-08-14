<template>
  <div class="chat-app">
	{{chats}}
  </div>
</template>

<script>
    export default {
        computed: {
            chats() {
                return this.$store.getters['chats/chats']
            }
        },
        created() {
            this.$store.dispatch('chats/getLatestChats', 25)
        }
    }
</script>

<style scoped>

</style>