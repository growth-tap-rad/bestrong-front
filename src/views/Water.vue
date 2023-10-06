<script setup>
import VButton from '../components/VButton.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import VConsumeWater from '../components/VConsumeWater.vue';


const abreAba = ()=>{
    alert('Clicou no bagulho')
}


</script>

<template>
<div class="consume-Water">
    <header class="header">
        <VTitleDatePage :title="`Água`" />
    </header>
    <main>

    <div class="center">
        <h1>2000ml</h1>
        <p>Meta Diaria</p>
    </div>

    <VConsumeWater class="agua-consumida" />
    
    <VButton @click="abreAba" :text="`+ Adicionar`" class="vButton" />
</main>


    </div>
</template>


<style scoped>
.consume-Water {
    background-color: var(--bg-color-grey);
    width: 100%;
    height: 100vh;
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

