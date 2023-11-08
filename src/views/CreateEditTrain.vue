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
  if (route.params.id) {
    const foundTrain = await trainStore.findTrain(route.params.id)
    train.value = foundTrain
    data.value = new Date(train.value.created_at)

  }
})
const showToast = (error) => {
  console.error('Erro: ', error.error)
  const appStore = useAppStore()
  appStore.setToast({
    show: true,
    message: error.message,
    description: error?.error?.response?.status
      ? 'Não autorizado'
      : error.description || 'Falha de comunicação'
  })
}
const back = () => {
  router.push('/diet')
}

const updateTrain = (e) => {
  train.value.name = e
}
const createTrain = async () => {
  return await trainStore.createTrain({
    name: train.value.name,
  
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

          })
          .then(() => {
            router.push('/diet')
            return
          })
      }
    } else {

      train.value = await createTrain()
    }
  } else {
    showToast({
      message: 'Alerta',
      description: 'Digite um nome para a treino'
    })
    return
  }
}




</script>

<template>
  <div class="train">
    <header class="header">
      <VButtonArrowLeft @click="back" />
      <VtitlePage class="title" :title="'Treino'" />
    </header>
    <main class="main">
      <VInput :value="train.name" @update="(e) => updateTrain(e)" class="input" />


      <section class="trainsList">
        <section class="exerciseItems">
          <div v-for="train_exercise in train.train_exersice" :key="train_exercise.id" class="exerciseItem">
            <span class="oveflow">{{ train_exercise.name }}</span>
          </div>
        </section>
      </section>
      <VButton @click="addTrain" text="+ Adicionar exercicio" class="add-exercise" />
      <VButton @click="editTrain" text="Salvar Treino" class="button" />
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

  .exerciseItems {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .exerciseItem {
      color: var(--text-color-light);
      background-color: var(--bg-color-dark3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      border-radius: 5px;
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
