<script>
import axios from "axios";
import { useHead } from '@vueuse/head';

    export default {
        name: "recipesDashboard",
        data() {
            return{
                recipes: [],
            }
        },
        props : {
            authData : Object
        },
        methods : {},
        async mounted() {
            useHead({
            title: 'Mes Recettes | Fatfood',
            })
            try {
                const response = process.env.NODE_ENV !== 'production' 
                    ? await axios.get('http://127.0.0.1:5200/api/users/me?populate=*', {
                        headers: {Authorization: `Bearer ${this.authData.token}`}
                    }) 
                    : await axios.get('https://fatfood-api.creartcom.fr/users/me?populate=*', {
                        headers: {Authorization: `Bearer ${this.authData.token}`}
                    });
                this.recipes = response.data.recipes;
            } catch (error) {
                console.error(error);
            }
        },
    }
</script>

<template>
    <div class="container">
        <h1>Mes recettes</h1>
        <p v-if="recipes.length < 1">Aucunes recettes enregistrées</p>
        <div class="recipesContainer" v-if="recipes.length > 0">
            <ul class="RecipesList">
                <li v-for="recipe in recipes" :key="recipe.id" class="item">
                    <router-link :to="'/recettes/'+recipe.id">
                        <div class="head">
                            <p class="likes">
                                <i class="fas fa-heart"/> {{ recipe.likes }}
                            </p>
                            <img src="@/assets/img/burger_header.png" alt="x">
                        </div>
                        <div class="body">
                            <h2>{{ recipe.name }}</h2>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container{
        width: 100%;
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
                transition: all .2s ease-in-out;
                &:hover{
                    border: 3px solid var(--secondary-color);
                    filter: drop-shadow(5px 5px 5px rgba(0,0,0,.3));
                    transform: scale(1.05);
                }
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
    }
</style>