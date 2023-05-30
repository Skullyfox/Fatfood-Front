<script>
import RecipesList from "@/components/RecipesList.vue";

  export default {
    name: 'RecipesView',
    components: {
        RecipesList
    },
  }
</script>

<template>
    <div class="Recipes">
      <h1>Recettes Tendances :</h1>
      <RecipesList />
    </div>
</template>

<style scoped lang="scss">
    .Recipes {
        min-height: calc(100vh - 400px);
        padding: 150px var(--center-padding) 0;
        h1{
            text-align: start;
        }
    }
</style>
