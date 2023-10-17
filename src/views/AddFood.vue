<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useFoodStore } from '../stores/food.store'

const foodStore = useFoodStore()
const router = useRouter()
const foods = reactive({})

let pages = 0;
const back = () => {
  router.back()
}

const getFoods = async () => {
  await foodStore.fetchFood(pages);
  foods.value = foodStore.getFoods;
  pages += 20;
}


onMounted(async () => {
  getFoods()

})
</script>
<template>
  <div v-for="item in foods.value">
    {{ item.description }}
  </div>
  <button @click="getFoods()">mais</button>
</template>
<style scoped>
.main {
  color: white;
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;


  .header {

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;


    .nav {
      margin-bottom: 20px;
    }

    .title-page {
      color: var(--text-color-light);
      font-size: 20px;
      text-align: center;
    }
  }

  .food-selected {
    display: flex;
    flex-direction: column;
    width: 95%;


    .food {
      width: 100%;
      text-align: center;
      background-color: black;
      height: 2em;
    }

    .inputs {
      display: flex;
      gap: 20px;

      .input {
        background-color: transparent;
        border: none;
        border-bottom: 1PX solid gray;
      }

    }


  }
}
</style>
