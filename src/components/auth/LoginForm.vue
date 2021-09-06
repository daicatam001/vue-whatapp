<template>
  <div class="loginForm">
    <a-form
      ref="formRef"
      autocomplete="off"
      :model="loginForm"
      :rules="rules"
      @finish="onSubmit"
      @finishFailed="onSubmitError"
    >
      <a-form-item name="username">
        <input v-model.trim="loginForm.username" placeholder="Tài khoản" />
      </a-form-item>
      <a-form-item name="secret">
        <input
          v-model="loginForm.secret"
          type="password"
          placeholder="Mật khẩu"
        />
      </a-form-item>
      <button class="btn-submit">Đăng 
        
      </button>
    </a-form>
  </div>
</template>

<script lang="ts">
import { AuthLogin } from '@/core/models/users'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  emits: ['submit'],
  data() {
    const requiredValidator = async (rule, value:string) => {
      if (!value) {
        return Promise.reject()
      }
      return Promise.resolve()
    }
    return {
      loginForm: {
        username: '',
        secret: '',
      },
      rules: {
        username: [{ validator: requiredValidator }],
        secret: [{ validator: requiredValidator }],
      },
    }
  },
  methods: {
    onSubmit(data: AuthLogin) {
      this.$emit('submit', { ...data })
    },
    onSubmitError() {
      this.$message.error('Vui lòng nhập Tài khoản và mật khẩu')
    },
  },
})
</script>

<style lang="scss" scoped>
@import './style';
</style>
