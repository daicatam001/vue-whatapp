<template>
    <a-spin :spinning="loading">
        <div class="register">
            <div class="card">
                <div class="heading">Login</div>
                <login-form @submit="onSubmit"></login-form>
                <div class="switch">
                    No account?
                    <router-link to="/register">Create one!</router-link>
                </div>
            </div>
        </div>
    </a-spin>
</template>

<script>
    import LoginForm from "@/components/auth/LoginForm.vue"

    export default {
        components: {
            LoginForm
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            async onSubmit(data) {
                this.loading = true
                await this.$store.dispatch('auth/login', data)
                this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./style";
</style>
