<script setup>
import { useRouter } from 'vue-router'
import VButton from './VButton.vue'
import VtitlePage from './VtitlePage.vue'
import { useDietStore } from '../stores/diet.store'

const dietStore = useDietStore()
const router = useRouter()


const props = defineProps({
  data: {
    meals: {
      type: Array,
      required: true,
      default: () => [
        {
          title: 'Cafe Da Manha',
          id: 0
        }
      ]
    }
  }
})

const handleClickOutside = () => {
  dietStore.setShowComponentMeal(false)
  dietStore.setShowComponentMenuOptions(false)
}


const createEditMeal = (create = false, id) => {
  if (create) {
    router.push(`/meal`)
    return
  }
  return router.push(`/meal/edit/${id}`)
}
</script>

<template>
  <div class="bg" v-if="dietStore.getShowComponentMeal" @click="handleClickOutside"></div>
  <div class="main" v-if="dietStore.getShowComponentMeal">
    <header class="title">
      <h1>Adicionar Refeição</h1>
      <span>Escolha uma refeição para continuar</span>
    </header>

    <div class="meals">
      <button v-for="meal in props.data.meals" :key="meal.id" class="meal" @click="createEditMeal(false, meal.id)">
        {{ meal.title }}
      </button>
      <!-- <button class="meal" @click="goToAddMeal">+ Nova Refeição</button> -->
      <div class="add-meal">

        <VButton text="+ Nova Refeição" @click="createEditMeal(true)" />
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
  z-index: 4;
}

.title {

  padding: 10px 0;
  text-align: center;
  color: var(--text-color-light);
}

.meals {
  height: 80%;
  display: flex;
  gap: 50px;
  overflow: scroll;

}

.main {
  z-index: 5;
  position: fixed;
  display: flex;
  flex-direction: column;

  bottom: 0;
  width: 100%;
  height: 80%;

  background-color: var(--bg-color-dark);





  .meals {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;

    .meal {
      width: 100%;
      height: 4em;
      border: none;
      background-color: var(--bg-color-dark);
      color: var(--text-color-light);
      text-align: start;
      padding: 0 30px;
    }

    .meal:hover {
      background-color: var(--button-color-dark);
    }

    .add-meal {


      position: fixed;
      width: 80%;
      margin: auto;
      align-items: center;
      justify-content: center;
      bottom: 15px;
      left: 10%;
    }
  }
}
</style>
