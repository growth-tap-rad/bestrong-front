<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import VButton from '../components/VButton.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VInputIcon from '../components/VInputIcon.vue';


const inputEmail = {
    title: "E-mail",
    placeholder: "Digite seu e-mail",
    type: 'text'
}


const backToLogin = () => {
    router.back()
}
function goForDiet(){
    router.push("/diet")
}
</script>

<template>
    <section class="forgot-password">
        <header class="header">
            <nav class="nav">
                <VButtonArrowLeft @click="backToLogin" />
            </nav>
            <h1 class="title-page">Insira o e-mail para recuperar a senha</h1>
        </header>
        <main class="main">
            <VInputIcon :data="inputEmail" :hasIcon="true" iconName="bi bi-envelope" />
            <VButton text="Continuar" @click="goForDiet" class="button" :defaultColor="true" />
        </main>
    </section>
</template>


<style scoped>
.forgot-password {
    background-color: var(--bg-color-dark);
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    justify-content: space-between;
   

    .header {
        .nav {
            margin-bottom: 20px;
        }

        .title-page {
            color: var(--text-color-light);
            font-size: 20px;
            margin-bottom: 30px;
            z-index: 10;
            z-index: 999999;
        }
    }

    .main {
        margin: auto 0;
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