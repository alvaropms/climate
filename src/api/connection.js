import axios from "axios";

const key = process.env.REACT_APP_KEY;
const days = 3;
const lang = 'pt';
const aqi = 'yes';
const alerts = 'no';

export const weather =  axios.create({
    baseURL: process.env.REACT_APP_API_WEATHER_URL
});

export const city = axios.create({
    baseURL: process.env.REACT_APP_API_IP_URL
});

export async function getCity(){
    return city.get('json');
}

export async function getTempByName(name){
    var city = ''
    if(!name){
        city = (await getCity()).data.city
    }else{
        city = name
    }
    return weather.get('forecast.json', {
        params: {
            'lang': lang,
            'key': key,
            'aqi': aqi,
            'alerts': alerts,
            'days': days,
            'q': city
        }
    });
}