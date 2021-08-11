<template>
    <a-spin :spinning="loading">
        <div class="register">
            <div class="card">
                <div class="heading">Register</div>
                <register-form @submit="onSubmit"></register-form>
            </div>
        </div>
    </a-spin>
</template>

<script>
    import RegisterForm from "@/components/auth/RegisterForm.vue"

    export default {
        components: {
            RegisterForm
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
           async onSubmit(data) {
               this.loading =true
               await this.$store.dispatch('auth/register', data)
               this.loading=false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register {
        min-height: 100vh;
        position: relative;
        background-color: #eeeeee;
    }

    .card {
        background-color: white;
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 30px;
        transform: translate(-50%, -50%)
    }

    .heading {
        font-size: 24px;
        text-align: center;
        font-weight: 700;
        margin-bottom: 30px;
    }
</style>
