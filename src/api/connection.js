import axios from "axios";

export const weather =  axios.create({
    baseURL:'https://api.hgbrasil.com/weather?key=aa0eca0d&user_ip=remote',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    }
})