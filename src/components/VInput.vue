<template>
  <div class="inputs">
    <label :for="data.title" class="label">{{ data.title }}</label>
    <input @input="$emit('update:modelValue', $event.target.value)" :type="data.type" :id="data.title" class="input"
      :placeholder="data.placeholder" v-if="data.mask" v-mask="mask" />
    <input @input="$emit('update:modelValue', $event.target.value)" :type="data.type" :id="data.title" class="input"
      :placeholder="data.placeholder" v-else />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      placeholder: '',
      type: 'text',
      mask: '',
    }),
  },
});

const mask = computed(() => {
  return `${props.data.mask}`;
});
</script>

<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;


  .label {
    color: var(--bg-color-light);
    padding: 15px;

  }

  .input {
    padding: 10px;
    border-radius: 8px;


  }
}
</style>
