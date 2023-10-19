<script setup>
import VButton from '../components/VButton.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VInputIcon from '../components/VInputIcon.vue';
import VtitlePage from '../components/VtitlePage.vue';


</script>


<template>
    <div class="Primary">
        <header class="header">
            <VButtonArrowLeft />
            <VtitlePage :title="`Alimentos`" />
            <span></span>
        </header>
        <main class="main">
            <section class="search-food">
                <VInputIcon :data="{ placeholder: 'Buscar Alimento' }" :hasIcon="true" iconName="bi bi-search"
                    class="vinpuicon" />
            </section>

            <section class="Food-list">

            </section>

            <section>
                <div class="hr"></div>
                <VButton :text="`+ Cadastrar um Novo alimento`" class="vbutton" />
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
    align-items: center;

    .header {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        height: 100px;
        align-items: center;
        justify-content: space-between;
        background-color: var(--bg-color-dark)
    }

    .main {
        width: 95%;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background-color: var(--bg-color-dark);

        .Food-list {
            display: flex;
            background-color: var(--bg-color-dark);
            /* border: 1px solid gold; */
            height: 350px;
        }

        .search-food {
            display: flex;
            background-color: var(--bg-color-dark);
            height: 15px;
            justify-content: center;
            align-items: center;

            .vinpuicon {
                background-color: black;

                .input {
                    background-color: black;
                    border-radius: 0;
                }

            }
        }

        .hr {
            background-color: var(--bg-color-grey);
            height: 2px;
            width: 80%;
            margin: 0 auto;
        }

        .vbutton {
            background-color: var(--bg-color-dark);
            border-radius: 0;

        }

    }

}
</style>