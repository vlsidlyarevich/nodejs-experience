import {router} from '../index'
import user from '../user'

const API_URL = 'http://localhost:8000/'
const LOGIN_URL = API_URL + 'api/auth'
const SIGNUP_URL = API_URL + 'api/users'

export default {
    user: {
        authenticated: false,
       // authorities: '',
       // id: '',
        //username: ''
    },
    login(context, creds, redirect) {
        context.$http.post(LOGIN_URL, creds, (data) => {
           localStorage.setItem('x-auth-token', data.token)

           this.user.authenticated = true;
            //this.setUserDetails(context);

            if (redirect) {
                router.go(redirect)
            }

        }).error((err) => {
            context.error = err
        })
    },

    // setUserDetails(context, callback){
    //     if (this.user.authenticated) {
    //         user.getCurrentUser(context)
    //             .then(result => {
    //                     this.user.authorities = result.data.authorities;
    //                     this.user.id = result.data.id;
    //                     this.user.username = result.data.username;
    //                     callback(arguments[2]);
    //                 },
    //                 error => {
    //                     console.log(error);
    //                 }
    //             );
    //     }
    // },

    signup(context, creds, redirect) {
        context.$http.post(SIGNUP_URL, creds, (data) => {

            if (redirect) {
                router.go(redirect)
            }

        }).error((err) => {
            context.error = err
        })
    },

    logout(context) {
        localStorage.removeItem('x-auth-token');
        this.user.authenticated = false;
        // if (!!context) {
        //     location.reload();
        // }
    },

    checkAuth() {
        var jwt = localStorage.getItem('x-auth-token');
        this.user.authenticated = !!jwt;
    },

    getAuthHeader() {
        return {
            'x-auth-token': localStorage.getItem('x-auth-token')
        }
    }
}
