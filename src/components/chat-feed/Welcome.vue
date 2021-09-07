<template>
  <div class="welcome">
    <div class="wel-content">
      <div class="wel-image"></div>
      <div class="wel-line-1">{{$t('welcome1')}}</div>
      <div class="wel-line-2">
        {{$t('welcome2')}}
      </div>
      <hr />
      <div class="wel-note">
        <span class="icon"><Computer /></span>
        <span
          >{{$t('welcome3')}}
          <a href="https://www.whatsapp.com/download" target="_blank"
            >{{$t('welcome4')}}</a
          >.</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({})
</script>

<style scoped lang="scss">
.welcome {
  flex-grow: 1;
  height: 100%;
  background-color: rgb(248, 249, 250);
}
.wel-content {
  text-align: center;
  width: 460px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wel-image {
  width: 250px;
  height: 250px;
  background-image: url('../../assets/images/intro-connection-light.jpg');
  background-size: cover;
}
.wel-line-1 {
  margin-top: 30px;
  font-size: 32px;
  line-height: 36px;
  font-weight: 300;
  color: rgb(82, 82, 82);
}
.wel-line-2 {
  color: rgba(0, 0, 0, 0.45);
  margin-top: 20px;
  line-height: 20px;
}
.wel-note {
  display: flex;
  align-items: center;
  padding-top: 30px;
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.45);
  .icon{
      display: inline-block;
      height: 18px;
  }
  a {
    color: rgb(10, 165, 69);
  }
}
</style>