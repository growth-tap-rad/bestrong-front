<template>
  <div class="progress-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="37 -5 120 100" width="150" height="130">
      <path class="grey" d="M55,90
               A55,55 0 1,1 140,90" style="fill:none;" />

      <path class="red" d="M55,90
               A55,55 0 1,1 140,90" style="fill:none;"
        :style="{ 'stroke-dasharray': dasharray, 'stroke-dashoffset': dashoffset }" />    
    </svg>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
});

const radius = 55;
const circumference = 250; // 2 * Math.PI * radius;
const dasharray = ref(circumference);
const dashoffset = computed(() => circumference * (1 - (props.percentage) / 100));
</script>

<style scoped>

path {
  stroke-linecap: round;
  stroke-width: 6;
}

.grey {
  stroke: #e5e5e5;
  border: 1px solid var(--text-color-highlighted2);
  /* deixar essa cor transaprente so aparecendo as bordas */
}

.red {
  stroke: var(--text-color-highlighted2);
  /* stroke-dasharray: 250;
  stroke-dashoffset: 250; */
}
</style>