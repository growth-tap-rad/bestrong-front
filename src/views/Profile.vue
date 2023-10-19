<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useProfileStore } from '../stores/profile.store';
import VtitlePage from '../components/VtitlePage.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VBottomMenu from '../components/VBottomMenu.vue';



const profileStore = useProfileStore()
let user = reactive({ name: 'name', weight: '00', height: '00' })

onMounted(() => {
  profileStore.getUser()
    .then((data) => {
      console.log(data)
      user.name = data.name,
        user.height = data.progress[0].height,
        user.weight = data.progress[0].weight
    })
})

const esconderBotao =()=>{
  
}

</script>
<template >
  <div class="Primary">
    <header class="header">
      <VButtonArrowLeft />
      <VtitlePage :title="`Perfil`" />
      <button class="buttonIcon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#626463" class="bi bi-gear-fill" viewBox="0 0 16 16">
  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
</svg></button>
    
    </header>

    <main class="main">
      <section class="photo">
        <spam><img class="spam-photo" src="../assets/imgs/PerfilPhoto.jpeg" alt="Foto de Perfil" srcset=""></spam>
      </section>

      <section class="perfil-name">
        <h2>{{ user.name }}</h2>
      </section>

      <section class="perfil-section">

        <section class="perfil-values">
          <spam><strong>{{ user.weight }} </strong></spam>
          <spam><strong>{{ user.height }} </strong></spam>
        </section>

        <section class="perfil-data">
          <span>kg</span>
          <span>Centímetros</span>
        </section>

      </section>

      <section class="Progress">
        <p>Histórico progresso</p>

      </section>

      <section>
        <VBottomMenu :show="{}"/>
      </section>

    </main>

  </div>
</template>
<style scoped>
.Primary {
  background-color: var(--bg-color-grey);
  width: 100%;
  min-height: 100vh;
  height: 100%;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    background-color: var(--bg-color-dark);

    .buttonIcon{
      border: none;
      appearance: transparent;
      background-color: var(--bg-color-dark)
    }
  }

  .main {
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
      margin-top: 20px;
    }
  }

  .perfil-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .perfil-data {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 30px;
      justify-content: space-between;
      color: var(--bg-color-light);
    }

    .perfil-values {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 30px;
      justify-content: space-between;
      color: var(--text-color-highlighted2);
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