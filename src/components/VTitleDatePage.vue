<script setup>

defineProps({
  title: {
    type: String,
    default: "Diário",
  }
})

const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const currentDate = new Date();

const dayOfWeek = daysOfWeek[currentDate.getDay()];
const dayOfMonth = currentDate.getDate();
const month = months[currentDate.getMonth()];

const formattedDate = `${dayOfWeek}, ${dayOfMonth} de ${month}`;

</script>

<template>
  <nav class="box-title-date">
    <i class="bi bi-chevron-left icon"></i>
    <div>
      <h3 class="title">{{ title }}</h3>
      <p class="date mb-0">{{ formattedDate.toUpperCase() }}</p>
    </div>
    <i class="bi bi-chevron-right icon"></i>
  </nav>
</template>

<style scoped>
.box-title-date {

  background-color: var(--bg-color-dark2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  padding: 15px 15px;

  .icon {
    padding: 15px;
    color: var(--text-color-light2);
  }

  .title {
    color: var(--text-color-light);
  }

  .date {
    color: var(--text-color-light2);
  }
}
</style>