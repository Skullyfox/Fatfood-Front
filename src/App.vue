<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { useFavicon } from '@vueuse/core'

const icon = useFavicon();
icon.value = '@/assets/img/icon.png';
//import axios from 'axios';

export default {
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      theme: 'default',
      isAuth: false,
      authData: {}
    }
  },
  beforeMount() {
    //axios.get('https://fatfood-api.creartcom.fr/'); //Preload free hosting from Railway to be sure the API is available for requests
    const dataToGet = ['id', 'discordId', 'name', 'avatar', 'jwtToken', 'email', 'lastConnection'];
    const {id, discordId, name, avatar, jwtToken, email, lastConnection} = dataToGet.reduce((acc, key) => {
      acc[key] = localStorage.getItem(key);
      return acc;
    }, {});

    if (id && discordId && name && avatar && jwtToken) {
      let today = Date.now();
      let msElapsed = today - lastConnection;
      let hoursElapsed = Math.round(msElapsed / (1000 * 60 * 60));
      if(Math.floor(hoursElapsed / 24) < 2){
        this.isAuth = true;
        this.authData = {
          id: id,
          discordId: discordId,
          name: name,
          avatar: avatar,
          token: jwtToken,
          email: email
        } 
      } else {
          this.Logout();
      }
    } else {
      // TODO: redirect to login page
      return;
    }
  },
  methods: {
    Auth(id, discordId, name, avatar, email, jwt) {
      this.authData = {
        id: id,
        discordId: discordId,
        name: name,
        avatar: avatar,
        email: email,
        token: jwt
      }
      localStorage.setItem('id', id);
      localStorage.setItem('discordId', discordId);
      localStorage.setItem('name', name);
      localStorage.setItem('avatar', avatar);
      localStorage.setItem('jwtToken', jwt);
      localStorage.setItem('email', email);
      localStorage.setItem('lastConnection', Date.now());
      this.isAuth = true;
      this.$router.push('dashboard');
    },
    Logout() {
      localStorage.removeItem('id');
      localStorage.removeItem('discordId');
      localStorage.removeItem('name');
      localStorage.removeItem('avatar');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('email');
      localStorage.removeItem('lastConnection');
      this.isAuth = false;
      this.$router.push('/');
    }
  }
}
</script>

<template :class="theme">
  <div id="app" :class="theme">
    <NavBar 
      @logout="Logout"
      :isAuth="isAuth" 
      :authData="authData" />
    <router-view 
      @authentified="Auth"
      :authData="authData"/>
    <Footer />
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;500&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

  $themes: (
    "default": (
      primary: rgb(249, 177, 71),
      primaryShadow: rgba(249, 177, 71, .3),
      secondary: rgb(118, 94, 61),
      alert: rgb(229, 80, 57),
      mode: rgb(250, 250, 250),
      modeShadow: rgba(250, 250, 250, .3),
      modeInvert: rgb(43, 45, 66),
      modeInvertShadow: rgba(43, 45, 66, .3)
    ),
    "default-dark": (
      primary: rgb(118, 94, 61),
      primaryShadow: rgba(118, 94, 61, .3),
      secondary: rgb(249, 177, 71),
      alert: rgb(229, 80, 57),
      mode: rgb(43, 45, 66),
      modeShadow: rgba(43, 45, 66, .3),
      modeInvert: rgb(250, 250, 250),
      modeInvertShadow: rgba(250, 250, 250, .3)
    ),
  );

  @mixin theme($theme-name) {
    $theme: map-get($themes, $theme-name); 

    --primary-color: #{map-get($theme, primary)};
    --primary-shadow-color: #{map-get($theme, primaryShadow)};
    --secondary-color: #{map-get($theme, secondary)};
    --alert-color: #{map-get($theme, alert)};
    --mode-color: #{map-get($theme, mode)};
    --mode-shadow-color: #{map-get($theme, modeShadow)};
    --mode-invert-color: #{map-get($theme, modeInvert)};
    --mode-invert-shadow-color: #{map-get($theme, modeInvertShadow)};
  }

  :root{
    --primary-font : 'Bebas Neue', cursive;
    --secondary-font : 'Inter', sans-serif;
    --title-size: 2.3em;
    --subtitle-size: 1.8em;
    --variant-size: 1.3em;
    --text-size: 1em;
    --light-weight: 300;
    --medium-weight: 500;
    --center-padding: calc((100vw - 1024px) / 2)
  }

  body, *{
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-family: var(--secondary-font);
    font-size: var(--text-size);
    font-weight: var(--light-weight);
    color: var(--secondary-color);
  }

  body{
    overflow-x: hidden;
    background: var(--mode-color);
  }

  a{
    font-weight: var(--medium-weight);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--primary-font);
  }

  h1 {
    font-size: var(--title-size);
    font-weight: var(--medium-weight);
  }

  h2 {
    font-size: var(--subtitle-size);
    font-weight: var(--medium-weight);
  }
  h3 {
    font-size: var(--variant-size);
  }
  ul{
    list-style: none;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: var(--mode-color);
    &.default {
      @include theme('default');
    }
  }
</style>
