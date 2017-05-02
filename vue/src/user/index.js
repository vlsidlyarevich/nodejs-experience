import {router} from '../index'
import auth from '../auth'

const API_URL = 'http://localhost:8000/'
const USERS_URL = API_URL + 'api/users/'
// const CURRENT_USER_URL = API_URL + 'api/user/'

export default {
    // getCurrentUser(context){
    //     return new Promise(function (resolve, reject) {
    //         context.$http.get({
    //             url: CURRENT_USER_URL, method: 'GET', headers: auth.getAuthHeader()
    //         }).then((data) => {
    //             resolve(data)
    //         }, error => {
    //             reject(error)
    //         });
    //     });
    // },

    deleteUser(context, userId){
        return new Promise(function (resolve, reject) {
            context.$http.delete({
                url: USERS_URL + userId, method: 'DELETE'
                // , headers: auth.getAuthHeader()
            }).then((data) => {
                resolve(data)
            }, error => {
                reject(error)
            });
        });
    },

    updateUser(context, userToUpdate){
        return new Promise(function (resolve, reject) {
            context.$http.put({
                url: USERS_URL + userToUpdate.id,
                method: 'PUT',
                data: userToUpdate,
                // headers: auth.getAuthHeader()
            }).then((data) => {
                resolve(data)
            }, error => {
                reject(error)
            });
        });
    },

    getUsers(context){
        return new Promise(function (resolve, reject) {
            context.$http.get({
                url: USERS_URL,
                method: 'GET',
                // headers: auth.getAuthHeader()
            }).then((data) => {
                resolve(data)
            }, error => {
                reject(error)
            });
        });
    }
}
