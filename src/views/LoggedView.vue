<script>
import axios from "axios";
import qs from "qs";

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
                    authorization: `${tokenType} ${accessToken}`,
                },
            })
                .then(response => {
                    console.log(response.data);
                    const { id, avatar, username, discriminator, email } = response.data;
                    this.name = username;
                    this.discriminator = discriminator;
                    this.avatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`;
                    this.id = id;
                    let APIUrl = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:5200' : 'https://fatfood-api.creartcom.fr'
                    let data = qs.stringify({
                        password: `${id}${username}`,
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
                            this.$emit('authentified', this.id, this.name, this.avatar, jwt);
                        })
                        .catch((error) => {
                            let { response } = error;
                            if (response.data.error.status === 400) {
                                let data = qs.stringify({
                                    password: `${id}${username}`,
                                    identifier: `${email}`,
                                });

                                let config = {
                                    method: "post",
                                    maxBodyLength: Infinity,
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
                                        this.$emit('authentified', this.id, this.name, this.avatar, jwt);
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