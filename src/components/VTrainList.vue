<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({
      title: 'CARDIO',
      minutes: 0,
      exercisesQty: 0,
      img: '',
      exercises: []
    })
  }
})
</script>

<template>
  <div class="card-exercise">
    <div class="card-exercise-infos">
      <div class="infos">
        <h6 class="title">{{ data.title }}</h6>
        <p class="minutes">{{ `${data.minutes ? data.minutes + 'minutos' : ''}` }}</p>
        <p class="qtd">{{ `${data.exercisesQty ? data.exercisesQty + 'exercícios' : ''}` }}</p>

        <div class="box-exercises">
          <p class="exercise" v-for="exercise in data.exercises" :key="exercise.id">
            {{ exercise.name }} 
          </p>
        </div>
      </div>
      <!--TODO fazer fotos referente a exercicios
         <img :src="data.img" class="card-exercise-img" :alt="`card img of ${data.title}`" /> -->
      <!-- <div class="card-exercise-img-overlay"></div> -->
    </div>
  </div>
</template>

<style scoped>
.card-exercise {
  position: relative;
  width: 100%;
  max-width: 500px;
  cursor: pointer;
  padding: 20px;
  height: 100%;
  min-height: 180px;
  background-color: var(--bg-color-dark5);

  font-size: 15px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 8px;

  .card-exercise-infos {
    background-color: var(--bg-color-dark5);
    height: 100%;

    .infos {
   
      z-index: 10;

      .title {
        color: var(--text-color-highlighted2);
      }
    }
  }

  .card-exercise-img {
    position: absolute;
    top: 0;
    right: -20%;
    width: 80%;
    height: 100%;
    z-index: 1;
  }

  .card-exercise-img-overlay {
    position: absolute;
    top: -15px;
    left: 90px;
    width: 45%;
    height: 115%;
    z-index: 3;
    background: linear-gradient(to right, var(--bg-color-dark5), rgb(0, 0, 0));
    filter: blur(9px);
  }

  .border-highlight {
    border: 2px solid var(--text-color-highlighted2);
  }

  .title {
    color: var(--text-color-light);
  }

  .minutes {
    color: var(--text-color-light);
  }

  .qtd {
    color: var(--bg-color-grey2);
    margin-bottom: 8px;
    margin-top: 28px;
  }

  .box-exercises {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .exercise {
      background-color: var(--text-color-highlighted2);
      border-radius: 20px;
      padding: 5px 10px;
      color: var(--text-color-light);
    }
  }
}
</style>
