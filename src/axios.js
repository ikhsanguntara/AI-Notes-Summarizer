import axios from "axios"
const instance = axios.create({
    // headers: {
    //   'Authorization': localStorage.getItem('token')
    // },
    baseURL: 'https://go-vue-rs.herokuapp.com/'
})