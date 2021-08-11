<template>
    <a-spin :spinning="loading">
        {{registerForm}}
        <div class="RegisterForm">
            <a-form
                    autocomplete="off"
                    :model="registerForm"
                    ref="formRef"
                    :rules="rules"
                    @submit.prevent="onSubmit">
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
                <a-form-item has-feedback name="password">
                    <input
                            type="password"
                            placeholder="Password"
                            v-model="registerForm.password"
                    />
                </a-form-item>
                <button class="btn-submit">Register</button>
            </a-form>
        </div>
    </a-spin>
</template>

<script>
    export default {
        data() {
            const requiredValidator = async (rule, value) => {
                if (!value) {
                    return Promise.reject(`Field can't not be empty`)
                }
                return Promise.resolve()
            }
            const emailValidator = async (rule, value) => {
                await requiredValidator(rule,value)
                const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!pattern.test(value)) {
                    return Promise.reject(`Email's invalid`)
                }
                return Promise.resolve()
            }
            return {
                loading: false,
                registerForm: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    username: '',
                    password: ''
                },
                rules: {
                    email: [{validator: emailValidator}],
                    first_name: [{validator: requiredValidator}],
                    last_name: [{validator: requiredValidator}],
                    username: [{validator: requiredValidator}],
                    password: [{validator: requiredValidator}],
                }
            }
        },
        methods: {
            async onSubmit() {
                try {
                    await this.$refs.formRef.value.validate()
                } catch (e) {
                    console.log(e)
                }
                console.log('submit')
                // this.$store.dispatch('auth/register', {
                //     "first_name": "Adam",
                //     "username": "adam_la_morre",
                //     "email": "tam123@gmail.com",
                //     "last_name": "La Morre",
                //     "secret": "pass1234",
                //     "custom_json": {"high_score": 2000}
                // })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-group {
        margin-bottom: 40px;
    }

    input {
        font-size: 16px;
        padding-bottom: 10px;
        outline: 0;
        border: 0;
        width: 100%;
        border-bottom: 1.5px solid rgba(0, 0, 0, 0.25);
    }

    input:focus {
        border-bottom-color: #07315b;
    }

    button {
        margin-top: 20px;
        padding: 10px;
        font-size: 16px;
        letter-spacing: 1.2px;
        background-color: #07315b;
        width: 100%;
        color: white;
        outline: 0;
        border: 0;
    }
</style>
