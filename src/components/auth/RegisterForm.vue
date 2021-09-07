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
          :placeholder="$t('email')"
        />
      </a-form-item>
      <a-form-item has-feedback name="first_name">
        <input
          v-model.trim="registerForm.first_name"
          autocomplete="off"
          type="text"
          :placeholder="$t('fullName')"
        />
      </a-form-item>
      <a-form-item has-feedback name="username">
        <input v-model.trim="registerForm.username" :placeholder="$t('username')" />
      </a-form-item>
      <a-form-item has-feedback name="secret">
        <input
          v-model="registerForm.secret"
          type="password"
          :placeholder="$('password')"
        />
      </a-form-item>
      <button class="btn-submit">{{$('register')}}</button>
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
        return Promise.reject(this.$t('isNotEmpty'))
      }
      return Promise.resolve()
    }
    const emailValidator = async (_, value: string) => {
      await requiredValidator(_, value)
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!pattern.test(value)) {
        return Promise.reject(this.$t('emailInvalid'))
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
