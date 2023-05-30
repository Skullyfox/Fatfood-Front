<script>
import axios from 'axios';
  export default {
    name: 'RecipeView',
    components: {},
    data(){
        return {
            id: window.location.pathname.replace('/recettes/', ''),
            recipe: {}
        }
    },
    async mounted() {
        try {
            const response = process.env.NODE_ENV !== 'production' ? await axios.get(`http://127.0.0.1:5200/api/recipes/${this.id}?populate=*`) : await axios.get(`https://fatfood-api.creartcom.fr/api/recipes/${this.id}?populate=*`);
            this.recipe = await response.data.data.attributes;
            console.log(this.recipe);
        } catch (error) {
            console.error(error);
        }
    },
  }
</script>

<template>
    <div class="Recipe">
        <div class="container" v-if="recipe.name">
            <h1>{{ recipe.name }}</h1>
            <h2>ingrédients :</h2>
            <ul>
                <li v-for="ingredient in recipe.ingredients.data" v-bind:key="ingredient.id">
                    <p>- {{ ingredient.attributes.nom }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .Recipe {
        min-height: calc(100vh - 400px);
        padding: 150px var(--center-padding) 0;
        h1, h2{
            text-align: start;
        }
        h2{
            color: var(--primary-color);
        }
        ul{
            list-style: none;
            li{
                p{
                    text-align: start;
                }
            }
        }
    }
</style>
