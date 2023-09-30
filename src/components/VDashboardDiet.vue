<script setup>
import { computed } from 'vue';
import VArcProgressBar from "./VArcProgressBar.vue"
import VProgressBar from './VProgressBar.vue';

const props = defineProps({
  dashInfo: {
    consumed: {
      type: Number,
      required: true,
    },
    burned: {
      type: Number,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
  },
  macros: {
    protein: {
      now: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    carb: {
      now: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    fat: {
      now: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  }
});

const calculatePercentage = (now, total) => {
  const calculatedPercentage = (now / total) * 100;
  const roundedPercentage = Math.min(Math.max(calculatedPercentage, 0), 100);

  return Math.round(roundedPercentage);
};

const macroPercentages = computed(() => {
  const { protein, carb, fat } = props.macros;

  return {
    protein: calculatePercentage(protein.now, protein.total),
    carb: calculatePercentage(carb.now, carb.total),
    fat: calculatePercentage(fat.now, fat.total),
  };
});

const remainingCaloriesAndPercentage = computed(() => {
  const { consumed, goal } = props.dashInfo;

  const remainingCalories = goal - consumed;

  let remainingPercent = calculatePercentage(remainingCalories, goal);
  remainingPercent = (100 - remainingPercent)
  return {
    remainingPercent,
    remainingCalories
  }
});

import benchpress from '@/assets/imgs/paused-bench-press.jpg';

</script>

<template>
  <div class="dashboard-diet">
    <div class="dash">
      <img :src="benchpress" alt="Imagem de fundo" class="background-img" />

      <div class="info consumed lateral">
        <h4 class="title">{{ props.dashInfo.consumed }}</h4>
        <span class="text">Consumidas</span>
      </div>
      <div class="info rest">

        <VArcProgressBar :percentage="remainingCaloriesAndPercentage.remainingPercent" class="progress-rest" />

        <div class="data">
          <span>Faltam</span>
          <h3 class="title">{{ remainingCaloriesAndPercentage.remainingCalories }}</h3>
          <span class="text">Kcal</span>
        </div>

      </div>
      <div class="info burned lateral">
        <h4 class="title">{{ props.dashInfo.burned }}</h4>
        <span class="text">Queimadas</span>
      </div>

      <p class="goal">Meta diária: {{ props.dashInfo.goal }} Kcal</p>
    </div>

    <section class="box-macros">
      <div class="box-progress">
        <h4 class="title">{{ props.macros.protein.now }} g/{{ props.macros.protein.total }} g</h4>
        <VProgressBar :percentage="macroPercentages.protein" />
        <span class="text">Proteína</span>
      </div>
      <div class="box-progress">
        <h4 class="title">{{ props.macros.carb.now }} g/{{ props.macros.carb.total }} g</h4>
        <VProgressBar :percentage="macroPercentages.carb" />
        <span class="text">Carboidrato</span>
      </div>
      <div class="box-progress">
        <h4 class="title">{{ props.macros.fat.now }} g/{{ props.macros.fat.total }} g</h4>
        <VProgressBar :percentage="macroPercentages.fat" />
        <span class="text">Gordura</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard-diet {
  color: var(--text-color-light2);

  .dash {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 200px;
    padding-top: 50px;
    position: relative;
    flex-wrap: wrap;

    .background-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      opacity: 0.2;
    }

    .info {
      text-align: center;
      z-index: 1;
    }

    .goal {
      color: white;
      text-align: center;
      width: 100%;
    }
  }


  .rest {
    position: relative;

    .title {
      color: var(--text-color-highlighted2);
    }

    .text {
      color: var(--text-color-highlighted);
    }

    .progress-rest {
      position: absolute;
      left: calc(50% - 75px);
      bottom: 0;

    }
  }

  .lateral {
    .title {
      color: var(--text-color-highlighted);
    }

    .text {
      color: var(--text-color-light2);
    }
  }
}

.box-macros {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  color: var(--text-color-light2);

  .box-progress {
    flex: 1;
    max-width: 100px;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;

    .progress {
      margin: 0 5px;
      height: 8px;

      .progress-bar {
        background-color: var(--text-color-highlighted2);
      }
    }

    .title {
      font-size: 17px;
      color: var(--text-color-light2);
    }

    .text {
      color: var(--text-color-highlighted);
    }
  }
}
</style>