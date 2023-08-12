<script setup>
import physicalActivityLevelButton from "../components/physicalActivityLevelButton.vue"

let atividades = [
    { titulo: 'Sedentario', paragrafo: 'Treina 3 vezes na semana ou menos.', imagem: "https://sciath.com.br/wp-content/uploads/2021/11/sedentarismo.jpg" },
    { titulo: 'Intermediário', paragrafo: 'Treina 3 ou 4 vezes na semana.', imagem: "https://www.fab.mil.br/sis/enoticias/imagens/pub/40083/i204619164604314.jpg" },
    { titulo: 'Avançado', paragrafo: 'Treina todos os dias.', imagem: "https://nutrata.com.br/wp-content/webp-express/webp-images/uploads/2023/03/CBUM-altura-idade-peso-e-Mr.-Olympia-2048x1365.png.webp" }
]

</script>
<template>
    <div class=" container">
        <h1>Qual seu nivel de atividade Física?</h1>
        <physicalActivityLevelButton v-for="atividade in atividades" :atividade="atividade"></physicalActivityLevelButton>
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