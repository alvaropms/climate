import { useEffect, useState } from "react";
import { getCity, getIcon, getTemp, getTempByName } from "./api/connection";
import {newCity} from './models/cityModel';
import { GlobalStyles, Grid, Title} from "./styles";
import {Navbar, Container, InputGroup, FormControl, Button,
  Card
} from 'react-bootstrap';

function App() {
  const [respost, setRespost] = useState();
  const [city, setCity] = useState();
  const [hour, setHour] = useState('');
  const [search, setSearch] = useState('');

  function pad(s) {
    return (s < 10) ? '0' + s : s;
  }
  
  useEffect(() => {
    getCity().then(
      city => {
        setCity(newCity(city.data.city, city.data.country));
        getTemp(city.data.latitude, city.data.longitude).then(
          resp => {
            setRespost(resp.data);
            let date = new Date(Date.now() - parseInt(resp.data.timezone));
            setHour([date.getHours(), date.getMinutes()].map(pad).join(':'));
          }
        );
      }
    )
  }, []);

  async function changeCity(cityName){
    getTempByName(cityName).then(
      resp => {
        setRespost(resp.data);
        setCity(newCity(resp.data.name, resp.data.sys.country));
        let date = new Date(Date.now() - parseInt(resp.data.timezone));
        setHour([date.getHours(), date.getMinutes()].map(pad).join(':'));
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
        <form style={{width:'300px'}}>
          <InputGroup style={{'maxWidth': '300px'}}>
            <FormControl
              placeholder="Pesquisar clima por cidade"
              aria-label="Pesquisar clima por cidade"
              aria-describedby="basic-addon2"
              id="searchcity"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" onClick={(e) => {e.preventDefault(); changeCity(search)}} variant="outline-secondary" id="button-addon2">
              <i class="bi bi-search"></i>
            </Button>
          </InputGroup>
        </form>
      </Container>
    </Navbar>

    <Container style={{'marginTop': '10px'}}>
      <Title>{city ? `Tempo agora em ${city.city}` : ''}<sup className="fs-5">{city ? `${city.country}` : ''}</sup></Title>

      <Card bg={'dark'} text={'light'} style={{ maxWidth: '500px', marginLeft:'auto', marginRight:'auto'}}>
        <Card.Body>
          <Card.Title className="text-center">
            <img alt='icon' src={respost ? getIcon(respost.weather[0].icon) : ''} />
            <b className="fs-1">{respost ? respost.main.temp + "º" : ''}</b>
            <span>{respost ? respost.weather[0].description: ''}</span>
          </Card.Title>
          <Card.Text className="d-flex flex-row flex-wrap justify-content-around">
            <Grid column>
              <Grid>
                <i class="me-1 bi bi-thermometer-high text-danger"></i>
                <span>{respost ? respost.main.temp_max + "%": ''}</span>
              </Grid>
              <Grid>
                <i class="me-1 bi bi-thermometer-low text-primary"></i>
                <span>{respost ? respost.main.temp_min + "%": ''}</span>
              </Grid>
              <Grid>
                <i class="me-1 bi bi-wind"></i>
                <span>{respost ? (respost.wind.speed * 3.6).toFixed(1) + " km/h": ''}</span>
              </Grid>
            </Grid>
            <Grid column>
            <Grid>
                <i class="me-1 bi bi-speedometer2 text-success"></i>
                <span>{respost ? respost.main.pressure + " hPa": ''}</span>
              </Grid>
              <Grid>
                <i class="me-1 bi bi-droplet text-info"></i>
                <span>{respost ? respost.main.humidity + "%": ''}</span>
              </Grid>
              <Grid>
                <i class="me-1 text-warning bi bi-clock"></i>
                <span>{respost ? hour : ''}</span>
              </Grid>
            </Grid>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>


    </>
  );
}

export default App;
