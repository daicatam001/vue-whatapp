<template>
    <a-spin :spinning="loading">
        <div class="RegisterForm">
            <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <input
                            type="text"
                            class="form-control"
                            placeholder="Email"
                            v-model="email"
                    />
                </div>
                <div class="form-group">
                    <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            v-model="passwod"
                    />
                </div>
                <a-button>sdasdasd</a-button>
                <br>
                <button class="btn-submit">Register</button>
            </form>
        </div>
    </a-spin>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                email: '',
                passwod: '',
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('auth/register', {
                    "first_name": "Adam",
                    "username": "adam_la_morre",
                    "email": "tam123@gmail.com",
                    "last_name": "La Morre",
                    "secret": "pass1234",
                    "custom_json": {"high_score": 2000}
                })
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
