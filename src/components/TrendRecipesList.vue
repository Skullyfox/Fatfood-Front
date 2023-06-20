<script>
import axios from 'axios';

export default {
    name: 'TrendRecipesList',
    data() {
        return {
            recipes: [],
        };
    },
    async mounted() {
        try {
            const response = process.env.NODE_ENV !== 'production' ? await axios.get('http://127.0.0.1:5200/api/recipes?populate=*&sort[0]=likes:desc') : await axios.get('https://fatfood-api.creartcom.fr/api/recipes?populate=*&sort[0]=likes:desc');
            this.recipes = response.data.data.slice(0, 4);
            console.log(this.recipes);
        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<template>
    <ul class="RecipesList">
        <li v-for="recipe in recipes" :key="recipe.id" class="item">
            <router-link :to="'/recettes/'+recipe.id">
                <div class="head">
                    <p class="likes">
                        <i class="fas fa-heart"/> {{ recipe.attributes.likes }}
                    </p>
                    <img src="@/assets/img/burger_header.png" alt="x">
                </div>
                <div class="body">
                    <h2>{{ recipe.attributes.name }}</h2>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
    .RecipesList {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        list-style: none;
        @media screen and (max-width: 1024px){
            grid-template-columns: repeat(2, 1fr);
        }
        @media screen and (max-width: 768px){
            grid-template-columns: minmax(200px,300px);
        }
        .item{
            display: grid;
            grid-template-rows: 1fr minmax(2fr 150px);
            border: 2px solid var(--secondary-color);
            border-radius: 20px;
            padding: 10px;
            .head{
                .likes, .likes i{
                    color: var(--alert-color);
                    font-weight: 600;
                    font-size: 12px;
                }
                img{
                    width: 50%;
                }
            }
        }
    }
</style>