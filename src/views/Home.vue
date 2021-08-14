<template>
  <div class="home">
	<div class="left-side">
	  	<button @click="logout">Logout</button>
	</div>
	<div class="right-side"></div>
  </div>
</template>

<script>
    import {setupSocket} from "@/sockets";

    export default {
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