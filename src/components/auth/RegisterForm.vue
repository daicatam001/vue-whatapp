<template>
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
      <button class="btn-submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            email:'',
            passwod:'',
        }
    },
    methods:{
        onSubmit(){
            console.log('sbmit')
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
