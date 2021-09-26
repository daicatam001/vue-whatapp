<template>
  <div class="new-message">
    <form @submit.prevent="onSubmit">
      <input
        ref="input"
        id="new-message-input"
        type="text"
        @focus="seeMessage"
        :placeholder="$t('inputMessage')"
        v-model.trim="text"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { UserInfo } from '@/core/models/users'
import moment from 'moment'
import { MESSAGE_TYPE, SEND_STATE } from '@/core/constants'
import { Chat } from '@/core/models/chats'
import { Message } from '@/core/models/messages'
export default defineComponent({
  computed: {
    userInfo(): UserInfo {
      return this.$store.getters['auth/userInfo']
    },
    chat(): Chat {
      return this.$store.getters['chat/chat']
    },
    me() {
      return this.$store.getters['chat/me']
    },
    lastMessage(): Message {
      return this.$store.getters['chat/lastMessage']
    },
    lastMessageId(): number {
      return this.lastMessage.id
    },
    messageInputFocus() {
      return this.$store.getters['ui/messageInputFocus']
    }
  },
  data() {
    return {
      text: '',
      seeMessageTimmer: 0
    }
  },
  methods: {
    seeMessage() {
      this.$store.dispatch('chat/readMessageCurrentChat')
    },
    async onSubmit() {
      if (this.text === '') {
        return
      }
      const sendingTime = moment.utc()
      // this.$store.dispatch('chats/offSearchChats')
      const message = {
        text: this.text,
        sender: { ...this.userInfo },
        custom_json: {
          sending_time: sendingTime.valueOf(),
          state: SEND_STATE.SENDING,
          type: MESSAGE_TYPE.MESSAGE
        },
        sender_username: this.userInfo.username
      }
      this.text = ''
      await this.$store.dispatch('messages/sendMessage', { message })
    }
  },
  watch: {
    messageInputFocus() {
      this.$refs.input.focus()
    },
    lastMessageId(value) {
      if (value && document.activeElement === this.$refs.input) {
        clearTimeout(this.seeMessageTimmer)
        this.seeMessageTimmer = setTimeout(() => {
          this.seeMessage()
        }, 500)
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