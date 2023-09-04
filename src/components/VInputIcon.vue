<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      placeholder: '',
      type: 'text'
    })
  },
  hasIcon: false,
  iconName: {
    type: String,
    default: "bi bi-envelope"
  }
})
</script>

<template>
  <div class="inputs">
    <label :for="data.title" class="label">{{ data.title }}</label>
    <div v-if="hasIcon" class="box-input">
      <i :class="[iconName, 'icon']"></i>
      <input :type="data.type" :id="data.title" class="input" :placeholder="data.placeholder" @input="$emit('update:modelValue', $event.target.value)"/>
    </div>
  </div>
</template>

<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;


  .label {
    color: var(--bg-color-light);
    padding: 15px;

  }

  .box-input {
    position: relative;

    .input {
      padding: 10px 10px 10px 45px;
      border-radius: 8px;
      background-color: var(--bg-color-grey);
      color: var(--text-color-light2);
      border: none;
      width: 100%;
    }

    .icon {
      padding: 0;
      font-size: 20px;
      top: calc(50% - 15px);
      left: 15px;
      color: var(--text-color-light2);
      position: absolute;
    }
  }
}
</style>
