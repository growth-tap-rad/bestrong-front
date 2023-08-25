<script setup>
import VAccordionMeal from '../components/VAccordionMeal.vue';
import VDashboardDiet from '../components/VDashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';

const dashInfo = {
  consumed: 50,
  burned: 50,
  goal: 1000
}

const macros = {
  protein: {
    now: 150,
    total: 200
    // ganhar peso: 2g p cada kilo 

    // manter peso e performace: 1.6g kilo

    // manutencao/manter: 2g kilo 

    // perder peso: 2g/ 2.2g kilo 

    // emagrecimento, muita gordura, sem musculatura, sobrepeso +-30%: 1.6g kilo   

    // gordao 40%+ : 1.4g kilo  
  },
  carb: {
    now: 0,
    total: 100
    // ganhar peso: 4g kilo (facilidade ganha peso)
    // ganhar peso: 5g ou 6g kilo (dificuldade ganha peso)
    // +1g kilo cada 2 sem se nao ganha peso

    // manter peso e performace: 5g, 6g kilo carbo
    // +0.5g kilo cada 2 sem se nao ganha peso 

    // manutencao/manter: 3g /4g kilo sem atividade -1g kilo de carb(2 ou 3)

    // perder peso: metade do de ganhar(bulk) 3g, iniciando agr metabolismo ok(2g 3g), 
    // tendencia perder peso(4g), metabolismo lento, ex obeso (2g kg)

    // emagrecimento, muita gordura, sem musculatura, sobrepeso +-30%: 1.6g kilo  

    // gordao 40%+ : 1.4g kilo  
  },
  fat: {
    now: 50,
    total: 50
    // ganhar peso: 1g kilo 

    // manter peso e performace: 0.4g kilo

    // manutencao/manter: 1g kilo , sem atividade 2g kilo

    // perder peso: 1g kilo 

    // emagrecimento, muita gordura, sem musculatura, sobrepeso +-30%: 0.8g kilo   

    // gordao 40%+ : 0.6g kilo  
  },
}


const ACTIVITY_LEVEL = {
  low: 1.55, // caminhar, limpar casa 1hr dia
  moderate: 1.84, // 1h atividade fisica, ou carteiro..
  intense: 2.2 // esportista 2h dia, trabalho manual, rural
}

const GOAL_WHEIGHT = {
  lose: 0, // todo
  gain: 0,
  maintain: 0
}


const tbm_man = ((wheight, cmHeight, age) => {
  return 66 + (13.7 * wheight) + (5 * cmHeight) - (6.8 * age);
})

const tbm_woman = ((wheight, cmHeight, age) => {
  return 665 + (9.6 * wheight) + (1.8 * cmHeight) - (4.7 * age);
})

const daily_burned_kcal = ((tbm, levelActivity) => {
  return tbm * levelActivity
})

console.log(tbm_man(80, 168, 23))
//console.log(daily_burned_kcal(tbm_man(80, 168, 23), ACTIVITY_LEVEL['low']))




</script>

<template>
  <section class="diet">
    <header class="header">
      <VTitleDatePage />
    </header>
    <main class="main">
      <VDashboardDiet :dashInfo="dashInfo" :macros="macros" />
    <!--   <div class="box-ingredients">
        <VAccordionMeal class="meal" title="Agua" :isWater="true" quantity="200"/>
        <VAccordionMeal class="meal" title="Café da tarde" :isWater="false" quantity="100"
          :items="[{ name: 'bacate', quantity: '10g' },{ name: 'iorgute', quantity: '400ml' }]" /> 
      </div>-->

    </main>
  </section>
</template>

<style scoped>
.diet {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
 /*  height: 100%;
  min-height: 100vh; */
  display: flex;
  flex-direction: column;



  .main {
    width: 100%;

    .box-ingredients {

      margin-top: 50px;


      .meal {
        padding: 5px 20px;
      }
    }

  }
}
</style>