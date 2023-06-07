<script>
  export default {
    name: 'NavBar',
    emits: ["logout"],
    props: {
      isAuth: Boolean,
      authData: Object,
    },
    data() {
      return {
        mobileMenuStatus: false,
        cartStatus: false,
        accountContainerStatus: false,
        discordAuthLink: process.env.NODE_ENV !== 'production' 
          ? "https://discord.com/api/oauth2/authorize?client_id=1097787484622041129&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogged&response_type=token&scope=identify%20guilds" 
          :"https://discord.com/api/oauth2/authorize?client_id=1097787484622041129&redirect_uri=https%3A%2F%2Ffatfood-front.vercel.app%2Flogged&response_type=token&scope=identify%20email",
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
      },
      logout() {
        this.$emit("logout");
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
          <div class="desktop-container">
            <router-link to="/">Accueil</router-link>
            <div class="dropdown">
              <p class="dropdownLabel">Recettes</p>
              <div class="dropdownContainer">
                <router-link to="/create">Créer ton Burger</router-link>
                <router-link to="/recettes">Recettes Tendances</router-link>
              </div>
            </div>
            <router-link to="/about">En Savoir Plus</router-link>
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
        <li class="logout">
          <router-link to="dashboard" @click="logout(), accountContainer()">Déconnexion</router-link>
        </li>
      </ul>
    </div>
    <div class="cart-container" :class="{'active': cartStatus}">
      <h2>Votre panier</h2>
      <p>Panier Vide</p>
    </div>
    <div 
      class="mobile-nav"
      :class="{active : mobileMenuStatus}">
      <ul>
        <li>
          <h2>
            <router-link to="/" @click="mobileMenu">Accueil</router-link>
          </h2>
        </li>
        <li>
          <h2>
            <router-link to="/about" @click="mobileMenu">{{ isAuth }}</router-link>
          </h2>
        </li>
        <li>
          <h2>
            <router-link to="/product" @click="mobileMenu">Product</router-link>
          </h2>
        </li>
        <li v-if="isAuth">
          <h2>
            <router-link to="/dashboard" @click="mobileMenu">Dashboard</router-link>
          </h2>
        </li>
        <li v-if="isAuth">
          <h2>
            <router-link class="logout" to="/" @click="logout(), mobileMenu()">Déconnexion</router-link>
          </h2>
        </li>
        <li v-if="!isAuth">
          <h2>
            <a :href="discordAuthLink">Se connecter</a>
          </h2>
        </li>
      </ul> 
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
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
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
            display: none;
          }
          @media screen and (max-width: 768px) {
          }
        }
        .navbar-mobile-logo {
          display: none;
          @media screen and (max-width: 1024px) {
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
        .desktop-container {
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 800;
    padding: 30px 10px;
    position: fixed;
    top: -100vh;
    right: var(--center-padding);
    width: 300px;
    background-color: var(--secondary-color);
    transition: all .8s ease-in-out;
    box-shadow: -1px 0px 6px rgba(0, 0, 0, 0.3);
    &.active {
      top: 100px;
    }
    h2, p{
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
      gap: 20px;
      align-items: center;
      .logout {
        a{
         color: var(--alert-color);
        }
      }
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
  .desktop-container{
    display: flex;

    .dropdown{
      position: relative;
      .dropdownContainer{
        display: none;
      }
      .dropdownLabel{
        font-weight: var(--medium-weight);
        font-size: 18px;
        margin: 0 20px;
        &:hover{
          cursor: default;
        }
      }
      &:hover .dropdownContainer{
        background-color: var(--mode-color);
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
        width: 250px;
        transform: translateX(-25%);
        a{
          padding: 20px 0;
          width: 100%;
          margin: 0;
        }
        a:hover {
          background-color: #ededed;
        }
      }
    }
  }
  .mobile-nav{
    z-index: 998;
    height: calc(100vh - 100px);
    top: -100vh;
    width: 100%;
    background-color: var(--primary-color);
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all .8s ease-in-out;
    &.active{
      top: 100px;
    }
    ul{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 25px;
      list-style: none;
      .logout{
        color: var(--alert-color);
      }
    }
  }
</style>