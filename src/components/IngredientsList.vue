<style lang="scss" scoped>
    ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 0 calc((100vw - 1024px)/2);
        list-style: none;
        gap: 20px;
        li{
            position: relative;
            display: grid;
            grid-template-rows: 3fr 1fr;
            border: 3px solid #666cc4;
            border-radius: 10px;
            transition: all .3s, color 0;
            overflow: hidden;
            &::before{
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background-color: #666cc4;
                transition: all .5s ease-in-out;
                transform: scale(0) translate(-50%, -50%);
                transform-origin: 0 0;
            }
            &:hover{
                cursor: pointer;
                color: aliceblue;
                &::before{
                    transform: scale(3) translate(-50%, -50%);
                }
                .row{
                    filter: blur(0px);
                    img{
                        transform: scale(1.2);
                    }
                }
            }
            .row{
                display: flex;
                justify-content: center;
                align-items: center;
                filter: blur(5px);
                transition: all .3s;
                img{
                    transition: all .3s;
                    width: 60%;
                }
            }
        }
    }
</style>

<template>
    <div>
      <h1>Liste des ingrédients :</h1>
      <ul>
        <li v-for="ingredient in ingredients" :key="ingredient.id">
            <div class="row">
                <img :src="ingredient.attributes.picture.data.attributes.url" :alt="'Image de {{ ingredient.attributes.nom }}'">
            </div>
            <div class="row">
                <h2>{{ ingredient.attributes.nom }}</h2>
            </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'IngeredientsList',
    data() {
      return {
        ingredients: [],
      };
    },
    async mounted() {
      try {
        const response = process.env.NODE_ENV !== 'production'  ? await axios.get('http://127.0.0.1:5200/api/ingredients?populate=*') : await axios.get('https://fatfood-api.creartcom.fr/api/ingredients?populate=*');
        this.ingredients = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  };
  </script>