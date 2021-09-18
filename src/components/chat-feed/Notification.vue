<template>
  <div class="notification">
    <div class="noti-text">{{ message.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object
  }
}
</script>

<style scoped lang="scss">
.notification {
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.noti-text {
  padding: 5px 12px 6px;
  text-align: center;
  font-size: 12.5px;
  border-radius: 7.5px;
  background-color: rgba(225, 245, 254, 0.92);
  box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 0.5px 0px;
  text-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px;
}
</style>