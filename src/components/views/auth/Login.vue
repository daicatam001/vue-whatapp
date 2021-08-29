<template>
  <a-spin :spinning="loading">
    <div class="register">
      <div class="card">
        <div class="heading">Đăng nhập</div>
        <login-form @submit="onSubmit" />
        <div class="switch">
          Chưa có tài khoản?
          <router-link to="/register"> Tạo mới! </router-link>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
import { AuthLogin } from '@/core/models/users'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  components: {
    LoginForm,
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async onSubmit(data: AuthLogin) {
      this.loading = true
      await this.$store.dispatch('auth/login', data)
      this.loading = false
    },
  },
})
</script>

<style lang="scss" scoped>
@import './style';
</style>
