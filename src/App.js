import { useEffect, useState } from "react";
import { getCity, getTempByName } from "./api/connection";
import Forecast from "./components/Forecast";
import { timestampToHour } from "./utilities/functions";
import { GlobalStyles, Grid, Title as PageTitle, PrincipalCard, StyledForm} from "./styles";
import {Navbar, Container, InputGroup, FormControl, Button,
  Card
} from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState(null);
  const [data, setData] = useState({});

  function receiveData(resp){
    setResponse(resp.data);
    setData({
      name: resp.data.location.name,
      country: resp.data.location.country,
      localtime: resp.data.location.localtime_epoch,
      temp: resp.data.current.temp_c,
      description: resp.data.current.condition.text,
      icon: resp.data.current.condition.icon,
      windspeed: resp.data.current.wind_kph,
      winddir: resp.data.current.wind_dir,
      pressure: resp.data.current.pressure_mb,
      humidity: resp.data.current.humidity,
      clouds: resp.data.current.cloud,
      feelslike: resp.data.current.feelslike_c,
      maxtemp: resp.data.forecast.forecastday[0].day.maxtemp_c,
      mintemp: resp.data.forecast.forecastday[0].day.mintemp_c
    })
  }

  useEffect(() => {
    getCity().then(
      city => {
        getTempByName(city.data.city).then(
          resp => {
            receiveData(resp);
          }
        );
      }
    );
  }, []);

  async function changeCity(cityName){
    getTempByName(cityName).then(
      resp => {
        receiveData(resp);
      },
      error => alert('Cidade não encontrada!')
    );
  }

  return (
    <>
    <GlobalStyles />

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Climate</Navbar.Brand>
        <StyledForm style={{width:'300px'}}>
          <InputGroup style={{'maxWidth': '300px'}}>
            <FormControl
              placeholder="Pesquisar clima por cidade"
              aria-label="Pesquisar clima por cidade"
              aria-describedby="basic-addon2"
              id="searchcity"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" onClick={(e) => {e.preventDefault(); changeCity(search);}} variant="outline-secondary" id="button-addon2">
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </StyledForm>
      </Container>
    </Navbar>

    <Container>
      <PageTitle className="mt-3" >{response ? `Tempo agora em ${data.name}` : ''}<sup className="fs-5">{response ? `${data.country}` : ''}</sup></PageTitle>

      <PrincipalCard className='mb-1' bg={'dark'} text={'light'}>
        <Card.Body className="d-flex flex-wrap justify-content-evenly">
          <div>
            <Card.Title className="text-center">
              <img alt='icon' src={response ? data.icon : ''} />
              <b className="fs-1">{response ? data.temp + "ºC" : ''}</b>
            </Card.Title>
            <Card.Text className="d-flex flex-row flex-wrap justify-content-around">
              <span className="fs-6" >{response ? data.description: ''}</span>
            </Card.Text>
          </div>
          <div>
            <Card.Title style={{minHeight: '64px'}} className="fs-6 d-flex flex-row flex-wrap justify-content-around">
              <Grid className="me-3" column>
                <Grid>
                  <i className="me-1 bi bi-thermometer-high text-danger"></i>
                  <span>{response ? data.maxtemp + "ºC": ''}</span>
                </Grid>
                <Grid>
                  <i className="me-1 bi bi-thermometer-low text-primary"></i>
                  <span>{response ? data.mintemp + "ºC": ''}</span>
                </Grid>
                <Grid>
                  <i className="me-1 bi bi-wind"></i>
                  <span>{response ? data.windspeed + " km/h": ''}</span>
                </Grid>
              </Grid>
              <Grid column>
              <Grid>
                  <i className="me-1 bi bi-speedometer2 text-success"></i>
                  <span>{response ? data.pressure + " hPa": ''}</span>
                </Grid>
                <Grid>
                  <i className="me-1 bi bi-droplet text-info"></i>
                  <span>{response ? data.humidity + "%": ''}</span>
                </Grid>
                <Grid>
                  <i className="me-1 text-warning bi bi-clock"></i>
                  <span>{response ? timestampToHour(data.localtime) : ''}</span>
                </Grid>
              </Grid>
            </Card.Title>
            <Card.Text className="fs-6 text-center">
              {response ? response.forecast.forecastday[0].astro.sunrise: ''}
              <i class="bi bi-brightness-alt-high text-warning mx-1"></i>
              {response ? response.forecast.forecastday[0].astro.sunset: ''}
            </Card.Text>
          </div>
        </Card.Body>
      </PrincipalCard>

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

    </>
  );
}

export default App;
