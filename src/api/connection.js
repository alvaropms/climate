import axios from "axios";

const appid = '11517514426bb97c61003389242c598e';
const units = 'metric';
const lang = 'pt_br';

export const weather =  axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
});

export const city = axios.create({
    baseURL: 'https://ipapi.co'
});

export async function getCity(){
    return city.get('json');
}

export async function getTemp(lat, lon){
    return weather.get('weather', {
        params: {
            'lang': lang,
            'units': units,
            'appid': appid,
            'lat': lat,
            'lon': lon
        }
    });
}

export async function getTempByName(name){
    return weather.get('weather', {
        params: {
            'lang': lang,
            'units': units,
            'appid': appid,
            'q':name
        }
    });
}

export function getIcon(id){
    return `http://openweathermap.org/img/wn/${id}@2x.png`;
}