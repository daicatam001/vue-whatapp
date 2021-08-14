<template>
  <div class="home">
	<div class="left-side">
	  <button @click="logout">Logout</button>
	  <ChatList/>
	</div>
	<div class="right-side"></div>
  </div>
</template>

<script>
    import {setupSocket} from "@/sockets";
    import ChatList from "@/components/chat-list/ChatList.vue"

    export default {
        components: {
            ChatList
        },
        methods: {
            logout() {
                this.$store.dispatch('auth/logout')
            }
        },
        created() {
            setupSocket()
        }
    };
</script>
<style scoped lang="scss">
  .home {
	display: flex;
	height: 100vh;
  }

  .left-side {
	background: red;
	width: 350px;
	flex-shrink: 0;
  }

  .right-side {
	background: gray;
	flex-grow: 1;
  }

</style>