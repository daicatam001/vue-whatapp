<template>
  <div class="user-card">
    <div class="user-card-inner">
      <Avatar :src="avatar" size="50px" />
      <div class="content">
        <div class="line-1">
          <div class="title">{{ first_name }}</div>
        </div>
        <div class="line-2">
          <div class="intro" :title="introduce"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: ['id', 'first_name', 'custom_json'],
  computed: {
    introduce() {
      return this.custom_json.introduce
    }
  }
})
</script>

<style scoped lang="scss">
.user-card-inner {
  cursor: pointer;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  height: 72px;
  position: relative;
  background-color: white;
  border-bottom: 1px solid rgb(213, 217, 222);
  &:hover {
    background-color: rgb(245, 245, 245);
    .action svg {
      display: block;
    }
  }
}
.thumb {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.content {
  flex-grow: 1;
  min-width: 0;
}
.line-1 {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  font-size: 17px;
  color: rgb(37, 36, 35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.intro {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-left: auto;
  white-space: nowrap;
}

.line-2 {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.last-message {
  flex-grow: 1;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  .wrapper {
    display: flex;
    .last-message-text {
      white-space: nowrap;
      flex-grow: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>