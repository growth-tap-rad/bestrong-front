<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useFoodStore } from '../stores/food.store'
import VButton from '../components/VButton.vue';
import VInputIcon from '../components/VInputIcon.vue'
import { useRoute, useRouter } from 'vue-router';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';

const route = useRoute()
const router = useRouter()

const foodStore = useFoodStore()

let foods = ref([])

let pages = 0;
const back = () => {
  router.back()
}

const getFoods = async () => {
  await foodStore.fetchFood(pages);
  const bacate = foodStore.getFoods
  foods.value = [...foods.value, ...bacate]
  pages += 20;
}


onMounted(async () => {
  getFoods()

})
const data = {

  placeholder: 'Busque por um alimento',
  type: 'text',

}
const inputFood = reactive({

  placeholder: "abacate",
  type: 'text',
  value: '',


})
const findFood = () => {
  alert('')
}
const addFood = (item) => {

  router.push(`/meal/${route.params.id}/food/${item.id}`);
}


</script>
<template>
  <div class="main">
    <nav class="nav">
      <VButtonArrowLeft class="arrow-left" @click="back()" />
      <span class="title">Alimentos</span>
      <span></span>
    </nav>
    <VInputIcon :disabled="true" :data="inputFood" :hasIcon="true" iconName="bi bi-search" v-model="inputFood.value" />
    <section class="list-foods">
      <VButton class="food" v-for="item in foods" :text="item.description" @click="addFood(item)" />
    </section>
    <VButton class="food" @click="getFoods()" text="mais alimentos" />
  </div>
</template>
<style scoped>
.main {
  color: white;
  background-color: var(--bg-color-dark);

  display: flex;
  flex-direction: column;
  padding: 20px;

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .list-foods {
    padding: 10px 25px;
  }

  .arrow-left {
    display: flex;
  }

  .food {
    background-color: var(--bg-color-dark);
  }
}
</style>
