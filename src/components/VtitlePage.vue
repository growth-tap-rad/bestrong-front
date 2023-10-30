<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()


defineProps({
  title: {
    type: String,
    default: "Titulo",
    required: true
  },
  actions: {
    type: Array,
    default: () => []
  },
})

const goTo = (route) => {
  if (!route) {
    return
  }
  if (route === 'back') {
    router.back()
    return
  }
  router.push(route)
}

</script>

<template>
  <div class="navgation">
    <i class="icon" :class="actions[0].btIcon ? actions[0].btIcon : 'bi bi-arrow-left-short'" v-if="actions[0]"
      @click="goTo(actions[0].goTo)"></i>
    <h2 class="title">{{ title }}</h2>
  </div>
</template>

<style scoped>
.navgation {
  width: 100%;
  display: flex;
  align-items: center;

  .title {
    color: var(--text-color-light);
    display: flex;
    margin: 0 auto;
    padding-right: 40px;
  }

  .icon {
    padding: 10px;
    font-size: 35px;
    color: var(--text-color-light2);
    cursor: pointer;
  }
}
</style>