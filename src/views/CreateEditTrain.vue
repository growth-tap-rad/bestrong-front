<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTrainStore } from '../stores/train.store'
import VButton from '../components/VButton.vue'
import VInput from '../components/VInput.vue'
import VtitlePage from '../components/VtitlePage.vue'
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue'
import { useAppStore } from '../stores/app.store'

const router = useRouter()
const route = useRoute()
const data = ref(new Date())
const trainStore = useTrainStore()
const train = ref({})

onMounted(async () => {
  fetchMeal()
})
const fetchMeal = async () => {
  if (route.params.id) {
    const foundTrain = await trainStore.findTrain(route.params.id)
    train.value = foundTrain
    data.value = new Date(train.value.created_at)
  }
}

const showToast = (error) => {
  if (error) {
    console.error('Erro: ', error?.error || error)
  }
  const appStore = useAppStore()
  appStore.setToast({
    show: true,
    message: error.message,
    description: chooseMessage(error)
  })
}

const chooseMessage = (error) => {
  switch (error?.error?.response?.status) {
    case 401:
      return 'Não autorizado';
    case 500:
      return 'Ops, Ocorreu um erro';
    default:
      return error.description || 'Falha de comunicação';
  }
}

const back = () => {
  router.push('/trains')
}

const createTrain = async () => {
  const appStore = useAppStore()

  return await trainStore.createTrain({
    name: train.value.name,
    date: appStore.getCurrentQueryDate,
  })
}

const addTrain = async () => {
  if (!train.value.name) {
    showToast({
      message: 'Alerta',
      description: 'Digite um nome para o treino'
    })
    return
  }

  if (route.params.id) {
    goToExercices(route.params.id)
    return
  } else if (train.value.id) {
    goToExercices(train.value.id)
    return
  }
  const data = await createTrain()

  goToExercices(data.id)
}

const goToExercices = (id) => {
  router.push(`/train/${id}/exercises`)
}

const editTrain = async () => {
  if (train.value.name) {
    if (route.params.id) {
      {
        trainStore
          .editTrain({
            id: route.params.id,
            name: train.value.name,

          })
          .then(() => {
            router.push('/trains')
            return
          })
      }
      return
    }
    await createTrain()
    router.back()
    return
  }
  return showToast({
    message: 'Alerta',
    description: 'Digite um nome para a treino'
  })
}

const deleteTrainExercise = (id) => {
  trainStore.deleteTrainExercise(id).then(() => {
    fetchMeal()
  })
}
const deleteTrain = async () => {

  const exercisesToDelete = train.value.trains_exercises.map(async exercise => {
    return await trainStore.deleteTrainExercise(exercise.id)
  });
  await Promise.all(exercisesToDelete)

  trainStore.deleteTrain(route.params.id).then(() => {
    router.push('/trains')
  })
}
const editTrainExercise = (id) => {
  router.push(`/train/${route.params.id}/exercise/${id}`)
}
const updateTrainName = (e) => {
  train.value.name = e
}

</script>

<template>
  <div class="train">
    <header class="header">
      <VButtonArrowLeft @click="back" />
      <VtitlePage class="title" :title="'Treino'" />
    </header>
    <main class="main">
      <VInput :value="train.name" :data="{ placeholder: 'Nome do treino' }" @update="(e) => updateTrainName(e)"
        class="input" />
      <section class="trainsList">
        <section class="exerciseItems">
          <div class="exercise" v-for="train_exercise in train.trains_exercises">
            <div @click="editTrainExercise(train_exercise.id)" :key="train_exercise.id" class="exerciseItem">
              <span class="oveflow">{{ train_exercise.name }} </span>

            </div> <button class="delete" @click="deleteTrainExercise(train_exercise.id)"><i
                class="bi bi-trash3"></i></button>
          </div>


        </section>
      </section>
      <VButton @click="addTrain" text="+ Adicionar exercicio" class="add-exercise" />
      <VButton @click="editTrain" text="Salvar Treino" class="button" />
      <VButton v-show="route.params.id" @click="deleteTrain" text=" Excluir Treino " class="delete-train" />
    </main>
  </div>
</template>

<style scoped>
p {
  color: white;
}

.train {
  background-color: var(--bg-color-dark);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .delete-train {
    background-color: transparent;
    text-align: center;
    padding: 40px 0;
  }

  .header {
    display: flex;
    align-items: center;

    .title {
      margin: 0 auto;
      padding-right: 40px;
    }

    .spam {
      color: transparent;
    }
  }

  .add-exercise {
    background-color: transparent;
    text-align: justify;
    padding: 40px 0;
  }

  .input {
    margin-bottom: 20px;
  }

  .title {
    text-align: center;
  }

  .exercise {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    margin: 10px 0;
    align-items: center;

    .exerciseItem {
      cursor: pointer;
      width: 100%;
      color: var(--text-color-light);
      background-color: var(--bg-color-dark3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      border-radius: 5px;
      flex-direction: column;

    }

    .delete {
      border: none;
      color: var(--text-color-light);
      background: transparent;
      width: 40px;
      height: 40px;
      font-size: 25px;
    }
  }

  .oveflow {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }

}
</style>
