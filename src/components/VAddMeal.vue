<script setup>
import { useRouter } from 'vue-router';
import VButton from './VButton.vue';
import VtitlePage from './VtitlePage.vue';
import { useDietStore } from '../stores/diet.store';

const dietStore = useDietStore()
const router = useRouter()
const emit = defineEmits()

const props = defineProps({
  data: {

    meals: {

      type: Array, required: true, default: () => [
        {
          title: 'Cafe Da Manha',
          id: 0
        }

      ]
    }
  }
}


);


const handleClickOutside = () => {

  dietStore.setShowComponentMeal(false)
};

const emitId = (id) => {
  handleClickOutside()
  emit('selectedMeal', id)
}
const goToAddMeal = (e) => {
  handleClickOutside()
  router.push('/meal')
}

</script>

<template>
  <div>

    <div class="bg" v-show="dietStore.getShowComponentMeal" @click="handleClickOutside"></div>
    <div class="main" v-if="dietStore.getShowComponentMeal">
      <header class="title">
        <VtitlePage :title="'Adicionar elemento'" />
        <span>Escolha uma refeição para continuar</span>
      </header>

      <div class="meals">
        <button v-for="meal in props.data.meals" class="meal" @click="emitId(meal.id)">
          {{ meal.title }}
        </button>
        <VButton class="add-meal" text="+ Nova Refeição" @click="goToAddMeal" />
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

 .main {
   z-index: 5;
   position: fixed;
   display: flex;
   flex-direction: column;

   bottom: 0;
   width: 100%;
   height: 80%;

   background-color: var(--bg-color-dark);

   .title {
     padding: 10px 0;
     text-align: center;
     color: var(--text-color-light);
   }

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
       width: auto;
       margin: 30px 10px;
     }
   }
 }
</style>
