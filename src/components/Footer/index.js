import React from "react";
import { Footer } from "./styles";
import { Card } from "react-bootstrap";

const MyFooter = () => {
    return(
        <>
            <Footer>
                <Card bg={'dark'} text={'light'}>
                    <Card.Body>
                    <Card.Title>
                        Climate
                    </Card.Title>
                    <div className="row">
                        <div className="col-md-8 col-12">
                        <p>
                        Climate é um site que apresenta os dados climáticos
                        de milhares de cidades ao redor do mundo de forma gratuita. <br/>
                        Desenvolvido com fins de aprendizado, não é garantida a precisão
                        das informações aqui prestadas. <br/>
                        Você pode conferir o repositório deste projeto ou entrar em contato
                        com o desenvolvedor para mais informações.
                        </p>
                        </div>
                        <div className="col-md-4 col-12">
                        <a href="https://github.com/alvaropms/climate">Repositório deste projeto</a><br/>
                        <a href="https://react-bootstrap.netlify.app/">React-bootstrap</a><br/>
                        <a href="https://axios-http.com/">Axios</a><br/>
                        <a href="https://styled-components.com/">Styled-components</a><br/>
                        <a href="https://pt-br.reactjs.org/">React</a><br/>
                        <a href="https://www.weatherapi.com/">Weather API</a>
                        </div>
                    </div>
                    </Card.Body>
                </Card>
                <div className="bg-dark text-light text-center px-5 pb-2"> 
                    Criador por Álvaro Melquíades &nbsp;&nbsp;&nbsp;
                    <a href="https://github.com/alvaropms"><i class="bi bi-github fs-3"></i></a>&nbsp;&nbsp;&nbsp;
                    <a href="https://www.linkedin.com/in/%C3%A1lvaro-melqu%C3%ADades-764a2a224/"><i class="bi bi-linkedin fs-3"></i></a>
                </div>
            </Footer>
        </>
    );
}

export default MyFooter;