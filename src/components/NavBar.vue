<script>
  export default {
    name: 'NavBar',
    props: {
      isAuth: Boolean,
      authData: Object,
    },
    data() {
      return {
        mobileMenuStatus: false,
        cartStatus: false,
        accountContainerStatus: false,
        //discordAuthLink: "https://discord.com/api/oauth2/authorize?client_id=1097787484622041129&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogged&response_type=token&scope=identify%20guilds",
        discordAuthLink: "https://discord.com/api/oauth2/authorize?client_id=1097787484622041129&redirect_uri=https%3A%2F%2Ffatfood-front.vercel.app%2Flogged&response_type=token&scope=identify%20email",
      };
    },
    methods: {
      mobileMenu() {
        this.mobileMenuStatus = !this.mobileMenuStatus;
      },
      activeCart() {
        if(this.accountContainerStatus){
          this.accountContainerStatus = !this.accountContainerStatus;
        }
        this.cartStatus = !this.cartStatus;
      },
      accountContainer() {
        if(this.cartStatus){
          this.cartStatus = !this.cartStatus;
        }
        this.accountContainerStatus = !this.accountContainerStatus;
      }
    }
  };
</script>

<template>
    <nav class="navbar">
        <div class="navbar-items">
          <i id="mobileMenuToggler" 
            :class="{'fas fa-bars': !mobileMenuStatus,'fas fa-close': mobileMenuStatus }" 
            @click="mobileMenu"></i>
          <div class="mobile-container">
          <router-link to="/">Accueil</router-link>
          <router-link to="/about">{{ isAuth }}</router-link>
          <router-link to="/product">Product</router-link>
          </div>
        </div>
        <div class="navbar-logo">
          <router-link to="/">
            <img class="navbar-desktop-logo" src="@/assets/img/logo.png" alt="Fatfood Logo" />
            <img class="navbar-mobile-logo" src="@/assets/img/logo-small.png" alt="Fatfood Logo" />
          </router-link>
        </div>
        <div class="navbar-auth">
          <div class="navbar-icon" @click="accountContainer" :class="{isAuth: isAuth}">
            <i v-if="!isAuth" class="fas fa-user"></i>
            <img v-if="isAuth" class="avatar" :src="authData.avatar" />
            <p v-if="isAuth" class="name">{{ authData.name }}</p>
          </div>
          <div class="navbar-icon" @click="activeCart">
            <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
    </nav>
    <div class="account-container" :class="{'active': accountContainerStatus}">
      <a v-if="!isAuth" :href="discordAuthLink">Se connecter avec discord</a>
      <ul v-if="isAuth" class="list">
        <li>
          <router-link to="dashboard" @click="accountContainer">Dashboard</router-link>
        </li>
        <li>
          <router-link to="dashboard" @click="accountContainer">Données personnelles</router-link>
        </li>
        <li>
          <router-link to="dashboard" @click="accountContainer">Historique des commandes</router-link>
        </li>
        <li>
          <router-link to="dashboard" @click="accountContainer">Mes recettes</router-link>
        </li>
      </ul>
    </div>
    <div class="cart-container" :class="{'active': cartStatus}">
      <div class="container-title">
        <h2>Votre panier</h2>
      </div>
    </div>
</template>

<style scoped lang="scss">
  nav {
    z-index: 999;
    position: fixed;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    height: 100px;
    padding: 0 var(--center-padding);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    background: var(--mode-color);
    @media screen and (max-width: 1024px) {
      width: calc(100% - 80px);
      padding: 0 40px;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    .navbar-logo {
      width: 100%;
      @media screen and (max-width: 1024px) {
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      @media screen and (max-width: 768px) {
          display: flex;
          justify-content: flex-start;
          align-items: center;
      }
      a {
        .navbar-desktop-logo {
          height: 60px;
          transform: translateY(100%);
          @media screen and (max-width: 1024px) {
            transform: translateY(0);
          }
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
        .navbar-mobile-logo {
          display: none;
          @media screen and (max-width: 768px) {
            display: block;
            height: 60px;
          }
        }
      }
    }

    .navbar-items {
      display: flex;
      align-items: center;
      #mobileMenuToggler {
        display: none;
        font-size: var(--title-size);
      }
      @media screen and (max-width: 1024px) {
        #mobileMenuToggler {
          display: block;
        }
        .mobile-container {
          display: none;
        }
      }
      a {
        margin: 0 20px;
        font-size: 18px;
        color: var(--secondary-color);
        text-decoration: none;
        font-weight: medium;

        &.active {
          color: var(--primary-color);
        }
      }
    }

    .navbar-auth {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 50px;
      .name{
        margin-left: 5px;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }

      .navbar-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--secondary-color);
        border: 2px solid transparent;
        @media screen and (max-width: 1024px) {
          margin-left: 0;
        }
        &:hover{
          cursor: pointer;
        }
        i {
          color: var(--mode-color);
        }
        &.isAuth{
          background-color: transparent;
        }
        img{
          max-width: 100%;
        }
      }
    }
  }
  .cart-container {
    z-index: 800;
    padding: 30px 10px;
    position: fixed;
    top: -100vh;
    right: var(--center-padding);
    height: 400px;
    width: 300px;
    background-color: var(--secondary-color);
    transition: all .8s ease-in-out;
    box-shadow: -1px 0px 6px rgba(0, 0, 0, 0.3);
    &.active {
      top: 100px;
    }
    h2{
      color: var(--mode-color);
    }
    @media screen and (max-width: 1024px) {
      left: 0;
      width: 350px;
    }
    @media screen and (max-width: 768px) {
      right: 0;
      width: 100%;
    }
  }
  .account-container {
    z-index: 799;
    padding: 30px 10px;
    position: fixed;
    //top: calc(100px - 100vh);
    top: -100vh;
    right: var(--center-padding);
    height: 200px;
    width: 300px;
    background-color: var(--primary-color);
    transition: all .8s ease-in-out;
    box-shadow: -1px 0px 6px rgba(0, 0, 0, 0.3);
    &.active {
      top: 100px;
    }
    .list{
      list-style: none;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    h2{
      color: var(--mode-color);
    }
    @media screen and (max-width: 1024px) {
      left: 0;
      width: 350px;
    }
    @media screen and (max-width: 768px) {
      right: 0;
      width: 100%;
    }
  }
</style>