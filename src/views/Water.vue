<script setup>
import { onMounted, reactive, ref } from 'vue'
import VButton from '../components/VButton.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import VConsumeWater from '../components/VConsumeWater.vue';
import VAddWater from '../components/VAddWater.vue';
import { useWaterStore } from '../stores/water.store'

const showComponentAddWater = ref(false)
const waterStore = useWaterStore();
let ArrayWater = ref([])
const water_goal = ref()
const abreAba = () => {
    showComponentAddWater.value = true
}

const addWater = (e) => {

    showComponentAddWater.value = false

    if (e) {
        waterStore.addWater(e).then((data) => {
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
    await waterStore.fetchWater()
    ArrayWater.value = waterStore.getArrayWater
    water_goal.value = waterStore.getWaterGoal

}

</script>

<template>
    <div class="consume-Water">
        <header class="header">
            <VTitleDatePage :title="`Água`" />
        </header>
        <main>

            <div class="center">
                <h1>{{ water_goal }} ml</h1>
                <p>Meta Diaria</p>
            </div>

            <VConsumeWater @deleteWater="(e) => deleteWater(e)" :data="element" v-for="element in ArrayWater"
                class="agua-consumida" />
            <VAddWater class="box-add-water" :show="showComponentAddWater" @showAddWater="(e) => { addWater(e) }">
            </VAddWater>
            <VButton @click="abreAba" :text="`+ Adicionar`" class="vButton" />
        </main>


    </div>
</template>


<style scoped>
.consume-Water {

    background-color: var(--bg-color-dark);
    width: 100%;
    min-height: 100vh;
    height: 100%;
    align-items: center;

    .agua-consumida {
        margin-top: 30px;
        section {

    
            background-color: var(--bg-color-grey);
        }
    }

}

h1 {
    display: flex;
    justify-content: center;
    color: var(--button-color-light)
}

p {
    display: flex;
    justify-content: center;
    color: var(--bg-color-light);

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

