<template>
  <div class="user-tag">
    <div class="user-tag-content">
      <Avatar :src="avatar" size="26px" />
      <div class="title">{{ title }}</div>
      <div class="action">
        <div class="icon-wrapper">
          <div class="icon">
            <Close :size="16" @click="onClose" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  emits: ['remove'],
  methods: {
    onClose() {
      this.$emit('remove')
    }
  }
}
</script>

<style scoped lang="scss">
.user-tag {
  display: inline-block;
}
.user-tag-content {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  border-radius: 16px;
  background-color: #e6e6e6;
}
.title {
  height: 26px;
  line-height: 26px;
  color: #4a4a4a;
}
.action {
  display: flex;
  height: 26px;
  width: 26px;
  justify-content: center;
  align-items: center;
  .icon-wrapper {
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    &:hover {
      background-color: #f7f7f7;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
    }
    .icon {
      display: block;
      width: 16px;
      height: 16px;
      margin: 1px;
      color: #919191;
    }
  }
}
</style>