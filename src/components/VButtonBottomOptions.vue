<script setup>
import { useRouter } from 'vue-router'
import { useDietStore } from '../stores/diet.store'

const router = useRouter()
const dietStore = useDietStore()

const showAddMeal = () => {
  dietStore.setShowComponentMeal(true)
}

const showAddWater = () => {
  router.push('/water')
}
const showAddTrain=()=>{
  router.push("/train/add")
}
</script>
<template>

  <div class="container-menu">
    <div class="bg" v-show="dietStore.getShowComponentMenuOptions"></div>
    <div v-show="dietStore.getShowComponentMenuOptions" class="buttons">
      <div class="top-buttons">
        <button class="button button-disable">
          <i class="bi bi-arrow-clockwise"></i>
          <span class="text">Adicionar peso</span>
        </button>
        <button @click="showAddTrain" class="button">
          <i class="bi bi-universal-access"></i>
          <span class="text">Adicionar treino</span>
        </button>
        <button class="button button-disable">
          <i class="bi bi-person-up"></i>
          <span class="text">Adicionar exercicio</span>
        </button>
      </div>
      <div class="bottom-buttons">
        <button @click="showAddMeal" class="button">
          <i class="bi bi-cup-straw"></i>
          <span class="text">Adicionar Alimento</span>
        </button>
        <button @click="showAddWater" class="button">
          <i class="bi bi-droplet"></i>
          <span class="text">Adicionar Agua</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  display: block;
  position: fixed;
  background-color: var(--bg-color-dark4);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
}

.buttons {
  position: absolute;
  z-index: 4;
  width: 100%;
  bottom: 120px;

  .top-buttons,
  .bottom-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;

    .button {
      width: 5em;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--bg-color-dark5);
      border: none;
      color: var(--text-color-highlighted2);
      padding: 10px 47px;
      border-radius: 5px;

      .text {
        font-size: 1em;
        line-height: normal;
      }

      .bi::before {
        font-size: 30px;
      }
    }

    .button-disable {
      color: gray;
      pointer-events: none;
    }
  }

  .top-buttons {
    margin-bottom: 1em;
  }
}
</style>
