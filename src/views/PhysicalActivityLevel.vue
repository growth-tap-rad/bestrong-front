<script setup>

import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.store";
import VBoxImgInfo from "../components/VBoxImgInfo.vue";
import VButton from "../components/VButton.vue";
import VtitlePage from "../components/VtitlePage.vue";/*  */
import low from '@/assets/imgs/ActivityLevel-low.jpg';
import moderate from '@/assets/imgs/ActivityLevel-moderate.jpg';
import intense from '@/assets/imgs/ActivityLevel-intense.png';

const userStore = useUserStore()
const router = useRouter()
let atividades = reactive([
    {
        title: 'Baixa',
        text: 'Treina 3 vezes na semana ou menos.',
        bg: low,
        value: 'low',
        selected: false
    },
    {
        title: 'Moderada',
        text: 'Treina 3 ou 4 vezes na semana.',
        bg: moderate,
        value: 'moderate',
        selected: false
    },
    {
        title: 'Intensa',
        text: 'Treina todos ou quase todos os dias.',
        bg: intense,
        value: 'intense',
        selected: false
    }
])
const goToYourGoal = async () => {
    if (userStore.getActivityLevel) {
        await router.push('/your-goal')
        return
    }
    alert('Selecione um nivel de atividade')


}



const selectActivityLevel = (e) => {

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