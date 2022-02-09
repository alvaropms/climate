import axios from "axios";

const key = (process.env.KEY).toString();
const days = 3;
const lang = 'pt';
const aqi = 'no';
const alerts = 'no';

export const weather =  axios.create({
    baseURL: (process.env.API_WEATHER_URL).toString()
});

export const city = axios.create({
    baseURL: (process.env.API_IP_URL).toString()
});

export async function getCity(){
    return city.get('json');
}

export async function getTempByName(name){
    return weather.get('forecast.json', {
        params: {
            'lang': lang,
            'key': key,
            'aqi': aqi,
            'alerts': alerts,
            'days': days,
            'q': name
        }
    });
}