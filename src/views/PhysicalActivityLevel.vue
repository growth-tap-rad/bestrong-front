<script setup>
import { routerKey } from "vue-router";
import VBoxImgInfo from "../components/VBoxImgInfo.vue";
import VButton from "../components/VButton.vue";
import VtitlePage from "../components/VtitlePage.vue";/*  */
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "../stores/user.store";

const userStore = useUserStore()
const router = useRouter()
const selectedActivityLevel = ref('')
let atividades = reactive([
    {
        title: 'Sedentario',
        text: 'Treina 3 vezes na semana ou menos.',
        bg: "https://sciath.com.br/wp-content/uploads/2021/11/sedentarismo.jpg",
        value: 'low',
        selected: false
    },
    {
        title: 'Intermediário',
        text: 'Treina 3 ou 4 vezes na semana.',
        bg: "https://www.fab.mil.br/sis/enoticias/imagens/pub/40083/i204619164604314.jpg"
        , value: 'moderate',
        selected: false
    },
    {
        title: 'Avançado',
        text: 'Treina todos os dias.',
        bg: "https://nutrata.com.br/wp-content/webp-express/webp-images/uploads/2023/03/CBUM-altura-idade-peso-e-Mr.-Olympia-2048x1365.png.webp",
        value: 'intense',
        selected: false
    }
])
function goToYourGoal() {
    router.push('/your-goal')
}
function selectActivityLevel(e) {

    atividades = atividades.map(atividade => {
        if (atividade.value == e) {
            atividade.selected = !atividade.selected

            userStore.setActivity_level(atividade.value)

        } else {
            atividade.selected = false
        }
        return atividade
    })
}
onMounted(() => {
    
    const selectedInStore = userStore.getActivityLevel

    atividades = atividades.map(atividade => {
        if (atividade.value == selectedInStore) {
            atividade.selected = !atividade.selected
        }
        return atividade
    })
})
</script>
<template>
    <div class="bg-activity">
        <VtitlePage title="Qual seu nivel de atividade Física?" />
        <VBoxImgInfo v-for="atividade in atividades" :data="atividade" class="margin-y" :selected="atividade.selected"
            @update="(e) => selectActivityLevel(e)" />
        <VButton @click="goToYourGoal" text="CONFIRMAR OBJETIVO" class="button" />
    </div>
</template> 
<style scoped>
.bg-activity {
    background-color: var(--bg-color-dark);
    width: 100%;
    height: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .margin-y {
        margin: 10px 0;
    }

    .button {
        margin: 30px 0;
        background-color: var(--button-color-light);
        max-width: 500px;
    }

    padding-bottom: 50px;
}

@media (max-width: 768px) {
    .bg-activity {
        padding: 1rem;
    }
}
</style>