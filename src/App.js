import { useState, createContext, useRef } from "react";
import { getTempByName } from "./api/connection";
import Forecast from "./components/Forecast";
import { timestampToHour } from "./utilities/functions";
import { GlobalStyles, Grid, Title as PageTitle, PrincipalCard} from "./styles";
import {Container, Card} from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import MyNavbar from './components/Navbar/';
import MyFooter from "./components/Footer";
import AirQuality from "./components/AirQuality";
import WinDir from "./components/WindDir";
import Loading from "./components/Loading";
import { useQuery } from "react-query";

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
          <PrincipalCard style={{width: '250px'}} className='mb-1' bg={'dark'} text={'light'}>
            <Card.Body className="d-flex flex-column flex-wrap justify-content-evenly">
              <div>
                <Card.Title className="text-center">
                  <img alt='icon' src={data ? data.current.condition.icon : ''} />
                  <b className="fs-1">{data ? data.current.temp_c + "ºC" : ''}</b>
                </Card.Title>
                <Card.Text className="d-flex flex-row flex-wrap justify-content-around">
                  <span className="fs-6" >{data ? data.current.condition.text: ''}</span>
                </Card.Text>
              </div>
              <div>
                <Card.Title style={{minHeight: '64px'}} className="fs-6 d-flex flex-row flex-wrap justify-content-around">
                  <Grid className="me-3" column>
                    <Grid>
                      <i className="me-1 bi bi-thermometer-high text-danger"></i>
                      <span>{data ? data.forecast.forecastday[0].day.maxtemp_c + "ºC": ''}</span>
                    </Grid>
                    <Grid>
                      <i className="me-1 bi bi-thermometer-low text-primary"></i>
                      <span>{data ? data.forecast.forecastday[0].day.mintemp_c + "ºC": ''}</span>
                    </Grid>
                    <Grid>
                      <i className="me-1 bi bi-wind"></i>
                      <span>{data ? data.current.wind_kph + " km/h": ''}</span>
                    </Grid>
                  </Grid>
                  <Grid className="me-3" column>
                  <Grid>
                      <i className="me-1 bi bi-speedometer2 text-success"></i>
                      <span>{data ? data.current.pressure_mb + " hPa": ''}</span>
                    </Grid>
                    <Grid>
                      <i className="me-1 bi bi-droplet text-info"></i>
                      <span>{data ? data.current.humidity + "%": ''}</span>
                    </Grid>
                    <Grid>
                      <i className="me-1 text-warning bi bi-clock"></i>
                      <span>{data ? timestampToHour(data.location.localtime_epoch) : ''}</span>
                    </Grid>
                  </Grid>
                </Card.Title>
                <Card.Text className="fs-6 text-center">
                  {data ? data.forecast.forecastday[0].astro.sunrise: ''}
                  <i className="bi bi-brightness-alt-high text-warning mx-1"></i>
                  {data ? data.forecast.forecastday[0].astro.sunset: ''}
                </Card.Text>
              </div>
            </Card.Body>
          </PrincipalCard>

          <AirQuality air={data?.current.air_quality}/>

          <WinDir winddir={data?.current.wind_dir}/>
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

        <Grid className="mt-3" justify={'center'}>
          {
            data?.forecast.forecastday.map(forecast => {
              return(
                <Forecast key={forecast.date_epoch} forecast={forecast}/>
              )
            })
          }
        </Grid>

      </Container>

      <MyFooter/>
    </LoadContext.Provider>

    </>
  );
}

export default App;
