<template>
  <a-spin :spinning="loading">
    <div class="register">
      <div class="card">
        <div class="heading">Đăng ký</div>
        <register-form @submit="onSubmit" />
        <div class="switch">
          Đã có tài khoản?
          <router-link to="/login"> Đăng nhập </router-link>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { AuthRegister } from '@/core/models/users'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  components: {
    RegisterForm,
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async onSubmit(data: AuthRegister) {
      this.loading = true
      await this.$store.dispatch('auth/register', data)
      this.loading = false
    },
  },
})
</script>

<style lang="scss" scoped>
@import './style';
</style>
