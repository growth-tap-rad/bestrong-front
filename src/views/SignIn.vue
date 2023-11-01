<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.store'
import { useSignInStore } from '../stores/sign.in.store';
import VButton from '../components/VButton.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VInputIcon from '../components/VInputIcon.vue';
const signInStore= useSignInStore()

const userStore = useUserStore();
const router = useRouter();

const inputEmail = {
  title: "E-mail",
  placeholder: "Ex: joao@gmail.com",
  type: 'text',
  value: userStore.getEmail
}
const inputPassword = {
  title: "Senha",
  placeholder: "**********",
  type: 'password',
  value: userStore.getPassword
}
const backToLogin = () => {
  router.back()
}

const signin = () => {
  signInStore.signIn({ email: inputEmail, password: inputPassword })
    .then(data => {
      if (data) {
        router.push('/diet')
        return
      }
    })
};

onMounted(() => {
  sessionStorage.clear()
})
</script>

<template>
  <section class="sign-in">
    <header class="header">
      <nav class="nav">
        <VButtonArrowLeft @click="backToLogin" />
      </nav>
      <h1 class="title-page">Entre com seu e-mail</h1>
    </header>
    <form class="main" @submit.prevent="signin">
      <VInputIcon :data="inputEmail" :hasIcon="true" iconName="bi bi-envelope" v-model="inputEmail.value" />
      <VInputIcon :data="inputPassword" :hasIcon="true" iconName="bi bi-key-fill" v-model="inputPassword.value" />
      <VButton text="Continuar" class="button" />
      <p class="text">Esqueceu sua senha? <router-link to="/forgot-password" class="cta-forgot-pass">Clique
          aqui!</router-link></p>
    </form>
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