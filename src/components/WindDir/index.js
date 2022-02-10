import React from "react";
import { Card } from "react-bootstrap";
const windrose = require('../../assets/windrose.png');

const WinDir = (props) => {
    const dir = props.winddir;

    return(
        <>
        <Card style={{width: '250px'}} className="mb-1" bg={'dark'} text={'light'}>
            <Card.Header>Direção do vento: {dir}</Card.Header>
            <Card.Body className="text-center">
                <img alt='windrose' src={windrose} width={200}></img>
            </Card.Body>
        </Card>
        </>
    );
}

export default WinDir;