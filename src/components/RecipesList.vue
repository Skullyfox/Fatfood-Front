<script>
import axios from 'axios';

export default {
    name: 'RecipesList',
    data() {
        return {
            recipes: [],
        };
    },
    async mounted() {
        try {
            const response = process.env.NODE_ENV !== 'production' ? await axios.get('http://127.0.0.1:5200/api/recipes?populate=*') : await axios.get('https://fatfood-api.creartcom.fr/api/recipes?populate=*');
            this.recipes = response.data.data;
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
        gap: 50px;
        padding: 50px 0;
        list-style: none;
        .item{
            display: grid;
            grid-template-rows: 1fr minmax(2fr 150px);
            border: 2px solid var(--secondary-color);
            border-radius: 20px;
            padding: 20px;
            .head{
                .likes, .likes i{
                    color: var(--alert-color);
                    font-weight: 600;
                    font-size: 12px;
                }
                img{
                    width: 90%;
                }
            }
        }
    }
</style>