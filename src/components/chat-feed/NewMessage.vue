<template>
  <div class="new-message">
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Add new message" v-model.trim="text" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { UserInfo } from '@/core/models/users'
import moment from 'moment'
export default defineComponent({
  computed: {
    userInfo(): UserInfo {
      return this.$store.getters['auth/userInfo']
    }
  },
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
      const sendingTime = moment.utc()
      const message = {
        text: this.text,
        sender: { ...this.userInfo },
        custom_json: {
          sending_time: sendingTime.valueOf()
        },
        sender_username: this.userInfo.username,
        created: sendingTime.format('YYYY-MM-DD HH:mm:ss.000000+00:00')
      }
      try {
        await this.$store.dispatch('messages/sendMessage', message)
        this.text = ''
      } catch (e) {
        // ..
      }
    }
  }
})
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