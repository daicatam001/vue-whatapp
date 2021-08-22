<template>
  <div class="new-message">
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Add new message" v-model.trim="text" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    async onSubmit() {
      if (this.text === '') {
        return
      }
      const message = {
        text: this.text
      }
      try {
        await this.$store.dispatch('messages/sendMessage', message)
        this.text = ''
      } catch (e) {
        // ..
      }
    }
  }
}
</script>

<style scoped lang="scss">
.new-message {
  padding: 15px 30px;
  background-color: #eeeeee;
}
input {
  width: 100%;
  padding: 10px 20px;
  outline: 0;
  border: 0;
  border-radius: 20px;
}
</style>