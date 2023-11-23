<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useProfileStore } from '../stores/profile.store';
import VtitlePage from '../components/VtitlePage.vue';
import VBottomMenu from '../components/VBottomMenu.vue';
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
import VDropdown from '../components/VDropdown.vue';

const isEditing = ref(false)
const profileStore = useProfileStore()
let user = reactive({ name: '', weight: '00.00', height: '00', activityLevel: '', goal: '' })

onMounted(() => {
  getUserProfile()
})

const getUserProfile = () => {
  profileStore.getUser()
    .then((data) => {
      const progresses = data.progress
      const lastProgress = progresses[progresses.length - 1]

      user.name = data.name,
        user.height = lastProgress.height,
        user.weight = lastProgress.weight
      user.activityLevel = profileStore.getActivityLevelPt(lastProgress.activity_level)
      user.goal = profileStore.getGoalPt(lastProgress.goal)
    })
}

const actionsTitlePage = [
  {
    btIcon: '',
    goTo: '/diet'
  },
  {
    btIcon: '',
    goTo: '/diet'
  }
]


const updateProfile = () => {
  // Request to update profile..!

  //getUserProfile()
}

const updateValue = (value, newValue) => {
  user[value] = newValue
}

let inputSelectActivityLevel = ref([
  { text: 'Baixa', value: 'low', selected: user.activityLevel == 'Baixa' },
  { text: 'Moderada', value: 'moderate', selected: user.activityLevel == 'Moderada' },
  { text: 'Intensa', value: 'intense', selected: user.activityLevel == 'Intensa' }
])

let inputSelectGoal = ref([
  { text: 'Manter peso', value: 'maintain', selected: user.goal == 'Manter peso' },
  { text: 'Perder peso', value: 'lose', selected: user.goal == 'Perder peso' },
  { text: 'Ganhar peso', value: 'gain', selected: user.goal == 'Ganhar peso' }
])

const toggleEditValues = () => {

  inputSelectActivityLevel.value = [
    { text: 'Baixa', value: 'low', selected: user.activityLevel == 'Baixa' },
    { text: 'Moderada', value: 'moderate', selected: user.activityLevel == 'Moderada' },
    { text: 'Intensa', value: 'intense', selected: user.activityLevel == 'Intensa' }
  ]

  inputSelectGoal.value = [
    { text: 'Manter peso', value: 'maintain', selected: user.goal == 'Manter peso' },
    { text: 'Perder peso', value: 'lose', selected: user.goal == 'Perder peso' },
    { text: 'Ganhar peso', value: 'gain', selected: user.goal == 'Ganhar peso' }
  ]

  isEditing.value = !isEditing.value
  getUserProfile()
}

const selectActivity = (e) => {
  inputSelectActivityLevel.value = inputSelectActivityLevel.value.map((opt) => {
    if (opt.value == e) {
      opt.selected = !opt.selected
    } else {
      opt.selected = false
    }
    return opt
  })
}

const selectGoal = (e) => {
  inputSelectGoal.value = inputSelectGoal.value.map((opt) => {
    if (opt.value == e) {
      opt.selected = !opt.selected
    } else {
      opt.selected = false
    }
    return opt
  })
}


</script>
<template >
  <div class="profile">
    <header class="header">
      <VtitlePage title="Perfil" class="titlepage" :actions="actionsTitlePage" />
      <button class="buttonIcon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#626463"
          class="bi bi-gear-fill" viewBox="0 0 16 16">
          <path
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg></button>

    </header>

    <main class="main">
      <section class="photo">
        <span>
          <!-- <img class="spam-photo" src="../assets/imgs/PerfilPhoto.jpeg" alt="Foto de Perfil" srcset=""> -->
        </span>
      </section>

      <section class="perfil-name">
        <h2 v-if="!isEditing">{{ user.name || "Usuário" }}</h2>
        <VInput v-else :value="user.name" @update="(e) => updateValue('name', e)" class="input" />
      </section>

      <section class="perfil-section">

        <section class="perfil-values">
          <span v-if="!isEditing" class="highlight">{{ user.weight }} kg</span>
          <VInput v-else :value="user.weight" :data="{ value: user.weight, mask: ['##.##', '###.##'] }"
            @update="(e) => updateValue('weight', e)" class="input minor" />
          <span>Peso atual</span>
        </section>

        <section class="perfil-data">

          <span v-if="!isEditing" class="highlight">{{ user.height }} cm</span>
          <VInput v-else :value="user.height" :data="{ value: user.height, mask: '#.##' }"
            @update="(e) => updateValue('height', e)" class="input minor" />
          <span>Altura</span>
        </section>

      </section>

      <section class="perfil-section">

        <section class="perfil-values">
          <span v-if="!isEditing" class="highlight">{{ user.activityLevel }}</span>
          <VDropdown v-else :options="inputSelectActivityLevel" firstOpt="Selecione" @update="(e) => selectActivity(e)"
            class="input minor" />
          <span>Nível de atividade</span>
        </section>

        <section class="perfil-data">

          <span v-if="!isEditing" class="highlight">{{ user.goal }}</span>
          <VDropdown v-else :options="inputSelectGoal" firstOpt="Selecione" @update="(e) => selectGoal(e)"
            class="input minor" />
          <span>Objetivo</span>
        </section>

      </section>


      <VButton :text="!isEditing ? 'Editar' : 'Cancelar'" class="button" :defaultColor="true"
        @click="toggleEditValues()" />
      <VButton v-if="isEditing" text="Salvar" class="button" :defaultColor="true" @click="updateProfile()" />

      <section class="Progress">
        <!-- <p>Histórico progresso</p> -->

      </section>
    </main>
    <VBottomMenu class="footer" actualRoute="/profile" />

  </div>
</template>


<style scoped>
.profile {
  background-color: var(--bg-color-dark2);
  width: 100%;
  min-height: 100vh;
  height: 100%;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: var(--bg-color-dark2);

    .buttonIcon {
      border: none;
      appearance: transparent;
      background-color: var(--bg-color-dark2)
    }
  }

  .input {
    max-width: 240px;

    &.minor {
      max-width: 120px;
    }
  }

  .button {
    margin-top: 30px;
  }

  .footer {
    position: fixed;
    z-index: 3;
    width: 100%;
    bottom: 0;
  }

  .main {
    padding: 0 20px;

    .photo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }

    .spam-photo {
      border-radius: 8px;
      width: 120px;
      height: 120px;
    }

    .perfil-name {
      display: flex;
      color: var(--bg-color-light);
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      padding: 24px 0;
    }
  }

  .perfil-section {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 40px 0;

    .perfil-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--bg-color-light);
    }

    .perfil-values {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--bg-color-light);
    }

    .highlight {
      color: var(--text-color-highlighted2);
      font-size: 18px;
    }
  }

  .Progress {
    text-align: center;
    margin-top: 20px;
    height: 190px;
    color: var(--bg-color-light);
  }

}
</style>