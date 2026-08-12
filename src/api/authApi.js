import axios from 'axios'

const authApi = axios.create({
    baseURL: '/firebase-api/v1/accounts',
    params:{
        key: process.env.VUE_APP_FIREBASE_API_KEY
    }
})

export default authApi