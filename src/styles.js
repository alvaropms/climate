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

export const Title = styled.h2`
    text-align: center;
`;