<script>
import axios from 'axios';
import { useHead } from '@vueuse/head';
import { ref } from 'vue';

export default {
    name: 'CreationView',
    components: {},
    props: {
        authData: Object
    },
    setup() {
        const quantity = ref(1);
        const total = ref(0 * quantity.value);
        return {
            quantity,
            total
        }
    },
    data() {
        return {
            ingredients: [],
            recipe: [],
            creationMode: false,
            selectedIngredient: null,
            saveMode: false,
            recipeName: '',
        }
    },
    methods: {
        totalCalcul() {
            let x = 0;
            for (let i = 0; i < this.recipe.length; i++) {
                x = (this.recipe[i].prix * this.quantity) + x;
            }
            this.total = x;
        },
        addIngredientToRecipe(ingredient) {
            if (ingredient != null) {
                if (ingredient && !this.recipe.includes(ingredient)) {
                    this.recipe.splice(this.recipe.length - 1, 0, ingredient);
                    this.selectedIngredient = null;
                    this.totalCalcul();
                }
            } else {
                return;
            }
        },
        removeIngredientFromRecipe(ingredient) {
            const index = this.recipe.indexOf(ingredient);
            if (index > -1) {
                this.recipe.splice(index, 1);
                this.totalCalcul();
            }
        },
        moveIngredientUp(index) {
            if (index > 0) {
                const ingredient = this.recipe[index];
                this.recipe.splice(index, 1);
                this.recipe.splice(index - 1, 0, ingredient);
            }
        },
        moveIngredientDown(index) {
            if (index < this.recipe.length - 1) {
                const ingredient = this.recipe[index];
                this.recipe.splice(index, 1);
                this.recipe.splice(index + 1, 0, ingredient);
            }
        },
        totalKcal() {
            return this.recipe.reduce((total, ingredient) => total + ingredient.attributes.kcal, 0);
        },
        kcalColor() {
            const totalKcal = this.totalKcal();
            if (totalKcal < 800) return 'green';
            if (totalKcal < 1500) return 'yellow';
            return 'red';
        },
        startSaveMode() {
            this.saveMode = true;
        },
        async saveRecipe() {
            try {
                const url = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5200/api' : 'https://fatfood-api.creartcom.fr/api';
                const token = this.authData.token;
                const data = JSON.stringify({
                    "data": {
                        "name": this.recipeName,
                        "ingredients": this.recipe.map(recipe => recipe.id),
                        "creator": [parseInt(this.authData.id)],
                        "likes": 0
                    }
                });

                console.log(data);
                let config = {
                    method: 'post',
                    url: `${url}/recipes`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    data: data
                };
                await axios.request(config);
                this.recipeName = '';
                this.saveMode = false;
            } catch (error) {
                console.error(error);
            }
        }
    },
    async mounted() {
        useHead({
            title: 'Création | Fatfood',
        })
        try {
            const url = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5200/api' : 'https://fatfood-api.creartcom.fr/api';
            const response = await axios.get(`${url}/ingredients?populate=*`);
            console.log(response.data.data);
            this.ingredients = response.data.data;
            if (this.ingredients.length > 0) {
                this.recipe = [
                    await axios.get(`${url}/ingredients/1?populate=*`).then(response => response.data.data),
                    await axios.get(`${url}/ingredients/21?populate=*`).then(response => response.data.data),
                    await axios.get(`${url}/ingredients/4?populate=*`).then(response => response.data.data),
                    await axios.get(`${url}/ingredients/6?populate=*`).then(response => response.data.data),
                    await axios.get(`${url}/ingredients/3?populate=*`).then(response => response.data.data),

                ]
            }
            this.totalCalcul();
        } catch (error) {
            console.error(error);
        }
    },
}
</script>

<template>
    <div class="container">
        <div class="creationContainer"
            :style="saveMode ? 'grid-template-columns: 2fr 1fr' : 'grid-template-columns: 2fr 1.8fr 2fr;'">
            <div class="leftContainer">
                <div class="card" :style="creationMode ? `transform: translateX(0%);` : `transform: translateX(-400%);`">
                    <div class="header_card">
                        <h1>Indice Calorifique</h1>
                        <p :class="`${kcalColor()}`">{{ totalKcal() }} kcal</p>
                    </div>
                    <div class="body_card" v-if="!saveMode">
                        <h1>Commande</h1>
                        <h3>Quantité</h3>
                        <input type="number" min="1" v-model="quantity" @change="totalCalcul" />
                        <h2>Récapitulatif</h2>
                        <div class="resume_array">
                            <div class="product_column">
                                <p class="column_title">Produits</p>
                                <ul>
                                    <li v-for="ingredient in recipe" :key="ingredient.attributes.nom">
                                        <p>{{ ingredient.attributes.nom }}</p>
                                    </li>
                                    <li>Total</li>
                                </ul>
                            </div>
                            <div class="quantity_column">
                                <p class="column_title">Qté</p>
                                <ul>
                                    <li v-for="ingredient in recipe" :key="ingredient.attributes.nom">
                                        <p>{{ quantity }}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="price_column">
                                <p class="column_title">Prix</p>
                                <ul>
                                    <li v-for="ingredient in recipe" :key="ingredient.attributes.nom">
                                        <p>{{ (ingredient.attributes.prix * quantity).toFixed(2).toString().replace('.',
                                            '€')
                                        }}</p>
                                    </li>
                                    <li>{{ total.toFixed(2).toString().replace('.', '€') }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="actions">
                            <button type="button" @click="startSaveMode"><i class="fas fa-sd-card" /> Enregistrer</button>
                            <button type="button" disabled><i class="fas fa-cart-shopping" /> Commander</button>
                        </div>
                    </div>
                    <div class="body_card" v-else>
                        <h1>Enregistrer la recette</h1>
                        <input type="text" v-model="recipeName" placeholder="Nom de la Recette">
                        <button type="button" @click="saveRecipe">Enregistrer</button>
                    </div>
                </div>
            </div>
            <div class="previewContainer">
                <ul :style="creationMode ? `` : `padding-top: 50px`">
                    <li v-for="ingredient, index in recipe" :key="ingredient.nom"
                        :class="`ingredientType-${ingredient.attributes.ingredient_type.data.id}`" :style="creationMode && !saveMode
                            ? `z-index: ${recipe.length - index}; transform: translateY(calc(${index} * -30%)); height: min-content; min-height: 150px;`
                            : `z-index: ${recipe.length - index}; transform: translateY(calc(${index} * -90%));`">
                        <img :src="ingredient.attributes.picture.data.attributes.url"
                            :style="creationMode ? `top: calc(${index} * 50px); transform: translateY(0%)` : `top: calc(${index} * 25px)`" />
                    </li>
                </ul>
                <div class="startContainer">
                    <button type="button" class="StartButton" :style="creationMode ? `display: none` : null">
                        <h2 @click="creationMode = true">Créer ma Recette</h2>
                    </button>
                </div>
            </div>
            <div class="rightContainer" v-if="!saveMode">
                <div class="card" :style="creationMode ? `transform: translateX(0%);` : `transform: translateX(400%);`">
                    <div class="header_card">
                        <h1>Modifier la recette</h1>
                        <p>Sélectionnez les ingrédients</p>
                    </div>
                    <div class="body_card">
                        <div class="addSection">
                            <select v-model="selectedIngredient">
                                <option disabled selected hidden :value="null">Sélectionnez un ingrédient</option>
                                <option v-for="ingredient in ingredients" :key="ingredient.attributes.nom"
                                    :value="ingredient">
                                    {{ ingredient.attributes.nom }}
                                </option>
                            </select>
                            <button @click="addIngredientToRecipe(selectedIngredient)" :disabled="recipe.length >= 9">
                                <i class="fas fa-plus" />
                            </button>
                        </div>
                        <h2>Recette actuelle</h2>
                        <ul>
                            <li v-for="(ingredient, index) in recipe" :key="ingredient.attributes.nom">
                                <p>{{ ingredient.attributes.nom }}</p>
                                <div class="controls">
                                    <button :style="index === 0 || index === recipe.length - 1 ? 'display: none' : ''"
                                        @click="removeIngredientFromRecipe(ingredient)">
                                        <i class="fas fa-trash-can" />
                                    </button>
                                    <button :style="index === 0 || index === recipe.length - 1 ? 'display: none' : ''"
                                        @click="moveIngredientUp(index)" :disabled="index === 1">
                                        <i class="fas fa-arrow-up" />
                                    </button>
                                    <button :style="index === 0 || index === recipe.length - 1 ? 'display: none' : ''"
                                        @click="moveIngredientDown(index)" :disabled="index === recipe.length - 2">
                                        <i class="fas fa-arrow-down" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="mobileAdvert">
            <h2>La création de recettes n'est disponible que sur ordinateur pour le moment.</h2>
            <router-link to="/" class="Link">Retourner à l'accueil</router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    min-height: calc(100vh - 200px);
    display: grid;
    grid-template-rows: 80% 20%;
    padding: 200px var(--center-padding) 0;

    .creationContainer {
        display: grid;

        @media screen and (max-width: 1024px){
            display: none;
        }
        .leftContainer {
            .card {
                transition: all 1s;
                padding: 20px 10px;
                border-radius: 20px;
                border: 2px solid var(--secondary-color);

                .header_card {
                    p {
                        padding: 10px 20px;
                        color: var(--mode-color);

                        &.green {
                            background-color: #1dd1a1;
                        }

                        &.yellow {
                            background-color: #feca57;
                        }

                        &.red {
                            background-color: #ee5253;
                        }
                    }
                }

                .body_card {
                    .resume_array {
                        display: grid;
                        grid-template-columns: 3fr 1fr 1fr;
                        padding: 0 10px;

                        .column_title {
                            font-weight: var(--medium-weight);
                            text-align: start;
                            margin-bottom: 20px;
                        }

                        ul {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 15px;
                        }
                    }

                    .actions {
                        display: flex;
                        justify-content: center;
                        margin-top: 20px;
                        gap: 20px;

                        button {
                            padding: 15px 20px;
                            color: var(--primary-color);
                            font-weight: 500;
                            border: 2px solid var(--primary-color);
                            background-color: transparent;
                            transition: all .2s ease-in-out;

                            i {
                                color: var(--primary-color);
                            }

                            &:nth-child(1) {
                                &:hover {
                                    cursor: pointer;
                                    background-color: var(--primary-color);
                                    color: var(--mode-color);

                                    i {
                                        color: var(--mode-color);
                                    }
                                }
                            }

                            &:nth-child(2) {
                                border: none;
                                background-color: #bbb;
                                color: var(--mode-color);

                                i {
                                    color: var(--mode-color);
                                }
                            }
                        }
                    }
                }
            }
        }

        .previewContainer {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            ul {
                display: flex;
                flex-direction: column;
                justify-content: center;
                max-height: 100%;
                transition: padding-top 1s;

                li {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 1s;
                    height: 120px;

                    &.ingredientType-1 {
                        img {
                            height: 100px;
                        }
                    }

                    img {
                        transition: all .5s ease-in-out;
                        width: 80%;
                        max-width: 300px;
                    }
                }
            }
        }

        .rightContainer {
            .card {
                transition: all 1s;
                padding: 20px 10px;
                border-radius: 20px;
                border: 2px solid var(--secondary-color);

                .body_card {
                    .addSection {
                        margin: 10px 0;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;

                        select {
                            padding: 10px;
                            border-radius: 10px 0 0 10px;
                        }

                        button {
                            background-color: transparent;
                            border: 2px solid #1dd1a1;
                            width: min-content;
                            padding: 10px 13px;
                            margin: 0 auto;
                            border-radius: 100%;
                            transition: all .2s ease-in-out;

                            &:hover {
                                background-color: #1dd1a1;
                                cursor: pointer;

                                i {
                                    color: var(--mode-color);
                                }
                            }

                            i {
                                color: #1dd1a1;
                            }
                        }
                    }

                    ul {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 15px;

                        li {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            gap: 10px;

                            &:nth-child(odd) {
                                background-color: #ddd;
                            }

                            .controls {
                                display: flex;
                                gap: 10px;

                                button {
                                    background-color: transparent;
                                    border: none;

                                    &:hover {
                                        cursor: pointer;
                                    }

                                    i {
                                        font-size: 20px;
                                        color: var(--primary-color);
                                    }

                                    &:nth-child(1) {
                                        i {
                                            color: #ee5253;
                                        }
                                    }

                                    &:disabled {
                                        i {
                                            color: #aaa;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .mobileAdvert {
        display: none;
        @media screen and (max-width: 1024px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            .Link{
                background-color: var(--primary-color);
                border: 0;
                padding: 15px 35px;
                border-radius: 20px;
            }
        }
    }

    .startContainer {
        .StartButton {
            background-color: var(--primary-color);
            border: 0;
            padding: 15px 35px;
            border-radius: 20px;
            letter-spacing: 2px;
            transform: translateY(-400%);

            h2 {
                color: var(--secondary-color);
            }

            transition: opacity 0.5s ease-in-out,
            all 0.3s ease-in-out;

            &:hover {
                background-color: var(--secondary-color);
                cursor: pointer;

                h2 {
                    color: var(--primary-color);
                }
            }
        }
    }
}
</style>
