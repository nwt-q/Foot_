<template>
  <div class="login">
    <h1>登录</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from "axios"

const username = ref('')
const password = ref('')
const router = useRouter()

function login() {
  // 这里添加身份验证逻辑
  // 根据角色跳转到不同页面
  const role = "admin"
  console.log(username.value)
  console.log(password.value)

  fetch('http://127.0.0.1:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
    if (data.message === '登录成功') {
      const role = data.role; // 获取用户角色信息，假设从后端返回的字段名为role
      console.log(role)
      if (role === 'admin') {
        router.push('/cawy')
      } else if (role === 'user') {
        router.push('/aa')
      } else if(role === 'coa') {
        router.push('/bb')
      }
    }
  })
  .catch(error => console.error('Error:', error));
  
}
</script>

<style scoped>

.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>