<script setup>

import VBoxImgInfo from "../components/VBoxImgInfo.vue";
import VButton from "../components/VButton.vue";
import VtitlePage from "../components/VtitlePage.vue";/*  */
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "../stores/user.store";

const userStore = useUserStore()
const router = useRouter()
let atividades = reactive([
    {
        title: 'Baixa',
        text: 'Treina 3 vezes na semana ou menos.',
        bg: "https://www.opensesame.com/system/files/images/shutterstock_274330394.jpg",
        value: 'low',
        selected: false
    },
    {
        title: 'Moderada',
        text: 'Treina 3 ou 4 vezes na semana.',
        bg: "https://www.fab.mil.br/sis/enoticias/imagens/pub/40083/i204619164604314.jpg",
        value: 'moderate',
        selected: false
    },
    {
        title: 'Intensa',
        text: 'Treina todos ou quase todos os dias.',
        bg: "https://th.bing.com/th/id/R.dd17589b3c570296de6d64e3c47401b0?rik=%2f%2fUrY8lbg6Dp1g&riu=http%3a%2f%2ffitvocate.com%2fsites%2fdefault%2ffiles%2fheavyweight.png&ehk=eTHZwdeNqsPpA6sd9lB6o%2bJnIteo%2fgpUPearzMShfQs%3d&risl=&pid=ImgRaw&r=0",
        value: 'intense',
        selected: false
    }
])
async function goToYourGoal() {
    if (userStore.getActivityLevel) {
        await router.push('/your-goal')
        return
    }
    alert('Selecione um nivel de atividade')


}



function selectActivityLevel(e) {

    atividades = atividades.map(atividade => {
        if (atividade.value == e) {
            atividade.selected = !atividade.selected

            if (atividade.selected) {
                userStore.setActivity_level(atividade.value)
            } else {
                userStore.setActivity_level('')
            }

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