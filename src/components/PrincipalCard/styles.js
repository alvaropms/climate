import styled from "styled-components";

export const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => (props.column ? `column` : `row`)};
    justify-content: ${props => (props.justify ? props.justify : `initial`)};
`;