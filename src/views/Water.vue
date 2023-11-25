<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import VConsumeWater from '../components/VConsumeWater.vue';
import VAddWater from '../components/VAddWater.vue';
import { useWaterStore } from '../stores/water.store'
import { useAppStore } from '../stores/app.store'
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';

const router = useRouter()

const showComponentAddWater = ref(false)
const waterStore = useWaterStore();
const appStore = useAppStore();
let ArrayWater = ref([])
const water_goal = ref(0)
const openInputWater = () => {
    showComponentAddWater.value = true
}

const addWater = (value) => {

    showComponentAddWater.value = false

    if (value) {
        waterStore.addWater({
            consumed_water: value,
            date: appStore.getCurrentQueryDate,
        }).then((data) => {
            ArrayWater.value.push({
                id: data.id,
                consumed_water: data.consumed_water,
                created_at: data.created_at,
            })
        })
    }
}

const deleteWater = (e) => {
    waterStore.deleteWater(e).then(() => {
        ArrayWater.value.forEach((water, index) => {
            if (water.id == e) {
                ArrayWater.value.splice(index, 1)
            }
        })
    })
}
onMounted(() => {
    fetchWater()
})

const fetchWater = async () => {
    await waterStore.fetchWater(appStore.getCurrentQueryDate)
    ArrayWater.value = waterStore.getArrayWater
    water_goal.value = waterStore.getWaterGoal

}


const actionsTitlePage = [
    {
        btIcon: 'bi bi-arrow-left-short',
        goTo: 'back'
    }
]

</script>

<template>
    <div class="water">
        <header class="header">
            <VTitleDatePage title="Água" class="title" :actions="actionsTitlePage" />
        </header>
        <main>

            <div class="center">
                <h1 class="water-goal"><span>{{ water_goal || 0 }}</span> ml</h1>
                <p>Meta Diária</p>
            </div>

            <VConsumeWater @deleteWater="(e) => deleteWater(e)" :data="element" v-for="element in ArrayWater"
                class="water-consumed" />
            <VAddWater class="box-add-water" :show="showComponentAddWater" @showAddWater="(e) => { addWater(e) }" />
            <VButton @click="openInputWater" text="+ Adicionar" class="vButton" />
        </main>


    </div>
</template>


<style scoped>
.water {

    background-color: var(--bg-color-dark);
    width: 100%;
    min-height: 100vh;
    height: 100%;
    align-items: center;

    .water-consumed {
        padding-top: 30px;
    }

    .header {
        .title {
            padding-right: 50px;
        }
    }
}

.water-goal {
    display: flex;
    justify-content: center;
    align-items: baseline;
    color: var(--text-color-highlighted2);

    span {
        font-size: 3em;
        font-weight: bold;
    }
}

p {
    display: flex;
    justify-content: center;
    color: var(--bg-color-light);

}

.center {
    margin-top: 20px;
}

.vButton {
    width: 90%;
    display: flex;
    justify-content: center;
    margin: 40px auto;
}

@media (max-width: 768px) {
    .bg-container {

        padding: 1rem;
    }
}
</style>

