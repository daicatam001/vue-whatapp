<template>
  <div class="message" :id="idMessage" :class="{ 'my-message': isMine }">
    <div class="message-card">
      <div class="content" :class="{ 'new-cvs': !isSameGroupMessage }">
        <div class="body">
          <span class="body-text">{{ textBody }}</span>
          <span class="meta-space"></span>
          <MessageMeta :message="message" :offState="!isMine" />
        </div>
        <div class="action">
          <ChevronDown color="rgba(0, 0, 0, 0.3)" />
        </div>
      </div>
      <div class="start-note" v-if="!isSameGroupMessage">
        <TailOut color="#dcf8c6" v-if="isMine" />
        <TailIn color="#ffffff" v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import moment from 'moment'
export default defineComponent({
  props: {
    message: {
      type: Object,
      required: true
    },
    lastMessage: Object
  },
  computed: {
    isMine(): boolean {
      return this.message.sender_username === this.username
    },
    username(): string {
      return this.$store.getters['auth/username']
    },
    isSameGroupMessage(): boolean {
      return (
        !!this.lastMessage &&
        this.lastMessage.sender_username === this.message.sender_username &&
        moment(this.message.custom_json.sending_time).diff(
          moment(this.lastMessage.custom_json.sending_time),
          'minute'
        ) < 5
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
    senderFirstName(): string {
      return this.message.sender.first_name
    },
    avatar(): string {
      return this.message.avatar
    },
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
    position: relative;
    max-width: 60%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px 0px;
    border-radius: 7.5px;
    padding: 6px 7px 8px 9px;
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
  .action {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 800;
    width: 42px;
    height: 27px;
    overflow: hidden;
    display: none;
    svg {
      position: absolute;
      top: 5px;
      width: 18px;
      height: 18px;
      right: 5px;
    }
  }
}
.message-card:hover {
  .action {
    display: block;
  }
}
.message:not(.my-message) {
  .new-cvs {
    border-top-left-radius: 0;
  }
  .action {
    background-image: radial-gradient(
      at right top,
      rgb(255, 255, 255) 60%,
      rgba(255, 255, 255, 0) 80%
    );
  }
}
.my-message {
  .message-card {
    justify-content: flex-end;
    .start-note {
      left: 100%;
    }
    .content {
      background-color: #dcf8c6;
      &.new-cvs {
        border-top-right-radius: 0;
      }
    }
    .action {
      background-image: radial-gradient(
        at right top,
        rgb(220, 248, 198) 60%,
        rgba(220, 248, 198, 0) 80%
      );
    }
  }
}
</style>