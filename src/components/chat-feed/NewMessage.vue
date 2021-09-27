<template>
  <div class="new-message" :class="{ 'left-group': !!leftTime }">
    <div class="left-group-note" v-if="!!leftTime">
      {{ $t('cantSendMessageBecauseLeftGroup') }}
    </div>
    <form @submit.prevent="onSubmit" v-else>
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
    leftTime() {
      return this.$store.getters['chat/leftTime']
    },
    lastMessage(): Message {
      return this.$store.getters['chat/lastMessage']
    },
    lastMessageId(): number {
      return this.lastMessage && this.lastMessage.id
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
     this.$refs.input && this.$refs.input.focus()
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
  padding: 5px 10px;
  height: 62px;
  background-color: #eeeeee;
  &.left-group{
    padding: 15px 30px;
  }
}
input {
  width: 100%;
  padding: 10px 20px;
  outline: 0;
  border: 0;
  margin: 5px 0;
  border-radius: 20px;
}
.left-group-note{
  text-align: center;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: rgba(0,0,0,0.6);
}
</style>