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
    align-items: ${props => (props.align ? props.align : `initial`)};

    margin: ${props => (props.margin ? props.margin : 0)};
`;

export const Title = styled.h2`
    text-align: center;
`;