<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useFoodStore } from '../stores/food.store'
import VButton from '../components/VButton.vue';
import { useRoute, useRouter } from 'vue-router';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VtitlePage from '../components/VtitlePage.vue';
import VInput from '../components/VInput.vue';

const qtdMeal = ref(0)
const unity = ref('')
const router = useRouter()
const route = useRoute()
const foodStore = useFoodStore()
const food = ref({})
const measures = ref([])

const back = () => {
  router.back()
}

const addFoodToMeal = () => {

  foodStore.createMealFood({
    name: food.value.description,
    unity: unity.value,
    quantity: qtdMeal.value,
    food_id: route.params.idfood,
    meal_id: route.params.id
  }).then((data) => {
    console.log(data)
  })

}
onMounted(async () => {
  food.value = await foodStore.getFood(route.params.idfood)
  const measur = await foodStore.getMeasure(route.params.idfood)
  measur.forEach(element => {
    measures.value.push({
      text: element.description,
      value: element.amount
    })
  });
})

</script>


<template>
  <div class="main">
    <header class="header">
      <VButtonArrowLeft @click="back()" />
      <VtitlePage class="title" :title="'Refeição'" />
      <span class="spam"></span>
    </header>
    <main class="food">
      <section>
        <div class="header-food">
          <h2>{{ food.description }}</h2>
        </div>
        <div class="body-food">
          <div class="inputs">
            <input placeholder="0" class="input-number" v-model="qtdMeal" type:number />
            <!--     mudar o componente VDropdown para receber o option default como prop -->
            <select class="input-measure" v-model="unity">
              <option selected disabled class="option">Selecione uma medida</option>
              <option v-for="(item, index) in  measures" class="option" :value="item.value" :selected="item.selected">
                {{
                  item.text }} </option>
            </select>

            <div class="quantity-information">
              <h3 class="number-macros">80</h3>
              <span>Gramas</span>
            </div>

          </div>
          <div class="macros">
            <div class="top">
              <span><span class="number-macros">{{ food.energy }} </span>kcal</span>
              <span> <span class="number-macros">{{ food.protein }} </span>Prot</span>
              <span> <span class="number-macros">{{ food.carb }} </span>Carb</span>

            </div>
            <div class="bottom">
              <span> <span class="number-macros">{{ food.fat }} </span>Gord</span>
              <span> <span class="number-macros">{{ food.fiber }} </span>Fibra</span>
              <span> <span class="number-macros">{{ food.sodium }} </span>Sodio</span>

            </div>
          </div>
        </div>
      </section>
      <VButton @click="addFoodToMeal()" text="Adicionar" class="button" />
    </main>

  </div>
</template>

<style scoped>
.main {
  background-color: var(--bg-color-dark);
  color: var(--text-color-light);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .spam {
      color: transparent;
    }
  }

  .header-food {
    background-color: var(--bg-color-dark5);
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .body-food {
    .number-macros {
      color: var(--button-color-light);
    }

    .inputs {
      display: flex;
      padding: 30px;
      gap: 20px;

      .input-number {
        width: 4em;
        padding: 10px;
        border-radius: 8px;
        background-color: var(--bg-color-grey);
        color: var(--text-color-light2);
        border: none;
      }

      .input-measure {
        padding: 10px;
        border-radius: 8px;
        background-color: var(--bg-color-grey);
        color: var(--text-color-light2);
        border: none;
        width: 100%;
        padding: 10px;

      }

      .quantity-information {
        display: flex;
        flex-direction: column;
        text-align: center;


      }
    }
  }

  .macros {

    display: flex;

    justify-content: space-between;
    gap: 100px;
    margin: 20px;

    .top,
    .bottom {
      font-size: large;
      width: 100%;
      display: flex;
    }
  }

  .macros * {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 25px;
  }

  .title {
    text-align: center;
  }
}
</style>