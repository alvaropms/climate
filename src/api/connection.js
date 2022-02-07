import axios from "axios";

export const weather =  axios.create({
    baseURL:'https://api.hgbrasil.com/weather?key=aa0eca0d&user_ip=remote',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        
        'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'cache-control': 'max-age=0',
        
        'if-none-match': 'W/"3267ea5d99e709c96ada25c0b213303b"',

        'upgrade-insecure-requests': 1
    }
})