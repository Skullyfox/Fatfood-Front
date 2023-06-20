<script>
import { useHead } from '@vueuse/head';
    export default {
        name: "personnalDashboard",
        data() {
            return{}
        },
        props : {
            authData : Object
        },
        methods : {},
        mounted() {
            useHead({
            title: 'Mon Compte | Fatfood',
            })
        }
    }
</script>

<template>
    <div class="container">
        <h1>Données personnelles</h1>
        <div class="content">
            <ul>
                <li>
                    <h2>Avatar : </h2> 
                    <img :src="authData.avatar" />
                </li>
                <li>
                    <h2>Pseudonyme : </h2> 
                    <p>{{ authData.name }}</p>
                </li>
                <li>
                    <h2>Email : </h2>
                    <p>{{ authData.email }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container{
        width: 100%;
        .content{
            ul{
                list-style: none;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                li {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 10px;
                    padding: 20px 0;
                    border-bottom: 1px solid var(--mode-invert-shadow-color);
                    width: 100%;
                    img{
                        height: 50px;
                    }
                    p{
                        font-weight: var(--medium-weight);
                        text-align: justify;
                    }
                }
            }
        }
    }
</style>