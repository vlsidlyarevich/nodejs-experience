<template>
    <div class="container">
        <div class="row top-buffer">
            <div class="col-sm-6 col-sm-offset-3">
                <h3>General</h3>
                <div class="alert alert-danger" v-if="error">
                    <p>{{ error }}</p>
                </div>
                <div class="alert alert-info" v-if="info">
                    <p>{{ info }}</p>
                </div>

                <div class="form-group has-feedback top-buffer">
                    <input class="form-control" placeholder="Email" type="email" v-model="credentials.username">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                </div>
                <div class="row">
                    <div class="span2">
                        <button class="btn-sm btn-primary btn-block" @click="changeEmail()">Change email</button>
                    </div>
                </div>


                <div class="form-group has-feedback top-buffer">
                    <input class="form-control" placeholder="Password" type="password" v-model="credentials.password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div class="form-group has-feedback">
                    <input class="form-control" placeholder="Retype password" type="password"
                           v-model="credentials.confirmedPassword">
                    <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
                </div>
                <div class="row">
                    <div class="span2">
                        <button class="btn-sm btn-primary btn-block" @click="changePassword()">Change password
                        </button>
                    </div>
                </div>

                <div class="row top-buffer">
                    <div class="span2">
                        <button class="btn-link" @click="deleteUser()">Delete this account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '../auth'
    import user from '../user'
    import {router} from '../index'
    export default {
        data() {
            return {
                user: {
                    id: '',
                    username: '',
                    password: ''
                },
                credentials: {
                    username: '',
                    password: '',
                    confirmedPassword: ''
                },
                error: '',
                info: ''
            }
        },
        methods: {
            isEmailValid(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            changeEmail() {
                this.clearMessages();
                let vm = this;
                if (!this.isEmailValid(this.credentials.username)) {
                    this.error = 'Email is not valid!'
                } else {
                    user.getCurrentUser(this)
                        .then(result => {
                                this.user = result.data;
                                this.user.username = this.credentials.username;
                                this.user.authorities = ''
                                user.updateUser(this, this.user).then(result => {
                                        this.info = 'Updated'
                                        auth.user.username = this.user.username;
                                        auth.logout()
                                        auth.login(this, this.user, this)
                                    },
                                    error => {
                                        this.error = error.data;
                                    })
                            },
                            error => {
                                this.error = error;
                            }
                        );
                }
            },
            changePassword() {
                this.clearMessages();
                let vm = this;
                if (this.credentials.confirmedPassword !== this.credentials.password) {
                    this.error = 'Password and confirmed password don\'t match!'
                } else {
                    user.getCurrentUser(this)
                        .then(result => {
                                this.user = result.data;
                                this.user.password = this.credentials.password;
                                this.user.authorities = ''
                                user.updateUser(this, this.user)
                                    .then(result => {
                                            this.info = 'Updated'
                                            auth.user.password = this.user.password;
                                            auth.logout()
                                            auth.login(this, this.user, this)
                                        },
                                        error => {
                                            this.error = error.data;
                                        })
                            },
                            error => {
                                this.error = error;
                            }
                        );
                }
            },
            deleteUser(){
                this.clearMessages();
                bootbox.confirm({
                    message: "Do you really want to delete your account?",
                    size: "small",
                    buttons: {
                        confirm: {
                            label: 'Yes',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'No',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if (result) {
                            user.deleteUser(this, auth.user.id)
                                .then(result => {
                                        auth.logout(true);
                                        router.go('login')
                                    },
                                    error => {
                                        this.error = error;
                                    }
                                );
                        }
                    }.bind(this)
                });

            },
            clearMessages(){
                this.error = '';
                this.info = '';
            }
        }
    }
</script>