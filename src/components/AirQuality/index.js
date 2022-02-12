import React, {useState} from "react";
import { Card, Button, Modal } from "react-bootstrap";
import {epaColor, defraColor} from '../../utilities/functions';

const AirQuality = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const air = props.air;

    return(
        <>
        <Card style={{width: '250px'}} className="mb-1" bg={'dark'} text={'light'}>
            <Card.Header>Qualidade do ar (μg/m<sup>3</sup>) <i class="bi bi-cloud-haze2-fill"></i></Card.Header>
            <Card.Body className="text-center">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column me-3">
                        <div className="text-secondary">CO: <span className="text-light">{air.co.toFixed(2)}</span></div>
                        <div className="text-danger">NO<sub>2</sub>: <span className="text-light">{air.no2.toFixed(2)}</span></div>
                        <div className="text-info">O<sub>3</sub>: <span className="text-light">{air.o3.toFixed(2)}</span></div>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="text-secondary">SO<sub>2</sub>: <span className="text-light">{air.so2.toFixed(2)}</span></div>
                        <div className="text-danger">PM2.5: <span className="text-light">{air.pm2_5.toFixed(2)}</span></div>
                        <div className="text-warning">PM10: <span className="text-light">{air.pm10.toFixed(2)}</span></div>
                    </div>
                </div>
                <div className="d-flex flex-column mb-4">
                    <p>
                    Índice EPA: <span className={`text-${epaColor(air[`us-epa-index`])}`}>{air[`us-epa-index`]}</span> <br/>
                    Índice DEFRA: <span className={`text-${defraColor(air[`gb-defra-index`])}`}>{air[`gb-defra-index`]}</span>
                    </p>
                </div>
                <Button onClick={handleShow} variant="primary">Ler mais</Button>
            </Card.Body>
        </Card>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sobre os indicadores de qualidade do ar</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <p>
                        Estes indicadores nos informam o volume de determinadss
                        poluentes presentes no ar.
                    </p>
                    <h3>CO</h3>
                    <p>
                    O monóxido de carbono (CO) é um gás levemente inflamável, inodoro
                    e muito perigoso devido à sua grande toxicidade.
                    É produzido pela queima em condições de pouco oxigênio 
                    (combustão incompleta) e/ou alta temperatura de carvão ou outros 
                    materiais ricos em carbono, como derivados de petróleo, por exemplo,
                    pelos motores dos veículos. <a 
                    href="https://pt.wikipedia.org/wiki/Mon%C3%B3xido_de_carbono">
                        Ler mais...
                    </a>
                    </p>

                    <h3>SO<sub>2</sub></h3>
                    <p>
                    O dióxido de enxofre, também conhecido como anidrido sulfuroso,
                    é um composto químico constituído por dois átomos de oxigênio e
                    um de enxofre. A sua fórmula química é SO<sub>2</sub>. É um gás denso, incolor,
                    não inflamável e altamente tóxico e a sua inalação pode ser fortemente
                    irritante. Esse gás é o responsável pelo cheiro de fósforos queimados. <a 
                    href="https://pt.wikipedia.org/wiki/Di%C3%B3xido_de_enxofre">
                        Ler mais...
                    </a>
                    </p>

                    <h3>NO<sub>2</sub></h3>
                    <p>
                    O dióxido de azoto ou dióxido de nitrogénio é um composto químico constituído
                    por dois átomos de oxigénio e um de nitrogênio. Possui um cheiro forte e irritante,
                    é muito tóxico, é um poderoso oxidante que, nas reacções na atmosfera pode dar origem
                    a ácido nítrico, bem como a nitratos orgânicos que contribuem para fenómenos com
                    elevado impacto ambiental, como as chuvas ácidas e a eutrofização de lagos e rios. <a 
                    href="https://pt.wikipedia.org/wiki/Di%C3%B3xido_de_nitrog%C3%A9nio">
                        Ler mais...
                    </a>
                    </p>

                    <h3>O<sub>3</sub></h3>
                    <p>
                    O ozônio é uma molécula composta por três átomos de oxigênio.
                    A camada de ozônio é encontrada na estratosfera, região da atmosfera.
                    Esta camada tem a propriedade de absorver a radiação ultravioleta do Sol, 
                    por este motivo, sem a proteção do ozônio, as radiações causariam graves
                    danos aos organismos vivos que habitam a superfície do planeta Terra.
                    Mas na superfície, onde se forma em uma reação química entre a luz solar
                    e gases de escapamento, níveis elevados de ozônio podem causar problemas
                    respiratórios, provocar ataques de asma e piorar doenças respiratórias. <a 
                    href="https://pt.wikipedia.org/wiki/Oz%C3%B4nio">
                        Ler mais...
                    </a>
                    </p>

                    <h3>PM10 E PM2.5</h3>
                    <p>
                    Os materiais particulados (PM, sigla em inglês) são partículas microscópicas
                    liberadas pela queima de carvão, petróleo e florestas, mas também têm fontes
                    naturais, como erupções vulcânicas e tempestades de areia.
                    Os PM são divididos em duas categorias: PM10, que compreende partículas entre
                    2.5 e 10 milionésimos de um milímetro ou micrômetros; e PM2.5, que é menor que
                    2.5 micrômetros, trinta vezes menor que a espessura de um fio de cabelo humano. <a 
                    href="https://g1.globo.com/mundo/noticia/2013/10/poluentes-atmosfericos-inimigos-invisiveis.html">
                        Ler mais...
                    </a>
                    </p>

                    <h3>Índice EPA</h3>
                    <p>
                    É um índice usado pela Agência de Proteção Ambiental dos Estados
                    Unidos (EPA) para medir a qualidade do ar. <a
                    href="https://www.airnow.gov/aqi/aqi-basics/">
                        Ler mais...
                    </a>
                    </p>
                    <h3>Índice DEFRA</h3>
                    <p>
                    É um índice usado pelo Departamento de Meio Ambiente, Alimentação
                    e Assuntos Rurais do Reino Unido (DEFRA) para medir a qualidade do ar. <a
                    href="https://uk-air.defra.gov.uk/air-pollution/daqi">
                        Ler mais...
                    </a>
                    </p>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AirQuality;