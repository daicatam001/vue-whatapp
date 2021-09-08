<template>
  <a-spin :spinning="loading">
    <div class="register">
      <div class="card">
        <div class="heading">{{ $t('login') }}</div>
        <login-form @submit="onSubmit" />
        <div class="switch">
          {{ $t('dontHaveAccount') }}
          <router-link to="/register"> {{ $t('createNew') }} </router-link>
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
    LoginForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onSubmit(data: AuthLogin) {
      this.loading = true
      try {
        await this.$store.dispatch('auth/login', data)
        this.$message.success(this.$t('loginSuccess'))
        this.$router.replace({
          name: 'home'
        })
      } catch (e) {
        this.$message.error(this.$t('loginError'))
      }
      this.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style';
</style>
