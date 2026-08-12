import axios from 'axios'

const authApi = axios.create({
    baseURL: '/firebase-api/v1/accounts',
    params:{
        key: 'AIzaSyAFYM6Py_Yrhof6kTur71t6U6LVtQODIh8'
    }
})

export default authApi