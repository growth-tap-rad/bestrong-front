<script setup>
import physicalActivityLevelButton from "../components/physicalActivityLevelButton.vue"
import VBoxImgInfo from "../components/VBoxImgInfo.vue"
let atividades = [
    { title: 'Sedentario', text: 'Treina 3 vezes na semana ou menos.', bg: "https://sciath.com.br/wp-content/uploads/2021/11/sedentarismo.jpg" },
    { title: 'Intermediário', text: 'Treina 3 ou 4 vezes na semana.', bg: "https://www.fab.mil.br/sis/enoticias/imagens/pub/40083/i204619164604314.jpg" },
    { title: 'Avançado', text: 'Treina todos os dias.', bg: "https://nutrata.com.br/wp-content/webp-express/webp-images/uploads/2023/03/CBUM-altura-idade-peso-e-Mr.-Olympia-2048x1365.png.webp" }
]

</script>
<template>
    <div class=" container">
        <h1>Qual seu nivel de atividade Física?</h1>
        <VBoxImgInfo v-for="atividade in atividades" :atividade="atividade"></VBoxImgInfo>
    </div>
</template> 
<style>
body {

    background-color: rgb(151, 151, 151);
}

.container {

    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
}

.container * {
    margin: 10px;
}

h1 {
    color: white;
}</style>