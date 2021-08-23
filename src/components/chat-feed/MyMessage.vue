<template>
  <div class="message" :id="idMessage">
    <div class="message-card">
      <div class="content">
        <div class="meta">
          {{ createdFormat }}
        </div>
        <div class="body" v-html="textBody"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['id', 'text', 'created'],
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
  justify-content: flex-end;
  .meta {
    text-align: right;
    font-size: 12px;
    color: rgb(138, 141, 145);
  }
  .body {
    background-color: #dbf4fd;
    border-radius: 10px 0 10px 10px;
    padding: 10px;
  }
}
</style>