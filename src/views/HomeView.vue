<template>
  <div class="home">
    <header>
      <div class="container">
        <div class="picContainer">
          <img src="@/assets/img/burger_header.png" alt="Fatfood Burger" />
        </div>
        <div class="textContainer">
          <h2>Des Burgers aussi transparents que délicieux, <br /> choisissez vos ingrédients <br /> et faites vous livrer !</h2>
          <div class="ctaContainer">
            <router-link to="/">Créer ton burger</router-link>
            <router-link to="/">Recettes Tendances</router-link>
          </div>
        </div>
      </div>
    </header>
    <section class="recipesTrend">
      <div class="container">
        <div class="head">
          <h2>Tendances du moment :</h2>
          <router-link to="/recettes">
            Voir toutes les tendances 
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
        <div class="body">
            <TrendRecipesList />
        </div>
      </div>
    </section>
    <section class="about">
      <div class="container">
        <div class="illustration">
          <h2>Qui sommes nous ?</h2>
          <img src="@/assets/img/illustration.png" alt="about illustration">
        </div>
        <div class="text">
          <h2>Qui sommes nous ?</h2>
          <p>Chez FatFood, notre mission est de permettre à nos clients de composer leur propre burger personnalisé. Nous sommes passionnés par la qualité de nos ingrédients et nous travaillons avec des partenaires locaux pour fournir des produits frais et savoureux. Nous sommes fiers de notre approche personnalisée de la restauration rapide et nous mettons l'accent sur l'expérience client. Chez FatFood, nous croyons que manger bien ne doit pas être ennuyeux ou restrictif, c'est pourquoi nous offrons une variété illimitée d'options pour composer le burger de vos rêves.</p>
        </div>
      </div>
    </section>
    <section class="yourChoice">
      <div class="container">
        <div class="head">
          <h2>Un Burger, Deux possibilités !</h2>
        </div>
        <div class="body">
          <div class="left">
            <h3>Création :</h3>
            <p>Avec notre service de création de burger, vous pouvez composer le burger de vos rêves en choisissant parmi une variété d'ingrédients frais et savoureux. Nous offrons une expérience personnalisée de la restauration rapide, pour que vous puissiez manger ce que vous aimez, exactement comme vous le voulez.</p>
            <router-link to="/create">Créer maintenant</router-link>
          </div>
          <div class="right">
            <h3>Choisir une tendance :</h3>
            <p>Découvrez les recettes tendances de la communauté FatFood, votées et approuvées par nos clients. Notre page tendance vous permet de découvrir de nouvelles idées de burgers personnalisés, pour vous aider à trouver l'inspiration et à varier vos repas. Rejoignez notre communauté de passionnés de burgers et partagez vos recettes préférées.</p>
            <router-link to="/recettes">Parcourir les tendances</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TrendRecipesList from '@/components/TrendRecipesList.vue';
import { useHead } from '@vueuse/head';

export default {
  name: 'HomeView',
  components: {
    TrendRecipesList,
  },
  mounted(){
    useHead({
      title: 'Accueil | Fatfood',
    })
  }
}
</script>

<style lang="scss" scoped>
  .home{
    padding-top: 100px;
    @media  screen and (max-width: 1024px) {
        padding: 120px 20px;
    }
    header{
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 100px);
      padding: 0 var(--center-padding);
      margin-bottom: 100px;
      .container {
        @media  screen and (max-width: 1024px) {
            grid-template-columns: 1fr;
            gap: 25px;
            height: auto;
            padding: 50px 10px;
        }
        background-color: var(--primary-shadow-color);
        height: 500px;
        padding: 0 0 0 50px;
        width: 100%;
        border-radius: 20px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        .picContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            @media  screen and (max-width: 1024px) {
                width: 300px;
            }
            @media  screen and (max-width: 768px) {
                width: 250px;
            }
            width: 100%;
          }
        }
        .textContainer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
          h2{
            color: var(--primary-color);
          }
          .ctaContainer{
            display: flex;
            flex-direction: row;
            justify-content: center;
            @media  screen and (max-width: 768px) {
                flex-direction: column;
            }
            gap: 20px;
            a{
              padding: 10px 20px;
              border-radius: 10px;
              font-family: var(--primary-font);
              font-size: var(--variant-size);
              transition: all .2s ease-in-out;
              &:nth-child(1){
                background-color: var(--mode-color);
                color: var(--secondary-color);
              }
              &:nth-child(2){
                background-color: var(--secondary-color);
                color: var(--mode-color);
              }
              &:hover{
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
    .recipesTrend {
      margin-bottom: 150px;
      .container {
        padding: 0 var(--center-padding);
        .head{
          width: 100%;
          display: flex;
          justify-content: space-between;
          h2{
            text-align: left;
          }
          a{
            text-align: right;
          }
        }
        .body {
          margin-top: 50px;
          min-height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .about {
      .container {
        @media  screen and (max-width: 1024px) {
            grid-template-columns: 1fr;
            gap: 50px;
        }
        padding: 0 var(--center-padding);
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        gap: 140px;
        .illustration {
          h2{
            display: none; 
            @media  screen and (max-width: 1024px) {
              display: block;
              text-align: start;
              margin-bottom: 20px;
            }
          }
          img{ 
            @media  screen and (max-width: 1024px) {
              width: 300px;
            }
            width: 100%;
          }
        }
        .text{
          @media  screen and (max-width: 1024px) {
            text-align: center;
            h2{
              display: none;
            }
          }
          text-align: end;
        }
      }
    }
    .yourChoice{
      margin-top: 150px;
      margin-bottom: 100px;
      .container{
        padding: 0 var(--center-padding);
        .head{
          h2{
            text-align: start;
          }
        }
        .body {
          @media  screen and (max-width: 1024px) {
              grid-template-columns: 1fr;
          }
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 50px;
          h3{
            color: var(--primary-color);
            margin-bottom: 20px;
          }
          a{
            background-color: var(--primary-color);
            border: 1px solid var(--mode-color);
            padding: 10px 25px;
            width: max-content;
            color: var(--mode-color);
            margin-top: 20px;
            border-radius: 10px;
            transition: all .3s;
            &:hover{
              background-color: var(--mode-color);
              border: 1px solid var(--primary-color);
              color: var(--mode-invert-color);
            }
          }
          .left, .right{
            text-align: start;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
</style>
