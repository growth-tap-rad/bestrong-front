<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import VButton from '../components/VButton.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VInputIcon from '../components/VInputIcon.vue';
import { ref } from 'vue';
import apiClient from '../api/apiAxios';

const email = ref('')
const password = ref('')


const inputEmail = {
  title: "E-mail",
  placeholder: "Ex: joao@gmail.com",
  type: 'text'
}
const inputPassword = {
  title: "Senha",
  placeholder: "",
  type: 'password'
}
const backToLogin = () => {
  router.back()
}

const signin = () => {
  apiClient.post('/auth/sign-in', {
    email: email.value,
    password: password.value,
  }).then((user) => {
    sessionStorage.setItem('accessToken', user.data)
    router.push("/diet")
  }).catch(() => {
    alert("Email ou senha incorreto")
  })

}
</script>

<template>
  <section class="sign-in">
    <header class="header">
      <nav class="nav">
        <VButtonArrowLeft @click="backToLogin" />
      </nav>
      <h1 class="title-page">Entre com seu e-mail</h1>
    </header>
    <main class="main">
      <VInputIcon :data="inputEmail" :hasIcon="true" iconName="bi bi-envelope" v-model="email" />
      <VInputIcon :data="inputPassword" :hasIcon="true" iconName="bi bi-key-fill" v-model="password" />
      <VButton @click="signin" text="Continuar" class="button" />
      <p class="text">Esqueceu sua senha? <router-link to="/forgot-password" class="cta-forgot-pass">Clique
          aqui!</router-link></p>
    </main>
  </section>
</template>


<style scoped>
.sign-in {
  background-color: var(--bg-color-dark);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;

  .header {
    .nav {
      margin-bottom: 20px;
    }

    .title-page {
      color: var(--text-color-light);
      font-size: 20px;
      margin-bottom: 30px;
    }
  }

  .main {
    width: 100%;

    .button {
      margin-top: 50px;
    }

    .text {
      margin-top: 25px;
      text-align: center;
      color: var(--text-color-light);
    }

    .cta-forgot-pass {
      color: var(--button-color-light);
    }
  }
}
</style>