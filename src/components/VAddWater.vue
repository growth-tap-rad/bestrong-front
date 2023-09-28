<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits()

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});


const handleClickOutside = () => {
  
    emit('showAddWater', parseInt(0))
      inputValue.value = ''
};
const sendValue = () => {

    emit('showAddWater', parseInt(inputValue.value))
    inputValue.value = ''
}

const inputValue = ref('')


</script>

<template>
    <div class="bg" v-show="props.show" @click="handleClickOutside"></div>
    <div class="main" v-if="props.show">
        <h1 class="h1-add-water">Água</h1>
        <input v-model="inputValue" class="input-add-water" type="text" placeholder="200 ml">
        <button type="number" class="btn btn-primary button-add-water" @click="sendValue">Adicionar</button>
    </div>
</template>

<style scoped>
.bg {
    display: block;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.651);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
}

.main {

    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    gap: 30px;
    background-color: var(--bg-color-dark3);
    color: var(--text-color-light);
    width: 100%;
    height: 15em;
    position: fixed;
    bottom: 0;
    z-index: 5;

    .button-add-water {
        border-radius: 50px;
        padding: 20px;
        text-transform: uppercase;
        background-color: var(--button-color-light);
    }

    .input-add-water {
        border-radius: 5px;
        padding: 10px 20px;
    }

    .h1-add-water {
        font-size: 20px;


    }
}
</style>