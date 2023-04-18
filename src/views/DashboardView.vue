<script>
    export default {
        data() {
            return{}
        },
        props : {
            authData : Object
        }
    }
</script>

<template>
    <div class="Container">
        <div class="dashboard-navigation">
            <img :src="authData.avatar" />
            <h2 class="title">Dashboard</h2>
            <ul>
                <li>
                    <p>Données personnelles</p>
                    <i class="fas fa-angle-right"></i>
                </li>
                <li>
                    <p>Historique des commandes</p>
                    <i class="fas fa-angle-right"></i>
                </li>
                <li>
                    <p>Mes recettes</p>
                    <i class="fas fa-angle-right"></i>
                </li>
            </ul>
        </div>
        <div class="dashboard-view"></div>
    </div>
</template>

<style scoped lang="scss">
    .Container{
        display: grid;
        grid-template-columns: minmax(300px, 1fr) minmax(725px, 2fr);
        height: 100vh;
        .dashboard-navigation{
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            padding: 120px 40px 0 20px ;
            .title{
                margin: 20px 0;
            }
            ul{
                width: 100%;
                list-style: none;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                li{
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0px;
                    width: 100%;
                    border: solid rgba(0, 0, 0, 0.3);
                    border-width: 1px 0 0 0;
                    &:hover{
                        background-color: rgba(0, 0, 0, 0.3);
                        cursor: pointer;
                        p,i{   
                            color: var(--mode-color);
                        }
                    }
                    p,i{
                        padding: 0 20px;
                    }
                }
            }
        }
    }
</style>