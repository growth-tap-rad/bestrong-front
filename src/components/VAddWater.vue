<template>
    <section class="add-water">
        <div class="main">
            <h1 class="h1-add-water">Água</h1>
            <input class="input-add-water" type="text" placeholder="200 ml">
            <button class="btn btn-primary button-add-water">Adicionar</button>
        </div>
    </section>
</template>


<script setup>


</script>

<style scoped>
.add-water {
    .main {
        position: fixed;
        bottom: 0;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        gap: 30px;
        background-color: var(--bg-color-dark3);
        color: var(--text-color-light);
        width: 100%;
        height: 15em;

        .button-add-water {
            border-radius: 50px;
            padding: 20px;
            text-transform: uppercase;
            background-color: var(--button-color-light);
        }

        .input-add-water {
            border-radius: 5px;
            padding: 10px 20px;
        }

        .h1-add-water {
            font-size: 20px;


        }
    }
}
</style>