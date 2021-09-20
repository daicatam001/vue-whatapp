<template>
  <div class="create-group">
    <PanelTitle :title="$t('newGroup')" @back="backToAddMembers" />
    <div class="content-wrapper">
      <div class="avatar-panel">
        <UploadAvatar />
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          ref="inputName"
          :maxlength="maxLenth"
          v-model="text"
        />
        <span class="count-left">{{ countLeft }}</span>
      </div>
    </div>
    <div class="action-wrapper">
      <button
        class="create-group"
        v-if="!!textTrim.length"
        @click="createGroup"
      >
        <checkmark />
      </button>
    </div>
  </div>
</template>

<script>
import { addChatMembers, createChat } from '@/core/api/chats'
import { MESSAGE_TYPE, NOTIFY_TYPE } from '@/core/constants'
import { defineComponent } from '@vue/runtime-core'
import moment from 'moment'

export default defineComponent({
  computed: {
    countLeft() {
      return this.maxLenth - this.text.length
    },
    textTrim() {
      return this.text.trim()
    },
    addingMembers() {
      return this.$store.getters['phoneBook/addingMembers']
    },
    username() {
      return this.$store.getters['auth/username']
    }
  },
  data() {
    return {
      maxLenth: 25,
      text: ''
    }
  },
  methods: {
    backToAddMembers() {
      this.$store.dispatch('ui/backToAddMembers')
    },
    async createGroup() {
      this.$notification.open({
        key: 'create-group-noti',
        message: this.$t('creatingGroup'),
        closeIcon: null,
        placement: 'bottomLeft'
      })
      const { data } = await createChat(this.text, false)
      const createGroupMsg = {
        text: '',
        custom_json: {
          sending_time: moment.utc().valueOf(),
          type: MESSAGE_TYPE.NOTIFICATION,
          notify: NOTIFY_TYPE.CREATE_GROUP
        },
        sender_username: this.username
      }
      await this.$store.dispatch('messages/sendMessage', {
        message: createGroupMsg,
        chatId: data.id
      })

      const addMemberPros = this.addingMembers.reduce((arr, member) => {
        const addMemberMsg = {
          text: '',
          custom_json: {
            sending_time: moment.utc().valueOf(),
            type: MESSAGE_TYPE.NOTIFICATION,
            notify: NOTIFY_TYPE.ADD_MEMBER,
            member: member.username
          },
          sender_username: this.username
        }
        return arr.concat([
          this.$store.dispatch('messages/sendMessage', {
            message: addMemberMsg,
            chatId: data.id
          }),
           addChatMembers(data.id, { username: member.username })
        ])
      }, [])
      await Promise.all(addMemberPros)
      this.$notification.open({
        key: 'create-group-noti',
        message: this.$t('createdGroup'),
        closeIcon: null,
        placement: 'bottomLeft'
      })
      this.$store.dispatch('chats/selectChat', data.id)
      this.$store.dispatch('phoneBook/offAddMembers')
      this.$store.dispatch('ui/toggleShowCreateGroup', false)
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.inputName.focus()
    })
  }
})
</script>

<style scoped lang="scss">
.content-wrapper {
  background-color: white;
  overflow: auto;
}
.avatar-panel {
  padding: 30px;
}
.input-wrapper {
  margin: 30px 0 50px 30px;
  border-bottom: 2px solid #00bfa5;
  position: relative;
  input {
    width: 100%;
    border: 0;
    padding: 0;
    outline: 0;
    margin-bottom: 8px;
  }
  .count-left {
    position: absolute;
    right: 10px;
    bottom: 8px;
    color: rgba(0, 0, 0, 0.25);
  }
}

.action-wrapper {
  padding-bottom: 32px;
  margin-top: 28px;
  text-align: center;
}
button.create-group {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  transition: box-shadow 0.08s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  background-color: #09e85e;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  border: 0;
  outline: 0;
}
</style>