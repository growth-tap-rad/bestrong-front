<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useFoodStore } from '../stores/food.store'
import VButton from '../components/VButton.vue';

const foodStore = useFoodStore()
const router = useRouter()
const foods = reactive({})
const back = () => {
  router.back()
}
onMounted(async () => {
  await foodStore.fetchFood()
  foods.value = foodStore.getFoods
 
})
</script>
<template>
<VButton v-for="food in foods.value" :text="food.id"/>
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
