<template>
  <div class="new-chat">
    <div class="input-wrapper">
      <input
        type="text"
        placeholder="Add new chat"
        :value="newChatTitle"
        @input="onInput"
        @keyup.enter="createNewChat"
      />
      <SearchOutlined :style="{ fontSize: '18px', color: 'grey' }" />
    </div>
  </div>
</template>

<script>
import { SearchOutlined } from '@ant-design/icons-vue'
export default {
  components: { SearchOutlined },
  computed: {
    newChatTitle() {
      return this.$store.getters['chats/newChatTitle']
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onInput(e) {
      this.$store.dispatch('chats/onInput', e.target.value.trim())
    },
    createNewChat() {
      this.$store.dispatch('chats/createNewChat')
    }
  }
}
</script>

<style scoped lang="scss">
.new-chat {
  background: #fafafa;
  padding: 10px 13px;
}
input,
input:focus-visible {
  padding: 5px 10px 5px 40px;
  width: 100%;
  border-radius: 30px;
  border: 0;
  outline: 0;
}
.input-wrapper {
  position: relative;
}
.anticon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>