<script setup>
import { Transition, ref, computed } from 'vue';
/* import DashboardDiet from '../components/DashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue'; */

let openAccord = ref(false);

function open() {
  openAccord.value = !openAccord.value
}
function addWater() {
  alert("Clicou")
}

const props = defineProps({
  data: {
    title: "",
    isWater: true,
    quantity: "",
    items: []
  }

})

const unity = computed(() => {
  return props.data.isWater ? "ml" : "kcal"
})
</script>

<template>
  <section class="accordion box-meal" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" :class="{ 'show': openAccord }" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" @click="open()">
          <div class="MealAndQuantity">
            <span class="meal">{{ props.data.title }}</span>
            <span class="quantity">Consumido {{ props.data.quantity }} {{ unity }}</span>
          </div>
        </button>
      </h2>
      <div id="collapseOne" :class="['accordion-collapse collapse', { 'show': openAccord }]"
        data-bs-parent="#accordionExample">
        <div class="accordion-body" v-if="props.data.isWater">
          <button class="addQtdWater" @click="addWater()">+ Adicionar Água</button>
        </div>
        <div v-else>
          <div class="accordionMeals">
            <div class="MealAndQuantity " v-for="item in data.items"><span>{{ item.name }} </span><span>{{ item.quantity
            }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.box-meal {
  width: 100%;
}

.accordion-item {
  border-radius: 10px;
  background-color: var(--bg-color-dark3);
  color: var(--text-color-light);
  border: none;
}

.accordion-button {
  background-color: #101112;
  display: block;
  box-shadow: none;
  border-radius: 10px;

}

.accordionMeals {
  width: 100%;
  padding: 20px;
}

.MealAndQuantity {
  width: 100%;
  display: flex;
  justify-content: space-between;

}



.meal {
  color: var(--button-color-light);
  font-weight: 400;
}

.quantity {
  color: var(--text-color-light);
}

.addQtdWater {
  color: var(--text-color-light);
  background: transparent;
  border: none;

}

.accordion-item:first-of-type .accordion-button {
  border-radius: 10px 10px;

}

.accordion-item:first-of-type .accordion-button.show {
  border-radius: 10px 10px 0 0;
}

.accordion-button:focus {
  box-shadow: none;
}
</style>