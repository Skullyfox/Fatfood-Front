<script>
import personnalDashboard from '../components/DashboardPanels/personnal.vue';
import invoicesDashboard from '../components/DashboardPanels/invoices.vue';
import recipesDashboard from '../components/DashboardPanels/recipes.vue';
import { useHead } from '@vueuse/head';

export default {
    data() {
        return {
            activePanel: "personnal"
        }
    },
    components: {
        personnalDashboard,
        invoicesDashboard,
        recipesDashboard,
    },
    props: {
        authData: Object
    },
    methods: {
        changeView(panelName) {
            this.activePanel = panelName;
        },
        showActive(panelName) {
            return panelName === this.activePanel;
        }
    },
    mounted() {
        useHead({
            title: 'Accueil | Fatfood',
        })
    }
}
</script>

<template>
    <div class="Container">
        <div class="dashboard-navigation">
            <img :src="authData.avatar" />
            <h2 class="title">Dashboard</h2>
            <ul>
                <li @click="changeView('personnal')" :class="{ active: showActive('personnal') }">
                    <p>Données personnelles</p>
                    <i class="mobileIcon fas fa-user"></i>
                    <i class="fas fa-angle-right"></i>
                </li>
                <li @click="changeView('invoices')" :class="{ active: showActive('invoices') }">
                    <p>Historique des commandes</p>
                    <i class="mobileIcon fas fa-clock-rotate-left"></i>
                    <i class="fas fa-angle-right"></i>
                </li>
                <li @click="changeView('recipes')" :class="{ active: showActive('recipes') }">
                    <p>Mes recettes</p>
                    <i class="mobileIcon fas fa-book-bookmark"></i>
                    <i class="fas fa-angle-right"></i>
                </li>
            </ul>
        </div>
        <div class="dashboard-view">
            <personnalDashboard :authData="authData" v-if="activePanel === 'personnal'" />
            <invoicesDashboard :authData="authData" v-if="activePanel === 'invoices'" />
            <recipesDashboard :authData="authData" v-if="activePanel === 'recipes'" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.Container {
    display: grid;
    grid-template-columns: minmax(300px, 1fr) minmax(725px, 2fr);
    min-height: 100vh;
    
    @media screen and (max-width: 1024px) {
        grid-template-columns: 70px 1fr;
    }

    .dashboard-navigation {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        padding: 120px 0;
        @media screen and (max-width: 1024px) {
            gap: 20px;
            img{
                width: 50px;
                height: 50px;
            }
            .title {
                display: none;
            }
        }
        .title {
            margin: 20px 0;
        }

        ul {
            width: 100%;
            list-style: none;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            li {
                display: flex;
                justify-content: space-between;
                padding: 10px 0px;
                width: 100%;
                border: solid rgba(0, 0, 0, 0.3);
                border-width: 1px 0 0 0;

                &:hover,
                &.active {
                    background-color: rgba(0, 0, 0, 0.3);
                    cursor: pointer;

                    p,
                    i {
                        color: var(--mode-color);
                    }
                }
                p,
                i {
                    padding: 0 20px;
                }
                .mobileIcon {
                    display: none;
                }
                @media screen and (max-width: 1024px) {
                    justify-content: center;
                    align-items: center;
                    p, i:not(.mobileIcon){
                        display: none;
                    }
                    .mobileIcon {
                        display: block;
                    }
                }
            }
        }
    }

    .dashboard-view {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 120px 40px 0 20px;
    }
}
</style>