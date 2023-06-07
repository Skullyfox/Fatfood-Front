<script>
import axios from 'axios';

export default {
    name: 'CreationView',
    components: {},
    data() {
        return {
            ingredients: [],
            recipe: [],
        }
    },
    async mounted() {
      try {
        const url = process.env.NODE_ENV !== 'production'  ? 'http://127.0.0.1:5200/api' : 'https://fatfood-api.creartcom.fr/api';
        const response = await axios.get(`${url}/ingredients?populate=*`);
        this.ingredients = response.data.data;
        if(this.ingredients.length > 0) {
            this.recipe = [
                await axios.get(`${url}/ingredients/1?populate=*`).then(response => response.data.data.attributes),
                await axios.get(`${url}/ingredients/21?populate=*`).then(response => response.data.data.attributes),
                await axios.get(`${url}/ingredients/4?populate=*`).then(response => response.data.data.attributes),
                await axios.get(`${url}/ingredients/3?populate=*`).then(response => response.data.data.attributes),

            ]
        }
        console.log(this.recipe)
      } catch (error) {
        console.error(error);
      }
    },
  }
</script>

<template>
    <div class="container">
        <div class="creationContainer">
            <div class="leftContainer"></div>
            <div class="previewContainer">
                <ul>
                    <li v-for="ingredient in recipe" :key="ingredient.nom">
                        <img :src="ingredient.picture.data.attributes.url" />
                    </li>
                </ul>
            </div>
            <div class="rightContainer"></div>
        </div>
        <button type="button" class="StartButton">
            <h2>Créer ma Recette</h2>
        </button>
    </div>
</template>

<style scoped lang="scss">
    .container {
        min-height: 100vh;
        padding-top: 150px;
        .previewContainer {
            ul{
                li{
                    transform: translateY(-50%);
                    &:nth-child(0){
                        transform: translate(0%);
                    }
                }
            }
        }
        .StartButton {
            background-color: var(--primary-color);
            border: 0;
            padding: 15px 35px;
            border-radius: 20px;
            letter-spacing: 2px;
            h2{
                color: var(--secondary-color);
            }
            &:hover{
                background-color: var(--secondary-color);
                cursor: pointer;
                h2{
                    color: var(--primary-color);
                }
            }
        }
    }
</style>
