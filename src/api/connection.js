import axios from "axios";

export const weather =  axios.create({
    baseURL:'https://api.hgbrasil.com/weather?key=253f4c5f&user_ip=remote',
    headers:{'Access-Control-Allow-Origin': '*'}
})