<template>
  <Timline :time="timeline" v-if="!!timeline" />
  <div class="message" :id="idMessage">
    <div class="message-card">
      <div class="content" :class="{ 'new-cvs': !isSameGroupMessage }">
        <div class="body">
          <span class="body-text">{{ textBody }}</span>
          <span class="meta-space"></span>
          <MessageMeta :message="message" :offState="true" />
        </div>
      </div>
      <div class="start-note" v-if="!isSameGroupMessage">
        <TailIn color="#ffffff" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  props: {
    message: {
      type: Object,
      required: true
    },
    lastMessage: Object
  },
  computed: {
    isSameGroupMessage(): boolean {
      return (
        !!this.lastMessage &&
        this.lastMessage.sender_username === this.message.sender_username
      )
    },
    idMessage(): string {
      return `message-id-${this.message.id}`
    },
    textBody(): string {
      return this.message.text
        .replaceAll('<p>', '<div>')
        .replaceAll('</p>', '</div>')
    },
    createdFormat(): string {
      return moment(this.message.created).format('hh:mm')
    },
    avatarText(): string {
      const { last_name, first_name } = this.message.sender
      return `${first_name.charAt(0)}${
        last_name ? last_name.charAt(0) : first_name.charAt(1)
      }
      `.toUpperCase()
    },
    senderFirstName(): string {
      return this.message.sender.first_name
    },
    avatar(): string {
      return this.message.avatar
    },
    timeline() {
      const msg = moment(this.message.created)
      const lastMsg = this.lastMessage ? moment(this.lastMessage.created) : null
      const diff = msg.diff(lastMsg, 'days')
      if (diff > 7) {
        return msg.format('DD-MM-YYYY')
      } else if (diff >= 1) {
        return msg.format('dddd')
      }
      return null
    }
  }
})
</script>

<style scoped lang="scss">
.message {
  margin-bottom: 2px;
}
.message-card {
  display: flex;
  justify-content: flex-start;
  position: relative;
  .start-note {
    position: absolute;
    top: 0;
    height: 13px;
    height: 8px;
    right: 100%;
  }
  .content {
    max-width: 60%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px 0px;
    border-radius: 7.5px;
    padding: 6px 7px 8px 9px;
    &.new-cvs {
      border-top-left-radius: 0;
    }
  }
  .body {
    overflow-wrap: break-word;
    white-space: pre-wrap;
    line-height: 19px;
    .meta-space {
      width: 72px;
      display: inline-block;
    }
  }
}
</style>