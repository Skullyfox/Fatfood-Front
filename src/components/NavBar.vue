<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        mobileMenuStatus: false,
        cartStatus: false,
        accountContainerStatus: false,
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
          <router-link to="/about">About</router-link>
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
          <div class="navbar-icon" @click="accountContainer">
            <i class="fas fa-user"></i>
          </div>
          <div class="navbar-icon" @click="activeCart">
            <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
    </nav>
    <div class="account-container" :class="{'active': accountContainerStatus}">

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
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      padding: 0 0 0 30px;
    }
    .navbar-logo {
      @media screen and (max-width: 1024px) {
          display: flex;
          justify-content: center;
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
        padding: 0 40px;
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
      @media screen and (max-width: 1024px) {
        display: none;
      }

      .navbar-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 20px;
        background-color: var(--secondary-color);
        border: 2px solid var(--secondary-color);
        &:hover{
          cursor: pointer;
        }
        i {
          color: var(--mode-color);
        }
      }
    }
  }
  .cart-container {
    z-index: 800;
    padding: 30px 10px;
    position: absolute;
    top: 100px;
    left: 100vw;
    height: calc(100vh - 100px);
    width: 500px;
    background-color: var(--secondary-color);
    transition: all .5s ease-in-out;
    box-shadow: -1px 0px 6px rgba(0, 0, 0, 0.3);
    &.active {
      left: calc(100vw - 500px);
    }
    h2{
      color: var(--mode-color);
    }
  }
  .account-container {
    z-index: 799;
    padding: 30px 10px;
    position: absolute;
    top: calc(100px - 100vh);
    left: calc(100vw - 500px);
    height: calc(100vh - 100px);
    width: 500px;
    background-color: var(--primary-color);
    transition: all .8s ease-in-out;
    box-shadow: -1px 0px 6px rgba(0, 0, 0, 0.3);
    &.active {
      top: 100px;
    }
    h2{
      color: var(--mode-color);
    }
  }
</style>