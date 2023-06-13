<script>
import axios from "axios";
import qs from "qs";

export default {
    name: "LoggedView",
    data() {
        return {
            discordId: "",
            name: "",
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
                    authorization: `${tokenType} ${accessToken}`,
                },
            })
                .then(response => {
                    const { id, avatar, username, email } = response.data;
                    this.name = username;
                    this.avatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`;
                    this.discordId = id;
                    let APIUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5200' : 'https://fatfood-api.creartcom.fr'
                    let data = qs.stringify({
                        password: `${id}${username.charAt(0).toUpperCase() + username.slice(1)}`,
                        email: email,
                        username: username,
                        avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`,
                    });

                    let config = {
                        method: "post",
                        maxBodyLength: Infinity,
                        url: `${APIUrl}/api/auth/local/register`,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        data: data,
                    };
                    axios
                        .request(config)
                        .then((response) => {
                            const { jwt } = response.data;
                            const { id } = response.data.user;
                            this.$emit('authentified', id, this.discordId, this.name, this.avatar, email, jwt);
                        })
                        .catch((error) => {
                            let { response } = error;
                            if (response.data.error.status === 400) {
                                console.log(`${id}${username.charAt(0).toUpperCase() + username.slice(1)}`);
                                console.log(`${email}`);
                                let data = qs.stringify({
                                    password: `${id}${username.charAt(0).toUpperCase() + username.slice(1)}`,
                                    identifier: `${email}`,
                                });

                                let config = {
                                    method: "post",
                                    url: `${APIUrl}/api/auth/local`,
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                    data: data,
                                };
                                axios
                                    .request(config)
                                    .then((response) => {
                                        const { jwt } = response.data;
                                        const { id } = response.data.user;
                                        this.$emit('authentified', id, this.discordId, this.name, this.avatar, email, jwt);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        });
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