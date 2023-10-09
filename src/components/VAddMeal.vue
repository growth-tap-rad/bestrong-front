<script setup>
import VButton from './VButton.vue';
import VtitlePage from './VtitlePage.vue';
import { ref, defineEmits } from 'vue';
const emit = defineEmits()

const props = defineProps(
  {
    show: {
      type: Boolean,
      default: false
    },
    meals: {

      type: Array, required: true, default: () => [
        {
          title: 'Café da manahã',
          value: 'cafeDaManha'
        },
        {
          title: 'Almoço',
          value: 'almoco'
        },
        {
          title: 'lanche',
          value: 'lanche'
        },
        {
          title: 'janta',
          value: 'janta'
        }
      ]
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
const changeValue = (e) => {
  inputValue.value = e
}
const inputValue = ref('')

</script>

<template>
  <div class="bg" v-show="props.show" @click="handleClickOutside"></div>
  <div class="main" v-if="props.show">
    <header class="title">
      <VtitlePage :title="'Adicionar elemento'" />
      <span>Escolha uma refeição para continuar</span>
    </header>

    <div class="meals">
      <button v-for="meal in props.meals" :key="meal.value" class="meal" @click="changeValue(meal.value)">
        {{ meal.title }}
      </button>


      <VButton class="add-meal" :text="'ADICIONAR ALIMENTO'" @click="sendValue" />
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
