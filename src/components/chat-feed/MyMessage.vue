<template>
  <Timline :time="timeline" v-if="!!timeline" />
  <div class="my-message" :id="idMessage">
    <div class="message-card">
      <div class="content" :class="{ 'new-cvs': !isSameGroupMessage }">
        <div class="body">
          <span class="body-text">{{ textBody }}</span>
          <span class="meta-space"></span>
          <MessageMeta :message="message" />
        </div>
      </div>
      <div class="start-note" v-if="!isSameGroupMessage">
        <TailOut color="#dcf8c6" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  // props: ['id', 'text', 'created', 'senderUsername', 'lastMessage'],
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
        this.lastMessage.sender_username === this.message.sender_username &&
        moment(this.message.created).diff(
          moment(this.lastMessage.created),
          'minute'
        ) < 5
      )
    },
    idMessage(): string {
      return `message-id-${this.message.id}`
    },
    textBody(): string {
      return this.message.text.replaceAll('<p>', '').replaceAll('</p>', '')
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
.my-message {
  margin-bottom: 2px;
}
.message-card {
  display: flex;
  justify-content: flex-end;
  position: relative;
  .start-note {
    position: absolute;
    top: 0;
    height: 13px;
    height: 8px;
    left: 100%;
  }
  .content {
    max-width: 60%;
    background-color: #dcf8c6;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px 0px;
    border-radius: 7.5px;
    padding: 6px 7px 8px 9px;
    &.new-cvs {
      border-top-right-radius: 0;
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