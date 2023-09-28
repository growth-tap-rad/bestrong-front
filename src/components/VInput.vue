<script setup>
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
  value: ""
});

</script>

<template>
  <div class="inputs">
    <label :for="data.title" class="label" v-if="data.title">{{ data.title }}</label>
    <input @change="$emit('update', $event.target.value)" :type="data.type" :id="data.title" class="input"
      :placeholder="data.placeholder" :value="props.value"  v-if="data.mask"
      v-mask="data.mask"  />
    <input @change="$emit('update', $event.target.value)" :type="data.type" :id="data.title" class="input"
      :placeholder="data.placeholder" :value="props.value" v-else  />
  </div>
</template>



<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;


  .label {
    color: var(--bg-color-light);
    padding: 15px 0;

  }

  .input {
    padding: 10px;
    border-radius: 8px;
    background-color: var(--bg-color-grey);
    color: var(--text-color-light2);
    border: none;
    width: 100%;

  }
}
</style>
