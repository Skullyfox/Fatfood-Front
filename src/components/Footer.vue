<script>
    export default {
        name: "footerComponent",
        data() {
            return{
                discordAuthLink: process.env.NODE_ENV !== 'production' 
                    ? "https://discord.com/api/oauth2/authorize?client_id=1097787484622041129&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogged&response_type=token&scope=identify%20guilds" 
                    :"https://discord.com/api/oauth2/authorize?client_id=1097787484622041129&redirect_uri=https%3A%2F%2Ffatfood-front.vercel.app%2Flogged&response_type=token&scope=identify%20email",
            }
        },
        methods : {}
    }
</script>

<template>
    <div class="container">
        <div class="left">
            <ul>
                <li>
                    <router-link to="/">Accueil</router-link>
                </li>
                <li>
                    <router-link to="/create">Création de burger</router-link>
                </li>
                <li>
                    <router-link to="/recettes">Tendances de la communauté</router-link>
                </li>
            </ul>
        </div>
        <div class="center">
            <img src="@/assets/img/logo-small.png" alt="small logo"/>
        </div>
        <div class="right">
            <ul>
                <li>
                    <router-link :to="discordAuthLink">Se connecter</router-link>
                </li>
                <li>
                    <router-link to="/conditionsdevente">Conditions générales de vente</router-link>
                </li>
                <li>
                    <router-link to="/">Mentions légales</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container{
        @media  screen and (max-width: 1024px) {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;
        }
        background-color: var(--secondary-color);
        display: grid;
        grid-template-columns: 2fr 1fr 2fr;
        height: 250px;
        padding: 0 var(--center-padding);
        ul{
            list-style: none;
            li{
                padding: 5px 0;
                &:hover{
                    a{
                        color: var(--primary-color);
                    }
                }
                a{
                    color: var(--mode-color);
                }
            }
        }
        .left{
            @media  screen and (max-width: 1024px) {
                display: none;
            }
            display: flex;
            justify-content: flex-start;
            align-items: center;
            ul{
                li{
                    text-align: flex-start;
                }
            }
        }
        .center {
            @media  screen and (max-width: 1024px) {

            }
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 80px;
            }
        }
        .right {
            @media  screen and (max-width: 1024px) {
                display: none;
            }
            display: flex;
            justify-content: flex-end;
            align-items: center;
            ul{
                li{
                    text-align: flex-end;
                }
            }
        }
    }
</style>