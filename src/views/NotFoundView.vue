<template>
    <div class="notFound">
      <header>
        <img src="@/assets/img/404.png" alt="Fatfood 404" />
        <h2>La page que vous essayez de consulter n'existe pas.</h2>
        <router-link to="/">Retourner à la page d'accueil</router-link>
      </header>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'NotFoundView',
    components: {}
  }
  </script>
  
  <style lang="scss" scoped>
    .notFound{
      padding-top: 100px;
      header{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 100px);
        padding: 0 var(--center-padding);
        display: flex;
        flex-direction: column;
        gap: 20px;
        img{
            width: 300px;
        }
        a:hover{
            color: var(--primary-color);
        }
      }
    }
  </style>
  