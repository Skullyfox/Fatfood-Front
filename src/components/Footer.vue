<script>
    export default {
        name: "footerComponent",
        data() {
            return{}
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
                    <router-link to="/">Création de burger</router-link>
                </li>
                <li>
                    <router-link to="/">Tendances de la communauté</router-link>
                </li>
            </ul>
        </div>
        <div class="center">
            <img src="@/assets/img/logo-small.png" alt="small logo"/>
        </div>
        <div class="right">
            <ul>
                <li>
                    <router-link to="/">Se connecter</router-link>
                </li>
                <li>
                    <router-link to="/">Conditions générales de vente</router-link>
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
            justify-content: start;
            align-items: center;
            ul{
                li{
                    text-align: start;
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
            justify-content: end;
            align-items: center;
            ul{
                li{
                    text-align: end;
                }
            }
        }
    }
</style>