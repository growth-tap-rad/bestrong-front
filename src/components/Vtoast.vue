
<script setup>
import { useAppStore } from '../stores/app.store'
const appStore = useAppStore()

const closeToast = () => {
  appStore.setToastShow(false) 
}
</script>

<template>
  <div class="bg" v-show="appStore.getToastShow" @click="closeToast()">
    <div :class="['toast', { 'show': true }]" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">{{ appStore.getMessage }}</strong>
        <button @click="closeToast()" type="button" class="ml-2 mb-1 close btn white" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{ appStore.getToastDescription }}
      </div>
    </div>
  </div>
</template>

<style>
.bg {
  display: flex;
  position: fixed;
  background-color: var(--bg-color-dark4);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;

  .toast {
    z-index: 5;
    margin: 30px auto;
    color: var(--text-color-light2);
    width: 350px;
    min-width: 300px;
    height: 120px;
    background-color: var(--bg-color-dark);

    .toast-header {
      justify-content: space-between;
      color: var(--text-color-light2);
      background-color: var(--bg-color-dark4);
      .white{
        color: var(--text-color-light);
      }
    }

  }
}
</style>