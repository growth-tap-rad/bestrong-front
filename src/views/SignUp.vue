<script setup>
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VInputIcon from '../components/VInputIcon.vue';
import { ref } from 'vue';
import apiAxios from '../api/apiAxios';

const router = useRouter();
const name = ref('')
const email = ref('')
const password = ref('')
const username = ref('')
const birthday = ref(Date)

const inputName = {
    title: "Nome",
    placeholder: "Digite seu nome",
    type: 'text'
}
const inputEmail = {
    title: "E-mail",
    placeholder: "Digite seu e-mail",
    type: 'text'
}
const inputPassword = {
    title: "Senha",
    placeholder: "Digite uma senha",
    type: 'password'
}
const inputUserName = {
    title: "Nome de Usuario",
    placeholder: "Digite um nome de usuario",
    type: 'text'
}
const inputBirthDay = {
    title: "Data de Nascimento",
    placeholder: "Digite sua data de Nascimento",
    type: 'date'
}
const backToLogin = () => {
    router.back()
}
function goForDiet() {
    apiAxios.post('auth/sign-up', {
        name: name.value,
        email: email.value,
        password: password.value,
        username: username.value,
        birthday: birthday.value,
    }).then((user) => {
        if (user.data) {
            sessionStorage.setItem('accessToken', user.data.accessToken)
            router.push("/diet")
        } else {
            alert("Erro ao criar sua conta!")
        }
    })
} 
</script>

<template>
    <section class="sign-up">
        <header class="header">
            <nav class="nav">
                <VButtonArrowLeft @click="backToLogin" />
            </nav>
            <h1 class="title-page">Crie sua conta usando seu e-mail</h1>
        </header>
        <main class="main">

            <VInputIcon :data="inputName" :hasIcon="true" iconName="bi bi-person-fill" v-model="name" />
            <VInputIcon :data="inputUserName" :hasIcon="true" iconName="bi bi-key-fill" v-model="username" />
            <VInputIcon :data="inputBirthDay" :hasIcon="true" iconName="bi bi-key-fill" v-model="birthday" />
            <VInputIcon :data="inputEmail" :hasIcon="true" iconName="bi bi-envelope" v-model="email" />
            <VInputIcon :data="inputPassword" :hasIcon="true" iconName="bi bi-key-fill" v-model="password" />
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
}</style>