<script setup>


</script>


<template>
  <div class="footer">
    <div class="buttons-options">
      <div class="buttons-options-children">
        <button class="BotoesBarraInferior"><img src="../assets/imgs/dieta.svg" alt=""></button>
        <button class="BotoesBarraInferior"><img src="../assets/imgs/alter.svg" alt="Alter"></button>

      </div>
      <div class="buttons-options-children">
        <button class="BotoesBarraInferior"><img src="../assets/imgs/user.svg" alt="Usuario"></button>
        <button class="BotoesBarraInferior"><img class="carrinho" src="../assets/imgs/carrinhoCompra.svg"
            alt="Carrinho de compra"></button>

      </div>
    </div>
    <button class="BotoesBarraInferior botaoMais">+</button>
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

  .buttons-options-children {
    display: flex;
    align-items: center;
    gap: 10%;
    margin: 0;
  }
}

.BotoesBarraInferior {
  border: none;
  background-color: transparent;
  padding: 15px;
  margin: auto;

}

.BotoesBarraInferior img {
  width: 30px;
  height: 30px;
}


.botaoMais {
  position: absolute;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--button-color-facebook);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: var(--text-color-light);
  box-shadow: 0px 0px 0px 10px var(--bg-color-dark);
}


@media (max-width: 600px) {

  .buttons-options {
    justify-content: space-between;
  }
}
</style>