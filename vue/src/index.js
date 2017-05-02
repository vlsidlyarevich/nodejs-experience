import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Posts from './components/Posts.vue'
import PersonalInfo from './components/Posts.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import auth from './auth'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

auth.checkAuth()
// auth.setUserDetails(new Vue());

export var router = new VueRouter()

router.map({
    '/home': {
        component: Home
    },
    '/posts': {
        component: Posts
    },
    '/personal-info': {
        component: PersonalInfo
    },
    '/login': {
        component: Login
    },
    '/signup': {
        component: Signup
    }
})


// router.beforeEach(function (transition) {
//     if (auth.user.authenticated && auth.user.authorities.toString().length < 1) {
//         auth.setUserDetails(new Vue(), redirect, transition);
//     } else {
//         redirect(transition)
//     }
// });
//
// function redirect(transition) {
//     if (transition.to.authenticatedOnly && auth.user.authenticated === false) {
//         transition.redirect('/login');
//     } else if (transition.to.adminOnly && auth.user.authorities !=  'ROLE_ADMIN') {
//         transition.redirect('/home');
//     } else if (transition.to.userOnly && auth.user.authorities == 'ROLE_ADMIN') {
//         transition.redirect('/admin-home');
//     }
//     else {
//         transition.next();
//     }
// }

router.redirect({
    '*': '/home'
})

router.start(App, '#app')

