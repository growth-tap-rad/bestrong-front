<script setup>
import { ref, computed } from 'vue'
import { useFoodStore } from '../stores/food.store'

const emit = defineEmits()
const foodStore = useFoodStore()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      id: 0,
      title: '',
      isWater: true,
      quantity: 0,
      meal_consumed_kcal: 0,
      items: []
    })
  }
})

let openAccord = ref(false)

const open = () => {
  if (props.data.isWater) {
    emit('showAddWater')
    return
  }
  openAccord.value = !openAccord.value
}

const unity = computed(() => {
  return props.data.isWater ? 'ml' : 'kcal'
})

const getUnity = (unityText) => {
  return foodStore.transformUnity(unityText, true)
}

const calcQuantity = (qtd, amount, desc) => {
  return foodStore.transformQuantity(qtd, amount, desc)
}
</script>

<template>
  <section class="accordion box-meal" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" :class="{ show: openAccord }" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" @click="open()">
          <div class="MealAndQuantity">
            <span class="meal">{{ props.data.title }} </span>
            <span class="quantity">Consumido {{ props.data.quantity }} {{ unity }}</span>
          </div>
        </button>
      </h2>
      <div id="collapseOne" :class="['accordion-collapse collapse', { show: openAccord }]"
        data-bs-parent="#accordionExample">
        <div>
          <div class="accordionMeals">
            <div class="MealAndQuantity" v-for="item in data.items" :key="item.id">
              <span>{{ item.name }} </span>
              <div class="unity">
                <span>{{ calcQuantity(item.quantity, item.amount, item.unity) }} </span><span>{{ getUnity(item.unity)
                }}</span>
              </div>
            </div>
            <button @click="$emit('showAddFood', data.id)" class="addQtdWater">
              + Adicionar Alimento
            </button>
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
  background-color: var(--bg-color-dark5);
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
  align-items: center;

  .unity {
    display: flex;
    gap: 5px;
  }
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
  margin-top: 20px;
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
