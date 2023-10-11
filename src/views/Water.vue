<script setup>
import { onMounted, ref } from 'vue'
import VButton from '../components/VButton.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import VConsumeWater from '../components/VConsumeWater.vue';
import VAddWater from '../components/VAddWater.vue';
import { useWaterStore } from '../stores/water.store'


const showComponentAddWater = ref(false)

const waterStore = useWaterStore();

const ArrayWater = ref([])






const abreAba = ()=>{
    showComponentAddWater.value = true
}

// const showAddWater = () => {

//   showComponentAddWater.value = true
// }

const addWater = (e) => {
 
  showComponentAddWater.value = false

  if (e) {
    waterStore.addWater(
        e 
        // + water.quantity.value
     
    ).then((data) => {
    // aqui esta add no pinia
      ArrayWater.value.push({
        consumed_water:data.consumed_water,
        created_at:data.created_at

    })
      
      
    })
  }
}

onMounted(()=>{
    fetchWater()
})

const fetchWater = async ()=>{
    await waterStore.fetchWater()
    ArrayWater.value = waterStore.getArrayWater




   
}

</script>

<template>
<div class="consume-Water">
    <header class="header">
        <VTitleDatePage :title="`Água`" />
    </header>
    <main>

    <div class="center">
        <h1>2000ml </h1>
        <p>Meta Diaria</p>
    </div>

    <!-- :data="meal" v-for="meal in meals" -->
    <VConsumeWater :data="element" v-for ="element in ArrayWater" class="agua-consumida" />
    <VAddWater class="box-add-water" :show="showComponentAddWater" @showAddWater="(e) => { addWater(e) }"></VAddWater>
    <VButton @click="abreAba" :text="`+ Adicionar`" class="vButton" />
</main>


    </div>
</template>


<style scoped>
.consume-Water {
    background-color: var(--bg-color-grey);
    width: 100%;
    min-height: 100vh;
    height: 100%;
    align-items: center;
    .agua-consumida {
        margin-top: 30px;
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

