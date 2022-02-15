import { useState, createContext, useRef } from "react";
import { getTempByName } from "./api/connection";
import Forecast from "./components/Forecast";
import { timestampToHour } from "./utilities/functions";
import { GlobalStyles, Title as PageTitle} from "./styles";
import {Container} from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import MyNavbar from './components/Navbar/';
import MyFooter from "./components/Footer";
import AirQuality from "./components/AirQuality";
import WinDir from "./components/WindDir";
import Loading from "./components/Loading";
import { useQuery } from "react-query";
import PrincipalCard from './components/PrincipalCard';

Chart.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LoadContext = createContext();

function App() {
  const [load, setLoad] = useState(false);
  const city = useRef(null);

  const { data } = useQuery('climate', async () => {
    setLoad(true)
    const response = await getTempByName(city.current)
    setLoad(false)

    return response.data
  })

  return (
    <>
    <GlobalStyles />
    <LoadContext.Provider value={load}>

      <MyNavbar cityRef={city}/>

      <Loading/>

      <Container style={{display: load ? 'none' : ''}}>
        <PageTitle className="mt-3" >{data ? `Tempo agora em ${data.location.name}` : ''}<sup className="fs-5">{data ? `${data.location.country}` : ''}</sup></PageTitle>

        <div className="d-flex flex-wrap justify-content-evenly">
          {data ? <PrincipalCard data={data}/> : <></>}

          {data ? <AirQuality air={data?.current.air_quality}/> : <></>}

          {data ? <WinDir winddir={data?.current.wind_dir}/> : <></>}
        </div>

          <Line style={{maxHeight: '300px'}}
          data={{
            labels: data ? data.forecast.forecastday[0].hour.map(i => timestampToHour(i.time_epoch)) : [],
            datasets: [{
              label: 'Temperatura (ºC)',
              data: data ? data.forecast.forecastday[0].hour.map(i => i.temp_c) : [],
              borderColor: 'rgb(153, 61, 0)',
              borderWidth: 3
            },
            {
              label: 'Chuva (%)',
              data: data ? data.forecast.forecastday[0].hour.map(i => i.chance_of_rain) : [],
              borderColor: 'rgb(51, 153, 255)',
              borderWidth: 3
            },
            {
              label: 'Vento (km/h)',
              data: data ? data.forecast.forecastday[0].hour.map(i => i.wind_kph) : [],
              borderColor: 'rgb(153, 153, 153)',
              borderWidth: 3
            }
          ]
          }}
          />

        <div className="mt-3 d-flex flex-wrap justify-content-center">
          {
            data?.forecast.forecastday.map(forecast => {
              return(
                <Forecast key={forecast.date_epoch} forecast={forecast}/>
              )
            })
          }
        </div>

      </Container>

      <MyFooter/>
    </LoadContext.Provider>

    </>
  );
}

export default App;
