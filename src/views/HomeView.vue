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
          <router-link to="/x">
            Voir toutes les tendances 
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {}
}
</script>

<style lang="scss" scoped>
  .home{
    padding-top: 100px;
    header{
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 100px);
      padding: 0 var(--center-padding);
      .container {
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
      .container {
        padding: 0 var(--center-padding);
        .head{
          width: 100%;
          h2{
            text-align: left;
          }
          a{
            text-align: right;
          }
        }
      }
    }
  }
</style>
