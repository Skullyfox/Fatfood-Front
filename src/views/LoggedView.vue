<script>
    import axios from "axios";

    export default {
        name: "LoggedView",
        data() {
            return {
                id: "",
                name: "",
                discriminator: "",
                avatar: "",
            }
        },
        methods: {
            getInformations() {
                const fragment = new URLSearchParams(window.location.hash.slice(1));
                const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
                if (!accessToken) {
                    return (document.getElementById('login').style.display = 'block');
                }
                
                axios.get('https://discord.com/api/users/@me', {
                    headers: {
                        authorization : `${tokenType} ${accessToken}`,
                    },
                })
                .then(response => {
                    console.log(response.data);
                    const {id, avatar, username, discriminator} = response.data;
                    this.name = username;
                    this.discriminator = discriminator;
                    this.avatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`;
                    this.id = id;
                    this.$emit('authentified', this.id, this.name, this.avatar);
                }).catch(console.error);
            }
        }
    }
</script>

<template>
    <div class="loggedView">
        {{ getInformations() }}
    </div>
</template>

<style scoped lang="scss">
.loggedView {
    padding-top: 200px;
}
</style>