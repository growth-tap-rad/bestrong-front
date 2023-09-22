<script setup>
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VInputIcon from '../components/VInputIcon.vue';
import { reactive, ref } from 'vue';
import * as authService from '../service/auth.service.js';
import { useUserStore } from '../stores/user.store'

const userStore = useUserStore();
const router = useRouter();

const inputName = {
    title: "Nome",
    placeholder: "Digite seu nome",
    type: 'text',
    value: userStore.getName
}
const inputEmail = {
    title: "E-mail",
    placeholder: "Digite seu e-mail",
    type: 'text',
    value: userStore.getEmail
}
const inputPassword = {
    title: "Senha",
    placeholder: "Digite uma senha",
    type: 'password',
    value: userStore.getPassword
}
const inputUserName = {
    title: "Nome de Usuario",
    placeholder: "Digite um nome de usuario",
    type: 'text',
    value: userStore.getUsername
}
const backToWelcome = () => {
    router.back()
}



function goForDiet() {

    const payload = {
        name: inputName.value, email: inputEmail.value, password: inputPassword.value, username: inputUserName.value
    }
    if (!payload.name || !payload.email || !payload.password || !payload.username) {
        alert('Preencha todos os campos antes de continuar !')
        return
    }

    userStore.setUser(payload)
    router.push('/gender-birthday')

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
        <main class="main">

            <VInputIcon :data="inputName" :hasIcon="true" iconName="bi bi-person-fill" v-model="inputName.value" />
            <VInputIcon :data="inputUserName" :hasIcon="true" iconName="bi bi-key-fill" v-model="inputUserName.value" />
            <VInputIcon :data="inputEmail" :hasIcon="true" iconName="bi bi-envelope" v-model="inputEmail.value" />
            <VInputIcon :data="inputPassword" :hasIcon="true" iconName="bi bi-key-fill" v-model="inputPassword.value" />

            <VButton text="Continuar" @click="goForDiet" class="button" :defaultColor="true" />
        </main>
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