<template>
    <div class="loginForm">
        <a-form
                autocomplete="off"
                :model="loginForm"
                ref="formRef"
                :rules="rules"
                @finish="onSubmit"
                @finishFailed="onSubmitError">
            <a-form-item name="username">
                <input
                        placeholder="Username"
                        v-model.trim="loginForm.username"
                />
            </a-form-item>
            <a-form-item name="secret">
                <input
                        type="secret"
                        placeholder="Password"
                        v-model="loginForm.secret"
                />
            </a-form-item>
            <button class="btn-submit">Login</button>
        </a-form>
    </div>
</template>

<script>
    export default {
        emits: ['submit'],
        data() {
            const requiredValidator = async (rule, value) => {
                if (!value) {
                    return Promise.reject()
                }
                return Promise.resolve()
            }
            return {
                loginForm: {
                    username: '',
                    secret: ''
                },
                rules: {
                    username: [{validator: requiredValidator}],
                    secret: [{validator: requiredValidator}],
                }
            }
        },
        methods: {
            onSubmit(data) {
                this.$emit('submit', {...data})
            },
            onSubmitError() {
                this.$message.error('Please enter Username and Password')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./style";
</style>
