<template>
  <div class="new-chat">
    <div class="input-wrapper">
      <input type="text" placeholder="Add new chat" />
      <SearchOutlined :style="{ fontSize: 12 }" />
    </div>
  </div>
</template>

<script>
import SearchOutlined from '@ant-design/icons-vue'
export default {
  components: { SearchOutlined },
}
</script>

<style scoped lang="scss">
.new-chat {
  background: #fafafa;
  padding: 10px 13px;
}
input,
input:focus-visible {
  padding: 5px 10px 5px 20px;
  width: 100%;
  border-radius: 30px;
  border: 0;
  outline: 0;
}
</style>