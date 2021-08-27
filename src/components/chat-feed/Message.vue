<template>
  <div class="message" :id="idMessage">
    <div class="message-card">
      <div class="thumb-wrapper">
        <div class="thumb" v-if="!isSameGroupMessage">
          <Avatar :src="avatar" :alt="senderName" :text="avatarText" />
          <!-- <img v-if="!!avatar" :src="avatar" :alt="senderName" />
          <template v-else>
            <div class="avatar-default">
              <div class="avatar-text">{{ avatarText }}</div>
            </div>
          </template> -->
        </div>
      </div>
      <div class="content">
        <div class="meta" v-if="!isSameGroupMessage">
          {{ `${senderFirstName}, ${createdFormat}` }}
        </div>
        <div class="body" v-html="textBody"></div>
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
    }
  }
})
</script>

<style scoped lang="scss">
.message-card {
  display: flex;
  gap: 10px;
  margin-bottom: 2px;

  .thumb-wrapper {
    width: 47px;
  }
  .thumb {
    .avatar-default {
      background-color: #e5e4e8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      .avatar-text {
        font-weight: 700;
        font-size: 18px;
        color: #0078d4;
      }
    }
  }
  .meta {
    font-size: 12px;
    color: rgb(138, 141, 145);
  }
  .body {
    background-color: #eeeeee;
    border-radius: 0 10px 10px 10px;
    padding: 10px;
  }
}
</style>