<template>
    <div class="loginForm">
        <a-form
                autocomplete="off"
                :model="loginForm"
                ref="formRef"
                :rules="rules"
                @finish="onSubmit">
            <a-form-item has-feedback name="username">
                <input
                        placeholder="Username"
                        v-model.trim="loginForm.username"
                />
            </a-form-item>
            <a-form-item has-feedback name="secret">
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
                    return Promise.reject(`Field can't not be empty`)
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
            async onSubmit() {
                try {
                    const result = await this.$refs.formRef.validate()
                    this.$emit('submit', {...result})
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./style";
</style>
