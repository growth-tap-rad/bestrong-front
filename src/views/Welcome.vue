<script setup>
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import { useUserStore } from '../stores/user.store'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const goToWhatYourGoal = () => {
  if (userStore?.token) {
    router.push('/diet')
    return
  }
  router.push('/sign-in');
};
const goToCreateRegistration = () => {
  userStore.resetStore()
  router.push("/sign-up")
}

</script>

<template>
  <section class="bg-entry">
    <div class="box-img">
      <img src="../assets/imgs/BeStrongWS.png" alt="growtrh logo" class="logo">
    </div>
    <div class="actions">
      <VButton text="Login" @click="goToWhatYourGoal" />
      <VButton text="Cadastrar-se" class="button2" @click="goToCreateRegistration" />
    </div>
  </section>
</template>

<style scoped>
.bg-entry {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    padding-bottom: 30px;
    margin: 0 15px;

    .button2 {
      background-color: transparent;
    }
  }

  .box-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    margin-top: 60px;

    .logo {
      height: 150px;
    }
  }

}

@media (max-width: 768px) {}
</style>