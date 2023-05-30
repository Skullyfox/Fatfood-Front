<script>
    export default {
        name: "recipesDashboard",
        data() {
            return{}
        },
        props : {
            authData : Object
        },
        methods : {},
    }
</script>

<template>
    <div class="container">
        <h1>Mes recettes</h1>
        <p>Aucunes recettes enregistrées</p>
    </div>
</template>

<style scoped lang="scss">
    .container{
        width: 100%;
    }
</style>