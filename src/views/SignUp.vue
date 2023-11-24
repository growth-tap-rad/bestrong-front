<script setup>
import { useRouter } from 'vue-router'
import { onMounted, watch, ref } from 'vue'
import { useUserStore } from '../stores/user.store'
import VButton from '../components/VButton.vue'
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue'
import VInputIcon from '../components/VInputIcon.vue'
import { useAppStore } from '../stores/app.store'

const userStore = useUserStore()
const router = useRouter()

const inputName = {
  title: 'Nome',
  placeholder: 'Ex: Joao Silva',
  type: 'text',
  value: userStore.getName
}
const inputEmail = {
  title: 'E-mail',
  placeholder: 'Ex: joao@gmail.com',
  type: 'text',
  value: userStore.getEmail
}
const inputPassword = ref({
  title: 'Senha',
  placeholder: '*********',
  type: 'password',
  value: userStore.getPassword
})
const inputUserName = {
  title: 'Nome de Usuario',
  placeholder: 'Ex: JoaoRZA',
  type: 'text',
  value: userStore.getUsername
}

const emailIsValid = ref(false); //TODO APLICAR WATCHER
// PARA CASO isValidEmail, TORNAR ESSA VARIVAEL emailIsValid TRUE, assim ficando com border vermelha

const backToWelcome = () => {
  router.back()
}
const showToast = (error) => {
  if (error) {
    console.error('Erro: ', error?.error || error)
  }
  const appStore = useAppStore()
  appStore.setToast({
    show: true,
    message: error.message,
    description: chooseMessage(error)
  })
}

const chooseMessage = (error) => {
  switch (error?.error?.response?.status) {
    case 401:
      return 'Não autorizado';
    case 500:
      return 'Ops, Ocorreu um erro';
    default:
      return error.description || 'Falha de comunicação';
  }
}

onMounted(() => {
  sessionStorage.removeItem('accessToken');
})

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isValidPassword = (password) => {
  if (password.length >= 8) {
    return true
  }
  return false
};

const goForDiet = async () => {
  const payload = {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value.value,
    username: inputUserName.value
  }
  if (!payload.name || !payload.email || !payload.password || !payload.username) {
    showToast({
      message: 'Alerta',
      description: 'Preencha todos os campos antes de continuar !'
    })
    return
  }

  if (!isValidEmail(payload.email)) {
    showToast({
      message: 'Alerta',
      description: 'Endereço de e-mail inválido.Use algo como joao@gmail.com'
    });

    return;
  }
  if (!isValidPassword(payload.password)) {
    showToast({
      message: 'Alerta',
      description: 'Senha inválida.Use algo como Senha.Segura123'
    });
    return
  }

  try {
    const emailInUse = await userStore.verifyEmail(payload.email)
    if (!emailInUse) {
      userStore.setUser(payload)
      router.push('/gender-birthday')
      //TODO: Melhorar isso vizualmente, como campo invalido
    }
  } catch (error) {
    showToast({
      message: 'Alerta',
      description: 'Ops ocorreu um erro..'
    })
    console.error(error)
  }
}

const changeTypePassword = () => {
  if (inputPassword.value.type == "password") {
    inputPassword.value.type = 'text'
    return
  }
  inputPassword.value.type = 'password'
}
</script>

<template>
  <section class="sign-up">
    <header class="header">
      <nav class="nav">
        <VButtonArrowLeft @click="backToWelcome" />
      </nav>
      <h1 class="title-page">Crie sua conta usando seu e-mail</h1>
    </header>
    <form class="main" @submit.prevent="goForDiet">
      <VInputIcon :data="inputName" :hasIcon="true" iconName="bi bi-person-fill" v-model="inputName.value" />
      <VInputIcon :data="inputUserName" :hasIcon="true" iconName="bi bi-key-fill" v-model="inputUserName.value" />
      <VInputIcon :data="inputEmail" :hasIcon="true" iconName="bi bi-envelope" v-model="inputEmail.value"
        :isValid="emailIsValid" />
      <VInputIcon :data="inputPassword" :hasIcon="true" :isPassword="true" @changeTypePassword="changeTypePassword()"
        iconName="bi bi-key-fill" v-model="inputPassword.value" />

      <VButton text="Continuar" class="button" :defaultColor="true" />
    </form>
  </section>
</template>

<style scoped>
h1 {
  color: white;
}

.sign-up {
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
  }
}
</style>
