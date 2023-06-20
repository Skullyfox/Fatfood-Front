<script>
import axios from 'axios';
import { useHead } from '@vueuse/head';
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
            useHead({
            title: `${this.recipe.name} | Fatfood`,
            }),
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
            <div class="view">
                <img src="@/assets/img/burger_header.png"/>
            </div>
            <div class="infos">
                <h1>{{ recipe.name }}</h1>
                <h2>ingrédients :</h2>
                <ul>
                    <li v-for="ingredient in recipe.ingredients.data" v-bind:key="ingredient.id">
                        <p>- {{ ingredient.attributes.nom }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .Recipe {
        min-height: calc(100vh - 100px);
        padding: 150px var(--center-padding) 0;
        .container {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 25px;
            @media screen and (max-width: 1024px){
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 2fr;
                padding: 0 20px;
            }
            .view{
                border: 1px solid var(--mode-invert-color);
                border-radius: 20px;
                padding: 25px;
                img{
                    @media screen and (max-width: 1024px){
                        max-width: 200px;
                    }
                    max-width: 100%;
                }
            }
            .infos{
                h1, h2{
                    text-align: start;
                }
                h2{
                    padding-left: 20px;
                    color: var(--primary-color);
                }
                ul{
                    list-style: none;
                    padding-left: 40px;
                    li{
                        p{
                            text-align: start;
                        }
                    }
                }
            }
        }
    }
</style>
