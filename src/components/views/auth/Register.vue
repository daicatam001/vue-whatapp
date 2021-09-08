<template>
  <a-spin :spinning="loading">
    <div class="register">
      <div class="card">
        <div class="heading">{{ $t('register') }}</div>
        <register-form @submit="onSubmit" />
        <div class="switch">
          {{ $t('alreadyHadAccount') }}
          <router-link to="/login"> {{ $t('login') }} </router-link>
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
    RegisterForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onSubmit(data: AuthRegister) {
      this.loading = true
      try {
        await this.$store.dispatch('auth/register', data)
        this.$message.success(this.$t('registerSuccess'))
        this.$router.replace({
          name: 'home'
        })
      } catch (e) {
        this.$message.error(e.response.data.message)
      }
      this.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style';
</style>
