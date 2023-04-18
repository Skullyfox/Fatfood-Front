<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      theme: 'default',
      isAuth: false,
      authData: {}
    }
  },
  methods: {
    Auth(id, name, avatar) {
      this.authData = {
        id: id,
        name: name,
        avatar: avatar,
      }
      this.isAuth = true;
      this.$router.push('dashboard');
    }
  }
}
</script>

<template :class="theme">
  <div id="app" :class="theme">
    <NavBar :isAuth="isAuth" :authData="authData" />
    <router-view @authentified="Auth" :authData="authData"/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;500&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

  $themes: (
    "default": (
      primary: rgb(249, 177, 71),
      secondary: rgb(118, 94, 61),
      mode: rgb(250, 250, 250),
      modeShadow: rgba(250, 250, 250, .3),
      modeInvert: rgb(43, 45, 66),
      modeInvertShadow: rgba(43, 45, 66, .3)
    ),
    "default-dark": (
      primary: rgb(249, 177, 71),
      secondary: rgb(118, 94, 61),
      mode: rgb(43, 45, 66),
      modeShadow: rgba(43, 45, 66, .3),
      modeInvert: rgb(250, 250, 250),
      modeInvertShadow: rgba(250, 250, 250, .3)
    ),
  );

  @mixin theme($theme-name) {
    $theme: map-get($themes, $theme-name); 

    --primary-color: #{map-get($theme, primary)};
    --secondary-color: #{map-get($theme, secondary)};
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
