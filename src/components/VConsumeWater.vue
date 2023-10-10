<script setup>



</script>

<template>
    <div class="v-consume-water">
        <section class="primary">
            <p class="valor">300 ml</p>
            <p class="valor">08:20</p>
        </section>

        <section class="secundary">
            <button class="button"><img src="../assets/imgs/lixeira.svg" alt="Imagem Lixeira"></button>
        </section>
    </div>
</template>

<style scoped>
.v-consume-water {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* margin-top: 100px; */

    .primary {
        background-color: var(--bg-color-dark);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 30px;
        /* gap: 250px; */
        width: 350px;
        height: 60px;
        color: var(--text-color-light);
        border-radius: 8px;

        .valor {

            margin: 0;

        }


    }


}



.secundary {}

.button {
    border: none;
    background-color: transparent;
}
</style>