<script setup>
import { useRouter } from 'vue-router'
import VButtonBottomOptions from './VButtonBottomOptions.vue'
import { ref } from 'vue'
import { useDietStore } from '../stores/diet.store'
const dietStore = useDietStore()

const router = useRouter()


defineProps({
  actualRoute: {
    type: String,
    default: '/diet'
  }
})

const goTo = (route) => {
  router.push(route)
}
const showButtonBottomOptions = () => {
  dietStore.setShowComponentMenuOptions(!dietStore.getShowComponentMenuOptions)
}
const handleClickOutside = () => {
  dietStore.setShowComponentMenuOptions(false)
}
</script>

<template>
  <div class="footer">
    <div class="bg" v-if="dietStore.getShowComponentMenuOptions" @click="handleClickOutside"></div>
    <VButtonBottomOptions  :class="{ 'button-bottom-bptions': show }" />

    <div class="buttons-options">
      <div class="buttons-options-children">
        <button
          class="botoesBarraInferior"
          :class="{ active: actualRoute === '/diet' }"
          @click="goTo('/diet')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"
              fill="#626463"
            />
          </svg>
          <span class="text" v-show="actualRoute === '/diet'">Dieta</span>
        </button>
        <button
          class="botoesBarraInferior"
          :class="{ active: actualRoute === '/train' }"
          @click="goTo('/train')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"
              fill="#626463"
            />
          </svg>
          <span class="text" v-show="actualRoute === '/train'">Treino</span>
        </button>
      </div>
      <div class="buttons-options-children">
        <button
          class="botoesBarraInferior"
          :class="{ active: actualRoute === '/profile' }"
          @click="goTo('/profile')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              fill="#626463"
            />
          </svg>

          <span class="text" v-show="false">Dieta</span>
        </button>
        <button class="botoesBarraInferior">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
              fill="#626463"
            />
          </svg>
          <span class="text" v-show="false">Dieta</span>
        </button>
      </div>
    </div>

    <button
      @click="showButtonBottomOptions"
      class="botoesBarraInferior botaoMais"
      :class="{ deitado: show }"
    >
      +
    </button>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  background-color: var(--bg-color-dark3);
}

.button-bottom-bptions {
  display: block;
}

.buttons-options {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;

  .buttons-options-children {
    display: flex;
    align-items: center;
    gap: 10%;
    margin: 0;
  }
}

.botoesBarraInferior {
  border: none;
  background-color: transparent;
  padding: 10px;
  margin: auto;
  min-height: 49px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    color: var(--text-color-highlighted2);
    font-size: 15px;
  }
}

.botoesBarraInferior svg {
  width: 25px;
  height: 25px;
}

.botoesBarraInferior.active svg path {
  fill: var(--text-color-highlighted2);
}

.botaoMais {
  position: absolute;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--text-color-highlighted2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: var(--text-color-light);
  box-shadow: 0px 0px 0px 10px var(--bg-color-dark);
}

.deitado {
  transform: rotate(45deg);
}

@media (max-width: 600px) {
  .buttons-options {
    justify-content: space-between;
    padding: 5px 20px;
  }
}
</style>
