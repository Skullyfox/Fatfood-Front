<script>
import RecipesList from "@/components/RecipesList.vue";
import { useHead } from '@vueuse/head';

export default {
  name: 'RecipesView',
  components: {
    RecipesList
  },
  mounted() {
    useHead({
      title: 'Recettes Tendances | Fatfood',
      meta: [
        {
          name: 'description',
          content: "Explorez les recettes de burgers les plus appréciées de notre communauté sur FatFood. Laissez-vous inspirer par ces créations uniques, votez pour vos favorites et ajoutez votre touche personnelle"
        }
      ]
    })
  }
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

  h1 {
    text-align: start;

    @media screen and (max-width: 1024px) {
      padding-left: 30px;
    }
  }
}
</style>
