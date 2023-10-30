<script setup>
import { useRouter } from 'vue-router';
import VButton from './VButton.vue';
import VtitlePage from './VtitlePage.vue';
import { ref } from 'vue';

const router = useRouter()
const emit = defineEmits()
const inputValue = ref('')
const props = defineProps({
  data: {
    showComponentAddMeal: {
      type: Boolean,
      default: false
    },
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

  emit('showAddMeal')
  inputValue.value = ''
};
const sendValue = () => {
  emit('showAddMeal', inputValue.value)
  inputValue.value = ''
}

const createEditMeal = (create = false, id) => {

  if (create) {
    router.push(`/meal`);
    return
  }
  return router.push(`/meal/edit/${id}`);
}

</script>

<template>
  <div class="bg" v-show="props.data.showComponentAddMeal" @click="handleClickOutside"></div>
  <div class="main" v-if="props.data.showComponentAddMeal">
    <header class="title">
      <VtitlePage :title="'Adicionar Refeição'" />
      <span>Escolha uma refeição para continuar</span>
    </header>

    <div class="meals">
      <button v-for="meal in props.data.meals" class="meal" @click="createEditMeal(false, meal.id)">
        {{ meal.title }}
      </button>
      <!-- <button class="meal" @click="goToAddMeal">+ Nova Refeição</button> -->

      <VButton class="add-meal" text="+ Nova Refeição" @click="createEditMeal(true)" />
    </div>
  </div>
</template>
<style scoped> .bg {
   display: block;
   position: fixed;
   background-color: var(--bg-color-dark4);
   top: 0;
   left: 0;
   height: 100%;
   width: 100%;
   z-index: 2;
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
