<script setup>

const rotaIcones = ()=>{
   alert('clicou')
}

const rotaBotaoMais = ()=>{
  alert('clicou no botao Mais')
}
</script>


<template>

    <footer class="footer">
          <!-- perguntar pq nao funciona mesmo tendo bootstrap instalado -->
        <!-- <button>  -->
        <!-- <i class="bi-6-square" style="font-size: 120px;"></i>
      </button>
        <button><i class="bi bi-0-circle"></i></button> -->
        <button @click="rotaIcones" class="BotoesBarraInferior"><img src="../assets/imgs/dieta.svg" alt=""></button>
        <button @click="rotaIcones" class="BotoesBarraInferior"><img  src="../assets/imgs/alter.svg" alt="Alter"></button>
        <button @click="rotaBotaoMais" class="BotoesBarraInferior botaoMais" ><img src="../assets/imgs/mais.svg" alt="Icone de mais"></button>
        <button @click="rotaIcones" class="BotoesBarraInferior"><img src="../assets/imgs/user.svg" alt="Usuario"></button>
        <button @click="rotaIcones" class="BotoesBarraInferior"><img class=" carrinho" src="../assets/imgs/carrinhoCompra.svg" alt="Carrinho de compra"></button>
         

    </footer>

</template>

<style scoped>
 .footer{
    display: flex;
    justify-content: center;
    background-color: black; 
    height: 80px;
    margin-top: 540px;
 }
 
.BotoesBarraInferior{
  border: none; 
  background-color: transparent; 
  padding: 20px;
}
 .BotoesBarraInferior:hover{
  background-color: var(--button-color-light);
  cursor: pointer;
  
} 
.botaoMais{
  border-radius: 200px;
  background-color: var(--button-color-light);  
}
.botaoMais:hover{
  background-color: var(--button-color-light);
  appearance: 1;
  
}
.carrinho{
  fill: blueviolet;
}
.carrinho:hover{
 fill: chartreuse;
  
}
.imagem{
    fill: #626463;
}
.imagem:hover{
  fill: var(--button-color-light);
}


</style>