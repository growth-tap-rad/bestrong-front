<script setup>
defineProps({
  data: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
})
</script>

<template>
  <div class="inputs" id="datepicker">
    <label for="date" class="label">{{ data.title }}</label>
    <input type="date" class="input" id="date"/>
  </div>
</template>

<style scoped>

.inputs{
    display: flex;
    flex-direction: column;
    width: 100%;
    

.label{
    color: var(--bg-color-light);
    padding: 15px;

}
.input{
padding: 10px;
border-radius: 8px;
}
}
</style>
