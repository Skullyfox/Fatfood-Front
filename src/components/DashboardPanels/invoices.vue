<script>
import { useHead } from '@vueuse/head';
    export default {
        name: "invoicesDashboard",
        data() {
            return{}
        },
        props : {
            authData : Object
        },
        methods : {},
        mounted() {
            useHead({
            title: 'Historique des commandes | Fatfood',
            })
        }
    }
</script>

<template>
    <div class="container">
        <h1>Historique des commandes</h1>
        <div class="content">
            <p>Aucunes commandes n'a été effectué</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container{
        width: 100%;
        .content{
        }
    }
</style>