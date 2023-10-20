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
        },
        id: {
            type: Number,
            require: true
        }


    }

})

const horaFormatada = new Date(props.data.created_at);

</script>

<template>
    <div class="v-consume-water">
        <section class="box-water">
            <p class="valor">{{ props.data.consumed_water }} ml</p>
            <p class="valor">{{ `${horaFormatada.getHours() < 9 ? "0" + horaFormatada.getHours() : horaFormatada.getHours()} : ${horaFormatada.getMinutes() < 9 ?  "0" + horaFormatada.getMinutes() : horaFormatada.getMinutes()}` }}</p>
        </section>
        <section class="secundary">
            <button @click="$emit('deleteWater', props.data.id)" class="button"><img src="../assets/imgs/lixeira.svg"
                    alt="Imagem Lixeira"></button>
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
    padding: 0px 20px;

    .box-water {
        background-color: var(--bg-color-grey);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 30px;
        width: 350px;
        height: 60px;
        color: var(--text-color-light);
        border-radius: 8px;

        .valor {

            margin: 0;

        }
    }


}



.button {
    border: none;
    background-color: transparent;
}
</style>