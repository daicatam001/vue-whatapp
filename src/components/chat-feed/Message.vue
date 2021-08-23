<template>
  <div class="message" :id="idMessage">
    <div class="message-card">
      <div class="thumb">
        <img v-if="!!avatar" :src="avatar" :alt="senderName" />
        <template v-else>
          <div class="avatar-default">
            <div class="avatar-text">{{ avatarText }}</div>
          </div>
        </template>
      </div>
      <div class="content">
        <div class="meta">
          {{ `${senderFirstName}, ${createdFormat}` }}
        </div>
        <div class="body" v-html="textBody"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: [
    'id',
    'text',
    'avatar',
    'senderFirstName',
    'senderLastName',
    'created'
  ],
  computed: {
    idMessage() {
      return `message-id-${this.id}`
    },
    textBody() {
      return this.text.replaceAll('<p>', '<div>').replaceAll('</p>', '</div>')
    },
    createdFormat() {
      return moment(this.created).format('hh:mm')
    },
    avatarText() {
      console.log(this.senderFirstName, this.senderLastName)
      return `${this.senderFirstName.charAt(0)}${
        this.senderLastName
          ? this.senderLastName.charAt(0)
          : this.senderFirstName.charAt(1)
      }
      `.toUpperCase()
    }
  }
}
</script>

<style scoped lang="scss">
.message-card {
  display: flex;
  gap: 10px;
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