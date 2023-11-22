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
let page = 0;
let notFoundFoods = ref(false);

onMounted(async () => {
  getFoods()
})

const back = () => {
  router.push(`/meal/edit/${route.params.id}`)
}


const setNotFoundFoods = () => {
  if (!foods.value.length) {
    notFoundFoods.value = true
  } else {
    notFoundFoods.value = false
  }
}

const getFoods = async () => {

  const query = {
    page: page,
    search: inputSearchFood.value || ''
  }

  await foodStore.fetchFoods(query);

  const storeFoods = foodStore.getFoods
  foods.value = storeFoods ? [...foods.value, ...storeFoods] : []
  page += 20;

  setNotFoundFoods()
}


const inputSearchFood = reactive({
  placeholder: 'Busque por um alimento...',
  type: 'text',
  value: '',
})


const debounce = (func, delay) => {
  let timerDebounce;

  return (...args) => {
    if (timerDebounce) {
      clearTimeout(timerDebounce);
    }
    timerDebounce = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

}

const findFood = async () => {

  if (!inputSearchFood.value) {
    page = 0;
    foods.value = []
    getFoods()
    return
  }

  const query = {
    page: page,
    search: inputSearchFood.value || ''
  }

  await foodStore.fetchFoods(query);
  const storeFoods = foodStore.getFoods
  foods.value = storeFoods ? [...storeFoods] : []

  setNotFoundFoods()
}

const addFoodToMeal = (item) => {
  router.push(`/meal/${route.params.id}/food/${item.id}`);
}

const debounceFindFood = debounce(findFood, 600)

</script>
<template>
  <div class="main">
    <nav class="nav">
      <VButtonArrowLeft class="arrow-left" @click="back()" />
      <span class="title">Alimentos</span>
      <span></span>
    </nav>
    <section class="search-input-box">
      <VInputIcon :data="inputSearchFood" :hasIcon="true" iconName="bi bi-search" v-model="inputSearchFood.value"
        @input="debounceFindFood()" />
    </section>
    <section class="list-foods" v-if="!notFoundFoods">
      <VButton class="food" v-for="item in foods" :text="item.description" @click="addFoodToMeal(item)" />
    </section>
    <section class="not-found-foods" v-if="notFoundFoods">
      <span>Nenhum Resultado para esta pesquisa, tente buscar por outro alimento...</span>
    </section>
    <VButton class="more-food" @click="getFoods()" text="+ Alimentos" :disabled="notFoundFoods" />
  </div>
</template>
<style scoped>
.main {
  color: white;
  background-color: var(--bg-color-dark);

  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;

  .search-input-box {
    margin: 0 20px;
  }

  .not-found-foods {
    text-align: center;
    padding: 50px 0;
  }

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
    padding: 10px 15px;
    height: 100%;
  }

  .arrow-left {
    display: flex;
  }

  .food {
    background-color: var(--bg-color-dark);
    margin: 20px 0;
    padding: 20px;
    border-left: 2px solid var(--button-color-light);
    border-radius: 0;
  }

  .more-food {
    background-color: var(--bg-color-dark);
    margin-top: 20px;
    border-left: 3px solid var(--button-color-light);
    border-radius: 0;
    color: var(--button-color-light);

    &:disabled {
      opacity: 0.2;
    }
  }
}
</style>
