<script setup>
const emit = defineEmits()

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      placeholder: '',
      type: 'text',
      value: ''
    })
  },
  hasIcon: false,
  iconName: {
    type: String,
    default: "bi bi-envelope"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isValid: {
    type: Boolean,
    default: false
  },
  isPassword: {
    type: Boolean,
    default: false
  },
})

const changeToText = () => {
  if(!props.isPassword) return
  emit('changeTypePassword')
}
</script>

<template>
  <div class="inputs">
    <label :for="data.title" class="label" v-if="data.title">{{ data.title }}</label>
    <div v-if="hasIcon" class="box-input">
      <i :class="[iconName, 'icon', { 'disabled': disabled }]" @click="changeToText"></i>
      <input :disabled="disabled" :type="data.type" :id="data.title" class="input" :class="{ isValid: isValid }"
        :placeholder="data.placeholder" :value="data.value" @input="$emit('update:modelValue', $event.target.value)" />
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
    padding: 15px 0;

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

      &:disabled {
        opacity: 0.2;
      }

      &.isValid {
        border: 1px solid var(--text-color-red);
      }
    }

    .icon {
      padding: 0;
      font-size: 20px;
      top: calc(50% - 15px);
      left: 15px;
      color: var(--text-color-light2);
      position: absolute;

      &.disabled {
        opacity: 0.2;
      }
    }
  }
}</style>
