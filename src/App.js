import { useEffect, useState } from "react";
import { getCity, getTempByName } from "./api/connection";
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

Chart.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    getCity().then(
      city => {
        getTempByName(city.data.city).then(
          resp => {
            setResponse(resp.data);
          }
        );
      }
    );
  }, []);

  async function changeCity(cityName){
    getTempByName(cityName).then(
      resp => {
        setResponse(resp.data);
      },
      error => alert('Cidade não encontrada!')
    );
  }

  return (
    <>
    <GlobalStyles />

    <MyNavbar changeCity={changeCity}/>

    <Container>
      <PageTitle className="mt-3" >{response ? `Tempo agora em ${response.location.name}` : ''}<sup className="fs-5">{response ? `${response.location.country}` : ''}</sup></PageTitle>

      <div className="d-flex flex-wrap justify-content-evenly">
        <PrincipalCard style={{width: '250px'}} className='mb-1' bg={'dark'} text={'light'}>
          <Card.Body className="d-flex flex-column flex-wrap justify-content-evenly">
            <div>
              <Card.Title className="text-center">
                <img alt='icon' src={response ? response.current.condition.icon : ''} />
                <b className="fs-1">{response ? response.current.temp_c + "ºC" : ''}</b>
              </Card.Title>
              <Card.Text className="d-flex flex-row flex-wrap justify-content-around">
                <span className="fs-6" >{response ? response.current.condition.text: ''}</span>
              </Card.Text>
            </div>
            <div>
              <Card.Title style={{minHeight: '64px'}} className="fs-6 d-flex flex-row flex-wrap justify-content-around">
                <Grid className="me-3" column>
                  <Grid>
                    <i className="me-1 bi bi-thermometer-high text-danger"></i>
                    <span>{response ? response.forecast.forecastday[0].day.maxtemp_c + "ºC": ''}</span>
                  </Grid>
                  <Grid>
                    <i className="me-1 bi bi-thermometer-low text-primary"></i>
                    <span>{response ? response.forecast.forecastday[0].day.mintemp_c + "ºC": ''}</span>
                  </Grid>
                  <Grid>
                    <i className="me-1 bi bi-wind"></i>
                    <span>{response ? response.current.wind_kph + " km/h": ''}</span>
                  </Grid>
                </Grid>
                <Grid className="me-3" column>
                <Grid>
                    <i className="me-1 bi bi-speedometer2 text-success"></i>
                    <span>{response ? response.current.pressure_mb + " hPa": ''}</span>
                  </Grid>
                  <Grid>
                    <i className="me-1 bi bi-droplet text-info"></i>
                    <span>{response ? response.current.humidity + "%": ''}</span>
                  </Grid>
                  <Grid>
                    <i className="me-1 text-warning bi bi-clock"></i>
                    <span>{response ? timestampToHour(response.location.localtime_epoch) : ''}</span>
                  </Grid>
                </Grid>
              </Card.Title>
              <Card.Text className="fs-6 text-center">
                {response ? response.forecast.forecastday[0].astro.sunrise: ''}
                <i className="bi bi-brightness-alt-high text-warning mx-1"></i>
                {response ? response.forecast.forecastday[0].astro.sunset: ''}
              </Card.Text>
            </div>
          </Card.Body>
        </PrincipalCard>
        
        {
        response?
        <AirQuality air={response.current.air_quality}/>:
        <>
        </>
        }

        {
        response?
        <WinDir winddir={response.current.wind_dir}/>:
        <>
        </>
        }
      </div>


        <Line style={{maxHeight: '300px'}}
        data={{
          labels: response ? response.forecast.forecastday[0].hour.map(i => timestampToHour(i.time_epoch)) : [],
          datasets: [{
            label: 'Temperatura (ºC)',
            data: response ? response.forecast.forecastday[0].hour.map(i => i.temp_c) : [],
            borderColor: 'rgb(153, 61, 0)',
            borderWidth: 3
          },
          {
            label: 'Chuva (%)',
            data: response ? response.forecast.forecastday[0].hour.map(i => i.chance_of_rain) : [],
            borderColor: 'rgb(51, 153, 255)',
            borderWidth: 3
          },
          {
            label: 'Vento (km/h)',
            data: response ? response.forecast.forecastday[0].hour.map(i => i.wind_kph) : [],
            borderColor: 'rgb(153, 153, 153)',
            borderWidth: 3
          }
        ]
        }}
        />

      <Grid className="mt-3" justify={'center'}>
        {response ?
          response.forecast.forecastday.map(forecast => {
            return(
              <Forecast key={forecast.date_epoch} forecast={forecast}/>
            )
          })
          :
          <></>
        }
      </Grid>

    </Container>

    <MyFooter/>
    </>
  );
}

export default App;
