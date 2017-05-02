<template>

    <div class="hold-transition">
        <div class="login-box">
            <div class="login-logo">
                <a v-link="'home'"><b>Assistant Programmer</b></a>
            </div>
            <div class="login-box-body">
                <p class="login-box-msg">Log in to your account to start your session.</p>
                <div class="alert alert-danger" v-if="error">
                    <p>{{ error }}</p>
                </div>
                <div class="custom-form-group form-group has-feedback">
                    <input v-on:keyup.enter="submit"
                           type="email"
                           class="form-control"
                           placeholder="Enter your username"
                           v-model="credentials.username">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                </div>
                <div class="custom-form-group form-group has-feedback">
                    <input v-on:keyup.enter="submit"
                           type="password"
                           class="form-control"
                           placeholder="Enter your password"
                           v-model="credentials.password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <button class="btn btn-primary" @click="submit()">Log In</button>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '../auth'
    export default {
        data() {
            return {
                credentials: {
                    username: '',
                    password: ''
                },
                error: ''
            }
        },
        methods: {
            submit() {
                var credentials = {
                    username: this.credentials.username,
                    password: this.credentials.password
                }
                var redirect = 'home';
                auth.login(this, credentials, redirect)
            }
        }
    }
</script>