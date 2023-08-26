<script setup>

defineProps({
  data: {
    title: {
      type: String,
      default: "Title",
    },
    text: {
      type: String,
      default: "Texto",
    },
    bg: {
      type: String,
    }
  }
});

</script>

<template>
  <div class="card text-bg-dark">
    <div class="box-overlay"></div>
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
    color: var(--text-color-light);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.939);
  }

  .text {
    color: var(--text-color-light2);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.872)
  }
}
</style>