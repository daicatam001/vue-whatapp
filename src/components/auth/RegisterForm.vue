<template>
    <div class="RegisterForm">
        <a-form
                autocomplete="off"
                :model="registerForm"
                ref="formRef"
                :rules="rules"
                @finish="onSubmit">
            <a-form-item has-feedback name="email">
                <input
                        autocomplete="off"
                        type="text"
                        placeholder="Email"
                        v-model.trim="registerForm.email"
                />
            </a-form-item>
            <a-form-item has-feedback name="first_name">
                <input
                        autocomplete="off"
                        type="text"
                        placeholder="First name"
                        v-model.trim="registerForm.first_name"
                />
            </a-form-item>
            <a-form-item has-feedback name="last_name">
                <input
                        type="text"
                        placeholder="Last name"
                        v-model.trim="registerForm.last_name"
                />
            </a-form-item>
            <a-form-item has-feedback name="username">
                <input
                        placeholder="Username"
                        v-model.trim="registerForm.username"
                />
            </a-form-item>
            <a-form-item has-feedback name="secret">
                <input
                        type="secret"
                        placeholder="Password"
                        v-model="registerForm.secret"
                />
            </a-form-item>
            <button class="btn-submit">Register</button>
        </a-form>
    </div>
</template>

<script>
    export default {
        emits: ['submit'],
        data() {
            const requiredValidator = async (rule, value) => {
                if (!value) {
                    return Promise.reject(`Field can't not be empty`)
                }
                return Promise.resolve()
            }
            const emailValidator = async (rule, value) => {
                await requiredValidator(rule, value)
                const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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
                    secret: ''
                },
                rules: {
                    email: [{validator: emailValidator}],
                    first_name: [{validator: requiredValidator}],
                    last_name: [{validator: requiredValidator}],
                    username: [{validator: requiredValidator}],
                    secret: [{validator: requiredValidator}],
                }
            }
        },
        methods: {
            onSubmit(data) {
                this.$emit('submit', {...data})

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./style";
</style>
