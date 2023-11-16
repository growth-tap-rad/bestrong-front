<script setup>
import { useRouter } from 'vue-router'
import VButton from './VButton.vue'
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
      <button v-for="(meal, index) in props.data.meals" :key="meal.id" class="meal"
        :class="{ 'last': (index === props.data.meals.length - 1) }" @click="createEditMeal(false, meal.id)">
        {{ meal.title }}
      </button>

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

.main {
  z-index: 5;
  position: fixed;
  display: flex;
  flex-direction: column;

  bottom: 0;
  width: 100%;
  height: 85%;

  background-color: var(--bg-color-dark);

  .meals {
    height: 80%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;

    .meal {
      width: 100%;
      min-height: 80px;
      border: none;
      background-color: var(--bg-color-dark);
      color: var(--text-color-light);
      text-align: start;
      padding: 0 30px;
      border-bottom: 1px solid var(--button-color-light-hover);

      &.last {
        margin-bottom: 50px;
      }

      &:hover {
        background-color: var(--button-color-dark);
      }
    }


  }

  .add-meal {

    width: 80%;
    margin: 0 auto 40px auto;
  }
}
</style>
