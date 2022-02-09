import React from "react";
import { Card } from "react-bootstrap";
import { formatDate } from "../../utilities/functions";

const Forecast = (props) => {
    const forecast = props.forecast;
    return(
        <>
        <Card className="mx-2 mb-2" bg={'dark'} text={'light'}>
            <Card.Body>
                <Card.Title>
                    <span>{formatDate(forecast.date)}</span>
                </Card.Title>
                <Card.Text>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column justify-content-center">
                            <div>
                                <i className="me-1 bi bi-thermometer-high text-danger"></i>
                                <span>{forecast.day.maxtemp_c + 'º'}</span>
                            </div>
                            <div>
                                <i className="me-1 bi bi-thermometer-low text-primary"></i>
                                <span>{forecast.day.mintemp_c + 'º'}</span>
                            </div>
                        </div>
                        <div className="">
                            <img alt='icon' src={forecast.day.condition.icon}/>
                        </div>
                    </div>
                    <span>{forecast.day.condition.text}</span>
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default Forecast;