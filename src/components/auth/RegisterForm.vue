<template>
  <div class="RegisterForm">
    <a-form
      ref="formRef"
      autocomplete="off"
      :model="registerForm"
      :rules="rules"
      @finish="onSubmit"
    >
      <a-form-item has-feedback name="username">
        <div class="phone-number">
          <input value="+84" readonly class="phone-code" />
          <input
            v-model.trim="registerForm.username"
            :placeholder="$t('phoneNumber')"
          />
        </div>
      </a-form-item>
      <a-form-item has-feedback name="secret">
        <input
          v-model="registerForm.secret"
          type="password"
          :placeholder="$t('password')"
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
      <button class="btn-submit">{{ $t('register') }}</button>
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
    const phoneValidator = async (_, value: string) => {
      await requiredValidator(_, value)
      const pattern = /\b[0-9]{9}\b/
      if (!pattern.test(value)) {
        return Promise.reject(this.$t('phoneFormat'))
      }
      return Promise.resolve()
    }
    return {
      registerForm: {
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        secret: ''
      },
      rules: {
        first_name: [{ validator: requiredValidator }],
        last_name: [{ validator: requiredValidator }],
        username: [{ validator: phoneValidator }],
        secret: [{ validator: requiredValidator }]
      }
    }
  },
  methods: {
    onSubmit(data: AuthRegister) {
      this.$emit('submit', {
        ...data,
        custom_json: JSON.stringify({ code: '+84', introduce: 'Hello world' })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style';
</style>
