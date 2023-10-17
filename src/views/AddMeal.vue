<script setup>
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
</script>

<template>
   <div class="meal">
      <header>
     
      </header>
      <main>
         <VInput class="input" />

         <section class="macrosValue">
            <p class="pragrafValue">0</p>
            <p class="pragrafValue">0</p>
            <p class="pragrafValue">0</p>
            <p class="pragrafValue">0</p>
         </section>

         <section class="macrosList">
            <p class="pragrafMacros">Kcal</p>
            <p class="pragrafMacros">Prot</p>
            <p class="pragrafMacros">Carb</p>
            <p class="pragrafMacros">Gord</p>
         </section>

         <section class="time">
            <p>Horario</p>
            <p>8:00</p>
         </section>

         <section class="mealsList">
            <P class="valor">Pão</P>
            <p class="valor">50g</p>
         </section>

         <VButton :text="`+ Adicionar Alimento`" class="button" />
      </main>

   </div>
</template>


<style scoped>
.meal {
   background-color: var(--bg-color-dark);
   width: 100%;
   min-height: 100vh;
   height: 100%;
   align-items: center;

   .input {
      margin-bottom: 20px;
   }

   .macrosList {
      display: flex;
      color: var(--text-color-light);
      background-color: var(--bg-color-grey);
      justify-content: center;
      align-items: center;
      gap: 30px;

   }

   .macrosValue {
      display: flex;
      color: var(--text-color-light);
      background-color: var(--bg-color-grey);
      justify-content: center;
      align-items: center;
      gap: 55px;
   }

   .pragrafValue {
      margin-top: 20px;
   }

   .time {
      display: flex;
      color: var(--text-color-light);
      justify-content: center;
      justify-content: space-between;
      padding: 30px;
      margin-top: 30px;
   }

   .mealsList {
      background-color: var(--bg-color-grey);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 30px;
      width: 100%;
      height: 60px;
      color: var(--text-color-light);
      border-radius: 8px;
      margin: auto;
      margin-bottom: 20px;

      .valor {
         margin: 0;
      }
   }
}
</style>