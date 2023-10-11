<script setup>

const props = defineProps({
    data: {
        consumed_water: {
            type: String,
            default: "0"
        },

        created_at: {
            type: String,
            default: "00/00"
        }

    }

})

const horaFormatada = new Date(props.data.created_at);



</script>

<template>
    <div class="v-consume-water">
        <section class="primary">
            <p class="valor">{{ props.data.consumed_water }} ml</p>
            <p class="valor">{{`${horaFormatada.getHours()} : ${horaFormatada.getMinutes()}` }}</p>
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