<script>
import IngredientList from "../components/IngredientsList.vue";

  export default {
    name: 'ProductView',
    components: {
      IngredientList
    },
  }
</script>

<template>
    <div class="Product">
      <h1>Page test de produits</h1>
      <IngredientList />
    </div>
</template>
