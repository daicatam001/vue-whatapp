<template>
  <div class="panel-title">
    <div class="back">
      <ArrowBack @click="onBack" />
    </div>
    <div class="title-text">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  emits: ['back'],
  methods: {
    onBack() {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>
.panel-title {
  height: 100px;
  background-color: #00bfa5;
  padding: 0 20px 20px 20px;
  display: flex;
  align-items: flex-end;
}
.back {
  width: 50px;
  height: 24px;
}
.title-text {
  flex-grow: 1;
  overflow: hidden;
  font-size: 19px;
  line-height: normal;
  font-weight: 600;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>