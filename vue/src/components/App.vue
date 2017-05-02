<template>
    <div class="navbar navbar-fixed-top navbar-inverse">
        <div class="navbar-inner">
            <div class="container">

                <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="brand" v-link="'home'"><span class="sap">j</span> Developers</a>

                <div class="nav-collapse collapse pull-right">
                    <ul class="nav">
                        <li v-bind:class="{ active: isActive('/home') }">
                            <a v-link="'home'">Home</a>
                        </li>

                        <li v-bind:class="{ active: isActive('/posts') }">
                            <a v-link="'posts'">Posts</a>
                        </li>

                        <li v-bind:class="{ active: isActive('/login') }" v-if="!user.authenticated">
                            <a v-link="'login'">Login</a>
                        </li>

                        <li v-bind:class="{ active: isActive('/signup') }">
                            <a v-link="'signup'">Sign Up</a>
                        </li>

                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                               aria-expanded="false">Dropdown <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li v-bind:class="{ active: isActive('/personal-info') }">
                                    <a v-link="'personal-info'">PersonalInfo</a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li v-bind:class="{ active: isActive('/logout') }">
                                    <a @click="logout()" v-link="'login'">Logout</a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>

    <router-view></router-view>

    <div class="footer navbar-fixed-bottom">
        <div class="container">
            <div class="copyright">
                <ul class="inline primary">
                    <li> © 2017 AP  </li>
                    <li><a href="#"> Privacy  </a></li>
                    <li><a href="#"> Terms of Use  </a></li>
                    <li><a href="#"> Copyright  </a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '../auth'
    export default {
        data() {
            return {
                user: auth.user
            }
        },
        methods: {
            logout() {
                auth.logout(true)
            },
            isActive (page) {
                return this.$route.path === page
            }
        }
    }
</script>
