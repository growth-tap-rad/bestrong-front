<script setup>

const rotaIcones = () => {
  alert('clicou')
}

const rotaBotaoMais = () => {
  alert('clicou no botao Mais')
}
</script>


<template>
  <div class="footer">
    <div class="buttons-options">
      <button @click="rotaIcones" class="BotoesBarraInferior"><img src="../assets/imgs/dieta.svg" alt=""></button>
      <button @click="rotaIcones" class="BotoesBarraInferior"><img src="../assets/imgs/alter.svg" alt="Alter"></button>
      <button @click="rotaIcones" class="BotoesBarraInferior"><img src="../assets/imgs/user.svg" alt="Usuario"></button>
      <button @click="rotaIcones" class="BotoesBarraInferior"><img class=" carrinho"
          src="../assets/imgs/carrinhoCompra.svg" alt="Carrinho de compra"></button>
    </div>
    <button @click="rotaBotaoMais" class="BotoesBarraInferior botaoMais">+</button>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  background-color: var(--bg-color-dark3);


}

.buttons-options {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
}

.BotoesBarraInferior {
  border: none;
  background-color: transparent;
  padding: 20px;
}

.BotoesBarraInferior:hover {
  background-color: var(--button-color-light);
  cursor: pointer;

}

.botaoMais {
  position: absolute;
  bottom: 30px;
  border-radius: 50%;
  color: white;
  background-color: var(--button-color-light);
}

.botaoMais:hover {
  background-color: var(--button-color-light);
  appearance: 1;

}

.carrinho {
  fill: blueviolet;
}

.carrinho:hover {
  fill: chartreuse;

}

.imagem {
  fill: #626463;
}

.imagem:hover {
  fill: var(--button-color-light);
}
</style>