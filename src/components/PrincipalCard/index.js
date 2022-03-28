import React from "react";
import { Grid } from "./styles";
import { Card } from "react-bootstrap";
import { timestampToHour } from "../../utilities/functions";

const PrincipalCard = (props) => {
    const data = props.data;

    return(
        <Card style={{width: '250px'}} className='mb-1' bg={'dark'} text={'light'}>
            <Card.Body className="d-flex flex-column justify-content-evenly">
              <div>
                <Card.Title className="text-center">
                  <img alt='icon' src={data ? data.current.condition.icon : ''} />
                  <b className="fs-1">{data ? data.current.temp_c + "ºC" : ''}</b>
                </Card.Title>
                <Card.Text className="text-center">
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
          </Card>
    )
}

export default PrincipalCard;