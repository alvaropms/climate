import { Spinner } from "react-bootstrap";
import styled from "styled-components";

export const StyledLoad = styled(Spinner)`
    left:50%;
    top:50%;
    position: fixed;
    margin-left:-25px;
    margin-top:-25px;
    z-index: ${props => props.active ? '999' : '-999'};
    display: ${props => props.active ? 'visible' : 'none'};
`;

export const Opacity = styled.div`
    display: ${props => props.active ? 'visible' : 'none'};
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    background: RGBA(0,0,0,0.34);
    z-index: ${props => props.active ? '998' : '-999'};
`;