<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import VButton from '../components/VButton.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VInputIcon from '../components/VInputIcon.vue';
import Diet from "../views/Diet.vue"
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

const backToLogin = () => {
    router.back()
}
function goForDiet(){
    router.push("/diet")
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
            <VInputIcon :data="inputName" :hasIcon="true" iconName="bi bi-person-fill" />
            <VInputIcon :data="inputEmail" :hasIcon="true" iconName="bi bi-envelope" />
            <VInputIcon :data="inputPassword" :hasIcon="true" iconName="bi bi-key-fill" />
            <VButton text="Continuar" @click="goForDiet" class="button" :defaultColor="true" />
           
        </main>
    </section>
</template>


<style scoped>
.sign-up {
    background-color: var(--bg-color-dark);
    width: 100%;
    height: 100vh;
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