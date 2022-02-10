import { Card } from "react-bootstrap";
import styled from "styled-components";
import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;

        font-family: 'Roboto', sans-serif;
    }
`;

export const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => (props.column ? `column` : `row`)};
    justify-content: ${props => (props.justify ? props.justify : `initial`)};
`;

export const Title = styled.h2`
    text-align: center;
`;

export const PrincipalCard = styled(Card)`
    max-width: 600px;
`;