<script setup>

defineProps({
  data: {
    type: Object,
    default: () => ({
      title: "Title",
      text: "Texto",
      bg: '',
      value: '',
      selected: false
    })
  }
});

</script>

<template>
  <div :value="data.value" class="card text-bg-dark" @click="$emit('update', data.value)">
    <div class="box-overlay" :class="{'border-highlight':data.selected}"></div>
    <img :src="data.bg" class="card-img" :alt="`card img of ${data.title}`">
    <div class="card-img-overlay custom">
      <h5 class="card-title title">{{ data.title }}</h5>
      <p class="card-text text">{{ data.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  width: 100%;
  max-width: 500px;
.border-highlight{
  border: 2px solid var(--text-color-highlighted2);
}
  .box-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.178));
    z-index: 5;
  }

  .custom {
    bottom: 0;
    top: inherit;
    text-align: center;
  }

  .title {
    color:var(--text-color-light);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.939);
  }

  .text {
    color:var(--text-color-light);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.872)
  }
}
</style>