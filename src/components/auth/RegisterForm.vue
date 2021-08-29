<template>
  <div class="RegisterForm">
    <a-form
      ref="formRef"
      autocomplete="off"
      :model="registerForm"
      :rules="rules"
      @finish="onSubmit"
    >
      <a-form-item has-feedback name="email">
        <input
          v-model.trim="registerForm.email"
          autocomplete="off"
          type="text"
          placeholder="Email"
        />
      </a-form-item>
      <a-form-item has-feedback name="first_name">
        <input
          v-model.trim="registerForm.first_name"
          autocomplete="off"
          type="text"
          placeholder="Họ tên"
        />
      </a-form-item>
      <!-- <a-form-item has-feedback name="last_name">
        <input
          v-model.trim="registerForm.last_name"
          type="text"
          placeholder="Last name"
        />
      </a-form-item> -->
      <a-form-item has-feedback name="username">
        <input v-model.trim="registerForm.username" placeholder="Tài khoản" />
      </a-form-item>
      <a-form-item has-feedback name="secret">
        <input
          v-model="registerForm.secret"
          type="password"
          placeholder="Mật khẩu"
        />
      </a-form-item>
      <button class="btn-submit">Đăng ký</button>
    </a-form>
  </div>
</template>

<script lang="ts">
import { AuthRegister } from '@/core/models/users'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  emits: ['submit'],
  data() {
    const requiredValidator = async (_, value: string) => {
      if (!value) {
        return Promise.reject(`Field can't not be empty`)
      }
      return Promise.resolve()
    }
    const emailValidator = async (_, value: string) => {
      await requiredValidator(_, value)
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!pattern.test(value)) {
        return Promise.reject(`Email's invalid`)
      }
      return Promise.resolve()
    }
    return {
      registerForm: {
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        secret: '',
      },
      rules: {
        email: [{ validator: emailValidator }],
        first_name: [{ validator: requiredValidator }],
        last_name: [{ validator: requiredValidator }],
        username: [{ validator: requiredValidator }],
        secret: [{ validator: requiredValidator }],
      },
    }
  },
  methods: {
    onSubmit(data: AuthRegister) {
      this.$emit('submit', { ...data })
    },
  },
})
</script>

<style lang="scss" scoped>
@import './style';
</style>
