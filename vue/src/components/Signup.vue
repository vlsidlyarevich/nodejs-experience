<template>

    <div class="register-box">
        <div class="register-logo">
            <a v-link="'home'"><b>Blog</b></a>
        </div>
        <div class="register-box-body">
            <p class="login-box-msg">Register a new membership</p>

            <div class="alert alert-danger" v-if="error">
                <p>{{ error }}</p>
            </div>

            <div class="custom-form-group form-group has-feedback">
                <input class="form-control" placeholder="Email" type="email" v-model="credentials.email">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="custom-form-group form-group has-feedback">
                <input class="form-control" placeholder="Password" type="password" v-model="credentials.password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="custom-form-group form-group has-feedback">
                <input class="form-control" placeholder="Retype password" type="password"
                       v-model="credentials.confirmedPassword">
                <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
            </div>
            <div class="custom-form-group form-group has-feedback">
                <input class="form-control" placeholder="First Name" type="text" v-model="credentials.firstName">
                <span class="glyphicon form-control-feedback"></span>
            </div>
            <div class="custom-form-group form-group has-feedback">
                <input class="form-control" placeholder="Second Name" type="text" v-model="credentials.secondName">
                <span class="glyphicon form-control-feedback"></span>
            </div>
            <div class="custom-form-group form-group has-feedback">
                <input class="form-control" placeholder="Username" type="text" v-model="credentials.username">
                <span class="glyphicon form-control-feedback"></span>
            </div>

            <div class="row">
                <div class="span2">
                    <button class="btn btn-primary btn-block btn-flat" @click="submit()">Register</button>
                </div>
            </div>

            <a href="#/login" class="text-center">I already have a membership</a>
        </div>
    </div>

</template>

<script>
    import auth from '../auth'
    export default {
        data() {
            return {
                credentials: {
                    firstName: '',
                    secondName: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmedPassword: ''
                },
                error: ''
            }
        },
        methods: {
            isEmailValid(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            submit() {
                if (this.credentials.confirmedPassword !== this.credentials.password) {
                    this.error = 'Password and confirmed password don\'t match!'
                }else if(!this.isEmailValid(this.credentials.email)){
                    this.error = 'Email is not valid!'
                } else {
                    var credentials = {
                        username: this.credentials.username,
                        password: this.credentials.password,
                        firstName: this.credentials.firstName,
                        secondName: this.credentials.secondName,
                        email: this.credentials.email,
                    }
                    auth.signup(this, credentials, '/login')
                }
            }
        }
    }
</script>